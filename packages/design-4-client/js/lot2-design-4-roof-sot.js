(function(global){
'use strict';

const SCHEMA_VERSION='lotscope-roof-geometry-v1';
const REV='D4-ROOF-SOT-v1.0';
const SOURCE='LotScope Workbench · Pondy D4 authoritative roof lock · lot-assessment PR #51';

const ROOFS=Object.freeze([
  Object.freeze({
    id:'roof-home-b',ownerId:'home-b',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',
    ownerGeometryKey:'{"id":"home-b","rotationDeg":0,"polygon":[[54,5],[94.5,5],[94.5,31.25],[72.5,31.25],[72.5,22],[54,22]]}',
    zones:Object.freeze([
      Object.freeze({
        id:'home-b-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',
        footprint:Object.freeze([[54,5],[94.5,5],[94.5,22],[54,22]].map(Object.freeze)),
        plateZFt:20,ridgeA:Object.freeze([54,13.5]),ridgeB:Object.freeze([94.5,13.5]),
        solveBy:'PITCH',pitchRise:6,pitchRun:12,ridgeZFt:null,
        source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 20 ft home working wall datum promoted to roof plate datum. Home B main zone; wall-footprint control surface terminates at y=22.'
      }),
      Object.freeze({
        id:'home-b-roof-zone-2',label:'South finger gable',status:'LOCKED',type:'gable',
        footprint:Object.freeze([[72.5,22],[94.5,22],[94.5,31.25],[72.5,31.25]].map(Object.freeze)),
        plateZFt:20,ridgeA:Object.freeze([72.5,26.625]),ridgeB:Object.freeze([94.5,26.625]),
        solveBy:'PITCH',pitchRise:6,pitchRun:12,ridgeZFt:null,
        source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 20 ft home working wall datum promoted to roof plate datum. Home B south finger zone; exact shared wall-footprint interface with main zone at y=22.'
      })
    ])
  }),
  Object.freeze({
    id:'roof-home-a',ownerId:'home-a',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',
    ownerGeometryKey:'{"id":"home-a","rotationDeg":0,"polygon":[[94.5,5],[128,5],[128,31.25],[94.5,31.25]]}',
    zones:Object.freeze([
      Object.freeze({
        id:'home-a-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',
        footprint:Object.freeze([[94.5,5],[128,5],[128,31.25],[94.5,31.25]].map(Object.freeze)),
        plateZFt:20,ridgeA:Object.freeze([94.5,18.125]),ridgeB:Object.freeze([128,18.125]),
        solveBy:'PITCH',pitchRise:6,pitchRun:12,ridgeZFt:null,
        source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 20 ft home working wall datum promoted to roof plate datum. Home A single rectangular gable.'
      })
    ])
  }),
  Object.freeze({
    id:'roof-garage-b',ownerId:'garage-b',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',
    ownerGeometryKey:'{"id":"garage-b","rotationDeg":0,"polygon":[[5,5],[27,5],[27,27],[5,27]]}',
    zones:Object.freeze([
      Object.freeze({
        id:'garage-b-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',
        footprint:Object.freeze([[5,5],[27,5],[27,27],[5,27]].map(Object.freeze)),
        plateZFt:11,ridgeA:Object.freeze([5,16]),ridgeB:Object.freeze([27,16]),
        solveBy:'PITCH',pitchRise:6,pitchRun:12,ridgeZFt:null,
        source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 11 ft garage working wall datum promoted to roof plate datum. Garage B west-east ridge; east overhead-door wall is a gable end.'
      })
    ])
  }),
  Object.freeze({
    id:'roof-garage-a',ownerId:'garage-a',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',
    ownerGeometryKey:'{"id":"garage-a","rotationDeg":0,"polygon":[[5,29],[27,29],[27,51],[5,51]]}',
    zones:Object.freeze([
      Object.freeze({
        id:'garage-a-roof-zone-1',label:'Main gable',status:'LOCKED',type:'gable',
        footprint:Object.freeze([[5,29],[27,29],[27,51],[5,51]].map(Object.freeze)),
        plateZFt:11,ridgeA:Object.freeze([5,40]),ridgeB:Object.freeze([27,40]),
        solveBy:'PITCH',pitchRise:6,pitchRun:12,ridgeZFt:null,
        source:'AeroVista Design 4 roof decision 2026-10-04; exact owner/ridge geometry derived from pondy-d4; authored 6:12 pitch; 11 ft garage working wall datum promoted to roof plate datum. Garage A west-east ridge; east overhead-door wall is a gable end.'
      })
    ])
  })
]);

function normalizeOwnerId(value){return String(value||'').trim().toLowerCase();}
function roofForOwner(ownerId){const key=normalizeOwnerId(ownerId);return ROOFS.find(roof=>roof.ownerId===key)||null;}
function finitePoint(value){return Array.isArray(value)&&value.length===2&&value.every(v=>typeof v==='number'&&Number.isFinite(v));}
function finiteFootprint(value){return Array.isArray(value)&&value.length>=4&&value.every(finitePoint);}
function finitePositive(value){return typeof value==='number'&&Number.isFinite(value)&&value>0;}
function zoneRidgeZ(zone){
  if(!zone)return null;
  if(finitePositive(zone.ridgeZFt))return zone.ridgeZFt;
  if(!finiteFootprint(zone.footprint)||!finitePoint(zone.ridgeA)||!finitePoint(zone.ridgeB)||!finitePositive(zone.plateZFt)||!finitePositive(zone.pitchRise)||!finitePositive(zone.pitchRun))return null;
  const xs=zone.footprint.map(p=>p[0]),ys=zone.footprint.map(p=>p[1]);
  const xAligned=Math.abs(zone.ridgeA[1]-zone.ridgeB[1])<1e-6;
  const yAligned=Math.abs(zone.ridgeA[0]-zone.ridgeB[0])<1e-6;
  if(!xAligned&&!yAligned)return null;
  const run=xAligned?Math.min(Math.abs(zone.ridgeA[1]-Math.min(...ys)),Math.abs(Math.max(...ys)-zone.ridgeA[1])):Math.min(Math.abs(zone.ridgeA[0]-Math.min(...xs)),Math.abs(Math.max(...xs)-zone.ridgeA[0]));
  return +(zone.plateZFt+run*(zone.pitchRise/zone.pitchRun)).toFixed(6);
}
function roofIsAuthoritative(roof){
  return Boolean(
    roof&&roof.status==='LOCKED'&&roof.validationStatus==='ROOF_GEOMETRY_LOCKED'&&
    typeof roof.ownerGeometryKey==='string'&&roof.ownerGeometryKey.length>0&&
    Array.isArray(roof.zones)&&roof.zones.length>0&&
    roof.zones.every(zone=>zone&&zone.status==='LOCKED'&&zone.type==='gable'&&finiteFootprint(zone.footprint)&&finitePoint(zone.ridgeA)&&finitePoint(zone.ridgeB)&&finitePositive(zone.plateZFt)&&finitePositive(zone.pitchRise)&&finitePositive(zone.pitchRun)&&finitePositive(zoneRidgeZ(zone)))
  );
}
function statusForOwner(ownerId){
  const roof=roofForOwner(ownerId);
  if(!roof)return {ownerId:normalizeOwnerId(ownerId),status:'NO_MODEL',authoritative:false,renderPolicy:'SUPPRESS_ROOF'};
  const authoritative=roofIsAuthoritative(roof);
  return {
    ownerId:roof.ownerId,status:roof.validationStatus||roof.status||'CONCEPT_ONLY',authoritative,
    renderPolicy:authoritative?'AUTHORITATIVE_ROOF':'SUPPRESS_ROOF',
    reason:authoritative?null:(roof.staleReason||'Roof geometry did not pass the consumer authority guard.')
  };
}
function analyze(){
  const owners=['home-b','home-a','garage-b','garage-a'];
  const results=owners.map(statusForOwner),locked=results.filter(row=>row.authoritative).length;
  return {
    schemaVersion:SCHEMA_VERSION,rev:REV,source:SOURCE,
    status:locked===owners.length?'AUTHORITATIVE_ALLOWED':'CONCEPT_ONLY_REQUIRED',
    locked,required:owners.length,results,
    rule:'Customer-facing roof form may render only from locked Workbench ridge, pitch, plate and zone geometry. Overhangs, gutters, fascia and framing details remain outside this control model.'
  };
}

const api=Object.freeze({SCHEMA_VERSION,REV,SOURCE,ROOFS,roofForOwner,zoneRidgeZ,roofIsAuthoritative,statusForOwner,analyze});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4RoofSOT=api;
})(typeof window!=='undefined'?window:globalThis);
