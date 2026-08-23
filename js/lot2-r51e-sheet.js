/**
 * Lot 2 — R5.1e sheet presentation kit
 *
 * Geometry is immutable. This module may move text, leaders, dimension
 * strings, title blocks, view framing, and annotation graphics only.
 */
const Lot2R51eSheet = (() => {
  const REV = Object.freeze({
    id: 'R5.1e-v1.1',
    name: 'Deliverable v1.1',
    status: 'DESIGN COMPLETE / PROGRAM GATE PASS',
    date: '2026-08-22',
    project: 'Pondy Flats · Lot 2',
    pending: 'Professional validation pending: zoning · fire · structural · civil/survey',
    geometry: 'IMMUTABLE except recorded v1.1 demising correction from v1.0',
    notPermit: 'Not a permit / construction set',
    baseline: 'R5.1e-v1.0 COMPLETE BASELINE / PROGRAM GATE NOT CLEARED',
  });

  const SHEETS = Object.freeze([
    { no: 'G-001', id: 'cover', title: 'Cover / package', href: 'r51e-deliverable.html', svg: null },
    { no: 'A-001', id: 'site', title: 'Site plan', href: 'r51e-site-plan.html', svg: 'imgs/r51e-site-plan.svg' },
    { no: 'A-101', id: 'ground', title: 'Ground floor plan', href: 'r51e-plan-closure.html', svg: 'imgs/r51e-plan-ground.svg' },
    { no: 'A-102', id: 'upper', title: 'Upper floor plan', href: 'r51e-plan-closure.html', svg: 'imgs/r51e-plan-upper.svg' },
    { no: 'A-201', id: 'penn', title: 'Pennsylvania elevation', href: 'r51e-penn-elev.html', svg: 'imgs/r51e-penn-elev.svg' },
    { no: 'A-202', id: 'rear', title: 'Rear / west elevation', href: 'r51e-rear-elev.html', svg: 'imgs/r51e-rear-elev.svg' },
    { no: 'A-203', id: 'north', title: 'North elevation', href: 'r51e-side-elevs.html', svg: 'imgs/r51e-north-elev.svg' },
    { no: 'A-204', id: 'south', title: 'South elevation', href: 'r51e-side-elevs.html', svg: 'imgs/r51e-south-elev.svg' },
    { no: 'A-301', id: 'aa', title: 'Section A-A', href: 'r51e-sections.html', svg: 'imgs/r51e-section-aa.svg' },
    { no: 'A-302', id: 'bb', title: 'Section B-B', href: 'r51e-sections.html', svg: 'imgs/r51e-section-bb.svg' },
    { no: 'A-401', id: 'massing', title: 'Architectural massing', href: 'r51e-architectural-massing.html', svg: 'imgs/r51e-architectural-massing.svg' },
    { no: 'A-402', id: 'axon', title: 'Same-camera axon lock', href: 'r51e-axon-lock.html', svg: 'imgs/r51e-axon-lock-clean.svg' },
  ]);

  const C = Object.freeze({
    paper: '#f4f1ea',
    ink: '#0d1b33',
    muted: '#5a6570',
    dim: '#3a4550',
    ok: '#416145',
    rule: '#cfc8be',
    block: '#efe8dc',
  });

  const W = Object.freeze({
    ground: 2.2,
    building: 1.15,
    dim: 0.9,
    tick: 0.9,
  });

  const TITLE_H = 56;
  const HEAD_H = 52;
  const MARGIN = 12;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function n(v, d = 1) {
    return Number(v).toFixed(d);
  }

  /**
   * Presentation-only shortening. Source labels in plan-closure stay frozen.
   */
  function shortLabel(s) {
    const map = {
      'LIVING A PENN limited': 'LIVING A',
      'LIVING/DINING B N': 'LIVING B',
      'LIVING B N': 'LIVING B',
      'GARAGE DOOR A 16′': '16′ DOOR A',
      'GARAGE DOOR B 16′': '16′ DOOR B',
      'DOOR B 16′ E (sliver)': '16′ B',
      'DOOR A 16′ E': '16′ A',
      'PERSONNEL A': 'PERS. A',
      'LIVING A S': 'LIVING A',
      'BED 1 A S': 'BED 1 A',
      'BED 2 A S': 'BED 2 A',
      'BED 3 A S': 'BED 3 A',
      'BED 1 B S': 'BED 1 B',
      'BED 2 B S': 'BED 2 B',
      'APPENDAGE · CANOPY A': 'CANOPY A',
      'APPENDAGE · EYEBROW B': 'EYEBROW B',
    };
    return map[s] || s;
  }

  function dimV(x, y0, y1, label, side) {
    const mid = (y0 + y1) / 2;
    const tx = side === 'left' ? x - 7 : x + 7;
    return `<g class="dim">
      <line x1="${n(x)}" y1="${n(y0)}" x2="${n(x)}" y2="${n(y1)}" stroke="${C.dim}" stroke-width="${W.dim}"/>
      <line x1="${n(x - 4)}" y1="${n(y0)}" x2="${n(x + 4)}" y2="${n(y0)}" stroke="${C.dim}" stroke-width="${W.tick}"/>
      <line x1="${n(x - 4)}" y1="${n(y1)}" x2="${n(x + 4)}" y2="${n(y1)}" stroke="${C.dim}" stroke-width="${W.tick}"/>
      <text transform="rotate(-90 ${n(tx)} ${n(mid)})" x="${n(tx)}" y="${n(mid)}" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="800" fill="${C.ink}">${esc(label)}</text>
    </g>`;
  }

  function dimH(x0, x1, y, label, side) {
    const mid = (x0 + x1) / 2;
    const ty = side === 'above' ? y - 5 : y + 12;
    return `<g class="dim">
      <line x1="${n(x0)}" y1="${n(y)}" x2="${n(x1)}" y2="${n(y)}" stroke="${C.dim}" stroke-width="${W.dim}"/>
      <line x1="${n(x0)}" y1="${n(y - 4)}" x2="${n(x0)}" y2="${n(y + 4)}" stroke="${C.dim}" stroke-width="${W.tick}"/>
      <line x1="${n(x1)}" y1="${n(y - 4)}" x2="${n(x1)}" y2="${n(y + 4)}" stroke="${C.dim}" stroke-width="${W.tick}"/>
      <text x="${n(mid)}" y="${n(ty)}" text-anchor="middle" font-size="9" font-weight="800" fill="${C.ink}">${esc(label)}</text>
    </g>`;
  }

  function cornerStamp(vbW, vbH, no) {
    return `<g class="rev-stamp">
      <text x="${vbW - 14}" y="18" text-anchor="end" font-size="9" font-weight="900" fill="${C.ink}">${esc(no || 'A-401')} · ${esc(REV.id)}</text>
      <text x="${vbW - 14}" y="32" text-anchor="end" font-size="8" font-weight="800" fill="${C.ok}">${esc(REV.status)}</text>
    </g>`;
  }

  function svg(opts) {
    const w = opts.w;
    const h = opts.h;
    const no = opts.no || '';
    const title = opts.title || '';
    const subtitle = opts.subtitle || '';
    const note = opts.note || '';
    const verdict = opts.verdict || '';
    const body = opts.body || '';
    const aria = opts.aria || title;
    const tbX = w - 8 - 228;
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(aria)}">
  <rect width="${w}" height="${h}" fill="${C.paper}"/>
  <rect x="8" y="8" width="${w - 16}" height="${h - 16}" fill="none" stroke="${C.rule}" stroke-width="1.05"/>
  <text x="18" y="28" font-size="14" font-weight="800" fill="${C.ink}">${esc(title)}</text>
  <text x="18" y="44" font-size="10" fill="${C.muted}">${esc(subtitle)}</text>
  <text x="${w - 18}" y="26" text-anchor="end" font-size="12" font-weight="900" fill="${C.ink}">${esc(no)}</text>
  <text x="${w - 18}" y="42" text-anchor="end" font-size="9" font-weight="800" fill="${C.ok}">${esc(verdict)} · ${esc(REV.id)}</text>
  ${body}
  <rect x="8" y="${h - 8 - TITLE_H}" width="${w - 16}" height="${TITLE_H}" fill="${C.block}" stroke="${C.rule}" stroke-width="1"/>
  <line x1="${tbX}" y1="${h - 8 - TITLE_H}" x2="${tbX}" y2="${h - 8}" stroke="${C.rule}"/>
  <text x="18" y="${h - 8 - TITLE_H + 18}" font-size="9" fill="${C.muted}">${esc(note)}</text>
  <text x="18" y="${h - 8 - TITLE_H + 34}" font-size="8" fill="${C.muted}">${esc(REV.pending)}</text>
  <text x="18" y="${h - 8 - TITLE_H + 48}" font-size="8" fill="${C.muted}">Geometry ${esc(REV.geometry)} · presentation only on this pass · ${esc(REV.notPermit)}</text>
  <text x="${w - 18}" y="${h - 8 - TITLE_H + 16}" text-anchor="end" font-size="9" font-weight="800" fill="${C.ink}">${esc(REV.project)}</text>
  <text x="${w - 18}" y="${h - 8 - TITLE_H + 32}" text-anchor="end" font-size="12" font-weight="900" fill="${C.ink}">${esc(REV.status)}</text>
  <text x="${w - 18}" y="${h - 8 - TITLE_H + 46}" text-anchor="end" font-size="8" fill="${C.muted}">${esc(REV.id)} · ${esc(REV.date)}</text>
</svg>`;
  }

  return {
    REV,
    SHEETS,
    C,
    W,
    TITLE_H,
    HEAD_H,
    MARGIN,
    esc,
    n,
    shortLabel,
    dimV,
    dimH,
    cornerStamp,
    svg,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eSheet;
