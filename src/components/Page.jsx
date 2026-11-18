import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollToTop, ease } from '../lib/smoothScroll.js';
import Footer from './Footer.jsx';

/** Wraps every page: cinematic curtain transition + footer */
export default function Page({ children, footer = true, footerCta = true, title }) {
  useEffect(() => {
    scrollToTop(true);
    if (title) document.title = `${title} — Qusai Swed`;
  }, [title]);

  return (
    <>
      {/* curtain that closes when leaving the page */}
      <motion.div
        className="curtain"
        style={{ transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.75, ease }}
      >
        <span className="curtain__line" />
      </motion.div>
      {/* curtain that opens when the new page arrives */}
      <motion.div
        className="curtain"
        style={{ transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease, delay: 0.08 }}
      >
        <span className="curtain__mark">QS</span>
      </motion.div>

      <motion.main
        className="page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
        exit={{ opacity: 1, transition: { duration: 0.75 } }}
      >
        {children}
      </motion.main>
      {footer && <Footer showCta={footerCta} />}
    </>
  );
}
