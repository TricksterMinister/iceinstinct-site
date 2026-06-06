import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

gsap.registerPlugin(ScrollTrigger);

export function Omakase() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();

  /* HELD STAGE - pin the photo bridge and scrub The Selection -> The Focus. */
  const holdRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = holdRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.classList.add('is-static');
      return;
    }
    const ctx = gsap.context(() => {
      const stage = el.querySelector('.oma-hold-stage');
      gsap.set('.oma-hold-text.is-a', { autoAlpha: 1, yPercent: 0 });
      gsap.set('.oma-hold-text.is-b', { autoAlpha: 0, yPercent: 6 });
      // Timeline laid out on a 0..1 progress with generous DWELL on each text so
      // it can be read before it leaves. scrub:1.4 adds buttery inertia (lags
      // slightly behind the scroll) for a smooth, luxurious feel.
      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
          pin: stage,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      // photo: slow continuous push the whole way
      tl.fromTo('.oma-hold-photo img', { scale: 1.0 }, { scale: 1.08, ease: 'none', duration: 1 }, 0);
      // scan line travels the whole way
      tl.fromTo('.oma-hold-scan', { top: '0%' }, { top: '100%', ease: 'none', duration: 1 }, 0);
      // A: hold (read) ~0..0.34, then ease out 0.34..0.5
      tl.to('.oma-hold-text.is-a', { autoAlpha: 0, yPercent: -6, duration: 0.16 }, 0.34);
      // B: ease in 0.54..0.7, then hold (read) to the end
      tl.fromTo(
        '.oma-hold-text.is-b',
        { autoAlpha: 0, yPercent: 6 },
        { autoAlpha: 1, yPercent: 0, duration: 0.16 },
        0.54
      );
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="cursor" aria-hidden="true">
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
      </div>

      <button className="va-trigger" aria-label="Open menu">
        <span className="va-trigger-ring"></span>
        <span className="va-trigger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className="va-overlay" aria-hidden="true">
        <button className="va-close" aria-label="Close menu">
          <span></span>
          <span></span>
        </button>
        <div className="va-stage">
          <p className="va-eyebrow">Ice &amp; Instinct / Omakase</p>
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
                <em>Twelve compositions</em>
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
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 4 L23 11 L17 18 L11 11 Z" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path
                    d="M9 14 L17 23 L25 14"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="17" y1="23" x2="17" y2="29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <line x1="13" y1="29" x2="21" y2="29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
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
            <a href="/contact/?package=omakase" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Sticky I-VII navigator (desktop) */}
        <nav className="tier-nav" aria-label="Sections of this tier">
          <a href="#overview" data-section="overview">
            <span>I</span>
            <span className="tier-nav-label">Overview</span>
          </a>
          <a href="#menu-protocol" data-section="menu-protocol">
            <span>II</span>
            <span className="tier-nav-label">Menu Protocol</span>
          </a>
          <a href="#scaling" data-section="scaling">
            <span>III</span>
            <span className="tier-nav-label">Scalability</span>
          </a>
          <a href="#included" data-section="included">
            <span>IV</span>
            <span className="tier-nav-label">What's Included</span>
          </a>
          <a href="#standard-inclusions" data-section="standard-inclusions">
            <span>V</span>
            <span className="tier-nav-label">Standard Inclusions</span>
          </a>
          <a href="#host-provides" data-section="host-provides">
            <span>VI</span>
            <span className="tier-nav-label">Host Provides</span>
          </a>
          <a href="#notes" data-section="notes">
            <span>VII</span>
            <span className="tier-nav-label">Notes</span>
          </a>
        </nav>

        {/* HERO */}
        {/* HERO - copied 1:1 from the Concierge 50/50 technique (text left, video
            fills the right half full height). Only the copy + scale differ. */}
        <section className="concierge" style={{ viewTransitionName: 'tier-hero-omakase' }}>
          <div className="section-bg-word" aria-hidden="true">OMAKASE</div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <a href="/offerings/" className="concierge-back">
                &larr; Offerings
              </a>
              <h1 className="concierge-headline">
                Omakase <span className="it">Improvisation.</span>
              </h1>
              <p className="concierge-lead">
                Pure creation. No menu. Unrepeatable moments. Complete trust. Cocktails created spontaneously, in real
                time, for each guest.
              </p>
              <span className="price">
                From $3,000 USD<small>Up to 25 guests &middot; 4-6 hours &middot; New York Metropolitan Area</small>
              </span>
              <a href="/contact/?package=omakase" className="concierge-link">
                Inquire <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/photos/generated-image-december-02-2025---7_35pm-m2uzeLtAYCNCf3tZ.jpeg"
                aria-label="Cocktail being poured, slow motion"
              >
                <source
                  src="https://videos.pexels.com/video-files/4765778/4765778-hd_1920_1080_25fps.mp4"
                  type="video/mp4"
                />
                <img
                  src="/assets/photos/generated-image-december-02-2025---7_35pm-m2uzeLtAYCNCf3tZ.jpeg"
                  alt="Omakase tier mood"
                />
              </video>
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. OVERVIEW */}
        <section className="tier-section oma-fmt3" id="overview">
          <div className="oma-fmt3-ghost" aria-hidden="true">Overview</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; Overview</span>
              <h2 className="oma-fmt3-title">
                Performance <span className="it">art.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                For the true connoisseur who understands that the highest form of craft is improvisation. This is omakase
                for cocktails - a ritual reserved for those who collect spirits, cultivate home bars, and seek
                experiences that cannot be replicated.
              </p>
              <p>
                There is no menu. No predetermined recipes. Only mastery, intuition, and the alchemy that happens when
                experience meets the unexpected.
              </p>
              <p>
                Your private mixologist arrives with a quarter-century of global hospitality expertise. Each cocktail is
                created spontaneously, in real time, tailored to individual guests' moods, energy, and palates. You
                witness cocktails being born - techniques you've never seen, flavor structures that challenge
                assumptions.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              This is not bartending. <span className="it">This is performance art.</span>
            </p>
            <p className="oma-fmt3-foot">Guests do not observe - they participate in the creation itself.</p>
          </div>
        </section>

        {/* II. THE MENU PROTOCOL - "HELD STAGE" pinned photo bridge (the one photo).
            The photo pins full-screen while The Selection crosses out and The Focus
            crosses in over it. GSAP scrub in this component; static fallback for RM. */}
        <section className="oma-hold" id="menu-protocol" ref={holdRef}>
          <div className="oma-hold-stage">
            <figure className="oma-hold-photo">
              <img src="/assets/photos/white-lotus-pour.png" alt="A cocktail composed in real time" loading="lazy" />
            </figure>
            <span className="oma-hold-scan" aria-hidden="true"></span>
            <div className="oma-hold-text is-a">
              <span className="oma-seg-eye">II &middot; The Menu Protocol</span>
              <h2 className="oma-seg-h">
                The <span className="it">Selection.</span>
              </h2>
              <p className="oma-seg-lead">
                No menu. No recipe cards, no pre-event design. Cocktails are created spontaneously for each guest, based on
                real-time dialogue, intuition, and the resources in your bar.
              </p>
            </div>
            <div className="oma-hold-text is-b" id="menu-focus">
              <span className="oma-seg-eye">II &middot; The Focus</span>
              <h2 className="oma-seg-h">
                Advanced <span className="it">technique.</span>
              </h2>
              <p className="oma-seg-lead">
                Smoke infusion, fat washing, rapid infusion, temperature layering, molecular garnish - methods reserved for
                world-class bars, executed intimately in your home.
              </p>
            </div>
          </div>
        </section>

        {/* III. SCALABILITY & INVESTMENT - LIGHT Ledger Split (light breath 1) */}
        <section className="oma-ledger" id="scaling">
          <div className="oma-ledger-wrap">
            <div className="oma-ledger-left reveal">
              <span className="oma-ledger-eye">III &middot; Scalability</span>
              <h2>
                Scalability &amp; <span className="it">Investment.</span>
              </h2>
              <p className="oma-ledger-desc">
                Intentionally limited to preserve the focus that spontaneous, omakase-style creation demands. The Master
                Mixologist is the sole creative force.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              <div className="oma-ledger-row">
                <span className="lbl">A</span>
                <span className="info">
                  <span className="nm">The Soloist</span>
                  <span className="cap">Up to 15 guests &middot; Master + assistant</span>
                </span>
                <span className="pr">From $3,000</span>
              </div>
              <div className="oma-ledger-row">
                <span className="lbl">B</span>
                <span className="info">
                  <span className="nm">The Ensemble</span>
                  <span className="cap">16-25 guests &middot; hard limit</span>
                </span>
                <span className="pr">From $3,500</span>
              </div>
              <div className="oma-ledger-row is-muted">
                <span className="lbl">C</span>
                <span className="info">
                  <span className="nm">Beyond Limits</span>
                  <span className="cap">Over 25 guests &middot; compromises the ritual</span>
                </span>
                <span className="pr">Upon request</span>
              </div>
            </div>
          </div>
        </section>

        {/* IV. WHAT'S INCLUDED - DARK viewport panel, numbered grid */}
        <section className="oma-panel dark" id="included">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">IV &middot; The Experience</span>
              <h2 className="oma-panel-h">
                What&apos;s <span className="it">Included.</span>
              </h2>
              <p className="oma-panel-intro">The specific milestones of your evening, from first consultation to final pour.</p>
            </header>
            <div className="oma-grid">
              <div className="cell">
                <span className="n">01</span>
                <h3>Pre-Event Discovery</h3>
                <p>A comprehensive consultation and home bar assessment, two to three weeks prior.</p>
              </div>
              <div className="cell">
                <span className="n">02</span>
                <h3>The Alchemist&apos;s Kit</h3>
                <p>Specialty equipment, rare ingredients, proprietary tinctures, unique garnishes.</p>
              </div>
              <div className="cell">
                <span className="n">03</span>
                <h3>The Ice Ritual</h3>
                <p>Professionally sourced, quality-controlled ice. Non-negotiable, never substituted.</p>
              </div>
              <div className="cell">
                <span className="n">04</span>
                <h3>4-6 Hours of Service</h3>
                <p>Flexible duration, guided by the rhythm of the evening. Every cocktail a singular event.</p>
              </div>
              <div className="cell">
                <span className="n">05</span>
                <h3>Station Restoration</h3>
                <p>Upon conclusion, your space is returned to order.</p>
              </div>
            </div>
          </div>
        </section>

        {/* V. STANDARD INCLUSIONS - DARK viewport panel, numbered grid */}
        <section className="oma-panel dark" id="standard-inclusions">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">V &middot; The Foundation</span>
              <h2 className="oma-panel-h">
                Standard <span className="it">Inclusions.</span>
              </h2>
              <p className="oma-panel-intro">Every Ice &amp; Instinct experience, regardless of tier, includes the foundation of our craft.</p>
            </header>
            <div className="oma-grid">
              <div className="cell">
                <span className="n">01</span>
                <h3>Private Master Mixologist</h3>
                <p>A dedicated professional with a quarter-century of global hospitality expertise.</p>
              </div>
              <div className="cell">
                <span className="n">02</span>
                <h3>Educational Engagement</h3>
                <p>Terroir, fermentation, technique, history. Your gathering becomes a living masterclass.</p>
              </div>
              <div className="cell">
                <span className="n">03</span>
                <h3>Professional Tooling</h3>
                <p>A compact case of gold-standard mixology tools, plus advanced technique equipment.</p>
              </div>
              <div className="cell">
                <span className="n">04</span>
                <h3>Setup &amp; Breakdown</h3>
                <p>Complete organization of the immediate working area.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VI. WHAT THE HOST PROVIDES - LIGHT viewport panel (light breath 2) */}
        <section className="oma-panel light" id="host-provides">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">VI &middot; The Canvas</span>
              <h2 className="oma-panel-h">
                What the Host <span className="it">Provides.</span>
              </h2>
              <p className="oma-panel-intro">To enable pure improvisation, the host provides the canvas.</p>
            </header>
            <div className="oma-grid">
              <div className="cell">
                <span className="n">01</span>
                <h3>Existing Spirits &amp; Inventory</h3>
                <p>The host's spirit collection and home bar form the primary palette for the evening.</p>
              </div>
              <div className="cell">
                <span className="n">02</span>
                <h3>Curated Glassware</h3>
                <p>Large-format stemware, sculptural coupes, elegant rocks glasses. The vessel is part of the performance.</p>
              </div>
              <div className="cell">
                <span className="n">03</span>
                <h3>Infrastructure</h3>
                <p>A suitable work surface, access to running water, and electricity.</p>
              </div>
              <div className="cell">
                <span className="n">04</span>
                <h3>Openness to the Unexpected</h3>
                <p>Complete trust in the Master Mixologist's spontaneous creative vision.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VII. EXPERIENCE NOTES - DARK Manifesto viewport panel */}
        <section className="oma-panel dark" id="notes">
          <div className="oma-mani reveal">
            <span className="oma-mani-eye">VII &middot; The Fine Print</span>
            <h2 className="oma-mani-h">
              Experience <span className="it">notes.</span>
            </h2>
            <div className="oma-mani-grid">
              <p>
                The Alchemist is a focused, solo improvisational performance. The Master Mixologist remains the sole
                creative force throughout the evening; operational support is scaled internally to preserve flow and
                uninterrupted focus.
              </p>
              <p>
                Certain elements required at the highest level - professional ice formats, specialty glassware, select
                atmospheric components - may be arranged through the <a href="/concierge/">Concierge</a>. When the room
                calls for it, the evening may continue beyond its frame as a natural continuation of the ritual.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* FINAL CTA - СВЕТ-1 "Framed CTA / Begin" + dark footer = ONE full-viewport unit (canon Свет-1) */}
      <div className="closing-segment">
        <section className="closing" id="final-cta">
            <div className="section-bg-word top right" aria-hidden="true">
              OMAKASE
            </div>
            <div className="closing-stage">
              <div className="closing-frame">
                <span className="closing-corner tl" aria-hidden="true"></span>
                <span className="closing-corner tr" aria-hidden="true"></span>
                <span className="closing-corner bl" aria-hidden="true"></span>
                <span className="closing-corner br" aria-hidden="true"></span>
                <span className="closing-eyebrow">Ice &amp; Instinct / By appointment</span>
                <h2 className="closing-title">
                  Surrender to <span className="it">improvisation.</span>
                </h2>
                <p className="closing-lead">
                  Tell us the date, the room, and your spirits collection. We return with a tailored consultation
                  framework within one business day.
                </p>
                <div className="closing-cta">
                  <a className="btn-primary" href="/contact/?package=omakase" data-cursor="link">
                    <span className="btn-label">Inquire</span>
                    <span className="btn-arr" aria-hidden="true">&rarr;</span>
                  </a>
                  <a className="btn-ghost" href="/offerings/" data-cursor="link">
                    Explore the offerings
                  </a>
                </div>
              </div>
              <p className="closing-meta">
                <span>By appointment only</span>
                <span>New York Metropolitan Area</span>
                <span>Est. 2024</span>
              </p>
            </div>
        </section>

        <footer className="footer" role="contentinfo">
        <div className="footer-glow" aria-hidden="true">
          Ice &amp; Instinct
        </div>
        <div className="footer-inner">
          <div className="footer-sign">
            <a href="/" className="footer-mark" data-logo-slot aria-label="Ice & Instinct - home">
              <svg width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 4 L23 11 L17 18 L11 11 Z" stroke="currentColor" strokeWidth="1" fill="none" />
                <path
                  d="M9 14 L17 23 L25 14"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="17" y1="23" x2="17" y2="29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <line x1="13" y1="29" x2="21" y2="29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </a>
            <div className="footer-sign-text">
              <p className="footer-name">Ice &amp; Instinct</p>
              <p className="footer-tag">
                Where ritual meets <em>instinct.</em>
              </p>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <div className="footer-col">
              <span className="footer-key">Explore</span>
              <a href="/offerings/">Offerings</a>
              <a href="/concierge/">Concierge</a>
              <a href="/gallery/">The Collection</a>
              <a href="/my-story/">My Story</a>
            </div>
            <div className="footer-col">
              <span className="footer-key">Begin</span>
              <a href="/contact/">Inquire</a>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
              <span className="footer-static">By appointment</span>
            </div>
            <div className="footer-col">
              <span className="footer-key">Index</span>
              <a href="/privacy/">Privacy</a>
              <a href="/terms/">Terms</a>
            </div>
          </nav>

          <div className="footer-socials" aria-label="Social profiles">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 10-11.6 9.9V14.9H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.8h2.6l-.4 2.9h-2.2v6.9A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-base">
          <span className="footer-meta">New York Metropolitan Area &middot; Est. 2024 &middot; © 2026 Ice &amp; Instinct</span>
        </div>
        </footer>
      </div>
    </>
  );
}
