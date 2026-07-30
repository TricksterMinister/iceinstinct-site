import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { Closing } from '../sections/Closing';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { track } from '../lib/track';

/* The ICE floor storefront: vetted event bartenders dispatched by the studio.
 * Flat packages, no hourly meters. Host provides alcohol & ice. */
const PACKAGES = [
  { label: '01', name: 'The Single', meta: '1 pro bartender with tool roll · up to 4h · up to ~50 guests · host provides alcohol & ice', price: '$450 flat', serviceId: 'jsid13514' },
  { label: '02', name: 'The Single+', meta: '1 pro bartender + barback with tool rolls · up to 4 hours', price: '$650 flat', serviceId: 'jsid6618667' },
  { label: '03', name: 'The Pair', meta: '2 pro bartenders with tool rolls · up to 4h · 50-100 guests', price: '$850 flat', serviceId: 'jsid8035136' },
  { label: '04', name: 'The Wedding', meta: 'A full team scaled to your guest count', price: 'From $1,200', serviceId: 'jsid2605085' },
];

const STEPS = [
  { title: 'The date', body: 'Select your date on YouCanBook.me and tell us your event details.' },
  { title: 'The quote', body: 'A flat package quote - no hourly meters or surprise fees.' },
  { title: 'The deposit', body: 'A 50% deposit locks your date in our calendar.' },
  { title: 'The arrival', body: 'A vetted bartender from our bench arrives 45 minutes early with personal tool roll.' },
];

const TRUST = [
  {
    n: '01',
    title: 'Hand-picked & vetted',
    body: 'No temp staff or agency rosters. Every bartender on our bench is personally interviewed, technique-vetted, and trained in hospitality etiquette by founder Teimuraz Benidze.',
  },
  {
    n: '02',
    title: 'Punctual & insured',
    body: 'Arrives 45 minutes early in crisp studio attire under full commercial liability coverage. Fluent in classic mixology, effortless in pacing, and meticulous at the bar station.',
  },
  {
    n: '03',
    title: 'Fully equipped',
    body: 'Every bartender arrives with their personal professional tool roll - weighted shakers, strainers, Japanese jiggers, and bar spoons. Host provides bottles, ice, glassware, and counter.',
  },
];

/* Events FAQ. Mirrored 1:1 by the FAQPage JSON-LD in /events/index.html. */
const FAQS = [
  {
    q: 'How much does an event bartender cost?',
    a: 'Flat packages: one bartender for up to four hours is $450, a pair is $850, full wedding teams from $1,200. Every extra hour is $75 per bartender. Host provides alcohol & ice. No hourly meters, no surprises.',
  },
  {
    q: 'Who provides the alcohol and ice?',
    a: 'The host provides the bottles, ice, and glassware - or we purchase alcohol on your behalf at supplier cost with full receipts. We bring the professional bartender and personal tool roll; we never mark up bottles or provide bar structure rentals at the $450 tier.',
  },
  {
    q: 'Are the bartenders insured and vetted?',
    a: 'Every bartender on our bench passes a trial shift with the founder and works under liability coverage. We serve guests 21 and over and never pour for a visibly intoxicated guest.',
  },
];

