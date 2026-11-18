import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Marquee from '../components/Marquee.jsx';
import { SplitText, FadeUp, RevealImage, ScrollWords, Parallax } from '../components/Reveal.jsx';
import { about, projects, site, img } from '../data/site.js';

export default function About() {
  return (
    <Page title="About">
      <section className="page-hero about-hero">
        <div className="container about-hero__grid">
          <div>
            <p className="eyebrow"><span className="line" /> About Me</p>
            <h1 className="h-giant">
              <SplitText text="Qusai" />
              <SplitText text="Swed" className="gold-text italic" delay={0.12} />
            </h1>
            <FadeUp delay={0.4} as="p" className="about-hero__role">
              {site.role} <span>·</span> {site.location}
            </FadeUp>
          </div>
          <RevealImage src={img('about')} alt="Boutique by Qusai Swed" className="about-hero__img" delay={0.2} />
        </div>
      </section>

      <section className="section section--ivory about-intro">
        <div className="veins" aria-hidden />
        <div className="container">
          <ScrollWords className="intro__text" text={about.intro} />
          <div className="about-intro__cols">
            {about.body.map((t, n) => (
              <FadeUp key={n} delay={n * 0.12} as="p">{t}</FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blood">
        <div className="container">
          <div className="section-head">
            <FadeUp className="eyebrow"><span className="line" /> Professional Practice</FadeUp>
            <h2 className="h-display">
              <SplitText text="Design, Fit-Out" />
              <SplitText text="& Site Safety" className="gold-text italic" delay={0.1} />
            </h2>
          </div>
          <div className="practice">
            {about.practice.map((x, n) => (
              <FadeUp key={x.title} delay={n * 0.12} className={`practice__item practice__item--${n}`}>
                <RevealImage src={img(x.image)} alt={x.title} delay={n * 0.12} />
                <p><span className="gold-text">0{n + 1}</span> {x.title}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {about.experience.length > 0 && (
        <section className="section section--ivory">
          <div className="container">
            <div className="section-head">
              <FadeUp className="eyebrow eyebrow--dark"><span className="line" /> Career Overview</FadeUp>
              <h2 className="h-display h-display--dark">
                <SplitText text="Experience &" />
                <SplitText text="Qualifications" className="gold-text italic" delay={0.1} />
              </h2>
            </div>
            <div className="timeline">
              {about.experience.map((e, n) => (
                <FadeUp key={n} delay={n * 0.08} className="timeline__row">
                  <span className="timeline__years">{e.years}</span>
                  <div>
                    <h3>{e.role}</h3>
                    <p className="timeline__co">{e.company}</p>
                    {e.text && <p>{e.text}</p>}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--ivory values">
        <div className="container values__grid">
          {about.values.map((v, n) => (
            <FadeUp key={v.title} delay={n * 0.12} className="values__item">
              <span className="values__no gold-text">0{n + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="about-band">
        <Parallax speed={0.18} className="about-band__media">
          <img src={img('silk')} alt="" />
        </Parallax>
        <div className="about-band__content">
          <p className="eyebrow"><span className="line" /> Selected Brands</p>
          <Marquee items={projects.map((p) => p.name)} />
          <Marquee items={[...projects].reverse().map((p) => p.name)} reverse />
          <FadeUp className="about-band__cta">
            <Link to="/works" className="btn btn--gold"><span>See the Projects</span></Link>
          </FadeUp>
        </div>
      </section>
    </Page>
  );
}
