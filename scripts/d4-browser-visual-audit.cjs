'use strict';
/**
 * Design 4 architectural *concept review* acceptance: actual Chromium SVG
 * geometry, room/street annotations, print-frame containment and mobile pan.
 * Never claims calibrated physical print output or architectural approval.
 *
 * PUPPETEER_MODULE=/path/to/puppeteer-core CHROMIUM_PATH=/path/to/chrome \
 *   node scripts/d4-browser-visual-audit.cjs
 */
const fs=require('node:fs');
const path=require('node:path');
const puppeteer=require(process.env.PUPPETEER_MODULE||'puppeteer-core');
const root=path.resolve(__dirname,'..');
const tests=[
 {name:'site-desktop',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-001 svg',kind:'site',width:1440,height:1000},
 {name:'plans-desktop',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-101 svg',kind:'plans',width:1440,height:1000},
 {name:'site-mobile',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-001 svg',kind:'site',width:390,height:900,mobile:true},
 {name:'plans-mobile',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-101 svg',kind:'plans',width:390,height:900,mobile:true},
 {name:'site-paper',file:'prototypes/A-001-print-proof.svg',selector:'svg',kind:'site',width:1400,height:1050,print:true},
 {name:'plans-paper',file:'prototypes/A-101-print-proof.svg',selector:'svg',kind:'plans',width:1400,height:1050,print:true}
];
/** Runs inside Chromium; text orientation respected by using each text's inverse CTM. */
function inspectSvg(selector,expectation){
 const svg=document.querySelector(selector);
 if(!svg)return {error:'Missing SVG'};
 const failures=[];
 const labels=[...svg.querySelectorAll('text')].map(el=>{
  const r=el.getBoundingClientRect();
  return {el,text:(el.textContent||'').trim(),dimension:!!el.closest('.dimension-layer'),box:{x:r.left,y:r.top,w:r.width,h:r.height}};
 }).filter(x=>x.text&&x.box.w>0&&x.box.h>0);
 const overlaps=(a,b,pad=2)=>Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>pad &&
   Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>pad;
 const textCrossings=[];
 for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){
  const a=labels[i],b=labels[j];
  if((a.dimension||b.dimension)&&overlaps(a.box,b.box)){
   textCrossings.push({a:a.text,b:b.text,interlayer:a.dimension!==b.dimension});
  }
 }
 // Segment clipping in text's own SVG coordinate space (works for 90-degree
 // Pennsylvania Street text and transformed SVG descendants).
 function touchesText(line,text){
  const lineMatrix=line.getScreenCTM(),textMatrix=text.getScreenCTM();
  if(!lineMatrix||!textMatrix)return false;
  const inv=textMatrix.inverse(),a=new DOMPoint(+line.getAttribute('x1'),+line.getAttribute('y1'));
  const b=new DOMPoint(+line.getAttribute('x2'),+line.getAttribute('y2'));
  const first=a.matrixTransform(lineMatrix).matrixTransform(inv);
  const last=b.matrixTransform(lineMatrix).matrixTransform(inv);
  const bb=text.getBBox(),extra=0.75;
  const x0=bb.x-extra,y0=bb.y-extra,x1=bb.x+bb.width+extra,y1=bb.y+bb.height+extra;
  const dx=last.x-first.x,dy=last.y-first.y;
  let lo=0,hi=1;
  for(const [p,q] of [[-dx,first.x-x0],[dx,x1-first.x],[-dy,first.y-y0],[dy,y1-first.y]]){
   if(Math.abs(p)<1e-8){if(q<0)return false;}
   else{const v=q/p;if(p<0)lo=Math.max(lo,v);else hi=Math.min(hi,v);}
  }
  return lo<=hi;
 }
 const lineTextCrossings=[];
 for(const line of svg.querySelectorAll('.dimension-layer line')){
  const from=line.closest('[data-dimension-id]')?.getAttribute('data-dimension-id')||'unknown';
  for(const label of labels.filter(x=>!x.dimension)){
   if(touchesText(line,label.el)){
    lineTextCrossings.push({dimension:from,lineClass:line.getAttribute('class')||'',text:label.text});
   }
  }
 }
 const dimensions=svg.querySelectorAll('[data-dimension-id]').length;
 const required=expectation.kind==='site'?9:6;
 if(dimensions!==required)failures.push('Dimension count mismatch: '+dimensions+' expected '+required);
 if(textCrossings.length)failures.push('Dimension/text overlaps: '+textCrossings.length);
 if(lineTextCrossings.length)failures.push('Dimension witness/tick/line crosses scene text: '+lineTextCrossings.length);
 const documentText=(document.body||document.documentElement).textContent||'';
 if(!/NOT FOR CONSTRUCTION/i.test(documentText))failures.push('Missing NOT FOR CONSTRUCTION disclosure');
 if(!/CONCEPT/i.test(documentText))failures.push('Missing CONCEPT disclosure');
 let frame=null;
 if(expectation.print){
  const width=svg.getAttribute('width'),height=svg.getAttribute('height'),viewBox=svg.getAttribute('viewBox');
  if(width!=='36in'||height!=='24in'||viewBox!=='0 0 3456 2304')failures.push('Wrong 36x24 print units or 96ppi viewBox');
  const sheetBorder=[...svg.querySelectorAll('rect')].find(r=>
    r.getAttribute('x')==='192'&&r.getAttribute('y')==='192'&&r.getAttribute('width')==='3072'&&r.getAttribute('height')==='1920');
  if(!sheetBorder)failures.push('Missing 2-inch proof frame');
  frame={x:192,y:192,x2:3264,y2:2112};
  // Check all dimension-layer glyphs and stroke endpoints in root SVG units.
  for(const el of svg.querySelectorAll('.dimension-layer text,.dimension-layer line')){
   const bb=el.getBBox(),matrix=el.getCTM();
   if(!matrix){failures.push('Missing dimension geometry transform');continue;}
   for(const [x,y] of [[bb.x,bb.y],[bb.x+bb.width,bb.y],[bb.x,bb.y+bb.height],[bb.x+bb.width,bb.y+bb.height]]){
    const p=new DOMPoint(x,y).matrixTransform(matrix);
    if(p.x<frame.x-0.5||p.x>frame.x2+0.5||p.y<frame.y-0.5||p.y>frame.y2+0.5){
     failures.push('Dimension glyph/stroke exceeds print frame');
     break;
    }
   }
  }
  const title=svg.textContent||'';
  if(!title.includes(expectation.kind==='site'?'A-001':'A-101'))failures.push('Print sheet ID absent');
 }else if(expectation.mobile){
  const scroll=svg.closest('.sheet');
  if(!scroll||scroll.scrollWidth<=scroll.clientWidth+20)failures.push('Mobile sheet must pan, not shrink to unreadable width');
 }
 return {dimensions,totalText:labels.length,textCrossings,lineTextCrossings,frame,failures,
  renderedWidth:svg.getBoundingClientRect().width,svgViewBox:svg.getAttribute('viewBox')};
}
(async()=>{
 const out=process.env.D4_VISUAL_QA_DIR||'/tmp/pondy-d4-visual-qa';
 fs.mkdirSync(out,{recursive:true});
 const browser=await puppeteer.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,
  args:['--no-sandbox','--disable-dev-shm-usage']});
 const cases=[];
 try{
  for(const t of tests){
   const page=await browser.newPage();
   await page.setViewport({width:t.width,height:t.height,deviceScaleFactor:1});
   await page.goto('file://'+path.resolve(root,t.file),{waitUntil:'load'});
   const scan=await page.evaluate(inspectSvg,t.selector,t);
   await page.screenshot({path:path.join(out,t.name+'.png'),fullPage:true});
   cases.push({case:t.name,...scan});
   await page.close();
  }
  // Negative regression: a deliberately crossed witness must be detected.
  const fixture=await browser.newPage();
  await fixture.setContent('<!doctype html><body>CONCEPT ONLY NOT FOR CONSTRUCTION<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200"><text x="80" y="80">ROOM LABEL</text><g class="dimension-layer"><g data-dimension-id="fixture"><line class="witness" x1="90" y1="70" x2="90" y2="110"/><text x="200" y="120">10′</text></g></g></svg>');
  const injected=await fixture.evaluate(inspectSvg,'svg',{kind:'plans'});
  await fixture.close();
  if(!injected.lineTextCrossings?.length)throw Error('Synthetic line/text collision was not detected');
 }finally{await browser.close();}
 const result={timestamp:new Date().toISOString(),head:process.env.GITHUB_SHA||null,conceptOnly:true,
  summary:{cases:cases.length,passed:cases.filter(c=>!c.failures?.length&&!c.error).length,
   dimensionTextCrossings:cases.reduce((sum,c)=>sum+(c.textCrossings?.length||0),0),
   dimensionLineTextCrossings:cases.reduce((sum,c)=>sum+(c.lineTextCrossings?.length||0),0)},
  cases};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result.summary));
 for(const c of cases)console.log(c.case,JSON.stringify({failures:c.failures,lineTextCrossings:c.lineTextCrossings?.slice(0,12)}));
 if(cases.some(x=>x.error||x.failures?.length))process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
