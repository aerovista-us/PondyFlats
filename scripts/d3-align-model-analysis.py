from pathlib import Path
import re

js = Path('js/lot2-design-3.js')
text = js.read_text()
pattern = r"function analyze\(\)\{\n  return \{.*?\n  \};\n\}\n\nglobal\.Lot2Design3="
replacement = """function analyze(){
  return {
    verdict:'CONDITIONAL',
    rev:REV,
    freezeHash:FREEZE,
    candidate:LOCK.candidate,
    living:LOCK.intendedLiving,
    capacity:LOCK.netCapacity,
    roomPacking:LOCK.roomPacking,
    publicZone:LOCK.publicZone,
    clearanceFt:LOCK.clearanceFt,
    architecturalScore:LOCK.architecturalScore,
    checks:{
      frozenGeometry:{ok:true,detail:'All Design 3 presentation sheets read the same CFB-716 placement and drive lock.'},
      physical:{ok:true,detail:'Workbench physical/site gate passed.'},
      circulation:{ok:false,blocking:false,status:'APPROACH VERIFIED',scope:'threshold-approach',fullEnclosure:false,detail:'Continuous locked-vehicle approach/return is verified from Pennsylvania to both garage thresholds. Complete garage parking/enclosure is unresolved because the 20.5 ft vehicle exceeds the nominal 20 ft garage depth.'},
      program:{ok:true,detail:'Plan closure assigns A 1,914 SF and B 1,868 SF of authorized non-overlapping planning zones; both meet the 1,800 SF target.'},
      roomPacking:{ok:true,detail:'Room-packing score 99.30; all current packing checks pass.'},
      architecturalZoning:{ok:true,detail:'Public/private capacity, daylight, and mass coherence pass; plumbing alignment is tracked separately.'},
      plumbingCoordination:{ok:false,blocking:false,status:'ADVISORY',detail:'Wet-core/plumbing alignment is not closed in the current diagram and remains a non-blocking design-development coordination item.'}
    }
  };
}

global.Lot2Design3="""
out, n = re.subn(pattern, replacement, text, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f'lot2-design-3 analyze block: expected 1 match, got {n}')
js.write_text(out)

qa = Path('scripts/d3-render-qa.mjs')
text = qa.read_text()
needle = "  if (key === 'd3-site.html') {"
insert = """  const model=m.modelAnalysis;
  if (!model) out.push('missing Lot2Design3 model analysis');
  else {
    if (model.verdict !== 'CONDITIONAL') out.push('Lot2Design3.analyze verdict must be CONDITIONAL while garage fit/plumbing remain unresolved');
    const cir=model.checks?.circulation||{};
    if (cir.ok !== false || cir.blocking !== false || cir.status !== 'APPROACH VERIFIED' || cir.scope !== 'threshold-approach' || cir.fullEnclosure !== false) out.push('Lot2Design3 circulation analysis overstates the verified threshold-approach scope: '+JSON.stringify(cir));
    const plumbing=model.checks?.plumbingCoordination||{};
    if (plumbing.ok !== false || plumbing.blocking !== false || plumbing.status !== 'ADVISORY') out.push('Lot2Design3 plumbing analysis must remain a non-blocking advisory: '+JSON.stringify(plumbing));
    if (/wet-core[^.]{0,80}pass/i.test(model.checks?.architecturalZoning?.detail||'')) out.push('Lot2Design3 architectural analysis still claims wet-core PASS');
  }
  if (key === 'd3-site.html') {"""
if text.count(needle) != 1:
    raise SystemExit(f'QA resultFailures anchor: expected 1 match, got {text.count(needle)}')
text = text.replace(needle, insert, 1)
needle = "    const externalLinks=[...document.querySelectorAll('a[href]')]"
insert = """    const modelAnalysis=window.Lot2Design3?window.Lot2Design3.analyze():null;
    const externalLinks=[...document.querySelectorAll('a[href]')]"""
if text.count(needle) != 1:
    raise SystemExit(f'QA model metric anchor: expected 1 match, got {text.count(needle)}')
text = text.replace(needle, insert, 1)
needle = "      planGate,\n      localLinks,"
replacement = "      planGate,\n      modelAnalysis,\n      localLinks,"
if text.count(needle) != 1:
    raise SystemExit(f'QA return anchor: expected 1 match, got {text.count(needle)}')
qa.write_text(text.replace(needle, replacement, 1))

print('Design 3 model-level analysis patch applied')
