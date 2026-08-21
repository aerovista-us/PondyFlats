# Lot 2 — Parking Skeleton A-F

**Artifact:** [`access-geometry.html`](../access-geometry.html)  
**Engine:** `js/lot2-access-skeleton.js` + `js/lot2-access.js`  
**Proof (not candidate):** G1-A — see [`lot2-g1a.md`](lot2-g1a.md) and [`access.html`](../access.html)  
**D/E/F close:** [`lot2-def-closure.md`](lot2-def-closure.md)

## Naming (important)

| Name | Meaning |
| ---- | ------- |
| **Access A** (J1 trail) | Locked circulation under J1-B. Remains that name in Images 1–4.2 docs. |
| **Parking Skeleton A-F** | Next-phase parking-only options. Prefer this label going forward. |
| Code IDs `access_a` … `access_f` | Stable internal IDs. |

Parking Skeleton A ≡ J1 Access A geometry (rename only).

## Phase rule — no architecture yet

J1 is **CLOSED** (valid visualization · ownership NO). No rescue passes. No house masses until a parking concept clears the **appropriate named gate** below.

## Two named gates

### Original Program Gate

Closes all twin-22×22 / four-enclosed-space work (including Skeletons A–F):

1. Survey / lot containment  
2. Full-size SUV swept path  
3. **20.5′ vehicle staging on each declared door** (hard physical FAIL if missed — not REVIEW)  
4. Required turning radius  
5. Two independent garage approaches  
6. Four enclosed spaces through two genuine 22×22 garages  
7. Realistic daily maneuvering burden  
8. Two ≥ ~18′ contiguous home plates / credible lower floor  

### Parking Reset Gate

For intentionally revised parking programs (smaller garages, tandem, covered, lift). Four-space arrangement is **defined per concept**. Still requires FS-SUV access, independence as claimed, and two viable home plates. Do not auto-fail solely for lacking twin 22×22.

## Field closure status

| Concept | Last recorded status | Official FS-SUV / skeleton closure |
| ------- | -------------------- | ---------------------------------- |
| E2 · G1 · V2 · H6 · H3 | FS-SUV FAIL | **Yes** — locked five |
| J1-A/B/C | Ownership NO | **Yes** |
| **E1** | Geometry REVIEW | **Yes — Skeleton D physical FAIL / Original Program Gate FAIL** |
| **E3** | Geometry PASS; H3 fallback | **Yes — Skeleton E physical PASS\* / Original Program Gate FAIL** (arch remaining) |
| **F1** | Geometry PASS; architectural concern | **Yes — Skeleton F physical FAIL / Original Program Gate FAIL** |
| G2 · H2 | Geometry REVIEW | **Yes — family / equivalence closure** to E3 mid-lot pair + south/west approach (not an exact-coordinate retest) |
| H4 | Geometry REVIEW | **Yes — family / equivalence closure** to E1-style depth stack + south corridor family |
| H5 | Geometry REVIEW | **Yes — family / equivalence closure** to E1/A garage-band + south corridor family |

\*E declared-door note: south face on Garage A audited at **8′ staging FAIL**; locked reference is **W + E** both **24′**. See [`lot2-def-closure.md`](lot2-def-closure.md).

Skeleton E replaced E3’s overlapping recorded garage plates with a valid non-overlapping pair — equivalence closures are about **circulation family**, not identical coordinates.

## Skeletons

| ID | Display name | Source | Intent |
|----|--------------|--------|--------|
| **access_a** | **A** — East-Facing Tandem | G1-A / J1 Access A | Known-good east doors + y~37 south lane |
| **access_b** | **B** — Central Garage Core | H6 stripped | Paired mid-lot core |
| **access_c** | **C** — Split-Depth | Access A family | Penn A + deeper B |
| **access_d** | **D** — E1 Rear Stack | **E1** | Depth-stack toward rear; Penn free of garages |
| **access_e** | **E** — E3 Courtyard | **E3** | Mid-lot pair + Penn court void (H3 fallback) |
| **access_f** | **F** — F1 Rear Motor Court | **F1** | Rear pair; Penn street free of garages |

### E3 garage-coord note

Recorded E3/G2/H2/H3 garage plates `(48,5)+(48,13)` **overlap**. Skeleton E uses a non-overlapping mid-lot pair with a court between boxes. Equivalence for G2/H2 is **family-level**, not “same plates.”

### Archived experiment

`access_d_mews` — facing rear mews before E1-derived D. Not in the active skeleton list.

## Results — historical (pre-adjustment)

