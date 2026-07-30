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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Menu</p>
          <ul className="va-list">
            <li><a href="/" data-cursor="link"><i>01</i><b>Home</b></a></li>
            <li><a href="/ice/" data-cursor="link"><i>02</i><b>ICE</b></a></li>
            <li><a href="/instinct/" data-cursor="link"><i>03</i><b>Instinct</b></a></li>
            <li><a href="/concierge/" data-cursor="link"><i>04</i><b>Concierge</b></a></li>
            <li><a href="/my-story/" data-cursor="link"><i>05</i><b>My Story</b></a></li>
            <li><a href="/gallery/" data-cursor="link"><i>06</i><b>The Collection</b></a></li>
            <li><a href="/contact/" data-cursor="link"><i>07</i><b>Inquire</b></a></li>
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
          <footer className="va-foot">
            <span>New York Metropolitan Area / By Appointment</span>
            <span>EST. 2024</span>
          </footer>
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
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">TRIBECA</span>
            <span className="hg-glow">TRIBECA</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Loft mixology in <span className="it">Tribeca &amp; SoHo.</span>
              </h1>
              <p className="concierge-lead">
                Spacious open-plan lofts, private cobblestone entrances, and exclusive gallery hosts. COI, elevator windows, and discreet late-night execution fully managed.
              </p>
              <span className="price">
                From $650 USD
                <small>Four tiers &middot; Elevator buildings routine &middot; COI on request</small>
              </span>
              <a href="/contact/" className="concierge-link">
                Inquire for date <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/geo-manhattan.jpg"
                alt="Private mixology for Tribeca lofts"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
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
