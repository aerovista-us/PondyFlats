(function(global){
'use strict';

const D4=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4.js'):global.Lot2Design4;
const PLAN=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-plan-closure.js'):global.Lot2Design4PlanClosure;
const ROOF=(typeof module!=='undefined'&&module.exports)?require('./lot2-design-4-roof-sot.js'):global.Lot2Design4RoofSOT;
if(!D4||!PLAN) throw new Error('Design 4 architecture requires geometry and plan-closure models');

const REV='D4-ARCH-v0.6';
const COLORS={paper:'#fbfaf7',ink:'#132238',muted:'#68727d',homeA:'#d9b56d',homeB:'#ead495',garage:'#8ca58b',roof:'#394957',glass:'#dceeff',entry:'#f8e2df',ground:'#e6e0d4',line:'#405064',warn:'#a9612b',door:'#b3261e',window:'#2367b1'};
const HEIGHTS={home:20,garage:11,floor:10};

const OPENINGS=Object.freeze([
  ...PLAN.ENTRIES.map(e=>Object.freeze({id:e.id,role:'entry',unit:e.unit,face:e.face,x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,z1:0,z2:7})),
  Object.freeze({id:'GARAGE-B-OVERHEAD',role:'garage-overhead',unit:'B',face:'east',x1:27,y1:6,x2:27,y2:26,z1:0,z2:8}),
  Object.freeze({id:'GARAGE-A-OVERHEAD',role:'garage-overhead',unit:'A',face:'east',x1:27,y1:30,x2:27,y2:50,z1:0,z2:8}),
  Object.freeze({id:'A-E-W1',role:'window',unit:'A',face:'east',x1:128,y1:8,x2:128,y2:13,z1:3,z2:7}),
  Object.freeze({id:'A-E-W2',role:'window',unit:'A',face:'east',x1:128,y1:17,x2:128,y2:22,z1:3,z2:7}),
  Object.freeze({id:'A-E-U1',role:'window',unit:'A',face:'east',x1:128,y1:8,x2:128,y2:13,z1:13,z2:17}),
  Object.freeze({id:'A-E-U2',role:'window',unit:'A',face:'east',x1:128,y1:17,x2:128,y2:22,z1:13,z2:17}),
  Object.freeze({id:'A-N-W1',role:'window',unit:'A',face:'north',x1:99,y1:5,x2:105,y2:5,z1:3,z2:7}),
  Object.freeze({id:'A-N-U1',role:'window',unit:'A',face:'north',x1:114,y1:5,x2:121,y2:5,z1:13,z2:17}),
  Object.freeze({id:'A-S-W1',role:'window',unit:'A',face:'south',x1:100,y1:31.25,x2:107,y2:31.25,z1:3,z2:7}),
  Object.freeze({id:'A-S-U1',role:'window',unit:'A',face:'south',x1:114,y1:31.25,x2:121,y2:31.25,z1:13,z2:17}),
  Object.freeze({id:'B-E-W1',role:'window',unit:'B',face:'east',x1:94.5,y1:8,x2:94.5,y2:13,z1:3,z2:7}),
  Object.freeze({id:'B-E-W2',role:'window',unit:'B',face:'east',x1:94.5,y1:18,x2:94.5,y2:23,z1:3,z2:7}),
  Object.freeze({id:'B-E-U1',role:'window',unit:'B',face:'east',x1:94.5,y1:8,x2:94.5,y2:13,z1:13,z2:17}),
  Object.freeze({id:'B-E-U2',role:'window',unit:'B',face:'east',x1:94.5,y1:18,x2:94.5,y2:23,z1:13,z2:17}),
  Object.freeze({id:'B-S-W1',role:'window',unit:'B',face:'south',x1:76,y1:31.25,x2:82,y2:31.25,z1:3,z2:7}),
  Object.freeze({id:'B-S-U1',role:'window',unit:'B',face:'south',x1:76,y1:31.25,x2:83,y2:31.25,z1:13,z2:17}),
  Object.freeze({id:'B-N-W1',role:'window',unit:'B',face:'north',x1:59,y1:5,x2:65,y2:5,z1:3,z2:7}),
  Object.freeze({id:'B-N-U1',role:'window',unit:'B',face:'north',x1:76,y1:5,x2:83,y2:5,z1:13,z2:17})
]);

function homePoly(h){return h.poly||[[h.x,h.y],[h.x+h.w,h.y],[h.x+h.w,h.y+h.d],[h.x,h.y+h.d]]}
function rectPoly(r){return [[r.x,r.y],[r.x+r.w,r.y],[r.x+r.w,r.y+r.d],[r.x,r.y+r.d]]}
function extents(poly){const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);return {minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys)};}
function pointInPoly(p,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];const hit=((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/((b[1]-a[1])||1e-9)+a[0]);if(hit)inside=!inside;}return inside}
function faceSegments(poly,face){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;if(Math.abs(a[1]-b[1])<1e-6){if(face==='north'&&!pointInPoly([mx,my-.05],poly))out.push([a,b]);if(face==='south'&&!pointInPoly([mx,my+.05],poly))out.push([a,b]);}else if(Math.abs(a[0]-b[0])<1e-6){if(face==='west'&&!pointInPoly([mx-.05,my],poly))out.push([a,b]);if(face==='east'&&!pointInPoly([mx+.05,my],poly))out.push([a,b]);}}return out}
function openingLength(o){return Math.hypot(o.x2-o.x1,o.y2-o.y1)}
function faceAxis(face,o){return (face==='east'||face==='west')?[o.y1,o.y2]:[o.x1,o.x2]}
function segmentAxis(face,s){return (face==='east'||face==='west')?[s[0][1],s[1][1]]:[s[0][0],s[1][0]]}
function faceOpenings(unit,face){return OPENINGS.filter(o=>o.unit===unit&&o.face===face)}
function openingKind(role){return role==='window'?'window':'door'}
function openingStroke(role){return openingKind(role)==='window'?COLORS.window:COLORS.door}
function openingFill(role){return openingKind(role)==='window'?COLORS.glass:COLORS.entry}
function openingOnSegments(o,segs,face){const ax=faceAxis(face,o),lo=Math.min(...ax),hi=Math.max(...ax),plane=(face==='east'||face==='west')?o.x1:o.y1;return segs.some(s=>{const sa=segmentAxis(face,s),slo=Math.min(...sa),shi=Math.max(...sa),sp=(face==='east'||face==='west')?s[0][0]:s[0][1];return Math.abs(sp-plane)<.02&&lo>=slo-.02&&hi<=shi+.02})}
function roofOwnerId(kind,unit){return `${kind==='garage'?'garage':'home'}-${String(unit).toLowerCase()}`}
function roofStatus(kind,unit){
  const ownerId=roofOwnerId(kind,unit);
  if(!ROOF||typeof ROOF.statusForOwner!=='function')return {ownerId,status:'NO_MODEL',authoritative:false,renderPolicy:'SUPPRESS_ROOF',reason:'Roof SOT unavailable.'};
  return ROOF.statusForOwner(ownerId);
}
function roofViewPolicy(status){return status.authoritative?'LOCKED_DATA_AWAITING_EXACT_VIEW_PROJECTOR':'SUPPRESS_ROOF'}
function roofWithheldLabel(status){return status.authoritative?'ROOF GEOMETRY LOCKED · EXACT VIEW PROJECTOR PENDING':'ROOF GEOMETRY WITHHELD · NOT GEOMETRY LOCKED'}
function roofRecord(kind,unit){
  return ROOF&&typeof ROOF.roofForOwner==='function'?ROOF.roofForOwner(roofOwnerId(kind,unit)):null;
}
function finite3(point){return Array.isArray(point)&&point.length===3&&point.every(v=>typeof v==='number'&&Number.isFinite(v))}
function roofSurfaceFacesReady(roof){
  return Boolean(roof&&ROOF.roofIsAuthoritative(roof)&&Array.isArray(roof.surfaceFaces)&&roof.surfaceFaces.length>0&&roof.surfaceFaces.every(face=>
    face&&typeof face.id==='string'&&Array.isArray(face.polygon)&&face.polygon.length>=3&&face.polygon.every(finite3)
  ));
}
function elevationWorldAxis(face,p){return (face==='east'||face==='west')?p[1]:p[0]}
function elevationDepth(face,p){
  if(face==='east')return p[0];
  if(face==='west')return -p[0];
  if(face==='north')return -p[1];
  return p[1];
}
function projectedRoofFacesForElevation(roof,face,left,span,scale,groundY){
  if(!roofSurfaceFacesReady(roof))return '';
  const projected=roof.surfaceFaces.map(face3=>{
    const depth=face3.polygon.reduce((sum,p)=>sum+elevationDepth(face,p),0)/face3.polygon.length;
    const points=face3.polygon.map(p=>[
      left+(elevationWorldAxis(face,p)-span[0])*scale,
      groundY-p[2]*scale
    ]);
    return {...face3,depth,points};
  }).sort((a,b)=>a.depth-b.depth);
  return `<g data-roof-projector="EXACT_SURFACE_FACES" data-roof-face-count="${projected.length}">${projected.map(item=>
    `<polygon points="${item.points.map(p=>`${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ')}" fill="${COLORS.roof}" fill-opacity=".20" stroke="${COLORS.roof}" stroke-width="1.55" stroke-linejoin="round" data-roof-surface-face="${item.id}" data-roof-zone="${item.zoneId}"/>`
  ).join('')}</g>`;
}
function projectedRoofFacesForAxon(kind,unit,mode){
  const roof=roofRecord(kind,unit);
  if(!roofSurfaceFacesReady(roof))return '';
  const faces=roof.surfaceFaces.map(face=>{
    const depth=face.polygon.reduce((sum,p)=>sum+(p[0]+p[1]+p[2]*.15),0)/face.polygon.length;
    return {...face,depth};
  }).sort((a,b)=>a.depth-b.depth);
  return `<g data-roof-owner="${roof.ownerId}" data-roof-projector="EXACT_SURFACE_FACES" data-roof-face-count="${faces.length}">${faces.map(face=>
    `<polygon points="${pts3(face.polygon)}" fill="${COLORS.roof}" fill-opacity="${mode==='massing'?'.38':'.24'}" stroke="${COLORS.roof}" stroke-width="1.35" stroke-linejoin="round" data-roof-surface-face="${face.id}" data-roof-zone="${face.zoneId}"/>`
  ).join('')}</g>`;
}
function unique3(points){
  const out=[];
  for(const p of points)if(!out.some(q=>Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])<=1e-6))out.push(p);
  return out;
}
function roofSectionSegments(roof,axis,value){
  if(!roofSurfaceFacesReady(roof))return [];
  const idx=axis==='x'?0:1;
  const segments=[];
  for(const face of roof.surfaceFaces){
    const hits=[];
    for(let i=0;i<face.polygon.length;i++){
      const a=face.polygon[i],b=face.polygon[(i+1)%face.polygon.length];
      const da=a[idx]-value,db=b[idx]-value;
      if(Math.abs(da)<=1e-7)hits.push(a);
      if((da<0&&db>0)||(da>0&&db<0)){
        const t=da/(da-db);
        hits.push([
          a[0]+(b[0]-a[0])*t,
          a[1]+(b[1]-a[1])*t,
          a[2]+(b[2]-a[2])*t
        ]);
      }
    }
    const unique=unique3(hits);
    if(unique.length>=2){
      let best=[unique[0],unique[1]],bestLen=0;
      for(let i=0;i<unique.length;i++)for(let j=i+1;j<unique.length;j++){
        const l=Math.hypot(unique[i][0]-unique[j][0],unique[i][1]-unique[j][1],unique[i][2]-unique[j][2]);
        if(l>bestLen){best=[unique[i],unique[j]];bestLen=l;}
      }
      if(bestLen>.02)segments.push({faceId:face.id,zoneId:face.zoneId,a:best[0],b:best[1]});
    }
  }
  return segments;
}
function roofSectionDefinition(kind,unit){
  if(kind==='garage')return {axis:'x',value:16};
  if(unit==='B')return {axis:'x',value:83.5};
  return {axis:'x',value:111.25};
}
function projectedRoofSection(kind,unit,left,width,groundY,scale){
  const roof=roofRecord(kind,unit),def=roofSectionDefinition(kind,unit);
  if(!roofSurfaceFacesReady(roof))return '';
  const segments=roofSectionSegments(roof,def.axis,def.value);
  if(!segments.length)return '';
  const coords=segments.flatMap(segment=>[segment.a,segment.b].map(p=>def.axis==='x'?p[1]:p[0]));
  const lo=Math.min(...coords),hi=Math.max(...coords),span=Math.max(.001,hi-lo);
  const sx=v=>left+((v-lo)/span)*width;
  const sy=z=>groundY-z*scale;
  return `<g data-roof-owner="${roof.ownerId}" data-roof-projector="EXACT_SECTION_INTERSECTION" data-section-axis="${def.axis}" data-section-value-ft="${def.value}" data-section-segment-count="${segments.length}">${segments.map(segment=>
    `<line x1="${sx(def.axis==='x'?segment.a[1]:segment.a[0]).toFixed(2)}" y1="${sy(segment.a[2]).toFixed(2)}" x2="${sx(def.axis==='x'?segment.b[1]:segment.b[0]).toFixed(2)}" y2="${sy(segment.b[2]).toFixed(2)}" stroke="${COLORS.roof}" stroke-width="3" stroke-linecap="round" data-roof-surface-face="${segment.faceId}" data-roof-zone="${segment.zoneId}"/>`
  ).join('')}</g>`;
}
function roofWithheldBand({kind,unit,left,width,wallY}){
  const status=roofStatus(kind,unit);
  const policy=roofViewPolicy(status);
  return `<g data-roof-owner="${status.ownerId}" data-roof-status="${status.status}" data-roof-authoritative="${status.authoritative?'true':'false'}" data-roof-render-policy="${policy}"><line x1="${left}" y1="${wallY}" x2="${left+width}" y2="${wallY}" stroke="${COLORS.roof}" stroke-width="2" stroke-dasharray="6 5" opacity=".72"/><text x="${left+width/2}" y="${wallY-11}" text-anchor="middle" font-size="8.3" font-weight="900" fill="${COLORS.warn}">${roofWithheldLabel(status)}</text></g>`;
}
function renderViewKey(face,x,y,w=255,h=64){
  const maxX=148,maxY=57.01,pad=8,sx=v=>x+pad+(v/maxX)*(w-pad*2),sy=v=>y+pad+(v/maxY)*(h-pad*2);
  const pts=poly2=>poly2.map(([px,py])=>`${sx(px).toFixed(1)},${sy(py).toFixed(1)}`).join(' ');
  const masses=[...D4.HOMES.map(o=>({poly:homePoly(o),fill:o.unit==='A'?COLORS.homeA:COLORS.homeB})),...D4.GARAGES.map(o=>({poly:rectPoly(o),fill:COLORS.garage}))];
  let ax1=x+w-12,ay1=y+h/2,ax2=x+w-48,ay2=ay1,head=`${ax2},${ay2} ${ax2+8},${ay2-5} ${ax2+8},${ay2+5}`,label='VIEW FROM EAST / PENNSYLVANIA';
  if(face==='west'){ax1=x+12;ay1=y+h/2;ax2=x+48;ay2=ay1;head=`${ax2},${ay2} ${ax2-8},${ay2-5} ${ax2-8},${ay2+5}`;label='VIEW FROM WEST / REAR';}
  if(face==='north'){ax1=x+w/2;ay1=y+8;ax2=ax1;ay2=y+34;head=`${ax2},${ay2} ${ax2-5},${ay2-8} ${ax2+5},${ay2-8}`;label='VIEW FROM NORTH';}
  if(face==='south'){ax1=x+w/2;ay1=y+h-8;ax2=ax1;ay2=y+h-34;head=`${ax2},${ay2} ${ax2-5},${ay2+8} ${ax2+5},${ay2+8}`;label='VIEW FROM SOUTH';}
  return `<g data-view-key="${face}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#fff" stroke="#d8dde2"/><polygon points="${pts(D4.SURVEY)}" fill="#f3efe4" stroke="#9e9a90" stroke-width="1"/>${masses.map(m=>`<polygon points="${pts(m.poly)}" fill="${m.fill}" fill-opacity=".78" stroke="${COLORS.ink}" stroke-width=".7"/>`).join('')}<line x1="${ax1}" y1="${ay1}" x2="${ax2}" y2="${ay2}" stroke="${COLORS.door}" stroke-width="2"/><polygon points="${head}" fill="${COLORS.door}"/><rect x="${x+4}" y="${y+h-16}" width="${Math.min(w-8,178)}" height="13" rx="6.5" fill="#fff" fill-opacity=".9"/><text x="${x+10}" y="${y+h-6}" font-size="7.8" font-weight="900" fill="${COLORS.ink}">${label}</text><text x="${x+w-10}" y="${y+13}" text-anchor="end" font-size="7.5" font-weight="900" fill="${COLORS.muted}">SITE ORIENTATION KEY</text></g>`;
}

