'use strict';
const assert=require('assert');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const ROOF=require('../js/lot2-design-4-roof-sot.js');
const ARCH=require('../js/lot2-design-4-architecture.js');

const state=ROOF.analyze();
assert.equal(state.schemaVersion,'lotscope-roof-geometry-v1');
assert.equal(state.status,'CONCEPT_ONLY_REQUIRED');
assert.equal(state.locked,0);
assert.equal(state.required,4);
assert(state.results.every(row=>row.authoritative===false&&row.renderPolicy==='SUPPRESS_ROOF'));

const lockedFixture={
  id:'fixture-roof',
  ownerId:'home-a',
  status:'LOCKED',
  validationStatus:'ROOF_GEOMETRY_LOCKED',
  ownerGeometryKey:'fixture-owner-key',
  zones:[{
    id:'z1',status:'LOCKED',type:'gable',
    footprint:[[0,0],[10,0],[10,10],[0,10]],
    plateZFt:10,ridgeA:[0,5],ridgeB:[10,5],
    solveBy:'PITCH',pitchRise:6,pitchRun:12,ridgeZFt:null,
    source:'consumer authority guard fixture'
  }]
};
assert.equal(ROOF.roofIsAuthoritative(lockedFixture),true,'complete centered gable geometry may pass the consumer authority guard');
const fixtureZone=lockedFixture.zones[0];
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,footprint:null}]}),false,'missing footprint must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,plateZFt:null}]}),false,'missing plate elevation must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,pitchRise:null}]}),false,'missing pitch authority must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:[0,4],ridgeB:[10,4]}]}),false,'off-center gable ridge must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:[0,12],ridgeB:[10,12]}]}),false,'out-of-footprint ridge must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:[]}]}),false,'empty ridge arrays must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:['0','5']}]}),false,'string ridge coordinates must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeB:[10,NaN]}]}),false,'non-finite ridge coordinates must never be authoritative');

for(const face of ['east','west','north','south']){
  const svg=ARCH.renderElev(face);
  assert(svg.includes('data-roof-render-policy="SUPPRESS_ROOF"'),face+' must carry roof suppression policy');
  assert(svg.includes('ROOF GEOMETRY WITHHELD'),face+' must visibly withhold unverified roof geometry');
  assert(!svg.includes('CONCEPT ROOF'),face+' must not draw a generic concept roof');
}
for(const unit of ['A','B']){
  const svg=ARCH.renderSection(unit);
  assert(svg.includes('data-roof-render-policy="SUPPRESS_ROOF"'),unit+' section must carry roof suppression policy');
  assert(svg.includes('ROOF GEOMETRY WITHHELD'),unit+' section must withhold home roof');
  assert(svg.includes('data-plate-datum="working"'),unit+' section must expose only a working top datum');
}
const architectureSource=fs.readFileSync(path.join(root,'js','lot2-design-4-architecture.js'),'utf8');
assert(!architectureSource.includes('function roofPath('),'generic roof triangle helper must not exist');
assert(!architectureSource.includes('CONCEPT ROOF'),'generic concept-roof overlay must not exist');
for(const mode of ['massing','clean']){
  const svg=ARCH.renderAxon(mode);
  assert(svg.includes('data-roof-render-policy="SUPPRESS_ROOF"'),mode+' axon must carry roof suppression policy');
  assert(svg.includes('data-plate-datum="working"'),mode+' axon must label top outline as working datum');
  assert(/Roof surfaces[^<]*suppressed/i.test(svg),mode+' axon must disclose roof suppression');
}
const analysis=ARCH.analyze();
assert.equal(analysis.checks.roofContract.ok,true);
assert.equal(analysis.checks.roofContract.status,'CONCEPT_ONLY_REQUIRED');
assert.equal(analysis.checks.roofContract.renderPolicy,'SUPPRESS_ROOF');
assert.equal(ARCH.roofViewPolicy({authoritative:false}),'SUPPRESS_ROOF');
assert.equal(ARCH.roofViewPolicy({authoritative:true}),'LOCKED_DATA_AWAITING_EXACT_VIEW_PROJECTOR');
assert.match(ARCH.roofWithheldLabel({authoritative:true}),/GEOMETRY LOCKED.*PROJECTOR PENDING/i);
assert(!/NOT GEOMETRY LOCKED/i.test(ARCH.roofWithheldLabel({authoritative:true})),'authoritative roofs must not be labeled as unlocked while awaiting exact projection');

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
  elevationsSuppressUnverifiedRoof:true,
  sectionsSuppressUnverifiedRoof:true,
  axonSuppressesRoofSurface:true,
  architectureRoofContract:analysis.checks.roofContract
},null,2));
