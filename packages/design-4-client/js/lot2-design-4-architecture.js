(function(global){
'use strict';

const D4=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4.js'):global.Lot2Design4;
const PLAN=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-plan-closure.js'):global.Lot2Design4PlanClosure;
const ROOF=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-roof-sot.js'):global.Lot2Design4RoofSOT;
if(!D4||!PLAN) throw new Error('Design 4 architecture requires geometry and plan-closure models');

const REV='D4-ARCH-v0.6';
const COLORS={paper:'#fbfaf7',ink:'#132238',muted:'#68727d',homeA:'#d9b56d',homeB:'#ead495',garage:'#8ca58b',roof:'#394957',glass:'#dceeff',entry:'#f8e2df',ground:'#e6e0d4',line:'#405064',warn:'#a9612b',door:'#b3261e',window:'#2367b1'};
const HEIGHTS={home:20,garage:11,floor:10};

const OPENINGS=Object.freeze([
  ...PLAN.ENTRIES.map(e=>Object.freeze({id:e.id,role:'entry',unit:e.unit,face:e.face,x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,z1:0,z2:7})),
  Object.freeze({id:'GARAGE-B-OVERHEAD',role:'garage-overhead',unit:'B',face:'east',x1:27,y1:6,x2:27,y2:26,z1:0,z2:8}),
  Object.freeze({id:'GARAGE-A-OVERHEAD',role:'garage-overhead',unit:'A',face:'east',x1:27,y1:30,x2:27,y2:50,z1:0,z2:8}),
  Object.freeze({id:'A-E-W1',role:'window',unit:'A',face:'east',x1:128,y1:8,x2:128,y2:13,z1:3,z2:7}),
  Object.freeze({id:'A-E-W2',role:'window',unit:'A',face:'east',x1:128,y1:17,x2:128,y2:22,z1:3,z2:7}),
  Object.freeze({id:'A-E-U1',role:'window',unit:'A',face:'east',x1:128,y1:8,x2:128,y2:13,z1:13,z2:17}),
  Object.freeze({id:'A-E-U2',role:'window',unit:'A',face:'east',x1:128,y1:17,x2:128,y2:22,z1:13,z2:17}),
  Object.freeze({id:'A-N-W1',role:'window',unit:'A',face:'north',x1:99,y1:5,x2:105,y2:5,z1:3,z2:7}),
  Object.freeze({id:'A-N-U1',role:'window',unit:'A',face:'north',x1:114,y1:5,x2:121,y2:5,z1:13,z2:17}),
  Object.freeze({id:'A-S-W1',role:'window',unit:'A',face:'south',x1:100,y1:31.25,x2:107,y2:31.25,z1:3,z2:7}),
  Object.freeze({id:'A-S-U1',role:'window',unit:'A',face:'south',x1:114,y1:31.25,x2:121,y2:31.25,z1:13,z2:17}),
  Object.freeze({id:'B-E-W1',role:'window',unit:'B',face:'east',x1:94.5,y1:8,x2:94.5,y2:13,z1:3,z2:7}),
  Object.freeze({id:'B-E-W2',role:'window',unit:'B',face:'east',x1:94.5,y1:18,x2:94.5,y2:23,z1:3,z2:7}),
  Object.freeze({id:'B-E-U1',role:'window',unit:'B',face:'east',x1:94.5,y1:8,x2:94.5,y2:13,z1:13,z2:17}),
  Object.freeze({id:'B-E-U2',role:'window',unit:'B',face:'east',x1:94.5,y1:18,x2:94.5,y2:23,z1:13,z2:17}),
  Object.freeze({id:'B-S-W1',role:'window',unit:'B',face:'south',x1:76,y1:31.25,x2:82,y2:31.25,z1:3,z2:7}),
  Object.freeze({id:'B-S-U1',role:'window',unit:'B',face:'south',x1:76,y1:31.25,x2:83,y2:31.25,z1:13,z2:17}),
  Object.freeze({id:'B-N-W1',role:'window',unit:'B',face:'north',x1:59,y1:5,x2:65,y2:5,z1:3,z2:7}),
  Object.freeze({id:'B-N-U1',role:'window',unit:'B',face:'north',x1:76,y1:5,x2:83,y2:5,z1:13,z2:17})
]);

function homePoly(h){return h.poly||[[h.x,h.y],[h.x+h.w,h.y],[h.x+h.w,h.y+h.d],[h.x,h.y+h.d]]}
function rectPoly(r){return [[r.x,r.y],[r.x+r.w,r.y],[r.x+r.w,r.y+r.d],[r.x,r.y+r.d]]}
function extents(poly){const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);return {minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys)};}
function pointInPoly(p,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];const hit=((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/((b[1]-a[1])||1e-9)+a[0]);if(hit)inside=!inside;}return inside}
function faceSegments(poly,face){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;if(Math.abs(a[1]-b[1])<1e-6){if(face==='north'&&!pointInPoly([mx,my-.05],poly))out.push([a,b]);if(face==='south'&&!pointInPoly([mx,my+.05],poly))out.push([a,b]);}else if(Math.abs(a[0]-b[0])<1e-6){if(face==='west'&&!pointInPoly([mx-.05,my],poly))out.push([a,b]);if(face==='east'&&!pointInPoly([mx+.05,my],poly))out.push([a,b]);}}return out}
function openingLength(o){return Math.hypot(o.x2-o.x1,o.y2-o.y1)}
function faceAxis(face,o){return (face==='east'||face==='west')?[o.y1,o.y2]:[o.x1,o.x2]}
function segmentAxis(face,s){return (face==='east'||face==='west')?[s[0][1],s[1][1]]:[s[0][0],s[1][0]]}
function faceOpenings(unit,face){return OPENINGS.filter(o=>o.unit===unit&&o.face===face)}
function openingKind(role){return role==='window'?'window':'door'}
function openingStroke(role){return openingKind(role)==='window'?COLORS.window:COLORS.door}
function openingFill(role){return openingKind(role)==='window'?COLORS.glass:COLORS.entry}
function openingOnSegments(o,segs,face){const ax=faceAxis(face,o),lo=Math.min(...ax),hi=Math.max(...ax),plane=(face==='east'||face==='west')?o.x1:o.y1;return segs.some(s=>{const sa=segmentAxis(face,s),slo=Math.min(...sa),shi=Math.max(...sa),sp=(face==='east'||face==='west')?s[0][0]:s[0][1];return Math.abs(sp-plane)<.02&&lo>=slo-.02&&hi<=shi+.02})}
function roofOwnerId(kind,unit){return `${kind==='garage'?'garage':'home'}-${String(unit).toLowerCase()}`}
function roofStatus(kind,unit){
  const ownerId=roofOwnerId(kind,unit);
  if(!ROOF||typeof ROOF.statusForOwner!=='function')return {ownerId,status:'NO_MODEL',authoritative:false,renderPolicy:'SUPPRESS_ROOF',reason:'Roof SOT unavailable.'};
  return ROOF.statusForOwner(ownerId);
}
function roofFor(kind,unit){
  const status=roofStatus(kind,unit);
  if(!status.authoritative||!ROOF||typeof ROOF.roofForOwner!=='function')return null;
  return ROOF.roofForOwner(status.ownerId);
}
function roofViewPolicy(status){return status.authoritative?'AUTHORITATIVE_ROOF':'SUPPRESS_ROOF'}
function roofWithheldLabel(status){return status.authoritative?'ROOF GEOMETRY LOCKED':'ROOF GEOMETRY WITHHELD · NOT GEOMETRY LOCKED'}
function zoneRidgeZ(zone){return ROOF&&typeof ROOF.zoneRidgeZ==='function'?ROOF.zoneRidgeZ(zone):null}
function roofPitch(zone){return zone&&zone.pitchRise&&zone.pitchRun?`${zone.pitchRise}:${zone.pitchRun}`:'—'}
function roofPlanePolys(zone){
  const ridgeZ=zoneRidgeZ(zone);
  if(!zone||!Array.isArray(zone.footprint)||!Number.isFinite(ridgeZ))return [];
  const e=extents(zone.footprint),p=zone.plateZFt,a=zone.ridgeA,b=zone.ridgeB;
  if(Math.abs(a[1]-b[1])<1e-6){
    const r=[a,b].sort((u,v)=>u[0]-v[0]),y=a[1];
    return [
      [[e.minX,e.minY,p],[e.maxX,e.minY,p],[r[1][0],y,ridgeZ],[r[0][0],y,ridgeZ]],
      [[r[0][0],y,ridgeZ],[r[1][0],y,ridgeZ],[e.maxX,e.maxY,p],[e.minX,e.maxY,p]]
    ];
  }
  if(Math.abs(a[0]-b[0])<1e-6){
    const r=[a,b].sort((u,v)=>u[1]-v[1]),x=a[0];
    return [
      [[e.minX,e.minY,p],[x,r[0][1],ridgeZ],[x,r[1][1],ridgeZ],[e.minX,e.maxY,p]],
      [[x,r[0][1],ridgeZ],[e.maxX,e.minY,p],[e.maxX,e.maxY,p],[x,r[1][1],ridgeZ]]
    ];
  }
  return [];
}
function roofVertices(zone){
  const z=zoneRidgeZ(zone);
  return [...zone.footprint.map(([x,y])=>[x,y,zone.plateZFt]),[zone.ridgeA[0],zone.ridgeA[1],z],[zone.ridgeB[0],zone.ridgeB[1],z]];
}
function convexHull(points){
  const unique=[...new Map(points.map(p=>[`${p[0].toFixed(4)}:${p[1].toFixed(4)}`,p])).values()];
  if(unique.length<=2)return unique;
  unique.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
  const lower=[];for(const p of unique){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],p)<=0)lower.pop();lower.push(p)}
  const upper=[];for(let i=unique.length-1;i>=0;i--){const p=unique[i];while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],p)<=0)upper.pop();upper.push(p)}
  return lower.slice(0,-1).concat(upper.slice(0,-1));
}
function elevationU(face,p){return face==='east'||face==='west'?p[1]:p[0]}
function elevationRoofPolygon(zone,face,span,left0,wallY,scale){
  const pts=roofVertices(zone).map(p=>[left0+(elevationU(face,p)-span[0])*scale,wallY-(p[2]-zone.plateZFt)*scale]);
  return convexHull(pts);
}
function roofSummary(roof){
  if(!roof)return 'ROOF SUPPRESSED';
  const pitches=[...new Set(roof.zones.map(roofPitch))],ridgeZ=roof.zones.map(zoneRidgeZ).filter(Number.isFinite);
  return `ROOF LOCKED · ${pitches.join(' / ')} · RIDGE Z ${ridgeZ.map(v=>v.toFixed(2)).join(' / ')}′`;
}
function renderRoofElevation({kind,unit,face,span,left0,wallY,scale}){
  const status=roofStatus(kind,unit),roof=roofFor(kind,unit);
  if(!roof)return `<g data-roof-owner="${status.ownerId}" data-roof-status="${status.status}" data-roof-authoritative="false" data-roof-render-policy="SUPPRESS_ROOF"><line x1="${left0}" y1="${wallY}" x2="${left0+(span[1]-span[0])*scale}" y2="${wallY}" stroke="${COLORS.roof}" stroke-width="2" stroke-dasharray="6 5"/><text x="${left0+((span[1]-span[0])*scale)/2}" y="${wallY-10}" text-anchor="middle" font-size="8" font-weight="900" fill="${COLORS.warn}">${roofWithheldLabel(status)}</text></g>`;
  const zones=roof.zones.map((zone,i)=>{
    const poly=elevationRoofPolygon(zone,face,span,left0,wallY,scale);
    const ridgeZ=zoneRidgeZ(zone),r0=[left0+(elevationU(face,[...zone.ridgeA,ridgeZ])-span[0])*scale,wallY-(ridgeZ-zone.plateZFt)*scale],r1=[left0+(elevationU(face,[...zone.ridgeB,ridgeZ])-span[0])*scale,wallY-(ridgeZ-zone.plateZFt)*scale];
    const ridge=Math.hypot(r1[0]-r0[0],r1[1]-r0[1])>.5?`<line x1="${r0[0].toFixed(1)}" y1="${r0[1].toFixed(1)}" x2="${r1[0].toFixed(1)}" y2="${r1[1].toFixed(1)}" stroke="#263746" stroke-width="2.1" data-roof-ridge="${zone.id}"/>`:`<circle cx="${r0[0].toFixed(1)}" cy="${r0[1].toFixed(1)}" r="2.5" fill="#263746" data-roof-ridge="${zone.id}"/>`;
    return `<g data-roof-zone="${zone.id}" data-roof-pitch="${roofPitch(zone)}" data-roof-ridge-z-ft="${ridgeZ}"><polygon points="${poly.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${i%2? '#4b5d6d':COLORS.roof}" fill-opacity=".93" stroke="#263746" stroke-width="1.7"/>${ridge}</g>`;
  }).join('');
  return `<g data-roof-owner="${status.ownerId}" data-roof-status="${status.status}" data-roof-authoritative="true" data-roof-render-policy="AUTHORITATIVE_ROOF">${zones}</g>`;
}
function renderViewKey(face,x,y,w=255,h=64){
  const maxX=148,maxY=57.01,pad=8,sx=v=>x+pad+(v/maxX)*(w-pad*2),sy=v=>y+pad+(v/maxY)*(h-pad*2);
  const pts=poly2=>poly2.map(([px,py])=>`${sx(px).toFixed(1)},${sy(py).toFixed(1)}`).join(' ');
  const masses=[...D4.HOMES.map(o=>({poly:homePoly(o),fill:o.unit==='A'?COLORS.homeA:COLORS.homeB})),...D4.GARAGES.map(o=>({poly:rectPoly(o),fill:COLORS.garage}))];
  let ax1=x+w-12,ay1=y+h/2,ax2=x+w-48,ay2=ay1,head=`${ax2},${ay2} ${ax2+8},${ay2-5} ${ax2+8},${ay2+5}`,label='VIEW FROM EAST / PENNSYLVANIA';
  if(face==='west'){ax1=x+12;ay1=y+h/2;ax2=x+48;ay2=ay1;head=`${ax2},${ay2} ${ax2-8},${ay2-5} ${ax2-8},${ay2+5}`;label='VIEW FROM WEST / REAR';}
  if(face==='north'){ax1=x+w/2;ay1=y+8;ax2=ax1;ay2=y+34;head=`${ax2},${ay2} ${ax2-5},${ay2-8} ${ax2+5},${ay2-8}`;label='VIEW FROM NORTH';}
  if(face==='south'){ax1=x+w/2;ay1=y+h-8;ax2=ax1;ay2=y+h-34;head=`${ax2},${ay2} ${ax2-5},${ay2+8} ${ax2+5},${ay2+8}`;label='VIEW FROM SOUTH';}
  return `<g data-view-key="${face}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#fff" stroke="#d8dde2"/><polygon points="${pts(D4.SURVEY)}" fill="#f3efe4" stroke="#9e9a90" stroke-width="1"/>${masses.map(m=>`<polygon points="${pts(m.poly)}" fill="${m.fill}" fill-opacity=".78" stroke="${COLORS.ink}" stroke-width=".7"/>`).join('')}<line x1="${ax1}" y1="${ay1}" x2="${ax2}" y2="${ay2}" stroke="${COLORS.door}" stroke-width="2"/><polygon points="${head}" fill="${COLORS.door}"/><rect x="${x+4}" y="${y+h-16}" width="${Math.min(w-8,178)}" height="13" rx="6.5" fill="#fff" fill-opacity=".9"/><text x="${x+10}" y="${y+h-6}" font-size="7.8" font-weight="900" fill="${COLORS.ink}">${label}</text><text x="${x+w-10}" y="${y+13}" text-anchor="end" font-size="7.5" font-weight="900" fill="${COLORS.muted}">SITE ORIENTATION KEY</text></g>`;
}
const ELEVATION_SCALE=6.2;
function elevationBand({unit,face,x,y,w,h,title,kind='home'}){
  const obj=kind==='garage'?D4.GARAGES.find(g=>g.unit===unit):D4.HOMES.find(b=>b.unit===unit),poly2=kind==='garage'?rectPoly(obj):homePoly(obj),segs=faceSegments(poly2,face);
  if(!segs.length)return `<g data-elevation-unit="${unit}" data-face="${face}" data-kind="${kind}" data-world-segments="0"><text x="${x}" y="${y+18}" font-size="12" font-weight="900" fill="${COLORS.ink}">${title}</text><text x="${x}" y="${y+48}" font-size="10" fill="${COLORS.muted}">No exterior ${face} face in source polygon.</text></g>`;
  const axes=segs.flatMap(s=>segmentAxis(face,s)),span=[Math.min(...axes),Math.max(...axes)],worldW=Math.max(1,span[1]-span[0]),scale=ELEVATION_SCALE,drawW=worldW*scale,left0=x+(w-drawW)/2,plateFt=(kind==='garage'?HEIGHTS.garage:HEIGHTS.home),wallH=plateFt*scale,wallY=y+h-34-wallH,fill=kind==='garage'?COLORS.garage:(unit==='A'?COLORS.homeA:COLORS.homeB),planes=segs.map(s=>(face==='east'||face==='west')?s[0][0]:s[0][1]),outerPlane=(face==='east'||face==='south')?Math.max(...planes):Math.min(...planes),roof=roofFor(kind,unit);
  let out=`<g data-elevation-unit="${unit}" data-face="${face}" data-kind="${kind}" data-world-segments="${segs.length}" data-common-scale-px-per-ft="${scale}" data-visible-span-ft="${worldW}" data-roof-plate-ft="${plateFt}"><text x="${x}" y="${y+18}" font-size="12" font-weight="900" fill="${COLORS.ink}">${title}</text><text x="${x+w}" y="${y+18}" text-anchor="end" font-size="8.5" font-weight="900" fill="#507759">COORDINATE-DERIVED FACES + LOCKED ROOF</text><text x="${x+w}" y="${y+32}" text-anchor="end" font-size="7.5" font-weight="800" fill="${COLORS.muted}">${roofSummary(roof)}</text><line x1="${x}" y1="${y+h-32}" x2="${x+w}" y2="${y+h-32}" stroke="${COLORS.ground}" stroke-width="3"/>`;
  out+=renderRoofElevation({kind,unit,face,span,left0,wallY,scale});
  for(const s of segs){const ax=segmentAxis(face,s),a0=Math.min(...ax),a1=Math.max(...ax),left=left0+(a0-span[0])*scale,sw=(a1-a0)*scale,plane=(face==='east'||face==='west')?s[0][0]:s[0][1],recess=Math.abs(plane-outerPlane);out+=`<rect x="${left}" y="${wallY}" width="${sw}" height="${wallH}" fill="${fill}" fill-opacity="${recess>.01?'.76':'.94'}" stroke="${COLORS.ink}" stroke-width="2" data-world-face-segment="${face}" data-world-plane="${plane}" data-world-span="${a0}:${a1}" data-recess-ft="${recess.toFixed(2)}"/>`;if(recess>.01)out+=`<text x="${left+6}" y="${wallY+14}" font-size="7.5" font-weight="900" fill="${COLORS.warn}">RECESSED ${recess.toFixed(2)}′</text>`;}
  if(kind==='home')out+=`<line x1="${left0}" y1="${wallY+HEIGHTS.floor*scale}" x2="${left0+drawW}" y2="${wallY+HEIGHTS.floor*scale}" stroke="${COLORS.line}" stroke-width="1" stroke-dasharray="5 5" opacity=".45" data-floor-datum="working"/>`;
  const openings=faceOpenings(unit,face).filter(o=>(kind==='garage'?o.role==='garage-overhead':o.role!=='garage-overhead')&&openingOnSegments(o,segs,face));
  for(const o of openings){const ax=faceAxis(face,o),left=left0+(Math.min(...ax)-span[0])*scale,ow=Math.max(7,openingLength(o)*scale),zScale=scale,top=wallY+wallH-o.z2*zScale,oh=Math.max(8,(o.z2-o.z1)*zScale),type=openingKind(o.role);out+=`<rect x="${left}" y="${top}" width="${ow}" height="${oh}" rx="1.5" fill="${openingFill(o.role)}" stroke="${openingStroke(o.role)}" stroke-width="2.4" data-opening="${type}" data-opening-id="${o.id}" data-opening-role="${o.role}" data-derived="world"/>`;}
  if(!openings.length)out+=`<rect x="${left0+drawW/2-64}" y="${wallY+wallH/2-10}" width="128" height="20" rx="10" fill="#fff" fill-opacity=".82"/><text x="${left0+drawW/2}" y="${wallY+wallH/2+3.5}" text-anchor="middle" font-size="8" font-weight="900" fill="${COLORS.muted}">NO MODELED OPENINGS</text>`;
  out+=`<text x="${x+w/2}" y="${y+h-20}" text-anchor="middle" font-size="9.5" font-weight="800" fill="${COLORS.ink}">VISIBLE SPAN ${worldW.toFixed(2)}′ · ROOF PLATE ${plateFt}′ · COMMON SCALE ${scale.toFixed(1)} PX/FT</text><text x="${x+w/2}" y="${y+h-7}" text-anchor="middle" font-size="8.5" fill="${COLORS.muted}">${kind==='garage'?(face==='east'?'22×22 detached garage · 20′ modeled east opening · locked 6:12 gable':'22×22 detached garage · locked 6:12 gable'):'roof control surface reaches the wall footprint; overhang / fascia / gutter detailing remains open'}</text></g>`;return out;
}
function renderElev(face){
  const labels={east:'A-201 · Pennsylvania / east elevation',west:'A-202 · rear / west elevation',north:'A-203 · north elevation',south:'A-204 · south elevation'},title=labels[face]||labels.east,W=1200,H=760,garageLabel=face==='east'?'20′ OVERHEAD OPENING':'SOLID GARAGE WALL';
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 ${face} geometry-first elevations" data-arch-rev="${REV}" data-elevation-face="${face}" data-openings-source="shared-world-model" data-roof-source="${ROOF?ROOF.REV:'UNAVAILABLE'}" data-roof-policy="AUTHORITATIVE_ROOF" data-garages-all-faces="true" data-common-scale-px-per-ft="${ELEVATION_SCALE}"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${title}</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Geometry-first · wall faces, openings, roof zones, ridge locations and 6:12 pitch are projected from the shared locked model</text>${elevationBand({unit:'B',face,x:62,y:108,w:510,h:255,title:'HOME B'})}${elevationBand({unit:'A',face,x:628,y:108,w:510,h:255,title:'HOME A'})}${elevationBand({unit:'B',face,x:62,y:410,w:510,h:240,title:`GARAGE B · ${garageLabel}`,kind:'garage'})}${elevationBand({unit:'A',face,x:628,y:410,w:510,h:240,title:`GARAGE A · ${garageLabel}`,kind:'garage'})}<g transform="translate(62,676)"><text font-size="10.2" fill="#507759">Roof control geometry: 4 / 4 owners locked in LotScope · 6:12 pitch · exact ridges and plate datums projected.</text><text y="17" font-size="9.2" fill="${COLORS.muted}">Overhang depth, fascia, gutters, roofing assembly, framing and final exterior detailing remain professional design items.</text></g>${renderViewKey(face,875,672,260,66)}</svg>`;
}
function P(x,y,z){return [580+(x-70)*5.2-(y-26)*3.2,545-(x-70)*1.55-(y-26)*1.35-z*8.2]}
function pts3(points){return points.map(p=>{const q=P(...p);return `${q[0].toFixed(1)},${q[1].toFixed(1)}`}).join(' ')}
function prism(poly2,z,fill,mode,id,kind,unit){const top=poly2.map(([x,y])=>[x,y,z]),roof=roofStatus(kind,unit);let faces='';for(let i=0;i<poly2.length;i++){const a=poly2[i],b=poly2[(i+1)%poly2.length];faces+=`<polygon points="${pts3([[a[0],a[1],0],[b[0],b[1],0],[b[0],b[1],z],[a[0],a[1],z]])}" fill="${fill}" fill-opacity="${mode==='massing'?'.78':'.92'}" stroke="${COLORS.ink}" stroke-width="1"/>`;}return `<g data-mass-id="${id}" data-roof-owner="${roof.ownerId}" data-roof-status="${roof.status}" data-roof-render-policy="${roofViewPolicy(roof)}"><polygon points="${pts3(top)}" fill="none" stroke="${COLORS.roof}" stroke-width="1.1" opacity=".55" data-plate-datum="locked"/>${faces}</g>`;}
function renderRoofAxon(kind,unit,mode='clean'){
  const status=roofStatus(kind,unit),roof=roofFor(kind,unit);
  if(!roof)return `<g data-roof-owner="${status.ownerId}" data-roof-render-policy="SUPPRESS_ROOF"/>`;
  const planes=[];
  for(const zone of roof.zones)roofPlanePolys(zone).forEach((poly,i)=>planes.push({zone,i,poly}));
  const surfaces=planes.map(({zone,i,poly})=>`<polygon points="${pts3(poly)}" fill="${i%2? '#465a6b':COLORS.roof}" fill-opacity="${mode==='massing'?'.70':'.96'}" stroke="#263746" stroke-width="1.25" data-roof-plane="${zone.id}-${i+1}"/>`).join('');
  const ridges=roof.zones.map(zone=>{const z=zoneRidgeZ(zone);return `<line x1="${P(zone.ridgeA[0],zone.ridgeA[1],z)[0].toFixed(1)}" y1="${P(zone.ridgeA[0],zone.ridgeA[1],z)[1].toFixed(1)}" x2="${P(zone.ridgeB[0],zone.ridgeB[1],z)[0].toFixed(1)}" y2="${P(zone.ridgeB[0],zone.ridgeB[1],z)[1].toFixed(1)}" stroke="#1c2c39" stroke-width="2" data-roof-ridge="${zone.id}"/>`}).join('');
  return `<g data-roof-owner="${status.ownerId}" data-roof-status="${status.status}" data-roof-render-policy="AUTHORITATIVE_ROOF">${surfaces}${ridges}</g>`;
}
function projectOpening(o){return pts3([[o.x1,o.y1,o.z1],[o.x2,o.y2,o.z1],[o.x2,o.y2,o.z2],[o.x1,o.y1,o.z2]])}
function renderAxon(mode='clean'){
  const W=1200,H=760,massing=mode==='massing';let masses='',roofs='';
  for(const h of D4.HOMES){masses+=prism(homePoly(h),HEIGHTS.home,h.unit==='A'?COLORS.homeA:COLORS.homeB,mode,h.id,'home',h.unit);roofs+=renderRoofAxon('home',h.unit,mode)}
  for(const g of D4.GARAGES){masses+=prism(rectPoly(g),HEIGHTS.garage,COLORS.garage,mode,g.id,'garage',g.unit);roofs+=renderRoofAxon('garage',g.unit,mode)}
  const openings=OPENINGS.map(o=>{const type=openingKind(o.role);return `<polygon points="${projectOpening(o)}" fill="${massing?'none':openingFill(o.role)}" fill-opacity="${massing?'0':'.72'}" stroke="${openingStroke(o.role)}" stroke-width="${massing?'1.8':'2.2'}" opacity="${massing?'.72':'1'}" data-opening="${type}" data-opening-id="${o.id}" data-opening-role="${o.role}" data-derived="world"/>`}).join('');
  const lot=pts3(D4.SURVEY.map(([x,y])=>[x,y,0])),pavement=(D4.PAVEMENT||[]).map(p=>`<polygon points="${pts3(p.poly.map(([x,y])=>[x,y,.03]))}" fill="#bfc6c4" fill-opacity=".62" stroke="#7d8785" stroke-width=".8" data-pavement="${p.id}"/>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 ${massing?'massing':'architectural axon'}" data-arch-rev="${REV}" data-camera="D4-ISO-01" data-axon-mode="${mode}" data-openings-source="shared-world-model" data-roof-source="${ROOF?ROOF.REV:'UNAVAILABLE'}" data-roof-policy="AUTHORITATIVE_ROOF"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${massing?'A-401 · Same-camera architectural massing':'A-402 · Same-camera clean axon'}</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Same camera / same world geometry · locked 6:12 roof surfaces · red doors · blue windows · concept pavement</text><polygon points="${lot}" fill="#f3efe4" stroke="#9e9a90" stroke-width="1.4"/>${pavement}${masses}${roofs}${openings}<g transform="translate(72,625)"><rect width="625" height="82" rx="12" fill="#fff" stroke="#d4d0c6"/><text x="18" y="27" font-size="12" font-weight="900" fill="${COLORS.ink}">GEOMETRY TRUTH</text><text x="18" y="49" font-size="10.5" fill="${COLORS.ink}">2 × detached 22×22 garages · promoted home shells · 4 / 4 authoritative roofs · Pennsylvania access at right/east</text><text x="18" y="68" font-size="9.5" fill="${COLORS.muted}">Roof planes use exact LotScope footprint / ridge / plate / pitch controls. Overhangs and construction assemblies are not implied.</text></g></svg>`;
}
function roofCrossSpan(zone){
  const e=extents(zone.footprint);
  return Math.abs(zone.ridgeA[1]-zone.ridgeB[1])<1e-6?e.maxY-e.minY:e.maxX-e.minX;
}
function primaryRoofZone(kind,unit){
  const roof=roofFor(kind,unit);if(!roof)return null;
  return [...roof.zones].sort((a,b)=>polygonArea(b.footprint)-polygonArea(a.footprint))[0];
}
function polygonArea(poly){let a=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length];a+=p[0]*q[1]-q[0]*p[1]}return Math.abs(a)/2}
function renderSectionProfile({x0,yGround,zone,scale,fill,label,kind,unit}){
  const span=roofCrossSpan(zone),plate=zone.plateZFt,ridge=zoneRidgeZ(zone),w=span*scale,plateY=yGround-plate*scale,ridgeY=yGround-ridge*scale,status=roofStatus(kind,unit);
  return `<g data-roof-owner="${status.ownerId}" data-roof-status="${status.status}" data-roof-render-policy="AUTHORITATIVE_ROOF" data-section-control-zone="${zone.id}" data-section-span-ft="${span.toFixed(3)}"><rect x="${x0}" y="${plateY}" width="${w}" height="${plate*scale}" fill="${fill}" fill-opacity=".72" stroke="${COLORS.ink}" stroke-width="2"/><polygon points="${x0},${plateY} ${x0+w/2},${ridgeY} ${x0+w},${plateY}" fill="${COLORS.roof}" fill-opacity=".96" stroke="#263746" stroke-width="2"/><line x1="${x0}" y1="${plateY}" x2="${x0+w}" y2="${plateY}" stroke="#263746" stroke-width="1.3"/>${kind==='home'?`<line x1="${x0}" y1="${yGround-HEIGHTS.floor*scale}" x2="${x0+w}" y2="${yGround-HEIGHTS.floor*scale}" stroke="${COLORS.ink}" stroke-width="1.5" opacity=".7"/><path d="M ${x0+w*.13} ${yGround-14} L ${x0+w*.36} ${yGround-HEIGHTS.floor*scale+14} L ${x0+w*.52} ${yGround-HEIGHTS.floor*scale+14}" fill="none" stroke="${COLORS.door}" stroke-width="4"/>`:''}<text x="${x0+w/2}" y="${yGround-18}" text-anchor="middle" font-size="11" font-weight="900" fill="${COLORS.ink}">${label}</text><text x="${x0+w/2}" y="${ridgeY-12}" text-anchor="middle" font-size="9" font-weight="900" fill="#507759">${roofPitch(zone)} LOCKED · RIDGE Z ${ridge.toFixed(2)}′ · PLATE ${plate.toFixed(0)}′</text></g>`;
}
function renderSection(unit){
  const W=1200,H=650,yGround=520,scale=14,homeZone=primaryRoofZone('home',unit),garageZone=primaryRoofZone('garage',unit),homeFill=unit==='A'?COLORS.homeA:COLORS.homeB;
  if(!homeZone||!garageZone)throw new Error('Authoritative roof control zones are required for Design 4 sections');
  const secondary=roofFor('home',unit).zones.filter(z=>z.id!==homeZone.id),secondaryNote=secondary.length?`Secondary roof zone: ${secondary.map(z=>`${z.label} ${roofCrossSpan(z).toFixed(2)}′ span · ridge Z ${zoneRidgeZ(z).toFixed(2)}′`).join(' · ')}`:'Single roof zone.';
  const homeW=roofCrossSpan(homeZone)*scale,garageW=roofCrossSpan(garageZone)*scale,xHome=140,xGarage=790;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 Unit ${unit} roof-control section" data-section-unit="${unit}" data-section-scope="PRIMARY_GABLE_CONTROL" data-arch-rev="${REV}" data-roof-contract="${ROOF?ROOF.REV:'UNAVAILABLE'}" data-roof-policy="AUTHORITATIVE_ROOF"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${unit==='A'?'A-301':'A-302'} · Unit ${unit} roof-control section</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Section perpendicular to the primary gable ridge · exact locked pitch, plate and ridge height · interior planning remains schematic</text><line x1="70" y1="${yGround}" x2="1130" y2="${yGround}" stroke="${COLORS.ground}" stroke-width="4"/>${renderSectionProfile({x0:xHome,yGround,zone:homeZone,scale,fill:homeFill,label:'HOME '+unit+' · TWO STORY',kind:'home',unit})}${renderSectionProfile({x0:xGarage,yGround,zone:garageZone,scale,fill:COLORS.garage,label:'GARAGE '+unit+' · 22×22',kind:'garage',unit})}<g transform="translate(62,560)"><text font-size="10.3" fill="#507759">Roof control profile is authoritative to the wall footprint. ${secondaryNote}</text><text y="17" font-size="9.5" fill="${COLORS.muted}">Overhangs, fascia, gutters, framing, foundations, fire separation, MEP routes, egress and finished grades remain professional/AHJ work.</text></g></svg>`;
}
function analyze(){
  const p=PLAN.analyze(),g=D4.analyze(),roof=ROOF&&typeof ROOF.analyze==='function'?ROOF.analyze():null,b=D4.HOMES.find(h=>h.unit==='B'),south=faceSegments(homePoly(b),'south'),west=faceSegments(homePoly(b),'west'),contractOk=OPENINGS.every(o=>['door','window'].includes(openingKind(o.role))),roofContractOk=Boolean(roof&&roof.status==='AUTHORITATIVE_ALLOWED'&&roof.locked===roof.required);
  return {rev:REV,verdict:'CONDITIONAL',plan:p,geometry:g,roof,checks:{planGeometry:{ok:p.verdict==='PASS',blocking:true},sharedOpenings:{ok:OPENINGS.length>=10,blocking:true},openingContract:{ok:contractOk,doorStroke:COLORS.door,windowStroke:COLORS.window,blocking:true},polygonFaces:{ok:south.length===2&&west.length===2,homeBSouthSegments:south.length,homeBWestSegments:west.length,blocking:true},roofContract:{ok:roofContractOk,status:roof?.status||'UNAVAILABLE',locked:roof?.locked||0,required:roof?.required||4,renderPolicy:roofContractOk?'AUTHORITATIVE_ROOF':'SUPPRESS_ROOF',projector:'EXACT_WORLD_PROJECTION',blocking:true},sameCamera:{ok:true,blocking:true},professionalValidation:{ok:false,status:'PENDING',blocking:false}},note:'Design-development concept package only. Locked Workbench roof control geometry is rendered exactly to the wall footprint; overhangs and construction assemblies remain professional design. Accessory zoning and inter-garage spacing remain conditional.'};
}

const api={REV,HEIGHTS,OPENINGS,ELEVATION_SCALE,analyze,renderElev,renderAxon,renderSection,projectOpening,faceSegments,openingKind,roofViewPolicy,roofWithheldLabel,roofPlanePolys,elevationRoofPolygon,roofCrossSpan,P};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4Architecture=api;
})(typeof window!=='undefined'?window:globalThis);
