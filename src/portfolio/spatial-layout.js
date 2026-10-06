export function storyPose(index,progress){
 const p=Math.max(0,Math.min(1,progress));
 const time=p*3,stage=Math.min(2,Math.floor(time));
 const f=time-stage,blend=f*f*(3-2*f);
 function at(s){
  if(s===0)return {x:index===0?0:(index-2.5)*.85,y:Math.sin(index)*.16,z:index===0?1:-index*.35,rx:0,ry:(index-2.5)*.15,rz:(index-2.5)*-.09};
  if(s===1)return {x:index===1?0:(index-2.5)*1.6,y:index===1?.25:Math.sin(index)*.7,z:index===1?1:-2-Math.abs(index-1)*.3,rx:.03,ry:index===1?-.12:(index-2.5)*.15,rz:index===1?.03:(index-2.5)*.12};
  if(s===2)return {x:(index%3-1)*2.65,y:Math.floor(index/3)*-3.2+1.6,z:(index%3)*-.4,rx:0,ry:-.08,rz:0};
  return {x:(index-2.5)*1.5,y:Math.sin(index*.7)*.6,z:0,rx:-.08,ry:.45,rz:0};
 }
 const a=at(stage),b=at(stage+1);
 return Object.fromEntries(Object.keys(a).map(key=>[key,a[key]+(b[key]-a[key])*blend]));
}
