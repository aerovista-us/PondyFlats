# PondyFlats Agent Rules

These rules govern Lot 2 geometry studies, access tests, and automated design iterations.

## Primary objective

Find the best legal site geometry for two comparable homes by spending driveway/pavement in the least valuable land first and protecting the largest contiguous buildable area for the homes.

A failed swept path is not automatically a failed concept. First determine whether the collision is against a **locked constraint** or a **movable design element**. If it is movable, attempt bounded corrections before closing the concept.

The current workbench is in a **concept reset / rediscovery phase**. Historical concepts are evidence and idea families, not dead ends merely because an older exact placement failed.

## Absolute access rule

**All vehicle access originates from Pennsylvania Street / the Pennsylvania side of Lot 2.**

- Pennsylvania is the right/east side in the current drawing convention (`x ≈ 148`).
- Do not create rear, west, alley, neighboring-lot, or off-site access as a rescue unless a later study explicitly establishes a legal recorded access condition.
- A driveway may curve, flare, taper, widen locally, or change centerline after entering from Pennsylvania.
- Vehicle body and required maneuvering must remain on the Lot 2 survey except for the normal transition into the Pennsylvania right-of-way at the street edge.

## Current site-planning rules

### 1. Use the true survey polygon

- The Lot 2 survey/property polygon is LOCKED.
- Do not simplify the lot into a rectangle or regular trapezoid for pass/fail work.
- Pennsylvania is the frontage/right side; depth runs approximately 148 ft toward the west/left.
- Irregular south-boundary segments must remain in every geometry test.

### 2. Treat building setbacks and driveway pavement separately

For current planning studies, **do not automatically exclude driveway pavement from a building setback**.

Working hypothesis to test and preserve unless contradicted by authoritative zoning/engineering review:

- open driveway/pavement may occupy building-setback land;
- primary building walls must remain inside the applicable building envelope;
- driveway approach/curb-cut rules remain a separate constraint;
- drainage, utilities, snow storage, fire access, easements, sight distance, and engineering requirements may still constrain pavement.

This is a **planning rule, not a permit determination**. Any final layout must be checked against the controlling City code and survey/easement conditions.

### 3. Prefer the 10 ft side-yard corridor for the driveway

The first access strategy tested for every new or reset concept should be:

**place as much of the shared driveway as practical inside the 10 ft side-building-setback corridor.**

Design intent:

- spend pavement in land already constrained for primary building mass;
- avoid consuming the center of the parcel with a large motor court;
- keep the largest contiguous central area available for the homes;
- branch out of the side corridor only where turning, garage access, or maneuvering requires it.

Do not force a constant 10 ft paved width if a legal/usable local flare is required. A narrow corridor may be the spine with wider pavement only at actual maneuver points.

### 4. Garages should intercept access early when possible

Prefer garage locations/orientations that minimize total driveway length and maneuvering pavement.

- Test garages toward the Pennsylvania/front portion of each building before pushing them to the rear.
- Garage doors must face a real, reachable approach/apron.
- A driveway merely reaching the building is not proof of garage access.
- Every declared garage must pass an actual inbound and outbound swept-path test to its door.
- Rear garages remain allowed when a specific geometry proves they are better, but do not assume them by default.

### 5. Protect home space over decorative pavement

- Do not create a central motor court unless the swept-path geometry proves the area is necessary.
- Minimize pavement area consistent with usable circulation.
- Landscaping, porches, courtyards, and architectural polish come after the driveway/garage skeleton passes.
- Compare concepts partly by how much clean, contiguous building envelope remains after circulation is solved.

### 6. Rear-25 accessory-structure study remains open

The recent setback research suggests detached accessory structures within the rear 25 ft may be governed by different side/rear rules than the primary dwelling envelope.

Treat this as a separate zoning-aware branch:

- do not assume a primary dwelling can use accessory-structure setbacks;
- identify whether a garage is attached or detached;
- test rear accessory-garage concepts only under the rule set applicable to that structure type;
- label these studies **ZONING-DEPENDENT** until verified.

