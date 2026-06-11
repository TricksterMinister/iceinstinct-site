// Imported for side effects by every client entry (main-*.tsx): capture the
// first-touch source and install the delegated outbound-CTA tracker. Both are
// idempotent and SSR-safe, so the import order inside an entry does not matter.
import { captureSource } from './leadContext';
import { initCtaTracking } from './track';

captureSource();
initCtaTracking();

// Quiet-luxury motion (owner, 2026-06-10):
// 1) the gold shine crosses a heading ONCE, when it first enters the view;
// 2) the footer marquee moves only while the guest scrolls - page still, band still.
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced) {
    const lit = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('lit');
            lit.unobserve(e.target);
          }
        });
      },
      { threshold: 0.55 }
    );
    const observeShine = () => {
      document
        .querySelectorAll('h1 .it:not(.lit), h2 .it:not(.lit), h3 .it:not(.lit), h4 .it:not(.lit), .gold-shine:not(.lit)')
        .forEach((el) => lit.observe(el));
    };
    // React mounts after this module runs; sweep once it has, and once more
    // for late-mounted content (profiler overlay, lightboxes).
    window.setTimeout(observeShine, 700);
    window.setTimeout(observeShine, 2600);
  }

  let marqueeTimer = 0;
  const root = document.documentElement;
  window.addEventListener(
    'scroll',
    () => {
      root.style.setProperty('--marquee-play', 'running');
      window.clearTimeout(marqueeTimer);
      marqueeTimer = window.setTimeout(() => root.style.setProperty('--marquee-play', 'paused'), 240);
    },
    { passive: true }
  );
}
