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
replace_once(js, "const REV='D3-CFB716-v0.4';", "const REV='D3-CFB716-v0.5';")
replace_once(
    js,
    "const SURVEY=[[0,0],[148,0],[148,50],[125.143,43.016],[84.813,43.016],[0,57.01]];",
    """const SURVEY=[[0,0],[148,0],[148,50],[125.143,43.016],[84.813,43.016],[0,57.01]];
const SOUTH_BOUNDARY=[[0,57.01],[84.813,43.016],[125.143,43.016],[148,50]];
const SETBACKS={
  status:'CONDITIONAL',
  source:'Setbacks - Lots without Alley · project reference',
  confirmed:false,
  legalFit:false,
  frontFt:20,
  rearFt:25,
  sideOptionsFt:[5,10],
  sideAssignment:'UNCONFIRMED'
};"""
)

helpers = r'''function pointSegDistance(p,a,b){
  const dx=b[0]-a[0],dy=b[1]-a[1],den=dx*dx+dy*dy||1;
  const t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/den));
  return Math.hypot(p[0]-(a[0]+t*dx),p[1]-(a[1]+t*dy));
}
function segmentDistance(a,b,c,d){return Math.min(pointSegDistance(a,c,d),pointSegDistance(b,c,d),pointSegDistance(c,a,b),pointSegDistance(d,a,b))}
function rectPolylineClearance(p,line){
  const q=[[p.x,p.y],[p.x+p.w,p.y],[p.x+p.w,p.y+p.d],[p.x,p.y+p.d]],edges=[[0,1],[1,2],[2,3],[3,0]];
  let min=Infinity;
  for(const [i,j] of edges)for(let k=0;k<line.length-1;k++)min=Math.min(min,segmentDistance(q[i],q[j],line[k],line[k+1]));
  return min;
}
function analyzeSetbacks(){
  const occupied=LOCK.placements;
  const frontClearanceFt=148-Math.max(...occupied.map(p=>p.x+p.w));
  const rearClearanceFt=Math.min(...occupied.map(p=>p.x));
  const northClearanceFt=Math.min(...occupied.map(p=>p.y));
  const southClearanceFt=Math.min(...occupied.map(p=>rectPolylineClearance(p,SOUTH_BOUNDARY)));
  const north5South10={northFt:5,southFt:10,ok:northClearanceFt>=5&&southClearanceFt>=10};
  const north10South5={northFt:10,southFt:5,ok:northClearanceFt>=10&&southClearanceFt>=5};
  return {
    ok:false,status:'CONDITIONAL',blocking:false,confirmed:false,legalFit:false,
    source:SETBACKS.source,sideAssignment:SETBACKS.sideAssignment,
    required:{frontFt:SETBACKS.frontFt,rearFt:SETBACKS.rearFt,sideOptionsFt:[...SETBACKS.sideOptionsFt]},
    clearances:{frontFt:frontClearanceFt,rearFt:rearClearanceFt,northFt:northClearanceFt,southFt:southClearanceFt},
    scenarios:{north5South10,north10South5},
    detail:`Concept setback evidence only: front ${frontClearanceFt.toFixed(2)} ft / rear ${rearClearanceFt.toFixed(2)} ft / north ${northClearanceFt.toFixed(2)} ft / south ${southClearanceFt.toFixed(2)} ft. The project reference shows 5 ft and 10 ft side yards, but side assignment is not confirmed. Neither orientation is asserted as legal-fit proof; city/zoning confirmation remains required.`
  };
}
function lineIntersection(a,b,c,d){
  const x1=a[0],y1=a[1],x2=b[0],y2=b[1],x3=c[0],y3=c[1],x4=d[0],y4=d[1];
  const den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
  if(Math.abs(den)<1e-9)return null;
  return [((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/den,((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/den];
}
function offsetOpenPolyline(points,d){
  const lines=[];
  for(let i=0;i<points.length-1;i++){
    const a=points[i],b=points[i+1],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1,nx=dy/len,ny=-dx/len;
    lines.push([[a[0]+nx*d,a[1]+ny*d],[b[0]+nx*d,b[1]+ny*d]]);
  }
  const out=[lines[0][0]];
  for(let i=1;i<lines.length;i++)out.push(lineIntersection(lines[i-1][0],lines[i-1][1],lines[i][0],lines[i][1])||lines[i][0]);
  out.push(lines[lines.length-1][1]);
  return out;
}

'''
replace_once(js, "function renderSite(){", helpers + "function renderSite(){")