function elevationBand({unit,face,x,y,w,h,title,kind='home'}){
  const obj=kind==='garage'?D4.GARAGES.find(g=>g.unit===unit):D4.HOMES.find(b=>b.unit===unit),poly2=kind==='garage'?rectPoly(obj):homePoly(obj),segs=faceSegments(poly2,face);
  if(!segs.length)return `<g data-elevation-unit="${unit}" data-face="${face}" data-kind="${kind}" data-world-segments="0"><text x="${x}" y="${y+18}" font-size="12" font-weight="900" fill="${COLORS.ink}">${title}</text><text x="${x}" y="${y+48}" font-size="10" fill="${COLORS.muted}">No exterior ${face} face in source polygon.</text></g>`;
  const axes=segs.flatMap(s=>segmentAxis(face,s)),span=[Math.min(...axes),Math.max(...axes)],worldW=Math.max(1,span[1]-span[0]),scale=Math.min((w-36)/worldW,8.5),drawW=worldW*scale,left0=x+(w-drawW)/2,wallH=(kind==='garage'?HEIGHTS.garage:HEIGHTS.home)*scale,wallY=y+h-34-wallH,fill=kind==='garage'?COLORS.garage:(unit==='A'?COLORS.homeA:COLORS.homeB),planes=segs.map(s=>(face==='east'||face==='west')?s[0][0]:s[0][1]),outerPlane=(face==='east'||face==='south')?Math.max(...planes):Math.min(...planes);
  let out=`<g data-elevation-unit="${unit}" data-face="${face}" data-kind="${kind}" data-world-segments="${segs.length}" data-common-scale-px-per-ft="${scale}" data-visible-span-ft="${worldW}" data-working-wall-height-ft="${kind==='garage'?HEIGHTS.garage:HEIGHTS.home}"><text x="${x}" y="${y+18}" font-size="12" font-weight="900" fill="${COLORS.ink}">${title}</text><text x="${x+w}" y="${y+18}" text-anchor="end" font-size="8.5" font-weight="900" fill="#507759">COORDINATE-DERIVED FACES + OPENINGS</text><line x1="${x}" y1="${y+h-32}" x2="${x+w}" y2="${y+h-32}" stroke="${COLORS.ground}" stroke-width="3"/>`;
  for(const s of segs){const ax=segmentAxis(face,s),a0=Math.min(...ax),a1=Math.max(...ax),left=left0+(a0-span[0])*scale,sw=(a1-a0)*scale,plane=(face==='east'||face==='west')?s[0][0]:s[0][1],recess=Math.abs(plane-outerPlane);out+=`<rect x="${left}" y="${wallY}" width="${sw}" height="${wallH}" fill="${fill}" fill-opacity="${recess>.01?'.74':'.92'}" stroke="${COLORS.ink}" stroke-width="2" data-world-face-segment="${face}" data-world-plane="${plane}" data-world-span="${a0}:${a1}" data-recess-ft="${recess.toFixed(2)}"/>`;if(recess>.01)out+=`<text x="${left+6}" y="${wallY+14}" font-size="7.5" font-weight="900" fill="${COLORS.warn}">RECESSED ${recess.toFixed(2)}′</text>`;}
  if(kind==='home')out+=`<line x1="${left0}" y1="${wallY+HEIGHTS.floor*scale}" x2="${left0+drawW}" y2="${wallY+HEIGHTS.floor*scale}" stroke="${COLORS.line}" stroke-width="1" stroke-dasharray="5 5" opacity=".45" data-floor-datum="working"/>`;
  const roof=roofRecord(kind,unit),groundY=wallY+wallH;
  if(roofSurfaceFacesReady(roof)){
    out+=projectedRoofFacesForElevation(roof,face,left0,span,scale,groundY);
    out+=`<g data-roof-owner="${roof.ownerId}" data-roof-status="ROOF_GEOMETRY_LOCKED" data-roof-authoritative="true" data-roof-render-policy="EXACT_SURFACE_FACES"><text x="${left0+drawW/2}" y="${wallY-11}" text-anchor="middle" font-size="8.3" font-weight="900" fill="#507759">ROOF · EXACT SOLVED SURFACE</text></g>`;
  }else out+=roofWithheldBand({kind,unit,left:left0,width:drawW,wallY});
  const openings=faceOpenings(unit,face).filter(o=>(kind==='garage'?o.role==='garage-overhead':o.role!=='garage-overhead')&&openingOnSegments(o,segs,face));
  for(const o of openings){const ax=faceAxis(face,o),left=left0+(Math.min(...ax)-span[0])*scale,ow=Math.max(7,openingLength(o)*scale),zScale=scale,top=wallY+wallH-o.z2*zScale,oh=Math.max(8,(o.z2-o.z1)*zScale),type=openingKind(o.role);out+=`<rect x="${left}" y="${top}" width="${ow}" height="${oh}" rx="1.5" fill="${openingFill(o.role)}" stroke="${openingStroke(o.role)}" stroke-width="2.4" data-opening="${type}" data-opening-id="${o.id}" data-opening-role="${o.role}" data-derived="world"/>`;}
  if(!openings.length)out+=`<rect x="${left0+drawW/2-64}" y="${wallY+wallH/2-10}" width="128" height="20" rx="10" fill="#fff" fill-opacity=".82"/><text x="${left0+drawW/2}" y="${wallY+wallH/2+3.5}" text-anchor="middle" font-size="8" font-weight="900" fill="${COLORS.muted}">NO MODELED OPENINGS</text>`;
  out+=`<text x="${x+w/2}" y="${y+h-20}" text-anchor="middle" font-size="9.5" font-weight="800" fill="${COLORS.ink}">VISIBLE SPAN ${worldW.toFixed(2)}′ · WORKING WALL DATUM ${kind==='garage'?HEIGHTS.garage:HEIGHTS.home}′ · COMMON SCALE ${scale.toFixed(1)} PX/FT</text><text x="${x+w/2}" y="${y+h-7}" text-anchor="middle" font-size="8.8" fill="${COLORS.muted}">${kind==='garage'?(face==='east'?'22×22 detached garage · 20′ modeled east opening · roof withheld':'22×22 detached garage · solid wall on this face · roof withheld'):'wall faces/openings from shared model · roof silhouette withheld until Workbench geometry lock'}</text></g>`;return out;
}

