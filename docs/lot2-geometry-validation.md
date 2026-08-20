# Lot 2 — Geometry Validation (Pass 1.5)

## Funnel

```
SOT survey polygon → polygon-accurate setbacks → concept geometry → validation metrics → approve shortlist → Pass 2 site/elevation
```

| Stage | What happens | Deliverable |
|-------|----------------|-------------|
| **SOT** | Parcel polygon, compass, Pennsylvania frontage locked | `js/lot2-sot.js` |
| **Polygon setbacks** | Inward offset per boundary segment (planning assumptions) | `Lot2.setbackPoly()` in `js/lot2-geometry.js` |
| **Concept geometry** | 12 strategies on shared lot — no concept redraws the parcel | `designs.html` |
| **Validation metrics** | PASS / REVIEW / FAIL with reasons | `lab.html` |
| **Shortlist** | Three finalists after judgment | Manual approval |
| **Pass 2** | Site plan, Penn elevation, perspective | One finalist at a time |

**Pass 1.5 validates geometry only.** Swept-path, fire separation, utilities, ownership structure, final zoning/setbacks, and engineering remain unverified.

## Working setback assumptions (not survey facts)

| Edge | Assumption |
|------|------------|
| Pennsylvania / right (front) | 20′ |
| Rear / left | 25′ |
| Top (y = 0) | 5′ |
| Bottom / irregular | 10′ |

The old axis-aligned rectangular envelope is **deprecated**. All pass/fail results use the polygon-accurate inward offset from the survey polygon.

## Validation helpers (`validateConcept`)

Each concept is checked for:

1. **Survey polygon** — all footprint vertices inside locked survey
2. **Setback polygon** — all vertices inside working setback envelope
3. **First-floor area** — exact polygon or rectangle area per unit
4. **Garage program** — two 22×22′ bays (484 SF each); integrated LOG counts toward bay total
5. **Minimum separation** — axis-aligned box separation between structures
6. **Driveway length** — polyline path length
7. **Paved area** — drive length × 12′ nominal width
8. **Minimum drive clearance** — centerline distance to **living** footprints (≥ 6′ each side)
9. **Pennsylvania / right access** — drive originates at x ≈ 148

Status:

- **PASS** — survey, setback, garage, Penn access, drive clearance, program targets
- **REVIEW** — partial pass; see reasons (setback clip, drive clearance, program shortfall)
- **FAIL** — outside survey, missing garage, or no Penn connection

## Files

| File | Role |
|------|------|
| `js/lot2-sot.js` | Frozen source of truth |
| `js/lot2-geometry.js` | Authoritative Pass 1.5 engine — setbacks, concepts, render, validation |
| `js/lot2-validate.js` | Legacy per-segment clearance + SUV checks (optional supplement) |
| `lab.html` | Grouped validation matrix |
| `designs.html` | Visual concept diagrams + metrics |
| `study.html` | Workflow documentation |

## Concept groups

### Validated / Current Benchmarks

- **E2** — Recessed Garage (conventional)
- **G1** — Z-Duplex (efficiency · Z-stagger in G1, no duplicate)
- **V2** — Long-Axis V (design ceiling)

### Needs Geometry Revision

- **E1** — Deep-Stagger
- **E3** — Front Courtyard (14×22′ Penn court)
- **F1** — Rear Motor Court (400/200 SF first-floor split · 1400 SF upper target)
- **G2** — Interlocking-L (true L polygons · computed areas)

### New Challengers (H2–H6)

| ID | Strategy |
|----|----------|
| **H2** | Carriage-Hinge Duplex |
| **H3** | Mews Courtyard Pair |
| **H4** | Garage-Under / Living-Over-Garage |
| **H5** | Urban Cottage Pair |
| **H6** | Central-Core Duplex |

## E2 validation case

E2 was fixed first against the real setback taper:

- **Unit A** — 45×20′ (900 SF) at Pennsylvania/right
- **Unit B** — trapezoid ~910 SF extending west where depth allows (two full 45×20′ stacked plates do not fit inside the setback polygon at Penn/right)
- **Garages** — two exact 22×22′ boxes recessed left/rear
- **Drive** — enters at Pennsylvania/right (x = 148), routes west

## What Pass 2 is NOT

Pass 2 is not automatic. No elevation or perspective work until:

1. Validation matrix reviewed
2. Three finalists selected
3. Finalist Pass 1.5 geometry explicitly approved

See also: [`lot2-survey-orientation.md`](lot2-survey-orientation.md)
