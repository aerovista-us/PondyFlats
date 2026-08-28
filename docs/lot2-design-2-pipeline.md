# Lot 2 — Design #2 proof + deliverable pipeline

**Status:** CONDITIONAL / architecture in development  
**Revision:** D2-v0.9  
**Does not move:** frozen R5.1e-v1.1 (Design 1)  
**Package:** [`../design-2.html`](../design-2.html) · [`../d2-site.html`](../d2-site.html) · [`../d2-plans.html`](../d2-plans.html) · [`../d2-elevs.html`](../d2-elevs.html) · [`../d2-axon.html`](../d2-axon.html)  
**Gate:** `npm run d2` · `node scripts/d2-deliverable-gates.js`

**This is the Design 2 instance of the workbench.** The standardized path is [`lot2-design-pipeline.md`](lot2-design-pipeline.md): **Lot → Brief → Arrange → Read → Travel → Package**. Design 2 reuses the locked Lot 2 parcel (`js/lot2-sot.js`); its brief is the rear-garage-stack program on that lot. Axon, elevations, and the client page are Package outputs — they are not a later request. A-401 / A-402 outline doors red and windows blue (`auditAxonOpenings`). Remaining D2 gaps (plan vs axon ENTRY A, swept overlay, walks) stay grandfathered — required on Design 3+. See [`lot2-pipeline-gaps.md`](lot2-pipeline-gaps.md).

## What was proven

Workbench family **rearGarageStack** / Run 47 / **PONDY-RGS-230** showed a connected L-duplex toward Pennsylvania and two detached 20×20 two-car garages stacked at the west/rear, with ~1.50′ promotion clearance. Exact serial 230 coordinates were not extracted from lot-assessment. This hub uses a **family representative** with the 6′ south buffer and accessory 5′ rear from [`setbacks-without-alley.pdf`](setbacks-without-alley.pdf).

Public copy may only claim Workbench-proven capabilities: Pennsylvania origin, four enclosed stalls, accessory rear stack, on-lot FS-SUV polygonal sweep.

## Locked geometry (D2-v0.1)

| Item | Value |
| ---- | ----- |
| Garage west face | x=5 |
| Garage A (north, nearer y=0) | y=6 · 20×20 · door east |
| Garage B (south) | y=28 · 20×20 · door east |
| Duplex west / party | x=52 / x=92 |
| HOME B | 52, 5, ~40×22 |
| HOME B LEG | ~72, 27, 20×4 |
| HOME A | 92, 5, 36×**26** |
| Drive spine / turn / flare | y=**37** / x=74 / x=44 |
| Garage–duplex gap | 27′ |
| Boundary clearance required | 1.0′ |
| Living gate | 1,600–2,100 / Δ≤200 |
| Conceptual rooms | A 1,792 / B 1,944 |
| Two-story plate capacity | A 1,872 / B 1,918 |

## Correction record (AGENTS.md order)

1. **Driveway centerline only** — spineY 38 failed lot clearance (0.08′ < 1.00′ at the irregular south).
2. **Driveway centerline** — spineY 37 cleared the lot (~1.54′ south) but the 8′ SUV envelope clipped HOME A and HOME B LEG against a 28′ Unit A / 6′ L-leg.
3. **Unit micro-shift / footprint** — Unit A depth 28→26; B leg 6→4. Handoff intent was 28′; 26′ is the cheapest remaining move after drive-first. Do not treat 28′ as the live plate.

FS-SUV result after step 3: **REVIEW** (polygonal on-lot, no sharp-corner shortfall, min south clearance **1.54′**). Package verdict **CONDITIONAL** because REVIEW ≠ FULL PASS.

**D2-v0.2** derives four elevations, two sections, and massing from the same lock (plate widths, 20.5′ mass, ridges 27.0′ / 26.5′, 16′ doors, 16′ garage eave). They are still conceptual — not a frozen architectural set.

**D2-v0.3** is a presentation pass only (geometry unchanged): client-language cover, how-to-read, sheet captions, north arrow (points left), 148′ / 50′ dims, plan labels that fit short rooms, and title blocks at the bottom of each sheet. Package: [`../design-2.html`](../design-2.html).

**D2-v0.4** is presentation + pipeline (geometry unchanged, fingerprint `d2-rgs-geom-1`): shared client CSS, Design 1 vs Design 2 comparison, sheet index from the engine, scale bar, street door, window mullions, print header. Gate now audits sheets, writes [`lot2-design-2-gate.json`](lot2-design-2-gate.json), and fails on fingerprint drift.

