#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const W=require('../js/lot2-workbench-audit.js');
const D4=require('../js/lot2-design-4.js');

const DEG=Math.PI/180;
const round=(n,p=3)=>Number(n.toFixed(p));
const rotate=([x,y],a)=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)];
const oriented=(cx,cy,angleDeg)=>{
  const a=angleDeg*DEG;
  return [[-11,-11],[11,-11],[11,11],[-11,11]].map(([x,y])=>{const q=rotate([x,y],a);return[cx+q[0],cy+q[1]];});
};
const inside=poly=>poly.every(p=>W.pointInPoly(p,D4.SURVEY));
const clearance=poly=>inside(poly)?W.boundaryDistance(poly,D4.SURVEY):-1;
const homePoly=h=>h.poly||W.rectPoly(h);
const area=poly=>{let s=0;for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];s+=a[0]*b[1]-b[0]*a[1];}return Math.abs(s)/2;};

const homeA=homePoly(D4.HOMES.find(h=>h.unit==='A'));
const currentHomeB=homePoly(D4.HOMES.find(h=>h.unit==='B'));
const homeScenarios=[
  {id:'locked-home-b',label:'Current Home B',poly:currentHomeB,firstFloorSf:area(currentHomeB),planStatus:'CURRENT_PLAN_MODULE'},
  {id:'home-b-compact-x60',label:'Compact Home B site mass',poly:[[60,5],[94.5,5],[94.5,31.25],[60,31.25]],firstFloorSf:(94.5-60)*(31.25-5),planStatus:'REQUIRES_ROOM_REPACK'},
  {id:'home-b-compact-x59',label:'Compact Home B site mass +1 ft',poly:[[59,5],[94.5,5],[94.5,31.25],[59,31.25]],firstFloorSf:(94.5-59)*(31.25-5),planStatus:'REQUIRES_ROOM_REPACK'}
];

function stallAudit(g){
  const a=g.angleDeg*DEG,c=[g.cx,g.cy];
  const toWorld=([x,y])=>{const q=rotate([x,y],a);return[c[0]+q[0],c[1]+q[1]];};
  const polys=[-5.5,5.5].map(y=>{const axle=toWorld([6.25,y]);return W.vehiclePoly(axle[0],axle[1],Math.PI+a,D4.VEHICLE);});
  const pair=W.polygonDistance(polys[0],polys[1]);
  const ok=polys.every(p=>p.every(q=>W.pointInPoly(q,g.poly)))&&!W.polygonsIntersect(polys[0],polys[1])&&pair>=1;
  return {ok,pairFt:round(pair)};
}
function homeGap(poly,homes){return Math.min(...homes.map(h=>W.polygonDistance(poly,h.poly)));}
function individualRank(c,kind){
  const boundaryDef=Math.max(0,5-c.boundaryFt),homeDef=Math.max(0,6-c.homeGapFt);
  const movement=kind==='B'?Math.hypot(c.cx-20.5,c.cy-20.5):Math.hypot(c.cx-16,c.cy-40);
  return boundaryDef*100+homeDef*100+movement+(kind==='B'?Math.abs(c.angleDeg-35)*.5:Math.abs(c.angleDeg)*.15);
}
function trimCandidates(rows,kind){
  // Full hard-pass candidates remain preferred, but nearby candidates stay in the pool so
  // the repair search can explain which target is consuming the scarce rear-yard geometry.
  return rows
    .filter(c=>c.boundaryFt>=3&&c.homeGapFt>=3)
    .sort((a,b)=>individualRank(a,kind)-individualRank(b,kind))
    .slice(0,700);
}
function summarizePair(hs,b,a,gap){
  const hard={
    accessoryFiveFt:b.boundaryFt>=5&&a.boundaryFt>=5,
    allHomeSeparationSixFt:b.homeGapFt>=6&&a.homeGapFt>=6,
    interGarageTwoFt:gap>=2,
    fourStalls:b.stall.ok&&a.stall.ok
  };
  const hardPass=Object.values(hard).every(Boolean);
  const deficits={boundary:Math.max(0,5-b.boundaryFt)+Math.max(0,5-a.boundaryFt),home:Math.max(0,6-b.homeGapFt)+Math.max(0,6-a.homeGapFt),inter:Math.max(0,2-gap)};
  const score=(hardPass?100000:0)-deficits.boundary*1200-deficits.home*900-deficits.inter*700-Math.abs(b.angleDeg-35)*8-Math.hypot(b.cx-20.5,b.cy-20.5)*2-Math.hypot(a.cx-16,a.cy-40)-Math.abs(a.angleDeg)*.5;
  return {scenario:hs.id,scenarioLabel:hs.label,homeB:{poly:hs.poly,firstFloorSf:round(hs.firstFloorSf),twoStoryShellSf:round(hs.firstFloorSf*2),planStatus:hs.planStatus},garageB:{center:[b.cx,b.cy],angleDeg:b.angleDeg,poly:b.poly.map(p=>p.map(v=>round(v))),boundaryFt:round(b.boundaryFt),homeGapFt:round(b.homeGapFt)},garageA:{center:[a.cx,a.cy],angleDeg:a.angleDeg,poly:a.poly.map(p=>p.map(v=>round(v))),boundaryFt:round(a.boundaryFt),homeGapFt:round(a.homeGapFt)},interGarageFt:round(gap),hard,hardPass,deficits:{boundaryFt:round(deficits.boundary),homeFt:round(deficits.home),interGarageFt:round(deficits.inter)},score:round(score,2)};
}

