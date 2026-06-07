import { SiteFooter } from '../sections/SiteFooter';
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

      <SiteFooter />

      {/* INQUIRY MODAL */}
      <div className="iq-modal" id="iq-modal" aria-hidden="true">
        <div className="iq-scrim" data-close-inquiry></div>
        <div className="iq-panel" role="dialog" aria-modal="true" aria-labelledby="iq-title">
          <button className="iq-close" type="button" data-close-inquiry aria-label="Close inquiry">
            <span></span>
            <span></span>
          </button>

          <div className="iq-form">
            <header className="iq-head">
              <p className="iq-eyebrow">Private Commission</p>
              <h2 id="iq-title">
                Begin the <span className="it">conversation.</span>
              </h2>
            </header>

            <p className="iq-lead">
              Choose a time for a private consultation and we will walk through the date, the room,
              and the guest count together. A personal confirmation follows.
            </p>

            <div className="iq-foot">
              <a
                className="btn-primary"
                href="https://enter-ritual.youcanbook.me/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                <span className="btn-label">Reserve a consultation</span>
                <span className="btn-arr" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
