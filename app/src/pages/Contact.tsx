import { SiteFooter } from '../sections/SiteFooter';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

const BODY_CLASSES = ['cinema-chrome', 'vp-split', 'closer', 'is-inquire'];

const EMAIL = 'alchemyandice.nyc@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=Ice%20%26%20Instinct%20inquiry`;

export function Contact() {
  // Live deep page sets <body class="cinema-chrome vp-split closer is-inquire">.
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

      <main>
        <section className="page-hero">
          <div className="section-bg-word" aria-hidden="true">
            INQUIRE
          </div>
          <div className="container">
            <h1>
              Begin the <span className="it">conversation.</span>
            </h1>
            <p className="lead">
              The date, the room, the guest count. Write to us and a reply follows within one
              business day, personally.
            </p>
          </div>
        </section>
      </main>

      <div className="inquire-close">
        <section className="inquire-invite">
          <div className="invite-inner reveal">
            <form className="inquire-form" onSubmit={onSubmit} noValidate>
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
              <label className="inquire-field">
                <span className="inquire-label">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="The evening you have in mind - the date, the room, the guest count."
                  required
                />
              </label>
              <div className="inquire-form-foot">
                <button type="submit" className="btn-primary" data-cursor="link">
                  <span className="btn-label">Send</span>
                  <span className="btn-arr" aria-hidden="true">
                    &rarr;
                  </span>
                </button>
                <p className="inquire-direct">
                  Or write to us directly:{' '}
                  <a href={MAILTO}>{EMAIL}</a>
                </p>
              </div>
            </form>
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
