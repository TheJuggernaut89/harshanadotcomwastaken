import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {disciplines} from './disciplines';

const welcomeStory = 'Welcome. I’m Harshana.\nI tell stories, build useful systems and help people find their next step.';
export function Intro({ mode, onComplete }) {
 const ref=useRef(null), choices=useRef(null);
 const [count,setCount]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches?welcomeStory.length:0);
 const ready=count>=welcomeStory.length;
 const [showChoices,setShowChoices]=useState(false);
 useEffect(()=>{if(showChoices)choices.current?.focus();},[showChoices]);
 useEffect(()=>{if(!ready)return;const timer=setTimeout(()=>setShowChoices(true),1600);return()=>clearTimeout(timer);},[ready]);
 useEffect(()=>{const dialog=ref.current;dialog.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=old;};},[]);
 useEffect(()=>{if(ready)return;const timer=setTimeout(()=>setCount(n=>Math.min(n+1,welcomeStory.length)),count===0?350:welcomeStory[count-1]==='.'?240:30);return()=>clearTimeout(timer);},[count,ready]);
 useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const changed=e=>{if(e.matches)setCount(welcomeStory.length);};query.addEventListener('change',changed);return()=>query.removeEventListener('change',changed);},[]);
 function skip(){setCount(welcomeStory.length);setShowChoices(true);requestAnimationFrame(()=>choices.current?.focus());}
 return <dialog ref={ref} className={'mode-intro story-intro '+(showChoices?'story-ready':'story-typing')} aria-labelledby={showChoices ? 'chapter-choices-title' : 'mode-intro-title'} onCancel={e=>{e.preventDefault();onComplete(mode);}}>
 <div className="mode-intro-top"><span>HARSHANA JOTHI <span className="intro-top-separator">/</span> A SHORT INTRODUCTION</span><button autoFocus onClick={skip}>Skip to choices <span aria-hidden="true">↓</span></button></div>
 <div className="welcome-scene" hidden={showChoices}><p className="eyebrow">Every career has a through-line. Mine is connection.</p><h1 id="mode-intro-title" className="welcome-small-title">A personal welcome.</h1><div className="welcome-note"><span className="welcome-note-label">A NOTE FROM HARSHANA</span><p className="welcome-typed" aria-hidden="true">{welcomeStory.slice(0,count)}{!ready&&<span className="type-cursor">▍</span>}</p><p className="sr-welcome">{welcomeStory}</p><span className="welcome-signature" aria-hidden="true">Harshana.</span></div></div>
 <div className="story-choice-region" hidden={!showChoices}><div className="story-choice-heading"><p className="eyebrow">The next chapter is yours to choose.</p><h2 id="chapter-choices-title" ref={choices} tabIndex={-1}>Where shall we begin?</h2><p>Three sides of my work. Start with the one that brought you here.</p></div><div className="mode-intro-options">{disciplines.map(d=><button className={'mode-choice mode-'+d.id} key={d.id} onClick={()=>onComplete(d.id)}><span className="mode-number">CHAPTER {d.number} / {d.tag}</span><strong>{d.name}</strong><span>{d.scope}</span><span className="mode-enter">Enter this chapter <b aria-hidden="true">↗</b></span></button>)}</div><p className="mode-intro-note">No wrong door. You can explore the other chapters at any time.</p></div>
 </dialog>;
}
Intro.propTypes = {mode:PropTypes.string.isRequired,onComplete:PropTypes.func.isRequired};

