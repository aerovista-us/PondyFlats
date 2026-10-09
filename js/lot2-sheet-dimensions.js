(function(root){
'use strict';
const finite=p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite);
function polygon(value){
 if(Array.isArray(value))return value;
 if(value&&Array.isArray(value.poly))return value.poly;
 if(value&&[value.x,value.y,value.w,value.d].every(Number.isFinite))return [[value.x,value.y],[value.x+value.w,value.y],[value.x+value.w,value.y+value.d],[value.x,value.y+value.d]];
 throw Error('Unsupported footprint');
}
function bounds(poly){
 if(!Array.isArray(poly)||poly.length<3||!poly.every(finite))throw Error('Invalid polygon');
 const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);
 return {minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys)};
}
function measure(source,axis){
 const b=bounds(polygon(source));
 if(axis==='x')return {a:[b.minX,b.minY],b:[b.maxX,b.minY],feet:b.maxX-b.minX};
 if(axis==='y')return {a:[b.maxX,b.minY],b:[b.maxX,b.maxY],feet:b.maxY-b.minY};
 throw Error('Unsupported axis');
}
function formatFeet(value,precision=2){if(!Number.isFinite(value))throw Error('Nonfinite measurement');return Number(value.toFixed(precision)).toString()+'′';}
function project(p,viewport){return [viewport.ox+p[0]*viewport.pxPerFt,viewport.oy+p[1]*viewport.pxPerFt];}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function intersects(a,b,pad=3){return a.x<b.x+b.w+pad&&a.x+a.w+pad>b.x&&a.y<b.y+b.h+pad&&a.y+a.h+pad>b.y;}
function layout(specs,viewport){
 const boxes=[],placed=[];
 for(const spec of specs){
  const m=measure(spec.geometry,spec.axis);
  if(m.feet<=0)throw Error('Zero-length dimension '+spec.id);
  const a=project(m.a,viewport),b=project(m.b,viewport),horizontal=spec.axis==='x';
  const normal=horizontal?[0,spec.side==='before'?-1:1]:[spec.side==='before'?-1:1,0];
  const label=spec.label||formatFeet(m.feet,spec.precision??2);
  let chosen=null;
  for(let lane=0;lane<20;lane++){
   const offset=(spec.offsetPx??20)+lane*17;
   const mid=[(a[0]+b[0])/2+normal[0]*offset,(a[1]+b[1])/2+normal[1]*offset];
   const width=Math.max(28,label.length*7.8+12);
   const box={x:mid[0]-width/2,y:mid[1]-9,w:width,h:18};
   if(!boxes.some(other=>intersects(box,other))){chosen={mid,offset,box,lane};break;}
  }
  if(!chosen)throw Error('Dimension label collision '+spec.id);
  boxes.push(chosen.box);
  placed.push({id:spec.id,ref:spec.ref,feet:m.feet,label,a,b,normal,...chosen});
 }
 return placed;
}
function renderSvg(specs,viewport,{stroke='#21354a'}={}){
 const items=layout(specs,viewport);
 const svg=items.map(item=>{
  const {a,b,normal,offset,mid}=item;
  const endA=[a[0]+normal[0]*offset,a[1]+normal[1]*offset],endB=[b[0]+normal[0]*offset,b[1]+normal[1]*offset];
  const pt=p=>p.map(n=>n.toFixed(2)).join(',');
  const line=(p,q,klass)=>'<line class="'+klass+'" x1="'+p[0].toFixed(2)+'" y1="'+p[1].toFixed(2)+'" x2="'+q[0].toFixed(2)+'" y2="'+q[1].toFixed(2)+'"/>';
  const ext=(p,q)=>line([p[0]-normal[0]*3,p[1]-normal[1]*3],[q[0]+normal[0]*5,q[1]+normal[1]*5],'witness');
  const tick=p=>line([p[0]-4,p[1]+4],[p[0]+4,p[1]-4],'tick');
  return '<g data-dimension-id="'+esc(item.id)+'" data-geometry-ref="'+esc(item.ref)+'" data-value-ft="'+item.feet+'" data-collision-lane="'+item.lane+'">'+
    ext(a,endA)+ext(b,endB)+line(endA,endB,'dimension-line')+tick(endA)+tick(endB)+
    '<rect x="'+item.box.x.toFixed(2)+'" y="'+item.box.y.toFixed(2)+'" width="'+item.box.w.toFixed(2)+'" height="18" rx="3" fill="#fff"/>'+
    '<text x="'+mid[0].toFixed(2)+'" y="'+(mid[1]+4).toFixed(2)+'" text-anchor="middle">'+esc(item.label)+'</text></g>';
 }).join('');
 return '<g class="dimension-layer" fill="none" stroke="'+stroke+'" stroke-width="1" vector-effect="non-scaling-stroke"><style>.dimension-layer text{font:12px system-ui,sans-serif;fill:'+stroke+';stroke:none}.dimension-layer .witness{opacity:.65}</style>'+svg+'</g>';
}
function modelScale({paperInches,modelFeet}){if(!(paperInches>0&&modelFeet>0))throw Error('Invalid paper scale');return {kind:'architectural',paperInches,modelFeet,label:paperInches+'″ = '+modelFeet+'′-0″',inchPerFoot:paperInches/modelFeet};}
const api=Object.freeze({polygon,bounds,measure,formatFeet,layout,renderSvg,modelScale});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.PondySheetDimensions=api;
})(typeof window!=='undefined'?window:globalThis);
