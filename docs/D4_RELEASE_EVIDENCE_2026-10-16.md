# Design 4 roof and sheet release evidence — 2026-10-16

## Status-only release completed

Pondy [PR #55](https://github.com/aerovista-us/PondyFlats/pull/55) merged as `a0338a9db7be93a1356a3b8e6fea851030b3c7e4`. The outstanding review found an old release-boundary paragraph that still called the model unlocked. Corrected source and standalone status pages and expanded the regression at accepted PR head `546bfaaf9c8057b4cdb16be8dac5c5e44958a9de`; all three hosted workflows passed. The merged content is identical to that accepted head.

- Exact-head final package / browser QA: https://github.com/aerovista-us/PondyFlats/actions/runs/38932749072
- Exact-head sheet visual acceptance: https://github.com/aerovista-us/PondyFlats/actions/runs/38932749087
- Exact-head Workbench self-audit: https://github.com/aerovista-us/PondyFlats/actions/runs/38932748987
- Actual merged-SHA Pages build/deployment: https://github.com/aerovista-us/PondyFlats/actions/runs/38933128306 — success.
- Actual merged-SHA sheet visual acceptance: https://github.com/aerovista-us/PondyFlats/actions/runs/38933128587 — success; artifact `d4-architectural-sheet-visual-a0338a9db7be93a1356a3b8e6fea851030b3c7e4`, artifact digest `sha256:0092273cbd07a375bfe1791c144ceb6c64530d79948cf618d2dd91b4de3c0334`.

`customerPublicationAllowed=false`, `approvedCandidateSignature=null`, `approvedForConstruction=false`, professional/AHJ acceptance false. This release changes status/disclosures and their regression, not roof geometry or roof publication approval.

## Reproducible source chain

Fresh clean LotScope main `bbfce17473292210b372fbd290beb0a45c860183` passed the complete roof suite, canonical, workspace, intervention and two-valley section regressions. The read-only cross-repository audit regenerates the actual `pondy-d4` roof and camera payload from that pinned source, then verifies:

1. Full candidate snapshot SHA-256 and four owner geometry keys.
2. Exact solved roof surface polygons and junction topology/coordinates.
3. Complete freshly generated camera interval payload equals Pondy's stored payload.
4. Pondy's current-placement adapter accepts every bound owner/view.
5. Seven source modules equal standalone modules byte for byte.
6. Both source valley cuts derive from actual face intersections. It never grants publication.

See [machine-readable source evidence](evidence/d4-source-chain-2026-10-16.json). Junction identifiers are mapped explicitly: source `...valley-1` → Pondy `home-b-valley-east`; source `...valley-2` → `home-b-valley-west`. IDs/order differ, so raw object equality is not claimed. Endpoints/heights are matched bijectively within the existing 1e-8-ft canonical tolerance; largest observed delta `8.627409897599136e-11` ft. Source faces and camera manifests match exactly.

An edit, rotation, camera change, candidate change or changed source revision requires renewed validation and regenerated evidence. Do not update the pinned baseline solely to make a failing audit green. The new CI verifies the reviewed source-to-consumer chain without private dependencies or authentication secrets.

```sh
node scripts/audit-d4-source-chain.cjs /path/to/clean/lot-assessment bbfce17473292210b372fbd290beb0a45c860183 /tmp/d4-source-chain.json
node scripts/audit-d4-served-revision.cjs a0338a9db7be93a1356a3b8e6fea851030b3c7e4 /tmp/d4-served-revision.json
```

## Deployed verification and visual boundary

The public Pages revision was first `31d6d390`; after #55 it is `a0338a9d`. [Served-byte evidence](evidence/d4-served-revision-2026-10-16.json) confirms **25/25** public HTML/modules match exact merged Git bytes, including the source and standalone overview/status/elevation/axon/section pages and seven modules in both locations.

Real live desktop browser inspection (1363 × 936 viewport) confirms the four cardinal elevation views render and retain Home B review intervals; model axon contains no unresolved intervals. These are observed live view states, not construction acceptance:

| Home B view | Status | Unresolved intervals |
|---|---|---:|
| North | REVIEW_REQUIRED | 10 |
| South | REVIEW_REQUIRED | 10 |
| East | REVIEW_REQUIRED | 16 |
| West | REVIEW_REQUIRED | 16 |
| Exact Pondy axon | INTERVAL_VERIFIED | 0 |

The accepted-head final-package workflow covers source and standalone desktop/tablet/phone viewport families (1440, 1024, 768, 390). The post-merge sheet workflow covers sheet desktop/mobile/print frame and source/export roof semantics. Served bytes match the tested content. This does not claim physical touch/phone testing or a new live phone-sized browser session.

The public Pondy sections are x=111.25 (Home A), x=83.5 (Home B), x=16 (garages). **They do not include the dedicated V1/V2 valley sections.** Live LotScope `/workbench/roof-drawings` redirects to AeroVista sign-in; no authenticated session was available. Therefore exact-served authenticated V1/V2 visual acceptance remains OPEN. Fresh source cuts are:

| Cut | Midpoint XY, ft (rounded for this table) | Z, ft | Source face segments | Software state |
|---|---|---:|---:|---|
| V1 / east valley | (89, 17.75) | 22.125 | 5 | SOURCE_INTERSECTION |
| V2 / west valley | (78, 17.75) | 22.125 | 6 | SOURCE_INTERSECTION |

Vercel GitHub status for LotScope `bbfce174` is successful and points to deployment `DGFTpTD7BD6SMBHu3DsR8Dx2svTA`, but Vercel team inspection returned 403; no local authenticated Vercel CLI was available. **Do not infer that the current production alias serves that exact SHA.** NXCore is offline. These block exact-served LotScope provenance/authenticated acceptance, not the now verified Pondy Pages status release.

## Remaining promotion gates

| Gate | State | Required next evidence |
|---|---|---|
| Home B drawing / #86 | OPEN | Authenticated exact-deployment inspection of N/S/E/W, axon, V1/V2; preserve REVIEW_REQUIRED/WITHHELD where ambiguous. Professional valley detail remains separate. |
| Rotated/replacement garages | FAIL-CLOSED REGRESSION PASS | A new roof must be authored/validated for any replacement owner; no inherited baseline authority. |
| A-001/A-101 software | PASS, review-only | Preserve 15 geometry-derived dimensions, exact frontage, collision/export/scale-frame checks. |
| Physical print / Pondy #48 | NOT PERFORMED | Complete [physical calibration record](D4_PHYSICAL_PRINT_CALIBRATION.md) using real 36×24 proofs and responsible professional acceptance. |
| Professional / AHJ | OPEN | Survey, architecture, valley/flashing/drainage, structure/snow, fire/eaves and jurisdiction review; no invented signoff. |
| Outbound circulation | OPEN | Independently audited departure; four inbound paths do not close it. |
| Designs 3 → 2 → 1 | DEFERRED | Reuse the same engine after D4 acceptance; do not copy D4 measurements or create separate engines. |

The automated source chain, green CI and model axon establish bounded software evidence. They do not close the remaining drawing, physical-print, professional or AHJ gates.
