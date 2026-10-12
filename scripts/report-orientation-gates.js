'use strict';
const assert=require('node:assert/strict');
const O=require('../js/report-orientation-contract.js');
const D=require('../js/lot2-design-4.js');
const m=[6.2,0,0,6.2,88,168];
const survey=D.SURVEY;
const svg=D.renderSite();
const match=svg.match(/<polygon points="([^"]+)"/);
assert(match,'The Design 4 customer-facing report must draw the model parcel');
const points=match[1].split(/\s+/).map(pair=>pair.split(',').map(Number));
assert(O.assertSourcePoints({id:'D4-SURVEY',source:survey,plotted:points,matrix:m,tolerance:.075}));
const jog=O.project(survey[5],m),upper=O.project(survey[0],m),street=O.project(survey[2],m);
assert(jog[1]>upper[1]&&street[0]>upper[0],'D4 model jog must remain bottom, street to right');
assert.equal(O.assertFrame(m).policy,'PRESERVE_MODEL_XY');
for(const invalid of [[6.2,0,0,-6.2,88,168],[-6.2,0,0,6.2,88,168],[6.2,0,0,0,88,168],[0,6.2,-6.2,0,88,168]]){
 assert.throws(()=>O.assertFrame(invalid),/REPORT_ORIENTATION_GATE/,'Mirror, zero-scale or silent rotation must fail');
}
const fixture=[
 {id:'HOUSE',polygon:[[2,1],[6,1],[6,4],[2,4]]},
 {id:'JOG',polygon:[[0,0],[8,0],[8,4],[5,3],[0,5]]},
 {id:'DRIVE',points:[[10,2],[7,2],[5,3]]}
];
const okDraw=fixture.map(v=>({id:v.id,kind:v.points?'path':'polygon',plotted:(v.points||v.polygon).map(p=>O.project(p,[4,0,0,4,10,20]))}));
assert(O.assertBoundGeometry({components:fixture,drawings:okDraw,matrix:[4,0,0,4,10,20]}));
const changed=structuredClone(okDraw);changed[0].plotted[2][1]+=15;
assert.throws(()=>O.assertBoundGeometry({components:fixture,drawings:changed,matrix:[4,0,0,4,10,20]}),/SOURCE_VERTEX_DRIFT/);
const absent=okDraw.slice(0,2);
assert.throws(()=>O.assertBoundGeometry({components:fixture,drawings:absent,matrix:[4,0,0,4,10,20]}),/MISSING_SOURCE_COMPONENTS/);
assert.throws(()=>O.assertBoundGeometry({components:fixture,drawings:okDraw,matrix:[4,0,0,-4,10,20]}),/MIRROR_OR_DEGENERATE_FRAME/);
console.log('PASS: D4 live-source parcel jog-down geometry matches canonical frame; 4 rejected wrong transforms; mirrors, changed/missing source polygons and driveway fail closed');
