'use strict';

const assert=require('assert');
const fs=require('fs');
const path=require('path');

const root=path.resolve(__dirname,'..');
const SOT=require('../js/lot2-sot.js');
const D4=require('../js/lot2-design-4.js');
const PLAN=require('../js/lot2-design-4-plan-closure.js');
const ARCH=require('../js/lot2-design-4-architecture.js');
const ROOF=require('../js/lot2-design-4-roof-sot.js');
const SCHEMA=require('../js/lot2-sheet-document-schema.js');
const ADAPTER=require('../js/lot2-design-4-sheet-document.js');
const EVIDENCE=require('../docs/lot2-design-4-workbench-evidence.json');

const doc=ADAPTER.DOCUMENT;
const validated=SCHEMA.validate(doc);
assert.equal(validated.ok,true,validated.errors.join('\n'));

const jsonSchema=JSON.parse(fs.readFileSync(path.join(root,'schemas','pondy-sheet-document.schema.json'),'utf8'));
assert.equal(jsonSchema.properties.schemaVersion.const,SCHEMA.SCHEMA_VERSION);
assert.equal(jsonSchema.title,'Pondy architectural sheet document');

assert.deepStrictEqual(
  D4.SURVEY,
  SOT.SURVEY,
  'Design 4 survey compatibility copy must remain synchronized with frozen parcel SOT'
);

function homePoly(home){
  return home.poly||[[home.x,home.y],[home.x+home.w,home.y],[home.x+home.w,home.y+home.d],[home.x,home.y+home.d]];
}
for(const unit of ['A','B']){
  const home=D4.HOMES.find(row=>row.unit===unit);
  assert(home,'Design 4 home '+unit+' required');
  assert.deepStrictEqual(
    homePoly(home),
    PLAN.SHELLS[unit].poly,
    'Design 4 '+unit+' home footprint and plan shell must remain synchronized'
  );
}

const roofState=ROOF.analyze();
assert.equal(roofState.status,'AUTHORITATIVE_ALLOWED');
assert.equal(roofState.locked,4);
assert.equal(roofState.required,4);
assert(roofState.results.every(row=>row.authoritative===true));

const roleCounts=ARCH.OPENINGS.reduce((out,row)=>{
  out[row.role]=(out[row.role]||0)+1;
  return out;
},{});
assert.equal(roleCounts.entry,2);
assert.equal(roleCounts['garage-overhead'],2);
assert.equal(roleCounts.window,16);
assert.deepStrictEqual(ARCH.HEIGHTS,{home:20,garage:11,floor:10});

assert.equal(EVIDENCE.status,'PASS_DESIGN_DEVELOPMENT_GEOMETRY');
assert.equal(SOT.SUV_FS.doorWidth,16);
assert.equal(D4.VEHICLE.doorWidth,20);
assert.notEqual(
  SOT.SUV_FS.doorWidth,
  D4.VEHICLE.doorWidth,
  'Known vehicle doorWidth naming ambiguity is expected until the compatibility cleanup'
);

assert.equal(doc.schemaVersion,'pondy-sheet-document-v0.1');
assert.equal(doc.orientation.front,'pennsylvania-right');
assert.equal(doc.orientation.northRear,'left');
assert.equal(doc.sheets.length,5);
const drawings=doc.sheets.flatMap(sheet=>sheet.drawings);
assert.equal(drawings.length,13);
assert.deepStrictEqual(
  drawings.map(row=>row.id),
  ['A-001','A-002','A-101','A-102','A-103','A-201','A-202','A-203','A-204','A-301','A-302','A-401','A-402']
);
assert(drawings.every(row=>row.dimensions.length===0),'schema slice must not silently introduce dimensions before dimensioning prototype');

