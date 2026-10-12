(function(global){
'use strict';
/**
 * Every NEW customer-facing candidate report uses this complete feature
 * registry. Legacy Design 1–4 remain reference material, not silently converted
 * into certified drawings. Feature status describes the CURRENT candidate only.
 */
const VERSION='pondy-customer-report-standard-v1';
const STATES=Object.freeze(['SOURCE_BOUND','MODEL_VERIFIED','ILLUSTRATIVE','REVIEW_REQUIRED','WITHHELD']);
const FEATURES=Object.freeze([
 {id:'executiveHero',name:'Visual hero and decision status',from:'Design 4',group:'summary'},
 {id:'drawingGuide',name:'How to read the plans and model directions',from:'Design 2',group:'summary'},
 {id:'sitePlan',name:'Detailed source-coordinated site plan',from:'Design 1',group:'site'},
 {id:'siteAssumptions',name:'Parcel, setbacks, street and orientation evidence',from:'Design 4',group:'site'},
 {id:'groundPlan',name:'Ground floor and garage relationships',from:'Design 1',group:'plans'},
 {id:'upperPlan',name:'Upper floor and stairs',from:'Design 1',group:'plans'},
 {id:'bubbleDiagram',name:'Room adjacency and bubble planning diagram',from:'Design 3',group:'plans'},
 {id:'areaSchedule',name:'Home, garage and room area schedule',from:'Design 3',group:'plans'},
 {id:'elevations',name:'Four comparable, common-scale elevations',from:'Design 4',group:'drawings'},
 {id:'materials',name:'Appearance and material intent',from:'Design 3',group:'drawings'},
 {id:'sections',name:'Source-linked longitudinal and transverse sections',from:'Design 1',group:'drawings'},
 {id:'roof',name:'Roof geometry, junctions and fascia authority',from:'Design 4',group:'drawings'},
 {id:'axon',name:'Architectural or illustrative axonometric massing',from:'Design 1',group:'drawings'},
 {id:'circulation',name:'Inbound, outbound and garage maneuver evidence',from:'Design 4',group:'access'},
 {id:'pedestrianAccess',name:'Ownership, walk routes and service access',from:'Design 4',group:'access'},
 {id:'dimensions',name:'Architectural dimensions and scales',from:'Design 4',group:'technical'},
 {id:'comparison',name:'Side-by-side alternative comparison',from:'Design 1–4',group:'technical'},
 {id:'fieldNotes',name:'Contractor, trade, drainage and coordination notes',from:'Design 4',group:'technical'},
 {id:'evaluation',name:'Pass/fail/review evidence and blocking findings',from:'Design 4',group:'technical'},
 {id:'sheetIndex',name:'Complete drawing index and deliverable status',from:'Design 2',group:'handoff'},
 {id:'sourceProvenance',name:'Candidate revision, coordinates and source links',from:'Design 4',group:'handoff'},
 {id:'nextSteps',name:'Next decisions, unresolved work and signoff boundary',from:'Design 4',group:'handoff'}
]);
const byId=new Map(FEATURES.map(x=>[x.id,x]));
const groups=Object.freeze([
 {id:'summary',name:'Start here',why:'Strong hero image, plain-language guide and gate summary first'},
 {id:'site',name:'Site and lot',why:'Parcel, driveway and street context before architecture'},
 {id:'plans',name:'Living arrangement',why:'Real plans and area schedules, or explicitly missing evidence'},
 {id:'drawings',name:'Architectural views',why:'Large elevations, sections, roof authority and axon'},
 {id:'access',name:'Access and circulation',why:'Full inbound/outbound and walking evidence separately'},
 {id:'technical',name:'Buildability and comparisons',why:'Source dimensions, trade implications and comparable alternatives'},
 {id:'handoff',name:'Documentation and next steps',why:'Complete index, source authority and development actions'}
]);
function fail(s){throw new Error('REPORT_COVERAGE_GATE:'+s)}
function escape(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function evidenceRequired(v){return v.status==='SOURCE_BOUND'||v.status==='MODEL_VERIFIED';}
function assertStandard(manifest){
 if(!manifest||typeof manifest!=='object'||manifest.standard!==VERSION)fail('VERSION_MISMATCH');
 if(!/^[a-f0-9]{64}$/i.test(manifest.sourceSha256||''))fail('MISSING_SOURCE_HASH');
 if(!manifest.candidateId||!manifest.sourceRevision)fail('UNBOUND_CANDIDATE_REVISION');
 if(manifest.authority!=='CONCEPT_ONLY_NOT_FOR_CONSTRUCTION')fail('CONCEPT_BOUNDARY');
 if(manifest.orientation?.policy!=='PRESERVE_MODEL_XY'||!Array.isArray(manifest.orientation?.matrix)||manifest.orientation.matrix.length!==6)fail('MISSING_ORIENTATION_CONTRACT');
 if(typeof require==='function'){
  const O=require('./report-orientation-contract.js');
  O.assertFrame(manifest.orientation.matrix,manifest.orientation.policy);
 }
 if(!Array.isArray(manifest.features)||manifest.features.length!==FEATURES.length)fail('INCOMPLETE_FEATURE_REGISTRY');
 const seen=new Set(),byFeature=new Map();
 for(const v of manifest.features){
  if(!v||!byId.has(v.id)||seen.has(v.id))fail('UNKNOWN_OR_DUPLICATE_FEATURE');
  seen.add(v.id);byFeature.set(v.id,v);
  if(!STATES.includes(v.status))fail('INVALID_STATE_'+v.id);
  if(typeof v.summary!=='string'||v.summary.trim().length<16)fail('MISSING_EXPLANATION_'+v.id);
  if(evidenceRequired(v)&&(!v.evidenceRef||typeof v.evidenceRef!=='string'||v.evidenceRef.length<6))fail('UNSUPPORTED_AUTHORITY_'+v.id);
  if(v.status==='WITHHELD'&&(!v.reason||String(v.reason).length<15))fail('SILENT_MISSING_FEATURE_'+v.id);
  if(v.status==='REVIEW_REQUIRED'&&(!v.reason||String(v.reason).length<15))fail('SILENT_REVIEW_FEATURE_'+v.id);
  if(v.status==='ILLUSTRATIVE'&&!/(illustrat|not modeled|schematic|conceptual)/i.test(v.summary+' '+(v.reason||'')))fail('UNLABELED_ILLUSTRATION_'+v.id);
  if(v.id==='comparison'&&v.status==='MODEL_VERIFIED'&&!v.comparisonSourceRevisions)fail('INCOMPARABLE_DESIGNS');
 }
 for(const f of FEATURES)if(!seen.has(f.id))fail('MISSING_FEATURE_'+f.id);
 const readiness=manifest.features.filter(f=>f.status==='WITHHELD'||f.status==='REVIEW_REQUIRED').length;
 if(!readiness && !manifest.professionalSignoff)fail('UNJUSTIFIED_FULL_APPROVAL');
 return {total:FEATURES.length,ready:FEATURES.length-readiness,open:readiness,states:Object.fromEntries(STATES.map(state=>[state,manifest.features.filter(f=>f.status===state).length]))};
}
function prepareManifest(base,provided){
 if(!base||typeof base!=='object')fail('MISSING_BASE');
 const index=new Map();
 for(const v of provided||[]){
  if(!v||!byId.has(v.id)||index.has(v.id))fail('INVALID_INPUT_FEATURE');
  index.set(v.id,v);
 }
 const features=FEATURES.map(f=>{
  const v=index.get(f.id);
  return v?{...v,id:f.id}:{id:f.id,status:'WITHHELD',summary:f.name+' is included in this report but has no approved design evidence yet.',reason:'Not generated: no source-bound geometry or accepted evidence supplied for this candidate.'};
 });
 const m={standard:VERSION,authority:'CONCEPT_ONLY_NOT_FOR_CONSTRUCTION',...base,features};
 assertStandard(m);
 return m;
}
function reportCoverageHTML(manifest){
 const a=assertStandard(manifest);
 const sections=groups.map(g=>{
  const cards=FEATURES.filter(f=>f.group===g.id).map(f=>{
   const v=manifest.features.find(x=>x.id===f.id);
   return '<article class="report-standard-card" data-report-feature="'+escape(f.id)+'" data-feature-state="'+escape(v.status)+'">'+
    '<h3>'+escape(f.name)+'</h3><p><strong>'+escape(v.status.replaceAll('_',' '))+'</strong> · '+escape(f.from)+'</p>'+
    '<p>'+escape(v.summary)+'</p>'+
    (v.reason?'<p class="report-standard-reason">'+escape(v.reason)+'</p>':'')+
    (v.evidenceRef?'<p class="report-standard-ref">Source: '+escape(v.evidenceRef)+'</p>':'')+'</article>';
  }).join('');
  return '<section data-report-group="'+escape(g.id)+'"><h2>'+escape(g.name)+'</h2><p>'+escape(g.why)+'</p><div class="report-standard-grid">'+cards+'</div></section>';
 }).join('');
 return '<div class="report-standard" data-report-standard="'+VERSION+'" data-report-source="'+escape(manifest.sourceSha256)+'">'+
  '<header><h2>Complete architectural concept report coverage</h2><p>Every drawing and evidence category from the best Designs 1–4 is included. Unsupported items are shown as WITHHELD or REVIEW REQUIRED, never silently omitted.</p>'+
  '<p>Covered '+a.total+' categories · '+a.open+' awaiting evidence. CONCEPT ONLY — NOT FOR CONSTRUCTION.</p></header>'+sections+'</div>';
}
function verifyCoverageHTML(manifest,html){
 assertStandard(manifest);
 if(typeof html!=='string'||!html.includes('data-report-standard="'+VERSION+'"'))fail('MISSING_STANDARD_MARKER');
 if(!html.includes('data-report-source="'+manifest.sourceSha256+'"'))fail('SOURCE_HASH_HTML_MISMATCH');
 if(!/CONCEPT ONLY[\s\S]{0,200}NOT FOR CONSTRUCTION/i.test(html))fail('MISSING_CONCEPT_BANNER');
 for(const feature of manifest.features){
  const marker='data-report-feature="'+feature.id+'" data-feature-state="'+feature.status+'"';
  if(!html.includes(marker))fail('UNRENDERED_OR_WRONG_STATE_'+feature.id);
 }
 return true;
}
const api={VERSION,STATES,FEATURES,groups,prepareManifest,assertStandard,reportCoverageHTML,verifyCoverageHTML};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.PondyCustomerReportStandard=api;
})(typeof window!=='undefined'?window:globalThis);
