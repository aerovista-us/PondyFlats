# Design 4 roof visibility handoff — concept-only customer release audit
Date: 2026-10-11

## What changed

LotScope's verified-interval engine now generates a read-only browser contract for the four Design 4 locked roofs: cardinal NORTH, SOUTH, EAST, WEST elevations and the **exact camera currently used by PondyFlats' A-401/A-402**. The customer report uses source-geometry fills with no speculative polygon outline strokes and draws analytic interval segments as visible solid, hidden dashed, or unresolved orange dotted. Provable internal seams and duplicate shared edges are not rendered.

**CONCEPT ONLY — NOT FOR CONSTRUCTION.** A model-verified 2D visibility interval is not an architect-certified drawing, structural roof approval, drainage detail, eave/fascia approval, or permit/AHJ clearance.

## Source synchronization / fail-closed invariant

LotScope source: aerovista-us/lot-assessment PR #88. Consumer: PondyFlats branch feat/d4-verified-roof-interval-consumer-20261011.

Pondy uses the existing locked 3D surface faces and ownerGeometryKey from the archived roof SOT (original roof export commit 669f3deb182001726ce1df7dac5657316e4e9b1d). The newly generated manifest additionally stores **the canonical geometry key and every exact source face vertex** for each owner; the adapter checks both directly against the consumer's locked source, and independently checks that the owner footprint is still current in the site geometry. No imported interval is rendered if the roof has lost its lock, the owner footprint has rotated/moved/changed, the face polygons diverge, or the interval manifest is missing/malformed. Updating the actual LotScope owner geometry requires a corresponding locked roof SOT re-export and interval regeneration: neither is optional.

The Pondy camera matrix corresponds exactly to the existing projection P(x,y,z) in js/lot2-design-4-architecture.js. The custom projective depth vector is derived consistently with that fixed screen transform and is not a visual estimate.

## Evidence from local QA

- The roof consumer model gate passes for four owner-bound manifest records, four cardinal views each and four axon camera records.
- Chromium real HTML/SVG acceptance passed **8/8** cases: source d4-elevs and d4-axon and exported Design 4 client elevs and axon, at 1440px and 390px.
- The four elevation views show **48 visible, 28 hidden, and 76 unresolved** line segments across the four SVGs. All unresolved lines remain marked review-required; no face polygon carries an unverified outline stroke.
- Two axon SVGs have **84 visible, 26 hidden and zero unresolved** line segments combined, all four locked roof owners, in the current exact same-camera view. These are model-verified intervals only.
- All outputs retain the concept-only disclaimers, source keys, and visible/hide/review status metadata. Mobile navigation stays inside the document viewport.
- The regenerated standalone package contains all three imported interval scripts, architecture, the locked roof source and the premium stylesheet. The exact-head CI gate runs the source/package browser comparison and checks package regeneration drift.

## Remain open / do not overclaim

1. **Home B edge-on cardinal projections:** The remaining ambiguity is mathematical zero-width face projection and coincident roof-junction lines, not automatically a deficient roof-lock solver. The engine cannot infer a unique depth ordering for those source faces in cardinal orthographic views. Keep orange diagnostics; if a more detailed architectural silhouette is desired, add independently proved contour classification and real rendering QA, do not simply promote to VERIFIED.
2. **Professional review:** Home B two valleys need roofing/drainage flashing, loads, structural support, snow shed and permit review; eaves/fascia are withheld. No structural, AHJ, code or permit approval has been conferred.
3. **Authenticated Workbench visual acceptance:** The staff-only LotScope inspector still requires legitimate AeroVista sign-in. A headless unauthenticated visit displayed the sign-in gate. A legitimate founder/staff browser session was not available to this test process; therefore real authenticated-session UI acceptance **is not closed**. Test directly with an authorized session and record exact deployment SHA, screenshots at desktop/mobile and reviewer acceptance separately.
4. **Production confirmation:** A merge of LotScope and PondyFlats is not by itself verified runtime deployment. After release, check the live Page and LotScope's protected route, source/manifest hashes, browser console and responsive read.
5. **Current customer scope:** These source-bound roof intervals do not change professional geometry, section authority, roof zoning, dimensions, or the separate outbound vehicle circulation gate.

## Rollback and operations

If either manifest binding or exact-camera projection fails, the consumer must **withhold the roof interval layer** rather than falling back to polygon outlines or using sample-vote linework. To regenerate after upstream changes, run LotScope's scripts/export-d4-roof-intervals.mjs against the newly accepted locked geometry, compare every owner/face binding to Pondy, regenerate the package, and rerun CI/browser QA before promotion.

Related: LotScope issue #86; PondyFlats issue #48; PRs #88 (LotScope) and the customer integration PR.
