import markUrl from '../assets/ii-mark.png';

type SiteFooterProps = {
  /** When true, render only the inner bottom block (no standalone wrapper) so
   *  it can drop straight into the offering closing-segment grid as its 2nd row. */
  embedded?: boolean;
};

/**
 * Global site footer. Single source of truth for the footer across every page.
 * Visual reference = the offering closing-segment bottom band (marquee + links).
 * Standalone pages render <SiteFooter />; the offering closing uses <SiteFooter embedded />.
 */
export function SiteFooter({ embedded = false }: SiteFooterProps) {
  const bottom = (
    <div className="oma-close-bottom">
      <div className="oma-close-marquee" aria-hidden="true">
        <div className="oma-close-track">
          <span>Ice &amp; <em>Instinct</em></span>
          <span>Ice &amp; <em>Instinct</em></span>
          <span>Ice &amp; <em>Instinct</em></span>
          <span>Ice &amp; <em>Instinct</em></span>
        </div>
      </div>

      <footer className="oma-close-foot" role="contentinfo">
        <nav className="oma-close-nav" aria-label="Footer">
          <a className="lnk" href="/offerings/">Offerings</a>
          <a className="lnk" href="/concierge/">Concierge</a>
          <a className="lnk" href="/gallery/">The Collection</a>
          <a className="lnk" href="/my-story/">My Story</a>
          <a className="lnk" href="/weddings/">Weddings</a>
          <a className="lnk" href="/corporate/">Corporate</a>
          <a className="lnk" href="/gift/">Gift an Evening</a>
          <a className="lnk" href="/contact/">Inquire</a>
          <a className="lnk" href="https://www.instagram.com/iceinstinctnyc/" target="_blank" rel="noopener noreferrer" aria-label="Ice & Instinct on Instagram">Instagram</a>
          <a className="lnk" href="/privacy/">Privacy</a>
          <a className="lnk" href="/terms/">Terms</a>
          <a className="lnk" href="/cookies/">Cookies</a>
          <a className="lnk" href="/accessibility/">Accessibility</a>
          <a className="lnk" href="/responsible-service/">Responsible Service</a>
        </nav>
        <div className="oma-close-base">
          <span>By appointment only &middot; New York Metropolitan Area &amp; New Jersey &middot; <a href="tel:+19172927859" style={{ color: 'inherit', textDecoration: 'none' }}>+1 (917) 292-7859</a></span>
          <a className="oma-close-sign" href="/" data-logo-slot aria-label="Ice & Instinct - home">
            <img
              className="oma-close-mark"
              src={markUrl}
              alt=""
              aria-hidden="true"
              width={30}
              height={30}
              draggable={false}
            />
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
