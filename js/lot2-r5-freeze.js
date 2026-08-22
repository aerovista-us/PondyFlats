/**
 * Lot 2 — R5 geometry freeze (FULL PASS lock)
 * Do not edit footprints / paths without an explicit freeze-break + gate rerun.
 * Program: two enclosed garage spaces + two covered spaces, independently accessible.
 */
const Lot2R5Freeze = (() => {
  const ID = 'reset_r5';
  const PROGRAM =
    'R5 — two enclosed garage spaces plus two covered spaces, independently accessible.';

  /** Frozen snapshot — must match Lot2.CONCEPTS.reset_r5 */
  const FREEZE = Object.freeze({
    id: ID,
    boundaryClearanceFt: 0.75,
    reservedPlates: Object.freeze([
      Object.freeze({ id: 'B', role: 'rear', x: 28, y: 5, w: 48, h: 28 }),
      Object.freeze({ id: 'A', role: 'penn', x: 80, y: 5, w: 46, h: 20 }),
    ]),
    garages: Object.freeze([
      Object.freeze({ id: 'CB', x: 28, y: 20, w: 12, h: 14, doorFace: 'S', covered: true, enclosed: false, spaces: 1 }),
      Object.freeze({ id: 'B', x: 42, y: 20, w: 24, h: 16, doorFace: 'E', covered: false, enclosed: true, spaces: 1 }),
      Object.freeze({ id: 'CA', x: 86, y: 5, w: 12, h: 14, doorFace: 'S', covered: true, enclosed: false, spaces: 1 }),
      Object.freeze({ id: 'A', x: 100, y: 5, w: 24, h: 16, doorFace: 'E', covered: false, enclosed: true, spaces: 1 }),
    ]),
    drive: Object.freeze([
      Object.freeze([148, 28]), Object.freeze([125, 28]), Object.freeze([106, 28]),
      Object.freeze([100, 27]), Object.freeze([94, 26.5]), Object.freeze([86, 27]), Object.freeze([80, 28]),
    ]),
    accessA: Object.freeze([
      Object.freeze([148, 13]), Object.freeze([140, 13]), Object.freeze([130, 13]), Object.freeze([126, 13]),
    ]),
    accessB: Object.freeze([
      Object.freeze([148, 28]), Object.freeze([125, 28]), Object.freeze([100, 28]), Object.freeze([80, 28]), Object.freeze([68, 28]),
    ]),
    outboundB: Object.freeze([
      Object.freeze([68, 28]), Object.freeze([80, 28]), Object.freeze([86, 27]), Object.freeze([94, 26.5]),
      Object.freeze([100, 27]), Object.freeze([106, 28]), Object.freeze([125, 28]), Object.freeze([148, 28]),
    ]),
  });

  function samePt(a, b, eps = 0.01) {
    return Math.abs(a[0] - b[0]) <= eps && Math.abs(a[1] - b[1]) <= eps;
  }

  function sameBox(a, b) {
    return a && b && a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h;
  }

  function assertFrozen(concept) {
    const fails = [];
    if (!concept || concept.id !== ID) {
      return { ok: false, fails: ['Missing reset_r5 concept'], program: PROGRAM };
    }
    if (concept.boundaryClearanceFt !== FREEZE.boundaryClearanceFt) {
      fails.push(`boundaryClearanceFt drifted (${concept.boundaryClearanceFt})`);
    }
    FREEZE.reservedPlates.forEach((p) => {
      const q = (concept.reservedPlates || []).find((x) => x.id === p.id);
      if (!sameBox(p, q)) fails.push(`Plate ${p.id} drifted`);
    });
    FREEZE.garages.forEach((g) => {
      const q = (concept.garages || []).find((x) => x.id === g.id);
      if (!q || !sameBox(g, q) || q.doorFace !== g.doorFace || !!q.covered !== g.covered) {
        fails.push(`Garage/covered ${g.id} drifted`);
      }
    });
    const drive = concept.drive || [];
    if (drive.length !== FREEZE.drive.length || FREEZE.drive.some((p, i) => !samePt(p, drive[i]))) {
      fails.push('Drive / north-of-spine pocket drifted');
    }
    const apA = (concept.accessPaths || []).find((p) => p.garage === 'A');
    const apB = (concept.accessPaths || []).find((p) => p.garage === 'B');
    if (!apA || apA.path.length !== FREEZE.accessA.length || FREEZE.accessA.some((p, i) => !samePt(p, apA.path[i]))) {
      fails.push('Access A path drifted');
    }
    if (!apB || !apB.forwardExit || apB.path.length !== FREEZE.accessB.length
      || FREEZE.accessB.some((p, i) => !samePt(p, apB.path[i]))
      || !apB.outbound || apB.outbound.length !== FREEZE.outboundB.length
      || FREEZE.outboundB.some((p, i) => !samePt(p, apB.outbound[i]))) {
      fails.push('Access B inbound/outbound drifted');
    }
    return { ok: fails.length === 0, fails, program: PROGRAM, freeze: FREEZE };
  }

  function assertFromLot2() {
    const L = typeof Lot2 !== 'undefined' ? Lot2 : null;
    if (!L) return { ok: false, fails: ['Lot2 not loaded'], program: PROGRAM };
    return assertFrozen(L.CONCEPTS[ID]);
  }

  return { ID, PROGRAM, FREEZE, assertFrozen, assertFromLot2 };
})();

if (typeof module !== 'undefined') module.exports = Lot2R5Freeze;
