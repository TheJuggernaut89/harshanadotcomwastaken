import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import './spatial-story.css';
gsap.registerPlugin(ScrollTrigger);

const beats = [
  {id:'story-intro',title:<>Harshana<br/>Jothi.</>,copy:'Digital marketer and AI automation builder. I make the content and connect the work behind it.',image:'/media/portrait-960.webp',alt:'Harshana with an orange cat on his shoulder'},
  {id:'story-people',title:<>It starts <br/>with people.</>,copy:'Customer service, security and nature tourism taught me to listen. At JungleWalla, that understanding became part of the story I told.',image:'/media/jungle-960.webp',alt:'Forest wildlife from the JungleWalla collection'},
  {id:'story-content',title:<>An idea. <br/>An edit. <br/>A story.</>,copy:'For Cream of Creams, I bring together social content, design and video. These are pieces from my actual portfolio.',image:'/selected-films/ckb-july.jpg',alt:'Cheesecake from a supplied Cream of Creams film'},
  {id:'story-systems',title:<>Make the work <br/>work together.</>,copy:'I founded Axiom Labs to connect repetitive tasks into practical workflows, with human checks and a clear handover.',image:'/media/cream-social-960.webp',alt:'A design from the original creative work collection'}
];

export default function SpatialStory({motion,enabled,onMotionChange}) {
  const root=useRef(null),host=useRef(null);
  const [failed,setFailed]=useState(false),[ready,setReady]=useState(false),[flat,setFlat]=useState(false);
  const staticMode=!motion||flat||failed;
  useEffect(()=>{
    setReady(false);
    if(staticMode||!enabled)return;
    let disposed=false,cleanup=()=>{};
    import('./spatial-scene').then(({mountScene})=>{
      if(disposed)return;
      cleanup=mountScene(host.current,root.current,{onReady:()=>{if(!disposed)setReady(true);},onError:()=>{if(!disposed)setFailed(true);}});
    }).catch(()=>{if(!disposed)setFailed(true);});
    return()=>{disposed=true;cleanup();};
  },[staticMode,enabled]);
  return <section ref={root} className={`spatial-story ${staticMode?'spatial-static':''} ${ready?'spatial-ready':''}`} aria-label="Harshana’s story">
    <div className="spatial-stage" aria-hidden="true"><img className="spatial-poster" src="/media/portrait-960.webp" alt=""/><div ref={host} className="spatial-canvas"/><div className="spatial-shade"/></div>
    <div className="spatial-controls"><a href="#work">Skip to selected work</a><button onClick={()=>{if(staticMode){setFailed(false);setFlat(false);setReady(false);onMotionChange(true);}else setFlat(true);}}>{staticMode?'Try 3D story':'View without 3D'}</button><button aria-pressed={motion} onClick={()=>onMotionChange(!motion)}>Motion {motion?'on':'off'}</button></div>
    {failed&&<p className="spatial-notice" role="status">3D is unavailable on this device. Your story and work are shown below.</p>}
    <div className="spatial-track">{beats.map((beat,i)=><section id={beat.id} className="spatial-beat" key={beat.id}>
      <div className="spatial-copy">{i===0?<h1>{beat.title}</h1>:<h2>{beat.title}</h2>}<p>{beat.copy}</p>
        {i===0?<div className="spatial-actions"><a className="button" href="mailto:jothiharshana188@gmail.com?subject=Discuss%20a%20role">Discuss a role</a><a href="#experience">Experience &amp; résumé</a></div>:i===3?<div className="spatial-actions"><a className="button" href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer">Explore Axiom Labs</a><a href="#work">See the projects</a></div>:<a className="text-link" href={i===1?'#experience':'#work'}>{i===1?'See my experience':'Watch the full films'}</a>}
      </div>
      <figure className="spatial-still"><img src={beat.image} alt={beat.alt} loading={i===0?'eager':'lazy'}/></figure>
    </section>)}</div>
    <nav className="spatial-index" aria-label="Story navigation">{beats.map((beat,i)=><a key={beat.id} href={`#${beat.id}`}>{['Harshana','People','Creative work','Systems'][i]}</a>)}</nav>
  </section>;
}
SpatialStory.propTypes={motion:PropTypes.bool.isRequired,enabled:PropTypes.bool.isRequired,onMotionChange:PropTypes.func.isRequired};

