from pathlib import Path
import re


def sub_once(path, pattern, repl, flags=0):
    p = Path(path)
    text = p.read_text()
    out, n = re.subn(pattern, repl, text, count=1, flags=flags)
    if n != 1:
        raise SystemExit(f"{path}: expected one regex match, got {n}")
    p.write_text(out)


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    n = text.count(old)
    if n != 1:
        raise SystemExit(f"{path}: expected one exact match, got {n}")
    p.write_text(text.replace(old, new, 1))


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
      circulation:{ok:false,status:'APPROACH_VERIFIED',blocking:true,detail:'Continuous Pennsylvania-to-garage-threshold approach/return is verified for the locked 20.5 ft x 8.0 ft vehicle. Complete garage parking/enclosure is unresolved because the nominal garage depth is 20 ft.'},
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
    """  if (key === 'design-3.html') {
    const hs=m.hubScope||{};
    if (hs.circulationPassClaim) out.push('Design 3 hub still claims circulation PASS/cleared');
    if (!hs.approachVerified) out.push('Design 3 hub missing garage-threshold approach scope');
    if (!hs.garageFitUnresolved) out.push('Design 3 hub missing unresolved full-garage-fit disclosure');
    const ma=m.modelAnalysis||{};
    if (ma.verdict!=='CONDITIONAL') out.push('Lot2Design3.analyze verdict must be CONDITIONAL, got '+String(ma.verdict));
    if (ma.circulationOk!==false || ma.circulationStatus!=='APPROACH_VERIFIED') out.push('Lot2Design3.analyze circulation must be unresolved APPROACH_VERIFIED');
    if (ma.garageFitOk!==false || ma.garageFitStatus!=='UNRESOLVED') out.push('Lot2Design3.analyze garage fit must remain unresolved');
    if (ma.plumbingOk!==false || ma.plumbingStatus!=='ADVISORY' || ma.plumbingBlocking!==false) out.push('Lot2Design3.analyze plumbing must be non-blocking ADVISORY');
  }
  if (key === 'd3-site.html') {"""
)
replace_once(
    qa,
    "    return {\n      title: document.title,\n      bodyTextLength: document.body.innerText.trim().length,",
    """    const bodyText=document.body.innerText.trim();
    const hubScope={
      circulationPassClaim:/(?:cleared|pass(?:ed)?)\\b[^.]{0,120}\\bcirculation\\b|\\bcirculation\\b[^.]{0,120}\\b(?:cleared|pass(?:ed)?)\\b/i.test(bodyText),
      approachVerified:/garage[-\\s]threshold|threshold approach/i.test(bodyText),
      garageFitUnresolved:/(?:full garage|parking\\/enclosure|parking fit)[^.\\n]{0,180}(?:unresolved|not claimed|separate design decision|is not)/i.test(bodyText),
    };
    const analysis=window.Lot2Design3&&typeof window.Lot2Design3.analyze==='function'?window.Lot2Design3.analyze():null;
    const modelAnalysis=analysis?{
      verdict:analysis.verdict,
      circulationOk:analysis.checks?.circulation?.ok,
      circulationStatus:analysis.checks?.circulation?.status||'',
      garageFitOk:analysis.checks?.garageFit?.ok,
      garageFitStatus:analysis.checks?.garageFit?.status||'',
      plumbingOk:analysis.checks?.plumbing?.ok,
      plumbingStatus:analysis.checks?.plumbing?.status||'',
      plumbingBlocking:analysis.checks?.plumbing?.blocking,
    }:null;
    return {
      title: document.title,
      bodyTextLength: bodyText.length,
      hubScope,
      modelAnalysis,"""
)

print('Design 3 model truth patch applied')
