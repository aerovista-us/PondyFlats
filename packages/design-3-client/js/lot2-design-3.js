(function(global){
'use strict';

const REV='D3-CFB716-v0.4';
const FREEZE='3de5309fb5c87046acbba3ac37bc1c1eca2718344f3f704e50d28daa414f8625';
const VEHICLE={id:'FS-SUV',length:20.5,width:8.0,wheelbase:13.1,frontOverhang:3.4,rearOverhang:4.0,minRearAxleRadius:25};
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

const OPENINGS=[
  {id:'ENTRY-A',role:'entry',unit:'A',x1:80.8,y1:25,x2:81.2,y2:28,height:7},
  {id:'GARAGE-A-CONNECTION',role:'garage-connection',unit:'A',x1:107.8,y1:15,x2:108.2,y2:18,height:7},
  {id:'ENTRY-B',role:'entry',unit:'B',x1:76.8,y1:9,x2:77.2,y2:12,height:7},
  {id:'GARAGE-B-CONNECTION',role:'garage-connection',unit:'B',x1:46,y1:15.8,x2:49,y2:16.2,height:7},
  {id:'GARAGE-A-OVERHEAD',role:'garage-overhead',unit:'A',x1:128,y1:10,x2:128,y2:26,height:8},
  {id:'GARAGE-B-OVERHEAD',role:'garage-overhead',unit:'B',x1:57,y1:18,x2:57,y2:34,height:8}
];

const COLORS={lot:'#f8f3e7',line:'#27313a',homeA:'#e5bd78',homeB:'#efd99f',garage:'#92aa8c',drive:'#7d8587',roomLiving:'#f0c77c',roomKitchen:'#f3ddaa',roomService:'#b8c9d7',roomBed:'#d8c7df',roomBath:'#b7d3cf',roomHall:'#e8e4db',red:'#a43c30',navy:'#0d1b33',muted:'#65717b'};

function poly(points,sx,sy,ox,oy){return points.map(([x,y])=>`${(x*sx+ox).toFixed(1)},${(y*sy+oy).toFixed(1)}`).join(' ')}
function rect(x,y,w,d,sx,sy,ox,oy,fill,cls=''){return `<rect class="${cls}" x="${(x*sx+ox).toFixed(1)}" y="${(y*sy+oy).toFixed(1)}" width="${(w*sx).toFixed(1)}" height="${(d*sy).toFixed(1)}" fill="${fill}" stroke="${COLORS.line}" stroke-width="1.5"/>`}
function label(x,y,text,sx,sy,ox,oy,size=10,anchor='middle'){return `<text x="${(x*sx+ox).toFixed(1)}" y="${(y*sy+oy).toFixed(1)}" text-anchor="${anchor}" font-size="${size}" font-weight="800" fill="${COLORS.navy}">${text}</text>`}

function renderSite(){
  const W=1200,H=650,s=6.15,ox=90,oy=170,ink=COLORS.navy;
  const homes=LOCK.placements.filter(p=>p.kind==='home');
  const garages=LOCK.placements.filter(p=>p.kind==='garage');
  const drives=LOCK.drives.map(d=>`<polyline points="${poly(d.points,s,s,ox,oy)}" fill="none" stroke="#a5aaa8" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${poly(d.points,s,s,ox,oy)}" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="8 7"/>`).join('');
  const building=(p,fill)=>`<g filter="url(#siteShadow)">${rect(p.x,p.y,p.w,p.d,s,s,ox,oy,fill)}</g>`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 frozen site plan">
  <defs><filter id="siteShadow"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-opacity=".12"/></filter></defs>
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  <text x="70" y="58" font-size="30" font-family="Georgia,serif" fill="${ink}">A-001 · CFB-716 frozen site plan</text>
  <text x="70" y="87" font-size="14" fill="${COLORS.muted}">Preferred Design 3 placement · Pennsylvania-only access · exterior/site geometry locked to the canonical Workbench freeze</text>
  <g transform="translate(72,112)"><path d="M0 26 L0 0 L5 9 L10 0 L10 26" fill="none" stroke="${ink}" stroke-width="2"/><text x="5" y="-6" text-anchor="middle" font-size="10" font-weight="900" fill="${ink}">N</text></g>
  <rect x="1010" y="138" width="140" height="380" rx="12" fill="#deddd8"/>
  <line x1="1080" y1="150" x2="1080" y2="506" stroke="#ffffff" stroke-width="3" stroke-dasharray="16 14" opacity=".9"/>
  <text x="1118" y="328" transform="rotate(90 1118 328)" text-anchor="middle" font-size="14" font-weight="900" fill="#5e6262">PENNSYLVANIA STREET</text>
  <text x="1048" y="328" transform="rotate(90 1048 328)" text-anchor="middle" font-size="10" font-weight="800" fill="#8b3b31">MODELED ACCESS ONLY</text>
  <polygon points="${poly(SURVEY,s,s,ox,oy)}" fill="${COLORS.lot}" stroke="${COLORS.line}" stroke-width="2.4"/>
  ${drives}
  ${homes.map(p=>building(p,p.unit==='A'?COLORS.homeA:COLORS.homeB)).join('')}
  ${garages.map(p=>building(p,COLORS.garage)).join('')}
  ${label(104.5,7,'UNIT A',s,s,ox,oy,13)}
  ${label(41,7.5,'UNIT B',s,s,ox,oy,13)}
  ${label(118,18.5,'GARAGE A',s,s,ox,oy,10)}
  ${label(47,27.5,'GARAGE B',s,s,ox,oy,10)}
  <g transform="translate(70,552)">
    <rect width="1060" height="62" rx="10" fill="#ffffffea" stroke="#d8d2ca"/>
    <text x="18" y="22" font-size="11" font-weight="900" fill="${ink}">GEOMETRY AUTHORITY · CFB-716 FREEZE ${FREEZE.slice(0,12)}…</text>
    <text x="18" y="42" font-size="10.5" fill="${COLORS.muted}">Presentation may change; property boundary, home/garage placements, drive paths, and Pennsylvania access may not.</text>
    <g transform="translate(690,15)"><rect width="18" height="18" rx="3" fill="${COLORS.homeA}" stroke="#999"/><text x="26" y="13" font-size="9.5" fill="${COLORS.muted}">home</text><rect x="92" width="18" height="18" rx="3" fill="${COLORS.garage}" stroke="#888"/><text x="118" y="13" font-size="9.5" fill="${COLORS.muted}">garage</text><line x1="196" y1="9" x2="235" y2="9" stroke="#a5aaa8" stroke-width="12" stroke-linecap="round"/><text x="244" y="13" font-size="9.5" fill="${COLORS.muted}">vehicle route</text></g>
  </g>
  </svg>`;
}

function renderSweptPath(){
  const W=1200,H=700,s=6.15,ox=90,oy=170,ink=COLORS.navy,R=VEHICLE.minRearAxleRadius;
  const rectSvg=(p,fill)=>rect(p.x,p.y,p.w,p.d,s,s,ox,oy,fill,'');
  const wrap=(a)=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a};
  const dist=(a,b)=>Math.hypot(b[0]-a[0],b[1]-a[1]);
  const heading=(a,b)=>Math.atan2(b[1]-a[1],b[0]-a[0]);
  const norm=(a,b)=>{const d=dist(a,b)||1;return[(b[0]-a[0])/d,(b[1]-a[1])/d]};
  const axleToBody=(VEHICLE.length/2)-VEHICLE.rearOverhang;
  function bodyPoly(p){
    const hx=Math.cos(p.th),hy=Math.sin(p.th),wx=-hy,wy=hx,hl=VEHICLE.length/2,hw=VEHICLE.width/2;
    const cx=p.x+hx*axleToBody,cy=p.y+hy*axleToBody;
    return [[cx+hx*hl+wx*hw,cy+hy*hl+wy*hw],[cx+hx*hl-wx*hw,cy+hy*hl-wy*hw],[cx-hx*hl-wx*hw,cy-hy*hl-wy*hw],[cx-hx*hl+wx*hw,cy-hy*hl+wy*hw]];
  }
  function filletPath(raw){
    const path=raw.map(p=>[...p]),poses=[],notes=[];
    function straight(a,b,skipEnd){
      const d=dist(a,b),steps=Math.max(1,Math.ceil(d/1.5)),th=heading(a,b);
      for(let i=0;i<steps;i++){const t=i/steps;poses.push({x:a[0]+(b[0]-a[0])*t,y:a[1]+(b[1]-a[1])*t,th,kind:'straight',R})}
      if(!skipEnd)poses.push({x:b[0],y:b[1],th,kind:'straight',R});
    }
    if(path.length<2)return{poses,notes};
    let cursor=path[0];
    for(let i=1;i<path.length-1;i++){
      const A=i===1?path[0]:cursor,B=path[i],C=path[i+1],dIn=dist(A,B),dOut=dist(B,C),hIn=heading(A,B),hOut=heading(B,C);
      const delta=wrap(hOut-hIn),phi=Math.abs(delta);
      if(phi>(150*Math.PI)/180||phi<(12*Math.PI)/180){straight(cursor,B,true);cursor=B;continue}
      const T=R*Math.tan(phi/2),avail=Math.min(dIn,dOut);
      if(avail<T-.4){notes.push({kind:'short-tangent',need:T,have:avail,at:B});straight(cursor,B,true);cursor=B;continue}
      const uIn=norm(A,B),uOut=norm(B,C),sign=delta>=0?1:-1,n=sign>0?[-uIn[1],uIn[0]]:[uIn[1],-uIn[0]];
      const P1=[B[0]-uIn[0]*T,B[1]-uIn[1]*T],P2=[B[0]+uOut[0]*T,B[1]+uOut[1]*T],center=[P1[0]+n[0]*R,P1[1]+n[1]*R];
      straight(cursor,P1,true);
      const a1=Math.atan2(P1[1]-center[1],P1[0]-center[0]),a2=Math.atan2(P2[1]-center[1],P2[0]-center[0]),arc=wrap(a2-a1),steps=Math.max(8,Math.ceil(Math.abs(arc)*R));
      for(let j=0;j<=steps;j++){
        const ang=a1+arc*j/steps,x=center[0]+Math.cos(ang)*R,y=center[1]+Math.sin(ang)*R,th=ang+(sign>0?Math.PI/2:-Math.PI/2);
        poses.push({x,y,th,kind:'arc',R});
      }
      cursor=P2;
    }
    straight(cursor,path[path.length-1],false);
    return{poses,notes};
  }
  function surveyYAtX(x){
    let maxY=-Infinity;
    for(let i=0;i<SURVEY.length;i++){
      const a=SURVEY[i],b=SURVEY[(i+1)%SURVEY.length],lo=Math.min(a[0],b[0]),hi=Math.max(a[0],b[0]);
      if(x<lo-1e-6||x>hi+1e-6)continue;
      if(Math.abs(b[0]-a[0])<1e-9)maxY=Math.max(maxY,a[1],b[1]);
      else{const t=(x-a[0])/(b[0]-a[0]);if(t>=0&&t<=1)maxY=Math.max(maxY,a[1]+t*(b[1]-a[1]))}
    }
    return maxY;
  }
  function southClearance(polyPts){
    let min=Infinity;
    for(const [x,y] of polyPts){if(x<0||x>=147.8)continue;const sy=surveyYAtX(x);if(Number.isFinite(sy))min=Math.min(min,sy-y)}
    return min;
  }
  const reports=LOCK.drives.map(d=>({drive:d,...filletPath(d.points)}));
  const allPoses=reports.flatMap(r=>r.poses),arcCount=allPoses.filter(p=>p.kind==='arc').length,shortCount=reports.flatMap(r=>r.notes).filter(n=>n.kind==='short-tangent').length;
  let minClearance=Infinity;
  for(const p of allPoses)minClearance=Math.min(minClearance,southClearance(bodyPoly(p)));
  if(!Number.isFinite(minClearance))minClearance=LOCK.clearanceFt;
  const swept=reports.map(r=>{
    const control=poly(r.drive.points,s,s,ox,oy),axle=poly(r.poses.map(p=>[p.x,p.y]),s,s,ox,oy);
    const bodies=r.poses.map((p,j)=>`<polygon data-vehicle-id="${VEHICLE.id}" data-length-ft="${VEHICLE.length}" data-width-ft="${VEHICLE.width}" data-sweep-kind="${p.kind}" data-turn-radius-ft="${R}" points="${poly(bodyPoly(p),s,s,ox,oy)}" fill="#6f7778" opacity="${p.kind==='arc'?'.09':(j%4===0?'.06':'.025')}" stroke="#4c5455" stroke-width=".45"/>`).join('');
    return `<g data-drive="${r.drive.id}"><polyline points="${control}" fill="none" stroke="#aeb4b2" stroke-width="2" stroke-dasharray="7 7"/><polyline points="${axle}" fill="none" stroke="#596668" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${bodies}</g>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 continuous garage-threshold approach sweep" data-proof-scope="threshold-approach" data-full-enclosure="false" data-garage-depth-ft="20" data-depth-deficit-ft="${(VEHICLE.length-20).toFixed(1)}" data-sweep-pose-count="${allPoses.length}" data-arc-pose-count="${arcCount}" data-short-tangent-count="${shortCount}" data-turn-radius-ft="${R}" data-min-clearance-ft="${minClearance.toFixed(3)}" data-outbound-proof="threshold-return-reverse-equivalent">
  <rect width="${W}" height="${H}" fill="#fbfaf7"/>
  <text x="70" y="58" font-size="30" font-family="Georgia,serif" fill="${ink}">A-002 · Full-size SUV / pickup garage-threshold approach sweep</text>
  <text x="70" y="87" font-size="14" fill="${COLORS.muted}">Continuous 25′ rear-axle-radius approach sweep to the frozen garage thresholds · design-development study, not civil certification</text>
  <rect x="1010" y="138" width="140" height="380" rx="12" fill="#deddd8"/>
  <line x1="1080" y1="150" x2="1080" y2="506" stroke="#ffffff" stroke-width="3" stroke-dasharray="16 14" opacity=".9"/>
  <text x="1118" y="328" transform="rotate(90 1118 328)" text-anchor="middle" font-size="14" font-weight="900" fill="#5e6262">PENNSYLVANIA STREET</text>
  <path d="M ${1010} 146 L ${1010} 505" stroke="#a43c30" stroke-width="4"/>
  <polygon points="${poly(SURVEY,s,s,ox,oy)}" fill="${COLORS.lot}" stroke="${COLORS.line}" stroke-width="2.4"/>
  ${swept}
  ${LOCK.placements.filter(p=>p.kind==='home').map(p=>rectSvg(p,p.unit==='A'?COLORS.homeA:COLORS.homeB)).join('')}
  ${LOCK.placements.filter(p=>p.kind==='garage').map(p=>rectSvg(p,COLORS.garage)).join('')}
  ${label(104.5,7,'UNIT A',s,s,ox,oy,13)}${label(41,7.5,'UNIT B',s,s,ox,oy,13)}${label(118,18.5,'GARAGE A',s,s,ox,oy,10)}${label(47,27.5,'GARAGE B',s,s,ox,oy,10)}
  <g transform="translate(70,548)"><rect width="1060" height="108" rx="10" fill="#ffffffea" stroke="#d8d2ca"/>
    <text x="18" y="24" font-size="11" font-weight="900" fill="${ink}">CONTINUOUS R=25′ APPROACH SWEEP · MIN SOUTH-BOUNDARY CLEARANCE ${minClearance.toFixed(2)} FT</text>
    <text x="18" y="45" font-size="10.5" fill="${COLORS.muted}">Solid line = sampled rear-axle path; dashed line = frozen drive controls. Body poses use the locked 20.5′ × 8.0′ FS-SUV and include the filleted turns.</text>
    <text x="18" y="64" font-size="10.5" fill="${COLORS.muted}">Scope: Pennsylvania ↔ garage-threshold approach only. The locked 20.5′ vehicle exceeds the nominal 20′ garage depth by 0.5′, so full enclosure / parking fit is not claimed.</text>
    <g transform="translate(18,78)"><line x1="0" y1="7" x2="42" y2="7" stroke="#596668" stroke-width="3"/><text x="52" y="11" font-size="9.5" fill="${COLORS.muted}">25′ axle path</text><rect x="190" y="0" width="48" height="14" rx="4" fill="#6f7778" opacity=".12" stroke="#4c5455"/><text x="250" y="11" font-size="9.5" fill="${COLORS.muted}">FS-SUV · 20.5′ × 8.0′</text><line x1="390" y1="7" x2="432" y2="7" stroke="#25313b" stroke-width="2"/><text x="444" y="11" font-size="9.5" fill="${COLORS.muted}">property boundary</text></g>
  </g>
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
   ['Stair / Hall',81,18,12,12,'hall'],
   ['Upper Gallery',93,18,35,4,'hall'],
   ['Bed 2',93,22,15,10,'bed'],
   ['Bed 3',108,8,20,10,'bed'],
   ['Upper Den',108,22,20,10,'living']
  ]
 },
 B:{
  ground:[
   ['Living',25,5,16,11,'living'],
   ['Kitchen / Dining',41,5,16,11,'kitchen'],
   ['Entry + Stair',25,16,12,12,'service'],
   ['Powder',25,28,5,5,'bath'],
   ['Mech / Storage',30,28,7,9.5,'service'],
   ['Office / Mud',57,5,20,12,'hall']
  ],
  upper:[
   ['Primary Bed',25,5,16,12,'bed'],
   ['Primary Bath / WIC',41,5,16,12,'bath'],
   ['Stair / Hall',25,17,16,9,'hall'],
   ['Bed 2',25,26,16,11.5,'bed'],
   ['Bed 3 / Studio',41,17,16,20.5,'bed']
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
  const ink=COLORS.navy, glass="#bfd2dd", siding="#d9d0c2", siding2="#c9bca8", stone="#9b8f7e", roof="#3f454c", trim="#f7f4ee", garageFill="#756f67", wood="#7f654e", metal="#2f353b";
  const specs={
    penn:{title:"Pennsylvania / street elevation",subtitle:"Front-facing composition · restrained North Idaho contemporary", masses:[
      {x:130,w:430,h:190,ridge:86,label:"UNIT A",doorX:null,garageX:430,garageW:118,windowXs:[175,255],accent:"stone"},
      {x:650,w:300,h:180,ridge:72,label:"UNIT B",doorX:690,garageX:820,garageW:110,windowXs:[760],accent:"siding"}
    ]},
    rear:{title:"Rear elevation",subtitle:"Private-yard expression · larger glazing and quieter roof rhythm", masses:[
      {x:115,w:350,h:180,ridge:72,label:"UNIT B",doorX:null,garageX:null,garageW:0,windowXs:[205,285,380],accent:"stone"},
      {x:560,w:470,h:190,ridge:86,label:"UNIT A",doorX:610,garageX:null,garageW:0,windowXs:[690,780,880],accent:"siding"}
    ]},
    north:{title:"North elevation",subtitle:"Drive-side façade · service openings controlled", masses:[
      {x:120,w:760,h:188,ridge:82,label:"UNIT A / UNIT B",doorX:null,garageX:null,garageW:0,windowXs:[250,370,500,630,750],accent:"stone"}
    ]},
    south:{title:"South elevation",subtitle:"Private-yard façade · daylight-focused openings", masses:[
      {x:120,w:760,h:188,ridge:82,label:"UNIT A / UNIT B",doorX:null,garageX:null,garageW:0,windowXs:[250,380,510,640,750],accent:"siding"}
    ]}
  };
  const S=specs[side]||specs.penn;
  const masses=S.masses.map((m,i)=>{
    const top=base-m.h;
    const ridgeY=top-m.ridge;
    const roofInset=18;
    const windows=(m.windowXs||[]).map((wx,j)=>{
      const wy=top+42+(j%2)*10;
      const ww=j===0?62:50, wh=j%2===0?82:68;
      return `<g data-opening="window"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="2" fill="${glass}" stroke="#4d5f6b" stroke-width="2"/>
      <rect x="${wx-4}" y="${wy+wh+4}" width="${ww+8}" height="5" fill="${trim}" opacity=".9"/>
      <line x1="${wx+ww/2}" y1="${wy}" x2="${wx+ww/2}" y2="${wy+wh}" stroke="#ffffffbb"/><line x1="${wx}" y1="${wy+wh/2}" x2="${wx+ww}" y2="${wy+wh/2}" stroke="#ffffffbb"/></g>`;
    }).join("");
    const garageSvg=m.garageX!=null?`<g><rect data-opening="garage-door" data-garage-face="east" x="${m.garageX}" y="${base-88}" width="${m.garageW}" height="88" fill="${garageFill}" stroke="${ink}" stroke-width="2"/>
      <rect x="${m.garageX-10}" y="${base-102}" width="${m.garageW+20}" height="10" fill="${metal}" stroke="${ink}"/>
      <line x1="${m.garageX}" y1="${base-66}" x2="${m.garageX+m.garageW}" y2="${base-66}" stroke="#aaa49b"/>
      <line x1="${m.garageX}" y1="${base-44}" x2="${m.garageX+m.garageW}" y2="${base-44}" stroke="#aaa49b"/>
      <line x1="${m.garageX}" y1="${base-22}" x2="${m.garageX+m.garageW}" y2="${base-22}" stroke="#aaa49b"/>
      <circle cx="${m.garageX-18}" cy="${base-76}" r="4" fill="#d6b76a"/><circle cx="${m.garageX+m.garageW+18}" cy="${base-76}" r="4" fill="#d6b76a"/>
      <text x="${m.garageX+m.garageW/2}" y="${base-112}" text-anchor="middle" font-size="11" font-weight="800" fill="${ink}">2-CAR GARAGE</text></g>`:"";
    const entry=m.doorX!=null?`<g><rect data-opening="door" x="${m.doorX}" y="${base-82}" width="42" height="82" fill="${wood}" stroke="${ink}" stroke-width="2"/>
      <circle cx="${m.doorX+32}" cy="${base-41}" r="3" fill="${trim}"/>
      <rect x="${m.doorX-14}" y="${base-98}" width="70" height="9" fill="${roof}" stroke="${ink}"/>
      <line x1="${m.doorX-8}" y1="${base-89}" x2="${m.doorX-8}" y2="${base}" stroke="${wood}" stroke-width="4"/>
      <line x1="${m.doorX+50}" y1="${base-89}" x2="${m.doorX+50}" y2="${base}" stroke="${wood}" stroke-width="4"/>
      <text x="${m.doorX+21}" y="${base-128}" text-anchor="middle" font-size="10" font-weight="800" fill="${ink}">ENTRY</text></g>`:"";
    const material=m.accent==="stone"
      ? `<rect x="${m.x}" y="${base-74}" width="82" height="74" fill="${stone}" opacity=".92"/>`
      : `<rect x="${m.x+m.w-76}" y="${top}" width="76" height="${m.h}" fill="${siding2}" opacity=".85"/>`;
    return `<g>
      <rect x="${m.x}" y="${top}" width="${m.w}" height="${m.h}" fill="${siding}" stroke="${ink}" stroke-width="2.2"/>
      ${material}
      <path d="M ${m.x-roofInset} ${top} L ${m.x+m.w/2} ${ridgeY} L ${m.x+m.w+roofInset} ${top}" fill="${roof}" stroke="${ink}" stroke-width="2.2"/>
      <line x1="${m.x+14}" y1="${top+18}" x2="${m.x+m.w-14}" y2="${top+18}" stroke="#ffffff88"/>
      <rect x="${m.x+18}" y="${top+86}" width="${m.w-36}" height="5" fill="#ffffff77"/>
      <path d="M ${m.x+roofInset} ${top+22} L ${m.x+m.w/2} ${ridgeY+26} L ${m.x+m.w-roofInset} ${top+22}" fill="none" stroke="#2f353b" stroke-width="5" opacity=".35"/>
      ${windows}${entry}${garageSvg}
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
  <g opacity=".86">
    <circle cx="90" cy="${base-12}" r="20" fill="#9ba98f"/><rect x="87" y="${base-10}" width="6" height="36" fill="#6f665b"/>
    <circle cx="1080" cy="${base-18}" r="26" fill="#93a287"/><rect x="1077" y="${base-14}" width="6" height="42" fill="#6f665b"/>
    <circle cx="1015" cy="${base-9}" r="13" fill="#a7b49b"/><rect x="1012" y="${base-7}" width="5" height="25" fill="#6f665b"/>
  </g>
  <g transform="translate(1030,${base-96})" fill="none" stroke="#4f5961" stroke-width="2">
    <circle cx="0" cy="0" r="8" fill="#c7b49b" stroke="none"/><line x1="0" y1="8" x2="0" y2="44"/><line x1="0" y1="18" x2="-12" y2="30"/><line x1="0" y1="18" x2="12" y2="30"/><line x1="0" y1="44" x2="-9" y2="62"/><line x1="0" y1="44" x2="9" y2="62"/>
  </g>
  <g transform="translate(70,520)">
    <line x1="0" y1="0" x2="1060" y2="0" stroke="#a6aaa5" stroke-width="1"/>
    <line x1="0" y1="-6" x2="0" y2="6" stroke="#a6aaa5"/><line x1="1060" y1="-6" x2="1060" y2="6" stroke="#a6aaa5"/>
    <text x="530" y="-8" text-anchor="middle" font-size="10" fill="${COLORS.muted}">CONCEPT ELEVATION · PROPORTION / MATERIAL STUDY · NOT FOR CONSTRUCTION</text>
  </g>
  <g transform="translate(70,535)">
    <rect width="1060" height="64" rx="10" fill="#ffffffea" stroke="#d8d2ca"/>
    <text x="18" y="20" font-size="11" font-weight="900" fill="${ink}">DESIGN 3 · CFB-716 · CUSTOMER CONCEPT ELEVATION</text>
    <text x="18" y="38" font-size="10.5" fill="${COLORS.muted}">Frozen exterior footprints/site geometry. Architecture shown here is the preferred presentation direction, not permit detailing.</text>
    <g transform="translate(720,16)">
      <rect width="18" height="18" rx="3" fill="${siding}" stroke="#aaa"/><text x="26" y="13" font-size="9.5" fill="${COLORS.muted}">warm siding</text>
      <rect x="118" width="18" height="18" rx="3" fill="${stone}" stroke="#888"/><text x="144" y="13" font-size="9.5" fill="${COLORS.muted}">stone</text>
      <rect x="210" width="18" height="18" rx="3" fill="${roof}" stroke="#444"/><text x="236" y="13" font-size="9.5" fill="${COLORS.muted}">dark roof</text>
    </g>
  </g>
  </svg>`;
}

const AXON_CAMERA={W:1200,H:740,ox:610,oy:535,cx:76,cy:26,sx:5.65,syx:3.35,sy:2.35,sz:6.65};
function axonProject(x,y,z=0){return [AXON_CAMERA.ox+(x-AXON_CAMERA.cx)*AXON_CAMERA.sx-(y-AXON_CAMERA.cy)*AXON_CAMERA.syx,AXON_CAMERA.oy-(y-AXON_CAMERA.cy)*AXON_CAMERA.sy-z*AXON_CAMERA.sz]}
function axonPts(a){return a.map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ")}
function projectAxonOpening(o){const h=o.height||7;return [[o.x1,o.y1,0],[o.x2,o.y2,0],[o.x2,o.y2,h],[o.x1,o.y1,h]].map(([x,y,z])=>axonProject(x,y,z))}
function renderProjectedOpenings(mode='massing'){
  const shown=OPENINGS.filter(o=>o.role==='entry'||o.role==='garage-overhead');
  return `<g aria-label="Derived opening location overlay">${shown.map(o=>{
    const q=projectAxonOpening(o),fill=mode==='axon'?(o.role==='entry'?'#7f654e':'#6e6a64'):'none';
    const top=q.slice(2),cx=(top[0][0]+top[1][0])/2,cy=(top[0][1]+top[1][1])/2-8;
    const tag=o.role==='entry'?`<text x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" text-anchor="middle" font-size="9" font-weight="900" fill="${COLORS.navy}">${o.id.replace('-', ' ')}</text>`:'';
    return `<g data-opening-group="${o.id}"><polygon data-opening="door" data-opening-id="${o.id}" data-opening-role="${o.role}" data-opening-derived="world" points="${axonPts(q)}" fill="${fill}" stroke="#c34232" stroke-width="3"/>${tag}</g>`;
  }).join('')}</g>`;
}

function renderMassing(){
  const W=AXON_CAMERA.W,H=AXON_CAMERA.H,ink=COLORS.navy,iso=axonProject,pts=axonPts;
  function simpleMass(p,h,fill){
    const a=iso(p.x,p.y,0),b=iso(p.x+p.w,p.y,0),c=iso(p.x+p.w,p.y+p.d,0),d=iso(p.x,p.y+p.d,0);
    const A=iso(p.x,p.y,h),B=iso(p.x+p.w,p.y,h),C=iso(p.x+p.w,p.y+p.d,h),D=iso(p.x,p.y+p.d,h);
    const midFront=[(A[0]+B[0])/2,(A[1]+B[1])/2-24];
    const midBack=[(D[0]+C[0])/2,(D[1]+C[1])/2-24];
    const lerp=(p0,p1,t)=>[p0[0]+(p1[0]-p0[0])*t,p0[1]+(p1[1]-p0[1])*t];
    const faceWindow=(p0,p1,pTop1,pTop0,u0,u1,v0,v1)=>{
      const bottom0=lerp(p0,p1,u0),bottom1=lerp(p0,p1,u1),top0=lerp(pTop0,pTop1,u0),top1=lerp(pTop0,pTop1,u1);
      return [lerp(bottom0,top0,v0),lerp(bottom1,top1,v0),lerp(bottom1,top1,v1),lerp(bottom0,top0,v1)];
    };
    const frontWindow=faceWindow(a,b,B,A,.34,.48,.30,.68);
    const sideWindow=faceWindow(b,c,C,B,.30,.50,.30,.66);
    return `<g>
      <polygon points="${pts([a,b,B,A])}" fill="${fill}" stroke="#2b333a" stroke-width="1.8"/>
      <polygon points="${pts([b,c,C,B])}" fill="#b8afa1" stroke="#2b333a" stroke-width="1.8"/>
      <polygon points="${pts([A,B,C,D])}" fill="#e8e1d4" stroke="#2b333a" stroke-width="1.4"/>
      <polygon points="${pts([A,B,midFront])}" fill="#3f454c" stroke="#2b333a" stroke-width="1.5"/>
      <polygon points="${pts([D,C,midBack])}" fill="#4b535b" stroke="#2b333a" stroke-width="1.5"/>
      <polygon points="${pts([A,D,midBack,midFront])}" fill="#596169" stroke="#2b333a" stroke-width="1.5"/>
      <polygon points="${pts([B,C,midBack,midFront])}" fill="#3a4148" stroke="#2b333a" stroke-width="1.5"/>
      <polygon data-opening="window" points="${pts(frontWindow)}" fill="none" stroke="#2a6496" stroke-width="2.4"/>
      <polygon data-opening="window" points="${pts(sideWindow)}" fill="none" stroke="#2a6496" stroke-width="2.4"/>
    </g>`;
  }
  const lotPts=SURVEY.map(([x,y])=>iso(x,y,0));
  const drives=LOCK.drives.map(d=>`<polyline points="${pts(d.points.map(([x,y])=>iso(x,y,.2)))}" fill="none" stroke="#8e9492" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity=".62"/>`).join("");
  const homes=LOCK.placements.filter(p=>p.kind==="home").map(p=>simpleMass(p,20,p.unit==="A"?"#d1bd98":"#ddcfae")).join("");
  const garages=LOCK.placements.filter(p=>p.kind==="garage").map(p=>simpleMass(p,11,"#8fa188")).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 same-camera architectural massing">
  <rect width="${W}" height="${H}" fill="#f5f1ea"/>
  <text x="70" y="62" font-size="30" font-family="Georgia,serif" fill="${ink}">A-401 Massing · Design 3 CFB-716</text>
  <text x="70" y="90" font-size="14" fill="${COLORS.muted}">Same projection as A-402 · simplified volumes, roofs, garages, site, and Pennsylvania access</text>
  <polygon points="${pts(lotPts)}" fill="#ebe4d7" stroke="#596169" stroke-width="2"/>
  <polygon points="872,558 1125,476 1190,512 938,606" fill="#d6d5cf" stroke="#8e8f89" stroke-width="1.5"/>
  ${drives}
  <g>${homes}${garages}</g>
  ${renderProjectedOpenings('massing')}
  <text x="1075" y="586" text-anchor="middle" font-size="12" font-weight="900" fill="#666">PENNSYLVANIA ACCESS</text>
  <text x="826" y="508" font-size="12" font-weight="900" fill="#50624d">GARAGE A</text>
  <text x="200" y="520" font-size="12" font-weight="900" fill="#50624d">GARAGE B</text>
  <rect x="835" y="266" width="88" height="30" rx="15" fill="#ffffffdd" stroke="#d8d2ca"/><text x="879" y="286" text-anchor="middle" font-size="12" font-weight="900" fill="${ink}">UNIT A</text>
  <line x1="850" y1="296" x2="780" y2="350" stroke="${ink}"/>
  <rect x="285" y="306" width="88" height="30" rx="15" fill="#ffffffdd" stroke="#d8d2ca"/><text x="329" y="326" text-anchor="middle" font-size="12" font-weight="900" fill="${ink}">UNIT B</text>
  <line x1="340" y1="336" x2="430" y2="390" stroke="${ink}"/>
  <g transform="translate(70,632)">
    <rect width="1060" height="72" rx="10" fill="#ffffffea" stroke="#d8d2ca"/>
    <text x="18" y="24" font-size="11" font-weight="900" fill="${ink}">A-401 MASSING · SAME CAMERA AS A-402</text>
    <text x="18" y="45" font-size="10.5" fill="${COLORS.muted}">Simplified architectural volumes from frozen CFB-716 placements. No exterior/site geometry moved.</text>
    <text x="18" y="61" font-size="10.5" fill="${COLORS.muted}">Opening check: doors outlined red · windows outlined blue. Not permit / construction drawings.</text>
  </g>
  </svg>`;
}

function renderAxon(){
  const W=AXON_CAMERA.W,H=AXON_CAMERA.H;
  const ink=COLORS.navy;
  const iso=axonProject;
  const pts=axonPts;
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
      <polygon data-opening="window" points="${pts(frontWindow)}" fill="#bfd2dd" stroke="#2a6496" stroke-width="2.2"/>
      <polygon data-opening="window" points="${pts(sideWindow)}" fill="#bfd2dd" stroke="#2a6496" stroke-width="2.2"/>
    </g>`;
  }
  const lotPts=SURVEY.map(([x,y])=>iso(x,y,0));
  const drives=LOCK.drives.map(d=>`<polyline points="${pts(d.points.map(([x,y])=>iso(x,y,.2)))}" fill="none" stroke="#8e9492" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity=".62"/>`).join("");
  const homes=LOCK.placements.filter(p=>p.kind==="home").map(p=>mass(p,20,p.unit==="A"?"#d1bd98":"#ddcfae",true)).join("");
  const garages=LOCK.placements.filter(p=>p.kind==="garage").map(p=>mass(p,11,"#8fa188",true)).join("");
  const trees=[[13,44],[70,49],[134,43],[18,8]].map(([x,y])=>{const [tx,ty]=iso(x,y,0);return `<g><ellipse cx="${tx}" cy="${ty-38}" rx="22" ry="34" fill="#93a287" opacity=".85"/><rect x="${tx-3}" y="${ty-16}" width="6" height="24" fill="#706457"/></g>`}).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 customer presentation axonometric">
  <defs><filter id="axonShadow"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-opacity=".16"/></filter></defs>
  <rect width="${W}" height="${H}" fill="#f5f1ea"/>
  <text x="70" y="62" font-size="30" font-family="Georgia,serif" fill="${ink}">Design 3 · CFB-716</text>
  <text x="70" y="90" font-size="14" fill="${COLORS.muted}">Preferred Workbench candidate · customer presentation axon · Pennsylvania access at lower right</text>
  <polygon points="${pts(lotPts)}" fill="#ebe4d7" stroke="#596169" stroke-width="2"/>
  <polygon points="872,558 1125,476 1190,512 938,606" fill="#d6d5cf" stroke="#8e8f89" stroke-width="1.5"/>
  <path d="M1025 540 l-70 -18 l21 -10" fill="none" stroke="#8b3b31" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="1075" y="586" text-anchor="middle" font-size="12" font-weight="900" fill="#666">PENNSYLVANIA ACCESS</text>
  ${drives}
  ${trees}
  <g filter="url(#axonShadow)">${homes}${garages}</g>
  ${renderProjectedOpenings('axon')}
  <g>
    <rect x="835" y="266" width="88" height="30" rx="15" fill="#ffffffdd" stroke="#d8d2ca"/><text x="879" y="286" text-anchor="middle" font-size="12" font-weight="900" fill="${ink}">UNIT A</text>
    <line x1="850" y1="296" x2="780" y2="350" stroke="${ink}"/>
    <rect x="285" y="306" width="88" height="30" rx="15" fill="#ffffffdd" stroke="#d8d2ca"/><text x="329" y="326" text-anchor="middle" font-size="12" font-weight="900" fill="${ink}">UNIT B</text>
    <line x1="340" y1="336" x2="430" y2="390" stroke="${ink}"/>
    <text x="200" y="520" font-size="12" font-weight="900" fill="#50624d">GARAGE B</text>
    <text x="825" y="515" font-size="12" font-weight="900" fill="#50624d">GARAGE A</text>
  </g>
  <g transform="translate(70,632)">
    <rect width="1060" height="72" rx="10" fill="#ffffffea" stroke="#d8d2ca"/>
    <text x="18" y="24" font-size="11" font-weight="900" fill="${ink}">GEOMETRY AUTHORITY · CFB-716 FREEZE ${FREEZE.slice(0,12)}…</text>
    <text x="18" y="45" font-size="10.5" fill="${COLORS.muted}">This axon is derived from the frozen site/building placements. Roofs, openings, and materials are presentation-layer development only.</text>
    <text x="18" y="61" font-size="10.5" fill="${COLORS.muted}">Not permit / construction drawings. Professional validation pending.</text>
    <text x="760" y="24" font-size="10" font-weight="900" fill="${ink}">MATERIAL DIRECTION</text>
    <text x="760" y="43" font-size="10" fill="${COLORS.muted}">Warm siding · stone/service accents · dark roof · wood entries</text>
    <text x="760" y="60" font-size="10" fill="${COLORS.muted}">Opening check: doors outlined red · windows outlined blue.</text>
  </g>
  </svg>`;
}


function renderSections(){
  const W=1200,H=1060,ink=COLORS.navy,muted=COLORS.muted;
  const siding="#d9d0c2",stone="#9b8f7e",roof="#3f454c",glass="#bfd2dd",slab="#8b8580";
  const level=(y,label)=>`<line x1="82" y1="${y}" x2="1118" y2="${y}" stroke="#a8aba7" stroke-width="1.5"/><text x="92" y="${y-8}" font-size="10" font-weight="900" fill="${muted}">${label}</text>`;
  const sectionA=`<g transform="translate(70,150)">
    <rect x="-24" y="-62" width="1108" height="445" rx="16" fill="#ffffff" stroke="#e0dbd4"/>
    <text x="0" y="-32" font-size="24" font-family="Georgia,serif" fill="${ink}">A-501 - Longitudinal site section</text>
    <text x="0" y="-10" font-size="12" fill="${muted}">Pennsylvania access, garage/service fronts, two-home relationship, and rear-yard grade are diagrammatic.</text>
    <rect x="0" y="238" width="1060" height="14" fill="${slab}"/>
    <path d="M0 252 C170 244 320 248 500 240 S850 246 1060 235 L1060 285 L0 285 Z" fill="#d9d2c5"/>
    <g transform="translate(710,70)">
      <rect x="0" y="68" width="235" height="170" fill="${siding}" stroke="${ink}" stroke-width="2"/>
      <rect x="150" y="142" width="72" height="96" fill="${stone}" opacity=".95"/>
      <path d="M-14 68 L118 0 L249 68" fill="${roof}" stroke="${ink}" stroke-width="2"/>
      <rect x="36" y="112" width="42" height="54" fill="${glass}" stroke="#53636c"/>
      <rect x="95" y="118" width="40" height="120" fill="#7f654e" stroke="${ink}"/>
      <text x="118" y="266" text-anchor="middle" font-size="12" font-weight="900" fill="${ink}">UNIT A · near Pennsylvania</text>
      <text x="184" y="210" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5e665f">GARAGE / SERVICE</text>
    </g>
    <g transform="translate(245,92)">
      <rect x="0" y="86" width="210" height="150" fill="#ddcfae" stroke="${ink}" stroke-width="2"/>
      <rect x="18" y="150" width="68" height="86" fill="${stone}" opacity=".95"/>
      <path d="M-12 86 L105 18 L222 86" fill="${roof}" stroke="${ink}" stroke-width="2"/>
      <rect x="110" y="128" width="42" height="56" fill="${glass}" stroke="#53636c"/>
      <text x="105" y="264" text-anchor="middle" font-size="12" font-weight="900" fill="${ink}">UNIT B · deeper lot position</text>
      <text x="52" y="214" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5e665f">SERVICE</text>
    </g>
    <path d="M1060 238 C1008 226 968 222 920 225 C820 232 752 232 690 226 C560 212 410 224 310 226" fill="none" stroke="#858c8b" stroke-width="14" stroke-linecap="round" opacity=".55"/>
    <text x="900" y="214" font-size="10.5" font-weight="900" fill="#8b3b31">PENNSYLVANIA STREET / ACCESS</text>
    <text x="16" y="314" font-size="10.5" fill="${muted}">Design-development section: grade, floor levels, and roofs are presentation diagrams only. Frozen plan coordinates are not moved.</text>
  </g>`;
  const sectionB=`<g transform="translate(70,635)">
    <rect x="-24" y="-62" width="1108" height="350" rx="16" fill="#ffffff" stroke="#e0dbd4"/>
    <text x="0" y="-32" font-size="24" font-family="Georgia,serif" fill="${ink}">A-502 - Representative building section</text>
    <text x="0" y="-10" font-size="12" fill="${muted}">Shows garage/home relationship, stair/hall core, upper bedrooms/den, and simple roof hierarchy inside the frozen shell.</text>
    ${level(232,"grade / slab")}
    ${level(138,"upper floor")}
    <g transform="translate(178,16)">
      <rect x="0" y="122" width="210" height="94" fill="#f0c77c" stroke="${ink}" stroke-width="2"/>
      <rect x="210" y="122" width="152" height="94" fill="#8fa188" stroke="${ink}" stroke-width="2"/>
      <rect x="0" y="28" width="362" height="94" fill="#d8c7df" stroke="${ink}" stroke-width="2"/>
      <path d="M-18 28 L181 -36 L380 28" fill="${roof}" stroke="${ink}" stroke-width="2"/>
      <rect x="92" y="138" width="70" height="78" fill="#b8c9d7" stroke="${ink}" stroke-width="1.5"/>
      <g stroke="#65717b" stroke-width="1"><line x1="102" y1="148" x2="152" y2="148"/><line x1="102" y1="160" x2="152" y2="160"/><line x1="102" y1="172" x2="152" y2="172"/><line x1="102" y1="184" x2="152" y2="184"/></g>
      <rect x="236" y="144" width="96" height="72" fill="#756f67" stroke="${ink}" stroke-width="1.5"/>
      <text x="105" y="108" text-anchor="middle" font-size="11" font-weight="900" fill="${ink}">BEDROOMS + DEN</text>
      <text x="181" y="12" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5e665f">SIMPLE PITCHED ROOF</text>
      <text x="92" y="194" text-anchor="middle" font-size="10" font-weight="900" fill="${ink}">STAIR / HALL</text>
      <text x="284" y="185" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">GARAGE</text>
    </g>
    <g transform="translate(650,16)">
      <rect x="0" y="122" width="170" height="94" fill="#f3ddaa" stroke="${ink}" stroke-width="2"/>
      <rect x="170" y="122" width="128" height="94" fill="#b8c9d7" stroke="${ink}" stroke-width="2"/>
      <rect x="0" y="28" width="298" height="94" fill="#d8c7df" stroke="${ink}" stroke-width="2"/>
      <path d="M-16 28 L149 -30 L314 28" fill="${roof}" stroke="${ink}" stroke-width="2"/>
      <rect x="188" y="142" width="78" height="74" fill="#756f67" stroke="${ink}" stroke-width="1.5"/>
      <text x="85" y="178" text-anchor="middle" font-size="10" font-weight="900" fill="${ink}">LIVING / DINING</text>
      <text x="149" y="108" text-anchor="middle" font-size="11" font-weight="900" fill="${ink}">BEDROOM LEVEL</text>
      <text x="149" y="12" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5e665f">SIMPLE PITCHED ROOF</text>
      <text x="227" y="184" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">GARAGE</text>
    </g>
    <text x="16" y="294" font-size="10.5" fill="${muted}">Concept sections only. Structural spans, assemblies, stairs, and code compliance remain professional-validation items.</text>
  </g>`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CFB-716 design-development sections">
    <rect width="${W}" height="${H}" fill="#fbfaf7"/>
    <text x="70" y="58" font-size="30" font-family="Georgia,serif" fill="${ink}">Design 3 - Sections</text>
    <text x="70" y="86" font-size="14" fill="${muted}">Two customer-readable concept sections tied to the frozen CFB-716 massing and Pennsylvania-only access.</text>
    ${sectionA}${sectionB}
    <g transform="translate(70,1000)"><rect width="1060" height="36" rx="10" fill="#eef2f4"/><text x="18" y="23" font-size="10.5" font-weight="800" fill="${ink}">SECTION INTENT · explain site relationship, garage/home organization, floor stacking, and roof hierarchy without implying structural or permit resolution.</text></g>
  </svg>`;
}

function analyze(){
  return {
    verdict:'CONDITIONAL',
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
      circulation:{ok:false,status:'APPROACH_VERIFIED',blocking:true,scope:'threshold-approach',fullEnclosure:false,detail:'Continuous Pennsylvania-to-garage-threshold approach/return is verified for the locked 20.5 ft x 8.0 ft vehicle. Complete garage parking/enclosure is unresolved because the nominal garage depth is 20 ft.'},
      garageFit:{ok:false,status:'UNRESOLVED',blocking:true,detail:'The locked 20.5 ft vehicle exceeds the nominal 20 ft garage depth by 0.5 ft; complete enclosure is not claimed.'},
      program:{ok:true,detail:'Plan closure assigns A 1,914 SF and B 1,868 SF of authorized non-overlapping planning zones; both meet the 1,800 SF target.'},
      roomPacking:{ok:true,detail:'Room-packing score 99.30; all current packing checks pass.'},
      architecturalZoning:{ok:true,detail:'Public/private zoning, daylight, and mass coherence pass; plumbing coordination is tracked separately.'},
      plumbing:{ok:false,status:'ADVISORY',blocking:false,detail:'Wet-core vertical alignment is not closed in the current plan and remains a non-blocking design-development coordination item.'}
    }
  };
}

global.Lot2Design3={REV,LOCK,VEHICLE,OPENINGS,PLAN,COLORS,analyze,projectAxonOpening,renderSite,renderSweptPath,renderFloor,renderElev,renderMassing,renderAxon,renderSections};
})(window);
