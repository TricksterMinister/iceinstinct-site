import '../styles/cinema.css';
import { SiteFooter } from '../sections/SiteFooter';
import markUrl from '../assets/ii-mark.png';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { Tiers } from '../sections/Tiers';
import { ProcessSteps } from '../sections/ProcessSteps';
import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useMyStory } from '../app/useMyStory';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { Closing } from '../sections/Closing';

import { initTiersPin } from '../lib/gsapHome';

type QA = { q: string; a: string };
const INSTINCT_FAQS: QA[] = [
  {
    q: 'Which tier is right for my event?',
    a: 'It depends on the mood and the room. Seasonal is for intimate gatherings of up to 20 guests wanting impeccable classics. Signature is a curated solo performance with a set menu. Bespoke is built around your theme, palette, and guest profile. Omakase is a fully improvised no-menu experience — tell us the night and we design it live. Tell us the date and guest count and we will guide you.',
  },
  {
    q: 'Is alcohol included in the price?',
    a: 'No. The tier price covers craft, service, tools, and bar setup. You may provide spirits and wine yourself, or we purchase on your behalf at supplier cost with full receipts — no markup.',
  },
  {
    q: 'Who provides the ice, and why does it matter?',
    a: 'For every INSTINCT booking, specialty ice is sourced and delivered through us — Michelin-level suppliers, billed at cost. We cannot control quality or the integrity of the cocktail if the ice is not ours. This is coordinated through the Concierge and is not optional.',
  },
  {
    q: 'What does the Concierge coordinate?',
    a: 'Ice sourcing, curated glassware, bar rental placement, and the rhythm of the evening are all aligned in advance through the Concierge — billed at supplier cost. For Bespoke and Omakase, the Concierge also guides optional enhancements: signature crystal, tableside theatre, or specialty spirits.',
  },
  {
    q: 'Can the menu be customized, and do you offer non-alcoholic options?',
    a: 'Yes to both. Every tier menu is tailored to your taste, dietary needs, and occasion. A full zero-proof program is available so every guest is served with the same precision and care.',
  },
  {
    q: 'How far ahead should I book?',
    a: 'Two or more weeks is ideal. Shorter timelines are sometimes possible — ask, and we will tell you honestly what we can do.',
  },
  {
    q: 'How does the deposit and cancellation work?',
    a: 'A flat $500 deposit reserves your date; the balance is due before the event. Cancellations more than 14 days out receive a full deposit refund. Within 14 days, the deposit is non-refundable but transferable to a future date within 12 months. Within 48 hours of the event, the full booking value is due.',
  },
];

export function Offerings() {
  // Live deep page sets <body class="cinema-chrome vp-split closer">. React mounts
  // into #root, so apply the body classes here (and clean them up) to match the
  // original DOM.
  useEffect(() => {
    const classes = ['cinema-chrome', 'closer'];
    document.body.classList.add(...classes);
    const cleanupPin = initTiersPin();
    return () => {
      document.body.classList.remove(...classes);
      cleanupPin();
    };
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useMyStory();
  useSegmentSnap(['.story-cover', '#tiers', '#how-it-works', '#who-shows-up', '#instinct-faq', '.closing-segment']);

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Master Atelier</p>
          <ul className="va-list">
            <li>
              <a href="/">
                <i>01</i>
                <b>Home</b>
                <em>The opening view</em>
              </a>
            </li>
            <li>
              <a href="/instinct/">
                <i>02</i>
                <b>Instinct</b>
                <em>Private mixology, four tiers</em>
              </a>
            </li>
            <li>
              <a href="/concierge/">
                <i>03</i>
                <b>Concierge</b>
                <em>Five enhancements</em>
              </a>
            </li>
            <li>
              <a href="/my-story/">
                <i>04</i>
                <b>My Story</b>
                <em>Teimuraz Benidze</em>
              </a>
            </li>
            <li>
              <a href="/gallery/">
                <i>05</i>
                <b>The Collection</b>
                <em>Thirteen compositions</em>
              </a>
            </li>
            <li>
              <a href="/contact/">
                <i>06</i>
                <b>Inquire</b>
                <em>Begin the conversation</em>
              </a>
            </li>
          </ul>
          <footer className="va-foot">
            <span>New York Metropolitan Area</span>
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
              <a href="/instinct/" className="is-active">
                Master Atelier
              </a>
              <a href="/concierge/">Concierge</a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ================ HERO SECTION: FULL-BLEED ALCHEMIST PORTRAIT ================ */}
        <section className="story-cover" id="cover">
          <img
            className="story-cover-img"
            src="/assets/photos/founder-temo.jpg"
            alt="Teimuraz Benidze, Founder of Ice & Instinct"
            fetchPriority="high"
            width="1920"
            height="1071"
          />
          <div className="story-cover-scrim" aria-hidden="true"></div>
          <div className="story-cover-ghost" aria-hidden="true">
            <span className="hg-base">ALCHEMIST</span>
            <span className="hg-glow">ALCHEMIST</span>
          </div>
          <div className="story-cover-id">
            <h1 className="story-cover-name">
              Teimuraz <span className="it">Benidze.</span>
            </h1>
            <p className="story-cover-role">Founder &amp; Flavor Architect</p>
            <a
              href="/my-story/"
              className="btn-ghost"
              data-cursor="link"
              style={{ marginTop: '1.75rem', width: 'fit-content' }}
            >
              <span>Meet the Alchemist</span>
              <span className="btn-arr" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ================ SECTION 2: HORIZONTAL SCROLL TIERS RAIL ================ */}
        <Tiers />

        {/* ================ SECTION 3: HOW DOES IT WORK + WHO SHOWS UP ================ */}
        <ProcessSteps />

        {/* ================ SECTION 4: FAQ (INSTINCT-SPECIFIC) ================ */}
        <section className="faq" id="instinct-faq">
          <div className="section-bg-word right" aria-hidden="true">ANSWERS</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Before</span>
                <span className="it">you ask.</span>
              </h2>
              <p className="faq-lead">The honest answers, plainly given.</p>
            </header>
            <ul className="faq-list">
              {INSTINCT_FAQS.map((item, i) => (
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

      <div className="closing-segment oma-close" id="final-cta">
        <Closing
          ghost="CHOOSE"
          title="Find the tier"
          titleEm="that fits the night."
          lead="From an intimate table to a full celebration, each tier is a complete evening. Tell us which fits yours."
          secondaryLabel="Speak with the Concierge"
          secondaryHref="/concierge/"
        />
        <SiteFooter embedded />
      </div>
    </>
  );
}
