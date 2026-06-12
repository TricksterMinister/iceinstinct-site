import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { SiteFooter } from '../sections/SiteFooter';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

/**
 * /hamptons/ - service-area page for the summer estates out east. Reuses the
 * offering-page design systems (concierge 50/50 hero with a static photo,
 * oma-fmt3 prose, oma-panel timelines and grids, the oma-ledger tier rows,
 * the sitewide faq ledger and closing segment). No new design language;
 * only the content is Hamptons-specific.
 */

/** The four tiers, one line each, linking to their pages. Live facts only. */
const TIERS = [
  { label: 'A', name: 'The Foundation', meta: 'Up to 15 guests · 3 hours', price: 'From $650', href: '/offerings/foundation/' },
  { label: 'B', name: 'Perfection in Simplicity', meta: 'Up to 12 guests · 4 hours', price: 'From $900', href: '/offerings/simplicity/' },
  { label: 'C', name: 'Bespoke Design & Artistry', meta: 'Up to 30 guests · 4 hours', price: 'From $1,800', href: '/offerings/bespoke/' },
  { label: 'D', name: 'Omakase Improvisation', meta: 'Open-ended', price: 'From $3,000', href: '/offerings/omakase/' },
];

/** Hamptons FAQ. Mirrored 1:1 by the FAQPage JSON-LD in /hamptons/index.html. */
const FAQS = [
  {
    q: 'Do you travel to the Hamptons, and what does it cost?',
    a: 'Yes - through the season we serve Southampton, Water Mill, Bridgehampton, Sag Harbor, East Hampton, Amagansett, and Montauk. Travel is included in your written quote as one figure, stated before you commit, and the clear ice, arranged through the Concierge from a specialist supplier, rides out cold in insulated transport. No surprise line items after the fact.',
  },
  {
    q: 'What kinds of venues do you work in out east?',
    a: 'Estate kitchens, pool houses, tented lawns, rented summer houses, and the occasional deck above the dunes. We build the bar where the house wants it - a standard outlet and running water cover nearly every setup, and anything beyond that is flagged before the day, not on it.',
  },
  {
    q: 'When should we book a summer date?',
    a: 'Before the season opens. The Memorial Day to Labor Day calendar fills first, and July and August Saturdays go earliest. A flat $500 deposit holds the date - fully refundable until 14 days before the evening, transferable for 12 months if plans move.',
  },
];

const DEPOSIT = 'A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.';

