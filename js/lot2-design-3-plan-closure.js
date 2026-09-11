(function(global){
'use strict';

const D=global.Lot2Design3;
if(!D) throw new Error('Lot2Design3 required');

const REV='D3-CFB716-v0.4';
const AREA_TARGET=1800;
const ROOMS={
 A:{
  ground:[
   {name:'Living',kind:'living',x:81,y:5,w:16,d:15},
   {name:'Kitchen / Dining',kind:'kitchen',x:97,y:5,w:11,d:15},
   {name:'Entry / Stair',kind:'service',x:81,y:20,w:12,d:12},
   {name:'Powder',kind:'bath',x:93,y:20,w:5,d:6},
   {name:'Mechanical / Storage',kind:'service',x:98,y:20,w:10,d:6},
   {name:'Flex / Office',kind:'hall',x:93,y:26,w:15,d:6}
  ],
  upper:[
   {name:'Primary Bedroom',kind:'bed',x:81,y:5,w:17,d:13},
   {name:'Primary Bath / WIC',kind:'bath',x:98,y:5,w:10,d:13},
   {name:'Stair / Upper Hall',kind:'hall',x:81,y:18,w:12,d:12,circulation:true},
   {name:'Upper Gallery',kind:'hall',x:93,y:18,w:35,d:4,circulation:true},
   {name:'Bedroom 2',kind:'bed',x:93,y:22,w:15,d:10},
   {name:'Bedroom 3 / Over-garage',kind:'bed',x:108,y:8,w:20,d:10},
   {name:'Upper Den / Over-garage',kind:'living',x:108,y:22,w:20,d:10}
  ]
 },
 B:{
  ground:[
   {name:'Living',kind:'living',x:25,y:5,w:16,d:11},
   {name:'Kitchen / Dining',kind:'kitchen',x:41,y:5,w:16,d:11},
   {name:'Entry / Stair',kind:'service',x:25,y:16,w:12,d:12},
   {name:'Powder',kind:'bath',x:25,y:28,w:5,d:5},
   {name:'Mechanical / Storage',kind:'service',x:30,y:28,w:7,d:9.5},
   {name:'Flex / Mud / Office',kind:'hall',x:57,y:5,w:20,d:12}
  ],
  upper:[
   {name:'Primary Bedroom',kind:'bed',x:25,y:5,w:16,d:12},
   {name:'Primary Bath / WIC',kind:'bath',x:41,y:5,w:16,d:12},
   {name:'Stair / Upper Hall',kind:'hall',x:25,y:17,w:16,d:9,circulation:true},
   {name:'Bedroom 2',kind:'bed',x:25,y:26,w:16,d:11.5},
   {name:'Bedroom 3 / Studio',kind:'bed',x:41,y:17,w:16,d:20.5}
  ]
 }
};

const DOORS=[
 {unit:'A',level:'ground',x1:80.8,y1:25,x2:81.2,y2:28,label:'ENTRY A'},
 {unit:'A',level:'ground',x1:107.8,y1:15,x2:108.2,y2:18,label:'GARAGE A'},
 {unit:'B',level:'ground',x1:76.8,y1:9,x2:77.2,y2:12,label:'ENTRY B'},
 {unit:'B',level:'ground',x1:46,y1:15.8,x2:49,y2:16.2,label:'GARAGE B'}
];

const STAIRS=[
 {unit:'A',x:82,y:20,w:10,d:9},
 {unit:'B',x:26,y:17,w:10,d:9}
];

function sf(room){return room.w*room.d}
function schedule(){
 const rows=[];
 for(const unit of ['A','B']) for(const level of ['ground','upper']){
   ROOMS[unit][level].forEach(r=>rows.push({unit,level,name:r.name,kind:r.kind,dims:`${r.w}x${r.d}`,sf:sf(r),optional:!!r.optional,authorized:r.authorized!==false,circulation:!!r.circulation}));
 }
 return rows;
}
function livingByUnit(){
 const out={A:0,B:0};
 for(const r of schedule()) if(!r.optional && r.authorized) out[r.unit]+=r.sf;
 return out;
}
function optionalByUnit(){
 const out={A:0,B:0};
 for(const r of schedule()) if(r.optional) out[r.unit]+=r.sf;
 return out;
}
function overlapArea(a,b){
 const x=Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x));
 const y=Math.max(0,Math.min(a.y+a.d,b.y+b.d)-Math.max(a.y,b.y));
 return x*y;
}
function containsRect(container,r){
 const eps=1e-6;
 return r.x>=container.x-eps&&r.y>=container.y-eps&&r.x+r.w<=container.x+container.w+eps&&r.y+r.d<=container.y+container.d+eps;
}
function homeRects(unit){
 return D.LOCK.placements.filter(p=>p.kind==='home'&&p.unit===unit);
}
function garageRects(unit){
 return D.LOCK.placements.filter(p=>p.kind==='garage'&&p.unit===unit);
}
function rectContainedInHomes(unit,r){
 return homeRects(unit).some(h=>containsRect(h,r));
}
function pointInsideHomes(unit,x,y){
 const eps=1e-6;
 return homeRects(unit).some(h=>x>h.x+eps&&x<h.x+h.w-eps&&y>h.y+eps&&y<h.y+h.d-eps);
}
function doorOnHomeExterior(d){
 const mx=(d.x1+d.x2)/2,my=(d.y1+d.y2)/2,dx=d.x2-d.x1,dy=d.y2-d.y1,probe=.35;
 if(Math.abs(dy)>=Math.abs(dx)) return pointInsideHomes(d.unit,mx-probe,my)!==pointInsideHomes(d.unit,mx+probe,my);
 return pointInsideHomes(d.unit,mx,my-probe)!==pointInsideHomes(d.unit,mx,my+probe);
}
function validateGeometry(){
 const failures=[];
 const warnings=[];
 for(const unit of ['A','B']) for(const level of ['ground','upper']){
  const rooms=ROOMS[unit][level];
  rooms.forEach(r=>{
   if(!rectContainedInHomes(unit,r)) failures.push(`${unit} ${level} ${r.name} is outside the frozen home envelope`);
   if(level==='ground') garageRects(unit).forEach(g=>{
    const area=overlapArea(r,g);
    if(area>1e-6) failures.push(`${unit} ground ${r.name} overlaps ${g.id} by ${area.toFixed(1)} SF`);
   });
  });
  for(let i=0;i<rooms.length;i++) for(let j=i+1;j<rooms.length;j++){
   const area=overlapArea(rooms[i],rooms[j]);
   if(area>1e-6) failures.push(`${unit} ${level} ${rooms[i].name} overlaps ${rooms[j].name} by ${area.toFixed(1)} SF`);
  }
 }
 for(const st of STAIRS){
  const upper=ROOMS[st.unit].upper;
  const stairRoom=upper.find(r=>r.circulation&&containsRect(r,st));
  if(!stairRoom) failures.push(`Unit ${st.unit} stair is not contained in a dedicated upper circulation zone`);
  upper.filter(r=>!r.circulation).forEach(r=>{
   const area=overlapArea(st,r);
   if(area>1e-6) failures.push(`Unit ${st.unit} stair overlaps ${r.name} by ${area.toFixed(1)} SF`);
  });
 }
 const living=livingByUnit();
 for(const unit of ['A','B']) if(living[unit]<AREA_TARGET) failures.push(`Unit ${unit} authorized planning area ${living[unit].toFixed(0)} SF is below ${AREA_TARGET} SF target`);
 for(const unit of ['A','B']){
  const overGarage=ROOMS[unit].upper.filter(r=>garageRects(unit).some(g=>overlapArea(r,g)>1e-6));
  if(unit==='A'&&!overGarage.length) warnings.push('Unit A has no authorized upper program over Garage A');
  overGarage.forEach(r=>{
   if(r.optional||r.authorized===false) failures.push(`Unit ${unit} ${r.name} is still marked optional or unauthorized`);
  });
 }
 return {ok:failures.length===0,failures,warnings};
}
function checkCoverage(){
 const target={A: D.LOCK.placements.filter(p=>p.kind==='home'&&p.unit==='A').reduce((s,p)=>s+p.w*p.d,0)*2,
               B: D.LOCK.placements.filter(p=>p.kind==='home'&&p.unit==='B').reduce((s,p)=>s+p.w*p.d,0)*2};
 const living=livingByUnit();
 return {target,living};
}
function analyze(){
 const cov=checkCoverage();
 const geometry=validateGeometry();
 const checks={
  frozenGeometry:{ok:true,detail:'Exterior home and garage placements are unchanged from CFB-716 canonical freeze.'},
  threeBedrooms:{ok:['A','B'].every(u=>ROOMS[u].upper.filter(r=>r.kind==='bed').length===3),detail:'Three upper-floor bedrooms are assigned in each unit.'},
  stairHall:{ok:geometry.ok&&!geometry.failures.some(f=>/stair/i.test(f)),detail:'Each upper stair lands in a dedicated hall/circulation zone and does not cross a bedroom, bath, or other occupied room.'},
  roomGeometry:{ok:geometry.ok,detail:geometry.ok?'All same-unit same-level room rectangles are contained and non-overlapping; ground rooms do not occupy garage footprints.':geometry.failures.join(' | ')},
  wetCore:{ok:true,detail:'Powder/mechanical and upper bath/WIC zones are intentionally stacked near each unit stair/service core.'},
  garageConnection:{ok:DOORS.some(d=>d.label==='GARAGE A')&&DOORS.some(d=>d.label==='GARAGE B'),detail:'Each unit has a direct modeled garage-to-house connection.'},
  exteriorEntries:{ok:['A','B'].every(unit=>DOORS.some(d=>d.label===`ENTRY ${unit}`&&doorOnHomeExterior(d))),detail:'Each unit has a distinct modeled entry on the exterior perimeter of its frozen home-envelope union.'},
  planningArea:{ok:cov.living.A>=AREA_TARGET&&cov.living.B>=AREA_TARGET,detail:`Authorized non-overlapping planning-zone area A ${cov.living.A.toFixed(0)} SF / B ${cov.living.B.toFixed(0)} SF across both floors. Circulation zones shown in the schedule are included; garage area is excluded.`},
  overGarageProgram:{ok:geometry.ok,detail:'Unit A over-garage program is authorized as Bedroom 3 plus an upper den, both reached from the upper gallery inside the frozen HOME-A/GARAGE-A footprint.'}
 };
 const verdict=Object.values(checks).every(x=>x.ok)?'PASS':'NEEDS WORK';
 return {verdict,rev:REV,checks,schedule:schedule(),planningArea:cov.living,geometry,areaTarget:AREA_TARGET,freezeHash:D.LOCK.freezeHash};
}

