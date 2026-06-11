import { SiteFooter } from '../sections/SiteFooter';
import markUrl from '../assets/ii-mark.png';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { readEvening, useEvening } from '../lib/evening';
import { readCocktail, readSource } from '../lib/leadContext';
import { track } from '../lib/track';

const BODY_CLASSES = ['cinema-chrome'];

const EMAIL = 'alchemyandice.nyc@gmail.com';

// The qualification selects offer fixed vocabularies; the occasion list also
// validates the ?occasion= prefill (e.g. /contact/?occasion=wedding) so an
// arbitrary URL value can never land in the form.
const GUEST_COUNTS = ['up to 15', '15-40', '40+'];
const OCCASIONS = ['private dinner', 'birthday', 'wedding', 'corporate', 'other'];

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
  // Optional qualification - they sharpen the reply, never gate the send.
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [occasion, setOccasion] = useState('');
  const [company, setCompany] = useState(''); // honeypot, hidden from humans
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const [evening] = useEvening();
  const formStarted = useRef(false);
  const onFormStart = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    track('inquiry_form_start');
  };

  // Field-level validation. The form is noValidate (browser bubbles clash with
  // the design), so an accidental click must be stopped HERE - an empty
  // submission once reached the owner's inbox as a blank email.
  type FieldErrors = { name?: string; email?: string; message?: string };
  const [errors, setErrors] = useState<FieldErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'Your name - so I know who to write back to.';
    if (!email.trim()) next.email = 'An email I can reply to.';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'This email does not look complete.';
    if (!message.trim()) next.message = 'A few words about the evening - the date, the room, the guest count.';
    setErrors(next);
    if (next.name) nameRef.current?.focus();
    else if (next.email) emailRef.current?.focus();
    else if (next.message) messageRef.current?.focus();
    return Object.keys(next).length === 0;
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

    // ?occasion=wedding preselects the occasion field. leadContext.ts only
    // persists first-touch attribution (utm/source), so this page-level intent
    // param is read directly here, the same way ?cocktail= and ?enhancements=
    // already are.
    const occ = (q.get('occasion') || '').trim().toLowerCase();
    if (OCCASIONS.includes(occ)) setOccasion(occ);

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
    if (!validate()) return;
    setStatus('sending');
    try {
      const data = new FormData();
      data.set('name', name);
      data.set('email', email);
      data.set('message', message);
      data.set('_gotcha', company);
      if (eventDate) data.set('event_date', eventDate);
      if (guestCount) data.set('guest_count', guestCount);
      if (occasion) data.set('occasion', occasion);

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
        track('inquiry_submit', { method: 'inquire_form', occasion: occasion || 'unspecified' });
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
                <img src={markUrl} alt="" aria-hidden="true" width={34} height={34} draggable={false} />
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
                {/* After sending, the card transforms whole: the invitation
                    headline gives way to the confirmation - no two headlines
                    stacked on top of each other. */}
                {status === 'sent' ? (
                  <div className="inquire-sent" role="status">
                    <h2 className="closing-title">
                      Received, <span className="it">with thanks.</span>
                    </h2>
                    <p className="closing-lead">
                      Your note is with me. I read every inquiry personally and reply within one
                      business day - usually sooner.
                    </p>
                    <p className="closing-lead" style={{ marginTop: '0.4rem' }}>
                      If the evening is close, reach me directly below.
                    </p>
                  </div>
                ) : (
                  <>
                  <h2 className="closing-title">
                    Begin the <span className="it">conversation.</span>
                  </h2>
                  <p className="closing-lead">
                    Tell us the date, the room, and the guest count. A reply follows within one
                    business day, personally.
                  </p>
                  {/* action/method are the no-JS fallback: if React never
                      hydrates, the browser still posts straight to Formspree.
                      With JS, onSubmit preventDefaults and fetches as before. */}
                  <form
                    className="inquire-form"
                    action="https://formspree.io/f/xpwkadgp"
                    method="POST"
                    onSubmit={onSubmit}
                    onFocusCapture={onFormStart}
                    noValidate
                  >
                    <div className="inquire-row">
                      <label className={'inquire-field' + (errors.name ? ' is-invalid' : '')}>
                        <span className="inquire-label">Name</span>
                        <input
                          ref={nameRef}
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          required
                        />
                        {errors.name && <span className="inquire-err" role="alert">{errors.name}</span>}
                      </label>
                      <label className={'inquire-field' + (errors.email ? ' is-invalid' : '')}>
                        <span className="inquire-label">Email</span>
                        <input
                          ref={emailRef}
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          required
                        />
                        {errors.email && <span className="inquire-err" role="alert">{errors.email}</span>}
                      </label>
                    </div>
                    <label className={'inquire-field' + (errors.message ? ' is-invalid' : '')}>
                      <span className="inquire-label">Message</span>
                      <textarea
                        ref={messageRef}
                        name="message"
                        rows={3}
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }}
                        placeholder="The evening you have in mind - the date, the room, the guest count."
                        aria-invalid={!!errors.message}
                        required
                      />
                      {errors.message && <span className="inquire-err" role="alert">{errors.message}</span>}
                    </label>
                    {/* Optional refinements - quiet, secondary, never required. */}
                    <div className="inquire-row inquire-row-optional">
                      <label className="inquire-field">
                        <span className="inquire-label">Event date (if known)</span>
                        <input
                          type="date"
                          name="event_date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                        />
                      </label>
                      <label className="inquire-field">
                        <span className="inquire-label">Guest count</span>
                        <select
                          name="guest_count"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className={guestCount ? undefined : 'is-empty'}
                        >
                          <option value="">Guest count</option>
                          {GUEST_COUNTS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </label>
                      <label className="inquire-field">
                        <span className="inquire-label">Occasion</span>
                        <select
                          name="occasion"
                          value={occasion}
                          onChange={(e) => setOccasion(e.target.value)}
                          className={occasion ? undefined : 'is-empty'}
                        >
                          <option value="">Occasion</option>
                          {OCCASIONS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </label>
                    </div>
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
                    <p className="inquire-deposit">
                      A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.
                    </p>
                  </form>
                  </>
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
