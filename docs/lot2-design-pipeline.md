# Workbench pipeline (lot first, then the project)

**This is the standardized path.** Not a Design 2-only SVG script. Not a one-off axon request.

The path starts by **creating (or ingesting) the lot**. Then a **project brief** — size, program, vehicle, access, setbacks, living targets — is set **per project**. Everything after that is fitting that brief onto **that** lot, proving travel, and emitting the package.

This repo’s live lot is already locked: Lot 2 in `js/lot2-sot.js`. Design 1 and Design 2 reuse that parcel; they do not invent a second Lot 2. A different property starts on **LotScope**; [`../lot.html`](../lot.html) is a fallback ingest here, not the public product.

When a concept on that lot clears **Travel** and **Setbacks** (PASS or CONDITIONAL), the **Package** drawing set is already the next step — then **Polish**, **Export** a standalone client folder, and **Present** with a separate guide. Do not wait to be asked. The client never receives the workbench.

| Live instances | Role |
| -------------- | ---- |
| **Design 1** · R5.1e-v1.1 | Frozen complete package. Grandfathered without A-103. Do not mutate. |
| **Design 2** · D2-v0.9 | First full workbench instance (CONDITIONAL). Gate: `npm run d2`. |
| **Design 3+ on Lot 2** | New brief + lock engine + gate. Reuse `lot2-sot.js`. Do not mix plates with D1 or D2. |
| **A different property** | Start on **LotScope** (new survey / ProjectSpec). Fallback ingest in this repo: [`../lot.html`](../lot.html). Then Brief, then the rest of this path if this repo is producing drawings. |

Skill: [`.cursor/skills/lot2-workbench/SKILL.md`](../.cursor/skills/lot2-workbench/SKILL.md)  
Contract: [`../js/lot2-pipeline-contract.js`](../js/lot2-pipeline-contract.js)  
Geometry optimizer: [`../AGENTS.md`](../AGENTS.md)

## Why this exists

Workbench / solver runs prove *possibility*. The customer and a city planner need a **readable lot**: how it sits, how cars move, how tall it is, and what is still a hypothesis. Those drawings are the product of the pipeline, not a later art pass.

## Stages

```
Lot → Brief → Possible → Fit → Arrange → Read → Travel → Setbacks → Package → Polish → Export → Present → (Freeze only if asked)
```

| Stage | Checks and calculations | Output |
| ----- | ----------------------- | ------ |
| **0 Lot** | Parcel: closed survey, area, depth, street frontage, drawing convention (compass, axes). Create from survey / plat, or ingest an existing lock. | Frozen lot record. **This repo:** `js/lot2-sot.js` (already created). |
| **1 Brief** | Project parameters **for this lot**: dwellings, parking/garage rule, design vehicle, access-origin street, principal setbacks, living band. Built per project — Design 1 and Design 2 are two briefs on the same Lot 2. | Named brief; constraint class |
| **2 Possible** | The brief can exist on this lot from the declared access origin (no alley rescue unless the brief and lot allow it) | Named concept id |
| **3 Fit** | Plates inside **this lot’s** survey; no off-lot buildings | Footprints |
| **4 Arrange** | Party wall, garage attached vs detached, L-leg / stack, credible home proportions. **Openings schedule:** which wall is each dwelling’s front door. | Lock sketch + door/window list |
| **5 Read** | Two homes readable as homes; both pedestrian entries visible on the axon camera or labeled on the hidden elevation; garage-first hierarchy called **REVIEW**. J1 learned this at Image 4.2 — too late. | Ownership note. STOP only if freeze-quality was asked and the answer is NO. |
| **6 Travel** | Inbound and outbound design vehicle; independent doors; staging depth; min clearance recorded; `AGENTS.md` correction order. **Swept overlay drawn** on the site (not only a number). | Swept-path proof. CONDITIONAL is enough to continue. FAIL-CLOSED only on locked obstruction after bounded corrections. |
| **7 Setbacks** | Principal vs accessory readings for this lot’s code; hypotheses labeled until the city confirms | Envelope overlay on the site plan |
| **8 Package** | Engine owns geometry; emit **all required sheets**; axon openings red/blue; walks to each door on Design 3+. | See sheet list below |
| **9 Polish** | Client English; print-ready hub; grouped Site / Plans / Elevs / Axon; no workbench on the package. | Bump `REV` only (presentation) |
| **10 Export** | Standalone folder: `index.html` opens without the rest of the repo. No workbench, archive, or solver. | `packages/{slug}-client/` via `npm run export` |
| **11 Present** | Separate presenter guide + talking points for internal review and in-person delivery. Not inside the client zip. | `packages/{slug}-presenter/` |
| **12 Freeze** | Explicit request | DESIGN COMPLETE / program gate — Design 1 only so far |

**Today on Lot 2:** skip creating a new parcel. Reuse the locked survey. Start a new design at **Brief** (program may differ; the lot does not). **Later:** a new property begins on LotScope — survey in, then a brief, then fit. [`../lot.html`](../lot.html) is only a fallback ingest.

Required keys: `Lot2PipelineContract.LOT` and `.BRIEF`. Live Lot 2 numbers stay in `lot2-sot.js`; do not duplicate a second survey.

Approximate plans are allowed at Package: they show the idea to a planner. They are not a permit takeoff. Label them **CONCEPTUAL**.

## Required package sheets

Do not omit A-401 / A-402. Axon is part of Package, same as the site plan.

