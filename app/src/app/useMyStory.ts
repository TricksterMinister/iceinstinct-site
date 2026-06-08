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

    /* All GSAP creation runs inside a context so every tween + ScrollTrigger
       reverts on cleanup (prevents StrictMode double-mount duplicate triggers). */
    const ctx = gsap.context(() => {
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

      /* ---------- COVER GHOST: champagne light tracks the cursor over ALCHEMIST,
         identical to the offering-page hero ghosts. Desktop pointer only. ---------- */
      const coverGhost = document.querySelector<HTMLElement>('.story-cover-ghost');
      const coverEl = document.querySelector<HTMLElement>('.story-cover');
      if (coverGhost && coverEl && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const onGhostMove = (e: PointerEvent) => {
          const r = coverGhost.getBoundingClientRect();
          const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
          coverGhost.classList.toggle('is-lit', inside);
          if (inside) {
            coverGhost.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            coverGhost.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
          }
        };
        const onGhostLeave = () => coverGhost.classList.remove('is-lit');
        coverEl.addEventListener('pointermove', onGhostMove);
        coverEl.addEventListener('pointerleave', onGhostLeave);
        cleanups.push(() => coverEl.removeEventListener('pointermove', onGhostMove));
        cleanups.push(() => coverEl.removeEventListener('pointerleave', onGhostLeave));
      }

      /* ---------- JOURNEY: stops cascade in, numbers slide ---------- */
      gsap.utils.toArray<HTMLElement>('.journey-stop').forEach((stop) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: stop, start: 'top 86%' } });
        tl.from(stop, { y: 42, opacity: 0, duration: 0.9, ease: EXPO })
          .from(stop.querySelector('.journey-no'), { x: -18, opacity: 0, duration: 0.9, ease: EXPO }, 0.05)
          .from(stop.querySelector('.journey-city'), { y: 18, opacity: 0, duration: 0.8, ease: EXPO }, 0.12);
      });

      /* ---------- JOURNEY: hovering a city cross-fades the left photo ----------
         The segment is one viewport (photo left, cities right); hovering a city
         row fades its framed photo in and highlights the row. Desktop pointer
         only - touch shows each city's inline photo instead (see CSS). */
      const figs = gsap.utils.toArray<HTMLElement>('.journey-fig');
      const journeyStops = gsap.utils.toArray<HTMLElement>('.journey-stop');
      if (figs.length && journeyStops.length && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const setActiveCity = (idx: number) => {
          figs.forEach((f, k) => f.classList.toggle('is-active', k === idx));
          journeyStops.forEach((s, k) => s.classList.toggle('is-active', k === idx));
        };
        setActiveCity(0);
        journeyStops.forEach((stop, i) => {
          const onEnter = () => setActiveCity(i);
          stop.addEventListener('mouseenter', onEnter);
          cleanups.push(() => stop.removeEventListener('mouseenter', onEnter));
        });
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
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);
}
