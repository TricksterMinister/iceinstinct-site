import { SiteFooter } from '../sections/SiteFooter';
import markUrl from '../assets/ii-mark.png';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { useEffect, useState } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { PalateProfiler } from '../features/Profiler/PalateProfiler';
import type { Selections } from '../features/Profiler/profilerData';
import { setCocktail } from '../lib/leadContext';
import { track } from '../lib/track';

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
  useSegmentSnap(['.page-hero', '.pp-band', '.closing-segment']);

  const [profilerOpen, setProfilerOpen] = useState(false);

  // Carry the composed signature into the Inquiry: via query params for the
  // prefilled message AND via sessionStorage so the Formspree payload still
  // names the cocktail even if the guest wanders the site before submitting.
  const commission = (name: string, sel: Selections) => {
    setCocktail(name);
    track('profiler_commission', { cocktail: name });
    const params = new URLSearchParams({ cocktail: name });
    if (sel.identity) params.set('identity', sel.identity);
    if (sel.taste) params.set('taste', sel.taste);
    if (sel.accord) params.set('accord', sel.accord);
    window.location.href = `/contact/?${params.toString()}`;
  };

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Index</p>
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
            <h1>
              Touch the glass
              <br />
              to awaken <span className="it">the spirit.</span>
            </h1>
            <p className="lead">
              Thirteen signature compositions, each built once. Select any tile to view it in full.
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
                  data-src="/assets/photos/white-lotus-v2.png"
                >
                  <img src="/assets/photos/white-lotus-v2.png" alt="White Lotus cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">White Lotus</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Aviation"
                  data-src="/assets/photos/aviation-v2.png"
                >
                  <img
                    src="/assets/photos/aviation-v2.png"
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
                  data-src="/assets/photos/persimmon-saffron-v2.png"
                >
                  <img
                    src="/assets/photos/persimmon-saffron-v2.png"
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
                  data-src="/assets/photos/belladonna-v2.png"
                >
                  <img src="/assets/photos/belladonna-v2.png" alt="Belladonna cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Belladonna</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Black Truffle Martini"
                  data-src="/assets/photos/black-truffle-v2.png"
                >
                  <img
                    src="/assets/photos/black-truffle-v2.png"
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
                  data-src="/assets/photos/rose-garden-v2.png"
                >
                  <img src="/assets/photos/rose-garden-v2.png" alt="Rose Garden Rendezvous cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Rose Garden Rendezvous</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Aureliano"
                  data-src="/assets/photos/aureliano-v2.png"
                >
                  <img src="/assets/photos/aureliano-v2.png" alt="Aureliano cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Aureliano</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Call Me By Your Name"
                  data-src="/assets/photos/basil-v2.png"
                >
                  <img src="/assets/photos/basil-v2.png" alt="Call Me By Your Name cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Call Me By Your Name</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="1001 Nights"
                  data-src="/assets/photos/1001-nights-v2.png"
                >
                  <img src="/assets/photos/1001-nights-v2.png" alt="1001 Nights cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">1001 Nights</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Basil in my mind"
                  data-src="/assets/photos/basil-in-my-mind-v1.png"
                >
                  <img
                    src="/assets/photos/basil-in-my-mind-v1.png"
                    alt="Basil in my mind cocktail"
                    loading="lazy"
                  />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Basil in my mind</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Calipso Cream"
                  data-src="/assets/photos/calipso-v2.png"
                >
                  <img src="/assets/photos/calipso-v2.png" alt="Calipso Cream cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Calipso Cream</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Bésame"
                  data-src="/assets/photos/besame-v2.png"
                >
                  <img
                    src="/assets/photos/besame-v2.png"
                    alt="Bésame cocktail"
                    loading="lazy"
                  />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Bésame</span>
                    <span className="gallery-tile-meta">View Ritual</span>
                  </span>
                </button>

                <button
                  className="gallery-tile"
                  type="button"
                  data-title="Negroni Verde"
                  data-src="/assets/photos/negroni-verde.png"
                >
                  <img src="/assets/photos/negroni-verde.png" alt="Negroni Verde cocktail" loading="lazy" />
                  <span className="gallery-tile-overlay">
                    <span className="gallery-tile-name">Negroni Verde</span>
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
                  / 13
                </span>
                <span>Drag · scroll · swipe</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pp-band">
          <div className="container-narrow">
            <div className="pp-band-inner">
              <span className="pp-band-eyebrow">The fourteenth composition</span>
              <h2 className="pp-band-title">
                Not on the wall yet. <span className="it">Compose your own.</span>
              </h2>
              <p className="pp-band-lead">
                The thirteen above were each built for one evening. Answer three sensory questions and the alchemist
                composes a signature for yours - named, poured, and ready to commission.
              </p>
              <button className="pp-band-cta" type="button" onClick={() => { track('profiler_open'); setProfilerOpen(true); }}>
                <span>Compose your signature</span>
                <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      <div className="closing-segment">
        <section id="final-cta" className="numbered">
          <div className="container-narrow">
            <div className="final-cta final-cta--luxe reveal">
              <span className="cta-corner cta-corner--tl" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--tr" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--bl" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--br" aria-hidden="true"></span>
              <span className="ornament" aria-hidden="true">
                &#10022;
              </span>
              <h2>
                Commission a <span className="it">ritual.</span>
              </h2>
              <p className="cta-lead">Each composition was built for a single evening. The next one is for yours.</p>
              <div className="final-cta-actions">
                <a href="/contact/" className="btn btn-primary">
                  Request a private quote <span className="arrow">→</span>
                </a>
                <a href="/offerings/" className="btn btn-ghost">
                  See the tiers
                </a>
              </div>
              <p className="cta-foot">By appointment only &middot; Est. 2024</p>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>

      {/* Recipe drawer - click a tile: photo left, recipe right. JS toggles .is-open */}
      <div className="lightbox recipe-drawer" id="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
        <button className="lightbox-close" aria-label="Close" type="button">
          &times;
        </button>
        <div className="rd-stage">
          <figure className="rd-photo">
            <img id="lightbox-image" alt="" />
          </figure>
          <div className="rd-card">
            <h3 className="rd-title" id="lightbox-title"></h3>
            <span className="rd-rule" aria-hidden="true"></span>
            <div className="rd-palate" id="rd-palate"></div>
            <p className="rd-notes" id="rd-notes"></p>
          </div>
        </div>
      </div>

      <PalateProfiler open={profilerOpen} onClose={() => setProfilerOpen(false)} onCommission={commission} />
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
