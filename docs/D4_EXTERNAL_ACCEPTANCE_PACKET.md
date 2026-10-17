# D4 external acceptance packet

Status: **AWAITING REAL OBSERVATIONS AND DISPOSITIONS**. Roof publication remains disabled. This packet prepares the remaining reviews; it records no phone, physical-print, professional or AHJ acceptance.

## Revision to review

- LotScope production software: `49b73e81a06c6c146458d0f14de47c34ec1f1623`.
- Pondy application and print-file snapshot: `59561a64d3b08d48333fa298694d9a1c1460bd96`. Later QA-tool-only commits do not change these drawing files. Verify the actual served revision when collecting observations.
- Candidate hash: `c084e6b66d5bbc199658ce208060a4e3fd50db49d1b77d6bbcb0169cff4eabb9`.
- Camera-interval manifest digest: `f52f162cfd493e4b84031a77944033f974f3e3bb25d4e56d860d5b246bb32b69`.
- [Bound source, camera, valley and export evidence](D4_CARDINAL_EVIDENCE_V2_2026-10-16.md); [live software verification](D4_LIVE_SOFTWARE_RELEASE_2026-10-17.md).

Any geometry edit or rotation invalidates this packet's geometry binding and requires revalidation and regeneration. A later visual change requires the affected visual/phone/print checks again.

## Physical prints

Download these exact files, preserving CONCEPT ONLY / NOT FOR CONSTRUCTION:

| Sheet | Exact file | SHA-256 |
|---|---|---|
| A-001 | [Site print proof](https://raw.githubusercontent.com/aerovista-us/PondyFlats/59561a64d3b08d48333fa298694d9a1c1460bd96/prototypes/A-001-print-proof.svg) | `7ebfe54c924a39546a0de7c23aaefaa087b9b44151c78797312a49d6f15dea6c` |
| A-101 | [Ground-plan print proof](https://raw.githubusercontent.com/aerovista-us/PondyFlats/59561a64d3b08d48333fa298694d9a1c1460bd96/prototypes/A-101-print-proof.svg) | `2a6468a830d9d38d199666296898c12185123619f788d8e1ff3749106f3b0ef7` |

Use landscape 36×24-inch paper at actual size / 100%, with Fit/Shrink disabled. Follow the [full calibration procedure and nominal lengths](D4_PHYSICAL_PRINT_CALIBRATION.md). Record paper dimensions, both-axis ruler readings, 2-inch frame margins, printer/application/settings, crop and legibility findings, and photographs showing the ruler. The responsible professional must set the tolerance and accept or reject the result. No tolerance or acceptance is inferred here.

## Actual-phone review

Use a physical phone in portrait and landscape. Record its model, OS, browser/version, reviewer/date and served source/deployment revisions. Viewport emulation is separate software evidence.

1. Sign in normally to the [LotScope roof inspector](https://lotscope.aerovista.us/workbench/roof-drawings). Select Home B, all four cardinal views and axon. Verify labels, linework, warnings and source provenance are readable at a practical zoom.
2. Use the native edge picker, then inspect both V1/V2 valley sections. Test taps, vertical scrolling and pinch zoom; record accidental selections, clipping, inaccessible controls or unreadable content. Confirm the publication-disabled and withheld fascia treatment remains clear.
3. Review [source elevations](https://aerovista-us.github.io/PondyFlats/d4-elevs.html), [source axon](https://aerovista-us.github.io/PondyFlats/d4-axon.html), [standalone elevations](https://aerovista-us.github.io/PondyFlats/packages/design-4-client/elevs.html) and [standalone axon](https://aerovista-us.github.io/PondyFlats/packages/design-4-client/axon.html). Check navigation, zoom, overflow, drawing readability and concept-only disclosures.
4. Retain screenshots or recordings, findings and an explicit accept/reject/conditional decision for the tested scope. A phone UI acceptance grants no architectural or permit approval.

## Professional and AHJ dispositions

| Review scope | Required real disposition |
|---|---|
| Architectural drawings | Responsible professional's revision-specific Home B cardinal, axon and V1/V2 review; decisions on hidden lines, junctions and ambiguous or withheld details |
| Survey / dimensions | Actual Pennsylvania frontage versus overall Y extent, survey/setback references and measured sheet accuracy |
| Civil / drainage | Grading, drainage, roof-water discharge and access conditions |
| Structural / detailing | Loads/snow, bearing and roof junctions, valley/flashing detail, eaves/fascia authorization |
| AHJ | Identify the actual reviewing authority and submission requirements; retain its written disposition and conditions after the required professional package exists |

For each scope, record reviewer name, role/authority, date, exact revision/candidate binding, evidence/document reference, decision, conditions and unresolved items. Do not manufacture an AHJ application or disposition. No contact or submission is authorized by this packet.

## Return record

```text
Review scope:
Reviewer / role / date:
Device or printer / OS-driver / application version:
Source / deployment SHA and file hashes:
Measurements or observed behavior:
Evidence references (photos, recordings, written disposition):
Decision (accept / reject / conditional):
Conditions / defects / required retest:
```

Track physical measurements in [Pondy #48](https://github.com/aerovista-us/PondyFlats/issues/48) and drawing/phone/professional evidence in [LotScope #86](https://github.com/aerovista-us/lot-assessment/issues/86). Keep the actual observations and original disposition documents with their revision binding. Existing outbound-circulation and marginal Garage B conditions remain separate open gates. Designs 3 → 2 → 1 continue through the same engine after D4 acceptance.
