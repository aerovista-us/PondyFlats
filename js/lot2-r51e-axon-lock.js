/**
 * Lot 2 — R5.1e same-camera axon lock (representation-only)
 *
 * Source of geometry: frozen architectural-massing SVG / engine.
 * This file may remaint fills and overlay locked door planes.
 * It must not move, scale, or invent volumes.
 */
const Lot2R51eAxonLock = (() => {
  const M = typeof Lot2R51eMassingTruth !== 'undefined' ? Lot2R51eMassingTruth : null;
  const Arch = typeof Lot2R51eArchitecturalMassing !== 'undefined' ? Lot2R51eArchitecturalMassing : null;
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const PARENT = 'reset_r5';

  const FILL_REMAP = Object.freeze({
    '#3d4550': '#2f3842',
    '#525c68': '#3e4854',
    '#6e7a88': '#5c6874',
    '#b7ab96': '#a8987c',
    '#c4baa8': '#b5a790',
    '#cfc6b6': '#c4b8a4',
    '#d4cbb8': '#cfc3ac',
    '#ddd5c5': '#d6ccb8',
    '#e6e0d4': '#efe8dc',
    '#e2ddd2': '#ebe4d6',
    '#cdc4b2': '#c2b69e',
    '#d8d0c0': '#d0c6b4',
    '#4a5058': '#3a4048',
    '#555b64': '#444a52',
    '#3a3f46': '#2c3138',
  });

  function requireDeps() {
    if (!M || !Arch) throw new Error('Massing truth + architectural massing required');
    return { M, Arch };
  }

  function frozenEngineSvg() {
    return Arch.render({
      showArchitecture: true,
      showMassingUnderlay: false,
      showFootprints: true,
      showUnderlay: true,
    }).svg;
  }

  function extractPolygonPoints(svg) {
    const pts = [];
    const re = /<polygon\b[^>]*\bpoints="([^"]+)"/g;
    let m;
    while ((m = re.exec(svg))) pts.push(normalizePoints(m[1]));
    return pts.sort();
  }

  function normalizePoints(s) {
    const nums = String(s).trim().split(/[\s,]+/).filter(Boolean).map((n) => Number(n).toFixed(1));
    return nums.join(' ');
  }

  function samePointSets(a, b) {
    if (a.length !== b.length) return { ok: false, detail: `polygon count ${a.length} vs ${b.length}` };
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return { ok: false, detail: `polygon ${i} drifted` };
    }
    return { ok: true, detail: `${a.length} polygons identical` };
  }

  function subsetPoints(frozen, richer) {
    const set = new Set(richer);
    const missing = frozen.filter((p) => !set.has(p));
    return {
      ok: missing.length === 0,
      detail: missing.length ? `${missing.length} frozen polygons missing from lock` : 'All frozen polygons inherited',
    };
  }

  function remapFills(svg) {
    let out = svg;
    Object.keys(FILL_REMAP).forEach((from) => {
      const to = FILL_REMAP[from];
      out = out.split(from).join(to);
    });
    return out
      .replace('R5.1e ARCHITECTURAL MASSING · SAME CAMERA AS MASSING TRUTH',
        'R5.1e AXON LOCK · SAME CAMERA · INHERITED FROM FROZEN MASSING')
      .replace('Core footprints/heights locked · gables on upper envelopes only · porches labeled APPENDAGE · no photoreal',
        'Representation-only · fills remapped · volumes unchanged · east doors SVG-locked');
  }

  function eastGarageDoorLocked(rect, unitId, annotated) {
    const { proj, polyPts, H } = M;
    const { x, y, w, h } = rect;
    const x1 = x + w;
    const doorW = Math.min(16, h - 3);
    const yMid = y + h / 2;
    const y0 = yMid - doorW / 2;
    const y1 = yMid + doorW / 2;
    const z0 = 0.4;
    const z1 = Math.min(8, H.ground - 0.4);
    const face = [proj(x1, y, H.ground), proj(x1, y + h, H.ground), proj(x1, y + h, 0), proj(x1, y, 0)];
    const door = [proj(x1, y0, z1), proj(x1, y1, z1), proj(x1, y1, z0), proj(x1, y0, z0)];
    const split = [proj(x1, yMid, z1), proj(x1, yMid, z0)];
    let s = `
      <polygon points="${polyPts(face)}" fill="${annotated ? '#efb34d' : '#12151a'}" fill-opacity="${annotated ? 0.28 : 0.12}" stroke="${annotated ? '#c45c4a' : '#1a1d22'}" stroke-width="${annotated ? 2.6 : 1.2}"/>
      <polygon data-lock="east-garage-door" data-unit="${unitId}" points="${polyPts(door)}" fill="#12151a" fill-opacity="0.94" stroke="${annotated ? '#ff2d1f' : '#1a1d22'}" stroke-width="${annotated ? 3.2 : 1.5}"/>
      <line x1="${split[0].sx}" y1="${split[0].sy}" x2="${split[1].sx}" y2="${split[1].sy}" stroke="#3a4048" stroke-width="1.2"/>`;
    if (annotated) {
      const label = proj(x1, yMid, (z0 + z1) / 2);
      s += `<text x="${label.sx + 8}" y="${label.sy}" font-size="11" font-weight="900" fill="#9a3b2e">GARAGE ${unitId} · EAST PLANE LOCKED · 16′</text>`;
    }
    return s;
  }

  function lockedGarages() {
    const F = ParkFreeze ? ParkFreeze.FREEZE : null;
    const list = F && F.garages
      ? F.garages.filter((g) => g.enclosed)
      : [
        { id: 'A', x: 100, y: 5, w: 24, h: 16 },
        { id: 'B', x: 42, y: 20, w: 24, h: 16 },
      ];
    return list.map((g) => ({ id: g.id, rect: { x: g.x, y: g.y, w: g.w, h: g.h } }));
  }

  function invariantCallouts() {
    const { proj } = M;
    const D = ArchLock && ArchLock.LOCK.demisingX != null ? ArchLock.LOCK.demisingX : 68;
    const ridgeA = proj(126, 16.25, 27);
    const ridgeB = proj(D, 19, 26.5);
    const dem = proj(D, 18, 0);
    const posts = proj(86, 12, 1);
    return `
      <text x="${ridgeA.sx}" y="${ridgeA.sy - 8}" font-size="10" font-weight="900" fill="#0d1b33">RIDGE A 27.0′ LOCKED</text>
      <text x="${ridgeB.sx + 6}" y="${ridgeB.sy - 6}" font-size="10" font-weight="900" fill="#0d1b33">RIDGE B 26.5′ LOCKED</text>
      <text x="${dem.sx + 8}" y="${dem.sy}" font-size="10" font-weight="900" fill="#9a3b2e">DEMISING x=${D} BLANK</text>
      <text x="${posts.sx}" y="${posts.sy}" font-size="9" font-weight="800" fill="#416145">8 POSTS · COVERED OPEN</text>
      <text x="${M.OX + 8}" y="${M.VB_H - 28}" font-size="11" font-weight="800" fill="#9a3b2e">DOORS ARE SVG GEOMETRY ON EAST FACES — a prettier picture must not move them</text>`;
  }

  function appendageCaps(annotated) {
    if (!annotated || !Arch) return '';
    const { proj, polyPts } = M;
    const caps = [Arch.CANOPY_A, Arch.EYEBROW_B];
    return caps.map((c) => {
      const r = c.rect;
      const z1 = c.z1;
      const top = [
        proj(r.x, r.y, z1),
        proj(r.x + r.w, r.y, z1),
        proj(r.x + r.w, r.y + r.h, z1),
        proj(r.x, r.y + r.h, z1),
      ];
      const mid = proj(r.x + r.w, r.y + r.h / 2, z1);
      return `<polygon points="${polyPts(top)}" fill="#c45c4a" fill-opacity="0.16" stroke="#c45c4a" stroke-width="2.1"/>
        <text x="${mid.sx + 4}" y="${mid.sy}" font-size="9" font-weight="900" fill="#9a3b2e">${c.label}</text>`;
    }).join('');
  }

  /**
   * @param {{ annotations?: boolean, frozenSvg?: string }} opts
   */
  function render(opts = {}) {
    requireDeps();
    const annotated = opts.annotations !== false;
    const frozen = opts.frozenSvg || frozenEngineSvg();
    const painted = remapFills(frozen);
    const doors = lockedGarages().map((g) => eastGarageDoorLocked(g.rect, g.id, annotated)).join('');
    const stamp = (typeof Lot2R51eSheet !== 'undefined' && Lot2R51eSheet.cornerStamp)
      ? Lot2R51eSheet.cornerStamp(M.VB_W, M.VB_H, 'A-402')
      : '';
    const extras = annotated ? `${appendageCaps(true)}${invariantCallouts()}${stamp}` : stamp;
    const svg = painted.replace('</svg>',
      `<g id="east-garage-doors-locked">${doors}</g><g id="axon-lock-overlays">${extras}</g></svg>`);
    return {
      svg,
      mode: annotated ? 'axon-lock-audit' : 'axon-lock-clean',
      doorPolicy: 'east-plane-svg-locked',
      source: 'imgs/r51e-architectural-massing.svg',
    };
  }

  function analyze(frozenFileSvg) {
    requireDeps();
    const archGate = Arch.analyze();
    const liveFrozen = frozenEngineSvg();
    const fileSvg = frozenFileSvg || liveFrozen;
    const livePts = extractPolygonPoints(liveFrozen);
    const filePts = extractPolygonPoints(fileSvg);
    const inheritFile = samePointSets(filePts, livePts);

    const materials = remapFills(fileSvg);
    const materialsPts = extractPolygonPoints(materials);
    const fillsOnly = samePointSets(filePts, materialsPts);

    const audit = render({ annotations: true, frozenSvg: fileSvg });
    const clean = render({ annotations: false, frozenSvg: fileSvg });
    const inherited = subsetPoints(filePts, extractPolygonPoints(audit.svg));

    const doorMarks = (audit.svg.match(/data-lock="east-garage-door"/g) || []).length;
    const doorsOk = doorMarks === 2;

    const coveredOpen = /COVERED/.test(fileSvg) || (archGate.checks && archGate.checks.coveredOpen && archGate.checks.coveredOpen.ok);
    const postsOk = archGate.checks && archGate.checks.posts && archGate.checks.posts.ok;
    const ridges = Arch.ROOF;
    const ridgeOk = ridges.A.pitch === 6.5 && ridges.B.pitch === 6.0;

    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const freeze = ParkFreeze && concept ? ParkFreeze.assertFrozen(concept) : { ok: false, fails: ['missing'] };

    const checks = {
      archMassing: {
        ok: archGate.verdict === 'PASS',
        detail: archGate.verdict === 'PASS' ? 'Architectural massing still PASS' : 'Massing not PASS',
      },
      frozenFileMatchesEngine: {
        ok: inheritFile.ok,
        detail: inheritFile.ok ? inheritFile.detail : inheritFile.detail,
      },
      fillsDoNotMoveGeometry: {
        ok: fillsOnly.ok,
        detail: fillsOnly.ok ? 'Material remap leaves polygon points unchanged' : fillsOnly.detail,
      },
      lockInheritsFrozen: {
        ok: inherited.ok,
        detail: inherited.detail,
      },
      eastDoorsLocked: {
        ok: doorsOk,
        detail: doorsOk ? 'Two east garage door planes SVG-locked from freeze rects' : `Door marks ${doorMarks}`,
      },
      ridges: {
        ok: ridgeOk,
        detail: 'A 27.0′ / B 26.5′ (20.5 + 6.5 / 6.0)',
      },
      postsAndCovered: {
        ok: !!(postsOk && coveredOpen),
        detail: 'Eight posts · covered stalls open',
      },
      parkingFreeze: {
        ok: freeze.ok,
        detail: freeze.ok ? 'Parking / paths frozen' : (freeze.fails || []).join('; '),
      },
      sfInvariant: {
        ok: archGate.living && ArchLock
          ? ArchLock.assertSf(archGate.living.A, archGate.living.B).ok
          : !!(archGate.living && archGate.living.A === 1639 && archGate.living.B === 1720),
        detail: archGate.living ? `A ${archGate.living.A} / B ${archGate.living.B} SF` : 'SF missing',
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_axon_lock',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      living: archGate.living,
      doorPolicy: 'east-plane-svg-locked',
      next: hard
        ? 'Axon lock PASS — Pennsylvania elevation may begin as representation-only. Floor-plan closure remains Priority #1.'
        : 'Repair inheritance failures. Do not move volumes to make a prettier picture.',
      freezeNote: hard
        ? 'Same-camera axon lock frozen as visualization baseline. Surfaces may be repainted; polygons and east door planes must not move.'
        : '',
      auditSvg: audit.svg,
      cleanSvg: clean.svg,
    };
  }

  return {
    PARENT,
    render,
    analyze,
    extractPolygonPoints,
    frozenEngineSvg,
    remapFills,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eAxonLock;
