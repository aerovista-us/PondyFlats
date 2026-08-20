/**
 * Lot 2 — LOCKED drawing convention
 *
 * Pennsylvania Avenue = RIGHT, 50.00' frontage drawn vertically.
 * Pennsylvania = SOUTH / FRONT.
 * North / Rear = LEFT. Compass points LEFT. Do not rotate north-up.
 * 148.00' runs horizontally: rear/left → Pennsylvania/right.
 * Irregular 85.98' + 40.33' + 23.90' = BOTTOM. No road/drive/Penn along bottom.
 * 57.01' = LEFT / rear.
 * Vehicle access originates at the right-hand Pennsylvania frontage and travels left into the lot.
 *
 * Drawing coords (feet): +X toward Pennsylvania (right), +Y down toward irregular (bottom).
 * Origin = rear-left (north/west of drawing).
 */
const Lot2 = (() => {
  const SURVEY = [
    [0, 0],
    [148, 0],
    [148, 50],
    [125.143, 43.016],
    [84.813, 43.016],
    [0, 57.01],
  ];
  const SURVEY_AREA = 7023.43;

  const SETBACKS = { front: 20, rear: 25, west: 5, east: 10 };
  const SCALE = 5.45;
  const MARGIN = { x: 70, y: 40 };

  const VB_W = Math.ceil(148 * SCALE + MARGIN.x * 2 + 40);
  const VB_H = Math.ceil(57.01 * SCALE + MARGIN.y * 2 + 20);

  function sx(x) {
    return MARGIN.x + x * SCALE;
  }
  function sy(y) {
    return MARGIN.y + y * SCALE;
  }
  function pts(arr) {
    return arr.map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');
  }
  function rect(x, y, w, h, cls, label) {
    return `<rect class="${cls}" x="${sx(x)}" y="${sy(y)}" width="${w * SCALE}" height="${h * SCALE}"/><text class="lab" x="${sx(x + w / 2)}" y="${sy(y + h / 2)}" text-anchor="middle">${label}</text>`;
  }
  function poly(coords, cls, label) {
    const cx = coords.reduce((s, p) => s + p[0], 0) / coords.length;
    const cy = coords.reduce((s, p) => s + p[1], 0) / coords.length;
    return `<polygon class="${cls}" points="${pts(coords)}"/><text class="lab" x="${sx(cx)}" y="${sy(cy)}" text-anchor="middle">${label}</text>`;
  }
  function drive(path) {
    return `<polyline class="drive" points="${pts(path)}"/><polyline class="center" points="${pts(path)}"/>`;
  }
  function driveLength(path) {
    let len = 0;
    for (let i = 1; i < path.length; i++) {
      len += Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
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
    const x0 = SETBACKS.rear;
    const x1 = 148 - SETBACKS.front;
    const y0 = SETBACKS.west;
    const y1 = 57.01 - SETBACKS.east;
    return [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
    ];
  }

  function baseLot(extra = '') {
    const env = envelopePoly();
    const ny = sy(28);
    return `<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#5b6771"/></marker></defs>
<polygon class="lot" points="${pts(SURVEY)}"/>
<polygon class="envelope" points="${pts(env)}"/>
<text class="dim" x="${sx(74)}" y="${sy(-5)}" text-anchor="middle">148.00′ DEPTH · REAR ← → PENNSYLVANIA</text>
<text class="dim" x="${sx(-4)}" y="${sy(28)}" transform="rotate(-90 ${sx(-4)} ${sy(28)})" text-anchor="middle">57.01′ NORTH / REAR</text>
<text class="sm" x="${sx(42)}" y="${sy(54)}" text-anchor="middle">85.98′</text>
<text class="sm" x="${sx(105)}" y="${sy(46)}" text-anchor="middle">40.33′</text>
<text class="sm" x="${sx(137)}" y="${sy(49.5)}" text-anchor="middle">23.90′</text>
<text class="front" x="${sx(151)}" y="${sy(25)}" transform="rotate(90 ${sx(151)} ${sy(25)})" text-anchor="middle">50.00′ PENNSYLVANIA · SOUTH / FRONT</text>
<path class="north-arrow" d="M${sx(-8)} ${ny} L${sx(8)} ${ny} M${sx(-8)} ${ny} L${sx(-2)} ${ny - 6} M${sx(-8)} ${ny} L${sx(-2)} ${ny + 6}"/>
<text class="sm" x="${sx(-14)}" y="${ny + 4}" text-anchor="middle">N</text>
<text class="sm" x="${sx(-14)}" y="${ny + 16}" text-anchor="middle">REAR</text>
${extra}`;
  }

  function metrics(concept) {
    const unitFirst = concept.units.reduce((s, u) => s + (u.sf || u.area || 750), 0) / concept.units.length;
    const garageSF = concept.garages.length * 484;
    const buildingSF = concept.units.reduce((s, u) => s + (u.sf || u.area || 750), 0) + garageSF;
    const paved = driveLength(concept.drive) * 12;
    const boxes = [...concept.units.filter((u) => u.w), ...concept.garages];
    return {
      firstFloor: Math.round(unitFirst),
      secondFloor: concept.second || 900,
      totalLiving: Math.round(unitFirst + (concept.second || 900)),
      garageEach: 484,
      buildingFootprint: Math.round(buildingSF),
      pavedSF: Math.round(paved),
      yardSF: Math.round(Math.max(0, SURVEY_AREA - buildingSF - paved)),
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
        { name: 'UNIT A · 45×20 · 900 SF', x: 83, y: 8, w: 45, h: 20, sf: 900 },
        { name: 'UNIT B · 45×20 · 900 SF', x: 83, y: 28, w: 45, h: 20, sf: 900 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 58, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 58, y: 30, w: 22, h: 22 },
      ],
      drive: [
        [148, 42],
        [128, 42],
        [100, 40],
        [80, 40],
        [58, 40],
      ],
      second: 900,
    },
    e1: {
      id: 'e1',
      label: 'E1 Deep-Stagger',
      role: 'Privacy benchmark',
      units: [
        { name: 'UNIT A · 40×22 · 880 SF', x: 88, y: 8, w: 40, h: 22, sf: 880 },
        { name: 'UNIT B · 40×22 · 880 SF', x: 30, y: 12, w: 40, h: 22, sf: 880 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 64, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 6, y: 12, w: 22, h: 22 },
      ],
      drive: [
        [148, 42],
        [128, 42],
        [90, 40],
        [64, 36],
        [28, 36],
        [6, 36],
      ],
      second: 920,
    },
    e3: {
      id: 'e3',
      label: 'E3 Front Courtyard',
      role: 'Courtyard benchmark',
      court: [120, 14, 8, 22],
      units: [
        { name: 'UNIT A · 45×18 · 810 SF', x: 75, y: 8, w: 45, h: 18, sf: 810 },
        { name: 'UNIT B · 45×18 · 810 SF', x: 75, y: 32, w: 45, h: 18, sf: 810 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 50, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 50, y: 32, w: 22, h: 22 },
      ],
      drive: [
        [148, 42],
        [128, 42],
        [100, 42],
        [72, 40],
        [50, 40],
      ],
      second: 990,
    },
    f1: {
      id: 'f1',
      label: 'F1 Rear Motor Court',
      role: 'Street-presence benchmark',
      units: [
        { name: 'UNIT A · 20×20 · 400 SF', x: 108, y: 8, w: 20, h: 20, sf: 400 },
        { name: 'UNIT B · 20×20 · 400 SF', x: 108, y: 28, w: 20, h: 20, sf: 400 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 28, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 6, y: 30, w: 22, h: 22 },
      ],
      drive: [
        [148, 42],
        [128, 42],
        [90, 42],
        [50, 42],
        [28, 38],
        [17, 38],
      ],
      second: 1400,
    },
    g1: {
      id: 'g1',
      label: 'G1 Z-Duplex',
      role: 'High-potential challenger',
      units: [
        { name: 'UNIT A · 38×24 · 912 SF', x: 90, y: 8, w: 38, h: 24, sf: 912 },
        { name: 'UNIT B · 38×24 · 912 SF', x: 40, y: 22, w: 38, h: 24, sf: 912 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 66, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 16, y: 22, w: 22, h: 22 },
      ],
      drive: [
        [148, 42],
        [128, 42],
        [90, 40],
        [66, 36],
        [38, 36],
        [16, 36],
      ],
      second: 888,
    },
    g2: {
      id: 'g2',
      label: 'G2 Interlocking-L',
      role: 'Architectural wildcard',
      units: [
        { name: 'UNIT A · L-wing', x: 90, y: 8, w: 30, h: 28, sf: 840 },
        { name: 'UNIT B · L-wing', x: 55, y: 18, w: 30, h: 28, sf: 840 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 66, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 30, y: 28, w: 22, h: 22 },
      ],
      drive: [
        [148, 42],
        [128, 42],
        [90, 40],
        [55, 40],
        [30, 40],
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
            [70, 8],
            [128, 8],
            [128, 22],
            [70, 28],
          ],
          sf: 750,
          area: 750,
        },
        {
          name: 'UNIT B · 750 SF',
          poly: [
            [70, 28],
            [128, 22],
            [128, 40],
            [70, 40],
          ],
          sf: 750,
          area: 750,
        },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 45, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 22, y: 22, w: 22, h: 22 },
      ],
      drive: [
        [148, 42],
        [128, 42],
        [90, 40],
        [68, 39],
        [45, 39],
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
    SETBACKS,
    CONCEPTS,
    plan,
    getMetrics,
    envelopePoly,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2;
