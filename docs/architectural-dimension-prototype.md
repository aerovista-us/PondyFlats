# Design 4 dimension prototype

Prototype sheets: A-001 site and A-101 ground plan. Generate with `node scripts/render-d4-dimension-prototype.js`, open `prototypes/design4-dimensions.html`, and test with `node scripts/d4-dimension-prototype-gates.js`.

The new reusable module provides derived horizontal and vertical dimensions from geometry references, witness/extension lines, slash ticks, label backgrounds, and a deterministic label-to-label collision pass. The source resolver is allowlisted against existing sheet-document geometry IDs.

**Limitations:** this is fit-to-page concept output, not a true printed architectural scale. The parcel's Y bounding extent is not its 50-foot Pennsylvania frontage. Home B's overall dimensions represent the bounding box of an L-shaped footprint, not each individual wall segment. Collision handling checks dimension labels against each other, not all geometry or other annotation text. Exact segment dimensions, multi-chain dimensioning, obstacle routing, print-scale calibration, and browser image QA remain required before promoting this to the customer pages.

Existing customer-facing geometry, Design 4 roof authority and permit/AHJ gates are untouched. Extend to Designs 3, 2 and 1 only after finishing semantic edge selectors and deterministic sheet framing.
