import { Children, cloneElement, isValidElement, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
gsap.registerPlugin(ScrollTrigger);
export default function AnimatedText({children,active}) {
 const ref=useRef(null);
 useLayoutEffect(()=>{
  if(!active)return;
  const ctx=gsap.context(()=>{
   gsap.fromTo(ref.current.querySelectorAll('.animated-word'),{yPercent:55,opacity:.15},{yPercent:0,opacity:1,duration:.95,stagger:.085,ease:'power3.out',scrollTrigger:{trigger:ref.current,start:'top 92%',toggleActions:'play none none restart'}});
  },ref);
  return()=>ctx.revert();
 },[active]);
 function words(nodes){return Children.map(nodes,node=>{
  if(typeof node==='string')return node.split(/(\s+)/).map((word,i)=>/^\s*$/.test(word)?word:<span className="animated-word" key={i}>{word}</span>);
  if(isValidElement(node)&&node.props.children)return cloneElement(node,{},words(node.props.children));
  return node;
 });}
 return <span ref={ref} className="animated-text gsap-text">{words(children)}</span>;
}
AnimatedText.propTypes={children:PropTypes.node.isRequired,active:PropTypes.bool.isRequired};
