'use strict';
const DIM=require('./lot2-sheet-dimensions.js');
const DOC=require('./lot2-design-4-sheet-document.js').DOCUMENT;
const SOT=require('./lot2-sot.js');
const D4=require('./lot2-design-4.js');
const PLAN=require('./lot2-design-4-plan-closure.js');
const sources={'lot2-parcel':SOT,'d4-geometry':D4,'d4-plan':PLAN};
function resolve(id){
 const ref=DOC.geometry.find(r=>r.id===id);
 if(!ref)throw Error('Unknown geometry ref '+id);
 const source=sources[ref.sourceId];
 if(!source)throw Error('Unsupported source for dimension '+ref.sourceId);
 const selection=ref.selector.match(/^([A-Z]+)\[id=([^\]]+)\]$/);
 if(selection){const items=source[selection[1]];const item=items.find(x=>x.id===selection[2]);if(!item)throw Error('Missing selector '+ref.selector);return item;}
 const path=ref.selector.split('.');
 const value=path.reduce((v,key)=>v?.[key],source);
 if(value==null)throw Error('Missing selector '+ref.selector);
 return value;
}
const defs={
 'A-001':[
  ['parcel.depth','parcel.boundary','x','before',27],
  ['parcel.overall-y-extent','parcel.boundary','y','after',40],
  ['garage-a.width','d4.garage-a.footprint','x','before',22],
  ['garage-a.depth','d4.garage-a.footprint','y','before',35],
  ['garage-b.width','d4.garage-b.footprint','x','before',48],
  ['garage-b.depth','d4.garage-b.footprint','y','before',22],
  ['home-a.width','d4.home-a.footprint','x','before',38],
  ['home-b.width','d4.home-b.footprint','x','before',22]
 ],
 'A-101':[
  ['home-a.width','d4.plan.shell-a','x','before',27],
  ['home-a.depth','d4.plan.shell-a','y','after',27],
  ['home-b.width','d4.plan.shell-b','x','before',48],
  ['home-b.depth','d4.plan.shell-b','y','before',27]
 ]
};
function specifications(sheet){
 const drawing=DOC.sheets.flatMap(s=>s.drawings).find(d=>d.id===sheet);
 if(!drawing)throw Error('Unknown drawing '+sheet);
 const definitions=defs[sheet];
 if(!definitions)throw Error('No prototype dimensions for '+sheet);
 return definitions.map(([id,ref,axis,side,offsetPx])=>{
  if(!drawing.geometryRefs.includes(ref))throw Error('Drawing '+sheet+' does not permit '+ref);
  return {id,ref,geometry:resolve(ref),axis,side,offsetPx};
 });
}
module.exports=Object.freeze({resolve,specifications});
