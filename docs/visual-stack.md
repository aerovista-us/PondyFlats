# Pondy Flats visual stack

## Goal
Use one geometry source from survey coordinates through plan, 3D massing, elevations, perspectives, and styled renders. Generative image tools may style approved geometry, but may not establish or alter geometry.

## Locked source chain

1. `js/lot2-sot.js` — parcel / frontage / orientation SOT.
2. `js/lot2-geometry.js` — concept polygons, setbacks, access, validation.
3. `js/lot2-render-core.js` — deterministic 2D rendering and export helpers.
4. Deterministic 3D adapter — same coordinates extruded to Three.js/Blender.
5. Architectural materials / roofs / openings — applied to frozen volumes only.
6. Optional generative styling — reference-image edit only, never geometry creation.

## Preferred stack

### Tier 1 — exact plan graphics
- SVG + JavaScript.
- No build step required.
- Source units remain feet.
- Export SVG directly; raster PNG only as a derivative.
- Pennsylvania remains RIGHT; North / Rear remains LEFT.

### Tier 2 — exact interactive 3D
- Three.js, with geometry built directly from the same concept polygons.
- One foot in source data maps to one Three.js world unit.
- Orthographic and perspective cameras are saved as named presets.
- Mesh transforms are generated from source coordinates; hand positioning is prohibited for frozen geometry.

### Tier 3 — high-quality deterministic renders
- Blender is preferred for final physically based rendering when available on NXCore.
- Generate/import geometry from a machine-readable export produced by the repo (JSON/OBJ/glTF), rather than remodeling by eye.
- Camera coordinates should be stored with the model and committed.

### Tier 4 — generative finishing
- Optional only.
- Input must be an approved deterministic render.
- Allowed: materials, sky, vegetation, people, atmospheric lighting, texture refinement.
- Not allowed: moving walls, resizing masses, adding/removing garage bays, changing roof count/position, changing drive/entry geometry, rotating the lot, or changing Pennsylvania orientation.

## Immediate implementation order

1. Add reusable deterministic SVG renderer (`lot2-render-core.js`).
2. Rebuild J1-B technical top-down from frozen repo coordinates only.
3. Produce an architectural top-down by layering visual treatments over that same SVG geometry.
4. Add Three.js massing page using the same coordinate objects.
5. Audit NXCore for Node/npm, Three.js, Blender, Chromium/Playwright, and GPU capability before deciding whether Blender lives on NXCore or remains a workstation render step.

## NXCore audit commands

Run on NXCore when shell access is available:

```bash
node --version
npm --version
python3 --version
which blender && blender --version
which chromium || which chromium-browser || which google-chrome
nvidia-smi || true
find /srv /opt /home -maxdepth 4 -type d -iname '*three*' 2>/dev/null | head -100
find /srv /opt /home -maxdepth 5 -type f \( -name 'package.json' -o -name 'vite.config.*' \) 2>/dev/null | head -200
```

Then search package manifests for relevant tooling:

```bash
grep -R --include='package.json' -nE '"(three|@react-three|vite|playwright|puppeteer)"' /srv /opt /home 2>/dev/null | head -200
```

## Rule
If a visual cannot be regenerated from committed geometry data, it is reference art, not truth.