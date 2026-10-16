# Design 4 physical print calibration — evidence required

Status: **NOT PERFORMED / OPEN**. No physical print, ruler reading, professional acceptance or AHJ decision is recorded by this procedure. Software and browser-frame checks do not close this gate. Issue: https://github.com/aerovista-us/PondyFlats/issues/48.

Use the reviewed `prototypes/A-001-print-proof.svg` and `prototypes/A-101-print-proof.svg` from the exact release being assessed. Preserve CONCEPT ONLY / NOT FOR CONSTRUCTION. Do not replace the current customer plans or publish dimensions as approved drawings.

1. Record source commit, both file SHA-256 values, operator, date, printer/plotter, driver, paper and application/version. Retain the exact files and print settings.
2. Select landscape 36 × 24-inch paper, actual size / 100%, with Fit, Shrink and automatic scaling disabled. Check print preview for all title-block and border edges. Do not assume a browser default means actual size.
3. Measure the paper and the 2-inch frame margins. Check both horizontal and vertical reference lengths; record the actual ruler readings and percentage error, `(measured / target - 1) × 100`. Record missing/cropped marks. A single-axis match cannot prove both axes are calibrated.
4. Compare these source lengths to the nominal paper lengths below. Measure the actual geometry endpoints/witness references, not the printed numerical labels. Verify the exact segment IDs against the source-derived dimension gates.

| Sheet / scale | Model reference | Nominal paper length |
|---|---|---|
| A-001 / 1/8 inch per foot | 148-ft lot depth | 18.500 inches |
| A-001 / 1/8 inch per foot | Actual 50-ft Pennsylvania frontage | 6.250 inches |
| A-001 / 1/8 inch per foot | Overall 57.01-ft Y extent, **not frontage** | 7.12625 inches |
| A-101 / 1/4 inch per foot | 40.5-ft Home B width | 10.125 inches |
| A-101 / 1/4 inch per foot | 26.25-ft Home B depth | 6.5625 inches |

5. Inspect dimension text, witness lines/ticks, room labels, north arrow, line weights, title block, orientation, cropping and legibility on the physical sheets. Attach photographs with a ruler and the original paper readings. Record defects before adjusting print settings; reprint and repeat after any adjustment.
6. Have the responsible design professional set and record the acceptable print tolerance and accept/reject the measured result. This procedure does not invent a professional tolerance. Obtain survey/frontage/setback, architectural, civil/drainage, structural/snow and AHJ decisions separately; print calibration grants none of them.

## Blank result record

| Field | Actual observation |
|---|---|
| Exact source commit / file hashes | PENDING |
| Operator / date / printer / driver / application | PENDING |
| Paper dimensions / frame margins | PENDING |
| A-001 depth / frontage / overall Y measurements | PENDING |
| A-101 width / depth measurements | PENDING |
| Horizontal / vertical percentage errors | PENDING |
| Typography / linework / orientation / crop findings | PENDING |
| Responsible professional's tolerance and decision | PENDING |
| Evidence references / reprint record | PENDING |

Do not close #48 or promote architectural sheets until real readings and required acceptance exist. Designs 3 → 2 → 1 reuse the same engine after the D4 gates; this checklist creates no per-design engine.
