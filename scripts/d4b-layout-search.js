#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const W=require('../js/lot2-workbench-audit.js');
const D4=require('../js/lot2-design-4.js');

const DEG=Math.PI/180;
const NON_FRONT_EDGES=[0,2,3,4,5]; // all parcel boundaries except Pennsylvania frontage edge 1
const round=(n,p=3)=>Number(n.toFixed(p));
const rotate=([x,y],a)=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)];
const oriented=(cx,cy,angleDeg)=>{
  const a=angleDeg*DEG;
  return [[-11,-11],[11,-11],[11,11],[-11,11]].map(([x,y])=>{const q=rotate([x,y],a);return[cx+q[0],cy+q[1]];});
};
const inside=poly=>poly.every(p=>W.pointInPoly(p,D4.SURVEY));
const nonFrontBoundary=poly=>inside(poly)?W.boundaryDistance(poly,D4.SURVEY,NON_FRONT_EDGES):-1;
const homePoly=h=>h.poly||W.rectPoly(h);
const area=poly=>{let s=0;for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];s+=a[0]*b[1]-b[0]*a[1];}return Math.abs(s)/2;};
const currentHomeB=homePoly(D4.HOMES.find(h=>h.unit==='B'));
const homeA=homePoly(D4.HOMES.find(h=>h.unit==='A'));
const homes=[
  {id:'locked-home-b',label:'Current Home B',poly:currentHomeB,planStatus:'CURRENT_PLAN_MODULE'},
  {id:'compact-home-b-x60',label:'Compact Home B massing hypothesis',poly:[[60,5],[94.5,5],[94.5,31.25],[60,31.25]],planStatus:'REQUIRES_ROOM_REPACK'},
  {id:'compact-home-b-x59',label:'Compact Home B massing hypothesis +1 ft width',poly:[[59,5],[94.5,5],[94.5,31.25],[59,31.25]],planStatus:'REQUIRES_ROOM_REPACK'}
];

function stallAudit(cx,cy,angleDeg){
  const a=angleDeg*DEG;
  const poly=oriented(cx,cy,angleDeg);
  const toWorld=([x,y])=>{const q=rotate([x,y],a);return[cx+q[0],cy+q[1]];};
  const stalls=[-5.5,5.5].map((localY,index)=>{const axle=toWorld([6.25,localY]);return{id:index===0?'NORTH':'SOUTH',axle,heading:Math.PI+a,poly:W.vehiclePoly(axle[0],axle[1],Math.PI+a,D4.VEHICLE)};});
  const pair=W.polygonDistance(stalls[0].poly,stalls[1].poly);
  const ok=stalls.every(s=>s.poly.every(p=>W.pointInPoly(p,poly)))&&!W.polygonsIntersect(stalls[0].poly,stalls[1].poly)&&pair>=1;
  return{ok,pairFt:round(pair),stalls:stalls.map(s=>({id:s.id,axle:s.axle.map(v=>round(v)),headingDeg:round(s.heading/DEG,2)}))};
}
function gapToHomes(poly,homeB){return Math.min(W.polygonDistance(poly,homeB),W.polygonDistance(poly,homeA));}
function candidate(cx,cy,angleDeg,homeB){
  const poly=oriented(cx,cy,angleDeg);
  if(!inside(poly))return null;
  const stalls=stallAudit(cx,cy,angleDeg);
  if(!stalls.ok)return null;
  return{cx,cy,angleDeg,poly,boundaryFt:nonFrontBoundary(poly),homeGapFt:gapToHomes(poly,homeB),stalls};
}
function packGarage(c){return{center:[round(c.cx),round(c.cy)],angleDeg:c.angleDeg,poly:c.poly.map(p=>p.map(v=>round(v))),boundaryFt:round(c.boundaryFt),homeGapFt:round(c.homeGapFt),pairClearanceFt:c.stalls.pairFt,stalls:c.stalls.stalls};}
function pairScore(b,a,boundaryTarget){
  const gap=W.polygonDistance(b.poly,a.poly);
  const boundaryDef=Math.max(0,boundaryTarget-b.boundaryFt)+Math.max(0,boundaryTarget-a.boundaryFt);
  const homeDef=Math.max(0,6-b.homeGapFt)+Math.max(0,6-a.homeGapFt);
  const interTargetDef=Math.max(0,2-gap);
  const staticPass=boundaryDef<1e-6&&homeDef<1e-6&&!W.polygonsIntersect(b.poly,a.poly);
  const shiftB=Math.hypot(b.cx-16,b.cy-16);
  const shiftA=Math.hypot(a.cx-16,a.cy-40);
  return{gap,boundaryDef,homeDef,interTargetDef,staticPass,score:(staticPass?100000:0)+Math.min(gap,6)*350-boundaryDef*1800-homeDef*1400-interTargetDef*350-Math.abs(b.angleDeg-35)*20-shiftB*3-shiftA*2-Math.abs(a.angleDeg)*0.6};
}
function searchScenario(home,boundaryTarget){
  const bCandidates=[],aCandidates=[];
  for(const angleDeg of [30,35])for(let cx=18;cx<=48;cx+=1)for(let cy=16;cy<=39;cy+=1){const c=candidate(cx,cy,angleDeg,home.poly);if(c)bCandidates.push(c);}
  for(const angleDeg of [-45,-30,-15,0,15,30,45])for(let cx=12;cx<=52;cx+=1)for(let cy=14;cy<=44;cy+=1){const c=candidate(cx,cy,angleDeg,home.poly);if(c)aCandidates.push(c);}
  let evaluated=0,best=null,bestPass=null;
  const top=[];
  for(const b of bCandidates){
    for(const a of aCandidates){
      if(W.polygonsIntersect(b.poly,a.poly))continue;
      evaluated++;
      const m=pairScore(b,a,boundaryTarget);
      const row={homeScenario:home.id,homeLabel:home.label,homeB:{poly:home.poly,firstFloorSf:round(area(home.poly)),twoStoryShellSf:round(area(home.poly)*2),planStatus:home.planStatus},boundaryTargetFt:boundaryTarget,garageB:packGarage(b),garageA:packGarage(a),interGarageFt:round(m.gap),staticPass:m.staticPass,deficits:{boundaryFt:round(m.boundaryDef),homeFt:round(m.homeDef),interGarageComfortFt:round(m.interTargetDef)},score:round(m.score,2)};
      if(!best||row.score>best.score)best=row;
      if(row.staticPass&&(!bestPass||row.score>bestPass.score))bestPass=row;
      if(top.length<15||row.score>top[top.length-1].score){top.push(row);top.sort((x,y)=>y.score-x.score);if(top.length>15)top.length=15;}
    }
  }
  return{homeScenario:home.id,boundaryTargetFt:boundaryTarget,bCandidateCount:bCandidates.length,aCandidateCount:aCandidates.length,evaluatedPairCount:evaluated,best,bestPass,top};
}

