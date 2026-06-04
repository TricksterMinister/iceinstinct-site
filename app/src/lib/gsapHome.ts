import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage GSAP timeline, ported VERBATIM from cinema/cinema.js.
 *
 * Ported here: hero intro timeline, hero parallax + exit zoom, chapter (manifesto)
 * reveals, tiers horizontal pin + per-tier parallax, founder reveals, gallery
 * entrance + drag/wheel-to-scroll, closing CTA reveal, ghost-words parallax,
 * and the post-load ScrollTrigger.refresh().
 *
 * NOT ported here (already done in dedicated components):
 *   - magnetic cursor      -> app/Cursor.tsx
 *   - pager dots           -> app/Pager.tsx
 *   - vanish header        -> app/VanishHeader.tsx
 *   - Lenis smooth scroll  -> app/LenisProvider.tsx
 *
 * Run inside a gsap.context (via useGsap) so every tween + ScrollTrigger reverts
 * on unmount. The context does NOT clean up the raw window/element listeners this
 * adds (gallery wheel/drag + post-load refresh), so we collect their removers and
 * return a cleanup function the caller must run on unmount (StrictMode hygiene).
 */
export function initHomeGsap(): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const listenerCleanups: Array<() => void> = [];

  /* ---------- HERO INTRO TIMELINE ---------- */
  // explicit initial states. y:0 wipes any read-from-CSS pixel offset before yPercent applies.
  gsap.set('.hero-title .word .ink', { y: 0, yPercent: 110 });
  gsap.set('.hero-sub .reveal-line > span', { y: 0, yPercent: 110 });
  gsap.set('.chapter-title .line > *', { y: 0, yPercent: 110 });
  gsap.set('.founder-quote .line > *', { y: 0, yPercent: 110 });

  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 });
  heroTl
    .to('.hero-title .word .ink', { yPercent: 0, duration: 1.4, stagger: 0.08 }, 0)
    .to('.hero-eyebrow', { opacity: 1, duration: 1.0 }, 0.15)
    .to('.hero-meta', { opacity: 1, y: 0, duration: 1.0, stagger: 0.08 }, 0.3)
    .to('.hero-sub .reveal-line > span', { yPercent: 0, duration: 1.0, stagger: 0.08 }, 0.5)
    .to('.hero-cue', { opacity: 1, duration: 0.8 }, 0.9);

  /* ---------- HERO PARALLAX + EXIT ZOOM ---------- */
  gsap.to('.hero-video', {
    scale: 1.18,
    yPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero-stage', {
    yPercent: -22,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
  });

  /* ---------- CHAPTER (manifesto) reveals ---------- */
  gsap.utils.toArray<HTMLElement>('.chapter-title .line').forEach((line, i) => {
    const ink = line.querySelector('span') || line;
    gsap.fromTo(ink, { yPercent: 110 }, {
      yPercent: 0, duration: 1.1, ease: 'expo.out', delay: i * 0.06,
      scrollTrigger: { trigger: '.chapter', start: 'top 75%' },
    });
  });
  gsap.fromTo('[data-stagger]', { y: 28, opacity: 0 }, {
    y: 0, opacity: 1, duration: 1.0, stagger: 0.16, ease: 'expo.out',
    scrollTrigger: { trigger: '.chapter-body', start: 'top 80%' },
  });
  gsap.to('.chapter-bg-text', {
    yPercent: -22,
    xPercent: 4,
    ease: 'none',
    scrollTrigger: { trigger: '.chapter', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  /* ---------- TIERS HORIZONTAL PIN ---------- */
  const isWide = window.matchMedia('(min-width: 721px)').matches;
  if (isWide && !reduced) {
    const rail = document.querySelector<HTMLElement>('[data-tiers-rail]');
    const tiers = document.querySelector<HTMLElement>('.tiers');
    if (rail && tiers) {
      // distance to scroll horizontally = total rail width minus viewport width
      const getDistance = () => rail.scrollWidth - window.innerWidth;
      gsap.to(rail, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: tiers,
          start: 'top top',
          end: () => '+=' + getDistance(),
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // NOTE: removed the old per-tier parallax. It used VERTICAL ScrollTriggers
      // (trigger: tier, start 'left 80%') on tiers that actually move HORIZONTALLY
      // inside this pin, with no containerAnimation -> they fired erratically during
      // the pinned horizontal scroll, yanking .tier-body down (yPercent 8) and
      // dimming it (opacity 0.4) on a sub-pixel-transformed layer = the "segment
      // jerks down + text blurs/dims" report. (The .tier-bg tween targeted
      // `.tier-bg video`, but the tiers use <img>, so it was a no-op regardless.)
      // Text now holds still, fully opaque and crisp through the whole scroll.
    }
  }

  /* ---------- FOUNDER reveals ---------- */
  gsap.utils.toArray<HTMLElement>('.founder-quote .line').forEach((line, i) => {
    const ink = line.querySelector('span') || line;
    gsap.fromTo(ink, { yPercent: 110 }, {
      yPercent: 0, duration: 1.1, ease: 'expo.out', delay: i * 0.06,
      scrollTrigger: { trigger: '.founder', start: 'top 70%' },
    });
  });
  gsap.fromTo('.founder-image img', { yPercent: -6, scale: 1.12 }, {
    yPercent: 6, scale: 1.04, ease: 'none',
    scrollTrigger: { trigger: '.founder', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  /* ---------- GALLERY entrance + drag-to-scroll ---------- */
  gsap.utils.toArray<HTMLElement>('.gallery-tile').forEach((tile, i) => {
    gsap.fromTo(tile, { y: 36, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: tile, start: 'top 92%' },
    });
  });

  // wheel: convert vertical scroll to horizontal track if pointer is over track
  const galleryTrack = document.querySelector<HTMLElement>('[data-gallery-track]');
  if (galleryTrack) {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        galleryTrack.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    galleryTrack.addEventListener('wheel', onWheel, { passive: false });
    listenerCleanups.push(() => galleryTrack.removeEventListener('wheel', onWheel));

    // drag to scroll (mouse)
    let isDown = false, startX = 0, startLeft = 0;
    const onMouseDown = (e: MouseEvent) => {
      isDown = true; startX = e.pageX; startLeft = galleryTrack.scrollLeft; galleryTrack.style.cursor = 'grabbing';
    };
    const onMouseUp = () => { isDown = false; galleryTrack.style.cursor = ''; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      galleryTrack.scrollLeft = startLeft - (e.pageX - startX);
    };
    galleryTrack.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    galleryTrack.addEventListener('mousemove', onMouseMove);
    listenerCleanups.push(() => galleryTrack.removeEventListener('mousedown', onMouseDown));
    listenerCleanups.push(() => window.removeEventListener('mouseup', onMouseUp));
    listenerCleanups.push(() => galleryTrack.removeEventListener('mousemove', onMouseMove));
  }

  /* ---------- CLOSING CTA reveal ---------- */
  gsap.fromTo('.closing-stage > *', { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out',
    scrollTrigger: { trigger: '.closing-stage', start: 'top 75%' },
  });

  /* ---------- GHOST WORDS PARALLAX (depth: bg-word moves slower than fg) ---------- */
  gsap.utils.toArray<HTMLElement>('.section-bg-word').forEach((el) => {
    const direction = el.classList.contains('right') ? 1 : -1;
    gsap.to(el, {
      yPercent: -22,
      xPercent: direction * 6,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  /* ---------- refresh after assets load (videos shift layout) ---------- */
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);
  listenerCleanups.push(() => window.removeEventListener('load', onLoad));

  return () => {
    listenerCleanups.forEach((fn) => fn());
  };
}
