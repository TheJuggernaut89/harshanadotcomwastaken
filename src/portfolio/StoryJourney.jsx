import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import { Showreel } from './Story';
gsap.registerPlugin(ScrollTrigger);

export default function StoryJourney({motion}) {
  const ref=useRef(null);
  useEffect(()=>{
    if(!motion)return;
    const ctx=gsap.context(()=>{
      ref.current.querySelectorAll('.story-scene').forEach(scene=>{
        gsap.fromTo(scene.querySelector('.scene-copy'),{y:28},{y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:scene,start:'top 78%',once:true}});
        gsap.fromTo(scene.querySelector('.scene-rule'),{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:scene,start:'top 80%',end:'bottom 60%',scrub:.4}});
      });
    },ref);
    return()=>ctx.revert();
  },[motion]);
  return <div ref={ref} className="story-journey">
    <section id="story-people" className="story-scene"><div className="scene-copy"><p className="eyebrow">01 / Learn to notice</p><h2>Before the tools,<br /><em>the people.</em></h2><p>Customer service, security and nature tourism taught me to listen, explain clearly and notice what people need.</p><p>At JungleWalla, being a naturalist sat alongside marketing communications. Understanding the experience helped me tell its story.</p><div className="scene-takeaway"><span>What I bring to a team</span><strong>Audience understanding, grounded in working with people.</strong></div><a className="text-link" href="#experience">See the roles behind the story ↓</a></div><figure className="scene-visual"><img src="/media/jungle-960.webp" srcSet="/media/jungle-480.webp 480w, /media/jungle-960.webp 960w, /media/jungle-1440.webp 1440w" sizes="(max-width:700px) 100vw, 55vw" alt="A gibbon in a forest canopy, from the JungleWalla portfolio collection" loading="lazy"/><figcaption>JungleWalla / Nature tourism &amp; communication</figcaption></figure><div className="scene-rule" aria-hidden="true" /></section>
    <section id="story-content" className="story-scene scene-content"><div className="scene-copy"><p className="eyebrow">02 / Turn attention into a story</p><h2>Make the idea<br /><em>worth watching.</em></h2><p>At Cream of Creams, I bring together social content, design and video to put the product at the centre of the story.</p><p>The work moves from a message to a visual direction, then into an edit people can watch. Here is what that looks like.</p><div className="scene-takeaway"><span>What I bring to a team</span><strong>Content planning and hands-on creative production.</strong></div><a className="text-link" href="#work">Explore the selected work ↓</a></div><div className="scene-visual"><Showreel motion={motion}/><p className="scene-caption">A short edit from the original food and nature collection.</p></div><div className="scene-rule" aria-hidden="true" /></section>
    <section id="story-systems" className="story-scene scene-systems"><div className="scene-copy"><p className="eyebrow">03 / Look behind the work</p><h2>A good idea needs<br /><em>a working process.</em></h2><p>Creative work also has a less visible side: enquiries, repeated tasks and handovers. That is where my automation work comes in.</p><p>I founded Axiom Labs to build practical workflows, with approved information, clear checks and a person responsible for the important decisions.</p><div className="scene-takeaway"><span>What I bring to a team</span><strong>Creative execution and the ability to connect the process behind it.</strong></div><a className="text-link" href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer">Explore my business, Axiom Labs ↗</a></div><figure className="scene-visual process-story"><figcaption>Illustrative workflow / DEMO</figcaption><ol><li><span>THE INPUT</span><strong>A customer asks.</strong><p>Start with the actual enquiry.</p></li><li><span>THE WORK</span><strong>Prepare a useful draft.</strong><p>Use information the business has approved.</p></li><li><span>THE CHECK</span><strong>A person decides.</strong><p>Review the answer. Ask when something is missing.</p></li></ol><p>Automation supports judgement. Responsibility stays clear.</p></figure><div className="scene-rule" aria-hidden="true" /></section>
  </div>;
}
StoryJourney.propTypes={motion:PropTypes.bool.isRequired};
