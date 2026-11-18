import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Page from '../components/Page.jsx';
import Marquee from '../components/Marquee.jsx';
import { SplitText, FadeUp, ScrollWords, RevealImage } from '../components/Reveal.jsx';
import { projects, heroSlides, featured, services, site, img } from '../data/site.js';
import { ease, easeOut } from '../lib/smoothScroll.js';

const bySlug = (s) => projects.find((p) => p.slug === s);

export default function Home({ ready }) {
  return (
    <Page title="Interior Design & Fit-Out" footerCta={false}>
      <Hero ready={ready} />
      <Intro />
      <section className="band band--blood">
        <Marquee items={projects.map((p) => p.name)} />
      </section>
      <FeaturedReel />
      <Disciplines />
      <Cta />
    </Page>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
const SLIDE_MS = 6500;

function Hero({ ready }) {
  const [i, setI] = useState(0);
  const slides = heroSlides.map(bySlug);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setI((x) => (x + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, slides.length]);

  const current = slides[i];

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={current.slug}
            className="hero__slide"
            initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 1.6, ease }}
          >
            <motion.img
              src={img(current.images[0])}
              alt={current.name}
              initial={{ scale: 1.22 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: SLIDE_MS / 1000 + 1.6, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero__shade" />
      </motion.div>

      <motion.div className="hero__content" style={{ opacity: fade }}>
        <motion.p
          className="eyebrow hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
        >
          <span className="line" /> {site.role} — {site.location}
        </motion.p>
        <h1 className="hero__title">
          <SplitText text={site.firstName} animate={ready} delay={0.45} />
          <SplitText text={site.lastName} animate={ready} delay={0.6} className="gold-text italic hero__last" />
        </h1>
        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: easeOut, delay: 1 }}
        >
          Luxury boutiques for the world’s finest jewellery and watch maisons —
          designed with intent, fitted out with precision.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: easeOut, delay: 1.15 }}
        >
          <Link to="/works" className="btn btn--gold"><span>Explore the Works</span></Link>
          <Link to="/about" className="btn btn--ghost"><span>About Qusai</span></Link>
        </motion.div>
      </motion.div>

      <div className="hero__meta">
        <div className="hero__counter">
          <span className="gold-text">{String(i + 1).padStart(2, '0')}</span>
          <span className="hero__bar">
            <motion.i key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }} />
          </span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            className="hero__caption"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <Link to={`/works/${current.slug}`}>
              <small>{current.category}</small>
              {current.name} <span>→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero__scroll"><span>Scroll</span><i /></div>
    </section>
  );
}

/* ───────────────────────── INTRO ───────────────────────── */
function Intro() {
  return (
    <section className="intro section section--ivory">
      <div className="veins" aria-hidden />
      <div className="container">
        <FadeUp className="eyebrow eyebrow--dark"><span className="line" /> The Practice</FadeUp>
        <ScrollWords
          className="intro__text"
          text="Every boutique is a stage for something precious. I shape spaces where architecture, light and material are tuned to the value of what they hold — from the first concept to the final fit-out."
        />
        <div className="intro__stats">
          <FadeUp delay={0.05}><strong className="gold-text">{projects.length}</strong><span>Luxury brand projects</span></FadeUp>
          <FadeUp delay={0.15}><strong className="gold-text">3</strong><span>Disciplines — design, fit-out, safety</span></FadeUp>
          <FadeUp delay={0.25}><strong className="gold-text">1</strong><span>Standard — flawless on opening day</span></FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FEATURED: pinned horizontal cinematic reel ───────────── */
function FeaturedReel() {
  const items = featured.map(bySlug);
  const wrap = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const [desktop, setDesktop] = useState(true);

  useLayoutEffect(() => {
    const measure = () => {
      const d = window.innerWidth > 900;
      setDesktop(d);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 600);
    return () => { window.removeEventListener('resize', measure); clearTimeout(t); };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={wrap}
      className="reel"
      style={desktop ? { height: `calc(100vh + ${dist}px)` } : undefined}
    >
      <div className="reel__sticky">
        <motion.div ref={track} className="reel__track" style={desktop ? { x } : undefined}>
          <div className="reel__intro">
            <p className="eyebrow"><span className="line" /> Selected Works</p>
            <h2 className="h-display">
              <SplitText text="Spaces worthy" />
              <SplitText text="of the jewels" className="gold-text italic" delay={0.1} />
            </h2>
            <p className="reel__lead">
              A curated selection of boutiques for maisons including {items.slice(0, 3).map((p) => p.name).join(', ')} and more.
            </p>
            {desktop && <p className="reel__hint">Scroll to explore <span>→</span></p>}
          </div>

          {items.map((p, n) => (
            <Link to={`/works/${p.slug}`} key={p.slug} className="reel__card" data-cursor="View">
              <div className="reel__frame">
                <img src={img(p.images[0])} alt={p.name} loading="lazy" />
                <span className="reel__no">{String(n + 1).padStart(2, '0')}</span>
              </div>
              <div className="reel__info">
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
              </div>
            </Link>
          ))}

          <Link to="/works" className="reel__more" data-cursor="All">
            <span className="reel__more-circle">
              <em>View all</em>
              <strong>{projects.length} projects</strong>
            </span>
          </Link>
        </motion.div>

        {desktop && (
          <div className="reel__progress">
            <motion.span style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── DISCIPLINES ───────────────────────── */
function Disciplines() {
  return (
    <section className="section section--ivory disc">
      <div className="container">
        <div className="section-head">
          <FadeUp className="eyebrow eyebrow--dark"><span className="line" /> What I do</FadeUp>
          <h2 className="h-display h-display--dark">
            <SplitText text="From concept" />
            <SplitText text="to opening day" className="gold-text italic" delay={0.1} />
          </h2>
        </div>
        <div className="disc__grid">
          {services.slice(0, 3).map((s, n) => (
            <FadeUp key={s.no} delay={n * 0.12} className="disc__card">
              <Link to="/services">
                <RevealImage src={img(s.image, 'sm')} alt={s.title} delay={n * 0.12} />
                <div className="disc__body">
                  <span className="disc__no">{s.no}</span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <span className="u-link u-link--dark">Discover <i>→</i></span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */
function Cta() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05]);
  return (
    <section className="cta" ref={ref}>
      <motion.img className="cta__bg" src={img('silk')} alt="" style={{ y, scale }} />
      <div className="cta__shade" />
      <div className="cta__content">
        <p className="eyebrow"><span className="line" /> Next project</p>
        <h2 className="h-display">
          <SplitText text="Your maison deserves" />
          <SplitText text="a flawless stage" className="gold-text italic" delay={0.1} />
        </h2>
        <FadeUp delay={0.3}>
          <Link to="/contact" className="btn btn--gold"><span>Start a Conversation</span></Link>
        </FadeUp>
      </div>
    </section>
  );
}
