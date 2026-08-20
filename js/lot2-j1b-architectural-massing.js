/**
 * Lot 2 — J1-B Architectural Massing (Image 3)
 * Same camera + footprints + heights as Image 2. Architecture only.
 * Roofs sit on upper volumes. Porches labeled as appendages.
 * Deterministic SVG — no generative AI volume invention.
 */
const Lot2J1BArchitecturalMassing = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const M = typeof Lot2J1BMassingTruth !== 'undefined' ? Lot2J1BMassingTruth : null;

  function requireMassing() {
    if (!M) throw new Error('Lot2J1BMassingTruth required');
    return M;
  }

  function roofOnUpper(rect, zTop, unit) {
    const { proj, polyPts, face } = requireMassing();
    const { x, y, w, h } = rect;
    const pitch = unit === 'A' ? 7 : 5.5; // roof rise above volume top (ft)
    const ridgeZ = zTop + pitch;
    const x0 = x;
    const x1 = x + w;
    const y0 = y;
    const y1 = y + h;
    const yMid = y + h / 2;
    // Gable ridge parallel to X (depth), peak at mid-Y — eaves at y0/y1
    const ridgeNear = proj(x1, yMid, ridgeZ);
    const ridgeFar = proj(x0, yMid, ridgeZ);
    const e0n = proj(x1, y0, zTop);
    const e1n = proj(x1, y1, zTop);
    const e0f = proj(x0, y0, zTop);
    const e1f = proj(x0, y1, zTop);
    const midX = x + w / 2;
    const depthKey = midX * 1000 + yMid + 50;
    const faces = [];
    // near gable (east)
    faces.push(face([e0n, ridgeNear, e1n], '#3a3f46', '#1a1d22', 0.96, depthKey + 2));
    // south roof plane
    faces.push(face([e1n, ridgeNear, ridgeFar, e1f], '#4a5058', '#1a1d22', 0.94, depthKey + 1.5));
    // north roof plane
    faces.push(face([e0n, e0f, ridgeFar, ridgeNear], '#555b64', '#1a1d22', 0.92, depthKey + 1.2));
    return faces;
  }

  function porchAppendage(groundRect, unit) {
    const { proj, polyPts, face, H } = requireMassing();
    // Project 4′ east of ground pod toward Pennsylvania — labeled APPENDAGE
    const depth = 4;
    const { x, y, w, h } = groundRect;
    const px0 = x + w;
    const px1 = x + w + depth;
    const py0 = y + h * 0.28;
    const py1 = y + h * 0.72;
    const z0 = 0;
    const z1 = 9;
    const midX = (px0 + px1) / 2;
    const midY = (py0 + py1) / 2;
    const depthKey = midX * 1000 + midY + 20;
    const A = proj(px1, py0, z1);
    const B = proj(px1, py1, z1);
    const C = proj(px0, py1, z1);
    const D = proj(px0, py0, z1);
    const E = proj(px1, py0, z0);
    const F = proj(px1, py1, z0);
    const G = proj(px0, py1, z0);
    const faces = [];
    faces.push(face([F, G, C, B], '#8b6b3e', '#3a2a16', 0.9, depthKey));
    faces.push(face([E, F, B, A], '#c4a574', '#3a2a16', 0.95, depthKey + 0.5));
    faces.push(face([A, B, C, D], '#a88855', '#3a2a16', 0.92, depthKey + 1));
    const label = proj(px1, midY, z1 + 1);
    const labelSvg = `<text x="${label.sx + 4}" y="${label.sy}" font-size="9" font-weight="800" fill="#7b5721">APPENDAGE · porch ${unit} (not core footprint)</text>`;
    // canopy slab
    const c0 = proj(px0, py0, z1);
    const c1 = proj(px1 + 1, py0, z1);
    const c2 = proj(px1 + 1, py1, z1);
    const c3 = proj(px0, py1, z1);
    faces.push(face([c0, c1, c2, c3], '#5c4030', '#1a1d22', 0.9, depthKey + 1.2));
    return { faces, labelSvg };
  }

  function windowsOnEast(rect, z0, z1, count) {
    const { proj, polyPts } = requireMassing();
    const { x, y, w, h } = rect;
    const x1 = x + w;
    let s = '';
    const margin = 3;
    const usable = h - margin * 2;
    const slot = usable / count;
    for (let i = 0; i < count; i++) {
      const cy0 = y + margin + slot * i + slot * 0.2;
      const cy1 = y + margin + slot * i + slot * 0.8;
      const levels = z1 - z0 > 14 ? 2 : 1;
      for (let Lvl = 0; Lvl < levels; Lvl++) {
        const band = (z1 - z0) / (levels + 1);
        const zz0 = z0 + band * (Lvl + 0.55);
        const zz1 = zz0 + Math.min(4.5, band * 0.55);
        const p = [proj(x1, cy0, zz1), proj(x1, cy1, zz1), proj(x1, cy1, zz0), proj(x1, cy0, zz0)];
        s += `<polygon points="${polyPts(p)}" fill="#dce8f5" fill-opacity="0.92" stroke="#2a6496" stroke-width="1.2"/>`;
      }
    }
    return s;
  }

  function stoneBaseBand(rect, zBand) {
    const { proj, polyPts, face } = requireMassing();
    const { x, y, w, h } = rect;
    const x0 = x;
    const x1 = x + w;
    const y0 = y;
    const y1 = y + h;
    const z0 = 0;
    const z1 = zBand;
    const midX = x + w / 2;
    const depthKey = midX * 1000 + (y + h / 2) + 0.1;
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

  function architecturalFills(kind, unit) {
    if (kind === 'garage') return { top: '#6e7a88', front: '#3d4550', side: '#525c68' };
    if (kind === 'ground') return { top: '#cfc6b6', front: '#b7ab96', side: '#c4baa8' };
    // upper siding
    if (unit === 'A') return { top: '#e6e0d4', front: '#d4cbb8', side: '#ddd5c5' };
    return { top: '#e2ddd2', front: '#cdc4b2', side: '#d8d0c0' };
  }

  function buildArchitecturalLayers() {
    const M = requireMassing();
    const c = L.CONCEPTS[M.ID];
    const H = M.H;
    const faces = [];
    const labels = [];
    const windows = [];
    const doors = [];

    // Core volumes — same rects/heights as Image 2
    (c.garages || []).forEach((g) => {
      const rect = M.bbox(g);
      const fills = architecturalFills('garage');
      const vol = M.boxFaces(rect, 0, H.garage, fills, 'garage');
      vol.faces.forEach((f) => faces.push(f));
      doors.push(M.doorOnEast(rect, 0, H.garage).replace('DOOR E', 'GARAGE DOOR E · recessed'));
      // soften door stroke already in doorOnEast
    });

    (c.units || []).forEach((u) => {
      const rect = M.bbox(u);
      const fills = architecturalFills('ground', u.unit);
      const vol = M.boxFaces(rect, 0, H.ground, fills, 'ground');
      // replace lower 3′ with stone band by drawing stone on east/south after
      vol.faces.forEach((f) => faces.push(f));
      stoneBaseBand(rect, 3).forEach((f) => faces.push(f));
      windows.push(windowsOnEast(rect, 3.5, H.ground - 0.5, 1));
      const porch = porchAppendage(rect, u.unit);
      porch.faces.forEach((f) => faces.push(f));
      labels.push(porch.labelSvg);
    });

    (c.upperUnits || []).forEach((u) => {
      const rect = M.bbox(u);
      const uh = u.unit === 'A' ? H.upperA : H.upperB;
      const fills = architecturalFills('upper', u.unit);
      const vol = M.boxFaces(rect, H.ground, H.ground + uh, fills, 'upper');
      vol.faces.forEach((f) => faces.push(f));
      windows.push(windowsOnEast(rect, H.ground + 2, H.ground + uh - 2, u.unit === 'A' ? 3 : 2));
      roofOnUpper(rect, H.ground + uh, u.unit).forEach((f) => faces.push(f));
    });

    faces.sort((a, b) => a.orderKey - b.orderKey);
    return { faces, labels, windows, doors };
  }

  function landscapeHints() {
    const { proj, polyPts } = requireMassing();
    // Soft ground wash only — not redesigning setbacks
    const a = proj(140, 8, 0);
    const b = proj(148, 8, 0);
    const c = proj(148, 42, 0);
    const d = proj(140, 42, 0);
    return `<polygon points="${polyPts([a, b, c, d])}" fill="#6b8f71" fill-opacity="0.18" stroke="none"/>
      <text x="${proj(144, 25, 0).sx}" y="${proj(144, 25, 0).sy + 20}" font-size="9" fill="#416145" opacity="0.7">planting strip (visual only)</text>`;
  }

  function titleBlock() {
    const M = requireMassing();
    return `
      <text x="${M.OX + 40}" y="28" font-size="13" font-weight="900" fill="#0d1b33">J1-B ARCHITECTURAL MASSING · IMAGE 3 · SAME CAMERA AS IMAGE 2</text>
      <text x="${M.OX + 40}" y="46" font-size="11" fill="#59636d">Core footprints/heights locked · roofs on upper volumes only · porches labeled APPENDAGE · faint footprint overlays retained</text>
    `;
  }

  /**
   * @param {{ showArchitecture?: boolean, showMassingUnderlay?: boolean, showFootprints?: boolean }} opts
   */
  function render(opts = {}) {
    const M = requireMassing();
    const showArchitecture = opts.showArchitecture !== false;
    const showMassingUnderlay = !!opts.showMassingUnderlay;
    const showFootprints = opts.showFootprints !== false;

    // Architecture off → exact Image 2
    if (!showArchitecture) {
      const massing = M.renderAxonSvg();
      return { ...massing, mode: 'massing-only' };
    }

    const arch = buildArchitecturalLayers();
    const massingVols = M.buildVolumes();

    let body = '';
    body += titleBlock();
    body += M.lotPolygonGround();
    body += landscapeHints();
    body += M.accessPathsGround();

    if (showMassingUnderlay) {
      const ghost = [];
      massingVols.forEach((v) => {
        v.faces.forEach((f) => {
          if (f.kind === 'footprint') return;
          ghost.push(f.svg.replace(/fill-opacity="[^"]*"/, 'fill-opacity="0.22"').replace(/stroke-width="[^"]*"/, 'stroke-width="0.8"'));
        });
      });
      body += `<g id="massing-underlay" opacity="0.9">${ghost.join('\n')}</g>`;
    }

    body += `<g id="architecture">${arch.faces.filter((f) => f.kind !== 'footprint').map((f) => f.svg).join('\n')}${arch.doors.join('\n')}${arch.windows.join('\n')}${arch.labels.join('\n')}</g>`;

    if (showFootprints) {
      massingVols.forEach((v) => {
        const fp = v.faces.find((f) => f.kind === 'footprint');
        if (fp) body += fp.svg.replace('opacity="0.85"', 'opacity="0.5"');
      });
    }

    const penn = M.proj(148, 25, 0);
    const rear = M.proj(5, 28, 0);
    body += `<text x="${penn.sx}" y="${penn.sy + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="#c34232">PENNSYLVANIA · SOUTH / FRONT (NEAR)</text>`;
    body += `<text x="${rear.sx}" y="${rear.sy}" text-anchor="middle" font-size="11" font-weight="800" fill="#2a6496">N / REAR (DEEP)</text>`;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${M.VB_W} ${M.VB_H}" role="img" aria-label="J1-B architectural massing">
      <rect width="${M.VB_W}" height="${M.VB_H}" fill="#f3efe8"/>
      ${body}
    </svg>`;

    return {
      svg,
      freeze: M.freezeCompare(),
      volumes: massingVols.map((v) => ({ kind: v.kind, id: v.id, name: v.name, rect: v.rect, z0: v.z0, z1: v.z1 })),
      heights: M.H,
      mode: showMassingUnderlay ? 'architecture+underlay' : 'architecture',
    };
  }

  return { render, buildArchitecturalLayers };
})();

if (typeof module !== 'undefined') module.exports = Lot2J1BArchitecturalMassing;
