/**
 * Design #2 deliverable pipeline (Node).
 *
 * Repeatable process:
 *   node scripts/d2-deliverable-gates.js
 *   (or: npm run d2)
 *
 * 1. Prove lock + access (analyze)
 * 2. Assert geometry fingerprint (presentation may move; plates may not)
 * 3. Freeze SVGs from the engine
 * 4. Audit each sheet for revision, sheet number, CONCEPTUAL
 * 5. Assert workbench contract (site → axon; missing A-402 is FAIL)
 * 6. Audit A-401 / A-402 openings (doors red, windows blue)
 * 7. Write dedicated focus pages (site / plans / elevs / axon)
 * 8. Audit design-2.html still links those files
 * 9. Write docs/lot2-design-2-gate.json
 *
 * Does not touch R5.1e. Exit 1 on FAIL, fingerprint drift, or sheet audit miss.
 * CONDITIONAL (SUV REVIEW) is an expected passing pipeline status.
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function load(name) {
  return require(path.join(root, 'js', name));
}

global.Lot2SOT = load('lot2-sot.js');
global.Lot2 = load('lot2-geometry.js');
global.Lot2Access = load('lot2-access.js');
global.Lot2AccessSkeleton = load('lot2-access-skeleton.js');
global.Lot2PipelineContract = load('lot2-pipeline-contract.js');
global.Lot2Design2 = load('lot2-design-2.js');

const D = global.Lot2Design2;
const Contract = global.Lot2PipelineContract;
const pack = Contract.auditSheets(D.SHEETS, { newDesign: true });
const gate = D.analyze();
const fp = D.fingerprint();
const htmlPath = path.join(root, D.PACKAGE.html);
const html = fs.readFileSync(htmlPath, 'utf8');
const imgs = path.join(root, 'imgs');
if (!fs.existsSync(imgs)) fs.mkdirSync(imgs);

const pageMeta = {
  slug: D.PACKAGE.slug,
  hubFile: D.PACKAGE.html,
  navLabel: D.PACKAGE.navLabel,
  engineGlobal: D.PACKAGE.engineGlobal,
  designTitle: D.PACKAGE.designTitle,
  program: D.PROGRAM,
  scripts: [
    'js/lot2-sot.js',
    'js/lot2-geometry.js',
    'js/lot2-access.js',
    'js/lot2-access-skeleton.js',
    'js/lot2-pipeline-contract.js',
    'js/lot2-design-2.js',
    'js/lot2-package-shell.js',
  ],
  peers: [{ href: 'r51e-deliverable.html', label: 'Design 1' }],
};

const writtenPages = [];
for (const page of Contract.PACKAGE_PAGES) {
  if (page.custom) continue;
  const name = Contract.pageFile(page, pageMeta);
  const body = Contract.renderFocusPageHtml(page, D.SHEETS, pageMeta);
  fs.writeFileSync(path.join(root, name), body);
  writtenPages.push(name);
}
const pagesAudit = Contract.auditPages([D.PACKAGE.html, ...writtenPages], pageMeta);
const pageChecks = Contract.PACKAGE_PAGES.filter((p) => !p.custom).map((page) => {
  const name = Contract.pageFile(page, pageMeta);
  const body = fs.readFileSync(path.join(root, name), 'utf8');
  const missing = [];
  if (!body.includes(`data-page="${page.id}"`)) missing.push('data-page');
  if (!body.includes(D.PACKAGE.engineGlobal)) missing.push('engine');
  if (!body.includes('lot2-package-shell.js')) missing.push('shell');
  for (const no of page.sheets) {
    if (!body.includes(no)) missing.push(no);
  }
  return { file: name, ok: missing.length === 0, missing };
});

const sheets = [];
for (const s of D.SHEETS) {
  if (!s.file || !s.render) continue;
  const svg = D.renderNamed(s.render);
  fs.writeFileSync(path.join(imgs, s.file), svg);
  const missing = [];
  for (const token of s.must || []) {
    if (!svg.includes(token)) missing.push(`svg:${token}`);
  }
  if (!svg.includes(D.REV)) missing.push(`svg:REV ${D.REV}`);
  if (!svg.includes('CONCEPTUAL')) missing.push('svg:CONCEPTUAL');
  if (!html.includes(s.no)) missing.push(`html:${s.no}`);
  sheets.push({
    no: s.no,
    file: s.file,
    bytes: Buffer.byteLength(svg),
    ok: missing.length === 0,
    missing,
  });
}

const htmlNeeds = [
  'Lot2Design2', 'CHECK_COPY', 'SHEETS', 'COMPARE', 'ROOM_LEGEND', 'drawBubble', 'drawAxon',
  'd2-site.html', 'd2-plans.html', 'd2-elevs.html', 'd2-axon.html',
];
const htmlMissing = htmlNeeds.filter((t) => !html.includes(t));
const pagesFail = !pagesAudit.ok || pageChecks.some((p) => !p.ok);

const axonSheet = sheets.find((s) => s.no === 'A-402');
const massSheet = sheets.find((s) => s.no === 'A-401');
const axonSvg = axonSheet ? fs.readFileSync(path.join(imgs, axonSheet.file), 'utf8') : '';
const massSvg = massSheet ? fs.readFileSync(path.join(imgs, massSheet.file), 'utf8') : '';
const axonOpen = {
  axon: Contract.auditAxonOpenings(axonSvg),
  massing: Contract.auditAxonOpenings(massSvg),
};
const axonOpenFail = !axonOpen.axon.ok || !axonOpen.massing.ok;

const report = {
  rev: D.REV,
  geom: D.GEOM,
  verdict: gate.verdict,
  client: gate.client,
  living: gate.living,
  capacity: gate.capacity,
  gap: gate.gap,
  access: {
    technical: gate.access.technical,
    reasons: gate.access.reasons || [],
    minSouthClear: gate.checks.sweptPath && gate.checks.sweptPath.minSouthClear,
  },
  fingerprint: {
    ok: fp.ok,
    misses: fp.misses,
  },
  sheets,
  packageContract: pack,
  pages: {
    ok: pagesAudit.ok && pageChecks.every((p) => p.ok),
    expected: pagesAudit.expected,
    missing: pagesAudit.missing,
    written: writtenPages,
    checks: pageChecks,
  },
  axonOpenings: axonOpen,
  html: { ok: htmlMissing.length === 0, missing: htmlMissing },
  checks: Object.fromEntries(
    Object.entries(gate.checks).map(([k, v]) => [k, { ok: v.ok, detail: v.detail }]),
  ),
  next: gate.next,
};

const docs = path.join(root, 'docs');
fs.writeFileSync(path.join(docs, 'lot2-design-2-gate.json'), `${JSON.stringify(report, null, 2)}\n`);

const sheetFail = sheets.some((s) => !s.ok);
const processFail = gate.verdict === 'FAIL' || !fp.ok || sheetFail || htmlMissing.length > 0 || !pack.ok || pagesFail || axonOpenFail;
const line = [
  D.REV,
  D.GEOM,
  gate.verdict,
  `access ${gate.access.technical}`,
  `sheets ${sheets.filter((s) => s.ok).length}/${sheets.length}`,
  pack.ok ? 'contract OK' : `contract MISSING ${pack.missing.join(',')}`,
  pagesFail ? `pages FAIL` : `pages ${pagesAudit.expected.length}/${pagesAudit.expected.length}`,
  axonOpenFail ? `openings FAIL` : `openings ${axonOpen.axon.doors}d/${axonOpen.axon.windows}w`,
  fp.ok ? 'fingerprint OK' : `fingerprint DRIFT ${fp.misses.join(',')}`,
  htmlMissing.length ? `html missing ${htmlMissing.join(',')}` : 'html OK',
].join('  ·  ');

console.log(JSON.stringify(report, null, 2));
console.log(processFail ? `PIPELINE FAIL  ·  ${line}` : `PIPELINE OK  ·  ${line}`);
if (processFail) process.exit(1);
