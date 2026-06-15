import { useEffect, useRef } from 'react';
import markUrl from '../assets/ii-mark.png';

type SiteFooterProps = {
  /** When true, render only the inner bottom block (no standalone wrapper) so
   *  it can drop straight into the offering closing-segment grid as its 2nd row. */
  embedded?: boolean;
};

/**
 * Global site footer - "Monolith".
 * Single source of truth for the footer across every page. Norwegian-brutalist
 * sign-off adapted to the brand: a colossal Fraunces wordmark slab, a hairline
 * rule that runs ice-blue -> champagne -> ember (the duality thread), a hard
 * monospace nav grid, and a thin provenance base.
 * Standalone pages render <SiteFooter />; the offering closing uses <SiteFooter embedded />.
 * Class hooks (.oma-close-bottom / .oma-close-foot) are kept so the offering
 * closing-segment grid contract in offering.css/footer.css still holds.
 */
export function SiteFooter({ embedded = false }: SiteFooterProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // The footer comes alive on its own: a one-shot reveal when it enters view,
  // breathing animations that run only while it is on screen, and a cursor-
  // tracked champagne sheen on the wordmark (desktop pointer only). All of it
  // is disabled under prefers-reduced-motion, and the hidden pre-state is set
  // by JS so the footer stays fully visible with no JS.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('is-revealed');
      return;
    }
    root.classList.add('ii-armed');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) root.classList.add('is-revealed', 'is-live');
          else root.classList.remove('is-live'); // pause breathing off-screen
        });
      },
      { threshold: 0.15 },
    );
    io.observe(root);

    let cleanupSheen = () => {};
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const word = root.querySelector<HTMLElement>('.ii-mono-word');
      if (word) {
        const onMove = (ev: PointerEvent) => {
          const r = word.getBoundingClientRect();
          word.style.setProperty('--mx', `${((ev.clientX - r.left) / r.width) * 100}%`);
          word.style.setProperty('--my', `${((ev.clientY - r.top) / r.height) * 100}%`);
          word.classList.add('is-lit');
        };
        const onLeave = () => word.classList.remove('is-lit');
        word.addEventListener('pointermove', onMove);
        word.addEventListener('pointerleave', onLeave);
        cleanupSheen = () => {
          word.removeEventListener('pointermove', onMove);
          word.removeEventListener('pointerleave', onLeave);
        };
      }
    }
    return () => { io.disconnect(); cleanupSheen(); };
  }, []);

  const bottom = (
    <div className="oma-close-bottom ii-mono" ref={rootRef}>
      <div className="ii-mono-top">
        <a className="ii-mono-mark" href="/" data-logo-slot aria-label="Ice & Instinct - home">
          <img src={markUrl} alt="" aria-hidden="true" width={34} height={34} draggable={false} />
        </a>
        <span className="ii-mono-meta">By appointment only</span>
        <span className="ii-mono-meta ii-mono-meta-r">New York Metropolitan Area &amp; New Jersey</span>
      </div>

      <a className="ii-mono-word" href="/" aria-label="Ice & Instinct - home">
        Ice <em>&amp;</em> <span className="ii-w-hot">Instinct</span>
      </a>
      <div className="ii-mono-rule" aria-hidden="true"></div>

      <footer className="oma-close-foot" role="contentinfo">
        <nav className="oma-close-nav" aria-label="Footer">
          <a className="lnk" href="/offerings/">Offerings</a>
          <a className="lnk" href="/concierge/">Concierge</a>
          <a className="lnk" href="/gallery/">The Collection</a>
          <a className="lnk" href="/my-story/">My Story</a>
          <a className="lnk" href="/weddings/">Weddings</a>
          <a className="lnk" href="/corporate/">Corporate</a>
          <a className="lnk" href="/gift/">Gift an Evening</a>
          <a className="lnk" href="/events/">Event Bartenders</a>
          <a className="lnk" href="/journal/">Journal</a>
          <a className="lnk" href="/press/">Press</a>
          <a className="lnk" href="/contact/">Inquire</a>
          <a className="lnk" href="https://www.instagram.com/iceinstinctnyc/" target="_blank" rel="noopener noreferrer" aria-label="Ice & Instinct on Instagram">Instagram</a>
          <a className="lnk" href="/privacy/">Privacy</a>
          <a className="lnk" href="/terms/">Terms</a>
          <a className="lnk" href="/cookies/">Cookies</a>
          <a className="lnk" href="/accessibility/">Accessibility</a>
          <a className="lnk" href="/responsible-service/">Responsible Service</a>
        </nav>
        <nav className="oma-close-nav oma-close-areas" aria-label="Service areas">
          <a className="lnk" href="/new-jersey/">New Jersey</a>
          <a className="lnk" href="/manhattan/">Manhattan</a>
          <a className="lnk" href="/hamptons/">The Hamptons</a>
          <a className="lnk" href="/westchester-greenwich/">Westchester &amp; Greenwich</a>
          <a className="lnk" href="/work-with-us/">Join the Bench</a>
        </nav>
        <div className="oma-close-base">
          <span><a href="tel:+19172927859">+1 (917) 292-7859</a> &middot; <a href="mailto:hello@iceinstinct.com">hello@iceinstinct.com</a></span>
          <a className="oma-close-sign" href="/" aria-label="Ice & Instinct - home">
            <span>Where ritual meets <em>instinct.</em></span>
          </a>
          <span>Est. 2024 &middot; © 2026 Ice &amp; Instinct</span>
        </div>
      </footer>
    </div>
  );

  if (embedded) return bottom;
  return <div className="site-footer oma-close">{bottom}</div>;
}
