/**
 * Lot 2 — R6.4 family daily-use (compat wrapper → Lot2DailyUse)
 */
const Lot2R64Daily = (() => {
  const D = typeof Lot2DailyUse !== 'undefined' ? Lot2DailyUse : null;
  const ID = 'reset_r6_4';

  function analyze(id = ID) {
    if (!D) return { id, error: 'Lot2DailyUse missing — load js/lot2-daily-use.js first' };
    return D.analyze(id);
  }

  return { analyze, ID };
})();

if (typeof module !== 'undefined') module.exports = Lot2R64Daily;