const a001=drawings.find(row=>row.id==='A-001');
assert(a001.geometryRefs.includes('parcel.boundary'));
assert(!a001.geometryRefs.includes('d4.vehicle.fs-suv'),'site dimensions must not derive garage opening size from ambiguous vehicle doorWidth');
const a002=drawings.find(row=>row.id==='A-002');
assert(a002.geometryRefs.includes('d4.vehicle.fs-suv'));
assert(a002.gateRefs.includes('design4-workbench'));

const sourceIds=new Set(doc.sources.map(row=>row.id));
assert(sourceIds.has('lot2-parcel'));
assert(sourceIds.has('d4-roof'));
assert(sourceIds.has('d4-workbench-evidence'));
const roofSource=doc.sources.find(row=>row.id==='d4-roof');
assert.equal(roofSource.authority,'LOCKED_EXTERNAL');
assert.equal(roofSource.status,'AUTHORITATIVE_ALLOWED');

const parcelRef=doc.geometry.find(row=>row.id==='parcel.boundary');
assert.equal(parcelRef.sourceId,'lot2-parcel');
assert.equal(parcelRef.authority,'FROZEN');
const homeARef=doc.geometry.find(row=>row.id==='d4.home-a.footprint');
assert.equal(homeARef.sourceId,'d4-geometry');
assert.equal(homeARef.authority,'PROMOTED');

const unknownRef=structuredClone(doc);
unknownRef.sheets[0].drawings[0].geometryRefs.push('missing.geometry');
let result=SCHEMA.validate(unknownRef);
assert.equal(result.ok,false);
assert(result.errors.some(message=>message.includes('unknown geometry ref missing.geometry')));

const duplicateGeometry=structuredClone(doc);
duplicateGeometry.geometry.push({...duplicateGeometry.geometry[0]});
result=SCHEMA.validate(duplicateGeometry);
assert.equal(result.ok,false);
assert(result.errors.some(message=>message.includes('duplicate id parcel.boundary')));

const badLiteral=structuredClone(doc);
badLiteral.sheets[0].drawings[0].dimensions.push({
  id:'dim-test-bad',
  kind:'linear',
  geometryRefs:['d4.garage-a.footprint'],
  valuePolicy:'literal'
});
result=SCHEMA.validate(badLiteral);
assert.equal(result.ok,false);
assert(result.errors.some(message=>message.includes('finite literal value required')));

const derivedDimension=structuredClone(doc);
derivedDimension.sheets[0].drawings[0].dimensions.push({
  id:'dim-test-derived',
  kind:'linear',
  geometryRefs:['d4.garage-a.footprint'],
  valuePolicy:'derive',
  precision:2
});
result=SCHEMA.validate(derivedDimension);
assert.equal(result.ok,true,result.errors.join('\n'));

const inventory=fs.readFileSync(path.join(root,'docs','architectural-sheet-engine-s0-geometry-inventory.md'),'utf8');
for(const phrase of [
  'Parcel survey is duplicated',
  'Home shell geometry is duplicated',
  'Openings have mixed ownership',
  'doorWidth',
  'Setbacks represent different layers'
])assert(inventory.includes(phrase),'S0 inventory must record: '+phrase);

const schemaDoc=fs.readFileSync(path.join(root,'docs','architectural-sheet-document-schema.md'),'utf8');
assert(schemaDoc.includes('No geometry coordinates are copied into the sheet document itself.'));
assert(schemaDoc.includes('dimensioning prototype against Design 4'));

console.log(JSON.stringify({
  schemaVersion:doc.schemaVersion,
  adapterRevision:ADAPTER.REV,
  sources:doc.sources.length,
  geometryRefs:doc.geometry.length,
  gates:doc.gates.length,
  sheets:doc.sheets.length,
  drawings:drawings.length,
  dimensionsIntroduced:drawings.reduce((sum,row)=>sum+row.dimensions.length,0),
  surveySynchronization:'PASS',
  planShellSynchronization:'PASS',
  roofAuthority:roofState.status,
  workbenchEvidence:EVIDENCE.status,
  failClosedValidator:'PASS',
  knownDoorWidthAmbiguity:'TRACKED'
},null,2));
