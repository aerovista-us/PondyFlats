#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const W = require('../js/lot2-workbench-audit.js');
const D4 = require('../js/lot2-design-4.js');

const STEP = 2;
const R = D4.VEHICLE.minRearAxleRadius;
const STEERS = [-1 / R, 0, 1 / R];
const STREET_X = 150;
const HISTORICAL_ENTRY_X = 142;
const MAX_EXPANDED = 55000;

class Heap {
  constructor() { this.a = []; }
  push(v) { this.a.push(v); let i = this.a.length - 1; while (i) { const p = (i - 1) >> 1; if (this.a[p].f <= v.f) break; this.a[i] = this.a[p]; i = p; } this.a[i] = v; }
  pop() { if (!this.a.length) return null; const root = this.a[0], last = this.a.pop(); if (this.a.length) { let i = 0; while (true) { const l = i * 2 + 1, r = l + 1; if (l >= this.a.length) break; const c = r < this.a.length && this.a[r].f < this.a[l].f ? r : l; if (this.a[c].f >= last.f) break; this.a[i] = this.a[c]; i = c; } this.a[i] = last; } return root; }
  get size() { return this.a.length; }
}
const wrap = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
const key = (s) => `${Math.round(s.x * 2)}:${Math.round(s.y * 2)}:${Math.round((wrap(s.th) + Math.PI) / (Math.PI / 36))}:${s.gear}`;
const body = (s) => W.vehiclePoly(s.x, s.y, s.th, D4.VEHICLE);
const clone = (v) => JSON.parse(JSON.stringify(v));
const rect = (r) => W.rectPoly(r);

function buildModel(spec = {}) {
  const garages = clone(D4.GARAGES), homes = clone(D4.HOMES), stalls = clone(D4.STALLS);
  const gb = garages.find((g) => g.unit === 'B');
  const hb = homes.find((h) => h.unit === 'B');
  const dxg = spec.garageBShiftX || 0, dyg = spec.garageBShiftY || 0;
  if (dxg || dyg) {
    gb.x += dxg; gb.y += dyg; gb.door.y1 += dyg; gb.door.y2 += dyg;
    for (const s of stalls.filter((s) => s.unit === 'B')) { s.axleX += dxg; s.axleY += dyg; }
  }
  const dxh = spec.homeBShiftX || 0, dyh = spec.homeBShiftY || 0;
  if (hb.poly) hb.poly = hb.poly.map(([x, y]) => [x + dxh, y + dyh]);
  else { hb.x += dxh; hb.y += dyh; }
  return { garages, homes, stalls, pavementPadFt: spec.pavementPadFt || 0, streetYs: spec.streetYs || [37], doorClearanceTarget: spec.doorClearanceTarget || 0 };
}

const homePoly = (h) => h.poly || rect(h);
function garageWallsOk(poly, g) {
  const dx = g.x + g.w, xmin = Math.min(...poly.map((p) => p[0])), xmax = Math.max(...poly.map((p) => p[0]));
  for (const c of poly) if (c[0] < dx - 1e-6 && (c[0] < g.x - 1e-6 || c[1] < g.y - 1e-6 || c[1] > g.y + g.d + 1e-6)) return false;
  if (xmin < dx && xmax > dx) { const ys = W.lineCrossY(poly, dx); if (ys.length && (Math.min(...ys) < g.door.y1 - 1e-6 || Math.max(...ys) > g.door.y2 + 1e-6)) return false; }
  return true;
}
function obstacleSet(model, unit, mate) {
  const other = model.garages.find((g) => g.unit !== unit);
  const obs = [...model.homes.map((h) => ({ id: h.id, poly: homePoly(h) })), { id: other.id, poly: rect(other) }];
  if (mate) obs.push({ id: 'mate', poly: mate });
  return obs;
}

