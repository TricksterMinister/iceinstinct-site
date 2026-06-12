import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { SiteFooter } from '../sections/SiteFooter';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

/* EMAIL SWAP: hello@iceinstinct.com is planned but NOT live yet. When the
 * mailbox goes live, set PRESS_EMAIL to 'hello@iceinstinct.com' and the
 * press-contact block renders the mailto link automatically. Until then,
 * press inquiries route through the form + phone. */
const PRESS_EMAIL: string | null = null;
const PRESS_PHONE_DISPLAY = '+1 917 292 7859';
const PRESS_PHONE_TEL = 'tel:+19172927859';
const INQUIRY_URL = '/contact/';

const BIO_SHORT =
  'Teimuraz Benidze is the founder and Flavor Architect of Ice & Instinct, a private mixology studio serving the New York metropolitan area and New Jersey. The first certified sommelier in Georgia’s history, he brings three decades of wine and service to a single discipline: cocktails composed in the room, for the room.';

const BIO_LONG_PARAS = [
  'Teimuraz Benidze spent three decades in wine and service, the last ten of them in New York since 2016, before founding Ice & Instinct in 2024. The first certified sommelier in Georgia’s history, he holds four credentials: a Certificat in Wine & Sommellerie from Chateau-Arnoux, France; Leading Qualified Sommelier with the Georgian Sommelier Association (ASI); a Diploma in Wines & Spirits from Enotria Wine World, Moscow; and French Wine Studies with O.N.I.VINS.',
  'Ice & Instinct applies that discipline to cocktails. The studio serves the New York metropolitan area and New Jersey by appointment, in four tiers from The Foundation at $650 to Omakase Improvisation from $3,000 - the no-menu evening the studio defined as its own niche, where the menu is composed live for the room. Professional clear ice is the standard at every tier, the collection holds thirteen signature cocktails, and a team of trusted New York bartenders scales the service from a solo performance to a full bar team for weddings and galas. His title at the studio is Founder & Flavor Architect; it describes the work.',
];

const FACTS: { k: string; v: string; href?: string }[] = [
  { k: 'Founded', v: '2024' },
  {
    k: 'Founder',
    v: 'Teimuraz Benidze, Founder & Flavor Architect - the first certified sommelier in Georgia’s history',
  },
  {
    k: 'Model',
    v: 'Private mixology studio, by appointment only. The bar is built in the client’s room and run end to end. Spirits are not included: the host provides them, or they are purchased at supplier cost.',
  },
  {
    k: 'Tiers',
    v: 'The Foundation from $650 (up to 15 guests, 3 hours) · Perfection in Simplicity from $900 (up to 12 guests, 4 hours) · Bespoke Design & Artistry from $1,800 (up to 30 guests, 4 hours) · Omakase Improvisation from $3,000+ (open-ended)',
  },
  { k: 'Service area', v: 'New York metropolitan area and New Jersey' },
  { k: 'Deposit', v: 'Flat $500. Refundable until 14 days before the event; transferable for 12 months.' },
  { k: 'Clear ice', v: 'Professional clear ice is the standard at every tier' },
  { k: 'Signatures', v: '13 signature cocktails - The Collection', href: '/gallery/' },
  { k: 'Instagram', v: '@iceinstinctnyc', href: 'https://www.instagram.com/iceinstinctnyc/' },
  { k: 'Phone / WhatsApp', v: PRESS_PHONE_DISPLAY, href: PRESS_PHONE_TEL },
];

type PressAsset = {
  name: string;
  meta: string;
  href: string;
  /** thumbnail for image assets; PDFs render a mono mark instead */
  thumb?: string;
};

const IMAGE_ASSETS: PressAsset[] = [
  {
    name: 'Founder portrait',
    meta: 'Teimuraz Benidze · PNG',
    href: '/assets/photos/founder-teimuraz.png',
    thumb: '/assets/photos/thumbs/founder-teimuraz.jpg',
  },
  {
    name: 'The craft - clear ice',
    meta: 'Brand photography · JPG',
    href: '/assets/photos/duality-ice.jpg',
    thumb: '/assets/photos/thumbs/duality-ice.jpg',
  },
  {
    name: 'White Lotus',
    meta: 'Signature cocktail · PNG',
    href: '/assets/photos/white-lotus-v2.png',
    thumb: '/assets/photos/thumbs/white-lotus-v2.jpg',
  },
  {
    name: 'Black Truffle Martini',
    meta: 'Signature cocktail · PNG',
    href: '/assets/photos/black-truffle-v2.png',
    thumb: '/assets/photos/thumbs/black-truffle-v2.jpg',
  },
  {
    name: 'Aviation',
    meta: 'Signature cocktail · PNG',
    href: '/assets/photos/aviation-v2.png',
    thumb: '/assets/photos/thumbs/aviation-v2.jpg',
  },
];

const DOCUMENT_ASSETS: PressAsset[] = [
  { name: 'Media kit', meta: 'Full press kit · PDF', href: '/assets/press/media-kit.pdf' },
  { name: 'Planner one-pager', meta: 'For event planners · PDF', href: '/assets/press/planner-onepager.pdf' },
];

