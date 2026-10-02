import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function AnimatedText({ children, active }) {
  const ref = useRef(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!active) { setEntered(false); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [active, children]);
  let index = 0;
  function words(nodes) {
    return Children.map(nodes, node => {
      if (typeof node === 'string') return node.split(/(\s+)/).map((word, i) => /^\s*$/.test(word) ? word : <span className="animated-word" style={{ '--word-delay': `${Math.min(index++, 12) * 65}ms` }} key={i}>{word}</span>);
      if (isValidElement(node) && node.props.children) return cloneElement(node, {}, words(node.props.children));
      return node;
    });
  }
  return <span ref={ref} className={`animated-text ${active && entered ? 'text-entered' : ''}`}>{words(children)}</span>;
}
AnimatedText.propTypes = { children: PropTypes.node.isRequired, active: PropTypes.bool.isRequired };
