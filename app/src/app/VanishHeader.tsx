import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Vanish header: single mark trigger + full-screen overlay menu.
 * Markup + open/close behaviour ported 1:1 from cinema/cinema.js.
 * Lenis (if present on window) is stopped/started and used for #-jump scrolling,
 * matching the source; falls back to native scroll when absent.
 */
export function VanishHeader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const vaOverlay = overlayRef.current;
    const vaTrigger = triggerRef.current;
    const vaClose = closeRef.current;
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void; scrollTo(target: number, opts?: { duration?: number }): void } }).lenis;

    function openOverlay() {
      if (!vaOverlay) return;
      vaOverlay.classList.add('is-open');
      vaOverlay.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      // stagger reveal of list items
      gsap.fromTo('.va-list li', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out', delay: 0.1,
      });
      gsap.fromTo('.va-eyebrow, .va-foot', { y: 16, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.05,
      });
    }
    function closeOverlay() {
      if (!vaOverlay) return;
      vaOverlay.classList.remove('is-open');
      vaOverlay.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }

    if (vaTrigger) vaTrigger.addEventListener('click', openOverlay);
    if (vaClose) vaClose.addEventListener('click', closeOverlay);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && vaOverlay && vaOverlay.classList.contains('is-open')) closeOverlay();
    };
    document.addEventListener('keydown', onKey);

    // jumping from overlay closes it
    const links = Array.from(listRef.current?.querySelectorAll('a') ?? []);
    const onLinkClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          closeOverlay();
          setTimeout(() => {
            const top = target.getBoundingClientRect().top + window.scrollY;
            if (lenis) lenis.scrollTo(top, { duration: 1.4 });
            else window.scrollTo({ top, behavior: 'smooth' });
          }, 400);
        }
      }
    };
    links.forEach((a) => a.addEventListener('click', onLinkClick));

    return () => {
      if (vaTrigger) vaTrigger.removeEventListener('click', openOverlay);
      if (vaClose) vaClose.removeEventListener('click', closeOverlay);
      document.removeEventListener('keydown', onKey);
      links.forEach((a) => a.removeEventListener('click', onLinkClick));
    };
  }, []);

  return (
    <>
      {/* ====== VANISH HEADER (single mark, full-screen overlay menu) ====== */}
      <button className="va-trigger" aria-label="Open menu" data-cursor="link" ref={triggerRef}>
        <span className="va-trigger-ring"></span>
        <span className="va-trigger-icon">
          <span></span><span></span><span></span>
        </span>
      </button>

      <div className="va-overlay" aria-hidden="true" ref={overlayRef}>
        <button className="va-close" aria-label="Close menu" data-cursor="link" ref={closeRef}>
          <span></span><span></span>
        </button>
        <div className="va-stage">
          <p className="va-eyebrow">Ice &amp; Instinct / Chapters</p>
          <ul className="va-list" ref={listRef}>
            <li><a href="#hero" data-cursor="link"><i>01</i><b>Bridge</b><em>The opening view</em></a></li>
            <li><a href="#manifesto" data-cursor="link"><i>02</i><b>The Brand</b><em>Not a bar. A studio.</em></a></li>
            <li><a href="#tiers" data-cursor="link"><i>03</i><b>Offerings</b><em>Four levels, one standard</em></a></li>
            <li><a href="#concierge" data-cursor="link"><i>04</i><b>Concierge</b><em>Five enhancements</em></a></li>
            <li><a href="#founder" data-cursor="link"><i>05</i><b>The Alchemist</b><em>Teimuraz Benidze</em></a></li>
            <li><a href="#gallery" data-cursor="link"><i>06</i><b>The Collection</b><em>Twelve compositions</em></a></li>
            <li><a href="#closing" data-cursor="link"><i>07</i><b>Inquire</b><em>Begin the conversation</em></a></li>
          </ul>
          <nav className="va-deep" aria-label="Deep pages">
            <span className="va-deep-eyebrow">Read in full</span>
            <ul>
              <li><a href="/offerings/foundation/" data-cursor="link">i. The Foundation</a></li>
              <li><a href="/offerings/simplicity/" data-cursor="link">ii. Perfection in Simplicity</a></li>
              <li><a href="/offerings/bespoke/" data-cursor="link">iii. Bespoke Design &amp; Artistry</a></li>
              <li><a href="/offerings/omakase/" data-cursor="link">iv. Omakase Improvisation</a></li>
              <li><a href="/concierge/" data-cursor="link">Concierge &amp; Enhancements</a></li>
              <li><a href="/my-story/" data-cursor="link">My Story</a></li>
              <li><a href="/gallery/" data-cursor="link">The Collection</a></li>
              <li><a href="/contact/" data-cursor="link">Inquire</a></li>
            </ul>
          </nav>
          <footer className="va-foot">
            <span>Manhattan / By Appointment</span>
            <span>EST. 2024</span>
          </footer>
        </div>
      </div>
    </>
  );
}
