/**
 * Lot 2 workbench contract — every new design, not only Design 2.
 *
 * Front of the path: create (or ingest) the lot, then load the project brief,
 * then fit that brief onto that lot. This repo’s live lot is already locked in
 * js/lot2-sot.js — do not invent a second Lot 2. A different property starts
 * at Lot, not at Possible.
 *
 * When travel + setbacks are proven (PASS or CONDITIONAL), emit the full
 * package sheet list without waiting to be asked. Axon is not a special request.
 * A-401 / A-402 must outline every door red and every window blue
 * (AXON_OPENINGS / auditAxonOpenings). After Arrange, Read (would we choose
 * this?) before polish. Remaining quality gates: QUALITY in this file +
 * docs/lot2-pipeline-gaps.md.
 *
 * Frozen Design 1 (R5.1e) is grandfathered without A-103. New designs must
 * include the bubble diagram.
 */
const Lot2PipelineContract = (() => {
  /** Parcel geometry. Frozen per property. Live instance: Lot2SOT.SURVEY. */
  const LOT = Object.freeze({
    required: Object.freeze([
      'survey',
      'area',
      'frontageStreet',
      'frontageLength',
      'depth',
      'drawingConvention',
    ]),
    thisRepo: Object.freeze({
      id: 'lot2',
      source: 'js/lot2-sot.js',
      status: 'locked',
      frontageStreet: 'Pennsylvania',
      frontageLength: 50,
      depth: 148,
      area: 7023.43,
    }),
  });

  /**
   * Per-project parameters (build per project). Same lot can host more than
   * one brief (Design 1 vs Design 2). Do not copy another project’s brief
   * onto a different lot without re-running Possible.
   */
  const BRIEF = Object.freeze({
    required: Object.freeze([
      'dwellings',
      'parking',
      'designVehicle',
      'accessOrigin',
      'setbacks',
      'livingBand',
    ]),
  });

  const STAGES = Object.freeze([
    { id: 'lot', name: 'Lot', prove: 'Parcel exists: survey polygon, size, street frontage, drawing convention' },
    { id: 'brief', name: 'Brief', prove: 'Project parameters for this lot: program, vehicle, access, setbacks, living targets' },
    { id: 'possible', name: 'Possible', prove: 'The brief can exist on this lot from the declared access origin' },
    { id: 'fit', name: 'Fit', prove: 'Plates sit inside this lot’s survey polygon' },
    { id: 'arrange', name: 'Arrange', prove: 'Building relationship: party wall, garage attachment, L / stack; openings schedule (which wall is each front door)' },
    { id: 'read', name: 'Read', prove: 'Two homes readable as homes; both pedestrian entries visible; ownership REVIEW labeled if garage-first' },
    { id: 'travel', name: 'Travel', prove: 'Design vehicle inbound + outbound, independent doors, recorded clearance, swept overlay on the site' },
    { id: 'setbacks', name: 'Setbacks', prove: 'Principal vs accessory envelopes; hypotheses labeled, not permits' },
    { id: 'package', name: 'Package', prove: 'Full sheet set from the lock — plans, elevs, axon with red doors / blue windows, checks' },
    { id: 'polish', name: 'Polish', prove: 'Client English, print-ready hub, grouped Site/Plans/Elevs/Axon, no workbench on the package' },
    { id: 'export', name: 'Export', prove: 'Standalone client folder: open index.html, no workbench / archive / solver' },
    { id: 'present', name: 'Present', prove: 'Separate presenter guide + talking points for internal review and in-person delivery' },
    { id: 'freeze', name: 'Freeze', prove: 'Only when explicitly requested — DESIGN COMPLETE' },
  ]);

  /**
   * After Package, delivery is not optional. Client never sees the workbench.
   * Presenter kit is a sibling folder, not inside the client zip.
   */
  const DELIVERABLE = Object.freeze({
    polish: Object.freeze({
      clientEnglish: true,
      print: true,
      groupedPages: Object.freeze(['hub', 'site', 'plans', 'elevs', 'axon']),
      noWorkbench: true,
    }),
    export: Object.freeze({
      root: 'packages',
      clientSuffix: '-client',
      presenterSuffix: '-presenter',
      requiredClient: Object.freeze([
        'index.html', 'site.html', 'plans.html', 'elevs.html', 'axon.html',
        'css/lot2-client.css', 'README.txt',
      ]),
      forbiddenInClient: Object.freeze([
        'workbench.html', 'study-archive.html', 'lab.html', 'parking-reset.html',
        'guide.html', 'designs.html',
      ]),
    }),
    present: Object.freeze({
      required: Object.freeze(['index.html', 'talking-points.html']),
      beats: Object.freeze(['open', 'lot', 'walk', 'honest', 'questions']),
    }),
  });

  /** Required the moment Package is allowed (travel + setbacks cleared). */
  const PACKAGE_SHEETS = Object.freeze([
    { no: 'G-001', id: 'cover', title: 'Cover' },
    { no: 'A-001', id: 'site', title: 'Site plan', file: true },
    { no: 'A-101', id: 'ground', title: 'Ground floor', file: true },
    { no: 'A-102', id: 'upper', title: 'Upper floor', file: true },
    { no: 'A-103', id: 'bubble', title: 'Room diagram', file: true, newDesigns: true },
    { no: 'A-201', id: 'penn', title: 'Pennsylvania elevation', file: true },
    { no: 'A-202', id: 'rear', title: 'Rear elevation', file: true },
    { no: 'A-203', id: 'north', title: 'North elevation', file: true },
    { no: 'A-204', id: 'south', title: 'South elevation', file: true },
    { no: 'A-301', id: 'aa', title: 'Section A-A', file: true },
    { no: 'A-302', id: 'bb', title: 'Section B-B', file: true },
    { no: 'A-401', id: 'massing', title: 'Architectural massing', file: true },
    { no: 'A-402', id: 'axon', title: 'Axon', file: true },
  ]);

  /**
   * Dedicated HTML pages Package emits. Hub is authored (design-N.html).
   * The other four are generated by the gate — do not wait to be asked.
   *
   * Not cloned from Design 1: r51e.html (demo overlaps hub), massing-truth
   * (audit-only), plan-closure as a separate proof page, separate rear / side
   * HTML (those sheets live on Elevs).
   */
  const PACKAGE_PAGES = Object.freeze([
    {
      id: 'hub',
      title: 'Package',
      nav: 'Package',
      custom: true,
      d1: 'r51e-deliverable.html',
      lede: 'Client-readable cover and the full drawing set on one page.',
    },
    {
      id: 'site',
      title: 'Site plan',
      nav: 'Site',
      sheets: Object.freeze(['A-001']),
      extra: 'siteLegend',
      d1: 'r51e-site-plan.html',
      lede: 'How the buildings sit on the lot, where cars enter from the street, and which dashed lines are setbacks.',
    },
    {
      id: 'plans',
      title: 'Floor plans',
      nav: 'Plans',
      sheets: Object.freeze(['A-103', 'A-101', 'A-102']),
      extra: 'roomLegend',
      d1: 'r51e-plans.html',
      lede: 'Room diagram first, then approximate plans fitted to plates that already work for parking. Conceptual — not a square-footage takeoff.',
    },
    {
      id: 'elevs',
      title: 'Elevations & sections',
      nav: 'Elevs',
      sheets: Object.freeze(['A-201', 'A-202', 'A-203', 'A-204', 'A-301', 'A-302']),
      d1: 'r51e-penn-elev.html',
      lede: 'Street face first, then rear, both sides, and two cuts. Finished-looking, still conceptual. Window patterns may change.',
    },
    {
      id: 'axon',
      title: 'Massing & axon',
      nav: 'Axon',
      sheets: Object.freeze(['A-401', 'A-402']),
      d1: 'r51e-axon-lock.html',
      lede: 'Same camera as Design 1: street near (bottom), rear of the lot deep (top). Every door outlined red, every window outlined blue. A prettier picture must not move them.',
    },
  ]);

  /** Same camera as Design 1 massing truth. Do not invent a second viewpoint. */
  const AXON = Object.freeze({
    SCALE_Y: 4.05,
    SCALE_D: 2.2,
    SCALE_Z: 3.35,
    OX: 62,
    OY: 455,
    VB_W: 1040,
    VB_H: 600,
    source: 'Lot2R51eMassingTruth',
  });

  /**
   * Required on A-401 and A-402 for every new design (D2-v0.8+).
   * Doors red, windows blue, tagged data-opening. Do not wait to be asked.
   */
  const AXON_OPENINGS = Object.freeze({
    doorStroke: '#c34232',
    winStroke: '#2a6496',
    doorAttr: 'data-opening="door"',
    winAttr: 'data-opening="window"',
    legendDoor: 'Door',
    legendWindow: 'Window',
    minPedDoors: 2,
    minWindows: 1,
  });

  /**
   * Quality gates learned from D1 / D2 / J. axonOpenings is enforced now.
   * The rest are required on Design 3+ (D1 frozen, D2 grandfathered where noted).
   */
  const QUALITY = Object.freeze([
    { id: 'axonOpenings', stage: 'package', now: true, prove: 'A-401/A-402: doors red, windows blue, both dwelling entries' },
    { id: 'openingsSchedule', stage: 'arrange', now: false, prove: 'One door/window list drives plans, elevs, and axon' },
    { id: 'readOwn', stage: 'read', now: false, prove: 'Two homes readable; pedestrian identity; ownership REVIEW if garage-first' },
    { id: 'sweptOverlay', stage: 'travel', now: false, prove: 'FS-SUV envelope drawn on the site, not only a clearance number' },
    { id: 'pedWalks', stage: 'package', now: false, prove: 'Walk from street to each dwelling entry on A-001' },
    { id: 'planElevAxonAgree', stage: 'package', now: false, prove: 'Entry wall on the plan is the same wall on elevs and axon' },
  ]);

  function auditAxonOpenings(svg, opts = {}) {
    const minPed = opts.minPedDoors != null ? opts.minPedDoors : AXON_OPENINGS.minPedDoors;
    const minWin = opts.minWindows != null ? opts.minWindows : AXON_OPENINGS.minWindows;
    const doors = (String(svg || '').match(/data-opening="door"/g) || []).length;
    const windows = (String(svg || '').match(/data-opening="window"/g) || []).length;
    const missing = [];
    if (!svg || svg.indexOf(AXON_OPENINGS.doorStroke) === -1) missing.push('doorStroke');
    if (!svg || svg.indexOf(AXON_OPENINGS.winStroke) === -1) missing.push('winStroke');
    if (!svg || svg.indexOf(AXON_OPENINGS.doorAttr) === -1) missing.push('doorAttr');
    if (!svg || svg.indexOf(AXON_OPENINGS.winAttr) === -1) missing.push('winAttr');
    if (doors < minPed) missing.push(`doors ${doors}<${minPed}`);
    if (windows < minWin) missing.push(`windows ${windows}<${minWin}`);
    if (!svg || svg.indexOf(AXON_OPENINGS.legendDoor) === -1) missing.push('legendDoor');
    if (!svg || svg.indexOf(AXON_OPENINGS.legendWindow) === -1) missing.push('legendWindow');
    return { ok: missing.length === 0, doors, windows, missing };
  }

  function auditSheets(sheets, opts = {}) {
    const newDesign = opts.newDesign !== false;
    const nos = new Set((sheets || []).map((s) => s.no));
    const missing = PACKAGE_SHEETS
      .filter((r) => (newDesign || !r.newDesigns) && !nos.has(r.no))
      .map((r) => r.no);
    const axon = (sheets || []).find((s) => s.no === 'A-402');
    const massing = (sheets || []).find((s) => s.no === 'A-401');
    return {
      ok: missing.length === 0,
      missing,
      axon: !!(axon && axon.file),
      massing: !!(massing && massing.file),
    };
  }

  function auditKeys(obj, required) {
    const missing = required.filter((k) => obj == null || obj[k] == null);
    return { ok: missing.length === 0, missing };
  }

  function auditLot(lot) {
    return auditKeys(lot, LOT.required);
  }

  function auditBrief(brief) {
    return auditKeys(brief, BRIEF.required);
  }

  function pageFile(page, meta) {
    if (!page || page.custom) return (meta && meta.hubFile) || 'design-2.html';
    return `${meta.slug}-${page.id}.html`;
  }

  function expectedPageFiles(meta) {
    return PACKAGE_PAGES.map((p) => pageFile(p, meta));
  }

  function auditExport(clientNames, presenterNames) {
    const haveC = new Set(clientNames || []);
    const haveP = new Set(presenterNames || []);
    const missingClient = DELIVERABLE.export.requiredClient.filter((f) => !haveC.has(f));
    const leaked = (DELIVERABLE.export.forbiddenInClient || []).filter((f) => haveC.has(f));
    const missingPresenter = DELIVERABLE.present.required.filter((f) => !haveP.has(f));
    return {
      ok: missingClient.length === 0 && leaked.length === 0 && missingPresenter.length === 0,
      missingClient,
      leaked,
      missingPresenter,
    };
  }

  function auditPages(existingNames, meta) {
    const have = new Set(existingNames || []);
    const expected = expectedPageFiles(meta);
    const missing = expected.filter((f) => !have.has(f));
    return { ok: missing.length === 0, missing, expected };
  }

  function hrefForSheet(sheetNo, meta) {
    const page = PACKAGE_PAGES.find((p) => (p.sheets || []).indexOf(sheetNo) !== -1)
      || PACKAGE_PAGES.find((p) => p.id === 'hub');
    return pageFile(page, meta);
  }

  /**
   * Generated focus page (site / plans / elevs / axon). Hub stays authored.
   * meta: { slug, hubFile, navLabel, engineGlobal, designTitle, program, scripts, peers }
   */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function renderFocusPageHtml(page, sheets, meta) {
    const byNo = {};
    (sheets || []).forEach((s) => { byNo[s.no] = s; });
    const figures = (page.sheets || []).map((no) => {
      const s = byNo[no];
      if (!s || !s.render) return '';
      return `<figure class="draw" id="draw-${s.id}" data-render="${s.render}"><figcaption><strong>${s.no}.</strong> ${esc(s.blurb || s.title)}</figcaption></figure>`;
    }).join('\n');
    const extra = page.extra === 'siteLegend'
      ? `<ul class="legend">
  <li><span class="sw home"></span> Homes</li>
  <li><span class="sw gar"></span> Garages</li>
  <li><span class="sw drive"></span> Driveway</li>
  <li><span class="sw party"></span> Party wall</li>
  <li><span class="sw gold"></span> House setbacks</li>
  <li><span class="sw green"></span> Garage setbacks</li>
</ul>`
      : page.extra === 'roomLegend'
        ? '<ul class="legend" id="roomLegend"></ul>'
        : '';
    const navItems = [
      { href: 'index.html', label: 'Home', id: 'home' },
    ].concat(meta.peers || []).concat(
      PACKAGE_PAGES.map((p) => ({
        href: pageFile(p, meta),
        label: p.id === 'hub' ? (meta.navLabel || p.nav) : p.nav,
        id: p.id,
      })),
    );
    const nav = navItems.map((n) => {
      const cls = n.id === page.id ? ' class="primary"' : '';
      return `<a${cls} href="${n.href}">${n.label}</a>`;
    }).join('\n');
    const scripts = (meta.scripts || []).map((src) => `<script src="${src}"></script>`).join('\n');
    const title = `${esc(meta.designTitle)} · ${esc(page.title)}`;
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${esc(page.lede)}">
<link rel="stylesheet" href="css/lot2-client.css">
</head>
<body data-engine="${esc(meta.engineGlobal)}" data-page="${page.id}">
<!-- generated by the workbench package gate · do not hand-edit -->
<header class="top"><div class="topin">
<div class="brand"><small>Pondy Flats · 1907 E Pennsylvania</small><strong>${esc(meta.navLabel)}</strong></div>
<nav class="nav" aria-label="Primary">
${nav}
</nav>
</div></header>
<main class="wrap">
<p class="print-only">${esc(meta.designTitle)} · ${esc(page.title)} · concept package · not a permit set</p>
<section class="panel">
<p class="kicker">${esc((page.sheets || []).join(' · '))} · concept package</p>
<h1>${esc(page.title)}</h1>
<p class="lede">${esc(page.lede)}</p>
<div class="hero-banners">
  <span class="badge cond" id="statusBadge">Concept package</span>
  <span class="rev" id="revLine"></span>
</div>
<div class="warn"><strong>What this is not.</strong> ${esc(meta.program || 'Conceptual drawings, not a permit set.')} Window patterns and finishes may still change.</div>
${extra}
${figures}
<p class="footer"><a href="${esc(meta.hubFile)}">Full package</a> · <a href="index.html">Both designs</a></p>
</section>
</main>
${scripts}
</body>
</html>
`;
  }

  return {
    LOT, BRIEF, STAGES, PACKAGE_SHEETS, PACKAGE_PAGES, AXON, AXON_OPENINGS, QUALITY, DELIVERABLE,
    auditSheets, auditLot, auditBrief, auditPages, auditAxonOpenings, auditExport,
    pageFile, expectedPageFiles, hrefForSheet, renderFocusPageHtml,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2PipelineContract;
