# Docs index — Pondy Flats Lot 2

**Hub:** [`../index.html`](../index.html) · **Guide:** [`../guide.html`](../guide.html) · **Repo:** [aerovista-us/PondyFlats](https://github.com/aerovista-us/PondyFlats)

**File roles:** [`lot2-file-map.md`](lot2-file-map.md) — **TRUTH · CURRENT · EXPERIMENT · DERIVATIVE · ARCHIVE · TEMP**

## Current decision

| Item | Status |
| ---- | ------ |
| **R5.1e duplex** | **Show today** — parking FULL PASS + 1,556 / 1,806 SF · core repair PASS · [`../r51e.html`](../r51e.html) |
| **Exact plans** | **PASS** · [`lot2-r51e-core-repair.md`](lot2-r51e-core-repair.md) |
| **Massing truth** | **PASS / frozen** · [`../r51e-massing-truth.html`](../r51e-massing-truth.html) |
| **Architectural massing** | Next |
| **Photoreal** | Locked |
| **R5 parking** | **FULL PASS / frozen** |
| **R6.4A / R6.4B** | Dormant |

Live: [`../r51e.html`](../r51e.html) · [`lot2-r51e-massing-truth.md`](lot2-r51e-massing-truth.md) · [`lot2-r51e-plans.md`](lot2-r51e-plans.md)

## Active docs

| Doc | Topic |
| --- | ----- |
| [lot2-r51e-core-repair.md](lot2-r51e-core-repair.md) | **R5.1e Unit A core repair** · sweep-clear · exact plans PASS |
| [lot2-r51e-massing-truth.md](lot2-r51e-massing-truth.md) | **R5.1e massing truth** · extrusion freeze |
| [lot2-r51e-plans.md](lot2-r51e-plans.md) | R5.1e exact plans · approved duplex base |
| [lot2-r51-rebalance.md](lot2-r51-rebalance.md) | R5.1 plate reopen · chose R5.1e |
| [lot2-r5-schematic.md](lot2-r5-schematic.md) | R5 schematic CONDITIONAL |
| [lot2-r5-full-pass.md](lot2-r5-full-pass.md) | **R5 FULL PASS** · outbound pocket repair |
| [lot2-repair-before-close.md](lot2-repair-before-close.md) | Repair rule · R6.4A/B |
| [lot2-parking-reset.md](lot2-parking-reset.md) | Gate · hierarchy |
| [lot2-validation-closure.md](lot2-validation-closure.md) | Validator harden |
| [lot2-file-map.md](lot2-file-map.md) | File roles |
| [lot2-def-closure.md](lot2-def-closure.md) | D/E/F close · Original vs Parking Reset gates · E W+E reference |
| [lot2-geometry-validation.md](lot2-geometry-validation.md) | Pass 1.5 geometry rules · drawing convention (still binding) |
| [lot2-access-geometry.md](lot2-access-geometry.md) | Parking Skeleton A–F (closed) |
| [lot2-access.md](lot2-access.md) | FS-SUV access audit trail |

## Closed / historical

| Doc | Topic |
| --- | ----- |
| [lot2-visual-chain.md](lot2-visual-chain.md) | Anti-drift image chain |
| [lot2-j1b-image4.md](lot2-j1b-image4.md) | Image 4 / 4.1 PASS / 4.2 LAYER MATCH · ownership NO |
| [lot2-j1b-architectural-massing.md](lot2-j1b-architectural-massing.md) | Image 3 |
| [lot2-j1b-massing-truth.md](lot2-j1b-massing-truth.md) | Image 2 |
| [lot2-j1-massing.md](lot2-j1-massing.md) | J1 family disposition |
| [lot2-j1-pass2b.md](lot2-j1-pass2b.md) | Pass 2B elevations |
| [lot2-j1b-pass2c.md](lot2-j1b-pass2c.md) | Pass 2C |
| [lot2-j1b-pass2c1.md](lot2-j1b-pass2c1.md) | Pass 2C.1 INVALID |
| [lot2-g1a.md](lot2-g1a.md) | G1-A circulation proof |
| [lot2-survey-orientation.md](lot2-survey-orientation.md) | Survey orientation |
| [shortlist-elimination-memo.md](shortlist-elimination-memo.md) | Historical Final Three memo |
| [visual-stack.md](visual-stack.md) | Visual stack notes |

## Sync / merge notes (GitHub)

Remote: `https://github.com/aerovista-us/PondyFlats` (`origin/main`).

When the tree is dirty or remote has moved:

1. **Fetch first** — `git fetch origin` before commit or push.
2. **Prefer merge over rebase** on shared `main` if remote advanced — keeps local Parking Reset / CONDITIONAL docs intact.
3. **Authoritative for “where we are”** — hub [`../index.html`](../index.html) + [`lot2-parking-reset.md`](lot2-parking-reset.md). On conflict, keep CONDITIONAL (not premature PASS) and R6.1 bay-depth hardening.
4. **Do not discard** untracked reset artifacts: `parking-reset.html`, `js/lot2-parking-reset.js`, `docs/lot2-parking-reset.md`, `docs/lot2-def-closure.md`, `docs/lot2-file-map.md`.
5. **Closed trails** (J1, A–F) stay in-repo as evidence; do not “clean up” by deleting them in a merge. See [`lot2-file-map.md`](lot2-file-map.md).

Browser start: [`../index.html`](../index.html) → Parking Reset → R6.1.
