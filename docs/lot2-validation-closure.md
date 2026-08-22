# Lot 2 — R6 Validation Closure

**Status:** Accepted for validator harden · R6.2A **closed** · R6.4 daily-use is the active engineering track.  
**Matrix:** [`../parking-reset.html`](../parking-reset.html) · **Daily:** [`../r64-daily.html`](../r64-daily.html) · **Hub:** [`../index.html`](../index.html)

“25′ fillet closed” under the old body model was **directionally encouraging** but **not** FULL PASS evidence. Architecture stays **OFF**.

## Gaps closed

| Gap | Fix |
| --- | --- |
| Reserved plates not containment-tested | `allFootprints()` includes `reservedPlates`; survey + working setback (max **x=128**) |
| Integrated plates as full rectangles | `architectureRemaining()` / `plateMetrics()` notch drive/apron corridors |
| Swept body centered on axle path | `vehiclePoly()` places body **+6.25′** ahead of rear axle (`L/2 − rearOverhang`) from SOT |
| FULL PASS regressions | No PASS with plate outside setback, structural plate crossing, invalid axle model, or unresolved inbound/outbound |

Outbound reverse-of-inbound is scored for **FULL PASS** (`outbound` check). It softens technical to REVIEW when only outbound fails — CONDITIONAL can remain.

## Locked hierarchy (post daily-use)

| ID | Role | Result |
| -- | ---- | ------ |
| **R6.1** | Public **CONDITIONAL** lead | Continuity / show |
| **R6.4** | Active engineering | Geometry CONDITIONAL · **daily DAILY POOR** (~84′ B reverse · stacked lifts) |
| **R5** | Practical product challenger | Promote if lifts / deep reverse fail ownership |
| **R6.2A** | **Closed** | FAIL — axle body off-lot · **no curve work** |
| **R6.3** | AHJ fallback | Dual curb if shared-drive daily cannot close |

See [`lot2-r64-daily.md`](lot2-r64-daily.md).

## Regression helper

```bash
node -e "global.Lot2SOT=require('./js/lot2-sot.js');global.Lot2=require('./js/lot2-geometry.js');global.Lot2Access=require('./js/lot2-access.js');global.Lot2AccessSkeleton=require('./js/lot2-access-skeleton.js');const R=require('./js/lot2-parking-reset.js');console.log(JSON.stringify(R.assertValidationClosure(),null,2));"
```

`assertValidationClosure()` must report `ok: true` (no illicit FULL PASS).

## Freeze rule

Do **not** add `reset_r6_5+` or reopen R6.2A curves. Prefer **R6.3 / R5** after R6.4 daily findings over driveway widening.

## Related

- [`lot2-r64-daily.md`](lot2-r64-daily.md)  
- [`lot2-parking-reset.md`](lot2-parking-reset.md)  
- [`lot2-file-map.md`](lot2-file-map.md)  
- SOT vehicle: `js/lot2-sot.js` → `SUV_FS`
