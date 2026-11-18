import { Link } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import { scrollToTop } from '../lib/smoothScroll.js';
import { SplitText } from './Reveal.jsx';

export default function Footer({ showCta = true }) {
  return (
    <footer className="footer">
      {showCta && (
      <div className="footer__top">
        <p className="eyebrow">Have a boutique in mind?</p>
        <Link to="/contact" className="footer__big" data-cursor="Let’s talk">
          <SplitText text="Let’s create" />
          <SplitText text="something timeless" className="gold-text italic" delay={0.15} />
        </Link>
      </div>
      )}

      <div className="footer__grid">
        <div>
          <span className="footer__mono">QS</span>
          <p className="footer__about">
            {site.name}
            <br />
            {site.role}
            <br />
            {site.location}
          </p>
        </div>
        <div>
          <h6>Navigate</h6>
          <ul>
            {nav.map((l) => (
              <li key={l.to}><Link to={l.to} className="u-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h6>Contact</h6>
          <ul>
            <li><a className="u-link" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="u-link" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
          </ul>
        </div>
        <div>
          <h6>Follow</h6>
          <ul>
            <li><a className="u-link" href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a className="u-link" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <button className="footer__top-btn" onClick={() => scrollToTop(false)}>
          Back to top <span>↑</span>
        </button>
      </div>
    </footer>
  );
}
