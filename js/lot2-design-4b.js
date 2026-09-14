(function(global){
'use strict';

const D4=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4.js'):global.Lot2Design4;
const W=(typeof module!=='undefined'&&module.exports)?require('./lot2-workbench-audit.js'):global.Lot2WorkbenchAudit;
const DEG=Math.PI/180;
const REV='D4B-ROTATED-B-v0.1';
const ANGLE_DEG=35;
const ANGLE=ANGLE_DEG*DEG;
// 4B is the same topology/program as Design 4. Only Garage B is the rotated study target.
// This +4.5/+4.5 ft translation keeps the rotated 22x22 plate near the conservative 5 ft
// rear/side planning envelope. Garage A placement is intentionally NOT promoted here: the
// rotation study must repair the resulting garage-to-garage conflict before public promotion.
const SHIFT=[4.5,4.5];

const rotate=([x,y],a=ANGLE)=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const round=(n,p=3)=>Number(n.toFixed(p));
const baseB=D4.GARAGES.find(g=>g.unit==='B');
const baseCenter=[baseB.x+baseB.w/2,baseB.y+baseB.d/2];
const center=[baseCenter[0]+SHIFT[0],baseCenter[1]+SHIFT[1]];
const localToWorld=p=>add(center,rotate(p));
const garagePoly=[[-11,-11],[11,-11],[11,11],[-11,11]].map(localToWorld);
const door=[localToWorld([11,-10]),localToWorld([11,10])];
const stalls=[-5.5,5.5].map((localY,i)=>{
  const axle=localToWorld([6.25,localY]);
  return {id:i===0?'B-NORTH':'B-SOUTH',unit:'B',axleX:axle[0],axleY:axle[1],heading:Math.PI+ANGLE};
});

function staticAudit(){
  const pairPolys=stalls.map(s=>W.vehiclePoly(s.axleX,s.axleY,s.heading,D4.VEHICLE));
  const inside=pairPolys.every(poly=>poly.every(p=>W.pointInPoly(p,garagePoly)));
  const pair=W.polygonDistance(pairPolys[0],pairPolys[1]);
  const boundary=garagePoly.every(p=>W.pointInPoly(p,D4.SURVEY))?W.boundaryDistance(garagePoly,D4.SURVEY):-1;
  const garageA=D4.GARAGES.find(g=>g.unit==='A');
  const garageAPoly=W.rectPoly(garageA);
  const interGarage=W.polygonsIntersect(garagePoly,garageAPoly)?0:W.polygonDistance(garagePoly,garageAPoly);
  const homeGaps=D4.HOMES.map(h=>({id:h.id,gapFt:W.polygonDistance(garagePoly,h.poly||W.rectPoly(h))}));
  return {
    status:'ITERATE',
    variant:'Design 4B',
    angleDeg:ANGLE_DEG,
    rotation:'CLOCKWISE_VISUAL',
    center:center.map(v=>round(v)),
    shiftFt:SHIFT,
    garagePoly:garagePoly.map(p=>p.map(v=>round(v))),
    door:door.map(p=>p.map(v=>round(v))),
    stalls:stalls.map(s=>({id:s.id,axle:[round(s.axleX),round(s.axleY)],headingDeg:round(s.heading/DEG,2)})),
    fourStallProgramPreserved:inside&&pair>=1,
    pairClearanceFt:round(pair),
    accessoryBoundaryClearanceFt:round(boundary),
    interGarageClearanceFt:round(interGarage),
    homeGapsFt:Object.fromEntries(homeGaps.map(x=>[x.id,round(x.gapFt)])),
    promotionReady:false,
    blocker:'Garage B rotation is encoded, but Garage A / local site geometry must be repositioned before the rotated variant can become the Design 4 source-of-truth geometry.'
  };
}

const api={REV,ANGLE_DEG,ANGLE,SHIFT,center,garagePoly,door,stalls,staticAudit};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4B=api;
})(typeof window!=='undefined'?window:globalThis);
