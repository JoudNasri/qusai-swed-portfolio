import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { img } from '../data/site.js';
import { ease, easeOut, lockScroll } from '../lib/smoothScroll.js';

const AUTOPLAY_MS = 5000;

/** Full-screen cinematic viewer: letterbox bars, Ken Burns motion,
 *  keyboard / swipe navigation, autoplay and a thumbnail strip. */
export default function CinemaViewer({ images, title, index, onClose }) {
  const open = index !== null && index !== undefined;
  const [i, setI] = useState(index ?? 0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (open) setI(index);
  }, [index, open]);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const go = useCallback(
    (d) => {
      setDir(d);
      setI((x) => (x + d + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open, go, onClose]);

  useEffect(() => {
    if (!open || !playing) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [open, playing, i, go]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cinema"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
          transition={{ duration: 0.5 }}
        >
          {/* letterbox bars */}
          <motion.div className="cinema__bar cinema__bar--top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.9, ease }} />
          <motion.div className="cinema__bar cinema__bar--bottom" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.9, ease }} />

          <div className="cinema__stage">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={i}
                className="cinema__slide"
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 80, filter: 'blur(8px)' }),
                  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (d) => ({ opacity: 0, x: d * -80, filter: 'blur(8px)' }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1, ease: easeOut }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              >
                <motion.img
                  src={img(images[i])}
                  alt={`${title} — ${i + 1}`}
                  draggable={false}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: 'linear' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="cinema__head">
            <div>
              <p className="eyebrow">Now viewing</p>
              <h3 className="cinema__title">{title}</h3>
            </div>
            <button className="cinema__close" onClick={onClose} aria-label="Close">
              <span /><span />
            </button>
          </div>

          <div className="cinema__foot">
            <div className="cinema__count">
              <span className="gold-text">{String(i + 1).padStart(2, '0')}</span>
              <i />
              <span>{String(images.length).padStart(2, '0')}</span>
            </div>

            <div className="cinema__thumbs">
              {images.map((name, n) => (
                <button
                  key={name}
                  className={`cinema__thumb ${n === i ? 'is-active' : ''}`}
                  onClick={() => { setDir(n > i ? 1 : -1); setI(n); }}
                >
                  <img src={img(name, 'sm')} alt="" />
                  {n === i && playing && (
                    <motion.span
                      className="cinema__progress"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="cinema__ctrl">
              <button onClick={() => go(-1)} aria-label="Previous">←</button>
              <button onClick={() => setPlaying((p) => !p)} className="cinema__play">
                {playing ? 'Pause' : 'Play'}
              </button>
              <button onClick={() => go(1)} aria-label="Next">→</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
