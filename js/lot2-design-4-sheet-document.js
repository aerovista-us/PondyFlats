(function(root){
'use strict';

const SCHEMA=(typeof module!=='undefined'&&module.exports)?require('./lot2-sheet-document-schema.js'):root.PondySheetDocumentSchema;
const SOT=(typeof module!=='undefined'&&module.exports)?require('./lot2-sot.js'):(typeof Lot2SOT!=='undefined'?Lot2SOT:root.Lot2SOT);
const D4=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4.js'):root.Lot2Design4;
const PLAN=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-plan-closure.js'):root.Lot2Design4PlanClosure;
const ARCH=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-architecture.js'):root.Lot2Design4Architecture;
const ROOF=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-roof-sot.js'):root.Lot2Design4RoofSOT;
const EVIDENCE=(typeof module!=='undefined'&&module.exports)?require('../docs/lot2-design-4-workbench-evidence.json'):null;
if(!SCHEMA||!SOT||!D4||!PLAN||!ARCH||!ROOF)throw new Error('Design 4 sheet document requires schema and all Design 4 source models');

const REV='D4-SHEET-DOCUMENT-v0.1';

function source(id,path,revision,authority,status,note){
  return {id,path,revision:String(revision),authority,status,note};
}
function geometry(id,kind,sourceId,selector,authority,status,note){
  return {id,kind,sourceId,selector,authority,status,note};
}
function drawing(id,kind,title,geometryRefs,gateRefs,annotations=[]){
  return {
    id,kind,title,geometryRefs,
    scale:{kind:'fit',label:'diagrammatic / scale to be assigned by sheet renderer'},
    dimensions:[],
    annotations,
    gateRefs
  };
}
function roofRef(ownerId){return 'd4.roof.'+ownerId;}

function build(){
  const gm=D4.analyze();
  const pm=PLAN.analyze();
  const am=ARCH.analyze();
  const rm=ROOF.analyze();
  const evidenceStatus=EVIDENCE&&EVIDENCE.status?EVIDENCE.status:'EVIDENCE_NOT_LOADED';

  const sources=[
    source('lot2-parcel','js/lot2-sot.js',SOT.VERSION,'FROZEN','LOCKED','Survey/property orientation authority.'),
    source('d4-geometry','js/lot2-design-4.js',D4.REV,'PROMOTED',gm.verdict,'Design 4 site/building/parking geometry; promoted but not frozen.'),
    source('d4-plan','js/lot2-design-4-plan-closure.js',PLAN.REV,'PLAN_GATED',pm.verdict,'Room, stair, entry and plan-connectivity authority.'),
    source('d4-architecture','js/lot2-design-4-architecture.js',ARCH.REV,'ARCHITECTURE_AUTHORED',am.verdict,'Openings and vertical working datums used by elevations, sections and axon.'),
    source('d4-roof','js/lot2-design-4-roof-sot.js',ROOF.REV,'LOCKED_EXTERNAL',rm.status,ROOF.SOURCE),
    source('d4-workbench-evidence','docs/lot2-design-4-workbench-evidence.json',EVIDENCE&&EVIDENCE.source_head?EVIDENCE.source_head:'tracked-evidence','EVIDENCE',evidenceStatus,'Exact-head Workbench circulation evidence; not a construction approval.')
  ];

  const geometryRefs=[
    geometry('parcel.boundary','polygon2','lot2-parcel','SURVEY','FROZEN','LOCKED','True Lot 2 survey polygon.'),
    geometry('parcel.setbacks','constraint-set','lot2-parcel','SETBACKS','FROZEN','PLANNING_BASELINE','Parcel setback baseline; Design 4 accessory scenario remains separately conditional.'),
    geometry('d4.south-boundary','polyline2','d4-geometry','SOUTH_BOUNDARY','PROMOTED','PROMOTED_GEOMETRY','Irregular south-boundary working segment chain.'),
    geometry('d4.vehicle.fs-suv','vehicle-model','d4-geometry','VEHICLE','PROMOTED','WORKBENCH_TEST_MODEL','Design 4 full-size vehicle test model.'),
    geometry('d4.setbacks','constraint-set','d4-geometry','SETBACKS','PROMOTED','CONDITIONAL','Principal/accessory/inter-garage planning scenario and status.'),
    ...D4.HOMES.map(h=>geometry('d4.home-'+h.unit.toLowerCase()+'.footprint','polygon2','d4-geometry','HOMES[id='+h.id+']','PROMOTED','PROMOTED_GEOMETRY','Building shell footprint for Unit '+h.unit+'.')),
    ...D4.GARAGES.map(g=>geometry('d4.garage-'+g.unit.toLowerCase()+'.footprint','rect2','d4-geometry','GARAGES[id='+g.id+']','PROMOTED','LOCKED_RULE','Detached 22x22 garage plate for Unit '+g.unit+'.')),
    ...D4.PAVEMENT.map(p=>geometry('d4.pavement.'+p.id.toLowerCase(),'polygon2','d4-geometry','PAVEMENT[id='+p.id+']','PROMOTED','CONCEPT_ENVELOPE',p.label)),
    ...D4.STALLS.map(s=>geometry('d4.stall.'+s.id.toLowerCase(),'point2','d4-geometry','STALLS[id='+s.id+']','PROMOTED','STATIC_FIT_PASS','Rear-axle pose for parked vehicle body.')),
    ...['A','B'].map(unit=>geometry('d4.plan.shell-'+unit.toLowerCase(),'polygon2','d4-plan','SHELLS.'+unit,'PLAN_GATED','PASS','Plan shell duplicates and gates the Design 4 home footprint.')),
    ...['ground','upper'].flatMap(level=>['A','B'].map(unit=>geometry('d4.plan.rooms.'+level+'.'+unit.toLowerCase(),'collection','d4-plan','ROOMS.'+level+'.'+unit,'PLAN_GATED','PASS','Room-zone collection for Unit '+unit+' '+level+'.'))),
    ...PLAN.ENTRIES.map(e=>geometry('d4.entry.'+e.unit.toLowerCase(),'polyline2','d4-plan','ENTRIES[id='+e.id+']','PLAN_GATED','PASS','Primary entry opening for Unit '+e.unit+'.')),
    geometry('d4.openings','collection','d4-architecture','OPENINGS','ARCHITECTURE_AUTHORED','SHARED_WORLD_MODEL','Entries are derived from plan; windows and overhead doors remain architecture-authored.'),
    geometry('d4.vertical-datums','datum-set','d4-architecture','HEIGHTS','ARCHITECTURE_AUTHORED','WORKING_DATUMS','Home 20 ft, garage 11 ft and floor 10 ft working datums.'),
    ...ROOF.ROOFS.map(r=>geometry(roofRef(r.ownerId),'roof-model','d4-roof','ROOFS[ownerId='+r.ownerId+']','LOCKED_EXTERNAL',r.validationStatus,'Validated roof zones, junctions and exact 3D surface faces.'))
  ];

  const gates=[
    {id:'parcel-survey',label:'True survey / orientation',status:SOT.FROZEN?'LOCKED':'UNLOCKED',blocking:true,sourceIds:['lot2-parcel']},
    {id:'design4-geometry',label:'Design 4 geometry',status:gm.verdict,blocking:true,sourceIds:['d4-geometry'],note:'Accessory zoning and inter-garage spacing remain conditional/AHJ review.'},
    {id:'design4-plan',label:'Plan connectivity',status:pm.verdict,blocking:true,sourceIds:['d4-plan']},
    {id:'design4-roof',label:'Roof geometry authority',status:rm.status,blocking:true,sourceIds:['d4-roof']},
    {id:'design4-parking',label:'Four-stall static fit',status:gm.checks.parkingFit.status,blocking:true,sourceIds:['d4-geometry']},
    {id:'design4-workbench',label:'Full-body path evidence',status:evidenceStatus,blocking:true,sourceIds:['d4-workbench-evidence']},
    {id:'professional-validation',label:'Professional / code / AHJ validation',status:'PENDING',blocking:false,sourceIds:['d4-architecture','d4-roof'],note:'The sheet engine must preserve this disclosure and never promote concept work to permit/construction status.'}
  ];

  const siteBase=['parcel.boundary','parcel.setbacks','d4.south-boundary','d4.home-a.footprint','d4.home-b.footprint','d4.garage-a.footprint','d4.garage-b.footprint'];
  const pavement=D4.PAVEMENT.map(p=>'d4.pavement.'+p.id.toLowerCase());
  const stalls=D4.STALLS.map(s=>'d4.stall.'+s.id.toLowerCase());
  const roofs=ROOF.ROOFS.map(r=>roofRef(r.ownerId));
  const elevationBase=['d4.home-a.footprint','d4.home-b.footprint','d4.garage-a.footprint','d4.garage-b.footprint','d4.openings','d4.vertical-datums',...roofs];

  const sheets=[
    {id:'site',sequence:1,title:'Site + vehicle',drawings:[
      drawing('A-001','site-plan','Rear-garage site plan',[...siteBase,'d4.setbacks',...pavement],['parcel-survey','design4-geometry','design4-roof'],[
        {id:'a001-status',kind:'status',text:'Concept geometry; accessory zoning and inter-garage spacing remain conditional.',geometryRefs:['d4.setbacks']}
      ]),
      drawing('A-002','vehicle-proof','Four-stall fit + path evidence',[...siteBase,'d4.vehicle.fs-suv',...pavement,...stalls],['design4-parking','design4-workbench'])
    ]},
    {id:'plans',sequence:2,title:'Plans + ownership',drawings:[
      drawing('A-101','floor-plan','Ground floor',['d4.plan.shell-a','d4.plan.shell-b','d4.plan.rooms.ground.a','d4.plan.rooms.ground.b','d4.entry.a','d4.entry.b'],['design4-plan']),
      drawing('A-102','floor-plan','Upper floor',['d4.plan.shell-a','d4.plan.shell-b','d4.plan.rooms.upper.a','d4.plan.rooms.upper.b'],['design4-plan']),
      drawing('A-103','relationship-plan','Ownership + walk relationships',['d4.plan.shell-a','d4.plan.shell-b','d4.garage-a.footprint','d4.garage-b.footprint','d4.entry.a','d4.entry.b'],['design4-plan','design4-geometry'])
    ]},
    {id:'elevations',sequence:3,title:'Elevations',drawings:[
      drawing('A-201','elevation','Pennsylvania / east elevation',elevationBase,['design4-plan','design4-roof','professional-validation']),
      drawing('A-202','elevation','North elevation',elevationBase,['design4-plan','design4-roof','professional-validation']),
      drawing('A-203','elevation','Rear / west elevation',elevationBase,['design4-plan','design4-roof','professional-validation']),
      drawing('A-204','elevation','South elevation',elevationBase,['design4-plan','design4-roof','professional-validation'])
    ]},
    {id:'sections',sequence:4,title:'Sections',drawings:[
      drawing('A-301','section','Unit A section',['d4.plan.shell-a','d4.vertical-datums','d4.roof.home-a','d4.roof.garage-a'],['design4-plan','design4-roof','professional-validation']),
      drawing('A-302','section','Unit B section',['d4.plan.shell-b','d4.vertical-datums','d4.roof.home-b','d4.roof.garage-b'],['design4-plan','design4-roof','professional-validation'])
    ]},
    {id:'axon',sequence:5,title:'Axonometric',drawings:[
      drawing('A-401','axonometric','Massing axon',elevationBase,['design4-plan','design4-roof','professional-validation']),
      drawing('A-402','axonometric','Architectural axon',elevationBase,['design4-plan','design4-roof','professional-validation'])
    ]}
  ];

  return {
    schemaVersion:SCHEMA.SCHEMA_VERSION,
    documentId:'pondy-flats-lot2-design4',
    title:'Pondy Flats · Lot 2 · Design 4 architectural sheet document',
    units:'ft',
    orientation:{front:'pennsylvania-right',northRear:'left'},
    design:{id:'design-4',revision:REV,status:gm.verdict},
    sources,
    geometry:geometryRefs,
    gates,
    sheets
  };
}

const DOCUMENT=SCHEMA.assertValid(build());
const api=Object.freeze({REV,build,DOCUMENT});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.Lot2Design4SheetDocument=api;
})(typeof window!=='undefined'?window:globalThis);
