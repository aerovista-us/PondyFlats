/**
 * Lot 2 — R5.1 Program Rebalance
 * Parking geometry stays frozen (Lot2R5Freeze). Only residential plates / upper envelopes reopen.
 * Goal: can two comparable ~1,600–1,900 SF homes exist without quietly making A an ADU?
 */
const Lot2R51Rebalance = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Sk = typeof Lot2AccessSkeleton !== 'undefined' ? Lot2AccessSkeleton : null;
  const Freeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ID = 'reset_r5';
  const LIVING = L.LIVING_TARGET || { min: 1600, max: 1900 };
  const MIN_ROOM = 8;
  const MIN_STAIR = 3.5;
  const MIN_HOME_W = 18;
  const FIRE_GAP_MIN = 0; // shared demising wall allowed with 1-hr assumption
  /** Garage B east face — demising cannot cut through B parking */
  const B_PARKING_EAST = 66;
  /** Working setback / plate limits (planning) */
  const A_EAST_MAX = 126; // plate already ends here; Penn setback ~128
  const A_NORTH = 5;
  const A_SOUTH_MAX = 27.5; // keep structural plate north of drive spine y=28
  const B_WEST = 28;
  const B_SOUTH = 33;

  const PROGRAM =
    'R5 — two enclosed garage spaces plus two covered spaces, independently accessible.';

  function rect(x, y, w, h, name, kind, notes) {
    return {
      name,
      kind,
      x: +x.toFixed(2),
      y: +y.toFixed(2),
      w: +w.toFixed(2),
      h: +h.toFixed(2),
      sf: Math.round(w * h),
      notes: notes || '',
      minDim: +Math.min(w, h).toFixed(2),
    };
  }

  function roomOk(r) {
    if (r.kind === 'stair') return r.minDim >= MIN_STAIR - 0.05;
    if (r.kind === 'mech' || r.kind === 'storage' || r.kind === 'void' || r.kind === 'corridor') {
      return r.minDim >= 4 - 0.05;
    }
    if (r.kind === 'garage' || r.kind === 'covered') return true;
    return r.minDim >= MIN_ROOM - 0.05;
  }

  const CONDITIONED = new Set(['living', 'stair', 'corridor', 'mech', 'storage']);

  function livingSf(rooms) {
    return rooms.filter((r) => CONDITIONED.has(r.kind)).reduce((s, r) => s + r.sf, 0);
  }

  /**
   * Theoretical max two-story conditioned SF inside a plate with frozen parking boxes.
   * Parking boxes are clipped to the plate (garage may bleed past plate edge in freeze).
   */
  function theoreticalMax(plate, opts = {}) {
    const overCovered = !!opts.overCoveredConditioned;
    const garages = opts.garages || [
      { x: 100, y: 5, w: 24, h: 16 },
      { x: 86, y: 5, w: 12, h: 14 },
    ];
    function clipArea(g) {
      const x0 = Math.max(g.x, plate.x);
      const y0 = Math.max(g.y, plate.y);
      const x1 = Math.min(g.x + g.w, plate.x + plate.w);
      const y1 = Math.min(g.y + g.h, plate.y + plate.h);
      return Math.max(0, x1 - x0) * Math.max(0, y1 - y0);
    }
    const plateSf = plate.w * plate.h;
    const parkSf = garages.reduce((s, g) => s + clipArea(g), 0);
    const ground = Math.max(0, plateSf - parkSf);
    const covered = opts.coveredBox || null;
    const coveredVoid = (!overCovered && covered) ? clipArea(covered) : 0;
    const upper = Math.max(0, plateSf - coveredVoid);
    return {
      plateSf: Math.round(plateSf),
      parkInPlate: Math.round(parkSf),
      groundMax: Math.round(ground),
      upperMax: Math.round(upper),
      totalMax: Math.round(ground + upper),
      overCovered,
    };
  }

  function insidePlate(r, plate) {
    return r.x >= plate.x - 0.05 && r.y >= plate.y - 0.05
      && r.x + r.w <= plate.x + plate.w + 0.05
      && r.y + r.h <= plate.y + plate.h + 0.05;
  }

  function conflictsPosts(rooms, concept, allowOverCovered) {
    if (allowOverCovered) return []; // posts designed to carry conditioned floor
    const posts = [];
    (concept.garages || []).filter((g) => g.covered).forEach((g) => {
      const post = 0.5;
      const inset = 0.25;
      [[g.x + inset, g.y + inset], [g.x + g.w - inset - post, g.y + inset],
        [g.x + inset, g.y + g.h - inset - post], [g.x + g.w - inset - post, g.y + g.h - inset - post]]
        .forEach((c, i) => posts.push({ id: `${g.id}-p${i}`, x: c[0], y: c[1], w: post, h: post }));
    });
    const hits = [];
    rooms.forEach((r) => {
      if (r.kind === 'covered' || r.kind === 'garage' || r.kind === 'void') return;
      posts.forEach((p) => {
        const overlap = !(r.x + r.w <= p.x || p.x + p.w <= r.x || r.y + r.h <= p.y || p.y + p.h <= r.y);
        if (overlap) hits.push(`${r.name} overlaps ${p.id}`);
      });
    });
    return hits;
  }

  /** Build schematic rooms for a demising line D and options */
  function planScenario(opts) {
    const D = opts.demisingX; // B east / A west
    const aH = opts.plateAH || 20;
    const overA = !!opts.overCoveredA;
    const overB = !!opts.overCoveredB;
    const plateB = { id: 'B', x: B_WEST, y: A_NORTH, w: D - B_WEST, h: B_SOUTH - A_NORTH };
    const plateA = { id: 'A', x: D, y: A_NORTH, w: A_EAST_MAX - D, h: aH };

    // --- Unit A ---
    const aGround = [
      rect(100, 5, 24, 16, 'GARAGE A · enclosed', 'garage', 'Frozen'),
      rect(86, 5, 12, 14, 'COVERED A', 'covered', 'Frozen'),
    ];
    const westStrip = Math.max(0, 86 - D);
    if (westStrip >= 4) {
      aGround.push(rect(D, 5, westStrip, Math.min(16, aH), 'ENTRY / MUD A', 'corridor', 'West residual'));
    }
    const southBand = aH - 16;
    if (southBand >= 4) {
      const sw = Math.min(20, plateA.w);
      aGround.push(rect(D, 21, sw, southBand, 'STAIR A', 'stair', 'South plate band'));
      const remX = D + sw;
      const remW = A_EAST_MAX - remX;
      if (remW >= 8) {
        aGround.push(rect(remX, 21, Math.min(12, remW), southBand, 'MECH / UTIL A', 'mech', 'South of garage'));
        const storX = remX + Math.min(12, remW);
        const storW = A_EAST_MAX - storX;
        if (storW >= 4) aGround.push(rect(storX, 21, storW, southBand, 'STORAGE A', 'storage', 'SE band'));
      }
    }
    // Fill any north residual east of covered / west of garage already handled; east of garage on ground is garage.
    const aUpper = [];
    if (westStrip >= 4) {
      aUpper.push(rect(D, 5, westStrip, aH, 'STAIR / HALL A', 'stair', 'Over entry'));
    }
    // Over garage + east residual to plate east
    const livX = Math.max(D + westStrip, 100);
    // Full conditioned upper pack
    if (overA) {
      // Conditioned over covered CA (posts carry)
      aUpper.push(rect(86, 5, 14, 14, 'LIVING OVER CA', 'living', 'Was deck · posts carry conditioned'));
      aUpper.push(rect(100, 5, 26, aH, 'LIVING · KITCHEN · BEDS A', 'living', 'Over enclosed garage'));
      if (aH > 14) {
        // south of CA band if plate deeper
        const southOver = aH - 14;
        if (southOver >= 4 && westStrip + 14 <= plateA.w) {
          /* covered only to y=19; south of CA within plate */
        }
      }
    } else {
      aUpper.push(rect(86, 5, 14, 14, 'ROOF DECK A', 'void', 'Over covered'));
      aUpper.push(rect(100, 5, 26, aH, 'LIVING · KITCHEN · BEDS A', 'living', 'Over enclosed garage'));
    }
    // Fill west-of-garage / east-of-entry upper if gap between westStrip end and 86
    if (D < 86 && westStrip > 0 && D + westStrip < 86) {
      const gx = D + westStrip;
      const gw = 86 - gx;
      if (gw >= 4) aUpper.push(rect(gx, 5, gw, aH, 'FILL A', 'living', 'Plate fill'));
    }
    // South upper fill over south band east of liv already in garage block height aH

    // --- Unit B ---
    const bEast = D;
    const bGround = [
      rect(42, 20, 24, 16, 'GARAGE B · enclosed', 'garage', 'Frozen'),
      rect(28, 20, 12, 14, 'COVERED B', 'covered', 'Frozen'),
    ];
    const northH = 15;
    const stairW = Math.min(10, Math.max(4, bEast - 66));
    const livingW = Math.max(0, bEast - 40 - stairW);
    if (livingW >= 8) {
      bGround.push(rect(28, 5, 12, northH, 'MECH + STORAGE B', 'mech', 'NW residual'));
      bGround.push(rect(40, 5, livingW, northH, 'LIVING / KITCHEN B', 'living', 'North of parking'));
      if (stairW >= MIN_STAIR) {
        bGround.push(rect(bEast - stairW, 5, stairW, northH, 'STAIR + ENTRY B', 'stair', 'East strip'));
      }
    } else if (bEast - 28 >= 20) {
      // compressed north band
      bGround.push(rect(28, 5, Math.min(12, bEast - 28), northH, 'MECH B', 'mech', 'Compressed'));
      const lx = 28 + Math.min(12, bEast - 28);
      const lw = bEast - lx - Math.max(stairW, MIN_STAIR);
      if (lw >= 8) bGround.push(rect(lx, 5, lw, northH, 'LIVING B', 'living', 'Compressed north'));
      if (stairW >= MIN_STAIR) bGround.push(rect(bEast - stairW, 5, stairW, northH, 'STAIR B', 'stair', 'East'));
    }

    const bUpper = [];
    const bNorthW = bEast - 28;
    if (bNorthW >= 12 && stairW >= MIN_STAIR) {
      bUpper.push(rect(28, 5, bNorthW - stairW, northH, 'LIVING / DINING B', 'living', 'North upper'));
      bUpper.push(rect(bEast - stairW, 5, stairW, northH, 'STAIR OPEN B', 'stair', 'Aligned'));
    }
    const bedW = Math.max(0, bEast - 42);
    if (bedW >= 8) {
      bUpper.push(rect(42, 20, bedW, 13, 'BEDS + BATH B', 'living', 'Over enclosed garage'));
    }
    if (overB) {
      bUpper.push(rect(28, 20, 14, 13, 'BED / STUDY OVER CB', 'living', 'Posts carry conditioned'));
    } else {
      bUpper.push(rect(28, 20, 14, 13, 'ROOF DECK B', 'void', 'Over covered B'));
    }

    const roomsA = [...aGround, ...aUpper];
    const roomsB = [...bGround, ...bUpper];
    const theoA = theoreticalMax(plateA, {
      overCoveredConditioned: overA,
      garages: [
        { x: 100, y: 5, w: 24, h: 16 },
        { x: 86, y: 5, w: 12, h: 14 },
      ],
      coveredBox: { x: 86, y: 5, w: 12, h: 14 },
    });
    const theoB = theoreticalMax(plateB, {
      overCoveredConditioned: overB,
      garages: [
        { x: 42, y: 20, w: 24, h: 16 },
        { x: 28, y: 20, w: 12, h: 14 },
      ],
      coveredBox: { x: 28, y: 20, w: 12, h: 14 },
    });

    return {
      demisingX: D,
      plateA,
      plateB,
      overCoveredA: overA,
      overCoveredB: overB,
      plateAH: aH,
      aGround,
      aUpper,
      bGround,
      bUpper,
      livingA: livingSf(roomsA),
      livingB: livingSf(roomsB),
      theoA,
      theoB,
      roomsA,
      roomsB,
    };
  }

  function evaluatePlan(plan, concept) {
    const fails = [];
    const notes = [];
    if (plan.plateA.w < MIN_HOME_W) fails.push(`A plate width ${plan.plateA.w}′ < ${MIN_HOME_W}′`);
    if (plan.plateB.w < MIN_HOME_W) fails.push(`B plate width ${plan.plateB.w}′ < ${MIN_HOME_W}′`);
    if (plan.demisingX < B_PARKING_EAST) fails.push(`Demising x=${plan.demisingX} cuts B parking (east face ${B_PARKING_EAST})`);
    if (plan.plateA.y + plan.plateA.h > A_SOUTH_MAX + 0.05) {
      fails.push(`A plate south ${plan.plateA.y + plan.plateA.h} enters drive spine zone`);
    }

    [...plan.aGround, ...plan.aUpper].forEach((r) => {
      if (r.kind === 'garage' || r.kind === 'covered') return;
      if (!insidePlate(r, plan.plateA)) fails.push(`A:${r.name} outside plate`);
      if (!roomOk(r)) fails.push(`A:${r.name} too narrow (${r.minDim}′)`);
    });
    [...plan.bGround, ...plan.bUpper].forEach((r) => {
      if (r.kind === 'garage' || r.kind === 'covered') return;
      if (!insidePlate(r, plan.plateB)) fails.push(`B:${r.name} outside plate`);
      if (!roomOk(r)) fails.push(`B:${r.name} too narrow (${r.minDim}′)`);
    });

    const postHits = [
      ...conflictsPosts([...plan.aGround, ...plan.aUpper], concept, plan.overCoveredA),
      ...conflictsPosts([...plan.bGround, ...plan.bUpper], concept, plan.overCoveredB),
    ];
    if (postHits.length) fails.push(...postHits.slice(0, 3));

    const hasStairA = plan.aGround.some((r) => r.kind === 'stair') || plan.aUpper.some((r) => r.kind === 'stair');
    const hasStairB = plan.bGround.some((r) => r.kind === 'stair') || plan.bUpper.some((r) => r.kind === 'stair');
    if (!hasStairA) fails.push('A missing stair');
    if (!hasStairB) fails.push('B missing stair');

    // Synthetic concept for arch / drive-crossing with new plates only
    const synth = {
      ...concept,
      reservedPlates: [
        { id: 'B', role: 'rear', name: 'HOME PLATE B · rear', ...plan.plateB },
        { id: 'A', role: 'penn', name: 'HOME PLATE A · Penn', ...plan.plateA },
      ],
    };
    const driveX = Sk ? Sk.plateDriveCrossing(synth) : { ok: true, detail: 'n/a' };
    if (!driveX.ok) fails.push(driveX.detail);
    const arch = Sk ? Sk.architectureRemaining(synth) : null;
    if (arch && (!arch.unitA.ok || !arch.unitB.ok)) {
      fails.push(`Plate scoring: A ${arch.unitA.note}; B ${arch.unitB.note}`);
    }

    const aInBand = plan.livingA >= LIVING.min && plan.livingA <= LIVING.max + 200;
    const bInBand = plan.livingB >= LIVING.min && plan.livingB <= LIVING.max + 200;
    const theoAOk = plan.theoA.totalMax >= LIVING.min;
    const theoBOk = plan.theoB.totalMax >= LIVING.min;
    const theoBothBand = theoAOk && theoBOk;
    const asymmetry = Math.abs(plan.livingA - plan.livingB);
    const comparable = asymmetry <= 400 && plan.livingA >= 1400 && plan.livingB >= 1400;
    /** Packed SF must not exceed theoretical envelope (overlap / bleed guard) */
    const packOk = plan.livingA <= plan.theoA.totalMax + 40 && plan.livingB <= plan.theoB.totalMax + 40;
    if (!packOk) fails.push('Packed conditioned SF exceeds plate envelope — check room overlaps');

    let verdict = 'FAIL';
    if (fails.length === 0 && aInBand && bInBand && comparable && theoBothBand) verdict = 'PASS';
    else if (fails.length === 0 && theoBothBand && comparable) verdict = 'CONDITIONAL';
    else if (fails.length === 0) verdict = 'CONDITIONAL';
    else verdict = 'FAIL';

    if (!comparable && fails.length === 0) {
      notes.push(`Asymmetry ${asymmetry} SF — not two comparable homes`);
    }
    if (!theoAOk) {
      notes.push(`A theoretical max ~${plan.theoA.totalMax} SF still under ${LIVING.min} band`);
    }
    if (!theoBOk) {
      notes.push(`B theoretical max ~${plan.theoB.totalMax} SF still under ${LIVING.min} band`);
    }

    return {
      ok: fails.length === 0,
      fails,
      notes,
      verdict,
      driveCrossing: driveX,
      arch,
      aInBand,
      bInBand,
      comparable,
      asymmetry,
      fire: `1-hr demising at x≈${plan.demisingX} (shared wall OK)`,
      privacy: plan.demisingX < 76
        ? 'Closer household interface — limit facing windows at demising'
        : 'Gap / prior demising — privacy similar to R5',
      bearing: plan.overCoveredA || plan.overCoveredB
        ? 'Carport posts must be sized for conditioned floor (not deck-only)'
        : 'Upper on garage walls · decks on posts',
    };
  }

  function analyze() {
    const concept = L.CONCEPTS[ID];
    const freeze = Freeze ? Freeze.assertFrozen(concept) : { ok: false, fails: ['Freeze missing'] };

    const scenarios = [
      {
        id: 'r5_baseline',
        label: 'R5 baseline (current schematic)',
        demisingX: 80,
        plateAH: 20,
        overCoveredA: false,
        overCoveredB: false,
      },
      {
        id: 'r51a_covered_to_cond',
        label: 'R5.1a — A deck→conditioned over CA',
        demisingX: 80,
        plateAH: 20,
        overCoveredA: true,
        overCoveredB: false,
      },
      {
        id: 'r51b_absorb_gap',
        label: 'R5.1b — + absorb 4′ demising gap into A',
        demisingX: 76,
        plateAH: 20,
        overCoveredA: true,
        overCoveredB: false,
      },
      {
        id: 'r51c_transfer_6',
        label: 'R5.1c — transfer 6′ from B (+ gap) · D=70',
        demisingX: 70,
        plateAH: 20,
        overCoveredA: true,
        overCoveredB: false,
      },
      {
        id: 'r51d_transfer_10',
        label: 'R5.1d — transfer 10′ from B · D=66 (B parking east)',
        demisingX: 66,
        plateAH: 20,
        overCoveredA: true,
        overCoveredB: true,
      },
      {
        id: 'r51e_deepen_A',
        label: 'R5.1e — D=70 · deepen A to 27.5′ · both over-covered',
        demisingX: 70,
        plateAH: 22.5,
        overCoveredA: true,
        overCoveredB: true,
      },
      {
        id: 'r51f_max_transfer',
        label: 'R5.1f — max plate transfer D=66 · deepen A · both over-covered',
        demisingX: 66,
        plateAH: 22.5,
        overCoveredA: true,
        overCoveredB: true,
      },
    ];

    const rows = scenarios.map((s) => {
      const plan = planScenario(s);
      const ev = evaluatePlan(plan, concept);
      return { ...s, plan, eval: ev };
    });

    const bestComparable = rows.filter((r) => r.eval.ok && r.eval.comparable);
    const bestTheo = rows.reduce((best, r) => {
      if (!r.eval.ok) return best;
      const score = Math.min(r.plan.theoA.totalMax, r.plan.theoB.totalMax);
      const bestScore = best ? Math.min(best.plan.theoA.totalMax, best.plan.theoB.totalMax) : -1;
      return score > bestScore ? r : best;
    }, null);

    const maxLegit = {
      A: Math.max(...rows.filter((r) => r.eval.ok).map((r) => r.plan.theoA.totalMax), 0),
      B: Math.max(...rows.filter((r) => r.eval.ok).map((r) => r.plan.theoB.totalMax), 0),
      note: 'Max among gate-clear R5.1 plate variants (two-story · parking frozen)',
    };

    const duplexReachable = rows.some((r) =>
      r.eval.ok && r.eval.verdict === 'PASS' && r.eval.aInBand && r.eval.bInBand && r.eval.comparable);

    let productVerdict = 'REJECT_DUPLEX_ON_R5_PLATES';
    if (duplexReachable) productVerdict = 'DUPLEX_REACHABLE_VIA_R51_PLATE_SHIFT';
    else if (maxLegit.A >= 1400 && maxLegit.B >= 1400) productVerdict = 'NEAR_BAND_ASYMMETRIC';
    else if (maxLegit.A < LIVING.min) productVerdict = 'LARGE_PLUS_COTTAGE_OR_REOPEN_PARKING';

    return {
      id: 'r5_1',
      program: PROGRAM,
      status: {
        parking: 'FULL PASS / frozen',
        schematic: 'CONDITIONAL',
        ownership: 'WAIT',
        visualization: 'LOCKED',
      },
      freeze,
      livingTarget: LIVING,
      rows,
      bestComparable: bestComparable[0] || null,
      bestTheo,
      maxLegit,
      duplexReachable,
      productVerdict,
      ownershipPrompt: duplexReachable
        ? 'Ownership WAIT: R5.1 can reach two comparable homes only if demising moves west (plate transfer) and covered→conditioned on posts is accepted. Parking stays frozen. Approve R5.1 plate package before massing — or reject and reopen parking.'
        : 'Ownership WAIT: (1) accept large home + cottage/ADU as new product, or (2) reject R5 as duplex solution and reopen parking/plate arrangement. Do not start massing.',
      next: 'Visualization LOCKED. No massing until ownership chooses product path.',
    };
  }

  return {
    analyze,
    planScenario,
    theoreticalMax,
    PROGRAM,
    LIVING,
    ID,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51Rebalance;
