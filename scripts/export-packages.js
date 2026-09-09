/**
 * Write standalone client + presenter folders under packages/.
 * Client never includes workbench / archive / solver.
 *
 *   node scripts/export-packages.js
 *   npm run export
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function load(name) {
  return require(path.join(root, 'js', name));
}

const Contract = load('lot2-pipeline-contract.js');
const Export = load('lot2-export.js');

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function write(dir, name, body) {
  const dest = path.join(dir, name);
  mkdirp(path.dirname(dest));
  fs.writeFileSync(dest, body);
  return name.replace(/\\/g, '/');
}

function rewriteStaticDesign3(html) {
  return html
    .replace(/href="design-3\.html"/g, 'href="index.html"')
    .replace(/href="d3-site\.html"/g, 'href="site.html"')
    .replace(/href="d3-plan-closure\.html"/g, 'href="plans.html"')
    .replace(/href="d3-elevs\.html"/g, 'href="elevs.html"')
    .replace(/href="d3-axon\.html"/g, 'href="axon.html"')
    .replace(/href="d3-sections\.html"/g, 'href="sections.html"')
    .replace(/href="r51e-deliverable\.html"/g, 'href="#"')
    .replace(/href="design-2\.html"/g, 'href="#"');
}

function listFiles(dir, prefix = '') {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (fs.statSync(full).isDirectory()) out.push(...listFiles(full, rel));
    else out.push(rel.replace(/\\/g, '/'));
  }
  return out;
}

const packagesRoot = path.join(root, 'packages');
mkdirp(packagesRoot);

const reports = [];
for (const pack of Export.PACKAGES) {
  const clientDir = path.join(packagesRoot, `${pack.id}-client`);
  const presenterDir = path.join(packagesRoot, `${pack.id}-presenter`);
  rmrf(clientDir);
  rmrf(presenterDir);
  mkdirp(clientDir);
  mkdirp(presenterDir);

  if (pack.staticPages) {
    for (const page of pack.staticPages) {
      write(clientDir, page.dest, rewriteStaticDesign3(fs.readFileSync(path.join(root, page.src), 'utf8')));
    }
    for (const script of pack.staticScripts || []) {
      copyFile(path.join(root, 'js', script), path.join(clientDir, 'js', script));
    }
  } else {
    write(clientDir, 'index.html', pack.hub());
    for (const page of pack.pages) {
      write(clientDir, page.file, Export.focusPage(pack, page));
    }
    for (const img of pack.imgs) {
      const src = path.join(root, 'imgs', img);
      if (!fs.existsSync(src)) throw new Error(`missing ${img}`);
      copyFile(src, path.join(clientDir, 'imgs', img));
    }
  }
  write(clientDir, 'README.txt', Export.clientReadme(pack.title, pack.status));
  copyFile(path.join(root, 'css', 'lot2-client.css'), path.join(clientDir, 'css', 'lot2-client.css'));

  const presenterSrc = path.join(root, pack.presenterSrc);
  let presenterHtml = fs.readFileSync(presenterSrc, 'utf8');
  presenterHtml = presenterHtml
    .replace(/href="workbench\.html"/g, 'href="index.html"')
    .replace(/href="r51e-deliverable\.html"/g, 'href="../' + pack.id + '-client/index.html"')
    .replace(/href="design-2\.html"/g, 'href="../' + pack.id + '-client/index.html"')
    .replace(/href="design-3\.html"/g, 'href="../' + pack.id + '-client/index.html"')
    .replace(/href="presenter-design-1\.html"/g, pack.id === 'design-1' ? 'href="index.html"' : 'href="../design-1-presenter/index.html"')
    .replace(/href="presenter-design-2\.html"/g, pack.id === 'design-2' ? 'href="index.html"' : 'href="../design-2-presenter/index.html"')
    .replace(/href="presenter-design-3\.html"/g, pack.id === 'design-3' ? 'href="index.html"' : 'href="../design-3-presenter/index.html"')
    .replace(/href="css\/lot2-studio\.css"/g, 'href="css/lot2-studio.css"');
  write(presenterDir, 'index.html', presenterHtml);
  write(presenterDir, 'talking-points.html', Export.talkingPoints(pack.points));
  copyFile(path.join(root, 'css', 'lot2-studio.css'), path.join(presenterDir, 'css', 'lot2-studio.css'));
  write(presenterDir, 'README.txt', `Pondy Flats · ${pack.title} · presenter kit

Open index.html for the walk-through.
Open talking-points.html for the one-pager.
Open the sibling ${pack.id}-client/index.html on the shared screen.

Do not copy this folder into the client zip.
`);

  const clientNames = listFiles(clientDir);
  const presenterNames = listFiles(presenterDir);
  const audit = Contract.auditExport(clientNames, presenterNames);
  reports.push({
    id: pack.id,
    client: `${pack.id}-client`,
    presenter: `${pack.id}-presenter`,
    files: { client: clientNames.length, presenter: presenterNames.length },
    audit,
  });
  if (!audit.ok) {
    console.error(JSON.stringify({ pack: pack.id, audit }, null, 2));
    process.exit(1);
  }
}

const packageRows = reports.map((r) =>
  '| `' + r.client + '/` | Client / internal review of the drawings | `index.html` |\n' +
  '| `' + r.presenter + '/` | You | `index.html` + `talking-points.html` |'
).join('\n');
write(packagesRoot, 'README.md', '# Standalone packages\n\n' +
  'Generated by `npm run export`. Clients open a **client** folder. Presenters keep the sibling **presenter** folder.\n\n' +
  '| Folder | Audience | Open |\n' +
  '| ------ | -------- | ---- |\n' +
  packageRows + '\n\n' +
  'Do not zip workbench.html, lot.html, or the rest of the repo into a client handoff.\n' +
  '`lot.html` is a fallback lot sketch in this repo, not LotScope. It is not inside these folders.\n');
console.log(JSON.stringify({ ok: true, reports }, null, 2));
console.log('EXPORT OK  ·  ' + reports.flatMap((r) => [r.client, r.presenter]).map((x) => 'packages/' + x).join('  ·  '));
