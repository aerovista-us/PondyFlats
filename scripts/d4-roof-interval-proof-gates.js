'use strict';
const assert=require('node:assert/strict');
const M=require('../js/lot2-design-4-roof-intervals.js');
const R=require('../js/lot2-design-4-roof-sot.js');
const A=require('../js/lot2-design-4-roof-interval-adapter.js');
const original=M.manifest;
const home=R.ROOFS.find(r=>r.ownerId==='home-b');
function reject(name,change){
 const copy=structuredClone(original);M.manifest=copy;
 try{change(copy.owners.find(o=>o.ownerId==='home-b').views.north,copy);
  assert.equal(A.resolve(home,'north').status,'WITHHELD',name);
 }finally{M.manifest=original;}
}
for(const r of R.ROOFS)for(const view of ['north','south','east','west','pondy-iso-01'])
 assert.equal(A.resolve(r,view).status,'INTERVAL_VERIFIED',r.ownerId+' '+view);
reject('old source contract withheld',(_,m)=>{m.schemaVersion='lotscope-verified-roof-intervals-v1';});
reject('proof required even if counts claim zero',(v)=>{delete v.projectionProof;v.counts.edgeOnFaces=0;v.counts.collapsedEdges=0;});
reject('collapsed omission',(v)=>{v.projectionProof.collapsedProjection.pop();v.counts.collapsedEdges--;});
reject('collapsed duplicate',(v)=>{v.projectionProof.collapsedProjection.push(v.projectionProof.collapsedProjection[0]);v.counts.collapsedEdges++;});
reject('collapsed world endpoints',(v)=>{v.projectionProof.collapsedProjection[0].sourceA[0]++;});
reject('collapsed camera point',(v)=>{v.projectionProof.collapsedProjection[0].point[0]++;});
reject('wrong edge-on count',(v)=>{v.counts.edgeOnFaces++;});
reject('unknown method',(v)=>{v.projectionProof.method='SAMPLED_ONLY';});
reject('source face id',(v)=>{v.segments[0].faceId='unbound';});
reject('source polygon edge',(v)=>{v.segments[0].edgeIndex=999;});
reject('screen coordinate mismatch',(v)=>{v.segments[0].start[0]++;});
reject('nonfinite coordinate',(v)=>{v.segments[0].end[1]=NaN;});
reject('source t gap',(v)=>{v.segments[0].t0+=.1;});
reject('source t overlap',(v)=>{v.segments.push(v.segments[0]);v.counts[v.segments[0].visibility.toLowerCase()]++;});
reject('suppression evidence missing',(v)=>{const s=v.suppressedSegments.pop();v.counts[s.visibility==='INTERNAL_SEAM'?'internalSeams':'duplicateShared']--;});
reject('drawn interval omitted despite consistent counts',(v)=>{const s=v.segments.pop();v.counts[s.visibility.toLowerCase()]--;});
reject('unresolved verification',(v)=>{const s=v.segments[0];v.counts[s.visibility.toLowerCase()]--;s.visibility='UNRESOLVED';v.counts.unresolved++;});
reject('malformed suppressed record',(v)=>{v.suppressedSegments=[null];});
console.log('PASS v2 complete source-edge/collapsed/seam evidence; 18 omission, drift, forgery and stale-contract regressions withheld');
