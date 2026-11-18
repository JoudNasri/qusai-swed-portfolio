import { useEffect } from 'react';
import Lenis from 'lenis';

let lenis = null;

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.9 });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

export const scrollToTop = (immediate = true) => {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
};

export const lockScroll = (lock) => {
  if (lenis) lock ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = lock ? 'hidden' : '';
};

export const ease = [0.76, 0, 0.24, 1];
export const easeOut = [0.16, 1, 0.3, 1];
