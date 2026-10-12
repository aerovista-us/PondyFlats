# Unified customer report standard — best of Designs 1–4 (v1)
Date: 2026-10-12. Applies to **every new candidate-derived customer report**, HTML **and** PDF package. Older published Designs 1–4 remain source references; no retrofit should silently change their approved (or unapproved) evidence.

## Source review and feature decisions

| Existing report | Proven strength worth reusing | Grounded source |
| --- | --- | --- |
| Design 1 | Clear front-end drawing explanation, detailed site, distinct ground/upper plans, four elevations, two sections, architectural massing and axon | r51e-deliverable.html and imgs/r51e-* drawings |
| Design 2 | Nontechnical “How to read”, orientation/garage legend, simple contiguous sheet browsing, visual separation of home vs garage | design-2.html, d2-site.html, d2-plans.html, d2-elevs.html, d2-axon.html |
| Design 3 | Plan-closure evidence, functional ground/upper zoning, bubble diagrams and area schedule, street material intent, swept-path evidence | d3-plan-closure.html, d3-site.html, d3-elevs.html, d3-axon.html, d3-sections.html |
| Design 4 | Large 4-view elevations near hero, contractor-useful field targets, source-bound roof and axon, rigorous withheld/verified gates, dimensions in concept sheet review and detailed back-of-report status | design-4.html, d4-*.html, design-4-status.html, prototypes/design4-customer-sheet-review.html |
| Across all | Alternative comparison and shared site context | index.html, compare.html |

This is a **feature-quality synthesis**, not a claim that every legacy design contains the same depth or approval. Some previous reports have illustrative imagery or partial evidence; none warrants silently promoting a new candidate to a roof, floor-plan or AHJ-approved drawing.

## Mandatory 22 feature slots, always displayed

Implementation: js/customer-report-standard.js, ordered within seven customer-oriented groupings:

1. **Start here** — visual executive hero + gate, "how to read" and model orientation.
2. **Site and lot** — parcel/source survey, setbacks and access context with a source-grounded plan.
3. **Living arrangement** — ground floor, upper floor, adjacency/bubbles, room/area schedule.
4. **Architectural views** — four consistent model-frame elevations, materials intent, sections, roof and axonometric massing.
5. **Access and circulation** — garage inbound, outbound, pedestrian/owner/service separation.
6. **Buildability and comparisons** — dimensioned sheet authority, side-by-side alternatives, contractor field coordination, evaluation gates.
7. **Documentation and next steps** — complete sheet index, source geometry/revision/hash/provenance, actionable gaps and next decisions.

Each slot has a status:
- SOURCE_BOUND — directly validated from candidate data, revision and source vertices; needs specific evidence reference.
- MODEL_VERIFIED — separately validated model geometry/visibility. **Not** architectural/AHJ approval; needs exact evidence.
- ILLUSTRATIVE — visualizing otherwise supported data; explicitly disclose missing height/roof/finishes authority.
- REVIEW_REQUIRED — real item present but quality or evidence gates have not passed. Explain precise blocker.
- WITHHELD — model lacks the required feature. Explain why and what evidence to collect.

No silent omission and no generic "PASS" for missing roof, rooms, mobility, surveyed bearings or permit work. Comparison scores require compatible metric definitions and **actual source revisions for the other designs**; otherwise compare evidence/readiness only.

## Must be automatic and fail closed

js/customer-report-standard.js includes prepareManifest, assertStandard, reportCoverageHTML and verifyCoverageHTML. Caller must supply:
- candidateId, sourceRevision, 64-character SHA-256 of the actual candidate bytes
- orientation: one approved model-to-page frame and PRESERVE_MODEL_XY policy
- authority=CONCEPT_ONLY_NOT_FOR_CONSTRUCTION
- available feature evidence references and candidate-specific explanations

Unknown/missing features are explicitly created as WITHHELD entries; invalid statuses, fabricated MODEL_VERIFIED evidence, missing reason text, missing source revisions, reflective transforms, missing HTML cards, false comparison rankings and stale source hashes **fail** the gate.

npm run gates:customer-report-standard runs before npm run export and inside npm run gates, and within exact-head sheet CI. New generated candidate reports placed under packages/candidate-reports/<candidate-id>/ cannot be released without both report-coverage-manifest.json and index.html passing verifyCoverageHTML. The static legacy D1–D4 reports are left intact rather than rewritten to claim new unsupported sources.

### More acceptance before general customer publish
- The full generic candidate-to-report **visual generator** must consume this manifest (mandatory, not optional sidebar) and link every actual sheet to source geometry. Generate HTML and PDF from the **same manifest**; ensure 22 statuses agree.
- Test at least two **different** candidate geometries, with source XY, circulation and roof authority checks. Do not assume Adaptive Front L shape is generic.
- Paper-scale dimensions, engineering, roof drainage, physical AHJ acceptance, privacy of saved candidates, public/premium account entitlements, and client publication consent remain separate gates.

This feature registry enforces completeness and truthful scope. It is not a substitute for physical architecture certification.
