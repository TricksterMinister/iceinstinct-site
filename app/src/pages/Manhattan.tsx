import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { Closing } from '../sections/Closing';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

/**
 * /manhattan/ - service-area page for Manhattan. Reuses the offering-page
 * design systems (concierge 50/50 hero with a static photo, oma-fmt3 prose,
 * oma-panel timeline, oma-ledger tiers, the sitewide faq ledger and closing
 * segment). No new design language; only the content is Manhattan-specific:
 * doorman buildings, COI and freight elevator workflow, compact apartment
 * setups, and the quiet-hours close.
 */

/** The four tiers, one line each, linking to their pages. Live facts only. */
const TIERS = [
  { label: 'A', name: 'The Foundation', meta: 'Up to 15 guests · 3 hours', price: 'From $650', href: '/offerings/foundation/' },
  { label: 'B', name: 'Perfection in Simplicity', meta: 'Up to 12 guests · 4 hours', price: 'From $900', href: '/offerings/simplicity/' },
  { label: 'C', name: 'Bespoke Design & Artistry', meta: 'Up to 30 guests · 4 hours', price: 'From $1,800', href: '/offerings/bespoke/' },
  { label: 'D', name: 'Omakase Improvisation', meta: 'Open-ended', price: 'From $3,000', href: '/offerings/omakase/' },
];

/** Manhattan FAQ. Mirrored 1:1 by the FAQPage JSON-LD in /manhattan/index.html. */
const FAQS = [
  {
    q: 'Our building requires a COI and a freight elevator reservation. Do you handle that?',
    a: "Yes, routinely. We send a certificate of insurance named to your managing agent's exact requirements, get on the vendor list, and book the freight elevator window with the super ahead of the date. You will not be chasing paperwork the week of your party.",
  },
  {
    q: 'Where does the bar go in a Manhattan apartment?',
    a: 'Wherever the room allows. A galley kitchen, a parlor console, six feet of counter, or a terrace ledge - the station is scaled to the footprint and needs only a standard outlet and access to running water. Professional clear ice, arranged through the Concierge, and full technique come regardless of square footage.',
  },
  {
    q: 'How late can you serve in a residential building?',
    a: "As late as your house rules allow. Most Manhattan buildings hold quiet hours from 10 or 11 pm; we set last call against them, break down near-silently, and leave the space restored - so the evening ends on your terms, not on a neighbor's.",
  },
];

const DEPOSIT = 'A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.';

