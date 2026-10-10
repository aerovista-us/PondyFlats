'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const DIM=require('../js/lot2-sheet-dimensions');
const AD=require('../js/lot2-design-4-dimension-prototype');
const SITE=require('../js/lot2-design-4');
const PLAN=require('../js/lot2-design-4-plan-closure');
const file=path.join(__dirname,'../prototypes/design4-customer-sheet-review.html');
const html=fs.readFileSync(file,'utf8');
assert(html.includes('REVIEW ONLY — not linked into public reports'));
assert.equal((html.match(/data-dimension-id=/g)||[]).length,15);
assert(html.includes('PENNSYLVANIA STREET'));
assert(html.includes('data-plan-verdict="PASS"'));
assert(html.includes('data-design="4"'));
assert(html.includes('CURRENT WORKBENCH GATES'));
assert.equal(AD.specifications('A-001').length,9);
assert.equal(AD.specifications('A-101').length,6);
for(const [id,viewport,svg] of [
 ['A-001',{ox:88,oy:168,pxPerFt:6.2},SITE.renderSite()],
 ['A-101',{ox:-428,oy:72.5,pxPerFt:9.5},PLAN.renderLevel('ground')]
]){
 const specs=AD.specifications(id),out=DIM.renderSvg(specs,viewport);
 assert.equal((out.match(/data-dimension-id=/g)||[]).length,specs.length);
 assert(html.includes(svg.slice(0,200)),id+' customer renderer must be retained');
}
console.log(JSON.stringify({status:'PASS',candidate:'review-only',dimensions:15,existingSiteRenderer:true,existingPlanRenderer:true,publicIntegration:false}));
