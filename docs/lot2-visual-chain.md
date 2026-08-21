# Lot 2 — Visual chain (anti-drift)

## Problem

Pass 2C.1 jumped from frozen coordinates to photoreal duplex imagery. Result: **visualization drift** — useful style language, invalid as J1-B proof. Images archived in [`reference/failed-visualization-drift/`](../reference/failed-visualization-drift/).

The anti-drift chain fixed that. Ownership then failed on the honest geometry.

## Final disposition

> **IMAGE 4.2 OFFICIAL — LAYER MATCH / VALID**  
> **OWNERSHIP GATE — NO**  
> **J1-B — STOP** · **J1-A / J1-C — CLOSED**  
> **FLOOR-PLAN SANITY — CANCELLED**  
> Images 1–4.2 retained as the complete audit trail

**Next:** parking-only [`access-geometry.html`](../access-geometry.html) (**Parking Skeleton A-F**). No architecture until a skeleton independently clears the pre-architecture gate. J1 has no rescue passes.

## Required chain

| # | Image | Constraint | Status |
| - | ----- | ---------- | ------ |
| **1** | **Geometry truth** | Exact lot + footprints + Access A from repo. No architecture. | **APPROVED** — [`j1b-geometry-truth.html`](../j1b-geometry-truth.html) |
| **2** | **Massing truth** | Deterministic axon from exact Image-1 polygons. No roofs. | **APPROVED** — [`j1b-massing-truth.html`](../j1b-massing-truth.html) |
| **3** | **Architectural massing** | Same camera + exact masses as #2; roofs/materials; nothing moves; underlay toggle. | **APPROVED** — [`j1b-architectural-massing.html`](../j1b-architectural-massing.html) |
| **4** | Finished elev + perspective | Photoreal after 4.1 axon lock | Image 4 **DRIFT** (archived style-only) |
| **4.1** | **Finished lock scaffold** | Deterministic Image 3 base; east doors SVG-locked | **PASS / APPROVED** — [`j1b-image4-1-axon.html`](../j1b-image4-1-axon.html) |
| **4.2** | Penn elev + eye-level | Derived from 4.1 only; SVG→materials then ownership | **LAYER MATCH / VALID** · **OWNERSHIP NO** — [`j1b-image4-2-views.html`](../j1b-image4-2-views.html) |

```
survey → plan → volumes → architecture → pretty render
```

Not:

```
coordinates → AI imagines a nice duplex
```

## Image 1–3

All **APPROVED** (frozen geometry / extrusion / architectural massing). See prior sections in git history and linked pages.

## Image 4 — DRIFT

Rejected as geometry proof (stagger collapsed into contiguous street façade). Style archived. See [`lot2-j1b-image4.md`](lot2-j1b-image4.md).

## Image 4.1 — PASS / APPROVED

Deterministic lock scaffold is the immutable finished base. Clean unlabeled duplicate: [`imgs/j1b-image4-1-clean-base.svg`](../imgs/j1b-image4-1-clean-base.svg).

## Image 4.2 — LAYER MATCH / VALID · ownership NO

Official regen passed SVG→materials audit (equal 16′ / 128-unit doors, depth overlap, both homes, Access A side lanes). Photoreal washes remain DRIFT archive only.

Ownership **NO**: garage-first hierarchy; B subordinate; not a building we would choose if the site were not forcing it. J1 closed. Floor-plan sanity cancelled.

Detail: [`lot2-j1b-image4.md`](lot2-j1b-image4.md).

## Related

- [`lot2-j1b-image4.md`](lot2-j1b-image4.md)
- [`lot2-j1b-architectural-massing.md`](lot2-j1b-architectural-massing.md)
- [`lot2-j1b-massing-truth.md`](lot2-j1b-massing-truth.md)
- [`lot2-j1b-pass2c1.md`](lot2-j1b-pass2c1.md) — marked INVALID
- [`lot2-j1-massing.md`](lot2-j1-massing.md)
- [`lot2-access-geometry.md`](lot2-access-geometry.md) — next resume point
