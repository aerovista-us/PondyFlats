# Lot 2 — Access Geometry A/B/C

**Artifact:** [`access-geometry.html`](../access-geometry.html)  
**Engine:** `js/lot2-access-skeleton.js` + `js/lot2-access.js`  
**Proof (not candidate):** G1-A — see [`lot2-g1a.md`](lot2-g1a.md) and [`access.html`](../access.html)

Parking/circulation skeletons only. No house masses attached. Goal: discover the limited number of FS-SUV circulation layouts that work, then measure **architecture remaining after circulation**.

## Why this study exists

G1-A proved east-facing garage doors + a south drive lane at **y≈37** can pass the FS-SUV gate. It also showed the architectural cost: Garage A becomes part of the Pennsylvania street face, Unit B collapses to an ~11′ bar, and both homes rely heavily on upper-floor / living-over-garage area.

G1-A is **circulation proof**, not a candidate. Do not iterate G1-A further.

## Three skeletons

| ID | Name | Intent |
|----|------|--------|
| **access_a** | Access A — East-Facing Tandem | Known-good baseline from G1-A proof. Garage A straight Penn inbound (y=16). Garage B via south lane (y=37) + shallow offset. |
| **access_b** | Access B — Central Garage Core | Paired 22×22 core at (52,8)+(74,8) — H6 circulation stripped of architecture. Tests whether a recessed core preserves street face. |
| **access_c** | Access C — Split-Depth Garages | Garage A at Penn (102,5); Garage B deeper rear/left (25,22). Same south lane. Tests whether staggering depth improves buildable zones. |

All three use **east-facing doors** and Pennsylvania/right entry (x=148).

## PASS criteria

A skeleton **PASS**es only if **all** of the following hold:

1. Both **22×22** garages remain exact.
2. Both bays are **independently usable** (no parked vehicle blocks the other bay).
3. Inbound/outbound FS-SUV paths stay **on lot** (ROW x≥148 allowed).
4. **No three-point** required for normal use.
5. **Realistic staging** for the 20.5′ design vehicle (≥20.5′ clear at door).
6. **Architecture remaining:** after subtracting garages and 12′ drive corridors from the setback polygon, two contiguous zones (Penn-side cx≥72 and rear cx<72) each have **≥18′ minimum width**, **≥500 SF** area, and **≥600 SF** for plausible first-floor massing toward ~1,800 SF total living per unit.

A skeleton that passes circulation but leaves 4–16′ residential ribbons is **FAIL** — not a real winner.

## Results (FS-SUV gate)

| Skeleton | Physical access | Architecture remaining | Plausible two homes | Verdict |
| -------- | --------------- | ---------------------- | ------------------- | ------- |
| **Access A** | PASS | Poor — Unit A 4′ min width; Unit B 12′ ribbon | No | **FAIL** |
| **Access B** | FAIL — path clips GB; off-lot; 18′ vs 25′ tangent | Poor | No | **FAIL** |
| **Access C** | PASS | Poor — Unit A no zone; Unit B 4′ ribbon | No | **FAIL** |

### Access A (circulation PASS, architecture FAIL)

- Garages: A (102,5), B (25,16). Paths match G1-A proof.
- Independent bays: **yes**. No three-point. Daily: **Fair**.
- Buildable zones after circulation: Penn zone **4′** min width; rear zone **12′** min width — both below the 18′ ribbon threshold.

### Access B (circulation FAIL)

- Central core at (52,8)+(74,8). Garage A inbound clips Garage B envelope.
- Garage B path leaves lot; 90° at (106.25,37) has **18′** tangent vs **25′** required.
- Independent bays: **no**. Three-point: **yes**.
- Confirms H6’s circulation problem is structural — not fixable by architecture alone.

### Access C (circulation PASS, architecture FAIL)

- Garage B moved deeper to (25,22). Same south lane as Access A.
- Independent bays: **yes**. No three-point.
- Split depth does **not** recover Penn-side architecture: Unit A has **no contiguous zone**; Unit B rear zone **4′** min width.

## Architecture remaining metric

Implemented in `Lot2AccessSkeleton.architectureRemaining()`:

1. Grid the setback polygon at 2′ steps (x 25–128, y 5–43).
2. Mark cells occupied by garages or within 12′ of any drive/access path.
3. Flood-fill contiguous free cells into components.
4. Split largest Penn component (cx≥72) vs rear (cx<72).
5. Score each zone: min horizontal run width, area, bounding box.
6. **Plausible homes** = both zones pass width/area thresholds.

Visualized on `access-geometry.html` as shaded overlays (green = plausible, red = ribbon/missing).

## Lesson

**All three skeletons FAIL overall** — but they converge on the same circulation generator:

> **East-facing garage doors + Pennsylvania straight shot + south drive lane at y≈37**

Access B proves a **central recessed core** cannot deliver two independent FS-SUV bays on this parcel.

Access A and C prove that even when circulation works, **architecture remaining is poor** — the site consumes its width and depth for parking and drive before honest ~1,800-SF lower-floor plates can form.

**Implication:** Stop fighting garage-forward / garage-integrated architecture. The next Pass 2 move is to **design homes around** a proven parking skeleton (Access A circulation), not to rescue recessed living-first concepts (locked G1, E2, H6).

Do **not** start massing until that trade is explicitly accepted.

## Related artifacts

- [`access.html`](../access.html) — locked five FAIL + G1-A circulation proof (audit trail)
- [`lot2-access.md`](lot2-access.md) — five-way swept-path documentation
- [`lot2-g1a.md`](lot2-g1a.md) — G1-A proof write-up (reframed as proof, not candidate)
