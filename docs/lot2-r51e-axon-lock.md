# Lot 2 — R5.1e same-camera axon lock

**Status:** **PASS / FROZEN** as visualization baseline  
**Role:** Supporting · representation-only  
**Priority #1 remains:** floor-plan closure  

> **FLAG (2026-08-22 — not deleted):** Priority #1 (closure) is **PASS**. This lock is representation-only supporting drawing. Original “Priority #1 remains” kept. Catalog: [`lot2-status-conflicts.md`](lot2-status-conflicts.md).  

**Page:** [`../r51e-axon-lock.html`](../r51e-axon-lock.html)  
**Source:** [`../imgs/r51e-architectural-massing.svg`](../imgs/r51e-architectural-massing.svg)  
**Audit SVG:** [`../imgs/r51e-axon-lock-audit.svg`](../imgs/r51e-axon-lock-audit.svg)  
**Clean SVG:** [`../imgs/r51e-axon-lock-clean.svg`](../imgs/r51e-axon-lock-clean.svg)  
**Engine:** [`../js/lot2-r51e-axon-lock.js`](../js/lot2-r51e-axon-lock.js)

## Rule

Every photoreal image must **inherit** frozen geometry. A prettier picture that moves a volume **fails visualization**, not architecture.

This lock:

1. Reads the frozen architectural-massing SVG (and checks it still matches the engine).
2. Remaps fills only — polygon points stay identical.
3. Overlays east garage door planes from frozen garage rects (`east-plane-svg-locked`).
4. Callouts: ridges 27.0′ / 26.5′, demising x=68 blank, eight posts, covered open, canopy/eyebrow caps.

## Gate

`node scripts/r51e-deliverable-gates.js`

PASS means Pennsylvania elevation may begin as representation-only. Do not start a long render branch.

## Next (representation)

1. Pennsylvania elevation — same invariants, derived from this lock  
2. Penn eye-level / street approach  

## Related

- [`lot2-r51e-deliverable-v1.md`](lot2-r51e-deliverable-v1.md)
- [`lot2-r51e-architectural-massing.md`](lot2-r51e-architectural-massing.md)
- [`lot2-visual-chain.md`](lot2-visual-chain.md) — J1 drift warning
