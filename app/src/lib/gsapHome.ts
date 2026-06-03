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
 * Run inside a gsap.context (via useGsap) so everything reverts on unmount.
 */
export function initHomeGsap(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      // each tier: subtle inward zoom of bg + parallax of body as it crosses center
      gsap.utils.toArray<HTMLElement>('.tier').forEach((tier) => {
        const bg = tier.querySelector('.tier-bg video');
        const body = tier.querySelector('.tier-body');
        gsap.fromTo(bg, { scale: 1.18, xPercent: 6 }, {
          scale: 1.02, xPercent: -4, ease: 'none',
          scrollTrigger: {
            // VERBATIM from cinema.js: no ScrollTrigger has id 'tiersRail', so this is
            // always undefined at runtime (per-tier parallax uses the vertical trigger).
            trigger: tier, containerAnimation: (ScrollTrigger.getById('tiersRail') as unknown as gsap.core.Animation) || undefined,
            start: 'left right', end: 'right left', scrub: true,
            horizontal: false,
          },
        });
        gsap.fromTo(body, { yPercent: 8, opacity: 0.4 }, {
          yPercent: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: tier, start: 'left 80%', end: 'left 30%', scrub: true,
          },
        });
      });
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
    galleryTrack.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        galleryTrack.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });

    // drag to scroll (mouse)
    let isDown = false, startX = 0, startLeft = 0;
    galleryTrack.addEventListener('mousedown', (e) => {
      isDown = true; startX = e.pageX; startLeft = galleryTrack.scrollLeft; galleryTrack.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => { isDown = false; galleryTrack.style.cursor = ''; });
    galleryTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      galleryTrack.scrollLeft = startLeft - (e.pageX - startX);
    });
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
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
