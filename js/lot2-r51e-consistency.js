/**
 * Lot 2 — R5.1e Deliverable v1.1 cross-document consistency
 *
 * Compares site, plans, four elevations, sections, and frozen massing.
 * PASS here is DESIGN COMPLETE / PROGRAM GATE PASS.
 * v1.0 is COMPLETE BASELINE / PROGRAM GATE NOT CLEARED (Lot2R51eV10Baseline).
 */
const Lot2R51eConsistency = (() => {
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const Closure = typeof Lot2R51ePlanClosure !== 'undefined' ? Lot2R51ePlanClosure : null;
  const Site = typeof Lot2R51eSitePlan !== 'undefined' ? Lot2R51eSitePlan : null;
  const Penn = typeof Lot2R51ePennElev !== 'undefined' ? Lot2R51ePennElev : null;
  const Elev = typeof Lot2R51eElevations !== 'undefined' ? Lot2R51eElevations : null;
  const Sec = typeof Lot2R51eSections !== 'undefined' ? Lot2R51eSections : null;
  const M = typeof Lot2R51eMassingTruth !== 'undefined' ? Lot2R51eMassingTruth : null;
  const Arch = typeof Lot2R51eArchitecturalMassing !== 'undefined' ? Lot2R51eArchitecturalMassing : null;
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const EPS = 0.05;

  function sameRect(a, b) {
    return a && b
      && Math.abs(a.x - b.x) <= EPS && Math.abs(a.y - b.y) <= EPS
      && Math.abs(a.w - b.w) <= EPS && Math.abs(a.h - b.h) <= EPS;
  }

  function analyze() {
    const freezeC = L.CONCEPTS && L.CONCEPTS.reset_r5;
    const freeze = ParkFreeze && freezeC ? ParkFreeze.assertFrozen(freezeC) : { ok: false };
    const plans = Closure && Closure.analyze ? Closure.analyze() : { verdict: 'FAIL', living: {}, openings: [], windows: [] };
    const site = Site && Site.analyze ? Site.analyze() : { verdict: 'FAIL', dims: {}, site: { plates: {} } };
    const penn = Penn && Penn.analyze ? Penn.analyze() : { verdict: 'FAIL', heights: {} };
    const rear = Elev && Elev.analyzeRear ? Elev.analyzeRear() : { verdict: 'FAIL', heights: {}, plates: {} };
    const sides = Elev && Elev.analyzeSides ? Elev.analyzeSides() : { verdict: 'FAIL', north: {}, south: {} };
    const sections = Sec && Sec.analyze ? Sec.analyze() : { verdict: 'FAIL', heights: {}, cuts: {} };
    const mass = M && M.analyze ? M.analyze() : { verdict: 'FAIL' };
    const arch = Arch && Arch.analyze ? Arch.analyze() : { verdict: 'FAIL' };
    const lock = ArchLock ? ArchLock.LOCK : {
      plates: [
        { id: 'B', x: 28, y: 5, w: 40, h: 28 },
        { id: 'A', x: 68, y: 5, w: 58, h: 22.5 },
      ],
      demisingX: 68,
      livingSf: { A: 1639, B: 1720 },
    };
    const D = lock.demisingX;

    const plateA = lock.plates.find((p) => p.id === 'A') || { x: 68, y: 5, w: 58, h: 22.5 };
    const plateB = lock.plates.find((p) => p.id === 'B') || { x: 28, y: 5, w: 40, h: 28 };
    const siteA = site.site && site.site.plates && site.site.plates.A;
    const siteB = site.site && site.site.plates && site.site.plates.B;
    const rearA = rear.plates && rear.plates.A;
    const rearB = rear.plates && rear.plates.B;

    const layers = {
      freeze: freeze.ok,
      massing: mass.verdict === 'PASS',
      architecture: arch.verdict === 'PASS',
      plans: plans.verdict === 'PASS',
      site: site.verdict === 'PASS',
      penn: penn.verdict === 'PASS',
      rear: rear.verdict === 'PASS',
      north: sides.north && sides.north.verdict === 'PASS',
      south: sides.south && sides.south.verdict === 'PASS',
      sections: sections.verdict === 'PASS',
    };

    const ridges = [
      penn.heights && penn.heights.ridgeA,
      rear.heights && rear.heights.ridgeA,
      sides.north && sides.north.heights && sides.north.heights.ridgeA,
      sections.heights && sections.heights.ridgeA,
    ];
    const ridgeB = [
      penn.heights && penn.heights.ridgeB,
      rear.heights && rear.heights.ridgeB,
      sides.south && sides.south.heights && sides.south.heights.ridgeB,
      sections.heights && sections.heights.ridgeB,
    ];
    const ridgeOk = ridges.every((n) => Math.abs(n - 27) < EPS) && ridgeB.every((n) => Math.abs(n - 26.5) < EPS);

    const sfOk = plans.living && ArchLock
      ? ArchLock.assertSf(plans.living.A, plans.living.B).ok
      : plans.living && plans.living.A === 1639 && plans.living.B === 1720;
    const platesOk = sameRect(siteA, plateA) && sameRect(siteB, plateB)
      && sameRect(rearA, plateA) && sameRect(rearB, plateB);
    const gars = ParkFreeze ? ParkFreeze.FREEZE.garages : [];
    const siteStalls = site.site && site.site.stalls;
    const stallsOk = siteStalls && gars.every((g) => {
      const q = siteStalls.find((s) => s.id === g.id);
      return q && sameRect(q, g);
    });
    const postsOk = site.site && site.site.posts && site.site.posts.length === 8;
    const demising = (plans.openings || []).concat(plans.windows || []).every((o) => {
      if (o.wall === 'E' && Math.abs(o.x - D) < 0.2) return false;
      if (o.wall === 'W' && Math.abs(o.x - D) < 0.2) return false;
      return true;
    });
    const pennDoor = (plans.openings || []).filter((o) => o.kind === 'garage' && o.wall === 'E' && o.w === 16).length === 2;
    const entries = ['entry-a', 'entry-b'].every((id) => (plans.openings || []).some((o) => o.id === id));
    const westGlass = (plans.windows || []).filter((w) => w.wall === 'W').length === 0;
    const floors = penn.heights && Math.abs(penn.heights.ground - 10.5) < EPS
      && Math.abs(penn.heights.zTop - 20.5) < EPS
      && sections.heights && Math.abs(sections.heights.ground - 10.5) < EPS;

    const checks = {
      allLayersPass: {
        ok: Object.values(layers).every(Boolean),
        detail: Object.entries(layers).filter(([, v]) => !v).map(([k]) => k).join(', ') || 'Massing · plans · site · 4 elevs · 2 sections all PASS',
      },
      footprints: {
        ok: platesOk,
        detail: platesOk
          ? `Plates A ${plateA.x},${plateA.y} ${plateA.w}×${plateA.h} · B ${plateB.x},${plateB.y} ${plateB.w}×${plateB.h} on site, rear, lock`
          : 'Plate mismatch across drawings',
      },
      garageGeometry: {
        ok: !!stallsOk,
        detail: stallsOk ? 'Four freeze stalls on site plan' : 'Stall drift vs freeze',
      },
      posts: {
        ok: !!postsOk,
        detail: postsOk ? '8 posts on site plan' : 'Post count drift',
      },
      doorsWindows: {
        ok: pennDoor && entries && westGlass && demising,
        detail: '16′ east doors · ENTRY A/B · no west glass invented · demising blank',
      },
      roofsRidges: {
        ok: ridgeOk,
        detail: ridgeOk ? 'Ridge A 27.0′ / B 26.5′ on Penn, rear, sides, sections' : 'Ridge mismatch across drawings',
      },
      floorLevels: {
        ok: !!floors,
        detail: floors ? 'Ground FTF 10.5′ · top of mass 20.5′ on elev + section' : 'Floor level mismatch',
      },
      sf: {
        ok: !!sfOk,
        detail: sfOk
          ? `Conditioned SF ${plans.living.A} / ${plans.living.B} · 1,600–1,900 / ≤120`
          : `SF drift ${plans.living && plans.living.A} / ${plans.living && plans.living.B}`,
      },
      pennAccess: {
        ok: site.checks && site.checks.pennOnlyAccess && site.checks.pennOnlyAccess.ok,
        detail: 'Pennsylvania remains the only access side',
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_deliverable_v1_1',
      verdict: hard ? 'PASS' : 'FAIL',
      designComplete: hard,
      checks,
      layers,
      living: plans.living,
      pending: [
        'Zoning interpretation of working setbacks 20 / 25 / 5 / 10',
        `Fire / 1-hr demising at x=${D}`,
        'Structural (posts carrying conditioned floor, gables)',
        'Civil / survey confirmation of parcel and curb cuts',
      ],
      next: hard
        ? 'R5.1e-v1.1 DESIGN COMPLETE / PROGRAM GATE PASS. v1.0 remains COMPLETE BASELINE / PROGRAM GATE NOT CLEARED. Professional validation pending: zoning · fire · structural · civil/survey.'
        : 'Named consistency failures — repair the drawing that drifted, do not redesign.',
      freezeNote: hard
        ? 'Deliverable v1.1 frozen except recorded demising correction from v1.0. Presentation / sheet-legibility is a separate pass.'
        : '',
    };
  }

  return { analyze };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eConsistency;
