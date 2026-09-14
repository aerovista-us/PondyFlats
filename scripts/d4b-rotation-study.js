#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const W = require('../js/lot2-workbench-audit.js');
const D4 = require('../js/lot2-design-4.js');

const DEG = Math.PI / 180;
const ANGLES = [20, 25, 30, 35, 40];
const BASE_B = D4.GARAGES.find(g => g.unit === 'B');
const BASE_A = D4.GARAGES.find(g => g.unit === 'A');
const BASE_B_CENTER = [BASE_B.x + BASE_B.w / 2, BASE_B.y + BASE_B.d / 2];
const HOME_POLYS = D4.HOMES.map(h => ({ id: h.id, poly: h.poly || W.rectPoly(h) }));

const round = (n, p = 3) => Number(n.toFixed(p));
const rotateVector = ([x, y], angle) => {
  const c = Math.cos(angle), s = Math.sin(angle);
  return [x * c - y * s, x * s + y * c];
};
const orientedRect = (cx, cy, w, d, angle) => {
  const local = [[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]];
  return local.map(p => { const q = rotateVector(p, angle); return [cx + q[0], cy + q[1]]; });
};
const localToWorld = (p, center, angle) => {
  const q = rotateVector(p, angle);
  return [center[0] + q[0], center[1] + q[1]];
};
const garageModel = ({ id, unit, cx, cy, angleDeg }) => {
  const angle = angleDeg * DEG;
  const poly = orientedRect(cx, cy, 22, 22, angle);
  const door = [localToWorld([11, -10], [cx, cy], angle), localToWorld([11, 10], [cx, cy], angle)];
  const stalls = [-5.5, 5.5].map((localY, index) => {
    const axle = localToWorld([6.25, localY], [cx, cy], angle);
    return {
      id: `${unit}-${index === 0 ? 'NORTH' : 'SOUTH'}`,
      unit,
      axleX: axle[0], axleY: axle[1], heading: Math.PI + angle,
      poly: W.vehiclePoly(axle[0], axle[1], Math.PI + angle, D4.VEHICLE)
    };
  });
  return { id, unit, cx, cy, angleDeg, angle, poly, door, stalls };
};
const axisGarage = ({ id, unit, x, y }) => garageModel({ id, unit, cx: x + 11, cy: y + 11, angleDeg: 0 });
const allInside = (poly, container) => poly.every(p => W.pointInPoly(p, container));
const orientedStallAudit = g => {
  const inside = g.stalls.every(s => allInside(s.poly, g.poly));
  const pair = W.polygonDistance(g.stalls[0].poly, g.stalls[1].poly);
  const overlap = W.polygonsIntersect(g.stalls[0].poly, g.stalls[1].poly);
  return { ok: inside && !overlap && pair >= 1, pairClearanceFt: round(pair), inside, overlap };
};
const minHomeGap = poly => Math.min(...HOME_POLYS.map(h => W.polygonDistance(poly, h.poly)));
const insideSurvey = poly => allInside(poly, D4.SURVEY);
const boundaryClearance = poly => insideSurvey(poly) ? W.boundaryDistance(poly, D4.SURVEY) : -1;

function evaluate(b, a) {
  const bStalls = orientedStallAudit(b), aStalls = orientedStallAudit(a);
  const bInside = insideSurvey(b.poly), aInside = insideSurvey(a.poly);
  const bBoundary = boundaryClearance(b.poly), aBoundary = boundaryClearance(a.poly);
  const interGarage = W.polygonsIntersect(b.poly, a.poly) ? 0 : W.polygonDistance(b.poly, a.poly);
  const bHome = minHomeGap(b.poly), aHome = minHomeGap(a.poly);
  const noOverlap = !W.polygonsIntersect(b.poly, a.poly);
  const hard = {
    survey: bInside && aInside,
    stalls: bStalls.ok && aStalls.ok,
    garageOverlap: noOverlap,
    accessoryFiveFt: bBoundary >= 5 && aBoundary >= 5,
    homeSeparationSixFt: bHome >= 6 && aHome >= 6,
    interGarageTwoFt: interGarage >= 2
  };
  const hardPass = Object.values(hard).every(Boolean);
  const deficits = {
    boundaryFt: Math.max(0, 5 - bBoundary) + Math.max(0, 5 - aBoundary),
    homeFt: Math.max(0, 6 - bHome) + Math.max(0, 6 - aHome),
    interGarageFt: Math.max(0, 2 - interGarage)
  };
  // Hard geometry dominates. Then favor the 35° 4B visual direction and the smallest moves.
  const score = (hardPass ? 100000 : 0)
    + Number(hard.survey) * 10000 + Number(hard.stalls) * 5000 + Number(hard.garageOverlap) * 3000
    - deficits.boundaryFt * 1000 - deficits.homeFt * 700 - deficits.interGarageFt * 500
    - Math.abs(b.angleDeg - 35) * 6
    - Math.hypot(b.cx - BASE_B_CENTER[0], b.cy - BASE_B_CENTER[1]) * 2
    - Math.hypot(a.cx - (BASE_A.x + 11), a.cy - (BASE_A.y + 11));
  return {
    hardPass, hard, score: round(score, 2),
    metrics: {
      bBoundaryFt: round(bBoundary), aBoundaryFt: round(aBoundary),
      bHomeGapFt: round(bHome), aHomeGapFt: round(aHome),
      interGarageFt: round(interGarage),
      bPairClearanceFt: bStalls.pairClearanceFt, aPairClearanceFt: aStalls.pairClearanceFt
    },
    deficits
  };
}

