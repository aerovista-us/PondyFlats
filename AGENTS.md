# PondyFlats Agent Rules

These rules govern Lot 2 geometry studies, access tests, and automated design iterations.

## Primary objective

Find the smallest defensible geometry change that converts a near-pass circulation study into a technical PASS without silently changing the project program.

A failed swept path is not automatically a failed concept. First determine whether the collision is against a **locked constraint** or a **movable design element**. If it is movable, attempt bounded corrections before closing the concept.

## Absolute access rule

**All vehicle access originates from Pennsylvania Street / the Pennsylvania side of Lot 2.**

- Pennsylvania is the right/east side in the current drawing convention (`x ≈ 148`).
- Do not create rear, west, alley, neighboring-lot, or off-site access as a rescue.
- A driveway may curve, flare, taper, widen locally, or change centerline after entering from Pennsylvania.
- Vehicle body and required maneuvering must remain on the Lot 2 survey except for the normal transition into the Pennsylvania right-of-way at the street edge.

## Constraint classes

Every test should classify geometry as one of three classes before changing anything.

### LOCKED — do not move to obtain a pass

- Survey/property polygon.
- Pennsylvania-only access origin.
- Design vehicle for the test: FS-SUV / full-size pickup class.
- Vehicle dimensions and turning-radius assumptions.
- Required number of dwelling units: 2.
- Original Program Gate garage count/capacity: two genuine 2-car garages / four enclosed spaces.
- 22×22 garage plates when testing the **Original Program Gate**. Do not shrink a garage to manufacture a pass.
- Required setbacks/building envelope as currently adopted for planning tests, unless the study is explicitly labeled as a setback/zoning verification study.
- A source concept marked `locked` remains historical evidence; create a variant rather than overwriting it.

### MOVABLE — optimize before rejecting

Unless a specific study freezes one of these items, the optimizer may change them within the locked constraints:

- Driveway centerline.
- Driveway curvature and tangent locations.
- Local driveway width, flare, taper, and turning bulb geometry.
- Apron/staging shape and exact location.
- Garage location by small translations.
- Garage door face/orientation and exact door position while preserving required clear door width.
- Unit footprint location by small translations.
- Unit footprint proportions, provided the home remains architecturally credible and the area/program target can still be met.
- Separation between buildings where code/program rules permit.

### CONDITIONAL — move only after cheaper corrections fail

- Garage orientation.
- Garage-to-unit attachment relationship.
- Primary home mass orientation.
- Large building translations.
- Major first-floor-area redistribution.

These are allowed only after driveway/apron/door micro-adjustments have been tested and documented.

## Required optimization order

For any near-pass or FAIL caused by a movable object, test changes in this order:

1. **Driveway centerline only** — move control points and smooth curves.
2. **Local pavement geometry** — add a flare, taper, local widening, or turning bulb without moving buildings.
3. **Apron/staging geometry** — adjust the usable approach zone while preserving required staging depth.
4. **Garage door position or face** — preserve garage size and independence.
5. **Garage micro-shift** — normally test ±1 ft, then ±2 ft, then ±3 ft if envelope allows.
6. **Unit micro-shift / footprint refinement** — normally test ±1 ft, then ±2 ft, then ±3 ft.
7. Only then consider a larger architectural re-layout.

Do not jump directly from a driveway collision to closing the concept.

## Near-pass rule

A concept is a **NEAR-PASS / ITERATE** rather than a terminal FAIL when:

- the only collision/pinch is against a movable or conditional design element;
- a Pennsylvania-origin path remains possible;
- the FS-SUV assumptions are unchanged; and
- the required garage/program capacity is unchanged.

A concept is a terminal physical FAIL only when the obstruction is a locked constraint or all bounded correction steps above have been exhausted and recorded.

## Pass standard

A technical circulation PASS requires all of the following:

- Pennsylvania-origin access.
- No swept-body intersection with fixed structures or the survey boundary during the on-lot maneuver.
- Required turning radius respected; no hidden impossible fillets.
- Each declared garage door has the required usable staging/approach depth for the selected gate.
- Independent access to each garage as claimed by the concept.
- Inbound and outbound maneuver are both demonstrated.

For design quality, do not optimize to a mathematical hairline. Record minimum clearance. Prefer **≥1 ft clear at the critical fixed obstruction and ≥2 ft where practical**. A smaller positive clearance may be a technical PASS but must be labeled **MARGINAL**.

## Report every attempted correction

Each iteration should record:

- failing object or boundary;
- whether it is LOCKED, MOVABLE, or CONDITIONAL;
- current minimum clearance/overlap;
- exact adjustment attempted;
- resulting minimum clearance;
- whether any other gate became worse;
- final status: PASS, MARGINAL, NEAR-PASS / ITERATE, or FAIL-CLOSED.

## G1-A guidance

G1-A is a circulation proof derived from locked G1, but **G1-A itself may be refined as a variant**. Do not mutate locked `g1`.

If G1-A is blocked by illustrative Unit B or driveway geometry, first reshape the Pennsylvania-origin driveway and local maneuver envelope. A small building shift is allowed only after driveway/apron corrections are tested. Do not close G1-A solely because an illustrative house drawn after the circulation proof creates a small pinch.

## Principle

**Preserve the program; move the cheapest geometry first.**

The purpose of the tests is to discover a workable arrangement, not to freeze an early sketch and prove that sketch fails.