/**
 * R5.1e architectural-massing gate runner (Node).
 * Prints verdict + failing checks. Writes frozen SVG on PASS.
 */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function load(name) {
  const abs = path.join(root, 'js', name);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(abs);
}

global.Lot2SOT = load('lot2-sot.js');
global.Lot2 = load('lot2-geometry.js');
global.Lot2Access = load('lot2-access.js');
global.Lot2AccessSkeleton = load('lot2-access-skeleton.js');
global.Lot2R5Freeze = load('lot2-r5-freeze.js');
global.Lot2R51eLock = load('lot2-r51e-lock.js');
global.Lot2R51ePlans = load('lot2-r51e-plans.js');
global.Lot2R51eMassingTruth = load('lot2-r51e-massing-truth.js');
global.Lot2R51eSheet = load('lot2-r51e-sheet.js');
global.Lot2R51eArchitecturalMassing = load('lot2-r51e-architectural-massing.js');

const gate = global.Lot2R51eArchitecturalMassing.analyze();
const fails = Object.entries(gate.checks).filter(([, v]) => !v.ok);
console.log(JSON.stringify({
  verdict: gate.verdict,
  next: gate.next,
  freezeNote: gate.freezeNote,
  fails: fails.map(([k, v]) => ({ check: k, detail: v.detail })),
  roofs: gate.roofs,
  living: gate.living,
}, null, 2));

if (gate.verdict === 'PASS') {
  const svg = global.Lot2R51eArchitecturalMassing.render({
    showArchitecture: true,
    showMassingUnderlay: false,
    showFootprints: true,
    showUnderlay: true,
  }).svg;
  const out = path.join(root, 'imgs', 'r51e-architectural-massing.svg');
  fs.writeFileSync(out, svg);
  console.log('wrote', out);
}

process.exit(gate.verdict === 'PASS' ? 0 : 1);
