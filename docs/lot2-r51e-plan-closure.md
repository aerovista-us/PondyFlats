# Lot 2 — R5.1e floor-plan closure

**Status:** **PASS**  
**Priority:** **#1** for Design Deliverable v1.0  
**Building geometry:** unchanged (massing polygons / plates / parking frozen)

> **FLAG (2026-08-22 — not deleted):** Priority #1 was the open work item. Closure is **PASS** and Deliverable v1.0 is DESIGN COMPLETE. Label kept. Catalog: [`lot2-status-conflicts.md`](lot2-status-conflicts.md).

**Page:** [`../r51e-plan-closure.html`](../r51e-plan-closure.html)  
**Ground SVG:** [`../imgs/r51e-plan-ground.svg`](../imgs/r51e-plan-ground.svg)  
**Upper SVG:** [`../imgs/r51e-plan-upper.svg`](../imgs/r51e-plan-upper.svg)  
**Engine:** [`../js/lot2-r51e-plan-closure.js`](../js/lot2-r51e-plan-closure.js)

## What this is

Exact-plan sanity already PASSed as room boxes. Closure is the architectural plan: named rooms, stairs, entries, garage doors, windows, dimensions, and an area schedule that still reconciles **1,556 / 1,806 SF**.

Unit A envelopes were already named. Unit B lumped rooms are split **inside frozen parents**:

| Frozen parent | Split |
| ------------- | ----- |
| MECH + STORAGE B `28,5 12×15` | MECH 5×15 · STORAGE 7×15 |
| LIVING / KITCHEN B `40,5 24×15` | LIVING 16×15 · KITCHEN 8×15 |
| STAIR + ENTRY B `64,5 6×15` | STAIR 6×12 · ENTRY 6×3 from spine |
| BEDS + BATH B `42,20 28×13` | BATH 8×13 · BED 1 10×13 · BED 2 10×13 |

Unions, areas, and non-overlap are gated. Massing still extrudes the frozen parent polygons — interior splits are plan-only.

## Invariants held

- SF A **1,556** · B **1,806**
- Plates A `70,5 56×22.5` · B `28,5 42×28`
- Demising x=70 · no openings
- Parking FULL PASS frozen
- Garage doors 16′ east · Entry A north · Entry B from spine

## Known plate constraints (not defects to reopen)

- Unit A living/dining is **10′ deep** (plate 22.5′ minus south bedroom band). Honest; do not deepen the plate.
- Unit B secondary beds are **10×13** over the garage. Tight but above min room.

## Next

Site plan **PASS / FROZEN**. Pennsylvania elevation **PASS**. Rear + side elevations next, then sections.

## Related

- [`lot2-r51e-deliverable-v1.md`](lot2-r51e-deliverable-v1.md)
- [`lot2-r51e-plans.md`](lot2-r51e-plans.md)
- [`lot2-r51e-core-repair.md`](lot2-r51e-core-repair.md)
