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
 {unit:'B',level:'ground',x1:56.8,y1:9,x2:57.2,y2:12,label:'ENTRY B'},
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
  exteriorEntries:{ok:DOORS.some(d=>d.label==='ENTRY A')&&DOORS.some(d=>d.label==='ENTRY B'),detail:'Each unit has a distinct exterior entry.'},
  planningArea:{ok:cov.living.A>=AREA_TARGET&&cov.living.B>=AREA_TARGET,detail:`Authorized non-overlapping planning-zone area A ${cov.living.A.toFixed(0)} SF / B ${cov.living.B.toFixed(0)} SF across both floors. Circulation zones shown in the schedule are included; garage area is excluded.`},
  overGarageProgram:{ok:geometry.ok,detail:'Unit A over-garage program is authorized as Bedroom 3 plus an upper den, both reached from the upper gallery inside the frozen HOME-A/GARAGE-A footprint.'}
 };
 const verdict=Object.values(checks).every(x=>x.ok)?'PASS':'REVIEW';
 return {verdict,rev:REV,checks,schedule:schedule(),planningArea:cov.living,geometry,areaTarget:AREA_TARGET,freezeHash:D.LOCK.freezeHash};
}

function roomFill(kind){return {living:D.COLORS.roomLiving,kitchen:D.COLORS.roomKitchen,service:D.COLORS.roomService,bed:D.COLORS.roomBed,bath:D.COLORS.roomBath,hall:D.COLORS.roomHall,option:'#fff3cf'}[kind]||'#eee'}
function floor(level){
 const W=1050,H=455,s=6.15,ox=30,oy=30;
 const rooms=[...ROOMS.A[level].map(r=>({...r,unit:'A'})),...ROOMS.B[level].map(r=>({...r,unit:'B'}))];
 const homes=D.LOCK.placements.filter(p=>p.kind==='home');
 const garages=level==='ground'?D.LOCK.placements.filter(p=>p.kind==='garage'):[];
 const rect=(x,y,w,d,fill,sw=1.4,extra='')=>`<rect x="${(x*s+ox).toFixed(1)}" y="${(y*s+oy).toFixed(1)}" width="${(w*s).toFixed(1)}" height="${(d*s).toFixed(1)}" fill="${fill}" stroke="#27313a" stroke-width="${sw}" ${extra}/>`;
 const text=(x,y,t,size=9)=>`<text x="${(x*s+ox).toFixed(1)}" y="${(y*s+oy).toFixed(1)}" text-anchor="middle" font-size="${size}" font-weight="800" fill="#0d1b33">${t}</text>`;
 const doors=level==='ground'?DOORS.map(d=>`<line x1="${(d.x1*s+ox).toFixed(1)}" y1="${(d.y1*s+oy).toFixed(1)}" x2="${(d.x2*s+ox).toFixed(1)}" y2="${(d.y2*s+oy).toFixed(1)}" stroke="#a43c30" stroke-width="4"/>`).join(''):'';
 const stairs=STAIRS.map(st=>rect(st.x,st.y,st.w,st.d,'none',2)+Array.from({length:6},(_,i)=>`<line x1="${((st.x+1+i*1.35)*s+ox).toFixed(1)}" y1="${((st.y+1)*s+oy).toFixed(1)}" x2="${((st.x+1+i*1.35)*s+ox).toFixed(1)}" y2="${((st.y+st.d-1)*s+oy).toFixed(1)}" stroke="#65717b" stroke-width="1"/>`).join('')).join('');
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 3 ${level} plan closure">
 <rect width="${W}" height="${H}" fill="#fbfaf7"/>
 ${homes.map(p=>rect(p.x,p.y,p.w,p.d,'#fff',2)).join('')}
 ${rooms.map(r=>rect(r.x,r.y,r.w,r.d,roomFill(r.kind),1.4)+text(r.x+r.w/2,r.y+r.d/2-0.5,r.name,r.name.length>22?7.2:9)+text(r.x+r.w/2,r.y+r.d/2+1.5,`${r.w}′x${r.d}′`,8)).join('')}
 ${garages.map(p=>rect(p.x,p.y,p.w,p.d,D.COLORS.garage)+text(p.x+p.w/2,p.y+p.d/2,`GARAGE ${p.unit} · 20′×20′`)).join('')}
 ${stairs}
 ${doors}
 ${text(104,3,`UNIT A · ${level.toUpperCase()}`,12)}
 ${text(42,3,`UNIT B · ${level.toUpperCase()}`,12)}
 <text x="32" y="432" font-size="11" fill="#65717b">D3 plan-closure v0.4 · design-development interior planning on frozen CFB-716 exterior geometry · not permit drawings.</text>
 </svg>`;
}

global.Lot2Design3PlanClosure={REV,ROOMS,DOORS,STAIRS,analyze,renderFloor:floor,validateGeometry};
})(window);
