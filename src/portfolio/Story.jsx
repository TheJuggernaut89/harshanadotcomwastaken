import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export function Intro({ mode, onComplete }) {
  const frame = useRef(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function receive(e) {
      if(e.origin === location.origin && e.source === frame.current?.contentWindow && e.data?.type === 'portfolio-intro-complete' && ['marketing','ai'].includes(e.data.mode)) onComplete(e.data.mode);
    }
    const escape = e => { if(e.key === 'Escape') onComplete(mode); };
    window.addEventListener('message',receive); window.addEventListener('keydown',escape);
    return () => {document.body.style.overflow = previous; window.removeEventListener('message',receive);window.removeEventListener('keydown',escape);};
  }, [mode,onComplete]);
  return <div className="intro-screen" role="dialog" aria-modal="true" aria-label="Original interactive terminal intro"><iframe ref={frame} src={`/intro/?mode=${mode}`} title="Harshana’s original terminal intro" /><div className="intro-controls"><span>Interactive intro</span><button autoFocus onClick={() => onComplete(mode)}>Skip intro ↗</button></div></div>;
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

