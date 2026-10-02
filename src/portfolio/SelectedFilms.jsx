import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const films = [
  {id:'social-01',title:'Words with momentum.',label:'01 / Social film',note:'A square-format motion piece. Watch the full edit.',format:'SQUARE'},
  {id:'social-02',title:'Set the scene.',label:'02 / Social film',note:'An event-led visual story. Watch the full edit.',format:'SQUARE'},
  {id:'ckb-hogan',title:'Made to make you hungry.',label:'03 / Cream of Creams',note:'Two product films, from preparation to the finished cheesecake.',format:'PORTRAIT',pair:'ckb-july'}
];
function Preview({id,motion}) {
  const ref=useRef(null);
  useEffect(()=>{const v=ref.current;if(!motion){v.pause();return;}const io=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){if(!v.src)v.src=`/selected-films/${id}-preview.mp4`;v.play().catch(()=>{});}else v.pause();},{threshold:.25});io.observe(v);return()=>{io.disconnect();v.pause();};},[id,motion]);
  return <video ref={ref} poster={`/selected-films/${id}.jpg`} muted loop playsInline preload="none" aria-hidden="true" />;
}
Preview.propTypes={id:PropTypes.string.isRequired,motion:PropTypes.bool.isRequired};
function Screening({film,onClose}) {
  const ref=useRef(null),[active,setActive]=useState(film.id);
  useEffect(()=>{const trigger=document.activeElement,dialog=ref.current,overflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;trigger?.focus();};},[]);
  return <dialog ref={ref} className="media-dialog screening-dialog" aria-label={film.title} onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose();}}><div className="dialog-bar"><span>{film.label} / DEMO</span><button autoFocus onClick={onClose}>Close ×</button></div>{film.pair&&<div className="screening-tabs" aria-label="Choose a CKB film"><button aria-pressed={active===film.id} onClick={()=>setActive(film.id)}>01 / Hogan CKB</button><button aria-pressed={active===film.pair} onClick={()=>setActive(film.pair)}>02 / July CKB</button></div>}<video key={active} src={`/selected-films/${active}.mp4`} poster={`/selected-films/${active}.jpg`} autoPlay controls playsInline /><p>{film.title} Sound is available through the player controls.</p></dialog>;
}
Screening.propTypes={film:PropTypes.object.isRequired,onClose:PropTypes.func.isRequired};
export default function SelectedFilms({motion}) {
  const [selected,setSelected]=useState(null),[paused,setPaused]=useState(false);
  return <><div className="screening-toolbar"><span>SELECTED FILMS / DEMO</span><button aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'Play previews ▷':'Pause previews Ⅱ'}</button></div><div className="selected-films">{films.map(film=><article className={`film-card ${film.pair?'film-pair':''}`} key={film.id}><button className="film-open" onClick={()=>setSelected(film)} aria-label={`Watch ${film.title}`}><div className="film-window"><Preview id={film.id} motion={motion&&!paused&&!selected}/>{film.pair&&<Preview id={film.pair} motion={motion&&!paused&&!selected}/>}<span className="film-play">▷ <span>WATCH {film.pair?'THE FILMS':'THE FILM'}</span></span><span className="film-format">{film.format}</span></div><div className="film-caption"><span className="eyebrow">{film.label}</span><h3>{film.title}</h3><p>{film.note}</p><span className="film-arrow" aria-hidden="true">↗</span></div></button></article>)}</div>{selected&&<Screening film={selected} onClose={()=>setSelected(null)}/>}</>;
}
SelectedFilms.propTypes={motion:PropTypes.bool.isRequired};
