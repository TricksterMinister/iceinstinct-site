import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

export function GalleryPage() {
  // Live deep page sets <body class="cinema-chrome is-gallery closer">. React mounts
  // into #root, so apply the body classes here (and clean them up) to match the
  // original DOM.
  useEffect(() => {
    const classes = ['cinema-chrome', 'is-gallery', 'closer'];
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
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
          <p className="va-eyebrow">Ice &amp; Instinct / Index</p>
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
              <a href="/offerings/">Offerings</a>
              <a href="/concierge/">Concierge</a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/" className="is-active">
                Gallery
              </a>
            </div>
            <a href="/contact/" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="page-hero">
          <div className="section-bg-word" aria-hidden="true">
            COLLECTION
          </div>
          <div className="container">
            <span className="eyebrow">The Collection</span>
            <h1>
              Touch the glass
              <br />
              to awaken <span className="it">the spirit.</span>
            </h1>
            <p className="lead">
              Twelve signature compositions, each built once. Hover any tile to release its colour. Click for the full
              image.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="gallery-track-wrap reveal">
              <div className="gallery-track" id="gallery-track">
                <button
                  className="gallery-tile"
                  type="button"
                  data-title="White Lotus"
                  data-src="/assets/photos/white-lotus.png"
                >
                  <img src="/assets/photos/white-lotus.png" alt="White Lotus cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">White Lotus</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Aviation"
                  data-src="/assets/photos/generated-image-december-02-2025---7_41pm-NBbxW61xks4izMLg.jpeg"
                >
                  <img
                    src="/assets/photos/generated-image-december-02-2025---7_41pm-NBbxW61xks4izMLg.jpeg"
                    alt="Aviation cocktail"
                    loading="lazy"
                  />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Aviation</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Persimmon Saffron Sour"
                  data-src="/assets/photos/persimmon-saffron-sour.png"
                >
                  <img
                    src="/assets/photos/persimmon-saffron-sour.png"
                    alt="Persimmon Saffron Sour cocktail"
                    loading="lazy"
                  />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Persimmon Saffron Sour</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Belladonna"
                  data-src="/assets/photos/belladonna.jpeg"
                >
                  <img src="/assets/photos/belladonna.jpeg" alt="Belladonna cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Belladonna</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Black Truffle Martini"
                  data-src="/assets/photos/generated-image-december-02-2025---6_43pm-bHcjO1So1iA225II.jpeg"
                >
                  <img
                    src="/assets/photos/generated-image-december-02-2025---6_43pm-bHcjO1So1iA225II.jpeg"
                    alt="Black Truffle Martini cocktail"
                    loading="lazy"
                  />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Black Truffle Martini</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Rose Garden Rendezvous"
                  data-src="/assets/photos/rose-garden.jpeg"
                >
                  <img src="/assets/photos/rose-garden.jpeg" alt="Rose Garden Rendezvous cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Rose Garden Rendezvous</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Aureliano"
                  data-src="/assets/photos/aureliano.png"
                >
                  <img src="/assets/photos/aureliano.png" alt="Aureliano cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Aureliano</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Basil in my mind"
                  data-src="/assets/photos/basil-in-my-mind.jpeg"
                >
                  <img src="/assets/photos/basil-in-my-mind.jpeg" alt="Basil in my mind cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Basil in my mind</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="1001 Nights"
                  data-src="/assets/photos/1001-nights.jpeg"
                >
                  <img src="/assets/photos/1001-nights.jpeg" alt="1001 Nights cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">1001 Nights</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Call Me By Your Name"
                  data-src="/assets/photos/generated-image-december-08-2025---12_05am-m5HxCSxPjQY1IsoU.jpeg"
                >
                  <img
                    src="/assets/photos/generated-image-december-08-2025---12_05am-m5HxCSxPjQY1IsoU.jpeg"
                    alt="Call Me By Your Name cocktail"
                    loading="lazy"
                  />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Call Me By Your Name</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Calipso Cream"
                  data-src="/assets/photos/calipso-cream.jpeg"
                >
                  <img src="/assets/photos/calipso-cream.jpeg" alt="Calipso Cream cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Calipso Cream</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Bésame"
                  data-src="/assets/photos/generated-image-december-02-2025---8_22pm-46fGk8PKHFPTWN9T.jpeg"
                >
                  <img
                    src="/assets/photos/generated-image-december-02-2025---8_22pm-46fGk8PKHFPTWN9T.jpeg"
                    alt="Bésame cocktail"
                    loading="lazy"
                  />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Bésame</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>
              </div>
              <div className="gallery-progress" id="gallery-progress" style={{ '--progress': '8%' } as React.CSSProperties}></div>
              <div className="gallery-meta-row">
                <span>
                  <span className="pos" id="gallery-pos">
                    01
                  </span>{' '}
                  / 12
                </span>
                <span>Drag · scroll · swipe</span>
              </div>
            </div>
          </div>
        </section>

        <section id="final-cta" className="numbered">
          <div className="container-narrow">
            <div className="final-cta final-cta--luxe reveal">
              <span className="cta-corner cta-corner--tl" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--tr" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--bl" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--br" aria-hidden="true"></span>
              <p className="cta-eyebrow">Private Commission &middot; Manhattan</p>
              <span className="ornament" aria-hidden="true">
                &#10022;
              </span>
              <h2>
                Commission a <span className="it">ritual.</span>
              </h2>
              <p className="cta-lead">Each composition was built for a single evening. The next one is for yours.</p>
              <div className="final-cta-actions">
                <a href="/contact/" className="btn btn-primary">
                  Inquire <span className="arrow">→</span>
                </a>
                <a href="/offerings/" className="btn btn-ghost">
                  See the tiers
                </a>
              </div>
              <p className="cta-foot">By appointment only &middot; Est. 2024</p>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox - hidden by default, JS toggles .is-open */}
      <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
        <button className="lightbox-close" aria-label="Close" type="button">
          &times;
        </button>
        <div className="lightbox-frame">
          <img id="lightbox-image" src="" alt="" />
          <div className="lightbox-title" id="lightbox-title"></div>
        </div>
      </div>

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
