# Lot 2 — Circulation Optimization Workflow

This document turns swept-path review into an iterative design process instead of a one-shot PASS/FAIL test.

See root [`AGENTS.md`](../AGENTS.md) for the controlling constraint classes and Pennsylvania-only access rule.

## Goal

When a layout almost works, make the **smallest legal and program-preserving adjustment** needed to obtain a defensible circulation PASS.

The circulation engine should answer two separate questions:

1. **What is causing the failure?**
2. **Is that thing allowed to move?**

Only failures against genuinely locked constraints should close a concept immediately.

## Constraint matrix

| Element | Default class | Allowed movement |
| --- | --- | --- |
| Lot 2 survey polygon | LOCKED | None |
| Pennsylvania access side | LOCKED | Entry must remain on Pennsylvania/right side |
| FS-SUV vehicle envelope | LOCKED | None during a comparable test |
| Turning-radius assumptions | LOCKED | None during a comparable test |
| 2 dwelling units | LOCKED | None |
| Two 2-car garages / four enclosed spaces | LOCKED under Original Program Gate | None |
| 22×22 garage size | LOCKED under Original Program Gate | Translate/rotate, but do not shrink |
| Planning setback/building envelope | LOCKED for current study | Change only in an explicitly separate zoning/setback study |
| Driveway centerline | MOVABLE | Freely optimize on-lot |
| Driveway width/shape | MOVABLE | Flare, taper, curve, widen locally |
| Turn bulb / maneuver pad | MOVABLE | Resize/reshape inside legal site area |
| Garage apron | MOVABLE | Reshape or relocate while retaining required staging depth |
| Garage door position | MOVABLE | Slide on a valid wall; keep clear width |
| Garage door face | MOVABLE | Reorient when geometry permits |
| Garage location | MOVABLE | Prefer micro-shifts before larger moves |
| Unit location | MOVABLE | Prefer micro-shifts before larger moves |
| Unit footprint proportions | CONDITIONAL | May adjust if architecture remains credible |
| Major building orientation | CONDITIONAL | Only after cheaper access corrections fail |

## Pennsylvania-side invariant

Every generated or manually adjusted option must satisfy:

`streetAccess = Pennsylvania`

In the current coordinate convention, Pennsylvania is the **right/east edge near x=148**.

Allowed:

- one or more curb cuts from Pennsylvania;
- a straight entry that later curves;
- local driveway flares and turn pockets;
- driveway centerline movement anywhere inside the parcel constraints.

Not allowed as a rescue:

- rear access;
- west-side access;
- an alley that does not exist;
- crossing a neighboring parcel;
- routing a vehicle outside the survey except for the normal street transition at Pennsylvania.

## Micro-adjustment search

Before moving a building, search the driveway geometry.

### Stage 1 — centerline

Test nearby path control points in small increments. For a pinch like the G1-A Unit B conflict, try moving the lane or curve away from the obstruction while retaining a smooth FS-SUV path.

Suggested search increments:

- ±0.5 ft
- ±1.0 ft
- ±1.5 ft
- ±2.0 ft

Do not require the driveway to remain a constant-width rectangular corridor.

### Stage 2 — pavement envelope

If the centerline alone is insufficient, allow:

- a local flare;
- a tapered widening;
- a curved inside edge;
- a wider maneuver pocket near a garage;
- a short turn bulb.

Keep the vehicle swept body on survey and preserve any required building setbacks.

### Stage 3 — apron and door

If the lane is clean but garage entry remains marginal:

- shift the apron;
- widen the usable staging zone;
- slide the garage door;
- change the door face if this produces a cleaner independent approach.

Do not count apron area that is physically unavailable or off-survey toward the staging requirement.

### Stage 4 — garage micro-shift

Test small garage translations while preserving its required dimensions:

- 1 ft
- 2 ft
- 3 ft

Record direction and resulting clearance.

### Stage 5 — unit micro-shift

Only after the access geometry has been optimized should a unit move. Test the smallest useful translation first.

The goal is not to redesign the house merely to satisfy an early driveway sketch.

## Clearance scoring

Record the minimum swept-body clearance against the critical obstruction.

| Clearance | Status | Meaning |
| --- | --- | --- |
| overlap / negative | FAIL | physical collision |
| 0 to <1 ft | MARGINAL | technical clearance may exist, but too tight for a preferred design |
| 1 to <2 ft | PASS | usable technical clearance; continue checking daily usability |
| ≥2 ft | STRONG PASS | preferred working buffer where practical |

Boundary, turning-radius, and required staging failures remain hard failures regardless of obstacle clearance.

## Classification of a failure

### FAIL-CLOSED

Use only when:

- the collision is with a LOCKED constraint; or
- a required program dimension cannot be met; or
- the complete bounded optimization sequence has been tested without success.

### NEAR-PASS / ITERATE

Use when:

- the path reaches the intended garage;
- the pinch is caused by a movable element;
- the deficit appears correctable by a small geometry change; and
- no locked rule must be relaxed.

### PASS

Use only after both inbound and outbound are proven and the declared-door staging and independence rules pass.

## G1-A specific interpretation

G1-A began as a circulation proof. The current rendered version may show a small pinch against illustrative Unit B after the houses were added.

That should be interpreted as:

**circulation pattern worth retaining + local geometry requiring optimization**

—not as proof that Pennsylvania-side access cannot work.

For G1-A, optimize in this order:

1. reshape/shift the south-lane centerline;
2. soften the approach curve to Garage B;
3. add local pavement flare at the Unit B pinch;
4. adjust the Garage B approach/door geometry;
5. micro-shift Garage B if required;
6. micro-shift or refine Unit B only if the preceding steps still miss the clearance target.

Locked `g1` remains unchanged throughout. Create a new G1-A revision/variant for each accepted geometry change.

## Iteration record format

Use a compact record like:

```text
Variant: G1-A.2
Failure: swept body vs Unit B
Constraint class: MOVABLE
Before: 0.69 ft minimum clearance
Change: lane control point +1.0 ft north; 14 ft local flare over 18 ft length
After: 1.42 ft minimum clearance
Boundary: PASS
Turn radius: PASS
Garage A staging: PASS
Garage B staging: PASS
Inbound/outbound: PASS
Verdict: PASS — usable, continue architecture review
```

The exact values must come from the geometry engine; never invent a PASS value.

## Decision rule

Do not ask, “Does this exact sketch pass?” and stop.

Ask:

**“What is the minimum permitted change that makes this Pennsylvania-access concept pass without weakening the program?”**