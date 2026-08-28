# Workbench gaps — Design 1, Design 2, J family

What was missing, what it takes to fill, and **when it should have been filled**. Those fill-steps are now pipeline stages or Package checks in [`lot2-design-pipeline.md`](lot2-design-pipeline.md). Do not mutate frozen R5.1e to backfill. Do not resume J1.

| Gap | Where it showed | What filling takes | Best stage | If filled too late |
| --- | --------------- | ------------------ | ---------- | ------------------ |
| **Axon openings** — every door and window outlined (doors red `#c34232`, windows blue `#2a6496`) | **D1** clean axon locks garage doors only; pedestrian doors live on architectural massing with mixed colors. **D2** had garage doors + a few windows, no color rule, no Home B entry until v0.8. **J** locked east garage planes at 4.1; windows/trim were an afterthought that would not have saved ownership. | One openings list; draw them on A-401 / A-402 as SVG (`data-opening`); legend Door / Window. | **Package** (same moment as A-402) | Asking after the axon exists. Enforced now on new designs. D1 grandfathered (frozen). |
| **Openings schedule** — plans, elevations, and axon use the **same** door walls | **D2**: ENTRY A is the NW room on the plan; the axon puts ENTRY A on the Pennsylvania east wall. **D1** is tighter (plan-closure openings feed elevs). **J** never reached floor-plan sanity. | Named list: dwelling entries (wall + station), garage doors, windows. Plans, elevs, axon consume it. | **Arrange** (door faces are a layout choice), check again at **Package** | Pretty axon that contradicts the plan. Required on Design 3+. D2 still disagrees — do not freeze until it agrees. |
| **Read / own** — two homes look like homes; both front doors visible; would we choose this? | **J1-B** failed **ownership NO** only at Image 4.2, after geometry truth, massing, architectural massing, and a lock scaffold. Windows would not have fixed garage-first hierarchy. **D1** reads as two houses with north/south entries. **D2** still reads rear-garage + street duplex; pedestrian B is easy to miss. | A short Read pass after Arrange: pedestrian identity, two readable homes, garage-first labeled REVIEW. STOP if the user asked for freeze-quality and ownership is NO. | **Read** (after Arrange, **before** Package polish) | J1 spent the whole visual chain to learn “we would not build this.” |
| **Swept overlay** — vehicle envelope **drawn**, not only a clearance number | **D1** parking FULL PASS with freeze drawings. **D2** has REVIEW + 1.54′ in copy; site/axon show drive polylines, not the FS-SUV body. **J** kept Access A as the lock. | Overlay the polygonal sweep on A-001 (and the axon if useful). Record min clearance on the drawing. | **Travel** | A concept package that cannot show the turn. Required on Design 3+. |
| **Pedestrian walks** — street to each dwelling door on the site | **D1** has Walk A (Penn → north entry) and Walk B (spine → south entry) on the site engine. **D2** site is buildings + drive; no walks to ENTRY A/B. **J** pedestrian identity was weak by design. | Two walks on A-001 from Pennsylvania (or the declared access street) to each door. | **Package** (cheap after Arrange knows the doors) | A planner cannot see how people arrive. Required on Design 3+. |
| **Floor plans after the lock** | **J** cancelled floor-plan sanity after ownership NO (correct stop, but the gap is: never plan a J-like concept). **D1** has closure + exact rooms. **D2** has conceptual rooms + bubble. | A-101 / A-102 / A-103 from the lock. Do not skip because massing looks done. | **Package** | J1 Image 4 photoreal without a plan. Already required for new designs. |
| **Visual chain before pretty** | **J** Image 4 photoreal **DRIFT** (moved volumes). 4.1 lock then 4.2 layer-match was the repair. | Geometry → volumes → architecture → then paint. Photoreal that moves a wall **fails visualization**. | **Package** then **Polish** | Style archive that cannot be used as proof. Already a hard rule. |
| **Bubble diagram** | **D1** grandfathered without A-103. **D2** has it. **J** none. | A-103 topology before dimensioned plans. | **Package** | Rooms invented on the elevation. Required on new designs. |
| **North / west axon faces** | This camera shows east + south. **D2** openings only on those faces. **D1** architectural massing also puts ENTRY A north / ENTRY B south (north is the hidden side of the D2 camera). | Four elevations already show the hidden sides. Do not invent a second axon camera. Optional: note “north/west on A-203 / A-204.” | **Package** (elevs), not a second 3D view | A second camera that fights the lock. |
| **Professional validation** (zoning, fire, structural, survey) | **D1** tracker open. **D2** 5′ accessory rear is a hypothesis. **J** never got there. | Hand the package to reviewers. Do not redesign to “pass” a missing stamp. | **After Freeze** (or CONDITIONAL package as a concept, not a permit) | Treating a concept package as approved. |

## What not to do

- Do not mutate frozen R5.1e plates or the D1 axon lock to add red/blue openings.
- Do not reopen J1 to add windows. Ownership already failed on honest geometry.
- Do not skip **Read** because Travel PASSed. A swept-path PASS can still be a house nobody would choose.

## Enforcement

| Check | When | D1 | D2 | Design 3+ |
| ----- | ---- | -- | -- | --------- |
| `auditAxonOpenings` on A-401 / A-402 | Package | Grandfathered | **Now** (`npm run d2`) | Required |
| Openings schedule · Read · swept overlay · ped walks · plan/elev/axon agree | Arrange → Package | Partial (walks, plan-closure) | Gaps remain (see table) | Required |
