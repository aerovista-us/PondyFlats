# Lot 2 — R5.1e Architectural Massing

**Status:** **PASS / FROZEN**  
**Duplex base:** R5.1e APPROVED  
**Parking:** FULL PASS / frozen  
**Exact plans:** PASS · A **1,556** / B **1,806** SF  
**Massing truth:** PASS / frozen extrusion  
**Architectural massing:** **PASS** · freeze this SVG  
**Photoreal / finished elev:** **UNLOCKED** on this freeze — do not invent a different building  

> **FLAG (2026-08-22 — not deleted):** Photoreal UNLOCKED vs representation-only; “floor-plan closure is Priority #1” is historical (closure PASS; package complete). Original lines kept. Catalog: [`lot2-status-conflicts.md`](lot2-status-conflicts.md).  

**Page:** [`../r51e-architectural-massing.html`](../r51e-architectural-massing.html)  
**Static SVG:** [`../imgs/r51e-architectural-massing.svg`](../imgs/r51e-architectural-massing.svg)  
**Engine:** [`../js/lot2-r51e-architectural-massing.js`](../js/lot2-r51e-architectural-massing.js)  
**Camera / volumes:** [`../js/lot2-r51e-massing-truth.js`](../js/lot2-r51e-massing-truth.js)

## Honest program

> **R5 — two enclosed garage spaces plus two covered spaces, independently accessible.**

## Hard locks (must match massing truth)

- Same axon camera (Pennsylvania near / rear deep)
- Same lot plane
- Same volume footprints and z-heights (ground 10.5′ · upper 10′ · carport clear 9′)
- Same east garage-door faces
- Same frozen parking paths and 8 floor-rated posts
- Roofs only on existing upper envelopes (plates A and B)
- Porches labeled **APPENDAGE · not core footprint**
- No stretch / shrink / slide / rotate / merge of core volumes
- No openings on the 1-hr demising wall at **x=68**
- Covered stalls remain open

## Architecture added (not core)

| Item | Spec |
| ---- | ---- |
| Roof A | Gable on plate `68,5 58×22.5` · pitch **+6.5′** · ridge **27.0′** |
| Roof B | Gable on plate `28,5 40×28` · pitch **+6.0′** · ridge **26.5′** |
| Entry canopy A | `78,1.5 8×3.5` · z 0–9 · north setback · **APPENDAGE** |
| Entry eyebrow B | `66,20 4×2` · z 8.5–9.5 · cantilever · **APPENDAGE** |
| Materials | Garage masonry · stone base 3′ · warm upper siding · charcoal roofs |
| Openings | Recessed east garage doors · Entry A north · Entry B south from spine · no x=68 glass |

## Page controls

| Toggle | Purpose |
| ------ | ------- |
| Architecture on/off | Off = recover massing truth exactly |
| Massing underlay | Ghost massing-truth volumes under architecture |
| Footprint overlays | Dashed plan projections for drift audit |
| Parking / path underlay | Frozen R5 drive and bays |

## Gate

All geometric checks **PASS** (massing truth · exact plans · parking freeze · same camera · core align · roofs on upper envelopes · covered open · 8 posts · appendages labeled · demising blank · sweep-clear · architecture-off recovers).

Run:

```
node scripts/r51e-arch-massing-gate.js
```

**Freeze this architectural massing** — done. Same-camera axon lock PASSed as representation baseline. Zoning, fire engineering, and structural design remain pending.

## Next

Photoreal / finished elevation and eye-level views **only** from this frozen SVG and the same-camera axon lock. Floor-plan closure is Priority #1 for Deliverable v1.0. Do not skip to generative façades.

## Related

- [`lot2-r51e-massing-truth.md`](lot2-r51e-massing-truth.md)
- [`lot2-r51e-plans.md`](lot2-r51e-plans.md)
- [`lot2-r51e-core-repair.md`](lot2-r51e-core-repair.md)
- [`lot2-r51e-axon-lock.md`](lot2-r51e-axon-lock.md)
- [`lot2-r51e-plan-closure.md`](lot2-r51e-plan-closure.md)
- [`lot2-r51e-deliverable-v1.md`](lot2-r51e-deliverable-v1.md)
