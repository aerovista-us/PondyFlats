/**
 * R5.1e deliverable gates (Node): all v1.0 drawing layers + consistency.
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function load(name) {
  return require(path.join(root, 'js', name));
}

global.Lot2SOT = load('lot2-sot.js');
global.Lot2 = load('lot2-geometry.js');
global.Lot2Access = load('lot2-access.js');
global.Lot2AccessSkeleton = load('lot2-access-skeleton.js');
global.Lot2ParkingReset = load('lot2-parking-reset.js');
global.Lot2R5Freeze = load('lot2-r5-freeze.js');
global.Lot2R51eLock = load('lot2-r51e-lock.js');
global.Lot2R51ePlans = load('lot2-r51e-plans.js');
global.Lot2R51eMassingTruth = load('lot2-r51e-massing-truth.js');
global.Lot2R51eSheet = load('lot2-r51e-sheet.js');
global.Lot2R51eArchitecturalMassing = load('lot2-r51e-architectural-massing.js');
global.Lot2R51eAxonLock = load('lot2-r51e-axon-lock.js');
global.Lot2R51ePlanClosure = load('lot2-r51e-plan-closure.js');
global.Lot2R51eSitePlan = load('lot2-r51e-site-plan.js');
global.Lot2R51ePennElev = load('lot2-r51e-penn-elev.js');
global.Lot2R51eElevations = load('lot2-r51e-elevations.js');
global.Lot2R51eSections = load('lot2-r51e-sections.js');
global.Lot2R51eConsistency = load('lot2-r51e-consistency.js');

const frozenPath = path.join(root, 'imgs', 'r51e-architectural-massing.svg');
const frozenFile = fs.readFileSync(frozenPath, 'utf8');

const axon = global.Lot2R51eAxonLock.analyze(frozenFile);
const plans = global.Lot2R51ePlanClosure.analyze();
const site = global.Lot2R51eSitePlan.analyze();
const penn = global.Lot2R51ePennElev.analyze();
const rear = global.Lot2R51eElevations.analyzeRear();
const sides = global.Lot2R51eElevations.analyzeSides();
const sections = global.Lot2R51eSections.analyze();
const pack = global.Lot2R51eConsistency.analyze();

function summarize(name, gate) {
  const checks = gate.checks || {};
  const fails = Object.entries(checks).filter(([, v]) => v && v.ok === false)
    .map(([k, v]) => ({ check: k, detail: v.detail }));
  return { name, verdict: gate.verdict, next: gate.next, fails, living: gate.living, designComplete: gate.designComplete };
}

const report = {
  axon: summarize('axon-lock', axon),
  plans: summarize('plan-closure', plans),
  site: summarize('site-plan', site),
  penn: summarize('penn-elev', penn),
  rear: summarize('rear-elev', rear),
  sides: summarize('side-elevs', sides),
  sections: summarize('sections', sections),
  pack: summarize('consistency', pack),
};
console.log(JSON.stringify(report, null, 2));

const imgs = path.join(root, 'imgs');
if (axon.verdict === 'PASS') {
  fs.writeFileSync(path.join(imgs, 'r51e-axon-lock-audit.svg'), axon.auditSvg);
  fs.writeFileSync(path.join(imgs, 'r51e-axon-lock-clean.svg'), axon.cleanSvg);
}
if (plans.verdict === 'PASS') {
  fs.writeFileSync(path.join(imgs, 'r51e-plan-ground.svg'), global.Lot2R51ePlanClosure.renderFloor('ground'));
  fs.writeFileSync(path.join(imgs, 'r51e-plan-upper.svg'), global.Lot2R51ePlanClosure.renderFloor('upper'));
}
if (site.verdict === 'PASS') {
  fs.writeFileSync(path.join(imgs, 'r51e-site-plan.svg'), global.Lot2R51eSitePlan.render(site));
}
if (penn.verdict === 'PASS') {
  fs.writeFileSync(path.join(imgs, 'r51e-penn-elev.svg'), global.Lot2R51ePennElev.render(penn));
}
if (rear.verdict === 'PASS') {
  fs.writeFileSync(path.join(imgs, 'r51e-rear-elev.svg'), global.Lot2R51eElevations.renderRear(rear));
}
if (sides.verdict === 'PASS') {
  fs.writeFileSync(path.join(imgs, 'r51e-north-elev.svg'), global.Lot2R51eElevations.renderNorth(sides.north));
  fs.writeFileSync(path.join(imgs, 'r51e-south-elev.svg'), global.Lot2R51eElevations.renderSouth(sides.south));
}
if (sections.verdict === 'PASS') {
  fs.writeFileSync(path.join(imgs, 'r51e-section-aa.svg'), global.Lot2R51eSections.renderAA(sections));
  fs.writeFileSync(path.join(imgs, 'r51e-section-bb.svg'), global.Lot2R51eSections.renderBB(sections));
}

const ok = [axon, plans, site, penn, rear, sides, sections, pack].every((g) => g.verdict === 'PASS');
console.log(ok ? 'DESIGN COMPLETE / Deliverable v1.0' : 'DELIVERABLE INCOMPLETE');
process.exit(ok ? 0 : 1);
