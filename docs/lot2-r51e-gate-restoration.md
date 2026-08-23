# Lot 2 — R5.1e gate restoration

**Status:** **cleared by R5.1e-v1.1**  
**Parking:** FULL PASS / frozen  
**Live design:** [`lot2-r51e-v11.md`](lot2-r51e-v11.md) · **DESIGN COMPLETE / PROGRAM GATE PASS**  
**v1.0 baseline:** [`lot2-r51e-v1-baseline.md`](lot2-r51e-v1-baseline.md) · **COMPLETE BASELINE / PROGRAM GATE NOT CLEARED**

> Path B was chosen. v1.0 is preserved. Catalog: [`lot2-status-conflicts.md`](lot2-status-conflicts.md) §H (resolved).

## Why this correction was required

The Unit A core repair correctly removed enclosed rooms from the FS-SUV swept envelope, but the validator then changed the acceptance rules to match the resulting plan:

- Unit A target reset to 1,556 ±120
- minimum lowered from 1,600 to 1,550 after core repair
- comparable-home difference relaxed from 120 SF to 260 SF
- swept overlap tolerance set to 4 SF

Those exceptions are removed. The work must satisfy the approved rules; the rules do not move to satisfy the work.

## Restored gate (now passing at v1.1)

| Check | Requirement | v1.1 |
| --- | --- | --- |
| Unit A living | 1,600–1,900 SF | **1,639** |
| Unit B living | 1,600–1,900 SF | **1,720** |
| Maximum difference | 120 SF | **81** |
| Opaque room / swept-body overlap | ≤0.05 SF numerical epsilon | PASS |
| Parking, paths and exterior mass | Frozen | held |

v1.0 at x=70: **1,556 / 1,806 SF** — core sweep repair passes, living gate fails.

## Repair that was run

Tested demising **x=69** then **x=68** with parking frozen. x=69 failed (A 1,598 / Δ 165). **x=68 promoted** (1,639 / 1,720 / Δ 81). Wall was not crept past the smallest pass.

## Source

- [`../js/lot2-r51e-lock.js`](../js/lot2-r51e-lock.js)
- [`../js/lot2-r51e-plans.js`](../js/lot2-r51e-plans.js)
- [`lot2-r51e-v11.md`](lot2-r51e-v11.md)
- [`lot2-r51e-core-repair.md`](lot2-r51e-core-repair.md)
