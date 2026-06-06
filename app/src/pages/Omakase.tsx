import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useOmakaseSnap } from '../app/useOmakaseSnap';
import { EtherealShadow } from '../components/EtherealShadow';

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
  useOmakaseSnap();

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

  /* Section rail polish: hide the I-VII rail on the hero and the closing (it is
     only useful between them); darken its champagne numerals over light panels
     so they stay legible. */
  useEffect(() => {
    const hideEls = document.querySelectorAll('.concierge, .oma-close');
    const lightEls = document.querySelectorAll('.oma-panel.light, .oma-ledger');
    if (!hideEls.length && !lightEls.length) return;
    const visHide = new Set<Element>();
    const visLight = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const isLight = e.target.classList.contains('oma-ledger') || e.target.classList.contains('light');
          const set = isLight ? visLight : visHide;
          if (e.intersectionRatio > 0.5) set.add(e.target);
          else set.delete(e.target);
        });
        document.body.classList.toggle('rail-hide', visHide.size > 0);
        document.body.classList.toggle('rail-onlight', visLight.size > 0 && visHide.size === 0);
      },
      { threshold: [0, 0.5, 1] }
    );
    hideEls.forEach((el) => io.observe(el));
    lightEls.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.body.classList.remove('rail-hide', 'rail-onlight');
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
          <a href="#overview" data-section="overview" aria-label="Overview"><span>I</span></a>
          <a href="#menu-protocol" data-section="menu-protocol" aria-label="Menu Protocol"><span>II</span></a>
          <a href="#scaling" data-section="scaling" aria-label="Scalability"><span>III</span></a>
          <a href="#included" data-section="included" aria-label="What's Included"><span>IV</span></a>
          <a href="#standard-inclusions" data-section="standard-inclusions" aria-label="Standard Inclusions"><span>V</span></a>
          <a href="#host-provides" data-section="host-provides" aria-label="Host Provides"><span>VI</span></a>
          <a href="#notes" data-section="notes" aria-label="Notes"><span>VII</span></a>
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
                We use your existing spirits, your collection, and the energy of the room as our canvas. No recipe cards,
                no pre-event design. Cocktails are created spontaneously for each guest, based on real-time dialogue,
                intuition, and the resources available in your bar.
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
                The Alchemist experience is intentionally limited to preserve the focus required for spontaneous,
                omakase-style creation. The Master Mixologist is the sole creative force. A dedicated logistical
                assistant is present to preserve focus, flow, and the integrity of the ritual - their role is strictly
                operational and never part of the creative act.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              <div className="oma-ledger-row">
                <span className="lbl">A</span>
                <span className="info">
                  <span className="nm">The Soloist</span>
                  <span className="cap">Up to 15 guests</span>
                  <span className="det"><b>Personnel</b> 1 Master Mixologist + 1 Logistical Assistant</span>
                  <span className="det"><b>Focus</b> Deep engagement and complex, individual creation</span>
                </span>
                <span className="pr">From $3,000</span>
              </div>
              <div className="oma-ledger-row">
                <span className="lbl">B</span>
                <span className="info">
                  <span className="nm">The Ensemble</span>
                  <span className="cap">16 to 25 guests &middot; hard limit</span>
                  <span className="det"><b>Personnel</b> 1 Master Mixologist + 1 Shadow (logistical)</span>
                  <span className="det"><b>Focus</b> Critical logistical support so the Master remains fully immersed in improvisation</span>
                </span>
                <span className="pr">From $3,500</span>
              </div>
              <div className="oma-ledger-row is-muted">
                <span className="lbl">C</span>
                <span className="info">
                  <span className="nm">Beyond Limits</span>
                  <span className="cap">Over 25 guests</span>
                  <span className="det"><b>Personnel</b> Custom inquiry only</span>
                  <span className="det"><b>Focus</b> This scale compromises the core omakase experience</span>
                </span>
                <span className="pr">Not recommended</span>
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
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>Pre-Event Discovery Session</h3>
                  <p>Two to three weeks prior, we conduct a comprehensive consultation and home bar assessment. This is not menu planning - it is understanding the canvas before the performance begins.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>The Alchemist&apos;s Kit</h3>
                  <p>I arrive with specialty technique equipment, rare ingredients, proprietary tinctures, and unique garnishes not available commercially.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>The Ice Ritual <span className="cell-tag">mandatory inclusion</span></h3>
                  <p>Ice selection is determined exclusively by the Master Mixologist. All ice used for this experience is professionally sourced, ordered, and quality-controlled by Ice &amp; Instinct. The host covers the cost of ice as a separate line item, finalized during the consultation. For optimal tempering and performance readiness, ice delivery is scheduled to arrive prior to the Master Mixologist&apos;s arrival. Ice quality is non-negotiable and cannot be substituted, supplied, or sourced by the host.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>4-6 Hours of Improvisational Service</h3>
                  <p>Flexible service duration, guided by the rhythm of the evening. Every cocktail is a singular event.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">05</span>
                <div className="oma-step-body">
                  <h3>Station Restoration</h3>
                  <p>Upon conclusion, your space is returned to order.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* V. STANDARD INCLUSIONS - DARK viewport panel, numbered grid */}
        <section className="oma-panel dark has-ether" id="standard-inclusions">
          <EtherealShadow
            className="oma-ether"
            sizing="fill"
            color="oklch(90% 0.10 84 / 0.40)"
            animation={{ scale: 68, speed: 92 }}
            noise={{ opacity: 0.12, scale: 1.1 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
          />
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
                <p>Conversations about terroir, fermentation, technique, and cocktail history emerge naturally. Your gathering becomes a living masterclass.</p>
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
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>Existing Spirits &amp; Inventory</h3>
                  <p>The host's spirit collection and home bar inventory form the primary palette for the evening.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>Curated Glassware Collection</h3>
                  <p>This experience assumes thoughtfully selected, high-quality glassware. Large-format stemware, sculptural coupes, elegant rocks glasses, and varied vessels allow each creation to fully express its character. The vessel is not an accessory - it is part of the performance.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>Infrastructure</h3>
                  <p>A suitable work surface with adequate space for technique work, access to running water, and electricity.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>Openness to the Unexpected</h3>
                  <p>Complete trust in the Master Mixologist's spontaneous creative vision.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* VII. EXPERIENCE NOTES - DARK Manifesto viewport panel */}
        <section className="oma-panel dark" id="notes">
          <div className="oma-mani reveal">
            <h2 className="oma-mani-h">
              Experience <span className="it">notes.</span>
            </h2>
            <ol className="oma-notes">
              <li className="oma-note">
                <span className="oma-note-i" aria-hidden="true">i</span>
                <p>
                  The Alchemist experience is intentionally designed as a focused, solo improvisational performance. The
                  Master Mixologist remains the sole creative force throughout the evening.
                </p>
              </li>
              <li className="oma-note">
                <span className="oma-note-i" aria-hidden="true">ii</span>
                <p>
                  Operational support is scaled internally based on the number of guests to preserve flow, cleanliness,
                  and uninterrupted creative focus. The size and structure of the supporting team are determined
                  exclusively by the mixologist and are included as part of the experience.
                </p>
              </li>
              <li className="oma-note">
                <span className="oma-note-i" aria-hidden="true">iii</span>
                <p>
                  Certain material elements required to execute the ritual at the highest level - such as professional
                  ice formats, specialty glassware, or select atmospheric components - may be arranged separately through
                  the <a href="/concierge/">Concierge</a>. These elements support the performance without altering its
                  nature.
                </p>
              </li>
              <li className="oma-note">
                <span className="oma-note-i" aria-hidden="true">iv</span>
                <p>
                  When the energy of the room calls for it, the experience may continue beyond its initial frame as a
                  natural continuation of the ritual itself.
                </p>
              </li>
            </ol>
          </div>
        </section>

      </main>

      {/* CLOSING - top 70% = original Свет-1 framed CTA (restored), bottom 30% =
          marquee 60% + footer links 40% */}
      <div className="closing-segment oma-close" id="final-cta">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">OMAKASE</div>
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

        <div className="oma-close-bottom">
          <div className="oma-close-marquee" aria-hidden="true">
            <div className="oma-close-track">
              <span>Ice &amp; <em>Instinct</em></span>
              <span>Ice &amp; <em>Instinct</em></span>
              <span>Ice &amp; <em>Instinct</em></span>
              <span>Ice &amp; <em>Instinct</em></span>
            </div>
          </div>

          <footer className="oma-close-foot" role="contentinfo">
            <nav className="oma-close-nav" aria-label="Footer">
              <a className="lnk" href="/offerings/">Offerings</a>
              <a className="lnk" href="/concierge/">Concierge</a>
              <a className="lnk" href="/gallery/">The Collection</a>
              <a className="lnk" href="/my-story/">My Story</a>
              <a className="lnk" href="/contact/">Inquire</a>
              <a className="lnk" href="#" aria-label="Instagram">Instagram</a>
              <a className="lnk" href="/privacy/">Privacy</a>
              <a className="lnk" href="/terms/">Terms</a>
            </nav>
            <div className="oma-close-base">
              <span>By appointment only &middot; New York Metropolitan Area</span>
              <a className="oma-close-sign" href="/" data-logo-slot aria-label="Ice & Instinct - home">
                Where ritual meets <em>instinct.</em>
              </a>
              <span>Est. 2024 &middot; © 2026 Ice &amp; Instinct</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
