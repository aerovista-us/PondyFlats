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
