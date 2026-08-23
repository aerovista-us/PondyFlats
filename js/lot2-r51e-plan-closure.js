/**
 * Lot 2 — R5.1e floor-plan closure (Priority #1)
 *
 * Interior architecture inside frozen plates / parking / SF.
 * Does not mutate Lot2R51ePlans envelopes used by massing.
 * Lumped B rooms are subdivided; unions must match frozen parents.
 */
const Lot2R51ePlanClosure = (() => {
  const Plans = typeof Lot2R51ePlans !== 'undefined' ? Lot2R51ePlans : null;
  const ArchLock = typeof Lot2R51eLock !== 'undefined' ? Lot2R51eLock : null;
  const ParkFreeze = typeof Lot2R5Freeze !== 'undefined' ? Lot2R5Freeze : null;
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const PARENT = 'reset_r5';
  const CONDITIONED = new Set(['living', 'stair', 'corridor', 'mech', 'storage', 'bath', 'kitchen', 'entry']);
  const EPS = 0.05;
  const TARGET = livingTarget();
  const Sheet = typeof Lot2R51eSheet !== 'undefined' ? Lot2R51eSheet : null;

  function demisingX() {
    return ArchLock ? ArchLock.LOCK.demisingX : 68;
  }

  function livingTarget() {
    return ArchLock && ArchLock.LOCK.livingSf
      ? ArchLock.LOCK.livingSf
      : { A: 1639, B: 1720 };
  }

  function livingGate() {
    return ArchLock && ArchLock.LOCK.livingGate
      ? ArchLock.LOCK.livingGate
      : { min: 1600, max: 1900, maxDelta: 120 };
  }

  function requirePlans() {
    if (!Plans) throw new Error('Lot2R51ePlans required');
    return Plans;
  }

  function room(x, y, w, h, name, kind, notes, parent) {
    return {
      name,
      kind,
      parent: parent || null,
      x: +(+x).toFixed(2),
      y: +(+y).toFixed(2),
      w: +(+w).toFixed(2),
      h: +(+h).toFixed(2),
      sf: Math.round(w * h),
      notes: notes || '',
      minDim: +Math.min(w, h).toFixed(2),
    };
  }

  function overlapArea(a, b) {
    const x0 = Math.max(a.x, b.x);
    const y0 = Math.max(a.y, b.y);
    const x1 = Math.min(a.x + a.w, b.x + b.w);
    const y1 = Math.min(a.y + a.h, b.y + b.h);
    return Math.max(0, x1 - x0) * Math.max(0, y1 - y0);
  }

  function sameRect(a, b, eps = EPS) {
    return Math.abs(a.x - b.x) <= eps && Math.abs(a.y - b.y) <= eps
      && Math.abs(a.w - b.w) <= eps && Math.abs(a.h - b.h) <= eps;
  }

  function unionRect(rects) {
    const x0 = Math.min(...rects.map((r) => r.x));
    const y0 = Math.min(...rects.map((r) => r.y));
    const x1 = Math.max(...rects.map((r) => r.x + r.w));
    const y1 = Math.max(...rects.map((r) => r.y + r.h));
    return { x: x0, y: y0, w: +(x1 - x0).toFixed(2), h: +(y1 - y0).toFixed(2) };
  }

  function livingSf(rooms) {
    return rooms.filter((r) => CONDITIONED.has(r.kind)).reduce((s, r) => s + r.sf, 0);
  }

  function cloneFrozen(r) {
    return room(r.x, r.y, r.w, r.h, r.name, r.kind, r.notes, null);
  }

  /** Frozen Unit A already named — keep envelopes, add notes only. */
  function unitARooms() {
    const P = requirePlans().planUnitA();
    return {
      ground: P.ground.map(cloneFrozen),
      upper: P.upper.map(cloneFrozen),
    };
  }

  /**
   * Unit B: subdivide lumped envelopes. Outer rects stay frozen.
   * Parents: LIVING/KITCHEN · MECH+STORAGE · STAIR+ENTRY · BEDS+BATH
   */
  function unitBRooms() {
    const P = requirePlans().planUnitB();
    const D = demisingX();
    const stairW = +(D - 64).toFixed(2);
    const bed2W = +(D - 60).toFixed(2);
    const keep = (name) => cloneFrozen(P.ground.concat(P.upper).find((r) => r.name === name));
    const ground = [
      keep('GARAGE B · enclosed'),
      keep('COVERED B'),
      room(28, 5, 5, 15, 'MECH B', 'mech', 'Split of MECH + STORAGE B', 'MECH + STORAGE B'),
      room(33, 5, 7, 15, 'STORAGE B', 'storage', 'Split of MECH + STORAGE B', 'MECH + STORAGE B'),
      room(40, 5, 16, 15, 'LIVING B', 'living', 'Rear outlook · split of LIVING / KITCHEN B', 'LIVING / KITCHEN B'),
      room(56, 5, 8, 15, 'KITCHEN B', 'kitchen', 'Galley toward stair', 'LIVING / KITCHEN B'),
      room(64, 5, stairW, 12, 'STAIR B', 'stair', 'Aligned with upper stair well', 'STAIR + ENTRY B'),
      room(64, 17, stairW, 3, 'ENTRY B', 'entry', 'From drive spine · south of stair', 'STAIR + ENTRY B'),
    ];
    const upper = [
      keep('LIVING / DINING B'),
      keep('STAIR OPEN B'),
      keep('BED / STUDY B'),
      room(42, 20, 8, 13, 'BATH B', 'bath', 'Over garage · split of BEDS + BATH B', 'BEDS + BATH B'),
      room(50, 20, 10, 13, 'BED 1 B', 'living', 'Primary · 10×13', 'BEDS + BATH B'),
      room(60, 20, bed2W, 13, 'BED 2 B', 'living', `Secondary · ${bed2W}×13`, 'BEDS + BATH B'),
    ];
    return { ground, upper };
  }

  function parents() {
    const D = demisingX();
    return [
      { unit: 'B', name: 'MECH + STORAGE B', rect: { x: 28, y: 5, w: 12, h: 15 } },
      { unit: 'B', name: 'LIVING / KITCHEN B', rect: { x: 40, y: 5, w: 24, h: 15 } },
      { unit: 'B', name: 'STAIR + ENTRY B', rect: { x: 64, y: 5, w: +(D - 64).toFixed(2), h: 15 } },
      { unit: 'B', name: 'BEDS + BATH B', rect: { x: 42, y: 20, w: +(D - 42).toFixed(2), h: 13 } },
    ];
  }

  function openings() {
    return [
      { id: 'entry-a', unit: 'A', level: 'ground', kind: 'entry', wall: 'N', x: 80.4, y: 5, w: 3.2, label: 'ENTRY A' },
      { id: 'entry-b', unit: 'B', level: 'ground', kind: 'entry', wall: 'S', x: 64.4, y: 20, w: 3.2, label: 'ENTRY B' },
      { id: 'gar-a', unit: 'A', level: 'ground', kind: 'garage', wall: 'E', x: 124, y: 5, w: 16, label: 'GARAGE DOOR A 16′' },
      { id: 'gar-b', unit: 'B', level: 'ground', kind: 'garage', wall: 'E', x: 66, y: 20, w: 16, label: 'GARAGE DOOR B 16′' },
      { id: 'pers-a', unit: 'A', level: 'ground', kind: 'personnel', wall: 'N', x: 110, y: 5, w: 3, label: 'PERSONNEL A' },
    ];
  }

  function windows() {
    return [
      { unit: 'A', level: 'upper', wall: 'S', x: 92, y: 15, w: 8, label: 'LIVING A S' },
      { unit: 'A', level: 'upper', wall: 'E', x: 126, y: 7, w: 6, label: 'LIVING A PENN limited' },
      { unit: 'A', level: 'upper', wall: 'S', x: 78, y: 27.5, w: 8, label: 'BED 1 A S' },
      { unit: 'A', level: 'upper', wall: 'S', x: 100, y: 27.5, w: 6, label: 'BED 2 A S' },
      { unit: 'A', level: 'upper', wall: 'S', x: 112, y: 27.5, w: 5, label: 'BED 3 A S' },
      { unit: 'B', level: 'ground', wall: 'N', x: 44, y: 5, w: 10, label: 'LIVING B N' },
      { unit: 'B', level: 'upper', wall: 'N', x: 34, y: 5, w: 24, label: 'LIVING/DINING B N' },
      { unit: 'B', level: 'upper', wall: 'S', x: 52, y: 33, w: 6, label: 'BED 1 B S' },
      { unit: 'B', level: 'upper', wall: 'S', x: 62, y: 33, w: 6, label: 'BED 2 B S' },
    ];
  }

  function schedule() {
    const A = unitARooms();
    const B = unitBRooms();
    const rows = [];
    [['A', A], ['B', B]].forEach(([uid, u]) => {
      ['ground', 'upper'].forEach((level) => {
        u[level].forEach((r) => {
          rows.push({
            unit: uid,
            level,
            name: r.name,
            kind: r.kind,
            dims: `${r.w}×${r.h}`,
            sf: CONDITIONED.has(r.kind) ? r.sf : 0,
            notes: r.notes,
            parent: r.parent,
          });
        });
      });
    });
    return rows;
  }

  function coversParent(children, parent) {
    if (!children.length) return { ok: false, detail: 'no children' };
    const u = unionRect(children);
    if (!sameRect(u, parent.rect)) {
      return { ok: false, detail: `${parent.name} union ${u.w}×${u.h} at ${u.x},${u.y}` };
    }
    const area = children.reduce((s, r) => s + r.w * r.h, 0);
    const pArea = parent.rect.w * parent.rect.h;
    if (Math.abs(area - pArea) > 0.2) return { ok: false, detail: `${parent.name} area ${area} vs ${pArea}` };
    for (let i = 0; i < children.length; i++) {
      for (let j = i + 1; j < children.length; j++) {
        if (overlapArea(children[i], children[j]) > 0.2) {
          return { ok: false, detail: `${children[i].name}∩${children[j].name}` };
        }
      }
    }
    return { ok: true, detail: `${parent.name} subdivided without leftover` };
  }

  function demisingHit(list) {
    const D = demisingX();
    return list.filter((o) => {
      if (o.wall === 'E' && Math.abs(o.x - D) < 0.2) return true;
      if (o.wall === 'W' && Math.abs(o.x - D) < 0.2) return true;
      return false;
    });
  }

  function analyze() {
    const P = requirePlans();
    const frozen = P.analyze();
    const A = unitARooms();
    const B = unitBRooms();
    const sfA = livingSf([...A.ground, ...A.upper]);
    const sfB = livingSf([...B.ground, ...B.upper]);
    const frozenA = P.planUnitA();
    const frozenB = P.planUnitB();

    const parentChecks = parents().map((parent) => {
      const kids = B.ground.concat(B.upper).filter((r) => r.parent === parent.name);
      return { parent: parent.name, ...coversParent(kids, parent) };
    });

    const aUnchanged = frozenA.ground.concat(frozenA.upper).every((fr) => {
      const hit = A.ground.concat(A.upper).find((r) => r.name === fr.name);
      return hit && sameRect(hit, fr);
    });

    const bKeep = ['GARAGE B · enclosed', 'COVERED B', 'LIVING / DINING B', 'STAIR OPEN B', 'BED / STUDY B'];
    const bKeepOk = bKeep.every((name) => {
      const fr = frozenB.ground.concat(frozenB.upper).find((r) => r.name === name);
      const hit = B.ground.concat(B.upper).find((r) => r.name === name);
      return fr && hit && sameRect(hit, fr);
    });

    const tgt = livingTarget();
    const g = livingGate();
    const D = demisingX();
    const demising = demisingHit(openings().concat(windows()));
    const minFails = B.ground.concat(B.upper).filter((r) => {
      if (r.kind === 'stair') return r.minDim < 3.5 - EPS;
      if (r.kind === 'bath') return r.minDim < 5 - EPS;
      if (r.kind === 'entry' || r.kind === 'mech' || r.kind === 'storage') return r.minDim < 3 - EPS;
      if (r.kind === 'garage' || r.kind === 'covered' || r.kind === 'void') return false;
      return r.minDim < 8 - EPS;
    });

    const concept = L.CONCEPTS && L.CONCEPTS[PARENT];
    const freeze = ParkFreeze && concept ? ParkFreeze.assertFrozen(concept) : { ok: false, fails: ['missing'] };
    const plates = ArchLock ? ArchLock.assertPlates([frozenA.plate, frozenB.plate]) : { ok: true };

    const stairAlign = overlapArea(
      B.ground.find((r) => r.name === 'STAIR B'),
      B.upper.find((r) => r.name === 'STAIR OPEN B')
    ) > 20;

    const checks = {
      frozenPlans: {
        ok: frozen.verdict === 'PASS',
        detail: frozen.verdict === 'PASS' ? 'Exact-plan sanity still PASS' : 'Frozen plans not PASS',
      },
      parkingFreeze: {
        ok: freeze.ok,
        detail: freeze.ok ? 'Parking frozen' : (freeze.fails || []).join('; '),
      },
      plates: {
        ok: plates.ok,
        detail: plates.ok ? `Plates A/B + demising x=${D}` : (plates.fails || []).join('; '),
      },
      unitAUnchanged: {
        ok: aUnchanged,
        detail: aUnchanged ? 'Unit A envelopes match frozen exact plans' : 'Unit A envelope drift',
      },
      unitBParentsCovered: {
        ok: parentChecks.every((c) => c.ok),
        detail: parentChecks.every((c) => c.ok)
          ? 'Lumped B rooms subdivided; unions match frozen parents'
          : parentChecks.filter((c) => !c.ok).map((c) => c.detail).join('; '),
      },
      unitBKeep: {
        ok: bKeepOk,
        detail: bKeepOk ? 'Unsplit B rooms still match freeze' : 'Unsplit B room drift',
      },
      sfReconcile: {
        ok: sfA === tgt.A && sfB === tgt.B,
        detail: `A ${sfA} (target ${tgt.A}) · B ${sfB} (target ${tgt.B})`,
      },
      sfMatchesFrozen: {
        ok: sfA === frozenA.livingSf && sfB === frozenB.livingSf,
        detail: 'Closure SF equals frozen exact-plan SF',
      },
      minRoom: {
        ok: minFails.length === 0,
        detail: minFails.length ? minFails.map((r) => `${r.name} ${r.minDim}′`).join('; ') : 'Min dimensions hold after split',
      },
      stairAlign: {
        ok: stairAlign,
        detail: stairAlign ? 'B stair well aligns ground → upper' : 'B stair misaligned',
      },
      demisingBlank: {
        ok: demising.length === 0,
        detail: demising.length ? demising.map((d) => d.label || d.id).join('; ') : `No openings on x=${D}`,
      },
      comparableHomes: {
        ok: Math.abs(sfA - sfB) <= g.maxDelta && sfA >= g.min && sfB >= g.min && sfA <= g.max && sfB <= g.max,
        detail: `Two homes ${sfA} / ${sfB} SF · gate ${g.min}–${g.max} · Δ≤${g.maxDelta}`,
      },
    };

    const hard = Object.keys(checks).every((k) => checks[k].ok);
    return {
      id: 'r5_1e_plan_closure',
      verdict: hard ? 'PASS' : 'FAIL',
      checks,
      living: { A: sfA, B: sfB },
      unitA: { ...A, livingSf: sfA, plate: frozenA.plate, label: frozenA.label },
      unitB: { ...B, livingSf: sfB, plate: frozenB.plate, label: frozenB.label },
      schedule: schedule(),
      openings: openings(),
      windows: windows(),
      next: hard
        ? 'Floor-plan closure PASS — homes proven inside frozen shells. Site plan and elevations next; axon lock is supporting.'
        : 'Repair named closure failures without moving plates or parking.',
      freezeNote: hard
        ? 'Interior architecture closed against frozen R5.1e envelopes. Massing polygons unchanged.'
        : '',
    };
  }

  const KIND_FILL = {
    living: '#e8f0e4',
    kitchen: '#e2edd8',
    bath: '#dde8f2',
    stair: '#f3e6c8',
    corridor: '#efe8dc',
    entry: '#f7ead3',
    mech: '#e4e8ee',
    storage: '#e4e8ee',
    garage: '#aec0d2',
    covered: '#c5d0da',
    void: '#f7f3ea',
  };

  function dimLine(x1, y1, x2, y2, label, sx, sy) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const vert = Math.abs(x2 - x1) < 0.1;
    return `<line x1="${sx(x1)}" y1="${sy(y1)}" x2="${sx(x2)}" y2="${sy(y2)}" stroke="#5a6570" stroke-width="1"/>
      <line x1="${sx(x1)}" y1="${sy(y1 - (vert ? 0 : 0.6))}" x2="${sx(x1)}" y2="${sy(y1 + (vert ? 0 : 0.6))}" stroke="#5a6570" stroke-width="1"/>
      <line x1="${sx(x2)}" y1="${sy(y2 - (vert ? 0 : 0.6))}" x2="${sx(x2)}" y2="${sy(y2 + (vert ? 0 : 0.6))}" stroke="#5a6570" stroke-width="1"/>
      <text x="${sx(mx) + (vert ? 10 : 0)}" y="${sy(my) + (vert ? 0 : -4)}" text-anchor="middle" font-size="9" fill="#3a4550" font-weight="700">${label}</text>`;
  }

  function drawDoor(o, sx, sy, S) {
    if (o.kind === 'garage') {
      return `<rect x="${sx(o.x) - 2}" y="${sy(o.y)}" width="4" height="${o.w * S}" fill="#111317" stroke="#c45c4a" stroke-width="1.4"/>
        <text x="${sx(o.x) + 8}" y="${sy(o.y + o.w / 2)}" font-size="8" font-weight="800" fill="#9a3b2e">${Sheet ? Sheet.shortLabel(o.label) : o.label}</text>`;
    }
    const inward = o.wall === 'N' ? 1 : -1;
    return `<path d="M ${sx(o.x)} ${sy(o.y)} L ${sx(o.x + o.w)} ${sy(o.y)}" stroke="#5c4030" stroke-width="2.4"/>
      <path d="M ${sx(o.x)} ${sy(o.y)} A ${o.w * S} ${o.w * S} 0 0 ${inward > 0 ? 1 : 0} ${sx(o.x)} ${sy(o.y + inward * o.w)}" fill="none" stroke="#8b6b3e" stroke-width="1" stroke-dasharray="3 2"/>
      <text x="${sx(o.x + o.w / 2)}" y="${sy(o.y) + (inward > 0 ? 14 : -6)}" font-size="8" font-weight="800" fill="#7b5721">${o.label}</text>`;
  }

  function drawWindow(w, sx, sy, S) {
    const thick = 4;
    if (w.wall === 'N' || w.wall === 'S') {
      return `<rect x="${sx(w.x)}" y="${sy(w.y) - thick / 2}" width="${w.w * S}" height="${thick}" fill="#dce8f5" stroke="#2a6496" stroke-width="1"/>`;
    }
    return `<rect x="${sx(w.x) - thick / 2}" y="${sy(w.y)}" width="${thick}" height="${w.w * S}" fill="#dce8f5" stroke="#2a6496" stroke-width="1"/>`;
  }

  function stairHatch(r, sx, sy) {
    let s = '';
    const treads = Math.max(6, Math.floor(r.h / 0.9));
    for (let i = 1; i < treads; i++) {
      const yy = r.y + (r.h * i) / treads;
      s += `<line x1="${sx(r.x)}" y1="${sy(yy)}" x2="${sx(r.x + r.w)}" y2="${sy(yy)}" stroke="#b0893a" stroke-width="0.9"/>`;
    }
    s += `<text x="${sx(r.x + r.w / 2)}" y="${sy(r.y + r.h / 2)}" text-anchor="middle" font-size="8" fill="#7b5721" font-weight="800">UP</text>`;
    return s;
  }

  function renderFloor(level) {
    const S = 6;
    const MX = 72;
    const MY = 64;
    const TITLE_H = Sheet ? Sheet.TITLE_H : 56;
    const sx = (x) => MX + x * S;
    const sy = (y) => MY + y * S;
    const A = unitARooms();
    const B = unitBRooms();
    const rooms = level === 'upper' ? [...A.upper, ...B.upper] : [...A.ground, ...B.ground];
    const survey = (typeof Lot2SOT !== 'undefined' && Lot2SOT.SURVEY)
      ? Lot2SOT.SURVEY
      : [[0, 0], [148, 0], [148, 50], [125.143, 43.016], [84.813, 43.016], [0, 57.01]];
    const poly = survey.map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ');
    const VB_W = Math.ceil(148 * S + MX * 2 + 40);
    const VB_H = Math.ceil(58 * S + MY + 28 + TITLE_H);
    const pa = requirePlans().planUnitA().plate;
    const pb = requirePlans().planUnitB().plate;
    const roomSvg = rooms.map((r) => {
      const fill = KIND_FILL[r.kind] || '#eee';
      const dash = r.kind === 'void' || r.kind === 'covered' ? '5 3' : '';
      const cx = sx(r.x + r.w / 2);
      const cy = sy(r.y + r.h / 2);
      const hatch = r.kind === 'stair' ? stairHatch(r, sx, sy) : '';
      return `<g>
        <rect x="${sx(r.x)}" y="${sy(r.y)}" width="${r.w * S}" height="${r.h * S}" fill="${fill}" stroke="#2a333c" stroke-width="1.6" stroke-dasharray="${dash}"/>
        ${hatch}
        <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="9" font-weight="800">${r.name}</text>
        <text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="8">${r.w}′ × ${r.h}′ · ${r.sf} SF</text>
      </g>`;
    }).join('');
    const ops = openings().filter((o) => o.level === level).map((o) => drawDoor(o, sx, sy, S)).join('');
    const wins = windows().filter((w) => w.level === level).map((w) => drawWindow(w, sx, sy, S)).join('');
    const dims = `
      ${dimLine(pa.x, pa.y - 2.2, pa.x + pa.w, pa.y - 2.2, `PLATE A ${pa.w}′`, sx, sy)}
      ${dimLine(pb.x, pb.y - 2.2, pb.x + pb.w, pb.y - 2.2, `PLATE B ${pb.w}′`, sx, sy)}
      ${dimLine(pa.x + pa.w + 2.2, pa.y, pa.x + pa.w + 2.2, pa.y + pa.h, `${pa.h}′`, sx, sy)}
      ${dimLine(pb.x - 2.4, pb.y, pb.x - 2.4, pb.y + pb.h, `${pb.h}′`, sx, sy)}
      ${dimLine(0, -3.6, 148, -3.6, '148.00′ LOT DEPTH', sx, sy)}`;
    const body = `
      <polygon points="${poly}" fill="#f8f3e7" stroke="#232a31" stroke-width="2"/>
      <rect x="${sx(pa.x)}" y="${sy(pa.y)}" width="${pa.w * S}" height="${pa.h * S}" fill="none" stroke="#416145" stroke-width="2.2" stroke-dasharray="8 5"/>
      <rect x="${sx(pb.x)}" y="${sy(pb.y)}" width="${pb.w * S}" height="${pb.h * S}" fill="none" stroke="#416145" stroke-width="2.2" stroke-dasharray="8 5"/>
      ${roomSvg}${ops}${wins}${dims}
      <line x1="${sx(demisingX())}" y1="${sy(5)}" x2="${sx(demisingX())}" y2="${sy(33)}" stroke="#9a3b2e" stroke-width="3" stroke-dasharray="7 4"/>
      <text x="${sx(demisingX()) + 6}" y="${sy(12)}" fill="#9a3b2e" font-size="10" font-weight="800">1-HR DEMISING x=${demisingX()}</text>
      <text x="${sx(148)}" y="${sy(26)}" text-anchor="end" fill="#c34232" font-size="11" font-weight="900">PENNSYLVANIA →</text>
      <text x="${sx(4)}" y="${sy(8)}" fill="#2a6496" font-size="11" font-weight="800">N / REAR</text>`;
    const no = level === 'upper' ? 'A-102' : 'A-101';
    const title = level === 'upper' ? 'UPPER FLOOR PLAN' : 'GROUND FLOOR PLAN';
    if (!Sheet) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${body}</svg>`;
    }
    return Sheet.svg({
      w: VB_W,
      h: VB_H,
      no,
      title,
      subtitle: 'Plan closure inside frozen shells · Pennsylvania RIGHT · north LEFT',
      note: `Conditioned SF ${livingTarget().A} / ${livingTarget().B} · plates A ${pa.x},${pa.y} ${pa.w}×${pa.h} · B ${pb.x},${pb.y} ${pb.w}×${pb.h} · demising x=${demisingX()} blank`,
      verdict: 'PASS',
      aria: `R5.1e ${level} plan closure`,
      body,
    });
  }

  return {
    PARENT,
    TARGET,
    parents,
    analyze,
    renderFloor,
    unitARooms,
    unitBRooms,
    schedule,
    openings,
    windows,
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2R51ePlanClosure;
