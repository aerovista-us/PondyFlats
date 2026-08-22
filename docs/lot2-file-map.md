# Lot 2 — File map (truth · current · experiment · archive · temp)

**Purpose:** Declare what each major path is for. Generations of site studies, access tests, J1 visuals, failed renders, and Parking Reset co-exist in one tree — this map prevents treating an archive page as live design authority.

**Status authority (where we are):** [`../index.html`](../index.html) + [`lot2-r64-daily.md`](lot2-r64-daily.md) + [`lot2-parking-reset.md`](lot2-parking-reset.md)  
**Live gate matrix:** [`../parking-reset.html`](../parking-reset.html) · **Daily-use:** [`../r64-daily.html`](../r64-daily.html)

---

## Role glossary

| Role | Meaning | Edit rule |
| ---- | ------- | --------- |
| **TRUTH** | Frozen source of truth. Survey, vehicle, locked coordinates. | Change only with explicit SOT / gate intent |
| **CURRENT** | Active design + status surfaces for Parking Reset | Prefer these when deciding “what’s next” |
| **EXPERIMENT** | Named tests under the current gate (may FAIL / CONDITIONAL) | Keep; do not promote to FULL PASS without gate |
| **DERIVATIVE** | Views, SVGs, HTML that **must** regenerate from TRUTH engines | Never treat prettier output as geometry authority |
| **ARCHIVE** | Closed trails kept as evidence (J1, A–F, Pass 1) | Do not delete in cleanup merges; do not resume as live |
| **TEMP** | Push mirrors, export helpers, local junk | Gitignored or disposable; never cite as truth |

---

## Start here (CURRENT)

| Path | Role | Notes |
| ---- | ---- | ----- |
| [`index.html`](../index.html) | **CURRENT** | Study hub — locked hierarchy |
| [`r64-daily.html`](../r64-daily.html) | **CURRENT** | R6.4 daily-use scenarios |
| [`parking-reset.html`](../parking-reset.html) | **CURRENT** | Parking Reset Gate matrix (live scores) |
| [`guide.html`](../guide.html) | **CURRENT** | What / why / next |
| [`study.html`](../study.html) | **CURRENT** | Stage timeline |
| [`docs/lot2-r64-daily.md`](lot2-r64-daily.md) | **CURRENT** | Daily-use closure write-up |
| [`docs/lot2-parking-reset.md`](lot2-parking-reset.md) | **CURRENT** | Reset write-up · FULL PASS rules |
| [`docs/README.md`](README.md) | **CURRENT** | Docs index |
| [`docs/lot2-file-map.md`](lot2-file-map.md) | **CURRENT** | This map |

---

## Engines (TRUTH + CURRENT scoring)

| Path | Role | Notes |
| ---- | ---- | ----- |
| [`js/lot2-sot.js`](../js/lot2-sot.js) | **TRUTH** | Survey polygon, Pennsylvania, SUV_FS — **do not edit casually** |
| [`js/lot2-geometry.js`](../js/lot2-geometry.js) | **TRUTH** + **CURRENT** | Concept footprints including Parking Resets R5–R8 / R6.x |
| [`js/lot2-access.js`](../js/lot2-access.js) | **TRUTH** | FS-SUV swept-path engine |
| [`js/lot2-access-skeleton.js`](../js/lot2-access-skeleton.js) | **TRUTH** | Integrated plate / architecture-remaining scoring |
| [`js/lot2-parking-reset.js`](../js/lot2-parking-reset.js) | **CURRENT** | Parking Reset Gate scorer (PASS / CONDITIONAL / FAIL) |
| [`js/lot2-r64-daily.js`](../js/lot2-r64-daily.js) | **CURRENT** | R6.4 daily-use scenario scorer |
| [`js/lot2-render-core.js`](../js/lot2-render-core.js) | **DERIVATIVE** | Shared SVG plan rendering |
| [`js/lot2-validate.js`](../js/lot2-validate.js) | **DERIVATIVE** | Validation helpers for lab |

### J1 engines (ARCHIVE — closed trail)

| Path | Role |
| ---- | ---- |
| `js/lot2-j1-massing.js` | **ARCHIVE** |
| `js/lot2-j1b-geometry-truth.js` | **ARCHIVE** (Image 1 engine) |
| `js/lot2-j1b-massing-truth.js` | **ARCHIVE** (Image 2) |
| `js/lot2-j1b-architectural-massing.js` | **ARCHIVE** (Image 3) |
| `js/lot2-j1b-image41-scaffold.js` | **ARCHIVE** (4.1 lock) |
| `js/lot2-j1b-image42-views.js` | **ARCHIVE** (4.2 views) |

