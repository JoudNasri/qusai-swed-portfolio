import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Page from '../components/Page.jsx';
import CinemaViewer from '../components/CinemaViewer.jsx';
import { SplitText, FadeUp, RevealImage } from '../components/Reveal.jsx';
import { projects, projectDefaults, img } from '../data/site.js';
import { easeOut } from '../lib/smoothScroll.js';

export default function Project() {
  const { slug } = useParams();
  const idx = Math.max(0, projects.findIndex((p) => p.slug === slug));
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const meta = { ...projectDefaults, ...p };
  const [viewer, setViewer] = useState(null);

  const hero = useRef(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Page title={p.name}>
      <section className="p-hero" ref={hero}>
        <motion.div className="p-hero__media" style={{ y }}>
          <motion.img
            src={img(p.images[0])}
            alt={p.name}
            style={{ scale }}
            initial={{ filter: 'brightness(0.4) blur(6px)' }}
            animate={{ filter: 'brightness(1) blur(0px)' }}
            transition={{ duration: 2, ease: easeOut }}
          />
        </motion.div>
        <div className="p-hero__shade" />
        <motion.div className="p-hero__content container" style={{ opacity: fade }}>
          <p className="eyebrow">
            <span className="line" /> Project {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
          <h1 className="h-giant"><SplitText text={p.name} delay={0.5} /></h1>
          <FadeUp delay={0.9} as="p" className="p-hero__tag">{p.tagline}</FadeUp>
        </motion.div>
        <button className="p-hero__play" onClick={() => setViewer(0)} data-cursor="Play">
          <span>▶</span> Cinema mode
        </button>
      </section>

      <section className="section section--blood p-meta">
        <div className="container p-meta__grid">
          {[
            ['Client', p.name],
            ['Sector', meta.sector],
            ['Typology', p.category],
            ['Scope', meta.scope],
            ['Location', meta.location],
          ].map(([k, v], n) => (
            <FadeUp key={k} delay={n * 0.08} className="p-meta__item">
              <span>{k}</span>
              <strong>{v}</strong>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="section section--blood p-gallery">
        <div className="container">
          {p.images.map((name, n) => (
            <RevealImage
              key={name}
              src={img(name)}
              alt={`${p.name} ${n + 1}`}
              className={`p-gallery__img p-gallery__img--${n === 0 ? 'full' : n % 3 === 1 ? 'left' : n % 3 === 2 ? 'right' : 'full'}`}
              onClick={() => setViewer(n)}
              cursor="Expand"
            />
          ))}
          {p.images.length > 1 && (
            <FadeUp className="p-gallery__cta">
              <button className="btn btn--ghost" onClick={() => setViewer(0)}>
                <span>View in Cinema Mode</span>
              </button>
            </FadeUp>
          )}
        </div>
      </section>

      <Link to={`/works/${next.slug}`} className="p-next" data-cursor="Next">
        <img src={img(next.images[0])} alt="" loading="lazy" />
        <div className="p-next__shade" />
        <div className="p-next__content">
          <p className="eyebrow"><span className="line" /> Next project</p>
          <h2 className="h-giant">{next.name}</h2>
          <span className="p-next__arrow">→</span>
        </div>
      </Link>

      <CinemaViewer images={p.images} title={p.name} index={viewer} onClose={() => setViewer(null)} />
    </Page>
  );
}
