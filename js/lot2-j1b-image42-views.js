/**
 * Lot 2 — Image 4.2 views derived from approved Image 4.1 lock scaffold.
 *
 * Pennsylvania elevation: orthographic from +X (east / Penn), looking west.
 * Garage doors face the viewer (east planes). Unit A (high X) is nearer;
 * Unit B (low X) is deeper — drawn first so A reads forward.
 *
 * Eye-level perspective: sidewalk on Pennsylvania looking into the lot (NW).
 * Geometry from Lot2.CONCEPTS.j1b only — no door relocation.
 */
const Lot2J1BImage42Views = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Mass = typeof Lot2J1BMassingTruth !== 'undefined' ? Lot2J1BMassingTruth : null;
  const ID = 'j1b';

  function requireMass() {
    if (!Mass) throw new Error('Lot2J1BMassingTruth required');
    return Mass;
  }

  function concept() {
    return L.CONCEPTS[ID];
  }

  // —— Pennsylvania elevation (orthographic, view from east) ——
  // Screen: sx = f(y), sy = f(z). Depth cue = draw order by x ascending (deep first).
  const ELEV = {
    VB_W: 1100,
    VB_H: 520,
    OX: 80,
    OY: 430,
    SY: 8.2, // ft Y → px
    SZ: 9.5, // ft Z → px
  };

  function elevPt(y, z) {
    return {
      sx: ELEV.OX + y * ELEV.SY,
      sy: ELEV.OY - z * ELEV.SZ,
    };
  }

  function elevRect(y0, y1, z0, z1, fill, stroke, opacity) {
    const a = elevPt(y0, z1);
    const b = elevPt(y1, z1);
    const c = elevPt(y1, z0);
    const d = elevPt(y0, z0);
    return `<polygon points="${a.sx},${a.sy} ${b.sx},${b.sy} ${c.sx},${c.sy} ${d.sx},${d.sy}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.2"/>`;
  }

  function elevDoor(rect, H) {
    const { y, h } = rect;
    const doorW = Math.min(16, h - 4);
    const yMid = y + h / 2;
    const y0 = yMid - doorW / 2;
    const y1 = yMid + doorW / 2;
    const z0 = 0.5;
    const z1 = Math.min(8.5, H.garage - 0.5);
    return elevRect(y0, y1, z0, z1, '#12151a', '#1a1d22', 0.95);
  }

  function elevGable(y0, y1, zEave, pitch, fill) {
    const yMid = (y0 + y1) / 2;
    const ridge = elevPt(yMid, zEave + pitch);
    const e0 = elevPt(y0, zEave);
    const e1 = elevPt(y1, zEave);
    return `<polygon points="${e0.sx},${e0.sy} ${ridge.sx},${ridge.sy} ${e1.sx},${e1.sy}" fill="${fill}" fill-opacity="0.95" stroke="#1a1d22" stroke-width="1.2"/>`;
  }

  function renderPennElevation() {
    const M = requireMass();
    const c = concept();
    const H = M.H;
    const volumes = [];

    (c.garages || []).forEach((g) => {
      const r = M.bbox(g);
      volumes.push({ kind: 'garage', id: g.id, x: r.x + r.w / 2, r, z0: 0, z1: H.garage });
    });
    (c.units || []).forEach((u) => {
      const r = M.bbox(u);
      volumes.push({ kind: 'ground', id: u.unit, x: r.x + r.w / 2, r, z0: 0, z1: H.ground });
    });
    (c.upperUnits || []).forEach((u) => {
      const r = M.bbox(u);
      const uh = u.unit === 'A' ? H.upperA : H.upperB;
      volumes.push({
        kind: 'upper',
        id: u.unit,
        name: u.name,
        x: r.x + r.w / 2,
        r,
        z0: H.ground,
        z1: H.ground + uh,
        pitch: u.unit === 'A' ? 7 : 5.5,
      });
    });

    // Deep (low x) first; Penn-near (high x) last
    volumes.sort((a, b) => a.x - b.x);

    let body = '';
    body += `<text x="40" y="28" font-size="14" font-weight="900" fill="#0d1b33">J1-B · PENNSYLVANIA ELEVATION · from Image 4.1 locked base</text>`;
    body += `<text x="40" y="48" font-size="11" fill="#59636d">Orthographic from east (+X) · garage doors on east planes face viewer · A near / B deep by draw order · no door relocation</text>`;

    // Ground line + sidewalk
    const g0 = elevPt(-2, 0);
    const g1 = elevPt(52, 0);
    body += `<line x1="${g0.sx}" y1="${g0.sy}" x2="${g1.sx}" y2="${g1.sy}" stroke="#232a31" stroke-width="2.2"/>`;
    body += `<rect x="${g0.sx}" y="${g0.sy}" width="${g1.sx - g0.sx}" height="18" fill="#6b8f71" fill-opacity="0.2"/>`;

    volumes.forEach((v) => {
      const { y, h } = v.r;
      const y0 = y;
      const y1 = y + h;
      if (v.kind === 'garage') {
        body += elevRect(y0, y1, v.z0, v.z1, '#3d4550', '#1a1d22', 0.95);
        body += elevRect(y0, y1, 0, 3, '#8a8680', '#3a3a38', 0.9);
        body += elevDoor(v.r, H);
      } else if (v.kind === 'ground') {
        body += elevRect(y0, y1, v.z0, v.z1, '#b7ab96', '#1a1d22', 0.92);
        body += elevRect(y0, y1, 0, 3, '#8a8680', '#3a3a38', 0.9);
        // 4′ porch tip on east — appears as small projection; in elev from east, porch is in front of ground east face
        const py0 = y + h * 0.28;
        const py1 = y + h * 0.72;
        body += elevRect(py0, py1, 0, 9, '#c4a574', '#3a2a16', 0.88);
      } else if (v.kind === 'upper') {
        body += elevRect(y0, y1, v.z0, v.z1, v.id === 'A' ? '#d4cbb8' : '#cdc4b2', '#1a1d22', 0.94);
        body += elevGable(y0, y1, v.z1, v.pitch, '#3a3f46');
      }
    });

    body += `<text x="40" y="${ELEV.VB_H - 24}" font-size="11" font-weight="800" fill="#416145">Derived from APPROVED Image 4.1 · east-plane-svg-locked doors</text>`;
    body += `<text x="${ELEV.VB_W - 40}" y="${ELEV.VB_H - 24}" text-anchor="end" font-size="11" font-weight="800" fill="#c34232">PENNSYLVANIA · viewer on street looking west</text>`;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ELEV.VB_W} ${ELEV.VB_H}" role="img" aria-label="J1-B Pennsylvania elevation from Image 4.1">
      <rect width="${ELEV.VB_W}" height="${ELEV.VB_H}" fill="#f7f3ec"/>
      ${body}
    </svg>`;
    return { svg, mode: 'penn-elevation', doorPolicy: 'east-plane-svg-locked' };
  }

  // —— Eye-level 3/4 from Pennsylvania sidewalk ——
  const PER = {
    VB_W: 1100,
    VB_H: 620,
    // 3/4 from SE on Pennsylvania: see east doors + depth stagger along Access A
    cam: { x: 168, y: 58, z: 7 },
    target: { x: 55, y: 18, z: 12 },
    fov: 0.85,
  };

  function perspProject(x, y, z) {
    const { cam, target, fov } = PER;
    // Orthonormal basis: forward, right, up
    let fx = target.x - cam.x;
    let fy = target.y - cam.y;
    let fz = target.z - cam.z;
    const fl = Math.hypot(fx, fy, fz) || 1;
    fx /= fl; fy /= fl; fz /= fl;
    // Right = forward × worldUp
    let rx = fy * 1 - fz * 0;
    let ry = fz * 0 - fx * 1;
    let rz = fx * 0 - fy * 0;
    let rl = Math.hypot(rx, ry, rz) || 1;
    rx /= rl; ry /= rl; rz /= rl;
    // Up = right × forward
    let ux = ry * fz - rz * fy;
    let uy = rz * fx - rx * fz;
    let uz = rx * fy - ry * fx;

    const dx = x - cam.x;
    const dy = y - cam.y;
    const dz = z - cam.z;
    const px = dx * rx + dy * ry + dz * rz;
    const py = dx * ux + dy * uy + dz * uz;
    const pz = dx * fx + dy * fy + dz * fz;
    const depth = Math.max(pz, 0.5);
    const scale = (PER.VB_H * 0.42) / (depth * fov);
    return {
      sx: PER.VB_W * 0.52 + px * scale,
      sy: PER.VB_H * 0.62 - py * scale,
      depth,
    };
  }

  function perspPoly(corners, fill, stroke, opacity) {
    const pts = corners.map((c) => perspProject(c[0], c[1], c[2]));
    const avgD = pts.reduce((s, p) => s + p.depth, 0) / pts.length;
    const s = pts.map((p) => `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');
    return { avgD, svg: `<polygon points="${s}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.1"/>` };
  }

  function boxEastFaces(rect, z0, z1, fills) {
    const { x, y, w, h } = rect;
    const x0 = x;
    const x1 = x + w;
    const y0 = y;
    const y1 = y + h;
    const faces = [];
    // east (door face) — toward Penn / camera
    faces.push(perspPoly([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], fills.front, '#1a1d22', 0.95));
    // south
    faces.push(perspPoly([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], fills.side, '#2a3038', 0.88));
    // top
    faces.push(perspPoly([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], fills.top, '#1a1d22', 0.9));
    return faces;
  }

  function eastDoorPersp(rect, H) {
    const { x, y, w, h } = rect;
    const x1 = x + w;
    const doorW = Math.min(16, h - 4);
    const yMid = y + h / 2;
    const y0 = yMid - doorW / 2;
    const y1 = yMid + doorW / 2;
    const z0 = 0.5;
    const z1 = Math.min(8.5, H.garage - 0.5);
    return perspPoly([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], '#12151a', '#1a1d22', 0.96);
  }

  function renderEyeLevelPerspective() {
    const M = requireMass();
    const c = concept();
    const H = M.H;
    const faces = [];

    // Lot ground
    const survey = L.SURVEY || [];
    if (survey.length) {
      faces.push(perspPoly(survey.map(([x, y]) => [x, y, 0]), '#e8e2d8', '#232a31', 0.95));
    }

    // Access paths as thin polys
    (c.accessPaths || []).forEach((ap) => {
      const path = ap.path || [];
      for (let i = 0; i < path.length - 1; i++) {
        const [x0, y0] = path[i];
        const [x1, y1] = path[i + 1];
        const w = 5;
        faces.push(perspPoly(
          [[x0, y0 - w / 2, 0.05], [x0, y0 + w / 2, 0.05], [x1, y1 + w / 2, 0.05], [x1, y1 - w / 2, 0.05]],
          '#4a5058',
          '#3a3a38',
          0.75
        ));
      }
    });

    const vols = [];
    (c.garages || []).forEach((g) => {
      const r = M.bbox(g);
      vols.push({ x: r.x + r.w / 2, draw: () => {
        boxEastFaces(r, 0, H.garage, { front: '#3d4550', side: '#525c68', top: '#6e7a88' }).forEach((f) => faces.push(f));
        faces.push(eastDoorPersp(r, H));
      }});
    });
    (c.units || []).forEach((u) => {
      const r = M.bbox(u);
      vols.push({ x: r.x + r.w / 2, draw: () => {
        boxEastFaces(r, 0, H.ground, { front: '#b7ab96', side: '#c4baa8', top: '#cfc6b6' }).forEach((f) => faces.push(f));
        // 4′ east porch
        const depth = 4;
        const px0 = r.x + r.w;
        const px1 = px0 + depth;
        const py0 = r.y + r.h * 0.28;
        const py1 = r.y + r.h * 0.72;
        faces.push(perspPoly([[px0, py0, 0], [px1, py0, 0], [px1, py1, 0], [px0, py1, 0]], '#a88855', '#3a2a16', 0.9));
        faces.push(perspPoly([[px0, py0, 9], [px1, py0, 9], [px1, py1, 9], [px0, py1, 9]], '#5c4030', '#1a1d22', 0.9));
        faces.push(perspPoly([[px1, py0, 0], [px1, py1, 0], [px1, py1, 9], [px1, py0, 9]], '#c4a574', '#3a2a16', 0.92));
      }});
    });
    (c.upperUnits || []).forEach((u) => {
      const r = M.bbox(u);
      const uh = u.unit === 'A' ? H.upperA : H.upperB;
      vols.push({ x: r.x + r.w / 2, draw: () => {
        const fills = u.unit === 'A'
          ? { front: '#d4cbb8', side: '#ddd5c5', top: '#e6e0d4' }
          : { front: '#cdc4b2', side: '#d8d0c0', top: '#e2ddd2' };
        boxEastFaces(r, H.ground, H.ground + uh, fills).forEach((f) => faces.push(f));
        // Simple ridge parallel to X on top
        const pitch = u.unit === 'A' ? 7 : 5.5;
        const yMid = r.y + r.h / 2;
        const zTop = H.ground + uh;
        faces.push(perspPoly(
          [[r.x, r.y, zTop], [r.x + r.w, r.y, zTop], [r.x + r.w, yMid, zTop + pitch], [r.x, yMid, zTop + pitch]],
          '#4a5058', '#1a1d22', 0.94
        ));
        faces.push(perspPoly(
          [[r.x, r.y + r.h, zTop], [r.x + r.w, r.y + r.h, zTop], [r.x + r.w, yMid, zTop + pitch], [r.x, yMid, zTop + pitch]],
          '#3a3f46', '#1a1d22', 0.96
        ));
      }});
    });

    // Draw deep first
    vols.sort((a, b) => a.x - b.x);
    // Clear faces and rebuild in order — actually faces already interleaved; sort all faces by avgD descending
    vols.forEach((v) => v.draw());
    faces.sort((a, b) => b.avgD - a.avgD);

    let body = faces.map((f) => f.svg).join('\n');
    body = `
      <text x="40" y="28" font-size="14" font-weight="900" fill="#0d1b33">J1-B · EYE-LEVEL FROM PENNSYLVANIA · from Image 4.1 locked base</text>
      <text x="40" y="48" font-size="11" fill="#59636d">Camera on Penn sidewalk looking west · east garage doors face Access A / viewer · A near / B deep · 4′ E porches only</text>
      ${body}
      <text x="40" y="${PER.VB_H - 20}" font-size="11" font-weight="800" fill="#416145">Derived from APPROVED Image 4.1 · east-plane-svg-locked</text>
    `;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PER.VB_W} ${PER.VB_H}" role="img" aria-label="J1-B eye-level perspective from Image 4.1">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c5d4e0"/>
          <stop offset="100%" stop-color="#e8eef3"/>
        </linearGradient>
      </defs>
      <rect width="${PER.VB_W}" height="${PER.VB_H}" fill="url(#sky)"/>
      <rect y="${PER.VB_H * 0.58}" width="${PER.VB_W}" height="${PER.VB_H * 0.42}" fill="#d9d3c8"/>
      ${body}
    </svg>`;
    return { svg, mode: 'eye-level-perspective', doorPolicy: 'east-plane-svg-locked' };
  }

  function renderAll() {
    return {
      elevation: renderPennElevation(),
      perspective: renderEyeLevelPerspective(),
      status: 'CANDIDATE',
      from: 'Image 4.1 APPROVED',
    };
  }

  return { renderPennElevation, renderEyeLevelPerspective, renderAll };
})();

if (typeof module !== 'undefined') module.exports = Lot2J1BImage42Views;