new_site = r'''function renderSite(){
  const W=1200,H=735,s=6.15,ox=90,oy=170,ink=COLORS.navy;
  const homes=LOCK.placements.filter(p=>p.kind==='home');
  const garages=LOCK.placements.filter(p=>p.kind==='garage');
  const drives=LOCK.drives.map(d=>`<polyline points="${poly(d.points,s,s,ox,oy)}" fill="none" stroke="#a5aaa8" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${poly(d.points,s,s,ox,oy)}" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="8 7"/>`).join('');
  const building=(p,fill)=>`<g filter="url(#siteShadow)">${rect(p.x,p.y,p.w,p.d,s,s,ox,oy,fill)}</g>`;
  const sb=analyzeSetbacks(),south5=offsetOpenPolyline(SOUTH_BOUNDARY,5),south10=offsetOpenPolyline(SOUTH_BOUNDARY,10);
  const setInk='#a85f2a';
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 frozen site plan with conditional setback evidence" data-setback-status="${sb.status}" data-setback-confirmed="${sb.confirmed}" data-setback-legal-fit="${sb.legalFit}" data-setback-front-ft="${SETBACKS.frontFt}" data-setback-rear-ft="${SETBACKS.rearFt}" data-setback-side-options="5,10" data-setback-side-assignment="${SETBACKS.sideAssignment}" data-front-clearance-ft="${sb.clearances.frontFt.toFixed(3)}" data-rear-clearance-ft="${sb.clearances.rearFt.toFixed(3)}" data-north-clearance-ft="${sb.clearances.northFt.toFixed(3)}" data-south-clearance-ft="${sb.clearances.southFt.toFixed(3)}">
  <defs><filter id="siteShadow"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-opacity=".12"/></filter></defs>
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  <text x="70" y="58" font-size="30" font-family="Georgia,serif" fill="${ink}">A-001 · CFB-716 frozen site plan</text>
  <text x="70" y="87" font-size="14" fill="${COLORS.muted}">Preferred Design 3 placement · Pennsylvania-only access · setback reading shown as CONDITIONAL evidence, not legal-fit proof</text>
  <g transform="translate(72,112)"><path d="M0 26 L0 0 L5 9 L10 0 L10 26" fill="none" stroke="${ink}" stroke-width="2"/><text x="5" y="-6" text-anchor="middle" font-size="10" font-weight="900" fill="${ink}">N</text></g>
  <rect x="1010" y="138" width="140" height="380" rx="12" fill="#deddd8"/>
  <line x1="1080" y1="150" x2="1080" y2="506" stroke="#ffffff" stroke-width="3" stroke-dasharray="16 14" opacity=".9"/>
  <text x="1118" y="328" transform="rotate(90 1118 328)" text-anchor="middle" font-size="14" font-weight="900" fill="#5e6262">PENNSYLVANIA STREET</text>
  <text x="1048" y="328" transform="rotate(90 1048 328)" text-anchor="middle" font-size="10" font-weight="800" fill="#8b3b31">MODELED ACCESS ONLY</text>
  <polygon points="${poly(SURVEY,s,s,ox,oy)}" fill="${COLORS.lot}" stroke="${COLORS.line}" stroke-width="2.4"/>
  <g aria-label="Conditional setback overlay" fill="none" stroke="${setInk}">
    <line x1="${(25*s+ox).toFixed(1)}" y1="${oy}" x2="${(25*s+ox).toFixed(1)}" y2="${(57.01*s+oy).toFixed(1)}" stroke-width="2.2" stroke-dasharray="10 7"/>
    <line x1="${(128*s+ox).toFixed(1)}" y1="${oy}" x2="${(128*s+ox).toFixed(1)}" y2="${(50*s+oy).toFixed(1)}" stroke-width="2.2" stroke-dasharray="10 7"/>
    <line x1="${ox}" y1="${(5*s+oy).toFixed(1)}" x2="${(148*s+ox).toFixed(1)}" y2="${(5*s+oy).toFixed(1)}" stroke-width="1.7" stroke-dasharray="6 6" opacity=".9"/>
    <line x1="${ox}" y1="${(10*s+oy).toFixed(1)}" x2="${(148*s+ox).toFixed(1)}" y2="${(10*s+oy).toFixed(1)}" stroke-width="1.4" stroke-dasharray="3 6" opacity=".65"/>
    <polyline points="${poly(south5,s,s,ox,oy)}" stroke-width="1.7" stroke-dasharray="6 6" opacity=".9"/>
    <polyline points="${poly(south10,s,s,ox,oy)}" stroke-width="1.4" stroke-dasharray="3 6" opacity=".65"/>
  </g>
  <g fill="${setInk}" font-size="9.5" font-weight="900">
    <text x="${(25*s+ox+8).toFixed(1)}" y="158">REAR 25′</text>
    <text x="${(128*s+ox-8).toFixed(1)}" y="158" text-anchor="end">FRONT 20′</text>
    <text x="110" y="${(5*s+oy-6).toFixed(1)}">SIDE 5′</text>
    <text x="110" y="${(10*s+oy-6).toFixed(1)}" opacity=".72">SIDE 10′ ALT.</text>
  </g>
  ${drives}
  ${homes.map(p=>building(p,p.unit==='A'?COLORS.homeA:COLORS.homeB)).join('')}
  ${garages.map(p=>building(p,COLORS.garage)).join('')}
  ${label(104.5,7,'UNIT A',s,s,ox,oy,13)}
  ${label(41,7.5,'UNIT B',s,s,ox,oy,13)}
  ${label(118,18.5,'GARAGE A',s,s,ox,oy,10)}
  ${label(47,27.5,'GARAGE B',s,s,ox,oy,10)}
  <g transform="translate(70,548)">
    <rect width="1060" height="78" rx="10" fill="#fff8f0" stroke="#d9b28e"/>
    <text x="18" y="21" font-size="11" font-weight="900" fill="${setInk}">SETBACK EVIDENCE · CONDITIONAL · CITY / ZONING CONFIRMATION REQUIRED</text>
    <text x="18" y="41" font-size="10.5" fill="${COLORS.muted}">Project reference: 20′ front · 25′ rear · side yards 5′ + 10′. Which side receives 10′ is not confirmed, so both side interpretations are drawn.</text>
    <text x="18" y="59" font-size="10.5" fill="${COLORS.muted}">Frozen clearances: front ${sb.clearances.frontFt.toFixed(2)}′ · rear ${sb.clearances.rearFt.toFixed(2)}′ · north ${sb.clearances.northFt.toFixed(2)}′ · south ${sb.clearances.southFt.toFixed(2)}′. N5/S10 = ${sb.scenarios.north5South10.ok?'PASS':'REVIEW'} · N10/S5 = ${sb.scenarios.north10South5.ok?'PASS':'CONFLICT'}.</text>
    <text x="18" y="72" font-size="9.5" fill="${setInk}">This overlay documents the unresolved setback scenario; it does not assert zoning, permit, or legal compliance.</text>
  </g>
  <g transform="translate(70,638)">
    <rect width="1060" height="62" rx="10" fill="#ffffffea" stroke="#d8d2ca"/>
    <text x="18" y="22" font-size="11" font-weight="900" fill="${ink}">GEOMETRY AUTHORITY · CFB-716 FREEZE ${FREEZE.slice(0,12)}…</text>
    <text x="18" y="42" font-size="10.5" fill="${COLORS.muted}">Presentation may change; property boundary, home/garage placements, drive paths, and Pennsylvania access may not.</text>
    <g transform="translate(690,15)"><rect width="18" height="18" rx="3" fill="${COLORS.homeA}" stroke="#999"/><text x="26" y="13" font-size="9.5" fill="${COLORS.muted}">home</text><rect x="92" width="18" height="18" rx="3" fill="${COLORS.garage}" stroke="#888"/><text x="118" y="13" font-size="9.5" fill="${COLORS.muted}">garage</text><line x1="196" y1="9" x2="235" y2="9" stroke="#a5aaa8" stroke-width="12" stroke-linecap="round"/><text x="244" y="13" font-size="9.5" fill="${COLORS.muted}">vehicle route</text></g>
  </g>
  </svg>`;
}'''
sub_once(js, r"function renderSite\(\)\{.*?\n\}\n\nfunction renderSweptPath\(\)\{", new_site + "\n\nfunction renderSweptPath(){", re.S)

