# Lot 2 — File map (truth · current · experiment · archive · temp)

**Purpose:** Declare what each major path is for. Generations of site studies, access tests, J1 visuals, failed renders, and Parking Reset co-exist in one tree — this map prevents treating an archive page as live design authority.

**Status authority (where we are):** [`../index.html`](../index.html) + [`../r51e-deliverable.html`](../r51e-deliverable.html) + [`lot2-r51e-v1-baseline.md`](lot2-r51e-v1-baseline.md)  
**Parking-gate matrix (still valid scores):** [`../parking-reset.html`](../parking-reset.html) · **Daily-use:** [`../r64-daily.html`](../r64-daily.html)

> **FLAG (2026-08-22 — not deleted):** The previous authority line was hub + `lot2-r64-daily.md` + `lot2-parking-reset.md`. That pairing still describes **parking**. It contradicts architecture DESIGN COMPLETE. Original CURRENT labels on `study.html` / `r5-schematic.html` / `reset_r5` “schematic CONDITIONAL” are kept below. Catalog: [`lot2-status-conflicts.md`](lot2-status-conflicts.md).

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
| [`r51e.html`](../r51e.html) | **CURRENT** | R5.1e visual demo |
| [`r51e-deliverable.html`](../r51e-deliverable.html) | **CURRENT** | **v1.0 front door** · Design Complete package |
| [`r51e-site-plan.html`](../r51e-site-plan.html) | **CURRENT** | Site plan freeze |
| [`r51e-penn-elev.html`](../r51e-penn-elev.html) | **CURRENT** | Pennsylvania elevation |
| [`r51e-architectural-massing.html`](../r51e-architectural-massing.html) | **CURRENT** | Architectural massing freeze |
| [`r64-daily.html`](../r64-daily.html) | **CURRENT** | R6.4 daily-use scenarios |
| [`parking-reset.html`](../parking-reset.html) | **CURRENT** | Parking Reset Gate matrix (live scores) |
| [`guide.html`](../guide.html) | **CURRENT** | What / why / next (older A–F CTAs flagged, not deleted) |
| [`study.html`](../study.html) | **CURRENT** *(FLAG: body still schematic CONDITIONAL — historical landing)* | Stage timeline |
| [`docs/lot2-r64-daily.md`](lot2-r64-daily.md) | **CURRENT** | Daily-use closure write-up |
| [`docs/lot2-parking-reset.md`](lot2-parking-reset.md) | **CURRENT** *(parking only)* | Reset write-up · FULL PASS rules |
| [`docs/lot2-status-conflicts.md`](lot2-status-conflicts.md) | **CURRENT** | Flagged contradictions for path review |
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
| `reset_r5` | **CURRENT** (FULL PASS · public lead) | Parking frozen · schematic CONDITIONAL *(FLAG: architecture later DESIGN COMPLETE)* |
| `js/lot2-r5-freeze.js` | **CURRENT** | R5 geometry freeze assert |
| `js/lot2-r51e-lock.js` | **CURRENT** | R5.1e plates + restored living gate (1,600–1,900 · Δ≤120) |
| `js/lot2-r51e-massing-truth.js` | **CURRENT** | Massing extrusion + geometric gate |
| `js/lot2-r51e-architectural-massing.js` | **CURRENT** | Architectural massing + freeze gate |
| `js/lot2-r51e-plan-closure.js` | **CURRENT** | Floor-plan closure inside frozen shells |
| `js/lot2-r51e-site-plan.js` | **CURRENT** | Site plan · Penn access · setbacks · yards |
| `js/lot2-r51e-sheet.js` | **CURRENT** | Sheet presentation kit · revision R5.1e-v1.0 |
| `js/lot2-r51e-penn-elev.js` | **CURRENT** | Pennsylvania elevation · representation-only |
| `js/lot2-r51e-elevations.js` | **CURRENT** | Rear / north / south elevations |
| `js/lot2-r51e-sections.js` | **CURRENT** | Sections A-A · B-B |
| `js/lot2-r51e-consistency.js` | **CURRENT** | Deliverable v1.0 package gate |
| `js/lot2-r51e-axon-lock.js` | **CURRENT** | Same-camera axon lock · inheritance gate |
| `js/lot2-r51e-plans.js` | **CURRENT** | Exact rooms + hard sanity gate · Unit A core repair |
| `js/lot2-r51-rebalance.js` | CURRENT | Plate reopen study |
| `js/lot2-r5-schematic.js` | **CURRENT** *(FLAG: cottage schematic superseded by R5.1e)* | Floor plans + sanity gate |
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
| `r51e.html` | **CURRENT** · R5.1e visual demo (Path A freeze + Path B repair copy both on page) |
| `r51e-architectural-massing.html` | **CURRENT** · Path A architectural massing + gate |
| `r51e-plan-closure.html` | **CURRENT** · Path A floor-plan closure |
| `r51e-site-plan.html` | **CURRENT** · Path A site plan freeze |
| `r51e-penn-elev.html` | **CURRENT** · Path A Pennsylvania elevation |
| `r51e-rear-elev.html` | **CURRENT** · Path A rear / west elevation |
| `r51e-side-elevs.html` | **CURRENT** · Path A north + south elevations |
| `r51e-sections.html` | **CURRENT** · Path A sections A-A / B-B |
| `r51e-deliverable.html` | **CURRENT** · Path A v1.0 front door |
| `r51e-axon-lock.html` | **CURRENT** · Path A same-camera axon lock |
| `r51e-massing-truth.html` | **CURRENT** · massing axon + gate |
| `r51e-plans.html` | **CURRENT** · exact plans · Path A PASS / Path B CONDITIONAL |
| `r51-rebalance.html` | CURRENT · R5.1 plate reopen evidence *(chose R5.1e)* |
| `r5-schematic.html` | CURRENT · R5 floor plans · CONDITIONAL *(FLAG: superseded cottage path)* |
| `r5-cottage-alternate.html` | PRESERVED ALTERNATE · ~920 / ~1,882 |
| `parking-reset.html` | Gate matrix |
| `guide.html` / `study.html` | Orientation *(study.html = historical “you are here”)* |

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
| `imgs/r51e-architectural-massing.svg` | **CURRENT** / **DERIVATIVE** | Frozen R5.1e architectural axon |
| `imgs/r51e-axon-lock-audit.svg` / `r51e-axon-lock-clean.svg` | **CURRENT** / **DERIVATIVE** | Axon lock |
| `imgs/r51e-plan-ground.svg` / `r51e-plan-upper.svg` | **CURRENT** / **DERIVATIVE** | Plan closure sheets |
| `imgs/r51e-site-plan.svg` | **CURRENT** / **DERIVATIVE** | Frozen site plan |
| `imgs/r51e-penn-elev.svg` | **CURRENT** / **DERIVATIVE** | Pennsylvania elevation |
| `imgs/r51e-rear-elev.svg` | **CURRENT** / **DERIVATIVE** | Rear / west elevation |
| `imgs/r51e-north-elev.svg` / `r51e-south-elev.svg` | **CURRENT** / **DERIVATIVE** | Side elevations |
| `imgs/r51e-section-aa.svg` / `r51e-section-bb.svg` | **CURRENT** / **DERIVATIVE** | Sections |
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
| `scripts/r51e-deliverable-gates.js` | **CURRENT** | Axon lock + plan-closure gates |
| `scripts/r51e-arch-massing-gate.js` | **CURRENT** | Architectural massing gate + SVG freeze |
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

