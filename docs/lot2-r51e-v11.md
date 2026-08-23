# Lot 2 — R5.1e-v1.1 demising correction

**Revision:** `R5.1e-v1.1`  
**Date:** 2026-08-22  
**Status:** **DESIGN COMPLETE / PROGRAM GATE PASS**  
**Baseline (superseded for program compliance):** [`lot2-r51e-v1-baseline.md`](lot2-r51e-v1-baseline.md) · **COMPLETE BASELINE / PROGRAM GATE NOT CLEARED**

**Front door:** [`../r51e-deliverable.html`](../r51e-deliverable.html)  
**Engine:** [`../js/lot2-r51e-lock.js`](../js/lot2-r51e-lock.js)  
**v1.0 archive:** [`../js/lot2-r51e-v10-baseline.js`](../js/lot2-r51e-v10-baseline.js) · [`../imgs/r51e-v1.0/`](../imgs/r51e-v1.0/)  
**Gate:** `node scripts/r51e-deliverable-gates.js`  
**Scan:** `node scripts/r51e-v11-demising-scan.js`

## Decision

Path B was chosen: reopen **only** the demising / ownership line so the original living-program gate (1,600–1,900 SF each, ≤120 SF difference) is cleared. v1.0 is kept as the first fully reconciled drawing package. The engine remains authoritative over the presentation package.

Frozen except demising: Pennsylvania access, parking, vehicle sweep, exterior mass envelope (west x=28, east x=126), ridges 27.0′ / 26.5′, garage boxes, covered stalls / posts, site placement, repaired Unit A core.

## Scan (from v1.0 x=70)

| D | A / B SF | Δ | Result |
| - | -------- | - | ------ |
| 70 (v1.0) | 1,556 / 1,806 | 250 | living FAIL |
| 69 | 1,598 / 1,763 | 165 | living FAIL (A 2 SF short, Δ>120) |
| **68** | **1,639 / 1,720** | **81** | **PASS** — plate fit, min rooms, sweep, no garage cut |
| 67.5 | 1,660 / 1,700 | 40 | also PASS but larger move |
| ≤67 | — | — | B stair strip <3.5′ FAIL |

**Promoted:** demising **x=68** (2′ west). Smallest of x=69 / x=68 that passes. Wall was not crept further.

## Live lock

| Item | v1.0 | v1.1 |
| ---- | ---- | ---- |
| Demising | x=70 | **x=68** |
| Plate A | `70,5 56×22.5` | **`68,5 58×22.5`** |
| Plate B | `28,5 42×28` | **`28,5 40×28`** |
| Conditioned SF | 1,556 / 1,806 | **1,639 / 1,720** |
| Living gate | not cleared | **1,600–1,900 / Δ 81 ≤ 120** |
| Exterior east / west | 126 / 28 | unchanged |
| Garage B east face | x=66 | unchanged (D=68 does not cut parking) |
| B stair strip | 6′ (`64→70`) | **4′ (`64→68`)** |
| ENTRY B | x=65.4 | **x=64.4** (does not cross x=68) |
| Ridges | 27.0′ / 26.5′ | unchanged |

## What was regenerated

Only drawings that inherit demising / plate / room edges: plans, site, four elevations, sections, architectural massing, axon lock. Parking paths, posts, and garage boxes were not moved.

## Status wording

- **R5.1e-v1.0 — COMPLETE BASELINE / PROGRAM GATE NOT CLEARED**
- **R5.1e-v1.1 — DESIGN COMPLETE / PROGRAM GATE PASS**