**D2-v0.5** is presentation only (geometry unchanged, fingerprint still `d2-rgs-geom-1`). Floor plans use RPLAN-style room-type color. Interior openings are inferred from shared walls. New sheet **A-103** (`d2-plan-bubble.svg`) is a bubble diagram: topology first, then the dimensioned plan — the same reading order as neural floorplan papers (bubble → geometry → orthogonal drawing). Inspiration only: [WizardZZH/Floorplan-generation](https://github.com/WizardZZH/Floorplan-generation) (GPL-3.0). This repo does **not** train a model, copy that code, or generate new plates.

**D2-v0.6** is presentation only. Architectural massing **A-401** and clean axon **A-402** (`d2-axon-lock-clean.svg`) use the **same camera** as Design 1’s massing truth / axon lock (`OX/OY`, scales). Volumes come from the D2 lock — detached rear garages, not R5.1e plates. East garage doors are SVG geometry. Not a freeze. Photoreal that moves a volume still fails visualization.

**D2-v0.7** is presentation + pipeline (geometry unchanged). The gate writes dedicated HTML pages: [`d2-site.html`](../d2-site.html), [`d2-plans.html`](../d2-plans.html), [`d2-elevs.html`](../d2-elevs.html), [`d2-axon.html`](../d2-axon.html). Hub stays [`design-2.html`](../design-2.html). Do not hand-edit the four generated files.

**D2-v0.8** is presentation only. A-401 / A-402 now outline **every door in red** and **every window in blue** on the faces this camera can read (east / Pennsylvania and south). Both house entries are labeled (ENTRY A on Pennsylvania, ENTRY B on the south court). Garage doors stay SVG geometry with the red door outline.

## How to run a revision (repeatable)

Presentation (labels, CSS, conceptual windows) — bump `REV` in `js/lot2-design-2.js` only.

Geometry (plates, garages, driveway, living totals) — record a correction here, bump `GEOM` + `FINGERPRINT`, then `REV`.

Then:

```
npm run d2
```

Must print `PIPELINE OK`. Expected verdict is **CONDITIONAL** while the SUV sweep is REVIEW. Exit 1 means FAIL, fingerprint drift, or a sheet/HTML audit miss.

Do not hand-edit `imgs/d2-*.svg` or the generated `d2-site.html` / `d2-plans.html` / `d2-elevs.html` / `d2-axon.html`. Open [`../index.html`](../index.html) → [`../design-2.html`](../design-2.html), then the four focus pages.

Both tracks: `npm run gates`.

## Pipeline map (R5.1e analog)

| Step | Design 1 (R5.1e) | Design 2 |
| ---- | ---------------- | -------- |
| Geometry lock | `js/lot2-r51e-lock.js` | `js/lot2-design-2.js` |
| Access proof | frozen R5 FULL PASS | `Lot2Access.analyzeConcept('d2_rgs')` |
| Site | `r51e-site-plan.html` | **`d2-site.html`** · `imgs/d2-site-plan.svg` |
| Plans | `r51e-plans.html` | **`d2-plans.html`** · bubble + colored floors |
| Elevations | `r51e-penn-elev.html` + rear + sides | **`d2-elevs.html`** · four elevs + two sections |
| Sections | `r51e-sections.html` | on Elevs · A-A / B-B derived |
| Massing | `r51e-architectural-massing.html` | on **`d2-axon.html`** · A-401 conceptual |
| Axon | `r51e-axon-lock.html` | **`d2-axon.html`** · A-402 · doors red / windows blue · not a freeze |
| Consistency gate | `scripts/r51e-deliverable-gates.js` | `npm run d2` · fingerprint `d2-rgs-geom-1` |
| Customer front door | `r51e-deliverable.html` | `design-2.html` |

## Honest labels

- Elevations: **CONCEPTUAL ARCHITECTURAL ELEVATION**
- Plans: conceptual, fitted to solved plates · color = room type · A-103 is topology, not a generated layout
- Zoning: 5′ accessory rear is a **hypothesis**, not CDA confirmation
- Serial: family representative until RGS-230 is extracted
- Axon / massing: **CONCEPTUAL** · same camera as Design 1 · not a geometry freeze

## What is not claimed

Not a permit / construction set. Not Design Complete. Not a 25′ turning-radius FULL PASS. Do not mix Design 2 plates with R5.1e.

## Related

- [`lot2-design-2-accessory-rear.md`](lot2-design-2-accessory-rear.md) — 25′→5′ code finding
- [`lot2-pipeline-gaps.md`](lot2-pipeline-gaps.md) — remaining D2 gaps vs Design 3+ requirements
- [`setbacks-without-alley.pdf`](setbacks-without-alley.pdf) — source sheet
- [`../design-2.html`](../design-2.html) — customer package
- [`../index.html`](../index.html) — landing (Design 1 + Design 2)
