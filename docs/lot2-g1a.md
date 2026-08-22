# Lot 2 — G1-A Circulation Proof / Optimization Track

**Artifact:** [`access.html`](../access.html) (section G1-A)  
**Locked original:** `Lot2.CONCEPTS.g1` remains unchanged.  
**Proof / optimization variant:** `Lot2.CONCEPTS.g1a`  
**Rules:** [`../AGENTS.md`](../AGENTS.md) · [`lot2-circulation-optimization.md`](lot2-circulation-optimization.md)  
**Machine-readable policy:** [`../config/lot2-circulation-rules.json`](../config/lot2-circulation-rules.json)  
**Related study:** [`access-geometry.html`](../access-geometry.html) — Parking Skeleton A-F

## Role

G1-A is a **circulation proof and optimization track**, not a promoted architectural candidate.

The important distinction is:

- locked `g1` is historical evidence and must not be altered;
- `g1a` may be refined in new revisions when the failure is caused by geometry that is allowed to move.

Do **not** close G1-A merely because an illustrative house or early driveway centerline creates a small pinch. First identify whether the obstruction is LOCKED, MOVABLE, or CONDITIONAL and run the bounded correction sequence.

## Absolute access rule

All vehicle access remains from **Pennsylvania Street / the right-east side of the drawing**.

No rear, west, alley, neighboring-lot, or off-site access may be introduced to manufacture a pass.

A Pennsylvania-origin driveway **may** curve, flare, taper, widen locally, or shift its centerline after entering the parcel.

## What stays locked

For comparable Original Program Gate testing:

1. Lot 2 survey polygon.
2. Pennsylvania-only vehicle access origin.
3. FS-SUV / full-size pickup design vehicle and turning assumptions.
4. Two dwelling units.
5. Two genuine 22×22 two-car garages / four enclosed spaces.
6. Current planning setback/building envelope.
7. Locked source concept `g1`.

Garage plates may translate or rotate if the study allows it, but they may not be shrunk under the Original Program Gate.

## What may move

Optimize these before rejecting G1-A:

- driveway centerline and control points;
- local driveway width, curve, flare, taper, or turn pocket;
- apron/staging geometry;
- garage door position or face;
- Garage B by a small translation;
- Unit B by a small translation or footprint refinement;
- larger architectural geometry only after the cheaper corrections fail.

## Required G1-A optimization order

1. **Driveway centerline only.** Shift/smooth the south lane and Garage B approach.
2. **Local pavement geometry.** Add a flare or local widening at the pinch without moving buildings.
3. **Apron / Garage B approach.** Improve staging and the final approach geometry.
4. **Garage door position or face.** Preserve required clear width and garage capacity.
5. **Garage B micro-shift.** Test roughly 1 ft, 2 ft, then 3 ft if the envelope permits.
6. **Unit B micro-shift / footprint refinement.** Use only after driveway and garage corrections are exhausted.
7. Major architectural re-layout is last.

The goal is the **smallest permitted change that produces a defensible PASS**, not proving that one exact sketch fails.

## Historical circulation generator

The original G1-A idea used east-facing garage doors with a south lane near y≈37:

| Bay | Plate | Door / approach intent |
| --- | --- | --- |
| Garage A | (102, 5) 22×22 | East-facing; Pennsylvania straight shot |
| Garage B | (25, 16) 22×22 | East-facing; Pennsylvania entry → south lane → shallow offset |

That circulation family remains useful evidence because it showed that a Pennsylvania-origin route can reach both independent bays without relying on a rear/alley access assumption.

## Current interpretation of a pinch

If the current renderer reports a small clearance at Unit B — for example the recent **~0.69 ft Unit B pinch** — treat that as a **NEAR-PASS / ITERATE condition** when:

- the vehicle is still approaching from Pennsylvania;
- the survey boundary and turning-radius assumptions are not the cause;
- the collision/pinch is against Unit B, driveway geometry, apron geometry, or another movable element; and
- the garage/program requirements are unchanged.

It is a terminal FAIL only if a locked constraint is the blocker or the bounded optimization sequence has been exhausted.

## Clearance scoring

Record actual engine output; never invent a passing clearance.

| Minimum swept-body clearance | Working status |
| --- | --- |
| overlap / negative | FAIL |
| 0 to <1 ft | MARGINAL / ITERATE |
| 1 to <2 ft | PASS, then review daily usability |
| ≥2 ft | STRONG PASS where practical |

A boundary, turning-radius, independence, or required staging failure remains a hard fail regardless of obstacle clearance.

## Inbound / outbound requirement

Both garages must demonstrate:

- inbound from Pennsylvania;
- valid declared-door staging;
- no swept-body collision with fixed obstacles or the survey boundary;
- independent access as claimed;
- outbound maneuver, normally reverse of inbound unless a valid forward exit is explicitly demonstrated.

## Houses after circulation

The illustrative G1-A houses were attached after the circulation envelope and should not become accidental immovable obstacles merely because they were drawn early.

Historical massing:

- Unit A: 20×22 = 440 SF at (82, 5).
- Unit B: 46×11 = 506 SF at (25, 5).

Those plates exposed architectural weaknesses — especially the thin Unit B bar and upper-floor burden — but they do **not** prove that the Pennsylvania-side circulation family is unusable.

If a small Unit B adjustment converts a marginal path into a clean pass while keeping the home credible, that is an allowed optimization of `g1a`; it does not overwrite locked `g1`.

## Iteration record

Each accepted or rejected adjustment should record:

```text
Variant: G1-A.x
Failure: [object/boundary]
Constraint class: LOCKED | MOVABLE | CONDITIONAL
Before clearance: [engine value]
Adjustment: [exact geometry change]
After clearance: [engine value]
Survey containment: PASS/FAIL
Turn radius: PASS/FAIL
Garage A staging: PASS/FAIL
Garage B staging: PASS/FAIL
Independence: PASS/FAIL
Inbound/outbound: PASS/FAIL
Verdict: PASS | MARGINAL | NEAR-PASS / ITERATE | FAIL-CLOSED
```

## Relationship to Parking Skeleton A-F

Parking Skeleton A remains the historical stripped-down reference for this east-door / south-lane family. Skeleton E remains another strong circulation reference under later tests.

Neither reference means G1-A should be frozen at one driveway centerline. The new rule is to preserve the hard program and **optimize the cheapest geometry first**.

## What this does not do

- Does not overwrite locked `g1`.
- Does not weaken the Pennsylvania-only access requirement.
- Does not shrink the FS-SUV.
- Does not shrink 22×22 garages under the Original Program Gate.
- Does not claim architecture passes merely because circulation passes.
- Does not allow off-site or rear access as a rescue.

See also: [`lot2-access.md`](lot2-access.md) · [`lot2-access-geometry.md`](lot2-access-geometry.md)
