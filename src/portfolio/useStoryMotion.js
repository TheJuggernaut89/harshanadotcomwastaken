import { useEffect } from 'react';
export function useStoryMotion(enabled, mode) {
  useEffect(()=>{
    document.documentElement.dataset.motion=enabled?'on':'off';
    if(!enabled)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('arrived');observer.unobserve(e.target);}}),{threshold:.08});
    document.querySelectorAll('.section-heading,.project,.experience-row,.capabilities > div,.about-copy,.story-statement').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
    let frame;
    const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const total=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--read-progress',`${total>0?scrollY/total*100:0}%`);});};
    window.addEventListener('scroll',update,{passive:true});update();
    return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',update);};
  },[enabled,mode]);
}
