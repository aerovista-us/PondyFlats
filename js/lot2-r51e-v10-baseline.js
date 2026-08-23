/**
 * R5.1e-v1.0 completed reference baseline.
 * PROGRAM GATE NOT CLEARED (1,556 / 1,806 vs 1,600–1,900 / ≤120).
 * Do not mutate. Live geometry is Lot2R51eLock (v1.1).
 * Sheet SVGs: imgs/r51e-v1.0/
 */
const Lot2R51eV10Baseline = Object.freeze({
  id: 'R5.1e-v1.0',
  status: 'COMPLETE BASELINE / PROGRAM GATE NOT CLEARED',
  date: '2026-08-22',
  supersededBy: 'R5.1e-v1.1',
  demisingX: 70,
  livingSf: Object.freeze({ A: 1556, B: 1806 }),
  livingGate: Object.freeze({ min: 1600, max: 1900, maxDelta: 120 }),
  plates: Object.freeze([
    Object.freeze({ id: 'B', role: 'rear', x: 28, y: 5, w: 42, h: 28 }),
    Object.freeze({ id: 'A', role: 'penn', x: 70, y: 5, w: 56, h: 22.5 }),
  ]),
  note: 'First fully reconciled drawing package (massing, plans, site, elevations, sections). Living-program gate was not cleared. Preserved as immutable evidence; not the live design.',
  svgDir: 'imgs/r51e-v1.0/',
});

if (typeof module !== 'undefined') module.exports = Lot2R51eV10Baseline;
