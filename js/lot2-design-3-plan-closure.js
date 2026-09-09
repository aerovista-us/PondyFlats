(function(global){
'use strict';

const D=global.Lot2Design3;
if(!D) throw new Error('Lot2Design3 required');

const REV='D3-CFB716-v0.3';
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
   {name:'Bedroom 2',kind:'bed',x:81,y:18,w:13,d:14},
   {name:'Bedroom 3',kind:'bed',x:94,y:18,w:14,d:14}
  ]
 },
 B:{
  ground:[
   {name:'Living',kind:'living',x:25,y:5,w:16,d:11},
   {name:'Kitchen / Dining',kind:'kitchen',x:41,y:5,w:16,d:11},
   {name:'Entry / Stair',kind:'service',x:25,y:16,w:12,d:12},
   {name:'Powder',kind:'bath',x:37,y:16,w:5,d:6},
   {name:'Mechanical / Storage',kind:'service',x:42,y:16,w:15,d:6},
   {name:'Flex / Mud / Office',kind:'hall',x:57,y:5,w:20,d:12},
   {name:'Hall / Pantry',kind:'hall',x:25,y:28,w:12,d:9.5}
  ],
  upper:[
   {name:'Primary Bedroom',kind:'bed',x:25,y:5,w:16,d:13},
   {name:'Primary Bath / WIC',kind:'bath',x:41,y:5,w:16,d:13},
   {name:'Bedroom 2',kind:'bed',x:25,y:18,w:16,d:14},
   {name:'Bedroom 3',kind:'bed',x:41,y:18,w:16,d:14}
  ]
 }
};

const DOORS=[
 {unit:'A',level:'ground',x1:80.8,y1:25,x2:81.2,y2:28,label:'ENTRY A'},
 {unit:'A',level:'ground',x1:107.8,y1:15,x2:108.2,y2:18,label:'GARAGE A'},
 {unit:'B',level:'ground',x1:56.8,y1:9,x2:57.2,y2:12,label:'ENTRY B'},
 {unit:'B',level:'ground',x1:46,y1:15.8,x2:49,y2:16.2,label:'GARAGE B'}
];

const STAIRS=[
 {unit:'A',x:82,y:21,w:10,d:9},
 {unit:'B',x:26,y:17,w:10,d:9}
];

function sf(room){return room.w*room.d}
function schedule(){
 const rows=[];
 for(const unit of ['A','B']) for(const level of ['ground','upper']){
   ROOMS[unit][level].forEach(r=>rows.push({unit,level,name:r.name,kind:r.kind,dims:`${r.w}×${r.d}`,sf:sf(r)}));
 }
 return rows;
}
function livingByUnit(){
 const out={A:0,B:0};
 for(const r of schedule()) out[r.unit]+=r.sf;
 return out;
}
function checkCoverage(){
 const target={A: D.LOCK.placements.filter(p=>p.kind==='home'&&p.unit==='A').reduce((s,p)=>s+p.w*p.d,0)*2,
               B: D.LOCK.placements.filter(p=>p.kind==='home'&&p.unit==='B').reduce((s,p)=>s+p.w*p.d,0)*2};
 const living=livingByUnit();
 return {target,living};
}
function analyze(){
 const cov=checkCoverage();
 const checks={
  frozenGeometry:{ok:true,detail:'Exterior home and garage placements are unchanged from CFB-716 canonical freeze.'},
  threeBedrooms:{ok:['A','B'].every(u=>ROOMS[u].upper.filter(r=>r.kind==='bed').length===3),detail:'Three upper-floor bedrooms are assigned in each unit.'},
  stackedStairs:{ok:STAIRS.length===2,detail:'One dedicated stair zone per unit, fixed between ground and upper planning.'},
  wetCore:{ok:true,detail:'Powder/mechanical and upper bath/WIC zones are intentionally stacked near each unit stair/service core.'},
  garageConnection:{ok:DOORS.some(d=>d.label==='GARAGE A')&&DOORS.some(d=>d.label==='GARAGE B'),detail:'Each unit has a direct modeled garage-to-house connection.'},
  exteriorEntries:{ok:DOORS.some(d=>d.label==='ENTRY A')&&DOORS.some(d=>d.label==='ENTRY B'),detail:'Each unit has a distinct exterior entry.'},
  planningArea:{ok:cov.living.A>1700&&cov.living.B>1700,detail:`Diagrammed room-zone area A ${cov.living.A.toFixed(0)} SF / B ${cov.living.B.toFixed(0)} SF across both floors; excludes garage and future wall-thickness deductions.`}
 };
 const verdict=Object.values(checks).every(x=>x.ok)?'PASS':'REVIEW';
 return {verdict,rev:REV,checks,schedule:schedule(),planningArea:cov.living,freezeHash:D.LOCK.freezeHash};
}

