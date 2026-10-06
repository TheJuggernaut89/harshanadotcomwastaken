import test from 'node:test';
import assert from 'node:assert/strict';
import {storyPose} from '../src/portfolio/spatial-layout.js';
test('3D poses stay finite and inside the authored scene at every scroll stop',()=>{
 for(let i=0;i<6;i++)for(let step=0;step<=300;step++){
  const p=storyPose(i,step/300);
  for(const v of Object.values(p))assert.ok(Number.isFinite(v));
  assert.ok(Math.abs(p.x)<=4.1&&Math.abs(p.y)<=1.7&&Math.abs(p.z)<=4);
 }
});
test('3D chapter boundaries are continuous and reverse scrolling returns the same pose',()=>{
 for(let i=0;i<6;i++){
  for(const boundary of [1/3,2/3]){
   const a=storyPose(i,boundary-.0001),b=storyPose(i,boundary+.0001);
   for(const key of Object.keys(a))assert.ok(Math.abs(a[key]-b[key])<.001);
  }
  const forward=Array.from({length:31},(_,step)=>storyPose(i,step/30));
  const reverse=Array.from({length:31},(_,step)=>storyPose(i,(30-step)/30)).reverse();
  assert.deepEqual(forward,reverse);
 }
 assert.deepEqual(storyPose(0,-1),storyPose(0,0));
 assert.deepEqual(storyPose(0,2),storyPose(0,1));
});
