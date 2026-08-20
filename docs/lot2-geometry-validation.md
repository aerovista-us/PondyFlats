# Lot 2 — Geometry Validation (Pass 1.5 / 1.5A)

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
| **Shortlist** | Three finalists after judgment | `study.html` |
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

## Program standard

- **~1,800 SF total living target per unit** — validated band **1,600–1,900 SF** (first floor + upper target).
- **First-floor size is concept-specific** unless a concept claims a **900-SF lower-floor benchmark** (E2 only).
- V2, F1, H4, and others intentionally use different lower/upper splits. PASS does not imply 900/900 on both floors.

## Validation helpers (`validateConcept`)

Each concept is checked for:

1. **Survey polygon** — all footprint vertices inside locked survey
2. **Setback polygon** — all vertices inside working setback envelope
3. **First-floor area** — exact polygon or rectangle area per unit (reported, not uniformly judged)
4. **Garage program** — two 22×22′ bays (484 SF each); integrated LOG counts toward bay total
5. **Minimum separation** — axis-aligned box separation between structures
6. **Driveway length** — polyline path length
7. **Paved area** — drive length × 12′ nominal width
8. **Minimum drive clearance** — centerline distance to **living** footprints (≥ 6′ each side)
9. **Pennsylvania / right access** — drive originates at x ≈ 148
10. **Living target band** — total living per unit within 1,600–1,900 SF
11. **First-floor benchmark** (E2 only) — declared lower-floor areas within ±80 SF

### Status (geometry only)

- **PASS** — survey, setback, garage, Penn access, drive clearance, living band (and first-floor benchmark if claimed)
- **REVIEW** — partial pass; see reasons (setback clip, drive clearance, living band, etc.)
- **FAIL** — outside survey, missing garage, or no Penn connection

**Geometry PASS ≠ design complete.** Design concerns (court quality, upper-floor load, central-core architecture) are tracked separately and do not downgrade a geometric PASS.

## Design concern column

Each concept carries a `designConcern` string for shortlist judgment — e.g. E3 “court quality,” F1 “aggressive upper-floor load,” H6 “central-core architecture.” See `lab.html` matrix.

## Files

| File | Role |
|------|------|
| `js/lot2-sot.js` | Frozen source of truth |
| `js/lot2-geometry.js` | Authoritative Pass 1.5 engine — setbacks, concepts, render, validation |
| `js/lot2-validate.js` | Legacy per-segment clearance + SUV checks (optional supplement) |
| `lab.html` | Validation matrix grouped by geometry PASS / REVIEW |
| `designs.html` | Visual concept diagrams + metrics |
| `study.html` | Workflow + shortlist track |

## Geometry status (current engine)

### Geometry PASS — shortlist eligible

E2 · G1 · V2 · E3 · F1 · H3 · H6

### Geometry REVIEW — resolve before shortlist

E1 · G2 · H2 · H4 · H5

## Concept roles (metadata — not geometry status)

### Benchmark trio

- **E2** — Recessed Garage (conventional · claims 900-SF lower-floor benchmark)
- **G1** — Z-Duplex (efficiency · Z-stagger in G1)
- **V2** — Long-Axis V (design ceiling)

### Original seven — other established roles

- **E1** — Deep-Stagger
- **E3** — Front Courtyard
- **F1** — Rear Motor Court
- **G2** — Interlocking-L

### Challengers H2–H6

| ID | Strategy |
|----|----------|
| **H2** | Carriage-Hinge Duplex |
| **H3** | Mews Courtyard Pair |
| **H4** | Garage-Under / Living-Over-Garage |
| **H5** | Urban Cottage Pair |
| **H6** | Central-Core Duplex |

## Shortlist track (first pass)

Narrow five to three for Pass 2:

1. **E2** — baseline / safest
2. **G1** — best orthogonal challenger
3. **V2** — architecture ceiling
4. **H6** — serious efficiency challenger
5. **H3** — serious lifestyle challenger

**Backup:** E3 (courtyard)

**Deprioritized until REVIEW resolved:** E1 · G2 · H2 · H4 · H5

## E2 validation case

E2 was fixed first against the real setback taper:

- **Unit A** — 45×20′ (900 SF) at Pennsylvania/right
- **Unit B** — trapezoid ~910 SF extending west (two full 45×20′ stacked plates do not fit inside the setback polygon at Penn/right)
- **Garages** — two exact 22×22′ boxes recessed left/rear
- **Drive** — enters at Pennsylvania/right (x = 148), routes west

## Shortlist Elimination Memo

After Pass 1.5 geometry PASS, the five track concepts (E2 · G1 · V2 · H6 · H3) are scored on seven criteria with ADVANCE / HOLD / DROP dispositions. E3 is appendix only.

See [`shortlist.html`](../shortlist.html) and [`shortlist-elimination-memo.md`](shortlist-elimination-memo.md).

## What Pass 2 is NOT

Pass 2 is not automatic. No elevation or perspective work until:

1. Validation matrix reviewed
2. Three finalists selected
3. Finalist Pass 1.5 geometry explicitly approved

See also: [`lot2-survey-orientation.md`](lot2-survey-orientation.md)
