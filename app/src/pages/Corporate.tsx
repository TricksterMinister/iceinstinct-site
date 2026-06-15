import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { Closing } from '../sections/Closing';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

/** The four tiers, one line each, linking to their pages. Live facts only. */
const TIERS = [
  { label: 'A', name: 'The Foundation', meta: 'Up to 15 guests · 3 hours', price: 'From $650', href: '/offerings/foundation/' },
  { label: 'B', name: 'Perfection in Simplicity', meta: 'Up to 12 guests · 4 hours', price: 'From $900', href: '/offerings/simplicity/' },
  { label: 'C', name: 'Bespoke Design & Artistry', meta: 'Up to 30 guests · 4 hours', price: 'From $1,800', href: '/offerings/bespoke/' },
  { label: 'D', name: 'Omakase Improvisation', meta: 'Open-ended', price: 'From $3,000+', href: '/offerings/omakase/' },
];

/** Corporate FAQ. Mirrored 1:1 by the FAQPage JSON-LD in /corporate/index.html. */
const FAQS = [
  {
    q: 'Can you invoice our company?',
    a: 'Yes. We invoice the company directly and a W-9 is ready for your accounts team. A flat $500 deposit reserves the date; the balance is due before the event.',
  },
  {
    q: 'Do you provide a certificate of insurance?',
    a: 'Yes. A COI is available on request for venues and building management. Tell us the certificate-holder details and we include it with the paperwork.',
  },
  {
    q: 'How do you handle alcohol at a workplace event?',
    a: 'We serve; we do not sell. The company provides the spirits, or we purchase on your behalf at supplier cost. A full zero-proof program is available so a mixed-consumption room is served with the same care.',
  },
  {
    q: 'How many guests can you handle?',
    a: 'The four tiers cover events up to 30 guests as listed, and any tier scales with a full bar team for larger gatherings - receptions, galas, and company-wide events are quoted on request.',
  },
  {
    q: 'How much lead time do you need?',
    a: 'Two or more weeks is ideal. Shorter timelines are often possible - ask, and we will tell you honestly what we can do. Arrival, setup, and breakdown timing is confirmed in advance.',
  },
];

const DEPOSIT = 'A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.';

