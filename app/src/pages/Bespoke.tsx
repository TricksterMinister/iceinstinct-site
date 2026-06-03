import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

export function Bespoke() {
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
          <p className="va-eyebrow">Ice &amp; Instinct / Bespoke</p>
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
            <a href="/contact/?package=bespoke" className="nav-cta">
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
        <section className="page-hero" style={{ viewTransitionName: 'tier-hero-bespoke' }}>
          <div className="section-bg-word" aria-hidden="true">
            BESPOKE
          </div>
          <div className="container">
            <span className="eyebrow">
              <a href="/offerings/" style={{ color: 'inherit' }}>
                &larr; Offerings
              </a>
            </span>
            <div className="tier-hero">
              <div className="tier-hero-text">
                <span className="eyebrow">iii. Bespoke &middot; The Architect</span>
                <h1>
                  Bespoke Design <span className="it">&amp; Artistry.</span>
                </h1>
                <p className="lead">
                  Your vision, crafted into every glass. Custom cocktails designed specifically for your theme, your
                  colors, your story. Mixology as creative collaboration.
                </p>
                <div className="price">
                  From $1,500 USD<small>Up to 15 guests &middot; 4 hours &middot; Manhattan</small>
                </div>
                <div className="meta-row" style={{ marginTop: 'var(--s-sm)' }}>
                  <a href="/contact/?package=bespoke" className="btn btn-primary">
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
                  poster="/assets/photos/generated-image-december-02-2025---5_51pm-J5sLYZUT5l6RkRlI.jpeg"
                  aria-label="Cocktail being poured, slow motion"
                >
                  <source
                    src="https://videos.pexels.com/video-files/4765778/4765778-hd_1920_1080_25fps.mp4"
                    type="video/mp4"
                  />
                  <img
                    src="/assets/photos/generated-image-december-02-2025---5_51pm-J5sLYZUT5l6RkRlI.jpeg"
                    alt="Bespoke tier mood"
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
                For those who seek something beyond the classics. Your celebration deserves a cocktail menu as unique as
                the occasion itself - drinks designed specifically for your theme, your colors, your story.
              </p>
              <p>
                This is mixology as creative collaboration. Together, we design a bespoke menu of signature cocktails
                tailored to your event's atmosphere and aesthetic. Whether for a milestone birthday, a brand launch, or
                an engagement, each cocktail becomes a conversation piece.
              </p>
              <p>
                Your private mixologist arrives with the creative vision to transform your ideas into liquid art. Guests
                don't just drink - they experience your story through thoughtfully crafted flavors, artful presentations,
                and photographically striking compositions.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="editorial-pause" aria-hidden="true">
          <p className="editorial-pause-text">
            Mixology as <em>collaboration.</em>
          </p>
          <span className="editorial-pause-mark">iii &middot; Bespoke</span>
        </section>

        {/* II. THE MENU PROTOCOL */}
        <section className="tier-section" id="menu-protocol">
          <div className="container-narrow">
            <header className="tier-section-head reveal">
              <span className="tier-roman">II.</span>
              <h2>The Menu Protocol</h2>
              <p className="tier-section-intro">Custom Design. Your Story. Liquid Form.</p>
            </header>
            <div className="tier-prose reveal">
              <p>This experience is dedicated to creation. We translate your inspiration into a sensory experience.</p>
              <div className="tier-subsection">
                <h3>The Selection</h3>
                <p>Two weeks prior, we collaborate to create a bespoke menu of 5-6 signature cocktails.</p>
              </div>
              <div className="tier-subsection">
                <h3>The Focus</h3>
                <p>
                  Full creative license. We develop custom cocktail names, unique flavor profiles, and theatrical
                  presentation elements (smoke, specialty ice, botanical garnishes) designed to photograph beautifully
                  and spark conversation.
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
                Service capacity includes complex preparation and theatrical execution.
              </p>
            </header>

            <div className="tier-scale-grid reveal-stagger reveal">
              <article className="tier-scale-card">
                <span className="tier-scale-label">Tier A</span>
                <h3>The Intimate</h3>
                <p className="tier-scale-cap">Up to 15 guests</p>
                <ul className="tier-scale-meta">
                  <li>
                    <strong>Personnel</strong>1 Master Mixologist (custom design &amp; execution)
                  </li>
                  <li>
                    <strong>Focus</strong>Detailed storytelling and visual perfection.
                  </li>
                </ul>
                <p className="tier-scale-price">From $1,500</p>
              </article>

              <article className="tier-scale-card">
                <span className="tier-scale-label">Tier B</span>
                <h3>The Social</h3>
                <p className="tier-scale-cap">16 to 30 guests</p>
                <ul className="tier-scale-meta">
                  <li>
                    <strong>Personnel</strong>1 Master Mixologist + 1 Shadow (bar support)
                  </li>
                  <li>
                    <strong>Focus</strong>Maintaining service speed and presentation quality for larger groups.
                  </li>
                </ul>
                <p className="tier-scale-price">From $2,000</p>
              </article>

              <article className="tier-scale-card">
                <span className="tier-scale-label">Tier C</span>
                <h3>The Grand</h3>
                <p className="tier-scale-cap">31+ guests</p>
                <ul className="tier-scale-meta">
                  <li>
                    <strong>Personnel</strong>Custom team configuration
                  </li>
                  <li>
                    <strong>Focus</strong>High-volume theatrical service.
                  </li>
                </ul>
                <p className="tier-scale-price">Custom Quote</p>
              </article>
            </div>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="editorial-pause" aria-hidden="true">
          <p className="editorial-pause-text">
            Each cocktail,
            <br />a <em>conversation piece.</em>
          </p>
          <span className="editorial-pause-mark">iii &middot; Bespoke</span>
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
                <h3>In-Depth Design Consultation</h3>
                <p>
                  Two weeks prior, we discuss your theme, color palette, and inspiration to design your signature menu.
                </p>
              </div>
              <div className="tier-subsection">
                <h3>The Procurement Specification</h3>
                <p>
                  You receive a detailed shopping list for premium spirits, artisanal mixers, fresh ingredients, and
                  unique garnishes required for your specific design.
                </p>
              </div>
              <div className="tier-subsection">
                <h3>Four Hours of Masterful Execution</h3>
                <p>We arrive with professional tools and specialty ingredients to bring your vision to life.</p>
              </div>
              <div className="tier-subsection">
                <h3>Theatrical Presentation</h3>
                <p>Implementation of visual elements such as smoke, dry ice, or floral aesthetics where appropriate.</p>
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
                <p>A compact, aesthetic case of gold-standard mixology tools. No bulky equipment, no portable bars.</p>
              </div>
              <div className="tier-subsection">
                <h3>On-Site Ritual Performance</h3>
                <p>The visual elegance of proper stirring, shaking, and pouring.</p>
              </div>
              <div className="tier-subsection">
                <h3>Setup &amp; Breakdown</h3>
                <p>Complete organization of the immediate working area.</p>
              </div>
              <div className="tier-subsection">
                <h3>Custom Recipe Documentation</h3>
                <p>
                  Following the event, you receive a digital cocktail book featuring your bespoke menu with full recipes,
                  garnish specifications, and presentation notes for future recreation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="editorial-pause" aria-hidden="true">
          <p className="editorial-pause-text">
            Your story,
            <br />
            in <em>liquid form.</em>
          </p>
          <span className="editorial-pause-mark">iii &middot; Bespoke</span>
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
                  Proper vessels for the selected cocktails (or rental via <a href="/concierge/">The Curator</a>{' '}
                  add-on).
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
                <p>Quantity and formats as specified in the consultation.</p>
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
                In addition to the core elements of your chosen experience, select extensions may be introduced to
                further refine the structure, pacing, or technical execution of the evening.
              </p>
            </header>
            <div className="tier-prose reveal">
              <p>
                A full range of additional services - including curated glassware, specialty ice, logistical
                coordination, and presentation oversight - is available on the <a href="/concierge/">Concierge</a> page
                and may be incorporated as needed.
              </p>
              <p>
                Should the rhythm of the event call for a longer presence, service time may continue beyond the initial
                framework. All such considerations are aligned during the private design consultation to ensure balance,
                clarity, and control.
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
                Translate your vision <span className="it">into liquid art.</span>
              </h2>
              <p>
                Tell us the date, the theme, and the headcount. We will return with a tailored design proposal within one
                business day.
              </p>
              <div className="final-cta-actions">
                <a href="/contact/?package=bespoke" className="btn btn-primary">
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
