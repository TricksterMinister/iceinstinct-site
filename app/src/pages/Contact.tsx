import { SiteFooter } from '../sections/SiteFooter';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { readEvening, useEvening } from '../lib/evening';
import { readCocktail, readSource } from '../lib/leadContext';
import { track } from '../lib/track';

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
  const [company, setCompany] = useState(''); // honeypot, hidden from humans
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const [evening] = useEvening();
  const formStarted = useRef(false);
  const onFormStart = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    track('inquiry_form_start');
  };

  // WhatsApp opens with the context already typed: the guest just hits send.
  const waText = encodeURIComponent(
    'Hello - I am planning an evening with Ice & Instinct and would like to talk.' +
      (evening.length ? ` Enhancements I have in mind: ${evening.join(', ')}.` : '')
  );

  // Pre-fill the note with everything the guest has already told the site, so
  // nothing is lost between pages: the Profiler signature (?cocktail=...), the
  // Concierge tray (?enhancements=...), or the enhancements remembered in
  // sessionStorage when they arrive with no params at all.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const parts: string[] = [];

    const cocktail = q.get('cocktail');
    if (cocktail) {
      const traits = [q.get('identity'), q.get('taste'), q.get('accord')].filter(Boolean).join(', ');
      parts.push(
        `The signature composed for me in the Palate Profiler: ${cocktail}${traits ? ` (${traits})` : ''}. I would like to commission this serving for my evening.`
      );
    }

    const enhParam = q.get('enhancements');
    const enh = enhParam
      ? enhParam.split('|').map((s) => s.trim()).filter(Boolean)
      : readEvening();
    if (enh.length) parts.push(`Enhancements I would like to include: ${enh.join(', ')}.`);

    if (!parts.length) return;
    parts.push('The evening I have in mind (date, room, guest count): ');
    setMessage(parts.join('\n\n'));
  }, []);

  const mailtoFallback = () => {
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href =
      'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Ice & Instinct inquiry') + '&body=' + encodeURIComponent(body);
  };

  // Post the inquiry to Formspree so the lead is archived in its dashboard and
  // delivered through real mail infrastructure - shared-host mail() lands in
  // spam or vanishes with no trace. _gotcha is Formspree's honeypot: a filled
  // value makes it silently discard the submission while still returning ok.
  // Alongside the guest's own words, attach the context the site already
  // knows - enhancements, Profiler signature, first-touch source - so the
  // owner's email carries the full picture without the guest retyping it.
  // Fall back to mailto only if the endpoint is unreachable.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const data = new FormData();
      data.set('name', name);
      data.set('email', email);
      data.set('message', message);
      data.set('_gotcha', company);

      const enh = readEvening();
      const cocktail = readCocktail();
      const src = readSource();
      if (enh.length) data.set('enhancements', enh.join(', '));
      if (cocktail) data.set('cocktail', cocktail);
      if (src) {
        data.set('source', src.source);
        data.set('landing_page', src.landing);
      }
      const subject =
        'Ice & Instinct inquiry' +
        (cocktail ? ' - ' + cocktail : '') +
        (enh.length ? ` - ${enh.length} enhancement${enh.length > 1 ? 's' : ''}` : '');
      data.set('_subject', subject);

      const res = await fetch('https://formspree.io/f/xpwkadgp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const out = (await res.json().catch(() => ({ ok: res.ok }))) as { ok?: boolean };
      if (res.ok && out.ok) {
        track('inquiry_submit', { method: 'inquire_form' });
        setStatus('sent');
      } else {
        track('inquiry_error');
        setStatus('error');
        mailtoFallback();
      }
    } catch {
      track('inquiry_error');
      setStatus('error');
      mailtoFallback();
    }
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

      {/* ONE segment = one viewport. The light Свет-1 framed card (as on
          /offerings/foundation/) holds the inquiry form, and the GLOBAL
          <SiteFooter/> sits at the floor at its standard, unchanged scale -
          identical to every other page. Only the card is compacted to fit one
          viewport (see .inquire-close); the footer is never rescaled. No public
          email is shown; Send hands off to the mail client. */}
      <main>
        <div className="closing-segment inquire-close" id="final-cta">
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
                {status === 'sent' ? (
                  <div className="inquire-sent" role="status">
                    <h3 className="closing-title" style={{ fontSize: 'var(--t-2xl)', margin: '0 0 0.6rem' }}>
                      Received.
                    </h3>
                    <p className="closing-lead" style={{ margin: 0 }}>
                      Your note is with us. A reply follows within one business day, personally.
                    </p>
                  </div>
                ) : (
                  <form className="inquire-form" onSubmit={onSubmit} onFocusCapture={onFormStart} noValidate>
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
                    {/* honeypot: off-screen, never seen or filled by a human */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                      <label>
                        Company
                        <input
                          type="text"
                          name="company"
                          tabIndex={-1}
                          autoComplete="off"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="inquire-form-foot">
                      <button type="submit" className="btn-primary" data-cursor="link" disabled={status === 'sending'}>
                        <span className="btn-label">{status === 'sending' ? 'Sending...' : 'Send the inquiry'}</span>
                        <span className="btn-arr" aria-hidden="true">&rarr;</span>
                      </button>
                    </div>
                  </form>
                )}
                <div
                  className="inquire-direct"
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    gap: '0.7rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--t-xs)',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--c-fg-faint)',
                  }}
                >
                  <span>Prefer to speak?</span>
                  <a href={`https://wa.me/19172927859?text=${waText}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)' }}>
                    WhatsApp
                  </a>
                  <span aria-hidden="true" style={{ opacity: 0.5 }}>&middot;</span>
                  <a href="tel:+19172927859" style={{ color: 'var(--c-accent)' }}>
                    Call
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

          <SiteFooter />
        </div>
      </main>
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
