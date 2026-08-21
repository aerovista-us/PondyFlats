# Lot 2 — J1-B Image 4 / 4.1 / 4.2

## Final disposition (J1 closed)

> **IMAGE 4.2 OFFICIAL — LAYER MATCH / VALID**  
> **OWNERSHIP GATE — NO**  
> **J1-B — STOP**  
> **J1-A / J1-C — CLOSED**  
> **FLOOR-PLAN SANITY — CANCELLED, not advanced**  
> **Images 1–4.2 retained as the complete audit trail**

J1 did not fail because the renderer drifted. It failed only after we finally rendered the exact geometry honestly. The Pennsylvania view remains garage-dominated with a very large upper wall; the site composition reads primarily as *access lane → near garage → deep garage → living stacked above*, not *desirable home A + desirable home B*. Building B is visually subordinate; pedestrian identity is weak; the architecture’s defining feature remains accommodation of four enclosed parking spaces.

**Next when resuming:** parking-only [Parking Skeleton A-F](../access-geometry.html) exercise.

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

| Artifact | Path |
| -------- | ---- |
| Page | [`j1b-image4-1-axon.html`](../j1b-image4-1-axon.html) |
| Audit annotated | [`imgs/j1b-image4-1-finished-base.svg`](../imgs/j1b-image4-1-finished-base.svg) ≡ [`lock-scaffold.svg`](../imgs/j1b-image4-1-lock-scaffold.svg) |
| Clean (no labels) | [`imgs/j1b-image4-1-clean-base.svg`](../imgs/j1b-image4-1-clean-base.svg) |
| Engine | `js/lot2-j1b-image41-scaffold.js` |

**Door policy:** `east-plane-svg-locked`

## IMAGE 4.2 — LAYER MATCH / VALID · ownership NO

### Layer match (PASSED)

- Eye-level material polygons match the deterministic base
- Access A and B remain the locked side lanes
- A near / B deep retained
- Both door overlays use exact locked east-plane coordinates
- Pennsylvania elevation: two equal doors, each **128 SVG units = 16′**
- Apparent overlap is honest depth projection — not a merged or resized façade
- No direct street-to-garage shortcut or generator-created silhouette

Official regeneration supersedes archived photoreal washes as Image 4.2 geometry proof. Those washes remain **DRIFT** (style only).

### Ownership (NO)

Would not choose to build this if the site were not forcing the architecture. Additional windows and trim could improve appearance but would not change the fundamental garage-first hierarchy.

| View | Geometry SVG | Surfaces (no doors) | Composite (doors on top) |
| ---- | ------------ | ------------------- | ------------------------ |
| Pennsylvania elevation | [`penn-elevation.svg`](../imgs/j1b-image4-2-penn-elevation.svg) | [`penn-elevation-nodoors.svg`](../imgs/j1b-image4-2-penn-elevation-nodoors.svg) | [`penn-elevation-materials.svg`](../imgs/j1b-image4-2-penn-elevation-materials.svg) · [`penn-elevation.png`](../imgs/j1b-image4-2-penn-elevation.png) |
| Site view (Penn) | [`eye-level.svg`](../imgs/j1b-image4-2-eye-level.svg) | [`eye-level-nodoors.svg`](../imgs/j1b-image4-2-eye-level-nodoors.svg) | [`eye-level-materials.svg`](../imgs/j1b-image4-2-eye-level-materials.svg) · [`eye-level.png`](../imgs/j1b-image4-2-eye-level.png) |
| Page | [`j1b-image4-2-views.html`](../j1b-image4-2-views.html) | | |
| Engine | `js/lot2-j1b-image42-views.js` | | |

See [`lot2-visual-chain.md`](lot2-visual-chain.md).