const scenarios=[];
for(const home of homes){
  scenarios.push(searchScenario(home,5));
  scenarios.push(searchScenario(home,3)); // explicit sensitivity only; never silently promoted as the default rule
}
const defaultPasses=scenarios.filter(s=>s.boundaryTargetFt===5&&s.bestPass).map(s=>s.bestPass).sort((a,b)=>b.score-a.score);
const exceptionPasses=scenarios.filter(s=>s.boundaryTargetFt===3&&s.bestPass).map(s=>s.bestPass).sort((a,b)=>b.score-a.score);
const out={schema:'pondy-d4b-layout-search-v1',generatedAt:new Date().toISOString(),sourceRevision:D4.REV,policy:{garageBWorkingAngleDeg:35,garageBFamilyDeg:[30,35],garageAAnglesDeg:[-45,-30,-15,0,15,30,45],nonFrontBoundaryEdges:NON_FRONT_EDGES,defaultAccessoryBoundaryTargetFt:5,exceptionSensitivityFt:3,garageHomeTargetFt:6,interGarageGap:'no overlap is hard; 2 ft is a scored planning comfort target pending AHJ/fire/eave/drainage interpretation',locked:['two 22x22 detached garages','four enclosed stalls','Pennsylvania-only access','20.5x8 FS-SUV','25 ft minimum rear-axle radius']},scenarios,defaultBestPass:defaultPasses[0]||null,exceptionBestPass:exceptionPasses[0]||null,interpretation:defaultPasses.length?'The search found a static 4B layout that preserves the locked garage/stall program under the conservative 5 ft non-front boundary target. It is eligible for rotation-aware circulation and pavement proof, not public promotion yet.':exceptionPasses.length?'No conservative 5 ft static pass was found, but an explicitly labeled 3 ft sensitivity case exists. Keep it as a zoning/AHJ hypothesis only; do not promote it as the default.':'No tested joint placement clears the static planning screen. Continue geometry repair before motion or public promotion.'};
const dir=path.join(process.cwd(),'qa-artifacts','design4b');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'layout-search.json'),JSON.stringify(out,null,2)+'\n');
const lines=['# Design 4B joint layout search','',`Default 5 ft pass: **${out.defaultBestPass?'FOUND':'NONE'}**`,`Explicit 3 ft sensitivity pass: **${out.exceptionBestPass?'FOUND':'NONE'}**`,'',out.interpretation];
if(out.defaultBestPass)lines.push('',`Best 5 ft candidate: Garage B ${out.defaultBestPass.garageB.angleDeg}° @ ${out.defaultBestPass.garageB.center.join(', ')}; Garage A ${out.defaultBestPass.garageA.angleDeg}° @ ${out.defaultBestPass.garageA.center.join(', ')}; inter-garage ${out.defaultBestPass.interGarageFt} ft.`);
if(out.exceptionBestPass)lines.push('',`Best 3 ft sensitivity candidate: Garage B ${out.exceptionBestPass.garageB.angleDeg}° @ ${out.exceptionBestPass.garageB.center.join(', ')}; Garage A ${out.exceptionBestPass.garageA.angleDeg}° @ ${out.exceptionBestPass.garageA.center.join(', ')}; inter-garage ${out.exceptionBestPass.interGarageFt} ft.`);
fs.writeFileSync(path.join(dir,'layout-search.md'),lines.join('\n')+'\n');
console.log(JSON.stringify({defaultBestPass:out.defaultBestPass,exceptionBestPass:out.exceptionBestPass,scenarioStats:scenarios.map(s=>({homeScenario:s.homeScenario,boundaryTargetFt:s.boundaryTargetFt,bCandidates:s.bCandidateCount,aCandidates:s.aCandidateCount,evaluated:s.evaluatedPairCount,pass:Boolean(s.bestPass),best:s.best&&{score:s.best.score,deficits:s.best.deficits,garageB:s.best.garageB,garageA:s.best.garageA,interGarageFt:s.best.interGarageFt}}))},null,2));
