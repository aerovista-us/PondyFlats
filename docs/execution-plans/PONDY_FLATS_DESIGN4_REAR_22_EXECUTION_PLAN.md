# Pondy Flats Lot 2 — Design 4 execution plan

**Track:** Design 4 · rear detached 22×22 garages  
**Branch:** `design4/rear-22-discovery`  
**Selected seed:** `d4_nf_54_72p5_94p5_31p25_35p75_71p5`  
**Status:** design-development geometry seed, **not frozen** and not permit/code/zoning approval.

## 1. Non-negotiable Design 4 brief

- True Lot 2 survey remains unchanged.
- Pennsylvania Street remains the only vehicle-access origin.
- Two garages are required.
- Each garage is a detached accessory garage exactly **22×22 ft / 484 SF**.
- Four enclosed stalls total.
- Garages stay as far rear/west as the accessory rules and true survey permit.
- Normal Design 4 accessory planning targets are **5 ft rear + 5 ft side**; do not silently use the 3 ft roof-slope exceptions.
- Do not shrink a garage, substitute a 20×20 plate, attach a garage to a dwelling, add living/sleeping space to a garage, or move a garage forward solely to manufacture a pass.
- Principal-home setbacks remain independent from the accessory-garage rule.
- Keep at least 6 ft garage-to-principal-building separation as the planning floor pending AHJ/professional confirmation.

## 2. Current promoted geometry seed

### Garages

- Garage A: `x=5..27, y=5..27`, east-facing vehicle door.
- Garage B: `x=5..27, y=29..51`, east-facing vehicle door.
- Outer side buffers are approximately 5 ft; south actual buffer at x≈5 is about 5.2 ft because of the irregular survey boundary.
- Current garage-to-garage clear gap is only about **2 ft**. This is an **AHJ/building/fire/eave/drainage confirmation item**, not an approved spacing condition.

### Homes

Selected north-finger parameters:

- Home B west finger: `x=54..94.5, y=5..22` plus main mass `x=72.5..94.5, y=22..31.25`.
- Home A: `x=94.5..128, y=5..31.25`.
- Diagrammed first-floor shell areas: approximately **892 / 879 SF**.
- Two-story gross shell capacity: approximately **1,784 / 1,759 SF**.
- Capacity difference: **25 SF**.
- Garage-to-principal-home separation: about **27 ft**.

These figures are planning-shell capacities, not certified conditioned area.

## 3. Travel proof

Locked design vehicle: FS-SUV / full-size pickup class, 20.5×8.0 ft, 13.1 ft wheelbase, 25 ft minimum rear-axle radius.

The current seed has:

- full-body inbound sweep to Garage A: PASS;
- full-body inbound sweep to Garage B: PASS;
- complete enclosed parking pose inside Garage A: PASS;
- complete enclosed parking pose inside Garage B: PASS;
- no off-survey body corners on the selected inbound paths;
- minimum south-boundary clearance around **1.08 ft** under the existing clearance metric.

Outbound must be represented truthfully as a **back-out / reverse-equivalent maneuver**. Traversing the collision-free inbound body poses in reverse order is valid geometric evidence for backing out. It is **not** evidence that the full-size vehicle turns around inside a 22×22 garage or exits forward.

The generic legacy analyzer reports an outbound-only Home B clip because it reverses the centerline and assigns a forward-driving heading. Design 4 QA must distinguish that algorithmic artifact from the physical reverse-gear proof.

## 4. Package development sequence

### Milestone A — authoritative Design 4 model

Create `js/lot2-design-4.js` as the single Design 4 geometry authority.

It must expose:

- survey;
- locked 22×22 garage program;
- promoted north-finger seed;
- Pennsylvania access paths;
- FS-SUV vehicle constants;
- principal and accessory setback status separately;
- inter-garage-spacing advisory;
- `analyze()` with no permit/legal overclaim;
- site and swept-path renderers derived from the model.

### Milestone B — room/program closure

Create a credible two-story room program inside both home shells.

Targets:

- two comparable homes near the available ~1,760–1,785 SF gross shell capacity;
- 3 bedrooms each unless a stronger program is explicitly approved;
- clear exterior entries for both homes;
- stairs connect both levels;
- no room overlaps, garage intrusions, or inaccessible counted rooms;
- wet/plumbing relationship computed from actual zones and marked advisory if unresolved;
- display planning-zone/gross-diagram areas honestly rather than claiming certified conditioned SF.

### Milestone C — Read + pedestrian ownership

Before architectural polish, prove the customer can read:

- Home A vs Home B;
- Garage A vs Garage B;
- Pennsylvania frontage;
- both pedestrian entries;
- ownership/relationship of each detached garage to its home;
- walk from each garage/parking area to the corresponding home;
- shared driveway vs private apron areas.

### Milestone D — complete package

Emit the required Design 4 sheets/pages:

- G-001 overview/checks;
- A-001 site/setback evidence;
- A-002 full FS-SUV inbound/park/back-out proof;
- A-101 ground floor;
- A-102 upper floor;
- A-103 room/bubble diagram;
- A-201 Pennsylvania elevation;
- A-202 rear elevation;
- A-203 north elevation;
- A-204 south elevation;
- A-301 / A-302 sections;
- A-401 same-camera architectural massing;
- A-402 same-camera clean axon.

Openings shown in plans/elevations/axon must derive from shared world geometry, not hand-placed screen coordinates.

### Milestone E — QA / export / review

- Chromium QA at 1440 / 1024 / 768 / 390.
- Reject blank/fallback renderers, overflow, runtime errors, broken links, missing sheets, contradictory status language, or vehicle/setback drift.
- Capture actual rendered pixels for human visual review.
- Export standalone `design-4-client` plus presenter kit.
- No Workbench links in standalone client.
- Request fresh Codex review on the exact final head before merge.
- Merge/deploy only after clean review and visual QA.

## 5. Zoning/code evidence boundary

Current published Coeur d'Alene code supports the 5 ft rear/side accessory planning baseline and detached garage use in R-12, but the online code publisher includes an official-copy disclaimer. The present code check is recorded in `docs/lot2-design-4-code-check-2026-09-11.md`.

Keep the public package status **CONDITIONAL** for accessory zoning until parcel-specific confirmation. Keep the ~2 ft garage-to-garage gap separately flagged for professional/AHJ review. If that spacing is not acceptable, reopen only garage staggering/drive geometry while preserving both full 22×22 plates.

## 6. Promotion standard

Design 4 may be called a strong **design-development concept** only when the package, room program, full vehicle proof, QA, and rendered-pixel review pass.

Never label it permit-ready, code-approved, zoning-approved, structurally validated, civil-certified, or construction-ready without the corresponding professional/AHJ validation.