export function Hamptons() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up), same as the tier pages.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / The Hamptons</p>
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
        <section className="concierge ham-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">HAMPTONS</span>
            <span className="hg-glow">HAMPTONS</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Out east, <span className="it">the standard holds.</span>
              </h1>
              <p className="concierge-lead">
                From a pool house in Southampton to a deck above the dunes in Montauk, the summer
                calendar fills fast and forgives nothing. We bring the studio to the house -
                clear ice from a specialist supplier, transported cold, real technique, a bar team that scales -
                so the evening holds its standard a hundred miles from the city.
              </p>
              <span className="price">
                From $650 USD
                <small>Four tiers &middot; Summer dates book first &middot; Southampton to Montauk</small>
              </span>
              <a href="/contact/" className="concierge-link">
                Reserve a summer date <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/geo-hamptons.jpg"
                alt="A coupe cocktail and a clear ice cube on a dark counter, dune grass and ocean haze through an open window at dusk"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE SEASON */}
        <section className="tier-section oma-fmt3" id="season">
          <div className="oma-fmt3-ghost" aria-hidden="true">Season</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; The Season</span>
              <h2 className="oma-fmt3-title">
                Memorial Day to <span className="it">Labor Day.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                The Hamptons run on a calendar of their own. The season opens by Memorial Day and
                closes by Labor Day, and inside those fourteen weekends an entire year of hosting
                happens - the welcome dinners, the birthdays moved to the beach, the wedding behind
                the privet, the firm&apos;s summer party. Those dates fill before anything else we
                hold. The hosts who write in spring choose their evening; the ones who call in July
                take what remains.
              </p>
              <p>
                The houses are built for it. An estate kitchen with more counter than most bars in
                Manhattan, a pool house waiting to be staffed, a lawn that takes a tent without
                complaint. The bar goes where the house wants it - the kitchen island, the
                pool-house counter, a long table set for golden hour - and the service is sized to
                the room, from a quiet dinner for twelve to a full team for a weekend house that
                somehow holds a hundred by dusk.
              </p>
              <p>
                A wedding out east - vineyard, club, or a ceremony on the lawn - runs under our{' '}
                <a className="ham-inline" href="/weddings/">wedding service</a>. The offsite that
                migrates to the beach in June is built on our{' '}
                <a className="ham-inline" href="/corporate/">corporate page</a>. Everything else -
                the house weekend, the anniversary, the dinner that earns the drive - begins here.
                And for the season weekends that need only a bartender, the studio&apos;s vetted
                bench is on call - see <a className="ham-inline" href="/events/">Event Bartenders</a>.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              Fourteen weekends. <span className="it">One standard.</span>
            </p>
            <p className="oma-fmt3-foot">
              Southampton &middot; Water Mill &middot; Bridgehampton &middot; Sag Harbor &middot; East Hampton &middot; Amagansett &middot; Montauk
            </p>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="oma-pause" aria-hidden="true">
          <p className="oma-pause-text">The season is short.<br /><em>The standard is not.</em></p>
          <span className="oma-pause-mark">OUT EAST</span>
        </section>

        {/* II. THE EVENING - dark timeline */}
        <section className="oma-panel dark" id="evening">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; The Evening</span>
              <h2 className="oma-panel-h">
                How a night <span className="it">actually runs.</span>
              </h2>
              <p className="oma-panel-intro">
                The distance changes the logistics, not the result. What happens between our studio
                and your last guest&apos;s goodnight, in order.
              </p>
            </header>
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>The drive, planned</h3>
                  <p>
                    We load before the Friday crawl on Route 27, not into it. Arrival time is agreed
                    in advance and held - the bar is built and dressed before the first car comes up
                    the gravel.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>The ice, transported cold</h3>
                  <p>
                    Professional clear ice comes from a specialist supplier, arranged through the
                    Concierge before the date, and rides out in insulated transport, finished on
                    site. The cube in the last glass of the night is as flawless as the first.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>The setup</h3>
                  <p>
                    Estate kitchen, pool house, or tent - we build the bar where the house wants it.
                    A standard outlet and running water cover nearly every setup; anything beyond
                    that is flagged at the walkthrough, not on the day.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>The service</h3>
                  <p>
                    Thirteen signature cocktails refined in private service, the classics poured
                    correctly, and a zero-proof program carried with the same care - for the guests
                    pacing a long summer day.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">05</span>
                <div className="oma-step-body">
                  <h3>The close</h3>
                  <p>
                    At last call the station is broken down and the kitchen returned to order. The
                    house wakes to a quiet counter, not to evidence.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* III. THE HOUSE WEEKEND - light grid, multi-day engagements */}
        <section className="oma-panel light" id="weekend">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">III &middot; The House Weekend</span>
              <h2 className="oma-panel-h">
                More than <span className="it">one evening.</span>
              </h2>
              <p className="oma-panel-intro">
                Out east, guests rarely come for a single night. Multi-day engagements are quoted as
                one program - one brief, one team, one standard across the weekend.
              </p>
            </header>
            <div className="oma-grid">
              <div className="cell">
                <span className="n">01</span>
                <h3>Friday</h3>
                <p>
                  A quiet bar for the arrival dinner - drinks that say the weekend has started,
                  served without theatre after a long drive.
                </p>
              </div>
              <div className="cell">
                <span className="n">02</span>
                <h3>Saturday</h3>
                <p>
                  The evening the weekend is built around. The full menu, the full team, golden hour
                  to last call.
                </p>
              </div>
              <div className="cell">
                <span className="n">03</span>
                <h3>Sunday</h3>
                <p>
                  An unhurried send-off - lighter pours, the zero-proof program forward, the house
                  easing toward the drive home.
                </p>
              </div>
              <div className="cell">
                <span className="n">04</span>
                <h3>One booking</h3>
                <p>
                  One conversation covers all of it. The menu arcs across the days instead of
                  repeating, and the quote arrives as a single written figure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IV. TIERS - light ledger, one line each, linked */}
        <section className="oma-ledger" id="tiers">
          <div className="oma-ledger-wrap">
            <div className="oma-ledger-left reveal">
              <span className="oma-ledger-eye">IV &middot; Investment</span>
              <h2>
                Four tiers. One <span className="it">standard.</span>
              </h2>
              <p className="oma-ledger-desc">
                Choose the rhythm that fits the house. Every tier scales with a full bar team for
                larger evenings, quoted per event. Spirits are not included - you provide them, or
                we purchase on your behalf at supplier cost.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              {TIERS.map((t) => (
                <a className="oma-ledger-row ham-tier-link" key={t.label} href={t.href} data-cursor="link">
                  <span className="lbl">{t.label}</span>
                  <span className="info">
                    <span className="nm">{t.name}</span>
                    <span className="cap">{t.meta}</span>
                  </span>
                  <span className="pr">{t.price}</span>
                </a>
              ))}
              <p className="ham-deposit">{DEPOSIT}</p>
            </div>
          </div>
        </section>

        {/* V. FAQ - local questions, mirrored by FAQPage JSON-LD in the stub head */}
        <section className="faq" id="faq">
          <div className="section-bg-word top right" aria-hidden="true">EAST</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Before</span>
                <span className="it">the drive.</span>
              </h2>
              <p className="faq-lead">What hosts out east ask, answered plainly.</p>
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
          <div className="section-bg-word top right" aria-hidden="true">HAMPTONS</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / The Hamptons</span>
              <h2 className="closing-title">
                Hold a date <span className="it">before the season.</span>
              </h2>
              <p className="closing-lead">
                Tell us the house, the date, and the guest count.
                <br />
                A tailored proposal returns within one business day.
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href="/contact/" data-cursor="link">
                  <span className="btn-label">Reserve a summer date</span>
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
              <span>Southampton to Montauk</span>
              <span>Est. 2024</span>
            </p>
          </div>
        </section>

        <SiteFooter embedded />
      </div>
    </>
  );
}
