# Lot 2 — Design #2 accessory rear-yard hypothesis

**Status:** Strong code-supported hypothesis · **not permit approval**  
**Source:** [`setbacks-without-alley.pdf`](setbacks-without-alley.pdf) — CDA *Setbacks – Lots without Alley*  
**Track:** Design #2 / `PONDY-RGS-230` in [aerovista-us/lot-assessment](https://github.com/aerovista-us/lot-assessment)  
**Does not move:** frozen R5.1e-v1.1 in this repo (integrated plates, 20 / 25 / 5 / 10)

Handoff: `PONDY_DESIGN_2_HANDOFF.md`. Geometry authority remains Run 47 / solver, not presentation images. Live hub lock is the **family representative** in [`../js/lot2-design-2.js`](../js/lot2-design-2.js) — package [`../design-2.html`](../design-2.html) · write-up [`lot2-design-2-pipeline.md`](lot2-design-2-pipeline.md).

## What the city sheet shows

Page 1 is a typical interior lot **without an alley**. Principal yards:

| Yard | Dimension on the sheet |
| ---- | ---------------------- |
| Front | **20′** |
| Rear | **25′** |
| Interior side | **5′** |
| Other side (labeled 10′ on the diagram) | **10′** |

The same drawing places a **Garage** **inside** that 25′ rear yard, with **5′** to the rear lot line and **5′** to the side lot line. Caption: *Only detached structures may encroach 3 feet beyond the 25 rear yard.* Garage **maximum height = 18 feet** for that encroachment case.

That diagram is the unlock. The 25′ rear dimension is the **principal** rear yard. Detached garage mass is drawn **in** that yard, not behind a second 25′ garage setback.

Page 2 quotes the code that drawing is implementing:

**§17.06.425** — setbacks for accessory structures located in the rear twenty-five feet of a lot:

1. **Side:** 5′ (3′ only if the roof does not slope toward that side). Detached accessory may encroach up to 3′ **beyond** the 25′ rear yard if height ≤ 18′.
2. **Rear:** 5′ (3′ if the roof does not slope toward the rear; alley lots may use 3′ regardless of roof slope). Same 3′ / 18′ encroachment beyond the 25′ rear yard.

**§17.06.460** — garages or carports **directly accessed to the street** set back 20′ from the property line or public sidewalk, whichever is greater.

Design #2 uses the **normal 5′** accessory targets. It does **not** take the 3′ roof-slope exceptions. The south garage is held at about a **6′ actual side buffer**. Rear-apron-fed doors are not “directly accessed to the street,” so the 20′ street-garage rule is the Pennsylvania-facing drive condition, not a rear-lot-line garage setback.

Accessory *classification* (detached, ≥6′ from the principal, no living space) is still **§17.06.630 / §17.06.495.C.1**. The sheet in this folder is the **yard diagram + §17.06.425 / .460** source.

## Previous assumption (wrong for detached garages)

The **25′ principal rear setback** was applied to the rear garages as well.

On this drawing convention (+X toward Pennsylvania / right, origin at rear-left), that stopped garage mass around **x ≈ 25**. A 20×20 box then occupied roughly **x = 25–45**, eating the same band the duplex needed for separation and turning. The site compressed toward Pennsylvania.

R5.1e still uses that principal envelope for the **homes**. Plate B sits at x=28, 3′ inside the 25′ rear line. That is correct for a principal duplex. It is the wrong envelope for a **detached private garage**.

## Design consequence

Under the sheet’s accessory-yard provisions, rear target is **5′**, not **25′**.

That recovers **~20′ of usable rear depth** for garage placement **without a setback variance**:

- Garage west face can sit near **x ≈ 5** instead of **x ≈ 25**
- 20×20 stack occupies the former dead rear yard (the hatched garage on page 1)
- The band that used to be garage (≈ x=25–45) becomes **separation + local maneuvering** between duplex and garage mouths

That is what made the rear-garage-stack concept practical. Run 47’s ~1.50 ft promotion clearance is circulation on that recovered geometry, not a zoning waiver.

## Keep true

- Accessory classification is a **planning hypothesis** until CDA confirms it on this parcel.
- Maintain genuine garage-to-duplex separation (**solver min 6′**; more is better).
- No living / sleeping in the garages.
- Pennsylvania-only vehicle access unchanged.
- Do not apply this 5′ rear target to the **principal duplex**. Homes stay on the sheet’s 20 / 25 / 5 / 10 principal yards.
- Do not rewrite frozen R5.1e plates from this finding.

## Related

- [`setbacks-without-alley.pdf`](setbacks-without-alley.pdf) — **source drawing + quoted sections**
- [`lot2-design-2-pipeline.md`](lot2-design-2-pipeline.md) — D2-v0.8 proof + customer package
- [`../design-2.html`](../design-2.html) — Design 2 front door
- [`lot2-r51e-validation-readiness.md`](lot2-r51e-validation-readiness.md) — R5.1e zoning still 20 / 25 / 5 / 10
- [`lot2-r51e-site-plan.md`](lot2-r51e-site-plan.md) — principal envelope as drawn
