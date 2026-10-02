import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function AnimatedText({ children, active }) {
  const ref = useRef(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!active) { setEntered(false); return; }
    const observer = new IntersectionObserver(([entry]) => {
      setEntered(entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [active]);
  let index = 0;
  function words(nodes) {
    return Children.map(nodes, node => {
      if (typeof node === 'string') return node.split(/(\s+)/).map((word, i) => /^\s*$/.test(word) ? word : <span className="animated-word" style={{ '--word-delay': `${250 + Math.min(index++, 12) * 110}ms` }} key={i}>{word}</span>);
      if (isValidElement(node) && node.props.children) return cloneElement(node, {}, words(node.props.children));
      return node;
    });
  }
  return <span ref={ref} className={`animated-text ${active && entered ? 'text-entered' : ''}`}>{words(children)}</span>;
}
AnimatedText.propTypes = { children: PropTypes.node.isRequired, active: PropTypes.bool.isRequired };
