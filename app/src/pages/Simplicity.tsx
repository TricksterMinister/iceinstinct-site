import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

export function Simplicity() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();

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
          <p className="va-eyebrow">Ice &amp; Instinct / Simplicity</p>
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
            <span>Manhattan / By Appointment</span>
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
            <a href="/contact/?package=simplicity" className="nav-cta">
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
          <a href="#extensions" data-section="extensions">
            <span>VII</span>
            <span className="tier-nav-label">Extensions</span>
          </a>
        </nav>

        {/* HERO */}
        <section className="page-hero" style={{ viewTransitionName: 'tier-hero-simplicity' }}>
          <div className="section-bg-word" aria-hidden="true">
            SIMPLICITY
          </div>
          <div className="container">
            <span className="eyebrow">
              <a href="/offerings/" style={{ color: 'inherit' }}>
                &larr; Offerings
              </a>
            </span>
            <div className="tier-hero">
              <div className="tier-hero-text">
                <span className="eyebrow">ii. Simplicity &middot; The Executive Standard</span>
                <h1>
                  Perfection in <span className="it">Simplicity.</span>
                </h1>
                <p className="lead">
                  For the host who values heritage over hype. The world's most iconic cocktails executed with surgical
                  precision - by the Master Mixologist personally.
                </p>
                <div className="price">
                  From $750 USD<small>Up to 12 guests &middot; 4 hours &middot; Manhattan</small>
                </div>
                <div className="meta-row" style={{ marginTop: 'var(--s-sm)' }}>
                  <a href="/contact/?package=simplicity" className="btn btn-primary">
                    Inquire <span className="arrow">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="tier-mood">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/assets/photos/whisk_ca38bd2c287832cbee745ed21801054edr-0QqJuvDlIdp3koWB.jpeg"
                  aria-label="Cocktail being poured, slow motion"
                >
                  <source
                    src="https://videos.pexels.com/video-files/4765778/4765778-hd_1920_1080_25fps.mp4"
                    type="video/mp4"
                  />
                  <img
                    src="/assets/photos/whisk_ca38bd2c287832cbee745ed21801054edr-0QqJuvDlIdp3koWB.jpeg"
                    alt="Simplicity tier mood"
                  />
                </video>
                <span className="tier-mood-scrim" aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </section>

        {/* I. OVERVIEW */}
        <section className="tier-section" id="overview">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">I.</span>
              <h2>Overview</h2>
            </header>
            <div className="tier-prose reveal">
              <p>
                For the host who values heritage over hype. Your gathering deserves cocktails balanced to absolute
                perfection - no flourish, no theater, only pure mastery.
              </p>
              <p>
                This is the Executive Standard: a service designed for those who understand that true luxury whispers.
                Whether for an intimate board dinner, a family celebration, or a high-level reception, we deliver the
                world's most iconic cocktails with surgical precision. We do not invent here; we execute the legends.
              </p>
              <p>
                Your private mixologist arrives with a compact case of professional tools and a quarter-century of global
                hospitality experience distilled into seamless service. You enjoy the company of your guests; we ensure
                the glass in their hand is flawless.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="editorial-pause" aria-hidden="true">
          <p className="editorial-pause-text">
            Heritage over <em>hype.</em>
          </p>
          <span className="editorial-pause-mark">ii &middot; Simplicity</span>
        </section>

        {/* II. THE MENU PROTOCOL */}
        <section className="tier-section" id="menu-protocol">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">II.</span>
              <h2>The Menu Protocol</h2>
              <p className="tier-section-intro">Classics Only. Strictly defined. Flawlessly executed.</p>
            </header>
            <div className="tier-prose reveal">
              <p>
                This experience is dedicated to the traditional canon. We strip away the unnecessary to reveal the
                essential.
              </p>
              <div className="tier-subsection">
                <h3>The Selection</h3>
                <p>
                  Prior to the event, we curate a menu of 3-4 timeless classics (e.g., The Martini, The Old Fashioned,
                  The Negroni, The Daiquiri).
                </p>
              </div>
              <div className="tier-subsection">
                <h3>The Focus</h3>
                <p>
                  This package does not include signature cocktail design or experimental mixology. We agree on the
                  classics, and we perfect them using superior spirits, precise dilution, and temperature control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* III. SCALABILITY & INVESTMENT */}
        <section className="tier-section" id="scaling">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">III.</span>
              <h2>Scalability &amp; Investment</h2>
              <p className="tier-section-intro">
                Service capacity is strictly calibrated to ensure the Purist standard of execution is never compromised,
                regardless of guest count.
              </p>
            </header>

            <div className="tier-scale-grid reveal-stagger reveal">
              <article className="tier-scale-card">
                <span className="tier-scale-label">Tier A</span>
                <h3>The Intimate</h3>
                <p className="tier-scale-cap">Up to 12 guests</p>
                <ul className="tier-scale-meta">
                  <li>
                    <strong>Personnel</strong>1 Master Mixologist (solo performance)
                  </li>
                  <li>
                    <strong>Focus</strong>Quiet, attentive precision. Direct guest interaction.
                  </li>
                </ul>
                <p className="tier-scale-price">From $750</p>
              </article>

              <article className="tier-scale-card">
                <span className="tier-scale-label">Tier B</span>
                <h3>The Social</h3>
                <p className="tier-scale-cap">13 to 25 guests</p>
                <ul className="tier-scale-meta">
                  <li>
                    <strong>Personnel</strong>1 Master Mixologist + 1 Shadow (bar support)
                  </li>
                  <li>
                    <strong>Focus</strong>Seamless flow. The Shadow handles logistics so the Master never breaks rhythm.
                  </li>
                </ul>
                <p className="tier-scale-price">From $1,100</p>
              </article>

              <article className="tier-scale-card">
                <span className="tier-scale-label">Tier C</span>
                <h3>The Grand</h3>
                <p className="tier-scale-cap">26 to 40 guests</p>
                <ul className="tier-scale-meta">
                  <li>
                    <strong>Personnel</strong>1 Master Mixologist + 2 Shadows
                  </li>
                  <li>
                    <strong>Focus</strong>High-volume elegance. Zero wait time.
                  </li>
                </ul>
                <p className="tier-scale-price">From $1,450</p>
              </article>
            </div>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="editorial-pause" aria-hidden="true">
          <p className="editorial-pause-text">
            We do not invent.
            <br />
            We execute the <em>legends.</em>
          </p>
          <span className="editorial-pause-mark">ii &middot; Simplicity</span>
        </section>

        {/* IV. WHAT'S INCLUDED */}
        <section className="tier-section" id="included">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">IV.</span>
              <h2>What's Included</h2>
              <p className="tier-section-intro">The specific milestones of your experience.</p>
            </header>
            <div className="tier-prose tier-prose-grid reveal">
              <div className="tier-subsection">
                <h3>The Classics Consultation</h3>
                <p>One week prior, we finalize your selection of classics and set the tone for the evening.</p>
              </div>
              <div className="tier-subsection">
                <h3>The Procurement Specification</h3>
                <p>
                  You receive a precise, architectural list of spirits, botanicals, and ice formats tailored to your
                  menu. We provide the blueprint; you retain control of purchasing.
                </p>
              </div>
              <div className="tier-subsection">
                <h3>Four Hours of Execution</h3>
                <p>We arrive 30 minutes early for setup. Service is continuous, quiet, and unobtrusive.</p>
              </div>
              <div className="tier-subsection">
                <h3>Station Restoration</h3>
                <p>
                  Upon conclusion, the bar station is returned to its pristine condition. We manage all bar-specific
                  waste (citrus, herbs, melting ice) within the service perimeter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* V. STANDARD INCLUSIONS */}
        <section className="tier-section" id="standard-inclusions">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">V.</span>
              <h2>Standard Inclusions</h2>
              <p className="tier-section-intro">
                Every Ice &amp; Instinct experience, regardless of tier, includes the foundation of our craft.
              </p>
            </header>
            <div className="tier-prose tier-prose-grid reveal">
              <div className="tier-subsection">
                <h3>Private Master Mixologist</h3>
                <p>A dedicated professional with a quarter-century of global hospitality expertise.</p>
              </div>
              <div className="tier-subsection">
                <h3>Professional Tooling</h3>
                <p>
                  A compact, aesthetic case of gold-standard mixology tools (shakers, jiggers, strainers). No bulky
                  equipment, no portable bars.
                </p>
              </div>
              <div className="tier-subsection">
                <h3>On-Site Ritual Performance</h3>
                <p>The visual elegance of proper stirring, shaking, and pouring.</p>
              </div>
              <div className="tier-subsection">
                <h3>Setup &amp; Breakdown</h3>
                <p>Complete organization of the immediate working area.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="editorial-pause" aria-hidden="true">
          <p className="editorial-pause-text">
            True luxury <em>whispers.</em>
          </p>
          <span className="editorial-pause-mark">ii &middot; Simplicity</span>
        </section>

        {/* VI. WHAT THE HOST PROVIDES */}
        <section className="tier-section" id="host-provides">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">VI.</span>
              <h2>What the Host Provides</h2>
              <p className="tier-section-intro">
                To ensure the integrity of the service, the host provides the following canvas.
              </p>
            </header>
            <div className="tier-prose tier-prose-grid reveal">
              <div className="tier-subsection">
                <h3>Spirits, Mixers &amp; Garnishes</h3>
                <p>
                  All alcohol and fresh ingredients must be on-site prior to arrival, based on the provided
                  Specification.
                </p>
              </div>
              <div className="tier-subsection">
                <h3>Glassware</h3>
                <p>
                  Proper vessels for the selected cocktails (or rental via <a href="/concierge/">The Curator</a> add-on).
                </p>
              </div>
              <div className="tier-subsection">
                <h3>Infrastructure</h3>
                <p>
                  A dedicated work surface (kitchen counter, dining table, or existing bar), access to running water, and
                  electricity.
                </p>
              </div>
              <div className="tier-subsection">
                <h3>Ice Supply</h3>
                <p>Quantity and formats (cubes, spheres, spears) as specified in the consultation.</p>
              </div>
              <div className="tier-subsection">
                <h3>Floor Service Boundary</h3>
                <p>
                  Ice &amp; Instinct focuses exclusively on production within the bar perimeter. For passing drinks,
                  clearing glassware from the room, or general venue tidying, separate floor staff is required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VII. EXPERIENCE EXTENSIONS */}
        <section className="tier-section" id="extensions">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">VII.</span>
              <h2>Experience Extensions</h2>
              <p className="tier-section-intro">
                The Executive Standard is designed as a complete and self-contained experience. In certain cases, the
                scope of service may be thoughtfully adjusted to meet the specific needs of the gathering.
              </p>
            </header>
            <div className="tier-prose reveal">
              <p>
                A selection of additional services - including logistical coordination, glassware sourcing, specialty
                ice, and presentation support - is available on the <a href="/concierge/">Concierge</a> page.
              </p>
              <p>
                When the flow of the evening naturally calls for it, the Master Mixologist's presence may continue beyond
                the initial service window. Such considerations are addressed discreetly and without interrupting the
                integrity of the experience.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="final-cta" className="tier-section">
          <div className="container-narrow">
            <div className="final-cta reveal">
              <span className="ornament" aria-hidden="true">
                &#x2726;
              </span>
              <h2>
                Strip away the <span className="it">unnecessary.</span>
              </h2>
              <p>
                Tell us the date, the room, and the headcount. We will return with a tailored quote within one business
                day.
              </p>
              <div className="final-cta-actions">
                <a href="/contact/?package=simplicity" className="btn btn-primary">
                  Inquire <span className="arrow">&rarr;</span>
                </a>
                <a href="/offerings/" className="btn btn-ghost">
                  All tiers
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

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
          <span className="footer-meta">Manhattan &middot; Est. 2024 &middot; © 2026 Ice &amp; Instinct</span>
        </div>
      </footer>
    </>
  );
}
