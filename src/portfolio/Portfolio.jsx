import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { projects, experience, capabilities } from './content';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-mono/latin-400.css';
import { Intro, Showreel, MediaArchive } from './Story';
import { useStoryMotion } from './useStoryMotion';
import SelectedFilms from './SelectedFilms';
import './portfolio.css';

const email = 'mailto:jothiharshana188@gmail.com';
const resume = `${email}?subject=R%C3%A9sum%C3%A9%20request`;
const initialMode = () => /\/(ai|professional)(\/|$)/.test(location.pathname) ? 'ai' : 'marketing';
const Arrow = () => <span aria-hidden="true">↗</span>;

function Picture({ name, alt, eager = false, className = '' }) {
  return <img className={className} src={`/media/${name}-960.webp`} srcSet={`/media/${name}-480.webp 480w, /media/${name}-960.webp 960w, /media/${name}-1440.webp 1440w`} sizes="(max-width: 700px) 100vw, 55vw" alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width="960" height="960" />;
}
function Workflow({ kind = 'reply' }) {
  const steps = kind === 'transcript' ? ['Recording + papers', 'Draft transcript', 'A person reviews', 'Checked delivery'] : ['Customer asks', 'Approved information', 'Draft + staff review', 'Reply with a record'];
  return <div className="workflow" aria-label="Illustrative workflow, not a live system"><div className="workflow-heading"><span className="eyebrow">Workflow study</span><span className="status">DEMO</span></div><ol>{steps.map(step => <li key={step}><span className="flow-dot" aria-hidden="true" />{step}</li>)}</ol><p>Missing information? Hold the draft and ask a person.</p></div>;
}
function CaseStudy({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const trigger = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previous; trigger?.focus(); };
  }, []);
  return <dialog ref={ref} className="case-dialog" aria-labelledby="case-title" onCancel={onClose} onClick={e => { if (e.target === ref.current) onClose(); }}>
    <div className="dialog-bar"><span className="eyebrow">Selected work / {project.status}</span><button autoFocus className="close-button" onClick={onClose} aria-label="Close case study">Close <span aria-hidden="true">×</span></button></div>
    <div className="case-body"><p className="eyebrow">{project.category}</p><h2 id="case-title">{project.title}</h2><p className="case-intro">{project.description}</p>
      {project.image && <Picture name={project.image} alt={project.alt} eager className="case-image" />}
      {project.workflow && <Workflow kind={project.workflow} />}
      <div className="case-sections">{project.sections.map(([heading, copy]) => <section key={heading}><h3>{heading}</h3><p>{copy}</p></section>)}</div>
      {project.gallery && <div className="case-gallery">{project.gallery.map(image => <figure key={image.name}><Picture name={image.name} alt={image.alt} /><figcaption>{image.caption}</figcaption></figure>)}</div>}
      {project.video && <figure className="case-video"><video controls playsInline preload="none" poster={`/media/${project.image}-960.webp`} src={`/media/${project.video}.mp4`} aria-label={project.videoLabel} /><figcaption>{project.videoLabel}. Sound is available through the player controls.</figcaption></figure>}
      {project.link && <a className="button" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} <Arrow /></a>}
      <a className="text-link" href={`${email}?subject=${encodeURIComponent('Discuss: ' + project.title)}`}>Ask me about this project <Arrow /></a>
    </div>
  </dialog>;
}
Picture.propTypes = { name: PropTypes.string.isRequired, alt: PropTypes.string.isRequired, eager: PropTypes.bool, className: PropTypes.string };
Workflow.propTypes = { kind: PropTypes.string };
CaseStudy.propTypes = { project: PropTypes.shape({ status: PropTypes.string.isRequired, category: PropTypes.string.isRequired, title: PropTypes.string.isRequired, description: PropTypes.string.isRequired, image: PropTypes.string, alt: PropTypes.string, workflow: PropTypes.string, sections: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired, gallery: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, alt: PropTypes.string, caption: PropTypes.string })), video: PropTypes.string, videoLabel: PropTypes.string, link: PropTypes.string, linkLabel: PropTypes.string }).isRequired, onClose: PropTypes.func.isRequired };
function Guide() {
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false), [answer, setAnswer] = useState(''), [question, setQuestion] = useState('');
  async function ask(event) {
    event.preventDefault();
    if (!question.trim() || busy) return;
    setBusy(true);
    try {
      const response = await fetch('/api/portfolio-guide', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question }), signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('Guide unavailable');
      setAnswer((await response.json()).answer);
    } catch { setAnswer('The guide is unavailable just now. You can reach Harshana directly at jothiharshana188@gmail.com.'); }
    finally { setBusy(false); }
  }
  return <div className="guide"><button className="text-link" aria-expanded={open} aria-controls="portfolio-guide" onClick={() => setOpen(!open)}>Quick questions about my work <span aria-hidden="true">{open ? '−' : '+'}</span></button>{open && <div id="portfolio-guide"><p className="small">A simple guide with prepared answers about this portfolio. It is not a live AI assistant. Please leave personal information out of your question.</p><form onSubmit={ask}><label htmlFor="question">What would you like to know?</label><div className="guide-input"><input id="question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={500} placeholder="For example: how can I request a résumé?" required /><button className="button" disabled={busy}>{busy ? 'Checking…' : 'Ask'} <Arrow /></button></div></form><p className="guide-answer" role="status">{answer}</p></div>}</div>;
}
export default function Portfolio() {
  const [mode, setMode] = useState(initialMode), [selected, setSelected] = useState(null);
  const ai = mode === 'ai';
  const [intro, setIntro] = useState(() => { try { return !sessionStorage.getItem('portfolio-intro-seen') && !new URLSearchParams(location.search).has('skipIntro'); } catch { return true; } });
  const [motion, setMotion] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  useStoryMotion(motion, mode);
  useEffect(() => {const query=matchMedia('(prefers-reduced-motion: reduce)');const change=e=>setMotion(!e.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change);},[]);
  function finishIntro(value) {
    try {sessionStorage.setItem('portfolio-intro-seen','1');} catch { /* Storage may be disabled. */ }
    if(value !== mode) { history.pushState({},'',value==='ai'?'/ai/':'/'); setMode(value); }
    setIntro(false); requestAnimationFrame(()=>document.querySelector('.wordmark')?.focus());
  }
  useEffect(() => { const onPop = () => { setMode(initialMode()); setSelected(null); }; window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => {
    const title = `Harshana Jothi | ${ai ? 'AI & Automation' : 'Digital Marketing'}`;
    const description = ai ? 'Business automations, reviewed transcription workflows and prototypes by Harshana Jothi, founder of Axiom Labs in Kuala Lumpur.' : 'Campaign design, video and content strategy by Harshana Jothi. Selected work, experience and direct contact in Kuala Lumpur.';
    document.title = title; document.documentElement.dataset.discipline = mode;
    const url = `https://harshanajothidotcomwastaken.netlify.app/${ai ? 'ai/' : ''}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    for (const [selector, value] of [['meta[name="description"]', description], ['meta[property="og:url"]', url], ['meta[property="og:title"]', title], ['meta[property="og:description"]', description]]) document.querySelector(selector)?.setAttribute('content', value);
  }, [mode, ai]);
  function changeMode(event, value) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault(); if (mode === value) return;
    history.pushState({}, '', value === 'ai' ? '/ai/' : '/'); setMode(value); setSelected(null); window.scrollTo({ top: 0, behavior: 'instant' });
  }
  return <>
    <div className="portfolio-page" inert={intro ? '' : undefined}><div className="reading-progress" aria-hidden="true" /><a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a href="/" onClick={e => changeMode(e, 'marketing')} className="wordmark" aria-label="Harshana Jothi, home">harshana<span>.</span></a><span className="header-location">KUALA LUMPUR / MALAYSIA</span><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href={resume}>Résumé <Arrow /></a><a href="#contact" className="contact-nav">Let’s talk <Arrow /></a></nav></header>
    <main id="main">
      <div className="discipline-bar"><span className="eyebrow">One person. Two disciplines.</span><nav aria-label="Portfolio discipline"><a href="/" aria-current={!ai ? 'page' : undefined} onClick={e => changeMode(e, 'marketing')}>Digital Marketing</a><a href="/ai/" aria-current={ai ? 'page' : undefined} onClick={e => changeMode(e, 'ai')}>AI & Automation</a></nav></div>
      <section className="hero" aria-labelledby="hero-title" key={mode}>
        <div className="hero-topline"><p className="eyebrow"><span className="tiny-dot" /> HARSHANA JOTHI SEAN</p><p className="eyebrow">{ai ? 'AI & AUTOMATION / FOUNDER, AXIOM LABS' : 'DIGITAL MARKETING / DESIGN & VIDEO'}</p></div>
        <div className="hero-headline"><h1 id="hero-title">IDEAS INTO<br /><span>{ai ? 'SYSTEMS.' : 'MOTION.'}</span></h1><div className="hero-intro"><span className="hero-symbol" aria-hidden="true">↳</span><p>{ai ? 'I turn the repetitive parts of a business into workflows people can understand, check and own.' : 'I’m Harshana. I turn an audience, an idea and a brief into stories you can see, hear and feel.'}</p><a className="text-link" href="#work">Explore my work ↓</a></div></div>
        <Showreel motion={motion && !intro} />
        <div className="hero-bottom"><span>STRATEGY IN THE THINKING. CRAFT IN THE MAKING.</span><a href="#media">Explore the film collection ↗</a></div>
      </section>
      <section className="story-statement section"><p className="eyebrow">Different tools. The same curiosity.</p><h2>{ai ? <>START WITH PEOPLE.<br /><em>THEN BUILD THE SYSTEM.</em></> : <>FIRST, MAKE THEM FEEL.<br /><em>THEN GIVE THEM A REASON.</em></>}</h2><div className="statement-note"><span aria-hidden="true">↳</span><p>{ai ? 'My background in customer service and operations keeps the work grounded. I look for the real task, the missing detail and the moment a person needs to step in.' : 'A beautiful piece of content still needs a job to do. I connect the visual idea to the audience, the message and what the business needs next.'}</p></div></section>
      <section id="work" className="section work-section" aria-labelledby="work-title"><div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">{ai ? <>Built with <em>purpose.</em></> : <>Selected <em>work.</em></>}</h2></div><p>{ai ? 'What I’m building, what it does, and what is still taking shape.' : 'Food, places and the stories that make them memorable. A selection from my creative work.'}</p></div><>{!ai && <SelectedFilms motion={motion && !intro} />}<details className="work-studies" open={ai}><summary>Explore the design and fieldwork studies <span>+</span></summary><div className="project-grid">{projects[mode].map((project, index) => <article className={`project project-${index}`} key={project.id}><button className="project-open" onClick={() => setSelected(project)} aria-label={`View ${project.title} case study`}><div className={`project-visual ${project.visual || ''}`}>{project.image ? <Picture name={project.image} alt={project.alt} /> : project.visual === 'axiom' ? <div className="axiom-mark"><span>AXIOM LABS</span><p>Pick a job.<br /><em>I build it.</em></p><span>KUALA LUMPUR ↗</span></div> : <Workflow kind={project.workflow} />}<span className="project-open-arrow" aria-hidden="true">↗</span></div><div className="project-meta"><span>{project.category}</span><span className="status">{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><span className="project-read">Read the project <span aria-hidden="true">↗</span></span></button></article>)}</div></details></><p className="work-footnote">{ai ? 'PILOT: being trialled. PROTOTYPE: work in progress. DEMO: an illustration, not a live deployment.' : 'DEMO labels identify this portfolio selection. Artwork is shown as a work sample; it is not evidence of a measured campaign result.'}</p></section>
      <MediaArchive />
      {ai && <section className="business-banner" aria-labelledby="business-title"><div><p className="eyebrow">My business / Axiom Labs</p><h2 id="business-title">Need it built<br /><em>for your business?</em></h2></div><div><p>My portfolio shows how I work. Axiom Labs is where you can explore the services, see the terms and discuss a project with me.</p><a href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer" className="button light">Commission a project at Axiom Labs <Arrow /></a><span className="small">Opens my business website in a new tab.</span></div></section>}
      <section id="about" className="section about-section" aria-labelledby="about-title"><div className="about-portrait"><Picture name="portrait" alt="Harshana Jothi Sean smiling with an orange cat on his shoulder" /><p>Harshana Jothi Sean.<br />With a little company.</p></div><div className="about-copy"><p className="eyebrow">03 / The person behind the work</p><h2 id="about-title">Curious by nature.<br /><em>Hands-on by choice.</em></h2><p>I’ve worked in customer service, security, nature tourism and marketing. That path taught me to listen closely, notice what gets in the way, and make things people can actually use.</p><p>Today I connect creative work with practical technology, from the first campaign idea to the workflow behind it. I’m based in Kuala Lumpur and founded Axiom Labs.</p><div className="about-links"><a className="text-link" href={resume}>Request my résumé <Arrow /></a><a className="text-link" href="https://www.linkedin.com/in/harshanajothi/" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a></div><div className="education"><span className="eyebrow">Education & training</span><p>Business administration, UCSI University.<br />Adobe-certified design and video training.</p></div><div className="personal-note"><span>Outside work</span><p>Hiking, swing dancing, strength training and tinkering with game servers.</p></div></div></section>
      <section className="section experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">04 / What I bring with me</p><h2 id="experience-title">Experience that<br /><em>joins the dots.</em></h2></div><p>Marketing sits alongside operations and customer service in my work. My résumé is available by email.</p></div><div className="experience-list">{experience.map(item => <div className="experience-row" key={item.company}><h3>{item.company}</h3><span>{item.role}</span><p>{item.description}</p></div>)}</div></section>
      <section className="section capabilities-section" aria-labelledby="capabilities-title"><p className="eyebrow">05 / From brief to delivery</p><h2 id="capabilities-title">{ai ? <>Build. Check. <em>Hand over.</em></> : <>Think. Make. <em>Refine.</em></>}</h2><div className="capabilities">{capabilities[mode].map(([title, copy, tools]) => <div key={title}><h3>{title}</h3><p>{copy}</p><span>{tools}</span></div>)}</div></section>
      <section id="contact" className="section contact-section" aria-labelledby="contact-title"><p className="eyebrow">06 / Your next chapter?</p><div className="contact-top"><h2 id="contact-title">Let’s make<br /><em>something useful.</em></h2><div><p>Tell me what you’re working on and where you need a hand. You’ll speak directly with me.</p><a className="button" href={`${email}?subject=Let%E2%80%99s%20work%20together`}>Email Harshana <Arrow /></a><a className="text-link" href="https://wa.me/601129649143" target="_blank" rel="noopener noreferrer">Or WhatsApp me <Arrow /></a></div></div><Guide /></section>
    </main><footer><a className="wordmark" href="#main">harshana<span>.</span></a><span>Kuala Lumpur, Malaysia</span><div><button onClick={()=>setIntro(true)}>Replay intro ↻</button><button aria-pressed={motion} onClick={()=>setMotion(!motion)}>Motion {motion ? 'on' : 'off'}</button><a href="https://github.com/TheJuggernaut89" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a><a href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer">Axiom Labs <Arrow /></a><a href={resume}>Request résumé <Arrow /></a></div><small>© {new Date().getFullYear()} Harshana Jothi Sean</small></footer>
    </div>{intro && <Intro mode={mode} onComplete={finishIntro} />}
    {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
  </>;
}
