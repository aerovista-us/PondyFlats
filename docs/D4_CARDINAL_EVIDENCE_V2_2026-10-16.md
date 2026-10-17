# D4 cardinal model evidence v2 — staged integration

Roof publication remains disabled. No physical-print, actual-phone, professional or AHJ acceptance is recorded here. The earlier status-only correction in #55 remains separate from roof approval.

Reviewed LotScope source: `d9260a50c3134453bd25779faf443fda7aeba9dc` on [PR #112](https://github.com/aerovista-us/lot-assessment/pull/112). This integration is staged in branches, not proof of a new public deployment. The last recorded deployed-source evidence in the earlier handoff remains historical; it does not establish this candidate is served.

Algorithm review found a concave self-occlusion gap: an edge-on face's own projected boundary must partition source-edge coverage. The reproducer failed before the fix and now splits the source edge at t=.75. The independent oracle ear-clips concave polygons before 3D ray/triangle tests and passes 3,174 comparisons including reversed/cyclic vertex orders, rotations, translations and malformed/stale/tied cases. No candidate geometry, owner key, roof face or valley geometry was edited.

The v2 export includes every interval's source face/edge and t0/t1, suppressed seam/shared-edge intervals, and collapsed projected-point records with original 3D endpoints. The strict consumer adapter verifies source binding, camera coordinates, complete edge coverage, counts and collapsed records. Older v1 or incomplete evidence is withheld. Visibility remains solved by the single shared LotScope engine.

The renderer's north/south surface-fill sort was also corrected to use the same declared depth directions as the interval camera; regression checks bind every fill's depth to its source polygon and require far-to-near order.

| Pondy view | LotScope source view | Near-depth direction |
|---|---|---|
| North | SOUTH | −Y |
| South | NORTH | +Y |
| East | EAST | +X |
| West | WEST | −X |

All four owners' N/S/E/W and exact Pondy axon cameras are model-interval verified. This says nothing about professional drawing quality or release. Generic building sections in `d4-sections.html` remain their declared x-plane cuts, not dedicated V1/V2 valley sections. Both real valley cuts are retained in the source-chain evidence and protected LotScope inspector: midpoint Z 22.125 ft, 5/6 source segments, residual 0. Fascia remains withheld.

The source-chain baseline pins the exact reviewed source SHA, unchanged candidate snapshot hash and regenerated interval-manifest hash. Source and standalone interval modules/adapters are regenerated together. The audit records exact owner/face hashes, camera results, junction aliases, source/standalone module hashes and both valley sections. A later geometry edit or rotation requires new validation and regenerated evidence.

Evidence closure still requires confirmed actual deployment SHA; review of all cardinal cameras, axon, both valleys and standalone exports; actual-phone/native picker review; measured 36×24 physical sheets with professional-set tolerances; and the responsible professional/AHJ dispositions. The existing [physical calibration procedure](D4_PHYSICAL_PRINT_CALIBRATION.md) remains open. Fifteen computed dimensions passing software gates do not establish print accuracy or acceptance.

Keep `customerPublicationAllowed=false`, `approvedCandidateSignature=null`, `approvedForConstruction=false` and every professional-acceptance flag false. Designs 3 → 2 → 1 follow D4 acceptance using the one shared engine.

## Recorded verification

- Clean LotScope source: `d9260a50c3134453bd25779faf443fda7aeba9dc`.
- Audited/rendered Pondy application checkpoint: `8f9b7fc62e199f1a22ac5a1be68cd19fc51b928a`; the following evidence commit adds records without changing the application modules.
- [Source-chain record](evidence/d4-source-chain-cardinal-v2-2026-10-16.json): candidate/owner/face hashes, complete camera digest, seven byte-matched source/standalone modules, junction aliases and both actual valleys. Candidate snapshot remains `c084e6b66d5bbc199658ce208060a4e3fd50db49d1b77d6bbcb0169cff4eabb9`.
- [Verification record](evidence/d4-cardinal-integration-verification-2026-10-16.json): eight source/standalone browser cases pass at 1440/390px; inspector passes 390/768px touch emulation plus desktop.

Model N/S/E/W, axon and V1/V2 source cuts were inspected in staged screenshots. These file renders and component fixtures do not close actual served-revision or real-phone acceptance. Phone drawings still require zoom and native-device review. Physical sheets and professional/AHJ dispositions remain unrecorded. Both linked PRs stay draft and publication remains disabled.
