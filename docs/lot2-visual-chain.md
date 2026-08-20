# Lot 2 — Visual chain (anti-drift)

## Problem

Pass 2C.1 jumped from frozen coordinates to photoreal duplex imagery. Result: **visualization drift** — useful style language, invalid as J1-B proof. Images archived in [`reference/failed-visualization-drift/`](../reference/failed-visualization-drift/).

This is **not** a NO on J1-B.

## Required chain

| # | Image | Constraint | Status |
| - | ----- | ---------- | ------ |
| **1** | **Geometry truth** | Exact lot + footprints + Access A from repo. No architecture. | **APPROVED** (coordinate schedule) — [`j1b-geometry-truth.html`](../j1b-geometry-truth.html) |
| **2** | **Massing truth** | Deterministic axon from exact Image-1 polygons. No roofs. | **APPROVED** (extrusion specification) — [`j1b-massing-truth.html`](../j1b-massing-truth.html) |
| **3** | **Architectural massing** | Same camera + exact masses as #2; roofs/materials; nothing moves; underlay toggle. | **APPROVED** — [`j1b-architectural-massing.html`](../j1b-architectural-massing.html) |
| **4** | Finished elev + perspective | Photoreal after 4.1 axon lock | Image 4 **DRIFT** (archived style-only) |
| **4.1** | **Finished lock scaffold** | Deterministic Image 3 base; east doors SVG-locked | **PASS / APPROVED** — [`j1b-image4-1-axon.html`](../j1b-image4-1-axon.html) |
| **4.2** | Penn elev + eye-level | Derived from 4.1 only; ownership gate | [`j1b-image4-2-views.html`](../j1b-image4-2-views.html) |

```
survey → plan → volumes → architecture → pretty render
```

Not:

```
coordinates → AI imagines a nice duplex
```

## Image 1 approval

**YES — approved** as frozen basis for Image 2, based on the coordinate schedule:

- Garage A `(102,5)` · Garage B `(25,16)` · both 22×22 · east doors
- Separate ground pods · LOG + wing upper construction
- Access A from Pennsylvania/right traveling west into the parcel
- SOT orientation preserved (Penn RIGHT, N/rear LEFT)

Caveat: approval was of the **frozen geometry specification**, not a pixel-level audit of the hosted HTML (GitHub 404 on that path at review time).

## Image 2 approval

**YES — approved** as mathematical reference for Image 3 (frozen extrusion specification). Same GitHub-fetch caveat as Image 1.

## Image 3 approval

**YES — approved** (architecture on frozen massing; underlay/footprint discipline). GitHub fetch caveat noted.

## Image 4 — DRIFT

Rejected as geometry proof (stagger collapsed into contiguous street façade). Style archived. See [`lot2-j1b-image4.md`](lot2-j1b-image4.md).

## Image 4.1 — PASS / APPROVED

Deterministic lock scaffold is the immutable finished base. Clean unlabeled duplicate for finished imagery: [`imgs/j1b-image4-1-clean-base.svg`](../imgs/j1b-image4-1-clean-base.svg).

## Image 4.2 (current)

Pennsylvania elevation + eye-level perspective derived from 4.1: [`j1b-image4-2-views.html`](../j1b-image4-2-views.html)

Ownership gate. Floor-plan sanity WAIT until YES.

## Related

- [`lot2-j1b-image4.md`](lot2-j1b-image4.md)
- [`lot2-j1b-architectural-massing.md`](lot2-j1b-architectural-massing.md)
- [`lot2-j1b-massing-truth.md`](lot2-j1b-massing-truth.md)
- [`lot2-j1b-pass2c1.md`](lot2-j1b-pass2c1.md) — marked INVALID
- [`lot2-j1-massing.md`](lot2-j1-massing.md)
