(function(global){
'use strict';
/**
 * Shared fail-closed report orientation contract.
 *
 * LotScope/Pondy model coordinates: +X to the right toward the modeled street
 * boundary, +Y down toward the jogged parcel side. These axes do NOT establish
 * a geodetic north arrow. Every candidate/sheet uses an explicit affine
 * transform and source-vertex binding; never infer geometry from a screenshot.
 */
const REV='report-orientation-contract-v1';
const EPS=.005;
function fail(code){throw new Error('REPORT_ORIENTATION_GATE:'+code)}
function finite(n){return typeof n==='number'&&Number.isFinite(n)}
function area(poly){return poly.reduce((sum,p,i)=>{const q=poly[(i+1)%poly.length];return sum+p[0]*q[1]-q[0]*p[1]},0)/2}
function assertFrame(matrix,policy='PRESERVE_MODEL_XY'){
 if(!Array.isArray(matrix)||matrix.length!==6||matrix.some(v=>!finite(v)))fail('NONFINITE_FRAME');
 const [a,b,c,d]=matrix,det=a*d-b*c;
 if(!(det>0))fail('MIRROR_OR_DEGENERATE_FRAME');
 if(policy==='PRESERVE_MODEL_XY'&&(!(a>0&&d>0)||Math.abs(b)>1e-9||Math.abs(c)>1e-9))fail('UNAUTHORIZED_ROTATION_OR_AXIS_FLIP');
 return {det,policy};
}
function project(point,matrix){
 if(!Array.isArray(point)||point.length!==2||point.some(x=>!finite(x)))fail('NONFINITE_SOURCE_VERTEX');
 return [matrix[0]*point[0]+matrix[2]*point[1]+matrix[4],matrix[1]*point[0]+matrix[3]*point[1]+matrix[5]];
}
function assertSourcePoints({id,source,plotted,matrix,kind='polygon',tolerance=EPS}){
 if(typeof id!=='string'||!id.trim())fail('MISSING_SOURCE_ID');
 const {det}=assertFrame(matrix);
 if(!Array.isArray(source)||!Array.isArray(plotted)||source.length!==plotted.length||source.length<2)fail('SOURCE_COUNT_MISMATCH_'+id);
 for(let i=0;i<source.length;i++){
  const expected=project(source[i],matrix),actual=plotted[i];
  if(!Array.isArray(actual)||actual.length!==2||actual.some(x=>!finite(x))||Math.hypot(expected[0]-actual[0],expected[1]-actual[1])>tolerance)fail('SOURCE_VERTEX_DRIFT_'+id+'_'+i);
 }
 if(kind==='polygon'){
  if(source.length<3||Math.abs(area(source))<1e-9)fail('DEGENERATE_POLYGON_'+id);
  const measured=area(plotted),modelArea=area(source);
  if(!(measured*modelArea>0))fail('POLYGON_HANDEDNESS_CHANGED_'+id);
  if(Math.abs(measured/modelArea-det)>Math.max(.01,det*.0001))fail('POLYGON_SCALE_DRIFT_'+id);
 }
 return true;
}
function assertBoundGeometry({components,drawings,matrix}){
 assertFrame(matrix);
 if(!Array.isArray(components)||!Array.isArray(drawings)||drawings.length===0)fail('MISSING_DRAWINGS');
 const source=new Map(components.map(c=>[c.id,c]));
 if(source.size!==components.length||source.size===0)fail('DUPLICATE_SOURCE_IDS');
 const rendered=new Set();
 for(const entry of drawings){
  const part=source.get(entry.id);
  if(!part||rendered.has(entry.id))fail('UNKNOWN_OR_DUPLICATE_DRAWING_'+entry.id);
  const sourcePoints=entry.kind==='path'?part.points:part.polygon;
  assertSourcePoints({id:entry.id,source:sourcePoints,plotted:entry.plotted,matrix,kind:entry.kind==='path'?'path':'polygon'});
  rendered.add(entry.id);
 }
 if(rendered.size!==source.size)fail('MISSING_SOURCE_COMPONENTS');
 return true;
}
const api={REV,EPS,area,assertFrame,project,assertSourcePoints,assertBoundGeometry};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.PondyReportOrientation=api;
})(typeof window!=='undefined'?window:globalThis);