## Historical concept reset rule

**Do not permanently discard E2, G1, V2, or other historical concept families merely because an older exact placement failed.**

Their old coordinates, driveway geometry, garage orientation, or setback assumptions may be obsolete.

For each promising historical family:

1. preserve the original/locked source as historical evidence;
2. create a new reset variant rather than overwriting it;
3. re-place the concept on the true survey polygon;
4. apply the current setback assumptions/rules;
5. first attempt the 10 ft side-setback driveway spine;
6. move and/or rotate garages to intercept the driveway efficiently;
7. move, rotate, or proportion building masses to maximize usable home area;
8. remove unnecessary central pavement;
9. run full FS-SUV inbound/outbound and garage-entry validation;
10. only then decide whether the concept family remains viable.

Recommended naming:

- `E2-R1`, `E2-R2`, ...
- `G1-R1`, `G1-R2`, ...
- `V2-R1`, `V2-R2`, ...

where `R` means **reset under current rules**, not a modification of the historical source.

## Constraint classes

Every test should classify geometry as one of three classes before changing anything.

### LOCKED — do not move to obtain a pass

- Survey/property polygon.
- Pennsylvania-only access origin under the current no-rear-access baseline.
- Design vehicle for the test: FS-SUV / full-size pickup class.
- Vehicle dimensions and turning-radius assumptions.
- Required number of dwelling units: 2.
- Required applicable building setbacks for the declared zoning scenario.
- A source concept marked `locked` remains historical evidence; create a reset/revision variant rather than overwriting it.

### PROGRAM TARGET — preserve unless a study explicitly says otherwise

- Two comparable homes near the current ~1,800 SF/home target.
- Four practical parking spaces total.
- Prefer two genuine 2-car garages when geometry supports them.

The former 22×22 garage plate is no longer a universal geometry lock during rediscovery. It remains a useful quality benchmark and may remain locked inside studies explicitly labeled **Original Program Gate**. New reset studies may test more efficient credible 2-car dimensions/configurations, but must never shrink a garage only to manufacture a false pass.

### MOVABLE — optimize before rejecting

Unless a specific study freezes one of these items, the optimizer may change them within the locked constraints:

- Driveway centerline.
- Driveway curvature and tangent locations.
- Local driveway width, flare, taper, and turning bulb geometry.
- Apron/staging shape and exact location.
- Garage location.
- Garage door face/orientation and exact door position while preserving usable clear width.
- Unit footprint location.
- Unit footprint proportions, provided the home remains architecturally credible and area/program targets can still be met.
- Separation between buildings where code/program rules permit.

### CONDITIONAL — use when it creates a materially better site

- Garage orientation.
- Garage-to-unit attachment relationship.
- Primary home mass orientation.
- Large building translations.
- Major first-floor-area redistribution.
- Detached rear accessory garage strategy.

During the current concept-reset phase, these are legitimate design variables. Do not wait until every micro-adjustment fails if a larger reset clearly better satisfies the new site-planning rules.

## Required optimization order — existing near-pass concepts

For a near-pass variant whose basic family is still sound, test changes in this order:

1. **Driveway centerline only** — move control points and smooth curves.
2. **Local pavement geometry** — add a flare, taper, local widening, or turning bulb without moving buildings.
3. **Apron/staging geometry** — adjust the usable approach zone while preserving required staging depth.
4. **Garage door position or face** — preserve garage capacity and independence.
5. **Garage micro-shift** — normally test ±1 ft, then ±2 ft, then ±3 ft if envelope allows.
6. **Unit micro-shift / footprint refinement** — normally test ±1 ft, then ±2 ft, then ±3 ft.
7. Then consider a larger architectural re-layout.

## Required optimization order — reset/discovery concepts

For `*-R*` reset concepts, use this order instead:

