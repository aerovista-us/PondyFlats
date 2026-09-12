#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const W=require('../js/lot2-workbench-audit.js');
const D4=require('../js/lot2-design-4.js');

const R=D4.VEHICLE.minRearAxleRadius;
const STEP=2;
const STEERS=[-1/R,0,1/R];
const START={x:142,y:37,th:Math.PI,gear:1};
const STALLS={B:[10.5,21.5],A:[34.5,45.5]};
const DOORS={B:{y1:6,y2:26},A:{y1:30,y2:50}};
const GARAGES={B:D4.GARAGES.find(g=>g.unit==='B'),A:D4.GARAGES.find(g=>g.unit==='A')};
const HOMES=D4.HOMES.map(h=>({id:h.id,poly:h.poly||W.rectPoly(h)}));

class Heap{constructor(){this.a=[]}push(v){this.a.push(v);let i=this.a.length-1;while(i){const p=(i-1)>>1;if(this.a[p].f<=v.f)break;this.a[i]=this.a[p];i=p}this.a[i]=v}pop(){if(!this.a.length)return null;const root=this.a[0],last=this.a.pop();if(this.a.length){let i=0;while(true){let l=i*2+1,r=l+1;if(l>=this.a.length)break;let c=r<this.a.length&&this.a[r].f<this.a[l].f?r:l;if(this.a[c].f>=last.f)break;this.a[i]=this.a[c];i=c}this.a[i]=last}return root}get size(){return this.a.length}}
function wrap(a){while(a>Math.PI)a-=Math.PI*2;while(a<-Math.PI)a+=Math.PI*2;return a}
function key(s){return `${Math.round(s.x*2)}:${Math.round(s.y*2)}:${Math.round((wrap(s.th)+Math.PI)/(Math.PI/36))}:${s.gear}`}
function body(s){return W.vehiclePoly(s.x,s.y,s.th,D4.VEHICLE)}
function targetGarageWallsOk(poly,g,door){const dx=g.x+g.w,xmin=Math.min(...poly.map(p=>p[0])),xmax=Math.max(...poly.map(p=>p[0]));for(const c of poly){if(c[0]<dx-1e-6&&(c[0]<g.x-1e-6||c[1]<g.y-1e-6||c[1]>g.y+g.d+1e-6))return false}if(xmin<dx&&xmax>dx){const ys=W.lineCrossY(poly,dx);if(ys.length&&(Math.min(...ys)<door.y1-1e-6||Math.max(...ys)>door.y2+1e-6))return false}return true}
function validPose(s,unit,matePoly,minClear=1){const poly=body(s);if(s.x<=144&&!poly.every(p=>W.pointInPoly(p,D4.SURVEY)))return false;if(s.x<=144&&W.boundaryDistance(poly,D4.SURVEY)<minClear-1e-6)return false;const g=GARAGES[unit],other=GARAGES[unit==='A'?'B':'A'];const obs=[...HOMES,{id:other.id,poly:W.rectPoly(other)}];if(matePoly)obs.push({id:'mate',poly:matePoly});for(const o of obs){if(W.polygonsIntersect(poly,o.poly)||W.polygonDistance(poly,o.poly)<minClear-1e-6)return false}return targetGarageWallsOk(poly,g,DOORS[unit])}
function advance(s,gear,k){const d=gear*STEP,mid=s.th+d*k/2;return {x:s.x+d*Math.cos(mid),y:s.y+d*Math.sin(mid),th:wrap(s.th+d*k),gear}}
function primitiveValid(s,n,unit,mate){for(let i=1;i<=4;i++){const t=i/4,th=wrap(s.th+wrap(n.th-s.th)*t),p={x:s.x+(n.x-s.x)*t,y:s.y+(n.y-s.y)*t,th,gear:n.gear};if(!validPose(p,unit,mate))return false}return true}
function goalPose(unit,y){return {x:22.5,y,th:Math.PI,gear:1}}
function h(s,g){return Math.hypot(s.x-g.x,s.y-g.y)+Math.abs(wrap(s.th-g.th))*10}
function reconstruct(node){const out=[];for(let n=node;n;n=n.parent)out.push({x:+n.s.x.toFixed(3),y:+n.s.y.toFixed(3),th:+n.s.th.toFixed(5),gear:n.s.gear});return out.reverse()}
function plan(unit,y,matePoly){const goal=goalPose(unit,y),open=new Heap(),best=new Map(),start={s:START,g:0,f:h(START,goal),parent:null,changes:0};open.push(start);best.set(key(START),0);let expanded=0;while(open.size&&expanded<90000){const cur=open.pop();if(cur.g>(best.get(key(cur.s))??Infinity)+1e-6)continue;expanded++;const dist=Math.hypot(cur.s.x-goal.x,cur.s.y-goal.y),ang=Math.abs(wrap(cur.s.th-goal.th));if(dist<2.25&&ang<0.12&&validPose(goal,unit,matePoly)){const final={s:goal,g:cur.g+dist,f:cur.g+dist,parent:cur,changes:cur.changes+(cur.s.gear!==1?1:0)};const poses=reconstruct(final),audit=W.auditPosePath({poses,vehicle:D4.VEHICLE,survey:D4.SURVEY,obstacles:[...HOMES,{id:GARAGES[unit==='A'?'B':'A'].id,poly:W.rectPoly(GARAGES[unit==='A'?'B':'A'])}],parkedObstacles:matePoly?[{id:'mate',poly:matePoly}]:[],garage:GARAGES[unit],door:DOORS[unit],minClearanceFt:1,practicalClearanceFt:2});if(audit.ok)return {ok:true,expanded,cost:+final.g.toFixed(1),changes:final.changes,poses,audit}}
    for(const gear of [1,-1])for(const k of STEERS){const n=advance(cur.s,gear,k);if(n.x<20||n.x>144||n.y<4||n.y>50||!primitiveValid(cur.s,n,unit,matePoly))continue;const change=gear!==cur.s.gear?1:0,ng=cur.g+STEP*(gear<0?1.18:1)+(k?0.16:0)+change*18,nk=key(n);if(ng>=(best.get(nk)??Infinity)-1e-6)continue;best.set(nk,ng);const node={s:n,g:ng,f:ng+h(n,goal),parent:cur,changes:cur.changes+change};open.push(node)}}return {ok:false,expanded}}
