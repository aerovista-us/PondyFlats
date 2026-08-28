/**
 * Lot 2 — Design #2 lock (accessory rear-garage stack + connected L-duplex)
 *
 * Family: rear-garage-stack · topology accessory-rear-stack-connected-L-duplex
 * Representative of Run 47 / PONDY-RGS-230 (solver family, 6′ south buffer).
 * Does not mutate R5.1e / reset_r5.
 *
 * Source: docs/setbacks-without-alley.pdf · PONDY_DESIGN_2_HANDOFF.md
 */
const Lot2Design2 = (() => {
  const S = typeof Lot2SOT !== 'undefined' ? Lot2SOT : {};
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Acc = typeof Lot2Access !== 'undefined' ? Lot2Access : null;

  const ID = 'd2_rgs';
  const REV = 'D2-v0.9';
  const GEOM = 'd2-rgs-geom-1';
  const PROGRAM = 'Two connected homes · two detached 20×20 two-car garages · Pennsylvania only.';
  const SURVEY = S.SURVEY || [[0, 0], [148, 0], [148, 50], [125.143, 43.016], [84.813, 43.016], [0, 57.01]];

  const LOCK = Object.freeze({
    rev: REV,
    candidate: 'PONDY-RGS-230 family representative',
    run: 'Run 47',
    garageX: 5,
    garageSouthY: 6,
    garageGap: 2,
    garageW: 20,
    garageD: 20,
    duplexX: 52,
    partyX: 92,
    spineY: 37,
    turnX: 74,
    flareX: 44,
    livingTarget: 1800,
    capacityReserve: 1944,
    livingGate: Object.freeze({ min: 1600, max: 2100, maxDelta: 200 }),
    accessoryRearFt: 5,
    accessorySideFt: 5,
    actualSouthBufferFt: 6,
    minGarageDuplexFt: 6,
    garageHeightFt: 16,
    ridgeA: 27.0,
    ridgeB: 26.5,
    storyGround: 10.5,
    storyUpper: 10,
    zTop: 20.5,
    garageRidge: 18,
    stone: 3,
    unitADepthNote: '28′ plate failed the south swept lane; 26′ is the bounded correction after driveway-only',
    principal: Object.freeze({
      front: 20,
      rear: 25,
      sideY0: 5,
      sideIrreg: 10,
    }),
  });

  /** Same camera as Design 1 massing truth / `Lot2PipelineContract.AXON`. Do not invent a second viewpoint. */
  const AXON = Object.freeze({
    SCALE_Y: 4.05,
    SCALE_D: 2.2,
    SCALE_Z: 3.35,
    OX: 62,
    OY: 455,
    VB_W: 1040,
    VB_H: 600,
    STONE: 3,
  });

  const CHECK_COPY = Object.freeze({
    pennOrigin: { title: 'Street access', client: 'Both garages are reached from Pennsylvania Street. No alley or neighbor driveway.' },
    accessoryRear: { title: 'Rear-yard garages', client: 'Detached garages sit about 5′ from the rear lot line, inside the 25′ rear yard — a city-sheet reading, not a permit.' },
    southBuffer: { title: 'North side yard', client: 'The north garage sits 6′ off the north side line. We are not using the 3′ roof-slope exception.' },
    separation: { title: 'Space between buildings', client: 'About 27′ separates the garages from the homes (code minimum for this idea is 6′).' },
    surveyFit: { title: 'On the surveyed lot', client: 'Houses and garages sit inside the Lot 2 survey polygon.' },
    noVariance: { title: 'No rear-yard variance (hypothesis)', client: 'The garage stack occupies the principal rear yard as accessory buildings, not a second 25′ setback.' },
    fourEnclosed: { title: 'Parking count', client: 'Two 20×20 two-car garages — four enclosed stalls.' },
    livingTarget: { title: 'Living area', client: 'Conceptual rooms are about 1,792 SF and 1,944 SF. These are layout studies, not a takeoff.' },
    capacityReserve: { title: 'Two-story capacity', client: 'The plates can hold about 1,872 / 1,918 SF over two floors. Home A is 26′ deep so the driveway clears.' },
    sweptPath: { title: 'SUV turning', client: 'A full-size SUV stays on the lot and reaches each door. Clearance at the south edge is about 1½′ — workable, not generous.' },
    independentDoors: { title: 'Independent doors', client: 'Each garage has its own 16′ door to the local apron. One household does not block the other.' },
  });

  /** Frozen plate / drive / living numbers. Bump GEOM only with a recorded correction. */
  const FINGERPRINT = Object.freeze({
    geom: GEOM,
    garageX: 5,
    garageA_y: 6,
    garageB_y: 28,
    garageW: 20,
    garageD: 20,
    duplexX: 52,
    partyX: 92,
    homeAh: 26,
    homeBh: 22,
    homeBlegH: 4,
    spineY: 37,
    turnX: 74,
    flareX: 44,
    livingA: 1792,
    livingB: 1944,
    capacityA: 1872,
    capacityB: 1918,
    gap: 27,
  });

  const PACKAGE = Object.freeze({
    slug: 'd2',
    html: 'design-2.html',
    navLabel: 'Design 2',
    engineGlobal: 'Lot2Design2',
    designTitle: 'Pondy Flats · Design 2',
  });

  const SHEETS = Object.freeze([
    { no: 'G-001', id: 'cover', title: 'Cover', href: 'design-2.html', file: null, blurb: 'The idea in plain language — this package page.' },
    { no: 'A-001', id: 'site', title: 'Site plan', href: 'd2-site.html', file: 'd2-site-plan.svg', render: 'site', must: ['A-001', '148.00'], blurb: 'Lot, setbacks, homes, garages, and the Pennsylvania driveway.' },
    { no: 'A-101', id: 'ground', title: 'Ground floor', href: 'd2-plans.html', file: 'd2-plan-ground.svg', render: 'ground', must: ['A-101'], blurb: 'Conceptual rooms fitted to the solved plates.' },
    { no: 'A-102', id: 'upper', title: 'Upper floor', href: 'd2-plans.html', file: 'd2-plan-upper.svg', render: 'upper', must: ['A-102'], blurb: 'Bedrooms over the same outlines.' },
    { no: 'A-103', id: 'bubble', title: 'Room diagram', href: 'd2-plans.html', file: 'd2-plan-bubble.svg', render: 'bubble', must: ['A-103'], blurb: 'How rooms connect — topology before the dimensioned plan.' },
    { no: 'A-201', id: 'penn', title: 'Pennsylvania elevation', href: 'd2-elevs.html', file: 'd2-elev-penn.svg', render: 'penn', must: ['A-201'], blurb: 'What you see from the street.' },
    { no: 'A-202', id: 'rear', title: 'Rear elevation', href: 'd2-elevs.html', file: 'd2-elev-rear.svg', render: 'rear', must: ['A-202'], blurb: 'The two garages, looking back toward the homes.' },
    { no: 'A-203', id: 'north', title: 'North elevation', href: 'd2-elevs.html', file: 'd2-elev-north.svg', render: 'north', must: ['A-203'], blurb: 'Long north side — rear left, Pennsylvania right.' },
    { no: 'A-204', id: 'south', title: 'South elevation', href: 'd2-elevs.html', file: 'd2-elev-south.svg', render: 'south', must: ['A-204'], blurb: 'Private-yard side — not a street.' },
    { no: 'A-301', id: 'aa', title: 'Section A-A', href: 'd2-elevs.html', file: 'd2-section-aa.svg', render: 'aa', must: ['A-301'], blurb: 'Cut through the party wall.' },
    { no: 'A-302', id: 'bb', title: 'Section B-B', href: 'd2-elevs.html', file: 'd2-section-bb.svg', render: 'bb', must: ['A-302'], blurb: 'Cut through the garage doors.' },
    { no: 'A-401', id: 'massing', title: 'Architectural massing', href: 'd2-axon.html', file: 'd2-massing.svg', render: 'massing', must: ['A-401', 'SAME CAMERA', 'data-opening="door"', 'data-opening="window"'], blurb: 'Same camera as Design 1 — Pennsylvania near, rear deep. Doors outlined red, windows outlined blue.' },
    { no: 'A-402', id: 'axon', title: 'Axon', href: 'd2-axon.html', file: 'd2-axon-lock-clean.svg', render: 'axon', must: ['A-402', 'PENNSYLVANIA', 'data-lock="east-garage-door"', 'data-opening="door"', '#c34232', '#2a6496'], blurb: 'Same volumes. Every door is outlined red; every window is outlined blue. Garage doors are drawing geometry.' },
  ]);

  const COMPARE = Object.freeze([
    { label: 'Parking', d1: '2 enclosed + 2 covered', d2: '4 enclosed stalls' },
    { label: 'Living area', d1: '1,639 / 1,720 SF', d2: '~1,792 / 1,944 SF' },
    { label: 'Garages', d1: 'Inside the house', d2: 'Detached in the rear yard' },
    { label: 'Status', d1: 'Design complete', d2: 'Concept package' },
  ]);

  /** RPLAN-style semantic fills (muted for paper). Topology coloring only — not a geometry change. */
  const ROOM_FILL = Object.freeze({
    living: '#f3d36a',
    dining: '#e8c04a',
    kitchen: '#e59aaa',
    bed: '#e4ae78',
    bath: '#7eb6d2',
    entry: '#d8d2c6',
    stair: '#cfc8bc',
    corridor: '#ece6dc',
    mech: '#c4c0b8',
    storage: '#b7c6b0',
  });

  const ROOM_LEGEND = Object.freeze([
    { kind: 'living', label: 'Living' },
    { kind: 'dining', label: 'Dining' },
    { kind: 'kitchen', label: 'Kitchen' },
    { kind: 'bed', label: 'Bedroom' },
    { kind: 'bath', label: 'Bath' },
    { kind: 'entry', label: 'Entry' },
    { kind: 'stair', label: 'Stair / hall' },
    { kind: 'mech', label: 'Mech / laundry' },
    { kind: 'storage', label: 'Storage' },
  ]);

  const partyGap = 0.04;

  function homes() {
    const K = LOCK;
    return Object.freeze({
      B: Object.freeze({
        id: 'B', x: K.duplexX, y: 5,
        w: +(K.partyX - K.duplexX - partyGap).toFixed(2), h: 22,
      }),
      Bleg: Object.freeze({
        id: 'Bleg', x: +(K.partyX - 20 - partyGap).toFixed(2), y: 27, w: 20, h: 4,
      }),
      A: Object.freeze({
        id: 'A', x: K.partyX, y: 5, w: +(128 - K.partyX).toFixed(2), h: 26,
      }),
    });
  }

  function garages() {
    const K = LOCK;
    const northY = K.garageSouthY + K.garageD + K.garageGap;
    return Object.freeze({
      A: Object.freeze({
        id: 'A', name: 'GARAGE A', x: K.garageX, y: K.garageSouthY,
        w: K.garageW, h: K.garageD, doorFace: 'E', enclosed: true, spaces: 2,
      }),
      B: Object.freeze({
        id: 'B', name: 'GARAGE B', x: K.garageX, y: northY,
        w: K.garageW, h: K.garageD, doorFace: 'E', enclosed: true, spaces: 2,
      }),
    });
  }

  function mouth() {
    const g = garages();
    return {
      x: g.A.x + g.A.w,
      southY: g.A.y + g.A.h / 2,
      northY: g.B.y + g.B.h / 2,
    };
  }

  function drives() {
    const K = LOCK;
    const m = mouth();
    const penn = 148;
    const accessA = [
      [penn, K.spineY], [K.turnX, K.spineY], [K.flareX, Math.min(36, K.spineY)],
      [m.x + 11, 28], [m.x + 6, 22], [m.x, m.southY],
    ];
    const accessB = [
      [penn, K.spineY], [K.turnX, K.spineY], [K.flareX, K.spineY],
      [m.x + 8, m.northY], [m.x, m.northY],
    ];
    return { accessA, accessB, drive: accessB.slice(0, 3) };
  }

  function asConcept() {
    const H = homes();
    const G = garages();
    const D = drives();
    return {
      id: ID,
      label: 'Design #2 · accessory rear-garage stack',
      role: 'EXPERIMENT · Workbench-proven family · architecture in development',
      group: 'design-2',
      parkingReset: false,
      polygonalSweep: true,
      boundaryClearanceFt: 1.0,
      parkingProgram: {
        name: 'Two detached 20×20 two-car garages',
        spacesTotal: 4,
        spacesEnclosed: 4,
        note: 'Accessory rear stack · independently accessible · Pennsylvania origin',
      },
      units: [
        { name: 'HOME B', id: 'B', x: H.B.x, y: H.B.y, w: H.B.w, h: H.B.h },
        { name: 'HOME B LEG', id: 'Bleg', x: H.Bleg.x, y: H.Bleg.y, w: H.Bleg.w, h: H.Bleg.h },
        { name: 'HOME A', id: 'A', x: H.A.x, y: H.A.y, w: H.A.w, h: H.A.h },
      ],
      reservedPlates: [
        { id: 'B', role: 'rear-L', x: H.B.x, y: H.B.y, w: H.B.w, h: H.B.h },
        { id: 'A', role: 'penn', x: H.A.x, y: H.A.y, w: H.A.w, h: H.A.h },
      ],
      garages: [
        { ...G.A, name: 'GARAGE A · 20×20' },
        { ...G.B, name: 'GARAGE B · 20×20' },
      ],
      drive: D.drive,
      accessPaths: [
        { garage: 'A', path: D.accessA, outbound: D.accessA.slice().reverse(), forwardExit: true },
        { garage: 'B', path: D.accessB, outbound: D.accessB.slice().reverse(), forwardExit: true },
      ],
    };
  }

  function plateSf(h) {
    return Math.round(h.w * h.h);
  }

  function capacity() {
    const H = homes();
    const a = plateSf(H.A) * 2;
    const b = (plateSf(H.B) + plateSf(H.Bleg)) * 2;
    return {
      A: a,
      B: b,
      livingA: Math.round(a * 0.9),
      livingB: Math.round(b * 0.9),
    };
  }

  function garageDuplexGap() {
    const G = garages();
    const H = homes();
    return +(H.B.x - (G.A.x + G.A.w)).toFixed(2);
  }

  function rooms() {
    const H = homes();
    function r(x, y, w, h, name, kind, floor, unit) {
      return {
        x, y, w, h, name, kind, floor, unit,
        sf: Math.round(w * h),
      };
    }
    const A = H.A;
    const B = H.B;
    const Lleg = H.Bleg;
    const groundA = [
      r(A.x, A.y, 12, 8, 'ENTRY A', 'entry', 'ground', 'A'),
      r(A.x + 12, A.y, 8, 8, 'POWDER A', 'bath', 'ground', 'A'),
      r(A.x + 20, A.y, 16, 8, 'KITCHEN A', 'kitchen', 'ground', 'A'),
      r(A.x, A.y + 8, 8, 10, 'STAIR A', 'stair', 'ground', 'A'),
      r(A.x + 8, A.y + 8, 28, 10, 'LIVING A', 'living', 'ground', 'A'),
      r(A.x, A.y + 18, 36, 8, 'DINING A', 'dining', 'ground', 'A'),
    ];
    const upperA = [
      r(A.x, A.y, 8, 12, 'STAIR A', 'stair', 'upper', 'A'),
      r(A.x + 8, A.y, 16, 12, 'BED 1 A', 'bed', 'upper', 'A'),
      r(A.x + 24, A.y, 12, 12, 'BED 2 A', 'bed', 'upper', 'A'),
      r(A.x, A.y + 12, 10, 6, 'HALL A', 'corridor', 'upper', 'A'),
      r(A.x + 10, A.y + 12, 10, 14, 'BATH A', 'bath', 'upper', 'A'),
      r(A.x + 20, A.y + 12, 16, 14, 'BED 3 A', 'bed', 'upper', 'A'),
    ];
    const groundB = [
      r(B.x, B.y, 24, 22, 'LIVING B', 'living', 'ground', 'B'),
      r(B.x + 24, B.y, 16, 14, 'KITCHEN B', 'kitchen', 'ground', 'B'),
      r(B.x + 24, B.y + 14, 8, 8, 'STAIR B', 'stair', 'ground', 'B'),
      r(B.x + 32, B.y + 14, 8, 8, 'ENTRY B', 'entry', 'ground', 'B'),
      r(Lleg.x, Lleg.y, 8, 4, 'MECH B', 'mech', 'ground', 'B'),
      r(Lleg.x + 8, Lleg.y, 12, 4, 'STORAGE B', 'storage', 'ground', 'B'),
    ];
    const upperB = [
      r(B.x, B.y, 8, 12, 'STAIR B', 'stair', 'upper', 'B'),
      r(B.x + 8, B.y, 16, 14, 'BED 1 B', 'bed', 'upper', 'B'),
      r(B.x + 24, B.y, 16, 14, 'BED 2 B', 'bed', 'upper', 'B'),
      r(B.x, B.y + 12, 20, 10, 'BATH B', 'bath', 'upper', 'B'),
      r(B.x + 20, B.y + 14, 20, 8, 'BED 3 B', 'bed', 'upper', 'B'),
      r(Lleg.x, Lleg.y, 20, 4, 'LAUNDRY B', 'mech', 'upper', 'B'),
    ];
    return { groundA, upperA, groundB, upperB, all: [...groundA, ...upperA, ...groundB, ...upperB] };
  }

  function livingFromRooms() {
    const R = rooms();
    const cond = new Set(['living', 'dining', 'bed', 'stair', 'corridor', 'mech', 'storage', 'bath', 'kitchen', 'entry']);
    const sum = (list) => list.filter((x) => cond.has(x.kind)).reduce((s, x) => s + x.sf, 0);
    return { A: sum(R.groundA) + sum(R.upperA), B: sum(R.groundB) + sum(R.upperB) };
  }

  function pointInPoly(x, y, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0]; const yi = poly[i][1];
      const xj = poly[j][0]; const yj = poly[j][1];
      const hit = ((yi > y) !== (yj > y))
        && (x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1e-9) + xi);
      if (hit) inside = !inside;
    }
    return inside;
  }

  function boxInsideSurvey(box, pad = 0) {
    const pts = [
      [box.x + pad, box.y + pad],
      [box.x + box.w - pad, box.y + pad],
      [box.x + box.w - pad, box.y + box.h - pad],
      [box.x + pad, box.y + box.h - pad],
    ];
    return pts.every((p) => pointInPoly(p[0], p[1], SURVEY));
  }

  function proveAccess() {
    if (!Acc || !L.CONCEPTS) {
      return { technical: 'FAIL', reasons: ['Access engine or CONCEPTS missing'] };
    }
    L.CONCEPTS[ID] = asConcept();
    return Acc.analyzeConcept(ID);
  }

  function checks() {
    const H = homes();
    const G = garages();
    const cap = capacity();
    const liv = livingFromRooms();
    const gap = garageDuplexGap();
    const access = proveAccess();
    const gate = LOCK.livingGate;
    const out = {};

    out.pennOrigin = {
      ok: drives().accessA[0][0] >= 147 && drives().accessB[0][0] >= 147,
      detail: 'Both garage paths start at Pennsylvania (x ≈ 148)',
    };
    out.accessoryRear = {
      ok: G.A.x >= LOCK.accessoryRearFt - 0.05,
      detail: `Garage west face x=${G.A.x} · 5′ accessory rear from setbacks-without-alley.pdf`,
    };
    out.southBuffer = {
      ok: G.A.y >= LOCK.actualSouthBufferFt - 0.05,
      detail: `Garage A y=${G.A.y} · held at 6′ actual side buffer, not 3′ exception`,
    };
    out.separation = {
      ok: gap >= LOCK.minGarageDuplexFt,
      detail: `Garage-to-duplex ${gap}′ ≥ 6′ accessory separation`,
    };
    out.surveyFit = {
      ok: [H.A, H.B, H.Bleg, G.A, G.B].every((b) => boxInsideSurvey(b, 0.2)),
      detail: 'Homes and garages inside Lot 2 survey',
    };
    out.noVariance = {
      ok: (G.A.x + G.A.w) <= 25 + 0.05,
      detail: 'Garage stack occupies the 25′ principal rear yard (accessory), not a variance',
    };
    out.fourEnclosed = {
      ok: G.A.spaces + G.B.spaces === 4 && G.A.enclosed && G.B.enclosed,
      detail: 'Two 20×20 two-car detached garages · four enclosed',
    };
    out.livingTarget = {
      ok: liv.A >= gate.min && liv.A <= gate.max && liv.B >= gate.min && liv.B <= gate.max
        && Math.abs(liv.A - liv.B) <= gate.maxDelta,
      detail: `Conceptual rooms A ${liv.A} / B ${liv.B} · target ~${LOCK.livingTarget} · reserve ~${LOCK.capacityReserve}`,
    };
    out.capacityReserve = {
      ok: cap.A >= LOCK.livingTarget && cap.B >= LOCK.livingTarget,
      detail: `Two-story plate capacity A ${cap.A} / B ${cap.B} · 26′ A depth is the south-lane correction from 28′`,
    };
    const techOk = access.technical === 'PASS' || access.technical === 'REVIEW';
    out.sweptPath = {
      ok: techOk && access.technical !== 'FAIL',
      detail: `FS-SUV ${access.technical}${access.reasons && access.reasons[0] ? ' · ' + access.reasons[0] : ''}`,
      technical: access.technical,
      reasons: access.reasons || [],
      minSouthClear: access.minSouthClear,
    };
    out.independentDoors = {
      ok: true,
      detail: 'Each 20′ east face carries a 16′ door to the local apron',
    };

    const fails = Object.entries(out).filter(([, v]) => !v.ok);
    let verdict = 'PASS';
    if (fails.some(([k]) => k === 'sweptPath') && access.technical === 'FAIL') verdict = 'FAIL';
    else if (fails.length) verdict = 'CONDITIONAL';
    else if (access.technical === 'REVIEW') verdict = 'CONDITIONAL';

    return {
      checks: out,
      verdict,
      access,
      living: liv,
      capacity: cap,
      gap,
      homes: H,
      garages: G,
      drives: drives(),
      next: verdict === 'FAIL'
        ? 'Repair circulation (drive / apron) before elevations.'
        : 'Architecture in development · conceptual plans/elevs derived from this lock.',
      client: clientStatus(verdict, access, out.sweptPath),
    };
  }

  function clientStatus(verdict, access, swept) {
    if (verdict === 'FAIL') {
      return {
        badge: 'Needs repair',
        klass: 'fail',
        headline: 'This layout is not ready to share as a working concept.',
        blurb: 'A required check failed. Repair the driveway or apron before treating these drawings as a package.',
      };
    }
    const south = swept && swept.minSouthClear != null
      ? ` About ${Number(swept.minSouthClear).toFixed(2)}′ remains at the south lot edge — workable, not generous.`
      : '';
    return {
      badge: 'Concept package',
      klass: 'cond',
      headline: 'A complete concept you can read. Not construction drawings.',
      blurb: `Two homes face Pennsylvania Street. Two detached two-car garages sit in the rear yard. A full-size SUV can reach each garage from the street and stay on the lot.${south} Architecture is still conceptual — materials and window patterns may change. The 5′ rear garage setback is a reading of the city’s lots-without-alley sheet, not a permit.`,
    };
  }

  function analyze() {
    return checks();
  }

  function fingerprint() {
    const H = homes();
    const G = garages();
    const liv = livingFromRooms();
    const cap = capacity();
    const got = {
      geom: GEOM,
      garageX: G.A.x,
      garageA_y: G.A.y,
      garageB_y: G.B.y,
      garageW: G.A.w,
      garageD: G.A.h,
      duplexX: H.B.x,
      partyX: LOCK.partyX,
      homeAh: H.A.h,
      homeBh: H.B.h,
      homeBlegH: H.Bleg.h,
      spineY: LOCK.spineY,
      turnX: LOCK.turnX,
      flareX: LOCK.flareX,
      livingA: liv.A,
      livingB: liv.B,
      capacityA: cap.A,
      capacityB: cap.B,
      gap: garageDuplexGap(),
    };
    const misses = Object.keys(FINGERPRINT).filter((k) => got[k] !== FINGERPRINT[k]);
    return { ok: misses.length === 0, geom: GEOM, misses, expected: FINGERPRINT, got };
  }

  function renderNamed(name) {
    if (name === 'site') return renderSite();
    if (name === 'ground') return renderFloor('ground');
    if (name === 'upper') return renderFloor('upper');
    if (name === 'bubble') return renderBubble();
    if (name === 'penn' || name === 'rear' || name === 'north' || name === 'south') return renderElev(name);
    if (name === 'aa' || name === 'bb') return renderSection(name);
    if (name === 'massing') return renderMassing();
    if (name === 'axon') return renderAxon('axon');
    return '';
  }

  function svgBase(w, h) {
    const poly = SURVEY.map((p) => p.join(',')).join(' ');
    return { w, h, poly, sx: (x) => x, sy: (y) => y };
  }

  function pathD(pts) {
    return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  }

  function northArrow(cx, cy, r = 5.4) {
    return `<g transform="translate(${cx},${cy})" aria-label="North points left">
      <circle r="${r}" fill="#fff" stroke="#0d1b33" stroke-width=".4"/>
      <polygon points="${-r * 0.82},0 ${r * 0.32},${-r * 0.44} ${r * 0.08},0 ${r * 0.32},${r * 0.44}" fill="#0d1b33"/>
      <text x="${r * 0.72}" y="${r * 0.22}" font-size="${r * 0.46}" font-weight="800" fill="#0d1b33">N</text>
    </g>`;
  }

  function dimH(x0, x1, y, label) {
    const m = (x0 + x1) / 2;
    return `<g stroke="#0d1b33" fill="#0d1b33">
      <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke-width=".22"/>
      <line x1="${x0}" y1="${y - 1.3}" x2="${x0}" y2="${y + 1.3}" stroke-width=".32"/>
      <line x1="${x1}" y1="${y - 1.3}" x2="${x1}" y2="${y + 1.3}" stroke-width=".32"/>
      <text x="${m}" y="${y - 1.7}" font-size="2.15" font-weight="800" text-anchor="middle" stroke="none">${label}</text>
    </g>`;
  }

  function dimV(x, y0, y1, label) {
    const m = (y0 + y1) / 2;
    return `<g stroke="#0d1b33" fill="#0d1b33">
      <line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke-width=".22"/>
      <line x1="${x - 1.3}" y1="${y0}" x2="${x + 1.3}" y2="${y0}" stroke-width=".32"/>
      <line x1="${x - 1.3}" y1="${y1}" x2="${x + 1.3}" y2="${y1}" stroke-width=".32"/>
      <text x="${x + 2.1}" y="${m + 0.7}" font-size="2.15" font-weight="800" stroke="none">${label}</text>
    </g>`;
  }

  function planTitleBar(x, y, w, h, no, title) {
    return `<g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#efe8dc" stroke="#cfc8be" stroke-width=".28"/>
      <text x="${x + 3.2}" y="${y + h * 0.68}" font-size="2.7" font-weight="800" fill="#0d1b33">${no}</text>
      <text x="${x + w / 2}" y="${y + h * 0.68}" font-size="2.7" font-weight="800" text-anchor="middle" fill="#0d1b33">${title}</text>
      <text x="${x + w - 3.2}" y="${y + h * 0.68}" font-size="2.2" text-anchor="end" fill="#92702e">CONCEPTUAL · ${REV}</text>
    </g>`;
  }

  function roomLabel(rm) {
    const short = {
      'MECH B': 'MECH', 'STORAGE B': 'STOR', 'LAUNDRY B': 'LAUNDRY',
      'HALL A': 'HALL', 'POWDER A': 'PWD', 'ENTRY A': 'ENTRY', 'ENTRY B': 'ENTRY',
      'STAIR A': 'STAIR', 'STAIR B': 'STAIR',
    };
    const name = short[rm.name] || rm.name.replace(/ [AB]$/, '');
    const cx = rm.x + rm.w / 2;
    const cy = rm.y + rm.h / 2;
    if (rm.h < 5.6 || rm.w < 7.5) {
      const fs = Math.min(1.7, Math.max(1.35, Math.min(rm.w, rm.h) * 0.32));
      return `<text x="${cx}" y="${cy + 0.55}" font-size="${fs}" font-weight="800" text-anchor="middle">${name}</text>`;
    }
    return `<text x="${cx}" y="${cy - 0.35}" font-size="1.85" font-weight="800" text-anchor="middle">${name}</text>
      <text x="${cx}" y="${cy + 2.05}" font-size="1.4" text-anchor="middle" fill="#5a6570">${rm.w}×${rm.h}</text>`;
  }

  function roomFill(rm) {
    return ROOM_FILL[rm.kind] || '#fff8ea';
  }

  function shareEdge(a, b) {
    const e = 0.12;
    const ov = (a0, a1, b0, b1) => Math.min(a1, b1) - Math.max(a0, b0);
    if (Math.abs(a.x - (b.x + b.w)) < e) {
      const len = ov(a.y, a.y + a.h, b.y, b.y + b.h);
      if (len > 2) return { type: 'v', x: a.x, y: Math.max(a.y, b.y), len };
    }
    if (Math.abs((a.x + a.w) - b.x) < e) {
      const len = ov(a.y, a.y + a.h, b.y, b.y + b.h);
      if (len > 2) return { type: 'v', x: b.x, y: Math.max(a.y, b.y), len };
    }
    if (Math.abs(a.y - (b.y + b.h)) < e) {
      const len = ov(a.x, a.x + a.w, b.x, b.x + b.w);
      if (len > 2) return { type: 'h', y: a.y, x: Math.max(a.x, b.x), len };
    }
    if (Math.abs((a.y + a.h) - b.y) < e) {
      const len = ov(a.x, a.x + a.w, b.x, b.x + b.w);
      if (len > 2) return { type: 'h', y: b.y, x: Math.max(a.x, b.x), len };
    }
    return null;
  }

  function doorMarks(list) {
    const out = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i].unit !== list[j].unit) continue;
        const edge = shareEdge(list[i], list[j]);
        if (!edge || edge.len < 4) continue;
        const opening = Math.min(2.6, edge.len - 1.1);
        if (edge.type === 'v') {
          const y0 = edge.y + (edge.len - opening) / 2;
          out.push(`<rect x="${edge.x - 0.42}" y="${y0}" width="0.84" height="${opening}" fill="#fff"/>`);
        } else {
          const x0 = edge.x + (edge.len - opening) / 2;
          out.push(`<rect x="${x0}" y="${edge.y - 0.42}" width="${opening}" height="0.84" fill="#fff"/>`);
        }
      }
    }
    return out.join('');
  }

  function bubbleEdges(list, sx, sy) {
    const lines = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (!shareEdge(list[i], list[j])) continue;
        const a = list[i];
        const b = list[j];
        lines.push(`<line x1="${sx(a.x + a.w / 2)}" y1="${sy(a.y + a.h / 2)}" x2="${sx(b.x + b.w / 2)}" y2="${sy(b.y + b.h / 2)}" stroke="#0d1b33" stroke-width=".45" opacity=".55"/>`);
      }
    }
    return lines.join('');
  }

  function bubbleName(rm) {
    const map = {
      'ENTRY A': 'Entry', 'ENTRY B': 'Entry',
      'POWDER A': 'Bath',
      'KITCHEN A': 'Kit', 'KITCHEN B': 'Kit',
      'STAIR A': 'Stair', 'STAIR B': 'Stair',
      'LIVING A': 'Liv', 'LIVING B': 'Liv',
      'DINING A': 'Din',
      'BED 1 A': 'Bed1', 'BED 2 A': 'Bed2', 'BED 3 A': 'Bed3',
      'BED 1 B': 'Bed1', 'BED 2 B': 'Bed2', 'BED 3 B': 'Bed3',
      'HALL A': 'Hall',
      'BATH A': 'Bath', 'BATH B': 'Bath',
      'MECH B': 'Mech', 'STORAGE B': 'Stor', 'LAUNDRY B': 'Wash',
    };
    return map[rm.name] || rm.name.replace(/ [AB]$/, '');
  }

  function bubblePanel(list, ox, oy, pw, ph, title) {
    const minx = Math.min(...list.map((r) => r.x));
    const miny = Math.min(...list.map((r) => r.y));
    const maxx = Math.max(...list.map((r) => r.x + r.w));
    const maxy = Math.max(...list.map((r) => r.y + r.h));
    const pad = 7;
    const scale = Math.min((pw - pad * 2) / Math.max(maxx - minx, 1), (ph - pad * 2 - 6) / Math.max(maxy - miny, 1));
    const sx = (x) => ox + pad + (x - minx) * scale;
    const sy = (y) => oy + pad + 6 + (y - miny) * scale;
    const ghosts = list.map((rm) =>
      `<rect x="${sx(rm.x)}" y="${sy(rm.y)}" width="${rm.w * scale}" height="${rm.h * scale}" fill="${roomFill(rm)}" fill-opacity=".2" stroke="#0d1b33" stroke-width=".18" stroke-opacity=".28"/>`).join('');
    const nodes = list.map((rm) => {
      const cx = sx(rm.x + rm.w / 2);
      const cy = sy(rm.y + rm.h / 2);
      const rad = Math.max(3.4, Math.min(7.6, 2.2 + Math.sqrt(rm.sf) * 0.2));
      return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${roomFill(rm)}" stroke="#0d1b33" stroke-width=".42"/>
        <text x="${cx}" y="${cy + 0.72}" font-size="1.95" font-weight="800" text-anchor="middle">${bubbleName(rm)}</text>`;
    }).join('');
    return `<g>
      <rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="#fbfaf6" stroke="#cfc8be" stroke-width=".35" rx="2"/>
      <text x="${ox + pw / 2}" y="${oy + 5.2}" font-size="2.6" font-weight="800" text-anchor="middle" fill="#0d1b33">${title}</text>
      ${ghosts}
      ${bubbleEdges(list, sx, sy)}
      ${nodes}
    </g>`;
  }

  function renderBubble() {
    const R = rooms();
    const legend = ROOM_LEGEND.map((item, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const x = 10 + col * 58;
      const y = 7.2 + row * 5.5;
      return `<rect x="${x}" y="${y}" width="4" height="4" fill="${ROOM_FILL[item.kind]}" stroke="#0d1b33" stroke-width=".25"/>
        <text x="${x + 5}" y="${y + 3.2}" font-size="2.2" fill="#0d1b33">${item.label}</text>`;
    }).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 168" font-family="ui-sans-serif,system-ui,sans-serif">
      <rect width="300" height="168" fill="#f4f1ea"/>
      <text x="150" y="6.2" font-size="3.2" text-anchor="middle" fill="#5a6570">Topology first · a link means rooms share a wall · same plates as A-101 / A-102 · not a generated layout</text>
      ${legend}
      ${bubblePanel(R.groundB, 6, 19, 144, 64, 'Home B · ground')}
      ${bubblePanel(R.groundA, 152, 19, 142, 64, 'Home A · ground')}
      ${bubblePanel(R.upperB, 6, 85, 144, 64, 'Home B · upper')}
      ${bubblePanel(R.upperA, 152, 85, 142, 64, 'Home A · upper')}
      <rect x="0" y="152" width="300" height="16" fill="#efe8dc" stroke="#cfc8be" stroke-width=".5"/>
      <text x="8" y="162.6" font-size="5.1" font-weight="800" fill="#0d1b33">A-103</text>
      <text x="150" y="162.6" font-size="5.1" font-weight="800" text-anchor="middle" fill="#0d1b33">Room diagram · how the homes connect</text>
      <text x="292" y="162.6" font-size="4.1" text-anchor="end" fill="#92702e">CONCEPTUAL · ${REV}</text>
    </svg>`;
  }

  function renderSite() {
    const H = homes();
    const G = garages();
    const D = drives();
    const gate = checks();
    const prin = '25,5 128,5 128,33.43 126.64,33.016 83.99,33.016 25,42.75';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -14 192 96" font-family="ui-sans-serif,system-ui,sans-serif">
      <rect x="-16" y="-14" width="192" height="96" fill="#f4f1ea"/>
      ${dimH(0, 148, -7.2, '148.00′ DEPTH')}
      ${dimV(154.5, 0, 50, '50.00′')}
      <polygon points="${SURVEY.map((p) => p.join(',')).join(' ')}" fill="#fbfaf6" stroke="#0d1b33" stroke-width=".7"/>
      <polygon points="${prin}" fill="none" stroke="#d79b36" stroke-width=".35" stroke-dasharray="2 1.4"/>
      <rect x="5" y="5" width="20" height="47" fill="none" stroke="#6a8f5a" stroke-width=".35" stroke-dasharray="1.6 1.2"/>
      <rect x="${G.A.x}" y="${G.A.y}" width="${G.A.w}" height="${G.A.h}" fill="#6c9b68" stroke="#284426" stroke-width=".45"/>
      <rect x="${G.B.x}" y="${G.B.y}" width="${G.B.w}" height="${G.B.h}" fill="#6c9b68" stroke="#284426" stroke-width=".45"/>
      <rect x="${H.B.x}" y="${H.B.y}" width="${H.B.w}" height="${H.B.h}" fill="#e5bd78" stroke="#6d4d27" stroke-width=".45"/>
      <rect x="${H.Bleg.x}" y="${H.Bleg.y}" width="${H.Bleg.w}" height="${H.Bleg.h}" fill="#e5bd78" stroke="#6d4d27" stroke-width=".45"/>
      <rect x="${H.A.x}" y="${H.A.y}" width="${H.A.w}" height="${H.A.h}" fill="#dca766" stroke="#6d4d27" stroke-width=".45"/>
      <line x1="${LOCK.partyX}" y1="5" x2="${LOCK.partyX}" y2="31" stroke="#a43c30" stroke-width="1"/>
      <path d="${pathD(D.accessA)}" fill="none" stroke="#7d8587" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
      <path d="${pathD(D.accessB)}" fill="none" stroke="#5a6163" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>
      <text x="15" y="14.6" font-size="2.15" font-weight="800" text-anchor="middle">GARAGE A</text>
      <text x="15" y="17.2" font-size="1.7" text-anchor="middle" fill="#284426">NORTH</text>
      <text x="15" y="36.4" font-size="2.15" font-weight="800" text-anchor="middle">GARAGE B</text>
      <text x="15" y="39" font-size="1.7" text-anchor="middle" fill="#284426">SOUTH</text>
      <text x="72" y="16" font-size="2.7" font-weight="800" text-anchor="middle">HOME B</text>
      <text x="82" y="31" font-size="2" font-weight="800" text-anchor="middle">L LEG</text>
      <text x="110" y="18.5" font-size="2.7" font-weight="800" text-anchor="middle">HOME A</text>
      <text x="94.4" y="29.6" font-size="1.85" font-weight="800" fill="#a43c30">PARTY</text>
      <text x="142" y="26" font-size="2.15" font-weight="800" fill="#0d1b33" text-anchor="middle" transform="rotate(90 142 26)">PENNSYLVANIA</text>
      <text x="40" y="50.4" font-size="2" font-weight="700" fill="#0d1b33">${gate.gap}′ between garages and homes</text>
      ${northArrow(-7.5, 28, 5.6)}
      ${scaleBar(98, 56)}
      ${planTitleBar(-16, 74, 192, 8, 'A-001', 'Site plan · Pennsylvania is the right / front edge')}
    </svg>`;
  }

  function renderFloor(floor) {
    const R = rooms();
    const upper = floor === 'upper';
    const list = upper ? [...R.upperA, ...R.upperB] : [...R.groundA, ...R.groundB];
    const G = garages();
    const no = upper ? 'A-102' : 'A-101';
    const title = upper ? 'Upper floor · conceptual rooms on the solved plates' : 'Ground floor · conceptual rooms on the solved plates';
    const boxes = list.map((rm) => `
      <rect x="${rm.x}" y="${rm.y}" width="${rm.w}" height="${rm.h}" fill="${roomFill(rm)}" stroke="#0d1b33" stroke-width=".32"/>
      ${roomLabel(rm)}`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -14 192 96" font-family="ui-sans-serif,system-ui,sans-serif">
      <rect x="-16" y="-14" width="192" height="96" fill="#f4f1ea"/>
      <polygon points="${SURVEY.map((p) => p.join(',')).join(' ')}" fill="#fbfaf6" stroke="#0d1b33" stroke-width=".6"/>
      <rect x="${G.A.x}" y="${G.A.y}" width="${G.A.w}" height="${G.A.h}" fill="#d7e3d6" stroke="#416145" stroke-width=".35"/>
      <rect x="${G.B.x}" y="${G.B.y}" width="${G.B.w}" height="${G.B.h}" fill="#d7e3d6" stroke="#416145" stroke-width=".35"/>
      <text x="15" y="16.2" font-size="2.1" font-weight="800" text-anchor="middle" fill="#284426">GAR. A</text>
      <text x="15" y="38.4" font-size="2.1" font-weight="800" text-anchor="middle" fill="#284426">GAR. B</text>
      ${boxes}
      ${doorMarks(list)}
      <line x1="${LOCK.partyX}" y1="5" x2="${LOCK.partyX}" y2="31" stroke="#a43c30" stroke-width=".8"/>
      <text x="142" y="26" font-size="2" font-weight="800" fill="#0d1b33" text-anchor="middle" transform="rotate(90 142 26)">PENN →</text>
      ${northArrow(-7.5, 28, 5.2)}
      ${ROOM_LEGEND.map((item, i) => {
        const xx = -12 + i * 18.6;
        const short = { living: 'Liv', dining: 'Din', kitchen: 'Kit', bed: 'Bed', bath: 'Bath', entry: 'Entry', stair: 'Stair', mech: 'Mech', storage: 'Stor' }[item.kind] || item.label;
        return `<rect x="${xx}" y="66.2" width="3" height="3" fill="${ROOM_FILL[item.kind]}" stroke="#0d1b33" stroke-width=".18"/>
          <text x="${xx + 3.6}" y="68.7" font-size="1.65" fill="#0d1b33">${short}</text>`;
      }).join('')}
      ${planTitleBar(-16, 74, 192, 8, no, title)}
    </svg>`;
  }

  function szAt(grade, scale, z) {
    return grade - z * scale;
  }

  function winPane(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#c5d6e8" stroke="#3a5068" stroke-width=".55"/>
      <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="#3a5068" stroke-width=".35"/>
      <line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="#3a5068" stroke-width=".28"/>`;
  }

  function entryDoor(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5c4a32" stroke="#3d2a1c" stroke-width=".55"/>
      <rect x="${x + w * 0.18}" y="${y + h * 0.12}" width="${w * 0.28}" height="${h * 0.38}" fill="#c5d6e8" stroke="#3a5068" stroke-width=".28"/>
      <rect x="${x + w * 0.54}" y="${y + h * 0.12}" width="${w * 0.28}" height="${h * 0.38}" fill="#c5d6e8" stroke="#3a5068" stroke-width=".28"/>
      <circle cx="${x + w * 0.82}" cy="${y + h * 0.55}" r="${Math.max(0.7, w * 0.06)}" fill="#d4c4a0"/>`;
  }

  function scaleBar(x, y) {
    return `<g stroke="#0d1b33" fill="#0d1b33">
      <line x1="${x}" y1="${y}" x2="${x + 40}" y2="${y}" stroke-width=".32"/>
      <line x1="${x}" y1="${y - 1.4}" x2="${x}" y2="${y + 1.4}" stroke-width=".32"/>
      <line x1="${x + 20}" y1="${y - 1}" x2="${x + 20}" y2="${y + 1}" stroke-width=".28"/>
      <line x1="${x + 40}" y1="${y - 1.4}" x2="${x + 40}" y2="${y + 1.4}" stroke-width=".32"/>
      <text x="${x}" y="${y + 3.4}" font-size="1.7" text-anchor="middle" stroke="none">0</text>
      <text x="${x + 20}" y="${y + 3.4}" font-size="1.7" text-anchor="middle" stroke="none">20</text>
      <text x="${x + 40}" y="${y + 3.4}" font-size="1.7" text-anchor="middle" stroke="none">40′</text>
    </g>`;
  }

  function gableMass(x0, x1, grade, scale, zTop, ridge, wall, roof) {
    const sz = (z) => szAt(grade, scale, z);
    const xm = (x0 + x1) / 2;
    return `<rect x="${x0}" y="${sz(zTop)}" width="${x1 - x0}" height="${sz(0) - sz(zTop)}" fill="${wall}" stroke="#5c4a32" stroke-width=".7"/>
      <polygon points="${x0},${sz(zTop)} ${xm},${sz(ridge)} ${x1},${sz(zTop)}" fill="${roof}" stroke="#3d2a1c" stroke-width=".7"/>`;
  }

  function garageMass(x0, x1, grade, scale, eave, ridge, wall, roof) {
    const sz = (z) => szAt(grade, scale, z);
    const xm = (x0 + x1) / 2;
    return `<rect x="${x0}" y="${sz(eave)}" width="${x1 - x0}" height="${sz(0) - sz(eave)}" fill="${wall}" stroke="#284426" stroke-width=".7"/>
      <polygon points="${x0},${sz(eave)} ${xm},${sz(ridge)} ${x1},${sz(eave)}" fill="${roof}" stroke="#1e2e1c" stroke-width=".7"/>`;
  }

  function elevWrap(w, h, no, title, inner) {
    const bar = 16;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" font-family="ui-sans-serif,system-ui,sans-serif">
      <rect width="${w}" height="${h}" fill="#f4f1ea"/>
      ${inner}
      <rect x="0" y="${h - bar}" width="${w}" height="${bar}" fill="#efe8dc" stroke="#cfc8be" stroke-width=".5"/>
      <text x="8" y="${h - 5.4}" font-size="5.1" font-weight="800" fill="#0d1b33">${no}</text>
      <text x="${w / 2}" y="${h - 5.4}" font-size="5.1" font-weight="800" text-anchor="middle" fill="#0d1b33">${title}</text>
      <text x="${w - 8}" y="${h - 5.4}" font-size="4.1" text-anchor="end" fill="#92702e">CONCEPTUAL · ${REV}</text>
    </svg>`;
  }

  function renderElevPenn() {
    const H = homes();
    const K = LOCK;
    const S = 3.2;
    const OX = 28;
    const grade = 128;
    const sx = (y) => OX + y * S;
    const sz = (z) => szAt(grade, S, z);
    const y0 = H.A.y;
    const y1 = H.A.y + H.A.h;
    const x0 = sx(y0);
    const x1 = sx(y1);
    const stoneH = sz(0) - sz(K.stone);
    const gWin = S * 5.5;
    const uWin = S * 5;
    return elevWrap(248, 152, 'A-201', 'Pennsylvania · looking west at Home A', `
      <text x="124" y="14" font-size="4.2" text-anchor="middle" fill="#5a6570">Street face · north is left · no garage on this wall · Home A is ${H.A.h}′ deep</text>
      <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(50)}" y2="${sz(0)}" stroke="#0d1b33" stroke-width="1.2"/>
      ${gableMass(x0, x1, grade, S, K.zTop, K.ridgeA, '#e4d3b4', '#6a5340')}
      <rect x="${x0}" y="${sz(K.stone)}" width="${x1 - x0}" height="${stoneH}" fill="#8a8070" fill-opacity=".55" stroke="#5c5548" stroke-width=".45"/>
      ${winPane(sx(y0 + 3.2), sz(8), gWin, S * 5.2)}
      ${winPane(sx(y1 - 8.8), sz(8), gWin, S * 5.2)}
      ${entryDoor(sx((y0 + y1) / 2) - S * 1.6, sz(8), S * 3.2, sz(0) - sz(8))}
      ${winPane(sx(y0 + 3.2), sz(17.5), uWin, S * 4.6)}
      ${winPane(sx(y1 - 8.4), sz(17.5), uWin, S * 4.6)}
      <text x="${sx((y0 + y1) / 2)}" y="${sz(K.ridgeA) - 3}" font-size="4.4" font-weight="800" text-anchor="middle">A · ${K.ridgeA.toFixed(1)}′ RIDGE</text>
      <text x="${sx(0) + 2}" y="${sz(0) + 8}" font-size="4" font-weight="800">N</text>
      <text x="${sx(50) - 2}" y="${sz(0) + 8}" font-size="4" font-weight="800" text-anchor="end">S · 50′ FRONTAGE</text>
      <text x="${sx(y0) - 2}" y="${sz(K.zTop) + 10}" font-size="3.6" text-anchor="end" fill="#5a6570">20.5′ eave</text>
    `);
  }

  function renderElevRear() {
    const H = homes();
    const G = garages();
    const K = LOCK;
    const S = 3.1;
    const OX = 22;
    const grade = 128;
    const sx = (y) => OX + y * S;
    const sz = (z) => szAt(grade, S, z);
    const gA0 = sx(G.A.y);
    const gA1 = sx(G.A.y + G.A.h);
    const gB0 = sx(G.B.y);
    const gB1 = sx(G.B.y + G.B.h);
    const b0 = sx(H.B.y);
    const b1 = sx(H.B.y + H.B.h);
    return elevWrap(248, 152, 'A-202', 'Rear · looking east at the two garages', `
      <text x="124" y="14" font-size="4.2" text-anchor="middle" fill="#5a6570">North is left · two 20×20 accessory garages in front · homes beyond</text>
      <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(50)}" y2="${sz(0)}" stroke="#0d1b33" stroke-width="1.2"/>
      ${gableMass(b0, b1, grade, S, K.zTop, K.ridgeB, '#e5bd78', '#6a5340')}
      ${garageMass(gA0, gA1, grade, S, K.garageHeightFt, K.garageRidge, '#8fba88', '#4a5c45')}
      ${garageMass(gB0, gB1, grade, S, K.garageHeightFt, K.garageRidge, '#7eaa78', '#4a5c45')}
      ${winPane((gA0 + gA1) / 2 - 5, sz(11), 10, S * 2.4)}
      ${winPane((gB0 + gB1) / 2 - 5, sz(11), 10, S * 2.4)}
      <text x="${(gA0 + gA1) / 2}" y="${sz(K.garageRidge) - 2.5}" font-size="3.8" font-weight="800" text-anchor="middle">GAR. A · N</text>
      <text x="${(gB0 + gB1) / 2}" y="${sz(K.garageRidge) - 2.5}" font-size="3.8" font-weight="800" text-anchor="middle">GAR. B · S</text>
      <text x="${sx(0) + 2}" y="${sz(0) + 8}" font-size="4" font-weight="800">N</text>
      <text x="${sx(50) - 2}" y="${sz(0) + 8}" font-size="4" font-weight="800" text-anchor="end">S</text>
    `);
  }

  function renderElevNorth() {
    const H = homes();
    const G = garages();
    const K = LOCK;
    const S = 1.85;
    const OX = 18;
    const grade = 108;
    const sx = (x) => OX + x * S;
    const sz = (z) => szAt(grade, S, z);
    return elevWrap(300, 148, 'A-203', 'North · looking south · Pennsylvania at right', `
      <text x="150" y="14" font-size="4.2" text-anchor="middle" fill="#5a6570">West / rear is left · the north garage and both homes · 5′ side yard</text>
      <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(148)}" y2="${sz(0)}" stroke="#0d1b33" stroke-width="1.1"/>
      ${garageMass(sx(G.A.x), sx(G.A.x + G.A.w), grade, S, K.garageHeightFt, K.garageRidge, '#8fba88', '#4a5c45')}
      ${gableMass(sx(H.B.x), sx(H.B.x + H.B.w), grade, S, K.zTop, K.ridgeB, '#e5bd78', '#6a5340')}
      ${gableMass(sx(H.A.x), sx(H.A.x + H.A.w), grade, S, K.zTop, K.ridgeA, '#dca766', '#6a5340')}
      ${winPane(sx(H.B.x + 8), sz(8), S * 8, S * 5)}
      ${winPane(sx(H.A.x + 10), sz(8), S * 8, S * 5)}
      ${winPane(sx(H.B.x + 8), sz(17.5), S * 7, S * 4.4)}
      ${winPane(sx(H.A.x + 10), sz(17.5), S * 7, S * 4.4)}
      <line x1="${sx(K.partyX)}" y1="${sz(0)}" x2="${sx(K.partyX)}" y2="${sz(K.zTop)}" stroke="#a43c30" stroke-width=".9"/>
      <text x="${sx(15)}" y="${sz(K.garageRidge) - 2}" font-size="3.6" font-weight="800" text-anchor="middle">G</text>
      <text x="${sx(H.B.x + H.B.w / 2)}" y="${sz(K.ridgeB) - 2}" font-size="3.8" font-weight="800" text-anchor="middle">B ${K.ridgeB.toFixed(1)}′</text>
      <text x="${sx(H.A.x + H.A.w / 2)}" y="${sz(K.ridgeA) - 2}" font-size="3.8" font-weight="800" text-anchor="middle">A ${K.ridgeA.toFixed(1)}′</text>
      <text x="${sx(0) + 2}" y="${sz(0) + 8}" font-size="3.8" font-weight="800">W / REAR</text>
      <text x="${sx(148) - 2}" y="${sz(0) + 8}" font-size="3.8" font-weight="800" text-anchor="end">PENN →</text>
    `);
  }

  function renderElevSouth() {
    const H = homes();
    const G = garages();
    const K = LOCK;
    const S = 1.85;
    const OX = 18;
    const grade = 108;
    const sx = (x) => OX + (148 - x) * S;
    const sz = (z) => szAt(grade, S, z);
    const a0 = sx(H.A.x + H.A.w);
    const a1 = sx(H.A.x);
    const leg0 = sx(H.Bleg.x + H.Bleg.w);
    const leg1 = sx(H.Bleg.x);
    const g0 = sx(G.B.x + G.B.w);
    const g1 = sx(G.B.x);
    return elevWrap(300, 148, 'A-204', 'South · looking north · Pennsylvania at left', `
      <text x="150" y="14" font-size="4.2" text-anchor="middle" fill="#5a6570">Private-yard face · not a street · Home A and the south garage</text>
      <line x1="${sx(148)}" y1="${sz(0)}" x2="${sx(0)}" y2="${sz(0)}" stroke="#0d1b33" stroke-width="1.1"/>
      ${gableMass(Math.min(a0, a1), Math.max(a0, a1), grade, S, K.zTop, K.ridgeA, '#dca766', '#6a5340')}
      <rect x="${Math.min(leg0, leg1)}" y="${sz(K.storyGround)}" width="${Math.abs(leg1 - leg0)}" height="${sz(0) - sz(K.storyGround)}" fill="#e5bd78" stroke="#5c4a32" stroke-width=".7"/>
      ${garageMass(Math.min(g0, g1), Math.max(g0, g1), grade, S, K.garageHeightFt, K.garageRidge, '#8fba88', '#4a5c45')}
      ${winPane((a0 + a1) / 2 - S * 6, sz(8), S * 12, S * 5.2)}
      ${winPane((a0 + a1) / 2 - S * 5, sz(17.5), S * 10, S * 4.4)}
      <text x="${(a0 + a1) / 2}" y="${sz(K.ridgeA) - 2}" font-size="3.8" font-weight="800" text-anchor="middle">HOME A</text>
      <text x="${sx(148) + 2}" y="${sz(0) + 8}" font-size="3.8" font-weight="800">← PENN</text>
      <text x="${sx(0) - 2}" y="${sz(0) + 8}" font-size="3.8" font-weight="800" text-anchor="end">W / REAR</text>
    `);
  }

  function renderElev(which) {
    if (which === 'rear') return renderElevRear();
    if (which === 'north') return renderElevNorth();
    if (which === 'south') return renderElevSouth();
    return renderElevPenn();
  }

  function renderSection(which) {
    const H = homes();
    const G = garages();
    const K = LOCK;
    const S = 2.15;
    const OX = 22;
    const grade = 122;
    const sz = (z) => szAt(grade, S, z);
    if (which === 'bb') {
      const sx = (y) => OX + y * S;
      const door = 16;
      const mouthA = G.A.y + (G.A.h - door) / 2;
      const mouthB = G.B.y + (G.B.h - door) / 2;
      return elevWrap(300, 148, 'A-302', 'Section B-B · looking west at the garage doors', `
        <text x="150" y="14" font-size="4.2" text-anchor="middle" fill="#5a6570">Cut through the apron · 16′ doors on the east garage faces · homes ${K.duplexX - (G.A.x + G.A.w)}′ beyond</text>
        <line x1="${sx(0)}" y1="${sz(0)}" x2="${sx(57)}" y2="${sz(0)}" stroke="#0d1b33" stroke-width="1.2"/>
        ${gableMass(sx(H.B.y), sx(H.B.y + H.B.h), grade, S, K.zTop, K.ridgeB, '#e5bd78', '#6a5340')}
        ${garageMass(sx(G.A.y), sx(G.A.y + G.A.h), grade, S, K.garageHeightFt, K.garageRidge, '#8fba88', '#4a5c45')}
        ${garageMass(sx(G.B.y), sx(G.B.y + G.B.h), grade, S, K.garageHeightFt, K.garageRidge, '#7eaa78', '#4a5c45')}
        <rect x="${sx(mouthA)}" y="${sz(K.storyGround - 2.5)}" width="${door * S}" height="${sz(0) - sz(K.storyGround - 2.5)}" fill="#1c2228" stroke="#c45c4a" stroke-width=".8"/>
        <rect x="${sx(mouthB)}" y="${sz(K.storyGround - 2.5)}" width="${door * S}" height="${sz(0) - sz(K.storyGround - 2.5)}" fill="#1c2228" stroke="#c45c4a" stroke-width=".8"/>
        <text x="${sx(G.A.y + G.A.h / 2)}" y="${sz(4)}" font-size="3.4" font-weight="800" fill="#efb34d" text-anchor="middle">16′ DOOR A</text>
        <text x="${sx(G.B.y + G.B.h / 2)}" y="${sz(4)}" font-size="3.4" font-weight="800" fill="#efb34d" text-anchor="middle">16′ DOOR B</text>
      `);
    }
    const sx = (x) => OX + (x - 48) * S;
    return elevWrap(300, 148, 'A-301', 'Section A-A · looking north at the party wall', `
      <text x="150" y="14" font-size="4.2" text-anchor="middle" fill="#5a6570">Home B is left of the red line · Home A is right · Pennsylvania is farther right</text>
      <line x1="${sx(48)}" y1="${sz(0)}" x2="${sx(132)}" y2="${sz(0)}" stroke="#0d1b33" stroke-width="1.2"/>
      ${gableMass(sx(H.B.x), sx(H.B.x + H.B.w), grade, S, K.zTop, K.ridgeB, '#e5bd78', '#6a5340')}
      ${gableMass(sx(H.A.x), sx(H.A.x + H.A.w), grade, S, K.zTop, K.ridgeA, '#dca766', '#6a5340')}
      <line x1="${sx(K.partyX)}" y1="${sz(0)}" x2="${sx(K.partyX)}" y2="${sz(K.zTop)}" stroke="#a43c30" stroke-width="1.2"/>
      <rect x="${sx(H.B.x + 4)}" y="${sz(K.storyGround)}" width="${S * 0.9}" height="${sz(0) - sz(K.storyGround)}" fill="#cfc6b6" stroke="#5c4a32" stroke-width=".4"/>
      <rect x="${sx(H.A.x + 2)}" y="${sz(K.storyGround)}" width="${S * 0.9}" height="${sz(0) - sz(K.storyGround)}" fill="#cfc6b6" stroke="#5c4a32" stroke-width=".4"/>
      <text x="${sx(H.B.x + H.B.w / 2)}" y="${sz(K.ridgeB) - 2}" font-size="4" font-weight="800" text-anchor="middle">B ${K.ridgeB.toFixed(1)}′</text>
      <text x="${sx(H.A.x + H.A.w / 2)}" y="${sz(K.ridgeA) - 2}" font-size="4" font-weight="800" text-anchor="middle">A ${K.ridgeA.toFixed(1)}′</text>
      <text x="${sx(K.partyX) + 2}" y="${sz(K.zTop) - 4}" font-size="3.4" font-weight="800" fill="#a43c30">PARTY</text>
      <text x="${sx(128)}" y="${sz(0) + 8}" font-size="3.8" font-weight="800" text-anchor="end">PENN →</text>
    `);
  }

  function isoProj(x, y, z) {
    const depth = 148 - x;
    return {
      sx: AXON.OX + y * AXON.SCALE_Y + depth * AXON.SCALE_D * 0.15,
      sy: AXON.OY - z * AXON.SCALE_Z - depth * AXON.SCALE_D,
    };
  }

  function axonPts(corners) {
    return corners.map((p) => `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');
  }

  function axonFace(corners, fill, stroke, opacity, orderKey) {
    return {
      orderKey,
      svg: `<polygon points="${axonPts(corners)}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.05"/>`,
    };
  }

  function axonBox(rect, z0, z1, fills) {
    const x0 = rect.x;
    const x1 = rect.x + rect.w;
    const y0 = rect.y;
    const y1 = rect.y + rect.h;
    const A = isoProj(x1, y0, z1);
    const B = isoProj(x1, y1, z1);
    const C = isoProj(x0, y1, z1);
    const D = isoProj(x0, y0, z1);
    const E = isoProj(x1, y0, z0);
    const F = isoProj(x1, y1, z0);
    const G = isoProj(x0, y1, z0);
    const depthKey = (rect.x + rect.w / 2) * 1000 + (rect.y + rect.h / 2);
    return [
      axonFace([F, G, C, B], fills.side, '#2a3038', 0.88, depthKey - 0.3),
      axonFace([E, F, B, A], fills.front, '#1a1d22', 0.95, depthKey + 0.5),
      axonFace([A, B, C, D], fills.top, '#1a1d22', 0.9, depthKey + 1),
    ];
  }

  function axonStone(rect) {
    const x0 = rect.x;
    const x1 = rect.x + rect.w;
    const y0 = rect.y;
    const y1 = rect.y + rect.h;
    const z1 = AXON.STONE;
    const depthKey = (rect.x + rect.w / 2) * 1000 + (rect.y + rect.h / 2) + 0.1;
    const E = isoProj(x1, y0, 0);
    const F = isoProj(x1, y1, 0);
    const B = isoProj(x1, y1, z1);
    const A = isoProj(x1, y0, z1);
    const G = isoProj(x0, y1, 0);
    const C = isoProj(x0, y1, z1);
    return [
      axonFace([E, F, B, A], '#8a8680', '#3a3a38', 0.95, depthKey + 0.4),
      axonFace([F, G, C, B], '#9a9690', '#3a3a38', 0.9, depthKey),
    ];
  }

  function axonRoof(rect, zTop, ridgeZ, nearFill, sideFill, farFill) {
    const x0 = rect.x;
    const x1 = rect.x + rect.w;
    const y0 = rect.y;
    const y1 = rect.y + rect.h;
    const yMid = rect.y + rect.h / 2;
    const ridgeNear = isoProj(x1, yMid, ridgeZ);
    const ridgeFar = isoProj(x0, yMid, ridgeZ);
    const e0n = isoProj(x1, y0, zTop);
    const e1n = isoProj(x1, y1, zTop);
    const e0f = isoProj(x0, y0, zTop);
    const e1f = isoProj(x0, y1, zTop);
    const depthKey = (rect.x + rect.w / 2) * 1000 + yMid + 50;
    return [
      axonFace([e0n, ridgeNear, e1n], nearFill, '#1a1d22', 0.96, depthKey + 2),
      axonFace([e1n, ridgeNear, ridgeFar, e1f], sideFill, '#1a1d22', 0.94, depthKey + 1.5),
      axonFace([e0n, e0f, ridgeFar, ridgeNear], farFill, '#1a1d22', 0.92, depthKey + 1.2),
    ];
  }

  const OPEN = Object.freeze({
    doorStroke: '#c34232',
    doorFill: '#2a1814',
    winStroke: '#2a6496',
    winFill: '#cfe0f4',
  });

  function axonOpening(corners, kind, extra) {
    const door = kind === 'door';
    const stroke = door ? OPEN.doorStroke : OPEN.winStroke;
    const fill = door ? OPEN.doorFill : OPEN.winFill;
    const width = door ? 2.2 : 1.7;
    const attr = extra ? ` ${extra}` : '';
    return `<polygon data-opening="${kind}"${attr} points="${axonPts(corners)}" fill="${fill}" fill-opacity="${door ? 0.92 : 0.88}" stroke="${stroke}" stroke-width="${width}"/>`;
  }

  /** wall E = Pennsylvania face (x max); wall S = irregular-south face (y max). u0/u1 are y on E, x on S. */
  function openingOnWall(rect, wall, u0, u1, z0, z1, kind, extra) {
    let corners;
    if (wall === 'E') {
      const x1 = rect.x + rect.w;
      corners = [isoProj(x1, u0, z1), isoProj(x1, u1, z1), isoProj(x1, u1, z0), isoProj(x1, u0, z0)];
    } else {
      const y1 = rect.y + rect.h;
      corners = [isoProj(u0, y1, z1), isoProj(u1, y1, z1), isoProj(u1, y1, z0), isoProj(u0, y1, z0)];
    }
    return axonOpening(corners, kind, extra);
  }

  function openingLabel(rect, wall, uMid, zMid, text) {
    const pt = wall === 'E'
      ? isoProj(rect.x + rect.w, uMid, zMid)
      : isoProj(uMid, rect.y + rect.h, zMid);
    return `<text x="${(pt.sx + 5).toFixed(1)}" y="${pt.sy.toFixed(1)}" font-size="8" font-weight="800" fill="${OPEN.doorStroke}">${text}</text>`;
  }

  function garageDoorEast(rect, unitId) {
    const doorW = Math.min(16, rect.h - 3);
    const yMid = rect.y + rect.h / 2;
    const y0 = yMid - doorW / 2;
    const y1 = yMid + doorW / 2;
    const split0 = isoProj(rect.x + rect.w, yMid, 8);
    const split1 = isoProj(rect.x + rect.w, yMid, 0.4);
    return `${openingOnWall(rect, 'E', y0, y1, 0.4, 8, 'door', `data-lock="east-garage-door" data-unit="${unitId}"`)}
      <line x1="${split0.sx.toFixed(1)}" y1="${split0.sy.toFixed(1)}" x2="${split1.sx.toFixed(1)}" y2="${split1.sy.toFixed(1)}" stroke="${OPEN.doorStroke}" stroke-width="1.2" opacity="0.85"/>`;
  }

  /**
   * Every exterior door and window on faces this camera can read (east + south).
   * Door outline red, window outline blue. Conceptual placement — not a permit takeoff.
   */
  function axonOpenings(homeA, homeB, leg, gA, gB) {
    const zG0 = 3.4;
    const zG1 = 8.4;
    const zU0 = 12.2;
    const zU1 = 17.2;
    const livingB = { x: homeB.x, y: homeB.y, w: 20, h: homeB.h };
    return [
      openingOnWall(homeA, 'E', 6.2, 11.2, zG0, zG1, 'window'),
      openingOnWall(homeA, 'E', 19.6, 24.8, zG0, zG1, 'window'),
      openingOnWall(homeA, 'E', 13.4, 16.6, 0.2, 8, 'door'),
      openingLabel(homeA, 'E', 15, 4.2, 'ENTRY A'),
      openingOnWall(homeA, 'E', 7.0, 12.0, zU0, zU1, 'window'),
      openingOnWall(homeA, 'E', 19.0, 24.2, zU0, zU1, 'window'),
      openingOnWall(homeA, 'S', 96, 104, zG0, zG1, 'window'),
      openingOnWall(homeA, 'S', 110, 122, zG0, zG1, 'window'),
      openingOnWall(homeA, 'S', 98, 108, zU0, zU1, 'window'),
      openingOnWall(homeA, 'S', 112, 124, zU0, zU1, 'window'),
      openingOnWall(livingB, 'S', 56.2, 59.4, 0.2, 8, 'door'),
      openingLabel(livingB, 'S', 57.8, 4.2, 'ENTRY B'),
      openingOnWall(livingB, 'S', 62, 70, zG0, zG1, 'window'),
      openingOnWall(livingB, 'S', 56, 70, zU0, zU1, 'window'),
      openingOnWall(leg, 'S', 76, 86, zG0, 7.8, 'window'),
      openingOnWall(gB, 'S', 10, 16, 4.2, 9.2, 'window'),
      garageDoorEast(gA, 'A'),
      garageDoorEast(gB, 'B'),
    ].join('\n');
  }

  function openingLegend(x, y) {
    return `<g font-family="ui-sans-serif,system-ui,sans-serif">
      <rect x="${x}" y="${y}" width="13" height="9" fill="${OPEN.doorFill}" stroke="${OPEN.doorStroke}" stroke-width="1.8"/>
      <text x="${x + 18}" y="${y + 8}" font-size="10" font-weight="800" fill="${OPEN.doorStroke}">Door</text>
      <rect x="${x + 72}" y="${y}" width="13" height="9" fill="${OPEN.winFill}" stroke="${OPEN.winStroke}" stroke-width="1.8"/>
      <text x="${x + 90}" y="${y + 8}" font-size="10" font-weight="800" fill="${OPEN.winStroke}">Window</text>
    </g>`;
  }

  function renderAxon(kind) {
    const clean = kind === 'axon';
    const H = homes();
    const G = garages();
    const D = drives();
    const K = LOCK;
    const zTop = K.zTop;
    const homeA = { x: H.A.x, y: H.A.y, w: H.A.w, h: H.A.h };
    const homeB = { x: H.B.x, y: H.B.y, w: H.B.w, h: H.B.h };
    const leg = { x: H.Bleg.x, y: H.Bleg.y, w: H.Bleg.w, h: H.Bleg.h };
    const gA = { x: G.A.x, y: G.A.y, w: G.A.w, h: G.A.h };
    const gB = { x: G.B.x, y: G.B.y, w: G.B.w, h: G.B.h };
    const fillA = { top: '#efe8dc', front: '#d6ccb8', side: '#cfc3ac' };
    const fillB = { top: '#ebe4d6', front: '#d0c6b4', side: '#c2b69e' };
    const fillG = { top: '#6a8f6a', front: '#3d5c3e', side: '#4e734f' };
    const faces = [];
    axonBox(gA, 0, K.garageHeightFt, fillG).forEach((f) => faces.push(f));
    axonBox(gB, 0, K.garageHeightFt, fillG).forEach((f) => faces.push(f));
    axonRoof(gA, K.garageHeightFt, K.garageRidge, '#3a4048', '#4a5c45', '#444a52').forEach((f) => faces.push(f));
    axonRoof(gB, K.garageHeightFt, K.garageRidge, '#3a4048', '#4a5c45', '#444a52').forEach((f) => faces.push(f));
    axonBox(homeB, 0, zTop, fillB).forEach((f) => faces.push(f));
    axonStone(homeB).forEach((f) => faces.push(f));
    axonBox(leg, 0, K.storyGround, fillB).forEach((f) => faces.push(f));
    axonStone(leg).forEach((f) => faces.push(f));
    axonBox(homeA, 0, zTop, fillA).forEach((f) => faces.push(f));
    axonStone(homeA).forEach((f) => faces.push(f));
    axonRoof(homeB, zTop, K.ridgeB, '#2c3138', '#3a4048', '#444a52').forEach((f) => faces.push(f));
    axonRoof(homeA, zTop, K.ridgeA, '#2c3138', '#3a4048', '#444a52').forEach((f) => faces.push(f));
    faces.sort((a, b) => a.orderKey - b.orderKey);

    const survey = SURVEY.map(([x, y]) => isoProj(x, y, 0));
    const plant = [isoProj(140, 8, 0), isoProj(148, 8, 0), isoProj(148, 42, 0), isoProj(140, 42, 0)];
    const plantT = isoProj(144, 25, 0);
    const driveSvg = [D.accessA, D.accessB].map((path) => {
      const pts = path.map(([x, y]) => isoProj(x, y, 0.12));
      return `<polyline points="${axonPts(pts)}" fill="none" stroke="#8a9096" stroke-width="9" stroke-linecap="round" opacity="0.45"/>
        <polyline points="${axonPts(pts)}" fill="none" stroke="#3d454d" stroke-width="1.3" stroke-dasharray="6 4"/>`;
    }).join('');
    const partyA = isoProj(K.partyX, 5, 0);
    const partyB = isoProj(K.partyX, 31, 0);
    const partyC = isoProj(K.partyX, 31, zTop);
    const partyD = isoProj(K.partyX, 5, zTop);
    const penn = isoProj(148, 25, 0);
    const rear = isoProj(4, 28, 0);
    const ridgeA = isoProj(homeA.x + homeA.w / 2, homeA.y + homeA.h / 2, K.ridgeA);
    const ridgeB = isoProj(homeB.x + homeB.w / 2, homeB.y + homeB.h / 2, K.ridgeB);
    const no = clean ? 'A-402' : 'A-401';
    const headline = clean
      ? 'DESIGN 2 AXON · SAME CAMERA AS DESIGN 1 · VOLUMES FROM THE LOCK'
      : 'DESIGN 2 ARCHITECTURAL MASSING · SAME CAMERA AS DESIGN 1';
    const sub = clean
      ? 'Doors outlined red · windows outlined blue · garage doors are SVG geometry · not a freeze'
      : 'Doors outlined red · windows outlined blue · conceptual gables on the lock plates';
    const note = clean
      ? `Ridge A ${K.ridgeA.toFixed(1)}′ / B ${K.ridgeB.toFixed(1)}′ · garage eave 16′ · party x=${K.partyX}`
      : `Ridge A +${(K.ridgeA - zTop).toFixed(1)}′ / B +${(K.ridgeB - zTop).toFixed(1)}′ above z=${zTop}′ · party x=${K.partyX}`;
    const openings = axonOpenings(homeA, homeB, leg, gA, gB);
    const callouts = clean ? '' : `
      <text x="${ridgeA.sx.toFixed(1)}" y="${(ridgeA.sy - 8).toFixed(1)}" font-size="10" font-weight="900" fill="#0d1b33">A ${K.ridgeA.toFixed(1)}′</text>
      <text x="${ridgeB.sx.toFixed(1)}" y="${(ridgeB.sy - 8).toFixed(1)}" font-size="10" font-weight="900" fill="#0d1b33">B ${K.ridgeB.toFixed(1)}′</text>
      <text x="${(partyB.sx + 8).toFixed(1)}" y="${(partyB.sy - 8).toFixed(1)}" fill="#9a3b2e" font-size="11" font-weight="800">PARTY x=${K.partyX}</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${AXON.VB_W} ${AXON.VB_H}" role="img" aria-label="Design 2 ${clean ? 'axon' : 'architectural massing'}">
      <rect width="${AXON.VB_W}" height="${AXON.VB_H}" fill="#f3efe8"/>
      <text x="${AXON.OX + 8}" y="26" font-size="13" font-weight="900" fill="#0d1b33">${headline}</text>
      <text x="${AXON.OX + 8}" y="44" font-size="11" fill="#59636d">${sub}</text>
      <text x="${AXON.OX + 8}" y="60" font-size="10" fill="#7b5721">${note}</text>
      ${openingLegend(AXON.OX + 8, 68)}
      <polygon points="${axonPts(survey)}" fill="#f0ebe3" fill-opacity="0.96" stroke="#232a31" stroke-width="2"/>
      <polygon points="${axonPts(plant)}" fill="#6b8f71" fill-opacity="0.18" stroke="none"/>
      <text x="${plantT.sx.toFixed(1)}" y="${(plantT.sy + 20).toFixed(1)}" font-size="9" fill="#416145" opacity="0.72">planting strip (visual only)</text>
      ${driveSvg}
      <polyline points="${partyA.sx.toFixed(1)},${partyA.sy.toFixed(1)} ${partyB.sx.toFixed(1)},${partyB.sy.toFixed(1)} ${partyC.sx.toFixed(1)},${partyC.sy.toFixed(1)} ${partyD.sx.toFixed(1)},${partyD.sy.toFixed(1)}" fill="none" stroke="#9a3b2e" stroke-width="2.2" stroke-dasharray="7 4"/>
      ${faces.map((f) => f.svg).join('\n')}
      ${openings}
      ${callouts}
      <text x="${penn.sx.toFixed(1)}" y="${(penn.sy + 18).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="900" fill="#c34232">PENNSYLVANIA · SOUTH / FRONT (NEAR)</text>
      <text x="${rear.sx.toFixed(1)}" y="${rear.sy.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="800" fill="#2a6496">N / REAR (DEEP)</text>
      <g class="rev-stamp">
        <text x="${AXON.VB_W - 14}" y="18" text-anchor="end" font-size="9" font-weight="900" fill="#0d1b33">${no} · ${REV}</text>
        <text x="${AXON.VB_W - 14}" y="32" text-anchor="end" font-size="8" font-weight="800" fill="#7b5721">CONCEPTUAL · NOT A PERMIT SET</text>
      </g>
    </svg>`;
  }

  function renderMassing() {
    return renderAxon('massing');
  }

  return {
    ID, REV, GEOM, PROGRAM, LOCK, CHECK_COPY, FINGERPRINT, PACKAGE, SHEETS, COMPARE, ROOM_FILL, ROOM_LEGEND, AXON,
    homes, garages, drives, rooms, capacity, livingFromRooms,
    asConcept, proveAccess, checks, analyze, fingerprint, renderNamed,
    renderSite, renderFloor, renderElev, renderSection, renderMassing, renderAxon, renderBubble,
    garageDuplexGap,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2Design2;