export function Corporate() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up), same as the tier pages.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.concierge', '#positioning', '#centerpiece', '#planners', '#tiers', '#faq', '.closing-segment']);

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Corporate</p>
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
        {/* HERO - Concierge 50/50 technique, static photo (monochrome at rest) */}
        <section className="concierge corp-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">CORPORATE</span>
            <span className="hg-glow">CORPORATE</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Corporate <span className="it">events.</span>
              </h1>
              <p className="concierge-lead">
                Brand events, client dinners, leadership offsites, product launches. A bar that is part of the
                program, not the catering line.
              </p>
              <span className="price">
                From $650 USD
                <small>Four tiers · NYC Metro &amp; New Jersey · Invoicing available</small>
              </span>
              <a href="/contact/?occasion=corporate" className="concierge-link">
                Inquire <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/corporate-loft.jpg"
                alt="A row of cocktails on a dark loft bar with city lights behind"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. POSITIONING */}
        <section className="tier-section oma-fmt3" id="positioning">
          <div className="oma-fmt3-ghost" aria-hidden="true">Program</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; The Position</span>
              <h2 className="oma-fmt3-title">
                Part of the <span className="it">program.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                A corporate event has one job: to say something precise about the company that hosts it. The room,
                the pacing, the glass in each guest&apos;s hand - every detail either carries that message or dilutes
                it. We build the bar that carries it.
              </p>
              <p>
                Ice &amp; Instinct is a private mixology studio, not a catering line. One alchemist leads - Teimuraz
                Benidze, certified sommelier - and a team of trusted New York bartenders scales the service to the
                room. Brand events, client dinners, leadership offsites, product launches: each receives a program
                designed for its purpose, not a package pulled from a shelf.
              </p>
              <p>
                The standard does not move. Proper clear ice arranged through the Concierge, precise temperature, thirteen signature cocktails
                refined in private service, and a zero-proof program prepared with the same discipline - so every
                guest is served with intention, whatever they choose to drink.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              The bar is not a vendor. <span className="it">It is part of the message.</span>
            </p>
            <p className="oma-fmt3-foot">Manhattan &middot; Brooklyn &middot; Westchester &middot; The Hamptons &middot; Greenwich &middot; North New Jersey</p>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="oma-pause" aria-hidden="true">
          <p className="oma-pause-text">The room is<br />the <em>message.</em></p>
          <span className="oma-pause-mark">CORPORATE</span>
        </section>

        {/* II. OMAKASE AS ENTERTAINMENT */}
        <section className="oma-panel dark" id="centerpiece">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; The Centerpiece</span>
              <h2 className="oma-panel-h">
                The evening&apos;s <span className="it">entertainment.</span>
              </h2>
              <p className="oma-panel-intro">
                For the events that need more than service, the Omakase Improvisation tier turns the bar into the
                program itself. No menu, no repetition: cocktails created in real time, in dialogue with the room.
              </p>
            </header>
            <div className="oma-grid">
              <div className="cell">
                <span className="n">01</span>
                <h3>Real-time creation</h3>
                <p>
                  Each cocktail is composed spontaneously for the guest in front of the bar - their mood, their
                  palate, the moment. No two servings repeat.
                </p>
              </div>
              <div className="cell">
                <span className="n">02</span>
                <h3>In dialogue with the room</h3>
                <p>
                  Guests do not watch from a distance. The questions, the technique, the conversation draw them in -
                  the bar becomes the entertainment, not an interlude between speeches.
                </p>
              </div>
              <div className="cell">
                <span className="n">03</span>
                <h3>An anchor for the program</h3>
                <p>
                  Product launches and client dinners gain a centerpiece that needs no stage. The bar holds the room
                  while the evening does its work.
                </p>
              </div>
            </div>
            <div className="corp-panel-cta">
              <a className="btn-ghost" href="/offerings/omakase/" data-cursor="link">
                Explore Omakase Improvisation
              </a>
            </div>
          </div>
        </section>

        {/* III. FOR THE PLANNERS - light timeline */}
        <section className="oma-panel light" id="planners">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">III &middot; The Logistics</span>
              <h2 className="oma-panel-h">
                Built for <span className="it">planners.</span>
              </h2>
              <p className="oma-panel-intro">
                For the EA, the event manager, the office of the founder: the answers you need before you propose us
                internally, in one place.
              </p>
            </header>
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>Invoicing</h3>
                  <p>We invoice the company directly. A W-9 is ready for your accounts team, and the paperwork moves at corporate speed.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>Insurance</h3>
                  <p>A certificate of insurance is available on request for venues and building management.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>Predictable timing</h3>
                  <p>Arrival, setup, and breakdown are agreed in advance and held to the minute. Your run-of-show stays intact.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>Alcohol, handled correctly</h3>
                  <p>We serve; we do not sell. The company provides the spirits, or we purchase on your behalf at supplier cost, documented for your records.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">05</span>
                <div className="oma-step-body">
                  <h3>Zero-proof program</h3>
                  <p>A full non-alcoholic program prepared with the same care, for mixed-consumption workplaces where every guest must be served equally well.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">06</span>
                <div className="oma-step-body">
                  <h3>Scale without surprises</h3>
                  <p>Any tier scales with a full bar team for larger events. The headcount changes; the standard does not.</p>
                </div>
              </li>
            </ol>
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
                Choose the rhythm that fits the event. Every tier can scale with a full bar team for larger
                gatherings, quoted on request. Spirits are not included: the company provides them, or we purchase at
                supplier cost.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              {TIERS.map((t) => (
                <a className="oma-ledger-row corp-tier-link" key={t.label} href={t.href} data-cursor="link">
                  <span className="lbl">{t.label}</span>
                  <span className="info">
                    <span className="nm">{t.name}</span>
                    <span className="cap">{t.meta}</span>
                  </span>
                  <span className="pr">{t.price}</span>
                </a>
              ))}
              <p className="corp-deposit">{DEPOSIT}</p>
            </div>
          </div>
        </section>

        {/* V. FAQ - corporate questions, mirrored by FAQPage JSON-LD in the stub head */}
        <section className="faq" id="faq">
          <div className="section-bg-word right" aria-hidden="true">ANSWERS</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Corporate</span>
                <span className="it">questions.</span>
              </h2>
              <p className="faq-lead">The answers your planning thread needs, plainly given.</p>
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

      {/* CLOSING - light framed CTA + dark marquee/footer */}
      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="TOAST" title="Impress" titleEm="every guest." lead="A bar your clients remember long after the close. Tell us the occasion and the headcount." />

        <SiteFooter embedded />
      </div>
    </>
  );
}