const top=[];
const bestScenario={};
let evaluatedPairCount=0,hardPassCount=0,best=null,bestHardPass=null;
function consider(row){
  evaluatedPairCount++;
  if(row.hardPass){hardPassCount++;if(!bestHardPass||row.score>bestHardPass.score)bestHardPass=row;}
  if(!best||row.score>best.score)best=row;
  if(!bestScenario[row.scenario]||row.score>bestScenario[row.scenario].score)bestScenario[row.scenario]=row;
  if(top.length<30||row.score>top[top.length-1].score){top.push(row);top.sort((a,b)=>b.score-a.score);if(top.length>30)top.length=30;}
}

for(const hs of homeScenarios){
  const homes=[{id:'HOME-B',poly:hs.poly},{id:'HOME-A',poly:homeA}];
  let bCandidates=[];
  for(const bAngle of [30,35]) for(let cx=19;cx<=46;cx+=.5) for(let cy=18;cy<=36;cy+=.5){
    const poly=oriented(cx,cy,bAngle),stall=stallAudit({cx,cy,angleDeg:bAngle,poly});
    if(!inside(poly)||!stall.ok)continue;
    bCandidates.push({cx,cy,angleDeg:bAngle,poly,boundaryFt:clearance(poly),homeGapFt:homeGap(poly,homes),stall});
  }
  let aCandidates=[];
  for(const aAngle of [-40,-30,-20,-10,0,10,20,30,40]) for(let cx=16;cx<=54;cx+=.5) for(let cy=16;cy<=42;cy+=.5){
    const poly=oriented(cx,cy,aAngle),stall=stallAudit({cx,cy,angleDeg:aAngle,poly});
    if(!inside(poly)||!stall.ok)continue;
    aCandidates.push({cx,cy,angleDeg:aAngle,poly,boundaryFt:clearance(poly),homeGapFt:homeGap(poly,homes),stall});
  }
  bCandidates=trimCandidates(bCandidates,'B');
  aCandidates=trimCandidates(aCandidates,'A');
  for(const b of bCandidates)for(const a of aCandidates){
    if(W.polygonsIntersect(b.poly,a.poly))continue;
    consider(summarizePair(hs,b,a,W.polygonDistance(b.poly,a.poly)));
  }
}

const out={schema:'pondy-d4b-static-repair-v2',generatedAt:new Date().toISOString(),sourceRevision:D4.REV,policy:{garageBWorkingAngleDeg:35,garageBFamilyDeg:[30,35],garageAAnglesDeg:[-40,-30,-20,-10,0,10,20,30,40],hardTargets:{accessoryBoundaryFt:5,allGarageToHomeFt:6,interGarageFt:2},locked:['two 22x22 detached garages','four enclosed stalls','Pennsylvania-only access','20.5x8 FS-SUV'],candidateTrim:'up to 700 best individual garage placements per side/scenario after >=3 ft boundary/home prefilter'},evaluatedPairCount,hardPassCount,best,bestHardPass,bestScenario,top,interpretation:hardPassCount?'At least one static 4B placement clears the conservative planning geometry gates; circulation and pavement remain next.':'No tested static 4B placement clears all conservative 5 ft boundary, 6 ft garage-to-home and 2 ft inter-garage targets simultaneously. Keep the 35° Garage B direction, but continue Workbench repair instead of promoting a false pass.'};
const dir=path.join(process.cwd(),'qa-artifacts','design4b');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'static-repair-search.json'),JSON.stringify(out,null,2)+'\n');
const current=bestScenario['locked-home-b'];
fs.writeFileSync(path.join(dir,'static-repair-search.md'),`# Design 4B static repair search\n\n- Non-overlapping pair configurations evaluated: **${out.evaluatedPairCount}**\n- Full conservative static passes: **${out.hardPassCount}**\n- Garage B working direction: **35° clockwise**\n- Current-home result: ${current?`boundary deficit ${current.deficits.boundaryFt} ft; home-separation deficit ${current.deficits.homeFt} ft; inter-garage deficit ${current.deficits.interGarageFt} ft`:'no non-overlapping candidate survived the bounded screen'}\n- Compact Home B cases remain massing hypotheses and require room re-packing before they can become design geometry.\n\n${out.interpretation}\n`);
console.log(JSON.stringify({evaluatedPairCount,hardPassCount,best,bestHardPass,bestScenario},null,2));
