/**
 * Lot 2 — Image 4.2 views from approved Image 4.1 lock scaffold.
 *
 * Pipeline (anti-drift):
 * 1) Deterministic SVG geometry (immutable)
 * 2) Optional materials wash (surfaces only)
 * 3) Locked garage-door overlay composited on top
 *
 * Elevation: orthographic from +X; two equal-width east doors; depth overlap.
 * Eye-level: both homes, A near / B deep, Access A as side lane (not front drive).
 */
const Lot2J1BImage42Views = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Mass = typeof Lot2J1BMassingTruth !== 'undefined' ? Lot2J1BMassingTruth : null;
  const ID = 'j1b';
  /** Locked 2-car door width (ft) — both garages identical. */
  const DOOR_W = 16;
  const DOOR_H = 8;

  function requireMass() {
    if (!Mass) throw new Error('Lot2J1BMassingTruth required');
    return Mass;
  }
  function concept() {
    return L.CONCEPTS[ID];
  }

  // —— Elevation ——
  const ELEV = { VB_W: 1100, VB_H: 520, OX: 90, OY: 430, SY: 8.0, SZ: 9.2 };

  function elevPt(y, z) {
    // True orthographic elevation: no midX nudge (nudge collapsed the two 16′ doors together)
    return { sx: ELEV.OX + y * ELEV.SY, sy: ELEV.OY - z * ELEV.SZ };
  }

  function elevPoly(y0, y1, z0, z1, fill, stroke, opacity) {
    const a = elevPt(y0, z1);
    const b = elevPt(y1, z1);
    const c = elevPt(y1, z0);
    const d = elevPt(y0, z0);
    return `<polygon points="${a.sx.toFixed(1)},${a.sy.toFixed(1)} ${b.sx.toFixed(1)},${b.sy.toFixed(1)} ${c.sx.toFixed(1)},${c.sy.toFixed(1)} ${d.sx.toFixed(1)},${d.sy.toFixed(1)}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.15"/>`;
  }

  function doorYRange(rect) {
    const yMid = rect.y + rect.h / 2;
    return { y0: yMid - DOOR_W / 2, y1: yMid + DOOR_W / 2, z0: 0.5, z1: 0.5 + DOOR_H };
  }

  function elevDoorPoly(rect, stroke, unitId, deep, label) {
    const { y0, y1, z0, z1 } = doorYRange(rect);
    const op = deep ? 0.55 : 0.96;
    const sw = deep ? '2.2' : '3';
    let s = elevPoly(y0, y1, z0, z1, '#12151a', stroke || '#ff2d1f', op);
    if (deep) {
      // dashed outer halo so occluded deep door remains countable
      const a = elevPt(y0, z1); const b = elevPt(y1, z1); const c = elevPt(y1, z0); const d = elevPt(y0, z0);
      s += `<polyline points="${a.sx},${a.sy} ${b.sx},${b.sy} ${c.sx},${c.sy} ${d.sx},${d.sy} ${a.sx},${a.sy}" fill="none" stroke="${stroke || '#ff2d1f'}" stroke-width="${sw}" stroke-dasharray="5 3"/>`;
    }
    const yMid = (y0 + y1) / 2;
    const p0 = elevPt(yMid, z1);
    const p1 = elevPt(yMid, z0);
    s += `<line x1="${p0.sx}" y1="${p0.sy}" x2="${p1.sx}" y2="${p1.sy}" stroke="#4a5058" stroke-width="1.1"/>`;
    if (label && unitId) {
      const lab = elevPt(yMid, deep ? z1 + 3.2 : z1 + 1.4);
      s += `<text x="${lab.sx}" y="${lab.sy}" text-anchor="middle" font-size="11" font-weight="900" fill="#9a3b2e">DOOR ${unitId} · ${DOOR_W}′${deep ? ' · DEEP' : ' · NEAR'}</text>`;
    }
    return s;
  }

  function elevGable(y0, y1, zEave, pitch, fill) {
    const yMid = (y0 + y1) / 2;
    const ridge = elevPt(yMid, zEave + pitch);
    const e0 = elevPt(y0, zEave);
    const e1 = elevPt(y1, zEave);
    return `<polygon points="${e0.sx.toFixed(1)},${e0.sy.toFixed(1)} ${ridge.sx.toFixed(1)},${ridge.sy.toFixed(1)} ${e1.sx.toFixed(1)},${e1.sy.toFixed(1)}" fill="${fill}" fill-opacity="0.95" stroke="#1a1d22" stroke-width="1.15"/>`;
  }

  function sidingHatch(y0, y1, z0, z1) {
    let s = '';
    for (let z = z0 + 1.5; z < z1 - 0.5; z += 1.5) {
      const a = elevPt(y0 + 0.4, z);
      const b = elevPt(y1 - 0.4, z);
      s += `<line x1="${a.sx}" y1="${a.sy}" x2="${b.sx}" y2="${b.sy}" stroke="#8a8278" stroke-width="0.6" opacity="0.35"/>`;
    }
    return s;
  }

  /**
   * @param {{ annotations?: boolean, materials?: boolean, omitDoors?: boolean }} opts
   */
  function renderPennElevation(opts = {}) {
    const annotated = opts.annotations !== false;
    const materials = !!opts.materials;
    const omitDoors = !!opts.omitDoors;
    const M = requireMass();
    const c = concept();
    const H = M.H;
    const volumes = [];

    (c.garages || []).forEach((g) => {
      const r = M.bbox(g);
      volumes.push({ kind: 'garage', id: g.id, midX: r.x + r.w / 2, r, z0: 0, z1: H.garage });
    });
    (c.units || []).forEach((u) => {
      const r = M.bbox(u);
      volumes.push({ kind: 'ground', id: u.unit, midX: r.x + r.w / 2, r, z0: 0, z1: H.ground });
    });
    (c.upperUnits || []).forEach((u) => {
      const r = M.bbox(u);
      const uh = u.unit === 'A' ? H.upperA : H.upperB;
      volumes.push({
        kind: 'upper',
        id: u.unit,
        name: u.name,
        midX: r.x + r.w / 2,
        r,
        z0: H.ground,
        z1: H.ground + uh,
        pitch: u.unit === 'A' ? 7 : 5.5,
      });
    });
    volumes.sort((a, b) => a.midX - b.midX); // deep first

    let body = '';
    if (annotated) {
      body += `<text x="40" y="26" font-size="14" font-weight="900" fill="#0d1b33">J1-B · PENNSYLVANIA ELEVATION · Image 4.2 geometry</text>`;
      body += `<text x="40" y="46" font-size="11" fill="#59636d">Two equal-width ${DOOR_W}′ east doors · depth overlap (A near / B deep) · from Image 4.1</text>`;
    }

    const g0 = elevPt(-2, 0);
    const g1 = elevPt(52, 0);
    body += `<line x1="${g0.sx}" y1="${g0.sy}" x2="${g1.sx}" y2="${g1.sy}" stroke="#232a31" stroke-width="2.2"/>`;
    body += `<rect x="${g0.sx}" y="${g0.sy}" width="${g1.sx - g0.sx}" height="16" fill="#6b8f71" fill-opacity="0.18"/>`;

    // Pass 1: volumes without doors (deep first). Pass 2: doors deep then near.
    volumes.forEach((v) => {
      const { y, h } = v.r;
      const y0 = y;
      const y1 = y + h;
      const deep = v.midX < 70;
      const op = deep ? 0.72 : 0.94;
      if (v.kind === 'garage') {
        body += elevPoly(y0, y1, v.z0, v.z1, '#3d4550', '#1a1d22', op);
        body += elevPoly(y0, y1, 0, 3, materials ? '#9a9590' : '#8a8680', '#3a3a38', 0.9);
      } else if (v.kind === 'ground') {
        body += elevPoly(y0, y1, v.z0, v.z1, materials ? '#c4b8a4' : '#b7ab96', '#1a1d22', op);
        if (materials) body += sidingHatch(y0, y1, 3, v.z1);
        body += elevPoly(y0, y1, 0, 3, '#9a9590', '#3a3a38', 0.9);
        const py0 = y + h * 0.28;
        const py1 = y + h * 0.72;
        body += elevPoly(py0, py1, 0, 9, '#c4a574', '#3a2a16', 0.88);
      } else if (v.kind === 'upper') {
        body += elevPoly(y0, y1, v.z0, v.z1, v.id === 'A' ? '#d4cbb8' : '#cdc4b2', '#1a1d22', op);
        if (materials) body += sidingHatch(y0, y1, v.z0 + 1, v.z1 - 1);
        body += elevGable(y0, y1, v.z1, v.pitch, '#3a3f46');
        if (annotated) {
          const mid = elevPt(y + h / 2, v.z1 + 2);
          body += `<text x="${mid.sx}" y="${mid.sy}" text-anchor="middle" font-size="9" font-weight="800" fill="#2a6496">${v.name || v.id}</text>`;
        }
      }
    });

    if (!omitDoors) {
      const garages = volumes.filter((v) => v.kind === 'garage');
      garages.forEach((v) => {
        const deep = v.midX < 70;
        body += elevDoorPoly(v.r, annotated ? '#c45c4a' : '#1a1d22', v.id, deep, annotated);
        if (annotated) {
          const tag = elevPt(v.r.y + v.r.h / 2, -2.5);
          body += `<text x="${tag.sx}" y="${tag.sy}" text-anchor="middle" font-size="10" font-weight="800" fill="#2a6496">${deep ? 'B DEEP' : 'A NEAR'}</text>`;
        }
      });
    }

    if (annotated) {
      body += `<text x="40" y="${ELEV.VB_H - 22}" font-size="11" font-weight="800" fill="#416145">Image 4.1 APPROVED · equal ${DOOR_W}′ doors · depth overlap required</text>`;
      body += `<text x="${ELEV.VB_W - 40}" y="${ELEV.VB_H - 22}" text-anchor="end" font-size="11" font-weight="800" fill="#c34232">PENNSYLVANIA · looking west</text>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ELEV.VB_W} ${ELEV.VB_H}" role="img" aria-label="J1-B Pennsylvania elevation">
      <rect width="${ELEV.VB_W}" height="${ELEV.VB_H}" fill="#f7f3ec"/>
      ${body}
    </svg>`;
    return { svg, mode: 'penn-elevation', doorPolicy: 'east-plane-svg-locked', doorW: DOOR_W };
  }

  function renderPennDoorOverlay(opts = {}) {
    const label = opts.label !== false;
    const M = requireMass();
    const c = concept();
    let doors = '';
    const ordered = (c.garages || []).slice().sort((a, b) => a.x - b.x);
    ordered.forEach((g) => {
      const r = M.bbox(g);
      const deep = r.x + r.w / 2 < 70;
      doors += elevDoorPoly(r, label ? '#ff2d1f' : '#1a1d22', g.id, deep, label);
    });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ELEV.VB_W} ${ELEV.VB_H}">
      <rect width="${ELEV.VB_W}" height="${ELEV.VB_H}" fill="none"/>
      <g id="east-garage-doors-locked">${doors}</g>
    </svg>`;
    return { svg, mode: 'penn-door-overlay', vb: { w: ELEV.VB_W, h: ELEV.VB_H } };
  }

  /** Materials surfaces only (no doors) — for mask/composite pipeline. */
  function renderPennMaterialsSurfaces() {
    return renderPennElevation({ annotations: false, materials: true, omitDoors: true });
  }

  /**
   * Final elev composite: materials surfaces + locked door layer on top.
   * Same polygons as geometry; doors never relocate.
   */
  function renderPennComposite() {
    const surfaces = renderPennMaterialsSurfaces();
    const M = requireMass();
    const c = concept();
    let doors = '<g id="east-garage-doors-locked">';
    (c.garages || []).slice().sort((a, b) => a.x - b.x).forEach((g) => {
      const r = M.bbox(g);
      const deep = r.x + r.w / 2 < 70;
      doors += elevDoorPoly(r, '#1a1d22', g.id, deep, false);
    });
    doors += '</g>';
    const svg = surfaces.svg.replace('</svg>', `${doors}</svg>`);
    return { svg, mode: 'penn-composite', doorPolicy: 'east-plane-svg-locked', doorW: DOOR_W };
  }

  // —— Eye-level / site perspective via massing camera (shows both homes) ——
  // Use Image 2/3 axon projection so A near / B deep and Access A always register.
  function renderEyeLevelPerspective(opts = {}) {
    const annotated = opts.annotations !== false;
    const materials = !!opts.materials;
    const omitDoors = !!opts.omitDoors;
    const M = requireMass();
    const c = concept();
    const H = M.H;
    const { proj, polyPts, boxFaces } = M;

    let body = '';
    if (annotated) {
      body += `<text x="${M.OX + 40}" y="26" font-size="14" font-weight="900" fill="#0d1b33">J1-B · SITE VIEW FROM PENNSYLVANIA · Image 4.2 geometry</text>`;
      body += `<text x="${M.OX + 40}" y="46" font-size="11" fill="#59636d">A near / B deep · Access A side lanes → equal ${DOOR_W}′ east doors · no front driveway replacement</text>`;
    }

    if (materials) {
      body += `<defs>
        <pattern id="siding42" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(0)">
          <line x1="0" y1="5" x2="6" y2="5" stroke="#8a8278" stroke-width="0.7" opacity="0.4"/>
        </pattern>
        <pattern id="asphalt42" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#5a6068"/>
          <circle cx="2" cy="3" r="0.6" fill="#4a5058" opacity="0.5"/>
          <circle cx="6" cy="6" r="0.5" fill="#6a7078" opacity="0.4"/>
        </pattern>
      </defs>`;
    }

    body += M.lotPolygonGround();

    // Access A asphalt — side lanes only
    (c.accessPaths || []).forEach((ap) => {
      const pts = (ap.path || []).map(([x, y]) => proj(x, y, 0.12));
      if (pts.length < 2) return;
      const laneStroke = materials ? 'url(#asphalt42)' : '#4a5058';
      body += `<polyline points="${polyPts(pts)}" fill="none" stroke="${laneStroke}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.82"/>`;
      body += `<polyline points="${polyPts(pts)}" fill="none" stroke="#d7d2ca" stroke-width="2" stroke-dasharray="7 5" opacity="0.85"/>`;
      if (annotated) {
        const mid = pts[Math.floor(pts.length / 2)];
        body += `<text x="${mid.sx + 8}" y="${mid.sy - 8}" font-size="11" font-weight="900" fill="#0d1b33">ACCESS ${ap.garage} (side lane)</text>`;
      }
    });

    const faces = [];
    (c.garages || []).forEach((g) => {
      const r = M.bbox(g);
      const fills = materials
        ? { top: '#6a7684', front: '#3a424c', side: '#4e5864' }
        : { top: '#6e7a88', front: '#3d4550', side: '#525c68' };
      boxFaces(r, 0, H.garage, fills, 'garage').faces.forEach((f) => {
        if (f.kind === 'footprint') return;
        faces.push(f);
      });
    });
    (c.units || []).forEach((u) => {
      const r = M.bbox(u);
      const fills = materials
        ? { top: '#d2c8b6', front: '#c4b8a4', side: '#cdc3b0' }
        : { top: '#cfc6b6', front: '#b7ab96', side: '#c4baa8' };
      boxFaces(r, 0, H.ground, fills, 'ground').faces.forEach((f) => {
        if (f.kind === 'footprint') return;
        if (materials && (f.kind === 'front' || f.kind === 'side')) {
          faces.push({
            orderKey: f.orderKey,
            svg: f.svg.replace(/fill="[^"]+"/, 'fill="url(#siding42)"').replace(/fill-opacity="[^"]+"/, 'fill-opacity="0.55"')
              + f.svg.replace(/fill-opacity="[^"]+"/, 'fill-opacity="0.78"'),
          });
          return;
        }
        faces.push(f);
      });
      // 4′ E porch
      const depth = 4;
      const px0 = r.x + r.w;
      const px1 = px0 + depth;
      const py0 = r.y + r.h * 0.28;
      const py1 = r.y + r.h * 0.72;
      const A = proj(px1, py0, 9);
      const B = proj(px1, py1, 9);
      const C = proj(px0, py1, 9);
      const D = proj(px0, py0, 9);
      const E = proj(px1, py0, 0);
      const F = proj(px1, py1, 0);
      faces.push({
        orderKey: (px0 + px1) * 500,
        svg: `<polygon points="${polyPts([E, F, B, A])}" fill="#c4a574" fill-opacity="0.92" stroke="#3a2a16" stroke-width="1.1"/>`,
      });
      faces.push({
        orderKey: (px0 + px1) * 500 + 1,
        svg: `<polygon points="${polyPts([A, B, C, D])}" fill="#5c4030" fill-opacity="0.9" stroke="#1a1d22" stroke-width="1.1"/>`,
      });
    });
    (c.upperUnits || []).forEach((u) => {
      const r = M.bbox(u);
      const uh = u.unit === 'A' ? H.upperA : H.upperB;
      const fills = materials
        ? (u.unit === 'A'
          ? { top: '#ebe4d6', front: '#dccfb8', side: '#e4dccb' }
          : { top: '#e6e0d2', front: '#d4cbb6', side: '#ddd4c4' })
        : (u.unit === 'A'
          ? { top: '#e6e0d4', front: '#d4cbb8', side: '#ddd5c5' }
          : { top: '#e2ddd2', front: '#cdc4b2', side: '#d8d0c0' });
      boxFaces(r, H.ground, H.ground + uh, fills, 'upper').faces.forEach((f) => {
        if (f.kind === 'footprint') return;
        if (materials && (f.kind === 'front' || f.kind === 'side')) {
          faces.push({
            orderKey: f.orderKey,
            svg: f.svg + f.svg.replace(/fill="[^"]+"/, 'fill="url(#siding42)"').replace(/fill-opacity="[^"]+"/, 'fill-opacity="0.35"'),
          });
          return;
        }
        faces.push(f);
      });
      // simple gable on upper only
      const pitch = u.unit === 'A' ? 7 : 5.5;
      const zTop = H.ground + uh;
      const yMid = r.y + r.h / 2;
      const ridgeN = proj(r.x + r.w, yMid, zTop + pitch);
      const ridgeF = proj(r.x, yMid, zTop + pitch);
      const e0n = proj(r.x + r.w, r.y, zTop);
      const e1n = proj(r.x + r.w, r.y + r.h, zTop);
      const e0f = proj(r.x, r.y, zTop);
      const e1f = proj(r.x, r.y + r.h, zTop);
      faces.push({
        orderKey: (r.x + r.w / 2) * 1000 + 50,
        svg: `<polygon points="${polyPts([e0n, ridgeN, e1n])}" fill="#3a3f46" fill-opacity="0.96" stroke="#1a1d22" stroke-width="1.1"/>`,
      });
      faces.push({
        orderKey: (r.x + r.w / 2) * 1000 + 49,
        svg: `<polygon points="${polyPts([e1n, ridgeN, ridgeF, e1f])}" fill="#4a5058" fill-opacity="0.94" stroke="#1a1d22" stroke-width="1.1"/>`,
      });
      faces.push({
        orderKey: (r.x + r.w / 2) * 1000 + 48,
        svg: `<polygon points="${polyPts([e0n, e0f, ridgeF, ridgeN])}" fill="#555b64" fill-opacity="0.92" stroke="#1a1d22" stroke-width="1.1"/>`,
      });
    });

    faces.sort((a, b) => a.orderKey - b.orderKey);
    body += `<g id="volumes">${faces.map((f) => f.svg).join('\n')}</g>`;

    if (!omitDoors) {
      body += eastDoorGroupSvg({ annotated, stroke: annotated ? '#ff2d1f' : '#1a1d22' });
    }

    if (annotated) {
      const penn = proj(148, 25, 0);
      const rear = proj(5, 28, 0);
      body += `<text x="${penn.sx}" y="${penn.sy + 16}" text-anchor="middle" font-size="12" font-weight="900" fill="#c34232">PENNSYLVANIA · NEAR</text>`;
      body += `<text x="${rear.sx}" y="${rear.sy}" text-anchor="middle" font-size="11" font-weight="800" fill="#2a6496">N / REAR · DEEP</text>`;
      body += `<text x="${M.OX + 40}" y="${M.VB_H - 18}" font-size="11" font-weight="800" fill="#416145">Both homes required · Access A side lanes only · no street-to-garage shortcut</text>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${M.VB_W} ${M.VB_H}" role="img" aria-label="J1-B site view from Pennsylvania">
      <rect width="${M.VB_W}" height="${M.VB_H}" fill="#f3efe8"/>
      ${body}
    </svg>`;
    return { svg, mode: 'site-view-from-penn', doorPolicy: 'east-plane-svg-locked', doorW: DOOR_W, vb: { w: M.VB_W, h: M.VB_H } };
  }

  function eastDoorGroupSvg(opts = {}) {
    const annotated = !!opts.annotated;
    const stroke = opts.stroke || '#1a1d22';
    const M = requireMass();
    const c = concept();
    const { proj, polyPts } = M;
    let doors = '<g id="east-garage-doors-locked">';
    (c.garages || []).forEach((g) => {
      const r = M.bbox(g);
      const x1 = r.x + r.w;
      const yMid = r.y + r.h / 2;
      const y0 = yMid - DOOR_W / 2;
      const y1 = yMid + DOOR_W / 2;
      const z0 = 0.5;
      const z1 = 0.5 + DOOR_H;
      const p = [proj(x1, y0, z1), proj(x1, y1, z1), proj(x1, y1, z0), proj(x1, y0, z0)];
      doors += `<polygon points="${polyPts(p)}" fill="#12151a" fill-opacity="0.96" stroke="${stroke}" stroke-width="${annotated ? 2.8 : 1.6}"/>`;
      if (annotated) {
        const lab = proj(x1, yMid, (z0 + z1) / 2);
        doors += `<text x="${lab.sx + 8}" y="${lab.sy}" font-size="11" font-weight="900" fill="#9a3b2e">DOOR ${g.id} · ${DOOR_W}′ EAST</text>`;
      }
    });
    doors += '</g>';
    return doors;
  }

  function renderPerspDoorOverlay(opts = {}) {
    const label = opts.label !== false;
    const M = requireMass();
    const doors = eastDoorGroupSvg({ annotated: label, stroke: label ? '#ff2d1f' : '#1a1d22' });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${M.VB_W} ${M.VB_H}">
      <rect width="${M.VB_W}" height="${M.VB_H}" fill="none"/>
      ${doors}
    </svg>`;
    return { svg, mode: 'persp-door-overlay', vb: { w: M.VB_W, h: M.VB_H } };
  }

  function renderEyeMaterialsSurfaces() {
    return renderEyeLevelPerspective({ annotations: false, materials: true, omitDoors: true });
  }

  function renderEyeComposite() {
    const surfaces = renderEyeMaterialsSurfaces();
    const doorGroup = eastDoorGroupSvg({ annotated: false, stroke: '#1a1d22' });
    const svg = surfaces.svg.replace('</svg>', `${doorGroup}</svg>`);
    return { svg, mode: 'eye-composite', doorPolicy: 'east-plane-svg-locked', doorW: DOOR_W, vb: surfaces.vb };
  }

  function renderAll() {
    return {
      elevation: renderPennElevation({ annotations: true }),
      perspective: renderEyeLevelPerspective({ annotations: true }),
      elevSurfaces: renderPennMaterialsSurfaces(),
      elevComposite: renderPennComposite(),
      perspSurfaces: renderEyeMaterialsSurfaces(),
      perspComposite: renderEyeComposite(),
      elevDoors: renderPennDoorOverlay({ label: true }),
      perspDoors: renderPerspDoorOverlay({ label: true }),
      status: 'CANDIDATE',
      from: 'Image 4.1 APPROVED',
      priorMaterials: 'DRIFT',
      pipeline: 'svg-raster-base → masked-surface-materials → locked-door-overlay',
    };
  }

  return {
    renderPennElevation,
    renderEyeLevelPerspective,
    renderPennDoorOverlay,
    renderPerspDoorOverlay,
    renderPennMaterialsSurfaces,
    renderPennComposite,
    renderEyeMaterialsSurfaces,
    renderEyeComposite,
    renderAll,
    DOOR_W,
    DOOR_H,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2J1BImage42Views;
