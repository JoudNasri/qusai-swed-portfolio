import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, site, img } from '../data/site.js';
import { ease, lockScroll } from '../lib/smoothScroll.js';

const menuImages = ['mouawad-2', 'about', 'practice-fitout', 'tiffany-2', 'chopard-3'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled || pathname === '/contact' ? 'is-scrolled' : ''} ${pathname === '/contact' ? 'is-solid' : ''} ${hidden && !open ? 'is-hidden' : ''}`}>
        <Link to="/" className="nav__logo" aria-label="Home">
          <span className="nav__mono">QS</span>
          <span className="nav__name">
            {site.name}
            <small>{site.role}</small>
          </span>
        </Link>

        <nav className="nav__links">
          {nav.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="nav__link">
              <span data-text={l.label}>{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="nav__cta">Start a Project</Link>

        <button className={`nav__burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <span /><span />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="menu__media">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={hoverIdx}
                  src={img(menuImages[hoverIdx], 'sm')}
                  alt=""
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease }}
                />
              </AnimatePresence>
            </div>
            <ul className="menu__list">
              {nav.map((l, i) => (
                <li key={l.to} className="menu__item">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.07 }}
                  >
                    <NavLink to={l.to} end={l.to === '/'} onMouseEnter={() => setHoverIdx(i)}>
                      <em>0{i + 1}</em>
                      {l.label}
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              className="menu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0 }}
            >
              <span>{site.email}</span>
              <span>{site.location}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
