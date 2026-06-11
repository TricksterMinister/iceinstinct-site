import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

/**
 * /westchester-greenwich/ - service-area page for the estate towns north of
 * the city: Scarsdale, Rye, Bedford, the Greenwich backcountry. Reuses the
 * offering-page design systems (concierge 50/50 hero, oma-fmt3 prose,
 * oma-panel timelines and grids, oma-ledger tiers, the sitewide faq ledger
 * and closing segment). Only the content is local.
 */

/** The four tiers, one line each, linking to their pages. Live facts only. */
const TIERS = [
  { label: 'A', name: 'The Foundation', meta: 'Up to 15 guests · 3 hours', price: 'From $650', href: '/offerings/foundation/' },
  { label: 'B', name: 'Perfection in Simplicity', meta: 'Up to 12 guests · 4 hours', price: 'From $900', href: '/offerings/simplicity/' },
  { label: 'C', name: 'Bespoke Design & Artistry', meta: 'Up to 30 guests · 4 hours', price: 'From $1,800', href: '/offerings/bespoke/' },
  { label: 'D', name: 'Omakase Improvisation', meta: 'Open-ended', price: 'From $3,000+', href: '/offerings/omakase/' },
];

/** Local FAQ. Mirrored 1:1 by the FAQPage JSON-LD in /westchester-greenwich/index.html. Edit both together. */
const FAQS = [
  {
    q: 'Do you travel to Scarsdale, Rye, Bedford, and the Greenwich backcountry?',
    a: 'Yes. Westchester and the Greenwich side of Fairfield County are core service area for us, alongside Manhattan and New Jersey. We drive in from our New Jersey base with everything the bar needs - travel is included in your private quote, and there is no city vendor logistics premium.',
  },
  {
    q: 'What kinds of homes and venues do you set up in?',
    a: "Estate kitchens and butler's pantries, libraries, wine cellars, pool houses, heated tents, club rooms in Rye and Greenwich. The bar needs a standard outlet and access to running water - nearly every house in the county has both where we need them. A certificate of insurance is provided on request for clubs and managed venues.",
  },
  {
    q: 'Our dinners end early. How does the timing work?',
    a: 'We build the bar before your first guest arrives and break it down quietly after the last one leaves. An evening that closes at ten thirty is normal here, and it is staffed and priced as exactly that. Arrival, service hours, and breakdown are confirmed in writing before you commit.',
  },
];

const DEPOSIT = 'A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.';

