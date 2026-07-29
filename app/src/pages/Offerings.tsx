import { SiteFooter } from '../sections/SiteFooter';
import markUrl from '../assets/ii-mark.png';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { Faq } from '../sections/Faq';
import { Founder } from '../sections/Founder';
import { Tiers } from '../sections/Tiers';
import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { Closing } from '../sections/Closing';

export function Offerings() {
  useEffect(() => {
    const classes = ['cinema-chrome', 'vp-split', 'closer'];
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['#founder', '#tiers', '.faq', '.closing-segment']);

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Offerings</p>
          <ul className="va-list">
            <li>
              <a href="/">
                <i>01</i>
                <b>Home</b>
                <em>The opening view</em>
              </a>
            </li>
            <li>
              <a href="/offerings/">
                <i>02</i>
                <b>Offerings</b>
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
              <a href="/offerings/" className="is-active">
                Offerings
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
        {/* I. THE ALCHEMIST / FOUNDER HERO */}
        <Founder />

        {/* II. 4 TIERS HORIZONTAL SCROLL */}
        <Tiers />

        {/* III. FREQUENTLY ASKED QUESTIONS */}
        <Faq />
      </main>

      {/* IV. CLOSING CTA & FOOTER */}
      <div className="closing-segment oma-close" id="final-cta">
        <Closing
          ghost="INSTINCT"
          title="Have a question before booking?"
          titleEm="Speak with us."
          lead="Each of our four tiers is a complete evening. Tell us about your event and we will guide you to the perfect rhythm."
          primaryLabel="Inquire via Contact"
          primaryHref="/contact/"
          secondaryLabel="Explore Concierge"
          secondaryHref="/concierge/"
        />
        <SiteFooter embedded />
      </div>
    </>
  );
}