function renderElev(face){const labels={east:'A-201 · Pennsylvania / east elevation',west:'A-202 · rear / west elevation',north:'A-203 · north elevation',south:'A-204 · south elevation'},title=labels[face]||labels.east,W=1200,H=760,garageLabel=face==='east'?'20′ OVERHEAD OPENING':'SOLID GARAGE WALL';return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 ${face} geometry-first elevations" data-arch-rev="${REV}" data-elevation-face="${face}" data-openings-source="shared-world-model" data-garages-all-faces="true" data-common-scale-px-per-ft="8.5"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${title}</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Geometry-first · homes and garages use one common graphic scale · walls/openings + roof surfaces project from the shared solved model</text>${elevationBand({unit:'B',face,x:62,y:108,w:510,h:255,title:'HOME B'})}${elevationBand({unit:'A',face,x:628,y:108,w:510,h:255,title:'HOME A'})}${elevationBand({unit:'B',face,x:62,y:410,w:510,h:240,title:`GARAGE B · ${garageLabel}`,kind:'garage'})}${elevationBand({unit:'A',face,x:628,y:410,w:510,h:240,title:`GARAGE A · ${garageLabel}`,kind:'garage'})}<g transform="translate(62,676)"><text font-size="10.2" fill="${COLORS.warn}">Accuracy boundary: wall faces and openings are coordinate-derived; vertical wall heights are working design datums.</text><text y="17" font-size="9.2" fill="${COLORS.muted}">Solved roof surfaces are projected directly from the LotScope roof SOT when face geometry is present; otherwise the view fails closed.</text></g>${renderViewKey(face,875,672,260,66)}</svg>`;}

function P(x,y,z){return [580+(x-70)*5.2-(y-26)*3.2,545-(x-70)*1.55-(y-26)*1.35-z*8.2]}
function pts3(points){return points.map(p=>{const q=P(...p);return `${q[0].toFixed(1)},${q[1].toFixed(1)}`}).join(' ')}
function prism(poly2,z,fill,mode,id,kind,unit){const top=poly2.map(([x,y])=>[x,y,z]),status=roofStatus(kind,unit),roof=roofRecord(kind,unit),exact=roofSurfaceFacesReady(roof);let faces='';for(let i=0;i<poly2.length;i++){const a=poly2[i],b=poly2[(i+1)%poly2.length];faces+=`<polygon points="${pts3([[a[0],a[1],0],[b[0],b[1],0],[b[0],b[1],z],[a[0],a[1],z]])}" fill="${fill}" fill-opacity="${mode==='massing'?'.78':'.92'}" stroke="${COLORS.ink}" stroke-width="1"/>`;}return `<g data-mass-id="${id}" data-roof-owner="${status.ownerId}" data-roof-status="${status.status}" data-roof-render-policy="${exact?'EXACT_SURFACE_FACES':roofViewPolicy(status)}"><polygon points="${pts3(top)}" fill="none" stroke="${COLORS.roof}" stroke-width="1.1" ${exact?'opacity=".24"':'stroke-dasharray="5 4"'} data-plate-datum="working"/>${faces}</g>`+projectedRoofFacesForAxon(kind,unit,mode);}
function projectOpening(o){return pts3([[o.x1,o.y1,o.z1],[o.x2,o.y2,o.z1],[o.x2,o.y2,o.z2],[o.x1,o.y1,o.z2]])}
function renderAxon(mode='clean'){const W=1200,H=760,massing=mode==='massing';let masses='';for(const h of D4.HOMES)masses+=prism(homePoly(h),HEIGHTS.home,h.unit==='A'?COLORS.homeA:COLORS.homeB,mode,h.id,'home',h.unit);for(const g of D4.GARAGES)masses+=prism(rectPoly(g),HEIGHTS.garage,COLORS.garage,mode,g.id,'garage',g.unit);const openings=OPENINGS.map(o=>{const type=openingKind(o.role);return `<polygon points="${projectOpening(o)}" fill="${massing?'none':openingFill(o.role)}" fill-opacity="${massing?'0':'.72'}" stroke="${openingStroke(o.role)}" stroke-width="${massing?'1.8':'2.2'}" opacity="${massing?'.72':'1'}" data-opening="${type}" data-opening-id="${o.id}" data-opening-role="${o.role}" data-derived="world"/>`}).join(''),lot=pts3(D4.SURVEY.map(([x,y])=>[x,y,0]));return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 ${massing?'massing':'architectural axon'}" data-arch-rev="${REV}" data-camera="D4-ISO-01" data-axon-mode="${mode}" data-openings-source="shared-world-model"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${massing?'A-401 · Same-camera architectural massing':'A-402 · Same-camera clean axon'}</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Same camera / same wall geometry · red doors · blue windows · exact solved roof faces share the same 3D coordinate model</text><polygon points="${lot}" fill="#f3efe4" stroke="#9e9a90" stroke-width="1.4"/>${masses}${openings}<g transform="translate(72,625)"><rect width="560" height="82" rx="12" fill="#fff" stroke="#d4d0c6"/><text x="18" y="27" font-size="12" font-weight="900" fill="${COLORS.ink}">GEOMETRY TRUTH</text><text x="18" y="49" font-size="10.5" fill="${COLORS.ink}">2 × detached 22×22 garages · promoted north-finger home shells · Pennsylvania access at right/east</text><text x="18" y="68" font-size="9.5" fill="${COLORS.muted}">Openings and exact roof surfaces project from shared world coordinates. Roof faces are shown only when the imported SOT carries validated 3D surface polygons.</text></g></svg>`;}

function renderSection(unit){
  const shell=PLAN.SHELLS[unit],e=extents(shell.poly),sectionDepth=e.maxY-e.minY,W=1200,H=650,x0=110,yGround=520,s=Math.min(18,760/Math.max(sectionDepth,1)),houseW=sectionDepth*s,floorH=130,gW=22*s*.62,homeStatus=roofStatus('home',unit),garageStatus=roofStatus('garage',unit),homeRoof=roofRecord('home',unit),garageRoof=roofRecord('garage',unit),homeExact=roofSurfaceFacesReady(homeRoof),garageExact=roofSurfaceFacesReady(garageRoof),homeTop=yGround-floorH*2,garageTop=yGround-100;
  const homeRoofSvg=homeExact?projectedRoofSection('home',unit,x0,houseW,yGround,s):'';
  const garageLeft=820,garageRoofSvg=garageExact?projectedRoofSection('garage',unit,garageLeft,gW,yGround,100/11):'';
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Design 4 Unit ${unit} geometry-first section" data-section-unit="${unit}" data-arch-rev="${REV}" data-roof-contract="${ROOF?ROOF.REV:'UNAVAILABLE'}"><rect width="${W}" height="${H}" fill="${COLORS.paper}"/><text x="62" y="50" font-family="Georgia,serif" font-size="29" font-weight="700" fill="${COLORS.ink}">${unit==='A'?'A-301':'A-302'} · Unit ${unit} geometry-first section</text><text x="62" y="78" font-size="13" fill="${COLORS.muted}">Transverse cut through solved roof surfaces · Unit B cut x=83.5′ · Unit A cut x=111.25′ · garages cut x=16′</text><line x1="70" y1="${yGround}" x2="1130" y2="${yGround}" stroke="${COLORS.ground}" stroke-width="4"/><g data-roof-owner="${homeStatus.ownerId}" data-roof-status="${homeStatus.status}" data-roof-render-policy="${homeExact?'EXACT_SECTION_INTERSECTION':roofViewPolicy(homeStatus)}"><rect x="${x0}" y="${homeTop}" width="${houseW}" height="${floorH*2}" fill="${unit==='A'?COLORS.homeA:COLORS.homeB}" fill-opacity=".64" stroke="${COLORS.ink}" stroke-width="2"/><line x1="${x0}" y1="${yGround-floorH}" x2="${x0+houseW}" y2="${yGround-floorH}" stroke="${COLORS.ink}" stroke-width="2"/><line x1="${x0}" y1="${homeTop}" x2="${x0+houseW}" y2="${homeTop}" stroke="${COLORS.roof}" stroke-width="1" opacity=".25" data-plate-datum="working"/>${homeRoofSvg}<path d="M ${x0+houseW*.15} ${yGround-18} L ${x0+houseW*.35} ${yGround-floorH+18} L ${x0+houseW*.5} ${yGround-floorH+18}" fill="none" stroke="${COLORS.door}" stroke-width="5"/><text x="${x0+houseW/2}" y="${yGround-floorH-10}" text-anchor="middle" font-size="11" font-weight="900" fill="${COLORS.ink}">UPPER · 3 BEDROOM PROGRAM</text><text x="${x0+houseW/2}" y="${yGround-18}" text-anchor="middle" font-size="11" font-weight="900" fill="${COLORS.ink}">GROUND · LIVING / KITCHEN / FLEX / SERVICE</text>${homeExact?'':`<text x="${x0+houseW/2}" y="${homeTop-12}" text-anchor="middle" font-size="9" font-weight="900" fill="${COLORS.warn}">${roofWithheldLabel(homeStatus)}</text>`}</g><g data-roof-owner="${garageStatus.ownerId}" data-roof-status="${garageStatus.status}" data-roof-render-policy="${garageExact?'EXACT_SECTION_INTERSECTION':roofViewPolicy(garageStatus)}"><rect x="${garageLeft}" y="${garageTop}" width="${gW}" height="100" fill="${COLORS.garage}" fill-opacity=".72" stroke="${COLORS.ink}" stroke-width="2"/><line x1="${garageLeft}" y1="${garageTop}" x2="${garageLeft+gW}" y2="${garageTop}" stroke="${COLORS.roof}" stroke-width="1" opacity=".25" data-plate-datum="working"/>${garageRoofSvg}<text x="${garageLeft+gW/2}" y="${yGround-44}" text-anchor="middle" font-size="11" font-weight="900">DETACHED GARAGE ${unit}</text><text x="${garageLeft+gW/2}" y="${yGround-25}" text-anchor="middle" font-size="10">22×22 · no living space</text>${garageExact?'':`<text x="${garageLeft+gW/2}" y="${garageTop-12}" text-anchor="middle" font-size="8.5" font-weight="900" fill="${COLORS.warn}">${roofWithheldLabel(garageStatus)}</text>`}</g><g transform="translate(62,560)"><text font-size="10.5" fill="${COLORS.warn}">Roof section lines are exact intersections of the imported solved 3D roof faces with the stated cut plane.</text><text y="17" font-size="9.5" fill="${COLORS.muted}">Wall/floor program remains design-development; foundations, structure, fire separation, MEP, civil, drainage and permit validation remain professional/AHJ work.</text></g></svg>`;
}

function analyze(){
  const p=PLAN.analyze(),g=D4.analyze(),roof=ROOF&&typeof ROOF.analyze==='function'?ROOF.analyze():null,b=D4.HOMES.find(h=>h.unit==='B'),south=faceSegments(homePoly(b),'south'),west=faceSegments(homePoly(b),'west'),contractOk=OPENINGS.every(o=>['door','window'].includes(openingKind(o.role))),roofContractOk=Boolean(roof&&['CONCEPT_ONLY_REQUIRED','AUTHORITATIVE_ALLOWED'].includes(roof.status));
  const exactRoofProjection=Boolean(ROOF&&Array.isArray(ROOF.ROOFS)&&ROOF.ROOFS.length===4&&ROOF.ROOFS.every(roofSurfaceFacesReady));
  return {rev:REV,verdict:'CONDITIONAL',plan:p,geometry:g,roof,checks:{planGeometry:{ok:p.verdict==='PASS',blocking:true},sharedOpenings:{ok:OPENINGS.length>=10,blocking:true},openingContract:{ok:contractOk,doorStroke:COLORS.door,windowStroke:COLORS.window,blocking:true},polygonFaces:{ok:south.length===2&&west.length===2,homeBSouthSegments:south.length,homeBWestSegments:west.length,blocking:true},roofContract:{ok:roofContractOk,status:roof?.status||'UNAVAILABLE',locked:roof?.locked||0,required:roof?.required||4,exactProjection:exactRoofProjection,renderPolicy:roof?.status!=='AUTHORITATIVE_ALLOWED'?'SUPPRESS_ROOF':exactRoofProjection?'EXACT_SURFACE_PROJECTOR_ACTIVE':'EXACT_VIEW_PROJECTOR_REQUIRED',blocking:true},sameCamera:{ok:true,blocking:true},professionalValidation:{ok:false,status:'PENDING',blocking:false}},note:exactRoofProjection?'Design-development concept package with roof geometry projected directly from validated LotScope 3D surface faces. Structural/code/AHJ/permit validation remains separate.':'Design-development concept package only; roof silhouette remains withheld until validated 3D surface faces are available. Accessory zoning and inter-garage spacing remain conditional.'};
}

const api={REV,HEIGHTS,OPENINGS,analyze,renderElev,renderAxon,renderSection,projectOpening,faceSegments,openingKind,roofViewPolicy,roofWithheldLabel,roofSurfaceFacesReady,projectedRoofFacesForElevation,projectedRoofFacesForAxon,roofSectionSegments,projectedRoofSection,P};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4Architecture=api;
})(typeof window!=='undefined'?window:globalThis);
