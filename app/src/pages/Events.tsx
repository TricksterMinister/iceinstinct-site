import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { track } from '../lib/track';

/* The ICE floor storefront: vetted event bartenders dispatched by the studio.
 * Flat packages, no hourly meters. The CTA prefills the Contact occasion
 * select via /contact/?occasion=event+staffing (URLSearchParams decodes the
 * plus sign to a space, matching the "event staffing" option exactly). */
const QUOTE_HREF = '/contact/?occasion=event+staffing';

const PACKAGES = [
  { label: '01', name: 'The Single', meta: '1 bartender · up to 4 hours · up to ~50 guests', price: '$450 flat' },
  { label: '02', name: 'The Single+', meta: '1 bartender + barback · up to 4 hours', price: '$650 flat' },
  { label: '03', name: 'The Pair', meta: '2 bartenders · up to 4 hours · 50-100 guests', price: '$850 flat' },
  { label: '04', name: 'The Wedding', meta: 'A full team scaled to your guest count', price: 'From $1,200' },
];

const STEPS = [
  { title: 'The date', body: 'Tell us the date, guest count and hours.' },
  { title: 'The quote', body: 'A flat quote in one message - no hourly surprises.' },
  { title: 'The deposit', body: 'A 50% deposit books the date.' },
  { title: 'The arrival', body: 'A vetted bartender from our bench arrives 45 minutes early.' },
];

const TRUST = [
  {
    n: '01',
    title: 'A vetted bench',
    body: 'Every bartender on the bench passes a trial shift with the founder before they ever pour for a guest. The standard is set in person, not on paper.',
  },
  {
    n: '02',
    title: 'Responsible service',
    body: 'We serve guests 21 and over, and we never serve a visibly intoxicated guest. A good evening ends well because the bar keeps it that way.',
  },
  {
    n: '03',
    title: 'Your alcohol, our bar',
    body: 'The host provides the bottles, or we purchase at cost - we run everything else: the tools, the ice, the bar itself, setup to breakdown.',
  },
];

/* Events FAQ. Mirrored 1:1 by the FAQPage JSON-LD in /events/index.html. */
const FAQS = [
  {
    q: 'How much does an event bartender cost?',
    a: 'Flat packages: one bartender for up to four hours is $450, a pair is $850, full wedding teams from $1,200. Every extra hour is $75 per bartender. No hourly meters, no surprises.',
  },
  {
    q: 'Who provides the alcohol?',
    a: 'The host does - or we purchase on your behalf at supplier cost with full receipts. We bring the craft, the tools and the bar itself; we never mark up bottles.',
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
        <section className="concierge events-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">ON CALL</span>
            <span className="hg-glow">ON CALL</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Event bartenders, <span className="it">on call</span> - NYC &amp; New Jersey
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
                src="/assets/photos/hero-cocktails.png"
                alt="A row of cocktails on a dark bar, lit from above"
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
                <div className="oma-ledger-row" key={p.label}>
                  <span className="lbl">{p.label}</span>
                  <span className="info">
                    <span className="nm">{p.name}</span>
                    <span className="cap">{p.meta}</span>
                  </span>
                  <span className="pr">{p.price}</span>
                </div>
              ))}
              <p className="ev-note">Extra hour +$75 per bartender. Clear-ice upgrade +$120.</p>
              <p className="ev-note">A 50% deposit holds your date; the balance is due on the day.</p>
            </div>
          </div>
        </section>

        {/* II. HOW IT WORKS - light panel, plain 4-step ledger */}
        <section className="oma-panel light" id="how-it-works">
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

        {/* III. THE STANDARD - dark panel, three trust cells */}
        <section className="oma-panel dark" id="standard">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">III &middot; The Standard</span>
              <h2 className="oma-panel-h">
                Who shows <span className="it">up.</span>
              </h2>
              <p className="oma-panel-intro">
                The bench belongs to a private mixology studio, and it is held to the studio&apos;s standard - not a
                staffing agency&apos;s roster.
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

        {/* IV. THE OTHER FLOOR - bridge up to INSTINCT */}
        <section className="tier-section oma-fmt3" id="instinct">
          <div className="oma-fmt3-ghost" aria-hidden="true">Instinct</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">IV &middot; The Other Floor</span>
              <h2 className="oma-fmt3-title">
                The founder <span className="it">himself.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                Want the founder himself behind the bar - a custom menu, the omakase dialogue? That is our INSTINCT
                floor.
              </p>
              <p>
                Private mixology evenings designed and led by Teimuraz Benidze, certified sommelier - four tiers,
                from $650 to $3,000+, by appointment.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              ICE staffs the date. <span className="it">INSTINCT composes the evening.</span>
            </p>
            <div className="ev-bridge-cta">
              <a className="btn-ghost" href="/offerings/" data-cursor="link" onClick={() => track('instinct_bridge_click', { source: 'events' })}>
                Explore the INSTINCT floor
              </a>
            </div>
          </div>
        </section>

        {/* V. FAQ - mirrored by FAQPage JSON-LD in the stub head */}
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

      {/* CLOSING - framed CTA + footer, the offering closing pattern */}
      <div className="closing-segment oma-close" id="final-cta">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">ON CALL</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / Event Bartenders</span>
              <h2 className="closing-title">
                Book the <span className="it">date.</span>
              </h2>
              <p className="closing-lead">
                Tell us the date, the guest count and the hours.
                <br />
                A flat quote comes back in one message.
              </p>
              <p className="closing-included">
                Every package includes the bartender, the tools and the bar itself - setup to breakdown, handled end
                to end.
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href={QUOTE_HREF} data-cursor="link" onClick={() => track('quote_click', { source: 'events_closing' })}>
                  <span className="btn-label">Get a flat quote</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </a>
                <a className="btn-ghost" href="tel:+19172927859" data-cursor="link">
                  Call +1 (917) 292-7859
                </a>
              </div>
              <p className="closing-deposit">
                A 50% deposit reserves your date - the balance is due on the day of the event.
              </p>
            </div>
            <p className="closing-meta">
              <span>On call</span>
              <span>NYC Metro &amp; New Jersey</span>
              <span>Est. 2024</span>
            </p>
          </div>
        </section>

        <SiteFooter embedded />
      </div>
    </>
  );
}
