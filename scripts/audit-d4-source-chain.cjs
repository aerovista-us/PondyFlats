'use strict';
// Read-only, exact-revision cross-repository evidence. Never grants publication.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const {createHash}=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const [checkout,expectedSourceSha,output]=process.argv.slice(2);
if(!checkout||!/^[0-9a-f]{40}$/.test(expectedSourceSha||'')||!output){
 console.error('Usage: node scripts/audit-d4-source-chain.cjs LOTSCOPE_CHECKOUT EXPECTED_SHA OUTPUT_JSON');process.exit(2);
}
const source=path.resolve(checkout);
const run=(args,cwd=source)=>execFileSync(process.execPath,args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']});
const git=(args,cwd)=>execFileSync('git',args,{cwd,encoding:'utf8'}).trim();
const sha256=value=>createHash('sha256').update(typeof value==='string'?value:JSON.stringify(value)).digest('hex');
const sourceSha=git(['rev-parse','HEAD'],source);
assert.equal(sourceSha,expectedSourceSha,'Source checkout changed; reaccept exact source SHA');
const baseline=JSON.parse(fs.readFileSync(path.join(root,'data/d4-source-chain-baseline.json'),'utf8'));
assert.equal(sourceSha,baseline.sourceSha,'Unreviewed source revision');
assert.equal(git(['status','--porcelain','--untracked-files=no'],source),'','Source tracked files must be clean');
assert.equal(git(['status','--porcelain','--untracked-files=no'],root),'','Consumer tracked files must be clean');
const roofExport=JSON.parse(run(['--experimental-loader','./scripts/alias-loader.mjs','scripts/export-roof-sot.mjs']));
const intervalExport=run(['--experimental-loader','./scripts/alias-loader.mjs','scripts/export-d4-roof-intervals.mjs']);
const context={};vm.runInNewContext(intervalExport,context);
const regenerated=JSON.parse(JSON.stringify(context.Lot2Design4RoofIntervals.manifest));
const stored=require(path.join(root,'js/lot2-design-4-roof-intervals.js'));
const roofSot=require(path.join(root,'js/lot2-design-4-roof-sot.js'));
const adapter=require(path.join(root,'js/lot2-design-4-roof-interval-adapter.js'));
const release={};vm.runInNewContext(fs.readFileSync(path.join(root,'js/d4-customer-release-status.js'),'utf8'),release);
assert.equal(release.PondyD4Release.roof.customerPublicationAllowed,false);
assert.equal(release.PondyD4Release.approvedCandidateSignature,null);
assert.equal(release.PondyD4Release.approvedForConstruction,false);
assert(Object.values(release.PondyD4Release.professionalAcceptance).every(v=>v===false));
assert.equal(regenerated.schemaVersion,baseline.intervalSchemaVersion);
assert.deepEqual(regenerated,stored.manifest,'Regenerate intervals from reviewed source; stale payload withheld');
assert.equal(sha256(regenerated),baseline.intervalManifestSha256,'Reaccept changed camera interval baseline');
assert.equal(roofExport.safe,true);assert.equal(roofExport.counts.locked,4);
const aliases=[],owners=[];
for(const upstream of roofExport.roofs){
 const downstream=roofSot.ROOFS.find(r=>r.ownerId===upstream.ownerId);assert(downstream);
 assert.equal(upstream.ownerGeometryKey,downstream.ownerGeometryKey);
 assert.deepEqual(upstream.surfaceFaces,downstream.surfaceFaces);
 assert.equal(upstream.junctions.length,downstream.junctions.length);
 for(let i=0;i<upstream.junctions.length;i++){
  const a=upstream.junctions[i],b=downstream.junctions[i];
  for(const key of ['status','kind','overlapPolygon','overlapAreaSqFt','errors'])assert.deepEqual(a[key],b[key]);
  assert.equal(a.segments.length,b.segments.length);const used=new Set();
  for(const segment of a.segments){
   const matches=b.segments.filter(s=>Math.hypot(s.b[0]-segment.b[0],s.b[1]-segment.b[1])<1e-8);
   assert.equal(matches.length,1,'Junction alias must be unambiguous');const alias=matches[0];
   assert(!used.has(alias.id));used.add(alias.id);
   assert.equal(segment.kind,alias.kind);assert.deepEqual(segment.zoneIds,alias.zoneIds);
   const deltas=[];
   for(const key of ['a','b'])for(let j=0;j<2;j++)deltas.push(Math.abs(segment[key][j]-alias[key][j]));
   for(const key of ['zAFt','zBFt','residualFt'])deltas.push(Math.abs(segment[key]-alias[key]));
   assert(deltas.every(n=>Number.isFinite(n)&&n<1e-8),'Junction geometry differs beyond canonical tolerance');
   aliases.push({sourceId:segment.id,pondyId:alias.id,maxDeltaFt:Math.max(...deltas)});
  }
 }
 const imported=stored.manifest.owners.find(o=>o.ownerId===upstream.ownerId);assert(imported);
 const views={};
 for(const id of ['north','south','east','west','pondy-iso-01']){
  const result=adapter.resolve(downstream,id);assert.notEqual(result.status,'WITHHELD');
  assert.deepEqual(result,imported.views[id]);
  views[id]={status:result.status,counts:result.counts};
 }
 owners.push({ownerId:upstream.ownerId,ownerGeometrySha256:sha256(upstream.ownerGeometryKey),
  surfaceFacesSha256:sha256(upstream.surfaceFaces),views});
}
const modules=['lot2-design-4.js','lot2-design-4-roof-sot.js','lot2-design-4-roof-intervals.js',
 'lot2-design-4-roof-interval-adapter.js','lot2-design-4-roof-edge-renderer.js','lot2-design-4-architecture.js',
 'd4-customer-release-status.js'];
const files=modules.map(file=>{
 const a=fs.readFileSync(path.join(root,'js',file)),b=fs.readFileSync(path.join(root,'packages/design-4-client/js',file));
 assert(a.equals(b),'Source/package drift: '+file);
 return {path:'js/'+file,sha256:sha256(a.toString('utf8')),standaloneByteMatch:true};
});
const sectionProgram=`import {pondyCandidateRegistry} from './projects/pondy-lot2/candidate-registry.ts';
import {validateCandidateRoofs} from './packages/roof-geometry/index.ts';
import {roofDrawingHandoff} from './packages/roof-geometry/drawing-contract.ts';
import {deriveValleySectionCuts} from './packages/roof-geometry/drawing-valley-sections.ts';
const c=pondyCandidateRegistry.candidates.find(c=>c.id==='pondy-d4');
const r=validateCandidateRoofs(c.components).results.find(r=>r.ownerId==='home-b');
console.log(JSON.stringify({candidate:c,cuts:deriveValleySectionCuts(roofDrawingHandoff(r))}));`;
const sectionData=JSON.parse(run(['--experimental-loader','./scripts/alias-loader.mjs','--input-type=module','-e',sectionProgram]));
assert.equal(sha256(sectionData.candidate),baseline.candidateSnapshotSha256,'Reaccept changed candidate snapshot');
assert.equal(sectionData.cuts.length,2);
for(const cut of sectionData.cuts){assert.equal(cut.status,'SOURCE_INTERSECTION');assert.equal(cut.valleyMidZFt,22.125);assert(cut.segments.length>=2);}
const record={schemaVersion:'pondy-d4-source-chain-audit-v2',sourceSha,
 pondyAuditedSha:git(['rev-parse','HEAD'],root),candidateId:roofExport.candidateId,
 candidateSnapshotSha256:sha256(sectionData.candidate),intervalManifestSha256:sha256(regenerated),
 modelBinding:'PASS',customerPublicationAllowed:false,approvedForConstruction:false,
 owners,junctionAliases:aliases,sourceAndStandaloneFiles:files,
 valleySections:sectionData.cuts,
 remainingGates:['Exact served LotScope revision and authenticated inspector visual acceptance',
 'Home B cardinal drawing acceptance (model verification is not architectural approval)',
 'Actual-phone review and native picker on confirmed deployed revision','Physical print calibration',
 'Professional valley/drainage/structure review','AHJ approval']};
fs.writeFileSync(path.resolve(output),JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({status:'PASS',sourceSha,owners:owners.length,standaloneModules:files.length,
 valleySections:record.valleySections.length,customerPublicationAllowed:false,output:path.resolve(output)}));
