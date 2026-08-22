# Lot 2 — R5.1e gate restoration

**Status:** validation corrected · repair active  
**Parking:** FULL PASS / frozen  
**Massing geometry:** PASS  
**Exact plans:** CONDITIONAL  
**Architectural massing / visualization:** LOCKED

## Why this correction was required

The Unit A core repair correctly removed enclosed rooms from the FS-SUV swept envelope, but the validator then changed the acceptance rules to match the resulting plan:

- Unit A target reset to 1,556 ±120
- minimum lowered from 1,600 to 1,550 after core repair
- comparable-home difference relaxed from 120 SF to 260 SF
- swept overlap tolerance set to 4 SF

Those exceptions are removed. The work must satisfy the approved rules; the rules do not move to satisfy the work.

## Restored gate

| Check | Requirement |
| --- | --- |
| Unit A living | 1,600–1,900 SF |
| Unit B living | 1,600–1,900 SF |
| Maximum difference | 120 SF |
| Opaque room / swept-body overlap | ≤0.05 SF numerical epsilon |
| Parking, paths and exterior mass | Frozen |

Current x=70 core-repair result: **1,556 / 1,806 SF** — core sweep repair passes, living gate fails.

## Active repair

Test demising **x=69** and **x=68** while preserving:

- R5 FULL PASS parking geometry
- repaired Unit A ground core
- exterior mass envelope
- covered stalls and floor-rated posts
- vehicle sweep and positive clearance

Promote only a result that clears every restored requirement. Otherwise return to ownership for an explicit product change.

## Source

- [`../js/lot2-r51e-lock.js`](../js/lot2-r51e-lock.js)
- [`../js/lot2-r51e-plans.js`](../js/lot2-r51e-plans.js)
- [`lot2-r51e-core-repair.md`](lot2-r51e-core-repair.md)
