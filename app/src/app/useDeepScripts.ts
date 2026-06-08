/* ================================================
   useDeepScripts - React port of script.js
   Ice & Instinct - minimal deep-page behaviour.
   Reveal-on-scroll, header scroll state, gallery track + lightbox,
   tier-nav active state, contact pre-fill.
   Every querySelector is guarded so it no-ops on pages lacking the element.
   ================================================ */

import { useEffect } from 'react';
import { COCKTAIL_RECIPES } from '../data/cocktails';

export function useDeepScripts(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanups: Array<() => void> = [];

    // ----- Tier-page right-rail navigator (active state on scroll) -----
    const tierNav = document.querySelector<HTMLElement>('.tier-nav');
    if (tierNav && 'IntersectionObserver' in window) {
      const navLinks = Array.from(tierNav.querySelectorAll<HTMLElement>('a[data-section]'));
      const sectionIds = navLinks.map((a) => a.dataset.section).filter(Boolean) as string[];
      const setActive = (id: string) => {
        navLinks.forEach((a) => a.classList.toggle('is-current', a.dataset.section === id));
      };
      const tierIo = new IntersectionObserver(
        (entries) => {
          // Pick the entry closest to the top of the viewport that's visible
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length) setActive(visible[0].target.id);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0.01 }
      );
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) tierIo.observe(el);
      });
      cleanups.push(() => tierIo.disconnect());
    }

    // ----- Header scroll state -----
    const header = document.querySelector<HTMLElement>('.header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    }

    // ----- Reveal on scroll -----
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll<HTMLElement>('.reveal');
    if (targets.length && !reduceMotion && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      targets.forEach((t) => io.observe(t));
      cleanups.push(() => io.disconnect());
    } else {
      targets.forEach((t) => t.classList.add('is-in'));
    }

    // ----- Gallery horizontal track: progress + wheel translation -----
    const track = document.getElementById('gallery-track');
    const progress = document.getElementById('gallery-progress');
    const posLabel = document.getElementById('gallery-pos');
    if (track) {
      const tiles = track.querySelectorAll<HTMLElement>('.gallery-tile');
      const updateProgress = () => {
        const max = track.scrollWidth - track.clientWidth;
        const pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
        if (progress) progress.style.setProperty('--progress', Math.max(8, pct) + '%');
        if (posLabel && tiles.length) {
          // Find which tile is most centred in the viewport
          const trackRect = track.getBoundingClientRect();
          const trackCentre = trackRect.left + trackRect.width / 2;
          let closest = 0,
            closestDist = Infinity;
          tiles.forEach((tile, i) => {
            const r = tile.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - trackCentre);
            if (d < closestDist) {
              closestDist = d;
              closest = i;
            }
          });
          posLabel.textContent = String(closest + 1).padStart(2, '0');
        }
      };
      track.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
      cleanups.push(() => track.removeEventListener('scroll', updateProgress));

      // Translate vertical mousewheel to horizontal scroll inside the track
      // (only if user actually scrolls the track itself)
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      };
      track.addEventListener('wheel', onWheel, { passive: false });
      cleanups.push(() => track.removeEventListener('wheel', onWheel));
    }

    // ----- Lightbox for gallery (desktop only) -----
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      const lbImage = document.getElementById('lightbox-image') as HTMLImageElement | null;
      const lbTitle = document.getElementById('lightbox-title');
      const lbClose = lightbox.querySelector<HTMLElement>('.lightbox-close');
      const tiles = document.querySelectorAll<HTMLElement>('.gallery-tile');

      const setList = (id: string, items: string[], ordered: boolean) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = '';
        for (const item of items) {
          const li = document.createElement('li');
          li.textContent = item;
          el.appendChild(li);
        }
        const wrap = document.getElementById(id + '-wrap');
        if (wrap) wrap.style.display = items.length ? '' : 'none';
        // ordered/unordered is already fixed by the markup (ol/ul); param kept for clarity
        void ordered;
      };

      const fillRecipe = (title: string | null) => {
        const r = title ? COCKTAIL_RECIPES[title] : undefined;
        const spec = document.getElementById('rd-spec');
        const garnish = document.getElementById('rd-garnish');
        const note = document.getElementById('rd-note');
        const cols = lightbox.querySelector<HTMLElement>('.rd-cols');

        if (!r || (r.ingredients.length === 0 && r.method.length === 0)) {
          // No full recipe yet - show the elegant pending note only.
          setList('rd-ingredients', [], false);
          setList('rd-method', [], true);
          if (cols) cols.style.display = 'none';
          if (spec) spec.textContent = '';
          if (garnish) garnish.textContent = '';
          if (note) note.textContent = (r && r.note) || 'The full recipe for this composition is shared in person.';
          return;
        }

        if (cols) cols.style.display = '';
        const specParts: string[] = [];
        if (r.glass) specParts.push('Glass / ' + r.glass);
        if (r.ice) specParts.push('Ice / ' + r.ice);
        if (spec) spec.textContent = specParts.join('     ');
        setList('rd-ingredients', r.ingredients, false);
        setList('rd-method', r.method, true);
        if (garnish) garnish.textContent = r.garnish ? 'Garnish / ' + r.garnish : '';
        if (note) note.textContent = '';
      };

      const openLightbox = (src: string | null, title: string | null) => {
        if (!src) return;
        if (lbImage) {
          lbImage.src = src;
          lbImage.alt = title || '';
        }
        if (lbTitle) lbTitle.textContent = title || '';
        fillRecipe(title);
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      };
      const closeLightbox = () => {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        // Defer src clear so closing animation can finish
        setTimeout(() => {
          if (lbImage) lbImage.src = '';
        }, 300);
      };

      tiles.forEach((tile) => {
        const onClick = () => {
          // On touch / no-hover devices we keep simple click behaviour with no overlay,
          // but the lightbox is still useful for closer inspection.
          const src = tile.getAttribute('data-src');
          const title = tile.getAttribute('data-title');
          openLightbox(src, title);
        };
        tile.addEventListener('click', onClick);
        cleanups.push(() => tile.removeEventListener('click', onClick));
      });

      if (lbClose) {
        lbClose.addEventListener('click', closeLightbox);
        cleanups.push(() => lbClose.removeEventListener('click', closeLightbox));
      }
      const onLightboxClick = (e: MouseEvent) => {
        if (e.target === lightbox) closeLightbox();
      };
      lightbox.addEventListener('click', onLightboxClick);
      cleanups.push(() => lightbox.removeEventListener('click', onLightboxClick));

      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
      };
      document.addEventListener('keydown', onKeydown);
      cleanups.push(() => document.removeEventListener('keydown', onKeydown));
    }

    // ----- Pre-fill package select on /contact/ from ?package=...&service=... -----
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('package') || params.get('service');
    if (pkg) {
      const sel = document.getElementById('package') as HTMLSelectElement | null;
      if (sel) {
        const valid = Array.from(sel.options).some((o) => o.value === pkg);
        if (valid) sel.value = pkg;
      }
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
