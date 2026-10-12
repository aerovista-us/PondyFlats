# PondyFlats consumer contract — LotScope universal design model

**2026-10-12.** This is the proposed **generic cross-repository integration boundary**, not a claim that all candidate drafts are already published to GitHub Pages. LotScope [PR #97](https://github.com/aerovista-us/lot-assessment/pull/97) introduced source-bound editable design documents; [PR #98](https://github.com/aerovista-us/lot-assessment/pull/98) added common geometry validation and temporary model previews for rooms, doors, stairs, centered gables, supported two-envelope valleys, zero-overhang fascia and source-face roof sections.

## Goal

Every saved candidate from LotScope (not only Design 4) should eventually produce a consistent, source-verified PondyFlats-style customer report and A-series drawing package. Differences in designs are **input geometry and validation evidence**, never a separate rendering engine per design number.

## Division of responsibilities

| Owner | Current authority | May *not* do |
| --- | --- | --- |
| LotScope candidate registry / saved intervention | Exact parcel, building owner, garage, access geometry, source IDs and revision | Inherit geometry from an older unrelated design |
| LotScope DesignDocument | Draft rooms/floors/stairs/roof zones, door widths, pitch/plate/ridge-axis and fascia proposals; exact candidate source signature | Imply a locked roof, solved code, or verified building section |
| LotScope universal model solver | Shared-wall/door/stair-XY checks, supported temporary gable faces/ridges/two-zone valleys and roof-face cut geometry | Invent unsupported slopes, nonzero overhang surfaces, opening swings or foundations |
| LotScope roof SOT and drawing handoff | Source-current **locked** 3D roof faces/junctions and conditional analytic interval evidence | Automatically promote a user draft/model preview into certified roof authority |
| Pondy sheet-document engine | Reusable sources, geometryRefs, gates and A-series sheet references | Copy unverified coordinates into a seemingly approved A-series drawing |
| Pondy customer report standard | Source-bound 22 evidence slots, orientation, presentation hierarchy, concept-only labels | Pretend feature-slot completeness equals physical architectural signoff |

## Integration data contract (proposed, not yet implemented)

```json
{
  "schemaVersion": "pondy-universal-design-consumer-v1-proposal",
  "projectId": "<source-project-id>",
  "candidateId": "<exact-source-candidate-id>",
  "candidateRevision": "<source-revision>",
  "sourceSignature": "<exact-component-signature-or-content-address>",
  "designDocumentRevision": "<browser-draft-revision>",
  "modelGeometryEvidence": "<solver-results-with-issues-and-status>",
  "lockedRoofEvidence": "<independent-authoritative-source-roof-handoff-or-WITHHELD>",
  "orientation": { "modelX": "right", "modelY": "down", "worldZ": "up" },
  "reportStatus": "CONCEPT_ONLY"
}
```

**Do not send the proposed JSON above to a public production API as though it already exists.** The future adapter must map it into the existing `pondy-sheet-document-v0.1` registry, with stable geometryRefs and individual source/gate dependencies; generated drawings should resolve live checked sources rather than carrying substitute hand-drawn vertices.

## Acceptance criteria for each sheet or report view

1. **Identity/source:** validate candidate, project, revision and component signatures before compiling. A changed wall, owner rotation/mirror/move, roof lock or stage invalidates dependent output and triggers regenerate/review, not automatic pass.
2. **Orientation:** use model +X right/+Y down, positive-determinant world-to-page transform, and consistent handedness across lot jog, houses, garages, circulation, massing and roof. No geodetic compass assertion without survey.
3. **Floor A-101/A-102:** do not call authored room polygons a complete floor plan. Show adjacency/common walls/door proposed widths as **model previews**, unless authoritative floor height/thickness/openings/stairs/program geometry becomes available. Unsatisfied access/egress remains open.
4. **Roof A-301 / elevations / axon:** model gable previews show **MODEL_PREVIEW** only. The independently source-current locked roof handoff controls any authoritative roof plan, 3D elevation, axon and camera analytic interval linework. Per-view unresolved/edge-on cases remain **REVIEW_REQUIRED**.
5. **Sections A-3xx:** two model-derived roof-face cross-section profiles are not a complete building section. Wall, floor, foundation, stair, opening and physical dimensions need their own exact source and evidence; otherwise WITHHELD.
6. **Eaves and fascia:** zero-overhang preview from explicitly authored dimensions may appear as MODEL_PREVIEW; a nonzero overhang must not be depicted by offsetting SVG edges absent solved extended 3D roof surfaces.
7. **Feature parity:** all **22 customer report feature slots** in `docs/UNIFIED_CUSTOMER_REPORT_STANDARD.md` stay visible; missing geometry receives an honest state, not an empty image or inferred asset. Print/PDF must eventually derive from the **same manifest and source signature**.
8. **Privacy and provenance:** browser-local drafts are not public Pages artifacts. Only an authenticated, permitted and explicitly consented release may publish client candidate geometries. A public Pages deploy should never be a side effect of `Create Customer Report`.
9. **Physical gates:** dimensional print calibration, survey/setbacks, circulation/mobility, structure/snow/drainage/fire/AHJ, and professional signoff are independent from model geometry. Preserve **CONCEPT ONLY — NOT FOR CONSTRUCTION** until each relevant gate is satisfied.

## What already exists / what remains

**Implemented and tested independently:** Pondy sheet-document schema and visual/dimension gates, its existing Design 1–4 customer presentation and D4 review sheets; LotScope source-bound draft authoring + private HTML report attachment and common room/roof/section model checks. The LotScope browser-generated HTML does not automatically update this repository's static report pages or create a deterministic engineering PDF.

**Still required for generic integration:** secure versioned server storage and collaboration; consumer adapter with exact source binding/gate invalidation; mapping generic room/roof model to A-series and full sections; cross-design regression fixtures (Designs 1–4 plus a new user-generated geometry); document-scale output, HTML/PDF parity, browser/rendered pixel QA and controlled authenticated publication. Do not mark these completed because a draft roof preview renders.

## Tests / maintained documents

- LotScope: `npm run lint`, `npm run test:universal-design`, `npm run test:universal-design-solving`, customer report and roof gallery tests, `npm run build`, hosted exact-head gates.
- Pondy: existing `npm run gates`, sheet-document, customer standard, orientation, D4 dimensions and browser visual acceptance gates. Execute exact declared npm scripts from `package.json`; do not invent new CI names.
- [Unified customer report standard](UNIFIED_CUSTOMER_REPORT_STANDARD.md), [Report orientation](REPORT_ORIENTATION_CONTRACT.md), [Sheet document](architectural-sheet-document-schema.md), [Workbench gate contract](WORKBENCH_AUDIT_CONTRACT.md).
- [LotScope master architecture](https://github.com/aerovista-us/lot-assessment/blob/main/docs/UNIVERSAL_DESIGN_ENGINE_MASTER.md) and [Workbench user guide](https://github.com/aerovista-us/lot-assessment/blob/main/docs/WORKBENCH_DESIGN_TO_REPORT_GUIDE.md).