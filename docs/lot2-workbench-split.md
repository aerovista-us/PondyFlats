# Workbench project — intended direction (files kept)

**Date:** 2026-08-28  
**Status:** Direction recorded. Pondy Flats packages and fallback pages are **kept**. LotScope / lot-assessment is **not** changed until a follow-up.  
**Intended architecture:** [aerovista-us/lot-assessment](https://github.com/aerovista-us/lot-assessment) README — **two surfaces, one engine**, same `main`.

- **LotScope** is the product: public `/` at https://lotscope.aerovista.us and internal `/workbench`, sharing one engine.
- **This repo** is Lot 2 source, regression fixture, and **drawing-package fallbacks** for delivery (Design 1, Design 2, `packages/*-client`, presenter kits).
- Do not delete those fallbacks. Do not invent a second Lot 2 in `js/lot2-sot.js`.
- Custom polygon + grouped brief on `lot.html` stay here as a **fallback ingest**. They are not a LotScope redeploy.

This Pondy Flats repo is the **source / regression / drawing package** for Lot 2. LotScope is the **product**. The 2026-08-28 delivery pass added product-shaped UI in this repo; those pages remain as fallbacks, now labeled as such.

## Intended map

| Surface | Repo | URL / path | Audience |
| ------- | ---- | ---------- | -------- |
| Public LotScope | `lot-assessment` | https://lotscope.aerovista.us (`/`) | Public feasibility |
| LotScope Workbench | `lot-assessment` | `/workbench` + `/api/workbench/*` | Internal solver / agent |
| Shared engine | `lot-assessment` `packages/*` + copy of Pondy JS | same `main` | Both surfaces |
| Pondy Flats packages | this repo | `index.html`, Design 1 / Design 2 hubs, `packages/*-client` | Lot 2 drawings only |

Rule from lot-assessment: **do not keep these as long-lived Git branches.** Agents should change `lot-assessment`. PondyFlats is copy-only for extraction (`packages/pondy-engine-reference/`). Never move/rename/delete Pondy originals as part of a LotScope import.

## What is currently live

- Public LotScope is the **rectangular manual-facts calculator**. Irregular polygons are still the “Pondy learning layer,” not shipped.
- LotScope Workbench is **reachable on the public host** (`https://lotscope.aerovista.us/workbench`) with a “Run Pondy solver” button that calls `/api/workbench/pondy`. Treat that as a product/security review item if it was meant to stay internal.
- Example numbers on `/` are a **50×148 rectangle** (7,400 SF). Real Lot 2 survey area here is **7,023.43 SF** (plat 7,028). Rear setback on the public example is **20′**; Workbench ProjectSpec still uses **25′** principal rear.

## Correction list

### A. Wrong app in this repo (from the 2026-08-28 delivery pass)

| Item | What’s wrong | Correction |
| ---- | ------------ | ---------- |
| [`../lot.html`](../lot.html) + [`../js/lot2-public-lot.js`](../js/lot2-public-lot.js) | Was branded as public LotScope | **Kept** as fallback ingest. Custom polygon + grouped brief still belong on LotScope `/` later. |
| [`../index.html`](../index.html) | Sold “Your lot” as the other-parcel product | **Kept.** Nav/CTA now point at LotScope first; `lot.html` is fallback. |
| [`../workbench.html`](../workbench.html) | Claimed to be the workbench | **Kept** as Lot 2 package studio. Links LotScope `/workbench`. |
| [`.cursor/skills/lot2-workbench/SKILL.md`](../.cursor/skills/lot2-workbench/SKILL.md) | New parcel → `lot.html` | Updated: new parcel → LotScope; `lot.html` fallback. |
| [`lot2-delivery.md`](lot2-delivery.md), [`lot2-file-map.md`](lot2-file-map.md), [`../README.md`](../README.md), [`../packages/README.md`](../packages/README.md), [`../scripts/export-packages.js`](../scripts/export-packages.js) | Called `lot.html` the public Lot step | Relabeled fallback. Do not zip into client folders. |

### B. Two pipelines (the real engine drift)

LotScope skill / `lib/workbench.ts`:

`Compile → Generate → Solve → Circulation → Program → Rank → Develop → Freeze → Deliver`

This repo’s pipeline (`lot2-design-pipeline.md`, `AGENTS.md`, `lot2-pipeline-contract.js`, `workbench.html`):

`Lot → Brief → Possible → Fit → Arrange → Read → Travel → Setbacks → Package → Polish → Export → Present → Freeze`

Those are not the same engine with two skins. They are two product stories. Package/Polish/Export/Present for **frozen Lot 2 drawings** can stay here. Topology search / swept-path solve belongs in lot-assessment. Do not teach agents that a new property starts by cloning Design 2 HTML in PondyFlats.

### C. Engine copy is stale

`packages/pondy-engine-reference/` in lot-assessment is a **checksummed copy** from PondyFlats commit `2437ba6` (2026-08-22). Import workflow does **not** run on every Pondy push (only `workflow_dispatch` or edits to the workflow file).

SHA256 vs this tree (2026-08-28):

| File | Import vs live PondyFlats |
| ---- | ------------------------- |
| `lot2-daily-use.js` | **match** |
| `lot2-parking-reset.js` | **match** |
| `lot2-sot.js` | **drift** (comments / size 1643 → 1875) |
| `lot2-geometry.js` | **drift** |
| `lot2-access.js` | **drift** |
| `lot2-access-skeleton.js` | **drift** |

Not in the import list at all (so LotScope cannot “share” them): `lot2-r51e-lock.js`, `lot2-design-2.js`, `lot2-pipeline-contract.js`, `lot2-r51e-*.js`, Design 2 SVGs.

Re-run import **after** deciding whether PondyFlats comment-only SOT edits should even bump the fixture. Do not silently treat the TypeScript `packages/geometry|circulation|placement|optimizer` as byte-equal to `js/lot2-access.js`.

### D. Workbench ProjectSpec vs live Lot 2 programs

`projects/pondy-lot2/project.json` / `pondyLot2Spec`:

- Setbacks **20 / 25 / 5 / 10**, mobility LOCKED.
- Program **2 enclosed spaces per unit**.
- Revision `workbench-seed-1`.
- Seed cards still labeled **UNSOLVED** until the solver replaces them.

This repo now also has:

- Design 1: 2 enclosed + 2 covered (not 2+2 enclosed).
- Design 2: four enclosed detached 20×20, **5′ accessory rear** hypothesis.
- `AGENTS.md` reset: 10 ft side-yard driveway spine; 22×22 garage no longer a universal lock during rediscovery.

None of that is reflected in LotScope ProjectSpec. Design 2 was copied **out** of a lot-assessment run (`PONDY-RGS-230`) into Pondy presentation, which is the reverse of freeze-then-deliver.

### E. Host / “no Vercel” leftovers (this repo)

These still say GitHub-only / no running host. True for **Pondy Flats packages**. False for **LotScope**.

| Artifact | Line to correct |
| -------- | --------------- |
| [`../README.md`](../README.md) | Older “no separate running host” | Now: this repo is package fallbacks; LotScope is the live product |
| [`lot2-status-conflicts.md`](lot2-status-conflicts.md) §G | “No Vercel / Netlify / CNAME was found.” |
| [`lot2-r51e-v1-baseline.md`](lot2-r51e-v1-baseline.md) | “no separate running landing” |
| [`../study-archive.html`](../study-archive.html) | “no separate running landing” |
| §G review Q3 | GitHub Pages vs clone-only — LotScope is already on Vercel. |

Canonical public product host: `https://lotscope.aerovista.us` (fallback noted in lot-assessment `docs/BUILD_STATUS.md`: `https://lotscope.vercel.app`).

### F. LotScope-side notes (do not fix in this repo)

From lot-assessment docs + live `/` + `/workbench`:

1. `docs/BUILD_STATUS.md` is dated **2026-08-22** (“slice 2 next = jurisdiction”). Solver APIs, ranked benchmark workflow, and `packages/*` already exist. Status doc is behind the code.
2. Public `/` and Workbench **do not share one calculator**: public is rectangle + `lib/assessment.ts`; workbench is polygon ProjectSpec + solver packages. “Same engine” is the goal, not the current public page.
3. Skill CLI (`lotscope compile|generate|solve|…`) is still the **target interface**, not operational.
4. Public example rear **20′** vs Workbench **25′** vs Design 2 accessory **5′**.
5. `/workbench` and `/api/workbench/pondy*` are on the public hostname with no gate visible in the page source.
6. Rapid solver plan says success is **3 diverse solver-backed Pondy options**, not another architectural package. This repo already shipped Design 1 + Design 2 drawing sets in parallel.

### G. Keep (not mistakes)

- Frozen R5.1e / Design 1 plates in this repo.
- Design 2 as a **Lot 2 drawing package** (CONDITIONAL), as long as it is not sold as LotScope.
- Copy-only import rule for `pondy-engine-reference`.
- Client zips without workbench (`npm run export`).
- Pennsylvania-only access, FS-SUV, survey polygon lock.

## Suggested unwind order (when asked)

Do **not** delete fallbacks. LotScope / lot-assessment stays frozen until a follow-up.

Already done in this repo: relabel `lot.html` / `workbench.html` / home CTA; keep Design 1 · Design 2 · `packages/*` as the delivery fallbacks.

Later, on lot-assessment only if asked:

1. Port custom polygon + grouped brief onto LotScope `/` if that still matches PUBLIC_V2.
2. Re-import Pondy engine reference from a chosen SHA, or stop claiming the TS packages *are* the Pondy JS engine.
3. Align ProjectSpec with the programs you actually want the solver to search.
4. Gate `/workbench` if it is internal.

Related: [`lot2-status-conflicts.md`](lot2-status-conflicts.md) · [`lot2-design-2-accessory-rear.md`](lot2-design-2-accessory-rear.md) · lot-assessment `README.md`, `docs/PONDY_CAPABILITY_ROADMAP.md`, `docs/PONDY_RAPID_SOLVER_PLAN.md`, `skills/lot-design/SKILL.md`.
