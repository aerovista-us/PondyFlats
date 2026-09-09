/**
 * Standalone delivery packages — client folder has no workbench.
 * Presenter folder is a sibling, never copied into the client zip.
 */
const Lot2Export = (() => {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function nav(items, current) {
    return items.map((n) => {
      const cls = n.id === current ? ' class="primary"' : '';
      return `<a${cls} href="${n.href}">${esc(n.label)}</a>`;
    }).join('\n');
  }

  function shell(opts) {
    const badgeClass = opts.ok ? 'ok' : 'cond';
    const badge = opts.badge || (opts.ok ? 'Design complete' : 'Concept package');
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description || '')}">
<link rel="stylesheet" href="css/lot2-client.css">
</head>
<body>
<header class="top"><div class="topin">
<div class="brand"><small>${esc(opts.brandSmall)}</small><strong>${esc(opts.brand)}</strong></div>
<nav class="nav" aria-label="Primary">
${nav(opts.nav, opts.current)}
</nav>
</div></header>
<main class="wrap">
<p class="print-only">${esc(opts.print)}</p>
${opts.body}
</main>
</body>
</html>
`;
  }

  function figure(src, cap) {
    return `<figure class="draw"><img src="${esc(src)}" alt=""><figcaption>${cap}</figcaption></figure>`;
  }

  function clientReadme(name, status) {
    return `Pondy Flats · ${name}
${status}

How to open
  Double-click index.html (Chrome, Edge, or Safari).
  No internet required. No workbench. No installer.

What’s in this folder
  index.html     cover + full drawing set
  site.html      site plan
  plans.html     floor plans
  elevs.html     elevations and sections
  axon.html      massing and axon
  imgs/          SVG drawings
  css/           styles

Print
  Use Print / save PDF on any page.

This is not a permit or construction set.
Do not mix Design 1 plates with Design 2 plates.
`;
  }

  const D1_NAV = [
    { id: 'hub', href: 'index.html', label: 'Package' },
    { id: 'site', href: 'site.html', label: 'Site' },
    { id: 'plans', href: 'plans.html', label: 'Plans' },
    { id: 'elevs', href: 'elevs.html', label: 'Elevs' },
    { id: 'axon', href: 'axon.html', label: 'Axon' },
  ];

  const D2_NAV = D1_NAV;
  const D3_NAV = [
    { id: 'hub', href: 'index.html', label: 'Package' },
    { id: 'site', href: 'site.html', label: 'Site' },
    { id: 'plans', href: 'plans.html', label: 'Plans' },
    { id: 'elevs', href: 'elevs.html', label: 'Elevs' },
    { id: 'axon', href: 'axon.html', label: 'Axon' },
    { id: 'sections', href: 'sections.html', label: 'Sections' },
  ];

  function d1Hub() {
    const checks = [
      ['Met', 'Drawings agree', 'Site, plans, four elevations, two sections, and massing all describe the same building.'],
      ['Met', 'Building outlines', 'Home A is 58×22.5′ and Home B is 40×28′.'],
      ['Met', 'Parking stalls', 'Two enclosed garage stalls and two covered stalls, independently reachable.'],
      ['Met', 'Covered-stall posts', 'Eight posts. Covered stalls stay open.'],
      ['Met', 'Doors and entries', 'Each garage has a 16′ door. Both homes have a pedestrian entry. The party wall stays blank.'],
      ['Met', 'Roof heights', 'Ridge A 27.0′ / ridge B 26.5′.'],
      ['Met', 'Living area', '1,639 SF and 1,720 SF.'],
      ['Met', 'Street access', 'Cars enter only from Pennsylvania.'],
    ].map(([m, t, p]) => `<article><div class="mark ok">${m}</div><div><h3>${t}</h3><p>${p}</p></div></article>`).join('');
    const sheets = [
      ['G-001', 'Cover', 'index.html', 'This page.'],
      ['A-001', 'Site plan', 'site.html', 'Lot, parking, Pennsylvania drive.'],
      ['A-101', 'Ground', 'plans.html', 'Exact rooms on frozen plates.'],
      ['A-102', 'Upper', 'plans.html', 'Bedrooms over the same outlines.'],
      ['A-201', 'Pennsylvania', 'elevs.html', 'What you see from the street.'],
      ['A-202', 'Rear', 'elevs.html', 'Looking back toward Pennsylvania.'],
      ['A-203', 'North', 'elevs.html', 'Long north side.'],
      ['A-204', 'South', 'elevs.html', 'Private-yard side.'],
      ['A-301', 'Section A-A', 'elevs.html', 'Party wall cut.'],
      ['A-302', 'Section B-B', 'elevs.html', 'Garage-door cut.'],
      ['A-401', 'Massing', 'axon.html', 'Pennsylvania near, rear deep.'],
      ['A-402', 'Axon', 'axon.html', 'Same volumes.'],
    ].map((s) => `<article class="sheet"><div class="no">${s[0]}</div><h3><a href="${s[2]}">${s[1]}</a></h3><p>${s[3]}</p></article>`).join('');
    return shell({
      title: 'Pondy Flats · Design 1',
      description: 'Two homes with two enclosed stalls and two covered stalls. Not a permit set.',
      brandSmall: 'Pondy Flats · 1907 E Pennsylvania',
      brand: 'Design 1',
      nav: D1_NAV,
      current: 'hub',
      print: 'Pondy Flats · Design 1 · R5.1e-v1.1 · not a permit set',
      ok: true,
      body: `
<section class="panel">
<p class="kicker">Complete package · not a permit set</p>
<h1>Two homes on Lot 2, with parking that already works.</h1>
<p class="lede">A connected duplex faces Pennsylvania Street. Two enclosed garage stalls and two covered stalls sit in the house plates.</p>
<div class="hero-banners"><span class="badge ok">Design complete</span><span class="rev">R5.1e-v1.1</span></div>
<div class="ok"><strong>The living program and the parking both pass.</strong> Professional stamps come later.</div>
<div class="warn"><strong>What this is not.</strong> Not permit or construction drawings. Zoning, fire, structure, and survey still need professional review.</div>
<div class="lock"><strong>How every plan is oriented.</strong> Pennsylvania Street is the <em>right</em> edge — the front of the lot. North points left on purpose. Cars enter only from Pennsylvania.</div>
<div class="facts">
  <div class="fact"><small>Living area</small><strong>1,639 / 1,720 SF</strong></div>
  <div class="fact"><small>Parking</small><strong>2 enclosed + 2 covered</strong></div>
  <div class="fact"><small>Street access</small><strong>Pennsylvania only</strong></div>
  <div class="fact"><small>Plates</small><strong>A 58×22.5 · B 40×28</strong></div>
  <div class="fact"><small>Party wall</small><strong>x=68</strong></div>
  <div class="fact"><small>Ridges</small><strong>27.0′ / 26.5′</strong></div>
  <div class="fact"><small>Parking proof</small><strong>Full pass · frozen</strong></div>
  <div class="fact"><small>Revision</small><strong>R5.1e-v1.1</strong></div>
</div>
<div class="actions"><button type="button" class="btn" onclick="window.print()">Print / save PDF</button></div>
<nav class="toc"><a href="#read">How to read</a><a href="site.html">Site</a><a href="plans.html">Plans</a><a href="elevs.html">Elevs</a><a href="axon.html">Axon</a></nav>
</section>
<section class="panel" id="read">
<h2>How to read these drawings</h2>
<div class="read">
<article><div class="n">1 · Front</div><h3>Pennsylvania is on the right</h3><p>Street, 50′ frontage, where cars enter. Home A is closer to the street.</p></article>
<article><div class="n">2 · Parking</div><h3>Garages are in the house</h3><p>Two enclosed stalls and two covered stalls. A full-size SUV reaches each independently.</p></article>
<article><div class="n">3 · Dashed lines</div><h3>Gold is the house envelope</h3><p>Working setbacks until the city confirms.</p></article>
<article><div class="n">4 · Honesty</div><h3>Outlines are frozen</h3><p>A prettier picture that moves a wall is the wrong picture.</p></article>
</div>
</section>
<section class="panel"><h2>What’s in this package</h2><div class="sheet-grid">${sheets}</div></section>
<section class="panel"><h2>Site plan</h2>${figure('imgs/r51e-site-plan.svg', '<strong>A-001.</strong> North points left. 148′ runs rear (left) to Pennsylvania (right).')}</section>
<section class="panel"><h2>Floor plans</h2>
${figure('imgs/r51e-plan-ground.svg', '<strong>A-101 Ground.</strong>')}
${figure('imgs/r51e-plan-upper.svg', '<strong>A-102 Upper.</strong>')}
</section>
<section class="panel"><h2>Elevations and sections</h2>
${figure('imgs/r51e-penn-elev.svg', '<strong>A-201 Pennsylvania.</strong>')}
${figure('imgs/r51e-rear-elev.svg', '<strong>A-202 Rear.</strong>')}
${figure('imgs/r51e-north-elev.svg', '<strong>A-203 North.</strong>')}
${figure('imgs/r51e-south-elev.svg', '<strong>A-204 South.</strong>')}
${figure('imgs/r51e-section-aa.svg', '<strong>A-301 Section A-A.</strong>')}
${figure('imgs/r51e-section-bb.svg', '<strong>A-302 Section B-B.</strong>')}
</section>
<section class="panel"><h2>Massing</h2>
${figure('imgs/r51e-architectural-massing.svg', '<strong>A-401 Architectural massing.</strong>')}
${figure('imgs/r51e-axon-lock-clean.svg', '<strong>A-402 Axon.</strong>')}
</section>
<section class="panel"><h2>What we checked</h2><div class="proof">${checks}</div>
<div class="warn"><strong>Still open with the city.</strong> Zoning, fire, structure, and survey.</div></section>
<p class="footer">Pondy Flats · Lot 2 · Design 1 · not a permit set</p>`,
    });
  }

  function d2Hub() {
    const checks = [
      ['Met', 'Street access', 'Both garages are reached from Pennsylvania Street.'],
      ['Met', 'Rear-yard garages', 'Detached garages sit about 5′ from the rear lot line — a city-sheet reading, not a permit.'],
      ['Met', 'North side yard', 'The north garage sits 6′ off the north side line.'],
      ['Met', 'Parking count', 'Two 20×20 two-car garages — four enclosed stalls.'],
      ['Met', 'Living area', 'Conceptual rooms about 1,792 SF and 1,944 SF.'],
      ['Met', 'SUV turning', 'A full-size SUV stays on the lot. About 1½′ remains at the south edge — workable, not generous.'],
      ['Met', 'Independent doors', 'Each garage has its own 16′ door.'],
    ].map(([m, t, p]) => `<article><div class="mark ok">${m}</div><div><h3>${t}</h3><p>${p}</p></div></article>`).join('');
    const sheets = [
      ['G-001', 'Cover', 'index.html'],
      ['A-001', 'Site plan', 'site.html'],
      ['A-103', 'Room diagram', 'plans.html'],
      ['A-101', 'Ground', 'plans.html'],
      ['A-102', 'Upper', 'plans.html'],
      ['A-201', 'Pennsylvania', 'elevs.html'],
      ['A-202', 'Rear', 'elevs.html'],
      ['A-203', 'North', 'elevs.html'],
      ['A-204', 'South', 'elevs.html'],
      ['A-301', 'Section A-A', 'elevs.html'],
      ['A-302', 'Section B-B', 'elevs.html'],
      ['A-401', 'Massing', 'axon.html'],
      ['A-402', 'Axon', 'axon.html'],
    ].map((s) => `<article class="sheet"><div class="no">${s[0]}</div><h3><a href="${s[2]}">${s[1]}</a></h3></article>`).join('');
    return shell({
      title: 'Pondy Flats · Design 2',
      description: 'Two homes, four enclosed stalls, detached rear garages. Concept package, not a permit set.',
      brandSmall: 'Pondy Flats · 1907 E Pennsylvania',
      brand: 'Design 2',
      nav: D2_NAV,
      current: 'hub',
      print: 'Pondy Flats · Design 2 · D2-v0.9 · concept package · not a permit set',
      ok: false,
      badge: 'Concept package',
      body: `
<section class="panel">
<p class="kicker">Concept package · not a permit set</p>
<h1>Two homes on Lot 2, with four enclosed parking spaces.</h1>
<p class="lede">A connected duplex faces Pennsylvania Street. Two detached two-car garages sit in the rear yard.</p>
<div class="hero-banners"><span class="badge cond">Concept package</span><span class="rev">D2-v0.9</span></div>
<div class="ok"><strong>A complete concept you can read.</strong> Not construction drawings.</div>
<div class="warn"><strong>What this is not.</strong> Window patterns may change. The 5′ rear garage setback is a city-sheet reading, not a permit. Do not mix these outlines with Design 1.</div>
<div class="lock"><strong>How every plan is oriented.</strong> Pennsylvania is the <em>right</em> edge. North points left. Cars enter only from Pennsylvania.</div>
<div class="facts">
  <div class="fact"><small>Living area</small><strong>1,792 / 1,944 SF</strong></div>
  <div class="fact"><small>Parking</small><strong>4 enclosed stalls</strong></div>
  <div class="fact"><small>Street access</small><strong>Pennsylvania only</strong></div>
  <div class="fact"><small>Garages</small><strong>Two 20×20 detached</strong></div>
  <div class="fact"><small>Between buildings</small><strong>27′</strong></div>
  <div class="fact"><small>SUV clearance</small><strong>1.54′ at south edge</strong></div>
  <div class="fact"><small>Rear garage setback</small><strong>5′ target · 6′ north side</strong></div>
  <div class="fact"><small>Revision</small><strong>D2-v0.9</strong></div>
</div>
<div class="actions"><button type="button" class="btn" onclick="window.print()">Print / save PDF</button></div>
</section>
<section class="panel"><h2>How to read</h2>
<div class="read">
<article><div class="n">1 · Front</div><h3>Pennsylvania is on the right</h3><p>Home A is the east home, closer to the street.</p></article>
<article><div class="n">2 · Rear</div><h3>Garages are on the left</h3><p>Two green 20×20 boxes. Doors face east toward the drive.</p></article>
<article><div class="n">3 · Dashed lines</div><h3>Gold homes · green garages</h3><p>Green band is the accessory reading, not a permit.</p></article>
<article><div class="n">4 · Openings</div><h3>Doors red · windows blue</h3><p>On the axon. ENTRY A on Pennsylvania; ENTRY B on the south court.</p></article>
</div>
</section>
<section class="panel"><h2>Drawings</h2><div class="sheet-grid">${sheets}</div></section>
<section class="panel"><h2>Site plan</h2>${figure('imgs/d2-site-plan.svg', '<strong>A-001.</strong>')}</section>
<section class="panel"><h2>Floor plans</h2>
${figure('imgs/d2-plan-bubble.svg', '<strong>A-103 Room diagram.</strong>')}
${figure('imgs/d2-plan-ground.svg', '<strong>A-101 Ground.</strong>')}
${figure('imgs/d2-plan-upper.svg', '<strong>A-102 Upper.</strong>')}
</section>
<section class="panel"><h2>Elevations</h2>
${figure('imgs/d2-elev-penn.svg', '<strong>A-201 Pennsylvania.</strong>')}
${figure('imgs/d2-elev-rear.svg', '<strong>A-202 Rear.</strong>')}
${figure('imgs/d2-elev-north.svg', '<strong>A-203 North.</strong>')}
${figure('imgs/d2-elev-south.svg', '<strong>A-204 South.</strong>')}
${figure('imgs/d2-section-aa.svg', '<strong>A-301 Section A-A.</strong>')}
${figure('imgs/d2-section-bb.svg', '<strong>A-302 Section B-B.</strong>')}
</section>
<section class="panel"><h2>Massing</h2>
${figure('imgs/d2-massing.svg', '<strong>A-401.</strong> Doors red, windows blue.')}
${figure('imgs/d2-axon-lock-clean.svg', '<strong>A-402.</strong> Same volumes.')}
</section>
<section class="panel"><h2>What we checked</h2><div class="proof">${checks}</div>
<div class="warn"><strong>Still open with the city.</strong> Accessory 5′ rear is a hypothesis.</div></section>
<p class="footer">Pondy Flats · Lot 2 · Design 2 · concept package · not a permit set</p>`,
    });
  }

  function focusPage(pack, page) {
    const figures = page.figs.map((f) => figure(f.src, f.cap)).join('\n');
    return shell({
      title: `${pack.title} · ${page.title}`,
      description: page.lede,
      brandSmall: 'Pondy Flats · 1907 E Pennsylvania',
      brand: pack.brand,
      nav: pack.nav,
      current: page.id,
      print: `${pack.title} · ${page.title} · not a permit set`,
      ok: pack.ok,
      badge: pack.badge,
      body: `
<section class="panel">
<p class="kicker">${esc(page.kicker)}</p>
<h1>${esc(page.title)}</h1>
<p class="lede">${esc(page.lede)}</p>
<div class="hero-banners"><span class="badge ${pack.ok ? 'ok' : 'cond'}">${esc(pack.badge)}</span><span class="rev">${esc(pack.rev)}</span></div>
<div class="warn"><strong>What this is not.</strong> ${esc(pack.not)}</div>
<div class="actions"><button type="button" class="btn" onclick="window.print()">Print / save PDF</button></div>
${figures}
<p class="footer"><a href="index.html">Full package</a></p>
</section>`,
    });
  }

  function talkingPoints(lines) {
    return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Talking points</title><link rel="stylesheet" href="css/lot2-studio.css"></head>
<body><main class="wrap"><section class="panel">
<p class="kicker">Internal · one-pager</p>
<h1>Talking points</h1>
<ul>${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
<p class="footer">Keep this off the client folder. Open index.html on the shared screen.</p>
</section></main></body></html>`;
  }

  const PACKAGES = Object.freeze([
    {
      id: 'design-1',
      title: 'Pondy Flats · Design 1',
      brand: 'Design 1',
      rev: 'R5.1e-v1.1',
      ok: true,
      badge: 'Design complete',
      not: 'Not permit or construction drawings.',
      nav: D1_NAV,
      status: 'Design complete / program gate pass. Not a permit set.',
      imgs: [
        'r51e-site-plan.svg', 'r51e-plan-ground.svg', 'r51e-plan-upper.svg',
        'r51e-penn-elev.svg', 'r51e-rear-elev.svg', 'r51e-north-elev.svg', 'r51e-south-elev.svg',
        'r51e-section-aa.svg', 'r51e-section-bb.svg',
        'r51e-architectural-massing.svg', 'r51e-axon-lock-clean.svg',
      ],
      hub: d1Hub,
      pages: [
        { id: 'site', file: 'site.html', title: 'Site plan', kicker: 'A-001', lede: 'How the buildings sit on the lot and where cars enter.', figs: [{ src: 'imgs/r51e-site-plan.svg', cap: '<strong>A-001.</strong>' }] },
        { id: 'plans', file: 'plans.html', title: 'Floor plans', kicker: 'A-101 · A-102', lede: 'Exact rooms on frozen plates.', figs: [
          { src: 'imgs/r51e-plan-ground.svg', cap: '<strong>A-101 Ground.</strong>' },
          { src: 'imgs/r51e-plan-upper.svg', cap: '<strong>A-102 Upper.</strong>' },
        ] },
        { id: 'elevs', file: 'elevs.html', title: 'Elevations & sections', kicker: 'A-201 – A-302', lede: 'Street face first, then the set.', figs: [
          { src: 'imgs/r51e-penn-elev.svg', cap: '<strong>A-201.</strong>' },
          { src: 'imgs/r51e-rear-elev.svg', cap: '<strong>A-202.</strong>' },
          { src: 'imgs/r51e-north-elev.svg', cap: '<strong>A-203.</strong>' },
          { src: 'imgs/r51e-south-elev.svg', cap: '<strong>A-204.</strong>' },
          { src: 'imgs/r51e-section-aa.svg', cap: '<strong>A-301.</strong>' },
          { src: 'imgs/r51e-section-bb.svg', cap: '<strong>A-302.</strong>' },
        ] },
        { id: 'axon', file: 'axon.html', title: 'Massing & axon', kicker: 'A-401 · A-402', lede: 'Same camera: street near, rear deep.', figs: [
          { src: 'imgs/r51e-architectural-massing.svg', cap: '<strong>A-401.</strong>' },
          { src: 'imgs/r51e-axon-lock-clean.svg', cap: '<strong>A-402.</strong>' },
        ] },
      ],
      presenterSrc: 'presenter-design-1.html',
      points: [
        'Two homes, 1,639 / 1,720 SF, demising x=68.',
        '2 enclosed + 2 covered. Parking full pass. Pennsylvania only.',
        'Drawings do not rotate: Pennsylvania is right / front.',
        'Walk site → plans → Pennsylvania elev → axon.',
        'Not a permit set. Do not mix with Design 2.',
      ],
    },
    {
      id: 'design-2',
      title: 'Pondy Flats · Design 2',
      brand: 'Design 2',
      rev: 'D2-v0.9',
      ok: false,
      badge: 'Concept package',
      not: 'Not permit drawings. 5′ rear is a hypothesis. About 1½′ south clearance.',
      nav: D2_NAV,
      status: 'Concept package / CONDITIONAL. Not a permit set.',
      imgs: [
        'd2-site-plan.svg', 'd2-plan-bubble.svg', 'd2-plan-ground.svg', 'd2-plan-upper.svg',
        'd2-elev-penn.svg', 'd2-elev-rear.svg', 'd2-elev-north.svg', 'd2-elev-south.svg',
        'd2-section-aa.svg', 'd2-section-bb.svg', 'd2-massing.svg', 'd2-axon-lock-clean.svg',
      ],
      hub: d2Hub,
      pages: [
        { id: 'site', file: 'site.html', title: 'Site plan', kicker: 'A-001', lede: 'Homes, detached garages, Pennsylvania drive.', figs: [{ src: 'imgs/d2-site-plan.svg', cap: '<strong>A-001.</strong>' }] },
        { id: 'plans', file: 'plans.html', title: 'Floor plans', kicker: 'A-103 · A-101 · A-102', lede: 'Diagram first, then conceptual rooms.', figs: [
          { src: 'imgs/d2-plan-bubble.svg', cap: '<strong>A-103.</strong>' },
          { src: 'imgs/d2-plan-ground.svg', cap: '<strong>A-101.</strong>' },
          { src: 'imgs/d2-plan-upper.svg', cap: '<strong>A-102.</strong>' },
        ] },
        { id: 'elevs', file: 'elevs.html', title: 'Elevations & sections', kicker: 'A-201 – A-302', lede: 'Street face first. Garages are not on the Pennsylvania elevation.', figs: [
          { src: 'imgs/d2-elev-penn.svg', cap: '<strong>A-201.</strong>' },
          { src: 'imgs/d2-elev-rear.svg', cap: '<strong>A-202.</strong>' },
          { src: 'imgs/d2-elev-north.svg', cap: '<strong>A-203.</strong>' },
          { src: 'imgs/d2-elev-south.svg', cap: '<strong>A-204.</strong>' },
          { src: 'imgs/d2-section-aa.svg', cap: '<strong>A-301.</strong>' },
          { src: 'imgs/d2-section-bb.svg', cap: '<strong>A-302.</strong>' },
        ] },
        { id: 'axon', file: 'axon.html', title: 'Massing & axon', kicker: 'A-401 · A-402', lede: 'Doors outlined red, windows outlined blue.', figs: [
          { src: 'imgs/d2-massing.svg', cap: '<strong>A-401.</strong>' },
          { src: 'imgs/d2-axon-lock-clean.svg', cap: '<strong>A-402.</strong>' },
        ] },
      ],
      presenterSrc: 'presenter-design-2.html',
      points: [
        'Four enclosed stalls. Two 20×20 detached garages in the rear yard.',
        '5′ accessory rear is a hypothesis, not a permit.',
        'SUV south clearance about 1.54′ — workable, not generous.',
        'Walk site → bubble → Pennsylvania elev → axon (red doors, blue windows).',
        'Concept package. Do not freeze. Do not mix with Design 1.',
      ],
    },
    {
      id: 'design-3',
      title: 'Pondy Flats · Design 3',
      brand: 'Design 3',
      rev: 'D3-CFB716-v0.3',
      ok: false,
      badge: 'Design development',
      not: 'Not permit or construction drawings. Unit A planning area remains REVIEW unless the over-garage option is separately authorized and connected.',
      nav: D3_NAV,
      status: 'Design-development package / CFB-716 frozen geometry. Not a permit set.',
      imgs: [],
      staticPages: [
        { src: 'design-3.html', dest: 'index.html' },
        { src: 'd3-site.html', dest: 'site.html' },
        { src: 'd3-plan-closure.html', dest: 'plans.html' },
        { src: 'd3-elevs.html', dest: 'elevs.html' },
        { src: 'd3-axon.html', dest: 'axon.html' },
        { src: 'd3-sections.html', dest: 'sections.html' },
      ],
      staticScripts: ['lot2-design-3.js', 'lot2-design-3-plan-closure.js'],
      hub: () => fs.readFileSync('design-3.html', 'utf8'),
      pages: [],
      presenterSrc: 'presenter-design-3.html',
      points: [
        'Design 3 is CFB-716, the Workbench preferred candidate.',
        'CFB-716 survey, placements, drives, Pennsylvania access, and freeze hash remain locked.',
        'Plan closure keeps the over-garage idea as a REVIEW option only; it is not counted as authorized passing area.',
        'Walk site, plans, elevations, axon, then sections.',
        'Not a permit set. Professional validation remains required.',
      ],
    }
  ]);

  return { PACKAGES, shell, focusPage, talkingPoints, clientReadme };
})();

if (typeof module !== 'undefined') module.exports = Lot2Export;
