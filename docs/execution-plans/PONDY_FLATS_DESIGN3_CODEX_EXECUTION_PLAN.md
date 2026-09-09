# Pondy Flats Lot 2 --- Design 3 / CFB-716 Execution Plan

**Purpose:** Single execution plan for Codex on `nxcore` or any future
engineering agent with repository, browser, and terminal access.

**Repository:** `aerovista-us/PondyFlats`

**Execution rule:** **Pull the current online repository first, then
execute this plan from the current `main`. Never assume the local source
folder is current. The online repository is authoritative and may be
ahead of the source folder or the commit references recorded in this
document.**

------------------------------------------------------------------------

## 0. Authority and operating rules

### Source-of-truth order

Use this authority order whenever anything conflicts:

1. Current GitHub `main`
2. Current live GitHub Pages render
3. Frozen CFB-716 canonical geometry and freeze identity
4. This execution plan
5. Older local source folders, screenshots, handoffs, archived pages,
   or historical studies

This plan describes the work to perform. It does **not** freeze the
repository at the SHA that existed when the plan was written.

### Before every execution session

Always synchronize from the online repository before inspecting or
changing code:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
git status
git log -5 --oneline
```

If the local checkout contains uncommitted work, **do not discard,
reset, overwrite, or stash it blindly**. Report the dirty state and
preserve the work. Use a clean worktree or fresh clone if necessary.

Record the actual `main` SHA used for the session:

```bash
git rev-parse HEAD
```

Any SHA mentioned elsewhere in this plan is historical context only
unless it still equals current `main`.

### Project boundary

Project:

- Pondy Flats Lot 2
- Design 3
- Candidate `PONDY-CFB-716`

Canonical freeze:

```text
3de5309fb5c87046acbba3ac37bc1c1eca2718344f3f704e50d28daa414f8625
```

Do **not** modify Design 1 or Design 2.

Do **not** move frozen CFB-716 exterior/site geometry during
presentation development.

Frozen geometry includes:

- survey/property polygon
- Unit A exterior placement
- Unit B exterior placement
- Garage A placement
- Garage B placement
- Pennsylvania-only access origin
- tested drive paths / canonical site relationship

Architectural development may change:

- roof articulation
- windows and doors
- entries and porches
- trim
- material expression
- landscape/context graphics
- labels and sheet hierarchy
- presentation composition
- interior planning inside the frozen shell
- section/perspective presentation

Do not claim permit readiness, code approval, structural validation, or
construction-document status.

------------------------------------------------------------------------

# Execution Sequence

## Step 1 --- Establish current repository state

Pull current `main` from GitHub.

Then inspect:

```bash
git status
git rev-parse HEAD
git log -10 --oneline
git branch -vv
```

Confirm the current repository still contains the active Design 3
package:

```text
design-3.html
d3-site.html
d3-plan-closure.html
d3-elevs.html
d3-axon.html
js/lot2-design-3.js
js/lot2-design-3-plan-closure.js
```

Do not assume older file inventories are complete. If the online
repository contains newer Design 3 files, incorporate them into the
review.

Review `AGENTS.md` and obey current repository instructions before
making changes.

------------------------------------------------------------------------

## Step 2 --- Verify deployment and live package

Check the latest GitHub Pages deployment for current `main`.

Do not assume a successful source commit means the public render is
correct.

Open the live Design 3 package in a real browser:

```text
https://aerovista-us.github.io/PondyFlats/design-3.html
https://aerovista-us.github.io/PondyFlats/d3-site.html
https://aerovista-us.github.io/PondyFlats/d3-plan-closure.html
https://aerovista-us.github.io/PondyFlats/d3-elevs.html
https://aerovista-us.github.io/PondyFlats/d3-axon.html
```

If current `main` has not finished deploying, wait for or verify the
deployment before judging the live render.

------------------------------------------------------------------------

## Step 3 --- Rendered elevation QA

The elevation renderer previously experienced a runtime failure:

```text
Cannot access 'garage' before initialization
```

The source was subsequently changed to separate garage-fill and
garage-SVG variables. Do not assume this remains the current
implementation; inspect current `main`.

Verify the **actual deployed page**, not only the source.

Confirm all four elevation drawings render:

1. Pennsylvania
2. Rear
3. North
4. South

For each elevation:

- drawing exists
- SVG is visible
- no fallback error is displayed
- no clipped architecture
- no missing garage
- no missing entry
- labels are readable
- architecture is scaled appropriately within the sheet
- drawing behaves responsively

Inspect the browser console for:

- JavaScript exceptions
- 404s
- SVG failures
- missing assets
- CSS/layout errors

Capture screenshots of:

- complete elevation page
- Pennsylvania elevation
- Rear elevation
- North elevation
- South elevation

Test approximately:

```text
1440 px desktop
1024 px tablet
390 px mobile
```

Do not continue into major architectural presentation changes until the
renderer baseline is proven stable.

------------------------------------------------------------------------

## Step 4 --- Verify active navigation

The active Design 3 plan-development page is:

```text
d3-plan-closure.html
```

The older:

```text
d3-plans.html
```

is historical/superseded development evidence unless current `main`
explicitly establishes otherwise.

Verify the Design 3 package routes customer-facing `Plans` navigation to
the current active plan page.

At minimum inspect:

```text
design-3.html
d3-site.html
d3-elevs.html
d3-axon.html
```

Do not delete historical `d3-plans.html` merely because it is no longer
the active customer page.

------------------------------------------------------------------------

## Step 5 --- Elevation architectural pass

Once rendered QA passes, evaluate the four elevations together as one
architectural system.

Target language:

**Restrained North Idaho contemporary**

Preferred expression:

- warm natural siding
- grounded stone/masonry accents
- dark roof planes
- wood-toned entries
- controlled street-facing glazing
- larger private-side glazing
- simple believable residential massing
- restrained material transitions
- coherent roof hierarchy

Evaluate:

- roof hierarchy
- garage readability
- entry/porch clarity
- window placement
- material transitions
- scale
- landscape/context
- label hierarchy
- consistency across all four sides

The four elevations must look like four views of the **same buildings**.

Do not move frozen CFB-716 volumes to make a façade easier to draw.

Do not overdecorate the architecture.

Do not imply permit-level detail.

After changes, render again and repeat visual QA before proceeding.

------------------------------------------------------------------------

## Step 6 --- Rebuild the axon/presentation composition

Treat the axon as a composition problem, not merely an annotation
problem.

Do not fix it by only adding more labels.

Target improvements:

- architecture occupies more of the frame
- better isometric/perspective angle
- clear Unit A / Unit B separation
- garages unmistakably read as garages
- entries/porches clearly visible
- Pennsylvania access is immediately understandable
- drive paths remain legible but subordinate
- stronger roof articulation
- better building depth
- landscape provides scale/context
- less dead/empty page area
- reduced technical-footer dominance
- cleaner customer-facing annotation

If the current axon projection fundamentally cannot communicate the
project well, create a second customer-facing perspective/presentation
view while retaining the technical axon as needed.

Do not move frozen buildings to improve composition.

Capture screenshots after each meaningful presentation pass and judge
the rendered result.

------------------------------------------------------------------------

## Step 7 --- Cross-sheet consistency gate

Compare:

```text
d3-site.html
d3-plan-closure.html
d3-elevs.html
d3-axon.html
```

Verify agreement on:

- Unit A placement
- Unit B placement
- Garage A
- Garage B
- Pennsylvania orientation
- building/garage relationships
- entries
- roof logic where represented
- overall mass relationships

Geometry authority should remain centralized. Do not duplicate or
manually drift frozen coordinates between renderers.

If any visual sheet contradicts the frozen site geometry, correct the
**presentation**, not the canonical geometry, unless a separate explicit
decision reopens Workbench selection.

------------------------------------------------------------------------

## Step 8 --- Renderer refactor

Only refactor after the visual baseline is stable.

The current/legacy Design 3 renderer may combine geometry, site
rendering, elevations, axon, and analysis in one module. Separate
responsibilities to reduce regression risk.

Preferred architecture:

```text
js/lot2-design-3-geometry.js
js/lot2-design-3-site.js
js/lot2-design-3-elevations.js
js/lot2-design-3-axon.js
js/lot2-design-3-plan-closure.js
```

`lot2-design-3-geometry.js` should be the immutable/shared authority
for:

- survey polygon
- candidate identity
- canonical freeze hash
- unit placements
- garage placements
- drive paths
- scores/capacity values required by presentation modules

Presentation modules should consume that authority instead of
reproducing coordinates.

Preserve defensive rendering/error handling.

After refactor:

- run available tests
- load every Design 3 page
- inspect browser console
- repeat desktop/tablet/mobile visual QA
- confirm freeze identity remains unchanged

------------------------------------------------------------------------

## Step 9 --- Add sections

After elevations and axon are coherent, create at least:

### Longitudinal/site section

Communicate:

- site relationship
- building relationship
- basic grade/site understanding
- relative massing

### Representative building section

Communicate:

- floor-to-floor relationship
- garage/home relationship
- stair relationship where useful
- roof relationship
- basic vertical organization

These are design-development sections.

Do not present them as structural, permit, or construction sections.

------------------------------------------------------------------------

## Step 10 --- Customer-package closure

Assemble Design 3 into a coherent customer presentation.

Target package:

1. Cover / concept statement
2. Site plan
3. Ground-floor plan
4. Upper-floor plan
5. Pennsylvania elevation
6. Rear elevation
7. North elevation
8. South elevation
9. Axon / perspective
10. Sections
11. Area/program summary
12. Workbench selection rationale
13. Professional-validation caveat

The customer should be able to understand:

- where each home sits
- which home is Unit A and Unit B
- where each garage is
- how vehicles enter from Pennsylvania
- where the entries are
- how the homes relate architecturally
- how the floor plans relate to the exterior
- why CFB-716 was selected

without needing an engineer to narrate the website.

------------------------------------------------------------------------

## Step 11 --- Responsive QA

Review all customer-facing Design 3 pages at approximately:

```text
1440 px
1024 px
768 px
390 px
```

Check:

- navigation wrapping
- clipped SVGs
- horizontal overflow
- unreadably small labels
- excessive blank space
- drawing scale
- table overflow
- header/footer obstruction
- touch-target usability
- customer-facing reading order

Fix responsive presentation issues without changing frozen geometry.

------------------------------------------------------------------------

## Step 12 --- Final comparison and release gate

Only after Design 3 is internally coherent, compare:

- Design 1
- Design 2
- Design 3

Do not modify Designs 1 or 2 during this comparison unless separately
authorized.

Evaluate whether Design 3 is customer-ready relative to the existing
alternatives.

### Definition of done

Design 3 is complete when:

- public pages render without runtime errors
- all four elevations render correctly
- site, plans, elevations, axon/perspective, and sections agree
- entries are obvious
- garages are obvious
- Pennsylvania access is obvious
- architectural language is coherent
- page hierarchy is customer-readable
- desktop/tablet/mobile presentation is usable
- one strong overall presentation view exists
- professional-validation boundaries are explicit
- frozen CFB-716 geometry remains unchanged
- Design 1 and Design 2 remain untouched
- current GitHub `main` is deployed successfully

------------------------------------------------------------------------

# Git Workflow

Do not work directly on `main` for substantive presentation changes.

After pulling current online `main`:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b d3-customer-package-pass
```

