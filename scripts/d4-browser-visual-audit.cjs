'use strict';
// Optional browser-measured QA. Install Puppeteer or point PUPPETEER_MODULE at an approved local installation.
// Example: PUPPETEER_MODULE=/path/to/puppeteer CHROMIUM_PATH=/usr/bin/chromium node scripts/d4-browser-visual-audit.cjs
const path=require('node:path');
const fs=require('node:fs');
const puppeteer=require(process.env.PUPPETEER_MODULE||'puppeteer');
const root=path.resolve(__dirname,'..');
const cases=[
 {name:'site-desktop',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-001 svg',width:1440,height:1000},
 {name:'plans-desktop',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-101 svg',width:1440,height:1000},
 {name:'site-mobile',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-001 svg',width:390,height:900},
 {name:'plans-mobile',file:'prototypes/design4-customer-sheet-review.html',selector:'#A-101 svg',width:390,height:900},
 {name:'site-paper',file:'prototypes/A-001-print-proof.svg',selector:'svg',width:1400,height:1050},
 {name:'plans-paper',file:'prototypes/A-101-print-proof.svg',selector:'svg',width:1400,height:1050}
];
(async()=>{
 const browser=await puppeteer.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const output=process.env.D4_VISUAL_QA_DIR||'/tmp/pondy-d4-visual-qa';
 fs.mkdirSync(output,{recursive:true});
 const results=[];
 for(const test of cases){
  const page=await browser.newPage();
  await page.setViewport({width:test.width,height:test.height,deviceScaleFactor:1});
  await page.goto('file://'+path.resolve(root,test.file),{waitUntil:'load'});
  const scan=await page.evaluate(selector=>{
   const svg=document.querySelector(selector);
   if(!svg)return {error:'Missing SVG'};
   const texts=[...svg.querySelectorAll('text')].map(el=>{
    const box=el.getBoundingClientRect();
    return {text:(el.textContent||'').trim(),dimension:!!el.closest('.dimension-layer'),
      x:box.left,y:box.top,w:box.width,h:box.height};
   }).filter(x=>x.text&&x.w>0&&x.h>0);
   const overlap=(a,b)=>Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>2
      &&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>2;
   const collisions=[];
   for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){
    if((texts[i].dimension||texts[j].dimension)&&overlap(texts[i],texts[j]))
     collisions.push({a:texts[i].text,b:texts[j].text,interlayer:texts[i].dimension!==texts[j].dimension});
   }
   const dimensions=texts.filter(x=>x.dimension).length;
   const rect=svg.getBoundingClientRect();
   return {dimensions,totalText:texts.length,collisions,renderedWidth:rect.width,svgViewBox:svg.getAttribute('viewBox')};
  },test.selector);
  await page.screenshot({path:path.join(output,test.name+'.png'),fullPage:true});
  results.push({case:test.name,...scan});
  await page.close();
 }
 await browser.close();
 const report={timestamp:new Date().toISOString(),cases:results,conceptOnly:true};
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(results.some(x=>x.error||x.collisions?.some(y=>y.interlayer)))process.exitCode=1;
})().catch(err=>{console.error(err);process.exitCode=1});
