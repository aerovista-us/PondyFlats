/**
 * Lot 2 — R5.1e Pennsylvania elevation (representation-only)
 *
 * Orthographic east/street face. Inherits frozen plates, heights, ridges,
 * east garage doors, and plan-closure E-wall openings. Does not move volumes.
 * North (y=0) is LEFT — same as the locked plan.
 */
const Lot2R51ePennElev = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const S = typeof Lot2SOT !== 'undefined' ? Lot2SOT : {};
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const M = typeof Lot2R51eMassingTruth !== 'undefined' ? Lot2R51eMassingTruth : null;
  const Arch = typeof Lot2R51eArchitecturalMassing !== 'undefined' ? Lot2R51eArchitecturalMassing : null;
  const Closure = typeof Lot2R51ePlanClosure !== 'undefined' ? Lot2R51ePlanClosure : null;
  const PARENT = 'reset_r5';
  const EPS = 0.05;
  const Sheet = typeof Lot2R51eSheet !== 'undefined' ? Lot2R51eSheet : null;
  const SCALE_Y = 8.2;
  const SCALE_Z = 8.2;
  const OX = 86;
  const OY = 392;
  const Z_TOP = 20.5;
  const RIDGE_A = 27.0;
  const RIDGE_B = 26.5;
  const STONE_Z = 3;

  function sx(y) {
    return OX + y * SCALE_Y;
  }
  function sz(z) {
    return OY - z * SCALE_Z;
  }

  function sameRect(a, b, eps = EPS) {
    return a && b
      && Math.abs(a.x - b.x) <= eps && Math.abs(a.y - b.y) <= eps
      && Math.abs(a.w - b.w) <= eps && Math.abs(a.h - b.h) <= eps;
  }

  function fills(kind) {
    if (kind === 'garage') return { face: '#6e7a88', stroke: '#2a333c' };
    if (kind === 'post' || kind === 'undercroft' || kind === 'slab') return { face: '#c8d0d6', stroke: '#5a6570' };
    if (kind === 'ground') return { face: '#cfc6b6', stroke: '#2a333c' };
    if (kind === 'upper') return { face: '#e6e0d4', stroke: '#2a333c' };
    return { face: '#ddd5c5', stroke: '#2a333c' };
  }

  function eastFaces(items) {
    return (items || []).map((it) => ({
      id: it.id,
      kind: it.kind,
      unit: it.unit,
      eastX: +(it.rect.x + it.rect.w).toFixed(2),
      y0: it.rect.y,
      y1: it.rect.y + it.rect.h,
      z0: it.z0,
      z1: it.z1,
      rect: it.rect,
    })).sort((a, b) => a.eastX - b.eastX);
  }

  function garages() {
    const F = ParkFreeze ? ParkFreeze.FREEZE : null;
    return (F ? F.garages : []).filter((g) => g.enclosed).map((g) => ({
      id: g.id,
      x: g.x,
      y: g.y,
      w: g.w,
      h: g.h,
      eastX: g.x + g.w,
    }));
  }

  function eOpenings() {
    const g = Closure && Closure.analyze ? Closure.analyze() : { openings: [], windows: [] };
    return {
      doors: (g.openings || []).filter((o) => o.wall === 'E'),
      windows: (g.windows || []).filter((w) => w.wall === 'E'),
    };
  }

  function analyze() {
    const mass = M && M.analyze ? M.analyze() : { verdict: 'FAIL', items: [], heights: {} };
    const arch = Arch && Arch.analyze ? Arch.analyze() : { verdict: 'FAIL', roofs: {} };
    const freezeC = L.CONCEPTS && L.CONCEPTS[PARENT];
    const freeze = ParkFreeze && freezeC ? ParkFreeze.assertFrozen(freezeC) : { ok: false, fails: ['missing'] };
    const H = (M && M.H) || { ground: 10.5, upper: 10, carportClear: 9 };
    const zTop = H.ground + H.upper;
    const ridgeA = zTop + ((Arch && Arch.ROOF.A.pitch) || 6.5);
    const ridgeB = zTop + ((Arch && Arch.ROOF.B.pitch) || 6.0);
    const faces = eastFaces(mass.items || []);
    const gars = garages();
    const ops = eOpenings();
    const plateA = ArchLock ? ArchLock.LOCK.plates.find((p) => p.id === 'A') : { x: 68, y: 5, w: 58, h: 22.5 };
    const plateB = ArchLock ? ArchLock.LOCK.plates.find((p) => p.id === 'B') : { x: 28, y: 5, w: 40, h: 28 };
    const plateAok = plateA && Math.abs((plateA.x + plateA.w) - 126) < EPS;
    const doorsOk = gars.length === 2
      && gars.every((g) => Math.abs(g.h - 16) < EPS)
      && ops.doors.length === 2
      && ops.doors.every((d) => Math.abs(d.w - 16) < 0.05);

    const D = ArchLock && ArchLock.LOCK.demisingX != null ? ArchLock.LOCK.demisingX : 68;
    const demisingHit = (ops.doors.concat(ops.windows)).some((o) => Math.abs(o.x - D) < 0.2);
    const pennWin = ops.windows.filter((w) => w.unit === 'A');
    const heightsOk = Math.abs(zTop - Z_TOP) < EPS
      && Math.abs(ridgeA - RIDGE_A) < EPS
      && Math.abs(ridgeB - RIDGE_B) < EPS
      && Math.abs(H.carportClear - 9) < EPS;

    const roofA = Arch && Arch.ROOF.A.rect;
    const roofB = Arch && Arch.ROOF.B.rect;
    const roofOk = roofA && roofB && sameRect(roofA, plateA) && sameRect(roofB, plateB);

    const checks = {
      architectureFrozen: {
        ok: freeze.ok && mass.verdict === 'PASS' && arch.verdict === 'PASS',
        detail: freeze.ok && mass.verdict === 'PASS' && arch.verdict === 'PASS'
          ? 'Massing + architectural freeze held'
          : 'Frozen architecture not PASS',
      },
      heightsAndRidges: {
        ok: heightsOk,
        detail: heightsOk
          ? `zTop ${zTop}′ · ridge A ${ridgeA.toFixed(1)}′ / B ${ridgeB.toFixed(1)}′ · carport 9′`
          : `Height drift zTop=${zTop} ridge ${ridgeA}/${ridgeB}`,
      },
      eastDoorsInherited: {
        ok: doorsOk,
        detail: doorsOk
          ? `Garage A east x=${gars.find((g) => g.id === 'A').eastX} · B x=${gars.find((g) => g.id === 'B').eastX} · 16′ doors from freeze / plan-closure`
          : 'East garage doors drifted',
      },
      roofsOnPlates: {
        ok: !!roofOk && plateAok,
        detail: roofOk ? `Gables on frozen plate envelopes A ${plateA.w}×${plateA.h} · B ${plateB.w}×${plateB.h}` : 'Roof envelope drift',
      },
      pennOpeningsOnly: {
        ok: pennWin.length === 1 && pennWin[0].w === 6 && !demisingHit,
        detail: !demisingHit && pennWin.length === 1
          ? `Limited Penn glass on Unit A upper · no openings on x=${D}`
          : 'Penn / demising opening drift',
      },
      faceCount: {
        ok: faces.length === (mass.items || []).length && faces.length > 8,
        detail: `${faces.length} east faces from massing items`,
      },
      representationOnly: {
        ok: true,
        detail: 'Orthographic · no photoreal materials · north LEFT',
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_penn_elev',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      faces,
      garages: gars,
      openings: ops,
      heights: { zTop, ridgeA, ridgeB, carport: H.carportClear, ground: H.ground, upper: H.upper, stone: STONE_Z },
      plates: { A: plateA, B: plateB },
      next: hard
        ? 'Pennsylvania elevation PASS — freeze this SVG. Opposite (rear/west) elevation next, then the two side elevations.'
        : 'Repair named Penn-elevation failures without moving frozen volumes.',
      freezeNote: hard
        ? `Penn elevation frozen: orthographic east face · ridge A ${ridgeA.toFixed(1)}′ / B ${ridgeB.toFixed(1)}′ · 16′ east doors · limited A glass.`
        : '',
    };
  }

  function dimV(x, z0, z1, label, side) {
    if (Sheet) return Sheet.dimV(x, sz(z0), sz(z1), label, side);
    return '';
  }

  function dimH(y0, y1, yPx, label) {
    if (Sheet) return Sheet.dimH(sx(y0), sx(y1), yPx, label, 'below');
    return '';
  }

  function render(gate) {
    const g = gate || analyze();
    const H = g.heights;
    const TITLE_H = Sheet ? Sheet.TITLE_H : 56;
    const VB_W = Math.ceil(sx(50) + 58);
    const VB_H = Math.ceil(OY + 72 + TITLE_H);
    const faces = g.faces || [];
    const short = Sheet ? Sheet.shortLabel.bind(Sheet) : ((s) => s);

    const faceSvg = faces.map((f) => {
      const col = fills(f.kind);
      const dash = (f.kind === 'undercroft' || f.kind === 'post') ? '4 3' : '';
      const op = f.kind === 'undercroft' ? 0.35 : 1;
      return `<rect x="${sx(f.y0)}" y="${sz(f.z1)}" width="${(f.y1 - f.y0) * SCALE_Y}" height="${(f.z1 - f.z0) * SCALE_Z}" fill="${col.face}" fill-opacity="${op}" stroke="${col.stroke}" stroke-width="1.15" stroke-dasharray="${dash}"/>`;
    }).join('\n');

    const plateA = g.plates.A;
    const plateB = g.plates.B;
    const yMidA = plateA.y + plateA.h / 2;
    const yMidB = plateB.y + plateB.h / 2;
    const gableA = `<polygon points="${sx(plateA.y)},${sz(H.zTop)} ${sx(yMidA)},${sz(H.ridgeA)} ${sx(plateA.y + plateA.h)},${sz(H.zTop)}" fill="#4a5058" stroke="#1a1d22" stroke-width="1.2"/>`;
    const gableB = `<polygon points="${sx(plateB.y)},${sz(H.zTop)} ${sx(yMidB)},${sz(H.ridgeB)} ${sx(plateB.y + plateB.h)},${sz(H.zTop)}" fill="#555b64" stroke="#1a1d22" stroke-width="1.1"/>`;

    const stone = `<rect x="${sx(plateA.y)}" y="${sz(STONE_Z)}" width="${plateA.h * SCALE_Y}" height="${STONE_Z * SCALE_Z}" fill="#8a8070" fill-opacity="0.55" stroke="#5c5548" stroke-width="1"/>`;

    const doorSvg = g.garages.map((gar) => {
      const aSouth = g.plates.A.y + g.plates.A.h;
      let y0 = gar.y;
      let y1 = gar.y + 16;
      if (gar.id === 'B') {
        y0 = Math.max(y0, aSouth);
        if (y1 <= y0 + 0.2) return '';
      }
      const z0 = 0.4;
      const z1 = 8;
      const label = short(gar.id === 'B' ? 'DOOR B 16′ E (sliver)' : `DOOR ${gar.id} 16′ E`);
      return `<rect data-lock="east-garage-door" data-unit="${gar.id}" x="${sx(y0)}" y="${sz(z1)}" width="${(y1 - y0) * SCALE_Y}" height="${(z1 - z0) * SCALE_Z}" fill="#12151a" stroke="#c45c4a" stroke-width="1.6"/>
        <line x1="${sx((y0 + y1) / 2)}" y1="${sz(z1)}" x2="${sx((y0 + y1) / 2)}" y2="${sz(z0)}" stroke="#3a4048" stroke-width="1.2"/>
        <text x="${sx((y0 + y1) / 2)}" y="${(sz(z1) + sz(z0)) / 2 + 3}" text-anchor="middle" font-size="8" font-weight="800" fill="#efb34d">${label}</text>`;
    }).join('');

    const winSvg = (g.openings.windows || []).map((w) => {
      const y0 = w.y;
      const y1 = w.y + w.w;
      const sill = 13.5;
      const head = 17.5;
      return `<rect x="${sx(y0)}" y="${sz(head)}" width="${(y1 - y0) * SCALE_Y}" height="${(head - sill) * SCALE_Z}" fill="#dce8f5" stroke="#2a6496" stroke-width="1.3"/>
        <text x="${sx((y0 + y1) / 2)}" y="${sz(head) - 5}" text-anchor="middle" font-size="8" font-weight="800" fill="#2a6496">${short(w.label)}</text>`;
    }).join('');

    const body = `
  <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(50)}" y2="${sz(0)}" stroke="#2a333c" stroke-width="2.2"/>
  ${gableB}
  ${faceSvg}
  ${gableA}
  ${stone}
  ${doorSvg}
  ${winSvg}
  <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(0)}" y2="${sz(H.ridgeA)}" stroke="#c5cdd4" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${sx(0) + 6}" y="${sz(0) + 14}" font-size="9" font-weight="800" fill="#0d1b33">N / REAR</text>
  <text x="${sx(50) - 6}" y="${sz(0) + 14}" text-anchor="end" font-size="9" font-weight="800" fill="#0d1b33">S</text>
  ${dimV(sx(0) - 18, 0, H.carport, '9.0′ CLEAR', 'left')}
  ${dimV(sx(0) - 34, 0, H.ground, '10.5′ FTF', 'left')}
  ${dimV(sx(0) - 50, 0, H.zTop, '20.5′ MASS', 'left')}
  ${dimV(sx(50) + 18, 0, H.ridgeB, '26.5′ RIDGE B', 'right')}
  ${dimV(sx(50) + 34, 0, H.ridgeA, '27.0′ RIDGE A', 'right')}
  ${dimH(0, 50, sz(0) + 22, '50.00′ FRONTAGE')}
  ${dimH(plateA.y, plateA.y + plateA.h, sz(0) + 40, 'PLATE A 22.5′')}
  <text x="${sx(yMidA)}" y="${sz(H.ridgeA) - 6}" text-anchor="middle" font-size="9" font-weight="900" fill="#0d1b33">A</text>
  <text x="${sx(yMidB)}" y="${sz(H.ridgeB) - 6}" text-anchor="middle" font-size="8" font-weight="800" fill="#5a6570">B</text>
  <text x="${sx(38)}" y="${sz(H.zTop) - 8}" font-size="8" fill="#5a6570">B sliver south of y=27.5</text>`;

    if (!Sheet) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${body}</svg>`;
    }
    return Sheet.svg({
      w: VB_W,
      h: VB_H,
      no: 'A-201',
      title: 'PENNSYLVANIA ELEVATION',
      subtitle: 'Looking west from Pennsylvania · north LEFT · orthographic · inherited frozen volumes',
      note: '16′ east doors are freeze geometry. Window head/sill 13.5–17.5′ is typical upper band; plan y-span is frozen.',
      verdict: g.verdict,
      aria: 'R5.1e Pennsylvania elevation',
      body,
    });
  }

  return { PARENT, analyze, render, eastFaces };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51ePennElev;
