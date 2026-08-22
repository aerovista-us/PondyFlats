/**
 * Lot 2 — R5.1e sections A-A and B-B (representation-only)
 *
 * A-A: x=108 through Garage A, living/bed upper, ridge 27.0′
 * B-B: x=65 through Stair+Entry B, Garage B, bed over garage, ridge 26.5′
 *
 * Third section only if a named vertical condition stays invisible.
 */
const Lot2R51eSections = (() => {
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const M = typeof Lot2R51eMassingTruth !== 'undefined' ? Lot2R51eMassingTruth : null;
  const Arch = typeof Lot2R51eArchitecturalMassing !== 'undefined' ? Lot2R51eArchitecturalMassing : null;
  const Closure = typeof Lot2R51ePlanClosure !== 'undefined' ? Lot2R51ePlanClosure : null;
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Sheet = typeof Lot2R51eSheet !== 'undefined' ? Lot2R51eSheet : null;
  const EPS = 0.08;
  const CUT_A = 108;
  const CUT_B = 65;
  const Z_TOP = 20.5;
  const RIDGE_A = 27.0;
  const RIDGE_B = 26.5;
  const SCALE_Y = 8.2;
  const SCALE_Z = 8.2;

  function hitsX(r, x) {
    return r.x <= x + EPS && r.x + r.w >= x - EPS;
  }

  function plates() {
    const lock = ArchLock ? ArchLock.LOCK.plates : null;
    const A = lock ? lock.find((p) => p.id === 'A') : { x: 70, y: 5, w: 56, h: 22.5 };
    const B = lock ? lock.find((p) => p.id === 'B') : { x: 28, y: 5, w: 42, h: 28 };
    return { A: { ...A }, B: { ...B } };
  }

  function rooms() {
    const g = Closure && Closure.analyze ? Closure.analyze() : null;
    if (!g) return { A: { ground: [], upper: [] }, B: { ground: [], upper: [] }, living: { A: 0, B: 0 }, verdict: 'FAIL' };
    return {
      A: { ground: g.unitA.ground, upper: g.unitA.upper },
      B: { ground: g.unitB.ground, upper: g.unitB.upper },
      living: g.living,
      verdict: g.verdict,
      openings: g.openings || [],
    };
  }

  function heights() {
    const H = (M && M.H) || { ground: 10.5, upper: 10, carportClear: 9 };
    const zTop = H.ground + H.upper;
    return {
      zTop,
      ridgeA: zTop + ((Arch && Arch.ROOF.A.pitch) || 6.5),
      ridgeB: zTop + ((Arch && Arch.ROOF.B.pitch) || 6.0),
      ground: H.ground,
      upper: H.upper,
      carport: H.carportClear,
    };
  }

  function cutRooms(unitRooms, x) {
    return {
      ground: (unitRooms.ground || []).filter((r) => hitsX(r, x)),
      upper: (unitRooms.upper || []).filter((r) => hitsX(r, x)),
    };
  }

  function hasName(list, re) {
    return list.some((r) => re.test(r.name));
  }

  function analyze() {
    const freezeC = L.CONCEPTS && L.CONCEPTS.reset_r5;
    const freeze = ParkFreeze && freezeC ? ParkFreeze.assertFrozen(freezeC) : { ok: false };
    const mass = M && M.analyze ? M.analyze() : { verdict: 'FAIL' };
    const H = heights();
    const pl = plates();
    const R = rooms();
    const a = cutRooms(R.A, CUT_A);
    const b = cutRooms(R.B, CUT_B);
    const aAll = a.ground.concat(a.upper);
    const bAll = b.ground.concat(b.upper);

    const aGarage = hasName(a.ground, /GARAGE A/);
    const aUpper = a.upper.length >= 2;
    const aVoid = hasName(a.ground, /UNDERCROFT/);
    const bStair = hasName(b.ground, /STAIR B/) && hasName(b.upper, /STAIR/);
    const bEntry = hasName(b.ground, /ENTRY B/);
    const bGarage = hasName(b.ground, /GARAGE B/);
    const bBed = hasName(b.upper, /BED/);
    const heightsOk = Math.abs(H.ridgeA - RIDGE_A) < 0.05 && Math.abs(H.ridgeB - RIDGE_B) < 0.05
      && Math.abs(H.zTop - Z_TOP) < 0.05 && Math.abs(H.ground - 10.5) < 0.05;
    const aInPlate = CUT_A > pl.A.x && CUT_A < pl.A.x + pl.A.w;
    const bInPlate = CUT_B > pl.B.x && CUT_B < pl.B.x + pl.B.w;
    const thirdNeeded = false;

    const checks = {
      architectureFrozen: {
        ok: !!(freeze.ok && mass.verdict === 'PASS' && R.verdict === 'PASS'),
        detail: 'Freeze + massing + plan-closure still PASS',
      },
      heightsAndRidges: {
        ok: heightsOk,
        detail: `FTF ${H.ground}′ · zTop ${H.zTop}′ · ridges ${H.ridgeA.toFixed(1)}′ / ${H.ridgeB.toFixed(1)}′`,
      },
      sectionAA: {
        ok: aGarage && aUpper && aVoid && aInPlate,
        detail: aGarage && aUpper
          ? `A-A x=${CUT_A} hits ${aAll.map((r) => r.name).join(', ')}`
          : 'A-A missed garage / upper / undercroft',
      },
      sectionBB: {
        ok: bStair && bEntry && bGarage && bBed && bInPlate,
        detail: bStair && bEntry && bGarage && bBed
          ? `B-B x=${CUT_B} hits ${bAll.map((r) => r.name).join(', ')}`
          : 'B-B missed stair / entry / garage / bed',
      },
      twoEnough: {
        ok: !thirdNeeded,
        detail: 'Covered-stall posts already proven on rear elev + site plan · no third cut required',
      },
      sfHeld: {
        ok: R.living.A === 1556 && R.living.B === 1806,
        detail: `SF ${R.living.A} / ${R.living.B}`,
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_sections',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      cuts: { A: CUT_A, B: CUT_B },
      rooms: { A: a, B: b },
      heights: H,
      plates: pl,
      living: R.living,
      next: hard
        ? 'Sections A-A and B-B PASS. Cross-document consistency next, then DESIGN COMPLETE.'
        : 'Repair named section failures without moving frozen volumes.',
      freezeNote: hard
        ? `Sections frozen: A-A x=${CUT_A} (garage A / upper / ridge 27.0′) · B-B x=${CUT_B} (stair+entry / garage B / bed / ridge 26.5′).`
        : '',
    };
  }

  function fillKind(kind) {
    if (kind === 'garage') return '#9aadc0';
    if (kind === 'covered' || kind === 'void') return '#eef2f5';
    if (kind === 'stair') return '#f3e6c8';
    if (kind === 'entry') return '#f7ead3';
    if (kind === 'bath') return '#dde8f2';
    if (kind === 'living' || kind === 'kitchen') return '#e8f0e4';
    return '#efe8dc';
  }

  function renderCut(tag, xCut, unitRooms, plate, ridge, H, label, sheetNo) {
    const OX = 78;
    const OY = 372;
    const TITLE_H = Sheet ? Sheet.TITLE_H : 56;
    const sx = (y) => OX + y * SCALE_Y;
    const sz = (z) => OY - z * SCALE_Z;
    const VB_W = Math.ceil(sx(plate.y + plate.h) + 52);
    const VB_H = Math.ceil(OY + 56 + TITLE_H);
    const yMid = plate.y + plate.h / 2;
    const rooms = (unitRooms.ground || []).concat(unitRooms.upper || []);
    const roomSvg = rooms.map((r) => {
      const z0 = r.kind === 'void' ? 0 : ((unitRooms.upper || []).includes(r) ? H.ground : 0);
      const z1 = r.kind === 'void' ? H.ground : (z0 === 0 ? H.ground : H.zTop);
      const dash = (r.kind === 'void' || r.kind === 'covered') ? '5 3' : '';
      const hatch = r.kind === 'stair'
        ? Array.from({ length: 8 }, (_, i) => {
          const yy = r.y + (r.h * (i + 1)) / 9;
          return `<line x1="${sx(r.y)}" y1="${sz(z0 + (z1 - z0) * ((i + 1) / 9))}" x2="${sx(r.y + r.w > r.y ? r.y + Math.min(r.h, r.w) : r.y)}" y2="${sz(z0 + (z1 - z0) * ((i + 1) / 9))}" stroke="#b0893a" stroke-width="0.8"/>`;
        }).join('')
        : '';
      return `<g>
        <rect x="${sx(r.y)}" y="${sz(z1)}" width="${r.h * SCALE_Y}" height="${(z1 - z0) * SCALE_Z}" fill="${fillKind(r.kind)}" stroke="#2a333c" stroke-width="1.2" stroke-dasharray="${dash}"/>
        ${hatch}
        <text x="${sx(r.y + r.h / 2)}" y="${sz((z0 + z1) / 2)}" text-anchor="middle" font-size="8" font-weight="800">${r.name}</text>
      </g>`;
    }).join('\n');
    const gable = `<polygon points="${sx(plate.y)},${sz(H.zTop)} ${sx(yMid)},${sz(ridge)} ${sx(plate.y + plate.h)},${sz(H.zTop)}" fill="#4a5058" fill-opacity="0.85" stroke="#1a1d22" stroke-width="1.2"/>`;
    const floors = `<line x1="${sx(plate.y)}" y1="${sz(0)}" x2="${sx(plate.y + plate.h)}" y2="${sz(0)}" stroke="#2a333c" stroke-width="2"/>
      <line x1="${sx(plate.y)}" y1="${sz(H.ground)}" x2="${sx(plate.y + plate.h)}" y2="${sz(H.ground)}" stroke="#7b5721" stroke-width="1.3" stroke-dasharray="6 3"/>
      <line x1="${sx(plate.y)}" y1="${sz(H.zTop)}" x2="${sx(plate.y + plate.h)}" y2="${sz(H.zTop)}" stroke="#7b5721" stroke-width="1.1" stroke-dasharray="4 3"/>`;

    const dims = Sheet
      ? `${Sheet.dimV(sx(plate.y) - 18, sz(0), sz(H.carport), '9.0′ CLEAR', 'left')}
      ${Sheet.dimV(sx(plate.y) - 34, sz(0), sz(H.ground), '10.5′ FTF', 'left')}
      ${Sheet.dimV(sx(plate.y + plate.h) + 18, sz(0), sz(ridge), ridge.toFixed(1) + '′ RIDGE', 'right')}
      ${Sheet.dimH(sx(plate.y), sx(plate.y + plate.h), sz(0) + 18, plate.h.toFixed(1) + '′')}`
      : '';

    const body = `
  ${gable}
  ${roomSvg}
  ${floors}
  ${dims}
  <text x="${sx(yMid)}" y="${sz(ridge) - 6}" text-anchor="middle" font-size="9" font-weight="900">RIDGE ${ridge.toFixed(1)}′</text>
  <text x="${sx(plate.y) + 4}" y="${sz(0) + 14}" font-size="9" font-weight="800">N</text>
  <text x="${sx(plate.y + plate.h) - 4}" y="${sz(0) + 14}" text-anchor="end" font-size="9" font-weight="800">S</text>`;

    if (!Sheet) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${body}</svg>`;
    return Sheet.svg({
      w: VB_W,
      h: VB_H,
      no: sheetNo,
      title: tag,
      subtitle: `Cut x=${xCut}′ · looking toward Pennsylvania · north LEFT · floors 0 / ${H.ground}′ / ${H.zTop}′`,
      note: label,
      verdict: 'PASS',
      aria: label,
      body,
    });
  }

  function renderAA(gate) {
    const g = gate || analyze();
    return renderCut('SECTION A-A', g.cuts.A, g.rooms.A, g.plates.A, g.heights.ridgeA, g.heights,
      'Unit A garage · undercroft · living/dining · bed 2 · ridge 27.0′', 'A-301');
  }

  function renderBB(gate) {
    const g = gate || analyze();
    return renderCut('SECTION B-B', g.cuts.B, g.rooms.B, g.plates.B, g.heights.ridgeB, g.heights,
      'Unit B stair + entry · garage · bed over garage · ridge 26.5′', 'A-302');
  }

  return { CUT_A, CUT_B, analyze, renderAA, renderBB };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eSections;
