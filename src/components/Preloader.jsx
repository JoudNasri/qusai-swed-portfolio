import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from '../lib/smoothScroll.js';
import { site } from '../data/site.js';

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const duration = 2000;
    const start = performance.now();
    let id;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-in-out progress feels more cinematic than linear
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setCount(Math.round(e * 100));
      if (p < 1) id = requestAnimationFrame(tick);
      else setTimeout(() => {
        document.documentElement.style.overflow = '';
        done.current();
      }, 350);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      className="preloader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1.1, ease }}
    >
      <div className="preloader__center">
        <motion.svg
          className="preloader__mono"
          viewBox="0 0 120 120"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <motion.circle
            cx="60" cy="60" r="56"
            fill="none" stroke="url(#pg)" strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease }}
          />
          <defs>
            <linearGradient id="pg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#8a6a26" />
              <stop offset="0.5" stopColor="#f1d999" />
              <stop offset="1" stopColor="#b8903a" />
            </linearGradient>
          </defs>
          <text x="60" y="62" textAnchor="middle" dominantBaseline="middle" className="preloader__qs">QS</text>
        </motion.svg>
        <motion.p
          className="preloader__name"
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 1.8, ease }}
        >
          {site.name}
        </motion.p>
      </div>
      <div className="preloader__bar">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
      <div className="preloader__count">{String(count).padStart(3, '0')}</div>
    </motion.div>
  );
}