export function Manhattan() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up), same as the tier pages.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.concierge', '#building', '#evening', '#tiers', '#faq', '.closing-segment']);

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Manhattan</p>
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
        <section className="concierge geo-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">MANHATTAN</span>
            <span className="hg-glow">MANHATTAN</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                The bar comes <span className="it">upstairs.</span>
              </h1>
              <p className="concierge-lead">
                Penthouse dinners, terrace evenings, a dozen guests in a classic six. We bring
                private cocktail service to Manhattan apartments the way the buildings demand it -
                papered, punctual, and quiet about it.
              </p>
              <span className="price">
                From $650 USD
                <small>Four tiers &middot; Doorman buildings routine &middot; COI on request</small>
              </span>
              <a href="/contact/" className="concierge-link">
                Inquire for your evening <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/geo-manhattan.jpg"
                alt="A cocktail over one clear ice cube on a marble ledge, the Manhattan skyline soft behind the glass"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE LOCAL STORY */}
        <section className="tier-section oma-fmt3" id="building">
          <div className="oma-fmt3-ghost" aria-hidden="true">Upstairs</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; The Building</span>
              <h2 className="oma-fmt3-title">
                Half the evening is <span className="it">the building.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                In Manhattan, a private evening starts long before the first pour. It starts with
                the doorman who needs the vendor list by Tuesday, the managing agent who wants a
                certificate of insurance with their exact wording, the freight elevator that is
                yours from four to five and not a minute longer. We have run this workflow enough
                times that it is routine: paperwork submitted ahead, the elevator window booked
                with the super, arrival confirmed with the front desk so no one at the door is
                surprised.
              </p>
              <p>
                The rooms are their own discipline. A galley kitchen in an Upper East Side classic
                six, a parlor console in the West Village, six feet of marble in a Tribeca loft, a
                terrace bar twenty floors above the street - the station is designed for the space,
                not against it. The kit arrives padded and compact, on one cart. Nothing is staged
                in the hallway; nothing leans against a wall it should not touch.
              </p>
              <p>
                And because a dinner party here ends on the building&apos;s schedule, not the
                host&apos;s, the close is engineered. Last call lands before quiet hours, breakdown
                is near-silent, and the kitchen is returned cleaner than we found it. Your
                neighbors learn about the party from the guests, not from the corridor.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              Paperwork for the building. <span className="it">Craft for the room.</span>
            </p>
            <p className="oma-fmt3-foot">Upper East Side &middot; Upper West Side &middot; West Village &middot; Tribeca &middot; SoHo &middot; Midtown</p>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="oma-pause" aria-hidden="true">
          <p className="oma-pause-text">Twenty floors up,<br /><em>nothing rattles.</em></p>
          <span className="oma-pause-mark">MANHATTAN</span>
        </section>

        {/* II. HOW THE EVENING RUNS - dark timeline */}
        <section className="oma-panel dark" id="evening">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; The Evening</span>
              <h2 className="oma-panel-h">
                Service entrance <span className="it">to last call.</span>
              </h2>
              <p className="oma-panel-intro">
                How a Manhattan evening actually runs - the workflow your building expects,
                handled without you having to explain it.
              </p>
            </header>
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>The paperwork</h3>
                  <p>
                    Your building&apos;s COI requirements go to the managing agent ahead of time,
                    named exactly as they ask. Vendor details and arrival times sit with the front
                    desk before the day, so the doorman waves the cart through.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>The freight elevator</h3>
                  <p>
                    The elevator window is booked with the super and held. The kit is compact and
                    padded - one cart up the service corridor, no marks on the walls, no waiting in
                    the lobby.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>The station</h3>
                  <p>
                    Built for the room it lands in: a galley kitchen, a console, a stretch of
                    counter, a terrace ledge. Proper clear ice arranged through the Concierge, and full technique in whatever
                    footprint the apartment offers - a standard outlet and running water cover
                    nearly every setup.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>The service</h3>
                  <p>
                    The same standard as every Ice &amp; Instinct evening - thirteen signature
                    cocktails refined in private service, the classics, and a zero-proof track
                    poured with identical care. Led by Teimuraz Benidze, certified sommelier.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">05</span>
                <div className="oma-step-body">
                  <h3>The close</h3>
                  <p>
                    Last call is set against the building&apos;s quiet hours. Breakdown is
                    near-silent, the space is restored, and the cart goes down the way it came up -
                    the corridor never knows there was a bar.
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
                Choose the rhythm that fits the room. Every tier scales with a full bar team for
                larger evenings, quoted on request. Spirits are not included: you provide them, or
                we purchase on your behalf at supplier cost.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              {TIERS.map((t) => (
                <a className="oma-ledger-row geo-tier-link" key={t.label} href={t.href} data-cursor="link">
                  <span className="lbl">{t.label}</span>
                  <span className="info">
                    <span className="nm">{t.name}</span>
                    <span className="cap">{t.meta}</span>
                  </span>
                  <span className="pr">{t.price}</span>
                </a>
              ))}
              <p className="geo-deposit">{DEPOSIT}</p>
              <p className="geo-crossline">
                Marrying in a Manhattan loft venue, or hosting the firm above Madison Avenue? The
                same building discipline carries through our <a href="/weddings/">wedding service</a> and{' '}
                <a href="/corporate/">corporate service</a>. And when the night needs only a steady
                pair of hands behind the bar, the studio&apos;s vetted bench is on call - see{' '}
                <a href="/events/">Event Bartenders</a>.
              </p>
            </div>
          </div>
        </section>

        {/* IV. FAQ - local questions, mirrored by FAQPage JSON-LD in the stub head */}
        <section className="faq" id="faq">
          <div className="section-bg-word top right" aria-hidden="true">UPTOWN</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Manhattan</span>
                <span className="it">questions.</span>
              </h2>
              <p className="faq-lead">What hosts in doorman buildings ask, answered plainly.</p>
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
        <Closing />

        <SiteFooter embedded />
      </div>
    </>
  );
}
