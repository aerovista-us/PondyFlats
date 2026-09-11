#!/usr/bin/env node
'use strict';
const fs=require('fs');
const file='js/lot2-design-4.js';
let s=fs.readFileSync(file,'utf8');
const reps=[
  ["{id:'GARAGE-A',kind:'garage',unit:'A',x:5,y:5,w:22,d:22,doorFace:'east',stalls:2,detached:true}","{id:'GARAGE-NORTH-B',kind:'garage',unit:'B',x:5,y:5,w:22,d:22,doorFace:'east',stalls:2,detached:true}"],
  ["{id:'GARAGE-B',kind:'garage',unit:'B',x:5,y:29,w:22,d:22,doorFace:'east',stalls:2,detached:true}","{id:'GARAGE-SOUTH-A',kind:'garage',unit:'A',x:5,y:29,w:22,d:22,doorFace:'east',stalls:2,detached:true}"],
  ["const ACCESS_PATHS={A:buildPath(16),B:buildPath(40)};","const ACCESS_PATHS={A:buildPath(40),B:buildPath(16)};"],
  ["GARAGE A · 22×22</text><text x=\"${(16*s+ox).toFixed(1)}\" y=\"${(40*s+oy).toFixed(1)}\" text-anchor=\"middle\">GARAGE B · 22×22","GARAGE B · 22×22</text><text x=\"${(16*s+ox).toFixed(1)}\" y=\"${(40*s+oy).toFixed(1)}\" text-anchor=\"middle\">GARAGE A · 22×22"]
];
for(const [a,b] of reps){if(!s.includes(a)){console.error('Missing expected text:',a);process.exit(2)}s=s.replace(a,b)}
fs.writeFileSync(file,s);
console.log('Normalized Design 4 garage ownership: north→Home B, south→Home A.');
