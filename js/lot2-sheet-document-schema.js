(function(root){
'use strict';

const SCHEMA_VERSION='pondy-sheet-document-v0.1';
const AUTHORITY=Object.freeze([
  'FROZEN',
  'PROMOTED',
  'PLAN_GATED',
  'ARCHITECTURE_AUTHORED',
  'LOCKED_EXTERNAL',
  'EVIDENCE',
  'PRESENTATION'
]);
const GEOMETRY_KINDS=Object.freeze([
  'polygon2','polyline2','rect2','point2','point3','collection',
  'constraint-set','datum-set','roof-model','vehicle-model'
]);
const VIEW_KINDS=Object.freeze([
  'site-plan','vehicle-proof','floor-plan','relationship-plan',
  'elevation','section','axonometric'
]);
const DIMENSION_KINDS=Object.freeze([
  'linear','aligned','angular','radius','area','elevation'
]);

function isObject(value){return Boolean(value)&&typeof value==='object'&&!Array.isArray(value);}
function push(errors,path,message){errors.push(path+': '+message);}
function uniqueIds(items,path,errors){
  const seen=new Set();
  for(let i=0;i<items.length;i++){
    const id=items[i]&&items[i].id;
    if(typeof id!=='string'||!id.trim()){push(errors,path+'['+i+'].id','non-empty string required');continue;}
    if(seen.has(id))push(errors,path+'['+i+'].id','duplicate id '+id);
    seen.add(id);
  }
  return seen;
}
function validateScale(scale,path,errors){
  if(!isObject(scale))return push(errors,path,'object required');
  if(!['fit','architectural','engineering'].includes(scale.kind))push(errors,path+'.kind','fit, architectural, or engineering required');
  if(typeof scale.label!=='string'||!scale.label.trim())push(errors,path+'.label','non-empty string required');
  if(scale.paperUnits!=null&&!Number.isFinite(scale.paperUnits))push(errors,path+'.paperUnits','finite number required');
  if(scale.modelUnits!=null&&!Number.isFinite(scale.modelUnits))push(errors,path+'.modelUnits','finite number required');
}
function validateDimension(dim,path,geometryIds,errors){
  if(!isObject(dim))return push(errors,path,'object required');
  if(typeof dim.id!=='string'||!dim.id.trim())push(errors,path+'.id','non-empty string required');
  if(!DIMENSION_KINDS.includes(dim.kind))push(errors,path+'.kind','unsupported dimension kind');
  if(!Array.isArray(dim.geometryRefs)||dim.geometryRefs.length<1)push(errors,path+'.geometryRefs','at least one geometry ref required');
  else for(const ref of dim.geometryRefs)if(!geometryIds.has(ref))push(errors,path+'.geometryRefs','unknown geometry ref '+ref);
  if(!['derive','literal'].includes(dim.valuePolicy))push(errors,path+'.valuePolicy','derive or literal required');
  if(dim.valuePolicy==='literal'&&!Number.isFinite(dim.value))push(errors,path+'.value','finite literal value required');
  if(dim.precision!=null&&(!Number.isInteger(dim.precision)||dim.precision<0||dim.precision>6))push(errors,path+'.precision','integer 0..6 required');
}
function validateAnnotation(annotation,path,geometryIds,errors){
  if(!isObject(annotation))return push(errors,path,'object required');
  if(typeof annotation.id!=='string'||!annotation.id.trim())push(errors,path+'.id','non-empty string required');
  if(!['note','label','keynote','status'].includes(annotation.kind))push(errors,path+'.kind','unsupported annotation kind');
  if(typeof annotation.text!=='string'||!annotation.text.trim())push(errors,path+'.text','non-empty string required');
  if(annotation.geometryRefs!=null){
    if(!Array.isArray(annotation.geometryRefs))push(errors,path+'.geometryRefs','array required');
    else for(const ref of annotation.geometryRefs)if(!geometryIds.has(ref))push(errors,path+'.geometryRefs','unknown geometry ref '+ref);
  }
}
function validate(document){
  const errors=[];
  if(!isObject(document))return {ok:false,errors:['document: object required']};
  if(document.schemaVersion!==SCHEMA_VERSION)push(errors,'schemaVersion','expected '+SCHEMA_VERSION);
  for(const key of ['documentId','title'])if(typeof document[key]!=='string'||!document[key].trim())push(errors,key,'non-empty string required');
  if(document.units!=='ft')push(errors,'units','current engine requires ft');
  if(!isObject(document.orientation))push(errors,'orientation','object required');
  else{
    if(document.orientation.front!=='pennsylvania-right')push(errors,'orientation.front','expected pennsylvania-right');
    if(document.orientation.northRear!=='left')push(errors,'orientation.northRear','expected left');
  }
  if(!isObject(document.design))push(errors,'design','object required');
  else for(const key of ['id','revision','status'])if(typeof document.design[key]!=='string'||!document.design[key].trim())push(errors,'design.'+key,'non-empty string required');

  const sources=Array.isArray(document.sources)?document.sources:[];
  if(!Array.isArray(document.sources)||sources.length<1)push(errors,'sources','non-empty array required');
  const sourceIds=uniqueIds(sources,'sources',errors);
  sources.forEach((source,index)=>{
    const path='sources['+index+']';
    if(!isObject(source))return push(errors,path,'object required');
    if(typeof source.path!=='string'||!source.path.trim())push(errors,path+'.path','non-empty string required');
    if(typeof source.revision!=='string'||!source.revision.trim())push(errors,path+'.revision','non-empty string required');
    if(!AUTHORITY.includes(source.authority))push(errors,path+'.authority','unsupported authority class');
    if(typeof source.status!=='string'||!source.status.trim())push(errors,path+'.status','non-empty string required');
  });

  const geometry=Array.isArray(document.geometry)?document.geometry:[];
  if(!Array.isArray(document.geometry)||geometry.length<1)push(errors,'geometry','non-empty array required');
  const geometryIds=uniqueIds(geometry,'geometry',errors);
  geometry.forEach((ref,index)=>{
    const path='geometry['+index+']';
    if(!isObject(ref))return push(errors,path,'object required');
    if(!GEOMETRY_KINDS.includes(ref.kind))push(errors,path+'.kind','unsupported geometry kind');
    if(!sourceIds.has(ref.sourceId))push(errors,path+'.sourceId','unknown source '+ref.sourceId);
    if(typeof ref.selector!=='string'||!ref.selector.trim())push(errors,path+'.selector','non-empty selector required');
    if(!AUTHORITY.includes(ref.authority))push(errors,path+'.authority','unsupported authority class');
    if(typeof ref.status!=='string'||!ref.status.trim())push(errors,path+'.status','non-empty string required');
  });

  const gates=Array.isArray(document.gates)?document.gates:[];
  if(!Array.isArray(document.gates))push(errors,'gates','array required');
  const gateIds=uniqueIds(gates,'gates',errors);
  gates.forEach((gate,index)=>{
    const path='gates['+index+']';
    if(!isObject(gate))return push(errors,path,'object required');
    if(typeof gate.label!=='string'||!gate.label.trim())push(errors,path+'.label','non-empty string required');
    if(typeof gate.status!=='string'||!gate.status.trim())push(errors,path+'.status','non-empty string required');
    if(typeof gate.blocking!=='boolean')push(errors,path+'.blocking','boolean required');
    if(gate.sourceIds!=null){
      if(!Array.isArray(gate.sourceIds))push(errors,path+'.sourceIds','array required');
      else for(const ref of gate.sourceIds)if(!sourceIds.has(ref))push(errors,path+'.sourceIds','unknown source '+ref);
    }
  });

  const sheets=Array.isArray(document.sheets)?document.sheets:[];
  if(!Array.isArray(document.sheets)||sheets.length<1)push(errors,'sheets','non-empty array required');
  uniqueIds(sheets,'sheets',errors);
  const drawingIds=new Set();
  sheets.forEach((sheet,sheetIndex)=>{
    const path='sheets['+sheetIndex+']';
    if(!isObject(sheet))return push(errors,path,'object required');
    if(!Number.isInteger(sheet.sequence)||sheet.sequence<1)push(errors,path+'.sequence','positive integer required');
    if(typeof sheet.title!=='string'||!sheet.title.trim())push(errors,path+'.title','non-empty string required');
    const drawings=Array.isArray(sheet.drawings)?sheet.drawings:[];
    if(!Array.isArray(sheet.drawings)||drawings.length<1)push(errors,path+'.drawings','non-empty array required');
    drawings.forEach((drawing,drawingIndex)=>{
      const dpath=path+'.drawings['+drawingIndex+']';
      if(!isObject(drawing))return push(errors,dpath,'object required');
      if(typeof drawing.id!=='string'||!drawing.id.trim())push(errors,dpath+'.id','non-empty string required');
      else if(drawingIds.has(drawing.id))push(errors,dpath+'.id','duplicate drawing id '+drawing.id);
      else drawingIds.add(drawing.id);
      if(!VIEW_KINDS.includes(drawing.kind))push(errors,dpath+'.kind','unsupported view kind');
      if(typeof drawing.title!=='string'||!drawing.title.trim())push(errors,dpath+'.title','non-empty string required');
      if(!Array.isArray(drawing.geometryRefs)||drawing.geometryRefs.length<1)push(errors,dpath+'.geometryRefs','non-empty array required');
      else for(const ref of drawing.geometryRefs)if(!geometryIds.has(ref))push(errors,dpath+'.geometryRefs','unknown geometry ref '+ref);
      validateScale(drawing.scale,dpath+'.scale',errors);
      const dims=Array.isArray(drawing.dimensions)?drawing.dimensions:[];
      if(!Array.isArray(drawing.dimensions))push(errors,dpath+'.dimensions','array required');
      uniqueIds(dims,dpath+'.dimensions',errors);
      dims.forEach((dim,index)=>validateDimension(dim,dpath+'.dimensions['+index+']',geometryIds,errors));
      const annotations=Array.isArray(drawing.annotations)?drawing.annotations:[];
      if(!Array.isArray(drawing.annotations))push(errors,dpath+'.annotations','array required');
      uniqueIds(annotations,dpath+'.annotations',errors);
      annotations.forEach((annotation,index)=>validateAnnotation(annotation,dpath+'.annotations['+index+']',geometryIds,errors));
      if(!Array.isArray(drawing.gateRefs))push(errors,dpath+'.gateRefs','array required');
      else for(const ref of drawing.gateRefs)if(!gateIds.has(ref))push(errors,dpath+'.gateRefs','unknown gate '+ref);
    });
  });

  return {ok:errors.length===0,errors};
}
function assertValid(document){
  const result=validate(document);
  if(!result.ok)throw new Error('Invalid sheet document:\n- '+result.errors.join('\n- '));
  return document;
}

const api=Object.freeze({SCHEMA_VERSION,AUTHORITY,GEOMETRY_KINDS,VIEW_KINDS,DIMENSION_KINDS,validate,assertValid});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.PondySheetDocumentSchema=api;
})(typeof window!=='undefined'?window:globalThis);
