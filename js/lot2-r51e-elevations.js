/**
 * Lot 2 — R5.1e remaining elevations (rear/west · north · south)
 *
 * Representation-only. Inherits plates, heights, ridges, posts, plan-closure
 * openings. Does not invent glass. North LEFT on west elev; Penn RIGHT on
 * north/south elevs (same as the locked plan).
 */
const Lot2R51eElevations = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const M = typeof Lot2R51eMassingTruth !== 'undefined' ? Lot2R51eMassingTruth : null;
  const Arch = typeof Lot2R51eArchitecturalMassing !== 'undefined' ? Lot2R51eArchitecturalMassing : null;
  const Closure = typeof Lot2R51ePlanClosure !== 'undefined' ? Lot2R51ePlanClosure : null;
  const Sheet = typeof Lot2R51eSheet !== 'undefined' ? Lot2R51eSheet : null;
  const PARENT = 'reset_r5';
  const EPS = 0.05;
  const Z_TOP = 20.5;
  const RIDGE_A = 27.0;
  const RIDGE_B = 26.5;
  const STONE_Z = 3;
  const SCALE_Y = 8.2;
  const SCALE_Z = 8.2;
  const SCALE_X = 5.45;
  const POST = 0.5;
  const POST_INSET = 0.25;

  function sameRect(a, b, eps = EPS) {
    return a && b
      && Math.abs(a.x - b.x) <= eps && Math.abs(a.y - b.y) <= eps
      && Math.abs(a.w - b.w) <= eps && Math.abs(a.h - b.h) <= eps;
  }

  function fills(kind) {
    if (kind === 'garage') return { face: '#6e7a88', stroke: '#2a333c' };
    if (kind === 'post' || kind === 'undercroft' || kind === 'slab' || kind === 'covered') {
      return { face: '#c8d0d6', stroke: '#5a6570' };
    }
    if (kind === 'ground') return { face: '#cfc6b6', stroke: '#2a333c' };
    if (kind === 'upper') return { face: '#e6e0d4', stroke: '#2a333c' };
    if (kind === 'hidden') return { face: 'none', stroke: '#7a8794' };
    return { face: '#ddd5c5', stroke: '#2a333c' };
  }

  function plates() {
    const lock = ArchLock ? ArchLock.LOCK.plates : null;
    const A = lock ? lock.find((p) => p.id === 'A') : { x: 70, y: 5, w: 56, h: 22.5 };
    const B = lock ? lock.find((p) => p.id === 'B') : { x: 28, y: 5, w: 42, h: 28 };
    return { A: { ...A }, B: { ...B }, demisingX: 70 };
  }

  function planOps() {
    const g = Closure && Closure.analyze ? Closure.analyze() : { openings: [], windows: [] };
    return {
      openings: (g.openings || []).slice(),
      windows: (g.windows || []).slice(),
      living: g.living || { A: 1556, B: 1806 },
      verdict: g.verdict,
    };
  }

  function freezeGarages() {
    const F = ParkFreeze ? ParkFreeze.FREEZE : null;
    return (F ? F.garages : []).map((g) => ({ ...g }));
  }

  function postsFor(g) {
    const p = POST;
    const i = POST_INSET;
    return [
      { x: g.x + i, y: g.y + i, w: p, h: p },
      { x: g.x + g.w - i - p, y: g.y + i, w: p, h: p },
      { x: g.x + i, y: g.y + g.h - i - p, w: p, h: p },
      { x: g.x + g.w - i - p, y: g.y + g.h - i - p, w: p, h: p },
    ];
  }

  function gableZ(plate, ridge, y) {
    const y0 = plate.y;
    const y1 = plate.y + plate.h;
    const mid = (y0 + y1) / 2;
    const half = (y1 - y0) / 2;
    if (y < y0 - EPS || y > y1 + EPS) return null;
    const t = 1 - Math.abs(y - mid) / half;
    return Z_TOP + (ridge - Z_TOP) * Math.max(0, t);
  }

  function massItems() {
    const mass = M && M.analyze ? M.analyze() : { items: [], verdict: 'FAIL' };
    return mass;
  }

  function heights() {
    const H = (M && M.H) || { ground: 10.5, upper: 10, carportClear: 9 };
    const zTop = H.ground + H.upper;
    const ridgeA = zTop + ((Arch && Arch.ROOF.A.pitch) || 6.5);
    const ridgeB = zTop + ((Arch && Arch.ROOF.B.pitch) || 6.0);
    return { zTop, ridgeA, ridgeB, carport: H.carportClear, ground: H.ground, upper: H.upper, stone: STONE_Z };
  }

  function frozenBase() {
    const freezeC = L.CONCEPTS && L.CONCEPTS[PARENT];
    const freeze = ParkFreeze && freezeC ? ParkFreeze.assertFrozen(freezeC) : { ok: false, fails: ['missing'] };
    const mass = massItems();
    const arch = Arch && Arch.analyze ? Arch.analyze() : { verdict: 'FAIL' };
    const H = heights();
    const pl = plates();
    const heightsOk = Math.abs(H.zTop - Z_TOP) < EPS
      && Math.abs(H.ridgeA - RIDGE_A) < EPS
      && Math.abs(H.ridgeB - RIDGE_B) < EPS;
    return { freeze, mass, arch, H, pl, heightsOk };
  }

  function westFaces(items) {
    return (items || []).map((it) => ({
      id: it.id,
      kind: it.kind,
      unit: it.unit,
      westX: +it.rect.x.toFixed(2),
      y0: it.rect.y,
      y1: it.rect.y + it.rect.h,
      z0: it.z0,
      z1: it.z1,
      rect: it.rect,
    })).sort((a, b) => b.westX - a.westX);
  }

  function northFaces(items) {
    return (items || []).map((it) => ({
      id: it.id,
      kind: it.kind,
      unit: it.unit,
      northY: +it.rect.y.toFixed(2),
      x0: it.rect.x,
      x1: it.rect.x + it.rect.w,
      z0: it.z0,
      z1: it.z1,
      rect: it.rect,
    })).sort((a, b) => b.northY - a.northY);
  }

  function southFaces(items) {
    return (items || []).map((it) => ({
      id: it.id,
      kind: it.kind,
      unit: it.unit,
      southY: +(it.rect.y + it.rect.h).toFixed(2),
      x0: it.rect.x,
      x1: it.rect.x + it.rect.w,
      z0: it.z0,
      z1: it.z1,
      rect: it.rect,
    })).sort((a, b) => a.southY - b.southY);
  }

  function analyzeRear() {
    const base = frozenBase();
    const ops = planOps();
    const gars = freezeGarages();
    const coveredB = gars.find((g) => g.id === 'CB');
    const faces = westFaces(base.mass.items || []);
    const bFace = faces.filter((f) => f.westX <= 28.05 && (f.unit === 'B' || (f.rect && f.rect.x <= 28.05)));
    const westWin = ops.windows.filter((w) => w.wall === 'W');
    const westDoors = ops.openings.filter((o) => o.wall === 'W');
    const demisingHit = ops.openings.concat(ops.windows).some((o) => {
      if (o.wall === 'W' && Math.abs(o.x - 70) < 0.2) return true;
      if (o.wall === 'E' && Math.abs(o.x - 70) < 0.2) return true;
      return false;
    });
    const meet = Math.abs((base.pl.B.x + base.pl.B.w) - base.pl.A.x) < EPS
      && Math.abs(base.pl.A.x - 70) < EPS;
    const bSpan = Math.abs(base.pl.B.h - 28) < EPS;
    const aHiddenY = base.pl.A.h;
    const peekY = 16.25;
    const aZ = gableZ(base.pl.A, RIDGE_A, peekY);
    const bZ = gableZ(base.pl.B, RIDGE_B, peekY);
    const peek = aZ != null && bZ != null && aZ > bZ + 0.2;
    const posts = coveredB ? postsFor(coveredB) : [];
    const stairOnWest = ops.openings.some((o) => o.wall === 'W' && (o.kind === 'entry' || o.kind === 'stair'));

    const checks = {
      architectureFrozen: {
        ok: base.freeze.ok && base.mass.verdict === 'PASS' && base.arch.verdict === 'PASS',
        detail: 'Massing + architectural freeze held',
      },
      bFullRear: {
        ok: bSpan && bFace.length > 0,
        detail: `Unit B west face full ${base.pl.B.h}′ (y=${base.pl.B.y}–${base.pl.B.y + base.pl.B.h}) · not the Penn sliver`,
      },
      abDepthUnchanged: {
        ok: meet && Math.abs(base.pl.A.w - 56) < EPS && Math.abs(base.pl.B.w - 42) < EPS,
        detail: meet
          ? `B east ${base.pl.B.x + base.pl.B.w} meets A west ${base.pl.A.x} at demising · A ${aHiddenY}′ of 22.5′ occluded in Y`
          : 'A/B depth or demising drifted',
      },
      heightsAndRidges: {
        ok: base.heightsOk,
        detail: `Opposite orthographic · ridge A ${base.H.ridgeA.toFixed(1)}′ / B ${base.H.ridgeB.toFixed(1)}′`,
      },
      ridgePeek: {
        ok: peek,
        detail: peek
          ? `Ridge A ${aZ.toFixed(1)}′ peeks over B ${bZ.toFixed(1)}′ at y=${peekY} without moving plates`
          : 'A/B ridge relationship lost',
      },
      demisingBlank: {
        ok: !demisingHit,
        detail: !demisingHit ? 'No openings on x=70' : 'Opening on demising',
      },
      openingsFromPlan: {
        ok: westWin.length === 0 && westDoors.length === 0 && !stairOnWest,
        detail: 'No west-wall doors/windows in plan-closure — none drawn. B living glass is north-wall (north elev).',
      },
      coveredInherited: {
        ok: !!(coveredB && sameRect(coveredB, { x: 28, y: 20, w: 12, h: 14 }) && posts.length === 4 && !coveredB.enclosed),
        detail: coveredB && !coveredB.enclosed
          ? 'COVERED B 28,20 12×14 · 4 posts · stays open'
          : 'Covered B redesigned',
      },
      representationOnly: {
        ok: true,
        detail: 'Orthographic west face · north LEFT · no photoreal',
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_rear_elev',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      faces,
      heights: base.H,
      plates: base.pl,
      coveredB,
      posts,
      living: ops.living,
      next: hard
        ? 'Rear/west elevation PASS — freeze this SVG. North + south elevations next (mechanical).'
        : 'Repair named rear-elevation failures without moving frozen volumes.',
      freezeNote: hard
        ? `Rear elevation frozen: B full west face 28′ · A behind at x=70 · ridges ${base.H.ridgeA.toFixed(1)}/${base.H.ridgeB.toFixed(1)} · no west glass invented.`
        : '',
    };
  }

  function analyzeNorth() {
    const base = frozenBase();
    const ops = planOps();
    const faces = northFaces(base.mass.items || []);
    const nOpen = ops.openings.filter((o) => o.wall === 'N');
    const nWin = ops.windows.filter((w) => w.wall === 'N');
    const expectedIds = ['entry-a', 'pers-a'];
    const idsOk = expectedIds.every((id) => nOpen.some((o) => o.id === id));
    const bGlass = nWin.filter((w) => w.unit === 'B');
    const canopy = Arch && Arch.CANOPY_A;
    const canopyOk = canopy && sameRect(canopy.rect, { x: 78, y: 1.5, w: 8, h: 3.5 });
    const demisingHit = nOpen.concat(nWin).some((o) => Math.abs((o.x || 0) - 70) < 0.2 && o.w > 10);
    const checks = {
      architectureFrozen: {
        ok: base.freeze.ok && base.mass.verdict === 'PASS' && base.arch.verdict === 'PASS',
        detail: 'Massing + architectural freeze held',
      },
      heightsAndRidges: {
        ok: base.heightsOk,
        detail: `Ridges ${base.H.ridgeA.toFixed(1)}′ / ${base.H.ridgeB.toFixed(1)}′`,
      },
      northOpeningsFromPlan: {
        ok: idsOk && nWin.length === 2 && bGlass.length === 2,
        detail: idsOk
          ? `ENTRY A + PERSONNEL A · B north glass ${bGlass.map((w) => w.label).join(' · ')}`
          : 'North openings drifted from plan-closure',
      },
      canopyInherited: {
        ok: !!canopyOk,
        detail: canopyOk ? 'APPENDAGE canopy A 78,1.5 8×3.5' : 'Canopy drift',
      },
      demisingBlank: {
        ok: !demisingHit,
        detail: 'No opening invented on x=70',
      },
      pennRight: {
        ok: true,
        detail: 'Horizontal = +X toward Pennsylvania / right',
      },
    };
    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_north_elev',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      faces,
      openings: nOpen,
      windows: nWin,
      heights: base.H,
      plates: base.pl,
      canopy,
      next: hard ? 'North elevation PASS.' : 'Repair north elevation from plan-closure only.',
      freezeNote: hard ? 'North elevation frozen · plan-closure N-wall openings only.' : '',
    };
  }

  function analyzeSouth() {
    const base = frozenBase();
    const ops = planOps();
    const faces = southFaces(base.mass.items || []);
    const sOpen = ops.openings.filter((o) => o.wall === 'S');
    const sWin = ops.windows.filter((w) => w.wall === 'S');
    const entryB = sOpen.find((o) => o.id === 'entry-b');
    const aBeds = sWin.filter((w) => w.unit === 'A');
    const bBeds = sWin.filter((w) => w.unit === 'B');
    const eyebrow = Arch && Arch.EYEBROW_B;
    const eyebrowOk = eyebrow && sameRect(eyebrow.rect, { x: 66, y: 20, w: 4, h: 2 });
    const covered = freezeGarages().filter((g) => g.covered);
    const checks = {
      architectureFrozen: {
        ok: base.freeze.ok && base.mass.verdict === 'PASS' && base.arch.verdict === 'PASS',
        detail: 'Massing + architectural freeze held',
      },
      heightsAndRidges: {
        ok: base.heightsOk,
        detail: `Ridges ${base.H.ridgeA.toFixed(1)}′ / ${base.H.ridgeB.toFixed(1)}′`,
      },
      southOpeningsFromPlan: {
        ok: !!(entryB && aBeds.length === 4 && bBeds.length === 2),
        detail: entryB
          ? `ENTRY B · A S glass ${aBeds.length} · B S glass ${bBeds.length}`
          : 'South openings drifted',
      },
      eyebrowInherited: {
        ok: !!eyebrowOk,
        detail: eyebrowOk ? 'APPENDAGE eyebrow B 66,20 4×2' : 'Eyebrow drift',
      },
      coveredSouthOpen: {
        ok: covered.length === 2 && covered.every((g) => !g.enclosed && g.doorFace === 'S'),
        detail: 'Covered A/B open to south · not enclosed',
      },
      demisingBlank: {
        ok: !sOpen.concat(sWin).some((o) => Math.abs(o.x - 70) < 0.2 && o.wall === 'S' && o.w > 8),
        detail: 'No demising opening on south',
      },
    };
    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_south_elev',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      faces,
      openings: sOpen,
      windows: sWin,
      heights: base.H,
      plates: base.pl,
      eyebrow,
      next: hard ? 'South elevation PASS. Sections next.' : 'Repair south elevation from plan-closure only.',
      freezeNote: hard ? 'South elevation frozen · plan-closure S-wall openings only.' : '',
    };
  }

  function analyzeSides() {
    const north = analyzeNorth();
    const south = analyzeSouth();
    const ok = north.verdict === 'PASS' && south.verdict === 'PASS';
    return {
      id: 'r5_1e_side_elevs',
      verdict: ok ? 'PASS' : 'FAIL',
      north,
      south,
      checks: { north: { ok: north.verdict === 'PASS', detail: north.verdict }, south: { ok: south.verdict === 'PASS', detail: south.verdict } },
      next: ok
        ? 'North + south elevations PASS — freeze both SVGs. Sections A-A and B-B next.'
        : 'Repair named side-elevation failures.',
      freezeNote: ok ? 'Side elevations frozen from plan-closure N/S openings.' : '',
    };
  }

  function dimVpx(x, y0, y1, label, side) {
    if (Sheet) return Sheet.dimV(x, y0, y1, label, side);
    return '';
  }

  function short(s) {
    return Sheet ? Sheet.shortLabel(s) : s;
  }

  function renderRear(gate) {
    const g = gate || analyzeRear();
    const H = g.heights;
    const OX = 86;
    const OY = 372;
    const TITLE_H = Sheet ? Sheet.TITLE_H : 56;
    const sx = (y) => OX + y * SCALE_Y;
    const sz = (z) => OY - z * SCALE_Z;
    const VB_W = Math.ceil(sx(36) + 52);
    const VB_H = Math.ceil(OY + 40 + TITLE_H);
    const pl = g.plates;
    const yMidA = pl.A.y + pl.A.h / 2;
    const yMidB = pl.B.y + pl.B.h / 2;

    const faceSvg = (g.faces || []).map((f) => {
      const col = fills(f.kind);
      const dash = (f.kind === 'undercroft' || f.kind === 'post' || f.kind === 'covered') ? '4 3' : '';
      const op = f.kind === 'undercroft' ? 0.3 : (f.westX > 28.2 ? 0.22 : 1);
      const strokeDash = f.westX > 28.2 ? '5 4' : dash;
      return `<rect x="${sx(f.y0)}" y="${sz(f.z1)}" width="${(f.y1 - f.y0) * SCALE_Y}" height="${(f.z1 - f.z0) * SCALE_Z}" fill="${col.face === 'none' ? 'none' : col.face}" fill-opacity="${op}" stroke="${col.stroke}" stroke-width="1.1" stroke-dasharray="${strokeDash}"/>`;
    }).join('\n');

    const gableA = `<polygon points="${sx(pl.A.y)},${sz(H.zTop)} ${sx(yMidA)},${sz(H.ridgeA)} ${sx(pl.A.y + pl.A.h)},${sz(H.zTop)}" fill="none" stroke="#7a8794" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    const gableB = `<polygon points="${sx(pl.B.y)},${sz(H.zTop)} ${sx(yMidB)},${sz(H.ridgeB)} ${sx(pl.B.y + pl.B.h)},${sz(H.zTop)}" fill="#555b64" stroke="#1a1d22" stroke-width="1.2"/>`;
    const stone = `<rect x="${sx(pl.B.y)}" y="${sz(STONE_Z)}" width="${pl.B.h * SCALE_Y}" height="${STONE_Z * SCALE_Z}" fill="#8a8070" fill-opacity="0.5" stroke="#5c5548" stroke-width="1"/>`;
    const postSvg = (g.posts || []).map((p) =>
      `<rect x="${sx(p.y)}" y="${sz(H.ground)}" width="${p.h * SCALE_Y}" height="${H.ground * SCALE_Z}" fill="#3d4550" stroke="#111317" stroke-width="0.8"/>`
    ).join('');
    const cb = g.coveredB;
    const coveredSvg = cb
      ? `<rect x="${sx(cb.y)}" y="${sz(H.ground)}" width="${cb.h * SCALE_Y}" height="${H.ground * SCALE_Z}" fill="#c8d0d6" fill-opacity="0.25" stroke="#5a6570" stroke-width="1.2" stroke-dasharray="5 3"/>
         <text x="${sx(cb.y + cb.h / 2)}" y="${sz(5)}" text-anchor="middle" font-size="8" font-weight="800" fill="#5a6570">COVERED B · OPEN</text>`
      : '';

    const body = `
  <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(36)}" y2="${sz(0)}" stroke="#2a333c" stroke-width="2.2"/>
  ${gableA}
  ${faceSvg}
  ${gableB}
  ${stone}
  ${coveredSvg}
  ${postSvg}
  <text x="${sx(yMidB)}" y="${sz(H.ridgeB) - 6}" text-anchor="middle" font-size="9" font-weight="900" fill="#0d1b33">B</text>
  <text x="${sx(yMidA)}" y="${sz(H.ridgeA) - 6}" text-anchor="middle" font-size="8" font-weight="800" fill="#7a8794">A beyond</text>
  <text x="${sx(12)}" y="${sz(14)}" text-anchor="middle" font-size="9" font-weight="800" fill="#0d1b33">UNIT B · MECH WEST</text>
  <text x="${sx(12)}" y="${sz(12.2)}" text-anchor="middle" font-size="8" fill="#5a6570">Living glass on NORTH wall</text>
  <text x="${sx(0) + 6}" y="${sz(0) + 14}" font-size="9" font-weight="800">N</text>
  <text x="${sx(33)}" y="${sz(0) + 14}" text-anchor="end" font-size="9" font-weight="800">S</text>
  ${dimVpx(sx(0) - 18, sz(0), sz(H.carport), '9.0′ CLEAR', 'left')}
  ${dimVpx(sx(0) - 34, sz(0), sz(H.zTop), '20.5′ MASS', 'left')}
  ${dimVpx(sx(33) + 18, sz(0), sz(H.ridgeB), '26.5′ RIDGE B', 'right')}
  ${dimVpx(sx(33) + 34, sz(0), sz(H.ridgeA), '27.0′ RIDGE A', 'right')}`;

    if (!Sheet) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${body}</svg>`;
    return Sheet.svg({
      w: VB_W,
      h: VB_H,
      no: 'A-202',
      title: 'REAR / WEST ELEVATION',
      subtitle: 'Looking east from the rear · north LEFT · Unit B full west face · A dashed beyond x=70',
      note: 'No west-wall windows in plan-closure. Covered stall inherited open. Demising x=70 blank.',
      verdict: g.verdict,
      aria: 'R5.1e rear west elevation',
      body,
    });
  }

  function winBand(level) {
    return level === 'upper' ? { sill: 13.5, head: 17.5 } : { sill: 2.5, head: 7.5 };
  }

  function renderNorth(gate) {
    const g = gate || analyzeNorth();
    const H = g.heights;
    const OX = 78;
    const OY = 360;
    const TITLE_H = Sheet ? Sheet.TITLE_H : 56;
    const sx = (x) => OX + x * SCALE_X;
    const sz = (z) => OY - z * SCALE_Z;
    const VB_W = Math.ceil(sx(150) + 48);
    const VB_H = Math.ceil(OY + 48 + TITLE_H);
    const pl = g.plates;
    const faceSvg = (g.faces || []).map((f) => {
      const col = fills(f.kind);
      const dash = (f.kind === 'undercroft' || f.kind === 'post') ? '4 3' : '';
      return `<rect x="${sx(f.x0)}" y="${sz(f.z1)}" width="${(f.x1 - f.x0) * SCALE_X}" height="${(f.z1 - f.z0) * SCALE_Z}" fill="${col.face}" stroke="${col.stroke}" stroke-width="1.05" stroke-dasharray="${dash}"/>`;
    }).join('\n');
    const ridgeLineA = `<line x1="${sx(pl.A.x)}" y1="${sz(H.ridgeA)}" x2="${sx(pl.A.x + pl.A.w)}" y2="${sz(H.ridgeA)}" stroke="#1a1d22" stroke-width="1.6"/>`;
    const ridgeLineB = `<line x1="${sx(pl.B.x)}" y1="${sz(H.ridgeB)}" x2="${sx(pl.B.x + pl.B.w)}" y2="${sz(H.ridgeB)}" stroke="#1a1d22" stroke-width="1.6"/>`;
    const eaveA = `<line x1="${sx(pl.A.x)}" y1="${sz(H.zTop)}" x2="${sx(pl.A.x + pl.A.w)}" y2="${sz(H.zTop)}" stroke="#4a5058" stroke-width="1.2"/>`;
    const eaveB = `<line x1="${sx(pl.B.x)}" y1="${sz(H.zTop)}" x2="${sx(pl.B.x + pl.B.w)}" y2="${sz(H.zTop)}" stroke="#4a5058" stroke-width="1.2"/>`;
    const canopy = g.canopy && g.canopy.rect
      ? `<rect x="${sx(g.canopy.rect.x)}" y="${sz(g.canopy.z1)}" width="${g.canopy.rect.w * SCALE_X}" height="${(g.canopy.z1 - g.canopy.z0) * SCALE_Z}" fill="none" stroke="#8b6b3e" stroke-width="1.3" stroke-dasharray="4 2"/>
         <text x="${sx(g.canopy.rect.x + g.canopy.rect.w / 2)}" y="${sz(g.canopy.z1) - 4}" text-anchor="middle" font-size="8" font-weight="800" fill="#7b5721">${short('APPENDAGE · CANOPY A')}</text>`
      : '';
    const ops = (g.openings || []).map((o) => {
      const z1 = 7.5;
      return `<rect x="${sx(o.x)}" y="${sz(z1)}" width="${o.w * SCALE_X}" height="${(z1 - 0.4) * SCALE_Z}" fill="#f7ead3" stroke="#5c4030" stroke-width="1.4"/>
        <text x="${sx(o.x + o.w / 2)}" y="${sz(3.6)}" text-anchor="middle" font-size="7.5" font-weight="800" fill="#7b5721">${short(o.label)}</text>`;
    }).join('');
    const wins = (g.windows || []).map((w) => {
      const b = winBand(w.level);
      return `<rect x="${sx(w.x)}" y="${sz(b.head)}" width="${w.w * SCALE_X}" height="${(b.head - b.sill) * SCALE_Z}" fill="#dce8f5" stroke="#2a6496" stroke-width="1.2"/>
        <text x="${sx(w.x + w.w / 2)}" y="${sz(b.head) - 4}" text-anchor="middle" font-size="7" font-weight="800" fill="#2a6496">${short(w.label)}</text>`;
    }).join('');
    const dem = `<line x1="${sx(70)}" y1="${sz(0)}" x2="${sx(70)}" y2="${sz(H.zTop)}" stroke="#9a3b2e" stroke-width="1.4" stroke-dasharray="6 3"/>
      <text x="${sx(70) + 4}" y="${sz(18)}" font-size="8" font-weight="800" fill="#9a3b2e">x=70 BLANK</text>`;

    const body = `
  <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(148)}" y2="${sz(0)}" stroke="#2a333c" stroke-width="2"/>
  ${faceSvg}${eaveB}${eaveA}${ridgeLineB}${ridgeLineA}${canopy}${ops}${wins}${dem}
  <text x="${sx(0)}" y="${sz(0) + 14}" font-size="9" font-weight="800">REAR / N</text>
  <text x="${sx(148)}" y="${sz(0) + 14}" text-anchor="end" font-size="9" font-weight="800">PENN</text>
  <text x="${sx(49)}" y="${sz(H.ridgeB) - 6}" text-anchor="middle" font-size="8" font-weight="800">RIDGE B 26.5′</text>
  <text x="${sx(98)}" y="${sz(H.ridgeA) - 6}" text-anchor="middle" font-size="8" font-weight="800">RIDGE A 27.0′</text>
  ${dimVpx(sx(0) - 18, sz(0), sz(H.zTop), '20.5′ MASS', 'left')}
  ${dimVpx(sx(0) - 34, sz(0), sz(H.ridgeA), '27.0′ RIDGE A', 'left')}`;

    if (!Sheet) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${body}</svg>`;
    return Sheet.svg({
      w: VB_W,
      h: VB_H,
      no: 'A-203',
      title: 'NORTH ELEVATION',
      subtitle: 'Looking south · Pennsylvania RIGHT · plan-closure N-wall openings only',
      note: 'ENTRY A · PERSONNEL A · canopy A · Unit B north living glass. Demising x=70 blank.',
      verdict: g.verdict,
      aria: 'R5.1e north elevation',
      body,
    });
  }

  function renderSouth(gate) {
    const g = gate || analyzeSouth();
    const H = g.heights;
    const OX = 78;
    const OY = 360;
    const TITLE_H = Sheet ? Sheet.TITLE_H : 56;
    const sx = (x) => OX + x * SCALE_X;
    const sz = (z) => OY - z * SCALE_Z;
    const VB_W = Math.ceil(sx(150) + 48);
    const VB_H = Math.ceil(OY + 48 + TITLE_H);
    const pl = g.plates;
    const faceSvg = (g.faces || []).map((f) => {
      const col = fills(f.kind);
      const dash = (f.kind === 'undercroft' || f.kind === 'post' || f.kind === 'covered') ? '4 3' : '';
      const op = f.kind === 'undercroft' ? 0.3 : 1;
      return `<rect x="${sx(f.x0)}" y="${sz(f.z1)}" width="${(f.x1 - f.x0) * SCALE_X}" height="${(f.z1 - f.z0) * SCALE_Z}" fill="${col.face}" fill-opacity="${op}" stroke="${col.stroke}" stroke-width="1.05" stroke-dasharray="${dash}"/>`;
    }).join('\n');
    const ridgeLineA = `<line x1="${sx(pl.A.x)}" y1="${sz(H.ridgeA)}" x2="${sx(pl.A.x + pl.A.w)}" y2="${sz(H.ridgeA)}" stroke="#1a1d22" stroke-width="1.6"/>`;
    const ridgeLineB = `<line x1="${sx(pl.B.x)}" y1="${sz(H.ridgeB)}" x2="${sx(pl.B.x + pl.B.w)}" y2="${sz(H.ridgeB)}" stroke="#1a1d22" stroke-width="1.6"/>`;
    const eyebrow = g.eyebrow && g.eyebrow.rect
      ? `<rect x="${sx(g.eyebrow.rect.x)}" y="${sz(g.eyebrow.z1)}" width="${g.eyebrow.rect.w * SCALE_X}" height="${Math.max(2, (g.eyebrow.z1 - g.eyebrow.z0) * SCALE_Z)}" fill="none" stroke="#8b6b3e" stroke-width="1.3" stroke-dasharray="4 2"/>
         <text x="${sx(g.eyebrow.rect.x + g.eyebrow.rect.w / 2)}" y="${sz(g.eyebrow.z1) - 4}" text-anchor="middle" font-size="8" font-weight="800" fill="#7b5721">${short('APPENDAGE · EYEBROW B')}</text>`
      : '';
    const ops = (g.openings || []).map((o) => {
      const z1 = 7.5;
      return `<rect x="${sx(o.x)}" y="${sz(z1)}" width="${o.w * SCALE_X}" height="${(z1 - 0.4) * SCALE_Z}" fill="#f7ead3" stroke="#5c4030" stroke-width="1.4"/>
        <text x="${sx(o.x + o.w / 2)}" y="${sz(3.6)}" text-anchor="middle" font-size="7.5" font-weight="800" fill="#7b5721">${short(o.label)}</text>`;
    }).join('');
    const wins = (g.windows || []).map((w) => {
      const b = winBand(w.level);
      return `<rect x="${sx(w.x)}" y="${sz(b.head)}" width="${w.w * SCALE_X}" height="${(b.head - b.sill) * SCALE_Z}" fill="#dce8f5" stroke="#2a6496" stroke-width="1.2"/>
        <text x="${sx(w.x + w.w / 2)}" y="${sz(b.head) - 4}" text-anchor="middle" font-size="7" font-weight="800" fill="#2a6496">${short(w.label)}</text>`;
    }).join('');
    const dem = `<line x1="${sx(70)}" y1="${sz(0)}" x2="${sx(70)}" y2="${sz(H.zTop)}" stroke="#9a3b2e" stroke-width="1.4" stroke-dasharray="6 3"/>`;

    const body = `
  <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(148)}" y2="${sz(0)}" stroke="#2a333c" stroke-width="2"/>
  ${faceSvg}${ridgeLineB}${ridgeLineA}${eyebrow}${ops}${wins}${dem}
  <text x="${sx(0)}" y="${sz(0) + 14}" font-size="9" font-weight="800">REAR</text>
  <text x="${sx(148)}" y="${sz(0) + 14}" text-anchor="end" font-size="9" font-weight="800">PENN</text>
  <text x="${sx(49)}" y="${sz(H.ridgeB) - 6}" text-anchor="middle" font-size="8" font-weight="800">RIDGE B 26.5′</text>
  <text x="${sx(98)}" y="${sz(H.ridgeA) - 6}" text-anchor="middle" font-size="8" font-weight="800">RIDGE A 27.0′</text>
  ${dimVpx(sx(0) - 18, sz(0), sz(H.zTop), '20.5′ MASS', 'left')}
  ${dimVpx(sx(0) - 34, sz(0), sz(H.ridgeA), '27.0′ RIDGE A', 'left')}`;

    if (!Sheet) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${body}</svg>`;
    return Sheet.svg({
      w: VB_W,
      h: VB_H,
      no: 'A-204',
      title: 'SOUTH ELEVATION',
      subtitle: 'Looking north · Pennsylvania RIGHT · plan-closure S-wall openings only · covered stalls open',
      note: 'ENTRY B · eyebrow B · A/B south glass. Covered stalls remain open. Demising x=70 blank.',
      verdict: g.verdict,
      aria: 'R5.1e south elevation',
      body,
    });
  }

  return {
    PARENT,
    analyzeRear,
    analyzeNorth,
    analyzeSouth,
    analyzeSides,
    renderRear,
    renderNorth,
    renderSouth,
    plates,
    heights,
    gableZ,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eElevations;
