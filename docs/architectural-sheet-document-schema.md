# Pondy Architectural Sheet Document Schema v0.1

Date: 2026-10-08
Schema: `pondy-sheet-document-v0.1`

## What this contract does

The sheet document is the bridge between authoritative LotScope/Pondy geometry and a reusable architectural drawing engine.

It does **not** replace the parcel, Design 4, plan, architecture, roof, or Workbench models. Instead, it records which source owns each piece of geometry and gives the renderer stable IDs to reference.

The hierarchy is:

```text
sheet document
├── design identity + orientation
├── sources
│   └── path + revision + authority + current status
├── geometry references
│   └── stable id → source + selector + authority + status
├── gates
│   └── validation status + blocking semantics + source provenance
└── sheets
    └── drawings
        ├── geometryRefs
        ├── scale
        ├── dimensions
        ├── annotations
        └── gateRefs
```

No geometry coordinates are copied into the sheet document itself. The document references the source model.

## Files

- `schemas/pondy-sheet-document.schema.json` — portable JSON Schema shape contract.
- `js/lot2-sheet-document-schema.js` — runtime validator with cross-reference and uniqueness checks.
- `js/lot2-design-4-sheet-document.js` — Design 4 adapter mapping the existing A-series drawings into the common contract.
- `scripts/sheet-document-gates.js` — synchronization and fail-closed regression checks.
- `docs/architectural-sheet-engine-s0-geometry-inventory.md` — S0 authority inventory and known drift risks.

## Why both JSON Schema and the JS validator exist

JSON Schema defines the portable document shape and enum vocabulary.

The runtime validator additionally checks relationships that are awkward or impossible to express cleanly in the portable schema:

- unique IDs;
- source references resolve;
- geometry references resolve;
- gate references resolve;
- dimension references resolve;
- drawing IDs are unique across the document;
- literal dimensions carry finite values.

A document is not accepted by the sheet engine unless the runtime validator passes.

## Source authority

Every source has an authority class:

| Authority | Intent |
| --- | --- |
| `FROZEN` | Geometry is locked for the current parcel/workflow. |
| `PROMOTED` | Current design geometry is promoted into the package but may still evolve through the design workflow. |
| `PLAN_GATED` | Accepted by plan geometry/connectivity checks. |
| `ARCHITECTURE_AUTHORED` | Architectural-development geometry currently owned by the architecture model. |
| `LOCKED_EXTERNAL` | Imported from a separate authority contract and accepted only after consumer validation. |
| `EVIDENCE` | Proof/QA record rather than geometry ownership. |
| `PRESENTATION` | Visual-only material that must never become geometry authority. |

Authority and status are separate on purpose. For example, a source can be `PROMOTED` while its current design verdict remains `CONDITIONAL`.

## Geometry references

A geometry reference contains:

- a stable sheet-engine ID;
- geometry kind;
- owning source;
- source selector;
- authority class;
- current status;
- optional note describing limits or interpretation.

Example conceptually:

```json
{
  "id": "d4.home-a.footprint",
  "kind": "polygon2",
  "sourceId": "d4-geometry",
  "selector": "HOMES[id=HOME-A]",
  "authority": "PROMOTED",
  "status": "PROMOTED_GEOMETRY"
}
```

The selector is an auditable locator into the source model. It is not a second copy of the polygon.

## Sheets and drawings

v0.1 supports these drawing kinds:

- site plan;
- vehicle proof;
- floor plan;
- relationship plan;
- elevation;
- section;
- axonometric.

The Design 4 adapter currently maps the live drawing set:

| Sheet group | Drawings |
| --- | --- |
| Site + vehicle | A-001, A-002 |
| Plans + ownership | A-101, A-102, A-103 |
| Elevations | A-201, A-202, A-203, A-204 |
| Sections | A-301, A-302 |
| Axonometric | A-401, A-402 |

That is 5 sheet groups and 13 drawings.

## Scale

Every drawing declares a scale policy.

v0.1 accepts:

- `fit` — current responsive/diagrammatic sheet presentation;
- `architectural` — future architectural scale such as 1/8″ = 1′-0″;
- `engineering` — future civil/site engineering scale.

The initial Design 4 adapter uses `fit` because this PR does not yet change the existing responsive renderers.

Assigning true architectural scales belongs with the dimensioning/render-engine prototype, after page/paper layout is deterministic.

## Dimension contract

Dimensions are already part of the schema even though the v0.1 Design 4 adapter intentionally leaves each drawing's dimension list empty.

Supported dimension kinds:

- linear;
- aligned;
- angular;
- radius;
- area;
- elevation.

Each dimension must reference one or more geometry IDs.

Two value policies exist:

### `derive`

The preferred policy. The renderer/measurement layer computes the displayed value from referenced source geometry.

This is the default direction for real architectural dimensions because a geometry change then updates the dimension automatically.

### `literal`

Reserved for explicit values whose authority is not derivable from the referenced geometry.

A literal value must be finite and should be used sparingly. It must not be used to mask missing geometry.

## Annotation contract

Annotations are intentionally separate from dimensions.

Supported kinds are:

- note;
- label;
- keynote;
- status.

Annotations may reference geometry but do not acquire geometry authority by doing so.

This allows a sheet to say, for example, "AHJ review required" without turning that note into a dimensional or zoning claim.

## Gate references

Drawings reference relevant gates so the renderer can surface the correct status/disclosure beside the view.

Examples:

- A-001 references parcel survey, Design 4 geometry, and roof status.
- A-002 references static parking and exact Workbench path evidence.
- A-201 through A-204 reference plan geometry, roof authority, and professional-validation status.
- A-301/A-302 reference plan geometry, exact roof authority, and professional-validation status.

A future renderer can therefore display a drawing without separating it from the proof state that makes the drawing valid.

## Fail-closed rules

The schema layer must reject rather than silently repair:

- duplicate IDs;
- unknown source references;
- unknown geometry references;
- unknown gate references;
- unsupported authority/view/dimension types;
- literal dimensions without finite values;
- wrong parcel orientation;
- documents that omit required geometry/source/sheet structure.

It must not infer or invent missing geometry.

## Design 4 v0.1 status

The adapter intentionally records the current mixed authority honestly:

- parcel survey is frozen;
- Design 4 site/building geometry is promoted but overall conditional;
- room/plan geometry passes its connectivity gate;
- roof geometry is externally locked and authoritative for exact projection;
- Workbench path evidence is tracked as proof;
- professional/code/AHJ validation remains pending;
- openings and vertical datums are still architectural-development data, not a general permit model.

## What this PR does not do

This schema PR does not:

- change Design 4 coordinates;
- change customer-facing SVGs;
- add drawing dimensions yet;
- claim permit or construction-document status;
- consolidate duplicated source models yet;
- turn presentation CSS/SVG paths into geometry;
- add interactive wall/vertex editing.

Those are later layers built on this contract.

## Immediate next implementation layer

With S0 and the schema in place, the next safe step is the **dimensioning prototype against Design 4**:

1. implement reusable measurement primitives from geometry refs;
2. add deterministic extension lines, witness lines, arrows/ticks, labels, and collision-aware offsets;
3. prototype A-001 site dimensions and A-101 plan dimensions first;
4. verify every displayed value is derived from a source geometry reference;
5. add true paper/view scales only once the page-frame renderer is deterministic;
6. then extend the same sheet engine to Designs 3, 2, and 1.

That keeps the architecture sheet engine upstream of drag-and-drop editing, which is the intended build order.