const results = [];
for (const angleDeg of ANGLES) {
  // Positive SVG-coordinate rotation is visually clockwise, matching the 4B study.
  for (let bdx = 4; bdx <= 24; bdx += 1) {
    for (let bdy = 2; bdy <= 12; bdy += 1) {
      const b = garageModel({ id: 'GARAGE-NORTH-B', unit: 'B', cx: BASE_B_CENTER[0] + bdx, cy: BASE_B_CENTER[1] + bdy, angleDeg });
      if (!insideSurvey(b.poly) || !orientedStallAudit(b).ok) continue;
      for (let adx = 0; adx <= 34; adx += 1) {
        for (let ady = -10; ady <= 4; ady += 1) {
          const a = axisGarage({ id: 'GARAGE-SOUTH-A', unit: 'A', x: BASE_A.x + adx, y: BASE_A.y + ady });
          if (!insideSurvey(a.poly) || !orientedStallAudit(a).ok) continue;
          const evaluation = evaluate(b, a);
          results.push({
            angleDeg,
            garageB: { center: [round(b.cx), round(b.cy)], shift: [round(b.cx - BASE_B_CENTER[0]), round(b.cy - BASE_B_CENTER[1])], poly: b.poly.map(p => p.map(v => round(v))), door: b.door.map(p => p.map(v => round(v))), stalls: b.stalls.map(s => ({ id:s.id, axle:[round(s.axleX),round(s.axleY)], headingDeg:round(s.heading / DEG, 2) })) },
            garageA: { x: round(a.cx - 11), y: round(a.cy - 11), shift: [round(a.cx - 11 - BASE_A.x), round(a.cy - 11 - BASE_A.y)], poly: a.poly.map(p => p.map(v => round(v))) },
            ...evaluation
          });
        }
      }
    }
  }
}
results.sort((a,b) => b.score - a.score);
const hardPasses = results.filter(r => r.hardPass);
const bestByAngle = ANGLES.map(angle => results.find(r => r.angleDeg === angle)).filter(Boolean);
const out = {
  schema: 'pondy-d4b-rotation-study-v1',
  generatedAt: new Date().toISOString(),
  sourceRevision: D4.REV || 'D4-REAR22-v0.3',
  concept: {
    label: 'Design 4B',
    topology: 'Design 4 baseline with rotated Garage B',
    rotationConvention: 'positive angle is visually clockwise in the current SVG/world coordinate system',
    targetFamilyDeg: '30–35 clockwise',
    workingAngleDeg: 35,
    locked: ['two 22x22 detached garages','four enclosed stalls','Pennsylvania-only access','20.5x8 FS-SUV','25 ft minimum rear-axle radius']
  },
  search: {
    garageBAnglesDeg: ANGLES,
    garageBShiftXFt: [4,24,1], garageBShiftYFt: [2,12,1],
    garageAShiftXFt: [0,34,1], garageAShiftYFt: [-10,4,1],
    planningTargets: { accessoryBoundaryFt:5, garageHomeFt:6, interGarageFt:2 }
  },
  evaluated: results.length,
  hardPassCount: hardPasses.length,
  best: results[0] || null,
  bestHardPass: hardPasses[0] || null,
  bestByAngle,
  top: results.slice(0,20),
  authorityBoundary: 'Static design-development geometry screen only. Vehicle approach/outbound, pavement, zoning/AHJ, fire/eave/drainage, civil and permit review remain separate gates.'
};

const outDir = path.join(process.cwd(), 'qa-artifacts', 'design4b');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'rotation-study.json'), JSON.stringify(out, null, 2) + '\n');
const md = [
  '# Design 4B rotation study', '',
  `Evaluated: **${out.evaluated}** static configurations`,
  `Hard-pass configurations: **${out.hardPassCount}**`,
  `Working family: **30–35° clockwise Garage B**`, '',
  out.best ? `Best current static candidate: **${out.best.angleDeg}°**, Garage B shift **${out.best.garageB.shift.join(', ')} ft**, Garage A shift **${out.best.garageA.shift.join(', ')} ft**.` : 'No candidate emitted.',
  out.bestHardPass ? `Best full static hard pass: **${out.bestHardPass.angleDeg}°**.` : 'No configuration yet clears every static planning target simultaneously.', '',
  'This is a design-development screen, not zoning/code/civil/permit approval.'
].join('\n');
fs.writeFileSync(path.join(outDir, 'rotation-study.md'), md + '\n');
console.log(JSON.stringify({ evaluated: out.evaluated, hardPassCount: out.hardPassCount, best: out.best && { angleDeg: out.best.angleDeg, garageB: out.best.garageB, garageA: out.best.garageA, hard: out.best.hard, metrics: out.best.metrics }, bestHardPass: out.bestHardPass && { angleDeg: out.bestHardPass.angleDeg, garageB: out.bestHardPass.garageB, garageA: out.bestHardPass.garageA, metrics: out.bestHardPass.metrics } }, null, 2));
