# Lot 2 — End-of-shift handoff · 2026-08-23

**Thread closed for shift.** Next agent / next session: do not reopen Path A vs Path B. That vote is settled.

## Live status

| Item | Status |
| ---- | ------ |
| **R5.1e-v1.1** | **DESIGN COMPLETE / PROGRAM GATE PASS** |
| **R5.1e-v1.0** | **COMPLETE BASELINE / PROGRAM GATE NOT CLEARED** — preserved, not live |
| Parking (`reset_r5`) | FULL PASS / frozen |
| Living program | **1,639 / 1,720 SF** · 1,600–1,900 / Δ **81** ≤ 120 |
| Demising | **x=68** blank (moved 2′ west from v1.0 x=70) |
| Plates | A `68,5 58×22.5` · B `28,5 40×28` |
| Ridges | 27.0′ / 26.5′ unchanged |
| Engine authority | `js/lot2-r51e-lock.js` wins if a page disagrees |
| Professional validation | **Pending** — zoning · fire · structural · civil/survey |
| Git | Local `main` pulled; was already even with `origin/main` before this commit |

Honest program: **R5 — two enclosed garage spaces plus two covered spaces, independently accessible.** Pennsylvania = SOUTH / FRONT at the **right** of every plan.

## What this shift did

Path B was chosen: keep v1.0 as the first fully reconciled drawing package, then reopen **only** demising / ownership so the original living gate is not waived.

Scan order was x=69, then x=68. **x=69 failed** (A 1,598 / Δ 165). **x=68 promoted.** The wall was not crept further.

Frozen on purpose: Penn access, parking boxes, vehicle sweep, exterior envelope (west x=28, east x=126), ridges, garages, covered stalls / eight posts, site placement, repaired Unit A core. ENTRY B moved to x=64.4 so it does not cross x=68. Garage B east face stays x=66.

v1.0 SVGs archived at [`../imgs/r51e-v1.0/`](../imgs/r51e-v1.0/). Identity: [`../js/lot2-r51e-v10-baseline.js`](../js/lot2-r51e-v10-baseline.js).

Conflict catalog §H is **resolved**: [`lot2-status-conflicts.md`](lot2-status-conflicts.md).

## Where to start next shift

1. Hub: [`../index.html`](../index.html)
2. Package: [`../r51e-deliverable.html`](../r51e-deliverable.html)
3. Geometry write-up: [`lot2-r51e-v11.md`](lot2-r51e-v11.md)
4. Reviewer tracker: [`lot2-r51e-validation-readiness.md`](lot2-r51e-validation-readiness.md)
5. Gate: `node scripts/r51e-arch-massing-gate.js` then `node scripts/r51e-deliverable-gates.js` — must exit 0

## Next work (do these, in this order)

1. **Professional-validation readiness** against frozen v1.1. Do not redesign. Fill [`lot2-r51e-validation-readiness.md`](lot2-r51e-validation-readiness.md) when reviewers answer.
2. Do **not** creep demising past x=68. Do **not** shop R6.4A/B or new concepts.
3. Presentation / sheet-legibility may still move text, dims, and title blocks. A prettier picture that must move a volume **fails visualization**.
4. Optional leftovers, not blockers: archive vs named-alternate for R5 schematic / `study.html`; GitHub Pages on/off.

## Do not

- Treat 1,556 / 1,806 as the accepted design.
- Call v1.0 the live DESIGN COMPLETE package.
- Move parking, posts, sweep paths, or the exterior mass envelope to “fix” a drawing.
- Delete flagged historical landings. Catalog them; do not erase them.
- Relax the living gate again to match a drawing.

## Verify before editing geometry

```
node scripts/r51e-deliverable-gates.js
```

Expect: `DESIGN COMPLETE / PROGRAM GATE PASS · R5.1e-v1.1` and exit 0. If architectural-massing SVG is stale vs the engine, regenerate with `node scripts/r51e-arch-massing-gate.js` first.
