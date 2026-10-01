import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { projects, experience, capabilities } from './content';
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
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a href="/" onClick={e => changeMode(e, 'marketing')} className="wordmark" aria-label="Harshana Jothi, home">harshana<span>.</span></a><span className="header-location">Independent mind. Kuala Lumpur.</span><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href={resume}>Résumé <Arrow /></a><a href="#contact" className="contact-nav">Let’s talk <Arrow /></a></nav></header>
    <main id="main">
      <div className="discipline-bar"><span className="eyebrow">One person. Two disciplines.</span><nav aria-label="Portfolio discipline"><a href="/" aria-current={!ai ? 'page' : undefined} onClick={e => changeMode(e, 'marketing')}>Digital Marketing</a><a href="/ai/" aria-current={ai ? 'page' : undefined} onClick={e => changeMode(e, 'ai')}>AI & Automation</a></nav></div>
      <section className={`hero ${ai ? 'hero-ai' : ''}`} aria-labelledby="hero-title" key={mode}>
        <div className="hero-copy"><p className="eyebrow"><span className="tiny-dot" /> Harshana Jothi Sean / {ai ? 'Builder & founder' : 'Marketing & creative'}</p><h1 id="hero-title">{ai ? <>Less busywork.<br /><em>More useful<br className="desktop-break" /> systems.</em></> : <>A good story.<br /><em>Made to<br className="desktop-break" /> move people.</em></>}</h1><p className="hero-description">{ai ? 'I build automations around the way people work. Clear inputs, a person at the right moment, and a handover you can understand.' : 'I’m Harshana. I bring together content strategy, design and video to give brands something worth paying attention to.'}</p><a href="#work" className="button">{ai ? 'Explore the projects' : 'See selected work'} <span aria-hidden="true">↓</span></a><div className="hero-note"><span>{ai ? 'Founder, Axiom Labs' : 'Design / Video / Content strategy'}</span><span>Based in Kuala Lumpur</span></div></div>
        {ai ? <div className="hero-art ai-art"><div className="blueprint-label"><span>THE WAY I BUILD</span><span>Human judgement included</span></div><Workflow /><div className="blueprint-note"><span className="hand-arrow" aria-hidden="true">↳</span><p>Automate the routine.<br /><em>Keep people in the loop.</em></p></div><p className="art-caption">Illustrative reply workflow / no live customer data</p></div> : <figure className="hero-art campaign-art"><Picture name="cheesecake" alt="Apam Balik Cheesecake campaign artwork for Cream of Creams" eager /><figcaption><span>Cream of Creams</span><span>Selected campaign artwork</span></figcaption></figure>}
      </section>
      <div className="practice-strip"><span>{ai ? 'Practical tools. Clear boundaries.' : 'From the idea to the final edit.'}</span><p>{ai ? 'Workflow design · n8n · APIs · Human review' : 'Content strategy · Art direction · Video · Social media'}</p></div>
      <section id="work" className="section work-section" aria-labelledby="work-title"><div className="section-heading"><div><p className="eyebrow">A closer look</p><h2 id="work-title">{ai ? <>Built with <em>purpose.</em></> : <>Selected <em>work.</em></>}</h2></div><p>{ai ? 'What I’m building, what it does, and what is still taking shape.' : 'Food, places and the stories that make them memorable. A selection from my creative work.'}</p></div><div className="project-grid">{projects[mode].map((project, index) => <article className={`project project-${index}`} key={project.id}><button className="project-open" onClick={() => setSelected(project)} aria-label={`View ${project.title} case study`}><div className={`project-visual ${project.visual || ''}`}>{project.image ? <Picture name={project.image} alt={project.alt} /> : project.visual === 'axiom' ? <div className="axiom-mark"><span>AXIOM LABS</span><p>Pick a job.<br /><em>I build it.</em></p><span>KUALA LUMPUR ↗</span></div> : <Workflow kind={project.workflow} />}<span className="project-open-arrow" aria-hidden="true">↗</span></div><div className="project-meta"><span>{project.category}</span><span className="status">{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><span className="project-read">Read the project <span aria-hidden="true">↗</span></span></button></article>)}</div><p className="work-footnote">{ai ? 'PILOT: being trialled. PROTOTYPE: work in progress. DEMO: an illustration, not a live deployment.' : 'DEMO labels identify this portfolio selection. Artwork is shown as a work sample; it is not evidence of a measured campaign result.'}</p></section>
      {ai && <section className="business-banner" aria-labelledby="business-title"><div><p className="eyebrow">My business / Axiom Labs</p><h2 id="business-title">Need it built<br /><em>for your business?</em></h2></div><div><p>My portfolio shows how I work. Axiom Labs is where you can explore the services, see the terms and discuss a project with me.</p><a href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer" className="button light">Commission a project at Axiom Labs <Arrow /></a><span className="small">Opens my business website in a new tab.</span></div></section>}
      <section id="about" className="section about-section" aria-labelledby="about-title"><div className="about-portrait"><Picture name="portrait" alt="Harshana Jothi Sean on a waterfall hike" /><p>Usually building something.<br />Sometimes out on a trail.</p></div><div className="about-copy"><p className="eyebrow">The person behind the work</p><h2 id="about-title">Curious by nature.<br /><em>Hands-on by choice.</em></h2><p>I’ve worked in customer service, security, nature tourism and marketing. That path taught me to listen closely, notice what gets in the way, and make things people can actually use.</p><p>Today I connect creative work with practical technology, from the first campaign idea to the workflow behind it. I’m based in Kuala Lumpur and founded Axiom Labs.</p><div className="about-links"><a className="text-link" href={resume}>Request my résumé <Arrow /></a><a className="text-link" href="https://www.linkedin.com/in/harshanajothi/" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a></div><div className="personal-note"><span>Outside work</span><p>Hiking, swing dancing, strength training and tinkering with game servers.</p></div></div></section>
      <section className="section experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">A varied path</p><h2 id="experience-title">Experience that<br /><em>joins the dots.</em></h2></div><p>Marketing sits alongside operations and customer service in my work. My résumé is available by email.</p></div><div className="experience-list">{experience.map(item => <div className="experience-row" key={item.company}><h3>{item.company}</h3><span>{item.role}</span><p>{item.description}</p></div>)}</div></section>
      <section className="section capabilities-section" aria-labelledby="capabilities-title"><p className="eyebrow">What I bring to the table</p><h2 id="capabilities-title">{ai ? <>Build. Check. <em>Hand over.</em></> : <>Think. Make. <em>Refine.</em></>}</h2><div className="capabilities">{capabilities[mode].map(([title, copy, tools]) => <div key={title}><h3>{title}</h3><p>{copy}</p><span>{tools}</span></div>)}</div></section>
      <section id="contact" className="section contact-section" aria-labelledby="contact-title"><p className="eyebrow">A role, a project, or a good question</p><div className="contact-top"><h2 id="contact-title">Let’s make<br /><em>something useful.</em></h2><div><p>Tell me what you’re working on and where you need a hand. You’ll speak directly with me.</p><a className="button" href={`${email}?subject=Let%E2%80%99s%20work%20together`}>Email Harshana <Arrow /></a><a className="text-link" href="https://wa.me/601129649143" target="_blank" rel="noopener noreferrer">Or WhatsApp me <Arrow /></a></div></div><Guide /></section>
    </main><footer><a className="wordmark" href="#main">harshana<span>.</span></a><span>Kuala Lumpur, Malaysia</span><div><a href="https://github.com/TheJuggernaut89" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a><a href="https://axiomlabs.my/" target="_blank" rel="noopener noreferrer">Axiom Labs <Arrow /></a><a href={resume}>Request résumé <Arrow /></a></div><small>© {new Date().getFullYear()} Harshana Jothi Sean</small></footer>
    {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
  </>;
}
