'use strict';
const fs=require('fs');
const path=require('path');
const D=require('../js/lot2-sheet-dimensions.js');
const AD=require('../js/lot2-design-4-dimension-prototype.js');
const SOT=require('../js/lot2-sot.js');
const D4=require('../js/lot2-design-4.js');
const PLAN=require('../js/lot2-design-4-plan-closure.js');
const root=path.resolve(__dirname,'..');
const viewport={ox:165,oy:155,pxPerFt:5.1};
const points=poly=>poly.map(([x,y])=>(viewport.ox+x*viewport.pxPerFt).toFixed(2)+','+(viewport.oy+y*viewport.pxPerFt).toFixed(2)).join(' ');
function shape(value,cls,label){
 const poly=D.polygon(value),b=D.bounds(poly);
 const cx=viewport.ox+(b.minX+b.maxX)/2*viewport.pxPerFt,cy=viewport.oy+(b.minY+b.maxY)/2*viewport.pxPerFt;
 return '<polygon points="'+points(poly)+'" class="'+cls+'"/>'+(label?'<text x="'+cx+'" y="'+cy+'" class="shape-label" text-anchor="middle">'+label+'</text>':'');
}
function sheet(id){
 let shapes=shape(SOT.SURVEY,'parcel');
 if(id==='A-001'){
  shapes+=D4.PAVEMENT.map(item=>shape(item.poly,'pavement')).join('');
  shapes+=D4.HOMES.map(item=>shape(item,'home',item.id)).join('');
  shapes+=D4.GARAGES.map(item=>shape(item,'garage',item.id)).join('');
 }else{
  for(const unit of ['B','A']){
   shapes+=shape(PLAN.SHELLS[unit].poly,'home','');
   shapes+=PLAN.ROOMS.ground[unit].map(item=>shape({x:item.x,y:item.y,w:item.w,d:item.d},'room',item.name.replace(' / ',' / '))).join('');
  }
 }
 return '<svg class="drawing" viewBox="0 0 1180 660" xmlns="http://www.w3.org/2000/svg" aria-label="'+id+' dimension prototype">'+
 '<style>.parcel{fill:#f2eee4;stroke:#303f51;stroke-width:2}.pavement{fill:#bac3c5;stroke:#78858a}.home{fill:#e9ca91;stroke:#695638;stroke-width:1.5}.garage{fill:#a4bdae;stroke:#526e60;stroke-width:1.5}.room{fill:#e9d29d;stroke:#73624a;stroke-width:1}.shape-label{font:10px system-ui;fill:#273442;font-weight:700}</style>'+
 shapes+D.renderSvg(AD.specifications(id),viewport)+'</svg>';
}
const sections=[
 {id:'A-001',title:'SITE PLAN',detail:'Parcel overall X/Y extents, home widths and garage dimensions. The Y extent is NOT the Pennsylvania frontage.'},
 {id:'A-101',title:'GROUND PLAN',detail:'House shell extents derived from the plan-closure module. Room zone labels are conceptual.'}
];
const html='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Design 4 dimension prototype</title>'+
 '<style>body{margin:0;background:#e9ecf0;color:#25354a;font:15px system-ui}.wrap{max-width:1250px;margin:auto;padding:22px}.sheet{margin:25px 0;background:white;border:1px solid #cdd4dc;padding:24px;box-shadow:0 8px 28px #28374718}.heading{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;border-bottom:2px solid #25354a;padding-bottom:12px}.drawing{width:100%;height:auto}.foot{border-top:1px solid #bcc6cf;padding-top:12px;font-size:12px;color:#55616d}.notice{font-size:13px;color:#7a4d19}</style>'+
 '<main class="wrap"><h1>Pondy Flats · Design 4 dimension study</h1><p class="notice">Prototype only · geometry-derived dimensions · fit-to-page / NOT a fixed architectural scale · zoning and AHJ validation pending.</p>'+
 sections.map(row=>'<section class="sheet"><div class="heading"><strong>'+row.id+' · '+row.title+'</strong><span>MODEL UNITS: FEET · SCALE: FIT</span></div>'+sheet(row.id)+'<div class="foot">'+row.detail+' Source geometry remains unchanged. Witness lines and ticks are separate sheet annotations.</div></section>').join('')+
 '</main></html>';
fs.mkdirSync(path.join(root,'prototypes'),{recursive:true});
fs.writeFileSync(path.join(root,'prototypes','design4-dimensions.html'),html);
console.log('WROTE prototypes/design4-dimensions.html');
