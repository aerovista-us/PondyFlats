# Model-to-report orientation contract v1

## New reusable design-document sources (2026-10-12)

The no-reflection, source-signature and exact-source-orientation policy applies to **all** candidate-generated rooms, doors, roofs, ridge/valley model previews, section cuts and future scaled sheets. Do not reuse a Design 4 or 5 specific transform, change the jog's model handedness, move a house for display, or treat model +Y down as surveyed west/east. A copied browser-local draft from a changed owner becomes stale and must revalidate. Report 22-slot statuses, model preview, locked roof and physical approval are separate. Integration details: [LotScope consumer contract](LOTSCOPE_SHARED_DESIGN_CONSUMER.md).


Applies to all NEW candidate-derived sheets and the existing PondyFlats Design 4 package exporter. Gate owner: `js/report-orientation-contract.js`.

## Source authority and axes

- The saved candidate's vertex array and revision are the only geometric authority. A rendering screenshot, rotated preview, generated image, or prior report cannot replace that evidence.
- The LotScope/Pondy model convention is **+X right toward the modeled street, +Y down toward the jogged parcel side**. This is NOT a surveyed compass bearing; never claim geodetic east/west/north/south from model XY alone.
- Every sheet requires an explicit affine world-to-page matrix `[a,b,c,d,tx,ty]` with determinant `ad−bc > 0`. Default policy also requires `a>0,d>0,b=c=0` (no reflection or silent rotation). A whole-page rotation, when needed, must be explicitly reviewed and recorded with a positive determinant, and must apply equally to all geometry and access routes.
- All polygon vertices, drive/path control points, source face boundaries, component positions and source IDs must agree numerically under the same matrix. Validate signed polygon area, units and bounding extents. Report labels are anchored after geometry mapping and must not be reflected as text.
- Every source geometry / report pair is bound by the original candidate SHA and exact revision. If geometry changes, report and dependent roof, mobility, dimension, elevation, section and axon evidence becomes stale and must be regenerated.

## V2 root-cause example: adaptive-front-l

Candidate `auto-PONDY-AFL-14` source points include parcel `[[0,0],[148,0],[148,50],[125.143,43.016],[84.813,43.016],[0,57.01]]` and the street-facing edge at `x=148`.

The original Design 5 concept exporter used `pageY=535−5.55·modelY`, a negative-determinant reflection that placed the jogged site boundary **at the top**. The corrected V2 package uses `pageY=218.59+5.55·modelY`; house footprint, integrated garages, shell view and drive approaches follow the same canonical source convention. No mirror, house shape re-design or change to the source candidate is authorized.

The V2 package is a private user artifact. **Do not put the source candidate or customer geometry on public GitHub Pages without permission.** Its `orientation_check.py` validates the exact exported SVG, HTML, PDF images and signed areas against the uploaded JSON and locked manifest.

## Release policy (required)

1. Read saved JSON and its source hash; validate model assumptions. If model axes/geodetic bearings are ambiguous, show model axes and fail closed on compass claims.
2. Generate site and shell drawings from source vertices with one controlled transform per documented camera/sheet, not screenshot transforms.
3. Run `npm run gates:report-orientation` before package exports. For each new candidate package, also run the full per-component/source-sha gate (similar to the V2 package verifier); never treat the existing D4 fixture as proof for a different candidate.
4. Compare preview/HTML/PDF imagery, including page and image hashes, source-vertex geometry and deliberate mirror/point-tamper negative tests.
5. If any test fails, mark `REVIEW_REQUIRED / NOT_PUBLISHED`, do not claim the customer package accurate or issue it automatically.
6. Do not infer interiors, room dimensions, roofing, structural systems, zoning/permit acceptance or vehicle outbound proof from a concept-only candidate.
7. Preserve `CONCEPT ONLY - NOT FOR CONSTRUCTION` until independent source evidence and professional approvals are actually supplied.

## Automation implementation

- `js/report-orientation-contract.js`: shared matrix and source vertex/handedness guard.
- `scripts/report-orientation-gates.js`: actual Design 4 site parcel acceptance and deliberate mirror/vertex/path failure regression.
- `package.json`: `npm run gates:report-orientation` runs before `npm run export` and within full `npm run gates`.
- `.github/workflows/d4-sheet-visual-qa.yml`: exact-head CI triggers and enforces the guard on changes to report geometry/gate code.
- Future general candidate-to-report exporters **must import the module and also bind the exact candidate source record**, rather than assuming Design 5-specific transforms.

No completed structural/architectural permitting or true north bearing is asserted by this contract.
