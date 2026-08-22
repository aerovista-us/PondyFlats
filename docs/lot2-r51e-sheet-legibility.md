# Lot 2 — R5.1e sheet-legibility pass

**Status:** **DONE**  
**Rule:** Geometry is immutable. Presentation is editable.

**Revision:** `R5.1e-v1.0` · 2026-08-22  
**Kit:** [`../js/lot2-r51e-sheet.js`](../js/lot2-r51e-sheet.js)

This pass did **not** move buildings, openings, ridges, parking, posts, paths, setbacks, stairs, or any other design geometry. It moved text, leaders, dimension strings, title blocks, view framing, and annotation graphics.

## What was wrong

- Pennsylvania elevation: left height dims clipped off the sheet; right ridge labels collided and ran out of the viewBox; street label stacked on the 50.00′ string.
- Rear / sides / sections: titles and notes packed into the drawing; height text sat on floor lines.
- Site plan: 50.00′ dim collided with the Pennsylvania street name; several labels sat on top of walks and doors.
- Package page was a validation dump, not a v1.0 front door.

## What changed (presentation only)

- Shared sheet chrome: sheet number, title, revision `R5.1e-v1.0`, DESIGN COMPLETE stamp, validation-pending line, geometry-immutable note.
- Vertical dimension text rotated onto the dim line (CAD convention) so strings no longer stick off the sheet.
- Staggered dim offsets and larger viewBox margins.
- Short presentation labels (source plan-closure labels unchanged).
- [`../r51e-deliverable.html`](../r51e-deliverable.html) is the package front door: facts, sheet index, revision identity, pending disclaimer, SVG links.

## Sheet numbers

| No | Drawing |
| -- | ------- |
| G-001 | Cover / package |
| A-001 | Site plan |
| A-101 / A-102 | Ground / upper plans |
| A-201–A-204 | Penn / rear / north / south |
| A-301 / A-302 | Sections A-A / B-B |
| A-401 / A-402 | Massing / axon lock |

Axon camera remains frozen (`OX 62 · OY 455 · VB 1040×600`). Only a corner revision stamp was added.

## Related

- [`lot2-r51e-deliverable-v1.md`](lot2-r51e-deliverable-v1.md)
- [`lot2-r51e-v1-baseline.md`](lot2-r51e-v1-baseline.md)
- [`lot2-r51e-validation-readiness.md`](lot2-r51e-validation-readiness.md)
