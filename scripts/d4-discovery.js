#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

global.Lot2SOT = require('../js/lot2-sot.js');
global.Lot2 = require('../js/lot2-geometry.js');
const Access = require('../js/lot2-access.js');

const S = global.Lot2SOT;
const L = global.Lot2;
const R = S.SUV_FS.minRearAxleRadius;
const PARK_AXLE_X = 22.5;
const TARGET = 1800;
const OUT = path.join(process.cwd(), 'qa-artifacts', 'design4-discovery');
fs.mkdirSync(OUT, { recursive: true });

const FIXED_GARAGES = Object.freeze([
  Object.freeze({ id: 'A', name: 'GARAGE A · 22×22', x: 5, y: 5, w: 22, h: 22, doorFace: 'E', spaces: 2, enclosed: true }),
  Object.freeze({ id: 'B', name: 'GARAGE B · 22×22', x: 5, y: 29, w: 22, h: 22, doorFace: 'E', spaces: 2, enclosed: true }),
]);

function rect(name, x, y, w, h) { return { name, x, y, w, h, sf: +(w * h).toFixed(1) }; }
function area(u) {
  if (!u.poly) return u.w * u.h;
  let a = 0;
  for (let i = 0; i < u.poly.length; i++) {
    const p = u.poly[i], q = u.poly[(i + 1) % u.poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return Math.abs(a) / 2;
}
function bbox(u) {
  const pts = u.poly || [[u.x,u.y],[u.x+u.w,u.y],[u.x+u.w,u.y+u.h],[u.x,u.y+u.h]];
  const xs = pts.map(p=>p[0]), ys = pts.map(p=>p[1]);
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs)-Math.min(...xs), h: Math.max(...ys)-Math.min(...ys) };
}
function boxGap(a,b) {
  const dx = Math.max(b.x-(a.x+a.w), a.x-(b.x+b.w), 0);
  const dy = Math.max(b.y-(a.y+a.h), a.y-(b.y+b.h), 0);
  return Math.hypot(dx,dy);
}
function sCurve(startX, startY, endY, stepDeg = 5) {
  const dv = Math.abs(endY - startY);
  if (dv < 0.01) return [[startX,startY]];
  const sign = endY > startY ? 1 : -1;
  const cosTheta = 1 - dv / (2 * R);
  if (cosTheta < -1 || cosTheta > 1) return null;
  const theta = Math.acos(cosTheta);
  const steps = Math.max(3, Math.ceil(theta / (stepDeg * Math.PI / 180)));
  const pts = [[startX,startY]];
  for (let i = 1; i <= steps; i++) {
    const a = theta * i / steps;
    const u = R * Math.sin(a);
    const v = R * (1 - Math.cos(a));
    pts.push([startX-u, startY+sign*v]);
  }
  const u1 = R * Math.sin(theta), v1 = R * (1-Math.cos(theta));
  for (let i = 1; i <= steps; i++) {
    const t = theta * i / steps;
    const du = R * (Math.sin(theta) - Math.sin(theta-t));
    const dv2 = R * (Math.cos(theta-t) - Math.cos(theta));
    pts.push([startX-u1-du, startY+sign*(v1+dv2)]);
  }
  return pts;
}
function paths(spineY, turnX) {
  const aCurve = sCurve(turnX, spineY, 16);
  const bCurve = sCurve(turnX, spineY, 40);
  if (!aCurve || !bCurve) return null;
  const aEnd = aCurve[aCurve.length-1], bEnd = bCurve[bCurve.length-1];
  if (aEnd[0] < 29 || bEnd[0] < 29) return null;
  const lead = [[148,spineY],[turnX,spineY]];
  const A = [...lead, ...aCurve.slice(1), [PARK_AXLE_X,16]];
  const B = [...lead, ...bCurve.slice(1), [PARK_AXLE_X,40]];
  return { A, B, aCurveEndX:+aEnd[0].toFixed(2), bCurveEndX:+bEnd[0].toFixed(2) };
}
function fullParkProof(pathPts, garage) {
  const p = pathPts[pathPts.length-1], prev = pathPts[pathPts.length-2];
  const th = Math.atan2(p[1]-prev[1], p[0]-prev[0]);
  const poly = Access.vehiclePoly(p[0],p[1],th);
  const eps = 1e-6;
  const inside = poly.every(([x,y]) => x >= garage.x-eps && x <= garage.x+garage.w+eps && y >= garage.y-eps && y <= garage.y+garage.h+eps);
  const xs=poly.map(p=>p[0]), ys=poly.map(p=>p[1]);
  return { ok:inside, headingDeg:+(th*180/Math.PI).toFixed(2), bounds:{minX:+Math.min(...xs).toFixed(2),maxX:+Math.max(...xs).toFixed(2),minY:+Math.min(...ys).toFixed(2),maxY:+Math.max(...ys).toFixed(2)} };
}
function unitInsidePrincipal(u) {
  const pts = u.poly || [[u.x,u.y],[u.x+u.w,u.y],[u.x+u.w,u.y+u.h],[u.x,u.y+u.h]];
  return pts.every(([x,y])=>L.pointInPoly(x,y,L.SETBACK_POLY));
}
function garageAccessoryTruth() {
  const gA=FIXED_GARAGES[0], gB=FIXED_GARAGES[1];
  return {
    exact22: FIXED_GARAGES.every(g=>g.w===22&&g.h===22),
    rear5: FIXED_GARAGES.every(g=>Math.abs(g.x-5)<1e-9),
    north5: Math.abs(gA.y-5)<1e-9,
    southApprox5: +(57.01 - (13.994/84.813)*5 - (gB.y+gB.h)).toFixed(2),
    gap: +(gB.y-(gA.y+gA.h)).toFixed(2),
  };
}
function unitTemplate(family,p) {
  const { xW, party, south, wingX, wingSouth, gap } = p;
  if (family==='bar') return [rect('HOME B',xW,5,party-xW,south-5), rect('HOME A',party,5,128-party,south-5)];
  if (family==='north-finger') return [
    { name:'HOME B · NORTH FINGER', poly:[[wingX,5],[party,5],[party,south],[xW,south],[xW,wingSouth],[wingX,wingSouth]] },
    rect('HOME A',party,5,128-party,south-5),
  ];
  if (family==='stagger') return [
    { name:'HOME B · STAGGER', poly:[[wingX,5],[party,5],[party,24],[xW,24],[xW,wingSouth],[wingX,wingSouth]] },
    rect('HOME A · STAGGER',party,7,128-party,south-7),
  ];
  if (family==='detached') return [
    { name:'HOME B · DETACHED', poly:[[wingX,5],[party,5],[party,south],[xW,south],[xW,wingSouth],[wingX,wingSouth]] },
    rect('HOME A · DETACHED',party+gap,5,128-(party+gap),south-5),
  ];
  if (family==='twin-bars') return [
    rect('HOME B · NORTH BAR',xW,5,128-xW,14),
    rect('HOME A · SOUTH BAR',xW+6,20,122-(xW+6),Math.max(8,south-20)),
  ];
  throw new Error('unknown family '+family);
}
function twoStoryCapacity(units) { return units.map(u=>Math.round(area(u)*2)); }
function minGarageHomeSep(units) {
  let m=Infinity;
  for (const g of FIXED_GARAGES) for (const u of units) m=Math.min(m,boxGap(g,bbox(u)));
  return +m.toFixed(2);
}
function candidate(family,p) {
  const ps=paths(p.spineY,p.turnX); if(!ps) return null;
  const units=unitTemplate(family,p);
  const id=`d4_${family.replace(/-/g,'_')}_${p.xW}_${p.party}_${String(p.spineY).replace('.','p')}_${p.turnX}`;
  const concept={
    id, label:`Design 4 · ${family}`, role:'Design 4 discovery', group:'design-4-discovery', polygonalSweep:true,
    boundaryClearanceFt:1.0,
    units,
    garages:FIXED_GARAGES.map(g=>({...g})),
    drive:ps.B,
    accessPaths:[{garage:'A',path:ps.A},{garage:'B',path:ps.B}],
    parkingProgram:{name:'Two detached 22×22 two-car garages',spacesTotal:4,spacesEnclosed:4},
    second:900,
  };
  L.CONCEPTS[id]=concept;
  const geom=L.validateConcept(concept);
  const access=Access.analyzeConcept(id);
  const parkA=fullParkProof(ps.A,FIXED_GARAGES[0]), parkB=fullParkProof(ps.B,FIXED_GARAGES[1]);
  const capacities=twoStoryCapacity(units), first=units.map(u=>Math.round(area(u)));
  const principalHomesOk=units.every(unitInsidePrincipal);
  const sep=minGarageHomeSep(units);
  const hardOk=principalHomesOk && parkA.ok && parkB.ok && sep>=6 && access.technical!=='FAIL';
  const capacityPenalty=capacities.reduce((s,v)=>s+Math.abs(TARGET-v),0);
  const accessScore=access.technical==='PASS'?180:access.technical==='REVIEW'?105:-500;
  const clearScore=(access.minSouthClear==null?0:Math.min(30,access.minSouthClear*8));
  const capacityScore=Math.max(-120,120-capacityPenalty/7);
  const sepScore=Math.min(30,Math.max(-60,(sep-6)*3));
  const score=accessScore+clearScore+capacityScore+sepScore+(parkA.ok&&parkB.ok?100:-300)+(principalHomesOk?80:-250);
  return { id,family,p,concept,geom,access,parkA,parkB,capacities,first,principalHomesOk,sep,hardOk,score:+score.toFixed(1),curveEnds:{A:ps.aCurveEndX,B:ps.bCurveEndX} };
}

