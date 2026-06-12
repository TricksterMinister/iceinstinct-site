import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

/**
 * /new-jersey/ - service-area page for the studio's home state. Reuses the
 * offering-page design systems (concierge 50/50 photo hero, oma-fmt3 prose,
 * oma-panel timeline, oma-ledger tiers, the sitewide faq ledger and closing
 * segment). Only the content is New Jersey-specific; the angle is that NJ is
 * the home base, not a destination.
 */

/** The four tiers, one line each, linking to their pages. Live facts only. */
const TIERS = [
  { label: 'A', name: 'The Foundation', meta: 'Up to 15 guests · 3 hours', price: 'From $650', href: '/offerings/foundation/' },
  { label: 'B', name: 'Perfection in Simplicity', meta: 'Up to 12 guests · 4 hours', price: 'From $900', href: '/offerings/simplicity/' },
  { label: 'C', name: 'Bespoke Design & Artistry', meta: 'Up to 30 guests · 4 hours', price: 'From $1,800', href: '/offerings/bespoke/' },
  { label: 'D', name: 'Omakase Improvisation', meta: 'Open-ended', price: 'From $3,000', href: '/offerings/omakase/' },
];

/** Local FAQ. Mirrored 1:1 by the FAQPage JSON-LD in /new-jersey/index.html. */
const FAQS = [
  {
    q: 'Is there a travel fee for New Jersey events?',
    a: 'No. New Jersey is our home base, so a New Jersey quote carries no tunnel tolls, no Manhattan vendor premium, and no travel line for the Gold Coast or the estate towns. The price you are quoted is the price of the evening.',
  },
  {
    q: 'Which New Jersey towns and venues do you serve?',
    a: "Waterfront penthouses and amenity lounges in Hoboken, Jersey City, Weehawken, and Edgewater; private homes and estates in Short Hills, Summit, Montclair, Ridgewood, and Alpine. For doorman and high-rise buildings we coordinate with management - a certificate of insurance is provided on request, and arrival is set to the building's service-elevator window.",
  },
  {
    q: 'Can you take a short-notice date in New Jersey?',
    a: 'Often, yes. The founder lives in New Jersey, so same-week dates are realistic here when the calendar allows. A flat $500 deposit holds the date - fully refundable until 14 days before the evening, transferable for 12 months.',
  },
];

const DEPOSIT = 'A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.';

