import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

const BODY_CLASSES = ['cinema-chrome', 'vp-split', 'closer', 'is-inquire'];

export function Contact() {
  // Live deep page sets <body class="cinema-chrome vp-split closer is-inquire">.
  // React mounts into #root, so apply the body classes here (and clean up) to match.
  useEffect(() => {
    document.body.classList.add(...BODY_CLASSES);
    return () => document.body.classList.remove(...BODY_CLASSES);
  }, []);

  useCinemaChrome();
  useDeepScripts();

  // Inquiry modal: open from the invitation, close on scrim / button / ESC.
  // Ported from the page's inline <script> (the live page kept this logic outside script.js).
  useEffect(() => {
    const modal = document.getElementById('iq-modal');
    if (!modal) return;
    const firstField = document.getElementById('iq-name');
    let lastActive: Element | null = null;

    const open = () => {
      lastActive = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => {
        if (firstField) (firstField as HTMLElement).focus();
      }, 420);
    };
    const close = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (lastActive) (lastActive as HTMLElement).focus();
    };

    const openers = Array.from(document.querySelectorAll<HTMLElement>('[data-open-inquiry]'));
    const closers = Array.from(document.querySelectorAll<HTMLElement>('[data-close-inquiry]'));
    openers.forEach((b) => b.addEventListener('click', open));
    closers.forEach((b) => b.addEventListener('click', close));
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    };
    document.addEventListener('keydown', onKeydown);

    return () => {
      openers.forEach((b) => b.removeEventListener('click', open));
      closers.forEach((b) => b.removeEventListener('click', close));
      document.removeEventListener('keydown', onKeydown);
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
          <p className="va-eyebrow">Ice &amp; Instinct / Inquire</p>
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
              <a href="/gallery/">Gallery</a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="page-hero">
          <div className="section-bg-word" aria-hidden="true">
            INQUIRE
          </div>
          <div className="container">
            <span className="eyebrow">Inquire</span>
            <h1>
              Begin the <span className="it">conversation.</span>
            </h1>
            <p className="lead">
              The date, the room, the guest count. A reply within one business day, personally.
            </p>
          </div>
        </section>

        <section className="inquire-invite">
          <div className="invite-inner reveal">
            <div className="invite-text">
              <p className="invite-kicker">By appointment only</p>
              <p className="invite-line">
                An evening,
                <br />
                <span className="it">considered in full.</span>
              </p>
            </div>
            <div className="invite-actions">
              <button type="button" className="invite-cta" data-open-inquiry>
                <span>Begin the inquiry</span>
                <span className="arrow" aria-hidden="true">
                  &#8594;
                </span>
              </button>
              <span className="invite-alt">
                or write <a href="mailto:hello@iceinstinct.com">hello@iceinstinct.com</a>
              </span>
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

      {/* INQUIRY MODAL */}
      <div className="iq-modal" id="iq-modal" aria-hidden="true">
        <div className="iq-scrim" data-close-inquiry></div>
        <div className="iq-panel" role="dialog" aria-modal="true" aria-labelledby="iq-title">
          <button className="iq-close" type="button" data-close-inquiry aria-label="Close inquiry">
            <span></span>
            <span></span>
          </button>

          <form className="iq-form" action="https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID" method="POST">
            <input type="hidden" name="_subject" value="Ice & Instinct - new inquiry" />
            <input type="hidden" name="_source" value="iceinstinct.com / contact" />

            <header className="iq-head">
              <p className="iq-eyebrow">Private Commission</p>
              <h2 id="iq-title">
                Begin the <span className="it">conversation.</span>
              </h2>
            </header>

            <div className="iq-grid">
              <div className="iq-field">
                <label htmlFor="iq-name">Your name</label>
                <input
                  id="iq-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="As you would like to be addressed"
                />
              </div>
              <div className="iq-field">
                <label htmlFor="iq-email">Email</label>
                <input
                  id="iq-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Where we should reply"
                />
              </div>
              <div className="iq-field">
                <label htmlFor="iq-guests">Guests &amp; location</label>
                <input id="iq-guests" name="guests" type="text" placeholder="14 guests, Tribeca" />
              </div>
              <div className="iq-field">
                <label htmlFor="iq-date">
                  Event date <em>if known</em>
                </label>
                <input id="iq-date" name="event_date" type="text" placeholder="Late June" />
              </div>
              <div className="iq-field iq-field--wide">
                <label htmlFor="iq-message">In your words</label>
                <textarea
                  id="iq-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="The occasion, the mood, the room. Anything that should be considered."
                ></textarea>
              </div>
            </div>

            <div className="iq-foot">
              <button type="submit" className="iq-submit">
                <span>Send the inquiry</span>
                <span className="arrow" aria-hidden="true">
                  &#8594;
                </span>
              </button>
              <span className="iq-sla">A reply within one business day, personally</span>
            </div>

            <div className="form-success" id="form-success">
              Received. A reply within one business day, personally - Teimuraz.
            </div>
            <div className="form-error" id="form-error" role="alert"></div>
          </form>
        </div>
      </div>
    </>
  );
}
