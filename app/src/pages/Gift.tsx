import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { SiteFooter } from '../sections/SiteFooter';
import { Closing } from '../sections/Closing';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { track } from '../lib/track';

/* Stripe Payment Links (live, Ice & Instinct account). Each card CTA points
 * straight to checkout; null would fall back to the inquiry form. */
type GiftTier = 'foundation' | 'simplicity';
const STRIPE_LINKS: Record<GiftTier, string | null> = {
  foundation: 'https://buy.stripe.com/6oU28rg6d0yVeRKcEnew800',
  simplicity: 'https://buy.stripe.com/3cI9AT6vD81ncJCdIrew801',
};
const GIFT_FALLBACK = '/contact/?occasion=gift';
const giftHref = (tier: GiftTier) => STRIPE_LINKS[tier] ?? GIFT_FALLBACK;

type Voucher = {
  tier: GiftTier;
  num: string;
  name: string;
  nameIt: string;
  price: string;
  priceMeta: string;
  body: string;
  terms: { k: string; v: string }[];
};

const VOUCHERS: Voucher[] = [
  {
    tier: 'foundation',
    num: 'i.',
    name: 'The Foundation',
    nameIt: 'evening.',
    price: '$650',
    priceMeta: 'Up to 15 guests · 3 hours',
    body:
      'A trusted bartender from the founder’s own circle builds the bar in the recipient’s home and runs the evening end to end. Every cocktail is made in real time, over professional clear ice, with seamless service from first pour to final glass.',
    terms: [
      { k: 'Validity', v: '12 months from purchase' },
      { k: 'Date', v: 'Transferable, subject to calendar availability' },
      { k: 'Spirits', v: 'Provided by the host, or purchased at supplier cost' },
    ],
  },
  {
    tier: 'simplicity',
    num: 'ii.',
    name: 'Perfection in Simplicity',
    nameIt: 'evening.',
    price: '$900',
    priceMeta: 'Up to 12 guests · 4 hours',
    body:
      'Timeless cocktails executed with quiet precision - a masterful solo performance for a tighter room and a longer evening. The classics, made the way they were meant to be made, one guest at a time.',
    terms: [
      { k: 'Validity', v: '12 months from purchase' },
      { k: 'Date', v: 'Transferable, subject to calendar availability' },
      { k: 'Spirits', v: 'Provided by the host, or purchased at supplier cost' },
    ],
  },
];

const STEPS = [
  {
    title: 'The purchase',
    body: 'Choose the voucher and send a short inquiry. We confirm the evening, the dedication, and the details within one business day.',
  },
  {
    title: 'The certificate',
    body: 'The framed certificate is prepared with the recipient’s name and delivered to you, ready to be given.',
  },
  {
    title: 'The date',
    body: 'The recipient books their evening through the private calendar - any available date within twelve months of purchase.',
  },
  {
    title: 'The evening',
    body: 'We arrive, build the bar, and run the evening end to end. The recipient hosts; everything else is handled.',
  },
];

const FAQS = [
  {
    q: 'When does a gift voucher expire?',
    a: 'Twelve months from the date of purchase. The recipient chooses any available date within that window through the private calendar.',
  },
  {
    q: 'Is the voucher transferable?',
    a: 'Yes. Both the date and the recipient can change. Scheduling is subject to calendar availability, so booking early is the safest way to secure a specific date.',
  },
  {
    q: 'Can the recipient upgrade to a higher tier?',
    a: 'Yes. A voucher can be applied toward Bespoke Design & Artistry or Omakase Improvisation by paying the difference when the evening is booked.',
  },
];

