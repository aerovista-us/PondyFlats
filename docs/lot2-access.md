# Lot 2 — Pass 2 SUV swept path

**Artifact:** [`access.html`](../access.html)  
**Engine:** `js/lot2-access.js` (read-only vs locked `Lot2.CONCEPTS`)  
**Vehicle:** `Lot2SOT.SUV_FS` — F-150 SuperCrew / Tahoe class (20.5′ × 8.0′, 25′ min rear-axle radius)

Locked Pass 1.5 footprints were **not** moved. Sequence: E2 → G1 → V2, then **H6 → H3 → stop**. Pass 2 architecture was not started.

## Design vehicle

| | |
|--|--|
| Length | 20.5′ |
| Width (mirrors) | 8.0′ |
| Wheelbase | 13.1′ |
| Min turn (rear axle) | 25′ |
| Outer front | ~28.2′ |
| Door | 16′ |
| Perpendicular apron target | 24′ |

This is an over-test. Compact-car success would not count as PASS.

## Five-way table (identical gate)

| Track | Concept | Physical access | Daily usability | Maneuver burden | Geometry change | Verdict |
| ----- | ------- | --------------- | --------------- | --------------- | --------------- | ------- |
| Baseline | E2 | FAIL | N/A — physically blocked | Severe | Not adopted — Unit B overlaps garages; no independent B door | FAIL |
| Baseline | G1 | FAIL | N/A — physically blocked | Severe | Not adopted — drive-only y≈36.5 possible; west 3-point remains | FAIL |
| Baseline | V2 | FAIL | N/A — physically blocked | Severe | Not adopted — do not clip V wings; 8′ A staging | FAIL |
| Challenger | H6 | FAIL | N/A — physically blocked | Severe | Not adopted — ~1′ off lot; 13′ CORE B aisle vs 20.5′ vehicle | FAIL |
| Challenger | H3 | FAIL | N/A — physically blocked | Severe | Not adopted — same y=41 FAIL; 14×20 mews unusable for FS-SUV | FAIL |

Baseline E2 / G1 / V2 remains on `access.html` as **Locked Pass 1.5** even if a later variant succeeds.

## Shared site constraint

Along the 40.33′ south run the lot line is ~**43′**. An 8′ vehicle needs a centerline at **y ≤ 39** to stay on survey. The schematic y=41 (finalists, H3) and y=40 (H6) aprons both put the south body off the lot.

A 22′ garage + 24′ perpendicular FS-SUV aisle is **46′**. Buildable depth on that run (lot ~43′ minus 5′ top setback) is ~33′. Perpendicular south-facing bays with a full aisle **do not fit this parcel** at the 40.33′ segment.

## Baseline (Final Three)

The schematic drive at **y = 41** cannot carry an 8′ SUV. West alley leftover tangent after the first 25′ fillet is **4′** (need 25′).

- **E2 (worst baseline):** Unit B overlaps garage south wall. Garage B has no independent 16′ door.
- **G1:** Same apron FAIL. 14′ gap south of Unit A could take a **drive-only** variant (~y=36.5) — not applied. West alley still a 3-point.
- **V2:** Same corridor + alley. Garage A staging **8′**. Highest daily pain if forced.

## H6 (challenger)

Best *intent* of the five: short south approach to a mid-lot garage core, no west alley. Still **FAIL**.

- Centerline **y=40** — ~1′ off survey vs ~2′ for y=41 schemes (closer, not on-lot).
- 90° at (74, 40): **10′** leftover vs **25′** needed.
- CORE B south aisle **13′** vs **20.5′** vehicle (CORE A south **16.6′**, and Unit B overhangs that wall).
- East/west core doors look into the flanking units (0′ staging). Shared-wall pair.
- Independent bays: **no**. Parking in the south aisle would block the other core.

A 1′ drive nudge does not create a 20.5′ aisle. The core would have to move — and even against the 5′ top setback, CORE B only gains ~16′ of south apron. That is why this is a **site constraint**, not an H6 tweak.

## H3 (challenger)

FAIL in the same class as the Final Three.

- Drive is the same **y=41 west-alley** polyline. Same off-lot + 4′ leftover tangent.
- Mews court is **14×20** in the Penn setback. An 8′ vehicle has **3′** each side; a 25′ radius cannot turn in that court. The vehicle is also **20.5′** long in a **20′** deep court.
- Garages at (48, 5) and (48, 13) **overlap 14′**. Not two independent bays.
- The mews is not maneuvering space for this design vehicle.

## Checklist

| Question | E2 | G1 | V2 | H6 | H3 |
| -------- | -- | -- | -- | -- | -- |
| Penn → garage inbound | Leaves lot y=41 | Same | Same | Leaves lot y=40 | Leaves lot y=41 |
| Garage → Penn outbound | Reverse + west 3-point | Same | Same | Reverse + south-court 3-point | Reverse + west 3-point |
| Forward / reverse | Reverse-out + stacked fillets | Same | Same | Reverse-out + short 90° at core | Same as finalists |
| Min turning clearance | 4′ vs 25′ at (15,12) | Same | Same | 10′ vs 25′ at (74,40) | 4′ vs 25′ at (15,12) |
| Pinch | Off-survey; clips Unit B + Garage A | Off-survey; both garages | Off-survey; both garages | Off-survey ~1′; clips cores | Off-survey; overlapping garages |
| Independent bays | No | No | No | No | No |
| Parking blocks other unit | Yes | Yes | Yes | Yes (shared south aisle) | Yes |

## Two judgments

**Technical:** all five FAIL on locked geometry.  
**Daily:** not scored as usable — physically blocked. H6 would still be a daily 3-point with a shared aisle even after a drive tweak. H3 would not be a pleasant mews arrival for an F-150.

H6 is the least-wrong *diagram*, not a PASS, and not a REVIEW.

## Decision gate

- H6 / H3 did **not** PASS cleanly → no promotion, no demotion of a finalist.
- They did **not** REVIEW → do not spend this pass comparing H6 building moves vs G1’s unused drive-only variant as if both were “almost.”
- **All five FAIL** → stop testing existing concepts as the circulation answer. Solve circulation as a **site constraint** first.
- **G1-A** (`g1a`): circulation **proof** only — east doors + y~37 south lane. Illustrative houses show architectural cost; **not a candidate**. See [`lot2-g1a.md`](lot2-g1a.md).
- **Parking Skeleton A-F** — parking only, no houses. See [`access-geometry.html`](../access-geometry.html) and [`lot2-access-geometry.md`](lot2-access-geometry.md).
- Do **not** attach architecture until a parking skeleton independently clears the pre-architecture gate. J1 is CLOSED (no rescue). Do not iterate G1-A further.

See also: [`shortlist-elimination-memo.md`](shortlist-elimination-memo.md)