1. true survey polygon;
2. applicable setback envelopes/zones;
3. preferred 10 ft side-setback driveway spine;
4. minimum required local maneuver pavement;
5. garage placement and door orientation;
6. FS-SUV access to each garage;
7. remaining clean home envelopes;
8. building mass placement/proportion;
9. architectural planning only after the circulation skeleton survives.

## Near-pass rule

A concept is a **NEAR-PASS / ITERATE** rather than a terminal FAIL when:

- the only collision/pinch is against a movable or conditional design element;
- a Pennsylvania-origin path remains possible;
- the FS-SUV assumptions are unchanged; and
- the core dwelling/parking program remains credible.

A concept is a terminal physical FAIL only when the obstruction is a locked constraint or the relevant bounded/reset correction sequence has been exhausted and recorded.

## Pass standard

A technical circulation PASS requires all of the following:

- Pennsylvania-origin access for the baseline scenario.
- No swept-body intersection with fixed structures or the survey boundary during the on-lot maneuver.
- Required turning radius respected; no hidden impossible fillets.
- Each declared garage door has a real usable approach/staging zone.
- Independent access to each garage as claimed by the concept.
- Inbound and outbound maneuver are both demonstrated.

For design quality, do not optimize to a mathematical hairline. Record minimum clearance. Prefer **≥1 ft clear at the critical fixed obstruction and ≥2 ft where practical**. A smaller positive clearance may be a technical PASS but must be labeled **MARGINAL**.

## Report every attempted correction

Each iteration should record:

- source family and reset/revision ID;
- zoning/setback scenario used;
- failing object or boundary;
- whether it is LOCKED, MOVABLE, CONDITIONAL, or ZONING-DEPENDENT;
- current minimum clearance/overlap;
- exact adjustment attempted;
- resulting minimum clearance;
- pavement area if available;
- remaining usable building-envelope area if available;
- whether any other gate became worse;
- final status: PASS, MARGINAL, NEAR-PASS / ITERATE, or FAIL-CLOSED.

## G1-A guidance

G1-A remains a useful circulation proof derived from locked G1, but it is no longer the only recovery path for the G1 family.

- Preserve G1 and existing G1-A history.
- Existing G1-A may continue through its bounded micro-optimization workflow.
- In parallel, create `G1-R*` reset variants using the current side-setback-driveway and garage-first rules.
- Do not close the G1 family solely because an older house placement creates a pinch.

Apply the same logic to E2, V2, and other historically promising families.

## Principle

**Put pavement where buildings cannot efficiently go; put garages where vehicles can reach them with the least pavement; give the best remaining geometry to the homes.**

The purpose of the workbench is to discover the best site arrangement, not to defend or disprove an early sketch.

## Workbench pipeline

Every **new** design follows [`docs/lot2-design-pipeline.md`](docs/lot2-design-pipeline.md).

Order: **Lot → Brief → Possible → Fit → Arrange → Read → Travel → Setbacks → Package → Polish → Export → Present**. Freeze only when explicitly requested.

Start by creating or ingesting the **lot**, then load the **project brief** (program, vehicle, access, setbacks, living targets — built per project), then fit that brief onto that lot. This repo’s Lot 2 survey is already locked in `js/lot2-sot.js`. New designs on Lot 2 start at Brief. A different property starts on LotScope; `lot.html` is a fallback ingest in this repo.

When Travel and Setbacks are proven (PASS or CONDITIONAL), emit the full package without waiting: site, plans, bubble, four elevations, two sections, same-camera massing **and axon** (doors outlined red, windows outlined blue), swept-path proof, checks, and dedicated Site / Plans / Elevs / Axon HTML pages. After Arrange, **Read** (two homes, both entries, ownership) before polish. Then polish, export a standalone client folder (`npm run export`), and a separate presenter kit. The client does not receive the workbench. Do not stop at a circulation sketch. Do not mutate frozen R5.1e. Gaps: [`docs/lot2-pipeline-gaps.md`](docs/lot2-pipeline-gaps.md). Delivery: [`docs/lot2-delivery.md`](docs/lot2-delivery.md).
