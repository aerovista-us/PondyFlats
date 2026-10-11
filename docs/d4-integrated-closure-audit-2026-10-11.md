# PondyFlats Design 4 — integrated roof, sheet and print audit
**Audit date:** 2026-10-11  
**Acceptance:** Concept-only review candidate. NOT professional acceptance, permit plans, or construction documents.  
**Audited source:** PondyFlats main `33b66a42403571a8952ab4d68c85867abf9d5778`; LotScope main `9b17d43286bbb97b29b293316d5af2378e620938` (includes roof regression PR #82).  
**Scope:** Home B valley, rotated owner/roof-lock invalidation, visibility/hidden-line edge cases, A-001/A-101 dimensions, site labels, browser rendering, and 36 × 24-in SVG print composition.

## What was verified and improved
| Area | Evidence | Decision |
|---|---|---|
| Home B roof junction | LotScope `npm run test:roof` verifies actual Home B plane-envelope valley, two derived valley edges, planar residuals ≤0.02 ft and exact face/footprint coverage; Pondy roof handoff records 4/4 locked owners | **PASS for versioned design-development geometry only** |
| Rotated/stale roofs | LotScope roof tests assert rotated Garage B has NO_MODEL rather than inheriting baseline roof authority; move/edit invalidates Home A lock; Intervention editor rotates Home B polygon footprint | **PASS fail-closed regression; every new edited roof still needs validation** |
| Roof depth/hidden line | Cardinal projection crossing, coplanar/overlap, near-parallel/rotated depth transitions and axon degeneracy tests pass; PR #82 merged. Axon sampling returns `SAMPLED_ONLY`, unresolved segments do not become authoritative | **PARTIAL: geometry diagnostics pass; final hidden-line drawing acceptance remains open** |
| Source/consumer contract | Pondy roof gate, sheet schema gate, A-001/A-101 dimension gates and customer review gates pass | **PASS for review candidate** |
| Geometry and measurements | 9 A-001 and 6 A-101 source-derived dimensions; Pennsylvania boundary = 50 ft, overall Y extent = 57.01 ft (not frontage). No customer primary geometry modification | **PASS / preliminary dimensions** |
| A-001 label interference | Shifted overall Y-extent label away from Pennsylvania Street; reflowed Garage A width to clear depth witness | **PASS browser text-collision audit** |
| A-101 label interference | Reflowed 40.5-ft width, 26.25-ft depth, 22-ft south-wing dimensions away from sheet headings, Flex/Office and Powder/Storage | **PASS browser text-collision audit** |
| Print composition | A-001 framed/centered at 1/8 in = 1 ft, pavement context and north marker; A-101 remains at 1/4 in = 1 ft; concept-only title blocks; 36 × 24 in and 2-in margins | **PASS generated geometric print-frame gate; printer accuracy uncalibrated** |
| Chromium visual QA | `scripts/d4-browser-visual-audit.cjs`: site/plan desktop, site/plan mobile, A-001/A-101 print; six cases, 15 dimension labels per paired sheets, **zero detected dimension/text intersections** after repair | **PASS scoped text-vs-text browser gate, not complete drafting approval** |

The browser test is optional because Puppeteer is not currently a package dependency. It writes screenshots and machine-readable evidence to `D4_VISUAL_QA_DIR` (default `/tmp/pondy-d4-visual-qa`). For the Oct 11 execution, Chromium at `/snap/bin/chromium` and the approved NXCore local Puppeteer installation were used. It is **not yet a mandatory CI visual job**. Source-level tests reject dimension label collisions and now also check newly generated witness/tick interference with earlier dimension labels. Cross-layer linework and other text obstacles are **not** fully proven.

## Priority punch list — still open
| ID | Priority | Owner | Outstanding acceptance condition |
|---|---|---|---|
| D4-01 | P1 | LotScope roof / architectural | Have roof designer verify Home B junction geometry, flashing/valley drainage, eaves and framing strategy. Plane solver success does not equal buildability |
| D4-02 | P1 | LotScope / Pondy renderer | Finish drawing-grade hidden-line contract: test every projected visible/hidden/unresolved segment, seam removal, fascia and occlusion at all elevations/axon; unresolved must remain withheld rather than styled as approved |
| D4-03 | P1 | Customer sheets / CI | Make browser-measured SVG text/line/obstacle bounds, clipping, 390px pan, print screenshots, visual diffs and exact-head evidence a required CI gate. The optional browser script currently tests text overlap, not all strokes or print-device behavior |
| D4-04 | P1 | Architect / civil surveyor | Verify actual survey, property/building setbacks, accessory gap and eave limits, drainage, pavement, required parking and accessibility; revise dimensions from approved source geometry |
| D4-05 | P1 | Civil / AHJ | Workbench circulation still proves 4/4 inbound but **not** independent outbound: 0/4 paths found within 180,000 states is NOT impossibility proof or approved fire access |
| D4-06 | P1 | Print QA / architect | Calibrate a physical 36×24 proof, check printer scaling/clip/crop, dimension styles, title block details, elevations and references before any architectural sheet promotion |
| D4-07 | P1 | LotScope release | Enforce runtime revalidation of roof locks after any rotation/mirror/owner edit and confirm Pondy handoff is regenerated from the new exact source hash; never reuse stale locks |
| D4-08 | P2 | Customer report | Replace outdated copy implying four D4 roofs remain unlocked, while explicitly differentiating internal roof geometry lock from professional approval |
| D4-09 | P2 | Unified sheet engine | After full S3 visual acceptance and professional signoff, reuse the same schema for Designs 3 → 2 → 1; avoid propagating D4's candidate dimensions as authority |

## Non-negotiable publication gate
- Display `CONCEPT ONLY / NOT FOR CONSTRUCTION / PROFESSIONAL + AHJ REVIEW PENDING` on preliminary roof, elevation and dimension sheets. Preserve current conditional/iterate circulation and zoning verdicts.
- Never promote `ROOF_GEOMETRY_LOCKED` or `AUTHORITATIVE_ALLOWED` into `STRUCTURAL_PASS`, `PERMIT_APPROVED`, `FIRE_ACCESS_APPROVED` or `CONSTRUCTION_READY`.
- The A-001 and A-101 overlays remain **review-only**. The master/customer geometry and corresponding original plans have not been silently overwritten.
- Professional review, local authority review and on-paper verification remain independent.

## Reproduce
```sh
# PondyFlats:
npm run gates
npm run gates:d4-dimensions
npm run gates:d4-customer-dimensions
node scripts/render-d4-dimension-prototype.js
node scripts/render-d4-customer-dimension-review.js
PUPPETEER_MODULE=/path/to/puppeteer CHROMIUM_PATH=/path/to/chromium node scripts/d4-browser-visual-audit.cjs

# LotScope:
npm run test:roof
npm run test:canonical
npm run test:workspace
npm run test:intervention
npm run test:authoritative-circulation
npm run lint
```

**Evidence distinction:** Tests above were run against the specified source checkouts. Live GitHub Pages returned HTTP 200 during this audit; that confirms reachability, not that unmerged candidate changes are deployed. Promotion requires exact-head CI, merge/deploy provenance and runtime visual reinspection.