export function Press() {
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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Press &amp; Media</p>
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
        {/* HERO - Concierge 50/50 technique; founder portrait on the right.
            Section 1 of the brief: what the studio is, and the story angle. */}
        <section className="concierge">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">PRESS</span>
            <span className="hg-glow">PRESS</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <a href="/" className="concierge-back">&larr; Home</a>
              <h1 className="concierge-headline">
                Press &amp; <span className="it">media.</span>
              </h1>
              <p className="concierge-lead">
                Ice &amp; Instinct is a private mixology studio founded in 2024, serving the New York metropolitan
                area and New Jersey by appointment. One alchemist leads; a team of trusted New York bartenders scales
                the evening from a solo performance to weddings and galas.
              </p>
              <p className="press-angle">
                The story: cocktail omakase - the no-menu evening, a niche the studio defined - and the sommelier who
                became a flavor architect. Background reading:{' '}
                <a href="/journal/cocktail-omakase-explained/" data-cursor="link">Cocktail Omakase, Explained</a>.
              </p>
              <span className="price">
                Est. 2024
                <small>NYC Metro &amp; New Jersey &middot; By appointment</small>
              </span>
              <a href="#bios" className="concierge-link">
                Bios &amp; fact sheet <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <img
                src="/assets/photos/founder-teimuraz.png"
                alt="Teimuraz Benidze, founder of Ice & Instinct, in a dark room behind the bar"
              />
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE BIOS - short and long, both quotable verbatim */}
        <section className="press-bios" id="bios">
          <div className="press-wrap reveal">
            <header className="press-head">
              <span className="press-eyebrow">I &middot; The Bios</span>
              <h2 className="press-title">
                Two bios, <span className="it">ready to quote.</span>
              </h2>
              <p className="press-lead">
                Both versions may be quoted verbatim, in full or in part. No sign-off needed.
              </p>
            </header>
            <div className="press-bio-grid">
              <article className="press-bio-card">
                <span className="pb-label">Short bio &middot; quotable verbatim</span>
                <p className="pb-body">{BIO_SHORT}</p>
              </article>
              <article className="press-bio-card">
                <span className="pb-label">Long bio &middot; quotable verbatim</span>
                {BIO_LONG_PARAS.map((p) => (
                  <p className="pb-body" key={p.slice(0, 24)}>{p}</p>
                ))}
              </article>
            </div>
          </div>
        </section>

        {/* II. THE FACT SHEET - a ledger of checkable facts */}
        <section className="press-facts" id="facts">
          <div className="press-wrap reveal">
            <header className="press-head">
              <span className="press-eyebrow">II &middot; The Fact Sheet</span>
              <h2 className="press-title">
                The facts, <span className="it">checkable.</span>
              </h2>
              <p className="press-lead">Every line below is current and safe to print.</p>
            </header>
            <dl className="press-ledger">
              {FACTS.map((f) => (
                <div className="press-row" key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>
                    {f.href ? (
                      <a
                        href={f.href}
                        data-cursor="link"
                        {...(f.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {f.v}
                      </a>
                    ) : (
                      f.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* III. THE ASSETS - high-res downloads + the two documents */}
        <section className="press-assets" id="assets">
          <div className="press-wrap reveal">
            <header className="press-head">
              <span className="press-eyebrow">III &middot; The Assets</span>
              <h2 className="press-title">
                Images &amp; <span className="it">documents.</span>
              </h2>
              <p className="press-lead">
                High-resolution originals, free to publish with credit to Ice &amp; Instinct.
              </p>
            </header>
            <div className="press-asset-grid">
              {IMAGE_ASSETS.map((a) => (
                <a className="press-asset" href={a.href} download data-cursor="link" key={a.href}>
                  <span className="pa-thumb">
                    <img src={a.thumb} alt={a.name} loading="lazy" />
                  </span>
                  <span className="pa-name">{a.name}</span>
                  <span className="pa-meta">{a.meta}</span>
                  <span className="pa-act">Download <span aria-hidden="true">&darr;</span></span>
                </a>
              ))}
            </div>
            <div className="press-doc-row">
              {DOCUMENT_ASSETS.map((d) => (
                <a className="press-doc" href={d.href} data-cursor="link" key={d.href}>
                  <span className="pd-mark" aria-hidden="true">PDF</span>
                  <span className="pd-text">
                    <span className="pa-name">{d.name}</span>
                    <span className="pa-meta">{d.meta}</span>
                  </span>
                  <span className="pa-act">Download <span aria-hidden="true">&darr;</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* IV. PRESS CONTACT - framed CTA + footer, the offering closing pattern */}
      <div className="closing-segment oma-close" id="press-contact">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">PRESS</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / Press contact</span>
              <h2 className="closing-title">
                Writing <span className="it">about us?</span>
              </h2>
              <p className="closing-lead">
                Interviews, image requests, fact checks - send a short note through the inquiry form
                {PRESS_EMAIL ? (
                  <>
                    , write to <a href={`mailto:${PRESS_EMAIL}`}>{PRESS_EMAIL}</a>,
                  </>
                ) : null}{' '}
                or call directly.
                <br />
                We respond within one business day.
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href={INQUIRY_URL} data-cursor="link">
                  <span className="btn-label">Send an inquiry</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </a>
                <a className="btn-ghost" href={PRESS_PHONE_TEL} data-cursor="link">
                  {PRESS_PHONE_DISPLAY}
                </a>
              </div>
              <p className="closing-deposit">
                Phone and WhatsApp share one number. For background on the founder, see{' '}
                <a href="/my-story/">My Story</a>.
              </p>
            </div>
            <p className="closing-meta">
              <span>By appointment only</span>
              <span>New York Metropolitan Area &amp; New Jersey</span>
              <span>Est. 2024</span>
            </p>
          </div>
        </section>

        <SiteFooter embedded />
      </div>
    </>
  );
}
