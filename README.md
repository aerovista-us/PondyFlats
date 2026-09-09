# Pondy Flats · Lot 2

**R5.1e-v1.1 — DESIGN COMPLETE / PROGRAM GATE PASS.**  
**R5.1e-v1.0 — COMPLETE BASELINE / PROGRAM GATE NOT CLEARED** (preserved; not the live design).

Demising **x=68** · conditioned SF **1,639 / 1,720** (1,600–1,900 each, Δ 81 ≤ 120). Parking FULL PASS frozen. Professional validation pending. Not a permit / construction set.

The engine (`js/lot2-r51e-lock.js`) is authoritative when a presentation page disagrees. v1.0 sheets: [`imgs/r51e-v1.0/`](imgs/r51e-v1.0/). Decision: [`docs/lot2-r51e-v11.md`](docs/lot2-r51e-v11.md) · catalog: [`docs/lot2-status-conflicts.md`](docs/lot2-status-conflicts.md).

This GitHub repo is the **Lot 2 drawing-package fallback**. As of 2026-09-09, **Design 3 / CFB-716** is the current LotScope Workbench-preferred candidate; Design 1 and Design 2 remain preserved options. The intended public product is [LotScope](https://lotscope.aerovista.us) ([aerovista-us/lot-assessment](https://github.com/aerovista-us/lot-assessment)): two surfaces, one engine (`/` public, `/workbench` solver). Do not delete the packages in this repo — they are what we can hand off now. Split: [`docs/lot2-workbench-split.md`](docs/lot2-workbench-split.md). Landing: [`index.html`](index.html).

## Start here

| Page | What it is |
| ---- | ---------- |
| **[index.html](index.html)** | Lot 2 landing — Design 1 · Design 2 · Design 3 · fallback lot sketch |
| **[r51e-deliverable.html](r51e-deliverable.html)** | **Design 1** · R5.1e-v1.1 frozen package |
| **[design-2.html](design-2.html)** | **Design 2** · hub (D2-v0.9 CONDITIONAL) · site / plans / elevs / axon |
| **[design-3.html](design-3.html)** | **Design 3** · CFB-716 · Workbench preferred candidate · architectural development hub |
| **[d3-site.html](d3-site.html)** | Design 3 A-001 · frozen CFB-716 site + vehicle paths |
| **[d3-plan-closure.html](d3-plan-closure.html)** | Design 3 A-101/A-102 · active plan closure · dimensions, stairs, entries, garage connections, stacked service cores, area schedule |
| **[d3-plans.html](d3-plans.html)** | Design 3 archived first zoning study |
| **[d3-elevs.html](d3-elevs.html)** | Design 3 A-201–A-204 · first conceptual elevation pass |
| **[d3-axon.html](d3-axon.html)** | Design 3 A-401 · frozen-massing axon |
| **[lot.html](lot.html)** | **Fallback** lot ingest (custom polygon + grouped brief) — not LotScope |
| **[workbench.html](workbench.html)** | Internal package studio — not LotScope Workbench; do not send to clients |
| **[docs/lot2-design-pipeline.md](docs/lot2-design-pipeline.md)** | Workbench path including Polish → Export → Present |
| **[docs/lot2-delivery.md](docs/lot2-delivery.md)** | Standalone packages + presenter kits |
| **[packages/](packages/)** | Exported client + presenter folders (`npm run export`) |

Honest program: **R5 — two enclosed garage spaces plus two covered spaces, independently accessible.**

Conditioned SF **1,639 / 1,720** · ridges **27.0′ / 26.5′** · demising **x=68** blank · Pennsylvania = SOUTH / FRONT at the **right** of every plan.

## Sheet index

| No | Drawing |
| -- | ------- |
| G-001 | [Cover / package](r51e-deliverable.html) |
| A-001 | [Site plan](r51e-site-plan.html) |
| A-101 / A-102 | [Ground](r51e-plan-closure.html) / [upper](r51e-plan-closure.html) plans |
| A-201–A-204 | [Penn](r51e-penn-elev.html) · [rear](r51e-rear-elev.html) · [north+south](r51e-side-elevs.html) |
| A-301 / A-302 | [Sections A-A / B-B](r51e-sections.html) |
| A-401 / A-402 | [Massing](r51e-architectural-massing.html) · [axon lock](r51e-axon-lock.html) |

## Docs

Full index: [`docs/README.md`](docs/README.md) · file roles: [`docs/lot2-file-map.md`](docs/lot2-file-map.md)

Design 3 is now in plan-closure architectural development from the canonical CFB-716 freeze. Its authoritative local lock is `js/lot2-design-3.js`; presentation sheets may develop, but the frozen exterior/site geometry must not drift.

Older parking / schematic / J1 pages remain in the tree as **evidence**. They are not the live design. See the conflicts catalog before treating them as current.

## Local

Static HTML + JS. No build. From a clone, open `index.html`. Gates: `npm run d1` (Design 1) · `npm run d2` (Design 2) · `npm run gates` (both).
