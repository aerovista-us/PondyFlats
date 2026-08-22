# Lot 2 — R5.1e v1.0 immutable baseline

**Revision:** `R5.1e-v1.0`  
**Date:** 2026-08-22  
**Status:** **DESIGN COMPLETE** · geometry **IMMUTABLE**

This is the first complete Pondy Flats design. Tag/archive this revision as the baseline against which professional-validation findings are recorded. Do not reopen alternatives unless a named defect in this frozen design requires it.

**Front door:** [`../r51e-deliverable.html`](../r51e-deliverable.html)  
**Hub:** [`../index.html`](../index.html)  
**Canonical host:** GitHub [aerovista-us/PondyFlats](https://github.com/aerovista-us/PondyFlats) — no separate running landing. Older HTML landings stay in-tree; see [`lot2-status-conflicts.md`](lot2-status-conflicts.md).  
**Gate:** `node scripts/r51e-deliverable-gates.js`  
**Identity source:** [`../js/lot2-r51e-sheet.js`](../js/lot2-r51e-sheet.js) `REV`

## What is frozen

- Parking FULL PASS (`reset_r5`)
- Plates A `70,5 56×22.5` · B `28,5 42×28` · demising **x=70** blank
- Conditioned SF **1,556 / 1,806**
- Heights: carport 9′ · ground FTF 10.5′ · upper 10′ · top of mass 20.5′
- Ridges **27.0′ / 26.5′**
- Eight covered-stall posts · covered stalls open
- Penn-side access · FS-SUV paths
- Plan-closure rooms, doors, windows
- Axon camera: OX 62, OY 455, SCALE_Y 4.05, SCALE_D 2.2, SCALE_Z 3.35, VB 1040×600

## What may still be edited

Presentation only: text, leaders, dimension strings, title blocks, view framing, annotation graphics. A prettier picture that must move a volume **fails visualization**, not architecture.

## Git tag (when committing)

When this tree is committed, tag:

```
r51e-v1.0
```

Message: `R5.1e Deliverable v1.0 — DESIGN COMPLETE; geometry immutable; professional validation pending.`

Do not force-move the tag. Later presentation fixes can live on `main` without changing `REV.id` unless geometry actually changes (it must not).

## Next phase

[`lot2-r51e-validation-readiness.md`](lot2-r51e-validation-readiness.md) — package what zoning, fire, structural, and civil/survey reviewers need. Findings are **external** to this baseline.