const families=['bar','north-finger','stagger','detached','twin-bars'];
const all=[];
for(const family of families){
  for(let xW=73;xW<=82;xW+=1){
    for(let party=96;party<=104;party+=2){
      if(party<=xW+14) continue;
      for(const south of [29,30,31]){
        for(const spineY of [35.5,36,36.5,37]){
          for(const turnX of [72,74,76,78]){
            if(turnX>=xW) continue;
            for(const wingSouth of [17,19,21]){
              const p={xW,party,south,spineY,turnX,wingX:55,wingSouth,gap:6};
              const c=candidate(family,p); if(c) all.push(c);
            }
          }
        }
      }
    }
  }
}

const ranked=all.slice().sort((a,b)=>b.score-a.score);
const bestByFamily=families.map(f=>ranked.find(c=>c.family===f)).filter(Boolean);
const pursue=bestByFamily.slice().sort((a,b)=>b.score-a.score);
const accessory=garageAccessoryTruth();

function status(c){
  if(!c.hardOk) return c.access.technical==='FAIL'?'FAIL / REWORK':'HOLD';
  if(c.capacities.every(v=>v>=1600)) return 'PURSUE';
  return 'PURSUE · AREA DEVELOPMENT';
}
function round(v,n=2){return typeof v==='number'?+v.toFixed(n):v;}
const summary={
  generatedAt:new Date().toISOString(),
  brief:'Design 4 · two locked detached 22×22 rear garages',
  survey:S.SURVEY,
  accessoryGarageTruth:accessory,
  vehicle:S.SUV_FS,
  searched:all.length,
  families,
  top:pursue.map(c=>({
    id:c.id,family:c.family,status:status(c),score:c.score,params:c.p,
    firstFloor:c.first,twoStoryCapacity:c.capacities,principalHomesOk:c.principalHomesOk,
    garageHomeSeparationFt:c.sep,accessTechnical:c.access.technical,minSouthClearFt:c.access.minSouthClear,
    independent:c.access.independent,threePoint:c.access.threePoint,outboundClear:c.access.outboundClear,
    fullPark:{A:c.parkA,B:c.parkB},curveEnds:c.curveEnds,reasons:c.access.reasons.slice(0,8),
  })),
  overallTop10:ranked.slice(0,10).map(c=>({id:c.id,family:c.family,score:c.score,status:status(c),access:c.access.technical,capacity:c.capacities,minSouthClearFt:c.access.minSouthClear,sep:c.sep})),
};
fs.writeFileSync(path.join(OUT,'results.json'),JSON.stringify(summary,null,2));

