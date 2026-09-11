from pathlib import Path
import re


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one exact match, got {count}")
    p.write_text(text.replace(old, new, 1))


def sub_once(path, pattern, repl, flags=0):
    p = Path(path)
    text = p.read_text()
    out, count = re.subn(pattern, repl, text, count=1, flags=flags)
    if count != 1:
        raise SystemExit(f"{path}: expected one regex match, got {count}")
    p.write_text(out)


js = 'js/lot2-design-3.js'
new_analyze = '''function analyze(){
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
      circulation:{ok:false,status:'APPROACH_VERIFIED',blocking:true,scope:'threshold-approach',fullEnclosure:false,detail:'Continuous Pennsylvania-to-garage-threshold approach/return is verified for the locked 20.5 ft x 8.0 ft vehicle. Complete garage parking/enclosure is unresolved because the nominal garage depth is 20 ft.'},
      garageFit:{ok:false,status:'UNRESOLVED',blocking:true,detail:'The locked 20.5 ft vehicle exceeds the nominal 20 ft garage depth by 0.5 ft; complete enclosure is not claimed.'},
      program:{ok:true,detail:'Plan closure assigns A 1,914 SF and B 1,868 SF of authorized non-overlapping planning zones; both meet the 1,800 SF target.'},
      roomPacking:{ok:true,detail:'Room-packing score 99.30; all current packing checks pass.'},
      architecturalZoning:{ok:true,detail:'Public/private zoning, daylight, and mass coherence pass; plumbing coordination is tracked separately.'},
      plumbing:{ok:false,status:'ADVISORY',blocking:false,detail:'Wet-core vertical alignment is not closed in the current plan and remains a non-blocking design-development coordination item.'}
    }
  };
}'''
sub_once(js, r"function analyze\(\)\{.*?\n\}\n\nglobal\.Lot2Design3=", new_analyze + "\n\nglobal.Lot2Design3=", re.S)

qa = 'scripts/d3-render-qa.mjs'
replace_once(
    qa,
    "  if (key === 'd3-site.html') {",
    """  const model=m.modelAnalysis;
  if (!model) out.push('missing Lot2Design3 model analysis');
  else {
    if (model.verdict !== 'CONDITIONAL') out.push('Lot2Design3.analyze verdict must be CONDITIONAL while garage fit/plumbing remain unresolved');
    const cir=model.checks?.circulation||{};
    if (cir.ok !== false || cir.blocking !== true || cir.status !== 'APPROACH_VERIFIED' || cir.scope !== 'threshold-approach' || cir.fullEnclosure !== false) out.push('Lot2Design3 circulation analysis overstates or misstates the verified threshold-approach scope: '+JSON.stringify(cir));
    const fit=model.checks?.garageFit||{};
    if (fit.ok !== false || fit.blocking !== true || fit.status !== 'UNRESOLVED') out.push('Lot2Design3 garage fit must remain unresolved: '+JSON.stringify(fit));
    const plumbing=model.checks?.plumbing||{};
    if (plumbing.ok !== false || plumbing.blocking !== false || plumbing.status !== 'ADVISORY') out.push('Lot2Design3 plumbing analysis must remain a non-blocking advisory: '+JSON.stringify(plumbing));
    if (/wet-core[^.]{0,80}pass/i.test(model.checks?.architecturalZoning?.detail||'')) out.push('Lot2Design3 architectural analysis still claims wet-core PASS');
  }
  if (key === 'design-3.html') {
    const hs=m.hubScope||{};
    if (hs.circulationPassClaim) out.push('Design 3 hub still claims circulation PASS/cleared');
    if (!hs.approachVerified) out.push('Design 3 hub missing garage-threshold approach scope');
    if (!hs.garageFitUnresolved) out.push('Design 3 hub missing unresolved full-garage-fit disclosure');
  }
  if (key === 'd3-site.html') {"""
)
replace_once(
    qa,
    "    const externalLinks=[...document.querySelectorAll('a[href]')]",
    """    const bodyText=document.body.innerText.trim();
    const lowerBody=bodyText.toLowerCase();
    const hubScope={
      circulationPassClaim: lowerBody.includes('circulation gate cleared') || lowerBody.includes('circulation passed') || lowerBody.includes('circulation pass'),
      approachVerified: lowerBody.includes('garage-threshold approach verified') || lowerBody.includes('garage threshold approach verified'),
      garageFitUnresolved: lowerBody.includes('complete garage parking/enclosure remains unresolved') || lowerBody.includes('full enclosure / parking fit is not claimed') || lowerBody.includes('complete garage parking/enclosure is not'),
    };
    const modelAnalysis=window.Lot2Design3&&typeof window.Lot2Design3.analyze==='function'?window.Lot2Design3.analyze():null;
    const externalLinks=[...document.querySelectorAll('a[href]')]"""
)
replace_once(
    qa,
    "      bodyTextLength: document.body.innerText.trim().length,",
    "      bodyTextLength: bodyText.length,\n      hubScope,\n      modelAnalysis,"
)

print('Design 3 final model truth patch applied')
