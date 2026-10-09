# S0 — Design 4 Geometry Inventory

Date: 2026-10-08
Baseline: `aerovista-us/PondyFlats@b02d32a` (main after PR #41)
Scope: inventory only. No Design 4 coordinates or customer-facing render output are changed by S0.

## Purpose

The architectural sheet engine needs a single way to answer three questions before it draws or dimensions anything:

1. **What geometry exists?**
2. **Which module owns it?**
3. **How authoritative is it?**

Design 4 already has good geometry, but the authority is split across parcel, site, plan, architecture, roof, and Workbench evidence modules. S0 records that split explicitly so the sheet engine can consume the existing truth without creating a second geometry system.

## Authority classes

| Class | Meaning |
| --- | --- |
| `FROZEN` | Parcel-level geometry that must not move for a drawing pass. |
| `PROMOTED` | Design geometry promoted into the current Design 4 package but not globally frozen. |
| `PLAN_GATED` | Geometry accepted by the plan/connectivity checks. |
| `ARCHITECTURE_AUTHORED` | Architectural development data currently authored in the architecture model. |
| `LOCKED_EXTERNAL` | Imported geometry with an external authority contract and fail-closed consumer checks. |
| `EVIDENCE` | QA / proof records; not source geometry. |
| `PRESENTATION` | Drawing-only material that must never become source geometry. |

## Inventory

| Domain | Current owner | Current status | Sheet-engine treatment |
| --- | --- | --- | --- |
| Parcel boundary | `js/lot2-sot.js::SURVEY` | **FROZEN** | Canonical parcel polygon. All sheet plans reference this source. |
| Parcel orientation | `js/lot2-sot.js` | **FROZEN** | Pennsylvania = right/front; north/rear = left. Never normalize to north-up behind the user's back. |
| Base parcel setbacks | `js/lot2-sot.js::SETBACKS` | Planning baseline | Carry as parcel constraints, not as a permit finding. |
| Design 4 survey copy | `js/lot2-design-4.js::SURVEY` | Exact duplicate today | Treat as a compatibility duplicate. Sheet engine points to parcel SOT instead of declaring a second survey authority. |
| Design 4 south boundary | `js/lot2-design-4.js::SOUTH_BOUNDARY` | Promoted | Referenceable geometry for site calculations and dimensions. |
| Home footprints | `js/lot2-design-4.js::HOMES` | **PROMOTED_GEOMETRY** | Primary Design 4 building footprint references. |
| Garage footprints | `js/lot2-design-4.js::GARAGES` | Current 22×22 locked rule in D4 | Primary Design 4 accessory-building footprint references. |
| Pavement envelopes | `js/lot2-design-4.js::PAVEMENT` | **CONCEPT_ENVELOPE** | Dimensionable only as concept/site geometry; no civil claim. |
| Parked vehicle poses | `js/lot2-design-4.js::STALLS` | Static-fit PASS | Evidence geometry for A-002; not architectural structure. |
| Design vehicle | `js/lot2-design-4.js::VEHICLE` | Workbench test model | Keep separate from building geometry and label as test/evidence. |
| Design 4 setback scenario | `js/lot2-design-4.js::SETBACKS` | **CONDITIONAL / AHJ_REVIEW** | Preserve status with the geometry. Never render conditional lines as approved setbacks. |
| Plan shells | `js/lot2-design-4-plan-closure.js::SHELLS` | PASS | Current polygons exactly match the Design 4 home footprints; retain both references until ownership is consolidated. |
| Ground rooms | `PLAN.ROOMS.ground.A/B` | PASS | Plan-gated room collections for A-101. |
| Upper rooms | `PLAN.ROOMS.upper.A/B` | PASS | Plan-gated room collections for A-102. |
| Plan entries | `PLAN.ENTRIES` | PASS | Shared entry authority used by plan and architecture. |
| Plan circulation graph | `PLAN.CONNECTIONS / ROOTS` | PASS | Validation topology. Not directly drawable geometry, but should remain attached to the plan gate. |
| Architectural openings | `js/lot2-design-4-architecture.js::OPENINGS` | Shared-world model | Two entries are derived from PLAN; garage overhead doors and windows are architecture-authored. |
| Vertical datums | `ARCH.HEIGHTS` | Working architectural datums | Home 20′, garage 11′, floor 10′. Dimensionable only with explicit working-datum labeling until promoted upstream. |
| Roof zones / junctions / surfaces | `js/lot2-design-4-roof-sot.js::ROOFS` | **AUTHORITATIVE_ALLOWED** | Strongest current geometry contract. Four owners are locked and exact surface faces are available. |
| Roof source provenance | `ROOF.SOURCE` | Imported LotScope authority | Preserve external commit/source provenance on any derived drawing. |
| Workbench path evidence | `docs/lot2-design-4-workbench-evidence.json` | **PASS_DESIGN_DEVELOPMENT_GEOMETRY** | Gate/evidence source only. It must not become a substitute for site/building coordinates. |
| Existing SVG/CSS decoration | renderer functions + page CSS | Presentation | Never ingest strokes, labels, shadows, hatch, or view transforms as geometry authority. |

## Verified relationships

S0 intentionally records relationships that can later become hard synchronization gates:

- `lot2-sot.js::SURVEY` and `lot2-design-4.js::SURVEY` are currently identical.
- `D4.HOMES[A/B]` and `PLAN.SHELLS[A/B]` currently describe the same home polygons.
- Plan entries are reused by the architecture opening model instead of being independently redrawn.
- Roof owner geometry keys correspond to the four Design 4 building owners.
- All four roof owners currently pass the roof consumer authority guard.
- Architecture sections use working wall datums that match the minimum roof surface plate elevations.

These are **relationships**, not permission to delete one side of a duplicated contract in this PR.

## Drift and ambiguity found by S0

### 1. Parcel survey is duplicated

The frozen parcel exists in `lot2-sot.js`, but Design 4 carries its own literal survey array. They match today, which is good, but literal duplication is a future drift risk.

**Resolution path:** the sheet document references the parcel SOT. A later model-cleanup PR can make Design 4 consume the parcel SOT directly after regression coverage is in place.

### 2. Home shell geometry is duplicated

Design 4 owns home footprints and the plan module repeats those polygons as plan shells. They also match today.

**Resolution path:** keep a synchronization gate now; later give one module explicit ownership and make the other derive/reference it.

### 3. Openings have mixed ownership

Entries come from the plan model. Windows and garage overhead doors are currently authored in the architecture model.

**Resolution path:** the sheet schema marks the whole set `ARCHITECTURE_AUTHORED` but documents the entry exception. Before wall editing becomes interactive, openings should move into a dedicated architectural model contract rather than remain renderer-adjacent literals.

### 4. Vertical datums are working values, not yet a general building model

The 20′ home, 11′ garage, and 10′ floor values are internally consistent with the roof surfaces, but their authority lives in the architecture module.

**Resolution path:** allow dimensions to reference them only as **working datums**. Promotion to a shared building model should happen before permit-style sheets are claimed.

### 5. Vehicle `doorWidth` semantics are ambiguous

The parcel SOT full-size vehicle baseline carries a 16′ `doorWidth`; the Design 4 vehicle object carries 20′ while the Design 4 garage program separately declares a 20′ garage door. That naming is too ambiguous for a dimension engine.

**Resolution path:** do not dimension garage openings from `VEHICLE.doorWidth`. Use explicit garage/opening geometry, then rename or remove the ambiguous vehicle field in a separate compatibility PR.

### 6. Setbacks represent different layers

Parcel SOT setbacks are a base parcel rule set. Design 4 also carries principal/accessory/inter-garage planning states, including `CONDITIONAL` and `AHJ_REVIEW`.

**Resolution path:** the sheet document carries both with source and status. The renderer must never flatten them into one generic "approved setback" layer.

## S0 exit criteria

S0 is complete when:

- every current Design 4 sheet geometry domain has an owning source;
- every source is assigned an authority class;
- known duplicates and ambiguous fields are documented rather than silently normalized;
- the next sheet layer can refer to geometry by stable IDs instead of copying coordinates;
- no customer-facing geometry changes are required to complete the inventory.

The accompanying `pondy-sheet-document-v0.1` contract is the immediate consumer of this inventory.
