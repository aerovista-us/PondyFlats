/**
 * Lot 2 — J1-B Massing Truth (Image 2)
 * Deterministic axonometric extrusion from frozen Lot2.CONCEPTS.j1b.
 * No generative AI. No roofs / materials / beautification.
 *
 * Camera: stand on Pennsylvania/right looking west into the lot.
 * +X toward Pennsylvania (right on plan, near on axon)
 * +Y toward irregular south (down on plan)
 * +Z up
 */
const Lot2J1BMassingTruth = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const ID = 'j1b';

  /** Story heights for extrusion (Pass 2B stagger relationship). */
  const H = {
    ground: 10,
    garage: 10,
    upperA: 22,
    upperB: 16,
  };

  // Axon scale: viewer on Penn looking west — high X is near
  const SCALE_Y = 4.2; // ft along frontage → screen X
  const SCALE_D = 2.35; // ft of depth (X) → screen
  const SCALE_Z = 3.6; // ft of height → screen Y
  const OX = 70;
  const OY = 420;
  const VB_W = 980;
  const VB_H = 560;

  function bbox(u) {
    if (u.poly) {
      const xs = u.poly.map((p) => p[0]);
      const ys = u.poly.map((p) => p[1]);
      return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
    }
    return { x: u.x, y: u.y, w: u.w, h: u.h };
  }

  /** Project world (x,y,z) → screen. Pennsylvania near; rear left/deep. */
  function proj(x, y, z) {
    const depth = 148 - x; // larger when deeper (rear)
    return {
      sx: OX + y * SCALE_Y + depth * SCALE_D * 0.15,
      sy: OY - z * SCALE_Z - depth * SCALE_D,
    };
  }

  function polyPts(corners) {
    return corners.map((p) => `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');
  }

  function face(corners, fill, stroke, opacity, orderKey) {
    const cx = corners.reduce((s, p) => s + p.sx, 0) / corners.length;
    const cy = corners.reduce((s, p) => s + p.sy, 0) / corners.length;
    return {
      orderKey,
      svg: `<polygon points="${polyPts(corners)}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.1"/>`,
      cx,
      cy,
    };
  }

  /**
   * Box from plan rect [x,y,w,h] extruded z0→z1.
   * Visible faces: top, east (+X / Pennsylvania), south (+Y).
   */
  function boxFaces(rect, z0, z1, fills, kind) {
    const { x, y, w, h } = rect;
    const x0 = x;
    const x1 = x + w;
    const y0 = y;
    const y1 = y + h;
    const A = proj(x1, y0, z1);
    const B = proj(x1, y1, z1);
    const C = proj(x0, y1, z1);
    const D = proj(x0, y0, z1);
    const E = proj(x1, y0, z0);
    const F = proj(x1, y1, z0);
    const G = proj(x0, y1, z0);

    // Depth sort: rear (low x) first, Pennsylvania (high x) last
    const midX = x + w / 2;
    const midY = y + h / 2;
    const depthKey = midX * 1000 + midY;

    const faces = [];
    faces.push(face([F, G, C, B], fills.side, '#2a3038', 0.88, depthKey - 0.3)); // south (+Y)
    faces.push(face([E, F, B, A], fills.front, '#1a1d22', 0.95, depthKey + 0.5)); // east (+X / Penn)
    faces.push(face([A, B, C, D], fills.top, '#1a1d22', 0.9, depthKey + 1)); // top
    const fp = [proj(x0, y0, 0), proj(x1, y0, 0), proj(x1, y1, 0), proj(x0, y1, 0)];
    faces.push({
      orderKey: depthKey - 10,
      svg: `<polygon points="${polyPts(fp)}" fill="none" stroke="#5b6771" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.85"/>`,
      kind: 'footprint',
    });
    return { faces, labelAt: proj(x1, midY, (z0 + z1) / 2), kind, rect, z0, z1 };
  }

  function doorOnEast(rect, z0, z1) {
    // Recessed door rectangle on east face — geometry cue only, not architecture
    const { x, y, w, h } = rect;
    const x1 = x + w;
    const inset = 2.5;
    const doorW = Math.min(16, h - 4);
    const yMid = y + h / 2;
    const y0 = yMid - doorW / 2;
    const y1 = yMid + doorW / 2;
    const zDoor0 = z0 + 0.5;
    const zDoor1 = z0 + Math.min(8, z1 - z0 - 0.5);
    const p = [
      proj(x1, y0, zDoor1),
      proj(x1, y1, zDoor1),
      proj(x1, y1, zDoor0),
      proj(x1, y0, zDoor0),
    ];
    return `<polygon points="${polyPts(p)}" fill="#111317" fill-opacity="0.85" stroke="#c45c4a" stroke-width="1.6"/>
      <text x="${proj(x1, yMid, (zDoor0 + zDoor1) / 2).sx + 4}" y="${proj(x1, yMid, (zDoor0 + zDoor1) / 2).sy}" font-size="10" fill="#9a3b2e" font-weight="800">DOOR E</text>`;
  }

  function lotPolygonGround() {
    const survey = L.SURVEY || [];
    const pts = survey.map(([x, y]) => proj(x, y, 0));
    return `<polygon points="${polyPts(pts)}" fill="#f0ebe3" fill-opacity="0.95" stroke="#232a31" stroke-width="2"/>`;
  }

  function accessPathsGround() {
    const c = L.CONCEPTS[ID];
    let s = '';
    (c.accessPaths || []).forEach((ap) => {
      const pts = ap.path.map(([x, y]) => proj(x, y, 0.15));
      s += `<polyline points="${polyPts(pts)}" fill="none" stroke="#8a9096" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>`;
      s += `<polyline points="${polyPts(pts)}" fill="none" stroke="#3d454d" stroke-width="1.5" stroke-dasharray="6 4"/>`;
      ap.path.forEach((p, i) => {
        const q = proj(p[0], p[1], 0.2);
        s += `<circle cx="${q.sx}" cy="${q.sy}" r="3" fill="#0d1b33"/>`;
        s += `<text x="${q.sx + 5}" y="${q.sy - 5}" font-size="9" fill="#445">${ap.garage}${i} (${p[0]},${p[1]})</text>`;
      });
    });
    return s;
  }

  function orientationLabels() {
    const penn = proj(148, 25, 0);
    const rear = proj(5, 28, 0);
    const north = proj(74, 2, 0);
    return `
      <text x="${penn.sx}" y="${penn.sy + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="#c34232">PENNSYLVANIA · SOUTH / FRONT (NEAR)</text>
      <text x="${rear.sx}" y="${rear.sy}" text-anchor="middle" font-size="11" font-weight="800" fill="#2a6496">N / REAR (DEEP)</text>
      <text x="${north.sx}" y="${north.sy - 8}" text-anchor="middle" font-size="10" fill="#59636d">y≈0 (north edge)</text>
      <text x="${OX + 40}" y="28" font-size="13" font-weight="900" fill="#0d1b33">J1-B MASSING TRUTH · IMAGE 2 · DETERMINISTIC AXON · NO ARCHITECTURE</text>
      <text x="${OX + 40}" y="46" font-size="11" fill="#59636d">Extruded from Lot2.CONCEPTS.j1b · ground/garage ${H.ground}′ · upper A ${H.upperA}′ · upper B ${H.upperB}′ · dashed = footprint projection</text>
    `;
  }

  function buildVolumes() {
    const c = L.CONCEPTS[ID];
    const volumes = [];

    (c.garages || []).forEach((g) => {
      const rect = bbox(g);
      volumes.push({
        ...boxFaces(rect, 0, H.garage, { top: '#b7c2d0', front: '#7f8b98', side: '#9aa6b4' }, 'garage'),
        id: g.id,
        name: g.name,
        door: true,
      });
    });

    (c.units || []).forEach((u) => {
      const rect = bbox(u);
      volumes.push({
        ...boxFaces(rect, 0, H.ground, { top: '#d9d4cb', front: '#bdb6aa', side: '#cbc5ba' }, 'ground'),
        id: u.unit,
        name: u.name,
        door: false,
      });
    });

    (c.upperUnits || []).forEach((u) => {
      const rect = bbox(u);
      const uh = u.unit === 'A' ? H.upperA : H.upperB;
      volumes.push({
        ...boxFaces(rect, H.ground, H.ground + uh, { top: '#e8e6e1', front: '#cfcbc3', side: '#ddd9d1' }, 'upper'),
        id: u.unit,
        name: u.name,
        door: false,
        uh,
      });
    });

    return volumes;
  }

  function renderAxonSvg() {
    if (!L.CONCEPTS?.[ID]) return { svg: '<svg><text>Missing j1b</text></svg>', heights: H };

    const volumes = buildVolumes();
    const allFaces = [];
    volumes.forEach((v) => {
      v.faces.forEach((f) => allFaces.push(f));
    });
    // Painter's algorithm: deep (low orderKey related to x) first — sort ascending midX already in depthKey
    allFaces.sort((a, b) => a.orderKey - b.orderKey);

    let doors = '';
    volumes.forEach((v) => {
      if (v.door) doors += doorOnEast(v.rect, v.z0, v.z1);
    });

    let labels = '';
    volumes.forEach((v) => {
      const p = v.labelAt;
      labels += `<text x="${p.sx + 6}" y="${p.sy}" font-size="10" font-weight="800" fill="#1a2430">${v.name}</text>`;
    });

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="J1-B massing truth axonometric">
      <rect width="${VB_W}" height="${VB_H}" fill="#f7f4ef"/>
      ${orientationLabels()}
      ${lotPolygonGround()}
      ${accessPathsGround()}
      ${allFaces.map((f) => f.svg).join('\n')}
      ${doors}
      ${labels}
    </svg>`;

    return {
      svg,
      heights: H,
      volumes: volumes.map((v) => ({
        kind: v.kind,
        id: v.id,
        name: v.name,
        rect: v.rect,
        z0: v.z0,
        z1: v.z1,
      })),
    };
  }

  function freezeCompare() {
    const c = L.CONCEPTS[ID];
    return {
      garages: (c.garages || []).map((g) => ({ id: g.id, x: g.x, y: g.y, w: g.w, h: g.h, doorFace: g.doorFace })),
      ground: (c.units || []).map((u) => ({ unit: u.unit, x: u.x, y: u.y, w: u.w, h: u.h })),
      upper: (c.upperUnits || []).map((u) => ({ unit: u.unit, x: u.x, y: u.y, w: u.w, h: u.h, zTop: H.ground + (u.unit === 'A' ? H.upperA : H.upperB) })),
      paths: c.accessPaths,
      heights: H,
    };
  }

  return {
    renderAxonSvg,
    freezeCompare,
    buildVolumes,
    lotPolygonGround,
    accessPathsGround,
    doorOnEast,
    boxFaces,
    face,
    polyPts,
    H,
    ID,
    proj,
    bbox,
    SCALE_Y,
    SCALE_D,
    SCALE_Z,
    OX,
    OY,
    VB_W,
    VB_H,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2J1BMassingTruth;
