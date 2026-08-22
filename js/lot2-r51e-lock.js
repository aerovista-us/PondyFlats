/**
 * Lot 2 — R5.1e approved duplex base (exact plan lock)
 * Parking / swept paths remain under Lot2R5Freeze.
 * Plates / demising / conditioned-over-covered locked here after ownership YES.
 */
const Lot2R51eLock = (() => {
  const ID = 'r5_1e';
  const PARENT = 'reset_r5';
  const PROGRAM =
    'R5 — two enclosed garage spaces plus two covered spaces, independently accessible.';
  const LABEL = 'R5.1e — approved duplex base';

  /** Locked residential envelope (parking boxes unchanged) */
  const LOCK = Object.freeze({
    demisingX: 70,
    approvedStudySf: Object.freeze({ A: 1761, B: 1806 }),
    livingGate: Object.freeze({ min: 1600, max: 1900, maxDelta: 120 }),
    plates: Object.freeze([
      Object.freeze({ id: 'B', role: 'rear', x: 28, y: 5, w: 42, h: 28 }),
      Object.freeze({ id: 'A', role: 'penn', x: 70, y: 5, w: 56, h: 22.5 }),
    ]),
    overCoveredConditioned: true,
    postsCarryFloor: true,
    fire: '1-hr demising wall at x=70',
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
      if (!sameBox(p, q)) fails.push(`Plate ${p.id} drifted from R5.1e lock`);
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

  return { ID, PARENT, PROGRAM, LABEL, LOCK, assertPlates, assertSf };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eLock;
