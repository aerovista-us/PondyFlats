/**
 * Lot 2 — Geometry Validation (Pass 1.5)
 * Polygon-accurate parcel + setback checks, preliminary SUV path tests.
 */
const Lot2Validate = (() => {
  const S = Lot2SOT;

  function distPointSeg(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  function pointInPoly(x, y, poly) {
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

  function boundarySegments(poly) {
    const segs = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      segs.push({ a, b, setback: S.SETBACKS[S.SEGMENT_SETBACK[i]] });
    }
    return segs;
  }

  function minBoundaryClearance(x, y, poly = S.SURVEY) {
    let min = Infinity;
    let worst = null;
    boundarySegments(poly).forEach((seg) => {
      const d = distPointSeg(x, y, seg.a[0], seg.a[1], seg.b[0], seg.b[1]);
      if (d < min) {
        min = d;
        worst = seg;
      }
    });
    return { min, required: worst ? worst.setback : 0, segment: worst };
  }

  function footprintVerts(concept) {
    const verts = [];
    (concept.units || []).forEach((u) => {
      if (u.poly) u.poly.forEach((p) => verts.push({ x: p[0], y: p[1], label: u.name }));
      else {
        verts.push({ x: u.x, y: u.y, label: u.name });
        verts.push({ x: u.x + u.w, y: u.y, label: u.name });
        verts.push({ x: u.x + u.w, y: u.y + u.h, label: u.name });
        verts.push({ x: u.x, y: u.y + u.h, label: u.name });
      }
    });
    (concept.garages || []).forEach((g) => {
      if (g.integrated) return;
      verts.push({ x: g.x, y: g.y, label: g.name });
      verts.push({ x: g.x + g.w, y: g.y, label: g.name });
      verts.push({ x: g.x + g.w, y: g.y + g.h, label: g.name });
      verts.push({ x: g.x, y: g.y + g.h, label: g.name });
    });
    return verts;
  }

  function buildingBoxes(concept) {
    const boxes = [];
    (concept.units || []).forEach((u) => {
      if (u.poly) {
        const xs = u.poly.map((p) => p[0]);
        const ys = u.poly.map((p) => p[1]);
        boxes.push({ x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys), label: u.name });
      } else boxes.push({ x: u.x, y: u.y, w: u.w, h: u.h, label: u.name });
    });
    (concept.garages || []).forEach((g) => {
      if (!g.integrated) boxes.push({ x: g.x, y: g.y, w: g.w, h: g.h, label: g.name });
    });
    return boxes;
  }

  function distPointBox(px, py, box) {
    const dx = Math.max(box.x - px, px - (box.x + box.w), 0);
    const dy = Math.max(box.y - py, py - (box.y + box.h), 0);
    return Math.hypot(dx, dy);
  }

  function checkParcel(concept) {
    const issues = [];
    footprintVerts(concept).forEach((v) => {
      if (!pointInPoly(v.x, v.y, S.SURVEY)) issues.push(`${v.label}: vertex (${v.x.toFixed(1)}, ${v.y.toFixed(1)}) outside lot polygon`);
    });
    return { pass: issues.length === 0, issues };
  }

  function checkSetbacks(concept) {
    const issues = [];
    footprintVerts(concept).forEach((v) => {
      const c = minBoundaryClearance(v.x, v.y);
      if (c.min < c.required - 0.05) {
        issues.push(`${v.label}: (${v.x.toFixed(1)}, ${v.y.toFixed(1)}) clearance ${c.min.toFixed(2)}′ < ${c.required}′ required`);
      }
    });
    return { pass: issues.length === 0, issues };
  }

  function turnAngle(a, b, c) {
    const v1x = b[0] - a[0];
    const v1y = b[1] - a[1];
    const v2x = c[0] - b[0];
    const v2y = c[1] - b[1];
    const m1 = Math.hypot(v1x, v1y);
    const m2 = Math.hypot(v2x, v2y);
    if (m1 === 0 || m2 === 0) return 0;
    const dot = (v1x * v2x + v1y * v2y) / (m1 * m2);
    return (Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI;
  }

  function checkVehicle(concept) {
    const issues = [];
    const path = concept.drive || [];
    const boxes = buildingBoxes(concept);
    const halfW = S.DRIVE_WIDTH / 2;
    const minSide = halfW - 0.5;

    if (path.length < 2) {
      issues.push('Drive path missing or too short');
      return { pass: false, issues };
    }

    if (path[0][0] < S.PENN_X - 1) issues.push('Drive must originate at Pennsylvania (right / x ≈ 148)');

    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const steps = Math.max(3, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = a[0] + (b[0] - a[0]) * t;
        const py = a[1] + (b[1] - a[1]) * t;
        let minD = Infinity;
        boxes.forEach((box) => {
          minD = Math.min(minD, distPointBox(px, py, box));
        });
        if (minD < minSide) {
          issues.push(`Drive segment ${i + 1}: clearance ${minD.toFixed(1)}′ < ${S.DRIVE_WIDTH}′ nominal (${minSide.toFixed(1)}′ each side)`);
          break;
        }
      }
      if (issues.length) break;
    }

    for (let i = 1; i < path.length - 1; i++) {
      const ang = turnAngle(path[i - 1], path[i], path[i + 1]);
      if (ang > 45) {
        const leg1 = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
        const leg2 = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
        const r = Math.min(leg1, leg2) / Math.tan((ang * Math.PI) / 360);
        if (r < S.SUV.turnRadius * 0.65) {
          issues.push(`Turn at drive node ${i + 1}: ~${ang.toFixed(0)}° turn, est. radius ${r.toFixed(1)}′ < SUV min ~${S.SUV.turnRadius}′`);
        }
      }
    }

    (concept.garages || []).forEach((g) => {
      if (g.integrated) return;
      const cx = g.x + g.w / 2;
      const cy = g.y + g.h / 2;
      let minD = Infinity;
      path.forEach((p) => {
        minD = Math.min(minD, Math.hypot(p[0] - cx, p[1] - cy));
      });
      if (minD > 28) issues.push(`${g.name}: garage center ${minD.toFixed(0)}′ from drive — weak connection`);
    });

    return { pass: issues.length === 0, issues };
  }

  function checkGarages(concept) {
    const issues = [];
    const list = concept.garages || [];
    let bays = 0;
    list.forEach((g) => {
      if (g.integrated) {
        bays += 1;
        if (g.w !== S.GARAGE.w || g.h !== S.GARAGE.h) issues.push(`${g.name}: integrated garage must be 22×22`);
        return;
      }
        if (g.tandem) {
        bays += 2;
        if (g.w !== S.GARAGE.w || g.h < S.GARAGE.w * 2 - 2) issues.push(`${g.name}: tandem bay must be ≥ 22×42`);
        return;
      }
      bays += 1;
      if (g.w !== S.GARAGE.w || g.h !== S.GARAGE.h) issues.push(`${g.name}: garage must be 22×22`);
    });
    if (bays < 2) issues.push(`Garage count: ${bays} bay(s) — need 2 per unit`);
    return { pass: issues.length === 0, issues };
  }

  function validateConcept(concept) {
    const parcel = checkParcel(concept);
    const setback = checkSetbacks(concept);
    const vehicle = checkVehicle(concept);
    const garage = checkGarages(concept);
    const checks = {
      parcel: parcel.pass,
      setback: setback.pass,
      garage: garage.pass,
      driveWidth: vehicle.pass,
      vehicleAccess: vehicle.pass,
    };
    const passCount = Object.values(checks).filter(Boolean).length;
    const viable = parcel.pass && setback.pass && garage.pass && vehicle.pass;
    return {
      checks,
      viable,
      passCount,
      totalChecks: 5,
      issues: [...parcel.issues, ...setback.issues, ...garage.issues, ...vehicle.issues],
      parcel,
      setback,
      vehicle,
      garage,
    };
  }

  function validateAll(concepts) {
    const rows = {};
    Object.keys(concepts).forEach((id) => {
      const c = concepts[id];
      if (!c || !c.units) return;
      rows[id] = validateConcept(c);
    });
    return rows;
  }

  return {
    validateConcept,
    validateAll,
    pointInPoly,
    minBoundaryClearance,
    footprintVerts,
    buildingBoxes,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2Validate;
