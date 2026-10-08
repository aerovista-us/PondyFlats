(function(global){
'use strict';

const SCHEMA_VERSION='lotscope-roof-geometry-v1';
const REV='D4-ROOF-SOT-v1.1';
const SOURCE='LotScope Workbench roof-geometry contract · aerovista-us/lot-assessment@669f3deb182001726ce1df7dac5657316e4e9b1d';

const ROOFS=Object.freeze([
  Object.freeze({id:'roof-home-b',ownerId:'home-b',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',ownerGeometryKey:'{"id":"home-b","rotationDeg":0,"polygon":[[54,5],[94.5,5],[94.5,31.25],[72.5,31.25],[72.5,22],[54,22]]}',junctionMode:'PLANE_ENVELOPE',zones:Object.freeze([
    Object.freeze({id:'home-b-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',footprint:[[54,5],[94.5,5],[94.5,22],[54,22]],plateZFt:20,ridgeA:[54,13.5],ridgeB:[94.5,13.5],ridgeZFt:24.25,runFt:8.5,solveBy:'PITCH',pitchRise:6,pitchRun:12,pitchRatio:.5,pitch12:'6.00:12',source:'AeroVista Design 4 roof junction solver v1; main east-west gable, 6:12 pitch, 20 ft plate datum. Plane-envelope authority requires the derived junction with the south cross-gable.'}),
    Object.freeze({id:'home-b-roof-zone-2',label:'South cross gable',status:'LOCKED',type:'gable',footprint:[[72.5,13.5],[94.5,13.5],[94.5,31.25],[72.5,31.25]],plateZFt:20,ridgeA:[83.5,13.5],ridgeB:[83.5,31.25],ridgeZFt:24.25,ridgeZCheckFt:24.25,runFt:11,solveBy:'PITCH',pitchRise:4.6363636364,pitchRun:12,pitchRatio:.38636363636666665,pitch12:'4.64:12',source:'AeroVista Design 4 roof junction solver v1; perpendicular south cross-gable. Pitch is geometry-derived at 4.63636:12 from the 11 ft run and 4.25 ft rise required to meet the 24.25 ft main-gable ridge continuously at the north T-junction. 20 ft plate datum; overlap is resolved by derived valley plane intersections.'})
  ]),junctions:Object.freeze([Object.freeze({status:'SOLVED',kind:'VALLEY',overlapPolygon:[[72.5,13.5],[94.5,13.5],[94.5,22],[72.5,22]],overlapAreaSqFt:187,errors:Object.freeze([]),segments:Object.freeze([
    Object.freeze({id:'home-b-valley-west',kind:'VALLEY',zoneIds:['home-b-roof-zone-1','home-b-roof-zone-2'],a:[83.5,13.5],b:[72.5,22],zAFt:24.25,zBFt:20,residualFt:0}),
    Object.freeze({id:'home-b-valley-east',kind:'VALLEY',zoneIds:['home-b-roof-zone-1','home-b-roof-zone-2'],a:[83.5,13.5],b:[94.5,22],zAFt:24.25,zBFt:20,residualFt:0})
  ])})]),surfaceFaces:Object.freeze([
    Object.freeze({id:'home-b-roof-zone-1-side-neg-1',zoneId:'home-b-roof-zone-1',side:-1,polygon:[[72.5,13.5,24.25],[72.5,5,20],[83.5,13.500000000066663,24.25000000003333]],projectedAreaSqFt:46.75,plane:{a:0,b:.5,c:17.5}}),
    Object.freeze({id:'home-b-roof-zone-1-side-neg-2',zoneId:'home-b-roof-zone-1',side:-1,polygon:[[83.49999999991373,13.5,24.25],[72.5,5,20],[83.5,5,20]],projectedAreaSqFt:46.75,plane:{a:0,b:.5,c:17.5}}),
    Object.freeze({id:'home-b-roof-zone-1-side-neg-3',zoneId:'home-b-roof-zone-1',side:-1,polygon:[[94.5,13.5,24.25],[83.5,13.5,24.25],[94.5,5,20]],projectedAreaSqFt:46.75,plane:{a:0,b:.5,c:17.5}}),
    Object.freeze({id:'home-b-roof-zone-1-side-neg-4',zoneId:'home-b-roof-zone-1',side:-1,polygon:[[83.50000000008627,13.5,24.25],[83.5,5,20],[94.5,5,20]],projectedAreaSqFt:46.75,plane:{a:0,b:.5,c:17.5}}),
    Object.freeze({id:'home-b-roof-zone-1-side-neg-5',zoneId:'home-b-roof-zone-1',side:-1,polygon:[[54,5,20],[72.5,5,20],[72.5,13.5,24.25],[54,13.5,24.25]],projectedAreaSqFt:157.25,plane:{a:0,b:.5,c:17.5}}),
    Object.freeze({id:'home-b-roof-zone-1-side-pos-6',zoneId:'home-b-roof-zone-1',side:1,polygon:[[72.5,22,20],[72.5,13.5,24.25],[83.5,13.5,24.25]],projectedAreaSqFt:46.75,plane:{a:0,b:-.5,c:31}}),
    Object.freeze({id:'home-b-roof-zone-1-side-pos-7',zoneId:'home-b-roof-zone-1',side:1,polygon:[[94.5,22,20],[83.5,13.499999999933337,24.25000000003333],[94.5,13.5,24.25]],projectedAreaSqFt:46.75,plane:{a:0,b:-.5,c:31}}),
    Object.freeze({id:'home-b-roof-zone-1-side-pos-8',zoneId:'home-b-roof-zone-1',side:1,polygon:[[54,13.5,24.25],[72.5,13.5,24.25],[72.5,22,20],[54,22,20]],projectedAreaSqFt:157.25,plane:{a:0,b:-.5,c:31}}),
    Object.freeze({id:'home-b-roof-zone-2-side-neg-9',zoneId:'home-b-roof-zone-2',side:-1,polygon:[[83.5,22,24.25000000003333],[83.5,13.5,24.25000000003333],[94.5,22,20]],projectedAreaSqFt:46.75,plane:{a:-.38636363636666665,b:0,c:56.511363636649996}}),
    Object.freeze({id:'home-b-roof-zone-2-side-neg-10',zoneId:'home-b-roof-zone-2',side:-1,polygon:[[83.5,31.25,24.25000000003333],[83.5,22,24.25000000003333],[94.5,22,20],[94.5,31.25,20]],projectedAreaSqFt:101.75,plane:{a:-.38636363636666665,b:0,c:56.511363636649996}}),
    Object.freeze({id:'home-b-roof-zone-2-side-pos-11',zoneId:'home-b-roof-zone-2',side:1,polygon:[[72.5,22,20],[83.49999999991373,13.5,24.25],[83.5,22,24.25000000003333]],projectedAreaSqFt:46.75,plane:{a:.38636363636666665,b:0,c:-8.011363636583333}}),
    Object.freeze({id:'home-b-roof-zone-2-side-pos-12',zoneId:'home-b-roof-zone-2',side:1,polygon:[[72.5,22,20],[83.5,22,24.25000000003333],[83.5,31.25,24.25000000003333],[72.5,31.25,20]],projectedAreaSqFt:101.75,plane:{a:.38636363636666665,b:0,c:-8.011363636583333}})
  ])}),
  Object.freeze({id:'roof-home-a',ownerId:'home-a',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',ownerGeometryKey:'{"id":"home-a","rotationDeg":0,"polygon":[[94.5,5],[128,5],[128,31.25],[94.5,31.25]]}',junctionMode:'TILED',zones:Object.freeze([
    Object.freeze({id:'home-a-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',footprint:[[94.5,5],[128,5],[128,31.25],[94.5,31.25]],plateZFt:20,ridgeA:[94.5,18.125],ridgeB:[128,18.125],ridgeZFt:26.5625,runFt:13.125,solveBy:'PITCH',pitchRise:6,pitchRun:12,pitchRatio:.5,pitch12:'6.00:12',source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 20 ft home working wall datum promoted to roof plate datum. Home A single rectangular gable.'})
  ]),junctions:Object.freeze([]),surfaceFaces:Object.freeze([
    Object.freeze({id:'home-a-roof-zone-1-side-neg-1',zoneId:'home-a-roof-zone-1',side:-1,polygon:[[128,5,20],[128,18.125,26.5625],[94.5,18.125,26.5625],[94.5,5,20]],projectedAreaSqFt:439.6875,plane:{a:0,b:.5,c:17.5}}),
    Object.freeze({id:'home-a-roof-zone-1-side-pos-2',zoneId:'home-a-roof-zone-1',side:1,polygon:[[128,18.125,26.5625],[128,31.25,20],[94.5,31.25,20],[94.5,18.125,26.5625]],projectedAreaSqFt:439.6875,plane:{a:0,b:-.5,c:35.625}})
  ])}),
  Object.freeze({id:'roof-garage-b',ownerId:'garage-b',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',ownerGeometryKey:'{"id":"garage-b","rotationDeg":0,"polygon":[[5,5],[27,5],[27,27],[5,27]]}',junctionMode:'TILED',zones:Object.freeze([
    Object.freeze({id:'garage-b-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',footprint:[[5,5],[27,5],[27,27],[5,27]],plateZFt:11,ridgeA:[5,16],ridgeB:[27,16],ridgeZFt:16.5,runFt:11,solveBy:'PITCH',pitchRise:6,pitchRun:12,pitchRatio:.5,pitch12:'6.00:12',source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 11 ft garage working wall datum promoted to roof plate datum. Garage B west-east ridge; east overhead-door wall is a gable end.'})
  ]),junctions:Object.freeze([]),surfaceFaces:Object.freeze([
    Object.freeze({id:'garage-b-roof-zone-1-side-neg-1',zoneId:'garage-b-roof-zone-1',side:-1,polygon:[[27,5,11],[27,16,16.5],[5,16,16.5],[5,5,11]],projectedAreaSqFt:242,plane:{a:0,b:.5,c:8.5}}),
    Object.freeze({id:'garage-b-roof-zone-1-side-pos-2',zoneId:'garage-b-roof-zone-1',side:1,polygon:[[27,16,16.5],[27,27,11],[5,27,11],[5,16,16.5]],projectedAreaSqFt:242,plane:{a:0,b:-.5,c:24.5}})
  ])}),
  Object.freeze({id:'roof-garage-a',ownerId:'garage-a',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',ownerGeometryKey:'{"id":"garage-a","rotationDeg":0,"polygon":[[5,29],[27,29],[27,51],[5,51]]}',junctionMode:'TILED',zones:Object.freeze([
    Object.freeze({id:'garage-a-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',footprint:[[5,29],[27,29],[27,51],[5,51]],plateZFt:11,ridgeA:[5,40],ridgeB:[27,40],ridgeZFt:16.5,runFt:11,solveBy:'PITCH',pitchRise:6,pitchRun:12,pitchRatio:.5,pitch12:'6.00:12',source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 11 ft garage working wall datum promoted to roof plate datum. Garage A west-east ridge; east overhead-door wall is a gable end.'})
  ]),junctions:Object.freeze([]),surfaceFaces:Object.freeze([
    Object.freeze({id:'garage-a-roof-zone-1-side-neg-1',zoneId:'garage-a-roof-zone-1',side:-1,polygon:[[27,29,11],[27,40,16.5],[5,40,16.5],[5,29,11]],projectedAreaSqFt:242,plane:{a:0,b:.5,c:-3.5}}),
    Object.freeze({id:'garage-a-roof-zone-1-side-pos-2',zoneId:'garage-a-roof-zone-1',side:1,polygon:[[27,40,16.5],[27,51,11],[5,51,11],[5,40,16.5]],projectedAreaSqFt:242,plane:{a:0,b:-.5,c:36.5}})
  ])})
]);

