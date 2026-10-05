import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Adapted from Kokonut UI Background Paths, by Dorian Baffier (MIT).
// https://21st.dev/kokonutd/background-paths/default
// Path geometry follows the upstream generator; palette, density, layering and
// CSS motion are tailored to this portfolio. Licence ships in /licenses/.
function contour(index, position, amplitude) {
  const phase = index * .2;
  const points = Array.from({ length: 11 }, (_, i) => {
    const progress = i / 10, eased = 1 - (1 - progress) ** 2;
    const factor = 1 - eased * .3;
    const wave = Math.sin(progress * Math.PI * 3 + phase) * amplitude * .7 * factor
      + Math.cos(progress * Math.PI * 4 + phase) * amplitude * .3 * factor
      + Math.sin(progress * Math.PI * 2 + phase) * amplitude * .2 * factor;
    return { x: (2400 - 4800 * eased) * position, y: 800 + (-1600 + index * 25) * eased + wave };
  });
  return points.map((point, i) => {
    if (!i) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1], dx = point.x - prev.x;
    return `C ${prev.x + dx * .4} ${prev.y}, ${prev.x + dx * .6} ${point.y}, ${point.x} ${point.y}`;
  }).join(' ');
}
const contours = Array.from({ length: 18 }, (_, i) => contour(i, 1, i < 12 ? 150 : 100));

export default function DesignBackdrop({ active }) {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => { const update = () => setVisible(!document.hidden); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update); }, []);
  return <div className="design-backdrop" data-active={active && visible} aria-hidden="true">
    <div className="design-wash" />
    <svg className="design-contours" viewBox="-2400 -800 4800 1600" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs><linearGradient id="portfolio-contour-ink"><stop offset="0" stopColor="#77A8A8" /><stop offset=".65" stopColor="#77A8A8" /><stop offset="1" stopColor="#F4A261" /></linearGradient></defs>
      <g>{contours.map((d, i) => <path key={i} d={d} pathLength="1" stroke="url(#portfolio-contour-ink)" strokeWidth={2 + i * .13} style={{ '--path-delay': `${-i * 1.2}s`, opacity: .18 + i * .016 }} />)}</g>
    </svg>
    <div className="design-grain" />
    <div className="design-margin design-margin-left" /><div className="design-margin design-margin-right" />
  </div>;
}
DesignBackdrop.propTypes = { active: PropTypes.bool.isRequired };