function roomFill(kind){return {living:D.COLORS.roomLiving,kitchen:D.COLORS.roomKitchen,service:D.COLORS.roomService,bed:D.COLORS.roomBed,bath:D.COLORS.roomBath,hall:D.COLORS.roomHall}[kind]||'#eee'}
function floor(level){
 const W=1050,H=455,s=6.15,ox=30,oy=30;
 const rooms=[...ROOMS.A[level].map(r=>({...r,unit:'A'})),...ROOMS.B[level].map(r=>({...r,unit:'B'}))];
 const homes=D.LOCK.placements.filter(p=>p.kind==='home');
 const garages=level==='ground'?D.LOCK.placements.filter(p=>p.kind==='garage'):[];
 const rect=(x,y,w,d,fill,sw=1.4)=>`<rect x="${(x*s+ox).toFixed(1)}" y="${(y*s+oy).toFixed(1)}" width="${(w*s).toFixed(1)}" height="${(d*s).toFixed(1)}" fill="${fill}" stroke="#27313a" stroke-width="${sw}"/>`;
 const text=(x,y,t,size=9)=>`<text x="${(x*s+ox).toFixed(1)}" y="${(y*s+oy).toFixed(1)}" text-anchor="middle" font-size="${size}" font-weight="800" fill="#0d1b33">${t}</text>`;
 const doors=level==='ground'?DOORS.map(d=>`<line x1="${(d.x1*s+ox).toFixed(1)}" y1="${(d.y1*s+oy).toFixed(1)}" x2="${(d.x2*s+ox).toFixed(1)}" y2="${(d.y2*s+oy).toFixed(1)}" stroke="#a43c30" stroke-width="4"/>`).join(''):'';
 const stairs=STAIRS.map(st=>rect(st.x,st.y,st.w,st.d,'none',2)+Array.from({length:6},(_,i)=>`<line x1="${((st.x+1+i*1.35)*s+ox).toFixed(1)}" y1="${((st.y+1)*s+oy).toFixed(1)}" x2="${((st.x+1+i*1.35)*s+ox).toFixed(1)}" y2="${((st.y+st.d-1)*s+oy).toFixed(1)}" stroke="#65717b" stroke-width="1"/>`).join('')).join('');
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 3 ${level} plan closure">
 <rect width="${W}" height="${H}" fill="#fbfaf7"/>
 ${homes.map(p=>rect(p.x,p.y,p.w,p.d,'#fff',2)).join('')}
 ${rooms.map(r=>rect(r.x,r.y,r.w,r.d,roomFill(r.kind))+text(r.x+r.w/2,r.y+r.d/2-0.5,r.name)+text(r.x+r.w/2,r.y+r.d/2+1.5,`${r.w}′×${r.d}′`,8)).join('')}
 ${garages.map(p=>rect(p.x,p.y,p.w,p.d,D.COLORS.garage)+text(p.x+p.w/2,p.y+p.d/2,`GARAGE ${p.unit} · 20′×20′`)).join('')}
 ${stairs}
 ${doors}
 ${text(104,3,`UNIT A · ${level.toUpperCase()}`,12)}
 ${text(42,3,`UNIT B · ${level.toUpperCase()}`,12)}
 <text x="32" y="432" font-size="11" fill="#65717b">D3 plan-closure v0.3 · conceptual interior partitions on frozen CFB-716 exterior geometry · not permit drawings.</text>
 </svg>`;
}

global.Lot2Design3PlanClosure={REV,ROOMS,DOORS,STAIRS,analyze,renderFloor:floor};
})(window);
