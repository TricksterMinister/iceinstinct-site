import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useMyStory } from '../app/useMyStory';

export function MyStory() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useMyStory();

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
          <p className="va-eyebrow">Ice &amp; Instinct / My Story</p>
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
              <a href="/my-story/" className="is-active">
                My Story
              </a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ================ COVER: full-bleed portrait hero ================ */}
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
            ALCHEMIST
          </div>
          <div className="story-cover-id">
            <span className="eyebrow">My Story</span>
            <h1 className="story-cover-name">
              Teimuraz <span className="it">Benidze.</span>
            </h1>
            <p className="story-cover-role">Founder &amp; Flavor Architect</p>
          </div>
        </section>

        {/* ================ OPENING STATEMENT ================ */}
        <section className="numbered" id="story-intro">
          <div className="container-narrow">
            <article className="story-open reveal">
              <h2 className="story-slogan">
                <span className="it">Where ritual meets instinct.</span>
              </h2>
              <p className="story-lede">
                My journey began not behind a bar, but in the pursuit of perfection. <strong>Ice &amp; Instinct</strong>{' '}
                is the culmination of years spent refining the dialogue between nature's raw ingredients and the
                precision of modern luxury.
              </p>
            </article>
          </div>
        </section>

        {/* ================ THE JOURNEY (Georgia -> NYC, as a timeline) ================ */}
        <section className="story-journey" id="story-journey">
          <div className="container">
            <div className="journey-head reveal">
              <span className="eyebrow">The Journey</span>
              <h2 className="display-heading">
                Four cities,
                <br />
                <span className="it">one standard.</span>
              </h2>
            </div>
            <ol className="journey-rail" data-journey-rail>
              <li className="journey-stop" data-img="/assets/photos/journey-tbilisi.jpg">
                <span className="journey-no">01</span>
                <div className="journey-body">
                  <span className="journey-city">Tbilisi</span>
                  <p className="journey-note">
                    Born where every celebration begins with a toast and ends in silence. Wine carries memory; ritual
                    defines grace - and that sense of presence has never left.
                  </p>
                </div>
              </li>
              <li className="journey-stop" data-img="/assets/photos/journey-lisbon.jpg">
                <span className="journey-no">02</span>
                <div className="journey-body">
                  <span className="journey-city">Lisbon</span>
                  <p className="journey-note">
                    From the Caucasus outward, across continents - new palates, a slower light, the patience of aged
                    things.
                  </p>
                </div>
              </li>
              <li className="journey-stop" data-img="/assets/photos/journey-moscow.jpg">
                <span className="journey-no">03</span>
                <div className="journey-body">
                  <span className="journey-city">Moscow</span>
                  <p className="journey-note">
                    Hospitality as perception: to read a room the way one reads a language, to feel timing as rhythm, to
                    turn precision into art.
                  </p>
                </div>
              </li>
              <li className="journey-stop" data-img="/assets/photos/journey-newyork.jpg">
                <span className="journey-no">04</span>
                <div className="journey-body">
                  <span className="journey-city">New York</span>
                  <p className="journey-note">
                    Two decades of fine wine, resorts and restaurants - the architecture of service - distilled into
                    something rarer: private mixology as ritual.
                  </p>
                </div>
              </li>
            </ol>
            <figure className="journey-reveal" aria-hidden="true">
              <img alt="" />
            </figure>
          </div>
        </section>

        {/* ================ PHILOSOPHY QUOTE (Ice / Instinct - scroll-revealed) ================ */}
        <section className="numbered" id="philosophy">
          <div className="container-narrow">
            <blockquote className="philosophy-quote reveal">
              <p className="philosophy-line">
                <strong className="philosophy-word">Ice</strong>
                is discipline - the order, the preparation, the patience of craft.
              </p>
              <p className="philosophy-line">
                <strong className="philosophy-word">Instinct</strong>
                is intuition - the pulse, the moment, the whisper that changes everything.
              </p>
              <footer className="philosophy-divider">Between them, every experience is shaped.</footer>
            </blockquote>
          </div>
        </section>

        {/* ================ CREDENTIALS (podcast + languages) ================ */}
        <section className="story-cred-sec">
          <div className="container">
            <div className="journey-cred reveal">
              <div className="cred">
                <span className="cred-k">The Podcast</span>
                <p className="cred-v">
                  A study of human nature - the quiet motives and contradictions that define us. The same curiosity
                  guides every pour: each drink a question, each flavor a possible answer.
                </p>
              </div>
              <div className="cred">
                <span className="cred-k">Four Languages</span>
                <p className="cred-v">
                  English, Portuguese, Russian, Georgian. Every culture raises a glass its own way - I listen before I
                  pour.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================ FINALE ================ */}
        <section className="numbered" id="story-finale">
          <div className="container-narrow">
            <div className="narrative-finale reveal">
              <p className="finale-prose">
                When I arrive at your space, I bring nothing but my tools and attention. No menu, no routine. The evening
                unfolds in dialogue - between liquid and light, memory and desire.
              </p>
              <h3 className="final-statement">
                This is not bartending.
                <br />
                This is <span className="it">Ice &amp; Instinct.</span>
              </h3>
            </div>
          </div>
        </section>

        {/* ================ FAQ ACCORDION ================ */}
        <section className="numbered" id="faq">
          <div className="container-narrow">
            <div className="section-head reveal">
              <span className="eyebrow">Understanding the ritual</span>
              <h2 className="display-heading">
                The ritual
                <br />
                <span className="it">explained.</span>
              </h2>
            </div>

            <div className="faq-list reveal">
              <details className="faq-item">
                <summary>How far in advance should I reserve?</summary>
                <div className="faq-answer">
                  <p>
                    Most clients reserve 2-4 weeks ahead. Every evening is built as a one-of-one ritual, and preparation
                    begins the moment we speak.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>Do you bring all ingredients and tools?</summary>
                <div className="faq-answer">
                  <p>
                    I arrive with a compact case of precision tools. All ingredients, spirits, and glassware are sourced
                    by the host - I'll provide a tailored shopping list to match your chosen experience.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>Can we choose specific cocktails?</summary>
                <div className="faq-answer">
                  <p>
                    For Simplicity and Bespoke, yes - we collaborate to refine a curated menu together. For Omakase,
                    there is no menu - each creation emerges spontaneously in the moment, tailored to individual guests
                    and the evening's flow.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>Do you provide a bar setup?</summary>
                <div className="faq-answer">
                  <p>
                    By default, I use your existing space. A full portable bar setup or premium glassware rental can be
                    arranged upon request as an enhancement through <a href="/concierge/">The Curator</a> add-on.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>Do you travel outside NYC and New Jersey?</summary>
                <div className="faq-answer">
                  <p>
                    Yes, upon request. Travel fees and accommodations are arranged according to distance and event scale
                    - subject to availability.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>What about postponements?</summary>
                <div className="faq-answer">
                  <p>
                    Your deposit can transfer to a new date within six months, depending on availability. One reschedule
                    is included; further changes or peak dates may incur a fee.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>How many guests can you accommodate?</summary>
                <div className="faq-answer">
                  <p>
                    <a href="/offerings/simplicity/">Simplicity</a> accommodates up to 12 guests.{' '}
                    <a href="/offerings/bespoke/">Bespoke</a> up to 15. <a href="/offerings/omakase/">Omakase</a> can
                    serve up to 25; <a href="/offerings/foundation/">Foundation</a> scales up to 40 with added bar
                    staff. Larger events can be arranged with additional staff through custom consultation.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>Can you create non-alcoholic drinks?</summary>
                <div className="faq-answer">
                  <p>
                    Absolutely. The ritual is about balance and craft, not alcohol. Every composition can be crafted
                    spirit-free with the same precision, complexity, and emotion.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>Payment and deposit process</summary>
                <div className="faq-answer">
                  <p>
                    A $1,000 deposit secures your date and is applied toward your final balance. Once your package is
                    confirmed, the total is adjusted: if your total exceeds $1,000, you pay the difference; if it is
                    less, the remainder is refunded. The balance is due at least 14 days before the event.
                  </p>
                </div>
              </details>

              <details className="faq-item">
                <summary>NDA and insurance</summary>
                <div className="faq-answer">
                  <p>
                    Confidentiality is part of the ethos. NDAs are available upon request. Certificates of insurance can
                    be issued for venues that require coverage.
                  </p>
                </div>
              </details>
            </div>

            <p className="faq-coda">
              Each experience is a living dialogue - between craft, instinct, and atmosphere.
            </p>
          </div>
        </section>

        {/* ================ FINAL CTA ================ */}
        <section id="final-cta">
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
                Begin the <span className="it">conversation.</span>
              </h2>
              <p className="cta-lead">Tell me about the evening. A response within one business day, personally.</p>
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
