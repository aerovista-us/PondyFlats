# Lot 2 — G1-A Circulation Proof (not a candidate)

**Artifact:** [`access.html`](../access.html) (section G1-A)  
**Locked original:** `Lot2.CONCEPTS.g1` is unchanged.  
**Proof concept:** `Lot2.CONCEPTS.g1a`  
**Next study:** [`access-geometry.html`](../access-geometry.html) — **Parking Skeleton A-F** (display name; code IDs `access_a`/`b`/`c`)

G1-A is **circulation proof**, not a candidate. It demonstrated that east-facing garage doors + a south lane at y~37 can pass the FS-SUV gate. The illustrative houses attached afterward show why it was rejected: Garage A at the Pennsylvania street face, Unit B as an ~11′ bar, heavy upper-floor / LOG burden.

Do **not** iterate G1-A further. **Parking Skeleton A** codifies the same parking geometry without houses (J1’s trail called this Access A — keep those names distinct going forward).

Vehicle, parcel, setbacks, and 22×22 bays were **not** shrunk.

## Order of work

1. Empty survey + polygon setbacks.
2. Pennsylvania/right entry. 8′ body must stay on survey (ROW x≥148 allowed).
3. 12′ corridor. Max centerline on the 40.33′ south run: **y ≤ 39** (vehicle) / **y ≤ 37** (12′ pavement on-lot).
4. Two genuine 22×22 garages, independently approached, 16′ doors, ~24′ staging.
5. Inbound + outbound for **both** bays (reverse of inbound).
6. Only then: two orthogonal staggered living masses.

## What the math forbade

- Two 22×22 stacked in Y inside setbacks: need 44′; envelope is ~33–38′ N–S. **Impossible.**
- 90° / 25′ radius from a south E–W lane into a south-facing door: the lot is not deep enough on that short axis. **Impossible without a three-point (REVIEW, not PASS).**
- Shared-wall pair with the same door face: stacked dependence (H6/E2).

## Envelope that works

**Generator:** both garage doors face **east** (toward Pennsylvania). Inbound is heading west. No 90° fillet required.

| Bay | Plate | Door | Inbound |
| --- | ----- | ---- | ------- |
| Garage A | (102, 5) 22×22 | East at x=124, y=16 | Straight: (148, 16) → (134.3, 16). 24′ apron to Penn. |
| Garage B | (25, 16) 22×22 | East at x=47, y=27 | South lane y~37 until x=80 (clears A), then shallow offset to (57.3, 27). 24′ apron x=47–71. |

South lane y~37: 8′ body is on survey along the 40.33′ run (lot ~43′). This is the site constraint the locked y=41 polylines violated.

Normal parking: A’s Penn apron does not sit on B’s south lane; B’s apron does not sit on A’s y=16 shot. Independent: **yes**.

## Houses after the envelope

Z idea kept (orthogonal, staggered along the long axis). Coordinates are new.

- **Unit A** 20×22 = 440 SF at (82, 5) — north-middle bar, flush to Garage A (LOG-capable).
- **Unit B** 46×11 = 506 SF at (25, 5) — north-rear bar, Garage B shifted south (the Z).

~1,800 SF/unit via **second floor 1,327 SF** (average first floor 473 SF). Living-over-garage is assumed, not optional, if the program holds.

Geometry validation: **PASS** (survey, setbacks, 22×22, Penn access, living band).

## FS-SUV verdict (circulation only)

| Concept | Physical access | Daily usability | Maneuver burden | Role | Verdict |
| ------- | --------------- | --------------- | --------------- | ---- | ------- |
| G1-A | **PASS** | Fair — A is a clean Penn shot; B is a shallow offset then reverse-out. | Moderate | **Circulation proof** | Technical PASS — **not promoted** |

Pinch to illustrative Unit B ≈ 3.2′. No three-point. Forward in / reverse out.

Daily is **Fair, not Good**. Architecture remaining fails plausible-two-homes test — see Access A skeleton in [`lot2-access-geometry.md`](lot2-access-geometry.md).

## Sacrifices vs locked G1

| | Locked G1 | G1-A |
| - | --------- | ---- |
| First floor / unit | 912 · 608 (avg 760) | 440 · 506 (avg 473) |
| Upper floor | 1,054 | 1,327 |
| Total living | ~1,814 | ~1,800 |
| Garage doors | Recessed, west hunt | **Both east; A faces Penn** |
| Drive | y=41 west alley (FAIL) | y=16 Penn shot + y~37 south lane |
| Building footprint | 2,488 SF | 1,914 SF |
| Yard (est.) | 1,535 SF | 3,996 SF |
| Paved (schematic) | 3,000 SF / 250′ | 1,114 SF / 93′ south lane (plus a second 12′ Penn lane not fully in that count) |
| Separation | Interlock / 0′ | Unit A attached to Garage A (0′) |
| Street | Living at Penn | **Garage door at Penn** |
| Floor plan | Honest lower split | Thin B bar · LOG / upper-heavy |

## What this does *not* do

- Does not overwrite `g1`.
- Does not start Pass 2 massing/elevations.
- Does not promote H6/H3.
- Does not claim daily delight equal to a recessed-garage E2.

If the street-facing garage or upper-floor burden is unacceptable, the next study is **Parking Skeleton A-F** ([`access-geometry.html`](../access-geometry.html)) — not endless G1-A plate nudges. J1 later designed on that skeleton and failed ownership; no J1 rescue.

See also: [`lot2-access.md`](lot2-access.md)
