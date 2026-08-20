# Lot 2 — Survey Orientation Reference

Authoritative geometry source: [`assets/master.image.png`](../assets/master.image.png)

**Important:** Decorative compass labels on the master image are incorrect. The **boundary-table bearings** govern all math work.

## Correct orientation

Lot 2 sits **south of Pennsylvania Avenue**. Pennsylvania is the **north** boundary.

| Edge | Length | Bearing | Role |
|------|-------:|---------|------|
| Pennsylvania frontage | 50.00′ | S 89°37′24″ E | **North** · West ↔ East |
| West long side | 148.00′ | N 0°22′36″ E | **South ↔ North** long axis |
| South end | 57.01′ | N 89°37′24″ W | **South** · East ↔ West |
| East / Lot 1 | 85.98′ + 40.33′ + 23.90′ | S 9°12′03″ E / S 0°58′24″ W / S 17°05′07″ W | **East** irregular boundary |

## Coordinate system

All concept math uses a **north-up plan**:

- **+X** = East
- **+Y** = South (screen-down)
- **Origin** = northwest corner (west end of Pennsylvania frontage)

## Traverse vertices (feet)

Clockwise from NW:

```
[0.0000, 0.0000]      NW · Penn west
[49.9989, 0.3287]     NE · Penn east
[42.9772, 23.1740]    after 23.90′ east segment
[42.2921, 63.4981]    after 40.33′ east segment
[56.0400, 148.3719]   southeast corner area
[-0.9688, 147.9971]   SW · south end west
```

- **Closure error:** 0.004 ft
- **Calculated area:** 7,023.43 SF (recorded plat: 7,028 SF)

## Terminology replacement

| Old (invalid) | Correct |
|---------------|---------|
| Pennsylvania = east / right | Pennsylvania = **north / top** |
| 148′ east–west depth | 148′ **north–south** depth (west side) |
| 57.01′ west / rear | 57.01′ **south end** |
| 85.96′ irregular south | **85.98′** irregular **east** (Lot 1) |
| Wings open westward (V2) | Wings open **southward** down 148′ axis |
| Garages west / rear (E2/F1) | Garages **south** of living mass |

## Working setbacks (planning assumption — not survey fact)

| Side | Assumed |
|------|--------:|
| Front (north / Penn) | 20′ |
| Rear (south) | 25′ |
| West (148′ side) | 5′ |
| East (Lot 1) | 10′ |

## Implementation

- Shared renderer: [`js/lot2-geometry.js`](../js/lot2-geometry.js)
- Concept site: [`designs.html`](../designs.html)

## Invalidated prior work

All diagrams built with `+X = Pennsylvania / east` or the old `survey = [[0,0],[148,0],[148,50],…]` polygon are **pre-correction history** only.
