'use strict';
const assert=require('assert');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const ROOF=require('../js/lot2-design-4-roof-sot.js');
const ARCH=require('../js/lot2-design-4-architecture.js');

const imported=JSON.parse(fs.readFileSync(path.join(root,'data','lot2-design-4-roof-sot.json'),'utf8'));
const state=ROOF.analyze();
assert.equal(state.schemaVersion,'lotscope-roof-geometry-v1');
assert.equal(state.status,'AUTHORITATIVE_ALLOWED');
assert.equal(state.locked,4);
assert.equal(state.required,4);
assert(state.results.every(row=>row.authoritative===true&&row.renderPolicy==='AUTHORITATIVE_ROOF_ALLOWED'));
assert.equal(imported.source.commitSha,'b2985780492083ec99212cdd1beb60c47251c124');
assert.equal(imported.renderPolicy,'AUTHORITATIVE_ALLOWED');
assert.equal(imported.counts.locked,4);
assert.deepEqual(
  ROOF.ROOFS.map(roof=>({
    id:roof.id,ownerId:roof.ownerId,status:roof.status,validationStatus:roof.validationStatus,
    ownerGeometryKey:roof.ownerGeometryKey,junctionMode:roof.junctionMode,
    zones:roof.zones.map(zone=>({
      id:zone.id,footprint:zone.footprint,plateZFt:zone.plateZFt,ridgeA:zone.ridgeA,ridgeB:zone.ridgeB,
      ridgeZFt:zone.ridgeZFt,solveBy:zone.solveBy,pitchRise:zone.pitchRise,pitchRun:zone.pitchRun
    })),
    junctions:roof.junctions
  })),
  imported.roofs.map(roof=>({
    id:roof.id,ownerId:roof.ownerId,status:roof.status,validationStatus:roof.validationStatus,
    ownerGeometryKey:roof.ownerGeometryKey,junctionMode:roof.junctionMode,
    zones:roof.zones.map(zone=>({
      id:zone.id,footprint:zone.footprint,plateZFt:zone.plateZFt,ridgeA:zone.ridgeA,ridgeB:zone.ridgeB,
      ridgeZFt:zone.ridgeZFt,solveBy:zone.solveBy,pitchRise:zone.pitchRise,pitchRun:zone.pitchRun
    })),
    junctions:roof.junctions
  })),
  'browser roof SOT must stay synchronized with the imported LotScope roof artifact'
);

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
const planeFixture={...lockedFixture,junctionMode:'PLANE_ENVELOPE',zones:[
  {...lockedFixture.zones[0],id:'za'},
  {...lockedFixture.zones[0],id:'zb'}
],junctions:[{status:'SOLVED',kind:'VALLEY',overlapPolygon:[[0,0],[10,0],[10,10],[0,10]],overlapAreaSqFt:100,segments:[
  {id:'v1',kind:'VALLEY',zoneIds:['za','zb'],a:[5,5],b:[0,0],zAFt:12.5,zBFt:10,residualFt:0}
]}]};
assert.equal(ROOF.junctionsAreAuthoritative(planeFixture),true,'well-formed solved plane-envelope junction may pass the consumer junction guard');
assert.equal(ROOF.junctionsAreAuthoritative({...planeFixture,junctions:[{...planeFixture.junctions[0],overlapAreaSqFt:0}]}),false,'plane-envelope overlap must be positive');
assert.equal(ROOF.junctionsAreAuthoritative({...planeFixture,junctions:[{...planeFixture.junctions[0],segments:[{...planeFixture.junctions[0].segments[0],residualFt:.5}]}]}),false,'junction residual above tolerance must fail closed');
assert.equal(ROOF.junctionsAreAuthoritative({...planeFixture,junctions:[{...planeFixture.junctions[0],segments:[{...planeFixture.junctions[0].segments[0],zoneIds:['za','missing']}]}]}),false,'junction segments must reference imported roof zones');
const fixtureZone=lockedFixture.zones[0];
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,footprint:null}]}),false,'missing footprint must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,footprint:[[0,0],[10,10],[10,0],[0,10]]}]}),false,'self-intersecting footprint must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,footprint:[[0,0],[10,0],[10,0],[0,10]]}]}),false,'duplicate/zero-length footprint edge must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,plateZFt:null}]}),false,'missing plate elevation must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,pitchRise:null}]}),false,'missing pitch authority must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:[0,4],ridgeB:[10,4]}]}),false,'off-center gable ridge must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:[0,12],ridgeB:[10,12]}]}),false,'out-of-footprint ridge must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:[0,0],ridgeB:[10,10]}]}),false,'diagonal ridge across a rectangular footprint must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,pitchRise:1,pitchRun:1e-320}]}),false,'pitch inputs that overflow the derived ridge height must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:[]}]}),false,'empty ridge arrays must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeA:['0','5']}]}),false,'string ridge coordinates must never be authoritative');
assert.equal(ROOF.roofIsAuthoritative({...lockedFixture,zones:[{...fixtureZone,ridgeB:[10,NaN]}]}),false,'non-finite ridge coordinates must never be authoritative');

for(const face of ['east','west','north','south']){
  const svg=ARCH.renderElev(face);
  assert(svg.includes('data-roof-render-policy="LOCKED_DATA_AWAITING_EXACT_VIEW_PROJECTOR"'),face+' must expose locked roof data while exact projection is pending');
  assert(svg.includes('ROOF GEOMETRY LOCKED · EXACT VIEW PROJECTOR PENDING'),face+' must disclose the exact-view projector boundary');
  assert(!svg.includes('CONCEPT ROOF'),face+' must not draw a generic concept roof');
}
for(const unit of ['A','B']){
  const svg=ARCH.renderSection(unit);
  assert(svg.includes('data-roof-render-policy="LOCKED_DATA_AWAITING_EXACT_VIEW_PROJECTOR"'),unit+' section must expose locked roof data while exact projection is pending');
  assert(svg.includes('ROOF GEOMETRY LOCKED · EXACT VIEW PROJECTOR PENDING'),unit+' section must disclose pending exact projection');
  assert(svg.includes('data-plate-datum="working"'),unit+' section must still expose only the plate datum until the projector lands');
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
assert.equal(analysis.checks.roofContract.status,'AUTHORITATIVE_ALLOWED');
assert.equal(analysis.checks.roofContract.renderPolicy,'EXACT_VIEW_PROJECTOR_REQUIRED');
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
  importedRoofAuthority:true,
  exactViewProjectorPending:true,
  axonSuppressesRoofSurface:true,
  architectureRoofContract:analysis.checks.roofContract
},null,2));
