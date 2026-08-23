/**
 * Lot 2 — R5.1e approved duplex base (exact plan lock)
 * Parking / swept paths remain under Lot2R5Freeze.
 * v1.1: demising/ownership only. v1.0 baseline is Lot2R51eV10Baseline.
 */
const Lot2R51eLock = (() => {
  const ID = 'r5_1e';
  const PARENT = 'reset_r5';
  const REV = 'R5.1e-v1.1';
  const PROGRAM =
    'R5 — two enclosed garage spaces plus two covered spaces, independently accessible.';
  const LABEL = 'R5.1e-v1.1 — demising correction · program gate';

  /** v1.0 party wall — shift math only. Do not treat as live. */
  const V10_DEMISING_X = 70;

  /** Live residential envelope (parking boxes unchanged) */
  const LOCK = Object.freeze({
    rev: REV,
    demisingX: 68,
    livingSf: Object.freeze({ A: 1639, B: 1720 }),
    livingGate: Object.freeze({ min: 1600, max: 1900, maxDelta: 120 }),
    plates: Object.freeze([
      Object.freeze({ id: 'B', role: 'rear', x: 28, y: 5, w: 40, h: 28 }),
      Object.freeze({ id: 'A', role: 'penn', x: 68, y: 5, w: 58, h: 22.5 }),
    ]),
    overCoveredConditioned: true,
    postsCarryFloor: true,
    fire: '1-hr demising wall at x=68',
    heights: Object.freeze({
      carportClear: 9.0,
      structure: 1.5,
      ground: 10.5,
      upper: 10.0,
    }),
  });

  function sameBox(a, b, eps = 0.05) {
    return a && b
      && Math.abs(a.x - b.x) <= eps && Math.abs(a.y - b.y) <= eps
      && Math.abs(a.w - b.w) <= eps && Math.abs(a.h - b.h) <= eps;
  }

  function assertPlates(plates) {
    const fails = [];
    LOCK.plates.forEach((p) => {
      const q = (plates || []).find((x) => x.id === p.id);
      if (!sameBox(p, q)) fails.push(`Plate ${p.id} drifted from R5.1e-v1.1 lock`);
    });
    return { ok: fails.length === 0, fails };
  }

  function assertSf(livingA, livingB) {
    const g = LOCK.livingGate;
    const fails = [];
    if (livingA < g.min || livingA > g.max) fails.push(`A SF ${livingA} outside ${g.min}–${g.max}`);
    if (livingB < g.min || livingB > g.max) fails.push(`B SF ${livingB} outside ${g.min}–${g.max}`);
    const delta = Math.abs(livingA - livingB);
    if (delta > g.maxDelta) fails.push(`Living delta ${delta} exceeds ${g.maxDelta}`);
    return { ok: fails.length === 0, fails, gate: g, delta };
  }

  return { ID, PARENT, PROGRAM, LABEL, REV, LOCK, V10_DEMISING_X, assertPlates, assertSf };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eLock;