export function NewJersey() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up), same as the tier pages.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.concierge', '#home-base', '#evening', '#tiers', '#faq', '.closing-segment']);

  /* Hero ghost: a champagne light follows the cursor and lights the letters
     (same self-contained effect as the tier pages). */
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.concierge');
    const word = hero?.querySelector<HTMLElement>('.section-bg-word');
    if (!hero || !word) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = word.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      word.classList.toggle('is-lit', inside);
      if (inside) {
        word.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        word.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      }
    };
    const onLeave = () => word.classList.remove('is-lit');
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

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
          <span></span>
          <span></span>
        </button>
        <div className="va-stage">
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / New Jersey</p>
          <ul className="va-list">
            <li><a href="/"><i>01</i><b>Home</b><em>The opening view</em></a></li>
            <li><a href="/offerings/"><i>02</i><b>Offerings</b><em>Four levels, one standard</em></a></li>
            <li><a href="/concierge/"><i>03</i><b>Concierge</b><em>Five enhancements</em></a></li>
            <li><a href="/my-story/"><i>04</i><b>My Story</b><em>Teimuraz Benidze</em></a></li>
            <li><a href="/gallery/"><i>05</i><b>The Collection</b><em>Thirteen compositions</em></a></li>
            <li><a href="/contact/"><i>06</i><b>Inquire</b><em>Begin the conversation</em></a></li>
          </ul>
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
              <a href="/offerings/">Offerings</a>
              <a href="/concierge/">Concierge</a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">Inquire</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO - concierge 50/50 technique, static photo (monochrome at rest) */}
        <section className="concierge njg-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">NEW JERSEY</span>
            <span className="hg-glow">NEW JERSEY</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Our side of <span className="it">the Hudson.</span>
              </h1>
              <p className="concierge-lead">
                Ice &amp; Instinct is based in New Jersey. The quote carries no tunnel tolls and no
                Manhattan vendor premium, the calendar can hold a same-week date, and the drive to
                your door is ours - not a line on your invoice.
              </p>
              <span className="price">
                From $650 USD
                <small>Four tiers &middot; Gold Coast to the estate towns &middot; Home-base calendar</small>
              </span>
              <a href="/contact/" className="concierge-link">
                Begin the conversation <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/geo-new-jersey.jpg"
                alt="A coupe cocktail with clear ice on black marble, the Manhattan skyline across the Hudson at dusk"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE HOME BASE - the local story */}
        <section className="tier-section oma-fmt3" id="home-base">
          <div className="oma-fmt3-ghost" aria-hidden="true">Home</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; The Home Base</span>
              <h2 className="oma-fmt3-title">
                No tunnel <span className="it">on the quote.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                Most Manhattan vendors price New Jersey as a destination: the tunnel, the tolls, the
                hours added to every load-in. We price it as home. The studio is based here, and that
                changes the arithmetic of an evening - no crossing fees folded into the number, no
                city vendor premium, and a founder who can stand in your kitchen for a walkthrough
                days before the event, because the walkthrough is a short drive, not an expedition.
              </p>
              <p>
                It also changes what we get to pour against. The Gold Coast has quietly become one of
                the best rooms in the metropolitan area: Hoboken and Jersey City penthouses and
                amenity lounges where the bar faces the skyline across the water - the view Manhattan
                pays a premium for, held at arm&apos;s length. Inland, the estate towns - Short
                Hills, Summit, Montclair - still host the way the city no longer can: real dining
                rooms, real gardens, dinner for twelve in a house built for entertaining.
              </p>
              <p>
                The craft does not change with the zip code. Teimuraz Benidze - the first certified
                sommelier in Georgia&apos;s history, holding four sommelier credentials - leads every
                New Jersey evening, with professional clear ice, arranged through the Concierge, and thirteen signature
                cocktails refined in private service. A waterfront <a className="njg-link" href="/weddings/">wedding</a> takes
                the full bar team; a client dinner in a Jersey City tower runs on invoice as a{' '}
                <a className="njg-link" href="/corporate/">corporate event</a>. And because the studio is here,
                same-week dates are realistic in New Jersey when the calendar allows. Need just a
                bartender for the evening, even on a same-week date? The studio&apos;s vetted bench
                is on call - see <a className="njg-link" href="/events/">Event Bartenders</a>.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              For once, the bar is already <span className="it">on your side of the river.</span>
            </p>
            <p className="oma-fmt3-foot">Hoboken &middot; Jersey City &middot; Weehawken &middot; Edgewater &middot; Short Hills &middot; Summit &middot; Montclair &middot; Ridgewood &middot; Alpine</p>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="oma-pause" aria-hidden="true">
          <p className="oma-pause-text">This side of<br /><em>the Hudson.</em></p>
          <span className="oma-pause-mark">NEW JERSEY</span>
        </section>

        {/* II. THE EVENING - how a New Jersey date actually runs */}
        <section className="oma-panel dark" id="evening">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; The Evening</span>
              <h2 className="oma-panel-h">
                An evening, <span className="it">run from here.</span>
              </h2>
              <p className="oma-panel-intro">
                What a New Jersey date actually looks like, from the first call to the last glass.
              </p>
            </header>
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>The walkthrough</h3>
                  <p>
                    A call, or a visit - and in New Jersey a visit is easy. We see the room, the
                    light, the counter the bar will live on, and set the menu against the space
                    rather than a floor plan.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>The building</h3>
                  <p>
                    For Gold Coast high-rises we coordinate with management before the date - a
                    certificate of insurance named to the building on request, arrival set to the
                    service-elevator window. Your only job is the guest list.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>The build</h3>
                  <p>
                    We arrive ahead of service to build and dress the bar - tools, glassware, and
                    the professional clear ice arranged through the Concierge before the date.
                    Setup timing is confirmed in advance, and held.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>The service</h3>
                  <p>
                    The menu leads - signature cocktails, classics, and a zero-proof track served
                    with the same care. Larger rooms take a full bar team, roughly one bartender per
                    40 to 50 guests, quoted in writing before you commit.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">05</span>
                <div className="oma-step-body">
                  <h3>The close</h3>
                  <p>
                    At last call the station is broken down and the space returned to order. The
                    spirits are yours throughout - provided by you, or purchased on your behalf at
                    supplier cost, documented.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* III. TIERS - light ledger, one line each, linked */}
        <section className="oma-ledger" id="tiers">
          <div className="oma-ledger-wrap">
            <div className="oma-ledger-left reveal">
              <span className="oma-ledger-eye">III &middot; Investment</span>
              <h2>
                Four tiers. One <span className="it">standard.</span>
              </h2>
              <p className="oma-ledger-desc">
                The same four tiers we pour everywhere, without the travel arithmetic. Every tier
                scales with a full bar team for larger gatherings. Spirits are not included: you
                provide them, or we purchase at supplier cost. An evening can also be given -{' '}
                <a className="njg-link" href="/gift/">the gift</a> covers any tier.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              {TIERS.map((t) => (
                <a className="oma-ledger-row njg-tier-link" key={t.label} href={t.href} data-cursor="link">
                  <span className="lbl">{t.label}</span>
                  <span className="info">
                    <span className="nm">{t.name}</span>
                    <span className="cap">{t.meta}</span>
                  </span>
                  <span className="pr">{t.price}</span>
                </a>
              ))}
              <p className="njg-deposit">{DEPOSIT}</p>
            </div>
          </div>
        </section>

        {/* IV. FAQ - local questions, mirrored by FAQPage JSON-LD in the stub head */}
        <section className="faq" id="faq">
          <div className="section-bg-word top right" aria-hidden="true">JERSEY</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Asked from</span>
                <span className="it">this side.</span>
              </h2>
              <p className="faq-lead">What New Jersey hosts ask, answered plainly.</p>
            </header>
            <ul className="faq-list">
              {FAQS.map((item, i) => (
                <li className="faq-item" key={item.q}>
                  <details className="faq-details">
                    <summary className="faq-q" data-cursor="link">
                      <span className="faq-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-q-mark" aria-hidden="true"></span>
                    </summary>
                    <div className="faq-a">
                      <p>{item.a}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* CLOSING - framed CTA + global footer share one viewport */}
      <div className="closing-segment oma-close" id="final-cta">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">NEW JERSEY</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / New Jersey</span>
              <h2 className="closing-title">
                Begin <span className="it">close to home.</span>
              </h2>
              <p className="closing-lead">
                Tell us the date, the town, and the guest count.
                <br />
                A tailored proposal returns within one business day.
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href="/contact/" data-cursor="link">
                  <span className="btn-label">Begin the conversation</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </a>
                <a className="btn-ghost" href="tel:+19172927859" data-cursor="link">
                  Call +1 (917) 292-7859
                </a>
              </div>
              <p className="closing-deposit">{DEPOSIT}</p>
            </div>
            <p className="closing-meta">
              <span>By appointment only</span>
              <span>New Jersey &amp; NYC Metro</span>
              <span>Est. 2024</span>
            </p>
          </div>
        </section>

        <SiteFooter embedded />
      </div>
    </>
  );
}
