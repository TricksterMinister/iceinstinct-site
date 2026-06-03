/* ================================================
   useMyStory - React port of my-story.js
   Cinematic scroll choreography for the My Story page:
   cover parallax, journey cascade + cursor-following image
   reveal over .journey-stop[data-img], philosophy lines,
   magnetic CTA buttons, and a smooth-height FAQ accordion.
   GSAP + ScrollTrigger via the npm package. transform/opacity
   only (no blur). Degrades gracefully under reduced-motion.
   Every querySelector is guarded so it no-ops safely.
   ================================================ */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useMyStory(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanups: Array<() => void> = [];

    /* =====================================================================
       MY STORY - cinematic scroll choreography (agency-tier, brand-safe)
       ===================================================================== */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduced) {
      const EXPO = 'expo.out';

      /* ---------- COVER: cinematic parallax ---------- */
      const cover = document.querySelector('.story-cover');
      if (cover) {
        // portrait slowly scales + drifts as the cover scrolls away
        gsap.to('.story-cover-img', {
          scale: 1.12,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: cover, start: 'top top', end: 'bottom top', scrub: true },
        });
        // ghost wordmark drifts up, the id panel lifts and fades
        gsap.to('.story-cover-ghost', {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: { trigger: cover, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.story-cover-id', {
          yPercent: 32,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: cover, start: 'top top', end: 'bottom top', scrub: true },
        });
        // opening title card rises on load
        gsap.from('.story-cover-id > *', {
          y: 28,
          opacity: 0,
          duration: 1.1,
          ease: EXPO,
          stagger: 0.12,
          delay: 0.15,
        });
      }

      /* ---------- JOURNEY: stops cascade in, numbers slide ---------- */
      gsap.utils.toArray<HTMLElement>('.journey-stop').forEach((stop) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: stop, start: 'top 86%' } });
        tl.from(stop, { y: 42, opacity: 0, duration: 0.9, ease: EXPO })
          .from(stop.querySelector('.journey-no'), { x: -18, opacity: 0, duration: 0.9, ease: EXPO }, 0.05)
          .from(stop.querySelector('.journey-city'), { y: 18, opacity: 0, duration: 0.8, ease: EXPO }, 0.12);
      });

      /* ---------- JOURNEY: cursor-following image reveal ---------- */
      const rail = document.querySelector<HTMLElement>('[data-journey-rail]');
      const reveal = document.querySelector<HTMLElement>('.journey-reveal');
      if (rail && reveal && window.matchMedia('(hover: hover)').matches) {
        const rimg = reveal.querySelector('img');
        gsap.set(reveal, { xPercent: -50, yPercent: -50, scale: 0.65, opacity: 0 });
        const rx = gsap.quickTo(reveal, 'x', { duration: 0.6, ease: 'power3.out' });
        const ry = gsap.quickTo(reveal, 'y', { duration: 0.6, ease: 'power3.out' });
        const onRailMove = (e: MouseEvent) => {
          rx(e.clientX);
          ry(e.clientY);
        };
        rail.addEventListener('mousemove', onRailMove);
        cleanups.push(() => rail.removeEventListener('mousemove', onRailMove));

        rail.querySelectorAll<HTMLElement>('.journey-stop').forEach((stop) => {
          const onEnter = () => {
            const src = stop.getAttribute('data-img');
            if (!src) return;
            if (rimg && rimg.getAttribute('src') !== src) rimg.setAttribute('src', src);
            gsap.to(reveal, { opacity: 1, scale: 1, duration: 0.5, ease: EXPO });
          };
          stop.addEventListener('mouseenter', onEnter);
          cleanups.push(() => stop.removeEventListener('mouseenter', onEnter));
        });

        const onRailLeave = () => {
          gsap.to(reveal, { opacity: 0, scale: 0.65, duration: 0.4, ease: 'power3.out' });
        };
        rail.addEventListener('mouseleave', onRailLeave);
        cleanups.push(() => rail.removeEventListener('mouseleave', onRailLeave));
      }

      /* ---------- PHILOSOPHY: the two words land with weight ---------- */
      gsap.utils.toArray<HTMLElement>('.philosophy-line').forEach((line, i) => {
        gsap.from(line, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: EXPO,
          delay: i * 0.12,
          scrollTrigger: { trigger: line, start: 'top 85%' },
        });
      });

      /* ---------- MAGNETIC CTA buttons (closing panel) ---------- */
      document.querySelectorAll<HTMLElement>('#final-cta .btn').forEach((btn) => {
        const qx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
        const qy = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          qx((e.clientX - rect.left - rect.width / 2) * 0.28);
          qy((e.clientY - rect.top - rect.height / 2) * 0.4);
        };
        const onLeave = () => {
          qx(0);
          qy(0);
        };
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          btn.removeEventListener('mousemove', onMove);
          btn.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    /* =====================================================================
       FAQ - smooth accordion (no GSAP needed). Animates the answer height
       so <details> opens/closes fluidly across all browsers. With
       reduced-motion, native instant toggle is left untouched.
       ===================================================================== */
    if (!reduced) {
      document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((item) => {
        const summary = item.querySelector<HTMLElement>('summary');
        const answer = item.querySelector<HTMLElement>('.faq-answer');
        if (!summary || !answer) return;
        const onSummaryClick = (e: MouseEvent) => {
          e.preventDefault();
          if (answer.dataset.busy === '1') return;
          answer.dataset.busy = '1';
          const done = (ev: TransitionEvent) => {
            if (ev.propertyName !== 'height') return;
            answer.removeEventListener('transitionend', done);
            answer.style.height = '';
            answer.dataset.busy = '';
          };
          if (item.open) {
            answer.style.height = answer.scrollHeight + 'px';
            const close = (ev: TransitionEvent) => {
              if (ev.propertyName !== 'height') return;
              answer.removeEventListener('transitionend', close);
              item.open = false;
              answer.style.height = '';
              answer.dataset.busy = '';
            };
            answer.addEventListener('transitionend', close);
            requestAnimationFrame(() => {
              answer.style.height = '0px';
            });
          } else {
            item.open = true;
            const h = answer.scrollHeight;
            answer.style.height = '0px';
            answer.addEventListener('transitionend', done);
            requestAnimationFrame(() => {
              answer.style.height = h + 'px';
            });
          }
        };
        summary.addEventListener('click', onSummaryClick);
        cleanups.push(() => summary.removeEventListener('click', onSummaryClick));
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
