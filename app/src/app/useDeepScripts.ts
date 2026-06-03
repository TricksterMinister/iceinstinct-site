/* ================================================
   useDeepScripts - React port of script.js
   Ice & Instinct - minimal deep-page behaviour.
   Reveal-on-scroll, header scroll state, gallery track + lightbox,
   tier-nav active state, contact pre-fill, Formspree submit handler.
   Every querySelector is guarded so it no-ops on pages lacking the element.
   ================================================ */

import { useEffect } from 'react';

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

      const openLightbox = (src: string | null, title: string | null) => {
        if (!src) return;
        if (lbImage) {
          lbImage.src = src;
          lbImage.alt = title || '';
        }
        if (lbTitle) lbTitle.textContent = title || '';
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

    // ----- Formspree submit handler -----
    const form = document.querySelector<HTMLFormElement>('form[action*="formspree.io"]');
    const success = document.getElementById('form-success');
    const errorBox = document.getElementById('form-error');

    if (form) {
      const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Send';
        const data = new FormData(form);

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending…';
        }
        if (errorBox) {
          errorBox.classList.remove('show');
          errorBox.textContent = '';
        }

        const showError = (msg: string) => {
          if (errorBox) {
            errorBox.textContent = msg;
            errorBox.classList.add('show');
          } else {
            alert(msg);
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        };

        // Guard: form must be wired to a real Formspree ID
        if (form.action.includes('REPLACE_WITH_FORMSPREE_ID')) {
          showError('Form not configured yet. Please write to hello@iceinstinct.com directly.');
          return;
        }

        try {
          const res = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          });
          const body = await res.json().catch(() => ({}));
          const accepted =
            res.ok && body.ok !== false && body.kind !== 'error' && !body.error && !body.errors;

          if (accepted) {
            form.reset();
            if (success) success.classList.add('show');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalText;
            }
            // Smooth scroll to confirmation
            if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            const apiMsg =
              body.error ||
              (Array.isArray(body.errors) && body.errors.map((x: any) => x.message || x).join('; ')) ||
              'HTTP ' + res.status;
            console.error('Formspree rejected submission:', body);
            showError('Could not send: ' + apiMsg + '. Please email hello@iceinstinct.com instead.');
          }
        } catch (err) {
          console.error('Formspree network error:', err);
          showError('Could not reach the server. Please email hello@iceinstinct.com instead.');
        }
      };
      form.addEventListener('submit', onSubmit);
      cleanups.push(() => form.removeEventListener('submit', onSubmit));
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
