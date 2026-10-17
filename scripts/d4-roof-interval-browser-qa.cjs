'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const puppeteer=require(process.env.PUPPETEER_MODULE||'puppeteer-core');
const root=path.resolve(__dirname,'..');
for(const rel of ['prototypes/design4-customer-sheet-review.html','docs/d4-dimension-customer-report.md']){
 if(!fs.existsSync(path.join(root,'packages/design-4-client',rel)))throw Error('Standalone dimension-study link target missing: '+rel);
}
for(const rel of ['js/d4-customer-release-status.js','packages/design-4-client/js/d4-customer-release-status.js']){
 const ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,rel),'utf8'),ctx);
 const r=ctx.PondyD4Release;
 if(r?.roof?.customerPublicationAllowed!==false||r.approvedForConstruction!==false||r.approvedCandidateSignature!==null||!Object.values(r.professionalAcceptance).every(v=>v===false))throw Error('Release contract changed: '+rel);
}
const scenarios=[
 ['source-elev','d4-elevs.html','elevation'],['source-axon','d4-axon.html','axon'],
 ['package-elev','packages/design-4-client/elevs.html','elevation'],
 ['package-axon','packages/design-4-client/axon.html','axon']
];
(async()=>{
 const browser=await puppeteer.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']});
 const output=process.env.D4_ROOF_QA_DIR||'/tmp/pondy-d4-roof-interval-qa';
 fs.mkdirSync(output,{recursive:true});
 const cases=[];
 try{
  for(const [name,file,kind] of scenarios)for(const width of [1440,390]){
   const page=await browser.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(String(e)));
   await page.setViewport({width,height:940,deviceScaleFactor:1});
   await page.goto('file://'+path.join(root,file),{waitUntil:'load'});
   const data=await page.evaluate(kind=>{
    const ownerGroups=[...document.querySelectorAll('g[data-roof-projector="LOCKED_VERIFIED_EDGE_INTERVALS"]')];
    const intervalLines=[...document.querySelectorAll('line[data-roof-interval]')];
    const facePolys=[...document.querySelectorAll('polygon[data-roof-surface-face]')];
    const roofIds=ownerGroups.map(g=>g.getAttribute('data-roof-owner'));
    return {ownerGroups:ownerGroups.length,roofOwners:roofIds,
     visible:intervalLines.filter(e=>e.getAttribute('data-roof-interval')==='VISIBLE').length,
     hidden:intervalLines.filter(e=>e.getAttribute('data-roof-interval')==='HIDDEN').length,
     unresolved:intervalLines.filter(e=>e.getAttribute('data-roof-interval')==='UNRESOLVED').length,
     faces:facePolys.length,faceOutlineCount:facePolys.filter(e=>e.getAttribute('stroke')!=='none').length,
     statuses:ownerGroups.map(g=>g.getAttribute('data-roof-interval-status')),
     conceptOnly:/NOT FOR CONSTRUCTION/.test(document.body.textContent||'')&&ownerGroups.every(g=>g.getAttribute('data-roof-concept-only')==='true'),
     mobileOverflow:document.documentElement.scrollWidth>innerWidth+4,
     navScrollable:(()=>{const nav=document.querySelector('.nav');return !nav||nav.scrollWidth<=nav.clientWidth||getComputedStyle(nav).overflowX==='auto'})(),
     manifestBound:Boolean(window.Lot2Design4RoofIntervals?.manifest?.owners?.length===4),
     premiumStylesheetLoaded:Boolean(document.querySelector('link[href="css/pondy-premium.css"]')?.sheet),
     svgCount:document.querySelectorAll('svg').length};
   },kind);
   await page.screenshot({path:path.join(output,name+'-'+width+'.png'),fullPage:true});
   const fails=[];
   if(data.ownerGroups!==(kind==='elevation'?16:8))fails.push('not all four owner projectors');
   if(data.faceOutlineCount)fails.push('unverified mesh face outline drawn');
   if(!data.visible||!data.hidden)fails.push('missing analytic edge types');
   if(kind==='axon'&&data.unresolved)fails.push('exact Pondy camera must not claim unresolved');
   if(kind==='elevation'&&(data.unresolved||data.statuses.some(s=>s!=='INTERVAL_VERIFIED')))fails.push('source cardinal model proof missing');
   if(!data.conceptOnly||!data.manifestBound)fails.push('concept-only or source-binding disclosure missing');
   if(!data.premiumStylesheetLoaded)fails.push('Customer presentation stylesheet missing from package');
   if(width===390&&(data.mobileOverflow||!data.navScrollable))fails.push('mobile navigation overflows viewport');
   if(errors.length)fails.push('browser page errors');
   cases.push({name,width,kind,...data,errors,fails});
   await page.close();
  }
 }finally{await browser.close();}
 const report={sha:process.env.GITHUB_SHA||null,sourceAndStandaloneReleaseContractsClosed:true,cases:cases.length,passed:cases.filter(c=>!c.fails.length).length,details:cases};
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 for(const c of cases)console.log(JSON.stringify({name:c.name,width:c.width,owners:c.ownerGroups,visible:c.visible,hidden:c.hidden,unresolved:c.unresolved,failed:c.fails}));
 if(cases.some(c=>c.fails.length))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