function doorMargin(poly, g) {
  const dx = g.x + g.w, ys = W.lineCrossY(poly, dx), xmin = Math.min(...poly.map((c) => c[0])), xmax = Math.max(...poly.map((c) => c[0]));
  if (!(ys.length && xmin < dx && xmax > dx)) return null;
  return Math.min(Math.min(...ys) - g.door.y1, g.door.y2 - Math.max(...ys));
}
function validPose(s, model, unit, mate, minClear = 1) {
  const poly = body(s);
  if (s.x <= 144) {
    if (!poly.every((p) => W.pointInPoly(p, D4.SURVEY))) return false;
    if (W.boundaryDistance(poly, D4.SURVEY) < minClear - 1e-6) return false;
  }
  for (const o of obstacleSet(model, unit, mate)) if (W.polygonsIntersect(poly, o.poly) || W.polygonDistance(poly, o.poly) < minClear - 1e-6) return false;
  const g = model.garages.find((item) => item.unit === unit);
  if (!garageWallsOk(poly, g)) return false;
  const dm = doorMargin(poly, g);
  return dm == null || dm >= model.doorClearanceTarget - 1e-6;
}
function advance(s, gear, k) { const d = gear * STEP, mid = s.th + d * k / 2; return { x: s.x + d * Math.cos(mid), y: s.y + d * Math.sin(mid), th: wrap(s.th + d * k), gear }; }
function primitiveValid(s, n, model, unit, mate) {
  for (let i = 1; i <= 4; i++) { const t = i / 4, p = { x: s.x + (n.x - s.x) * t, y: s.y + (n.y - s.y) * t, th: wrap(s.th + wrap(n.th - s.th) * t), gear: n.gear }; if (!validPose(p, model, unit, mate)) return false; }
  return true;
}
const heuristic = (s, g) => Math.hypot(s.x - g.x, s.y - g.y) + Math.abs(wrap(s.th - g.th)) * 10;
function reconstruct(node) { const out = []; for (let n = node; n; n = n.parent) out.push({ x: +n.s.x.toFixed(3), y: +n.s.y.toFixed(3), th: +n.s.th.toFixed(5), gear: n.s.gear }); return out.reverse(); }

function transitAudit(model, unit, poses, mate, expectParked) {
  const dense = W.normalizePoses(poses, .25), g = model.garages.find((x) => x.unit === unit), obs = obstacleSet(model, unit, mate);
  let minB = Infinity, minO = Infinity, minDoor = Infinity, gears = 0; const issues = [];
  for (let i = 0; i < dense.length; i++) {
    const p = dense[i], poly = body(p); if (i && dense[i - 1].gear !== p.gear) gears++;
    if (p.x <= 144) { if (!poly.every((c) => W.pointInPoly(c, D4.SURVEY))) issues.push(`off-lot@${i}`); minB = Math.min(minB, W.boundaryDistance(poly, D4.SURVEY)); }
    for (const o of obs) { if (W.polygonsIntersect(poly, o.poly)) issues.push(`collision:${o.id}@${i}`); else minO = Math.min(minO, W.polygonDistance(poly, o.poly)); }
    const dm = doorMargin(poly, g); if (dm != null) { minDoor = Math.min(minDoor, dm); if (dm < -1e-6) issues.push(`door-clip:${dm.toFixed(2)}@${i}`); }
    if (!garageWallsOk(poly, g)) issues.push(`garage-wall@${i}`);
  }
  if (expectParked) { const final = body(dense[dense.length - 1]); if (!final.every((c) => W.pointInPoly(c, rect(g)))) issues.push('final-not-enclosed'); }
  else if (dense[dense.length - 1].x < 147.8) issues.push('outbound-not-at-street');
  const minClear = Math.min(minB, minO);
  return { ok: issues.length === 0 && minClear >= 1, minClearanceFt: isFinite(minClear) ? +minClear.toFixed(3) : null, minBoundaryFt: isFinite(minB) ? +minB.toFixed(3) : null, minObstacleFt: isFinite(minO) ? +minO.toFixed(3) : null, doorClearanceFt: isFinite(minDoor) ? +minDoor.toFixed(3) : null, gearChanges: gears, issues: [...new Set(issues)] };
}

