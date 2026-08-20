# Lot 2 — Locked Drawing Convention

These rules are **locked**. Do not rotate the parcel to make north point upward.

## Drawing lock

| Rule | Value |
|------|--------|
| Pennsylvania Avenue | **RIGHT** side of the drawing, 50.00′ frontage drawn **vertically** |
| Pennsylvania | **SOUTH / FRONT** |
| North / Rear | **LEFT** — compass points **left**, directly away from Pennsylvania |
| 148.00′ | **Horizontal** — rear/left → Pennsylvania/right |
| Irregular 85.98′ + 40.33′ + 23.90′ | **BOTTOM** |
| 57.01′ | **LEFT / rear** |
| Roads / drives / Penn graphics | **Never** along the bottom edge |
| Vehicular access | Originates at the **right-hand Pennsylvania frontage** and travels **left** into Lot 2 |

```
NORTH / REAR (LEFT)                         SOUTH / FRONT (RIGHT)
     ↑ compass                                    PENNSYLVANIA
  57.01′                                      50.00′ vertical

  ←—————— 148.00′ horizontal ——————→

BOTTOM = 85.98′ + 40.33′ + 23.90′  (no street here)
```

## Coordinate system (all Pass 1 math)

- **+X** toward Pennsylvania (right)
- **+Y** down toward the irregular boundary (bottom)
- **Origin** = rear-left
- Pennsylvania frontage at **x = 148**
- Do **not** use a north-up plan

## Survey polygon (drawing feet)

```
[0, 0]            rear-left / north
[148, 0]          Pennsylvania, top of 50′
[148, 50]         Pennsylvania, bottom of 50′
[125.143, 43.016] after 23.90′
[84.813, 43.016]  after 40.33′
[0, 57.01]        rear-left bottom of 57.01′
```

Calculated area ≈ 7,023 SF (plat 7,028 SF).

## Working setbacks (planning assumption — not survey fact)

| Side | Drawing location | Assumed |
|------|------------------|--------:|
| Front | Pennsylvania / right | 20′ |
| Rear | left | 25′ |
| West | top | 5′ |
| East | bottom / irregular | 10′ |

## Source image

[`assets/master.image.png`](../assets/master.image.png) supplies lengths. This locked drawing convention overrides any north-up rotation.

## Pass 1 review (Aug 2026)

All seven concepts exist as SVG in [`js/lot2-geometry.js`](../js/lot2-geometry.js) and render on [`designs.html`](../designs.html). Exports: [`review-pass1/`](../review-pass1/).

### Revisions (option 3)

| Concept | Change |
|---------|--------|
| **E3** | Court widened from 8×22′ gap to **14×24′** at Pennsylvania (x=134). Units 46×17 @ 782 SF. Drive midline y=22. |
| **G2** | Rectangle placeholders replaced with **true L polygons** — Unit A 832 SF, Unit B 804 SF; garden between crooks. |

### Legacy board comparison

| Pass 1 | Legacy | Match |
|--------|--------|-------|
| E2 | `imgs/e2.png` | Yes — recessed garages, Penn-facing duplex |
| E3 | `imgs/e3.png` | Intent yes — walled front court (now sized) |
| E1 | `imgs/2_E1.png` | No — legacy is narrow 64×14; current is deep-stagger |
| V2 | `imgs/lot2_math_v_750_first_floor.png` | Yes — trapezoid wings, Penn right |
| G2 | — | Pass 1 only |

### Envelope notes (axis-aligned 20/25/5/10)

- **E2, F1**: minor south clip on lower unit/garage (~1–5′)
- **E1, E3, G1, G2, V2**: inside axis box after E3/G2 revision
- Polygon-accurate setback check not yet run — irregular bottom may differ

### Pass 2 gate

No elevations until finalist approval per concept.

## Geometry validation funnel

See [`lot2-geometry-validation.md`](lot2-geometry-validation.md) and [`lab.html`](../lab.html).

```
SOT (frozen) → Geometry Lab → Viable Concepts → Finalists → Pass 2 Architecture
```

SOT constants live in [`js/lot2-sot.js`](../js/lot2-sot.js) — parcel geometry must not be edited by concepts.
