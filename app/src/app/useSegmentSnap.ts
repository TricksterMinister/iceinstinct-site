/* ================================================
   useSegmentSnap - the sitewide "segment settles into its viewport" feel
   (owner rule 2026-06-10: every full-viewport segment, on every page, eases
   itself flush into the viewport when the scroll rests near its edge).
   Ported from the offering pages' useOmakaseSnap: Lenis smooth wheel +
   PROXIMITY snap - it never yanks mid-scroll, only settles when the guest
   stops near a boundary. Wide screens only; off under prefers-reduced-motion.
   ================================================ */

import { useEffect } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @param segments single-match selectors, one snap point each (top of element)
 * @param multi    selectors resolved with querySelectorAll - every match snaps
 */
export function useSegmentSnap(segments: string[], multi: string[] = []): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion: no smooth-scroll hijack, no snapping - native scroll
    // only, exactly as the OS setting asks. (window.lenis consumers fall back
    // to native scrolling when the instance is absent.)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    // anchor jumps + VanishHeader reuse the instance, same as the other pages
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis;

    const isWide = window.matchMedia('(min-width: 721px)').matches;
    let snap: Snap | undefined;
    let addTimer = 0;

    if (isWide) {
      snap = new Snap(lenis, {
        type: 'proximity',
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1,
      });
      // Defer so reveal/layout effects settle before measuring snap points.
      addTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        segments.forEach((sel) => {
          const el = document.querySelector<HTMLElement>(sel);
          if (el) snap!.addElement(el, { align: ['start'] });
        });
        multi.forEach((sel) => {
          document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
            snap!.addElement(el, { align: ['start'] });
          });
        });
      }, 400);
    }

    return () => {
      window.clearTimeout(addTimer);
      snap?.destroy();
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
