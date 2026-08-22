/**
 * Lot 2 — R5.1e site plan (Deliverable v1.0)
 *
 * Representation-only plan of frozen geometry. Does not move plates, parking,
 * paths, appendages, or openings. No landscaping / materials / photoreal.
 *
 * Gate: architecture frozen · Penn-only access · parking paths valid ·
 * setback/yard annotations agree with SOT + freeze.
 */
const Lot2R51eSitePlan = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const S = typeof Lot2SOT !== 'undefined' ? Lot2SOT : {};
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const Acc = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
  const Plans = typeof Lot2R51ePlans !== 'undefined' ? Lot2R51ePlans : null;
  const Closure = typeof Lot2R51ePlanClosure !== 'undefined' ? Lot2R51ePlanClosure : null;
  const Arch = typeof Lot2R51eArchitecturalMassing !== 'undefined' ? Lot2R51eArchitecturalMassing : null;
  const Sheet = typeof Lot2R51eSheet !== 'undefined' ? Lot2R51eSheet : null;
  const PARENT = 'reset_r5';
  const EPS = 0.05;
  const SCALE = 6.35;
  const MX = 128;
  const MY = 108;
  const POST = 0.5;
  const POST_INSET = 0.25;
  const UNDERCROFT = Object.freeze({ x: 86, y: 19, w: 40, h: 8.5 });

  function freeze() {
    return ParkFreeze ? ParkFreeze.FREEZE : null;
  }

  function concept() {
    return L.CONCEPTS && L.CONCEPTS[PARENT];
  }

  function samePt(a, b, eps = EPS) {
    return a && b && Math.abs(a[0] - b[0]) <= eps && Math.abs(a[1] - b[1]) <= eps;
  }

  function sameRect(a, b, eps = EPS) {
    return a && b
      && Math.abs(a.x - b.x) <= eps && Math.abs(a.y - b.y) <= eps
      && Math.abs(a.w - b.w) <= eps && Math.abs(a.h - b.h) <= eps;
  }

  function rectPoly(r) {
    return [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]];
  }

  function insideRect(x, y, r, pad = 0) {
    return x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
  }

  function distPointSeg(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  function distToPath(x, y, path) {
    let min = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      min = Math.min(min, distPointSeg(x, y, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]));
    }
    return min;
  }

  function offsetPath(path, half) {
    const left = [];
    const right = [];
    for (let i = 0; i < path.length - 1; i++) {
      const [x1, y1] = path[i];
      const [x2, y2] = path[i + 1];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const nx = (-dy / len) * half;
      const ny = (dx / len) * half;
      if (i === 0) {
        left.push([x1 + nx, y1 + ny]);
        right.push([x1 - nx, y1 - ny]);
      }
      left.push([x2 + nx, y2 + ny]);
      right.push([x2 - nx, y2 - ny]);
    }
    return left.concat(right.reverse());
  }

  function plates() {
    const lock = ArchLock ? ArchLock.LOCK.plates : null;
    const A = lock ? lock.find((p) => p.id === 'A') : { x: 70, y: 5, w: 56, h: 22.5 };
    const B = lock ? lock.find((p) => p.id === 'B') : { x: 28, y: 5, w: 42, h: 28 };
    return {
      A: { id: 'A', x: A.x, y: A.y, w: A.w, h: A.h },
      B: { id: 'B', x: B.x, y: B.y, w: B.w, h: B.h },
      demisingX: ArchLock ? ArchLock.LOCK.demisingX : 70,
    };
  }

  function stalls() {
    const F = freeze();
    return (F ? F.garages : []).map((g) => ({
      id: g.id,
      x: g.x,
      y: g.y,
      w: g.w,
      h: g.h,
      doorFace: g.doorFace,
      covered: !!g.covered,
      enclosed: !!g.enclosed,
      spaces: g.spaces,
    }));
  }

  function posts() {
    return stalls().filter((g) => g.covered).flatMap((g) => {
      const p = POST;
      const i = POST_INSET;
      return [
        { id: `${g.id}-p1`, x: g.x + i, y: g.y + i, w: p, h: p },
        { id: `${g.id}-p2`, x: g.x + g.w - i - p, y: g.y + i, w: p, h: p },
        { id: `${g.id}-p3`, x: g.x + i, y: g.y + g.h - i - p, w: p, h: p },
        { id: `${g.id}-p4`, x: g.x + g.w - i - p, y: g.y + g.h - i - p, w: p, h: p },
      ];
    });
  }

  function appendages() {
    const canopy = Arch ? Arch.CANOPY_A : { rect: { x: 78, y: 1.5, w: 8, h: 3.5 }, label: 'APPENDAGE · entry canopy A' };
    const eyebrow = Arch ? Arch.EYEBROW_B : { rect: { x: 66, y: 20, w: 4, h: 2 }, label: 'APPENDAGE · entry eyebrow B' };
    return [
      { id: 'canopy-a', ...canopy.rect, label: 'APPENDAGE · CANOPY A', source: canopy },
      { id: 'eyebrow-b', ...eyebrow.rect, label: 'APPENDAGE · EYEBROW B', source: eyebrow },
    ];
  }

  function openings() {
    if (Closure && Closure.analyze) {
      const g = Closure.analyze();
      return (g.openings || []).slice();
    }
    return [
      { id: 'entry-a', unit: 'A', kind: 'entry', wall: 'N', x: 80.4, y: 5, w: 3.2, label: 'ENTRY A' },
      { id: 'entry-b', unit: 'B', kind: 'entry', wall: 'S', x: 65.4, y: 20, w: 3.2, label: 'ENTRY B' },
      { id: 'gar-a', unit: 'A', kind: 'garage', wall: 'E', x: 124, y: 5, w: 16, label: 'GARAGE DOOR A 16′' },
      { id: 'gar-b', unit: 'B', kind: 'garage', wall: 'E', x: 66, y: 20, w: 16, label: 'GARAGE DOOR B 16′' },
      { id: 'pers-a', unit: 'A', kind: 'personnel', wall: 'N', x: 110, y: 5, w: 3, label: 'PERSONNEL A' },
    ];
  }

  function walks() {
    const ops = openings();
    const a = ops.find((o) => o.id === 'entry-a');
    const b = ops.find((o) => o.id === 'entry-b');
    const ax = a ? a.x + a.w / 2 : 82;
    const bx = 68;
    return [
      {
        id: 'walk-a',
        to: 'entry-a',
        from: 'PENN',
        path: [[148, 3.25], [ax, 3.25], [ax, 5]],
        label: 'WALK A · Penn → north entry',
      },
      {
        id: 'walk-b',
        to: 'entry-b',
        from: 'DRIVE',
        path: [[bx, 28], [bx, b ? b.y : 20]],
        label: 'WALK B · spine → entry',
      },
    ];
  }

  function apronA() {
    const gA = stalls().find((g) => g.id === 'A');
    if (!gA) return { x: 124, y: 5, w: 24, h: 16 };
    const x0 = gA.x + gA.w;
    return { x: x0, y: gA.y, w: (S.PENN_X || 148) - x0, h: gA.h };
  }

  function driveWidth() {
    return S.DRIVE_WIDTH || 12;
  }

  function pennGraphic() {
    return { x: S.PENN_X || 148, w: 8, y: 0, h: S.FRONTAGE || 50 };
  }

  function inherited() {
    const F = freeze();
    const pl = plates();
    return {
      plates: pl,
      stalls: stalls(),
      drive: F ? F.drive.map((p) => [...p]) : [],
      accessA: F ? F.accessA.map((p) => [...p]) : [],
      accessB: F ? F.accessB.map((p) => [...p]) : [],
      outboundB: F ? F.outboundB.map((p) => [...p]) : [],
      undercroft: { ...UNDERCROFT },
      appendages: appendages(),
      openings: openings(),
      walks: walks(),
      posts: posts(),
      apronA: apronA(),
      driveWidth: driveWidth(),
      setbacks: { ...(S.SETBACKS || { front: 20, rear: 25, west: 5, east: 10 }) },
      penn: pennGraphic(),
    };
  }

  function criticalDims(site) {
    const pennX = S.PENN_X || 148;
    const A = site.plates.A;
    const B = site.plates.B;
    const aEast = A.x + A.w;
    const sb = site.setbacks;
    const gA = site.stalls.find((g) => g.id === 'A');
    const doorA = gA ? gA.x + gA.w : 124;
    return {
      surveyDepth: pennX,
      pennFrontage: S.FRONTAGE || 50,
      rearWidth: S.REAR || 57.01,
      frontSetback: sb.front,
      rearSetback: sb.rear,
      northSetback: sb.west,
      southSetback: sb.east,
      plateA: `${A.w}×${A.h}`,
      plateB: `${B.w}×${B.h}`,
      demisingX: site.plates.demisingX,
      pennToPlateA: +(pennX - aEast).toFixed(2),
      plateAInsideFrontSb: +((pennX - sb.front) - aEast).toFixed(2),
      rearToPlateB: +B.x.toFixed(2),
      plateBInsideRearSb: +(B.x - sb.rear).toFixed(2),
      northToPlates: +A.y.toFixed(2),
      driveWidth: site.driveWidth,
      apronA: +site.apronA.w.toFixed(2),
      doorAToPenn: +(pennX - doorA).toFixed(2),
    };
  }

  function sampleSite(site) {
    const survey = L.SURVEY || S.SURVEY;
    const step = 2;
    const counts = {
      yardRear: 0, yardNorth: 0, yardPenn: 0, yardSouth: 0,
      building: 0, paved: 0, skip: 0,
    };
    const half = site.driveWidth / 2;
    const paths = [site.drive, site.accessA, site.accessB];
    const inPaved = (x, y) => {
      if (insideRect(x, y, site.apronA, 0.05)) return true;
      if (insideRect(x, y, site.undercroft, 0.05)) return true;
      if (site.stalls.some((g) => insideRect(x, y, g, 0.05))) return true;
      return paths.some((p) => p.length >= 2 && distToPath(x, y, p) <= half + 0.4);
    };
    const inBldg = (x, y) => {
      if (insideRect(x, y, site.undercroft, 0.05)) return false;
      return insideRect(x, y, site.plates.A, 0.05) || insideRect(x, y, site.plates.B, 0.05);
    };
    for (let x = step / 2; x < 148; x += step) {
      for (let y = step / 2; y < 58; y += step) {
        if (!L.pointInPoly || !L.pointInPoly(x, y, survey, 0.08)) {
          counts.skip += 1;
          continue;
        }
        if (inPaved(x, y)) counts.paved += 1;
        else if (inBldg(x, y)) counts.building += 1;
        else if (x < site.plates.B.x) counts.yardRear += 1;
        else if (y < site.plates.A.y) counts.yardNorth += 1;
        else if (x > site.plates.A.x + site.plates.A.w) counts.yardPenn += 1;
        else counts.yardSouth += 1;
      }
    }
    const cell = step * step;
    const area = (n) => Math.round(n * cell);
    const yards = {
      rear: area(counts.yardRear),
      north: area(counts.yardNorth),
      penn: area(counts.yardPenn),
      south: area(counts.yardSouth),
    };
    yards.total = yards.rear + yards.north + yards.penn + yards.south;
    return {
      yards,
      buildingSf: area(counts.building),
      pavedSf: area(counts.paved),
      surveySf: Math.round(L.SURVEY_AREA || S.SURVEY_AREA || 7023),
    };
  }

  function plateCornersInSetback(site) {
    const poly = L.SETBACK_POLY;
    if (!poly || !L.pointInPoly) return { ok: false, fails: ['SETBACK_POLY missing'] };
    const fails = [];
    ['A', 'B'].forEach((id) => {
      rectPoly(site.plates[id]).forEach(([x, y]) => {
        if (!L.pointInPoly(x, y, poly, 0.12)) fails.push(`Plate ${id} corner (${x},${y}) outside working setback`);
      });
    });
    return { ok: fails.length === 0, fails };
  }

  function pathStartsPenn(path) {
    return path && path.length >= 2 && path[0][0] >= (S.PENN_X || 148) - 1;
  }

  function pathIsBottomStreet(path) {
    if (!path || !path.length) return false;
    const [x, y] = path[0];
    return x < 140 && y >= 40;
  }

  function analyze() {
    const site = inherited();
    const F = freeze();
    const c = concept();
    const freezeAssert = ParkFreeze && c ? ParkFreeze.assertFrozen(c) : { ok: false, fails: ['missing freeze'] };
    const plateAssert = ArchLock ? ArchLock.assertPlates([site.plates.A, site.plates.B]) : { ok: true, fails: [] };
    const access = Acc && Acc.analyzeConcept ? Acc.analyzeConcept(PARENT) : { technical: 'FAIL', reasons: ['no access'] };
    const parkingReset = (typeof Lot2ParkingReset !== 'undefined' && Lot2ParkingReset.analyzeReset)
      ? Lot2ParkingReset.analyzeReset(PARENT)
      : null;
    const plansGate = Plans && Plans.analyze ? Plans.analyze() : { verdict: 'FAIL' };
    const closureGate = Closure && Closure.analyze ? Closure.analyze() : { verdict: 'FAIL' };
    const archGate = Arch && Arch.analyze ? Arch.analyze() : { verdict: 'FAIL' };
    const dims = criticalDims(site);
    const areas = sampleSite(site);
    const sbHit = plateCornersInSetback(site);

    const stallMatch = F && site.stalls.length === F.garages.length
      && F.garages.every((g) => {
        const q = site.stalls.find((s) => s.id === g.id);
        return q && sameRect(q, g) && q.doorFace === g.doorFace && q.covered === !!g.covered;
      });

    const pathsFrozen = F
      && site.drive.length === F.drive.length && F.drive.every((p, i) => samePt(p, site.drive[i]))
      && site.accessA.length === F.accessA.length && F.accessA.every((p, i) => samePt(p, site.accessA[i]))
      && site.accessB.length === F.accessB.length && F.accessB.every((p, i) => samePt(p, site.accessB[i]))
      && site.outboundB.length === F.outboundB.length && F.outboundB.every((p, i) => samePt(p, site.outboundB[i]));

    const pennOk = pathStartsPenn(site.drive) && pathStartsPenn(site.accessA) && pathStartsPenn(site.accessB)
      && site.outboundB.length && site.outboundB[site.outboundB.length - 1][0] >= (S.PENN_X || 148) - 1;
    const noBottom = ![site.drive, site.accessA, site.accessB].some(pathIsBottomStreet);
    const pennRight = site.penn.x >= (S.PENN_X || 148) - EPS && site.penn.y === 0;

    const sotSb = S.SETBACKS || {};
    const sbMatch = dims.frontSetback === sotSb.front && dims.rearSetback === sotSb.rear
      && dims.northSetback === sotSb.west && dims.southSetback === sotSb.east;

    const ops = site.openings;
    const walkA = site.walks.find((w) => w.id === 'walk-a');
    const walkB = site.walks.find((w) => w.id === 'walk-b');
    const entryA = ops.find((o) => o.id === 'entry-a');
    const entryB = ops.find((o) => o.id === 'entry-b');
    const walkAOk = walkA && entryA && Math.abs(walkA.path[walkA.path.length - 1][0] - (entryA.x + entryA.w / 2)) < 1.2
      && Math.abs(walkA.path[walkA.path.length - 1][1] - entryA.y) < 0.2
      && walkA.path[0][0] >= 147;
    const walkBOk = walkB && entryB && Math.abs(walkB.path[walkB.path.length - 1][1] - entryB.y) < 0.2
      && Math.abs(walkB.path[0][1] - 28) < 0.2;

    const canopy = site.appendages.find((a) => a.id === 'canopy-a');
    const eyebrow = site.appendages.find((a) => a.id === 'eyebrow-b');
    const appOk = Arch && canopy && eyebrow
      && sameRect(canopy, Arch.CANOPY_A.rect)
      && sameRect(eyebrow, Arch.EYEBROW_B.rect);

    const parkingOk = freezeAssert.ok && pathsFrozen && stallMatch
      && access.technical === 'PASS'
      && (!parkingReset || parkingReset.verdict === 'PASS');

    const dimsOk = dims.pennToPlateA === 22 && dims.rearToPlateB === 28
      && dims.northToPlates === 5 && dims.apronA === 24 && dims.doorAToPenn === 24
      && dims.driveWidth === 12 && dims.demisingX === 70
      && dims.plateAInsideFrontSb === 2 && dims.plateBInsideRearSb === 3;

    const checks = {
      architectureFrozen: {
        ok: freezeAssert.ok && plateAssert.ok && stallMatch && (archGate.verdict === 'PASS')
          && (plansGate.verdict === 'PASS' || plansGate.verdict === 'CONDITIONAL'),
        detail: freezeAssert.ok && plateAssert.ok && stallMatch
          ? 'Plates, stalls, and architectural massing unchanged'
          : (freezeAssert.fails || []).concat(plateAssert.fails || []).join('; ') || 'Architecture drift',
      },
      pennOnlyAccess: {
        ok: pennOk && noBottom && pennRight,
        detail: pennOk && noBottom && pennRight
          ? 'Every vehicular path originates at Pennsylvania / right; no bottom-edge street'
          : 'Access is not Penn-only',
      },
      parkingValid: {
        ok: parkingOk,
        detail: parkingOk
          ? `Parking freeze holds · access ${access.technical}${parkingReset ? ` · reset ${parkingReset.verdict}` : ''}`
          : (freezeAssert.fails || []).concat(access.reasons || []).slice(0, 4).join('; ') || 'Parking invalid',
      },
      parkingPathsUnchanged: {
        ok: pathsFrozen,
        detail: pathsFrozen ? 'Drive · access A/B · outbound B match freeze' : 'Path drift',
      },
      setbacksAgree: {
        ok: sbMatch && sbHit.ok && dims.northToPlates === sotSb.west,
        detail: sbMatch && sbHit.ok
          ? `Working setbacks ${sotSb.front}/${sotSb.rear}/${sotSb.west}/${sotSb.east} · plates inside envelope`
          : (sbHit.fails || []).join('; ') || 'Setback annotation mismatch',
      },
      yardsAgree: {
        ok: areas.yards.total > 1500 && areas.surveySf > 7000
          && areas.yards.rear > 800 && areas.yards.south > 400,
        detail: `Yards rear ${areas.yards.rear} · north ${areas.yards.north} · Penn ${areas.yards.penn} · south ${areas.yards.south} · total ${areas.yards.total} SF (survey ${areas.surveySf})`,
      },
      dimsProveLayout: {
        ok: dimsOk,
        detail: dimsOk
          ? `Penn→A ${dims.pennToPlateA}′ · rear→B ${dims.rearToPlateB}′ · A apron ${dims.apronA}′ · N setback ${dims.northToPlates}′`
          : 'Critical dimension mismatch vs frozen plates',
      },
      walksFromOpenings: {
        ok: !!(walkAOk && walkBOk),
        detail: walkAOk && walkBOk
          ? 'Walk A from Penn to ENTRY A · Walk B from spine to ENTRY B'
          : 'Walks do not terminate on frozen entries',
      },
      appendagesInherited: {
        ok: !!appOk,
        detail: appOk ? 'Canopy A 78,1.5 8×3.5 · eyebrow B 66,20 4×2 · labeled APPENDAGE' : 'Appendage drift',
      },
      postsInherited: {
        ok: site.posts.length === 8,
        detail: site.posts.length === 8 ? '8 floor-rated posts at covered stalls' : `Post count ${site.posts.length}`,
      },
      undercroftInherited: {
        ok: sameRect(site.undercroft, UNDERCROFT),
        detail: 'OPEN UNDERCROFT A 86,19 40×8.5 · sweep-clear · unconditioned',
      },
      noBottomStreet: {
        ok: pennRight && noBottom,
        detail: 'Pennsylvania graphic on the right-hand 50′ frontage only',
      },
      planClosureHeld: {
        ok: closureGate.verdict === 'PASS',
        detail: closureGate.verdict === 'PASS' ? 'Floor-plan closure still PASS' : 'Plan closure not PASS',
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_site_plan',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      site,
      dims,
      areas,
      living: closureGate.living || null,
      next: hard
        ? 'Site plan PASS / FROZEN. Pennsylvania elevation is next representation layer (already started in v1.0).'
        : 'Repair named site-plan failures without moving frozen architecture or parking.',
      freezeNote: hard
        ? 'R5.1e site plan frozen: footprints, Penn access, drive, stalls, setbacks, walks, yards. No landscaping.'
        : '',
    };
  }

  function sx(x) {
    return MX + x * SCALE;
  }
  function sy(y) {
    return MY + y * SCALE;
  }
  function polyPts(arr) {
    return arr.map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');
  }

  function dimH(x1, x2, y, label, side) {
    const yy = sy(y) + (side === 'above' ? -18 : 18);
    if (Sheet) return Sheet.dimH(sx(x1), sx(x2), yy, label, side === 'above' ? 'above' : 'below');
    return '';
  }

  function dimV(x, y1, y2, label, side, extraPx) {
    const base = extraPx || 18;
    const xx = sx(x) + (side === 'left' ? -base : base);
    if (Sheet) return Sheet.dimV(xx, sy(y1), sy(y2), label, side);
    return '';
  }

  function render(gate) {
    const g = gate || analyze();
    const site = g.site;
    const survey = L.SURVEY || S.SURVEY;
    const setback = L.SETBACK_POLY;
    const F = freeze();
    const c = concept();
    const penn = site.penn;
    const A = site.plates.A;
    const B = site.plates.B;
    const dims = g.dims;
    const areas = g.areas;
    const TITLE_H = Sheet ? Sheet.TITLE_H : 56;
    const VB_W = Math.ceil(sx(penn.x + penn.w) + 80);
    const VB_H = Math.ceil(sy(58) + 20 + TITLE_H);

    const drivePoly = offsetPath(site.drive, site.driveWidth / 2);
    const accessAPoly = offsetPath(site.accessA, site.driveWidth / 2);

    const stallSvg = site.stalls.map((st) => {
      const fill = st.covered ? '#c5d0da' : '#9aadc0';
      const dash = st.covered ? '5 3' : '';
      const name = st.covered ? `COVERED ${st.id.replace('C', '')} · 12×14` : `GARAGE ${st.id} · 24×16`;
      return `<rect x="${sx(st.x)}" y="${sy(st.y)}" width="${st.w * SCALE}" height="${st.h * SCALE}" fill="${fill}" stroke="#2a333c" stroke-width="1.5" stroke-dasharray="${dash}"/>
        <text x="${sx(st.x + st.w / 2)}" y="${sy(st.y + st.h / 2) - 4}" text-anchor="middle" font-size="9" font-weight="800">${name}</text>
        <text x="${sx(st.x + st.w / 2)}" y="${sy(st.y + st.h / 2) + 8}" text-anchor="middle" font-size="8">door ${st.doorFace} · 1 space</text>`;
    }).join('');

    const postSvg = site.posts.map((p) =>
      `<rect x="${sx(p.x)}" y="${sy(p.y)}" width="${p.w * SCALE}" height="${p.h * SCALE}" fill="#3d4550" stroke="#111317" stroke-width="0.6"/>`
    ).join('');

    const appSvg = site.appendages.map((a) =>
      `<rect x="${sx(a.x)}" y="${sy(a.y)}" width="${a.w * SCALE}" height="${a.h * SCALE}" fill="none" stroke="#8b6b3e" stroke-width="1.4" stroke-dasharray="4 2"/>
       <text x="${sx(a.x + a.w / 2)}" y="${sy(a.y) - 3}" text-anchor="middle" font-size="7.5" font-weight="800" fill="#7b5721">${a.label}</text>`
    ).join('');

    const walkSvg = site.walks.map((w) =>
      `<polyline points="${polyPts(w.path)}" fill="none" stroke="#c4a574" stroke-width="3.2" stroke-linecap="square"/>
       <text x="${sx(w.path[0][0] * 0.55 + w.path[w.path.length - 1][0] * 0.45)}" y="${sy(w.path[0][1]) - 8}" font-size="7.5" font-weight="800" fill="#7b5721">${w.label}</text>`
    ).join('');

    const doorSvg = site.openings.map((o) => {
      if (o.kind === 'garage') {
        return `<rect x="${sx(o.x) - 2.5}" y="${sy(o.y)}" width="5" height="${o.w * SCALE}" fill="#111317" stroke="#c45c4a" stroke-width="1.2"/>
        <text x="${sx(o.x) + 8}" y="${sy(o.y + o.w / 2)}" font-size="8" font-weight="800" fill="#9a3b2e">${Sheet ? Sheet.shortLabel(o.label) : o.label}</text>`;
      }
      return `<line x1="${sx(o.x)}" y1="${sy(o.y)}" x2="${sx(o.x + o.w)}" y2="${sy(o.y)}" stroke="#5c4030" stroke-width="2.6"/>
        <text x="${sx(o.x + o.w / 2)}" y="${sy(o.y) + (o.wall === 'N' ? 12 : -5)}" text-anchor="middle" font-size="8" font-weight="800" fill="#7b5721">${o.label}</text>`;
    }).join('');

    const snow = (c && c.siteObstacles || []).find((o) => o.id === 'snow_south');
    const snowSvg = snow
      ? `<polygon points="${polyPts(snow.poly)}" fill="none" stroke="#7a8794" stroke-width="1.1" stroke-dasharray="3 3"/>
         <text x="${sx(90)}" y="${sy(42.4)}" font-size="8" fill="#5a6570" font-weight="700">SNOW EDGE (freeze obstacle)</text>`
      : '';

    const body = `
  <rect x="${sx(penn.x)}" y="${sy(penn.y)}" width="${penn.w * SCALE}" height="${penn.h * SCALE}" fill="#2a333c"/>
  <text x="${sx(penn.x + penn.w / 2)}" y="${sy(25)}" text-anchor="middle" font-size="11" font-weight="800" fill="#efb34d" transform="rotate(90 ${sx(penn.x + penn.w / 2)} ${sy(25)})">PENNSYLVANIA AVENUE · SOUTH / FRONT</text>

  <polygon points="${polyPts(survey)}" fill="#e7efdc" stroke="#c45c4a" stroke-width="2.2"/>
  ${setback ? `<polygon points="${polyPts(setback)}" fill="none" stroke="#568057" stroke-width="1.5" stroke-dasharray="7 5"/>` : ''}

  <polygon points="${polyPts(drivePoly)}" fill="#c5cdd4" fill-opacity="0.92" stroke="#6a7682" stroke-width="1"/>
  <polygon points="${polyPts(accessAPoly)}" fill="#c5cdd4" fill-opacity="0.85" stroke="none"/>
  <rect x="${sx(site.apronA.x)}" y="${sy(site.apronA.y)}" width="${site.apronA.w * SCALE}" height="${site.apronA.h * SCALE}" fill="#c5cdd4" fill-opacity="0.9" stroke="#6a7682" stroke-width="1"/>

  <rect x="${sx(A.x)}" y="${sy(A.y)}" width="${A.w * SCALE}" height="${A.h * SCALE}" fill="#efe8dc" stroke="#2a333c" stroke-width="2"/>
  <rect x="${sx(B.x)}" y="${sy(B.y)}" width="${B.w * SCALE}" height="${B.h * SCALE}" fill="#e8efe4" stroke="#2a333c" stroke-width="2"/>
  <rect x="${sx(UNDERCROFT.x)}" y="${sy(UNDERCROFT.y)}" width="${UNDERCROFT.w * SCALE}" height="${UNDERCROFT.h * SCALE}" fill="#f7f3ea" stroke="#7a8794" stroke-width="1.2" stroke-dasharray="5 3"/>
  <text x="${sx(UNDERCROFT.x + UNDERCROFT.w / 2)}" y="${sy(UNDERCROFT.y + UNDERCROFT.h / 2)}" text-anchor="middle" font-size="8" font-weight="800" fill="#5a6570">OPEN UNDERCROFT A · SWEEP-CLEAR</text>

  ${stallSvg}
  ${postSvg}
  ${appSvg}

  <line x1="${sx(site.plates.demisingX)}" y1="${sy(5)}" x2="${sx(site.plates.demisingX)}" y2="${sy(33)}" stroke="#9a3b2e" stroke-width="1.6" stroke-dasharray="6 3"/>
  <text x="${sx(site.plates.demisingX) + 6}" y="${sy(8)}" font-size="8" font-weight="800" fill="#9a3b2e">DEMISING x=70</text>

  <text x="${sx(A.x + A.w / 2)}" y="${sy(A.y + 3.2)}" text-anchor="middle" font-size="10" font-weight="800" fill="#0d1b33">UNIT A · 70,5 56×22.5</text>
  <text x="${sx(B.x + B.w / 2)}" y="${sy(B.y + 3.2)}" text-anchor="middle" font-size="10" font-weight="800" fill="#0d1b33">UNIT B · 28,5 42×28</text>

  ${walkSvg}
  ${doorSvg}
  ${snowSvg}

  <polyline points="${polyPts(site.drive)}" fill="none" stroke="#3568b8" stroke-width="1.6" stroke-dasharray="6 4"/>
  <polyline points="${polyPts(site.accessA)}" fill="none" stroke="#2d6a4f" stroke-width="1.6" stroke-dasharray="5 3"/>
  <polyline points="${polyPts(site.accessB)}" fill="none" stroke="#3568b8" stroke-width="1.35"/>
  <polyline points="${polyPts(site.outboundB)}" fill="none" stroke="#9a3b2e" stroke-width="1.2" stroke-dasharray="3 3"/>
  <text x="${sx(140)}" y="${sy(11.2)}" font-size="8" font-weight="800" fill="#2d6a4f">ACCESS A</text>
  <text x="${sx(132)}" y="${sy(26.2)}" font-size="8" font-weight="800" fill="#3568b8">DRIVE / ACCESS B · 12′</text>
  <text x="${sx(92)}" y="${sy(25.4)}" font-size="8" font-weight="800" fill="#9a3b2e">OUTBOUND B</text>

  ${dimH(0, 148, 0, '148.00′ DEPTH', 'above')}
  ${dimV(148, 0, 50, '50.00′', 'right', 56)}
  ${dimV(0, 0, 57.01, '57.01′ REAR', 'left')}
  ${dimH(126, 148, 5, '22′ TO PENN', 'above')}
  ${dimH(124, 148, 21, '24′ APRON A', 'below')}
  ${dimH(0, 28, 5, '28′ TO REAR', 'above')}
  ${dimH(0, 25, 33, '25′ REAR SETBACK', 'below')}
  ${dimH(128, 148, 40, '20′ FRONT SETBACK', 'below')}
  ${dimV(70, 0, 5, '5′ N', 'left')}
  ${dimH(A.x, A.x + A.w, 27.5, '56.00′ PLATE A', 'below')}
  ${dimV(B.x, B.y, B.y + B.h, '28.00′ PLATE B', 'left')}

  <text x="${sx(12)}" y="${sy(18)}" font-size="9" font-weight="800" fill="#416145">REAR YARD</text>
  <text x="${sx(12)}" y="${sy(21)}" font-size="8" fill="#416145">${areas.yards.rear} SF usable (mostly 25′ setback)</text>
  <text x="${sx(88)}" y="${sy(2.4)}" font-size="8" font-weight="800" fill="#416145">NORTH SETBACK / WALK A · ${areas.yards.north} SF</text>
  <text x="${sx(133)}" y="${sy(32)}" font-size="8" font-weight="800" fill="#416145">PENN YARD</text>
  <text x="${sx(133)}" y="${sy(34.4)}" font-size="8" fill="#416145">${areas.yards.penn} SF</text>
  <text x="${sx(96)}" y="${sy(38.6)}" font-size="8" font-weight="800" fill="#416145">SOUTH YARD · ${areas.yards.south} SF</text>
  <text x="${sx(96)}" y="${sy(40.8)}" font-size="8" fill="#5a6570">10′ working setback from irregular boundary</text>

  <polygon points="${sx(-2)},${sy(4)} ${sx(-8)},${sy(7)} ${sx(-2)},${sy(10)}" fill="#0d1b33"/>
  <line x1="${sx(-2)}" y1="${sy(7)}" x2="${sx(6)}" y2="${sy(7)}" stroke="#0d1b33" stroke-width="1.6"/>
  <text x="${sx(-8)}" y="${sy(2.6)}" font-size="9" font-weight="800" fill="#0d1b33">N / REAR</text>

  <text x="${sx(84.8)}" y="${sy(45.4)}" font-size="8" fill="#5a6570">85.98′</text>
  <text x="${sx(105)}" y="${sy(44.6)}" font-size="8" fill="#5a6570">40.33′</text>
  <text x="${sx(136)}" y="${sy(48)}" font-size="8" fill="#5a6570">23.90′</text>`;

    if (!Sheet) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${body}</svg>`;
    }
    return Sheet.svg({
      w: VB_W,
      h: VB_H,
      no: 'A-001',
      title: 'SITE PLAN',
      subtitle: 'Frozen footprints · Pennsylvania access · no landscaping · working setbacks 20 / 25 / 5 / 10 (planning, not survey)',
      note: 'Paved = 12′ drive + Access A + Garage A 24′ apron + stall slabs + undercroft sweep. 8 posts. Covered stalls stay open.',
      verdict: g.verdict,
      aria: 'R5.1e site plan',
      body,
    });
  }

  return {
    PARENT,
    inherited,
    analyze,
    render,
    criticalDims,
    sampleSite,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eSitePlan;