1. **“Where are we?”** → hub + `r51e-deliverable.html` + `lot2-r51e-v1-baseline.md`  
   *(FLAG — previous line was hub + `r51e.html` + architectural-massing.md; both still valid sheets, not the package front door.)*  
2. **Survey / vehicle / compass** → `js/lot2-sot.js` only  
3. **Can we build architecture?** → only after Parking Reset **FULL PASS** (not CONDITIONAL, not J1 visuals)  
   *(FLAG — FULL PASS was reached; architecture is now DESIGN COMPLETE. Original gate sentence kept.)*  
4. **Pretty duplex image** → check role: if under `reference/failed-visualization-drift/` or Pass 2C.1 / Image 4 photoreal drift → **style only**  
5. **A–F or access.html PASS** → historical / reference; does **not** reopen Original Program Gate  
6. **Cleanup merges** → do not delete ARCHIVE evidence; do discard or ignore TEMP  

---

## Related

- [`lot2-parking-reset.md`](lot2-parking-reset.md) — current gate  
- [`lot2-def-closure.md`](lot2-def-closure.md) — D/E/F close · named gates  
- [`lot2-visual-chain.md`](lot2-visual-chain.md) — J1 anti-drift chain  
- [`../reference/failed-visualization-drift/README.md`](../reference/failed-visualization-drift/README.md) — failed render policy  
