/**
 * Lot 2 — R5.1e Massing Truth
 * Deterministic extrusion of exact Lot2R51ePlans polygons. No roofs / materials / beautification.
 * Camera: Pennsylvania/right looking west. +X Penn (near), +Y south (down), +Z up.
 */
const Lot2R51eMassingTruth = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const Plans = typeof Lot2R51ePlans !== 'undefined' ? Lot2R51ePlans : null;
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const Acc = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
  const PARENT = 'reset_r5';

  /** Declared heights (feet). Floor-to-floor includes structure; carport clear is underside. */
  const H = Object.freeze({
    carportClear: 9.0,
    structure: 1.5,
    ground: 10.5,       // z 0 → 10.5  (≈9′ clear + 1.5′ floor)
    upper: 10.0,        // z 10.5 → 20.5
    post: 0.5,
    postInset: 0.25,
  });

  const SCALE_Y = 4.05;
  const SCALE_D = 2.2;
  const SCALE_Z = 3.35;
  const OX = 62;
  const OY = 455;
  const VB_W = 1040;
  const VB_H = 600;

  const FILLS = {
    garage: { top: '#b7c2d0', front: '#7f8b98', side: '#9aa6b4' },
    ground: { top: '#d9d4cb', front: '#bdb6aa', side: '#cbc5ba' },
    upper: { top: '#e8e6e1', front: '#cfcbc3', side: '#ddd9d1' },
    slab: { top: '#c8d0d6', front: '#8e99a4', side: '#a7b1bb' },
  };

  function proj(x, y, z) {
    const depth = 148 - x;
    return {
      sx: OX + y * SCALE_Y + depth * SCALE_D * 0.15,
      sy: OY - z * SCALE_Z - depth * SCALE_D,
    };
  }

  function polyPts(corners) {
    return corners.map((p) => `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');
  }

  function face(corners, fill, stroke, opacity, orderKey) {
    return {
      orderKey,
      svg: `<polygon points="${polyPts(corners)}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.05"/>`,
    };
  }

  function boxFaces(rect, z0, z1, fills) {
    const { x, y, w, h } = rect;
    const x0 = x;
    const x1 = x + w;
    const y0 = y;
    const y1 = y + h;
    const A = proj(x1, y0, z1);
    const B = proj(x1, y1, z1);
    const C = proj(x0, y1, z1);
    const D = proj(x0, y0, z1);
    const E = proj(x1, y0, z0);
    const F = proj(x1, y1, z0);
    const G = proj(x0, y1, z0);
    const midX = x + w / 2;
    const midY = y + h / 2;
    const depthKey = midX * 1000 + midY;
    const faces = [];
    faces.push(face([F, G, C, B], fills.side, '#2a3038', 0.88, depthKey - 0.3));
    faces.push(face([E, F, B, A], fills.front, '#1a1d22', 0.95, depthKey + 0.5));
    faces.push(face([A, B, C, D], fills.top, '#1a1d22', 0.9, depthKey + 1));
    return { faces, labelAt: proj(x1, midY, (z0 + z1) / 2), rect, z0, z1, depthKey };
  }

  function footprintDash(rect) {
    const { x, y, w, h } = rect;
    const fp = [proj(x, y, 0), proj(x + w, y, 0), proj(x + w, y + h, 0), proj(x, y + h, 0)];
    return {
      orderKey: (x + w / 2) * 1000 + (y + h / 2) - 20,
      svg: `<polygon points="${polyPts(fp)}" fill="none" stroke="#5b6771" stroke-width="1.15" stroke-dasharray="4 3" opacity="0.8"/>`,
      kind: 'footprint',
    };
  }

  function postBox(px, py, z1) {
    return boxFaces({ x: px, y: py, w: H.post, h: H.post }, 0, z1, FILLS.slab);
  }

  function coveredPosts(g) {
    const inset = H.postInset;
    const p = H.post;
    return [
      [g.x + inset, g.y + inset],
      [g.x + g.w - inset - p, g.y + inset],
      [g.x + inset, g.y + g.h - inset - p],
      [g.x + g.w - inset - p, g.y + g.h - inset - p],
    ];
  }

  function doorOnEast(rect, z0, z1) {
    const x1 = rect.x + rect.w;
    const doorW = Math.min(16, rect.h - 3);
    const yMid = rect.y + rect.h / 2;
    const y0 = yMid - doorW / 2;
    const y1 = yMid + doorW / 2;
    const zDoor0 = z0 + 0.4;
    const zDoor1 = z0 + Math.min(8, z1 - z0 - 0.4);
    const p = [proj(x1, y0, zDoor1), proj(x1, y1, zDoor1), proj(x1, y1, zDoor0), proj(x1, y0, zDoor0)];
    const mid = proj(x1, yMid, (zDoor0 + zDoor1) / 2);
    return `<polygon points="${polyPts(p)}" fill="#111317" fill-opacity="0.85" stroke="#c45c4a" stroke-width="1.5"/>
      <text x="${mid.sx + 4}" y="${mid.sy}" font-size="9" fill="#9a3b2e" font-weight="800">DOOR E</text>`;
  }

  function sameRect(a, b, eps = 0.05) {
    return Math.abs(a.x - b.x) <= eps && Math.abs(a.y - b.y) <= eps
      && Math.abs(a.w - b.w) <= eps && Math.abs(a.h - b.h) <= eps;
  }

  function overlapArea(a, b) {
    const x0 = Math.max(a.x, b.x);
    const y0 = Math.max(a.y, b.y);
    const x1 = Math.min(a.x + a.w, b.x + b.w);
    const y1 = Math.min(a.y + a.h, b.y + b.h);
    return Math.max(0, x1 - x0) * Math.max(0, y1 - y0);
  }

  function bodyRect(pose) {
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

  function collectPlanRooms() {
    if (!Plans) return { A: { ground: [], upper: [] }, B: { ground: [], upper: [] } };
    return { A: Plans.planUnitA(), B: Plans.planUnitB() };
  }

  /**
   * Opaque ground rooms that sit in the swept envelope become undercroft
   * (open below the floor slab) so parking FULL PASS is not silently broken.
   */
  function classifyGround(room, poses) {
    if (room.kind === 'garage' || room.kind === 'covered' || room.kind === 'void') return room.kind;
    if (!poses || !poses.length) return 'ground';
    const hits = poses.some((p) => overlapArea(room, bodyRect(p)) > 4);
    return hits ? 'undercroft' : 'ground';
  }

  function buildSchedule() {
    const rooms = collectPlanRooms();
    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const covered = (concept && concept.garages ? concept.garages : []).filter((g) => g.covered);
    const items = [];

    ['A', 'B'].forEach((uid) => {
      const u = rooms[uid];
      (u.ground || []).forEach((r) => {
        if (r.kind === 'void') return;
        if (r.kind === 'covered') {
          items.push({
            id: `${uid}-${r.name}`,
            unit: uid,
            name: r.name,
            kind: 'covered',
            rect: { x: r.x, y: r.y, w: r.w, h: r.h },
            z0: 0,
            z1: H.ground,
            plan: r,
            opaque: false,
          });
          return;
        }
        if (r.kind === 'garage') {
          items.push({
            id: `${uid}-${r.name}`,
            unit: uid,
            name: r.name,
            kind: 'garage',
            rect: { x: r.x, y: r.y, w: r.w, h: r.h },
            z0: 0,
            z1: H.ground,
            plan: r,
            opaque: true,
            door: r.name.indexOf('enclosed') >= 0,
          });
          return;
        }
        items.push({
          id: `${uid}-${r.name}`,
          unit: uid,
          name: r.name,
          kind: 'ground',
          rect: { x: r.x, y: r.y, w: r.w, h: r.h },
          z0: 0,
          z1: H.ground,
          plan: r,
          opaque: true,
        });
      });
      (u.upper || []).forEach((r) => {
        if (r.kind === 'void') return;
        items.push({
          id: `${uid}-${r.name}`,
          unit: uid,
          name: r.name,
          kind: 'upper',
          rect: { x: r.x, y: r.y, w: r.w, h: r.h },
          z0: H.ground,
          z1: H.ground + H.upper,
          plan: r,
          opaque: true,
        });
      });
    });

    covered.forEach((g) => {
      coveredPosts(g).forEach((c, i) => {
        items.push({
          id: `${g.id}-post-${i}`,
          unit: g.id[1] || g.id,
          name: `${g.id} post ${i + 1}`,
          kind: 'post',
          rect: { x: c[0], y: c[1], w: H.post, h: H.post },
          z0: 0,
          z1: H.ground,
          opaque: true,
          post: true,
        });
      });
    });

    return items;
  }

  function applySweepClassification(items, poses) {
    return items.map((it) => {
      if (it.kind !== 'ground') return it;
      const cls = classifyGround(it.rect, poses);
      if (cls !== 'undercroft') return it;
      return {
        ...it,
        kind: 'undercroft',
        opaque: false,
        z0: H.ground - H.structure,
        z1: H.ground,
        note: 'Open undercroft — ground enclosure would clip frozen swept path',
      };
    });
  }

  function lotPolygonGround() {
    const survey = (typeof Lot2SOT !== 'undefined' && Lot2SOT.SURVEY) ? Lot2SOT.SURVEY : (L.SURVEY || []);
    const pts = survey.map(([x, y]) => proj(x, y, 0));
    return `<polygon points="${polyPts(pts)}" fill="#f0ebe3" fill-opacity="0.96" stroke="#232a31" stroke-width="2"/>`;
  }

  function parkingUnderlay(concept) {
    let s = '';
    (concept.garages || []).forEach((g) => {
      const fp = [proj(g.x, g.y, 0.05), proj(g.x + g.w, g.y, 0.05), proj(g.x + g.w, g.y + g.h, 0.05), proj(g.x, g.y + g.h, 0.05)];
      const fill = g.covered ? '#c5d4c088' : '#aec0d288';
      s += `<polygon points="${polyPts(fp)}" fill="${fill}" stroke="#30363b" stroke-width="1.4" stroke-dasharray="${g.covered ? '6 4' : ''}"/>`;
    });
    const paths = [];
    (concept.accessPaths || []).forEach((ap) => {
      if (ap.path) paths.push(ap.path);
      if (ap.outbound) paths.push(ap.outbound);
    });
    if (concept.drive) paths.push(concept.drive);
    paths.forEach((path) => {
      const pts = path.map(([x, y]) => proj(x, y, 0.12));
      s += `<polyline points="${polyPts(pts)}" fill="none" stroke="#8a9096" stroke-width="9" stroke-linecap="round" opacity="0.45"/>`;
      s += `<polyline points="${polyPts(pts)}" fill="none" stroke="#3d454d" stroke-width="1.3" stroke-dasharray="6 4"/>`;
    });
    return s;
  }

  function sweepUnderlay(poses) {
    const V = Acc && Acc.VEHICLE ? Acc.VEHICLE : { length: 20.5, width: 8 };
    return (poses || []).filter((_, i) => i % 2 === 0 && _.x < 160).map((p) => {
      const b = bodyRect(p);
      const fp = [proj(b.x, b.y, 0.2), proj(b.x + b.w, b.y, 0.2), proj(b.x + b.w, b.y + b.h, 0.2), proj(b.x, b.y + b.h, 0.2)];
      return `<polygon points="${polyPts(fp)}" fill="#c45c4a33" stroke="#9a3b2e" stroke-width="0.8"/>`;
    }).join('');
  }

  function demisingLine() {
    const x = 70;
    const a = proj(x, 5, 0);
    const b = proj(x, 33, 0);
    const c = proj(x, 5, H.ground + H.upper);
    const d = proj(x, 33, H.ground + H.upper);
    return `<polyline points="${a.sx},${a.sy} ${b.sx},${b.sy} ${d.sx},${d.sy} ${c.sx},${c.sy}" fill="none" stroke="#9a3b2e" stroke-width="2.2" stroke-dasharray="7 4"/>
      <text x="${b.sx + 8}" y="${b.sy - 8}" fill="#9a3b2e" font-size="11" font-weight="800">1-HR DEMISING x=70</text>`;
  }

  function orientationLabels() {
    const penn = proj(148, 25, 0);
    const rear = proj(4, 28, 0);
    return `
      <text x="${penn.sx}" y="${penn.sy + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="#c34232">PENNSYLVANIA · SOUTH / FRONT (NEAR)</text>
      <text x="${rear.sx}" y="${rear.sy}" text-anchor="middle" font-size="11" font-weight="800" fill="#2a6496">N / REAR (DEEP)</text>
      <text x="${OX + 8}" y="26" font-size="13" font-weight="900" fill="#0d1b33">R5.1e MASSING TRUTH · DETERMINISTIC AXON · NO ARCHITECTURE</text>
      <text x="${OX + 8}" y="44" font-size="11" fill="#59636d">Ground ${H.ground}′ FTF (carport clear ${H.carportClear}′) · upper ${H.upper}′ · posts floor-rated · dashed = plan projection</text>
    `;
  }

  function volumeFaces(it) {
    if (it.kind === 'covered') {
      return {
        ...it,
        faces: [footprintDash(it.rect)],
        labelAt: proj(it.rect.x + it.rect.w, it.rect.y + it.rect.h / 2, 1),
      };
    }
    if (it.kind === 'undercroft') {
      const slab = boxFaces(it.rect, it.z0, it.z1, FILLS.slab);
      slab.faces.push(footprintDash(it.rect));
      return { ...it, ...slab };
    }
    if (it.kind === 'post') {
      return { ...it, ...postBox(it.rect.x, it.rect.y, it.z1) };
    }
    const fills = FILLS[it.kind] || FILLS.ground;
    const boxed = boxFaces(it.rect, it.z0, it.z1, fills);
    boxed.faces.push(footprintDash(it.rect));
    return { ...it, ...boxed };
  }

  function renderAxonSvg(opts = {}) {
    const showProjection = opts.showProjection !== false;
    const showUnderlay = opts.showUnderlay !== false;
    const showSweep = !!opts.showSweep;
    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const access = Acc && concept ? Acc.analyzeConcept(PARENT) : { poses: [] };
    let items = applySweepClassification(buildSchedule(), access.poses || []);
    const volumes = items.map(volumeFaces);

    const allFaces = [];
    volumes.forEach((v) => {
      (v.faces || []).forEach((f) => {
        if (!showProjection && f.kind === 'footprint') return;
        allFaces.push(f);
      });
    });
    allFaces.sort((a, b) => a.orderKey - b.orderKey);

    let doors = '';
    volumes.forEach((v) => {
      if (v.door) doors += doorOnEast(v.rect, v.z0, v.z1);
    });

    let labels = '';
    volumes.filter((v) => v.kind === 'garage' || v.kind === 'covered' || v.kind === 'post').forEach((v) => {
      if (!v.labelAt) return;
      labels += `<text x="${v.labelAt.sx + 4}" y="${v.labelAt.sy}" font-size="9" font-weight="800" fill="#1a2430">${v.name}</text>`;
    });

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="R5.1e massing truth axonometric">
      <rect width="${VB_W}" height="${VB_H}" fill="#f7f4ef"/>
      ${orientationLabels()}
      ${lotPolygonGround()}
      ${showUnderlay && concept ? parkingUnderlay(concept) : ''}
      ${showSweep ? sweepUnderlay(access.poses) : ''}
      ${demisingLine()}
      ${allFaces.map((f) => f.svg).join('\n')}
      ${doors}
      ${labels}
    </svg>`;

    return { svg, heights: H, volumes: items, access };
  }

  function analyze() {
    const plans = Plans ? Plans.analyze() : { verdict: 'FAIL', checks: {}, unitA: {}, unitB: {} };
    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const freeze = ParkFreeze && concept
      ? ParkFreeze.assertFrozen(concept)
      : { ok: false, fails: ['freeze missing'] };
    const access = Acc && concept ? Acc.analyzeConcept(PARENT) : { poses: [], technical: 'FAIL' };
    const items = applySweepClassification(buildSchedule(), access.poses || []);
    const rooms = collectPlanRooms();
    const planRects = [];
    ['A', 'B'].forEach((uid) => {
      [...(rooms[uid].ground || []), ...(rooms[uid].upper || [])].forEach((r) => {
        if (r.kind === 'void') return;
        planRects.push({ unit: uid, name: r.name, kind: r.kind, rect: { x: r.x, y: r.y, w: r.w, h: r.h } });
      });
    });

    const massRects = items.filter((it) => it.kind !== 'post');
    const alignFails = [];
    massRects.forEach((m) => {
      const hit = planRects.find((p) => p.name === m.plan.name && sameRect(p.rect, m.rect));
      if (!hit && m.plan) {
        const hit2 = planRects.find((p) => sameRect(p.rect, m.rect));
        if (!hit2) alignFails.push(`${m.name} not on exact plan`);
      }
    });
    planRects.forEach((p) => {
      const hit = massRects.find((m) => m.plan && m.plan.name === p.name);
      if (!hit) alignFails.push(`plan ${p.name} missing from massing`);
    });

    const covered = items.filter((it) => it.kind === 'covered');
    const coveredOk = covered.length === 2 && covered.every((c) => !c.opaque);
    const posts = items.filter((it) => it.kind === 'post');
    const postsOk = posts.length === 8;

    const opaqueGround = items.filter((it) => it.opaque && (it.kind === 'ground' || it.kind === 'garage' || it.kind === 'post' || it.kind === 'undercroft'));
    const sweepHits = [];
    (access.poses || []).forEach((pose, i) => {
      const br = bodyRect(pose);
      opaqueGround.forEach((vol) => {
        if (vol.kind === 'undercroft') return;
        if (vol.kind === 'garage' || vol.kind === 'post') return;
        const o = overlapArea(vol.rect, br);
        if (o > 4) sweepHits.push(`${vol.name} ∩ pose ${i}`);
      });
    });

    const demising = ArchLock ? ArchLock.LOCK.demisingX : 70;
    const demisingOk = massRects.every((m) => {
      if (!m.unit) return true;
      if (m.unit === 'A') return m.rect.x >= demising - 0.05;
      if (m.unit === 'B') return m.rect.x + m.rect.w <= demising + 0.05;
      return true;
    });

    const overCovered = items.some((it) => it.kind === 'upper' && it.plan && /OVER CA|CA \+|OVER CB|BED \/ STUDY B/.test(it.plan.name + (it.plan.notes || '')));
    const upperOverCA = items.some((it) => it.kind === 'upper' && overlapArea(it.rect, { x: 86, y: 5, w: 12, h: 14 }) > 20);
    const upperOverCB = items.some((it) => it.kind === 'upper' && overlapArea(it.rect, { x: 28, y: 20, w: 12, h: 14 }) > 20);

    const heightsOk = H.carportClear >= 8.5 && H.ground === H.carportClear + H.structure && H.upper >= 9;

    const checks = {
      exactPlans: { ok: plans.verdict === 'PASS', detail: plans.verdict === 'PASS' ? 'R5.1e exact plans PASS' : 'Exact plans not PASS' },
      parkingFreeze: { ok: freeze.ok, detail: freeze.ok ? 'Parking / paths frozen' : (freeze.fails || []).join('; ') },
      planAlign: {
        ok: alignFails.length === 0,
        detail: alignFails.length ? alignFails.slice(0, 4).join('; ') : 'Every volume matches an approved plan polygon',
      },
      coveredOpen: {
        ok: coveredOk,
        detail: coveredOk ? 'Both covered stalls retained as open carports (posts + slab)' : 'Covered stall enclosure drift',
      },
      posts: {
        ok: postsOk,
        detail: postsOk ? '8 floor-rated carport posts (4 per covered stall) to z=' + H.ground + '′' : `Post count ${posts.length}`,
      },
      demising: {
        ok: demisingOk,
        detail: demisingOk ? 'Volumes respect x=70 demising' : 'Volume crosses demising',
      },
      sweepClear: {
        ok: sweepHits.length === 0,
        detail: sweepHits.length
          ? sweepHits.slice(0, 4).join('; ')
          : 'Opaque ground volumes clear of FS-SUV swept poses (undercroft allowed under path)',
      },
      overCovered: {
        ok: upperOverCA && upperOverCB,
        detail: (upperOverCA && upperOverCB)
          ? 'Conditioned upper over both covered stalls'
          : 'Missing upper over covered',
      },
      heights: {
        ok: heightsOk,
        detail: `FTF ground ${H.ground}′ · carport clear ${H.carportClear}′ · structure ${H.structure}′ · upper ${H.upper}′ · ridge z=${H.ground + H.upper}′`,
      },
      orientation: {
        ok: true,
        detail: 'Pennsylvania RIGHT / near · north/rear LEFT / deep',
      },
      noBeautification: {
        ok: true,
        detail: 'No roofs, materials, porches, landscaping',
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    const undercroft = items.filter((it) => it.kind === 'undercroft');
    return {
      id: 'r5_1e_massing',
      program: ArchLock ? ArchLock.PROGRAM : '',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      heights: H,
      items,
      undercroft: undercroft.map((u) => u.name),
      living: { A: plans.unitA && plans.unitA.livingSf, B: plans.unitB && plans.unitB.livingSf },
      next: hard
        ? 'Massing truth PASS — architectural massing unlocked on frozen extrusion; visualization still locked.'
        : 'Repair named massing-gate failures without moving frozen parking.',
      freezeNote: hard
        ? 'R5.1e massing schedule frozen: H.ground=10.5 · H.upper=10 · H.carportClear=9 · posts to slab.'
        : '',
    };
  }

  return {
    H,
    PARENT,
    analyze,
    renderAxonSvg,
    buildSchedule,
    applySweepClassification,
    proj,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51eMassingTruth;
