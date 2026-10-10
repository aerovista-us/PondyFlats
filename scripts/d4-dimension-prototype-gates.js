'use strict';
const assert=require('node:assert/strict');
const D=require('../js/lot2-sheet-dimensions.js');
const AD=require('../js/lot2-design-4-dimension-prototype.js');
const DOC=require('../js/lot2-design-4-sheet-document.js').DOCUMENT;
const SOT=require('../js/lot2-sot.js');
const PLAN=require('../js/lot2-design-4-plan-closure.js');
const viewport={ox:145,oy:145,pxPerFt:5.2};
const site=AD.specifications('A-001'),plan=AD.specifications('A-101');
assert.equal(site.length,9);assert.equal(plan.length,6);
assert.equal(D.measure(AD.resolve('parcel.boundary'),'x').feet,148);
assert.equal(D.measure(AD.resolve('d4.garage-a.footprint'),'x').feet,22);
assert.equal(D.measure(AD.resolve('d4.garage-b.footprint'),'y').feet,22);
assert.equal(D.measure(AD.resolve('d4.plan.shell-a'),'x').feet,33.5);
assert.equal(D.measure(AD.resolve('d4.plan.shell-a'),'y').feet,26.25);
assert.equal(D.measure(AD.resolve('d4.plan.shell-b'),'x').feet,40.5);
assert.equal(D.measure(AD.resolve('d4.plan.shell-b'),'y').feet,26.25);
assert.equal(D.measureEdge(SOT.SURVEY,1).feet,50);
assert.equal(D.measureEdge(PLAN.SHELLS.B,3).feet,9.25);
assert.throws(()=>D.paperFrame({widthIn:11,heightIn:17,modelWidthFt:148,modelHeightFt:58,scale:D.modelScale({paperInches:0.125,modelFeet:1})}),/does not fit/);
assert.equal(D.paperFrame({widthIn:36,heightIn:24,modelWidthFt:148,modelHeightFt:58,scale:D.modelScale({paperInches:0.125,modelFeet:1})}).physicalModelWidthIn,18.5);
assert.equal(D.formatFeet(26.25),"26.25′");
assert.equal(D.modelScale({paperInches:0.125,modelFeet:1}).inchPerFoot,0.125);
for(const [sheet,specs] of [['A-001',site],['A-101',plan]]){
 const placed=D.layout(specs,viewport);
 assert.equal(placed.length,specs.length);
 for(let i=0;i<placed.length;i++)for(let j=i+1;j<placed.length;j++){
  const a=placed[i].box,b=placed[j].box;
  assert(!(a.x<b.x+b.w+3&&a.x+a.w+3>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y),sheet+' labels collide');
 }
 for(let i=0;i<placed.length;i++)for(let j=0;j<placed.length;j++){
  if(i===j)continue;
  assert(!D.segmentTouchesBox(placed[i].ea,placed[i].eb,placed[j].box),sheet+' dimension line crosses '+placed[j].id+' label');
 }
 const svg=D.renderSvg(specs,viewport);
 assert.equal((svg.match(/data-dimension-id=/g)||[]).length,specs.length);
 assert(svg.includes('data-geometry-ref='));
}
// Validate both the responsive and actual 1/8-inch paper viewports.
for(const [sheet,specs] of [['A-001',site],['A-101',plan]]){
 const viewportPrint={ox:320,oy:400,pxPerFt:12};
 const located=D.layout(specs,viewportPrint);
 for(const d of located){
  assert(d.box.x>=96&&d.box.y>=96&&d.box.x+d.box.w<=3360&&d.box.y+d.box.h<=2208,sheet+' print frame overflow: '+d.id);
 }
 for(let i=0;i<located.length;i++)for(let j=0;j<located.length;j++){
  if(i!==j)assert(!D.segmentTouchesBox(located[i].ea,located[i].eb,located[j].box),sheet+' print dimension crosses another label');
 }
}
assert.deepEqual(AD.resolve('parcel.boundary'),SOT.SURVEY);
assert.deepEqual(AD.resolve('d4.plan.shell-b'),PLAN.SHELLS.B);
assert.throws(()=>AD.resolve('missing.ref'));
assert.throws(()=>D.measure([[0,0],[0,0],[0,0]],'x').feet===0?D.renderSvg([{id:'zero',ref:'parcel.boundary',geometry:[[0,0],[0,0],[0,0]],axis:'x'}],viewport):null,/Zero-length/);
assert.equal(DOC.sheets.flatMap(s=>s.drawings).find(x=>x.id==='A-001').dimensions.length,0,'live schema remains untouched');
console.log(JSON.stringify({status:'PASS',sheets:['A-001','A-101'],dimensions:site.length+plan.length,derived:true,labelsCollisionFree:true,liveReportUnchanged:true},null,2));
