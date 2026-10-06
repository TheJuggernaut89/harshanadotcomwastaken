import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function useStoryMotion(enabled,mode){
 useEffect(()=>{
  document.documentElement.dataset.motion=enabled?'on':'off';
  if(!enabled)return;
  const ctx=gsap.context(()=>{
   document.querySelectorAll('.project,.experience-row,.capabilities > div,.film-card').forEach(el=>{
    gsap.fromTo(el,{y:22},{y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
   });
   gsap.to(document.documentElement,{ '--read-progress':'100%',ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
  });
  const refresh=()=>ScrollTrigger.refresh();document.fonts.ready.then(refresh);
  return()=>ctx.revert();
 },[enabled,mode]);
}
