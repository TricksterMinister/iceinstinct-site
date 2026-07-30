import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { Closing } from '../sections/Closing';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

export function TribecaPage() {
  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.concierge', '.cin-body', '.closing-segment']);

  return (
    <>
      <div className="cursor" aria-hidden="true">
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
      </div>

      <button className="va-trigger" aria-label="Open menu">
        <span className="va-trigger-ring"></span>
        <TriggerMark />
      </button>

      <div className="va-overlay" aria-hidden="true">
        <button className="va-close" aria-label="Close menu">
          <span></span><span></span>
        </button>
        <div className="va-stage">
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Tribeca &amp; SoHo</p>
          <ul className="va-list">
            <li><a href="/"><i>01</i><b>Home</b><em>The opening view</em></a></li>
            <li><a href="/ice/"><i>02</i><b>ICE</b><em>Event bartenders on call</em></a></li>
            <li><a href="/instinct/"><i>03</i><b>Instinct</b><em>Private mixology, four tiers</em></a></li>
            <li><a href="/concierge/"><i>04</i><b>Concierge</b><em>Five enhancements</em></a></li>
            <li><a href="/my-story/"><i>05</i><b>My Story</b><em>Teimuraz Benidze</em></a></li>
            <li><a href="/gallery/"><i>06</i><b>The Collection</b><em>Thirteen compositions</em></a></li>
            <li><a href="/contact/" data-cursor="link"><i>07</i><b>Inquire</b><em>Begin the conversation</em></a></li>
          </ul>
          <div className="va-deep">
            <span className="va-deep-kicker">Explore &middot; Specializations</span>
            <div className="va-deep-links">
              <a href="/weddings/">Weddings</a>
              <a href="/corporate/">Corporate</a>
              <a href="/gift/">Gift an Evening</a>
              <a href="/journal/">Journal</a>
              <a href="/press/">Press</a>
            </div>
          </div>
        </div>
      </div>

      <header className="header" role="banner">
        <div className="container">
          <nav className="nav" aria-label="Main">
            <a href="/" className="brand">
              <span className="brand-mark">
                <img src={markUrl} alt="" aria-hidden="true" width={34} height={34} draggable={false} />
              </span>
              <span className="brand-name">Ice &amp; Instinct</span>
            </a>
            <div className="nav-links">
              <a href="/instinct/">Instinct</a>
              <a href="/concierge/">Concierge</a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">Inquire</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="concierge std-hero">
          <div className="concierge-hero-grid">
            <div className="concierge-hero-left">
              <div className="concierge-hero-mark" aria-hidden="true">
                <img src={markUrl} alt="" width={64} height={64} draggable={false} />
              </div>
              <p className="concierge-kicker">Tribeca &amp; SoHo &middot; Lower Manhattan</p>
              <h1 className="concierge-headline">
                Private Mixology for Tribeca Lofts &amp; SoHo Cast-Iron Residences.
              </h1>
              <p className="concierge-sub">
                Spacious open-plan lofts, private cobblestone entrances, and exclusive gallery hosts. COI, elevator windows, and discreet late-night execution fully managed.
              </p>
              <div className="concierge-actions">
                <a href="/contact/" className="btn-primary" data-cursor="link">
                  <span className="btn-label">Inquire for Date</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="concierge-hero-right">
              <figure className="concierge-hero-fig">
                <img src="/assets/og/manhattan.png" alt="Private bartending in Tribeca" />
              </figure>
            </div>
          </div>
        </section>
      </main>

      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="TRIBECA" title="Hosting in Tribeca?" titleEm="Let us set the bar." lead="Tell us the date, the room, and the guest count." />
        <SiteFooter embedded />
      </div>
    </>
  );
}
