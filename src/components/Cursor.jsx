import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Gold cursor: a dot + a trailing ring that grows and shows a label
 *  over any element with data-cursor="View" (desktop only). */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);
  const { pathname } = useLocation();

  // clear the label when the page changes under a still mouse
  useEffect(() => setLabel(''), [pathname]);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return;
    document.documentElement.classList.add('has-cursor');

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let id;

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target.closest?.('[data-cursor]');
      const hover = e.target.closest?.('a, button, [role="button"], input, textarea, label');
      setLabel(t ? t.dataset.cursor : '');
      ring.current?.classList.toggle('is-hover', !!hover && !t);
    };
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');
    const leave = () => { dot.current.style.opacity = 0; ring.current.style.opacity = 0; };
    const enter = () => { dot.current.style.opacity = 1; ring.current.style.opacity = 1; };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      id = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${label ? 'has-label' : ''}`}>
        <span>{label}</span>
      </div>
    </>
  );
}
