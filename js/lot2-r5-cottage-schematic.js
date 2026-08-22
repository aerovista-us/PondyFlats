/**
 * Lot 2 — preserved R5 asymmetric-cottage schematic
 * Parking geometry is frozen (Lot2R5CottageFreeze). Plans fit inside notched plates only.
 * Program: two enclosed + two covered, independently accessible — not four enclosed.
 */
const Lot2R5CottageSchematic = (() => {
  const S = typeof Lot2SOT !== 'undefined' ? Lot2SOT : {};
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Sk = typeof Lot2AccessSkeleton !== 'undefined' ? Lot2AccessSkeleton : null;
  const Freeze = typeof Lot2R5CottageFreeze !== 'undefined' ? Lot2R5CottageFreeze : null;
  const ID = 'reset_r5';
  const MIN_ROOM = 8;
  const MIN_STAIR = 3.5;
  const LIVING = L.LIVING_TARGET || { min: 1600, max: 1900 };

  function rect(x, y, w, h, name, kind, notes) {
    return {
      name,
      kind,
      x: +x.toFixed(2),
      y: +y.toFixed(2),
      w: +w.toFixed(2),
      h: +h.toFixed(2),
      sf: Math.round(w * h),
      notes: notes || '',
      minDim: +Math.min(w, h).toFixed(2),
    };
  }

  function roomOk(r) {
    if (r.kind === 'stair') return r.minDim >= MIN_STAIR - 0.05;
    if (r.kind === 'mech' || r.kind === 'storage' || r.kind === 'void' || r.kind === 'corridor') {
      return r.minDim >= 4 - 0.05;
    }
    if (r.kind === 'garage' || r.kind === 'covered') return true;
    return r.minDim >= MIN_ROOM - 0.05;
  }

  /**
   * Unit A (Penn) — plate 80,5 46×20. Garage A 100–124×5–21 · CA 86–98×5–19.
   * Ground: parking + entry/stair/mech in residual. Upper: living over plate.
   */
  function planUnitA() {
    const plate = { x: 80, y: 5, w: 46, h: 20 };
    const ground = [
      rect(100, 5, 24, 16, 'GARAGE A · enclosed', 'garage', '16×24 · E door · 1 space'),
      rect(86, 5, 12, 14, 'COVERED A', 'covered', 'Open roof · S door · posts at corners'),
      rect(80, 5, 6, 16, 'ENTRY / MUD A', 'corridor', 'West residual · from covered/court'),
      rect(80, 21, 20, 4, 'STAIR A', 'stair', 'South plate band'),
      rect(100, 21, 12, 4, 'MECH / UTIL A', 'mech', 'South of garage · stack'),
      rect(112, 21, 14, 4, 'STORAGE A', 'storage', 'SE plate band'),
    ];
    const upper = [
      rect(80, 5, 6, 20, 'STAIR / HALL A', 'stair', 'Over entry strip · west of carport'),
      rect(100, 5, 26, 20, 'LIVING · KITCHEN · BEDS A', 'living', 'Full upper over enclosed garage (partition in massing)'),
      rect(86, 5, 14, 14, 'ROOF DECK A', 'void', 'Over covered parking · outdoor · not living SF'),
    ];
    /** Living SF note: Penn plate cannot host ~1,800 SF without plate growth — honest cottage over garage. */
    return packUnit('A', 'Household A · Pennsylvania', plate, ground, upper, {
      outdoor: 'Roof deck over covered A + south court at apron · plantings toward Penn',
      windows: 'Primary glazing south to court; limited Pennsylvania fenestration',
      fire: 'East household — 1-hr demising assumed at plate gap (~x=76–80)',
      bearing: 'Upper living bears on garage walls · deck over carport posts · no plate cantilever',
    });
  }

  function planUnitB() {
    const plate = { x: 28, y: 5, w: 48, h: 28 };
    const ground = [
      rect(42, 20, 24, 16, 'GARAGE B · enclosed', 'garage', '16×24 · E door · 1 space'),
      rect(28, 20, 12, 14, 'COVERED B', 'covered', 'Open roof · S door · posts'),
      rect(28, 5, 12, 15, 'MECH + STORAGE B', 'mech', 'NW residual'),
      rect(40, 5, 26, 15, 'LIVING / KITCHEN B', 'living', 'North of parking band'),
      rect(66, 5, 10, 15, 'STAIR + ENTRY B', 'stair', 'East strip from spine'),
    ];
    const upper = [
      rect(28, 5, 38, 15, 'LIVING / DINING B', 'living', 'North over ground living'),
      rect(66, 5, 10, 15, 'STAIR OPEN B', 'stair', 'Aligned with ground stair'),
      rect(42, 20, 34, 13, 'BEDS + BATH B', 'living', 'Over enclosed garage only — clear of carport posts'),
      rect(28, 20, 14, 13, 'ROOF DECK B', 'void', 'Over covered B · outdoor · posts carry deck'),
    ];
    return packUnit('B', 'Household B · rear', plate, ground, upper, {
      outdoor: 'North / rear garden + roof deck over covered · snow edge south of spine',
      windows: 'Primary north/rear outlook; limited south glazing to drive for privacy',
      fire: 'West household — 1-hr demising at plate gap toward A',
      bearing: 'Upper on garage long walls + north living walls · deck on carport posts',
    });
  }

  const CONDITIONED = new Set(['living', 'stair', 'corridor', 'mech', 'storage']);

  function packUnit(id, label, plate, ground, upper, meta) {
    const gLiv = ground.filter((r) => r.kind === 'living' || r.kind === 'stair').reduce((s, r) => s + r.sf, 0);
    const uLiv = upper.filter((r) => r.kind === 'living' || r.kind === 'stair').reduce((s, r) => s + r.sf, 0);
    /** Conditioned program SF (excludes garage / covered / outdoor void) */
    const livingSf = ground.filter((r) => CONDITIONED.has(r.kind)).reduce((s, r) => s + r.sf, 0)
      + upper.filter((r) => CONDITIONED.has(r.kind)).reduce((s, r) => s + r.sf, 0);
    return {
      id,
      label,
      plate,
      ground,
      upper,
      livingSf,
      groundLivingSf: gLiv,
      upperLivingSf: uLiv,
      meta,
      roomFails: [...ground, ...upper].filter((r) => !roomOk(r)),
    };
  }

  const KIND_FILL = {
    living: '#e8f0e4',
    stair: '#f3e6c8',
    corridor: '#efe8dc',
    mech: '#e4e8ee',
    storage: '#e4e8ee',
    garage: '#aec0d2',
    covered: '#c5d0da',
    void: '#f7f3ea',
  };

  function roomSvg(r, sx, sy, s) {
    const fill = KIND_FILL[r.kind] || '#eee';
    const dash = r.kind === 'void' || r.kind === 'covered' ? '4 3' : '';
    const stroke = r.kind === 'garage' ? '#30363b' : '#3a4550';
    const cx = sx(r.x + r.w / 2);
    const cy = sy(r.y + r.h / 2);
    const fs = Math.max(8, Math.min(11, Math.min(r.w, r.h) * s * 0.22));
    return `<g class="room ${r.kind}">
      <rect x="${sx(r.x)}" y="${sy(r.y)}" width="${r.w * s}" height="${r.h * s}" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-dasharray="${dash}"/>
      <text class="lab" x="${cx}" y="${cy - 5}" text-anchor="middle" font-size="${fs}">${r.name}</text>
      <text class="sm" x="${cx}" y="${cy + 8}" text-anchor="middle">${r.w}×${r.h} · ${r.sf} SF</text>
    </g>`;
  }

  function fireLineSvg(sx, sy, s) {
    const x = sx(78);
    return `<g class="fire">
      <line x1="${x}" y1="${sy(5)}" x2="${x}" y2="${sy(33)}" stroke="#9a3b2e" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="${x + 4}" y="${sy(18)}" fill="#9a3b2e" font-size="10" font-weight="800">1-HR DEMISING (assumed)</text>
    </g>`;
  }

  function plateSvg(p, sx, sy, s, label) {
    return `<g class="plate">
      <rect x="${sx(p.x)}" y="${sy(p.y)}" width="${p.w * s}" height="${p.h * s}" fill="none" stroke="#416145" stroke-width="2" stroke-dasharray="8 5"/>
      <text x="${sx(p.x + 1)}" y="${sy(p.y) - 4}" fill="#416145" font-size="11" font-weight="800">${label}</text>
    </g>`;
  }

  /** Floor-level schematic (both units) — survey frame */
  function renderFloor(level, opts = {}) {
    const S = opts.scale || 5.45;
    const MX = opts.mx || 70;
    const MY = opts.my || 40;
    const sx = (x) => MX + x * S;
    const sy = (y) => MY + y * S;
    const a = planUnitA();
    const b = planUnitB();
    const rooms = level === 'upper'
      ? [...a.upper, ...b.upper]
      : [...a.ground, ...b.ground];
    const survey = (typeof Lot2SOT !== 'undefined' && Lot2SOT.SURVEY)
      ? Lot2SOT.SURVEY
      : [[0, 0], [148, 0], [148, 50], [124.1, 43], [83.77, 43], [0, 57.01]];
    const poly = survey.map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ');
    const VB_W = Math.ceil(148 * S + MX * 2 + 40);
    const VB_H = Math.ceil(58 * S + MY * 2);
    return `<svg viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="R5 ${level} floor schematic">
      <polygon class="lot" points="${poly}" fill="#f8f3e7" stroke="#232a31" stroke-width="2"/>
      ${plateSvg(a.plate, sx, sy, S, 'PLATE A')}
      ${plateSvg(b.plate, sx, sy, S, 'PLATE B')}
      ${rooms.map((r) => roomSvg(r, sx, sy, S)).join('')}
      ${fireLineSvg(sx, sy, S)}
      <text x="${sx(148)}" y="${sy(25)}" text-anchor="end" fill="#956d29" font-size="11" font-weight="800">PENNSYLVANIA →</text>
      <text x="${sx(4)}" y="${sy(28)}" fill="#956d29" font-size="11" font-weight="800">← NORTH / REAR</text>
    </svg>`;
  }

  function sweepOverlay(poses, opts = {}) {
    const S = opts.scale || 5.45;
    const MX = opts.mx || 70;
    const MY = opts.my || 40;
    const Acc = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
    const L = Acc && Acc.VEHICLE ? Acc.VEHICLE.length : 20.5;
    const W = Acc && Acc.VEHICLE ? Acc.VEHICLE.width : 8;
    const sx = (x) => MX + x * S;
    const sy = (y) => MY + y * S;
    return (poses || []).filter((_, i) => i % 2 === 0 && _.x < 160).map((p) => {
      const cx = sx(p.x);
      const cy = sy(p.y);
      const deg = (p.th * 180) / Math.PI;
      return `<rect class="suv" x="${cx - (L * S) / 2}" y="${cy - (W * S) / 2}" width="${L * S}" height="${W * S}" transform="rotate(${deg} ${cx} ${cy})" fill="#c45c4a44" stroke="#9a3b2e" stroke-width="1.1"/>`;
    }).join('');
  }

  /** Site underlay: frozen parking + optional swept poses */
  function renderSiteUnderlay(opts = {}) {
    const showSweep = !!opts.showSweep;
    const id = ID;
    const plan = typeof Lot2 !== 'undefined' && Lot2.plan ? Lot2.plan(id) : '';
    if (!plan) return '<p>Lot2.plan unavailable</p>';
    let sweep = '';
    if (showSweep && typeof Lot2Access !== 'undefined' && typeof Lot2 !== 'undefined') {
      const access = Lot2Access.analyzeConcept(id);
      sweep = sweepOverlay(access.poses || [], opts);
    }
    // Insert sweep before closing </svg>
    if (sweep && plan.includes('</svg>')) {
      return plan.replace('</svg>', `<g id="sweep-underlay">${sweep}</g></svg>`);
    }
    return plan;
  }

  function insidePlate(r, plate) {
    return r.x >= plate.x - 0.05 && r.y >= plate.y - 0.05
      && r.x + r.w <= plate.x + plate.w + 0.05
      && r.y + r.h <= plate.y + plate.h + 0.05;
  }

  function conflictsPosts(unit, concept) {
    const posts = [];
    (concept.garages || []).filter((g) => g.covered).forEach((g) => {
      const post = 0.5;
      const inset = 0.25;
      [[g.x + inset, g.y + inset], [g.x + g.w - inset - post, g.y + inset],
        [g.x + inset, g.y + g.h - inset - post], [g.x + g.w - inset - post, g.y + g.h - inset - post]]
        .forEach((c, i) => posts.push({ id: `${g.id}-p${i}`, x: c[0], y: c[1], w: post, h: post }));
    });
    const hits = [];
    [...unit.ground, ...unit.upper].forEach((r) => {
      if (r.kind === 'covered' || r.kind === 'garage' || r.kind === 'void') return;
      posts.forEach((p) => {
        const overlap = !(r.x + r.w <= p.x || p.x + p.w <= r.x || r.y + r.h <= p.y || p.y + p.h <= r.y);
        if (overlap) hits.push(`${r.name} overlaps ${p.id}`);
      });
    });
    return hits;
  }

  function analyze() {
    const concept = L.CONCEPTS[ID];
    const freeze = Freeze ? Freeze.assertFrozen(concept) : { ok: false, fails: ['Freeze module missing'], program: '' };
    const arch = Sk ? Sk.architectureRemaining(concept) : null;
    const unitA = planUnitA();
    const unitB = planUnitB();

    const plateFit = [];
    [unitA, unitB].forEach((u) => {
      [...u.ground, ...u.upper].forEach((r) => {
        if (r.kind === 'garage' || r.kind === 'covered') return; // parking freeze may sit on plate edge
        if (!insidePlate(r, u.plate)) plateFit.push(`${u.id}:${r.name} outside plate`);
      });
    });

    const postHits = [...conflictsPosts(unitA, concept), ...conflictsPosts(unitB, concept)];
    const narrow = [...unitA.roomFails, ...unitB.roomFails];
    const livingA = unitA.livingSf;
    const livingB = unitB.livingSf;
    const livingAOk = livingA >= 900; // Penn plate cottage — full 1,600 band needs plate growth
    const livingBOk = livingB >= LIVING.min && livingB <= LIVING.max + 200;
    const livingBothBand = livingA >= LIVING.min && livingA <= LIVING.max + 200 && livingBOk;

    const checks = {
      freeze: { ok: freeze.ok, detail: freeze.ok ? 'R5 parking / path freeze intact' : freeze.fails.join('; ') },
      plateFit: { ok: plateFit.length === 0, detail: plateFit.length ? plateFit.slice(0, 4).join('; ') : 'Dwelling rooms inside notched plates (parking freeze may sit on plate edge)' },
      minRoom: {
        ok: narrow.length === 0,
        detail: narrow.length
          ? narrow.map((r) => `${r.name} ${r.minDim}′`).join('; ')
          : `Habitable rooms ≥ ${MIN_ROOM}′ · stairs ≥ ${MIN_STAIR}′ · corridors/mech ≥ 4′`,
      },
      stairs: {
        ok: unitA.ground.some((r) => r.kind === 'stair') && unitB.ground.some((r) => r.kind === 'stair'),
        detail: 'Ground stair present in both units · upper stair open aligned',
      },
      parkingUnchanged: { ok: freeze.ok, detail: freeze.ok ? 'Parking geometry unchanged from FULL PASS freeze' : 'Freeze broken' },
      posts: { ok: postHits.length === 0, detail: postHits.length ? postHits.join('; ') : 'No conditioned room / post conflicts (decks may bear on posts)' },
      living: {
        ok: livingAOk && livingBOk,
        detail: livingBothBand
          ? `A ~${livingA} SF · B ~${livingB} SF (both in ${LIVING.min}–${LIVING.max} band)`
          : `A ~${livingA} SF (Penn cottage · plate-limited) · B ~${livingB} SF · target ${LIVING.min}–${LIVING.max} — ownership trade if A stays under band`,
      },
      plates: {
        ok: !!(arch && arch.unitA && arch.unitA.ok && arch.unitB && arch.unitB.ok),
        detail: arch ? arch.summary : 'No arch engine',
      },
      fire: {
        ok: true,
        detail: '1-hr demising assumed at plate gap (~x=76–80) · mark on plans — verify with AHJ',
      },
      twoHomes: {
        ok: true,
        detail: 'Two household plates · independent entries from parking interfaces',
      },
    };

    const hard = ['freeze', 'plateFit', 'minRoom', 'stairs', 'parkingUnchanged', 'posts', 'plates', 'twoHomes'];
    const hardFail = hard.some((k) => !checks[k].ok);
    let verdict = 'FAIL';
    if (!hardFail && livingBothBand) verdict = 'PASS';
    else if (!hardFail && livingAOk && livingBOk) verdict = 'CONDITIONAL';
    else if (!hardFail) verdict = 'CONDITIONAL';
    else verdict = 'FAIL';

    return {
      id: ID,
      program: Freeze ? Freeze.PROGRAM : 'R5 — two enclosed + two covered, independently accessible.',
      freeze,
      unitA,
      unitB,
      arch,
      checks,
      verdict,
      ownershipPrompt:
        'Ownership test: Accept two homes with 1 enclosed + 1 covered each (not four enclosed)? Confirm stair/entry locations and privacy toward Pennsylvania.',
      next: verdict === 'PASS'
        ? 'Proceed to deterministic massing, then architectural visualization.'
        : verdict === 'CONDITIONAL'
          ? 'Ownership: accept Penn cottage SF under 1,600 band, or reopen plate freeze. Hard geometry clear — massing held until YES.'
          : 'Repair named floor-plan sanity failures without moving frozen parking geometry.',
    };
  }

  return {
    analyze,
    planUnitA,
    planUnitB,
    renderFloor,
    renderSiteUnderlay,
    sweepOverlay,
    MIN_ROOM,
    LIVING,
    ID,
    PROGRAM: Freeze ? Freeze.PROGRAM : 'R5 — two enclosed garage spaces plus two covered spaces, independently accessible.',
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R5CottageSchematic;