---

## Parking Reset concepts (in `lot2-geometry.js`)

| ID | Role | Notes |
| -- | ---- | ----- |
| `reset_r5` | **CURRENT** (FULL PASS · public lead) | Parking frozen · schematic CONDITIONAL |
| `js/lot2-r5-freeze.js` | **CURRENT** | R5 geometry freeze assert |
| `js/lot2-r51e-lock.js` | **CURRENT** | R5.1e plates + restored living gate (1,600–1,900 · Δ≤120) |
| `js/lot2-r51e-massing-truth.js` | **CURRENT** | Massing extrusion + geometric gate |
| `js/lot2-r51e-plans.js` | **CURRENT** | Exact rooms + hard sanity gate · Unit A core repair |
| `js/lot2-r51-rebalance.js` | CURRENT | Plate reopen study |
| `js/lot2-r5-schematic.js` | **CURRENT** | Floor plans + sanity gate |
| `reset_r6_1` | **CURRENT** (reference) | CONDITIONAL |
| `reset_r6_4a` | **CURRENT** (secondary repair) | Midpoint turn pocket |
| `reset_r6_4b` | **CURRENT** (secondary repair) | Independent lift equipment |
| `reset_r6_4` | **CURRENT** (repair parent) | REPAIR — DAILY POOR |
| `reset_r6_3` | **EXPERIMENT** (AHJ hold) | Only if shortens B reverse / lift retrieval |
| `reset_r6_2a` | **ARCHIVE** (closed FAIL) | No more curved-driveway work |
| `reset_r6` / `reset_r6_2` | **ARCHIVE** baseline | Topology / front-zone record |
| `reset_r7` / `reset_r8` | **EXPERIMENT** (queued) | Integrated variants |
| `reset_r1`–`reset_r4` | **ARCHIVE** audit | Detached track only |

Architecture unlocks only on **FULL PASS** of the Parking Reset Gate — never on CONDITIONAL.

---

## HTML pages by generation

### CURRENT — Parking Reset era

| File | Role |
| ---- | ---- |
| `index.html` | Hub |
| `r51e.html` | **CURRENT** · R5.1e parking/massing demo · program repair active |
| `r51e-massing-truth.html` | **CURRENT** · massing axon + gate |
| `r51e-plans.html` | **CURRENT** · R5.1e exact plans · CONDITIONAL under restored gate |
| `r51-rebalance.html` | CURRENT · R5.1 plate reopen evidence |
| `r5-schematic.html` | CURRENT · R5 floor plans · CONDITIONAL |
| `parking-reset.html` | Gate matrix |
| `guide.html` / `study.html` | Orientation |

### ARCHIVE — Access / skeletons (closed; evidence)

| File | Role | Notes |
| ---- | ---- | ----- |
| `access-geometry.html` | **ARCHIVE** | Parking Skeleton A–F audit · E = W+E reference |
| `access.html` | **ARCHIVE** | Locked five + G1-A FS-SUV audit |
| `south-pinch.html` | **ARCHIVE** | South-lane pinch evidence |
| `garage-clips.html` | **ARCHIVE** | Garage clip diagnostics |

### ARCHIVE — Pass 1.5 site studies

| File | Role | Notes |
| ---- | ---- | ----- |
| `lab.html` | **ARCHIVE** | Geometry validation matrix (still useful reference) |
| `shortlist.html` | **ARCHIVE** | Final Three / shortlist |
| `designs.html` | **ARCHIVE** | Concept browse |
| `docs/lot2-geometry-validation.md` | **ARCHIVE** + drawing convention still **TRUTH** | Rules still apply; shortlist status is historical |
| `docs/lot2-survey-orientation.md` | **ARCHIVE** / orientation **TRUTH** | Drawing convention |
| `docs/shortlist-elimination-memo.md` | **ARCHIVE** | |
| `review-pass1/*.svg` | **ARCHIVE** | Pass 1 review plates |

### ARCHIVE — J1 visual chain (ownership NO · STOP)

