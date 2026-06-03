/* ================================================
   useCinemaChrome - React port of cinema-chrome.js
   Vanish nav + magnetic cursor + ghost-word parallax.
   Loaded on deep pages. Uses the npm gsap package.
   ================================================ */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCinemaChrome(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanups: Array<() => void> = [];
    let rafId = 0;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- MAGNETIC CURSOR ---------- */
    if (isFinePointer && !reduced) {
      const cursor = document.querySelector<HTMLElement>('.cursor');
      if (cursor) {
        const dot = cursor.querySelector<HTMLElement>('.cursor-dot');
        const ring = cursor.querySelector<HTMLElement>('.cursor-ring');
        let mx = window.innerWidth / 2,
          my = window.innerHeight / 2;
        let dx = mx,
          dy = my,
          rx = mx,
          ry = my;
        const onMouseMove = (e: MouseEvent) => {
          mx = e.clientX;
          my = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        cleanups.push(() => window.removeEventListener('mousemove', onMouseMove));

        const tick = () => {
          dx += (mx - dx) * 0.32;
          dy += (my - dy) * 0.32;
          rx += (mx - rx) * 0.14;
          ry += (my - ry) * 0.14;
          if (dot) dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
          if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
          rafId = requestAnimationFrame(tick);
        };
        tick();
        cleanups.push(() => cancelAnimationFrame(rafId));

        document.querySelectorAll<HTMLElement>('a, button').forEach((el) => {
          const onEnter = () => cursor.classList.add('is-hover');
          const onLeave = () => cursor.classList.remove('is-hover');
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
          });
        });
        document.querySelectorAll<HTMLElement>('.gallery-tile').forEach((el) => {
          const onEnter = () => cursor.classList.add('is-view');
          const onLeave = () => cursor.classList.remove('is-view');
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
          });
        });
      }
    }

    /* ---------- VANISH NAV: open/close + ESC + click-jump ---------- */
    const vaTrigger = document.querySelector<HTMLElement>('.va-trigger');
    const vaOverlay = document.querySelector<HTMLElement>('.va-overlay');
    const vaClose = document.querySelector<HTMLElement>('.va-close');

    function openOverlay() {
      if (!vaOverlay) return;
      vaOverlay.classList.add('is-open');
      vaOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        '.va-list li',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.va-eyebrow, .va-foot',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.05 }
      );
    }
    function closeOverlay() {
      if (!vaOverlay) return;
      vaOverlay.classList.remove('is-open');
      vaOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (vaTrigger) {
      vaTrigger.addEventListener('click', openOverlay);
      cleanups.push(() => vaTrigger.removeEventListener('click', openOverlay));
    }
    if (vaClose) {
      vaClose.addEventListener('click', closeOverlay);
      cleanups.push(() => vaClose.removeEventListener('click', closeOverlay));
    }
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && vaOverlay && vaOverlay.classList.contains('is-open')) closeOverlay();
    };
    document.addEventListener('keydown', onKeydown);
    cleanups.push(() => document.removeEventListener('keydown', onKeydown));

    /* ---------- GHOST-WORD PARALLAX ---------- */
    if (!reduced) {
      gsap.utils.toArray<HTMLElement>('.section-bg-word').forEach((el) => {
        gsap.to(el, {
          yPercent: -22,
          xPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section, main') || el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }

    /* ---------- CLOSER FIT: keep CTA + footer = one viewport ----------
       On pages with body.closer the last segment locks CTA + footer to
       100dvh. The footer height is fluid, so measure it and expose it as
       --gv-footer; the CTA's min-height calc subtracts exactly that. */
    if (document.body.classList.contains('closer')) {
      const footer = document.querySelector<HTMLElement>('.footer');
      const setFooterVar = () => {
        if (footer) document.body.style.setProperty('--gv-footer', footer.offsetHeight + 'px');
      };
      setFooterVar();
      window.addEventListener('resize', setFooterVar);
      window.addEventListener('load', setFooterVar);
      cleanups.push(() => window.removeEventListener('resize', setFooterVar));
      cleanups.push(() => window.removeEventListener('load', setFooterVar));
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
