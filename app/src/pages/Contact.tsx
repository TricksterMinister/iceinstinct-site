import { SiteFooter } from '../sections/SiteFooter';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

const BODY_CLASSES = ['cinema-chrome'];

const EMAIL = 'alchemyandice.nyc@gmail.com';

export function Contact() {
  // Inquire mirrors the offering pages: <body class="cinema-chrome"> + the
  // offering closing-segment.oma-close grid drives the one-viewport layout.
  // React mounts into #root, so apply the body classes here (and clean up) to match.
  useEffect(() => {
    document.body.classList.add(...BODY_CLASSES);
    return () => document.body.classList.remove(...BODY_CLASSES);
  }, []);

  useCinemaChrome();
  useDeepScripts();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Client-side only: build a mailto from the form fields and hand off to the
  // visitor's mail client. No backend.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href =
      'mailto:' +
      EMAIL +
      '?subject=' +
      encodeURIComponent('Ice & Instinct inquiry') +
      '&body=' +
      encodeURIComponent(body);
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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Inquire</p>
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

      {/* ONE segment - EXACT copy of the offering closing-segment (light Свет-1
          framed card), same as /offerings/foundation/: closing-segment.oma-close
          grid (CTA card 70% + footer band 30%) = one viewport, footer full scale.
          The only change vs the offering closing: the two CTA buttons are replaced
          by the inquiry form, fit inside the same card. No public email is shown;
          Send hands off to the mail client. */}
      <main>
        <div className="closing-segment oma-close inquire-close" id="final-cta">
          <section className="closing">
            <div className="section-bg-word top right" aria-hidden="true">INQUIRE</div>
            <div className="closing-stage">
              <div className="closing-frame">
                <span className="closing-corner tl" aria-hidden="true"></span>
                <span className="closing-corner tr" aria-hidden="true"></span>
                <span className="closing-corner bl" aria-hidden="true"></span>
                <span className="closing-corner br" aria-hidden="true"></span>
                <span className="closing-eyebrow">Ice &amp; Instinct / Inquire</span>
                <h2 className="closing-title">
                  Begin the <span className="it">conversation.</span>
                </h2>
                <p className="closing-lead">
                  Tell us the date, the room, and the guest count. A reply follows within one
                  business day, personally.
                </p>
                <form className="inquire-form" onSubmit={onSubmit} noValidate>
                  <div className="inquire-row">
                    <label className="inquire-field">
                      <span className="inquire-label">Name</span>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label className="inquire-field">
                      <span className="inquire-label">Email</span>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>
                  <label className="inquire-field">
                    <span className="inquire-label">Message</span>
                    <textarea
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="The evening you have in mind - the date, the room, the guest count."
                      required
                    />
                  </label>
                  <div className="inquire-form-foot">
                    <button type="submit" className="btn-primary" data-cursor="link">
                      <span className="btn-label">Send the inquiry</span>
                      <span className="btn-arr" aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </form>
              </div>
              <p className="closing-meta">
                <span>By appointment only</span>
                <span>New York Metropolitan Area</span>
                <span>Est. 2024</span>
              </p>
            </div>
          </section>

          <SiteFooter embedded />
        </div>
      </main>
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
