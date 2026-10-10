'use strict';
const fs=require('node:fs');
const path=require('node:path');
const D=require('../js/lot2-sheet-dimensions');
const A=require('../js/lot2-design-4-dimension-prototype');
const SITE=require('../js/lot2-design-4');
const PLAN=require('../js/lot2-design-4-plan-closure');
const configs=[
 {id:'A-001',title:'Site plan with geometry-derived dimensions',svg:SITE.renderSite(),viewport:{ox:88,oy:168,pxPerFt:6.2},status:'CONDITIONAL · zoning and inter-garage review remain open'},
 {id:'A-101',title:'Ground floor with geometry-derived dimensions',svg:PLAN.renderLevel('ground'),viewport:{ox:-428,oy:72.5,pxPerFt:9.5},status:'PLAN PASS · room zones only; no construction dimensions certified'}
];
function addOverlay(svg,overlay){if(!svg.endsWith('</svg>'))throw Error('Unexpected SVG ending');return svg.slice(0,-6)+overlay+'</svg>';}
const sheets=configs.map(c=>{
 const specs=A.specifications(c.id);
 const v=c.viewport;
 const placed=D.layout(specs,v);
 if(placed.some(d=>d.box.x<0||d.box.y<0||d.box.x+d.box.w>1200||d.box.y+d.box.h>(c.id==='A-001'?735:720)))throw Error(c.id+' dimension label is outside sheet');
 return '<section class="sheet" id="'+c.id+'"><div class="sheetbar"><strong>'+c.id+' · '+c.title+'</strong><span>'+c.status+'</span></div>'+addOverlay(c.svg,D.renderSvg(specs,v))+'<p class="disclaimer">Concept/design-development study only. Dimension source geometry is unchanged. Verify all zoning, survey, professional engineering and AHJ conditions before construction.</p></section>';
});
const html='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Design 4 · Architectural dimensions · Review candidate</title><style>body{margin:0;font:15px system-ui;color:#23354b;background:#edf0f4}.wrap{max-width:1320px;padding:24px;margin:auto}.sheet{background:#fff;padding:18px;margin:24px 0;border:1px solid #c9d1d9;overflow:auto}.sheet svg{display:block;width:100%;height:auto;min-width:980px}.sheetbar{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:10px 0 16px;font-size:14px}.sheetbar span,.disclaimer{font-size:12px;color:#775129}.notice{color:#935922;font-weight:650}</style><main class="wrap"><h1>Design 4 · Dimensioned architectural sheet review</h1><p class="notice">REVIEW ONLY — not linked into public reports, not for construction, not approved for release.</p>'+sheets.join('')+'</main></html>';
const out=path.join(__dirname,'../prototypes/design4-customer-sheet-review.html');fs.writeFileSync(out,html);
console.log(JSON.stringify({out,sheets:configs.map(c=>c.id),dimensionCounts:configs.map(c=>A.specifications(c.id).length),source:'existing customer sheet renderers',publicReportModified:false}));