function plan(model, stall, mate, direction) {
  const unit = stall.unit, stallPose = { x: stall.axleX, y: stall.axleY, th: stall.heading, gear: direction === 'outbound' ? -1 : 1 };
  const starts = direction === 'inbound' ? model.streetYs.map((y) => ({ x: HISTORICAL_ENTRY_X, y, th: Math.PI, gear: 1 })) : [stallPose];
  const goals = direction === 'inbound' ? [{ ...stallPose, gear: 1 }] : model.streetYs.map((y) => ({ x: STREET_X, y, th: Math.PI, gear: -1 }));
  let bestFailure = { ok: false, expanded: 0 };
  for (const start of starts) for (const goal of goals) {
    const open = new Heap(), best = new Map(), root = { s: start, g: 0, f: heuristic(start, goal), parent: null, changes: 0 }; open.push(root); best.set(key(start), 0); let expanded = 0;
    while (open.size && expanded < MAX_EXPANDED) {
      const cur = open.pop(), ck = key(cur.s); if (cur.g > (best.get(ck) ?? Infinity) + 1e-6) continue; expanded++;
      const dist = Math.hypot(cur.s.x - goal.x, cur.s.y - goal.y), ang = Math.abs(wrap(cur.s.th - goal.th));
      if (dist < 2.25 && ang < 0.12 && validPose(goal, model, unit, mate)) {
        const final = { s: goal, g: cur.g + dist, parent: cur, changes: cur.changes + (cur.s.gear !== goal.gear ? 1 : 0) };
        const poses = reconstruct(final), proof = transitAudit(model, unit, poses, mate, direction === 'inbound');
        if (proof.ok) return { ok: true, expanded, cost: +final.g.toFixed(1), gearChanges: final.changes, poses, proof, streetY: direction === 'inbound' ? start.y : goal.y };
      }
      for (const gear of [1, -1]) for (const k of STEERS) {
        const n = advance(cur.s, gear, k); if (n.x < 18 || n.x > 151 || n.y < 3 || n.y > 51 || !primitiveValid(cur.s, n, model, unit, mate)) continue;
        const change = gear !== cur.s.gear ? 1 : 0, ng = cur.g + STEP * (gear < 0 ? 1.18 : 1) + (k ? .16 : 0) + change * 18, nk = key(n);
        if (ng >= (best.get(nk) ?? Infinity) - 1e-6) continue;
        best.set(nk, ng); open.push({ s: n, g: ng, f: ng + heuristic(n, goal), parent: cur, changes: cur.changes + change });
      }
    }
    bestFailure.expanded += expanded;
  }
  return bestFailure;
}

function pavementPolys(model) {
  const pad = model.pavementPadFt || 0;
  return D4.PAVEMENT.map((p) => { const xs = p.poly.map((q) => q[0]), ys = p.poly.map((q) => q[1]); const x1 = Math.min(...xs) - pad, x2 = Math.max(...xs) + pad, y1 = Math.min(...ys) - pad, y2 = Math.max(...ys) + pad; return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]]; });
}
function pavementAudit(model, poses, unit) {
  const zones = pavementPolys(model), g = model.garages.find((x) => x.unit === unit); let violations = 0;
  for (const p of W.normalizePoses(poses, .5)) { if (p.x >= 147.8) continue; for (const c of body(p)) if (!zones.some((z) => W.pointInPoly(c, z)) && !W.pointInPoly(c, rect(g))) violations++; }
  return { pass: violations === 0, violationSamples: violations, padFt: model.pavementPadFt };
}
function matePoly(model, stall) { const m = model.stalls.find((s) => s.unit === stall.unit && s.id !== stall.id); return m ? W.vehiclePoly(m.axleX, m.axleY, m.heading, D4.VEHICLE) : null; }
function pack(r, model, unit) { return { ok: r.ok, expanded: r.expanded, gearChanges: r.gearChanges ?? null, doorClearanceFt: r.proof?.doorClearanceFt ?? null, minClearanceFt: r.proof?.minClearanceFt ?? null, streetY: r.streetY ?? null, pavement: r.ok ? pavementAudit(model, r.poses, unit) : null, issues: r.proof?.issues ?? [] }; }

