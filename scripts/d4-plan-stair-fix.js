#!/usr/bin/env node
'use strict';
const fs=require('fs');
const file='js/lot2-design-4-plan-closure.js';
let s=fs.readFileSync(file,'utf8');
const oldRooms=`      {id:'B-U-PRIMARYBATH',name:'Primary Bath / WIC',x:72.5,y:15,w:11,d:7,kind:'bath',wet:true},\n      {id:'B-U-BATH',name:'Hall Bath',x:83.5,y:15,w:6,d:7,kind:'bath',wet:true},\n      {id:'B-U-STAIR',name:'Stair / Hall',x:89.5,y:15,w:5,d:7,kind:'hall',stair:true},`;
const newRooms=`      {id:'B-U-STAIR',name:'Stair / Hall',x:72.5,y:15,w:8.5,d:7,kind:'hall',stair:true},\n      {id:'B-U-PRIMARYBATH',name:'Primary Bath / WIC',x:81,y:15,w:8.5,d:7,kind:'bath',wet:true},\n      {id:'B-U-BATH',name:'Hall Bath',x:89.5,y:15,w:5,d:7,kind:'bath',wet:true},`;
if(!s.includes(oldRooms)) throw new Error('expected upper B room block not found');
s=s.replace(oldRooms,newRooms);
const oldWet=`function wetAnalysis(unit){const ground=ROOMS.ground[unit].filter(r=>r.wet),upper=ROOMS.upper[unit].filter(r=>r.wet);let best={gap:Infinity,pair:null};for(const g of ground)for(const u of upper){const dx=Math.max(u.x-(g.x+g.w),g.x-(u.x+u.w),0),dy=Math.max(u.y-(g.y+g.d),g.y-(u.y+u.d),0),gap=Math.hypot(dx,dy);if(gap<best.gap)best={gap,pair:[g.id,u.id]};}return {ok:best.gap===0,blocking:false,status:best.gap===0?'OVERLAP_AVAILABLE':'ADVISORY',gapFt:+best.gap.toFixed(2),pair:best.pair}}`;
const newWet=`function wetAnalysis(unit){const ground=ROOMS.ground[unit].filter(r=>r.wet),upper=ROOMS.upper[unit].filter(r=>r.wet);let best={gap:Infinity,pair:null,overlapSf:0};for(const g of ground)for(const u of upper){const ov=overlapArea(g,u),dx=Math.max(u.x-(g.x+g.w),g.x-(u.x+u.w),0),dy=Math.max(u.y-(g.y+g.d),g.y-(u.y+u.d),0),gap=Math.hypot(dx,dy);if(ov>best.overlapSf||(ov===best.overlapSf&&gap<best.gap))best={gap,pair:[g.id,u.id],overlapSf:ov};}const ok=best.overlapSf>1e-6;return {ok,blocking:false,status:ok?'OVERLAP_AVAILABLE':'ADVISORY',gapFt:+best.gap.toFixed(2),overlapSf:+best.overlapSf.toFixed(2),pair:best.pair}}`;
if(!s.includes(oldWet)) throw new Error('expected wetAnalysis block not found');
s=s.replace(oldWet,newWet);
fs.writeFileSync(file,s);
console.log('Repaired Unit B stair continuity and truthful wet-core overlap test.');
