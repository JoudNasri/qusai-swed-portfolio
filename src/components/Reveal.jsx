import { Fragment, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ease, easeOut } from '../lib/smoothScroll.js';

/** Words slide up from behind a mask, one after another */
export function SplitText({ text, className = '', delay = 0, stagger = 0.06, as = 'span', animate }) {
  const Tag = motion[as];
  const words = text.split(' ');
  const props = animate === undefined
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: animate ? 'show' : 'hidden' };
  return (
    <Tag className={`split ${className}`} {...props} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split__mask" aria-hidden="true">
            <motion.span
              className="split__word"
              variants={{
                hidden: { y: '115%', rotate: 4 },
                show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: easeOut, delay: delay + i * stagger } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Simple fade + rise when entering the viewport */
export function FadeUp({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, ease: easeOut, delay }}
    >
      {children}
    </Tag>
  );
}

/** Image that is unveiled by a clip-path wipe, then slowly settles.
 *  The in-view check runs on an unclipped wrapper so it always fires. */
export function RevealImage({ src, alt = '', className = '', delay = 0, onClick, cursor }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <div ref={ref} className={`reveal-img ${className}`} onClick={onClick} data-cursor={cursor}>
      <motion.div
        className="reveal-img__clip"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        transition={{ duration: 1.4, ease, delay }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ scale: 1.35 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 2, ease: easeOut, delay }}
        />
      </motion.div>
    </div>
  );
}

/** Paragraph whose words light up as you scroll through it */
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={`scroll-words ${className}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="scroll-words__w">
      {children}{' '}
    </motion.span>
  );
}

/** Parallax wrapper: moves its child slower/faster than the scroll */
export function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={`parallax ${className}`}>
      <motion.div style={{ y }} className="parallax__inner">{children}</motion.div>
    </div>
  );
}
