import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { projects, experience, capabilities } from './content';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-mono/latin-400.css';
import { Intro, MediaArchive } from './Story';
import { useStoryMotion } from './useStoryMotion';
import SelectedFilms from './SelectedFilms';
import AnimatedText from './AnimatedText';
import FolioHero from './FolioHero';
import './portfolio.css';
import './folio.css';

const email = 'mailto:jothiharshana188@gmail.com';
const resume = `${email}?subject=R%C3%A9sum%C3%A9%20request`;
const modePath = value => value === 'service' ? '/customer-service/' : value === 'ai' ? '/ai/' : '/';
const initialMode = () => /customer-service/.test(location.pathname) ? 'service' : /\/(ai|professional)(\/|$)/.test(location.pathname) ? 'ai' : 'marketing';
const statusMeaning = { LIVE: 'In use', PILOT: 'Being trialled', PROTOTYPE: 'Work in progress for testing', DEMO: 'Work sample or illustration', CONCEPT: 'Proposed; not yet built' };
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
    <div className="dialog-bar"><span className="eyebrow">Selected work / {project.status}: {statusMeaning[project.status]}</span><button autoFocus className="close-button" onClick={onClose} aria-label="Close case study">Close <span aria-hidden="true">×</span></button></div>
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
  return <div className="guide"><button className="text-link" aria-expanded={open} aria-controls="portfolio-guide" onClick={() => setOpen(!open)}>Ask about my experience or résumé <span aria-hidden="true">{open ? '−' : '+'}</span></button>{open && <div id="portfolio-guide"><p className="small">A simple guide with prepared answers about this portfolio. It is not a live AI assistant. Please leave personal information out of your question.</p><form onSubmit={ask}><label htmlFor="question">What would you like to know?</label><div className="guide-input"><input id="question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={500} placeholder="For example: how can I request a résumé?" required /><button className="button" disabled={busy}>{busy ? 'Checking…' : 'Ask'} <Arrow /></button></div></form><p className="guide-answer" role="status">{answer}</p></div>}</div>;
}
export default function Portfolio() {
  const [mode, setMode] = useState(initialMode), [selected, setSelected] = useState(null);
  const ai = mode === 'ai', service = mode === 'service';
  const [intro, setIntro] = useState(() => { try { return !sessionStorage.getItem('portfolio-intro-seen') && !new URLSearchParams(location.search).has('skipIntro'); } catch { return true; } });
  const [textReplay] = useState(0);
  const [motion, setMotion] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  useStoryMotion(motion, mode);
  useEffect(() => {const query=matchMedia('(prefers-reduced-motion: reduce)');const change=e=>setMotion(!e.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change);},[]);
  function finishIntro(value) {
    try {sessionStorage.setItem('portfolio-intro-seen','1');} catch { /* Storage may be disabled. */ }
    if(value !== mode) { history.pushState({},'',modePath(value)); setMode(value); }
    setIntro(false); requestAnimationFrame(()=>document.querySelector('.wordmark')?.focus());
  }
  useEffect(() => { const onPop = () => { setMode(initialMode()); setSelected(null); }; window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => {
    const title = `Harshana Jothi | ${service ? 'Customer Service' : ai ? 'AI & Automation' : 'Digital Marketing'}`;
    const description = service ? 'Customer service, visitor enquiries and operations experience by Harshana Jothi in Kuala Lumpur and Singapore.' : ai ? 'Business automations, reviewed transcription workflows and prototypes by Harshana Jothi, founder of Axiom Labs in Kuala Lumpur.' : 'Campaign design, video and content strategy by Harshana Jothi. Selected work, experience and direct contact in Kuala Lumpur.';
    document.title = title; document.documentElement.dataset.discipline = mode;
    const url = `https://harshanajothidotcomwastaken.netlify.app/${service ? 'customer-service/' : ai ? 'ai/' : ''}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    for (const [selector, value] of [['meta[name="description"]', description], ['meta[property="og:url"]', url], ['meta[property="og:title"]', title], ['meta[property="og:description"]', description]]) document.querySelector(selector)?.setAttribute('content', value);
  }, [mode, ai, service]);
  function changeMode(event, value) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault(); if (mode === value) return;
    history.pushState({}, '', value === 'ai' ? '/ai/' : '/'); setMode(value); setSelected(null); window.scrollTo({ top: 0, behavior: 'instant' });
  }
  return <>
    <div className="portfolio-page" inert={intro ? '' : undefined}><div className="reading-progress" aria-hidden="true" /><a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a href="/" onClick={e => changeMode(e, 'marketing')} className="wordmark" aria-label="Harshana Jothi, home">harshana<span>.</span></a><span className="header-location">KUALA LUMPUR / MALAYSIA</span><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href={resume}>Request résumé <Arrow /></a><a href="#contact" className="contact-nav">Discuss a role <Arrow /></a></nav></header>
    <main id="main">
      <div className="discipline-bar"><span className="eyebrow">One person. Three disciplines.</span><nav aria-label="Portfolio discipline"><a href="/" aria-current={!ai && !service ? 'page' : undefined} onClick={e => changeMode(e, 'marketing')}>Digital Marketing</a><a href="/ai/" aria-current={ai ? 'page' : undefined} onClick={e => changeMode(e, 'ai')}>AI & Automation</a><a href="/customer-service/" aria-current={service ? 'page' : undefined} onClick={e => changeMode(e, 'service')}>Customer Service</a></nav></div>
      <FolioHero service={service} ai={ai} motion={motion && !intro}/>
      <section className="axiom-destination" aria-labelledby="axiom-destination-title"><div><p className="eyebrow">My business. Your next project.</p><h2 id="axiom-destination-title">AXIOM<br/>LABS<span aria-hidden="true">↗</span></h2></div><div className="axiom-destination-copy"><h3>Put practical automation<br/>to work in your business.</h3><p>I build workflows for enquiries, bookings and everyday admin, with human checks and a clear handover. Explore my services and discuss what your business needs.</p><a href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer" className="axiom-destination-link">Explore Axiom Labs <Arrow /></a><span className="axiom-destination-domain">axiomlabs.my · Opens in a new tab</span></div></section>
      {service ? <section id="work" className="section service-work"><p className="eyebrow">Customer Service / People first</p><h2>Listen closely.<br/><em>Make the next step clear.</em></h2><p className="service-lead">My experience combines visitor enquiries, cross-cultural communication and working within clear procedures.</p><div className="service-roles">{experience.filter(item=>['PServ','JungleWalla Desaru','Certis CISCO'].includes(item.company)).map(item=><article key={item.company}><h3>{item.company}</h3><p className="eyebrow">{item.role}</p><p>{item.description}</p></article>)}</div><a className="button" href={`${email}?subject=Customer%20service%20opportunity`}>Discuss a customer service role <Arrow /></a></section> : <section id="work" className="section work-section" aria-labelledby="work-title"><div className="section-heading"><div><p className="eyebrow">Selected projects</p><h2 id="work-title"><AnimatedText key={`${mode}-${textReplay}`} active={motion && !intro}>{ai ? <>Automation<br /><em>projects.</em></> : <>Selected <em>work.</em></>}</AnimatedText></h2></div><p>{ai ? 'My business, the projects I’m developing, and the role I play in each.' : 'Food, places and the stories that make them memorable. A selection from my creative work.'}</p></div><>{!ai && <SelectedFilms motion={motion && !intro} />}<details className="work-studies" open={ai}><summary>Explore the design and fieldwork studies <span>+</span></summary><div className="project-grid">{projects[mode].map((project, index) => <article className={`project project-${index}`} key={project.id}>{project.id === 'axiom' ? <div className="axiom-feature"><div className="axiom-feature-heading"><p className="eyebrow">AXIOM LABS / MY BUSINESS</p><span className="status">LIVE WEBSITE</span></div><h3>Practical automation.<br /><em>Built around your business.</em></h3><p>I founded Axiom Labs to build workflows for enquiries, bookings and everyday admin, with clear checks and a handover on the client’s own accounts.</p><div className="axiom-services"><span>Enquiries &amp; replies</span><span>Bookings &amp; follow-ups</span><span>Human review &amp; handover</span></div><div className="axiom-actions"><a className="button" href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer">Explore Axiom Labs <Arrow /></a><button className="text-link" onClick={() => setSelected(project)}>See my role and approach <Arrow /></button></div><p className="axiom-disclosure">Explore services and project terms. Opens in a new tab.<br />Catalogue jobs are concepts, built when commissioned.</p></div> : <button className="project-open" onClick={() => setSelected(project)} aria-label={`View ${project.title} case study`}><div className={`project-visual ${project.visual || ''}`}>{project.image ? <Picture name={project.image} alt={project.alt} /> : project.visual === 'axiom' ? <div className="axiom-mark"><span>AXIOM LABS</span><p>Pick a job.<br /><em>I build it.</em></p><span>KUALA LUMPUR ↗</span></div> : <Workflow kind={project.workflow} />}<span className="project-open-arrow" aria-hidden="true">↗</span></div><div className="project-meta"><span>{project.category}</span><span className="status">{project.status}: {statusMeaning[project.status]}</span></div><h3>{project.title}</h3><p>{project.description}</p><span className="project-read">See my role and the project <span aria-hidden="true">↗</span></span></button>}</article>)}</div></details></><p className="work-footnote">{ai ? 'PILOT: being trialled. PROTOTYPE: work in progress. DEMO: an illustration, not a live deployment.' : 'DEMO labels identify this portfolio selection. Artwork is shown as a work sample; it is not evidence of a measured campaign result.'}</p></section>}
      {!service && <MediaArchive />}
      
      <section id="about" className="section about-section" aria-labelledby="about-title"><div className="about-portrait"><Picture name="portrait" alt="Harshana Jothi Sean smiling with an orange cat on his shoulder" /><p>Harshana Jothi Sean.<br />With a little company.</p></div><div className="about-copy"><p className="eyebrow">Beyond the work</p><h2 id="about-title"><AnimatedText key={`${mode}-${textReplay}`} active={motion && !intro}>Curious by nature.<br /><em>Hands-on by choice.</em></AnimatedText></h2><p>I’ve worked in customer service, security, nature tourism and marketing. That path taught me to listen closely, notice what gets in the way, and make things people can actually use.</p><p>Today I connect creative work with practical technology, from the first campaign idea to the workflow behind it. I’m based in Kuala Lumpur and founded Axiom Labs.</p><div className="about-links"><a className="text-link" href={resume}>Request my résumé <Arrow /></a></div><div className="education"><span className="eyebrow">Education & training</span><p>Business administration, UCSI University.<br />Adobe-certified design and video training.</p></div><div className="personal-note"><span>Outside work</span><p>Hiking, swing dancing, strength training and tinkering with game servers.</p></div></div></section>
      <section id="experience" className="section experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">Experience / The full picture</p><h2 id="experience-title">My journey<br /><em>so far.</em></h2></div><p>Marketing sits alongside operations and customer service in my work. My résumé is available by email.</p></div><div className="experience-list">{experience.map(item => <div className="experience-row" key={item.company}><h3>{item.company}</h3><span>{item.role}</span><p>{item.description}</p></div>)}</div></section>
      <section className="section capabilities-section" aria-labelledby="capabilities-title"><p className="eyebrow">My contribution / From brief to delivery</p><h2 id="capabilities-title"><AnimatedText key={`${mode}-${textReplay}`} active={motion && !intro}>{service ? <>Listen. Help. <em>Follow through.</em></> : ai ? <>Build. Check. <em>Hand over.</em></> : <>Think. Make. <em>Refine.</em></>}</AnimatedText></h2><div className="capabilities">{capabilities[mode].map(([title, copy, tools]) => <div key={title}><h3>{title}</h3><p>{copy}</p><span>{tools}</span></div>)}</div></section>
      <section id="contact" className="section contact-section" aria-labelledby="contact-title"><p className="eyebrow">The next chapter / Work with me</p><div className="contact-top"><h2 id="contact-title"><AnimatedText key={`${mode}-${textReplay}`} active={motion && !intro}>Let’s make<br /><em>something useful.</em></AnimatedText></h2><div><p>Tell me what you’re working on and where you need a hand. You’ll speak directly with me.</p><a className="button" href={`${email}?subject=Let%E2%80%99s%20work%20together`}>Email Harshana <Arrow /></a><a className="text-link" href="https://wa.me/601129649143" target="_blank" rel="noopener noreferrer">Or WhatsApp me <Arrow /></a></div></div><Guide /></section>
    </main><footer><a className="wordmark" href="#main">harshana<span>.</span></a><span>Kuala Lumpur, Malaysia</span><div><button onClick={()=>setIntro(true)}>Replay intro ↻</button><button aria-pressed={motion} onClick={()=>setMotion(!motion)}>Motion {motion ? 'on' : 'off'}</button><a href="https://github.com/TheJuggernaut89" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a><a href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer">Axiom Labs <Arrow /></a><a href={resume}>Request résumé <Arrow /></a></div><small>© {new Date().getFullYear()} Harshana Jothi Sean</small></footer>
    </div>{intro && <Intro mode={mode} onComplete={finishIntro} />}
    {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
  </>;
}
