import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Page from '../components/Page.jsx';
import { SplitText, FadeUp } from '../components/Reveal.jsx';
import { projects, img } from '../data/site.js';
import { ease, easeOut } from '../lib/smoothScroll.js';

export default function Works() {
  const [view, setView] = useState('gallery');

  return (
    <Page title="Works">
      <section className="page-hero page-hero--works">
        <div className="container">
          <p className="eyebrow"><span className="line" /> Portfolio</p>
          <h1 className="h-giant">
            <SplitText text="Selected" />
            <SplitText text="Works" className="gold-text italic" delay={0.12} />
          </h1>
          <div className="works-bar">
            <FadeUp as="p" className="works-bar__count">
              <strong className="gold-text">{String(projects.length).padStart(2, '0')}</strong> luxury boutiques
            </FadeUp>
            <div className="toggle" role="tablist">
              {['gallery', 'index'].map((v) => (
                <button key={v} className={view === v ? 'is-active' : ''} onClick={() => setView(v)}>
                  {view === v && <motion.span layoutId="toggle-pill" className="toggle__pill" transition={{ duration: 0.6, ease }} />}
                  <span>{v === 'gallery' ? 'Gallery' : 'Index'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={view}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="works-body"
        >
          {view === 'gallery' ? <Gallery /> : <IndexList />}
        </motion.section>
      </AnimatePresence>
    </Page>
  );
}

/* Asymmetric cinematic gallery */
function Gallery() {
  return (
    <div className="container gallery">
      {projects.map((p, n) => (
        <motion.div
          key={p.slug}
          className={`gallery__item gallery__item--${n % 4}`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: easeOut }}
        >
          <Link to={`/works/${p.slug}`} data-cursor="View">
            <motion.div
              className="gallery__frame"
              initial={{ clipPath: 'inset(12% 12% 12% 12%)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.5, ease }}
            >
              <img src={img(p.images[0], n % 4 === 0 ? 'lg' : 'sm')} alt={p.name} loading="lazy" />
              <span className="gallery__shine" />
              <span className="gallery__count">{p.images.length} frames</span>
            </motion.div>
            <div className="gallery__info">
              <span className="gallery__no">{String(n + 1).padStart(2, '0')}</span>
              <div>
                <h3>{p.name}</h3>
                <p>{p.category}</p>
              </div>
              <span className="gallery__arrow">→</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

/* Editorial index with a floating preview that follows the cursor */
function IndexList() {
  const [active, setActive] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 140, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 140, damping: 20, mass: 0.6 });

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <div className="container index" onMouseLeave={() => setActive(null)}>
      {projects.map((p, n) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easeOut, delay: (n % 6) * 0.05 }}
        >
          <Link
            to={`/works/${p.slug}`}
            className={`index__row ${active !== null && active !== n ? 'is-dim' : ''}`}
            onMouseEnter={() => setActive(n)}
          >
            <span className="index__no">{String(n + 1).padStart(2, '0')}</span>
            <img className="index__thumb" src={img(p.images[0], 'sm')} alt="" loading="lazy" />
            <h3 className="index__name">{p.name}</h3>
            <span className="index__cat">{p.category}</span>
            <span className="index__arrow">→</span>
          </Link>
        </motion.div>
      ))}

      <motion.div className="index__float" style={{ x, y }}>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              className="index__float-inner"
              initial={{ opacity: 0, scale: 0.85, clipPath: 'inset(50% 0 50% 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0% 0)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease }}
            >
              <img src={img(projects[active].images[0], 'sm')} alt="" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
