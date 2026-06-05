import { useEffect } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The seven full-viewport chapters of the homepage. Each becomes a snap point so
// the scroll settles on one segment at a time and the guest can take it in.
const SECTIONS = ['.hero', '#manifesto', '.founder', '.gallery', '.tiers', '.concierge', '.duality', '.closing-segment'];

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
    // Expose the Lenis instance globally so the ported Pager and VanishHeader use
    // smooth Lenis scrolling (duration 1.4) exactly like the live site.
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Section snapping - a full-page-slider feel: each scroll locks ONE segment
    // to the viewport and holds it there so the guest can take it in.
    // 'mandatory' = decisive lock (no oscillation), but it is DISABLED while the
    // tiers section is pinned, so it never fights that horizontal scroll.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isWide = window.matchMedia('(min-width: 721px)').matches;
    let snap: Snap | undefined;
    let addTimer = 0;
    let pinGuard: ScrollTrigger | undefined;
    if (!reduced && isWide) {
      snap = new Snap(lenis, {
        type: 'mandatory',
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1,
      });
      const addPoints = () => {
        SECTIONS.forEach((sel) => {
          const el = document.querySelector<HTMLElement>(sel);
          if (el) snap!.addElement(el, { align: ['start'] });
        });
        // While the tiers section is pinned (its horizontal scroll), turn snap off
        // so it does not yank the page to a section boundary mid-scroll.
        const rail = document.querySelector<HTMLElement>('[data-tiers-rail]');
        const tiers = document.querySelector<HTMLElement>('.tiers');
        if (rail && tiers) {
          pinGuard = ScrollTrigger.create({
            trigger: tiers,
            start: 'top top',
            end: () => '+=' + (rail.scrollWidth - window.innerWidth),
            onToggle: (self) => { if (self.isActive) snap!.stop(); else snap!.start(); },
          });
        }
      };
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
  return <>{children}</>;
}