for(const c of pursue){
  const svg=L.plan(c.id);
  fs.writeFileSync(path.join(OUT,`${c.id}.svg`),svg);
}

let md=`# Pondy Flats Lot 2 — Design 4 discovery\n\n`;
md+=`**Generated:** ${summary.generatedAt}  \n**Search:** ${all.length} variants across ${families.length} topology families.  \n**Rule:** two detached **22×22** garages locked at the far rear accessory zone; Pennsylvania-only access; full FS-SUV garage entry + enclosed parking required.\n\n`;
md+=`## Locked rear-garage skeleton\n\n`;
md+=`- Garage A: x=5..27, y=5..27.\n- Garage B: x=5..27, y=29..51.\n- Rear target: 5′. North side target: 5′. South actual buffer at x=5: ~${accessory.southApprox5}′.\n- Gap between detached garage plates: ${accessory.gap}′.\n- Each final parking pose uses rear axle x=${PARK_AXLE_X} with the locked 20.5×8.0 FS-SUV fully inside the 22×22 plate.\n- Accessory interpretation remains **ZONING-DEPENDENT / CONDITIONAL** until City confirmation.\n\n`;
md+=`## Five layouts to pursue\n\n`;
md+=`| Rank | Family | Status | Access | 2-story capacity A / B | Min south clear | Garage↔home sep | Score |\n|---:|---|---|---|---:|---:|---:|---:|\n`;
pursue.forEach((c,i)=>{md+=`| ${i+1} | ${c.family} | **${status(c)}** | ${c.access.technical} | ${c.capacities.join(' / ')} SF | ${c.access.minSouthClear??'—'}′ | ${c.sep}′ | ${c.score} |\n`;});
md+=`\n`;
pursue.forEach((c,i)=>{
  md+=`### ${i+1}. ${c.family} — ${status(c)}\n\n`;
  md+=`Candidate \`${c.id}\`. Parameters: west home edge ${c.p.xW}′, party/reference x ${c.p.party}′, south wall y ${c.p.south}′, driveway spine y ${c.p.spineY}′, S-curve start x ${c.p.turnX}′.\n\n`;
  md+=`- First-floor footprint areas: ${c.first.join(' / ')} SF. Two-story shell capacity: ${c.capacities.join(' / ')} SF.\n`;
  md+=`- Principal-home setback fit: ${c.principalHomesOk?'PASS':'REVIEW'}. Garage-to-home separation: ${c.sep}′.\n`;
  md+=`- FS-SUV circulation: **${c.access.technical}**; minimum south-boundary clearance ${c.access.minSouthClear??'—'}′; independent garages ${c.access.independent?'yes':'no'}; outbound clear ${c.access.outboundClear?'yes':'no'}.\n`;
  md+=`- Full enclosed parking pose: Garage A ${c.parkA.ok?'PASS':'FAIL'} (${c.parkA.bounds.minX}..${c.parkA.bounds.maxX} × ${c.parkA.bounds.minY}..${c.parkA.bounds.maxY}); Garage B ${c.parkB.ok?'PASS':'FAIL'} (${c.parkB.bounds.minX}..${c.parkB.bounds.maxX} × ${c.parkB.bounds.minY}..${c.parkB.bounds.maxY}).\n`;
  if(c.access.reasons.length) md+=`- Access notes: ${c.access.reasons.slice(0,3).join(' · ')}\n`;
  md+=`- Diagram: \`qa-artifacts/design4-discovery/${c.id}.svg\`.\n\n`;
});
md+=`## Promotion rule\n\nNo Design 4 option is a zoning/permit PASS yet. Promote a layout into full Design 4 package development only after: (1) accessory classification/setbacks are confirmed or retained as explicit conditional evidence, (2) the selected topology reaches a credible ~1,800 SF/unit room program, and (3) the full inbound/park/outbound swept path is visually audited rather than accepted from metrics alone.\n`;
fs.writeFileSync(path.join(process.cwd(),'docs','lot2-design-4-discovery.md'),md);
fs.writeFileSync(path.join(process.cwd(),'docs','lot2-design-4-discovery.json'),JSON.stringify(summary,null,2));

console.log(JSON.stringify({searched:all.length, accessory, top:summary.top},null,2));
