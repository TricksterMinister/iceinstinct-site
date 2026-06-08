/* ================================================
   useOmakaseSnap - soft "shuffle scroll" for the Omakase offering page.
   Lenis smooth wheel + PROXIMITY Snap: the page eases toward the nearest
   viewport segment only once the guest stops near it (never yanks mid-scroll).
   Snap is suspended while the held-stage (.oma-hold) is pinned so it never
   fights that scrub, exactly like the homepage suspends snap over .tiers.
   Wide screens only; fully disabled under prefers-reduced-motion.
   ================================================ */

import { useEffect } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The full-viewport chapters of the Omakase page, top to bottom. Each becomes a
// proximity snap point so the scroll settles on one segment at a time.
const SEGMENTS = [
  '.concierge',          // hero
  '#overview',
  '#menu-protocol',      // .oma-hold (pinned scrub) - snap to its start only
  '#scaling',
  '#included',
  '#standard-inclusions',
  '#host-provides',
  '#notes',
  '.closing-segment',    // CTA + footer = one viewport
];

export function useOmakaseSnap(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // Expose globally so the ported VanishHeader / anchor jumps use smooth Lenis
    // scrolling, matching the homepage behaviour.
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isWide = window.matchMedia('(min-width: 721px)').matches;
    let snap: Snap | undefined;
    let addTimer = 0;
    let pinGuard: ScrollTrigger | undefined;

    if (!reduced && isWide) {
      // PROXIMITY (soft): only settles when the guest stops near a boundary, so
      // long reads inside a segment are never interrupted.
      snap = new Snap(lenis, {
        type: 'proximity',
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1,
      });
      const addPoints = () => {
        SEGMENTS.forEach((sel) => {
          const el = document.querySelector<HTMLElement>(sel);
          if (el) snap!.addElement(el, { align: ['start'] });
        });
        // Editorial pauses are full-viewport too; settle on each one (there are
        // several, so use querySelectorAll rather than a single SEGMENTS entry).
        document.querySelectorAll<HTMLElement>('.oma-pause').forEach((el) => {
          snap!.addElement(el, { align: ['start'] });
        });
        // Suspend snap while the held-stage is pinned (its internal scrub) so it
        // never tugs the page to a boundary mid-animation.
        const hold = document.querySelector<HTMLElement>('.oma-hold');
        if (hold) {
          pinGuard = ScrollTrigger.create({
            trigger: hold,
            start: 'top top',
            end: 'bottom bottom',
            onToggle: (self) => { if (self.isActive) snap!.stop(); else snap!.start(); },
          });
        }
      };
      // Defer so the held-stage pin + reveal layout settle first.
      addTimer = window.setTimeout(() => { ScrollTrigger.refresh(); addPoints(); }, 400);
    }

    return () => {
      window.clearTimeout(addTimer);
      pinGuard?.kill();
      snap?.destroy();
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}
