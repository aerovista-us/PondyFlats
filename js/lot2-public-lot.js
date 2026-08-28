/**
 * Fallback lot ingest for this repo — custom parcel polygons + grouped brief.
 * Not LotScope. The public product is lotscope.aerovista.us.
 * A different property starts there. Do not invent a second Lot 2 in lot2-sot.js.
 */
const Lot2PublicLot = (() => {
  const PRESETS = Object.freeze([
    {
      id: 'lot2',
      label: 'Lot 2 (this project)',
      locked: true,
      note: 'Already locked in this repo. Shown so you can compare. A new property uses a different polygon.',
      street: 'Pennsylvania',
      frontageEdge: 1,
      poly: [[0, 0], [148, 0], [148, 50], [125.143, 43.016], [84.813, 43.016], [0, 57.01]],
    },
    {
      id: 'rect',
      label: 'Rectangle 50 × 120',
      street: 'Front street',
      frontageEdge: 1,
      poly: [[0, 0], [120, 0], [120, 50], [0, 50]],
    },
    {
      id: 'trap',
      label: 'Trapezoid / pie wedge',
      street: 'Front street',
      frontageEdge: 1,
      poly: [[0, 8], [130, 0], [130, 55], [0, 42]],
    },
    {
      id: 'flag',
      label: 'Flag lot (narrow stem)',
      street: 'Front street',
      frontageEdge: 1,
      poly: [[0, 0], [40, 0], [40, 18], [110, 18], [110, 70], [0, 70]],
    },
    {
      id: 'l',
      label: 'L-shaped parcel',
      street: 'Front street',
      frontageEdge: 1,
      poly: [[0, 0], [90, 0], [90, 36], [140, 36], [140, 80], [0, 80]],
    },
  ]);

  const CATEGORIES = Object.freeze([
    {
      id: 'housing',
      label: 'Housing',
      hint: 'How many dwellings you will ask the lot to hold.',
      items: Object.freeze([
        { id: 'single', label: 'One home', brief: 'dwellings: 1' },
        { id: 'duplex', label: 'Two homes / duplex', brief: 'dwellings: 2' },
      ]),
    },
    {
      id: 'parking',
      label: 'Parking',
      hint: 'Enclosed vs covered. The workbench will not shrink a garage to force a pass.',
      items: Object.freeze([
        { id: 'mix', label: '2 enclosed + 2 covered', brief: 'parking: mixed (Design 1)' },
        { id: 'four', label: '4 enclosed (two 2-car)', brief: 'parking: four enclosed (Design 2)' },
        { id: 'other', label: 'Other / later', brief: 'parking: declare before Possible' },
      ]),
    },
    {
      id: 'garage',
      label: 'Garage relationship',
      hint: 'Where the cars live relative to the homes.',
      items: Object.freeze([
        { id: 'integrated', label: 'In the house plates', brief: 'garage: integrated' },
        { id: 'accessory', label: 'Detached accessory / rear yard', brief: 'garage: accessory detached' },
        { id: 'under', label: 'Living over garage', brief: 'garage: LOG / under' },
      ]),
    },
    {
      id: 'access',
      label: 'Access origin',
      hint: 'Which street the vehicle must enter from. No neighbor rescue.',
      items: Object.freeze([
        { id: 'street', label: 'Front street only', brief: 'accessOrigin: frontage street' },
        { id: 'alley', label: 'Alley allowed (only if this lot has one)', brief: 'accessOrigin: alley — only if survey shows it' },
      ]),
    },
    {
      id: 'envelope',
      label: 'Envelope',
      hint: 'Working setbacks. Hypotheses until the city confirms.',
      items: Object.freeze([
        { id: 'principal', label: 'Principal building (typical 20 / 25 / 5 / 10)', brief: 'setbacks: principal' },
        { id: 'accessoryRear', label: 'Accessory garage in rear yard', brief: 'setbacks: accessory rear (hypothesis)' },
      ]),
    },
  ]);

  const RESULT_GROUPS = Object.freeze([
    { id: 'pass', label: 'Geometry PASS', detail: 'Plates sit on the lot from the declared access. Eligible to continue.' },
    { id: 'review', label: 'Geometry REVIEW', detail: 'Close, but a movable piece still pinches. Iterate before polish.' },
    { id: 'fail', label: 'Geometry FAIL', detail: 'Blocked by a locked constraint (survey, access origin, vehicle, program). Stop or change the brief.' },
  ]);

  function polyArea(coords) {
    let a = 0;
    for (let i = 0; i < coords.length; i++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[(i + 1) % coords.length];
      a += x1 * y2 - x2 * y1;
    }
    return Math.abs(a) / 2;
  }

  function bbox(coords) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    coords.forEach(([x, y]) => {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    });
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  }

  function edgeLength(a, b) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.hypot(dx, dy);
  }

  function parsePoly(text) {
    const rows = String(text || '')
      .split(/[\n;]+/)
      .map((row) => row.trim())
      .filter(Boolean)
      .map((row) => row.split(/[,\s]+/).map(Number).filter((n) => Number.isFinite(n)));
    const pts = rows.filter((p) => p.length >= 2).map((p) => [p[0], p[1]]);
    if (pts.length >= 2) {
      const a = pts[0];
      const b = pts[pts.length - 1];
      if (a[0] === b[0] && a[1] === b[1]) pts.pop();
    }
    return pts;
  }

  function formatPoly(poly) {
    return (poly || []).map((p) => `${p[0]}, ${p[1]}`).join('\n');
  }

  function lotRecord(state) {
    const poly = state.poly || [];
    const box = poly.length ? bbox(poly) : { w: 0, h: 0 };
    const i = Number(state.frontageEdge) || 0;
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const frontage = a && b ? edgeLength(a, b) : 0;
    const depth = Math.max(box.w, box.h);
    return {
      survey: poly,
      area: poly.length >= 3 ? Math.round(polyArea(poly) * 100) / 100 : 0,
      frontageStreet: state.street || 'Front street',
      frontageLength: Math.round(frontage * 100) / 100,
      frontageEdge: i,
      depth: Math.round(depth * 100) / 100,
      drawingConvention: 'Do not rotate north-up. Street frontage is the declared edge. +X toward that street is a later lock.',
      categories: state.picks || {},
      preset: state.preset || 'custom',
      lockedExample: !!state.locked,
    };
  }

  function audit(record) {
    const required = ['survey', 'area', 'frontageStreet', 'frontageLength', 'depth', 'drawingConvention'];
    const missing = required.filter((k) => record == null || record[k] == null);
    const verts = (record && record.survey) || [];
    if (verts.length < 3) missing.push('survey (≥3 vertices)');
    if (record && record.area <= 0) missing.push('area');
    if (record && record.frontageLength <= 0) missing.push('frontageLength');
    return { ok: missing.length === 0, missing };
  }

  return {
    PRESETS, CATEGORIES, RESULT_GROUPS,
    polyArea, bbox, edgeLength, parsePoly, formatPoly, lotRecord, audit,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2PublicLot;
