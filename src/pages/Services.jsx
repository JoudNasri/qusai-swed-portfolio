import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Page from '../components/Page.jsx';
import { SplitText, FadeUp, RevealImage } from '../components/Reveal.jsx';
import { services, process, img } from '../data/site.js';
import { easeOut } from '../lib/smoothScroll.js';

export default function Services() {
  return (
    <Page title="Services">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow"><span className="line" /> Services</p>
          <h1 className="h-giant">
            <SplitText text="Crafted" />
            <SplitText text="end to end" className="gold-text italic" delay={0.12} />
          </h1>
          <FadeUp delay={0.4} as="p" className="page-hero__lead">
            One specialist across design, execution and safety — so the boutique that opens is exactly the one that was imagined.
          </FadeUp>
        </div>
      </section>

      <section className="section section--ivory svc">
        <div className="veins" aria-hidden />
        <div className="container">
          {services.map((s, n) => (
            <article key={s.no} className={`svc__row ${n % 2 ? 'is-flip' : ''}`}>
              <RevealImage src={img(s.image)} alt={s.title} className="svc__img" />
              <div className="svc__body">
                <FadeUp as="span" className="svc__no gold-text">{s.no}</FadeUp>
                <h2 className="h-display h-display--dark"><SplitText text={s.title} /></h2>
                <FadeUp delay={0.1} as="p" className="svc__short">{s.short}</FadeUp>
                <FadeUp delay={0.18} as="p">{s.text}</FadeUp>
                <ul className="svc__points">
                  {s.points.map((pt, k) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: easeOut, delay: 0.2 + k * 0.08 }}
                    >
                      <i>◆</i> {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--blood process">
        <div className="container">
          <div className="section-head">
            <FadeUp className="eyebrow"><span className="line" /> The Process</FadeUp>
            <h2 className="h-display">
              <SplitText text="Five acts," />
              <SplitText text="one opening night" className="gold-text italic" delay={0.1} />
            </h2>
          </div>
          <div className="process__grid">
            {process.map((s, n) => (
              <FadeUp key={s.no} delay={n * 0.1} className="process__step">
                <span className="process__no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="process__cta">
            <Link to="/contact" className="btn btn--gold"><span>Discuss Your Project</span></Link>
          </FadeUp>
        </div>
      </section>
    </Page>
  );
}