replace_once(js, "function analyze(){\n  return {", "function analyze(){\n  const setbacks=analyzeSetbacks();\n  return {")
replace_once(
    js,
    "      architecturalZoning:{ok:true,detail:'Public/private zoning, daylight, and mass coherence pass; plumbing coordination is tracked separately.'},\n      plumbing:{ok:false,status:'ADVISORY',blocking:false,detail:'Wet-core vertical alignment is not closed in the current plan and remains a non-blocking design-development coordination item.'}",
    "      architecturalZoning:{ok:true,detail:'Public/private zoning, daylight, and mass coherence pass; plumbing coordination is tracked separately.'},\n      setbacks:{...setbacks},\n      plumbing:{ok:false,status:'ADVISORY',blocking:false,detail:'Wet-core vertical alignment is not closed in the current plan and remains a non-blocking design-development coordination item.'}"
)
replace_once(
    js,
    "global.Lot2Design3={REV,LOCK,VEHICLE,OPENINGS,PLAN,COLORS,analyze,projectAxonOpening,renderSite,renderSweptPath,renderFloor,renderElev,renderMassing,renderAxon,renderSections};",
    "global.Lot2Design3={REV,LOCK,VEHICLE,SETBACKS,OPENINGS,PLAN,COLORS,analyze,analyzeSetbacks,projectAxonOpening,renderSite,renderSweptPath,renderFloor,renderElev,renderMassing,renderAxon,renderSections};"
)