export function Gift() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();

  /* Hero ghost: a champagne light follows the cursor and lights the letters
     (same technique as the tier pages). */
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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Gift an Evening</p>
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
        {/* HERO - Concierge 50/50 technique, photo instead of video.
            std-hero applies the canonical photo law (monochrome at rest). */}
        <section className="concierge std-hero">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">GIFT</span>
            <span className="hg-glow">GIFT</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <a href="/" className="concierge-back">&larr; Home</a>
              <h1 className="concierge-headline">
                Gift an <span className="it">evening.</span>
              </h1>
              <p className="concierge-lead">
                A private mixologist, given as an object. The bar is built in their home, the cocktails are made in
                real time, and the date is theirs to choose.
              </p>
              <span className="price">
                From $650 USD
                <small>Two vouchers · Valid 12 months · NYC Metro &amp; New Jersey</small>
              </span>
              <a href="#vouchers" className="concierge-link">
                Choose a voucher <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/white-lotus-v2.png"
                alt="A pale, composed cocktail on clear ice, set against a dark room"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE VOUCHERS - two evenings, fixed price, given whole */}
        <section className="gift-vouchers" id="vouchers">
          <div className="gift-vouchers-wrap reveal">
            <header className="gift-head">
              <span className="gift-eyebrow">I &middot; The Vouchers</span>
              <h2 className="gift-title">
                Two evenings, <span className="it">given whole.</span>
              </h2>
              <p className="gift-lead">
                A voucher holds one complete evening at a fixed level - nothing to configure, nothing to explain. The
                recipient receives the standard; the calendar does the rest.
              </p>
            </header>
            <div className="gift-grid">
              {VOUCHERS.map((v) => (
                <article className="gift-card" key={v.tier}>
                  <span className="gc-num" aria-hidden="true">{v.num}</span>
                  <h3 className="gc-name">
                    {v.name} <span className="it">{v.nameIt}</span>
                  </h3>
                  <span className="gc-price">
                    {v.price}
                    <small>{v.priceMeta}</small>
                  </span>
                  <p className="gc-body">{v.body}</p>
                  <dl className="gc-terms">
                    {v.terms.map((t) => (
                      <div className="gc-term" key={t.k}>
                        <dt>{t.k}</dt>
                        <dd>{t.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    className="btn-primary gc-cta"
                    href={giftHref(v.tier)}
                    data-cursor="link"
                    onClick={() => track('gift_click', { tier: v.tier })}
                  >
                    <span className="btn-label">Arrange a gift</span>
                    <span className="btn-arr" aria-hidden="true">&rarr;</span>
                  </a>
                </article>
              ))}
            </div>
            <p className="gift-foot">
              Either voucher can later be applied toward a higher tier - Bespoke Design &amp; Artistry or Omakase
              Improvisation - by paying the difference when the evening is booked.
            </p>
          </div>
        </section>

        {/* II. THE CERTIFICATE - the object you hand over */}
        <section className="tier-section oma-fmt3" id="certificate">
          <div className="oma-fmt3-ghost" aria-hidden="true">Certificate</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">II &middot; The Certificate</span>
              <h2 className="oma-fmt3-title">
                The object you <span className="it">hand over.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                A gift of this kind should not arrive as a code in an email. It arrives as a framed certificate:
                heavyweight stock, the recipient&apos;s name set by hand, the chosen evening named in full, the frame
                ready to stand on a shelf until the date is set.
              </p>
              <p>
                It is made to be handed across a table. Before a single cocktail is poured, the recipient holds
                something finished - quiet proof that an evening has already been set aside for them, and that nothing
                about it is left to chance.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              The gift is an evening. <span className="it">The certificate is the proof.</span>
            </p>
            <p className="oma-fmt3-foot">Delivery of the certificate is arranged with you when the gift is confirmed.</p>
          </div>
        </section>

        {/* III. HOW IT WORKS - plain 4-step ledger */}
        <section className="oma-panel dark" id="how-it-works">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">III &middot; The Sequence</span>
              <h2 className="oma-panel-h">
                How it <span className="it">works.</span>
              </h2>
              <p className="oma-panel-intro">Four steps between the decision and the first pour.</p>
            </header>
            <ol className="oma-steps">
              {STEPS.map((s, i) => (
                <li className="oma-step" key={s.title}>
                  <span className="oma-step-n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="oma-step-body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* IV. FAQ - the gift ledger, three honest answers */}
        <section className="faq" id="faq">
          <div className="section-bg-word right" aria-hidden="true">GIVEN</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Before</span>
                <span className="it">you give.</span>
              </h2>
              <p className="faq-lead">The honest answers, plainly given.</p>
            </header>
            <ul className="faq-list">
              {FAQS.map((item, i) => (
                <li className="faq-item" key={item.q}>
                  <details className="faq-details">
                    <summary className="faq-q" data-cursor="link">
                      <span className="faq-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-q-mark" aria-hidden="true"></span>
                    </summary>
                    <div className="faq-a">
                      <p>{item.a}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* CLOSING - framed CTA + footer, the offering closing pattern */}
      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="GIVE" title="Give" titleEm="the evening." lead="A private bar is the rare gift no one expects and everyone remembers. Tell us who it is for." />

        <SiteFooter embedded />
      </div>
    </>
  );
}