function runBScenario(spec) {
  const model = buildModel(spec), stall = model.stalls.find((s) => s.id === 'B-SOUTH'), mate = matePoly(model, stall);
  const inbound = pack(plan(model, stall, mate, 'inbound'), model, 'B');
  const outbound = pack(plan(model, stall, mate, 'outbound'), model, 'B');
  const doors = [inbound.doorClearanceFt, outbound.doorClearanceFt].filter((v) => v != null);
  const door = doors.length ? Math.min(...doors) : null;
  const hardPass = inbound.ok && outbound.ok, comfortableDoor = door != null && door >= .75;
  const pavementPass = Boolean(inbound.pavement?.pass && outbound.pavement?.pass);
  const gears = [inbound, outbound].filter((x) => x.ok && x.gearChanges != null).map((x) => x.gearChanges);
  const maxGearChanges = gears.length ? Math.max(...gears) : null;
  const score = (hardPass ? 1000 : 0) + (comfortableDoor ? 200 : 0) + (pavementPass ? 100 : 0) + (door ?? 0) * 10 - (maxGearChanges ?? 0) * 10;
  return { id: spec.id, label: spec.label, tool: spec.tool, status: hardPass ? (comfortableDoor ? 'PASS_COMFORT' : 'PASS_TIGHT') : 'FAIL', hardPass, outboundOpen: !outbound.ok, comfortableDoor, pavementPass, bSouthWorstDoorClearanceFt: door == null ? null : +door.toFixed(3), maxGearChanges, score: +score.toFixed(2), changes: { garageBShiftX: spec.garageBShiftX || 0, homeBShiftX: spec.homeBShiftX || 0, pavementPadFt: spec.pavementPadFt || 0, doorClearanceTarget: spec.doorClearanceTarget || 0, streetYs: spec.streetYs || [37] }, rows: { 'B-SOUTH': { inbound, outbound } }, note: spec.note || '' };
}

function baselineOtherStalls() {
  const model = buildModel({ streetYs: [37] }), rows = {};
  for (const id of ['B-NORTH', 'A-NORTH', 'A-SOUTH']) {
    const stall = model.stalls.find((s) => s.id === id), mate = matePoly(model, stall);
    rows[id] = { outbound: pack(plan(model, stall, mate, 'outbound'), model, stall.unit) };
  }
  return rows;
}

const scenarios = [
  { id: 'baseline', label: 'Current Design 4', tool: 'control', streetYs: [37], note: 'Locked current geometry; explicit outbound search added.' },
  { id: 'pavement-plus-4', label: 'Add 4 ft local pavement / apron', tool: 'local-pavement-flare', pavementPadFt: 4, streetYs: [37], note: 'Geometry unchanged; tests whether pavement containment alone is the blocker.' },
  { id: 'pavement-plus-6', label: 'Add 6 ft local pavement / apron', tool: 'local-pavement-flare', pavementPadFt: 6, streetYs: [37], note: 'Larger pavement-only sensitivity case.' },
  { id: 'route-reshape', label: 'Reshape street approach', tool: 'reshape-drive', streetYs: [35, 39], note: 'Same structures; forces alternate Pennsylvania approach lines.' },
  { id: 'route-door-comfort', label: 'Reshape route for 0.75 ft door margin', tool: 'reshape-drive', streetYs: [35, 37, 39], doorClearanceTarget: .75, note: 'Rejects paths below the practical B-South door target.' },
  { id: 'home-b-east-2', label: 'Move Home B east 2 ft', tool: 'translate-building', homeBShiftX: 2, streetYs: [35, 37, 39], note: 'Bounded residential mass translation to buy maneuver room.' },
  { id: 'garage-b-east-2', label: 'Move Garage B east 2 ft', tool: 'translate-garage', garageBShiftX: 2, streetYs: [35, 37, 39], note: 'Keeps the 22x22 garage plate and stall layout while shifting the accessory structure.' },
  { id: 'combined-east-1', label: 'Move Home B + Garage B east 1 ft', tool: 'combined-active-repair', homeBShiftX: 1, garageBShiftX: 1, streetYs: [35, 37, 39], note: 'Smaller coordinated site move.' },
  { id: 'combined-comfort', label: 'Coordinated 1 ft move + comfort-routed approach', tool: 'combined-active-repair', homeBShiftX: 1, garageBShiftX: 1, streetYs: [35, 37, 39], doorClearanceTarget: .75, note: 'Combines bounded site translation with a route search that must meet the practical door margin.' }
];

