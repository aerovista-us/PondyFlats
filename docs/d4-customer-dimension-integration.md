# Design 4 customer-sheet integration — review candidate

Generate with `node scripts/render-d4-customer-dimension-review.js`; test with `node scripts/d4-customer-dimension-review-gates.js`.

The review-only HTML in `prototypes/design4-customer-sheet-review.html` overlays geometry-derived dimensions on the **existing customer-rendered A-001 site and A-101 ground plan SVGs**. It preserves pavement, parking, road, plan room layouts, and original status indicators. It is not linked or loaded by the customer report.

## Release blockers found by browser QA

- A-001 dimension labels crowd the Pennsylvania Street frontage/road graphic; use a shared obstacle layout to resolve both road annotations and measurements.
- A-101 existing room text/status graphics require measured collision checks against dimension annotations; current tests do not certify all customer SVG text.
- Existing responsive SVG scales are not physical printing scales. Separate printed study sheets exist, but physical print calibration and professional validation are not complete.
- Automated rendered-viewport and comprehensive obstacle acceptance have not passed for this integrated candidate.

**Do not publish this review candidate or treat it as construction drawings.**