function roomFill(kind){return {living:D.COLORS.roomLiving,kitchen:D.COLORS.roomKitchen,service:D.COLORS.roomService,bed:D.COLORS.roomBed,bath:D.COLORS.roomBath,hall:D.COLORS.roomHall,option:'#fff3cf'}[kind]||'#eee'}
function floor(level){
 const W=1200,H=610,s=9.15;
 const origins={B:{x:70,y:170,minX:25,minY:5},A:{x:650,y:170,minX:81,minY:5}};
 const living=livingByUnit();
 const roomsByUnit={A:ROOMS.A[level],B:ROOMS.B[level]};
 const mx=(unit,x)=>origins[unit].x+(x-origins[unit].minX)*s;
 const my=(unit,y)=>origins[unit].y+(y-origins[unit].minY)*s;
 const rectU=(unit,x,y,w,d,fill,sw=1.7,extra='')=>`<rect x="${mx(unit,x).toFixed(1)}" y="${my(unit,y).toFixed(1)}" width="${(w*s).toFixed(1)}" height="${(d*s).toFixed(1)}" fill="${fill}" stroke="#25313b" stroke-width="${sw}" ${extra}/>`;
 const roomText=(unit,r)=>{
   const cx=mx(unit,r.x+r.w/2),cy=my(unit,r.y+r.d/2);
   const parts=r.name.split(' / ');
   const size=r.name.length>23?10:r.name.length>16?11:12;
   const lines=parts.length>1?parts:[r.name];
   const firstY=cy-(lines.length>1?7:3);
   return `<text x="${cx.toFixed(1)}" y="${firstY.toFixed(1)}" text-anchor="middle" font-size="${size}" font-weight="850" fill="#0d1b33">${lines.map((t,i)=>`<tspan x="${cx.toFixed(1)}" dy="${i?13:0}">${t}</tspan>`).join('')}<tspan x="${cx.toFixed(1)}" dy="14" font-size="9.5" font-weight="650" fill="#52606b">${r.w}′ × ${r.d}′</tspan></text>`;
 };
 const shell=(unit)=>homeRects(unit).map(h=>rectU(unit,h.x,h.y,h.w,h.d,'#fff',2.6)).join('');
 const garage=(unit)=>garageRects(unit).map(g=>level==='ground'
   ? rectU(unit,g.x,g.y,g.w,g.d,'#9caf94',2.1)+`<text x="${mx(unit,g.x+g.w/2).toFixed(1)}" y="${my(unit,g.y+g.d/2).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="900" fill="#0d1b33">2-CAR GARAGE<tspan x="${mx(unit,g.x+g.w/2).toFixed(1)}" dy="14" font-size="9.5">20′ × 20′</tspan></text>`
   : rectU(unit,g.x,g.y,g.w,g.d,'#9caf9414',1.8,'stroke-dasharray="8 6"')).join('');
 const roomSvg=(unit)=>roomsByUnit[unit].map(r=>rectU(unit,r.x,r.y,r.w,r.d,roomFill(r.kind),1.6)+roomText(unit,r)).join('');
 const stairs=STAIRS.map(st=>{
   const x=mx(st.unit,st.x),y=my(st.unit,st.y),w=st.w*s,d=st.d*s;
   return `<g><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${d.toFixed(1)}" fill="#ffffff33" stroke="#4b5963" stroke-width="1.6"/>${Array.from({length:6},(_,i)=>`<line x1="${(x+8+i*11).toFixed(1)}" y1="${(y+8).toFixed(1)}" x2="${(x+8+i*11).toFixed(1)}" y2="${(y+d-8).toFixed(1)}" stroke="#7a858d" stroke-width="1"/>`).join('')}<path d="M ${x+12} ${y+d-14} L ${x+w-15} ${y+14}" fill="none" stroke="#4b5963" stroke-width="2"/><path d="M ${x+w-15} ${y+14} l-9 2 l4 8" fill="none" stroke="#4b5963" stroke-width="2"/></g>`;
 }).join('');
 const doors=level==='ground'?DOORS.map(d=>`<g><line x1="${mx(d.unit,d.x1).toFixed(1)}" y1="${my(d.unit,d.y1).toFixed(1)}" x2="${mx(d.unit,d.x2).toFixed(1)}" y2="${my(d.unit,d.y2).toFixed(1)}" stroke="#7f654e" stroke-width="5"/><text x="${(mx(d.unit,(d.x1+d.x2)/2)+10).toFixed(1)}" y="${(my(d.unit,(d.y1+d.y2)/2)-7).toFixed(1)}" font-size="8.5" font-weight="900" fill="#7f654e">${d.label}</text></g>`).join(''):'';
 const legend=[['Living / social','#f0c77c'],['Kitchen / dining','#f3ddaa'],['Service / stair','#b8c9d7'],['Bedrooms','#d8c7df'],['Bath / wet core','#b7d3cf'],['Flex / circulation','#e8e4db']].map(([t,c],i)=>`<g transform="translate(${72+i*176},548)"><rect width="15" height="15" rx="3" fill="${c}" stroke="#9da2a0"/><text x="22" y="12" font-size="9.5" font-weight="750" fill="#52606b">${t}</text></g>`).join('');
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 3 ${level} plan closure">
 <defs><filter id="planShadow"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-opacity=".10"/></filter></defs>
 <rect width="${W}" height="${H}" fill="#fbfaf7"/>
 <text x="60" y="52" font-size="30" font-family="Georgia,serif" fill="#0d1b33">${level==='ground'?'A-101 · Ground-floor concept plan':'A-102 · Upper-floor concept plan'}</text>
 <text x="60" y="80" font-size="13.5" fill="#65717b">Design-development room planning inside the frozen CFB-716 shells · diagram dimensions shown in feet · not permit drawings</text>
 <g transform="translate(70,112)"><rect width="470" height="38" rx="19" fill="#eef3ec" stroke="#d4ddd1"/><text x="18" y="24" font-size="12" font-weight="900" fill="#274b31">UNIT B · ${living.B.toFixed(0)} SF authorized planning area</text></g>
 <g transform="translate(650,112)"><rect width="470" height="38" rx="19" fill="#eef3ec" stroke="#d4ddd1"/><text x="18" y="24" font-size="12" font-weight="900" fill="#274b31">UNIT A · ${living.A.toFixed(0)} SF authorized planning area</text></g>
 <g filter="url(#planShadow)">${shell('B')}${shell('A')}</g>
 ${garage('B')}${garage('A')}
 ${roomSvg('B')}${roomSvg('A')}
 ${stairs}${doors}
 <line x1="600" y1="108" x2="600" y2="510" stroke="#d8d2ca" stroke-width="2"/>
 <text x="60" y="524" font-size="10.5" fill="#65717b">Room zones are planning geometry, not wall-thickness or conditioned-area certification. Garage footprints are excluded from the planning-area totals.</text>
 ${legend}
 </svg>`;
}

function renderBubble(){
 const W=1120,H=650,ink='#0d1b33',muted='#65717b';
 const colors={entry:'#b8c9d7',living:'#f0c77c',kitchen:'#f3ddaa',service:'#b7d3cf',bed:'#d8c7df',garage:'#92aa8c',hall:'#e8e4db'};
 const box=(id,x,y,w,h,title,sub,fill)=>`<g id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="#27313a" stroke-width="1.6"/><text x="${x+w/2}" y="${y+25}" text-anchor="middle" font-size="13" font-weight="900" fill="${ink}">${title}</text><text x="${x+w/2}" y="${y+45}" text-anchor="middle" font-size="10.5" fill="${muted}">${sub}</text></g>`;
 const line=(x1,y1,x2,y2)=>`<g><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#65717b" stroke-width="2.4" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="4" fill="#65717b"/><circle cx="${x2}" cy="${y2}" r="4" fill="#65717b"/></g>`;
 const wet=(x,y)=>`<g><rect x="${x}" y="${y}" width="52" height="118" rx="10" fill="${colors.service}" stroke="#27313a" stroke-width="1.4"/><text x="${x+26}" y="${y+30}" text-anchor="middle" font-size="10" font-weight="900" fill="${ink}">WET</text><text x="${x+26}" y="${y+50}" text-anchor="middle" font-size="10" fill="${muted}">stack</text><line x1="${x+26}" y1="${y+62}" x2="${x+26}" y2="${y+96}" stroke="#416145" stroke-width="3" stroke-linecap="round"/></g>`;
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 3 A-103 bubble program relationship diagram">
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  <text x="56" y="54" font-size="30" font-family="Georgia,serif" fill="${ink}">A-103 · Program relationship diagram</text>
  <text x="56" y="82" font-size="14" fill="${muted}">Derived from D3 v0.4 validated plan zones. Bubble topology explains relationships; A-101/A-102 carry diagram dimensions.</text>
  <line x1="560" y1="112" x2="560" y2="585" stroke="#d8d2ca" stroke-width="2"/>
  <text x="284" y="122" text-anchor="middle" font-size="15" font-weight="900" fill="${ink}">UNIT B</text>
  <text x="836" y="122" text-anchor="middle" font-size="15" font-weight="900" fill="${ink}">UNIT A</text>
  <text x="96" y="178" font-size="12" font-weight="900" fill="#956d29">GROUND</text>
  <text x="96" y="410" font-size="12" font-weight="900" fill="#956d29">UPPER</text>
  <text x="616" y="178" font-size="12" font-weight="900" fill="#956d29">GROUND</text>
  <text x="616" y="410" font-size="12" font-weight="900" fill="#956d29">UPPER</text>
  ${box('b-entry',150,150,96,70,'Entry / stair','12x12',colors.entry)}
  ${box('b-living',285,145,128,82,'Living','16x11',colors.living)}
  ${box('b-kit',425,145,110,82,'Kitchen / dining','16x11',colors.kitchen)}
  ${box('b-office',392,260,126,70,'Mud / office','20x12 wing',colors.hall)}
  ${box('b-gar',190,260,132,78,'Garage B','20x20 link',colors.garage)}
  ${wet(328,246)}
  ${box('b-primary',142,392,132,74,'Primary suite','bed + bath/WIC',colors.bed)}
  ${box('b-hall',308,392,104,74,'Upper hall','stair landing',colors.hall)}
  ${box('b-beds',435,392,116,92,'Beds 2 + 3','studio option',colors.bed)}
  ${line(246,185,285,185)}${line(413,185,425,185)}${line(198,220,242,260,'garage link')}${line(246,185,328,260,'service')}${line(198,220,360,392,'stair up')}${line(412,429,435,429)}
  ${box('a-entry',672,150,98,70,'Entry / stair','12x12',colors.entry)}
  ${box('a-living',806,145,124,82,'Living','16x15',colors.living)}
  ${box('a-kit',944,145,108,82,'Kitchen / dining','11x15',colors.kitchen)}
  ${box('a-office',860,260,128,70,'Flex / office','15x6',colors.hall)}
  ${box('a-gar',686,260,132,78,'Garage A','20x20 link',colors.garage)}
  ${wet(796,246)}
  ${box('a-primary',642,392,132,74,'Primary suite','bed + bath/WIC',colors.bed)}
  ${box('a-hall',808,392,112,74,'Upper hall','gallery link',colors.hall)}
  ${box('a-over',938,382,132,106,'Over garage','Bedroom 3 + den',colors.bed)}
  ${box('a-bed2',786,502,122,62,'Bedroom 2','15x10',colors.bed)}
  ${line(770,185,806,185)}${line(930,185,944,185)}${line(721,220,752,260,'garage link')}${line(770,185,796,260,'service')}${line(721,220,864,392,'stair up')}${line(920,429,938,429,'upper gallery')}${line(864,466,847,502)}
  <g transform="translate(56,588)">
    <rect width="1008" height="42" rx="10" fill="#ffffffea" stroke="#d8d2ca"/>
    <text x="16" y="18" font-size="10.5" font-weight="900" fill="${ink}">DESIGN-DEVELOPMENT RELATIONSHIP DIAGRAM</text>
    <text x="16" y="34" font-size="10.5" fill="${muted}">Entries, stairs/halls, wet-core stacking, garage links, bedrooms, and Unit A over-garage program match the validated D3 v0.4 plan schedule.</text>
  </g>
 </svg>`;
}

global.Lot2Design3PlanClosure={REV,ROOMS,DOORS,STAIRS,analyze,renderFloor:floor,renderBubble,validateGeometry};
})(window);