> **Historical pre-adjustment results — superseded.**  
> Captures the first FS-SUV pass before clear-south and driveway/clip repairs. Do not use for disposition.

| Skeleton | Physical | Architecture remaining | Plausible homes | Verdict |
| -------- | -------- | ---------------------- | --------------- | ------- |
| **A** | PASS | Poor | No | **FAIL** |
| **B** | FAIL | Poor | No | **FAIL** |
| **C** | PASS | Poor | No | **FAIL** |
| **D (E1)** | FAIL — south y≈41 off-lot; short tangents; B staging 4′ | Weak (Penn opens) | No | **FAIL** |
| **E (E3)** | FAIL — south y≈41 off-lot; clips GA; west turn 0′ tangent | Weak (Penn opens) | No | **FAIL** |
| **F (F1)** | FAIL — south y≈41 off-lot; shared E approach; A staging 0′ | Weak (Penn opens) | No | **FAIL** |

### Shared failure mode (D / E / F) — historical note

**South y≈41 pinch was later cleared** on all affected designs via shared `CLEAR_SOUTH_CURVE` → y≈37 lane (see [`../south-pinch.html`](../south-pinch.html)). Original y=41 polylines kept as `drivePinchFail` for audit.

## Results — current (post clear-south + driveway rework)

| Skeleton | Physical | Architecture remaining | Plausible homes | Verdict / disposition |
| -------- | -------- | ---------------------- | --------------- | --------------------- |
| **A** | PASS | Poor | No | FAIL (historical east-door reference) |
| **B** | FAIL | Poor | No | FAIL |
| **C** | PASS | Poor | No | FAIL (historical) |
| **D** | **FAIL** (B staging 12′ &lt; 20.5′) | Weak (B: 6′ ribbon) | No | **CLOSE** |
| **E** | **PASS\*** (declared W+E 24′/24′) | Weak (B: 10′ ribbon) | No | **CLOSE as layout; KEEP as circulation reference** |
| **F** | **FAIL** (A staging 12′ &lt; 20.5′) | Weak (B: 4′ ribbon) | No | **CLOSE** |

\*Declared south on E Garage A = **8′ staging FAIL** (audit). Locked reference uses **W + E**.

**Circulation reference:** Skeleton **E** (split **W+E** doors + court + Penn mid-lane + clear-south). Replaces A/C as the strongest FS-SUV pattern under the Original Program Gate’s physical tests.

**Next:** parking-program reset scored under the **Parking Reset Gate** — see [`lot2-def-closure.md`](lot2-def-closure.md). No architecture yet.

### Shared failure mode (D / E / F) — current

South y≈41 pinch and swept garage clips are cleared. Remaining conflict:

- **D / F:** hard **staging FAIL** on a declared south door (12′ clear; apron partly off-survey), plus architecture remaining.  
- **E:** physical circulation PASS on declared W+E; **architecture remaining FAIL** (rear ribbon).

### Equivalence closures (family — no separate skeleton)

| Concept | Why not tested as exact-coordinate audit |
| ------- | ---------------------------------------- |
| **G2** · **H2** | Same mid-lot garage **family** + south/west approach as E3/H3 → covered by Skeleton E + locked H3 FAIL (plates may differ; E fixed overlap) |
| **H4** | Depth-split garage **family** + south corridor as E1 → covered by Skeleton D |
| **H5** | Garage-band **family** + south corridor → covered by Skeleton D / A family |

Reopen only if a concept introduces a **genuinely new** parking path (not another south-corridor or mid-lot pair variant).

## Lesson

1. East-door + y~37 lane (A/C) can pass circulation and still leave unbuildable home ribbons.  
2. Central core (B) cannot give two independent FS-SUV bays.  
3. **D and F fail hard staging plus architecture remaining. E passes physical circulation, subject to declared-door verification (W+E locked; S audited FAIL), but fails architecture remaining.**  
4. E3’s H3-fallback condition was honored — tested as Skeleton E — and fails the Original Program Gate on homes.  
5. J1 remains CLOSED. No architecture until a concept clears the **Original Program Gate** or an explicit **Parking Reset Gate** for that concept.

## Related

- [`lot2-def-closure.md`](lot2-def-closure.md) — D/E/F quantitative close + named gates  
- [`access.html`](../access.html) — locked five FAIL + G1-A proof  
- [`lot2-j1b-image4.md`](lot2-j1b-image4.md) — J1 disposition  
- [`shortlist-elimination-memo.md`](shortlist-elimination-memo.md) — E3 as H3 fallback