| No | Drawing | Planner / client use |
| -- | ------- | -------------------- |
| G-001 | Cover | What this is / is not |
| A-001 | Site plan | Lot, setbacks, drive from Pennsylvania, buildings |
| A-101 | Ground | Approximate rooms on solved plates |
| A-102 | Upper | Same outlines |
| A-103 | Room diagram | Topology before dimensions (required on **new** designs) |
| A-201 | Pennsylvania elevation | Street face — finished polish, still conceptual |
| A-202 | Rear | Rear / accessory garages if any |
| A-203 | North | Long side · rear left · Penn right |
| A-204 | South | Private-yard side |
| A-301 | Section A-A | Heights / party wall |
| A-302 | Section B-B | Garage doors / apron |
| A-401 | Architectural massing | Same camera as Design 1 |
| A-402 | Axon (clean) | Same volumes; **every door outlined red, every window outlined blue** |
| — | Checks | Travel, setbacks, living band, independent doors — with paths |

Camera for A-401 / A-402: `Lot2PipelineContract.AXON` (same as Design 1 massing truth). Pennsylvania **near / bottom**, rear **deep / top**. Photoreal that must move a wall **fails visualization**.

**Axon openings (required):** `Lot2PipelineContract.auditAxonOpenings` on A-401 and A-402. Door stroke `#c34232`, window stroke `#2a6496`, `data-opening="door"` / `"window"`, legend Door / Window, both dwelling entries. Missing this is **pipeline FAIL**, not a later request.

Gaps learned from Design 1, Design 2, and J — and which stage should have filled them: [`lot2-pipeline-gaps.md`](lot2-pipeline-gaps.md). Design 3+ also owes openings schedule, Read/own, swept overlay, and pedestrian walks. Do not mutate frozen R5.1e to backfill.

## Required HTML pages

These are the valuable Design 1 surfaces. Package emits them as HTML, not only as SVGs on the hub. Do not clone every R5.1e URL.

| Page | Design 1 analog | Role |
| ---- | ---------------- | ---- |
| Hub (`design-N.html`) | `r51e-deliverable.html` | Full package — authored |
| `{slug}-site.html` | `r51e-site-plan.html` | Planner lot drawing |
| `{slug}-plans.html` | `r51e-plans.html` | Bubble + approximate floors |
| `{slug}-elevs.html` | penn + rear + sides + sections | Street face first, then the set |
| `{slug}-axon.html` | `r51e-axon-lock.html` + architectural massing | Same-camera 3D |

Not emitted as their own HTML: `r51e.html` demo (hub covers it), `r51e-massing-truth.html` (audit), `r51e-plan-closure.html` (plans page), separate rear / side files (on Elevs).

Design 2 files: `design-2.html`, `d2-site.html`, `d2-plans.html`, `d2-elevs.html`, `d2-axon.html`. Focus pages are generated by `npm run d2` — do not hand-edit them.

## Gate

A design engine at Package must:

1. Prove travel + setbacks (`analyze`).
2. Fingerprint plates / drive (presentation may move; geometry may not without a recorded correction).
3. `renderNamed` every file sheet and write `imgs/`.
4. Pass `Lot2PipelineContract.auditSheets(SHEETS)` — missing axon is **pipeline FAIL**.
5. Pass `auditAxonOpenings` on A-401 and A-402 — missing red doors / blue windows is **pipeline FAIL**.
6. Write focus pages (`auditPages`) — missing site / plans / elevs / axon HTML is **pipeline FAIL**.
7. Ship a client HTML hub that mounts every sheet and links the focus pages.
8. **Polish** the hub for a reader who will never see the workbench.
9. **Export** (`npm run export`) a standalone client folder and a sibling presenter kit.
10. **Present** from the presenter kit; the client folder is what is on the shared screen.

Design 2: `npm run d2`. A future Design 3: `npm run d3` with the same contract. Delivery: `npm run export`.

## Honest labels

- Package at CONDITIONAL = **concept package**, not Design Complete.
- Zoning hypotheses stay hypotheses.
- Do not mix plate sets across designs.
- Design 1 remains frozen even when Design 2+ polish.

## Quality gates (learned from D1, D2, and J)

`Lot2PipelineContract.QUALITY` and [`lot2-pipeline-gaps.md`](lot2-pipeline-gaps.md). **Now** on every new package: axon openings (`auditAxonOpenings`). **Required on Design 3+** (D2 grandfathered where it still disagrees):

| Check | Stage | Why it exists |
| ----- | ----- | ------------- |
| Openings schedule | Arrange | D2 plan puts ENTRY A NW; axon puts it on Pennsylvania. One list must drive plan, elev, axon. |
| Read / own | Read | J1 learned “we would not build this” at Image 4.2. Ask before polish. |
| Swept overlay drawn | Travel | D2 has a clearance number, not the SUV body on the site. |
| Pedestrian walks | Package | D1 has Walk A/B; D2 site is buildings + drive only. |
| Plan / elev / axon agree | Package | Same door wall on all three. |

Do not mutate frozen R5.1e to backfill. Do not resume J1.

## Instances

- Design 1 freeze chain: [`lot2-r51e-v11.md`](lot2-r51e-v11.md)
- Design 2 instance notes: [`lot2-design-2-pipeline.md`](lot2-design-2-pipeline.md)
- Gaps (D1 / D2 / J → pipeline): [`lot2-pipeline-gaps.md`](lot2-pipeline-gaps.md)
- Delivery (polish / export / present): [`lot2-delivery.md`](lot2-delivery.md)
