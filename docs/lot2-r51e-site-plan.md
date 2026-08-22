# Lot 2 — R5.1e site plan

**Status:** **PASS / FROZEN**  
**Layer:** Design Deliverable v1.0 — site plan completeness  
**Building geometry:** unchanged

**Page:** [`../r51e-site-plan.html`](../r51e-site-plan.html)  
**SVG:** [`../imgs/r51e-site-plan.svg`](../imgs/r51e-site-plan.svg)  
**Engine:** [`../js/lot2-r51e-site-plan.js`](../js/lot2-r51e-site-plan.js)

## What this is

A plan-view proof that the frozen duplex sits on Lot 2 with Pennsylvania as the only access side. It annotates footprints, drive, stalls, setbacks, primary walks, and usable yards. It does **not** move architecture, restyle parking, or add landscaping / materials / photoreal.

## Gate (all required)

| Check | Meaning |
| ----- | ------- |
| architectureFrozen | Plates, stalls, massing still match freeze |
| pennOnlyAccess | Drive + Access A/B start at x ≈ 148; no bottom-edge street |
| parkingValid | R5 freeze + FS-SUV access **PASS** |
| parkingPathsUnchanged | Drive / Access A / Access B / outbound B exact |
| setbacksAgree | Working 20 / 25 / 5 / 10 · plates inside envelope |
| yardsAgree | Remaining survey after buildings + pavement |
| dimsProveLayout | Critical dims computed from frozen plates |
| walksFromOpenings | Walk A Penn → ENTRY A · Walk B spine → ENTRY B |
| appendagesInherited | Canopy A · eyebrow B labeled APPENDAGE |
| postsInherited | 8 floor-rated posts |
| undercroftInherited | OPEN UNDERCROFT A 86,19 40×8.5 |
| noBottomStreet | Pennsylvania graphic on the right-hand 50′ only |
| planClosureHeld | Floor-plan closure still PASS |

Run: `node scripts/r51e-deliverable-gates.js`

## Critical dimensions (from freeze, not redrawn)

| Item | Value |
| ---- | ----- |
| Survey depth | 148.00′ |
| Penn frontage | 50.00′ |
| Rear | 57.01′ |
| Working setbacks | 20′ front · 25′ rear · 5′ north · 10′ south |
| Plate A | `70,5 56×22.5` · 22′ to Penn · 2′ inside 20′ front setback |
| Plate B | `28,5 42×28` · 28′ to rear · 3′ inside 25′ rear setback |
| North | plates on the 5′ setback line |
| Demising | x=70 |
| Drive | 12′ · Penn origin |
| Garage A apron | 24′ (door at x=124 → Penn at 148) |
| Doors | 16′ east · ENTRY A north · ENTRY B from spine |

Working setbacks are **planning assumptions — not survey fact**. Zoning remains PROFESSIONAL VALIDATION PENDING.

## Yards (2′ grid sample)

| Region | SF |
| ------ | -- |
| Rear (west of plate B) | 1,528 |
| North setback strip | 480 |
| Penn / front remainder | 280 |
| South (irregular) | 1,152 |
| **Yard total** | **3,440** |
| Building (plates − undercroft) | 1,020 |
| Paved / circulation | 2,628 |
| Survey | 7,023 |

Paved includes the freeze drive, Access A, Garage A 24′ apron, stall slabs, and the sweep-clear undercroft. Covered stalls stay open.

## What was not added

Landscaping, photoreal materials, decorative paving, a second curb, or any relocated stall / plate / path.

## Next

Four elevations, Pennsylvania first, then the opposite side, then the two flanks. Then only the sections needed to prove stairs, floors, garage, and ridges **27.0′ / 26.5′**.

## Related

- [`lot2-r51e-deliverable-v1.md`](lot2-r51e-deliverable-v1.md)
- [`lot2-r51e-plan-closure.md`](lot2-r51e-plan-closure.md)
- [`lot2-r51e-architectural-massing.md`](lot2-r51e-architectural-massing.md)
