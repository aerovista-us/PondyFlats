# Lot 2 — R5.1e Core Repair (Unit A)

**Phase:** deterministic **R5.1e Core Repair** — complete  
**Parking:** **FULL PASS / frozen** (unchanged)  
**Massing truth:** **PASS** (no Unit A ground undercroft after repair)  
**Exact plans:** **CONDITIONAL** — core sweep repair passes; original living-program gate fails  
**Architectural massing:** **WAIT** pending program rebalance  
**Visualization:** **LOCKED**

## Problem

Unit A ground core (stair, powder, mech, south storage/util) sat inside the **FS-SUV swept polygon**. Massing truth preserved parking FULL PASS by classifying those rooms as **open undercroft** (slab only). Exact plans required **enclosed** stair/service **north of the sweep**, with the south band left as **open undercroft** (unconditioned).

## Frozen (not moved)

- All parking boxes, drive, access paths, outbound B pocket  
- Plates A `70,5 56×22.5` · B `28,5 42×28`  
- Demising **x=70**  
- Heights: carport clear 9′ · ground FTF 10.5′ · upper 10′  
- Unit B exact plan

## Unit A ground (after repair)

| Room | Footprint | Notes |
| ---- | --------- | ----- |
| STAIR A | 70,5 · 8×12 | North of sweep |
| ENTRY / MUD A | 78,5 · 8×6 | East column · north residual |
| POWDER A | 78,11 · 8×5 | Half bath |
| STORAGE A · north | 70,17 · 16×7 | Relocated bulk |
| OPEN UNDERCROFT A | 86,19 · 40×8.5 | **Void** · sweep-clear · not conditioned |
| GARAGE A / COVERED A | unchanged | Frozen |

## Unit A upper (service relocation)

- **LIVING / DINING A** `90,5 · 36×10` — still over CA + garage  
- **STORAGE / MECH A** `120,15 · 6×12.5` — south bulk + mech stack at upper (grade sweep clear)  
- Three beds retained; south ground storage/util removed from conditioned SF

## Conditioned SF

| Unit | SF | Band / target |
| ---- | -- | ------------- |
| A | **1,556** | **FAIL** — original minimum is 1,600 SF |
| B | **1,806** | unchanged |

Pre-repair nominal target was ~1,761 A; **~205 SF** delta is the south-band service area excluded from conditioned count (open undercroft at grade) plus north-core repack.

## Gate additions

- **`sweepClear`** — opaque Unit A ground rooms must not intersect FS-SUV body poses (`Lot2Access.analyzeConcept('reset_r5')`)  
- **Open undercroft** required south of parking (`OPEN UNDERCROFT A`)  
- **Mech** may stack upper when named in storage (`STORAGE / MECH A`)

## Engines

- [`../js/lot2-r51e-plans.js`](../js/lot2-r51e-plans.js) — `unitAGroundCoreRepair()` · `hitsSweep()` · `sweepClear` check  
- [`../js/lot2-r51e-lock.js`](../js/lot2-r51e-lock.js) — restored gate: **1,600–1,900 SF each · ≤120 SF difference**  
- [`../js/lot2-r51e-massing-truth.js`](../js/lot2-r51e-massing-truth.js) — undercroft list empty for Unit A ground core

## Next

1. Core sweep repair **PASS** ✓  
2. Massing geometry **PASS** ✓  
3. Test demising **x=69 / x=68** under the restored program gate  
4. Exact plans PASS → architectural massing  
5. Photoreal after architectural massing freeze