site = 'd3-site.html'
replace_once(
    site,
    '<div class="warn">A-002 validates the on-lot approach envelope to the garage thresholds only. The locked 20.5′ vehicle is 0.5′ longer than the nominal 20′ garage depth; garage fit requires a separate design decision.</div></section>',
    '<div class="warn">A-002 validates the on-lot approach envelope to the garage thresholds only. The locked 20.5′ vehicle is 0.5′ longer than the nominal 20′ garage depth; garage fit requires a separate design decision.</div><div class="warn"><strong>SETBACKS · CONDITIONAL.</strong> A-001 overlays the project reference reading of 20′ front, 25′ rear, and 5′ / 10′ side yards. Side-yard assignment is not yet confirmed. Frozen-wall clearances are calculated on the drawing and both side interpretations remain visible; city / zoning confirmation is required before treating this as legal-fit or permit evidence.</div></section>'
)
replace_once(
    site,
    '<figcaption><strong>A-001.</strong> Frozen site geometry. Presentation may change; placements and drive paths may not.</figcaption>',
    '<figcaption><strong>A-001.</strong> Frozen site geometry plus conditional setback evidence. The overlay documents the current source reading and unresolved side-yard assignment; it is not a zoning or permit determination.</figcaption>'
)

qa = 'scripts/d3-render-qa.mjs'
replace_once(
    qa,
    "    const plumbing=model.checks?.plumbing||{};\n    if (plumbing.ok !== false || plumbing.blocking !== false || plumbing.status !== 'ADVISORY') out.push('Lot2Design3 plumbing analysis must remain a non-blocking advisory: '+JSON.stringify(plumbing));",
    """    const plumbing=model.checks?.plumbing||{};
    if (plumbing.ok !== false || plumbing.blocking !== false || plumbing.status !== 'ADVISORY') out.push('Lot2Design3 plumbing analysis must remain a non-blocking advisory: '+JSON.stringify(plumbing));
    const setbacks=model.checks?.setbacks||{};
    if (setbacks.ok !== false || setbacks.status !== 'CONDITIONAL' || setbacks.confirmed !== false || setbacks.legalFit !== false || setbacks.sideAssignment !== 'UNCONFIRMED') out.push('Lot2Design3 setback analysis must remain explicitly conditional/unconfirmed: '+JSON.stringify(setbacks));
    if ((setbacks.clearances?.frontFt||0) < 20-1e-6 || (setbacks.clearances?.rearFt||0) < 25-1e-6) out.push('A-001 front/rear setback evidence does not reach the 20/25 ft project-reference lines: '+JSON.stringify(setbacks.clearances||{}));
    if (!Array.isArray(setbacks.required?.sideOptionsFt) || setbacks.required.sideOptionsFt.join(',') !== '5,10') out.push('A-001 must preserve the project-reference 5/10 ft side-yard alternatives');"""
)
replace_once(
    qa,
    "  if (key === 'd3-site.html') {\n    const sm=m.sweepMeta || {};",
    """  if (key === 'd3-site.html') {
    const sb=m.setbackMeta||{};
    if (sb.status!=='CONDITIONAL' || sb.confirmed!==false || sb.legalFit!==false || sb.sideAssignment!=='UNCONFIRMED') out.push('A-001 rendered setback metadata is missing truthful CONDITIONAL/unconfirmed scope: '+JSON.stringify(sb));
    if (Math.abs((sb.frontFt||0)-20)>1e-6 || Math.abs((sb.rearFt||0)-25)>1e-6 || sb.sideOptions!=='5,10') out.push('A-001 rendered setback overlay does not match 20 front / 25 rear / 5+10 side project reference');
    if (Math.abs((sb.frontClearanceFt||0)-20)>.01 || Math.abs((sb.rearClearanceFt||0)-25)>.01 || Math.abs((sb.northClearanceFt||0)-5)>.01 || !(sb.southClearanceFt>9.9&&sb.southClearanceFt<10)) out.push('A-001 frozen-wall setback clearance evidence drifted: '+JSON.stringify(sb));
    if (!/setbacks?\\s*·?\\s*conditional/i.test(m.bodyText||'') || !/city\\s*\\/\\s*zoning confirmation/i.test(m.bodyText||'')) out.push('A-001 customer copy must disclose conditional setbacks and city/zoning confirmation');
    const sm=m.sweepMeta || {};"""
)
replace_once(
    qa,
    "    const sweepEl=document.querySelector('#swept-path svg');\n    const sweepMeta=sweepEl?{proofScope:",
    """    const setbackEl=document.querySelector('#drawing svg');
    const setbackMeta=setbackEl?{status:setbackEl.getAttribute('data-setback-status')||'',confirmed:setbackEl.getAttribute('data-setback-confirmed')==='true',legalFit:setbackEl.getAttribute('data-setback-legal-fit')==='true',frontFt:Number(setbackEl.getAttribute('data-setback-front-ft')),rearFt:Number(setbackEl.getAttribute('data-setback-rear-ft')),sideOptions:setbackEl.getAttribute('data-setback-side-options')||'',sideAssignment:setbackEl.getAttribute('data-setback-side-assignment')||'',frontClearanceFt:Number(setbackEl.getAttribute('data-front-clearance-ft')),rearClearanceFt:Number(setbackEl.getAttribute('data-rear-clearance-ft')),northClearanceFt:Number(setbackEl.getAttribute('data-north-clearance-ft')),southClearanceFt:Number(setbackEl.getAttribute('data-south-clearance-ft'))}:null;
    const sweepEl=document.querySelector('#swept-path svg');
    const sweepMeta=sweepEl?{proofScope:"""
)
replace_once(
    qa,
    "      bodyTextLength: bodyText.length,\n      hubScope,",
    "      bodyTextLength: bodyText.length,\n      bodyText,\n      hubScope,"
)
replace_once(
    qa,
    "      vehicleBodies,\n      sweepMeta,",
    "      vehicleBodies,\n      setbackMeta,\n      sweepMeta,"
)

print('Design 3 conditional setback evidence patch applied')
