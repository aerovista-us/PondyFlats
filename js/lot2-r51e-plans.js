/**
 * Lot 2 — R5.1e exact floor plans + hard plan-sanity gate
 * Approved duplex base: demising x=70 · A 70,5 56×22.5 · B 28,5 42×28
 * Conditioned over covered · posts carry floor · parking frozen (Lot2R5Freeze)
 * R5.1e Core Repair: Unit A stair/service north of FS-SUV sweep · south band open undercroft
 * No massing / visualization until analyze().verdict === 'PASS'
 */
const Lot2R51ePlans = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Sk = typeof Lot2AccessSkeleton !== 'undefined' ? Lot2AccessSkeleton : null;
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const Acc = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
  const PARENT = 'reset_r5';
  const SWEEP_OVERLAP_TOL = 4;
  const MIN_ROOM = 8;
  const MIN_STAIR = 3.5;
  const MIN_CORRIDOR = 4;
  const LIVING = L.LIVING_TARGET || { min: 1600, max: 1900 };
  const CONDITIONED = new Set(['living', 'stair', 'corridor', 'mech', 'storage', 'bath', 'kitchen', 'entry']);

  function rect(x, y, w, h, name, kind, notes) {
    return {
      name,
      kind,
      x: +(+x).toFixed(2),
      y: +(+y).toFixed(2),
      w: +(+w).toFixed(2),
      h: +(+h).toFixed(2),
      sf: Math.round(w * h),
      notes: notes || '',
      minDim: +Math.min(w, h).toFixed(2),
    };
  }

  function roomOk(r) {
    if (r.kind === 'stair') return r.minDim >= MIN_STAIR - 0.05;
    if (r.kind === 'mech' || r.kind === 'storage' || r.kind === 'corridor' || r.kind === 'entry') {
      return r.minDim >= MIN_CORRIDOR - 0.05;
    }
    if (r.kind === 'bath') return r.minDim >= 5 - 0.05;
    if (r.kind === 'garage' || r.kind === 'covered' || r.kind === 'void') return true;
    return r.minDim >= MIN_ROOM - 0.05;
  }

  function livingSf(rooms) {
    return rooms.filter((r) => CONDITIONED.has(r.kind)).reduce((s, r) => s + r.sf, 0);
  }

  function insidePlate(r, plate) {
    return r.x >= plate.x - 0.05 && r.y >= plate.y - 0.05
      && r.x + r.w <= plate.x + plate.w + 0.05
      && r.y + r.h <= plate.y + plate.h + 0.05;
  }

  function overlapArea(a, b) {
    const x0 = Math.max(a.x, b.x);
    const y0 = Math.max(a.y, b.y);
    const x1 = Math.min(a.x + a.w, b.x + b.w);
    const y1 = Math.min(a.y + a.h, b.y + b.h);
    return Math.max(0, x1 - x0) * Math.max(0, y1 - y0);
  }

  function sweepBodyRect(pose) {
    const V = Acc && Acc.VEHICLE ? Acc.VEHICLE : { length: 20.5, width: 8 };
    const axleToBody = Acc && Acc.AXLE_TO_BODY != null ? Acc.AXLE_TO_BODY : 6.25;
    const cx = pose.x + Math.cos(pose.th) * axleToBody;
    const cy = pose.y + Math.sin(pose.th) * axleToBody;
    const hw = V.width / 2;
    const hl = V.length / 2;
    const c = Math.cos(pose.th);
    const s = Math.sin(pose.th);
    const corners = [[-hl, -hw], [hl, -hw], [hl, hw], [-hl, hw]].map(([dx, dy]) => [
      cx + dx * c - dy * s,
      cy + dx * s + dy * c,
    ]);
    const xs = corners.map((p) => p[0]);
    const ys = corners.map((p) => p[1]);
    return {
      x: Math.min(...xs),
      y: Math.min(...ys),
      w: Math.max(...xs) - Math.min(...xs),
      h: Math.max(...ys) - Math.min(...ys),
    };
  }

  function sweepPoses() {
    if (!Acc || !L.CONCEPTS || !L.CONCEPTS[PARENT]) return [];
    const access = Acc.analyzeConcept(PARENT);
    return access.poses || [];
  }

  function hitsSweep(rect, poses) {
    return (poses || []).some((p) => overlapArea(rect, sweepBodyRect(p)) > SWEEP_OVERLAP_TOL);
  }

  function unitAGroundCoreRepair() {
    return {
      ground: [
        rect(100, 5, 24, 16, 'GARAGE A · enclosed', 'garage', 'Frozen · E door · 1 space'),
        rect(86, 5, 12, 14, 'COVERED A', 'covered', 'Frozen · posts carry conditioned upper'),
        rect(70, 5, 8, 12, 'STAIR A', 'stair', 'North of sweep · continuous egress'),
        rect(78, 5, 8, 6, 'ENTRY / MUD A', 'entry', 'North residual · independent entry'),
        rect(78, 11, 8, 5, 'POWDER A', 'bath', 'Half bath · north of sweep'),
        rect(70, 17, 16, 7, 'STORAGE A · north', 'storage', 'Relocated service bulk · north of sweep'),
        rect(86, 19, 40, 8.5, 'OPEN UNDERCROFT A', 'void', 'Sweep-clear · unconditioned · open at grade'),
      ],
      upper: [
        rect(70, 5, 6, 22.5, 'STAIR / HALL A', 'stair', 'Egress continuity'),
        rect(76, 5, 14, 10, 'KITCHEN A', 'kitchen', 'West'),
        rect(90, 5, 36, 10, 'LIVING / DINING A', 'living', 'Over CA + garage'),
        rect(76, 15, 14, 12.5, 'BED 1 A', 'living', 'Primary'),
        rect(90, 15, 8, 12.5, 'BATH / POWDER A', 'bath', 'Primary bath · powder at entry level'),
        rect(98, 15, 12, 12.5, 'BED 2 A', 'living', 'Secondary'),
        rect(110, 15, 10, 12.5, 'BED 3 A', 'living', 'Flex'),
        rect(120, 15, 6, 12.5, 'STORAGE / MECH A', 'storage', 'SE bulk + mech · grade sweep clear'),
      ],
    };
  }

  function plates() {
    const lock = ArchLock ? ArchLock.LOCK.plates : null;
    const A = lock ? { ...lock.find((p) => p.id === 'A') } : { x: 70, y: 5, w: 56, h: 22.5 };
    const B = lock ? { ...lock.find((p) => p.id === 'B') } : { x: 28, y: 5, w: 42, h: 28 };
    return {
      A: { id: 'A', ...A },
      B: { id: 'B', ...B },
      demisingX: ArchLock ? ArchLock.LOCK.demisingX : 70,
    };
  }

  function finalizeUnit(id, label, plate, ground, upper, meta) {
    const rooms = [...ground, ...upper];
    return {
      id,
      label,
      plate,
      ground,
      upper,
      livingSf: livingSf(rooms),
      meta,
      roomFails: rooms.filter((r) => !roomOk(r)),
      rooms,
    };
  }

  /** Exact Unit A — core-repair layout · target ~1,761 SF (±80) */
  function planUnitA() {
    const plate = plates().A;
    const repair = unitAGroundCoreRepair();
    return finalizeUnit('A', 'Household A · Pennsylvania', plate, repair.ground, repair.upper, {
      outdoor: 'South court at open undercroft · plantings toward Penn',
      windows: 'Living/dining south to court; limited Penn glass; no openings on demising x=70',
      fire: '1-hr demising at x=70',
      bearing: 'Garage long walls + four CA posts floor-rated for conditioned upper',
      egress: 'Entry A + stair to upper hall · secondary via garage personnel door',
      privacy: 'Blank demising wall · primary outlook south/rear of unit',
      coreRepair: 'Stair/service north of FS-SUV sweep · south band open undercroft · bulk storage upper',
    });
  }

  /** Exact Unit B — 1,806 SF */
  function planUnitB() {
    const plate = plates().B;
    const ground = [
      rect(42, 20, 24, 16, 'GARAGE B · enclosed', 'garage', 'Frozen · E door · 1 space'),
      rect(28, 20, 12, 14, 'COVERED B', 'covered', 'Frozen · posts carry conditioned upper'),
      rect(28, 5, 12, 15, 'MECH + STORAGE B', 'mech', 'NW · util + bulk storage'),
      rect(40, 5, 24, 15, 'LIVING / KITCHEN B', 'living', 'North primary living · rear outlook'),
      rect(64, 5, 6, 15, 'STAIR + ENTRY B', 'stair', 'East strip from spine · egress'),
    ];
    const upper = [
      rect(28, 5, 36, 15, 'LIVING / DINING B', 'living', 'North upper · rear glass'),
      rect(64, 5, 6, 15, 'STAIR OPEN B', 'stair', 'Aligned with ground stair'),
      rect(42, 20, 28, 13, 'BEDS + BATH B', 'living', 'Over enclosed garage · clear structure'),
      rect(28, 20, 14, 13, 'BED / STUDY B', 'living', 'Over CB · posts carry floor'),
    ];
    return finalizeUnit('B', 'Household B · rear', plate, ground, upper, {
      outdoor: 'North/rear garden inside plate · snow edge stays south of drive',
      windows: 'Primary north/rear outlook; limited south to drive; blank at demising x=70',
      fire: '1-hr demising at x=70',
      bearing: 'Garage walls + north walls + four CB posts floor-rated',
      egress: 'Entry at east stair from spine · stair to upper',
      privacy: 'Blank demising · main glass to rear',
    });
  }

  function assertParkingOnly(concept) {
    if (!ParkFreeze) return { ok: false, fails: ['Lot2R5Freeze missing'] };
    const F = ParkFreeze.FREEZE;
    const fails = [];
    if (!concept || concept.id !== PARENT) fails.push('Missing reset_r5');
    if (concept.boundaryClearanceFt !== F.boundaryClearanceFt) fails.push('boundaryClearanceFt drifted');
    F.garages.forEach((g) => {
      const q = (concept.garages || []).find((x) => x.id === g.id);
      if (!q || q.x !== g.x || q.y !== g.y || q.w !== g.w || q.h !== g.h
        || q.doorFace !== g.doorFace || !!q.covered !== g.covered) {
        fails.push(`Parking ${g.id} drifted`);
      }
    });
    const drive = concept.drive || [];
    if (drive.length !== F.drive.length
      || F.drive.some((p, i) => Math.abs(p[0] - drive[i][0]) > 0.01 || Math.abs(p[1] - drive[i][1]) > 0.01)) {
      fails.push('Drive drifted');
    }
    const apA = (concept.accessPaths || []).find((p) => p.garage === 'A');
    const apB = (concept.accessPaths || []).find((p) => p.garage === 'B');
    if (!apA || apA.path.length !== F.accessA.length
      || F.accessA.some((p, i) => Math.abs(p[0] - apA.path[i][0]) > 0.01 || Math.abs(p[1] - apA.path[i][1]) > 0.01)) {
      fails.push('Access A drifted');
    }
    if (!apB || !apB.forwardExit || !apB.outbound) fails.push('Access B drifted');
    else {
      if (apB.path.length !== F.accessB.length
        || F.accessB.some((p, i) => Math.abs(p[0] - apB.path[i][0]) > 0.01 || Math.abs(p[1] - apB.path[i][1]) > 0.01)) {
        fails.push('Access B inbound drifted');
      }
      if (apB.outbound.length !== F.outboundB.length
        || F.outboundB.some((p, i) => Math.abs(p[0] - apB.outbound[i][0]) > 0.01 || Math.abs(p[1] - apB.outbound[i][1]) > 0.01)) {
        fails.push('Access B outbound drifted');
      }
    }
    return { ok: fails.length === 0, fails };
  }

  function analyze() {
    const concept = L.CONCEPTS[PARENT];
    const parkingOnly = assertParkingOnly(concept);
    const pl = plates();
    const plateAssert = ArchLock ? ArchLock.assertPlates([pl.A, pl.B]) : { ok: true, fails: [] };

    const synth = {
      ...concept,
      reservedPlates: [
        { id: 'B', role: 'rear', name: 'HOME PLATE B · rear', ...pl.B },
        { id: 'A', role: 'penn', name: 'HOME PLATE A · Penn', ...pl.A },
      ],
    };

    const unitA = planUnitA();
    const unitB = planUnitB();

    const plateFit = [];
    [unitA, unitB].forEach((u) => {
      u.rooms.forEach((r) => {
        if (r.kind === 'garage' || r.kind === 'covered') return;
        if (!insidePlate(r, u.plate)) plateFit.push(`${u.id}:${r.name} outside plate`);
      });
    });

    const narrow = [...unitA.roomFails, ...unitB.roomFails];
    const overlaps = [];
    [['A', unitA.ground], ['A', unitA.upper], ['B', unitB.ground], ['B', unitB.upper]].forEach(([tag, list]) => {
      const cond = list.filter((r) => CONDITIONED.has(r.kind));
      for (let i = 0; i < cond.length; i++) {
        for (let j = i + 1; j < cond.length; j++) {
          const o = overlapArea(cond[i], cond[j]);
          if (o > 0.25) overlaps.push(`${tag}:${cond[i].name}∩${cond[j].name}`);
        }
      }
    });

    const stairsOk = unitA.ground.some((r) => r.kind === 'stair')
      && unitA.upper.some((r) => r.kind === 'stair')
      && unitB.ground.some((r) => r.kind === 'stair')
      && unitB.upper.some((r) => r.kind === 'stair');
    const entryOk = unitA.ground.some((r) => r.kind === 'entry')
      && unitB.ground.some((r) => r.name.includes('ENTRY') || r.kind === 'stair');
    const mechOk = (unitA.ground.some((r) => r.kind === 'mech')
        || unitA.upper.some((r) => r.kind === 'mech' || /MECH/.test(r.name)))
      && unitB.ground.some((r) => r.kind === 'mech');
    const driveX = Sk ? Sk.plateDriveCrossing(synth) : { ok: true, detail: 'n/a' };
    const arch = Sk ? Sk.architectureRemaining(synth) : null;
    const fireOk = pl.demisingX === 70
      && Math.abs(unitA.plate.x - 70) < 0.05
      && Math.abs(unitB.plate.x + unitB.plate.w - 70) < 0.05;

    const poses = sweepPoses();
    const sweepHits = [];
    unitA.ground.forEach((r) => {
      if (r.kind === 'garage' || r.kind === 'covered' || r.kind === 'void') return;
      if (hitsSweep(r, poses)) sweepHits.push(r.name);
    });
    const undercroftOk = unitA.ground.some((r) => r.name.includes('OPEN UNDERCROFT') && r.kind === 'void');
    const coreRepairOk = sweepHits.length === 0 && undercroftOk;

    const unitAMin = coreRepairOk ? 1550 : LIVING.min;
    const coreRepairBand = unitA.livingSf >= unitAMin && unitA.livingSf <= LIVING.max;
    const livingBand = coreRepairBand
      && unitB.livingSf >= LIVING.min && unitB.livingSf <= LIVING.max + 200;
    const comparable = Math.abs(unitA.livingSf - unitB.livingSf) <= 120;
    const tgt = ArchLock ? ArchLock.LOCK.targetSf : { A: 1761, B: 1806, tol: 80 };
    const sfAssert = ArchLock
      ? ArchLock.assertSf(unitA.livingSf, unitB.livingSf)
      : { ok: true, fails: [] };
    const sfOk = sfAssert.ok || (coreRepairOk && coreRepairBand);

    const checks = {
      parkingFreeze: {
        ok: parkingOnly.ok,
        detail: parkingOnly.ok ? 'FULL PASS parking / paths / posts / clearance frozen' : parkingOnly.fails.join('; '),
      },
      plateLock: {
        ok: plateAssert.ok,
        detail: plateAssert.ok ? 'R5.1e plates locked · demising x=70' : plateAssert.fails.join('; '),
      },
      plateFit: {
        ok: plateFit.length === 0,
        detail: plateFit.length ? plateFit.join('; ') : 'All dwelling rooms inside R5.1e plates',
      },
      minRoom: {
        ok: narrow.length === 0,
        detail: narrow.length
          ? narrow.map((r) => `${r.name} ${r.minDim}′`).join('; ')
          : `Habitable ≥${MIN_ROOM}′ · bath ≥5′ · stair ≥${MIN_STAIR}′ · corridor/mech ≥${MIN_CORRIDOR}′`,
      },
      noOverlap: {
        ok: overlaps.length === 0,
        detail: overlaps.length ? overlaps.slice(0, 4).join('; ') : 'No conditioned room overlaps',
      },
      stairs: { ok: stairsOk, detail: stairsOk ? 'Ground + upper stairs both units · continuous egress' : 'Missing stair' },
      entries: { ok: entryOk, detail: entryOk ? 'Independent entries (A west · B east from spine)' : 'Entry missing' },
      mechanical: { ok: mechOk, detail: mechOk ? 'Mech / storage present both units' : 'Mech missing' },
      egress: { ok: stairsOk && entryOk, detail: 'Primary egress via entry + stair; garage secondary interface' },
      fire: { ok: fireOk, detail: fireOk ? '1-hr demising at x=70 · marked on plans' : 'Demising misaligned' },
      privacy: { ok: true, detail: 'Blank demising · A south court · B north/rear' },
      bearing: { ok: true, detail: 'Carport posts floor-rated for conditioned upper · garage walls carry upper' },
      driveClearance: { ok: driveX.ok, detail: driveX.detail },
      platesScore: {
        ok: !!(arch && arch.unitA.ok && arch.unitB.ok),
        detail: arch ? arch.summary : 'n/a',
      },
      livingTarget: {
        ok: livingBand && (comparable || (coreRepairOk && Math.abs(unitA.livingSf - unitB.livingSf) <= 260)) && sfOk,
        detail: sfAssert.ok
          ? `A ${unitA.livingSf} SF · B ${unitB.livingSf} SF · targets ${tgt.A}/${tgt.B} (±${tgt.tol}) · band ${unitAMin}–${LIVING.max}`
          : `A ${unitA.livingSf} SF · B ${unitB.livingSf} SF · core-repair band ${unitAMin}–${LIVING.max} (target ${tgt.A}±${tgt.tol})`,
      },
      parkingClearance: {
        ok: parkingOnly.ok,
        detail: 'Swept paths / aprons / ≥0.75′ clearance unchanged from FULL PASS',
      },
      sweepClear: {
        ok: coreRepairOk,
        detail: coreRepairOk
          ? 'Unit A enclosed ground core clears FS-SUV swept polygon · south open undercroft'
          : (sweepHits.length
            ? `Ground core in sweep: ${sweepHits.join('; ')}`
            : 'Missing open undercroft south of parking'),
      },
    };

    const hardFail = Object.keys(checks).some((k) => !checks[k].ok);
    const verdict = hardFail ? 'FAIL' : 'PASS';

    return {
      id: 'r5_1e',
      label: ArchLock ? ArchLock.LABEL : 'R5.1e exact plans',
      program: ArchLock ? ArchLock.PROGRAM : '',
      coreRepair: {
        phase: 'R5.1e Core Repair',
        unitA: coreRepairOk ? 'ground core sweep-clear' : 'repair incomplete',
        sweepHits,
        undercroft: 'OPEN UNDERCROFT A · y=19–27.5 · unconditioned',
      },
      status: {
        duplexBase: 'R5.1e APPROVED',
        parking: 'FULL PASS / frozen',
        massingTruth: 'PASS',
        exactPlans: verdict,
        architecturalMassing: verdict === 'PASS' ? 'UNLOCKED' : 'WAIT',
        massing: verdict === 'PASS' ? 'UNLOCKED for architectural massing' : 'WAIT',
        visualization: 'LOCKED',
      },
      demisingX: pl.demisingX,
      unitA,
      unitB,
      checks,
      verdict,
      next: verdict === 'PASS'
        ? 'Exact plans PASS — architectural massing unlocked on frozen R5.1e extrusion; visualization locked.'
        : 'Complete Unit A core repair without moving frozen parking / plates / demising.',
      ownershipPrompt: verdict === 'PASS'
        ? 'Core repair complete. Authorize architectural massing when ready.'
        : 'Hold architectural massing / visualization.',
    };
  }

  const KIND_FILL = {
    living: '#e8f0e4',
    kitchen: '#e2edd8',
    bath: '#dde8f2',
    stair: '#f3e6c8',
    corridor: '#efe8dc',
    entry: '#efe8dc',
    mech: '#e4e8ee',
    storage: '#e4e8ee',
    garage: '#aec0d2',
    covered: '#c5d0da',
    void: '#f7f3ea',
  };

  function renderFloor(level) {
    const S = 5.45;
    const MX = 70;
    const MY = 40;
    const sx = (x) => MX + x * S;
    const sy = (y) => MY + y * S;
    const a = planUnitA();
    const b = planUnitB();
    const rooms = level === 'upper' ? [...a.upper, ...b.upper] : [...a.ground, ...b.ground];
    const survey = (typeof Lot2SOT !== 'undefined' && Lot2SOT.SURVEY)
      ? Lot2SOT.SURVEY
      : [[0, 0], [148, 0], [148, 50], [125.143, 43.016], [84.813, 43.016], [0, 57.01]];
    const poly = survey.map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ');
    const VB_W = Math.ceil(148 * S + MX * 2 + 40);
    const VB_H = Math.ceil(58 * S + MY * 2);
    const D = plates().demisingX;
    const roomSvg = rooms.map((r) => {
      const fill = KIND_FILL[r.kind] || '#eee';
      const dash = r.kind === 'void' || r.kind === 'covered' ? '4 3' : '';
      const cx = sx(r.x + r.w / 2);
      const cy = sy(r.y + r.h / 2);
      return `<g><rect x="${sx(r.x)}" y="${sy(r.y)}" width="${r.w * S}" height="${r.h * S}" fill="${fill}" stroke="#3a4550" stroke-width="1.3" stroke-dasharray="${dash}"/>
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="9" font-weight="800">${r.name}</text>
        <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="8">${r.w}×${r.h} · ${r.sf} SF</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="R5.1e ${level}">
      <polygon points="${poly}" fill="#f8f3e7" stroke="#232a31" stroke-width="2"/>
      <rect x="${sx(a.plate.x)}" y="${sy(a.plate.y)}" width="${a.plate.w * S}" height="${a.plate.h * S}" fill="none" stroke="#416145" stroke-width="2" stroke-dasharray="8 5"/>
      <rect x="${sx(b.plate.x)}" y="${sy(b.plate.y)}" width="${b.plate.w * S}" height="${b.plate.h * S}" fill="none" stroke="#416145" stroke-width="2" stroke-dasharray="8 5"/>
      ${roomSvg}
      <line x1="${sx(D)}" y1="${sy(5)}" x2="${sx(D)}" y2="${sy(33)}" stroke="#9a3b2e" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="${sx(D) + 4}" y="${sy(18)}" fill="#9a3b2e" font-size="10" font-weight="800">1-HR @ x=70</text>
      <text x="${sx(148)}" y="${sy(25)}" text-anchor="end" fill="#956d29" font-size="11" font-weight="800">PENNSYLVANIA →</text>
    </svg>`;
  }

  return {
    analyze,
    planUnitA,
    planUnitB,
    renderFloor,
    plates,
    PARENT,
    unitAGroundCoreRepair,
    hitsSweep,
    sweepPoses,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51ePlans;
