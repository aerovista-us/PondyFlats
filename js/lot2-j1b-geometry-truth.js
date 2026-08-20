/**
 * Lot 2 — J1-B Geometry Truth (Image 1)
 * Top-down plan rendered ONLY from frozen Lot2.CONCEPTS.j1b + Access A.
 * No roofs, materials, or artistic interpretation.
 */
const Lot2J1BGeometryTruth = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const ID = 'j1b';
  const SCALE = 5.45;
  const MX = 70;
  const MY = 50;

  function sx(x) {
    return MX + x * SCALE;
  }
  function sy(y) {
    return MY + y * SCALE;
  }
  function pts(arr) {
    return arr.map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');
  }

  function freezeStamp(c) {
    const g = (c.garages || []).map((g) => `${g.id}:${g.x},${g.y},${g.w}x${g.h}`).join('|');
    const u = (c.units || []).map((u) => `${u.unit}:${u.x},${u.y},${u.w}x${u.h}`).join('|');
    const up = (c.upperUnits || [])
      .map((u) => {
        if (u.poly) return `${u.unit}:poly${JSON.stringify(u.poly)}`;
        return `${u.unit}:${u.x},${u.y},${u.w}x${u.h}`;
      })
      .join('|');
    const paths = JSON.stringify(c.accessPaths);
    return { garages: g, ground: u, upper: up, paths };
  }

  function dimLine(x1, y1, x2, y2, label, offset) {
    const ox = offset?.[0] || 0;
    const oy = offset?.[1] || 0;
    const mx = (x1 + x2) / 2 + ox;
    const my = (y1 + y2) / 2 + oy;
    return `<line class="dimline" x1="${sx(x1)}" y1="${sy(y1)}" x2="${sx(x2)}" y2="${sy(y2)}"/>
      <text class="dimlab" x="${sx(mx)}" y="${sy(my)}" text-anchor="middle">${label}</text>`;
  }

  function doorTick(g) {
    // East-facing door: tick at east face center
    const x = g.x + g.w;
    const y = g.y + g.h / 2;
    return `<line class="door" x1="${sx(x)}" y1="${sy(y - 4)}" x2="${sx(x + 3)}" y2="${sy(y - 4)}"/>
      <line class="door" x1="${sx(x)}" y1="${sy(y + 4)}" x2="${sx(x + 3)}" y2="${sy(y + 4)}"/>
      <line class="door" x1="${sx(x)}" y1="${sy(y - 4)}" x2="${sx(x)}" y2="${sy(y + 4)}"/>
      <text class="tiny" x="${sx(x + 5)}" y="${sy(y + 1)}" text-anchor="start">DOOR E</text>`;
  }

  function entryMarker(u, label) {
    const cx = u.x + u.w / 2;
    const cy = u.y + u.h / 2;
    return `<circle class="entry" cx="${sx(cx)}" cy="${sy(cy)}" r="7"/>
      <text class="entrylab" x="${sx(cx)}" y="${sy(cy) + 3}" text-anchor="middle">${label}</text>`;
  }

  function pathLabels(path, name) {
    let s = '';
    path.forEach((p, i) => {
      s += `<circle class="wp" cx="${sx(p[0])}" cy="${sy(p[1])}" r="3.5"/>
        <text class="tiny" x="${sx(p[0]) + 6}" y="${sy(p[1]) - 6}">${name}${i}: (${p[0]}, ${p[1]})</text>`;
    });
    return s;
  }

  function renderTruthSvg() {
    const c = L.CONCEPTS?.[ID];
    if (!c) return '<svg><text>Missing CONCEPTS.j1b</text></svg>';
    const survey = L.SURVEY;
    const setback = L.SETBACK_POLY;
    const stamp = freezeStamp(c);
    const VB_W = Math.ceil(148 * SCALE + MX * 2 + 80);
    const VB_H = Math.ceil(57.01 * SCALE + MY * 2 + 60);
    const ny = sy(28);

    let body = '';

    // Lot + setback
    body += `<polygon class="lot" points="${pts(survey)}"/>`;
    body += `<polygon class="envelope" points="${pts(setback)}"/>`;

    // Access paths first (under masses)
    (c.accessPaths || []).forEach((ap) => {
      body += `<polyline class="drive" points="${pts(ap.path)}"/>`;
      body += `<polyline class="center" points="${pts(ap.path)}"/>`;
      body += pathLabels(ap.path, ap.garage);
    });
    if (c.drive) {
      const dup = (c.accessPaths || []).some((ap) => JSON.stringify(ap.path) === JSON.stringify(c.drive));
      if (!dup) {
        body += `<polyline class="drive" points="${pts(c.drive)}"/>`;
        body += `<polyline class="center" points="${pts(c.drive)}"/>`;
      }
    }

    // Court (schematic leftover, labeled as non-architecture)
    if (c.court) {
      const [cx, cy, cw, ch] = c.court;
      body += `<rect class="court" x="${sx(cx)}" y="${sy(cy)}" width="${cw * SCALE}" height="${ch * SCALE}"/>
        <text class="tiny" x="${sx(cx + cw / 2)}" y="${sy(cy + ch / 2)}" text-anchor="middle">COURT REF · ${cw}×${ch}</text>`;
    }

    // Upper masses (dashed — second floor plate truth)
    (c.upperUnits || []).forEach((u) => {
      if (u.poly) {
        body += `<polygon class="upper" points="${pts(u.poly)}"/>`;
        const cx = u.poly.reduce((s, p) => s + p[0], 0) / u.poly.length;
        const cy = u.poly.reduce((s, p) => s + p[1], 0) / u.poly.length;
        body += `<text class="lab" x="${sx(cx)}" y="${sy(cy)}" text-anchor="middle">${u.name}</text>`;
      } else {
        body += `<rect class="upper" x="${sx(u.x)}" y="${sy(u.y)}" width="${u.w * SCALE}" height="${u.h * SCALE}"/>
          <text class="lab" x="${sx(u.x + u.w / 2)}" y="${sy(u.y + u.h / 2)}" text-anchor="middle">${u.name}</text>
          <text class="tiny" x="${sx(u.x + u.w / 2)}" y="${sy(u.y + u.h / 2) + 12}" text-anchor="middle">(${u.x}, ${u.y}) ${u.w}×${u.h}</text>`;
      }
    });

    // Ground pods
    (c.units || []).forEach((u) => {
      body += `<rect class="ground" x="${sx(u.x)}" y="${sy(u.y)}" width="${u.w * SCALE}" height="${u.h * SCALE}"/>
        <text class="lab" x="${sx(u.x + u.w / 2)}" y="${sy(u.y + u.h / 2) - 4}" text-anchor="middle">${u.name}</text>
        <text class="tiny" x="${sx(u.x + u.w / 2)}" y="${sy(u.y + u.h / 2) + 10}" text-anchor="middle">(${u.x}, ${u.y}) ${u.w}×${u.h}</text>`;
      body += entryMarker(u, `E-${u.unit}`);
    });

    // Garages + door ticks + dims
    (c.garages || []).forEach((g) => {
      body += `<rect class="garage" x="${sx(g.x)}" y="${sy(g.y)}" width="${g.w * SCALE}" height="${g.h * SCALE}"/>
        <text class="lab" x="${sx(g.x + g.w / 2)}" y="${sy(g.y + g.h / 2) - 4}" text-anchor="middle">${g.name}</text>
        <text class="tiny" x="${sx(g.x + g.w / 2)}" y="${sy(g.y + g.h / 2) + 10}" text-anchor="middle">(${g.x}, ${g.y}) · doorFace ${g.doorFace || '?'}</text>`;
      body += doorTick(g);
      body += dimLine(g.x, g.y - 2, g.x + g.w, g.y - 2, `${g.w}′`, [0, -1.5]);
      body += dimLine(g.x - 2, g.y, g.x - 2, g.y + g.h, `${g.h}′`, [-2, 0]);
    });

    // Survey dims + orientation
    body += `<text class="dim" x="${sx(74)}" y="${sy(-6)}" text-anchor="middle">148.00′ DEPTH · REAR ← → PENNSYLVANIA</text>`;
    body += `<text class="dim" x="${sx(-5)}" y="${sy(28)}" transform="rotate(-90 ${sx(-5)} ${sy(28)})" text-anchor="middle">57.01′ NORTH / REAR</text>`;
    body += `<text class="sm" x="${sx(42)}" y="${sy(54)}" text-anchor="middle">85.98′</text>`;
    body += `<text class="sm" x="${sx(105)}" y="${sy(46)}" text-anchor="middle">40.33′</text>`;
    body += `<text class="sm" x="${sx(137)}" y="${sy(49.5)}" text-anchor="middle">23.90′</text>`;
    body += `<text class="front" x="${sx(152)}" y="${sy(25)}" transform="rotate(90 ${sx(152)} ${sy(25)})" text-anchor="middle">50.00′ PENNSYLVANIA · SOUTH / FRONT</text>`;
    body += `<path class="north" d="M${sx(-8)} ${ny} L${sx(8)} ${ny} M${sx(-8)} ${ny} L${sx(-2)} ${ny - 6} M${sx(-8)} ${ny} L${sx(-2)} ${ny + 6}"/>`;
    body += `<text class="sm" x="${sx(-14)}" y="${ny + 4}" text-anchor="middle">N</text>`;
    body += `<text class="sm" x="${sx(-14)}" y="${ny + 16}" text-anchor="middle">REAR</text>`;

    // Title block
    body += `<text class="title" x="${sx(74)}" y="${sy(-12)}" text-anchor="middle">J1-B GEOMETRY TRUTH · IMAGE 1 · NO ARCHITECTURAL INTERPRETATION</text>`;
    body += `<text class="sm" x="${sx(74)}" y="${sy(62)}" text-anchor="middle">Source: Lot2.CONCEPTS.j1b · Access A lock · +X → Pennsylvania · +Y → irregular south</text>`;

    return {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="J1-B geometry truth plan">${body}</svg>`,
      stamp,
      concept: c,
      vb: { w: VB_W, h: VB_H },
    };
  }

  function scheduleTable() {
    const c = L.CONCEPTS?.[ID];
    if (!c) return [];
    const rows = [];
    (c.garages || []).forEach((g) => {
      rows.push({
        layer: 'Garage',
        id: g.id,
        name: g.name,
        origin: `(${g.x}, ${g.y})`,
        size: `${g.w}×${g.h}`,
        note: `doorFace ${g.doorFace}`,
      });
    });
    (c.units || []).forEach((u) => {
      rows.push({
        layer: 'Ground',
        id: u.unit,
        name: u.name,
        origin: `(${u.x}, ${u.y})`,
        size: `${u.w}×${u.h}`,
        note: `${u.sf} SF`,
      });
    });
    (c.upperUnits || []).forEach((u) => {
      rows.push({
        layer: 'Upper',
        id: u.unit,
        name: u.name,
        origin: u.poly ? 'polygon' : `(${u.x}, ${u.y})`,
        size: u.poly ? `${u.sf} SF poly` : `${u.w}×${u.h}`,
        note: `${u.sf} SF`,
      });
    });
    (c.accessPaths || []).forEach((ap) => {
      rows.push({
        layer: 'Path',
        id: ap.garage,
        name: `Inbound ${ap.garage}`,
        origin: ap.path.map((p) => `(${p[0]},${p[1]})`).join(' → '),
        size: '—',
        note: 'FS-SUV Access A',
      });
    });
    return rows;
  }

  return { renderTruthSvg, scheduleTable, freezeStamp, ID };
})();

if (typeof module !== 'undefined') module.exports = Lot2J1BGeometryTruth;
