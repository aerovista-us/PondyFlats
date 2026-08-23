/**
 * R5.1e-v1.1 demising scan (Node).
 * Does not mutate v1.0 lock. Tests party-wall west shifts against the restored
 * living gate while parking / sweep / exterior east+west plate edges stay put.
 *
 * Usage: node scripts/r51e-v11-demising-scan.js
 */
const path = require('path');
const root = path.join(__dirname, '..');
function load(name) { return require(path.join(root, 'js', name)); }

global.Lot2SOT = load('lot2-sot.js');
global.Lot2 = load('lot2-geometry.js');
global.Lot2Access = load('lot2-access.js');
global.Lot2AccessSkeleton = load('lot2-access-skeleton.js');
global.Lot2ParkingReset = load('lot2-parking-reset.js');
global.Lot2R5Freeze = load('lot2-r5-freeze.js');
global.Lot2R51eLock = load('lot2-r51e-lock.js');
global.Lot2R51ePlans = load('lot2-r51e-plans.js');

const Acc = global.Lot2Access;
const Plans = global.Lot2R51ePlans;
const GATE = { min: 1600, max: 1900, maxDelta: 120 };
const V10 = 70;
const B_PARKING_EAST = 66;
const MIN_STAIR = 3.5;
const MIN_CORRIDOR = 4;
const MIN_ROOM = 8;
const MIN_BATH = 5;
const CONDITIONED = new Set(['living', 'stair', 'corridor', 'mech', 'storage', 'bath', 'kitchen', 'entry']);
const SWEEP_OVERLAP_TOL = 0.05;

function overlapArea(a, b) {
  const x0 = Math.max(a.x, b.x);
  const y0 = Math.max(a.y, b.y);
  const x1 = Math.min(a.x + a.w, b.x + b.w);
  const y1 = Math.min(a.y + a.h, b.y + b.h);
  return Math.max(0, x1 - x0) * Math.max(0, y1 - y0);
}

function roomOk(r) {
  if (r.kind === 'stair') return Math.min(r.w, r.h) >= MIN_STAIR - 0.05;
  if (r.kind === 'mech' || r.kind === 'storage' || r.kind === 'corridor' || r.kind === 'entry') {
    return Math.min(r.w, r.h) >= MIN_CORRIDOR - 0.05;
  }
  if (r.kind === 'bath') return Math.min(r.w, r.h) >= MIN_BATH - 0.05;
  if (r.kind === 'garage' || r.kind === 'covered' || r.kind === 'void') return true;
  return Math.min(r.w, r.h) >= MIN_ROOM - 0.05;
}

function livingSf(rooms) {
  return rooms.filter((r) => CONDITIONED.has(r.kind)).reduce((s, r) => s + Math.round(r.w * r.h), 0);
}

function insidePlate(r, plate) {
  return r.x >= plate.x - 0.05 && r.y >= plate.y - 0.05
    && r.x + r.w <= plate.x + plate.w + 0.05
    && r.y + r.h <= plate.y + plate.h + 0.05;
}

function shiftRooms(D) {
  const dx = +(V10 - D).toFixed(4);
  const a0 = Plans.planUnitA();
  const b0 = Plans.planUnitB();
  const mapA = (r) => {
    const n = { ...r };
    if (Math.abs(r.x - V10) <= 0.05) {
      n.x = D;
      n.w = +(r.w + dx).toFixed(4);
    }
    n.sf = Math.round(n.w * n.h);
    n.minDim = +Math.min(n.w, n.h).toFixed(2);
    return n;
  };
  const mapB = (r) => {
    const n = { ...r };
    const east = +(r.x + r.w).toFixed(4);
    if (Math.abs(east - V10) <= 0.05) {
      n.w = +(r.w - dx).toFixed(4);
    }
    n.sf = Math.round(n.w * n.h);
    n.minDim = +Math.min(n.w, n.h).toFixed(2);
    return n;
  };
  const A = {
    plate: { id: 'A', x: D, y: 5, w: +(56 + dx).toFixed(4), h: 22.5 },
    ground: a0.ground.map(mapA),
    upper: a0.upper.map(mapA),
  };
  const B = {
    plate: { id: 'B', x: 28, y: 5, w: +(42 - dx).toFixed(4), h: 28 },
    ground: b0.ground.map(mapB),
    upper: b0.upper.map(mapB),
  };
  A.rooms = [...A.ground, ...A.upper];
  B.rooms = [...B.ground, ...B.upper];
  return { D, dx, A, B };
}

