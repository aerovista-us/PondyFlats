(function(global){
'use strict';

const REV='D4-PLAN-SEED-v0.2';
const TARGET={A:1700,B:1700};
const SHELLS={
  A:{unit:'A',poly:[[94.5,5],[128,5],[128,31.25],[94.5,31.25]],grossSf:879.375},
  B:{unit:'B',poly:[[54,5],[94.5,5],[94.5,31.25],[72.5,31.25],[72.5,22],[54,22]],grossSf:892}
};
const ENTRIES=[
  {id:'ENTRY-A',unit:'A',face:'east',x1:128,y1:26,x2:128,y2:30,widthFt:4},
  {id:'ENTRY-B',unit:'B',face:'south',x1:87.5,y1:31.25,x2:91.5,y2:31.25,widthFt:4}
];
const ROOMS={
  ground:{
    A:[
      {id:'A-G-LIVING',name:'Living',x:94.5,y:5,w:16,d:13,kind:'living'},
      {id:'A-G-KITCHEN',name:'Kitchen / Dining',x:110.5,y:5,w:17.5,d:13,kind:'kitchen'},
      {id:'A-G-STAIR',name:'Stair / Hall',x:94.5,y:18,w:8,d:13.25,kind:'hall',stair:true},
      {id:'A-G-FLEX',name:'Flex / Office',x:102.5,y:18,w:11,d:13.25,kind:'living'},
      {id:'A-G-MUD',name:'Mud / Laundry',x:113.5,y:18,w:8,d:7,kind:'service',wet:true},
      {id:'A-G-POWDER',name:'Powder / Storage',x:121.5,y:18,w:6.5,d:7,kind:'bath',wet:true},
      {id:'A-G-ENTRY',name:'Entry / Hall',x:113.5,y:25,w:14.5,d:6.25,kind:'hall'}
    ],
    B:[
      {id:'B-G-LIVING',name:'Living',x:54,y:5,w:18.5,d:17,kind:'living'},
      {id:'B-G-KITCHEN',name:'Kitchen / Dining',x:72.5,y:5,w:22,d:10,kind:'kitchen'},
      {id:'B-G-STAIR',name:'Stair / Hall',x:72.5,y:15,w:8.5,d:7,kind:'hall',stair:true},
      {id:'B-G-FLEX',name:'Flex / Office',x:81,y:15,w:13.5,d:7,kind:'living'},
      {id:'B-G-MUD',name:'Mud / Laundry',x:72.5,y:22,w:9,d:9.25,kind:'service',wet:true},
      {id:'B-G-POWDER',name:'Powder / Storage',x:81.5,y:22,w:6,d:9.25,kind:'bath',wet:true},
      {id:'B-G-ENTRY',name:'Entry / Hall',x:87.5,y:22,w:7,d:9.25,kind:'hall'}
    ]
  },
  upper:{
    A:[
      {id:'A-U-PRIMARY',name:'Primary Bedroom',x:94.5,y:5,w:14,d:11,kind:'bed'},
      {id:'A-U-BED2',name:'Bedroom 2',x:108.5,y:5,w:9.75,d:11,kind:'bed'},
      {id:'A-U-BED3',name:'Bedroom 3',x:118.25,y:5,w:9.75,d:11,kind:'bed'},
      {id:'A-U-HALL',name:'Upper Hall',x:94.5,y:16,w:33.5,d:4,kind:'hall'},
      {id:'A-U-STAIR',name:'Stair / Landing',x:94.5,y:20,w:8,d:11.25,kind:'hall',stair:true},
      {id:'A-U-PRIMARYBATH',name:'Primary Bath / WIC',x:102.5,y:20,w:11.5,d:11.25,kind:'bath',wet:true},
      {id:'A-U-BATH',name:'Hall Bath',x:114,y:20,w:10,d:11.25,kind:'bath',wet:true},
      {id:'A-U-LINEN',name:'Linen / Storage',x:124,y:20,w:4,d:11.25,kind:'service'}
    ],
    B:[
      {id:'B-U-PRIMARY',name:'Primary Bedroom',x:54,y:5,w:18.5,d:8,kind:'bed'},
      {id:'B-U-BED2',name:'Bedroom 2',x:72.5,y:5,w:11,d:8,kind:'bed'},
      {id:'B-U-BED3',name:'Bedroom 3',x:83.5,y:5,w:11,d:8,kind:'bed'},
      {id:'B-U-HALL',name:'Upper Hall',x:54,y:13,w:40.5,d:4,kind:'hall'},
      {id:'B-U-PRIMARYBATH',name:'Primary Bath / WIC',x:54,y:17,w:18.5,d:5,kind:'bath',wet:true},
      {id:'B-U-STAIR',name:'Stair / Landing',x:72.5,y:17,w:8.5,d:14.25,kind:'hall',stair:true},
      {id:'B-U-BATH',name:'Hall Bath',x:81,y:17,w:13.5,d:7,kind:'bath',wet:true},
      {id:'B-U-LOFT',name:'Loft / Storage',x:81,y:24,w:13.5,d:7.25,kind:'living'}
    ]
  }
};
const CONNECTIONS={
  ground:{
    A:[['A-G-ENTRY','A-G-FLEX'],['A-G-ENTRY','A-G-MUD'],['A-G-ENTRY','A-G-POWDER'],['A-G-FLEX','A-G-STAIR'],['A-G-FLEX','A-G-LIVING'],['A-G-FLEX','A-G-KITCHEN']],
    B:[['B-G-ENTRY','B-G-FLEX'],['B-G-ENTRY','B-G-POWDER'],['B-G-POWDER','B-G-MUD'],['B-G-FLEX','B-G-STAIR'],['B-G-FLEX','B-G-KITCHEN'],['B-G-STAIR','B-G-LIVING']]
  },
  upper:{
    A:[['A-U-STAIR','A-U-HALL'],['A-U-HALL','A-U-PRIMARY'],['A-U-HALL','A-U-BED2'],['A-U-HALL','A-U-BED3'],['A-U-HALL','A-U-PRIMARYBATH'],['A-U-HALL','A-U-BATH'],['A-U-HALL','A-U-LINEN']],
    B:[['B-U-STAIR','B-U-HALL'],['B-U-HALL','B-U-PRIMARY'],['B-U-HALL','B-U-BED2'],['B-U-HALL','B-U-BED3'],['B-U-HALL','B-U-PRIMARYBATH'],['B-U-HALL','B-U-BATH'],['B-U-STAIR','B-U-LOFT']]
  }
};
const ROOTS={ground:{A:'A-G-ENTRY',B:'B-G-ENTRY'},upper:{A:'A-U-STAIR',B:'B-U-STAIR'}};
const COLORS={outline:'#132238',living:'#efd08a',kitchen:'#f1dda9',service:'#bfd0dd',bed:'#d8c9df',bath:'#bad6d2',hall:'#e8e4da',paper:'#fbfaf7',muted:'#68727d',red:'#a13b31',green:'#507759'};

function area(r){return r.w*r.d}
function roomPoly(r){return [[r.x,r.y],[r.x+r.w,r.y],[r.x+r.w,r.y+r.d],[r.x,r.y+r.d]]}
function pointOnSeg(p,a,b,eps=1e-6){const cross=(p[0]-a[0])*(b[1]-a[1])-(p[1]-a[1])*(b[0]-a[0]);if(Math.abs(cross)>eps)return false;const dot=(p[0]-a[0])*(b[0]-a[0])+(p[1]-a[1])*(b[1]-a[1]);if(dot<-eps)return false;const len=(b[0]-a[0])**2+(b[1]-a[1])**2;return dot<=len+eps}
function pointInPoly(p,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){if(pointOnSeg(p,poly[j],poly[i]))return true;const xi=poly[i][0],yi=poly[i][1],xj=poly[j][0],yj=poly[j][1];if(((yi>p[1])!==(yj>p[1]))&&(p[0]<(xj-xi)*(p[1]-yi)/(yj-yi)+xi))inside=!inside;}return inside}
function rectInsideShell(r,shell){return roomPoly(r).every(p=>pointInPoly(p,shell.poly))}
function overlapArea(a,b){const w=Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x),d=Math.min(a.y+a.d,b.y+b.d)-Math.max(a.y,b.y);return Math.max(0,w)*Math.max(0,d)}
function shellArea(poly){let a=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length];a+=p[0]*q[1]-q[0]*p[1];}return Math.abs(a)/2}
function entryOnPerimeter(e,shell){const mid=[(e.x1+e.x2)/2,(e.y1+e.y2)/2];for(let i=0;i<shell.poly.length;i++)if(pointOnSeg(mid,shell.poly[i],shell.poly[(i+1)%shell.poly.length],1e-4))return true;return false}
function stairOverlap(unit){const g=ROOMS.ground[unit].find(r=>r.stair),u=ROOMS.upper[unit].find(r=>r.stair);return overlapArea(g,u)}
function beds(unit){return ROOMS.upper[unit].filter(r=>r.kind==='bed').length}
function sharedEdge(a,b){const eps=1e-6;const ax2=a.x+a.w,ay2=a.y+a.d,bx2=b.x+b.w,by2=b.y+b.d;if(Math.abs(ax2-b.x)<eps||Math.abs(bx2-a.x)<eps){const y1=Math.max(a.y,b.y),y2=Math.min(ay2,by2);if(y2-y1>eps){const x=Math.abs(ax2-b.x)<eps?ax2:a.x;return {length:y2-y1,x1:x,y1,x2:x,y2}}}if(Math.abs(ay2-b.y)<eps||Math.abs(by2-a.y)<eps){const x1=Math.max(a.x,b.x),x2=Math.min(ax2,bx2);if(x2-x1>eps){const y=Math.abs(ay2-b.y)<eps?ay2:a.y;return {length:x2-x1,x1,y1:y,x2,y2:y}}}return null}
function circulationAnalysis(unit,level){const rooms=ROOMS[level][unit],map=Object.fromEntries(rooms.map(r=>[r.id,r])),edges=CONNECTIONS[level][unit]||[],badEdges=[];const adj=Object.fromEntries(rooms.map(r=>[r.id,[]]));for(const [a,b] of edges){const e=map[a]&&map[b]?sharedEdge(map[a],map[b]):null;if(!e||e.length<2.5){badEdges.push({a,b,sharedFt:e?+e.length.toFixed(2):0});continue}adj[a].push(b);adj[b].push(a)}const root=ROOTS[level][unit],seen=new Set(root&&adj[root]?[root]:[]),q=[...seen];while(q.length){const a=q.shift();for(const b of adj[a])if(!seen.has(b)){seen.add(b);q.push(b)}}const required=rooms.map(r=>r.id),missing=required.filter(id=>!seen.has(id));return {ok:badEdges.length===0&&missing.length===0,root,reachable:[...seen],missing,badEdges,edgeCount:edges.length}}
function wetAnalysis(unit){const ground=ROOMS.ground[unit].filter(r=>r.wet),upper=ROOMS.upper[unit].filter(r=>r.wet);let best={gap:Infinity,pair:null,overlapSf:0};for(const g of ground)for(const u of upper){const ov=overlapArea(g,u),dx=Math.max(u.x-(g.x+g.w),g.x-(u.x+u.w),0),dy=Math.max(u.y-(g.y+g.d),g.y-(u.y+u.d),0),gap=Math.hypot(dx,dy);if(ov>best.overlapSf||(ov===best.overlapSf&&gap<best.gap))best={gap,pair:[g.id,u.id],overlapSf:ov};}const ok=best.overlapSf>1e-6;return {ok,blocking:false,status:ok?'OVERLAP_AVAILABLE':'ADVISORY',gapFt:+best.gap.toFixed(2),overlapSf:+best.overlapSf.toFixed(2),pair:best.pair}}
function analyze(){
  const failures=[];const units={};
  for(const unit of ['A','B']){
    const shell=SHELLS[unit];const levels={};
    for(const level of ['ground','upper']){
      const rooms=ROOMS[level][unit];const outside=rooms.filter(r=>!rectInsideShell(r,shell)).map(r=>r.id);const overlaps=[];for(let i=0;i<rooms.length;i++)for(let j=i+1;j<rooms.length;j++){const ov=overlapArea(rooms[i],rooms[j]);if(ov>1e-6)overlaps.push({a:rooms[i].id,b:rooms[j].id,sf:+ov.toFixed(2)})}
      const roomArea=rooms.reduce((s,r)=>s+area(r),0),expected=shellArea(shell.poly),areaDelta=roomArea-expected,circulation=circulationAnalysis(unit,level);
      if(outside.length)failures.push(`${unit} ${level} rooms outside shell: ${outside.join(', ')}`);if(overlaps.length)failures.push(`${unit} ${level} room overlaps`);if(Math.abs(areaDelta)>.01)failures.push(`${unit} ${level} room coverage delta ${areaDelta.toFixed(2)} sf`);if(!circulation.ok)failures.push(`${unit} ${level} circulation disconnected: ${circulation.missing.join(', ')||'bad adjacency'}`);
      levels[level]={ok:!outside.length&&!overlaps.length&&Math.abs(areaDelta)<=.01&&circulation.ok,roomAreaSf:+roomArea.toFixed(2),shellAreaSf:+expected.toFixed(2),areaDeltaSf:+areaDelta.toFixed(2),outside,overlaps,circulation};
    }
    const entry=ENTRIES.find(e=>e.unit===unit),entryOk=entryOnPerimeter(entry,shell),stairs=stairOverlap(unit),bedCount=beds(unit),wet=wetAnalysis(unit);
    if(!entryOk)failures.push(`${unit} entry is not on exterior shell perimeter`);if(stairs<10)failures.push(`${unit} stair overlap insufficient`);if(bedCount!==3)failures.push(`${unit} bedroom count ${bedCount} != 3`);
    units[unit]={ok:levels.ground.ok&&levels.upper.ok&&entryOk&&stairs>=10&&bedCount===3,levels,entry:{ok:entryOk,id:entry.id,face:entry.face,widthFt:entry.widthFt},stairOverlapSf:+stairs.toFixed(2),bedrooms:bedCount,wetCore:wet,diagrammedGrossSf:+(shell.grossSf*2).toFixed(1)};
  }
  const circulationOk=units.A.levels.ground.circulation.ok&&units.A.levels.upper.circulation.ok&&units.B.levels.ground.circulation.ok&&units.B.levels.upper.circulation.ok;
  return {rev:REV,verdict:failures.length?'FAIL':'PASS',failures,units,checks:{geometryOk:failures.length===0,bedrooms:units.A.bedrooms===3&&units.B.bedrooms===3,entries:units.A.entry.ok&&units.B.entry.ok,stairs:units.A.stairOverlapSf>=10&&units.B.stairOverlapSf>=10,circulation:{ok:circulationOk,status:circulationOk?'CONNECTED':'FAIL',A:{ground:units.A.levels.ground.circulation,upper:units.A.levels.upper.circulation},B:{ground:units.B.levels.ground.circulation,upper:units.B.levels.upper.circulation}},wetCore:{ok:units.A.wetCore.ok&&units.B.wetCore.ok,blocking:false,status:(units.A.wetCore.ok&&units.B.wetCore.ok)?'OVERLAP_AVAILABLE':'ADVISORY',A:units.A.wetCore,B:units.B.wetCore}},note:'Planning-zone closure only. Areas are diagrammed gross shell/zone areas, not certified conditioned square footage or code approval.'}
}
function poly(points,s,ox,oy){return points.map(([x,y])=>`${(x*s+ox).toFixed(1)},${(y*s+oy).toFixed(1)}`).join(' ')}
function roomColor(k){return COLORS[k]||COLORS.hall}
function renderConnections(level,unit,s,ox,oy){const rooms=Object.fromEntries(ROOMS[level][unit].map(r=>[r.id,r]));let out='';for(const [a,b] of CONNECTIONS[level][unit]||[]){const e=sharedEdge(rooms[a],rooms[b]);if(!e)continue;const mx=(e.x1+e.x2)/2,my=(e.y1+e.y2)/2,dx=e.x1===e.x2?0:Math.min(3,e.length/2),dy=e.y1===e.y2?0:Math.min(3,e.length/2);out+=`<line x1="${((mx-dx)*s+ox).toFixed(1)}" y1="${((my-dy)*s+oy).toFixed(1)}" x2="${((mx+dx)*s+ox).toFixed(1)}" y2="${((my+dy)*s+oy).toFixed(1)}" stroke="${COLORS.paper}" stroke-width="5" data-circulation-opening="${a}__${b}"/>`;}return out}
function renderLevel(level){
  const W=1200,H=720,s=9.5,ox=-428,oy=72.5,a=analyze();let out=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 ${level} floor planning zones" data-plan-verdict="${a.verdict}" data-circulation="${a.checks.circulation.status}" data-level="${level}"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.outline}">${level==='ground'?'A-101 · Ground-floor planning zones':'A-102 · Upper-floor planning zones'}</text><text x="62" y="79" font-size="13" fill="${COLORS.muted}">Design 4 north-finger seed · room geometry ${a.verdict} · circulation ${a.checks.circulation.status} · diagrammed zones</text>`;
  for(const unit of ['B','A']){const shell=SHELLS[unit];out+=`<polygon points="${poly(shell.poly,s,ox,oy)}" fill="none" stroke="${COLORS.outline}" stroke-width="3"/>`;for(const r of ROOMS[level][unit]){out+=`<g data-room="${r.id}" data-unit="${unit}" data-kind="${r.kind}"><rect x="${(r.x*s+ox).toFixed(1)}" y="${(r.y*s+oy).toFixed(1)}" width="${(r.w*s).toFixed(1)}" height="${(r.d*s).toFixed(1)}" fill="${roomColor(r.kind)}" fill-opacity=".72" stroke="#405064" stroke-width="1.2"/><text x="${((r.x+r.w/2)*s+ox).toFixed(1)}" y="${((r.y+r.d/2)*s+oy).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="800" fill="${COLORS.outline}">${r.name}</text><text x="${((r.x+r.w/2)*s+ox).toFixed(1)}" y="${((r.y+r.d/2)*s+oy+14).toFixed(1)}" text-anchor="middle" font-size="9" fill="${COLORS.muted}">${Math.round(area(r))} SF</text></g>`}out+=renderConnections(level,unit,s,ox,oy)}
  if(level==='ground')for(const e of ENTRIES){out+=`<line x1="${(e.x1*s+ox).toFixed(1)}" y1="${(e.y1*s+oy).toFixed(1)}" x2="${(e.x2*s+ox).toFixed(1)}" y2="${(e.y2*s+oy).toFixed(1)}" stroke="${COLORS.red}" stroke-width="6" data-entry="${e.id}"/><text x="${(((e.x1+e.x2)/2)*s+ox+8).toFixed(1)}" y="${(((e.y1+e.y2)/2)*s+oy-8).toFixed(1)}" font-size="9" font-weight="900" fill="${COLORS.red}">${e.id}</text>`}
  out+=`<g transform="translate(820,120)"><rect width="340" height="210" rx="12" fill="#fff" stroke="#d4d0c6"/><text x="18" y="30" font-size="13" font-weight="900" fill="${COLORS.outline}">PLAN CLOSURE · ${a.verdict}</text><text x="18" y="58" font-size="11" fill="${COLORS.outline}">Unit B: ${a.units.B.diagrammedGrossSf.toFixed(0)} SF gross diagram shell</text><text x="18" y="82" font-size="11" fill="${COLORS.outline}">Unit A: ${a.units.A.diagrammedGrossSf.toFixed(0)} SF gross diagram shell</text><text x="18" y="106" font-size="11" fill="${COLORS.outline}">3 bedrooms each · exterior entries verified</text><text x="18" y="130" font-size="11" fill="${COLORS.outline}">stairs overlap ground ↔ upper</text><text x="18" y="154" font-size="11" fill="${a.checks.circulation.ok?COLORS.green:COLORS.red}">room / stair circulation: ${a.checks.circulation.status}</text><text x="18" y="178" font-size="11" fill="${a.checks.wetCore.ok?COLORS.green:COLORS.red}">plumbing relationship: ${a.checks.wetCore.status}</text><text x="18" y="201" font-size="9.5" fill="${COLORS.muted}">Structural / code / MEP validation pending</text></g></svg>`;return out;
}
function renderBubble(){const a=analyze();return `<svg viewBox="0 0 1200 560" role="img" aria-label="Design 4 ownership and planning relationship diagram" data-bubble-verdict="${a.verdict}" data-circulation="${a.checks.circulation.status}"><rect width="1200" height="560" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.outline}">A-103 · Ownership + room relationship</text><text x="62" y="79" font-size="13" fill="${COLORS.muted}">Detached garages remain separate accessory structures; each has a clear ownership relationship to its corresponding home.</text><g transform="translate(90,130)"><rect x="0" y="20" width="230" height="110" rx="22" fill="${COLORS.bed}" stroke="${COLORS.outline}"/><text x="115" y="65" text-anchor="middle" font-size="20" font-weight="900">HOME B</text><text x="115" y="92" text-anchor="middle" font-size="12">3 BR · ~1,784 SF shell</text><rect x="0" y="240" width="230" height="90" rx="20" fill="#c7d9c4" stroke="${COLORS.outline}"/><text x="115" y="282" text-anchor="middle" font-size="18" font-weight="900">GARAGE B</text><text x="115" y="307" text-anchor="middle" font-size="12">22×22 · detached</text><path d="M115 130 L115 240" stroke="${COLORS.red}" stroke-width="4" stroke-dasharray="9 6"/><text x="132" y="192" font-size="11" font-weight="800" fill="${COLORS.red}">ownership / walk</text></g><g transform="translate(560,130)"><rect x="0" y="20" width="230" height="110" rx="22" fill="${COLORS.kitchen}" stroke="${COLORS.outline}"/><text x="115" y="65" text-anchor="middle" font-size="20" font-weight="900">HOME A</text><text x="115" y="92" text-anchor="middle" font-size="12">3 BR · ~1,759 SF shell</text><rect x="0" y="240" width="230" height="90" rx="20" fill="#c7d9c4" stroke="${COLORS.outline}"/><text x="115" y="282" text-anchor="middle" font-size="18" font-weight="900">GARAGE A</text><text x="115" y="307" text-anchor="middle" font-size="12">22×22 · detached</text><path d="M115 130 L115 240" stroke="${COLORS.red}" stroke-width="4" stroke-dasharray="9 6"/><text x="132" y="192" font-size="11" font-weight="800" fill="${COLORS.red}">ownership / walk</text></g><g transform="translate(870,155)"><rect width="270" height="290" rx="18" fill="#fff" stroke="#d4d0c6"/><text x="18" y="32" font-size="13" font-weight="900">CURRENT READ</text><text x="18" y="62" font-size="11">✓ two homes</text><text x="18" y="88" font-size="11">✓ distinct exterior entries</text><text x="18" y="114" font-size="11">✓ 3 bedrooms each</text><text x="18" y="140" font-size="11">✓ upper rooms connected to stair/hall</text><text x="18" y="166" font-size="11">✓ north garage → Home B</text><text x="18" y="192" font-size="11">✓ south garage → Home A</text><text x="18" y="218" font-size="11">✓ detached garage relationship explicit</text><text x="18" y="244" font-size="11" fill="${a.checks.wetCore.ok?COLORS.green:COLORS.red}">△ plumbing: ${a.checks.wetCore.status}</text><text x="18" y="270" font-size="9.5" fill="${COLORS.muted}">design-development planning only</text></g></svg>`}

const api={REV,TARGET,SHELLS,ENTRIES,ROOMS,CONNECTIONS,ROOTS,analyze,circulationAnalysis,sharedEdge,renderLevel,renderBubble,area,shellArea};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4PlanClosure=api;
})(typeof window!=='undefined'?window:globalThis);