function normalizeOwnerId(value){
  return String(value||'').trim().toLowerCase();
}
function roofForOwner(ownerId){
  const key=normalizeOwnerId(ownerId);
  return ROOFS.find(roof=>roof.ownerId===key)||null;
}
function finitePoint(value){
  return Array.isArray(value)
    && value.length===2
    && typeof value[0]==='number'&&Number.isFinite(value[0])
    && typeof value[1]==='number'&&Number.isFinite(value[1]);
}
function dot(a,b){return a[0]*b[0]+a[1]*b[1];}
function sub(a,b){return [a[0]-b[0],a[1]-b[1]];}
function cross(a,b){return a[0]*b[1]-a[1]*b[0];}
function normalize(v){
  const length=Math.hypot(v[0],v[1]);
  return length>1e-9?[v[0]/length,v[1]/length]:null;
}
function pointOnSegment(point,a,b,epsilon=0.02){
  const ab=sub(b,a),ap=sub(point,a);
  if(Math.abs(cross(ab,ap))>epsilon*Math.max(1,Math.hypot(ab[0],ab[1])))return false;
  const projected=dot(ap,ab),lengthSq=dot(ab,ab);
  return projected>=-epsilon&&projected<=lengthSq+epsilon;
}
function pointInPolygon(point,polygon){
  if(polygon.some((a,index)=>pointOnSegment(point,a,polygon[(index+1)%polygon.length])))return true;
  let inside=false;
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
    const a=polygon[i],b=polygon[j];
    if(((a[1]>point[1])!==(b[1]>point[1]))&&point[0]<(b[0]-a[0])*(point[1]-a[1])/((b[1]-a[1])||1e-12)+a[0])inside=!inside;
  }
  return inside;
}
function rectangleIsValid(polygon){
  if(!Array.isArray(polygon)||polygon.length!==4||!polygon.every(finitePoint))return false;
  const edges=polygon.map((point,index)=>sub(polygon[(index+1)%polygon.length],point));
  const lengths=edges.map(edge=>Math.hypot(edge[0],edge[1]));
  if(lengths.some(length=>length<=0.02))return false;
  for(let i=0;i<4;i++){
    const next=(i+1)%4;
    if(Math.abs(dot(edges[i],edges[next])/(lengths[i]*lengths[next]))>0.002)return false;
  }
  for(let i=0;i<2;i++){
    if(Math.abs(cross(edges[i],edges[i+2])/(lengths[i]*lengths[i+2]))>0.002)return false;
  }
  const signedArea=polygon.reduce((sum,point,index)=>{
    const next=polygon[(index+1)%polygon.length];
    return sum+point[0]*next[1]-next[0]*point[1];
  },0)/2;
  return Math.abs(signedArea)>0.0004;
}
function ridgeMatchesRectangleAxis(zone){
  const p=zone.footprint;
  const edges=p.map((point,index)=>sub(p[(index+1)%4],point));
  const mids=p.map((point,index)=>{
    const next=p[(index+1)%4];
    return [(point[0]+next[0])/2,(point[1]+next[1])/2];
  });
  const ridgeDir=normalize(sub(zone.ridgeB,zone.ridgeA));
  if(!ridgeDir)return false;
  const matchesPair=(edgeIndexA,edgeIndexB)=>{
    const edgeDir=normalize(edges[(edgeIndexA+1)%4]);
    if(!edgeDir)return false;
    if(Math.abs(cross(ridgeDir,edgeDir))>0.002)return false;
    const ma=mids[edgeIndexA],mb=mids[edgeIndexB];
    const direct=Math.hypot(zone.ridgeA[0]-ma[0],zone.ridgeA[1]-ma[1])<=0.03
      &&Math.hypot(zone.ridgeB[0]-mb[0],zone.ridgeB[1]-mb[1])<=0.03;
    const reverse=Math.hypot(zone.ridgeA[0]-mb[0],zone.ridgeA[1]-mb[1])<=0.03
      &&Math.hypot(zone.ridgeB[0]-ma[0],zone.ridgeB[1]-ma[1])<=0.03;
    return direct||reverse;
  };
  return matchesPair(0,2)||matchesPair(1,3);
}
function zoneIsAuthoritative(zone){
  if(!zone||zone.status!=='LOCKED'||zone.type!=='gable')return false;
  if(!rectangleIsValid(zone.footprint))return false;
  if(!finitePoint(zone.ridgeA)||!finitePoint(zone.ridgeB)||!Number.isFinite(zone.plateZFt))return false;
  if(!ridgeMatchesRectangleAxis(zone))return false;
  if(typeof zone.source!=='string'||!zone.source.trim())return false;
  const ridge=normalize(sub(zone.ridgeB,zone.ridgeA));
  if(!ridge)return false;
  if(!pointInPolygon(zone.ridgeA,zone.footprint)||!pointInPolygon(zone.ridgeB,zone.footprint))return false;
  const normal=[-ridge[1],ridge[0]];
  const ridgeCross=dot(zone.ridgeA,normal);
  const crossValues=zone.footprint.map(point=>dot(point,normal));
  const low=Math.min(...crossValues),high=Math.max(...crossValues);
  const runLow=ridgeCross-low,runHigh=high-ridgeCross;
  if(runLow<=0.02||runHigh<=0.02||Math.abs(runLow-runHigh)>0.03)return false;
  const axisValues=zone.footprint.map(point=>dot(point,ridge));
  const endpoints=[dot(zone.ridgeA,ridge),dot(zone.ridgeB,ridge)].sort((a,b)=>a-b);
  if(Math.abs(endpoints[0]-Math.min(...axisValues))>0.03||Math.abs(endpoints[1]-Math.max(...axisValues))>0.03)return false;
  if(zone.solveBy==='PITCH'){
    if(!Number.isFinite(zone.pitchRise)||!Number.isFinite(zone.pitchRun)||zone.pitchRise<=0||zone.pitchRun<=0)return false;
    const pitchRatio=zone.pitchRise/zone.pitchRun;
    const derivedRidgeZ=zone.plateZFt+((runLow+runHigh)/2)*pitchRatio;
    if(!Number.isFinite(pitchRatio)||!Number.isFinite(derivedRidgeZ)||derivedRidgeZ<=zone.plateZFt)return false;
  }else if(zone.solveBy==='RIDGE_Z'){
    if(!Number.isFinite(zone.ridgeZFt)||zone.ridgeZFt<=zone.plateZFt)return false;
  }else return false;
  return true;
}
function finite3(point){
  return Array.isArray(point)&&point.length===3&&point.every(value=>typeof value==='number'&&Number.isFinite(value));
}
function polygonAreaAbs(polygon){
  if(!Array.isArray(polygon)||polygon.length<3)return NaN;
  return Math.abs(polygon.reduce((sum,point,index)=>{
    const next=polygon[(index+1)%polygon.length];
    return sum+point[0]*next[1]-next[0]*point[1];
  },0)/2);
}
function ownerAreaFromKey(roof){
  try{
    const parsed=JSON.parse(roof.ownerGeometryKey);
    return polygonAreaAbs(parsed.polygon);
  }catch(_error){return NaN;}
}
function surfaceFacesAreAuthoritative(roof){
  if(!Array.isArray(roof.surfaceFaces)||roof.surfaceFaces.length<1)return false;
  const zoneIds=new Set(roof.zones.map(zone=>zone.id));
  let area=0;
  for(const face of roof.surfaceFaces){
    if(!face||typeof face.id!=='string'||!zoneIds.has(face.zoneId)||![-1,1].includes(face.side))return false;
    if(!Array.isArray(face.polygon)||face.polygon.length<3||!face.polygon.every(finite3))return false;
    if(!Number.isFinite(face.projectedAreaSqFt)||face.projectedAreaSqFt<=0)return false;
    if(!face.plane||![face.plane.a,face.plane.b,face.plane.c].every(Number.isFinite))return false;
    area+=face.projectedAreaSqFt;
  }
  const ownerArea=ownerAreaFromKey(roof);
  return Number.isFinite(ownerArea)&&Math.abs(area-ownerArea)<=1e-6;
}
function junctionsAreAuthoritative(roof){
  const mode=roof.junctionMode||'TILED';
  if(mode==='TILED')return !roof.junctions||roof.junctions.length===0;
  if(mode!=='PLANE_ENVELOPE'||!Array.isArray(roof.junctions)||roof.junctions.length!==1)return false;
  const junction=roof.junctions[0];
  if(!junction||junction.status!=='SOLVED'||!(junction.overlapAreaSqFt>0)||!Array.isArray(junction.overlapPolygon)||junction.overlapPolygon.length<3||!junction.overlapPolygon.every(finitePoint))return false;
  if(!Array.isArray(junction.segments)||junction.segments.length<1)return false;
  const zoneIds=new Set(roof.zones.map(zone=>zone.id));
  return junction.segments.every(segment=>{
    if(!segment||!['VALLEY','RIDGE'].includes(segment.kind))return false;
    if(!Array.isArray(segment.zoneIds)||segment.zoneIds.length!==2||!segment.zoneIds.every(id=>zoneIds.has(id)))return false;
    if(!finitePoint(segment.a)||!finitePoint(segment.b))return false;
    if(!Number.isFinite(segment.zAFt)||!Number.isFinite(segment.zBFt)||!Number.isFinite(segment.residualFt)||segment.residualFt>.02)return false;
    return Math.hypot(segment.b[0]-segment.a[0],segment.b[1]-segment.a[1])>.02;
  });
}
function roofIsAuthoritative(roof){
  return Boolean(
    roof&&
    roof.status==='LOCKED'&&
    roof.validationStatus==='ROOF_GEOMETRY_LOCKED'&&
    typeof roof.ownerGeometryKey==='string'&&roof.ownerGeometryKey.length>0&&
    Array.isArray(roof.zones)&&roof.zones.length>0&&
    roof.zones.every(zoneIsAuthoritative)&&
    junctionsAreAuthoritative(roof)&&
    surfaceFacesAreAuthoritative(roof)
  );
}
function statusForOwner(ownerId){
  const roof=roofForOwner(ownerId);
  if(!roof)return {ownerId:normalizeOwnerId(ownerId),status:'NO_MODEL',authoritative:false,renderPolicy:'SUPPRESS_ROOF'};
  return {
    ownerId:roof.ownerId,
    status:roof.validationStatus||roof.status||'CONCEPT_ONLY',
    authoritative:roofIsAuthoritative(roof),
    renderPolicy:roofIsAuthoritative(roof)?'AUTHORITATIVE_ROOF_ALLOWED':'SUPPRESS_ROOF',
    reason:roof.staleReason||null
  };
}
function analyze(){
  const owners=['home-b','home-a','garage-b','garage-a'];
  const results=owners.map(statusForOwner);
  const locked=results.filter(row=>row.authoritative).length;
  return {
    schemaVersion:SCHEMA_VERSION,
    rev:REV,
    source:SOURCE,
    status:locked===owners.length?'AUTHORITATIVE_ALLOWED':'CONCEPT_ONLY_REQUIRED',
    locked,
    required:owners.length,
    results,
    rule:'No customer-facing view may invent ridge location, pitch, eave geometry or roof silhouette when the Workbench roof model is not geometry-locked.'
  };
}

const api=Object.freeze({SCHEMA_VERSION,REV,SOURCE,ROOFS,roofForOwner,roofIsAuthoritative,junctionsAreAuthoritative,surfaceFacesAreAuthoritative,statusForOwner,analyze});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4RoofSOT=api;
})(typeof window!=='undefined'?window:globalThis);