export function Events() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up), same as the tier pages.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.concierge', '#packages', '#how-it-works', '#standard', '#instinct', '#faq', '.closing-segment']);

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Event Bartenders</p>
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
            <a href="/weddings/" data-cursor="link">Weddings</a>
            <a href="/corporate/" data-cursor="link">Corporate</a>
            <a href="/gift/" data-cursor="link">Gift an Evening</a>
            <a href="/journal/" data-cursor="link">Journal</a>
            <a href="/press/" data-cursor="link">Press</a>
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
        {/* HERO - Concierge 50/50 technique, static photo (monochrome at rest) */}
        <section className="concierge std-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">ON CALL</span>
            <span className="hg-glow">ON CALL</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Event bartenders,<br /><span className="it" style={{ whiteSpace: 'nowrap' }}>on call</span> - NYC &amp; New Jersey
              </h1>
              <p className="concierge-lead">
                The same studio behind our private mixology evenings keeps a vetted bench of event bartenders. One
                call books a professional for your birthday, house party, wedding or corporate night - insured,
                punctual, fluent in the classics.
              </p>
              <span className="price">
                From $450 flat
                <small>Four packages · One call · NYC Metro &amp; New Jersey</small>
              </span>
              <a href="#packages" className="concierge-link">
                See the packages <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/events-bench.jpg"
                alt="A bartender station set for an event: shakers, jigger, coupe glasses and clear ice in champagne light"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. PACKAGES - light ledger, four flat numbers */}
        <section className="oma-ledger" id="packages">
          <div className="oma-ledger-wrap">
            <div className="oma-ledger-left reveal">
              <span className="oma-ledger-eye">I &middot; The Packages</span>
              <h2>
                Flat packages. <span className="it">No meters.</span>
              </h2>
              <p className="oma-ledger-desc">
                Every package is one flat number, agreed before the date. The bartender, the tools and the bar are
                included; the alcohol is yours, or purchased on your behalf at cost.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              {PACKAGES.map((p) => (
                <a
                  key={p.label}
                  href={`https://enter-ritual.youcanbook.me/?service=${p.serviceId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oma-ledger-row"
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                  data-cursor="link"
                  onClick={() => track('booking_click', { package: p.name, serviceId: p.serviceId })}
                >
                  <span className="lbl">{p.label}</span>
                  <span className="info">
                    <span className="nm">{p.name}</span>
                    <span className="cap">{p.meta}</span>
                  </span>
                  <span className="pr">{p.price} <span className="btn-arr" aria-hidden="true" style={{ fontSize: '0.85em', marginLeft: '0.4em' }}>→</span></span>
                </a>
              ))}
              <p className="ev-note">Extra hour +$75 per bartender. Clear-ice upgrade +$120.</p>
              <p className="ev-note">A 50% deposit holds your date; the balance is due on the day.</p>
            </div>
          </div>
        </section>

        {/* II. HOW IT WORKS - dark panel */}
        <section className="oma-panel dark" id="how-it-works">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; The Sequence</span>
              <h2 className="oma-panel-h">
                How it <span className="it">works.</span>
              </h2>
              <p className="oma-panel-intro">Four steps between your message and the first pour.</p>
            </header>
            <ol className="oma-steps">
              {STEPS.map((s, i) => (
                <li className="oma-step" key={s.title}>
                  <span className="oma-step-n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="oma-step-body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* III. THE STANDARD - light panel */}
        <section className="oma-panel light" id="standard">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">III &middot; The Standard</span>
              <h2 className="oma-panel-h">
                Who shows <span className="it">up.</span>
              </h2>
              <p className="oma-panel-intro">
                The bench belongs to a private mixology studio. Every bartender is held to our standards of craft,
                discretion, and hospitality - not a staffing agency&apos;s roster.
              </p>
            </header>
            <div className="oma-grid">
              {TRUST.map((t) => (
                <div className="cell" key={t.n}>
                  <span className="n">{t.n}</span>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IV. FAQ - mirrored by FAQPage JSON-LD in the stub head */}
        <section className="faq" id="faq">
          <div className="section-bg-word right" aria-hidden="true">ON CALL</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Before</span>
                <span className="it">you book.</span>
              </h2>
              <p className="faq-lead">The flat answers, plainly given.</p>
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

      {/* CLOSING - single primary CTA to YouCanBook.me + secondary to Contact page */}
      <div className="closing-segment oma-close" id="final-cta">
        <Closing
          ghost="ON CALL"
          title="Reserve your date"
          titleEm="on YouCanBook.me."
          lead="Select your date, tell us your event details, and lock your date with a 50% deposit."
          primaryLabel="Book via YouCanBook.me"
          primaryHref="https://enter-ritual.youcanbook.me/"
          secondaryLabel="Have a custom request? Inquire"
          secondaryHref="/contact/"
          deposit="50% deposit holds your date · $450 flat package · host provides alcohol & ice"
        />

        <SiteFooter embedded />
      </div>
    </>
  );
}
