(function(global){
'use strict';

const SCHEMA_VERSION='lotscope-roof-geometry-v1';
const REV='D4-ROOF-SOT-v0.1';
const SOURCE='LotScope Workbench roof-geometry contract';

const ROOFS=Object.freeze([
  Object.freeze({id:'roof-home-b',ownerId:'home-b',status:'UNLOCKED',validationStatus:'CONCEPT_ONLY',ownerGeometryKey:null,zones:Object.freeze([]),staleReason:'Design 4 roof geometry has not been adopted in Workbench.'}),
  Object.freeze({id:'roof-home-a',ownerId:'home-a',status:'UNLOCKED',validationStatus:'CONCEPT_ONLY',ownerGeometryKey:null,zones:Object.freeze([]),staleReason:'Design 4 roof geometry has not been adopted in Workbench.'}),
  Object.freeze({id:'roof-garage-b',ownerId:'garage-b',status:'UNLOCKED',validationStatus:'CONCEPT_ONLY',ownerGeometryKey:null,zones:Object.freeze([]),staleReason:'Design 4 garage roof geometry has not been adopted in Workbench.'}),
  Object.freeze({id:'roof-garage-a',ownerId:'garage-a',status:'UNLOCKED',validationStatus:'CONCEPT_ONLY',ownerGeometryKey:null,zones:Object.freeze([]),staleReason:'Design 4 garage roof geometry has not been adopted in Workbench.'})
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
function zoneIsAuthoritative(zone){
  if(!zone||zone.status!=='LOCKED'||zone.type!=='gable')return false;
  if(!Array.isArray(zone.footprint)||zone.footprint.length!==4||!zone.footprint.every(finitePoint))return false;
  if(!finitePoint(zone.ridgeA)||!finitePoint(zone.ridgeB)||!Number.isFinite(zone.plateZFt))return false;
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
  }else if(zone.solveBy==='RIDGE_Z'){
    if(!Number.isFinite(zone.ridgeZFt)||zone.ridgeZFt<=zone.plateZFt)return false;
  }else return false;
  return true;
}
function roofIsAuthoritative(roof){
  return Boolean(
    roof&&
    roof.status==='LOCKED'&&
    roof.validationStatus==='ROOF_GEOMETRY_LOCKED'&&
    typeof roof.ownerGeometryKey==='string'&&roof.ownerGeometryKey.length>0&&
    Array.isArray(roof.zones)&&roof.zones.length>0&&
    roof.zones.every(zoneIsAuthoritative)
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

const api=Object.freeze({SCHEMA_VERSION,REV,SOURCE,ROOFS,roofForOwner,roofIsAuthoritative,statusForOwner,analyze});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4RoofSOT=api;
})(typeof window!=='undefined'?window:globalThis);