export function WestchesterGreenwich() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up), same as the tier pages.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.concierge', '#towns', '#evening', '#cellar', '#tiers', '#faq', '.closing-segment']);

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Westchester &amp; Greenwich</p>
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
        <section className="concierge wg-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">WESTCHESTER</span>
            <span className="hg-glow">WESTCHESTER</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Westchester &amp; <span className="it">Greenwich.</span>
              </h1>
              <p className="concierge-lead">
                Scarsdale, Rye, Bedford, the backcountry. Private dinners in houses built for
                entertaining - a bar brought to the house, run quietly, and gone before midnight.
              </p>
              <span className="price">
                From $650 USD
                <small>Four tiers &middot; Westchester &amp; Fairfield County &middot; By appointment</small>
              </span>
              <a href="/contact/" className="concierge-link">
                Inquire for your evening <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/geo-westchester-greenwich.jpg"
                alt="A cut-crystal rocks glass with clear ice in a dark estate library, gold light through a paned window"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE TOWNS - the local story */}
        <section className="tier-section oma-fmt3" id="towns">
          <div className="oma-fmt3-ghost" aria-hidden="true">Towns</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; The Towns</span>
              <h2 className="oma-fmt3-title">
                Houses built for <span className="it">entertaining.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                There is a particular kind of evening north of the city. Twelve guests in Scarsdale
                or Rye, dinner called for seven because the morning still matters, a host who knows
                exactly what is resting in the cellar and expects the bar to keep up. The room is
                private, the names at the table are sometimes known, and nothing about the night is
                meant to travel further than the end of the driveway.
              </p>
              <p>
                We built our service for precisely that room. Teimuraz Benidze - the first certified
                sommelier in Georgia&apos;s history, holding four sommelier credentials - leads every
                evening, and the bar is run the way these houses are run: arranged before guests
                arrive, quiet while it works, gone without a trace. Professional clear ice is
                standard, thirteen signature cocktails carry the menu, and a full zero-proof program
                serves the guests pacing a school-night dinner with the same care as everyone else.
              </p>
              <p>
                The address changes; the standard does not. A{' '}
                <a className="wg-prose-link" href="/weddings/">wedding</a> at a Bedford barn carries
                a full bar team. A{' '}
                <a className="wg-prose-link" href="/corporate/">client dinner</a> at a Greenwich
                office comes with invoicing and a certificate of insurance. And most often, it is
                simply dinner at the house - which is where this work began.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              The evening stays <span className="it">in the room.</span>
            </p>
            <p className="oma-fmt3-foot">Scarsdale &middot; Rye &middot; Bronxville &middot; Bedford &middot; Chappaqua &middot; Armonk &middot; Greenwich backcountry</p>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="oma-pause" aria-hidden="true">
          <p className="oma-pause-text">Quiet houses,<br /><em>quieter service.</em></p>
          <span className="oma-pause-mark">BACKCOUNTRY</span>
        </section>

        {/* II. THE EVENING - dark timeline: how a night actually runs up county */}
        <section className="oma-panel dark" id="evening">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; The Evening</span>
              <h2 className="oma-panel-h">
                How the night <span className="it">actually runs.</span>
              </h2>
              <p className="oma-panel-intro">
                Not a promise of atmosphere - the sequence itself, from the parkway to the last
                quiet click of the kitchen door.
              </p>
            </header>
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>The route</h3>
                  <p>
                    We drive in from our New Jersey base with everything the bar needs - up the
                    Hutchinson, off the Merritt, or along the back roads to Bedford. Travel is
                    included in the quote, with no city vendor logistics premium and no van idling
                    in the driveway at dusk.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>The setup</h3>
                  <p>
                    The bar is built and dressed before your first guest turns in from the road. A
                    butler&apos;s pantry, a corner of the library, the pool house in June, a heated
                    tent in December - we work with the room you give us. A standard outlet and
                    running water cover nearly every setup.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>The service</h3>
                  <p>
                    Cocktails are composed at the pace of the dinner, not a queue. A sommelier
                    behind the bar means the host&apos;s own cellar is read, not rivaled - your wine
                    is poured and paired with the respect it was collected for.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>The close</h3>
                  <p>
                    Dinners here end at a civilized hour, and we are staffed for exactly that. Last
                    call lands where the host wants it, the station is broken down in silence, and
                    the kitchen is returned as found. By the time the last car leaves, so have we.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">05</span>
                <div className="oma-step-body">
                  <h3>The discretion</h3>
                  <p>
                    Some of our hosts are known names. Who attended, what was poured, what was said
                    over the second round - none of it travels. No photographs, no tagging, no
                    guest list kept beyond the evening.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* III. THE CELLAR - light grid: wine-cellar households, holiday season */}
        <section className="oma-panel light" id="cellar">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">III &middot; The Cellar</span>
              <h2 className="oma-panel-h">
                For households <span className="it">with a cellar.</span>
              </h2>
              <p className="oma-panel-intro">
                Many houses in this county hold serious cellars. The bar you hire should know what
                to do with one.
              </p>
            </header>
            <div className="oma-grid">
              <div className="cell">
                <span className="n">01</span>
                <h3>A sommelier at the bar</h3>
                <p>
                  Teimuraz Benidze was the first certified sommelier in Georgia&apos;s history and
                  holds four sommelier credentials. The person mixing your cocktails can also
                  decant your Burgundy correctly - and knows when to do which.
                </p>
              </div>
              <div className="cell">
                <span className="n">02</span>
                <h3>Your bottles, respected</h3>
                <p>
                  Spirits and wine are never folded into the price. You provide them - households
                  with a cellar usually prefer to - or we purchase on your behalf at supplier cost,
                  documented. Either way, what is opened is treated as the privilege it is.
                </p>
              </div>
              <div className="cell">
                <span className="n">03</span>
                <h3>The holiday season</h3>
                <p>
                  Thanksgiving through New Year is when this county entertains, and December dates
                  go to the hosts who hold them early. A $500 deposit reserves yours - fully
                  refundable until 14 days out, transferable for 12 months.
                </p>
              </div>
              <div className="cell">
                <span className="n">04</span>
                <h3>When the occasion grows</h3>
                <p>
                  The same standard scales past the dinner table:{' '}
                  <a className="wg-prose-link" href="/weddings/">weddings</a> carry a full bar
                  team, and <a className="wg-prose-link" href="/corporate/">corporate events</a>{' '}
                  come with invoicing, a W-9, and a COI for the venue. When the house needs only a
                  quiet, capable bartender for the evening, the studio&apos;s vetted bench is on
                  call - see <a className="wg-prose-link" href="/events/">Event Bartenders</a>.
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
                Choose the rhythm that fits the evening. Every tier travels to Westchester and
                Greenwich at the same from-price - the drive is in the quote, not a surcharge - and
                any tier scales with a full bar team for larger gatherings. Spirits are not
                included: the host provides them, or we purchase at supplier cost.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              {TIERS.map((t) => (
                <a className="oma-ledger-row wg-tier-link" key={t.label} href={t.href} data-cursor="link">
                  <span className="lbl">{t.label}</span>
                  <span className="info">
                    <span className="nm">{t.name}</span>
                    <span className="cap">{t.meta}</span>
                  </span>
                  <span className="pr">{t.price}</span>
                </a>
              ))}
              <p className="wg-deposit">{DEPOSIT}</p>
            </div>
          </div>
        </section>

        {/* V. FAQ - local questions, mirrored by FAQPage JSON-LD in the stub head */}
        <section className="faq" id="faq">
          <div className="section-bg-word top right" aria-hidden="true">COUNTY</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Local</span>
                <span className="it">questions.</span>
              </h2>
              <p className="faq-lead">What hosts in Westchester and Greenwich ask, answered plainly.</p>
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
          <div className="section-bg-word top right" aria-hidden="true">GREENWICH</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / Westchester &amp; Greenwich</span>
              <h2 className="closing-title">
                An evening, <span className="it">held quietly.</span>
              </h2>
              <p className="closing-lead">
                Tell us the date, the town, and the guest count.
                <br />
                A tailored proposal returns within one business day.
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href="/contact/" data-cursor="link">
                  <span className="btn-label">Inquire for your evening</span>
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
              <span>Westchester &middot; Greenwich &middot; NYC Metro &amp; New Jersey</span>
              <span>Est. 2024</span>
            </p>
          </div>
        </section>

        <SiteFooter embedded />
      </div>
    </>
  );
}
