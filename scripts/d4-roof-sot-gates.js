'use strict';
const assert=require('assert');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const ROOF=require('../js/lot2-design-4-roof-sot.js');
const ARCH=require('../js/lot2-design-4-architecture.js');

const state=ROOF.analyze();
assert.equal(state.schemaVersion,'lotscope-roof-geometry-v1');
assert.equal(state.status,'AUTHORITATIVE_ALLOWED');
assert.equal(state.locked,4);
assert.equal(state.required,4);
assert(state.results.every(row=>row.authoritative===true&&row.renderPolicy==='AUTHORITATIVE_ROOF'));

const expectedRidges={
  'home-b-roof-zone-1':24.25,
  'home-b-roof-zone-2':22.3125,
  'home-a-roof-zone-1':26.5625,
  'garage-b-roof-zone-1':16.5,
  'garage-a-roof-zone-1':16.5
};
for(const roof of ROOF.ROOFS){
  assert.equal(ROOF.roofIsAuthoritative(roof),true,roof.ownerId+' must pass the consumer authority guard');
  for(const zone of roof.zones){
    assert.equal(ROOF.zoneRidgeZ(zone),expectedRidges[zone.id],zone.id+' ridge Z must match the locked 6:12 solve');
    assert.equal(zone.pitchRise,6);
    assert.equal(zone.pitchRun,12);
  }
}
const lockedFixture={
  id:'fixture-roof',ownerId:'home-a',status:'LOCKED',validationStatus:'ROOF_GEOMETRY_LOCKED',ownerGeometryKey:'fixture-owner-key',
  zones:[{id:'z1',status:'LOCKED',type:'gable',footprint:[[0,0],[10,0],[10,10],[0,10]],plateZFt:10,ridgeA:[0,5],ridgeB:[10,5],pitchRise:6,pitchRun:12,ridgeZFt:null}]
};
assert.equal(ROOF.roofIsAuthoritative(lockedFixture),true);
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...lockedFixture.zones[0],ridgeA:[]}]}),false);
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...lockedFixture.zones[0],pitchRise:null}]}),false);
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,ownerGeometryKey:''}),false);

for(const face of ['east','west','north','south']){
  const svg=ARCH.renderElev(face);
  assert(svg.includes('data-roof-policy="AUTHORITATIVE_ROOF"'),face+' elevation must expose authoritative roof policy');
  assert.equal((svg.match(/data-roof-zone=/g)||[]).length,5,face+' must project all five locked roof zones');
  assert(svg.includes('data-roof-ridge='),face+' must project locked ridge geometry');
  assert(svg.includes('6:12'),face+' must disclose locked pitch');
  assert(!svg.includes('ROOF GEOMETRY WITHHELD'),face+' must not keep the old withheld state');
  assert(!svg.includes('PROJECTOR PENDING'),face+' must not claim projector work is pending');
}
for(const unit of ['A','B']){
  const svg=ARCH.renderSection(unit);
  assert(svg.includes('data-roof-policy="AUTHORITATIVE_ROOF"'),unit+' section must render authoritative roof');
  assert(svg.includes('data-section-scope="PRIMARY_GABLE_CONTROL"'),unit+' section must declare its exact roof-control scope');
  assert(svg.includes('6:12 LOCKED'),unit+' section must identify locked pitch');
  assert(!svg.includes('ROOF GEOMETRY WITHHELD'),unit+' section must not retain withheld roof wording');
}
const architectureSource=fs.readFileSync(path.join(root,'js','lot2-design-4-architecture.js'),'utf8');
assert(architectureSource.includes('function roofPlanePolys('),'exact roof plane projector must exist');
assert(architectureSource.includes('function renderRoofAxon('),'axon roof projector must exist');
assert(!architectureSource.includes('CONCEPT ROOF'),'generic concept-roof overlay must not exist');
assert(!architectureSource.includes('EXACT VIEW PROJECTOR PENDING'),'old pending-projector wording must be removed');

for(const mode of ['massing','clean']){
  const svg=ARCH.renderAxon(mode);
  assert(svg.includes('data-roof-policy="AUTHORITATIVE_ROOF"'),mode+' axon must expose authoritative roof policy');
  assert.equal((svg.match(/data-roof-plane=/g)||[]).length,10,mode+' axon must project two roof planes for each of five locked gable zones');
  assert.equal((svg.match(/data-roof-ridge=/g)||[]).length,5,mode+' axon must project all five ridges');
  assert(svg.includes('data-pavement='),mode+' axon should carry the verified concept pavement context');
}
const analysis=ARCH.analyze();
assert.equal(analysis.checks.roofContract.ok,true);
assert.equal(analysis.checks.roofContract.status,'AUTHORITATIVE_ALLOWED');
assert.equal(analysis.checks.roofContract.locked,4);
assert.equal(analysis.checks.roofContract.renderPolicy,'AUTHORITATIVE_ROOF');
assert.equal(analysis.checks.roofContract.projector,'EXACT_WORLD_PROJECTION');
assert.equal(ARCH.roofViewPolicy({authoritative:false}),'SUPPRESS_ROOF');
assert.equal(ARCH.roofViewPolicy({authoritative:true}),'AUTHORITATIVE_ROOF');

for(const file of ['design-4.html','d4-elevs.html','d4-axon.html','d4-sections.html']){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert(html.includes('js/lot2-design-4-roof-sot.js'),file+' must load roof SOT before architecture');
  assert(html.indexOf('lot2-design-4-roof-sot.js') < html.indexOf('lot2-design-4-architecture.js'),file+' must load roof SOT before architecture');
}
const client=path.join(root,'packages','design-4-client');
if(fs.existsSync(client)){
  assert(fs.existsSync(path.join(client,'js','lot2-design-4-roof-sot.js')),'exported Design 4 client must carry roof SOT');
  for(const file of ['index.html','elevs.html','axon.html','sections.html']){
    const html=fs.readFileSync(path.join(client,file),'utf8');
    assert(html.includes('js/lot2-design-4-roof-sot.js'),'exported '+file+' must load roof SOT');
  }
}

console.log(JSON.stringify({
  schemaVersion:state.schemaVersion,
  roofStatus:state.status,
  locked:state.locked,
  required:state.required,
  ridgeZFt:expectedRidges,
  elevationsProjectAuthoritativeRoof:true,
  sectionsProjectAuthoritativeRoof:true,
  axonProjectsAuthoritativeRoof:true,
  architectureRoofContract:analysis.checks.roofContract
},null,2));
