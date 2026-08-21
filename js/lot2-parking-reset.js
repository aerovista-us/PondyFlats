/**
 * Lot 2 — Parking Reset Gate (integrated + detached).
 * Verdicts: FULL PASS | CONDITIONAL | FAIL | REVIEW
 * CONDITIONAL = viable working geometry with named open hard checks (not a premature approval).
 */
const Lot2ParkingReset = (() => {
  const L = typeof Lot2 !== 'undefined' ? Lot2 : {};
  const A = typeof Lot2Access !== 'undefined' ? Lot2Access : null;
  const Sk = typeof Lot2AccessSkeleton !== 'undefined' ? Lot2AccessSkeleton : null;
  const V = (typeof Lot2SOT !== 'undefined' && Lot2SOT.SUV_FS) || { length: 20.5, width: 8, doorWidth: 16, apronDepth: 24 };
  const ORDER = L.PARKING_RESETS || ['reset_r6_1', 'reset_r6', 'reset_r5', 'reset_r7', 'reset_r8', 'reset_r1', 'reset_r2', 'reset_r4', 'reset_r3'];
  const MIN_BAY_DEPTH = L.MIN_LIFT_BAY_DEPTH || 22;

  function gateClear(d) {
    return d.gate ? d.gate.clear : d.clear;
  }

  function gateOk(d) {
    if (d.gate) return d.gate.clear >= V.length - 0.5 && d.gate.apron >= V.length - 0.5;
    return d.clear >= V.length - 0.5 && d.ok !== false;
  }

  function bayDepthReport(concept) {
    const rows = (concept.garages || [])
      .filter((g) => !g.covered)
      .map((g) => {
        const depth = (g.doorFace === 'E' || g.doorFace === 'W') ? g.w : g.h;
        const door = (g.doorFace === 'E' || g.doorFace === 'W') ? g.h : g.w;
        return {
          id: g.id,
          name: g.name,
          depth,
          door,
          ok: depth >= MIN_BAY_DEPTH && door >= V.doorWidth - 0.5,
          needDepth: MIN_BAY_DEPTH,
          needDoor: V.doorWidth,
        };
      });
    const ok = rows.length > 0 && rows.every((r) => r.ok);
    const detail = rows.length
      ? rows.map((r) => `${r.id}: ${r.depth}′ deep × ${r.door}′ door${r.ok ? '' : ` (need ≥${r.needDepth}′ deep · ≥${r.needDoor}′ door)`}`).join(' · ')
      : 'No enclosed bays';
    return { ok, rows, detail };
  }

  function householdIndependence(concept, access) {
    const hh = concept.households || [];
    if (hh.length < 2) {
      return { ok: !!access.independent, note: access.independent ? 'Engine independent bays' : 'Fewer than two household groups' };
    }
    const paths = concept.accessPaths || [];
    const byId = {};
    paths.forEach((ap) => { byId[ap.garage] = ap.path; });
    const hasPath = hh.every((h) => h.structures.some((id) => byId[id] && byId[id].length >= 2));
    const pennOk = hh.every((h) => {
      const p = byId[h.structures.find((id) => byId[id])];
      return p && p[0] && p[0][0] >= 147;
    });
    if (concept.sharedSpine) {
      const doorsOk = (access.doors || []).every((d) => (d.gate ? d.gate.clear : d.clear) >= 12);
      const ok = hasPath && pennOk && doorsOk;
      return {
        ok,
        note: ok
          ? 'Shared side-access spine · independent door staging per household'
          : 'Shared spine present but household door approaches incomplete',
      };
    }
    const primary = hh.map((h) => {
      const id = h.structures.find((s) => {
        const g = (concept.garages || []).find((x) => x.id === s);
        return g && !g.covered;
      }) || h.structures[0];
      return byId[id];
    });
    const split =
      primary[0] && primary[1]
      && (primary[0].some((pt) => pt[1] >= 30) !== primary[1].some((pt) => pt[1] >= 30)
        || Math.abs((primary[0][primary[0].length - 1]?.[0] || 0) - (primary[1][primary[1].length - 1]?.[0] || 0)) > 20);
    const ok = hasPath && pennOk && (access.independent || split);
    return {
      ok,
      note: ok
        ? 'Two household approaches (detached split)'
        : 'Household approaches not independently demonstrated',
    };
  }

  function analyzeReset(id) {
    const concept = L.CONCEPTS[id];
    if (!concept || !concept.parkingReset) return { id, error: 'Not a parking-reset concept' };
    const geom = L.validateConcept ? L.validateConcept(concept) : { status: 'FAIL', reasons: ['No validator'] };
    const access = A ? A.analyzeConcept(id) : { technical: 'FAIL', reasons: ['No access engine'], doors: [] };
    const arch = Sk ? Sk.architectureRemaining(concept) : { plausibleHomes: false, verdict: 'Poor', summary: 'No arch engine', unitA: {}, unitB: {} };
    const doors = access.doors || [];
    const stagingOk = doors.length > 0 && doors.every(gateOk);
    const hh = householdIndependence(concept, access);
    const threePoint = !!(access.threePoint || (access.shortTangents || []).some((n) => n.kind === 'short-tangent'));
    const shortTans = (access.shortTangents || []).filter((n) => n.kind === 'short-tangent');
    const minTangent = shortTans.reduce((m, n) => Math.min(m, n.have), Infinity);
    const tangentOk = shortTans.length === 0 || (Number.isFinite(minTangent) && minTangent >= 25 - 0.5);
    const bay = bayDepthReport(concept);
    const dailyOk = access.daily && !String(access.daily).startsWith('Poor') && !String(access.daily).startsWith('N/A');
    const surveyOk = geom.status === 'PASS' || (geom.inSurvey !== false && geom.inSetback !== false && !String(geom.status || '').includes('FAIL'));
    const containOk = geom.reasons
      ? !geom.reasons.some((r) => /outside survey|outside working setback/i.test(r))
      : surveyOk;
    const sweptHardFail = access.technical === 'FAIL'
      || (access.reasons || []).some((r) => /off survey|clips|hits|leaves the lot/i.test(r));
    const sweptSoftOk = access.technical === 'PASS'
      || (access.technical === 'REVIEW' && !sweptHardFail);

    const openIssues = [];
    if (!bay.ok) openIssues.push(`Bay envelope: ${bay.detail}`);
    if (!tangentOk || access.technical === 'REVIEW' || threePoint) {
      const tanNote = Number.isFinite(minTangent)
        ? `min tangent ${(+minTangent).toFixed(1)}′ < 25′ FS-SUV`
        : 'FS-SUV swept path still REVIEW / three-point';
      openIssues.push(`Swept path: ${tanNote}`);
    }
    (concept.openIssues || []).forEach((o) => {
      if (!openIssues.some((x) => x.includes(o.slice(0, 24)))) openIssues.push(o);
    });

    const checks = {
      containment: { ok: containOk && geom.status !== 'FAIL', detail: containOk ? 'Survey / setback OK' : (geom.reasons || []).slice(0, 2).join('; ') || geom.status },
      swept: {
        ok: sweptSoftOk,
        detail: access.technical === 'PASS' && tangentOk
          ? 'FS-SUV PASS · tangents ≥25′'
          : `FS-SUV ${access.technical}${Number.isFinite(minTangent) ? ` · min tangent ${(+minTangent).toFixed(1)}′` : ''}`,
      },
      staging: {
        ok: stagingOk,
        detail: doors.map((d) => `${(d.name || '').replace(/ ·.*/, '')}: ${(d.gate && d.gate.face) || d.best} ${gateClear(d)}′`).join(' · ') || 'No doors',
      },
      independent: { ok: hh.ok, detail: hh.note },
      daily: {
        ok: dailyOk && !threePoint && tangentOk,
        detail: `${access.daily || '—'}${threePoint || !tangentOk ? ' · fillet / three-point open' : ''}`,
      },
      bayDepth: { ok: bay.ok, detail: bay.detail },
      homeWidth: {
        ok: !!(arch.unitA && arch.unitA.ok && arch.unitB && arch.unitB.ok),
        detail: arch.summary || '—',
      },
      homeArea: {
        ok: !!arch.plausibleHomes,
        detail: arch.plausibleHomes
          ? (arch.mode === 'integrated'
            ? 'Integrated plates OK (garage = ground program inside plate)'
            : 'Both plates ≥600 SF contiguous (supports ~1,800 SF with upper)')
          : 'Contiguous plates insufficient for two plausible homes',
      },
    };

    const hardFail = !checks.containment.ok || sweptHardFail || !checks.staging.ok;
    const plateOk = checks.homeWidth.ok && checks.homeArea.ok && checks.independent.ok;
    const fullHard = checks.swept.ok && access.technical === 'PASS' && tangentOk && checks.bayDepth.ok
      && checks.daily.ok && plateOk && checks.containment.ok && checks.staging.ok;

    let verdict = 'FAIL';
    if (hardFail) verdict = 'FAIL';
    else if (fullHard) verdict = 'PASS';
    else if (plateOk && checks.staging.ok && checks.containment.ok && sweptSoftOk) verdict = 'CONDITIONAL';
    else if (access.technical === 'REVIEW' && plateOk) verdict = 'CONDITIONAL';
    else if (!plateOk || !checks.independent.ok) verdict = 'FAIL';
    else verdict = 'REVIEW';

    const reasons = [];
    Object.entries(checks).forEach(([k, v]) => {
      if (!v.ok) reasons.push(`${k}: ${v.detail}`);
    });
    openIssues.forEach((o) => reasons.push(`OPEN: ${o}`));
    (access.reasons || []).slice(0, 4).forEach((r) => reasons.push(r));

    return {
      id,
      label: concept.label,
      priority: concept.priority,
      program: concept.parkingProgram,
      geomStatus: geom.status,
      physical: access.technical,
      daily: access.daily,
      architecture: arch,
      checks,
      openIssues: [...new Set(openIssues)],
      verdict,
      reasons: [...new Set(reasons)].slice(0, 16),
      access,
      relative: concept.designConcern,
      bay,
    };
  }

  function analyzeAll() {
    const rows = {};
    ORDER.forEach((id) => { rows[id] = analyzeReset(id); });
    const full = ORDER.filter((id) => rows[id].verdict === 'PASS');
    const conditional = ORDER.filter((id) => rows[id].verdict === 'CONDITIONAL');
    const integ = (L.PARKING_RESETS_INTEGRATED || []).filter((id) => rows[id]);
    let lesson = 'No reset clears the Parking Reset Gate yet. Architecture stays off.';
    if (full.length >= 1) {
      const first = full.sort((a, b) => (rows[a].priority ?? 99) - (rows[b].priority ?? 99))[0];
      lesson = `FULL PASS: ${rows[first].label}. Schematic architecture may unlock after confirmation. Bay depth + FS-SUV 25′ fillet closed.`;
      if (full.length > 1) lesson += ` Also FULL PASS: ${full.filter((id) => id !== first).map((id) => rows[id].label).join(', ')}.`;
    } else if (conditional.length >= 1) {
      const first = conditional.sort((a, b) => (rows[a].priority ?? 99) - (rows[b].priority ?? 99))[0];
      const r = rows[first];
      const opens = (r.openIssues || []).slice(0, 2).join(' · ') || 'named hard checks still open';
      lesson = `First viable working geometry — conditional validation: ${r.label}. Four enclosed lift-assisted spaces and two viable ~22′ home plates. Still open: ${opens}. Final bay dimensions, FS-SUV swept path, lift equipment, ceiling height, structure, zoning and fire separation remain pending. Architecture stays OFF until FULL PASS.`;
      if (conditional.length > 1) {
        lesson += ` Also CONDITIONAL: ${conditional.filter((id) => id !== first).map((id) => rows[id].label.replace(/^Parking Reset /, '')).join(', ')}.`;
      }
    } else {
      lesson = 'Integrated track (R6.1 → R6 → R5 → R7 → R8) is the active search. Detached R1–R4 remain audit-only. No architecture yet.';
    }
    return {
      order: ORDER,
      rows,
      table: ORDER.map((id) => {
        const r = rows[id];
        return {
          id,
          reset: r.label,
          program: r.program ? `${r.program.spacesEnclosed} enc / ${r.program.spacesTotal} tot` : '—',
          track: (L.CONCEPTS[id] || {}).parkingIntegrated ? 'integrated' : 'detached',
          physical: r.physical,
          staging: r.checks.staging.ok ? 'PASS' : 'FAIL',
          homes: r.architecture.plausibleHomes ? 'Yes' : 'No',
          bay: r.checks.bayDepth.ok ? 'OK' : 'SHORT',
          arch: r.architecture.verdict,
          daily: r.daily,
          verdict: r.verdict,
        };
      }),
      lesson,
      fullPasses: full,
      conditionalPasses: conditional,
    };
  }

  return {
    analyzeReset,
    analyzeAll,
    ORDER,
    bayDepthReport,
    renderArchitectureOverlay: Sk ? Sk.renderArchitectureOverlay.bind(Sk) : () => '',
  };
})();

if (typeof module !== 'undefined') module.exports = Lot2ParkingReset;