function main() {
  const started = new Date().toISOString(), results = [];
  for (const scenario of scenarios) {
    console.log(`\n[${scenario.id}] ${scenario.label}`);
    const result = runBScenario(scenario); results.push(result);
    console.log(`status=${result.status} B-S door=${result.bSouthWorstDoorClearanceFt ?? '-'} outbound=${result.outboundOpen ? 'OPEN' : 'PASS'} pavement=${result.pavementPass ? 'PASS' : 'OPEN'}`);
  }
  results.sort((a, b) => b.score - a.score);
  const leader = results[0], promoted = results.find((r) => r.hardPass && r.comfortableDoor && r.pavementPass) || null;
  const output = {
    schema: 'pondy-d4-multitool-repair-v1', generatedAt: started, sourceRevision: D4.REV,
    search: { algorithm: 'lattice A*', stepFt: STEP, maxExpandedPerGoal: MAX_EXPANDED, outboundProof: 'Independent stall-to-Pennsylvania search. Reverse replay is not promoted as outbound proof.' },
    vehicle: D4.VEHICLE,
    policy: { selection: 'Hard geometry first; compare pavement, route, building and garage interventions without pre-selecting a winner.', locked: ['two 22x22 detached garages', 'four enclosed stalls', 'Pennsylvania-only access', 'FS-SUV vehicle gate'], rotation: { status: 'EXPERIMENTAL_NEXT', note: 'Rotation remains available in LotScope oriented-polygon infrastructure but is not eligible to win this D4 run until the legacy wall/door planner is rotation-aware.' } },
    baselineOtherStalls: baselineOtherStalls(), strategies: results,
    evidenceLeader: { id: leader.id, label: leader.label, status: leader.status, reason: 'Best measured progress in this run; not a promoted fix while outbound remains open.' },
    promotion: promoted ? { status: 'CANDIDATE', id: promoted.id, label: promoted.label } : { status: 'NONE', reason: 'No tested strategy simultaneously proves outbound circulation, practical B-South door margin, and pavement containment.' }
  };
  const dir = path.join(process.cwd(), 'docs');
  fs.writeFileSync(path.join(dir, 'lot2-design-4-repair-comparison.json'), JSON.stringify(output, null, 2));
  const lines = ['# Design 4 multi-tool repair comparison', '', `Generated: ${started}`, '', `Evidence leader: **${leader.label}** (${leader.status})`, '', output.promotion.status === 'NONE' ? `Promotion: **NONE** - ${output.promotion.reason}` : `Promotion candidate: **${output.promotion.label}**`, '', '| Strategy | Tool | Status | B-South worst door | Outbound | Pavement |', '|---|---|---:|---:|---:|---:|', ...results.map((r) => `| ${r.label} | ${r.tool} | ${r.status} | ${r.bSouthWorstDoorClearanceFt == null ? '-' : r.bSouthWorstDoorClearanceFt + ' ft'} | ${r.outboundOpen ? 'OPEN' : 'PASS'} | ${r.pavementPass ? 'PASS' : 'OPEN'} |`), '', 'Rotation remains an experimental next comparison and is not treated as proven by this run.'];
  fs.writeFileSync(path.join(dir, 'lot2-design-4-repair-comparison.md'), lines.join('\n'));
  console.log(`\nWrote ${path.join(dir, 'lot2-design-4-repair-comparison.json')}`);
}
main();
