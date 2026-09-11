from pathlib import Path


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one match, got {count}")
    p.write_text(text.replace(old, new, 1))


replace_once(
    "design-3.html",
    '<p class="note">CFB-716 cleared the current Workbench physical, circulation, promotion, freeze, room-packing, public/private zoning, wet-core tolerance, daylight, and mass-coherence gates. Design-development plan closure is complete inside the frozen shell; professional structural, code, MEP, civil, and survey validation remains pending.</p>',
    '<p class="note">CFB-716 remains the current preferred candidate after the Workbench physical, promotion, freeze, room-packing, public/private zoning, daylight, and mass-coherence gates. Vehicle circulation is verified only for the Pennsylvania-to-garage-threshold approach/return envelope. Full garage parking/enclosure remains unresolved because the locked 20.5′ vehicle exceeds the nominal 20′ garage depth by 0.5′. Design-development plan closure is complete inside the frozen shell; professional structural, code, MEP, civil, and survey validation remains pending.</p>',
)
replace_once(
    "design-3.html",
    '<div class="metric"><small>A-002</small><strong><a href="d3-site.html#swept">Swept-path proof</a></strong></div>',
    '<div class="metric"><small>A-002</small><strong><a href="d3-site.html#swept">Garage-threshold approach</a></strong></div>',
)
replace_once(
    "design-3.html",
    "It is the new Workbench-selected third option and now has site, swept-path proof, design-development plan closure, bubble diagram, customer concept elevations, same-camera massing and axon, and concept section sheets.",
    "It is the new Workbench-selected third option and now has site, garage-threshold approach sweep, design-development plan closure, bubble diagram, customer concept elevations, same-camera massing and axon, and concept section sheets.",
)

qa = Path("scripts/d3-render-qa.mjs")
text = qa.read_text()
needle = "  if (key === 'd3-site.html') {"
insert = """  if (key === 'design-3.html') {\n    const hs=m.hubScope||{};\n    if (hs.circulationPassClaim) out.push('Design 3 hub still claims circulation PASS/cleared');\n    if (!hs.approachVerified) out.push('Design 3 hub missing garage-threshold approach scope');\n    if (!hs.garageFitUnresolved) out.push('Design 3 hub missing unresolved full-garage-fit disclosure');\n  }\n  if (key === 'd3-site.html') {"""
if text.count(needle) != 1:
    raise SystemExit(f"qa resultFailures insertion: expected one match, got {text.count(needle)}")
text = text.replace(needle, insert, 1)
needle = "    return {\n      title: document.title,\n      bodyTextLength: document.body.innerText.trim().length,"
replacement = """    const bodyText=document.body.innerText.trim();\n    const hubScope={\n      circulationPassClaim:/(?:cleared|pass(?:ed)?)\\b[^.]{0,120}\\bcirculation\\b|\\bcirculation\\b[^.]{0,120}\\b(?:cleared|pass(?:ed)?)\\b/i.test(bodyText),\n      approachVerified:/garage[-\\s]threshold|threshold approach/i.test(bodyText),\n      garageFitUnresolved:/(?:full garage|parking\\/enclosure|parking fit)[^.\\n]{0,160}(?:unresolved|not claimed|separate design decision)/i.test(bodyText),\n    };\n    return {\n      title: document.title,\n      bodyTextLength: bodyText.length,\n      hubScope,"""
if text.count(needle) != 1:
    raise SystemExit(f"qa metrics insertion: expected one match, got {text.count(needle)}")
qa.write_text(text.replace(needle, replacement, 1))
print("Design 3 hub scope patch applied")