If that branch already exists, use an appropriately named new branch
rather than overwriting prior work.

Commit logically grouped changes.

Before opening a PR, provide:

```bash
git status
git diff --stat main...
git log --oneline main..HEAD
```

Run all available repository tests/checks.

Push the branch and open a PR.

Do not merge automatically if:

- visual QA is incomplete
- browser console errors remain
- cross-sheet inconsistencies remain
- frozen geometry may have changed
- responsive QA has not been completed

------------------------------------------------------------------------

# Required execution report

At the end of the run, return:

1. Exact GitHub `main` SHA originally pulled
2. Branch used
3. Current head SHA
4. Latest deployment status
5. Whether all four elevations rendered
6. Browser-console findings
7. Screenshot paths
8. Desktop/tablet/mobile findings
9. Axon/perspective assessment
10. Cross-sheet consistency result
11. Files changed
12. Tests/checks executed and results
13. Whether frozen geometry changed --- expected: **NO**
14. Whether Design 1 or Design 2 changed --- expected: **NO**
15. PR number/link, if created
16. Remaining blockers
17. Recommended next action

------------------------------------------------------------------------

# Short instruction for Codex

When assigning this work to Codex, the operator instruction should be:

> **Pull the current online `aerovista-us/PondyFlats` `main`, read this
> plan, and execute the steps in order. Treat GitHub `main` and the live
> deployed render as newer authority than any local source folder or
> historical SHA in the plan. Preserve all existing uncommitted local
> work, keep CFB-716 frozen geometry unchanged, do not modify Designs 1
> or 2, perform real browser/rendered QA before presentation changes,
> and return the required execution report.**

------------------------------------------------------------------------

## Historical context at plan creation

At the time this execution plan was created, PR #8 had just corrected
Design 3 customer navigation so Site, Elevations, and Axon route `Plans`
to `d3-plan-closure.html`.

That state is **context only**.

Future executions must always pull current GitHub `main` first because
the online repository is expected to advance beyond both this plan and
any source folder on `nxcore`.
