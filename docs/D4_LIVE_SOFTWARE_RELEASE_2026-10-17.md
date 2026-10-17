# Design 4 live software release — October 16 PDT / October 17 UTC

The reviewed software improvements are published as a **conditional concept**, with roof publication/approval still disabled. This closes the staged-software and deployment-provenance blockers; it does not grant architectural, physical-print, actual-phone, professional or AHJ acceptance.

| Surface | Verified release |
|---|---|
| LotScope | [PR #112](https://github.com/aerovista-us/lot-assessment/pull/112) merged as `49b73e81a06c6c146458d0f14de47c34ec1f1623`; tree equals tested head `d9260a50c3134453bd25779faf443fda7aeba9dc` |
| Vercel | Production READY deployment `dpl_B3rsa8JC5hGhiuKAUvFTVd917kX7`, Git SHA `49b73e8…`, confirmed alias [lotscope.aerovista.us](https://lotscope.aerovista.us/workbench/roof-drawings) |
| Pondy | [PR #58](https://github.com/aerovista-us/PondyFlats/pull/58) merged as `eb61e3658776570b49dfe0c20367dc96aa381364`; tree equals tested head `37214ad5e29a38407d8c35d09fd5c2e61364d7dc` |
| Pages | [Deployment run 38994500841](https://github.com/aerovista-us/PondyFlats/actions/runs/38994500841) succeeded for `eb61e36…`; 25/25 public HTML/source/standalone files match its exact Git bytes |

The reviewed roof/geometry, touch, typecheck/build, circulation, broad solver benchmark, source-chain, Workbench, architectural-sheet and full-package workflows all passed before merge. Post-merge source-chain and architectural-sheet checks also passed. No candidate geometry, owner key, locked face or valley geometry was changed to obtain a pass.

## Live acceptance evidence

- Authenticated LotScope desktop at 1363×936: Home B N/S/E/W and axon all show model interval verification, zero unresolved intervals, two real source valley sections and withheld fascia. V1/V2 show 5/6 face segments, midpoint elevation 22.125 ft and residual 0. The E9 picker exposes its hidden source edge and t=0..1 provenance. Drawing acceptance OPEN and roof publication disabled remain visible.
- Live Pages source and standalone elevation/axon checks: **12/12 pass** at 1440, 768 and 390px. Four owners, required visible/hidden strokes, source bindings, concept-only disclosures, styles and responsive overflow checks pass; no page errors were observed. These are emulated viewports, not an actual phone sign-off.
- Anonymous production LotScope: home/guided assessment return 200; Workbench redirects to sign-in (307); registry returns 401; session reports authenticated=false. Authentication was not weakened for testing.
- The unchanged source/consumer chain binds candidate hash `c084e6b66d5bbc199658ce208060a4e3fd50db49d1b77d6bbcb0169cff4eabb9`, exact owner/face/camera evidence, both valley cuts and seven byte-matched source/standalone modules. Merge commits have the exact reviewed trees, so their metadata changes do not imply geometry changes.

Full observations, hashes and viewport results: [live release record](evidence/d4-live-software-release-2026-10-17.json). Earlier staged evidence remains historical; this record supersedes its claim that no deployment had occurred.

## Approval boundary and remaining work

`customerPublicationAllowed=false`, `approvedCandidateSignature=null`, `approvedForConstruction=false`; every professional-acceptance flag remains false. The live [status page](https://aerovista-us.github.io/PondyFlats/design-4-status.html) continues to say REVIEW REQUIRED / CONDITIONAL.

Still required before the relevant architectural/roof promotion:

1. Actual-size A-001/A-101 36×24 physical sheets, both-axis ruler readings, photographs, legibility/crop findings and professional-set print tolerance/decision. Use [the calibration procedure](D4_PHYSICAL_PRINT_CALIBRATION.md).
2. An actual-phone/native picker and drawing-readability review on the served revision; viewport emulation does not supply this observation.
3. Responsible professional dispositions for the drawing/valley/fascia/drainage/structure matters, plus the actual AHJ disposition and conditions. No approval has been inferred from software results.
4. Full Design 4 promotion still has its unchanged outbound-circulation and marginal Garage B conditions. This roof-software release does not resolve or relabel those items.

Any later geometry edit or rotation requires source validation, lock revalidation and complete evidence regeneration. Continue Designs 3 → 2 → 1 after D4 acceptance using the one shared engine.

## Reproduce / recover

Run `scripts/audit-d4-served-revision.cjs` with the exact release SHA and an output JSON path. Run `scripts/d4-roof-interval-browser-qa.cjs` with `D4_ROOF_QA_BASE_URL=https://aerovista-us.github.io/PondyFlats/`, `D4_PUBLIC_EXPECTED_SHA` set to that SHA, and the configured Chromium/Puppeteer paths. The driver records its own checksum separately from the expected public application revision. This follow-up changes test tooling and records, not application geometry/rendering modules.

Previous production references are retained for recovery: LotScope `bbfce17473292210b372fbd290beb0a45c860183` / Vercel `dpl_DGFTpTD7BD6SMBHu3DsR8Dx2svTA`, and Pondy `41e1858e08f4aa4bbf480bdb3b03a6224af380ad`. No rollback was necessary for the observed checks.

## QA review correction

Two review findings on the verification follow-up were fixed without changing application rendering: enforce document/navigation overflow at every viewport (including 768px), and make the live command require a valid expected SHA plus a successful exact served-byte preflight before launching the renderer. The prior release observation already had a separate 25-file byte audit; this correction makes that binding mandatory inside the reproduction command too.

[Correction evidence](evidence/d4-live-qa-review-2026-10-17.json) records 12/12 live cases passing, rejection of the deliberately stale `41e1858…` revision, and rejection of four deliberately broken 768px navigation cases in an isolated test worktree while the other eight cases pass. No live application data, geometry, approval flags or rendering modules were changed for these negative tests.

A subsequent cache-path review found that the preflight used cache-busted URLs while the browser loaded ordinary URLs. [PR #61](https://github.com/aerovista-us/PondyFlats/pull/61) removes that discrepancy and binds the actual HTML, CSS and JavaScript bodies returned to Chrome to their expected Git blobs. The live run at expected public revision `ca8bead9df781dcac5932b5a049efc5d3d5a0e93` passes all 12 cases and all 120 loaded-resource comparisons. The 25-file ordinary-URL preflight also passes.

[Browser-response evidence](evidence/d4-browser-response-binding-2026-10-17.json) includes a deliberately mismatched CSS-response test: the real-site preflight passes, but all 12 browser cases correctly reject the altered response. The disposable test adds a harmless CSS comment through request interception; it changes no public asset. The release driver and deliberately modified test driver have separate recorded hashes. This is software verification only; actual-phone, physical-print, professional and AHJ acceptance remain outstanding.
