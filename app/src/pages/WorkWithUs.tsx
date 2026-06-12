import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { SiteFooter } from '../sections/SiteFooter';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { track } from '../lib/track';

/* The bench intake: the hiring side of the ICE floor. /events/ sells the
 * bench to clients; this page recruits bartenders INTO it. Bartenders see
 * their pay here - never the client package prices. */

const PHONE_DISPLAY = '+1 917 292 7859';
const PHONE_TEL = 'tel:+19172927859';
const WA_HREF = 'https://wa.me/19172927859';

/* The working terms, one ledger - same anatomy as the /events/ package rows. */
const TERMS = [
  { label: '01', name: 'Flat pay', meta: '$180-240 per 4-hour event, by tier', value: '$180-240' },
  { label: '02', name: 'Same-day payout', meta: 'Zelle the evening of the event', value: 'Day of' },
  { label: '03', name: 'Your call', meta: 'Take or decline any gig - work for anyone else anytime', value: 'No minimums' },
  { label: '04', name: 'Real standard', meta: 'One 90-minute trial shift with the founder before your first event', value: 'One trial' },
];

/* What we look for - the quiet list. */
const LOOK_FOR = [
  '21 or older',
  'Event experience behind a bar',
  'Presentation - you look the part in a client’s home',
  'Punctuality - the bench arrives 45 minutes early',
  'Own basic tools - a plus, not a requirement',
  'Own liability coverage - a plus, or willingness to work under the venue’s.',
];

const EXPERIENCE_OPTIONS = ['0-2', '2-5', '5+'];
const TOOLS_OPTIONS = ['yes', 'no'];
const INSURANCE_OPTIONS = ['yes', 'no', 'not sure'];

