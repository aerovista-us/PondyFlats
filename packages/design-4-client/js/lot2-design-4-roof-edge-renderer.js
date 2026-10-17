(function(global){
'use strict';
const A=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-roof-interval-adapter.js'):global.Lot2Design4RoofIntervalAdapter;
const M=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-roof-intervals.js'):global.Lot2Design4RoofIntervals;
const SHADE='#394957',VISIBLE='#203847',HIDDEN='#728699',UNRESOLVED='#b05c0b';
const classify=s=>s.visibility==='HIDDEN'?{color:HIDDEN,style:'6 4',width:1.55}:
 s.visibility==='UNRESOLVED'?{color:UNRESOLVED,style:'2 3',width:2.5}:{color:VISIBLE,style:'',width:2.15};
const safeNum=x=>Number.isFinite(x)?Number(x).toFixed(2):'0';
function ready(roof,viewId){return Boolean(A&&A.resolve(roof,viewId).status!=='WITHHELD');}
function lineGroup(data,coordinates){
 return data.segments.map(s=>{
  const a=coordinates(s.start),b=coordinates(s.end),style=classify(s);
  return '<line x1="'+safeNum(a[0])+'" y1="'+safeNum(a[1])+'" x2="'+safeNum(b[0])+'" y2="'+safeNum(b[1])+
   '" stroke="'+style.color+'" stroke-width="'+style.width+'"'+(style.style?' stroke-dasharray="'+style.style+'"':'')+
   ' data-roof-interval="'+s.visibility+'" data-roof-interval-face="'+s.faceId+'" data-roof-interval-edge="'+s.edgeIndex+'"/>';
 }).join('');
}
function envelope(roof,data,facesSvg,linesSvg){
 const c=data.counts;
 return '<g data-roof-owner="'+roof.ownerId+'" data-roof-projector="LOCKED_VERIFIED_EDGE_INTERVALS" data-roof-interval-status="'+data.status+
  '" data-roof-interval-unresolved="'+c.unresolved+'" data-roof-edge-on-faces="'+c.edgeOnFaces+
  '" data-roof-concept-only="true" aria-label="CONCEPT ONLY — NOT FOR CONSTRUCTION — '+data.status+'">'+
  '<g data-roof-faces="locked-surface-fill-no-unverified-outline">'+facesSvg+'</g>'+
  '<g data-roof-edge-source="LotScope-analytic-intervals">'+linesSvg+'</g>'+
  (data.status==='REVIEW_REQUIRED'?'<title>Roof visibility incomplete. Orange roof segments and edge-on surfaces require review. Concept only.</title>':'')+'</g>';
}
function elevation(roof,viewId,left,span,scale,groundY){
 const data=A?.resolve(roof,viewId);
 if(!data||data.status==='WITHHELD')return '';
 const sense=(viewId==='north'||viewId==='east')?-1:1;
 const coordinates=p=>[left+(p[0]*sense-span[0])*scale,groundY-p[1]*scale];
 // The surface fill conveys massing only. Individual polygon strokes would
 // fabricate seams that the interval verifier explicitly removes.
 const ordered=roof.surfaceFaces.map(face=>({face,depth:face.polygon.reduce((sum,p)=>sum+
  (viewId==='east'?p[0]:viewId==='west'?-p[0]:viewId==='north'?-p[1]:p[1]),0)/face.polygon.length})).sort((a,b)=>a.depth-b.depth);
 const faceFill=ordered.map(({face,depth})=>{
  const points=face.polygon.map(p=>[left+((viewId==='east'||viewId==='west'?p[1]:p[0])-span[0])*scale,groundY-p[2]*scale]);
  return '<polygon points="'+points.map(p=>safeNum(p[0])+','+safeNum(p[1])).join(' ')+'" fill="'+SHADE+
   '" fill-opacity=".32" stroke="none" data-roof-surface-face="'+face.id+'" data-roof-zone="'+face.zoneId+'" data-roof-depth="'+safeNum(depth)+'"/>';
 }).join('');
 return envelope(roof,data,faceFill,lineGroup(data,coordinates));
}
function axon(roof,mode,project){
 const data=A?.resolve(roof,'pondy-iso-01');
 if(!data||data.status==='WITHHELD')return '';
 const center=M?.manifest?.camera?.screenTranslation;
 if(!Array.isArray(center)||center.length!==2||center.some(n=>!Number.isFinite(n)))return '';
 const toPx=p=>[center[0]+p[0],center[1]+p[1]];
 const faceFill=roof.surfaceFaces.map(face=>({face,depth:face.polygon.reduce((sum,p)=>sum+(-26.24*p[0]-42.64*p[1]+11.98*p[2]),0)/face.polygon.length})).sort((a,b)=>a.depth-b.depth).map(({face,depth})=>'<polygon points="'+face.polygon.map(p=>{
  const x=project(...p);return safeNum(x[0])+','+safeNum(x[1]);}).join(' ')+'" fill="'+SHADE+
  '" fill-opacity="'+(mode==='massing'?'.38':'.24')+'" stroke="none" data-roof-surface-face="'+face.id+
  '" data-roof-zone="'+face.zoneId+'" data-roof-depth="'+safeNum(depth)+'"/>').join('');
 return envelope(roof,data,faceFill,lineGroup(data,toPx));
}
const api={ready,elevation,axon};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4RoofEdgeRenderer=api;
})(typeof window!=='undefined'?window:globalThis);
