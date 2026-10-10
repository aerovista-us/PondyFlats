# Design 4 S3 visual acceptance — 2026-10-10

**Decision: CONDITIONAL / NOT ACCEPTED for public release.**

Evidence: actual Chromium full-sheet 3456 × 2304 browser captures of SVG paper proofs A-001 and A-101; responsive desktop and mobile inspection on preceding S3 commits; source-derived tests and GitHub exact-head CI on previous commit.

## Confirmed
- A-001 physical sheet has complete source boundary, four distinct building outlines, and nine dimension identifiers; 50 ft Pennsylvania east boundary is visibly distinct from 57.01 ft overall Y extent.
- A-101 shows the correct two plan-shell outlines, room-zone partition geometry and six source-referenced dimensions. Removed incorrect parcel background in A-101 print composition.
- Dimension-line versus other dimension-label overlap checks and physical print frame extents pass in local gates.
- Both proofs disclose concept status, permit/professional review and physical scale. Geometry sources and customer pages unchanged.

## Blocking visual issues
1. A-101 is disproportionately small on the 36×24 sheet at 1/8 inch=1 foot and its print proof omits room names. Choose a properly framed 1/4 inch ground-floor plan sheet (where the paper frame allows), with labels or a room key.
2. A-001 is still a simplified diagram: no explicit frontage callout, north arrow, title block, line-weight hierarchy or parking/pavement context in print proof. It must not be represented as a finished professional architectural site sheet.
3. Automated avoidance currently checks dimension-line versus dimension-label interference and obstacle boxes for labels, but does not fully check extension lines, ticks, polygon/stroke overlaps, or browser-computed text bounds. Need fail-closed acceptance beyond analytical boxes.
4. Automated reproducible print-browser screenshot capture, visual artifact comparison, and test evidence for current exact head not in CI. No physical print output measurement has been performed; SVG declared inches alone do not prove printer accuracy.
5. Mobile now pans horizontally instead of shrinking but still requires an explicit usability acceptance for both sheets.

**Release policy:** do not merge to main as a customer-ready sheet and do not publish S3 dimensions. PR #43/#44 remain work-in-progress until the above gates pass. 
