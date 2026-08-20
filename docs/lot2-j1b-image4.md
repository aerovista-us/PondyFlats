# Lot 2 — J1-B Image 4 / 4.1 / 4.2

## Image 4 — DRIFT (style archive only)

See [`reference/failed-visualization-drift/`](../reference/failed-visualization-drift/).

## IMAGE 4.1 — PASS

> **IMAGE 4.1 — PASS. Deterministic lock scaffold approved as the immutable finished base. Future materials and visualization work may repaint surfaces only; locked geometry and SVG door planes must remain unchanged.**

| Check | Result |
| ----- | ------ |
| East garage planes | PASS |
| Near faces NO DOOR | PASS |
| Access A → east doors | PASS |
| Porch 4′ E caps | PASS |
| Roofs A / B LOG / B wing | PASS |
| Export integrity (audit SVGs identical) | PASS |
| Materials wash without relocating doors | PASS |

Images 1–3 remain frozen. Crowded labels = presentation only, not geometry drift.

| Artifact | Path |
| -------- | ---- |
| Page | [`j1b-image4-1-axon.html`](../j1b-image4-1-axon.html) |
| Audit annotated | [`imgs/j1b-image4-1-finished-base.svg`](../imgs/j1b-image4-1-finished-base.svg) ≡ [`lock-scaffold.svg`](../imgs/j1b-image4-1-lock-scaffold.svg) |
| Clean (no labels) | [`imgs/j1b-image4-1-clean-base.svg`](../imgs/j1b-image4-1-clean-base.svg) |
| Engine | `js/lot2-j1b-image41-scaffold.js` (`annotations: true\|false`) |

**Door policy:** `east-plane-svg-locked`

## Image 4.2 — ownership gate (current)

Derived from approved 4.1 base only.

| View | Vector | Notes |
| ---- | ------ | ----- |
| Pennsylvania elevation | [`imgs/j1b-image4-2-penn-elevation.svg`](../imgs/j1b-image4-2-penn-elevation.svg) · materials [`penn-elevation.png`](../imgs/j1b-image4-2-penn-elevation.png) | Orthographic from +X; east doors face viewer |
| Eye-level perspective | [`imgs/j1b-image4-2-eye-level.svg`](../imgs/j1b-image4-2-eye-level.svg) · materials [`eye-level.png`](../imgs/j1b-image4-2-eye-level.png) | Penn sidewalk / SE 3/4 · Access A → east door |
| Page | [`j1b-image4-2-views.html`](../j1b-image4-2-views.html) | Ownership gate |
| Engine | `js/lot2-j1b-image42-views.js` | |

### Ownership gate

- **YES** → floor-plan sanity
- **NO** → stop J1; reconsider four enclosed parking
- **DRIFT** → regenerate 4.2 only; Image 4.1 stays APPROVED

Floor-plan sanity remains **WAIT** until clear YES.

See [`lot2-visual-chain.md`](lot2-visual-chain.md).
