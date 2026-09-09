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
  const W=1200,H=620,base=470;
  const ink=COLORS.navy, glass="#bfd2dd", siding="#d9d0c2", siding2="#c9bca8", stone="#9b8f7e", roof="#3f454c", trim="#f7f4ee", garage="#756f67";
  const specs={
    penn:{title:"Pennsylvania / street elevation",subtitle:"Front-facing composition · restrained North Idaho contemporary", masses:[
      {x:130,w:430,h:190,ridge:86,label:"UNIT A",doorX:365,garageX:430,garageW:118,windowXs:[175,255],accent:"stone"},
      {x:650,w:300,h:180,ridge:72,label:"UNIT B",doorX:690,garageX:null,garageW:0,windowXs:[760,850],accent:"siding"}
    ]},
    rear:{title:"Rear elevation",subtitle:"Private-yard expression · larger glazing and quieter roof rhythm", masses:[
      {x:115,w:350,h:180,ridge:72,label:"UNIT B",doorX:205,garageX:120,garageW:118,windowXs:[285,380],accent:"stone"},
      {x:560,w:470,h:190,ridge:86,label:"UNIT A",doorX:610,garageX:870,garageW:118,windowXs:[690,780],accent:"siding"}
    ]},
    north:{title:"North elevation",subtitle:"Drive-side façade · service openings controlled", masses:[
      {x:120,w:760,h:188,ridge:82,label:"UNIT A / UNIT B",doorX:760,garageX:135,garageW:120,windowXs:[320,430,560,660],accent:"stone"}
    ]},
    south:{title:"South elevation",subtitle:"Private-yard façade · daylight-focused openings", masses:[
      {x:120,w:760,h:188,ridge:82,label:"UNIT A / UNIT B",doorX:185,garageX:690,garageW:120,windowXs:[300,430,560,650],accent:"siding"}
    ]}
  };
  const S=specs[side]||specs.penn;
  const masses=S.masses.map((m,i)=>{
    const top=base-m.h;
    const ridgeY=top-m.ridge;
    const roofInset=18;
    const windows=(m.windowXs||[]).map((wx,j)=>{
      const wy=top+46+(j%2)*8;
      return `<g><rect x="${wx}" y="${wy}" width="54" height="74" rx="2" fill="${glass}" stroke="#4d5f6b" stroke-width="2"/>
      <line x1="${wx+27}" y1="${wy}" x2="${wx+27}" y2="${wy+74}" stroke="#ffffffbb"/><line x1="${wx}" y1="${wy+37}" x2="${wx+54}" y2="${wy+37}" stroke="#ffffffbb"/></g>`;
    }).join("");
    const garage=m.garageX!=null?`<g><rect x="${m.garageX}" y="${base-88}" width="${m.garageW}" height="88" fill="${garage}" stroke="${ink}" stroke-width="2"/>
      <line x1="${m.garageX}" y1="${base-58}" x2="${m.garageX+m.garageW}" y2="${base-58}" stroke="#9f9991"/>
      <line x1="${m.garageX}" y1="${base-29}" x2="${m.garageX+m.garageW}" y2="${base-29}" stroke="#9f9991"/>
      <text x="${m.garageX+m.garageW/2}" y="${base-98}" text-anchor="middle" font-size="11" font-weight="800" fill="${ink}">2-CAR GARAGE</text></g>`:"";
    const entry=`<g><rect x="${m.doorX}" y="${base-82}" width="42" height="82" fill="#7f654e" stroke="${ink}" stroke-width="2"/>
      <circle cx="${m.doorX+32}" cy="${base-41}" r="3" fill="${trim}"/>
      <rect x="${m.doorX-10}" y="${base-92}" width="62" height="8" fill="${roof}" stroke="${ink}"/>
      <text x="${m.doorX+21}" y="${base-100}" text-anchor="middle" font-size="10" font-weight="800" fill="${ink}">ENTRY</text></g>`;
    const material=m.accent==="stone"
      ? `<rect x="${m.x}" y="${base-74}" width="82" height="74" fill="${stone}" opacity=".92"/>`
      : `<rect x="${m.x+m.w-76}" y="${top}" width="76" height="${m.h}" fill="${siding2}" opacity=".85"/>`;
    return `<g>
      <rect x="${m.x}" y="${top}" width="${m.w}" height="${m.h}" fill="${siding}" stroke="${ink}" stroke-width="2.2"/>
      ${material}
      <path d="M ${m.x-roofInset} ${top} L ${m.x+m.w/2} ${ridgeY} L ${m.x+m.w+roofInset} ${top}" fill="${roof}" stroke="${ink}" stroke-width="2.2"/>
      <line x1="${m.x+14}" y1="${top+18}" x2="${m.x+m.w-14}" y2="${top+18}" stroke="#ffffff88"/>
      ${windows}${entry}${garage}
      <text x="${m.x+m.w/2}" y="${base+28}" text-anchor="middle" font-size="12" font-weight="900" fill="${ink}">${m.label}</text>
    </g>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 ${S.title}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef3f6"/><stop offset="100%" stop-color="#fbfaf7"/></linearGradient>
    <filter id="softShadow"><feDropShadow dx="0" dy="7" stdDeviation="8" flood-opacity=".12"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <text x="70" y="58" font-size="28" font-family="Georgia,serif" fill="${ink}">${S.title}</text>
  <text x="70" y="84" font-size="13" fill="${COLORS.muted}">${S.subtitle}</text>
  <line x1="70" y1="${base}" x2="1130" y2="${base}" stroke="#808882" stroke-width="2"/>
  <g filter="url(#softShadow)">${masses}</g>
  <g opacity=".8">
    <circle cx="90" cy="${base-12}" r="20" fill="#9ba98f"/><rect x="87" y="${base-10}" width="6" height="36" fill="#6f665b"/>
    <circle cx="1080" cy="${base-18}" r="26" fill="#93a287"/><rect x="1077" y="${base-14}" width="6" height="42" fill="#6f665b"/>
  </g>
  <g transform="translate(70,535)">
    <rect width="1060" height="54" rx="10" fill="#ffffffd9" stroke="#d8d2ca"/>
    <text x="18" y="22" font-size="11" font-weight="900" fill="${ink}">DESIGN 3 · CFB-716 · CONCEPT ELEVATION</text>
    <text x="18" y="40" font-size="10.5" fill="${COLORS.muted}">Frozen exterior footprints/site geometry. Roof articulation, openings, materials, and detailing are design-development items — not permit drawings.</text>
  </g>
  </svg>`;
}

function renderAxon(){
  const W=1200,H=760;
  const ink=COLORS.navy;
  const iso=(x,y,z=0)=>[620+(x-76)*5.0-(y-26)*3.0,560-(y-26)*2.0-z*6.0];
  const pts=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ");
  function mass(p,h,fill,roof=true){
    const a=iso(p.x,p.y,0),b=iso(p.x+p.w,p.y,0),c=iso(p.x+p.w,p.y+p.d,0),d=iso(p.x,p.y+p.d,0);
    const A=iso(p.x,p.y,h),B=iso(p.x+p.w,p.y,h),C=iso(p.x+p.w,p.y+p.d,h),D=iso(p.x,p.y+p.d,h);
    const midFront=[(A[0]+B[0])/2,(A[1]+B[1])/2-28];
    const midBack=[(D[0]+C[0])/2,(D[1]+C[1])/2-28];
    const roofPoly=roof?`<polygon points="${pts([A,B,midFront])}" fill="#434a51" stroke="#2b333a" stroke-width="1.6"/>
      <polygon points="${pts([D,C,midBack])}" fill="#4d555d" stroke="#2b333a" stroke-width="1.6"/>
      <polygon points="${pts([A,D,midBack,midFront])}" fill="#596169" stroke="#2b333a" stroke-width="1.6"/>
      <polygon points="${pts([B,C,midBack,midFront])}" fill="#3d444b" stroke="#2b333a" stroke-width="1.6"/>`:"";
    const lerp=(p0,p1,t)=>[p0[0]+(p1[0]-p0[0])*t,p0[1]+(p1[1]-p0[1])*t];
    const faceWindow=(p0,p1,pTop1,pTop0,u0,u1,v0,v1)=>{
      const bottom0=lerp(p0,p1,u0), bottom1=lerp(p0,p1,u1);
      const top0=lerp(pTop0,pTop1,u0), top1=lerp(pTop0,pTop1,u1);
      return [lerp(bottom0,top0,v0),lerp(bottom1,top1,v0),lerp(bottom1,top1,v1),lerp(bottom0,top0,v1)];
    };
    const frontWindow=faceWindow(a,b,B,A,.34,.48,.30,.68);
    const sideWindow=faceWindow(b,c,C,B,.30,.50,.30,.66);
    return `<g>
      <polygon points="${pts([a,b,B,A])}" fill="${fill}" stroke="#2b333a" stroke-width="1.8"/>
      <polygon points="${pts([b,c,C,B])}" fill="#b9ae9e" stroke="#2b333a" stroke-width="1.8"/>
      <polygon points="${pts([A,B,C,D])}" fill="#e6ded1" stroke="#2b333a" stroke-width="1.6"/>
      ${roofPoly}
      <polygon points="${pts(frontWindow)}" fill="#bfd2dd" stroke="#53636c" stroke-width="1.2"/>
      <polygon points="${pts(sideWindow)}" fill="#bfd2dd" stroke="#53636c" stroke-width="1.2"/>
    </g>`;
  }
  const lotPts=SURVEY.map(([x,y])=>iso(x,y,0));
  const drives=LOCK.drives.map(d=>`<polyline points="${pts(d.points.map(([x,y])=>iso(x,y,.2)))}" fill="none" stroke="#8e9492" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity=".62"/>`).join("");
  const homes=LOCK.placements.filter(p=>p.kind==="home").map(p=>mass(p,20,p.unit==="A"?"#d1bd98":"#ddcfae",true)).join("");
  const garages=LOCK.placements.filter(p=>p.kind==="garage").map(p=>mass(p,11,"#8fa188",true)).join("");
  const trees=[[13,44],[70,49],[134,43],[18,8]].map(([x,y])=>{const [tx,ty]=iso(x,y,0);return `<g><ellipse cx="${tx}" cy="${ty-38}" rx="22" ry="34" fill="#93a287" opacity=".85"/><rect x="${tx-3}" y="${ty-16}" width="6" height="24" fill="#706457"/></g>`}).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 customer presentation axonometric">
  <defs><filter id="axonShadow"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-opacity=".16"/></filter></defs>
  <rect width="${W}" height="${H}" fill="#f3efe8"/>
  <text x="70" y="62" font-size="30" font-family="Georgia,serif" fill="${ink}">Design 3 · CFB-716</text>
  <text x="70" y="90" font-size="14" fill="${COLORS.muted}">Preferred Workbench candidate · customer presentation axon · Pennsylvania access at lower right</text>
  <polygon points="${pts(lotPts)}" fill="#ebe4d7" stroke="#596169" stroke-width="2"/>
  ${drives}
  ${trees}
  <g filter="url(#axonShadow)">${homes}${garages}</g>
  <g>
    <text x="860" y="290" font-size="13" font-weight="900" fill="${ink}">UNIT A</text>
    <line x1="850" y1="296" x2="780" y2="350" stroke="${ink}"/>
    <text x="320" y="330" font-size="13" font-weight="900" fill="${ink}">UNIT B</text>
    <line x1="340" y1="336" x2="430" y2="390" stroke="${ink}"/>
    <text x="200" y="520" font-size="12" font-weight="900" fill="#50624d">GARAGE B</text>
    <text x="825" y="515" font-size="12" font-weight="900" fill="#50624d">GARAGE A</text>
  </g>
  <g transform="translate(70,650)">
    <rect width="1060" height="70" rx="12" fill="#ffffffd9" stroke="#d8d2ca"/>
    <text x="18" y="24" font-size="11" font-weight="900" fill="${ink}">GEOMETRY AUTHORITY · CFB-716 FREEZE ${FREEZE.slice(0,12)}…</text>
    <text x="18" y="45" font-size="10.5" fill="${COLORS.muted}">This axon is derived from the frozen site/building placements. Roofs, openings, and materials are presentation-layer development only.</text>
    <text x="18" y="61" font-size="10.5" fill="${COLORS.muted}">Not permit / construction drawings. Professional validation pending.</text>
  </g>
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
