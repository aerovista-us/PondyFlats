# Pondy Flats — Design 4 dimensional-sheet integration report
**Date:** October 11, 2026  
**Status:** Concept-review publication; NOT a construction, permit, zoning or professional approval.

## Executive conclusion
The reusable architectural dimension engine is merged in PondyFlats main (PR #43, merge `79203a7059f8c70013debe1905214910b48b05cb`). The integrated 15-dimension study overlays existing, source-derived Design 4 A-001 and A-101 SVG renderers rather than replacing the current site, driveway, roof or room plan models. The study is now linked as a *preliminary review* from the Design 4 Site and Plans pages. The original customer-facing drawings remain unchanged.

## Source and sheet coverage
- **A-001 site:** 9 dimensions, derived from frozen parcel survey and current Design 4 homes/garages. The Pennsylvania Street/right-side boundary is exactly **50 ft**; the parcel's **57.01 ft** overall Y bounding extent is distinct, and must not be substituted for frontage.
- **A-101 ground:** 6 dimensions, derived from validated Design 4 plan-shell polygons including Home B's L-shaped segments.
- Source provenance: sheet-document v0.1 has 6 source layers, 30 stable geometry references, 7 gates, 5 sheet groups and 13 catalogued drawings. The prototype adds no re-authored measurement values to that authority.
- Print studies: A-001 36×24 inches at 1/8 inch = 1 foot; A-101 36×24 inches at 1/4 inch = 1 foot. SVG page units are specified; physical printer calibration not certified.

## Implemented tests
- Source-selector presence, calculation and exact survey frontage; plan shell agreement.
- Zero-length and bad-reference rejection; fail-closed layout.
- Label/label, dimension-line/label, witness-line/label and tick/label interference checks at the tested screen and print coordinate systems.
- Dimension-label print-boundary checks and model-fit checks.
- Existing Design 4 roof authority and Workbench/circulation gates remain separate.
- GitHub self-audit and whole-report/browser regression on the merged S3 engine passed.

## Current presentation and release limitations
1. A-001 road-side labels are crowded by the 57.01 ft bounding-box callout; a single complete cross-layer collision solver for existing Pennsylvania Street text, dimensions and building annotations has not been proven.
2. A-101 floor-plan room names and status/entry annotations need browser-measured, full-scene collision tests, beyond the current analytical bounding-box model.
3. Printed scale needs physical device/page calibration; scale metadata does not equal architect-certified construction drawings.
4. Exact site/accessory setbacks, inter-garage fire separation and drainage, roof loads, structural engineering, snow-load requirements and AHJ approvals remain separate unresolved gates. No permit or fire-access approval is claimed.
5. The customer study remains concept design, not a certified measurement set. All dimensions must be checked against survey and actual construction plans by qualified professionals.

## Publication scope
The linked study is a **new, clearly marked concept review**. The current authoritative-looking primary A-001/A-101 SVG drawings, their gates, and LotScope roof geometry are not replaced. Do not remove conditional notices or treat the study as a build instruction.

## Next implementation sequence
1. Replace independent manual offsets with a full-scene SVG text/line/boundary collision solver, including street labels and status panels.
2. Make spatial conflict results and rendered desktop/mobile/print snapshots required CI jobs for exact PR head.
3. Calibrate printed-size exports, strengthen title blocks and architectural drawing legend/callouts; validate each sheet with a designer and surveyor.
4. Promote approved dimension annotations into the authoritative customer SVG renderers only after QA pass; then extend the common schema/engine to Designs 3 → 2 → 1.
5. Obtain local zoning, professional/structural, civil, snow-load and fire/AHJ acceptance separately from visual/design-development evidence.

## Provenance and caution
The frozen source geometry is not a licensed survey drawing or building permit. The protected roof surfaces originate in the separate LotScope roof SOT. Passing a software gate must never be described as municipal or construction approval.
