'use strict';
// Compare public served bytes to an exact reviewed Git revision, without login.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),[sha,output]=process.argv.slice(2);
if(!/^[0-9a-f]{40}$/.test(sha||'')||!output)throw Error('Usage: node scripts/audit-d4-served-revision.cjs EXPECTED_PONDY_SHA OUTPUT_JSON');
const base='https://aerovista-us.github.io/PondyFlats/';
const modules=['lot2-design-4.js','lot2-design-4-roof-sot.js','lot2-design-4-roof-intervals.js',
 'lot2-design-4-roof-interval-adapter.js','lot2-design-4-roof-edge-renderer.js','lot2-design-4-architecture.js','d4-customer-release-status.js'];
const paths=['index.html','design-4.html','design-4-status.html','d4-elevs.html','d4-axon.html','d4-sections.html',
 'packages/design-4-client/index.html','packages/design-4-client/status.html','packages/design-4-client/elevs.html',
 'packages/design-4-client/axon.html','packages/design-4-client/sections.html',
 ...modules.flatMap(p=>['js/'+p,'packages/design-4-client/js/'+p])];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
(async()=>{
 const files=[];
 for(let i=0;i<paths.length;i+=5){
  const batch=await Promise.all(paths.slice(i,i+5).map(async file=>{
   const expected=execFileSync('git',['show',sha+':'+file],{cwd:root});
   const url=new URL(file,base);url.searchParams.set('revision-audit',sha);
   const response=await fetch(url,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)});
   const actual=Buffer.from(await response.arrayBuffer());
   return {path:file,httpStatus:response.status,expectedSha256:hash(expected),servedSha256:hash(actual),
    byteMatch:response.ok&&expected.equals(actual)};
  }));files.push(...batch);
 }
 const report={schemaVersion:'pondy-d4-served-revision-v1',baseUrl:base,expectedSha:sha,
  status:files.every(f=>f.byteMatch)?'PASS':'FAIL',files,
  scope:'Public bytes only; not physical-device, authenticated LotScope or professional acceptance'};
 fs.writeFileSync(path.resolve(output),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({status:report.status,expectedSha:sha,matched:files.filter(f=>f.byteMatch).length,total:files.length,
  mismatches:files.filter(f=>!f.byteMatch).map(f=>f.path)}));
 assert.equal(report.status,'PASS','Public deployment differs from reviewed revision');
})().catch(error=>{console.error(error.message);process.exitCode=1});