function parkedPoly(y){return W.vehiclePoly(22.5,y,Math.PI,D4.VEHICLE)}
function staticGarageAudit(unit){const g=GARAGES[unit],ys=STALLS[unit];return W.auditStalls({garage:g,vehicle:D4.VEHICLE,stalls:ys.map((y,i)=>({id:`${unit}${i+1}`,axleX:22.5,axleY:y,heading:Math.PI})),minPairFt:1})}
function run(){const results={generatedAt:new Date().toISOString(),vehicle:D4.VEHICLE,program:'four practical enclosed stalls',static:{},paths:{}};let ok=true;for(const unit of ['B','A']){results.static[unit]=staticGarageAudit(unit);if(!results.static[unit].ok)ok=false;for(let i=0;i<STALLS[unit].length;i++){const y=STALLS[unit][i],mateY=STALLS[unit][1-i],mate=parkedPoly(mateY),name=`${unit}${i+1}`;const r=plan(unit,y,mate);results.paths[name]={unit,stallY:y,mateY,...r};if(!r.ok)ok=false;console.log(`${name} ${r.ok?'PASS':'FAIL'} expanded=${r.expanded} changes=${r.changes??'-'} clear=${r.audit?.minClearanceFt??'-'} boundary=${r.audit?.minBoundaryFt??'-'} obstacle=${r.audit?.minObstacleFt??'-'} door=${r.audit?.doorClearanceFt??'-'}`)}}results.ok=ok;const out=path.join(process.cwd(),'qa-artifacts','design4-workbench');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'paths.json'),JSON.stringify(results,null,2));let md='# Design 4 Workbench self-audit\n\n';md+=`Generated: ${results.generatedAt}\n\nOverall: **${ok?'PASS':'FAIL'}**\n\n`;for(const unit of ['B','A']){const s=results.static[unit];md+=`## Garage ${unit}\n\nStatic simultaneous fit: **${s.ok?'PASS':'FAIL'}**, pair clearance ${s.pairClearanceFt} ft.\n\n`;for(let i=0;i<2;i++){const r=results.paths[`${unit}${i+1}`];md+=`- Stall ${r.stallY} ft with mate at ${r.mateY} ft: **${r.ok?'PASS':'FAIL'}**${r.ok?`, clearance ${r.audit.minClearanceFt} ft, gear changes ${r.changes}`:''}.\n`;}md+='\n'}md+='This is design-development geometry evidence, not civil certification, code approval, zoning approval, or construction documentation.\n';fs.writeFileSync(path.join(out,'summary.md'),md);if(!ok)process.exitCode=2;return results}
run();
