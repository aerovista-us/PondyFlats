# Lot 2 — Repair-before-close · R5 daily · R6.4A/B repair

**Rule:** Identify the exact failure → smallest geometry/ops fix → rerun every affected gate → close only when the repair fails, breaks another hard gate, or creates an unacceptable ownership trade.

**Artifacts:** [`../r64-daily.html`](../r64-daily.html) · [`../js/lot2-daily-use.js`](../js/lot2-daily-use.js) · [`../parking-reset.html`](../parking-reset.html)

## Locked hierarchy

| Role | Option | Status |
| ---- | ------ | ------ |
| Public technical reference | **R6.1 CONDITIONAL** | Continuity / show — must still pass daily-use before preferred |
| **Active practical candidate** | **R5 Practical Pair** | **DAILY CONDITIONAL** · gate CONDITIONAL (daily + outbound open) |
| Active repair branch | **R6.4A** turn pocket · **R6.4B** lift equipment | Alive under repair-before-close |
| Repair parent | **R6.4** | **REPAIR — DAILY POOR** (not closed) |
| Closed — physical | **R6.2A** | FAIL · no curve work |
| AHJ fallback | **R6.3** | Hold only if it shortens B reverse / changes lift retrieval |
| Architecture | **OFF** | Until FULL PASS |

## R6.4 status (corrected)

**REPAIR — DAILY POOR**

Straight-spine geometry works; deep-household turnaround and independent lift retrieval remain unresolved.

| Branch | Intent | Engine result (this pass) |
| ------ | ------ | ------------------------- |
| **R6.4A** Midpoint turn pocket | B reverse only to pocket → one maneuver → **forward** Penn exit | Reverse **~34′** (was ~84′) · S1–S4/S6 OK · **S5 FAIL** stacked · outbound still few off-lot samples (REVIEW) · gate **CONDITIONAL** |
| **R6.4B** Independent lift | Same 16×24 · pit/puzzle vs stacked | **S5 OK** (INDEPENDENT) · reverse still **~84′** · needs R6.4A (or shared pocket) for daily reverse |
| **R6.4C** Back-in / forward-out | Sight-line supplement | Does **not** shorten the 84′ maneuver — supplemental only |

**Do not** spend time on R6.3 merely for two curb cuts unless it materially shortens B’s reverse and changes lift retrieval.

## R5 — active practical (six scenarios)

Program: **one enclosed + one covered, independently usable space per household** (no lift stack).

| ID | Scenario | Result |
| -- | -------- | ------ |
| S1 | A in/out, B parked | OK |
| S2 | B in/out, A parked | OK · turn pocket · reverse **~32′** · forward Penn |
| S3 / S4 | Simultaneous | OK · throat ΔY ~15′ |
| S5 | Independent stalls (garage + covered) | OK |
| S6 | Snow / visibility / throat | OK · forward exit helps sight lines |

**Daily verdict:** **DAILY CONDITIONAL**  
**Gate:** **CONDITIONAL** — open: apron/daily REVIEW · outbound pocket trim (few axle-body samples)

If R5 reaches FULL PASS, it **replaces R6.1 as public lead** and becomes the first concept eligible for schematic architecture.

## Combined lesson

| Failure | Smallest repair | Status |
| ------- | --------------- | ------ |
| ~84′ reverse (deep E bay) | Midpoint turn pocket (R6.4A / shared on R5) | Partial — reverse fixed; outbound sweep still REVIEW |
| Stacked lift retrieval | Independent equipment (R6.4B) or prefer R5 | R6.4B OK on S5; R5 avoids lifts |
| Covered blocked by garage | S-face + spine approach / setback-safe placement | Cleared on R5 S5 |
| Shared throat | — | Not binding (ΔY ~15′) |

## Related

- [`lot2-parking-reset.md`](lot2-parking-reset.md)  
- [`lot2-validation-closure.md`](lot2-validation-closure.md)  
- [`lot2-r64-daily.md`](lot2-r64-daily.md) (superseded narrative → this doc for hierarchy)
