// Regression: one conservative roof release policy across customer surfaces.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('js/d4-customer-release-status.js','utf8');
const context={};
vm.runInNewContext(source,context);
const r=context.PondyD4Release;
assert.equal(r.schemaVersion,'pondy-design-release-v1');
assert.equal(r.designId,'design-4');
assert.equal(r.roof.modelRevision,'D4-ROOF-SOT-v1.1');
assert.equal(r.roof.releaseVerdict,'REVIEW_REQUIRED');
assert.equal(r.roof.authorityReconciled,false);
assert.equal(r.roof.customerPublicationAllowed,false);
assert.equal(r.circulation.fullPass,false);
assert.equal(r.circulation.outbound,'OPEN_NOT_PROVEN');
assert.equal(r.approvedCandidateSignature,null);
assert.equal(r.approvedForConstruction,false);
const exporter=fs.readFileSync('scripts/export-design4.js','utf8');
assert(exporter.includes("'js/d4-customer-release-status.js'"),'The standalone client must include the shared release contract');
assert(exporter.includes('customer publication authority remains REVIEW REQUIRED'),'Exported client notes must distinguish roof model and customer release');
const roofSot=fs.readFileSync('js/lot2-design-4-roof-sot.js','utf8');
for(const owner of ['roof-home-a','roof-home-b','roof-garage-a','roof-garage-b']){
  assert(roofSot.includes("id:'"+owner+"'"),'Missing model owner '+owner);
}
assert(roofSot.includes("status:'LOCKED'"),'Model lock claim should be recorded, not silently discarded');
const pages={
 'index.html':['roof-status','roof-detail'],
 'design-4.html':['roof-status','roof-detail'],
 'design-4-status.html':['roof-status','roof-detail']
};
for(const [name,keys] of Object.entries(pages)){
 const html=fs.readFileSync(name,'utf8');
 assert(html.includes('src="js/d4-customer-release-status.js"'),name+' must load shared contract');
 for(const key of keys)assert(html.includes('data-d4-release="'+key+'"'),name+' missing '+key);
 for(const obsolete of ['WITHHELD / Workbench lock pending.','Roof geometry status: WITHHELD — Workbench lock pending.','Roof silhouette is not drawn because ridge']){
  assert(!html.includes(obsolete),name+' contains obsolete roof model claim');
 }
}
const rendered={};
const fakeDoc={
 readyState:'complete',
 querySelectorAll(selector){
  const key=selector.match(/data-d4-release="([^"]+)"/)?.[1];
  const nodes=[{textContent:null}];
  rendered[key]=nodes;
  return nodes;
 }
};
const windowContext={document:fakeDoc};
windowContext.window=windowContext;
vm.runInNewContext(source,windowContext);
assert.equal(rendered['roof-status'][0].textContent,'Roof release: REVIEW REQUIRED');
assert(rendered['roof-detail'][0].textContent.includes('not yet been reconciled'));
console.log('Design 4 shared release status and three customer surfaces: PASS');