export function Showreel({ motion }) {
  const ref = useRef(null);
  const [playing,setPlaying] = useState(false);
  const manuallyPaused = useRef(false);
  const [phone] = useState(() => matchMedia('(max-width: 600px)').matches);
  useEffect(() => {
    const video = ref.current;
    if(!motion) {video.pause();return;}
    const observer = new IntersectionObserver(([entry]) => { if(entry.isIntersecting && !manuallyPaused.current) video.play().catch(()=>{}); else video.pause(); },{threshold:.15});
    observer.observe(video);
    return () => {observer.disconnect();video.pause();};
  },[motion]);
  return <figure className="showreel"><video ref={ref} src={`/media/showreel${phone?'-phone':''}.mp4`} poster={`/media/showreel${phone?'-phone':''}.jpg`} muted playsInline loop preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} aria-label="Compilation of product and nature footage from my portfolio" /><figcaption><span><i aria-hidden="true" /> FIELD NOTES / FOOD, PEOPLE, PLACES</span><button onClick={()=>{manuallyPaused.current=playing;if(playing)ref.current.pause();else ref.current.play().catch(()=>{});}}>{playing?'Pause film':'Play film'} <span aria-hidden="true">{playing?'Ⅱ':'▷'}</span></button></figcaption></figure>;
}
Showreel.propTypes = {motion:PropTypes.bool.isRequired};

function MediaViewer({item,onClose}) {
  const ref = useRef(null);
  useEffect(()=>{const trigger=document.activeElement;const dialog=ref.current;dialog.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;trigger?.focus();};},[]);
  return <dialog ref={ref} className="media-dialog" onCancel={onClose} aria-label={item.title} onClick={e=>{if(e.target===ref.current)onClose();}}><div className="dialog-bar"><span>{item.title} / WORK SAMPLE</span><button autoFocus onClick={onClose}>Close ×</button></div>{item.type==='video'?<video src={item.src} poster={item.poster} controls autoPlay playsInline />:<img src={item.src} alt={item.title} />}<p>From my original portfolio collection. Presented as a work sample, without a performance claim.</p></dialog>;
}
MediaViewer.propTypes = {item:PropTypes.object.isRequired,onClose:PropTypes.func.isRequired};

export function MediaArchive() {
  const [items,setItems]=useState([]),[type,setType]=useState('video'),[group,setGroup]=useState('All'),[limit,setLimit]=useState(6),[selected,setSelected]=useState(null),[error,setError]=useState(false);
  useEffect(()=>{const abort=new AbortController();fetch('/media/archive.json',{signal:abort.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(setItems).catch(e=>{if(e.name!=='AbortError')setError(true);});return()=>abort.abort();},[]);
  const filtered=items.filter(x=>x.type===type&&(group==='All'||x.group===group));
  return <section id="media" className="section media-section"><div className="section-heading"><div><p className="eyebrow">02 / The moving image</p><h2>LESS TALK.<br /><em>PRESS PLAY.</em></h2></div><p>Product films, nature, design and moments along the way. The original collection, with the videos up front.</p></div><div className="media-filters"><div aria-label="Media type">{['video','image'].map(t=><button key={t} aria-pressed={type===t} onClick={()=>{setType(t);setGroup('All');setLimit(6);}}>{t==='video'?'Films':'Photographs & design'} <span>{items.filter(x=>x.type===t).length || ''}</span></button>)}</div><label>Collection <select value={group} onChange={e=>{setGroup(e.target.value);setLimit(6);}}>{['All',...new Set(items.filter(x=>x.type===type).map(x=>x.group))].map(g=><option key={g}>{g}</option>)}</select></label></div>{error&&<p>The collection could not load. Please refresh to try again.</p>}{!error&&items.length>0&&filtered.length===0&&<p role="status">No items in this selection. Choose another collection or media type.</p>}<div className="media-grid">{filtered.slice(0,limit).map(item=><button className="media-tile" key={item.id} onClick={()=>setSelected(item)} aria-label={`Open ${item.title}`}><div><img src={item.poster} alt="" loading="lazy" width="480" height="640" /><span className="play-disc" aria-hidden="true">{type==='video'?'▷':'↗'}</span></div><span>{item.title}</span></button>)}</div>{filtered.length>limit&&<button className="text-link load-more" onClick={()=>setLimit(limit+12)}>Show more of the collection <span aria-hidden="true">+</span></button>}{selected&&<MediaViewer item={selected} onClose={()=>setSelected(null)} />}</section>;
}


