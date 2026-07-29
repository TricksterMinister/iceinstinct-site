import { SiteFooter } from '../sections/SiteFooter';
import markUrl from '../assets/ii-mark.png';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { Faq } from '../sections/Faq';
import { Tiers } from '../sections/Tiers';
import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useMyStory } from '../app/useMyStory';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { Closing } from '../sections/Closing';

export function Offerings() {
  // Live deep page sets <body class="cinema-chrome vp-split closer">. React mounts
  // into #root, so apply the body classes here (and clean them up) to match the
  // original DOM.
  useEffect(() => {
    const classes = ['cinema-chrome', 'vp-split', 'closer'];
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useMyStory();
  useSegmentSnap(['.story-cover', '#tiers', '.faq', '.closing-segment']);

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
                <b>Master Atelier</b>
                <em>Four levels, one standard</em>
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

        {/* ================ SECTION 3: FAQ ================ */}
        <Faq />
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