| File | Role | Notes |
| ---- | ---- | ----- |
| `j1b-geometry-truth.html` | **ARCHIVE** | Image 1 — approved geometry truth |
| `j1b-massing-truth.html` | **ARCHIVE** | Image 2 |
| `j1b-architectural-massing.html` | **ARCHIVE** | Image 3 |
| `j1b-image4-1-axon.html` | **ARCHIVE** | Image 4.1 PASS lock |
| `j1b-image4-2-views.html` | **ARCHIVE** | Image 4.2 · LAYER MATCH · **ownership NO** |
| `j1-massing.html` | **ARCHIVE** | J1 family |
| `j1-pass2b-elevations.html` | **ARCHIVE** | Pass 2B |
| `j1b-pass2c-architectural-proof.html` | **ARCHIVE** | Pass 2C |
| `j1b-pass2c1-visualization.html` | **ARCHIVE** | Pass 2C.1 — **invalid as geometry proof** |
| `j1b-image4-finished.html` | **ARCHIVE** | Finished / style adjacent |

Supporting docs: `docs/lot2-visual-chain.md`, `docs/lot2-j1*.md`, `docs/lot2-j1b*.md`, `docs/lot2-g1a.md`, `docs/lot2-access.md`, `docs/lot2-access-geometry.md`, `docs/lot2-def-closure.md`.

---

## Images & media

| Path | Role | Notes |
| ---- | ---- | ----- |
| `imgs/j1b-image4-1-*.svg` / lock scaffolds | **ARCHIVE** / **DERIVATIVE** | 4.1 geometry lock trail |
| `imgs/j1b-image4-2-*.svg` | **ARCHIVE** / **DERIVATIVE** | 4.2 layer-match views |
| `imgs/j1b-*-materials*.svg` / `*-ref.png` | **DERIVATIVE** | Materials / refs on locked polygons |
| `imgs/j1b-massing-truth.svg` / architectural SVGs | **ARCHIVE** | Images 2–3 |
| `imgs/1_D2.png`, `2_E1.png`, `e1.png`… | **ARCHIVE** | Early concept / ChatGPT study art — **not** Parking Reset truth |
| `imgs/lot2_*math*.png`, `multiviews.png` | **ARCHIVE** | Early math / marketing composites |
| `imgs/ChatGPT Image*.png` | **ARCHIVE** / style | Generative; not coordinate truth |
| `imgs/_export42.html` | **TEMP** | Export helper (gitignored pattern `imgs/_*.html`) |
| `master.image.png` / `assets/master.image.png` | **ARCHIVE** | Legacy master plate |
| [`reference/failed-visualization-drift/`](../reference/failed-visualization-drift/) | **ARCHIVE** | **Style-only** failed photoreal — never geometry / ownership proof |

---

## Scripts

| Path | Role | Notes |
| ---- | ---- | ----- |
| `scripts/g1a-search.js` | **ARCHIVE** | G1-A search (complete) |
| `scripts/access-abc-search.js` | **ARCHIVE** | Access A/B/C search |

---

## TEMP / do not cite

| Path | Role | Notes |
| ---- | ---- | ----- |
| `_push-temp/` | **TEMP** | Nested push mirror — **gitignored** |
| `imgs/_*.html`, `imgs/_*.svg` | **TEMP** | Export helpers — gitignored |
| `.cursor/` | **TEMP** | Local agent rules/skills — gitignored |
| `node_modules/`, `.cache/` | **TEMP** | Tooling |

If you find a file only under `_push-temp/`, treat the **repo root** copy as canonical (or CURRENT/ARCHIVE as mapped above).

---

## Decision rules (quick)

1. **“Where are we?”** → hub + `lot2-parking-reset.md` + `parking-reset.html`  
2. **Survey / vehicle / compass** → `js/lot2-sot.js` only  
3. **Can we build architecture?** → only after Parking Reset **FULL PASS** (not CONDITIONAL, not J1 visuals)  
4. **Pretty duplex image** → check role: if under `reference/failed-visualization-drift/` or Pass 2C.1 / Image 4 photoreal drift → **style only**  
5. **A–F or access.html PASS** → historical / reference; does **not** reopen Original Program Gate  
6. **Cleanup merges** → do not delete ARCHIVE evidence; do discard or ignore TEMP  

---

## Related

- [`lot2-parking-reset.md`](lot2-parking-reset.md) — current gate  
- [`lot2-def-closure.md`](lot2-def-closure.md) — D/E/F close · named gates  
- [`lot2-visual-chain.md`](lot2-visual-chain.md) — J1 anti-drift chain  
- [`../reference/failed-visualization-drift/README.md`](../reference/failed-visualization-drift/README.md) — failed render policy  
