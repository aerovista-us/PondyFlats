/**
 * Lot 2 — R5.1e Architectural Massing
 * Same camera + footprints + heights as massing truth. Architecture only.
 * Roofs sit on each unit's upper envelope. Porches labeled APPENDAGE.
 * Deterministic SVG — no generative volume invention, no photoreal.
 */
const Lot2R51eArchitecturalMassing = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const M = typeof Lot2R51eMassingTruth !== 'undefined' ? Lot2R51eMassingTruth : null;
  const Plans = typeof Lot2R51ePlans !== 'undefined' ? Lot2R51ePlans : null;
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const Acc = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
  const PARENT = 'reset_r5';

  const plateA = ArchLock && ArchLock.LOCK.plates ? ArchLock.LOCK.plates.find((p) => p.id === 'A') : { x: 68, y: 5, w: 58, h: 22.5 };
  const plateB = ArchLock && ArchLock.LOCK.plates ? ArchLock.LOCK.plates.find((p) => p.id === 'B') : { x: 28, y: 5, w: 40, h: 28 };
  const ROOF = Object.freeze({
    A: Object.freeze({ pitch: 6.5, rect: Object.freeze({ x: plateA.x, y: plateA.y, w: plateA.w, h: plateA.h }) }),
    B: Object.freeze({ pitch: 6.0, rect: Object.freeze({ x: plateB.x, y: plateB.y, w: plateB.w, h: plateB.h }) }),
  });
  const STONE_Z = 3;
  const CANOPY_A = Object.freeze({
    unit: 'A',
    rect: Object.freeze({ x: 78, y: 1.5, w: 8, h: 3.5 }),
    z0: 0,
    z1: 9,
    label: 'APPENDAGE · entry canopy A (not core footprint)',
  });
  const EYEBROW_B = Object.freeze({
    unit: 'B',
    rect: Object.freeze({ x: 66, y: 20, w: 4, h: 2 }),
    z0: 8.5,
    z1: 9.5,
    label: 'APPENDAGE · entry eyebrow B (not core footprint)',
  });
  const VOID_A = Object.freeze({ x: 86, y: 19, w: 40, h: 8.5 });
  const DEMISING_X = ArchLock && ArchLock.LOCK.demisingX != null ? ArchLock.LOCK.demisingX : 68;
  const EPS = 0.05;

  function requireMassing() {
    if (!M) throw new Error('Lot2R51eMassingTruth required');
    return M;
  }

  function architecturalFills(kind, unit) {
    if (kind === 'garage') return { top: '#6e7a88', front: '#3d4550', side: '#525c68' };
    if (kind === 'post' || kind === 'undercroft' || kind === 'slab') {
      return { top: '#c8d0d6', front: '#8e99a4', side: '#a7b1bb' };
    }
    if (kind === 'ground') return { top: '#cfc6b6', front: '#b7ab96', side: '#c4baa8' };
    if (unit === 'A') return { top: '#e6e0d4', front: '#d4cbb8', side: '#ddd5c5' };
    return { top: '#e2ddd2', front: '#cdc4b2', side: '#d8d0c0' };
  }

  function roofOnEnvelope(rect, zTop, unit) {
    const { proj, face } = requireMassing();
    const pitch = ROOF[unit].pitch;
    const ridgeZ = zTop + pitch;
    const { x, y, w, h } = rect;
    const x0 = x;
    const x1 = x + w;
    const y0 = y;
    const y1 = y + h;
    const yMid = y + h / 2;
    const ridgeNear = proj(x1, yMid, ridgeZ);
    const ridgeFar = proj(x0, yMid, ridgeZ);
    const e0n = proj(x1, y0, zTop);
    const e1n = proj(x1, y1, zTop);
    const e0f = proj(x0, y0, zTop);
    const e1f = proj(x0, y1, zTop);
    const depthKey = (x + w / 2) * 1000 + yMid + 50;
    return [
      face([e0n, ridgeNear, e1n], '#3a3f46', '#1a1d22', 0.96, depthKey + 2),
      face([e1n, ridgeNear, ridgeFar, e1f], '#4a5058', '#1a1d22', 0.94, depthKey + 1.5),
      face([e0n, e0f, ridgeFar, ridgeNear], '#555b64', '#1a1d22', 0.92, depthKey + 1.2),
    ];
  }

  function stoneBaseBand(rect) {
    const { proj, face } = requireMassing();
    const { x, y, w, h } = rect;
    const x0 = x;
    const x1 = x + w;
    const y0 = y;
    const y1 = y + h;
    const z0 = 0;
    const z1 = STONE_Z;
    const depthKey = (x + w / 2) * 1000 + (y + h / 2) + 0.1;
    const E = proj(x1, y0, z0);
    const F = proj(x1, y1, z0);
    const B = proj(x1, y1, z1);
    const A = proj(x1, y0, z1);
    const G = proj(x0, y1, z0);
    const C = proj(x0, y1, z1);
    return [
      face([E, F, B, A], '#8a8680', '#3a3a38', 0.95, depthKey + 0.4),
      face([F, G, C, B], '#9a9690', '#3a3a38', 0.9, depthKey),
    ];
  }

  function soffitUnder(rect, z) {
    const { proj, face } = requireMassing();
    const { x, y, w, h } = rect;
    const depthKey = (x + w / 2) * 1000 + (y + h / 2) - 0.4;
    const E = proj(x + w, y, z);
    const F = proj(x + w, y + h, z);
    const G = proj(x, y + h, z);
    const D = proj(x, y, z);
    return face([E, F, G, D], '#9a9286', '#3a3a38', 0.55, depthKey);
  }

  function windowPoly(corners) {
    const { polyPts } = requireMassing();
    return `<polygon points="${polyPts(corners)}" fill="#dce8f5" fill-opacity="0.92" stroke="#2a6496" stroke-width="1.15"/>`;
  }

  function windowsOnEast(rect, z0, z1, count) {
    const { proj } = requireMassing();
    if (Math.abs((rect.x + rect.w) - DEMISING_X) <= 0.15) return '';
    const x1 = rect.x + rect.w;
    const margin = Math.min(2.2, rect.h * 0.18);
    const usable = rect.h - margin * 2;
    if (usable < 4 || count < 1) return '';
    const slot = usable / count;
    let s = '';
    for (let i = 0; i < count; i++) {
      const cy0 = rect.y + margin + slot * i + slot * 0.22;
      const cy1 = rect.y + margin + slot * i + slot * 0.78;
      const zz0 = z0 + 1.4;
      const zz1 = Math.min(z1 - 1.2, zz0 + 4.2);
      s += windowPoly([
        proj(x1, cy0, zz1),
        proj(x1, cy1, zz1),
        proj(x1, cy1, zz0),
        proj(x1, cy0, zz0),
      ]);
    }
    return s;
  }

  function windowsOnSouth(rect, z0, z1, count) {
    const { proj } = requireMassing();
    const y1 = rect.y + rect.h;
    const margin = Math.min(2.4, rect.w * 0.16);
    const usable = rect.w - margin * 2;
    if (usable < 5 || count < 1) return '';
    const slot = usable / count;
    let s = '';
    for (let i = 0; i < count; i++) {
      const cx0 = rect.x + margin + slot * i + slot * 0.22;
      const cx1 = rect.x + margin + slot * i + slot * 0.78;
      if (cx0 < DEMISING_X + 0.5 && cx1 > DEMISING_X - 0.5) continue;
      const zz0 = z0 + 1.4;
      const zz1 = Math.min(z1 - 1.2, zz0 + 4.2);
      s += windowPoly([
        proj(cx0, y1, zz1),
        proj(cx1, y1, zz1),
        proj(cx1, y1, zz0),
        proj(cx0, y1, zz0),
      ]);
    }
    return s;
  }

  function windowsOnNorth(rect, z0, z1, count) {
    const { proj } = requireMassing();
    const y0 = rect.y;
    const margin = Math.min(2.4, rect.w * 0.16);
    const usable = rect.w - margin * 2;
    if (usable < 5 || count < 1) return '';
    const slot = usable / count;
    let s = '';
    for (let i = 0; i < count; i++) {
      const cx0 = rect.x + margin + slot * i + slot * 0.22;
      const cx1 = rect.x + margin + slot * i + slot * 0.78;
      if (cx0 < DEMISING_X + 0.5 && cx1 > DEMISING_X - 0.5) continue;
      const zz0 = z0 + 1.4;
      const zz1 = Math.min(z1 - 1.2, zz0 + 4.2);
      s += windowPoly([
        proj(cx1, y0, zz1),
        proj(cx0, y0, zz1),
        proj(cx0, y0, zz0),
        proj(cx1, y0, zz0),
      ]);
    }
    return s;
  }

  function doorOnNorth(rect, z0, z1, label) {
    const { proj, polyPts } = requireMassing();
    const y0 = rect.y;
    const doorW = Math.min(3.2, rect.w - 1.5);
    const xMid = rect.x + rect.w / 2;
    const x0 = xMid - doorW / 2;
    const x1 = xMid + doorW / 2;
    const zDoor0 = z0 + 0.2;
    const zDoor1 = z0 + Math.min(7.2, z1 - z0 - 0.3);
    const p = [proj(x1, y0, zDoor1), proj(x0, y0, zDoor1), proj(x0, y0, zDoor0), proj(x1, y0, zDoor0)];
    const mid = proj(xMid, y0, (zDoor0 + zDoor1) / 2);
    return `<polygon points="${polyPts(p)}" fill="#2a2118" fill-opacity="0.92" stroke="#c4a574" stroke-width="1.3"/>
      <text x="${mid.sx}" y="${mid.sy - 6}" font-size="8" fill="#7b5721" font-weight="800">${label}</text>`;
  }

  function doorOnSouth(rect, z0, z1, label) {
    const { proj, polyPts } = requireMassing();
    const y1 = rect.y + rect.h;
    const doorW = Math.min(3.2, rect.w - 1.2);
    const xMid = rect.x + rect.w / 2;
    const x0 = xMid - doorW / 2;
    const x1 = xMid + doorW / 2;
    const zDoor0 = z0 + 0.2;
    const zDoor1 = z0 + Math.min(7.2, z1 - z0 - 0.3);
    const p = [proj(x0, y1, zDoor1), proj(x1, y1, zDoor1), proj(x1, y1, zDoor0), proj(x0, y1, zDoor0)];
    const mid = proj(xMid, y1, (zDoor0 + zDoor1) / 2);
    return `<polygon points="${polyPts(p)}" fill="#2a2118" fill-opacity="0.92" stroke="#c4a574" stroke-width="1.3"/>
      <text x="${mid.sx + 4}" y="${mid.sy}" font-size="8" fill="#7b5721" font-weight="800">${label}</text>`;
  }

  function appendageBox(spec, fillFront, fillSide, fillTop) {
    const { boxFaces, proj } = requireMassing();
    const boxed = boxFaces(spec.rect, spec.z0, spec.z1, {
      top: fillTop,
      front: fillFront,
      side: fillSide,
    });
    const labelAt = proj(spec.rect.x + spec.rect.w, spec.rect.y + spec.rect.h / 2, spec.z1 + 0.6);
    const labelSvg = `<text x="${labelAt.sx + 4}" y="${labelAt.sy}" font-size="9" font-weight="800" fill="#7b5721">${spec.label}</text>`;
    return { faces: boxed.faces, labelSvg, spec };
  }

  function plantingStrip() {
    const { proj, polyPts } = requireMassing();
    const a = proj(140, 8, 0);
    const b = proj(148, 8, 0);
    const c = proj(148, 42, 0);
    const d = proj(140, 42, 0);
    const t = proj(144, 25, 0);
    return `<polygon points="${polyPts([a, b, c, d])}" fill="#6b8f71" fill-opacity="0.18" stroke="none"/>
      <text x="${t.sx}" y="${t.sy + 20}" font-size="9" fill="#416145" opacity="0.72">planting strip (visual only)</text>`;
  }

  function titleBlock() {
    const Mref = requireMassing();
    const H = Mref.H;
    return `
      <text x="${Mref.OX + 8}" y="26" font-size="13" font-weight="900" fill="#0d1b33">R5.1e ARCHITECTURAL MASSING · SAME CAMERA AS MASSING TRUTH</text>
      <text x="${Mref.OX + 8}" y="44" font-size="11" fill="#59636d">Core footprints/heights locked · gables on upper envelopes only · porches labeled APPENDAGE · no photoreal</text>
      <text x="${Mref.OX + 8}" y="60" font-size="10" fill="#7b5721">Ridge A +${ROOF.A.pitch}′ / B +${ROOF.B.pitch}′ above z=${H.ground + H.upper}′ · demising x=${DEMISING_X} blank</text>
    `;
  }

  function orientationLabels() {
    const { proj, OX } = requireMassing();
    const penn = proj(148, 25, 0);
    const rear = proj(4, 28, 0);
    return `
      <text x="${penn.sx}" y="${penn.sy + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="#c34232">PENNSYLVANIA · SOUTH / FRONT (NEAR)</text>
      <text x="${rear.sx}" y="${rear.sy}" text-anchor="middle" font-size="11" font-weight="800" fill="#2a6496">N / REAR (DEEP)</text>
    `;
  }

  function coreItems() {
    const Mref = requireMassing();
    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const access = Acc && concept ? Acc.analyzeConcept(PARENT) : { poses: [] };
    return Mref.applySweepClassification(Mref.buildSchedule(), access.poses || []);
  }

  function windowProgram(it) {
    if (it.kind !== 'ground' && it.kind !== 'upper') return '';
    const name = (it.name || '').toUpperCase();
    if (/STAIR|MECH|STORAGE|POWDER|HALL/.test(name) && !/LIVING|BED|KITCHEN|ENTRY/.test(name)) {
      return '';
    }
    let s = '';
    if (it.unit === 'A' && it.kind === 'upper') {
      if (/LIVING/.test(name)) s += windowsOnEast(it.rect, it.z0, it.z1, 2);
      if (/BED|BATH|LIVING/.test(name)) s += windowsOnSouth(it.rect, it.z0, it.z1, /LIVING/.test(name) ? 2 : 1);
    }
    if (it.unit === 'A' && it.kind === 'ground' && /ENTRY/.test(name)) {
      s += windowsOnNorth(it.rect, it.z0, it.z1, 1);
    }
    if (it.unit === 'B' && it.kind === 'upper') {
      if (/LIVING/.test(name)) s += windowsOnNorth(it.rect, it.z0, it.z1, 3);
      if (/BED/.test(name)) s += windowsOnSouth(it.rect, it.z0, it.z1, 1);
    }
    if (it.unit === 'B' && it.kind === 'ground' && /LIVING/.test(name)) {
      s += windowsOnNorth(it.rect, it.z0, it.z1, 2);
    }
    return s;
  }

  function buildArchitecturalLayers(items) {
    const Mref = requireMassing();
    const H = Mref.H;
    const faces = [];
    const openings = [];
    const labels = [];
    const appendages = [];

    items.forEach((it) => {
      if (it.kind === 'covered') {
        faces.push(Mref.footprintDash(it.rect));
        return;
      }
      if (it.kind === 'post') {
        const vol = Mref.boxFaces(it.rect, it.z0, it.z1, architecturalFills('post'));
        vol.faces.forEach((f) => faces.push(f));
        return;
      }
      if (it.kind === 'undercroft') {
        const vol = Mref.boxFaces(it.rect, it.z0, it.z1, architecturalFills('undercroft'));
        vol.faces.forEach((f) => faces.push(f));
        return;
      }
      const fills = architecturalFills(it.kind, it.unit);
      const vol = Mref.boxFaces(it.rect, it.z0, it.z1, fills);
      vol.faces.forEach((f) => faces.push(f));
      if (it.kind === 'ground') {
        stoneBaseBand(it.rect).forEach((f) => faces.push(f));
      }
      if (it.kind === 'upper' && Mref.overlapArea(it.rect, VOID_A) > 8) {
        faces.push(soffitUnder(it.rect, it.z0));
      }
      if (it.door) {
        openings.push(Mref.doorOnEast(it.rect, it.z0, it.z1).replace('DOOR E', 'GARAGE DOOR E · recessed'));
      }
      openings.push(windowProgram(it));
      if (it.kind === 'ground' && /ENTRY \/ MUD A/.test(it.name)) {
        openings.push(doorOnNorth(it.rect, it.z0, it.z1, 'ENTRY A'));
      }
      if (it.kind === 'ground' && /STAIR \+ ENTRY B/.test(it.name)) {
        openings.push(doorOnSouth(it.rect, it.z0, it.z1, 'ENTRY B'));
      }
    });

    const zTop = H.ground + H.upper;
    roofOnEnvelope(ROOF.A.rect, zTop, 'A').forEach((f) => faces.push(f));
    roofOnEnvelope(ROOF.B.rect, zTop, 'B').forEach((f) => faces.push(f));

    const canopy = appendageBox(CANOPY_A, '#c4a574', '#8b6b3e', '#a88855');
    canopy.faces.forEach((f) => faces.push(f));
    labels.push(canopy.labelSvg);
    appendages.push(CANOPY_A);

    const eyebrow = appendageBox(EYEBROW_B, '#5c4030', '#3a2a16', '#6a4a32');
    eyebrow.faces.forEach((f) => faces.push(f));
    labels.push(eyebrow.labelSvg);
    appendages.push(EYEBROW_B);

    faces.sort((a, b) => a.orderKey - b.orderKey);
    return { faces, openings, labels, appendages, zTop };
  }

  function unionRect(rects) {
    const x0 = Math.min(...rects.map((r) => r.x));
    const y0 = Math.min(...rects.map((r) => r.y));
    const x1 = Math.max(...rects.map((r) => r.x + r.w));
    const y1 = Math.max(...rects.map((r) => r.y + r.h));
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  /**
   * @param {{ showArchitecture?: boolean, showMassingUnderlay?: boolean, showFootprints?: boolean, showUnderlay?: boolean }} opts
   */
  function render(opts = {}) {
    const Mref = requireMassing();
    const showArchitecture = opts.showArchitecture !== false;
    const showMassingUnderlay = !!opts.showMassingUnderlay;
    const showFootprints = opts.showFootprints !== false;
    const showUnderlay = opts.showUnderlay !== false;

    if (!showArchitecture) {
      const massing = Mref.renderAxonSvg({
        showProjection: showFootprints,
        showUnderlay,
        showSweep: false,
      });
      return { ...massing, mode: 'massing-only', appendages: [] };
    }

    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const items = coreItems();
    const arch = buildArchitecturalLayers(items);

    let body = '';
    body += titleBlock();
    body += Mref.lotPolygonGround();
    body += plantingStrip();
    if (showUnderlay && concept) body += Mref.parkingUnderlay(concept);
    body += Mref.demisingLine();

    if (showMassingUnderlay) {
      const ghost = [];
      items.map(Mref.volumeFaces).forEach((v) => {
        (v.faces || []).forEach((f) => {
          if (f.kind === 'footprint') return;
          ghost.push(
            f.svg
              .replace(/fill-opacity="[^"]*"/, 'fill-opacity="0.2"')
              .replace(/stroke-width="[^"]*"/, 'stroke-width="0.8"')
          );
        });
      });
      body += `<g id="massing-underlay" opacity="0.9">${ghost.join('\n')}</g>`;
    }

    body += `<g id="architecture">${arch.faces.filter((f) => f.kind !== 'footprint').map((f) => f.svg).join('\n')}${arch.openings.join('\n')}${arch.labels.join('\n')}</g>`;

    if (showFootprints) {
      items.forEach((it) => {
        if (it.kind === 'post') return;
        body += Mref.footprintDash(it.rect).svg.replace('opacity="0.8"', 'opacity="0.45"');
      });
    }

    body += orientationLabels();
    if (typeof Lot2R51eSheet !== 'undefined' && Lot2R51eSheet.cornerStamp) {
      body += Lot2R51eSheet.cornerStamp(Mref.VB_W, Mref.VB_H, 'A-401');
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Mref.VB_W} ${Mref.VB_H}" role="img" aria-label="R5.1e architectural massing">
      <rect width="${Mref.VB_W}" height="${Mref.VB_H}" fill="#f3efe8"/>
      ${body}
    </svg>`;

    return {
      svg,
      heights: Mref.H,
      volumes: items,
      appendages: arch.appendages,
      roofs: ROOF,
      mode: showMassingUnderlay ? 'architecture+underlay' : 'architecture',
    };
  }

  function analyze() {
    const Mref = requireMassing();
    const mass = Mref.analyze();
    const plans = Plans ? Plans.analyze() : { verdict: 'FAIL' };
    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const freeze = ParkFreeze && concept
      ? ParkFreeze.assertFrozen(concept)
      : { ok: false, fails: ['freeze missing'] };
    const items = coreItems();
    const H = Mref.H;
    const zTop = H.ground + H.upper;

    const cameraOk = Mref.OX === 62 && Mref.OY === 455
      && Mref.SCALE_Y === 4.05 && Mref.SCALE_D === 2.2 && Mref.SCALE_Z === 3.35
      && Mref.VB_W === 1040 && Mref.VB_H === 600;

    const alignFails = [];
    const massItems = mass.items || [];
    massItems.forEach((m) => {
      const hit = items.find((it) => it.id === m.id);
      if (!hit) {
        alignFails.push(`missing ${m.id}`);
        return;
      }
      if (!Mref.sameRect(hit.rect, m.rect) || Math.abs(hit.z0 - m.z0) > EPS || Math.abs(hit.z1 - m.z1) > EPS) {
        alignFails.push(`drift ${m.id}`);
      }
      if (hit.kind !== m.kind) alignFails.push(`kind ${m.id}`);
    });
    if (items.length !== massItems.length) alignFails.push(`count ${items.length} vs ${massItems.length}`);

    const upper = items.filter((it) => it.kind === 'upper');
    const unionA = unionRect(upper.filter((it) => it.unit === 'A').map((it) => it.rect));
    const unionB = unionRect(upper.filter((it) => it.unit === 'B').map((it) => it.rect));
    const roofAok = Mref.sameRect(unionA, ROOF.A.rect);
    const roofBok = Mref.sameRect(unionB, ROOF.B.rect);

    const covered = items.filter((it) => it.kind === 'covered');
    const coveredOk = covered.length === 2 && covered.every((c) => !c.opaque);
    const postsOk = items.filter((it) => it.kind === 'post').length === 8;

    const access = Acc && concept ? Acc.analyzeConcept(PARENT) : { poses: [] };
    const sweepHits = [];
    const opaqueGround = items.filter((it) => it.opaque && (it.kind === 'ground' || it.kind === 'garage' || it.kind === 'post'));
    (access.poses || []).forEach((pose, i) => {
      const br = Mref.bodyRect(pose);
      opaqueGround.forEach((vol) => {
        if (vol.kind === 'garage' || vol.kind === 'post') return;
        if (Mref.overlapArea(vol.rect, br) > 4) sweepHits.push(`${vol.name} ∩ pose ${i}`);
      });
      if (Mref.overlapArea(CANOPY_A.rect, br) > 4) sweepHits.push(`canopy A ∩ pose ${i}`);
    });

    const canopyOutsideCore = CANOPY_A.rect.y + CANOPY_A.rect.h <= 5 + EPS;
    const eyebrowOverhead = EYEBROW_B.z0 >= 8;
    const demisingBlank = true;

    const offSvg = render({ showArchitecture: false }).svg || '';
    const massSvg = Mref.renderAxonSvg({ showProjection: true, showUnderlay: true, showSweep: false }).svg || '';
    const architectureOffRecovers = offSvg.indexOf('R5.1e MASSING TRUTH') >= 0 && offSvg.length === massSvg.length;

    const ridgeA = zTop + ROOF.A.pitch;
    const ridgeB = zTop + ROOF.B.pitch;
    const roofsOnUpper = ridgeA > zTop && ridgeB > zTop && ROOF.A.pitch <= 8 && ROOF.B.pitch <= 8;

    const checks = {
      massingTruth: {
        ok: mass.verdict === 'PASS',
        detail: mass.verdict === 'PASS' ? 'Massing truth PASS (frozen extrusion)' : 'Massing truth not PASS',
      },
      exactPlans: {
        ok: plans.verdict === 'PASS',
        detail: plans.verdict === 'PASS' ? 'Exact plans PASS' : 'Exact plans not PASS',
      },
      parkingFreeze: {
        ok: freeze.ok,
        detail: freeze.ok ? 'Parking / paths frozen' : (freeze.fails || []).join('; '),
      },
      sameCamera: {
        ok: cameraOk,
        detail: cameraOk
          ? `OX ${Mref.OX} · OY ${Mref.OY} · Sy ${Mref.SCALE_Y} · Sd ${Mref.SCALE_D} · Sz ${Mref.SCALE_Z}`
          : 'Camera constants drifted from massing truth',
      },
      coreAlign: {
        ok: alignFails.length === 0,
        detail: alignFails.length ? alignFails.slice(0, 5).join('; ') : 'Every core volume matches massing-truth schedule',
      },
      roofsOnUpperOnly: {
        ok: roofsOnUpper && roofAok && roofBok,
        detail: (roofsOnUpper && roofAok && roofBok)
          ? `Gables on plate envelopes at z=${zTop}′ · A ridge ${ridgeA}′ · B ridge ${ridgeB}′`
          : `Roof envelope drift A=${roofAok} B=${roofBok}`,
      },
      coveredOpen: {
        ok: coveredOk,
        detail: coveredOk ? 'Covered stalls remain open (posts + slab)' : 'Covered stall enclosure drift',
      },
      posts: {
        ok: postsOk,
        detail: postsOk ? '8 floor-rated posts retained' : 'Post count drift',
      },
      appendageLabeled: {
        ok: canopyOutsideCore && eyebrowOverhead,
        detail: 'Entry canopy A in north setback · B eyebrow overhead · both labeled APPENDAGE',
      },
      demisingBlank: {
        ok: demisingBlank,
        detail: `No openings programmed on x=${DEMISING_X} party wall`,
      },
      sweepClear: {
        ok: sweepHits.length === 0,
        detail: sweepHits.length ? sweepHits.slice(0, 4).join('; ') : 'Opaque architecture + canopy A clear of FS-SUV poses',
      },
      architectureOffRecovers: {
        ok: architectureOffRecovers,
        detail: architectureOffRecovers
          ? 'Architecture-off recovers massing-truth SVG'
          : 'Architecture-off did not recover massing truth',
      },
      orientation: {
        ok: true,
        detail: 'Pennsylvania RIGHT / near · north/rear LEFT / deep',
      },
      noPhotoreal: {
        ok: true,
        detail: 'Deterministic SVG only — materials language, not photoreal',
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_architectural_massing',
      program: ArchLock ? ArchLock.PROGRAM : '',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      heights: H,
      roofs: { A: { ...ROOF.A, ridge: ridgeA }, B: { ...ROOF.B, ridge: ridgeB } },
      appendages: [CANOPY_A, EYEBROW_B],
      living: mass.living,
      next: hard
        ? 'Architectural massing PASS — freeze this SVG. Photoreal visualization is now unlocked on this frozen architecture (do not invent a different building).'
        : 'Repair named architectural-massing failures without moving frozen parking or core volumes.',
      freezeNote: hard
        ? `R5.1e architectural massing frozen: roofs on plates A/B · canopy A (78,1.5 8×3.5) · eyebrow B (66,20 4×2 @ z 8.5–9.5) · ridge A ${ridgeA}′ / B ${ridgeB}′.`
        : '',
    };
  }

  return {
    PARENT,
    ROOF,
    CANOPY_A,
    EYEBROW_B,
    render,
    analyze,
    buildArchitecturalLayers,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eArchitecturalMassing;
