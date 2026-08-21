# Docs index — Pondy Flats Lot 2

**Hub:** [`../index.html`](../index.html) · **Guide:** [`../guide.html`](../guide.html) · **Repo:** [aerovista-us/PondyFlats](https://github.com/aerovista-us/PondyFlats)

## Current decision

| Item | Status |
| ---- | ------ |
| **R6** Integrated Lift Pair | **CONDITIONAL** — first viable working geometry (topology record) |
| **R6.1** Lift Bay Hardening | **CONDITIONAL** — 16×24 bays OK · FS-SUV fillet ~19′ \< 25′ still open |
| **Architecture** | **OFF** until Parking Reset **FULL PASS** |
| **Next** | Close R6.1 25′ fillet → FULL PASS → repair R5 |
| **Closed** | J1 (ownership NO) · Skeletons A–F (Original Program Gate FAIL) |

Live matrix: [`../parking-reset.html`](../parking-reset.html) · write-up: [`lot2-parking-reset.md`](lot2-parking-reset.md)

## Active docs

| Doc | Topic |
| --- | ----- |
| [lot2-parking-reset.md](lot2-parking-reset.md) | **Current** — CONDITIONAL vs FULL PASS · R6 / R6.1 · R5–R8 · R1–R4 audit |
| [lot2-def-closure.md](lot2-def-closure.md) | D/E/F close · Original vs Parking Reset gates · E W+E reference |
| [lot2-geometry-validation.md](lot2-geometry-validation.md) | Pass 1.5 geometry rules · drawing convention |
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
4. **Do not discard** untracked reset artifacts: `parking-reset.html`, `js/lot2-parking-reset.js`, `docs/lot2-parking-reset.md`, `docs/lot2-def-closure.md`.
5. **Closed trails** (J1, A–F) stay in-repo as evidence; do not “clean up” by deleting them in a merge.

Browser start: [`../index.html`](../index.html) → Parking Reset → R6.1.
