# Lot 2 — R5.1 Program Rebalance

**Parking:** **FULL PASS / frozen** (`js/lot2-r5-freeze.js`)  
**Schematic (R5):** **CONDITIONAL** — 920 vs 1,882 SF rejected as comparable duplex  
**Ownership:** **YES — R5.1e approved as duplex base** (2026-08-21)  
**Next:** exact plans [`../r51e-plans.html`](../r51e-plans.html) · [`lot2-r51e-plans.md`](lot2-r51e-plans.md)  

## Approved package (R5.1e)

| Item | Lock |
| ---- | ---- |
| Demising | x=70 |
| Plate A | 70,5 56×22.5 |
| Plate B | 28,5 42×28 |
| Over covered | Conditioned · posts floor-rated |
| SF targets | ~1,761 / ~1,806 |
| Parking | Unchanged FULL PASS freeze |

## Why

R5 parking works. The architectural program does **not** pass the original duplex goal: **~920 SF vs ~1,882 SF is too asymmetric** to approve as two comparable homes.

## Rules for this study

1. Keep bays, paths, posts, snow zone, and swept clearance **frozen**  
2. Reopen **only** residential plate / upper-floor envelope  
3. Replace Unit A’s deck over the covered stall with **conditioned space** first  
4. Test transferring part of B’s excess plate to A  
5. Report max legitimate two-story conditioned area per unit  
6. Rerun plate fit, bearing, stairs, privacy, parking clearance (freeze assert)

## Results (summary)

| Scenario | A live / theo | B live / theo | Verdict |
| -------- | ------------- | ------------- | ------- |
| R5 baseline | 920 / 1120 | 2054 / 2288 | CONDITIONAL — not comparable |
| R5.1a CA deck→conditioned | 1116 / 1288 | 2054 / 2288 | CONDITIONAL — A still short |
| R5.1b + absorb 4′ gap | 1276 / 1448 | 1882 / 2064 | CONDITIONAL — A still short |
| R5.1c transfer 6′ (D=70) | 1516 / 1688 | 1624 / 1728 | CONDITIONAL — near band |
| R5.1d transfer 10′ (D=66) + both over-covered | 1676 / 1848 | 1634 / 1660 | **PASS** comparable |
| R5.1e D=70 · deepen A · both over-covered | 1761 / 1968 | 1806 / 1884 | **PASS** best balance |
| R5.1f max transfer + deepen A | 1941 / 2148 | 1634 / 1660 | **PASS** |

**Max gate-clear theoretical (two-story):** A up to ~2,148 SF · B up to ~2,288 SF (only after plate transfer / deepen — not on baseline plates).

**Without moving demising west of x≈76:** A’s legitimate max stays **under ~1,450 SF** even with conditioned-over-covered — **cannot** reach the 1,600–1,900 duplex band.

## Product verdict

**Chose:** `DUPLEX_REACHABLE_VIA_R51_PLATE_SHIFT` → **R5.1e** locked as duplex base.

Comparable duplex on frozen parking accepted with:

- demising at x=70;  
- covered→conditioned on carport posts;  
- plate A deepened to 22.5′ (north of drive spine).

## Ownership gate — CLOSED (YES on R5.1e)

Proceed to exact plan sanity. Massing / visualization remain gated on exact-plan PASS (+ massing lock for viz).

## Related

- [`lot2-r5-schematic.md`](lot2-r5-schematic.md)  
- [`lot2-r5-full-pass.md`](lot2-r5-full-pass.md)  
- [`lot2-parking-reset.md`](lot2-parking-reset.md)  
