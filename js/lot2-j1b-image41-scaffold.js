/**
 * Lot 2 — Image 4.1 finished base (lock scaffold)
 *
 * Deterministic SVG only. Same camera + footprints as Image 3.
 * East garage door polygons are drawn from frozen rects — never inferred
 * or relocated by a generative pass.
 *
 * @param {{ finished?: boolean, annotations?: boolean }} opts
 *   annotations:true  → audit export (labels, NO DOOR, porch caps, arrows)
 *   annotations:false → clean duplicate for finished imagery (geometry + doors only)
 */
const Lot2J1BImage41Scaffold = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Arch = typeof Lot2J1BArchitecturalMassing !== 'undefined' ? Lot2J1BArchitecturalMassing : null;
  const M = typeof Lot2J1BMassingTruth !== 'undefined' ? Lot2J1BMassingTruth : null;

  function requireDeps() {
    if (!Arch || !M) throw new Error('Architectural massing + massing truth required');
    return { Arch, M };
  }

  function asphaltPaths(annotated) {
    const { proj, polyPts } = M;
    const c = L.CONCEPTS[M.ID];
    let s = '';
    (c.accessPaths || []).forEach((ap) => {
      const pts = (ap.path || []).map(([x, y]) => proj(x, y, 0.12));
      if (pts.length < 2) return;
      s += `<polyline points="${polyPts(pts)}" fill="none" stroke="#4a5058" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.72"/>`;
      s += `<polyline points="${polyPts(pts)}" fill="none" stroke="#d7d2ca" stroke-width="2" stroke-dasharray="7 5" opacity="0.9"/>`;
      if (!annotated) return;
      const mid = pts[Math.floor(pts.length / 2)];
      s += `<text x="${mid.sx + 10}" y="${mid.sy - 8}" font-size="11" font-weight="900" fill="#0d1b33">ACCESS ${ap.garage} → EAST DOOR (locked)</text>`;
      (ap.path || []).forEach((p, i) => {
        const q = proj(p[0], p[1], 0.2);
        s += `<circle cx="${q.sx}" cy="${q.sy}" r="3.5" fill="#efb34d" stroke="#0d1b33" stroke-width="1"/>`;
        s += `<text x="${q.sx + 6}" y="${q.sy - 6}" font-size="9" fill="#445">${ap.garage}${i} (${p[0]},${p[1]})</text>`;
      });
    });
    return s;
  }

  function porchEnvelopeOutline(groundRect, unit) {
    const { proj, polyPts } = M;
    const depth = 4;
    const { x, y, w, h } = groundRect;
    const px0 = x + w;
    const px1 = x + w + depth;
    const py0 = y + h * 0.28;
    const py1 = y + h * 0.72;
    const z0 = 0;
    const z1 = 9;
    const corners = [
      proj(px0, py0, z0),
      proj(px1, py0, z0),
      proj(px1, py1, z0),
      proj(px0, py1, z0),
      proj(px0, py0, z1),
      proj(px1, py0, z1),
      proj(px1, py1, z1),
      proj(px0, py1, z1),
    ];
    const base = [corners[0], corners[1], corners[2], corners[3]];
    const top = [corners[4], corners[5], corners[6], corners[7]];
    const east = [corners[1], corners[2], corners[6], corners[5]];
    const mid = proj(px1, (py0 + py1) / 2, z1 + 1);
    return `
      <polygon points="${polyPts(base)}" fill="none" stroke="#c45c4a" stroke-width="2.4" stroke-dasharray="5 3"/>
      <polygon points="${polyPts(top)}" fill="#c45c4a" fill-opacity="0.14" stroke="#c45c4a" stroke-width="2.2"/>
      <polygon points="${polyPts(east)}" fill="none" stroke="#c45c4a" stroke-width="2.4"/>
      <text x="${mid.sx + 6}" y="${mid.sy}" font-size="10" font-weight="900" fill="#9a3b2e">PORCH ${unit} CAP · 4′ E only (locked)</text>
    `;
  }

  /** East garage door — final paint layer. Coordinates from frozen garage rect only. */
  function eastGarageDoorLocked(rect, unitId, annotated) {
    const { proj, polyPts, H } = M;
    const { x, y, w, h } = rect;
    const x1 = x + w;
    const doorW = Math.min(16, h - 4);
    const yMid = y + h / 2;
    const y0 = yMid - doorW / 2;
    const y1 = yMid + doorW / 2;
    const z0 = 0.5;
    const z1 = Math.min(8.5, H.garage - 0.5);
    const face = [proj(x1, y, H.garage), proj(x1, y + h, H.garage), proj(x1, y + h, 0), proj(x1, y, 0)];
    const door = [proj(x1, y0, z1), proj(x1, y1, z1), proj(x1, y1, z0), proj(x1, y0, z0)];
    const ySplit = yMid;
    const split = [proj(x1, ySplit, z1), proj(x1, ySplit, z0)];
    let s = `
      <polygon points="${polyPts(face)}" fill="${annotated ? '#efb34d' : '#5a6570'}" fill-opacity="${annotated ? 0.34 : 0.2}" stroke="${annotated ? '#c45c4a' : '#2a3038'}" stroke-width="${annotated ? 2.8 : 1.2}"/>
      <polygon points="${polyPts(door)}" fill="#12151a" fill-opacity="0.92" stroke="${annotated ? '#ff2d1f' : '#1a1d22'}" stroke-width="${annotated ? 3.4 : 1.4}"/>
      <line x1="${split[0].sx}" y1="${split[0].sy}" x2="${split[1].sx}" y2="${split[1].sy}" stroke="#3a4048" stroke-width="1.2"/>
    `;
    if (annotated) {
      const label = proj(x1, yMid, (z0 + z1) / 2);
      const arrowTip = proj(x1 + 6, yMid, (z0 + z1) / 2);
      s += `
      <line x1="${label.sx}" y1="${label.sy}" x2="${arrowTip.sx}" y2="${arrowTip.sy}" stroke="#ff2d1f" stroke-width="2"/>
      <polygon points="${arrowTip.sx},${arrowTip.sy - 5} ${arrowTip.sx + 9},${arrowTip.sy} ${arrowTip.sx},${arrowTip.sy + 5}" fill="#ff2d1f"/>
      <text x="${arrowTip.sx + 12}" y="${arrowTip.sy + 4}" font-size="12" font-weight="900" fill="#9a3b2e">GARAGE ${unitId} · EAST PLANE ONLY · opens to Access A</text>`;
    }
    return s;
  }

  function upperTraceLabels() {
    const { proj } = M;
    const c = L.CONCEPTS[M.ID];
    let s = '';
    (c.upperUnits || []).forEach((u) => {
      const r = M.bbox(u);
      const uh = u.unit === 'A' ? M.H.upperA : M.H.upperB;
      const p = proj(r.x + r.w / 2, r.y + r.h / 2, M.H.ground + uh + 1);
      const name = u.name || (u.unit === 'A' ? 'UPPER A' : 'UPPER B');
      s += `<text x="${p.sx}" y="${p.sy}" text-anchor="middle" font-size="10" font-weight="900" fill="#2a6496">${name} · roof on this polygon only</text>`;
    });
    return s;
  }

  function titleBlock(annotated) {
    if (!annotated) {
      return `<text x="${M.OX + 40}" y="28" font-size="12" font-weight="800" fill="#59636d">J1-B · Image 4.1 clean base · locked geometry · east doors</text>`;
    }
    return `
      <text x="${M.OX + 40}" y="26" font-size="13" font-weight="900" fill="#0d1b33">J1-B IMAGE 4.1 · APPROVED LOCK SCAFFOLD (AUDIT ANNOTATED)</text>
      <text x="${M.OX + 40}" y="44" font-size="11" fill="#59636d">Same camera as Image 3 · east garage planes from frozen rects · porch caps 4′ E · independent roofs · Access A</text>
    `;
  }

  function southFaceNoDoorCallout(rect, unitId) {
    const { proj, polyPts, H } = M;
    const { x, y, w, h } = rect;
    const y1 = y + h;
    const face = [
      proj(x, y1, H.garage),
      proj(x + w, y1, H.garage),
      proj(x + w, y1, 0),
      proj(x, y1, 0),
    ];
    const mid = proj(x + w / 2, y1, H.garage / 2);
    return `
      <polygon points="${polyPts(face)}" fill="none" stroke="#2a6496" stroke-width="1.6" stroke-dasharray="4 3" opacity="0.85"/>
      <text x="${mid.sx}" y="${mid.sy}" text-anchor="middle" font-size="9" font-weight="800" fill="#2a6496">GARAGE ${unitId} NEAR FACE · NO DOOR</text>
    `;
  }

  /**
   * @param {{ finished?: boolean, annotations?: boolean }} opts
   */
  function render(opts = {}) {
    requireDeps();
    const finished = opts.finished !== false;
    const annotated = opts.annotations !== false;
    const c = L.CONCEPTS[M.ID];

    const arch = Arch.buildArchitecturalLayers();
    const facesSvg = arch.faces
      .filter((f) => f.kind !== 'footprint')
      .map((f) => f.svg)
      .join('\n');

    let body = '';
    body += titleBlock(annotated);
    body += M.lotPolygonGround();
    const a = M.proj(140, 8, 0);
    const b = M.proj(148, 8, 0);
    const cc = M.proj(148, 42, 0);
    const d = M.proj(140, 42, 0);
    body += `<polygon points="${M.polyPts([a, b, cc, d])}" fill="#6b8f71" fill-opacity="0.16" stroke="none"/>`;
    body += asphaltPaths(annotated);

    // Architecture: skip porch APPENDAGE text labels when clean
    const porchLabels = annotated ? arch.labels.join('\n') : '';
    body += `<g id="architecture-locked">${facesSvg}
      ${arch.windows.join('\n')}
      ${porchLabels}
    </g>`;

    if (annotated) {
      const massingVols = M.buildVolumes();
      massingVols.forEach((v) => {
        const fp = v.faces.find((f) => f.kind === 'footprint');
        if (fp) body += fp.svg.replace('opacity="0.85"', 'opacity="0.55"');
      });
      body += `<g id="upper-trace">${upperTraceLabels()}</g>`;
      let locks = '<g id="image41-locks">';
      (c.units || []).forEach((u) => {
        locks += porchEnvelopeOutline(M.bbox(u), u.unit);
      });
      (c.garages || []).forEach((g) => {
        locks += southFaceNoDoorCallout(M.bbox(g), g.id);
      });
      locks += '</g>';
      body += locks;
    }

    let doors = '<g id="east-garage-doors-locked">';
    (c.garages || []).forEach((g) => {
      doors += eastGarageDoorLocked(M.bbox(g), g.id, annotated);
    });
    doors += '</g>';
    body += doors;

    if (annotated) {
      const penn = M.proj(148, 25, 0);
      const rear = M.proj(5, 28, 0);
      body += `<text x="${penn.sx}" y="${penn.sy + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="#c34232">PENNSYLVANIA · SOUTH / FRONT (NEAR)</text>`;
      body += `<text x="${rear.sx}" y="${rear.sy}" text-anchor="middle" font-size="11" font-weight="800" fill="#2a6496">N / REAR (DEEP)</text>`;
      body += `<text x="${M.OX + 40}" y="${M.VB_H - 18}" font-size="11" font-weight="800" fill="#9a3b2e">DOORS ARE SVG GEOMETRY ON EAST FACES — generator must not infer or move them</text>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${M.VB_W} ${M.VB_H}" role="img" aria-label="J1-B Image 4.1 ${annotated ? 'audit' : 'clean'} lock scaffold">
      <rect width="${M.VB_W}" height="${M.VB_H}" fill="#f3efe8"/>
      ${body}
    </svg>`;

    return {
      svg,
      freeze: M.freezeCompare(),
      mode: annotated ? 'image41-audit-annotated' : 'image41-clean-base',
      doorPolicy: 'east-plane-svg-locked',
      annotations: annotated,
      status: 'APPROVED',
    };
  }

  return { render, eastGarageDoorLocked, porchEnvelopeOutline };
})();

if (typeof module !== 'undefined') module.exports = Lot2J1BImage41Scaffold;
