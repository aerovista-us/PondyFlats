/**
 * Lot 2 — bearing-derived survey geometry (north-up, +X east, +Y south)
 * Source: master.image.png boundary table
 */
const Lot2 = (() => {
  function az(quadrant, d, m, s) {
    const a = d + m / 60 + s / 3600;
    if (quadrant === 'NE') return a;
    if (quadrant === 'SE') return 180 - a;
    if (quadrant === 'SW') return 180 + a;
    return 360 - a;
  }

  const BEARINGS = [
    { label: '50.00′ Penn', bearing: 'S 89°37′24″ E', len: 50.0, az: az('SE', 89, 37, 24) },
    { label: '23.90′', bearing: 'S 17°05′07″ W', len: 23.9, az: az('SW', 17, 5, 7) },
    { label: '40.33′', bearing: 'S 0°58′24″ W', len: 40.33, az: az('SW', 0, 58, 24) },
    { label: '85.98′', bearing: 'S 9°12′03″ E', len: 85.98, az: az('SE', 9, 12, 3) },
    { label: '57.01′', bearing: 'N 89°37′24″ W', len: 57.01, az: az('NW', 89, 37, 24) },
    { label: '148.00′', bearing: 'N 0°22′36″ E', len: 148.0, az: az('NE', 0, 22, 36) },
  ];

  function traverse(segments, start = [0, 0]) {
    let [x, y] = start;
    const pts = [[x, y]];
    for (const { len, az: a } of segments) {
      const r = (a * Math.PI) / 180;
      x += len * Math.sin(r);
      y -= len * Math.cos(r);
      pts.push([+x.toFixed(4), +y.toFixed(4)]);
    }
    return pts.slice(0, -1);
  }

  const SURVEY = traverse(BEARINGS);
  const SURVEY_AREA = 7023.43;

  const SETBACKS = { front: 20, rear: 25, west: 5, east: 10 };
  const SCALE = 5.2;
  const MARGIN = { x: 48, y: 42 };

  const bounds = SURVEY.reduce(
    (b, [x, y]) => ({
      minX: Math.min(b.minX, x),
      maxX: Math.max(b.maxX, x),
      minY: Math.min(b.minY, y),
      maxY: Math.max(b.maxY, y),
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );

  const VB_W = Math.ceil((bounds.maxX - bounds.minX) * SCALE + MARGIN.x * 2);
  const VB_H = Math.ceil((bounds.maxY - bounds.minY) * SCALE + MARGIN.y * 2);

  function sx(x) {
    return MARGIN.x + (x - bounds.minX) * SCALE;
  }
  function sy(y) {
    return MARGIN.y + (y - bounds.minY) * SCALE;
  }
  function pts(arr) {
    return arr.map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');
  }
  function rect(x, y, w, h, cls, label) {
    const cx = sx(x + w / 2);
    const cy = sy(y + h / 2);
    return `<rect class="${cls}" x="${sx(x)}" y="${sy(y)}" width="${w * SCALE}" height="${h * SCALE}"/><text class="lab" x="${cx}" y="${cy}" text-anchor="middle">${label}</text>`;
  }
  function poly(coords, cls, label) {
    const cx = coords.reduce((s, p) => s + p[0], 0) / coords.length;
    const cy = coords.reduce((s, p) => s + p[1], 0) / coords.length;
    return `<polygon class="${cls}" points="${pts(coords)}"/><text class="lab" x="${sx(cx)}" y="${sy(cy)}" text-anchor="middle">${label}</text>`;
  }
  function drive(path) {
    return `<polyline class="drive" points="${pts(path)}"/><polyline class="center" points="${pts(path)}"/>`;
  }
  function polyArea(coords) {
    let a = 0;
    for (let i = 0; i < coords.length; i++) {
      const j = (i + 1) % coords.length;
      a += coords[i][0] * coords[j][1] - coords[j][0] * coords[i][1];
    }
    return Math.abs(a / 2);
  }
  function rectArea(w, h) {
    return w * h;
  }
  function driveLength(path) {
    let len = 0;
    for (let i = 1; i < path.length; i++) {
      const dx = path[i][0] - path[i - 1][0];
      const dy = path[i][1] - path[i - 1][1];
      len += Math.hypot(dx, dy);
    }
    return len;
  }
  function minSeparation(boxes) {
    let min = Infinity;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const dx = Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w), 0);
        const dy = Math.max(b.y - (a.y + a.h), a.y - (b.y + b.h), 0);
        min = Math.min(min, Math.hypot(dx, dy));
      }
    }
    return min === Infinity ? 0 : min;
  }

  function envelopePoly() {
    const x0 = bounds.minX + SETBACKS.west;
    const x1 = bounds.maxX - SETBACKS.east;
    const y0 = bounds.minY + SETBACKS.front;
    const y1 = bounds.maxY - SETBACKS.rear;
    return [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
    ];
  }

  function baseLot(extra = '') {
    const env = envelopePoly();
    return `<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#5b6771"/></marker></defs>
<polygon class="lot" points="${pts(SURVEY)}"/>
<polygon class="envelope" points="${pts(env)}"/>
<text class="dim" x="${sx(25)}" y="${sy(-4)}" text-anchor="middle">50.00′ PENNSYLVANIA · NORTH</text>
<text class="dim" x="${sx(-3)}" y="${sy(74)}" transform="rotate(-90 ${sx(-3)} ${sy(74)})" text-anchor="middle">148.00′ · WEST</text>
<text class="dim" x="${sx(28)}" y="${sy(152)}" text-anchor="middle">57.01′ · SOUTH</text>
<text class="sm" x="${sx(48)}" y="${sy(40)}" text-anchor="middle">85.98′</text>
<text class="sm" x="${sx(44)}" y="${sy(58)}" text-anchor="middle">40.33′</text>
<text class="sm" x="${sx(46)}" y="${sy(20)}" text-anchor="middle">23.90′ · EAST</text>
<text class="front" x="${sx(25)}" y="${sy(-10)}" text-anchor="middle">PENNSYLVANIA AVE ↑ NORTH</text>
<path class="north-arrow" d="M${sx(52)} ${sy(8)} L${sx(52)} ${sy(22)} M${sx(52)} ${sy(8)} L${sx(48)} ${sy(14)} M${sx(52)} ${sy(8)} L${sx(56)} ${sy(14)}"/>
<text class="sm" x="${sx(52)}" y="${sy(28)}" text-anchor="middle">N</text>
${extra}`;
  }

  function metrics(concept) {
    const unitFirst = concept.units.reduce((s, u) => s + (u.sf || u.area || 750), 0) / concept.units.length;
    const garageSF = concept.garages.length * 484;
    const buildingSF = concept.units.reduce((s, u) => s + (u.sf || u.area || 750), 0) + garageSF;
    const paved = driveLength(concept.drive) * 12;
    const lotSF = SURVEY_AREA;
    const yardSF = Math.max(0, lotSF - buildingSF - paved);
    const boxes = [...concept.units.filter((u) => u.w), ...concept.garages];
    return {
      firstFloor: Math.round(unitFirst),
      secondFloor: concept.second || 900,
      totalLiving: Math.round(unitFirst + (concept.second || 900)),
      garageEach: 484,
      buildingFootprint: Math.round(buildingSF),
      pavedSF: Math.round(paved),
      yardSF: Math.round(yardSF),
      minSep: minSeparation(boxes).toFixed(1),
      driveLen: driveLength(concept.drive).toFixed(1),
    };
  }

  function renderConcept(concept) {
    let s = '';
    if (concept.court) {
      const [cx, cy, cw, ch] = concept.court;
      s += `<rect class="court" x="${sx(cx)}" y="${sy(cy)}" width="${cw * SCALE}" height="${ch * SCALE}"/><text class="sm" x="${sx(cx + cw / 2)}" y="${sy(cy + ch / 2)}" text-anchor="middle">COURT</text>`;
    }
    concept.garages.forEach((g) => {
      s += rect(g.x, g.y, g.w, g.h, 'garage', g.name);
    });
    concept.units.forEach((u) => {
      if (u.poly) s += poly(u.poly, 'house', u.name);
      else s += rect(u.x, u.y, u.w, u.h, 'house', u.name);
    });
    s += drive(concept.drive);
    return s;
  }

  const CONCEPTS = {
    reference: { id: 'reference', label: 'Survey Reference', role: 'Authoritative base' },
    e2: {
      id: 'e2',
      label: 'E2 Recessed Garage',
      role: 'Conventional benchmark',
      units: [
        { name: 'UNIT A · 20×45 · 900 SF', x: 5, y: 20, w: 20, h: 45, sf: 900 },
        { name: 'UNIT B · 20×45 · 900 SF', x: 25, y: 20, w: 20, h: 45, sf: 900 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 5, y: 68, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 28, y: 68, w: 22, h: 22 },
      ],
      drive: [
        [25, 0],
        [25, 18],
        [25, 55],
        [16, 68],
        [39, 68],
      ],
      second: 900,
    },
    e1: {
      id: 'e1',
      label: 'E1 Deep-Stagger',
      role: 'Privacy benchmark',
      units: [
        { name: 'UNIT A · 22×40 · 880 SF', x: 5, y: 20, w: 22, h: 40, sf: 880 },
        { name: 'UNIT B · 22×40 · 880 SF', x: 8, y: 78, w: 22, h: 40, sf: 880 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 5, y: 62, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 8, y: 120, w: 22, h: 22 },
      ],
      drive: [
        [25, 0],
        [25, 15],
        [12, 62],
        [12, 120],
      ],
      second: 920,
    },
    e3: {
      id: 'e3',
      label: 'E3 Front Courtyard',
      role: 'Courtyard benchmark',
      court: [20, 20, 12, 8],
      units: [
        { name: 'UNIT A · 18×45 · 810 SF', x: 5, y: 28, w: 18, h: 45, sf: 810 },
        { name: 'UNIT B · 18×45 · 810 SF', x: 32, y: 28, w: 18, h: 45, sf: 810 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 5, y: 78, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 32, y: 78, w: 22, h: 22 },
      ],
      drive: [
        [25, 0],
        [25, 20],
        [25, 78],
      ],
      second: 990,
    },
    f1: {
      id: 'f1',
      label: 'F1 Rear Motor Court',
      role: 'Street-presence benchmark',
      units: [
        { name: 'UNIT A · 20×20 · 400 SF', x: 8, y: 20, w: 20, h: 20, sf: 400 },
        { name: 'UNIT B · 20×20 · 400 SF', x: 8, y: 40, w: 20, h: 20, sf: 400 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 5, y: 95, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 30, y: 110, w: 22, h: 22 },
      ],
      drive: [
        [25, 0],
        [25, 95],
        [16, 95],
        [39, 110],
      ],
      second: 1400,
      note: 'Compact north plates; majority of program upstairs',
    },
    g1: {
      id: 'g1',
      label: 'G1 Z-Duplex',
      role: 'High-potential challenger',
      units: [
        { name: 'UNIT A · 24×38 · 912 SF', x: 5, y: 20, w: 24, h: 38, sf: 912 },
        { name: 'UNIT B · 24×38 · 912 SF', x: 22, y: 70, w: 24, h: 38, sf: 912 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 5, y: 60, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 22, y: 110, w: 22, h: 22 },
      ],
      drive: [
        [25, 0],
        [25, 12],
        [12, 60],
        [33, 110],
      ],
      second: 888,
    },
    g2: {
      id: 'g2',
      label: 'G2 Interlocking-L',
      role: 'Architectural wildcard',
      units: [
        { name: 'UNIT A · L-wing', x: 5, y: 20, w: 28, h: 30, sf: 840 },
        { name: 'UNIT B · L-wing', x: 18, y: 55, w: 28, h: 30, sf: 840 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 5, y: 55, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 28, y: 90, w: 22, h: 22 },
      ],
      drive: [
        [25, 0],
        [25, 55],
        [16, 55],
        [39, 90],
      ],
      second: 960,
    },
    v2: {
      id: 'v2',
      label: 'V2 Long-Axis V',
      role: 'Design ceiling',
      units: [
        {
          name: 'UNIT A · 750 SF',
          poly: [
            [8, 22],
            [8, 80],
            [28, 75],
            [22, 22],
          ],
          sf: 750,
          area: 750,
        },
        {
          name: 'UNIT B · 750 SF',
          poly: [
            [22, 22],
            [28, 75],
            [48, 80],
            [48, 22],
          ],
          sf: 750,
          area: 750,
        },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 5, y: 85, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 28, y: 85, w: 22, h: 22 },
      ],
      drive: [
        [25, 0],
        [25, 22],
        [25, 85],
      ],
      second: 1050,
    },
  };

  function plan(id) {
    if (id === 'reference') {
      return `<svg viewBox="0 0 ${VB_W} ${VB_H}" role="img">${baseLot()}</svg>`;
    }
    const c = CONCEPTS[id];
    if (!c || !c.units) return plan('reference');
    return `<svg viewBox="0 0 ${VB_W} ${VB_H}" role="img">${baseLot(renderConcept(c))}</svg>`;
  }

  function getMetrics(id) {
    const c = CONCEPTS[id];
    return c && c.units ? metrics(c) : null;
  }

  return {
    SURVEY,
    SURVEY_AREA,
    BEARINGS,
    SETBACKS,
    bounds,
    CONCEPTS,
    plan,
    getMetrics,
    envelopePoly,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2;
