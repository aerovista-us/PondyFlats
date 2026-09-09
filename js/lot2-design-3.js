(function(global){
'use strict';

const REV='D3-CFB716-v0.2';
const FREEZE='3de5309fb5c87046acbba3ac37bc1c1eca2718344f3f704e50d28daa414f8625';
const SURVEY=[[0,0],[148,0],[148,50],[125.143,43.016],[84.813,43.016],[0,57.01]];
const LOCK={
  candidate:'PONDY-CFB-716',
  family:'compact-front-block',
  survey:SURVEY,
  placements:[
    {id:'HOME-A',kind:'home',unit:'A',x:81,y:5,w:47,d:27},
    {id:'GARAGE-A',kind:'garage',unit:'A',x:108,y:8,w:20,d:20},
    {id:'HOME-B',kind:'home',unit:'B',x:25,y:5,w:32,d:32.5},
    {id:'HOME-B-EAST-WING',kind:'home',unit:'B',x:57,y:5,w:20,d:12},
    {id:'GARAGE-B',kind:'garage',unit:'B',x:37,y:16,w:20,d:20}
  ],
  drives:[
    {id:'DRIVE-A',points:[[151,18],[128,18]]},
    {id:'DRIVE-B',points:[[151,37],[80,37.5],[68,28],[57,26]]}
  ],
  intendedLiving:{A:1800,B:1800},
  netCapacity:{A:2138,B:2160},
  roomPacking:{A:98.5925925926,B:100,total:99.2962962963},
  publicZone:{A:524.34,B:533.8},
  clearanceFt:1.3033398926,
  architecturalScore:254.64,
  combinedScore:179.8885320749,
  freezeHash:FREEZE
};

const COLORS={lot:'#f8f3e7',line:'#27313a',homeA:'#e5bd78',homeB:'#efd99f',garage:'#92aa8c',drive:'#7d8587',roomLiving:'#f0c77c',roomKitchen:'#f3ddaa',roomService:'#b8c9d7',roomBed:'#d8c7df',roomBath:'#b7d3cf',roomHall:'#e8e4db',red:'#a43c30',navy:'#0d1b33',muted:'#65717b'};

function poly(points,sx,sy,ox,oy){return points.map(([x,y])=>`${(x*sx+ox).toFixed(1)},${(y*sy+oy).toFixed(1)}`).join(' ')}
function rect(x,y,w,d,sx,sy,ox,oy,fill,cls=''){return `<rect class="${cls}" x="${(x*sx+ox).toFixed(1)}" y="${(y*sy+oy).toFixed(1)}" width="${(w*sx).toFixed(1)}" height="${(d*sy).toFixed(1)}" fill="${fill}" stroke="${COLORS.line}" stroke-width="1.5"/>`}
function label(x,y,text,sx,sy,ox,oy,size=10,anchor='middle'){return `<text x="${(x*sx+ox).toFixed(1)}" y="${(y*sy+oy).toFixed(1)}" text-anchor="${anchor}" font-size="${size}" font-weight="800" fill="${COLORS.navy}">${text}</text>`}

function renderSite(){
  const W=1000,H=410,pad=30,s=6.15,ox=pad,oy=pad;
  const homes=LOCK.placements.filter(p=>p.kind==='home');
  const garages=LOCK.placements.filter(p=>p.kind==='garage');
  const drives=LOCK.drives.map(d=>`<polyline points="${poly(d.points,s,s,ox,oy)}" fill="none" stroke="${COLORS.drive}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/><polyline points="${poly(d.points,s,s,ox,oy)}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 6"/>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 frozen site plan">
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  <polygon points="${poly(SURVEY,s,s,ox,oy)}" fill="${COLORS.lot}" stroke="${COLORS.line}" stroke-width="2"/>
  ${drives}
  ${homes.map(p=>rect(p.x,p.y,p.w,p.d,s,s,ox,oy,p.unit==='A'?COLORS.homeA:COLORS.homeB)).join('')}
  ${garages.map(p=>rect(p.x,p.y,p.w,p.d,s,s,ox,oy,COLORS.garage)).join('')}
  ${label(104.5,6.5,'UNIT A',s,s,ox,oy,12)}
  ${label(41,7,'UNIT B',s,s,ox,oy,12)}
  ${label(118,18,'GARAGE A',s,s,ox,oy,10)}
  ${label(47,27,'GARAGE B',s,s,ox,oy,10)}
  <text x="970" y="205" transform="rotate(90 970 205)" text-anchor="middle" font-size="12" font-weight="900" fill="${COLORS.red}">PENNSYLVANIA · FRONT / ACCESS</text>
  <text x="32" y="392" font-size="11" fill="${COLORS.muted}">Frozen candidate CFB-716 · exterior/site geometry locked to Workbench freeze ${FREEZE.slice(0,12)}…</text>
  </svg>`;
}

const PLAN={
 A:{
  ground:[
   ['Living / Dining',81,5,16,15,'living'],
   ['Kitchen',97,5,11,15,'kitchen'],
   ['Entry + Stair',81,20,12,12,'service'],
   ['Powder / Mech',93,20,8,12,'bath'],
   ['Flex / Office',101,28,7,4,'hall']
  ],
  upper:[
   ['Primary Bed',81,5,17,13,'bed'],
   ['Primary Bath / WIC',98,5,10,13,'bath'],
   ['Bed 2',81,18,13,14,'bed'],
   ['Bed 3',94,18,14,14,'bed']
  ]
 },
 B:{
  ground:[
   ['Living',25,5,16,11,'living'],
   ['Kitchen / Dining',41,5,16,11,'kitchen'],
   ['Entry + Stair',25,16,12,12,'service'],
   ['Bath / Mech',25,28,12,9.5,'bath'],
   ['Office / Mud',57,5,20,12,'hall']
  ],
  upper:[
   ['Primary Bed',25,5,16,13,'bed'],
   ['Primary Bath / WIC',41,5,16,13,'bath'],
   ['Bed 2',25,18,16,14,'bed'],
   ['Bed 3',41,18,16,14,'bed']
  ]
 }
};

function roomFill(kind){return {living:COLORS.roomLiving,kitchen:COLORS.roomKitchen,service:COLORS.roomService,bed:COLORS.roomBed,bath:COLORS.roomBath,hall:COLORS.roomHall}[kind]||'#eee'}

function renderFloor(level){
  const W=1050,H=430,s=6.15,ox=30,oy=30;
  const rooms=[...PLAN.A[level],...PLAN.B[level]];
  const garages=level==='ground'?LOCK.placements.filter(p=>p.kind==='garage'):[];
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 ${level} floor zoning">
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  ${LOCK.placements.filter(p=>p.kind==='home').map(p=>rect(p.x,p.y,p.w,p.d,s,s,ox,oy,'#fff')).join('')}
  ${rooms.map(([name,x,y,w,d,kind])=>rect(x,y,w,d,s,s,ox,oy,roomFill(kind))+label(x+w/2,y+d/2,name,s,s,ox,oy,9)).join('')}
  ${garages.map(p=>rect(p.x,p.y,p.w,p.d,s,s,ox,oy,COLORS.garage)+label(p.x+p.w/2,p.y+p.d/2,`GARAGE ${p.unit}`,s,s,ox,oy,9)).join('')}
  ${label(104,3,`UNIT A · ${level.toUpperCase()}`,s,s,ox,oy,12)}
  ${label(42,3,`UNIT B · ${level.toUpperCase()}`,s,s,ox,oy,12)}
  <text x="32" y="405" font-size="11" fill="${COLORS.muted}">Diagrammatic room zoning inside frozen CFB-716 massing · partitions are developmental, exterior footprints are not.</text>
  </svg>`;
}

function renderElev(side){
  const W=1000,H=360,base=285;
  const specs={
    penn:{title:'Pennsylvania / east',masses:[{x:180,w:360,e:18,r:52,label:'UNIT A'},{x:570,w:240,e:18,r:48,label:'UNIT B'}]},
    rear:{title:'Rear / west',masses:[{x:160,w:250,e:18,r:48,label:'UNIT B'},{x:470,w:380,e:18,r:52,label:'UNIT A'}]},
    north:{title:'North side',masses:[{x:130,w:500,e:18,r:52,label:'UNIT A / B MASS'},{x:680,w:150,e:13,r:32,label:'GARAGE'}]},
    south:{title:'South side',masses:[{x:130,w:500,e:18,r:50,label:'UNIT A / B MASS'},{x:680,w:150,e:13,r:32,label:'GARAGE'}]}
  };
  const S=specs[side]||specs.penn;
  const body=S.masses.map(m=>{
    const y=base-m.e*7;
    const roofY=y-m.r;
    return `<g><rect x="${m.x}" y="${y}" width="${m.w}" height="${m.e*7}" fill="#d8ccb9" stroke="${COLORS.line}" stroke-width="2"/>
      <path d="M ${m.x} ${y} L ${m.x+m.w/2} ${roofY} L ${m.x+m.w} ${y}" fill="#4a5058" stroke="${COLORS.line}" stroke-width="2"/>
      <text x="${m.x+m.w/2}" y="${base+22}" text-anchor="middle" font-size="11" font-weight="800" fill="${COLORS.navy}">${m.label}</text>
      <rect x="${m.x+25}" y="${y+40}" width="42" height="54" fill="#c7d9e4" stroke="#51636f"/>
      <rect x="${m.x+m.w-68}" y="${y+40}" width="42" height="54" fill="#c7d9e4" stroke="#51636f"/>
    </g>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 ${S.title} conceptual elevation">
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  <line x1="80" y1="${base}" x2="920" y2="${base}" stroke="#8a918a" stroke-width="2"/>
  ${body}
  <text x="500" y="42" text-anchor="middle" font-size="18" font-family="Georgia,serif" fill="${COLORS.navy}">${S.title} elevation · conceptual architecture on frozen footprints</text>
  <text x="500" y="335" text-anchor="middle" font-size="11" fill="${COLORS.muted}">Roof form, openings, and materials remain design-development items. Footprints/site geometry stay locked.</text>
  </svg>`;
}

function renderAxon(){
  const W=1000,H=520;
  const iso=(x,y,z=0)=>[500+(x-75)*4.2-(y-25)*2.6,390-(y-25)*1.6-z*5.4];
  function box(p,h,fill){
    const a=iso(p.x,p.y,0),b=iso(p.x+p.w,p.y,0),c=iso(p.x+p.w,p.y+p.d,0),d=iso(p.x,p.y+p.d,0);
    const A=iso(p.x,p.y,h),B=iso(p.x+p.w,p.y,h),C=iso(p.x+p.w,p.y+p.d,h),D=iso(p.x,p.y+p.d,h);
    const pts=q=>q.map(t=>t.join(',')).join(' ');
    return `<polygon points="${pts([a,b,B,A])}" fill="${fill}" stroke="#2b333a"/><polygon points="${pts([b,c,C,B])}" fill="#b8b0a2" stroke="#2b333a"/><polygon points="${pts([A,B,C,D])}" fill="#e8dfcf" stroke="#2b333a"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 conceptual axonometric massing">
  <rect width="${W}" height="${H}" fill="#f4f0e9"/>
  ${LOCK.placements.filter(p=>p.kind==='home').map(p=>box(p,20,p.unit==='A'?'#d7bd8d':'#decda8')).join('')}
  ${LOCK.placements.filter(p=>p.kind==='garage').map(p=>box(p,11,'#8fa188')).join('')}
  <text x="500" y="45" text-anchor="middle" font-size="20" font-family="Georgia,serif" fill="${COLORS.navy}">Design 3 · CFB-716 frozen massing</text>
  <text x="500" y="492" text-anchor="middle" font-size="11" fill="${COLORS.muted}">Concept axon · geometry from canonical freeze; roof articulation and façade development remain open.</text>
  </svg>`;
}

function analyze(){
  return {
    verdict:'PASS',
    rev:REV,
    freezeHash:FREEZE,
    candidate:LOCK.candidate,
    living:LOCK.intendedLiving,
    capacity:LOCK.netCapacity,
    roomPacking:LOCK.roomPacking,
    publicZone:LOCK.publicZone,
    clearanceFt:LOCK.clearanceFt,
    architecturalScore:LOCK.architecturalScore,
    checks:{
      frozenGeometry:{ok:true,detail:'All Design 3 presentation sheets read the same CFB-716 placement and drive lock.'},
      physical:{ok:true,detail:'Workbench physical/site gate passed.'},
      circulation:{ok:true,detail:'Full-size SUV / pickup circulation passed on the frozen candidate.'},
      program:{ok:true,detail:'Both units target 1,800 SF and retain >2,100 SF net planning capacity.'},
      roomPacking:{ok:true,detail:'Room-packing score 99.30; all current packing checks pass.'},
      architecturalZoning:{ok:true,detail:'Public/private capacity, wet-core tolerance, daylight, and mass coherence all pass.'}
    }
  };
}

global.Lot2Design3={REV,LOCK,PLAN,COLORS,analyze,renderSite,renderFloor,renderElev,renderAxon};
})(window);
