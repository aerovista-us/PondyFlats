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
function roofIsAuthoritative(roof){
  return Boolean(
    roof&&
    roof.status==='LOCKED'&&
    roof.validationStatus==='ROOF_GEOMETRY_LOCKED'&&
    typeof roof.ownerGeometryKey==='string'&&roof.ownerGeometryKey.length>0&&
    Array.isArray(roof.zones)&&roof.zones.length>0&&
    roof.zones.every(zone=>zone&&zone.status==='LOCKED'&&finitePoint(zone.ridgeA)&&finitePoint(zone.ridgeB))
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