export function WorkWithUs() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up), same as the tier pages.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.concierge', '#terms', '#look-for', '.closing-segment']);

  /* Hero ghost: a champagne light follows the cursor and lights the letters
     (same self-contained effect as the tier pages). */
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.concierge');
    const word = hero?.querySelector<HTMLElement>('.section-bg-word');
    if (!hero || !word) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = word.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      word.classList.toggle('is-lit', inside);
      if (inside) {
        word.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        word.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      }
    };
    const onLeave = () => word.classList.remove('is-lit');
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Application form state - mirrors the Contact.tsx mechanics exactly:
  // Formspree fetch POST, honeypot, field-level validation, quiet states.
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [tools, setTools] = useState('');
  const [insurance, setInsurance] = useState('');
  const [company, setCompany] = useState(''); // honeypot, hidden from humans
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // First focus on any bench form field fires bench_form_start once - same
  // pattern as Contact's onFocusCapture / inquiry_form_start guard.
  const formStarted = useRef(false);
  const onFormStart = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    track('bench_form_start');
  };

  // Field-level validation. The form is noValidate (browser bubbles clash with
  // the design), so an accidental click must be stopped HERE - same rule that
  // guards Contact against blank submissions reaching the owner's inbox.
  type FieldErrors = { name?: string; phone?: string; email?: string; experience?: string };
  const [errors, setErrors] = useState<FieldErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'Your name - so we know who is applying.';
    if (!phone.trim()) next.phone = 'A phone number we can call.';
    if (!email.trim()) next.email = 'An email we can reply to.';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'This email does not look complete.';
    if (!experience) next.experience = 'Pick the closest range.';
    setErrors(next);
    if (next.name) nameRef.current?.focus();
    else if (next.phone) phoneRef.current?.focus();
    else if (next.email) emailRef.current?.focus();
    else if (next.experience) experienceRef.current?.focus();
    return Object.keys(next).length === 0;
  };

  // Post the application to Formspree (same endpoint and mechanics as the
  // inquiry form). _gotcha is Formspree's honeypot: a filled value makes it
  // silently discard the submission while still returning ok. bench_apply
  // fires ONLY on a confirmed send - res.ok && out.ok, like Contact.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!validate()) return;
    setStatus('sending');
    try {
      const data = new FormData();
      data.set('name', name);
      data.set('phone', phone);
      data.set('email', email);
      data.set('experience', experience);
      if (tools) data.set('own_tools', tools);
      if (insurance) data.set('insurance', insurance);
      data.set('_gotcha', company);
      data.set('_subject', `Bench application - ${name}`);

      const res = await fetch('https://formspree.io/f/xpwkadgp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const out = (await res.json().catch(() => ({ ok: res.ok }))) as { ok?: boolean };
      if (res.ok && out.ok) {
        track('bench_apply');
        setStatus('sent');
      } else {
        track('bench_apply_error');
        setStatus('error');
      }
    } catch {
      track('bench_apply_error');
      setStatus('error');
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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Join the Bench</p>
          <ul className="va-list">
            <li><a href="/"><i>01</i><b>Home</b><em>The opening view</em></a></li>
            <li><a href="/offerings/"><i>02</i><b>Offerings</b><em>Four levels, one standard</em></a></li>
            <li><a href="/concierge/"><i>03</i><b>Concierge</b><em>Five enhancements</em></a></li>
            <li><a href="/my-story/"><i>04</i><b>My Story</b><em>Teimuraz Benidze</em></a></li>
            <li><a href="/gallery/"><i>05</i><b>The Collection</b><em>Thirteen compositions</em></a></li>
            <li><a href="/contact/"><i>06</i><b>Inquire</b><em>Begin the conversation</em></a></li>
          </ul>
          <footer className="va-foot">
            <span>New York Metropolitan Area / By Appointment</span>
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
            <a href="/contact/" className="nav-cta">Inquire</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO - Concierge 50/50 technique, static photo (monochrome at rest) */}
        <section className="concierge ww-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">THE BENCH</span>
            <span className="hg-glow">THE BENCH</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                Join the <span className="it">bench</span>
              </h1>
              <p className="concierge-lead">
                Ice &amp; Instinct keeps a small, vetted bench of event bartenders across NYC and New Jersey. When a
                client books an evening, we call the bench. You take the gigs you want - no minimums, no schedules,
                no exclusivity.
              </p>
              <span className="price">
                $180-240 flat
                <small>Per 4-hour event &middot; Same-day Zelle payout</small>
              </span>
              <a href="#apply" className="concierge-link">
                Apply below <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/icon-staff.jpg"
                alt="A bartender in a white shirt working behind a private event bar"
                loading="eager"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE TERMS - light ledger, four flat rows (the events ledger anatomy) */}
        <section className="oma-ledger" id="terms">
          <div className="oma-ledger-wrap">
            <div className="oma-ledger-left reveal">
              <span className="oma-ledger-eye">I &middot; The Terms</span>
              <h2>
                Flat pay. <span className="it">Same day.</span>
              </h2>
              <p className="oma-ledger-desc">
                The terms are the same for everyone on the bench, agreed before your first event. No tip pooling
                games, no waiting two weeks for a check.
              </p>
            </div>
            <div className="oma-ledger-rows reveal">
              {TERMS.map((t) => (
                <div className="oma-ledger-row" key={t.label}>
                  <span className="lbl">{t.label}</span>
                  <span className="info">
                    <span className="nm">{t.name}</span>
                    <span className="cap">{t.meta}</span>
                  </span>
                  <span className="pr">{t.value}</span>
                </div>
              ))}
              <p className="ww-note">Tier placement is set at the trial shift and reviewed as you work.</p>
            </div>
          </div>
        </section>

        {/* II. WHAT WE LOOK FOR - dark panel, one quiet list */}
        <section className="oma-panel dark" id="look-for">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; The Standard</span>
              <h2 className="oma-panel-h">
                What we <span className="it">look for.</span>
              </h2>
              <p className="oma-panel-intro">
                The bench is small on purpose. Every name on it passed one trial shift with the founder.
              </p>
            </header>
            <ul className="ww-look">
              {LOOK_FOR.map((item, i) => (
                <li key={item}>
                  <span className="ww-look-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ww-look-t">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* III. THE APPLICATION - framed card + footer, the Contact closing pattern */}
      <div className="closing-segment oma-close ww-close" id="apply">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">THE BENCH</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / Join the Bench</span>
              {/* On success the card transforms whole: the form gives way to a
                  quiet confirmation - no two states stacked. */}
              {status === 'sent' ? (
                <div className="ww-sent" role="status">
                  <h2 className="closing-title">
                    Received.
                  </h2>
                  <p className="closing-lead">We will call you within two days.</p>
                </div>
              ) : (
                <>
                  <h2 className="closing-title">
                    Put your name <span className="it">down.</span>
                  </h2>
                  <p className="closing-lead">
                    Six fields, two minutes. If it reads right, the next step is a call and a trial shift.
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
                      <label className={'inquire-field' + (errors.phone ? ' is-invalid' : '')}>
                        <span className="inquire-label">Phone</span>
                        <input
                          ref={phoneRef}
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((p) => ({ ...p, phone: undefined })); }}
                          autoComplete="tel"
                          aria-invalid={!!errors.phone}
                          required
                        />
                        {errors.phone && <span className="inquire-err" role="alert">{errors.phone}</span>}
                      </label>
                    </div>
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
                    <div className="inquire-row ww-row-3">
                      <label className={'inquire-field' + (errors.experience ? ' is-invalid' : '')}>
                        <span className="inquire-label">Years of experience</span>
                        <select
                          ref={experienceRef}
                          name="experience"
                          value={experience}
                          onChange={(e) => { setExperience(e.target.value); if (errors.experience) setErrors((p) => ({ ...p, experience: undefined })); }}
                          className={experience ? undefined : 'is-empty'}
                          aria-invalid={!!errors.experience}
                          required
                        >
                          <option value="">Years</option>
                          {EXPERIENCE_OPTIONS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                        {errors.experience && <span className="inquire-err" role="alert">{errors.experience}</span>}
                      </label>
                      <label className="inquire-field">
                        <span className="inquire-label">Own tools</span>
                        <select
                          name="own_tools"
                          value={tools}
                          onChange={(e) => setTools(e.target.value)}
                          className={tools ? undefined : 'is-empty'}
                        >
                          <option value="">Own tools</option>
                          {TOOLS_OPTIONS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </label>
                      <label className="inquire-field">
                        <span className="inquire-label">Insurance</span>
                        <select
                          name="insurance"
                          value={insurance}
                          onChange={(e) => setInsurance(e.target.value)}
                          className={insurance ? undefined : 'is-empty'}
                        >
                          <option value="">Insurance</option>
                          {INSURANCE_OPTIONS.map((o) => (
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
                        <span className="btn-label">{status === 'sending' ? 'Sending...' : 'Apply to the bench'}</span>
                        <span className="btn-arr" aria-hidden="true">&rarr;</span>
                      </button>
                    </div>
                    {status === 'error' && (
                      <p className="ww-error" role="alert">
                        It did not go through. Try once more, or text us: <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
                      </p>
                    )}
                  </form>
                </>
              )}
              <p className="inquire-deposit ww-questions">
                Questions first? Text or <a href={WA_HREF} target="_blank" rel="noopener noreferrer">WhatsApp</a>{' '}
                <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
              </p>
            </div>
            <p className="closing-meta">
              <span>The bench</span>
              <span>NYC Metro &amp; New Jersey</span>
              <span>Est. 2024</span>
            </p>
          </div>
        </section>

        <SiteFooter embedded />
      </div>
    </>
  );
}