function evaluate(D) {
  const s = shiftRooms(D);
  const sfA = livingSf(s.A.rooms);
  const sfB = livingSf(s.B.rooms);
  const delta = Math.abs(sfA - sfB);
  const livingOk = sfA >= GATE.min && sfA <= GATE.max && sfB >= GATE.min && sfB <= GATE.max && delta <= GATE.maxDelta;
  const plateFit = [];
  [s.A, s.B].forEach((u) => {
    u.rooms.forEach((r) => {
      if (r.kind === 'garage' || r.kind === 'covered') return;
      if (!insidePlate(r, u.plate)) plateFit.push(`${u.plate.id}:${r.name}`);
    });
  });
  const narrow = [...s.A.rooms, ...s.B.rooms].filter((r) => !roomOk(r)).map((r) => `${r.name} ${r.minDim}′`);
  const parkingCut = D < B_PARKING_EAST - 0.05;
  const poses = Plans.sweepPoses();
  const sweepHits = [];
  s.A.ground.forEach((r) => {
    if (r.kind === 'garage' || r.kind === 'covered' || r.kind === 'void') return;
    if (Plans.hitsSweep(r, poses)) sweepHits.push(r.name);
  });
  const undercroftOk = s.A.ground.some((r) => r.name.includes('OPEN UNDERCROFT') && r.kind === 'void');
  const parking = Acc.analyzeConcept('reset_r5');
  const fails = [];
  if (!livingOk) fails.push(`living A ${sfA} / B ${sfB} Δ${delta}`);
  if (plateFit.length) fails.push(`plateFit ${plateFit.join(',')}`);
  if (narrow.length) fails.push(`minRoom ${narrow.join(',')}`);
  if (parkingCut) fails.push(`demising cuts B garage east (${B_PARKING_EAST})`);
  if (sweepHits.length) fails.push(`sweep ${sweepHits.join(',')}`);
  if (!undercroftOk) fails.push('missing undercroft');
  if (s.A.plate.w < 18 || s.B.plate.w < 18) fails.push('plate width <18');
  return {
    D,
    dx: s.dx,
    sfA,
    sfB,
    delta,
    livingOk,
    plateFitOk: plateFit.length === 0,
    minRoomOk: narrow.length === 0,
    sweepOk: sweepHits.length === 0 && undercroftOk,
    parkingCut,
    parkingGate: parking && parking.verdict,
    exteriorEast: 126,
    exteriorWest: 28,
    roomsA: { stairW: s.A.ground.find((r) => r.name === 'STAIR A').w, hallW: s.A.upper.find((r) => r.name === 'STAIR / HALL A').w },
    roomsB: {
      stairW: s.B.ground.find((r) => r.name === 'STAIR + ENTRY B').w,
      bedsW: s.B.upper.find((r) => r.name === 'BEDS + BATH B').w,
    },
    fails,
    pass: fails.length === 0,
  };
}

const ordered = [69, 68];
const extras = [];
for (let d = 67.5; d >= 66; d -= 0.5) extras.push(+d.toFixed(2));

const tests = [...ordered, ...extras].map(evaluate);
const named = tests.filter((t) => ordered.includes(t.D));
const winner = named.find((t) => t.pass) || tests.find((t) => t.pass) || null;

const report = {
  gate: GATE,
  v10: { D: 70, sfA: Plans.planUnitA().livingSf, sfB: Plans.planUnitB().livingSf },
  ordered: named,
  extrasIfNeeded: extras.map((d) => tests.find((t) => t.D === d)),
  promote: winner
    ? { D: winner.D, reason: ordered.includes(winner.D) ? 'smallest of x=69 / x=68 that passes' : 'neither 69 nor 68 passed; smallest extra D that passes' }
    : { D: null, reason: 'no tested D passed; stop and compute theoretically' },
};
console.log(JSON.stringify(report, null, 2));
