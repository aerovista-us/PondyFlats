(function(global){
'use strict';

const D4=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4.js'):global.Lot2Design4;
const PLAN=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-plan-closure.js'):global.Lot2Design4PlanClosure;
if(!D4||!PLAN) throw new Error('Design 4 architecture requires geometry and plan-closure models');

const REV='D4-ARCH-v0.1';
const COLORS={paper:'#fbfaf7',ink:'#132238',muted:'#68727d',homeA:'#d9b56d',homeB:'#ead495',garage:'#8ca58b',roof:'#394957',glass:'#a9c4d5',entry:'#8f3d32',ground:'#e6e0d4',line:'#405064',warn:'#a9612b'};
const HEIGHTS={home:20,garage:11,floor:10};

const OPENINGS=Object.freeze([
  ...PLAN.ENTRIES.map(e=>Object.freeze({id:e.id,role:'entry',unit:e.unit,face:e.face,x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,z1:0,z2:7})),
  Object.freeze({id:'GARAGE-B-OVERHEAD',role:'garage-overhead',unit:'B',face:'east',x1:27,y1:8,x2:27,y2:24,z1:0,z2:8}),
  Object.freeze({id:'GARAGE-A-OVERHEAD',role:'garage-overhead',unit:'A',face:'east',x1:27,y1:32,x2:27,y2:48,z1:0,z2:8}),
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
function extents(poly){const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);return {minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys)};}
function openingLength(o){return Math.hypot(o.x2-o.x1,o.y2-o.y1)}
function faceAxis(face,o){return (face==='east'||face==='west')?[o.y1,o.y2]:[o.x1,o.x2]}
function faceSpan(face,e){return (face==='east'||face==='west')?[e.minY,e.maxY]:[e.minX,e.maxX]}
function faceOpenings(unit,face){return OPENINGS.filter(o=>o.unit===unit&&o.face===face)}
function roofPath(x0,x1,baseY,rise=24){const mid=(x0+x1)/2;return `M ${x0} ${baseY} L ${mid} ${baseY-rise} L ${x1} ${baseY}`}
function openingFill(role){return role==='window'?COLORS.glass:role==='entry'?COLORS.entry:'#566a70'}

function elevationBand({unit,face,x,y,w,h,title,kind='home'}){
  const obj=kind==='garage'?D4.GARAGES.find(g=>g.unit===unit):D4.HOMES.find(b=>b.unit===unit);
  const e=extents(kind==='garage'?[[obj.x,obj.y],[obj.x+obj.w,obj.y],[obj.x+obj.w,obj.y+obj.d],[obj.x,obj.y+obj.d]]:homePoly(obj));
  const span=faceSpan(face,e),worldW=Math.max(1,span[1]-span[0]),scale=(w-36)/worldW,wallH=(kind==='garage'?HEIGHTS.garage:HEIGHTS.home)*Math.min(scale,8.5),wallY=y+h-34-wallH;
  const fill=kind==='garage'?COLORS.garage:(unit==='A'?COLORS.homeA:COLORS.homeB);
  let out=`<g data-elevation-unit="${unit}" data-face="${face}" data-kind="${kind}"><text x="${x}" y="${y+18}" font-size="12" font-weight="900" fill="${COLORS.ink}">${title}</text><line x1="${x}" y1="${y+h-32}" x2="${x+w}" y2="${y+h-32}" stroke="${COLORS.ground}" stroke-width="3"/><rect x="${x+18}" y="${wallY}" width="${w-36}" height="${wallH}" fill="${fill}" stroke="${COLORS.ink}" stroke-width="2"/>`;
  if(kind==='home') out+=`<path d="${roofPath(x+14,x+w-14,wallY,24)}" fill="none" stroke="${COLORS.roof}" stroke-width="5"/><line x1="${x+18}" y1="${wallY+wallH/2}" x2="${x+w-18}" y2="${wallY+wallH/2}" stroke="${COLORS.line}" stroke-width="1" stroke-dasharray="5 5" opacity=".45"/>`;
  const openings=faceOpenings(unit,face).filter(o=>kind==='garage'?o.role==='garage-overhead':o.role!=='garage-overhead');
  for(const o of openings){const ax=faceAxis(face,o),left=x+18+(Math.min(...ax)-span[0])*scale,ow=Math.max(7,openingLength(o)*scale),zScale=wallH/(kind==='garage'?HEIGHTS.garage:HEIGHTS.home),top=wallY+wallH-o.z2*zScale,oh=Math.max(8,(o.z2-o.z1)*zScale);out+=`<rect x="${left}" y="${top}" width="${ow}" height="${oh}" rx="1.5" fill="${openingFill(o.role)}" stroke="${COLORS.ink}" stroke-width="1.2" data-opening-id="${o.id}" data-opening-role="${o.role}" data-derived="world"/>`;}
  out+=`<text x="${x+w/2}" y="${y+h-10}" text-anchor="middle" font-size="9.5" fill="${COLORS.muted}">${kind==='garage'?'22×22 detached accessory garage':'two-story concept mass · openings from shared world model'}</text></g>`;
  return out;
}

function renderElev(face){
  const labels={east:'A-201 · Pennsylvania / east-facing studies',west:'A-202 · rear / west-facing studies',north:'A-203 · north-facing studies',south:'A-204 · south-facing studies'};
  const title=labels[face]||labels.east,W=1200,H=760;
  const garageFace=face==='east';
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 ${face} concept elevations" data-arch-rev="${REV}" data-elevation-face="${face}" data-openings-source="shared-world-model"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${title}</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Restrained North Idaho contemporary · design-development concept · not structural/code documentation</text>${elevationBand({unit:'B',face,x:62,y:108,w:510,h:255,title:'HOME B'})}${elevationBand({unit:'A',face,x:628,y:108,w:510,h:255,title:'HOME A'})}${garageFace?elevationBand({unit:'B',face,x:62,y:410,w:510,h:240,title:'GARAGE B · east overhead door',kind:'garage'}):''}${garageFace?elevationBand({unit:'A',face,x:628,y:410,w:510,h:240,title:'GARAGE A · east overhead door',kind:'garage'}):''}<g transform="translate(62,${garageFace?676:420})"><text font-size="10.5" fill="${COLORS.warn}">Concept elevations establish architectural read only. Final fenestration, wall heights, roof framing, egress, fire separation and energy/code design remain professional work.</text></g></svg>`;
}

function P(x,y,z){return [580+(x-70)*5.2-(y-26)*3.2,545-(x-70)*1.55-(y-26)*1.35-z*8.2]}
function pts3(points){return points.map(p=>{const q=P(...p);return `${q[0].toFixed(1)},${q[1].toFixed(1)}`}).join(' ')}
function prism(poly2,z,fill,mode,id){
  const top=poly2.map(([x,y])=>[x,y,z]),east=poly2.map((p,i)=>[p[0],p[1],i]);
  let faces='';
  for(let i=0;i<poly2.length;i++){const a=poly2[i],b=poly2[(i+1)%poly2.length];faces+=`<polygon points="${pts3([[a[0],a[1],0],[b[0],b[1],0],[b[0],b[1],z],[a[0],a[1],z]])}" fill="${fill}" fill-opacity="${mode==='massing'?'.78':'.92'}" stroke="${COLORS.ink}" stroke-width="1"/>`;}
  return `<g data-mass-id="${id}">${faces}<polygon points="${pts3(top)}" fill="${mode==='massing'?COLORS.roof:fill}" stroke="${COLORS.ink}" stroke-width="1.2"/></g>`;
}
function projectOpening(o){const plane=o.x1===o.x2?[[o.x1,o.y1,o.z1],[o.x2,o.y2,o.z1],[o.x2,o.y2,o.z2],[o.x1,o.y1,o.z2]]:[[o.x1,o.y1,o.z1],[o.x2,o.y2,o.z1],[o.x2,o.y2,o.z2],[o.x1,o.y1,o.z2]];return pts3(plane)}
function renderAxon(mode='clean'){
  const W=1200,H=760,massing=mode==='massing';
  let masses='';
  for(const h of D4.HOMES)masses+=prism(homePoly(h),HEIGHTS.home,h.unit==='A'?COLORS.homeA:COLORS.homeB,mode,h.id);
  for(const g of D4.GARAGES)masses+=prism([[g.x,g.y],[g.x+g.w,g.y],[g.x+g.w,g.y+g.d],[g.x,g.y+g.d]],HEIGHTS.garage,COLORS.garage,mode,g.id);
  const openings=massing?'':OPENINGS.map(o=>`<polygon points="${projectOpening(o)}" fill="${openingFill(o.role)}" stroke="${COLORS.ink}" stroke-width=".9" data-opening-id="${o.id}" data-opening-role="${o.role}" data-derived="world"/>`).join('');
  const lot=pts3(D4.SURVEY.map(([x,y])=>[x,y,0]));
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 ${massing?'massing':'architectural axon'}" data-arch-rev="${REV}" data-camera="D4-ISO-01" data-axon-mode="${mode}" data-openings-source="shared-world-model"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${massing?'A-401 · Same-camera architectural massing':'A-402 · Same-camera clean axon'}</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Same camera / same world geometry · north garage → Home B · south garage → Home A</text><polygon points="${lot}" fill="#f3efe4" stroke="#9e9a90" stroke-width="1.4"/>${masses}${openings}<g transform="translate(72,625)"><rect width="520" height="82" rx="12" fill="#fff" stroke="#d4d0c6"/><text x="18" y="27" font-size="12" font-weight="900" fill="${COLORS.ink}">GEOMETRY TRUTH</text><text x="18" y="49" font-size="10.5" fill="${COLORS.ink}">2 × detached 22×22 garages · promoted north-finger home shells · Pennsylvania access at right/east</text><text x="18" y="68" font-size="9.5" fill="${COLORS.muted}">${massing?'Massing omits openings by design.':'Entries, garage doors and windows project from the shared world-coordinate OPENINGS array.'}</text></g></svg>`;
}

function renderSection(unit){
  const shell=PLAN.SHELLS[unit],e=extents(shell.poly),width=e.maxX-e.minX,W=1200,H=650,x0=110,yGround=520,s=Math.min(18,760/Math.max(width,1)),houseW=width*s,floorH=130;
  const garage=D4.GARAGES.find(g=>g.unit===unit),gW=22*s*.62;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 Unit ${unit} concept section" data-section-unit="${unit}" data-arch-rev="${REV}"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${unit==='A'?'A-301':'A-302'} · Unit ${unit} concept section</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Two-story home + detached 22×22 garage relationship · schematic section, not structural documentation</text><line x1="70" y1="${yGround}" x2="1130" y2="${yGround}" stroke="${COLORS.ground}" stroke-width="4"/><g transform="translate(${x0},0)"><rect x="0" y="${yGround-floorH*2}" width="${houseW}" height="${floorH*2}" fill="${unit==='A'?COLORS.homeA:COLORS.homeB}" fill-opacity=".64" stroke="${COLORS.ink}" stroke-width="2"/><line x1="0" y1="${yGround-floorH}" x2="${houseW}" y2="${yGround-floorH}" stroke="${COLORS.ink}" stroke-width="2"/><path d="M -8 ${yGround-floorH*2} L ${houseW/2} ${yGround-floorH*2-58} L ${houseW+8} ${yGround-floorH*2}" fill="none" stroke="${COLORS.roof}" stroke-width="6"/><path d="M ${houseW*.15} ${yGround-18} L ${houseW*.35} ${yGround-floorH+18} L ${houseW*.5} ${yGround-floorH+18}" fill="none" stroke="${COLORS.entry}" stroke-width="5"/><text x="${houseW/2}" y="${yGround-floorH-10}" text-anchor="middle" font-size="11" font-weight="900" fill="${COLORS.ink}">UPPER · 3 BEDROOM PROGRAM</text><text x="${houseW/2}" y="${yGround-18}" text-anchor="middle" font-size="11" font-weight="900" fill="${COLORS.ink}">GROUND · LIVING / KITCHEN / FLEX / SERVICE</text></g><g transform="translate(820,0)"><rect x="0" y="${yGround-100}" width="${gW}" height="100" fill="${COLORS.garage}" fill-opacity=".72" stroke="${COLORS.ink}" stroke-width="2"/><path d="M -6 ${yGround-100} L ${gW/2} ${yGround-135} L ${gW+6} ${yGround-100}" fill="none" stroke="${COLORS.roof}" stroke-width="5"/><text x="${gW/2}" y="${yGround-44}" text-anchor="middle" font-size="11" font-weight="900">DETACHED GARAGE ${unit}</text><text x="${gW/2}" y="${yGround-25}" text-anchor="middle" font-size="10">22×22 · no living space</text></g><g transform="translate(62,560)"><text font-size="10.5" fill="${COLORS.warn}">Concept section only. Floor-to-floor, roof, foundations, framing, fire separation, egress and MEP routes remain professional/AHJ validation items.</text></g></svg>`;
}

function analyze(){const p=PLAN.analyze(),g=D4.analyze();return {rev:REV,verdict:'CONDITIONAL',plan:p,geometry:g,checks:{planGeometry:{ok:p.verdict==='PASS',blocking:true},sharedOpenings:{ok:OPENINGS.length>=10,blocking:true},sameCamera:{ok:true,blocking:true},professionalValidation:{ok:false,status:'PENDING',blocking:false}},note:'Design-development concept package only; accessory zoning and inter-garage spacing remain conditional.'};}

const api={REV,HEIGHTS,OPENINGS,analyze,renderElev,renderAxon,renderSection,projectOpening,P};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4Architecture=api;
})(typeof window!=='undefined'?window:globalThis);