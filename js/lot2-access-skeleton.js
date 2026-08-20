/**
 * Lot 2 — Access Geometry A/B/C (parking skeletons only)
 * Architecture remaining after circulation. G1-A is proof, not a candidate.
 */
const Lot2AccessSkeleton = (() => {
  const S = typeof Lot2SOT !== 'undefined' ? Lot2SOT : {};
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const A = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
  const V = S.SUV_FS || { length: 20.5, width: 8, doorWidth: 16, apronDepth: 24 };
  const SETBACK = L.SETBACK_POLY;
  const SURVEY = L.SURVEY;
  const DRIVE_HALF = (S.DRIVE_WIDTH || 12) / 2;
  const SKEL = L.ACCESS_SKELETONS || ['access_a', 'access_b', 'access_c'];
  const MIN_HOME_WIDTH = 18;
  const MIN_ZONE_AREA = 500;
  const PLAUSIBLE_FIRST = 600;

  function garageRect(g) {
    return { x: g.x, y: g.y, w: g.w, h: g.h };
  }

  function segPoints(a, b, step) {
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = Math.max(1, Math.ceil(d / step));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
    return pts;
  }

  function allDrivePaths(concept) {
    const paths = [];
    if (concept.accessPaths) concept.accessPaths.forEach((ap) => paths.push(ap.path));
    if (concept.drive && concept.drive.length >= 2) paths.push(concept.drive);
    return paths;
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

  function occupiedByCirculation(concept, x, y) {
    if (!L.pointInPoly(x, y, SETBACK, 0.05)) return true;
    for (const g of concept.garages || []) {
      const r = garageRect(g);
      if (x >= r.x - 0.1 && x <= r.x + r.w + 0.1 && y >= r.y - 0.1 && y <= r.y + r.h + 0.1) return true;
    }
    for (const path of allDrivePaths(concept)) {
      for (let i = 0; i < path.length - 1; i++) {
        if (distPointSeg(x, y, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]) <= DRIVE_HALF + 0.5) return true;
      }
    }
    return false;
  }

  function architectureRemaining(concept) {
    const step = 2;
    const xs = [];
    const ys = [];
    for (let x = 25; x <= 128; x += step) xs.push(x);
    for (let y = 5; y <= 43; y += step) ys.push(y);
    const rows = ys.length;
    const cols = xs.length;
    const free = [];
    for (let j = 0; j < rows; j++) {
      free[j] = [];
      for (let i = 0; i < cols; i++) {
        free[j][i] = !occupiedByCirculation(concept, xs[i], ys[j]);
      }
    }
    const seen = Array.from({ length: rows }, () => Array(cols).fill(false));
    const components = [];
    function flood(j, i) {
      const stack = [[j, i]];
      const cells = [];
      while (stack.length) {
        const [cj, ci] = stack.pop();
        if (cj < 0 || ci < 0 || cj >= rows || ci >= cols || seen[cj][ci] || !free[cj][ci]) continue;
        seen[cj][ci] = true;
        cells.push([xs[ci], ys[cj]]);
        stack.push([cj - 1, ci], [cj + 1, ci], [cj, ci - 1], [cj, ci + 1]);
      }
      return cells;
    }
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        if (free[j][i] && !seen[j][i]) {
          const cells = flood(j, i);
          if (cells.length < 4) continue;
          const cx = cells.reduce((s, p) => s + p[0], 0) / cells.length;
          const cy = cells.reduce((s, p) => s + p[1], 0) / cells.length;
          const area = cells.length * step * step;
          let minW = Infinity;
          ys.forEach((y) => {
            const row = cells.filter((p) => Math.abs(p[1] - y) < step * 0.6).map((p) => p[0]).sort((a, b) => a - b);
            if (row.length < 2) return;
            let run = 1;
            let maxRun = 1;
            for (let k = 1; k < row.length; k++) {
              if (row[k] - row[k - 1] <= step * 1.2) run++;
              else {
                maxRun = Math.max(maxRun, run);
                run = 1;
              }
            }
            maxRun = Math.max(maxRun, run);
            minW = Math.min(minW, maxRun * step);
          });
          const xsC = cells.map((p) => p[0]);
          const ysC = cells.map((p) => p[1]);
          components.push({
            area: +area.toFixed(0),
            minWidth: minW === Infinity ? 0 : +minW.toFixed(1),
            bboxW: +(Math.max(...xsC) - Math.min(...xsC) + step).toFixed(1),
            bboxH: +(Math.max(...ysC) - Math.min(...ysC) + step).toFixed(1),
            minX: Math.min(...xsC),
            maxX: Math.max(...xsC) + step,
            minY: Math.min(...ysC),
            maxY: Math.max(...ysC) + step,
            cx: +cx.toFixed(1),
            cy: +cy.toFixed(1),
          });
        }
      }
    }
    components.sort((a, b) => b.area - a.area);
    const penn = components.filter((c) => c.cx >= 72);
    const rear = components.filter((c) => c.cx < 72);
    const zoneA = penn[0] || null;
    const zoneB = rear[0] || null;
    function zoneScore(z) {
      if (!z) return { ok: false, note: 'no contiguous zone' };
      if (z.minWidth < MIN_HOME_WIDTH) return { ok: false, note: `${z.minWidth}′ min width (< ${MIN_HOME_WIDTH}′ ribbon)` };
      if (z.area < MIN_ZONE_AREA) return { ok: false, note: `${z.area} SF too small` };
      return { ok: true, note: `${z.area} SF · ${z.minWidth}′ min width · ${z.bboxW}×${z.bboxH}′ bbox` };
    }
    const sA = zoneScore(zoneA);
    const sB = zoneScore(zoneB);
    const plausibleHomes = sA.ok && sB.ok && zoneA.area >= PLAUSIBLE_FIRST && zoneB.area >= PLAUSIBLE_FIRST;
    let verdict = 'Poor';
    if (plausibleHomes && zoneA.minWidth >= 20 && zoneB.minWidth >= 20) verdict = 'Strong';
    else if (plausibleHomes) verdict = 'Fair';
    else if (sA.ok || sB.ok) verdict = 'Weak';
    return {
      components,
      zoneA,
      zoneB,
      unitA: sA,
      unitB: sB,
      plausibleHomes,
      verdict,
      summary: `Unit A (Penn): ${sA.note}. Unit B (rear): ${sB.note}.`,
    };
  }

  function analyzeSkeleton(id) {
    const concept = L.CONCEPTS[id];
    if (!concept || !concept.skeleton) return { id, error: 'Not a skeleton concept' };
    const access = A ? A.analyzeConcept(id) : { technical: 'FAIL', reasons: ['No access engine'] };
    const arch = architectureRemaining(concept);
    const threePoint = access.threePoint || access.shortTangents?.some((n) => n.kind === 'short-tangent');
    const doorsOk = access.doors?.every((d) => d.clear >= V.length && d.ok !== false) ?? false;
    const stagingOk = access.doors?.every((d) => d.clear >= V.length) ?? false;

    let verdict = 'FAIL';
    const reasons = [...(access.reasons || [])];
    if (access.technical === 'PASS' && access.independent && !threePoint && stagingOk && arch.plausibleHomes) {
      verdict = 'PASS';
    } else if (access.technical === 'PASS' && !arch.plausibleHomes) {
      verdict = 'FAIL';
      reasons.push(`Architecture remaining: ${arch.summary} — circulation passes but homes are not plausible.`);
    } else if (access.technical === 'REVIEW') {
      verdict = 'REVIEW';
    } else if (access.technical === 'PASS' && (threePoint || !access.independent)) {
      verdict = 'REVIEW';
      reasons.push('Circulation REVIEW: three-point or stacked dependence.');
    }

    if (verdict === 'PASS' && access.daily && access.daily.startsWith('Fair')) {
      /* still PASS technically */
    }

    return {
      id,
      label: concept.label,
      access,
      architecture: arch,
      verdict,
      physical: access.technical,
      daily: access.daily,
      independent: access.independent,
      threePoint,
      architectureVerdict: arch.verdict,
      plausibleHomes: arch.plausibleHomes,
      reasons: [...new Set(reasons)].slice(0, 12),
      relative: concept.designConcern,
    };
  }

  function analyzeAllSkeletons() {
    const order = SKEL.filter((id) => L.CONCEPTS[id]?.skeleton);
    const rows = {};
    order.forEach((id) => {
      rows[id] = analyzeSkeleton(id);
    });
    return {
      order,
      rows,
      table: order.map((id) => {
        const r = rows[id];
        return {
          id,
          skeleton: r.label,
          physical: r.physical,
          architecture: r.architectureVerdict,
          plausibleHomes: r.plausibleHomes ? 'Yes' : 'No',
          daily: r.daily,
          verdict: r.verdict,
        };
      }),
      lesson: lessonFrom(rows, order),
    };
  }

  function lessonFrom(rows, order) {
    const circPass = order.filter((id) => rows[id].physical === 'PASS');
    const archPass = order.filter((id) => rows[id].verdict === 'PASS');
    if (archPass.length === 0 && circPass.length >= 2) {
      return 'East-facing garages + Pennsylvania straight shot + south lane at y≈37 is the circulation generator (Access A and C). Central core (Access B) cannot give two independent FS-SUV bays. Circulation passes, but architecture remaining fails on all three — Penn zone and rear zone collapse to 4–16′ ribbons. The site wants garage-forward / garage-integrated architecture; do not fight that with recessed living-first plates.';
    }
    if (archPass.length === 1) {
      return `Only ${rows[archPass[0]].label} fully passes circulation and architecture remaining.`;
    }
    return 'Compare skeleton verdicts and architecture remaining before attaching house concepts.';
  }

  function renderArchitectureOverlay(concept, scale, mx, my) {
    const arch = architectureRemaining(concept);
    const sx = (x) => mx + x * scale;
    const sy = (y) => my + y * scale;
    let s = '';
    function zoneRect(z, cls, label) {
      if (!z) return '';
      const w = (z.maxX - z.minX) * scale;
      const h = (z.maxY - z.minY) * scale;
      const ok = z.minWidth >= MIN_HOME_WIDTH && z.area >= PLAUSIBLE_FIRST;
      return `<rect class="${cls}" x="${sx(z.minX)}" y="${sy(z.minY)}" width="${w}" height="${h}" fill="${ok ? '#41614533' : '#9a3b2e33'}" stroke="${ok ? '#416145' : '#9a3b2e'}" stroke-width="1.5" stroke-dasharray="6 4"/><text class="sm" x="${sx(z.minX + (z.maxX - z.minX) / 2)}" y="${sy(z.minY + (z.maxY - z.minY) / 2)}" text-anchor="middle" fill="${ok ? '#416145' : '#9a3b2e'}">${label} · ${z.area} SF · ${z.minWidth}′ min</text>`;
    }
    s += zoneRect(arch.zoneA, 'zone-a', 'Unit A (Penn)');
    s += zoneRect(arch.zoneB, 'zone-b', 'Unit B (rear)');
    return s;
  }

  return {
    analyzeSkeleton,
    analyzeAllSkeletons,
    architectureRemaining,
    renderArchitectureOverlay,
    SKEL,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2AccessSkeleton;
