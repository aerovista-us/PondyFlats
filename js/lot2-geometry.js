/**
 * Lot 2 — LOCKED drawing convention · Pass 1.5 geometry engine
 * Pennsylvania RIGHT · compass LEFT · drives from Penn/right only.
 */
const Lot2 = (() => {
  const S = typeof Lot2SOT !== 'undefined' ? Lot2SOT : null;
  const SURVEY = S ? S.SURVEY.map((p) => [...p]) : [
    [0, 0], [148, 0], [148, 50], [125.143, 43.016], [84.813, 43.016], [0, 57.01],
  ];
  const SURVEY_AREA = S ? S.SURVEY_AREA : 7023.43;
  const SETBACKS = S ? { ...S.SETBACKS } : { front: 20, rear: 25, west: 5, east: 10 };
  const SEGMENT_SB = S ? [...S.SEGMENT_SETBACK] : ['west', 'front', 'east', 'east', 'east', 'rear'];
  const DRIVE_W = S ? S.DRIVE_WIDTH : 12;
  const GAR = S ? { ...S.GARAGE } : { w: 22, h: 22, sf: 484 };

  const SCALE = 5.45;
  const MARGIN = { x: 70, y: 40 };
  const VB_W = Math.ceil(148 * SCALE + MARGIN.x * 2 + 40);
  const VB_H = Math.ceil(57.01 * SCALE + MARGIN.y * 2 + 20);

  function segmentSetbackFeet(i) {
    return SETBACKS[SEGMENT_SB[i]];
  }

  function lineIntersect(a, b, c, d) {
    const [x1, y1] = a;
    const [x2, y2] = b;
    const [x3, y3] = c;
    const [x4, y4] = d;
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(den) < 1e-9) return [(x2 + x3) / 2, (y2 + y3) / 2];
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  }

  /** Polygon-accurate inward setback envelope (planning assumptions — not survey). */
  function setbackPoly() {
    const n = SURVEY.length;
    const lines = [];
    for (let i = 0; i < n; i++) {
      const a = SURVEY[i];
      const b = SURVEY[(i + 1) % n];
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const d = segmentSetbackFeet(i);
      lines.push({
        a: [a[0] + nx * d, a[1] + ny * d],
        b: [b[0] + nx * d, b[1] + ny * d],
      });
    }
    const out = [];
    for (let i = 0; i < n; i++) {
      const L0 = lines[(i - 1 + n) % n];
      const L1 = lines[i];
      out.push(lineIntersect(L0.a, L0.b, L1.a, L1.b));
    }
    return out;
  }

  const SETBACK_POLY = setbackPoly();

  function polyArea(coords) {
    let a = 0;
    for (let i = 0; i < coords.length; i++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[(i + 1) % coords.length];
      a += x1 * y2 - x2 * y1;
    }
    return Math.abs(a) / 2;
  }

  function pointInPoly(x, y, poly, eps = 0.08) {
    if (distToPolyBoundary(x, y, poly) <= eps) return true;
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0];
      const yi = poly[i][1];
      const xj = poly[j][0];
      const yj = poly[j][1];
      const hit = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (hit) inside = !inside;
    }
    return inside;
  }

  function distPointSeg(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  function distToPolyBoundary(x, y, poly) {
    let min = Infinity;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      min = Math.min(min, distPointSeg(x, y, a[0], a[1], b[0], b[1]));
    }
    return min;
  }

  function polyInside(coords, poly) {
    return coords.every(([x, y]) => pointInPoly(x, y, poly));
  }

  function unitFootprint(u) {
    if (u.poly) return u.poly.map((p) => [...p]);
    return [[u.x, u.y], [u.x + u.w, u.y], [u.x + u.w, u.y + u.h], [u.x, u.y + u.h]];
  }

  function garageFootprint(g) {
    if (g.rect) {
      const [x, y, w, h] = g.rect;
      return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
    }
    return [[g.x, g.y], [g.x + g.w, g.y], [g.x + g.w, g.y + g.h], [g.x, g.y + g.h]];
  }

  function allFootprints(concept) {
    const fps = [];
    (concept.units || []).forEach((u) => fps.push({ label: u.name, coords: unitFootprint(u), kind: 'unit' }));
    (concept.garages || []).forEach((g) => {
      if (!g.integrated) fps.push({ label: g.name, coords: garageFootprint(g), kind: 'garage' });
    });
    return fps;
  }

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
  function polySvg(coords, cls, label) {
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

  function unitBoxesForClearance(concept) {
    const boxes = [];
    (concept.units || []).forEach((u) => {
      if (u.poly) boxes.push({ poly: u.poly.map((p) => [...p]), label: u.name });
      else boxes.push({ rect: { x: u.x, y: u.y, w: u.w, h: u.h }, label: u.name });
    });
    return boxes;
  }

  function distPointFootprint(px, py, fp) {
    if (fp.poly) {
      if (pointInPoly(px, py, fp.poly)) return 0;
      let min = Infinity;
      for (let i = 0; i < fp.poly.length; i++) {
        const a = fp.poly[i];
        const b = fp.poly[(i + 1) % fp.poly.length];
        min = Math.min(min, distPointSeg(px, py, a[0], a[1], b[0], b[1]));
      }
      return min;
    }
    const r = fp.rect;
    const dx = Math.max(r.x - px, px - (r.x + r.w), 0);
    const dy = Math.max(r.y - py, py - (r.y + r.h), 0);
    return Math.hypot(dx, dy);
  }

  function structureBoxes(concept) {
    const boxes = [];
    (concept.units || []).forEach((u) => {
      const c = unitFootprint(u);
      const xs = c.map((p) => p[0]);
      const ys = c.map((p) => p[1]);
      boxes.push({ x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys), label: u.name });
    });
    (concept.garages || []).forEach((g) => {
      if (!g.integrated) boxes.push({ x: g.x, y: g.y, w: g.w, h: g.h, label: g.name });
    });
    return boxes;
  }

  function minSeparation(concept) {
    const boxes = structureBoxes(concept);
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

  function unitFirstFloorArea(u) {
    if (u.poly) return polyArea(u.poly);
    return u.w * u.h;
  }

  function baseLot(extra = '') {
    const ny = sy(28);
    return `<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#5b6771"/></marker></defs>
<polygon class="lot" points="${pts(SURVEY)}"/>
<polygon class="envelope" points="${pts(SETBACK_POLY)}"/>
<text class="dim" x="${sx(74)}" y="${sy(-5)}" text-anchor="middle">148.00′ DEPTH · REAR ← → PENNSYLVANIA</text>
<text class="dim" x="${sx(-4)}" y="${sy(28)}" transform="rotate(-90 ${sx(-4)} ${sy(28)})" text-anchor="middle">57.01′ NORTH / REAR</text>
<text class="sm" x="${sx(42)}" y="${sy(54)}" text-anchor="middle">85.98′</text>
<text class="sm" x="${sx(105)}" y="${sy(46)}" text-anchor="middle">40.33′</text>
<text class="sm" x="${sx(137)}" y="${sy(49.5)}" text-anchor="middle">23.90′</text>
<text class="front" x="${sx(151)}" y="${sy(25)}" transform="rotate(90 ${sx(151)} ${sy(25)})" text-anchor="middle">50.00′ PENNSYLVANIA · SOUTH / FRONT</text>
<path class="north-arrow" d="M${sx(-8)} ${ny} L${sx(8)} ${ny} M${sx(-8)} ${ny} L${sx(-2)} ${ny - 6} M${sx(-8)} ${ny} L${sx(-2)} ${ny + 6}"/>
<text class="sm" x="${sx(-14)}" y="${ny + 4}" text-anchor="middle">N</text>
<text class="sm" x="${sx(-14)}" y="${ny + 16}" text-anchor="middle">REAR</text>
<text class="sm" x="${sx(76)}" y="${sy(52)}" text-anchor="middle">WORKING SETBACK ENVELOPE · planning assumption</text>
${extra}`;
  }

  function renderConcept(concept) {
    let s = '';
    if (concept.court) {
      const [cx, cy, cw, ch] = concept.court;
      s += `<rect class="court" x="${sx(cx)}" y="${sy(cy)}" width="${cw * SCALE}" height="${ch * SCALE}"/><text class="sm" x="${sx(cx + cw / 2)}" y="${sy(cy + ch / 2)}" text-anchor="middle">COURT · ${cw}×${ch}</text>`;
    }
    (concept.garages || []).forEach((g) => {
      if (g.integrated) {
        s += `<rect class="garage integrated" x="${sx(g.x)}" y="${sy(g.y)}" width="${g.w * SCALE}" height="${g.h * SCALE}" stroke-dasharray="4 3"/>`;
      } else {
        s += rect(g.x, g.y, g.w, g.h, 'garage', g.name);
      }
    });
    (concept.units || []).forEach((u) => {
      if (u.poly) s += polySvg(u.poly, 'house', u.name);
      else s += rect(u.x, u.y, u.w, u.h, 'house', u.name);
    });
    s += drive(concept.drive);
    return s;
  }

  const G2_A = [[25, 10], [72, 10], [72, 22], [58, 22], [58, 35], [25, 35]];
  const G2_B = [[88, 10], [127, 10], [127, 33], [98, 33], [98, 22], [88, 22], [88, 10]];

  const CONCEPTS = {
    reference: { id: 'reference', label: 'Survey Reference', role: 'SOT base', group: 'sot' },
    e2: {
      id: 'e2',
      label: 'E2 Recessed Garage',
      role: 'Conventional benchmark',
      group: 'benchmark',
      firstFloorBenchmark: 900,
      designConcern: '900/910 SF lower split · safest conventional baseline',
      units: [
        { name: 'UNIT A · 900 SF', x: 83, y: 5, w: 45, h: 20, sf: 900 },
        {
          name: 'UNIT B · 910 SF',
          poly: [[25, 25], [127, 25], [127, 33], [72, 33], [72, 35], [25, 35]],
          sf: 910,
        },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 36, y: 8, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 58, y: 8, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 12], [58, 12]],
      second: 890,
    },
    g1: {
      id: 'g1',
      label: 'G1 Z-Duplex',
      role: 'Efficiency benchmark · Z-stagger interlock',
      group: 'benchmark',
      designConcern: 'Z-stagger interlock · party-wall / service core',
      units: [
        { name: 'UNIT A · 912 SF', x: 88, y: 5, w: 38, h: 24, sf: 912 },
        { name: 'UNIT B · 646 SF', x: 38, y: 18, w: 38, h: 16, sf: 608 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 64, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 25, y: 16, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 12], [64, 12], [25, 12]],
      second: 1054,
    },
    v2: {
      id: 'v2',
      label: 'V2 Long-Axis V',
      role: 'Design ceiling',
      group: 'benchmark',
      designConcern: 'Angled wings · roof / foundation complexity',
      units: [
        { name: 'UNIT A · 798 SF', poly: [[85, 5], [127, 5], [127, 22], [85, 26]], sf: 798 },
        { name: 'UNIT B · 378 SF', poly: [[85, 26], [127, 22], [127, 33], [85, 33]], sf: 378 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 48, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 25, y: 16, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 12], [64, 12], [25, 12]],
      second: 1050,
    },
    e1: {
      id: 'e1',
      label: 'E1 Deep-Stagger',
      role: 'Privacy benchmark',
      group: 'revision',
      designConcern: 'Drive clearance · west unit clips garage zone',
      units: [
        { name: 'UNIT A · 880 SF', x: 88, y: 5, w: 40, h: 22, sf: 880 },
        { name: 'UNIT B · 880 SF', x: 30, y: 10, w: 28, h: 22, sf: 616 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 64, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 25, y: 10, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 38], [64, 38], [64, 27], [15, 38], [15, 12], [25, 12]],
      second: 920,
    },
    e3: {
      id: 'e3',
      label: 'E3 Front Courtyard',
      role: 'Courtyard benchmark',
      group: 'revision',
      designConcern: 'Court quality · Penn arrival sequence',
      court: [134, 10, 14, 22],
      units: [
        { name: 'UNIT A · 782 SF', x: 82, y: 5, w: 46, h: 17, sf: 782 },
        { name: 'UNIT B · 414 SF', x: 82, y: 24, w: 46, h: 9, sf: 414 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 48, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 48, y: 13, w: 22, h: 22 },
      ],
      drive: [[148, 41], [134, 41], [115, 41], [15, 41], [15, 12], [48, 12]],
      second: 1018,
    },
    f1: {
      id: 'f1',
      label: 'F1 Rear Motor Court',
      role: 'Street-presence benchmark',
      group: 'revision',
      designConcern: 'Aggressive upper-floor load (1400 SF target)',
      units: [
        { name: 'UNIT A · 400 SF', x: 108, y: 5, w: 20, h: 20, sf: 400 },
        { name: 'UNIT B · 200 SF', x: 108, y: 23, w: 20, h: 10, sf: 200 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 28, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 25, y: 17, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 12], [28, 12]],
      second: 1400,
    },
    g2: {
      id: 'g2',
      label: 'G2 Interlocking-L',
      role: 'Architectural wildcard',
      group: 'revision',
      designConcern: 'L-wing drive routing · interlock / roof junctions',
      units: [
        { name: `UNIT A · L · ${Math.round(polyArea(G2_A))} SF`, poly: G2_A, sf: Math.round(polyArea(G2_A)) },
        { name: `UNIT B · L · ${Math.round(polyArea(G2_B))} SF`, poly: G2_B, sf: Math.round(polyArea(G2_B)) },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 48, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 48, y: 13, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 27], [48, 27]],
      second: 982,
    },
    h2: {
      id: 'h2',
      label: 'H2 Carriage-Hinge Duplex',
      role: 'Challenger · hinged L pair around drive',
      group: 'challenger',
      designConcern: 'Split L program · hinge / drive coordination',
      units: [
        { name: 'UNIT A · L · 820 SF', poly: [[98, 5], [127, 5], [127, 22], [98, 22], [98, 14], [72, 14], [72, 5]], sf: 820 },
        { name: 'UNIT B · L · 547 SF', poly: [[98, 24], [127, 24], [127, 33], [72, 33], [72, 35], [98, 33]], sf: 547 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 48, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 48, y: 13, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 27], [48, 27]],
      second: 980,
    },
    h3: {
      id: 'h3',
      label: 'H3 Mews Courtyard Pair',
      role: 'Challenger · shared mews at Penn',
      group: 'challenger',
      designConcern: 'Mews court width · shared Penn arrival',
      court: [134, 8, 14, 20],
      units: [
        { name: 'UNIT A · 756 SF', x: 82, y: 5, w: 42, h: 18, sf: 756 },
        { name: 'UNIT B · 378 SF', x: 82, y: 24, w: 42, h: 9, sf: 378 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 48, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 48, y: 13, w: 22, h: 22 },
      ],
      drive: [[148, 41], [134, 41], [110, 41], [15, 41], [15, 12], [48, 12]],
      second: 1044,
    },
    h4: {
      id: 'h4',
      label: 'H4 Garage-Under / LOG',
      role: 'Challenger · living over garage mass',
      group: 'challenger',
      designConcern: 'LOG massing · staggered Penn/rear units',
      units: [
        { name: 'UNIT A · LOG · 880 SF', x: 86, y: 5, w: 40, h: 22, sf: 880 },
        { name: 'UNIT B · LOG · 880 SF', x: 25, y: 10, w: 34, h: 22, sf: 748 },
      ],
      garages: [
        { name: 'GARAGE A · grade', x: 86, y: 5, w: 22, h: 22, integrated: true },
        { name: 'GARAGE B · grade', x: 25, y: 10, w: 22, h: 22, integrated: true },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 38], [86, 38], [86, 27], [15, 38], [15, 12], [25, 12]],
      second: 920,
    },
    h5: {
      id: 'h5',
      label: 'H5 Urban Cottage Pair',
      role: 'Challenger · detached cottage plates',
      group: 'challenger',
      designConcern: 'Cottage separation · south drive routing',
      units: [
        { name: 'COTTAGE A · 864 SF', x: 90, y: 5, w: 36, h: 24, sf: 864 },
        { name: 'COTTAGE B · 792 SF', x: 48, y: 10, w: 36, h: 22, sf: 792 },
      ],
      garages: [
        { name: 'GARAGE A · 22×22', x: 64, y: 5, w: 22, h: 22 },
        { name: 'GARAGE B · 22×22', x: 25, y: 16, w: 22, h: 22 },
      ],
      drive: [[148, 41], [128, 41], [15, 41], [15, 38], [90, 38], [90, 29], [15, 38], [15, 12], [25, 12]],
      second: 936,
    },
    h6: {
      id: 'h6',
      label: 'H6 Central-Core Duplex',
      role: 'Challenger · garage spine · units flank',
      group: 'challenger',
      designConcern: 'Central-core architecture · garage spine circulation',
      units: [
        { name: 'UNIT A · 902 SF', x: 86, y: 5, w: 41, h: 22, sf: 902 },
        { name: 'UNIT B · 880 SF', x: 25, y: 10, w: 40, h: 22, sf: 880 },
      ],
      garages: [
        { name: 'CORE A · 22×22', x: 52, y: 8, w: 22, h: 22 },
        { name: 'CORE B · 22×22', x: 74, y: 8, w: 22, h: 22 },
      ],
      drive: [[148, 40], [128, 40], [74, 40], [74, 30]],
      second: 918,
    },
  };

  const CONCEPT_ORDER = ['e2', 'g1', 'v2', 'e1', 'e3', 'f1', 'g2', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const BENCHMARKS = ['e2', 'g1', 'v2'];
  /** Original seven (non-challenger) — role metadata only; geometry status is separate */
  const ESTABLISHED = ['e2', 'g1', 'v2', 'e1', 'e3', 'f1', 'g2'];
  const CHALLENGERS = ['h2', 'h3', 'h4', 'h5', 'h6'];
  const LIVING_TARGET = { min: 1600, max: 1900, label: '~1,800 SF total living per unit' };
  const SHORTLIST_TRACK = ['e2', 'g1', 'v2', 'h6', 'h3'];
  const SHORTLIST_BACKUP = ['e3'];
  const DEPRIORITIZED = ['e1', 'g2', 'h2', 'h4', 'h5'];

  function metrics(concept) {
    const unitAreas = (concept.units || []).map((u) => unitFirstFloorArea(u));
    const unitFirst = unitAreas.reduce((s, a) => s + a, 0) / unitAreas.length;
    const garageSF = (concept.garages || []).reduce((s, g) => s + (g.integrated ? 0 : g.w * g.h), 0);
    const livingSF = unitAreas.reduce((s, a) => s + a, 0);
    const buildingSF = livingSF + garageSF + (concept.garages || []).filter((g) => g.integrated).length * GAR.sf;
    const paved = driveLength(concept.drive) * DRIVE_W;
    return {
      firstFloor: Math.round(unitFirst),
      firstFloorExact: unitAreas.map((a) => +a.toFixed(1)),
      secondFloor: concept.second || 900,
      totalLiving: Math.round(unitFirst + (concept.second || 900)),
      garageEach: GAR.sf,
      garageTotal: (concept.garages || []).length * GAR.sf,
      buildingFootprint: Math.round(buildingSF),
      pavedSF: Math.round(paved),
      yardSF: Math.round(Math.max(0, SURVEY_AREA - buildingSF - paved)),
      minSep: minSeparation(concept).toFixed(1),
      driveLen: driveLength(concept.drive).toFixed(1),
    };
  }

  function validateConcept(concept) {
    const reasons = [];
    const fps = allFootprints(concept);
    let inSurvey = true;
    let inSetback = true;
    fps.forEach((fp) => {
      fp.coords.forEach(([x, y]) => {
        if (!pointInPoly(x, y, SURVEY)) {
          inSurvey = false;
          reasons.push(`${fp.label}: (${x.toFixed(1)}, ${y.toFixed(1)}) outside survey polygon`);
        }
        if (!pointInPoly(x, y, SETBACK_POLY)) {
          inSetback = false;
          reasons.push(`${fp.label}: (${x.toFixed(1)}, ${y.toFixed(1)}) outside working setback polygon`);
        }
      });
    });

    let garageOk = true;
    let bays = 0;
    (concept.garages || []).forEach((g) => {
      bays += 1;
      if (g.w !== GAR.w || g.h !== GAR.h) {
        garageOk = false;
        reasons.push(`${g.name}: must be ${GAR.w}′×${GAR.h}′ (${GAR.sf} SF)`);
      }
    });
    if (bays < 2) {
      garageOk = false;
      reasons.push('Two 22×22 garage bays required');
    }

    const path = concept.drive || [];
    let pennAccess = path.length >= 2 && path[0][0] >= (S ? S.PENN_X : 148) - 1;
    if (!pennAccess) reasons.push('Drive must connect at Pennsylvania / right (x ≈ 148)');

    const unitBoxes = unitBoxesForClearance(concept);
    let minDriveClear = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const steps = Math.max(4, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 3));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = a[0] + (b[0] - a[0]) * t;
        const py = a[1] + (b[1] - a[1]) * t;
        unitBoxes.forEach((fp) => {
          minDriveClear = Math.min(minDriveClear, distPointFootprint(px, py, fp));
        });
      }
    }
    const driveOk = minDriveClear >= DRIVE_W / 2 - 0.75;
    if (!driveOk) reasons.push(`Min drive clearance ${minDriveClear.toFixed(1)}′ < ${DRIVE_W / 2}′ each side`);

    const m = metrics(concept);
    const livingTargetOk = m.totalLiving >= LIVING_TARGET.min && m.totalLiving <= LIVING_TARGET.max;
    if (!livingTargetOk) {
      reasons.push(`Total living ${m.totalLiving} SF/unit outside ${LIVING_TARGET.min}–${LIVING_TARGET.max} SF band`);
    }

    let firstFloorBenchmarkOk = true;
    if (concept.firstFloorBenchmark) {
      firstFloorBenchmarkOk = (concept.units || []).every((u) => {
        const a = unitFirstFloorArea(u);
        const target = u.sf || concept.firstFloorBenchmark;
        return Math.abs(a - target) < 80;
      });
      if (!firstFloorBenchmarkOk) {
        reasons.push(`First-floor areas must match declared ~${concept.firstFloorBenchmark} SF benchmark (±80 SF)`);
      }
    }

    const checks = {
      inSurvey,
      inSetback,
      garageOk,
      pennAccess,
      driveOk,
      livingTargetOk,
      firstFloorBenchmarkOk,
    };

    let status = 'PASS';
    if (!inSurvey || !garageOk || !pennAccess) status = 'FAIL';
    else if (!inSetback || !driveOk || !livingTargetOk || !firstFloorBenchmarkOk) status = 'REVIEW';

    let verdict = status === 'PASS' ? 'Geometry PASS under working assumptions' : status === 'REVIEW' ? 'Geometry REVIEW — fix footprint, setback, drive, or program band' : 'Geometry FAIL — parcel, garage, or Penn access';

    return {
      status,
      verdict,
      checks,
      reasons: reasons.slice(0, 8),
      minDriveClear: minDriveClear === Infinity ? null : +minDriveClear.toFixed(1),
      metrics: m,
      designConcern: concept.designConcern || '—',
    };
  }

  function validateAll() {
    const out = {};
    CONCEPT_ORDER.forEach((id) => {
      if (CONCEPTS[id]?.units) out[id] = validateConcept(CONCEPTS[id]);
    });
    return out;
  }

  function plan(id) {
    if (id === 'reference') return `<svg viewBox="0 0 ${VB_W} ${VB_H}" role="img">${baseLot()}</svg>`;
    const c = CONCEPTS[id];
    if (!c?.units) return plan('reference');
    return `<svg viewBox="0 0 ${VB_W} ${VB_H}" role="img">${baseLot(renderConcept(c))}</svg>`;
  }

  function getMetrics(id) {
    const c = CONCEPTS[id];
    return c?.units ? metrics(c) : null;
  }

  function getValidation(id) {
    const c = CONCEPTS[id];
    return c?.units ? validateConcept(c) : null;
  }

  function validationGroups() {
    const vals = validateAll();
    const pass = [];
    const review = [];
    const fail = [];
    CONCEPT_ORDER.forEach((id) => {
      const s = vals[id]?.status;
      if (s === 'PASS') pass.push(id);
      else if (s === 'FAIL') fail.push(id);
      else review.push(id);
    });
    return { pass, review, fail, vals };
  }

  const GROUP_LABELS = {
    benchmark: 'Benchmark trio (role)',
    revision: 'Original seven — non-benchmark roles',
    challenger: 'Challengers H2–H6 (role)',
    geometryPass: 'Geometry PASS — shortlist eligible',
    geometryReview: 'Geometry REVIEW — resolve before shortlist',
  };

  return {
    SURVEY,
    SURVEY_AREA,
    SETBACKS,
    SETBACK_POLY,
    CONCEPTS,
    CONCEPT_ORDER,
    LAB_ORDER: CONCEPT_ORDER,
    BENCHMARKS,
    ESTABLISHED,
    REVISION: ['e1', 'e3', 'f1', 'g2'],
    CHALLENGERS,
    LIVING_TARGET,
    SHORTLIST_TRACK,
    SHORTLIST_BACKUP,
    DEPRIORITIZED,
    GROUP_LABELS,
    setbackPoly,
    envelopePoly: setbackPoly,
    polyArea,
    pointInPoly,
    validateConcept,
    validateAll,
    validationGroups,
    plan,
    getMetrics,
    getValidation,
    getAllValidations: validateAll,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2;
