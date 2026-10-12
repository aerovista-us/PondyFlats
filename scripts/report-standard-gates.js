'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const S=require('../js/customer-report-standard.js');
const O=require('../js/report-orientation-contract.js');
const sha='a'.repeat(64);
const defaults={
 candidateId:'synthetic-qa-candidate',sourceRevision:'test-revision-1',sourceSha256:sha,
 orientation:{policy:'PRESERVE_MODEL_XY',matrix:[5,0,0,5,10,25]}
};
const refs=['executiveHero','drawingGuide','sitePlan','siteAssumptions','groundPlan','areaSchedule','axon','circulation','comparison','evaluation','sheetIndex','sourceProvenance','nextSteps'];
const supplied=refs.map(id=>({id,status:id==='axon'?'ILLUSTRATIVE':'SOURCE_BOUND',
 summary:id==='axon'?'Illustrative volumetric massing, NOT actual roof or building-height geometry.':
 'Source-bound concept evidence drawn directly from fixture source and revision.',
 evidenceRef:'source:synthetic-v1/'+id}));
const manifest=S.prepareManifest(defaults,supplied);
const report=S.reportCoverageHTML(manifest);
const stats=S.assertStandard(manifest);
assert.equal(stats.total,22);
assert.equal(manifest.features.length,22);
assert.equal(manifest.features.find(f=>f.id==='sections').status,'WITHHELD');
assert.equal(manifest.features.find(f=>f.id==='elevations').status,'WITHHELD');
assert.match(report,/Full|report/i);
assert(S.verifyCoverageHTML(manifest,report));
assert.equal((report.match(/data-report-feature="/g)||[]).length,22,'Every feature gets a customer-visible card');
for(const [change,error] of [
 [m=>m.features.splice(0,1),'INCOMPLETE_FEATURE_REGISTRY'],
 [m=>m.features.find(f=>f.id==='sections').reason='','SILENT_MISSING_FEATURE'],
 [m=>{m.features.find(f=>f.id==='elevations').status='MODEL_VERIFIED';},'UNSUPPORTED_AUTHORITY'],
 [m=>{m.features.find(f=>f.id==='axon').summary='Architectural accurate roof rendering';},'UNLABELED_ILLUSTRATION'],
 [m=>{m.features.find(f=>f.id==='comparison').status='MODEL_VERIFIED';m.features.find(f=>f.id==='comparison').evidenceRef='source:synthetic/comp';},'INCOMPARABLE_DESIGNS'],
 [m=>{m.orientation.matrix[3]=-5;},'MIRROR_OR_DEGENERATE_FRAME'],
 [m=>{m.sourceSha256='bad';},'MISSING_SOURCE_HASH']
]){
 const corrupt=structuredClone(manifest);change(corrupt);
 assert.throws(()=>S.assertStandard(corrupt),new RegExp(error));
}
assert.throws(()=>S.verifyCoverageHTML(manifest,report.replace('data-feature-state="SOURCE_BOUND"','data-feature-state="WITHHELD"')),/UNRENDERED_OR_WRONG_STATE/);
assert.throws(()=>S.verifyCoverageHTML(manifest,report.replace(sha,'b'.repeat(64))),/SOURCE_HASH_HTML_MISMATCH/);
assert.throws(()=>S.prepareManifest(defaults,[{id:'wrong',status:'WITHHELD',summary:'test',reason:'test'}]),/INVALID_INPUT_FEATURE/);
const candidateRoot=path.resolve(__dirname,'../packages/candidate-reports');
if(fs.existsSync(candidateRoot)){
 for(const name of fs.readdirSync(candidateRoot)){
  const dir=path.join(candidateRoot,name);
  if(!fs.statSync(dir).isDirectory())continue;
  const mf=path.join(dir,'report-coverage-manifest.json');
  const html=path.join(dir,'index.html');
  if(!fs.existsSync(mf)||!fs.existsSync(html))throw Error('REPORT_COVERAGE_GATE:UNREGISTERED_CANDIDATE_PACKAGE_'+name);
  const actual=JSON.parse(fs.readFileSync(mf,'utf8'));
  S.verifyCoverageHTML(actual,fs.readFileSync(html,'utf8'));
 }
}
console.log('PASS: '+stats.total+' mandatory report features with source/revision/positive orientation binding, explicit withheld and illustrative states, no unsupported comparison, no report omission and candidate package registry enforced');
