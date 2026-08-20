/**
 * Lot 2 — J1 Pass 2A massing study
 * Locked Access A infrastructure · LOG/upper-floor program · ribbon kill criterion
 */
const Lot2J1Massing = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const A = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
  const INFRA = L.ACCESS_A_INFRA || {};
  const J1 = L.J1_MASSING || ['j1a', 'j1b', 'j1c'];
  const SETBACK = L.SETBACK_POLY;
  const SURVEY = L.SURVEY;
  const DRIVE_HALF = ((typeof Lot2SOT !== 'undefined' ? Lot2SOT.DRIVE_WIDTH : 12) || 12) / 2;

  const MIN_MASS_WIDTH = 16;
  const MIN_GROUND_WIDTH = 16;
  const GROUND_BAND = { min: 350, max: 750, target: '550–700' };
  const UPPER_BAND = { min: 900, max: 1300, target: '1,100–1,250' };
  const TOTAL_BAND = { min: 1600, max: 1900 };

  function massFootprint(m) {
    if (m.poly) return m.poly.map((p) => [...p]);
    return [[m.x, m.y], [m.x + m.w, m.y], [m.x + m.w, m.y + m.h], [m.x, m.y + m.h]];
  }

  function massArea(m) {
    if (m.sf) return m.sf;
    if (m.poly) return L.polyArea(m.poly);
    return m.w * m.h;
  }

  function massMinWidth(m) {
    if (m.poly) {
      const ys = [...new Set(m.poly.map((p) => p[1]))].sort((a, b) => a - b);
      let minW = Infinity;
      ys.forEach((y) => {
        const xs = m.poly.filter((p) => Math.abs(p[1] - y) < 0.5).map((p) => p[0]).sort((a, b) => a - b);
        if (xs.length >= 2) minW = Math.min(minW, Math.max(...xs) - Math.min(...xs));
      });
      if (minW === Infinity && m.poly.length >= 2) {
        const xs = m.poly.map((p) => p[0]);
        const ys2 = m.poly.map((p) => p[1]);
        minW = Math.min(Math.max(...xs) - Math.min(...xs), Math.max(...ys2) - Math.min(...ys2));
      }
      return minW;
    }
    return Math.min(m.w, m.h);
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

  function distPointFootprint(px, py, coords) {
    if (L.pointInPoly(px, py, coords, 0.05)) return 0;
    let min = Infinity;
    for (let i = 0; i < coords.length; i++) {
      const a = coords[i];
      const b = coords[(i + 1) % coords.length];
      min = Math.min(min, distPointSeg(px, py, a[0], a[1], b[0], b[1]));
    }
    return min;
  }

  function allDrivePaths(concept) {
    const paths = [];
    if (concept.accessPaths) concept.accessPaths.forEach((ap) => paths.push(ap.path));
    if (concept.drive?.length >= 2) paths.push(concept.drive);
    return paths;
  }

  function skeletonLocked(concept) {
    const reasons = [];
    (INFRA.garages || []).forEach((ref, i) => {
      const g = (concept.garages || [])[i];
      if (!g || g.x !== ref.x || g.y !== ref.y || g.w !== ref.w || g.h !== ref.h) {
        reasons.push(`Garage ${ref.id || i} moved from Access A lock (${ref.x},${ref.y})`);
      }
    });
    if (JSON.stringify(concept.drive) !== JSON.stringify(INFRA.drive)) {
      reasons.push('Drive polyline changed from Access A lock');
    }
    if (JSON.stringify(concept.accessPaths) !== JSON.stringify(INFRA.accessPaths)) {
      reasons.push('FS-SUV access paths changed from Access A lock');
    }
    return { ok: reasons.length === 0, reasons };
  }

  function envelopeOk(concept) {
    const reasons = [];
    const masses = [
      ...(concept.units || []).map((m) => ({ ...m, level: 'ground' })),
      ...(concept.upperUnits || []).map((m) => ({ ...m, level: 'upper' })),
    ];
    masses.forEach((m) => {
      massFootprint(m).forEach(([x, y]) => {
        if (!L.pointInPoly(x, y, SURVEY)) reasons.push(`${m.name}: (${x.toFixed(1)}, ${y.toFixed(1)}) outside survey`);
        if (!L.pointInPoly(x, y, SETBACK)) reasons.push(`${m.name}: (${x.toFixed(1)}, ${y.toFixed(1)}) outside setback`);
      });
    });
    return { ok: reasons.length === 0, reasons: [...new Set(reasons)] };
  }

  function driveClearanceOk(concept) {
    const reasons = [];
    const paths = allDrivePaths(concept);
    let minClear = Infinity;
    (concept.units || []).forEach((u) => {
      const fp = massFootprint(u);
      paths.forEach((path) => {
        for (let i = 0; i < path.length - 1; i++) {
          const a = path[i];
          const b = path[i + 1];
          const steps = Math.max(4, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 3));
          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const px = a[0] + (b[0] - a[0]) * t;
            const py = a[1] + (b[1] - a[1]) * t;
            minClear = Math.min(minClear, distPointFootprint(px, py, fp));
          }
        }
      });
    });
    if (minClear < DRIVE_HALF - 0.5) {
      reasons.push(`Ground mass encroaches drive corridor (${minClear.toFixed(1)}′ clearance, need ${DRIVE_HALF}′)`);
    }
    return { ok: reasons.length === 0, minClear: minClear === Infinity ? null : +minClear.toFixed(1), reasons };
  }

  function programForConcept(concept) {
    if (concept.program) {
      const g = concept.program.ground || {};
      const u = concept.program.upper || {};
      return {
        A: { ground: g.A || 0, upper: u.A || 0, total: (g.A || 0) + (u.A || 0) },
        B: { ground: g.B || 0, upper: u.B || 0, total: (g.B || 0) + (u.B || 0) },
        note: concept.program.upperNote || null,
      };
    }
    const ground = { A: 0, B: 0 };
    const upper = { A: 0, B: 0 };
    (concept.units || []).forEach((m) => {
      const key = m.unit || 'A';
      ground[key] = (ground[key] || 0) + massArea(m);
    });
    (concept.upperUnits || []).forEach((m) => {
      const key = m.unit || 'A';
      if (key === 'shared') {
        upper.A = (upper.A || 0) + massArea(m) / 2;
        upper.B = (upper.B || 0) + massArea(m) / 2;
      } else {
        upper[key] = (upper[key] || 0) + massArea(m);
      }
    });
    return {
      A: { ground: Math.round(ground.A), upper: Math.round(upper.A), total: Math.round(ground.A + upper.A) },
      B: { ground: Math.round(ground.B), upper: Math.round(upper.B), total: Math.round(ground.B + upper.B) },
      note: null,
    };
  }

  function ribbonCheck(concept) {
    const failures = [];
    const masses = [];
    (concept.units || []).forEach((m) => masses.push({ ...m, level: 'ground' }));
    (concept.upperUnits || []).forEach((m) => masses.push({ ...m, level: 'upper' }));
    const scored = masses.map((m) => {
      const w = massMinWidth(m);
      const area = massArea(m);
      const minReq = m.level === 'ground' ? MIN_GROUND_WIDTH : MIN_MASS_WIDTH;
      if (w < minReq) failures.push(`${m.name}: ${w.toFixed(1)}′ min width (< ${minReq}′ ribbon kill)`);
      return { ...m, minWidth: +w.toFixed(1), area: Math.round(area) };
    });
    return { ok: failures.length === 0, failures, masses: scored };
  }

  function analyzeMassing(id) {
    const concept = L.CONCEPTS[id];
    if (!concept || concept.family !== 'j1') return { id, error: 'Not a J1 massing concept' };
    const access = A ? A.analyzeConcept(id) : { technical: 'FAIL', reasons: ['No access engine'] };
    const lock = skeletonLocked(concept);
    const env = envelopeOk(concept);
    const drive = driveClearanceOk(concept);
    const ribbon = ribbonCheck(concept);
    const program = programForConcept(concept);

    const reasons = [];
    if (!lock.ok) reasons.push(...lock.reasons);
    if (!env.ok) reasons.push(...env.reasons.slice(0, 4));
    if (!drive.ok) reasons.push(...drive.reasons);
    if (!ribbon.ok) reasons.push(...ribbon.failures);
    if (access.technical !== 'PASS') {
      reasons.push(`FS-SUV access ${access.technical}: ${(access.reasons || [])[0] || ''}`);
    }

    ['A', 'B'].forEach((u) => {
      const p = program[u];
      if (p.ground < GROUND_BAND.min || p.ground > GROUND_BAND.max) {
        reasons.push(`Unit ${u} ground ${p.ground} SF outside ${GROUND_BAND.min}–${GROUND_BAND.max} SF band`);
      }
      if (p.upper < UPPER_BAND.min || p.upper > UPPER_BAND.max) {
        reasons.push(`Unit ${u} upper ${p.upper} SF outside ${UPPER_BAND.min}–${UPPER_BAND.max} SF band`);
      }
      if (p.total < TOTAL_BAND.min || p.total > TOTAL_BAND.max) {
        reasons.push(`Unit ${u} total ${p.total} SF outside ${TOTAL_BAND.min}–${TOTAL_BAND.max} SF living band`);
      }
    });

    let verdict = 'PASS';
    if (!ribbon.ok || access.technical === 'FAIL' || !lock.ok || !env.ok) verdict = 'FAIL';
    else if (reasons.length > 0) verdict = 'REVIEW';

    let architecture = 'Promising';
    if (!ribbon.ok) architecture = 'Ribbon kill';
    else if (program.A.ground >= 500 && program.B.ground >= 350 && program.A.upper >= 1050) architecture = 'Strong';
    else if (program.A.total >= 1650 && program.B.total >= 1650) architecture = 'Fair';

    const question = ribbon.ok && access.technical === 'PASS' && lock.ok
      ? 'Can parking geometry become architecture we would choose? — massing passes ribbon kill; elevation study warranted.'
      : 'Fix massing failures before elevation study.';

    return {
      id,
      label: concept.label,
      treatment: concept.treatment,
      designConcern: concept.designConcern,
      access,
      lock,
      env,
      drive,
      ribbon,
      program,
      verdict,
      architecture,
      question,
      reasons: [...new Set(reasons)].slice(0, 14),
    };
  }

  function analyzeAll() {
    const order = J1.filter((id) => L.CONCEPTS[id]?.family === 'j1');
    const rows = {};
    order.forEach((id) => {
      rows[id] = analyzeMassing(id);
    });
    return {
      order,
      rows,
      table: order.map((id) => {
        const r = rows[id];
        const p = r.program;
        return {
          id,
          treatment: r.label,
          access: r.access?.technical || '—',
          unitA: `${p.A.ground} + ${p.A.upper} = ${p.A.total} SF`,
          unitB: `${p.B.ground} + ${p.B.upper} = ${p.B.total} SF`,
          ribbon: r.ribbon?.ok ? 'Pass' : 'Kill',
          architecture: r.architecture,
          verdict: r.verdict,
        };
      }),
      premise: 'Parking/access owns the ground plane. Residential = ground pod + LOG upper. Access A infrastructure is immutable.',
    };
  }

  return {
    analyzeMassing,
    analyzeAll,
    massMinWidth,
    massArea,
    MIN_MASS_WIDTH,
    GROUND_BAND,
    UPPER_BAND,
    J1,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2J1Massing;
