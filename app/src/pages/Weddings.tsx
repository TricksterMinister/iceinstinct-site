import { useEffect, useRef } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { SiteFooter } from '../sections/SiteFooter';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';

/**
 * /weddings/ - wedding bar service page. Reuses the offering-page design
 * systems (concierge 50/50 hero, oma-fmt3 prose, oma-panel timelines and
 * grids, the sitewide faq ledger and closing segment). No new design
 * language; only the content is wedding-specific.
 */

/* The hero loop downloads on desktop only: the effect below attaches this src
   when the viewport is wide enough and motion is allowed. Phones keep the
   poster frame and never fetch the mp4. */
const WEDDING_LOOP_SRC = '/assets/video/wedding-loop-v1.mp4';

// FAQ content rendered below AND mirrored 1:1 in the FAQPage JSON-LD inside
// app/weddings/index.html. Edit both together.
const WEDDING_FAQS = [
  {
    q: 'How far in advance should we book?',
    a: 'As early as your date is fixed. A flat $500 deposit holds the date - fully refundable until 14 days before the evening, transferable for 12 months. Shorter timelines are often possible; ask, and we will tell you honestly what we can do.',
  },
  {
    q: 'How many guests can you serve?',
    a: 'Any tier scales with a full bar team for weddings. Staffing follows the room - roughly one bartender per 40 to 50 guests - and is quoted per event, in writing, before you commit.',
  },
  {
    q: 'What is included?',
    a: 'The bar team and professional tools, with setup, service, and breakdown handled end to end. Professional clear ice is arranged separately through the Concierge, at supplier cost. His-and-hers signature cocktails are designed through the Bespoke Design & Artistry flow, with menu cards included.',
  },
  {
    q: 'Is alcohol included in the price?',
    a: 'No. The price covers the craft, service, and expertise. You may provide the spirits and wine yourself, or we handle the entire purchase on your behalf at supplier cost.',
  },
  {
    q: 'Can you serve guests who do not drink?',
    a: 'Yes. A full zero-proof program runs beside the main menu - the same clear ice, the same technique, the same glassware. A guest holding a zero-proof cocktail is never made to feel they were given less.',
  },
  {
    q: 'Where do you travel?',
    a: 'Manhattan, Brooklyn, Westchester, the Hamptons, Greenwich, and North New Jersey. Our New Jersey home base means no Manhattan vendor logistics premium. Events further out are welcome - travel is included in your private quote.',
  },
];

export function Weddings() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();

  /* Hero loop: desktop-only download. The <video> ships without src so small
     screens hold the poster and never spend the 1.5MB+; the src attaches here
     only on wide viewports with motion allowed. lib/videoIdle.ts observes the
     same element (data-idle-video) and its play() calls are caught, so a
     src-less video on mobile never throws. */
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.src = WEDDING_LOOP_SRC;
    video.play().catch(() => { /* autoplay policy - poster stays */ });
  }, []);

  /* Hero ghost: a champagne light follows the cursor and lights the letters
     (same behaviour as the offering-tier heroes). */
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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Weddings</p>
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
        {/* HERO - concierge 50/50 technique, wedding loop on the right */}
        <section className="concierge">
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">WEDDINGS</span>
            <span className="hg-glow">WEDDINGS</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <h1 className="concierge-headline">
                One day. <span className="it">One standard.</span>
              </h1>
              <p className="concierge-lead">
                A wedding multiplies everything - the guests, the pace, the weight of a single glass.
                The bar should hold. We bring the same craft that runs our private evenings, carried
                by a full professional team, so the two hundredth pour tastes like the first.
              </p>
              <span className="price">
                From $650 USD
                <small>Any tier scales with a full bar team &middot; NYC Metro &amp; New Jersey</small>
              </span>
              <a href="/contact/?occasion=wedding" className="concierge-link">
                Inquire for your date <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <video
                ref={heroVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/assets/video/wedding-poster-v1.jpg"
                aria-label="A wedding toast, cocktails catching the light"
                data-idle-video=""
              ></video>
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. THE SCALED TEAM */}
        <section className="tier-section oma-fmt3" id="team">
          <div className="oma-fmt3-ghost" aria-hidden="true">Team</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; The Scaled Team</span>
              <h2 className="oma-fmt3-title">
                One standard, <span className="it">multiplied.</span>
              </h2>
            </header>
            <div className="oma-fmt3-cols">
              <p>
                Every Ice &amp; Instinct tier scales for a wedding - from The Foundation at $650 to
                Omakase Improvisation. The lead does not change: Teimuraz Benidze, certified
                sommelier, a quarter-century in hospitality. Around him, a team of trusted New York
                bartenders, briefed on your menu, your timeline, and your standard.
              </p>
              <p>
                Staffing follows the room, not a formula sheet: roughly one bartender per 40 to 50
                guests, quoted per event. A ceremony of sixty and a reception of two hundred are
                different evenings, and they are priced as such - precisely, in writing, before you
                commit. What does not change is the craft: professional clear ice, arranged through the Concierge, real
                technique at every station, and a service rhythm set so the bar never becomes the
                queue your guests remember.
              </p>
            </div>
            <p className="oma-fmt3-pull">
              The evening we pour for twelve, <span className="it">held steady for two hundred.</span>
            </p>
            <p className="oma-fmt3-foot">Staffing ratios are confirmed in your written quote.</p>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="oma-pause" aria-hidden="true">
          <p className="oma-pause-text">Same standard,<br /><em>multiplied.</em></p>
          <span className="oma-pause-mark">WEDDINGS</span>
        </section>

        {/* II. HIS-AND-HERS SIGNATURES - dark timeline */}
        <section className="oma-panel dark" id="signatures">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">II &middot; His &amp; Hers</span>
              <h2 className="oma-panel-h">
                Two signatures, <span className="it">one story.</span>
              </h2>
              <p className="oma-panel-intro">
                Through the Bespoke Design &amp; Artistry flow, two signature cocktails are designed
                around the couple - one for each of you, or one for each chapter of the story.
                Menu cards are included.
              </p>
            </header>
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>The conversation</h3>
                  <p>
                    Before any recipe, we listen. How you met, what you drink, what you refuse to
                    drink, the place or season the marriage belongs to. The brief comes from the
                    couple, not a template.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>The design</h3>
                  <p>
                    Two signatures are composed - structure, glassware, garnish, and name considered
                    as one. Each drink should be unmistakably yours, and still hold its own against
                    any classic on the menu.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>The menu cards</h3>
                  <p>
                    Menu cards are included - the two signatures, named and described, set at the
                    bar so guests order them by name all night.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>The service</h3>
                  <p>
                    On the day, the signatures lead the menu beside the classics, poured identically
                    at every station. The hundredth is indistinguishable from the first.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* III. ZERO-PROOF - dark grid */}
        <section className="oma-panel dark" id="zero-proof">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">III &middot; Zero-Proof</span>
              <h2 className="oma-panel-h">
                The same craft, <span className="it">without the proof.</span>
              </h2>
              <p className="oma-panel-intro">
                A full non-alcoholic track runs beside the main menu - for the guests who do not
                drink, and for the ones simply pacing a long day.
              </p>
            </header>
            <div className="oma-grid">
              <div className="cell">
                <span className="n">01</span>
                <h3>A full program, not a token</h3>
                <p>
                  A complete zero-proof menu stands beside the cocktail list - composed drinks with
                  structure and finish, not a pitcher of something sweet.
                </p>
              </div>
              <div className="cell">
                <span className="n">02</span>
                <h3>Clear ice, real technique</h3>
                <p>
                  The zero-proof track is built with the same professional clear ice, the same
                  tools, and the same technique as everything else at the bar.
                </p>
              </div>
              <div className="cell">
                <span className="n">03</span>
                <h3>Served without ceremony</h3>
                <p>
                  No separate table, no lesser glassware, no quiet downgrade. A guest holding a
                  zero-proof drink looks like every other guest holding a cocktail.
                </p>
              </div>
              <div className="cell">
                <span className="n">04</span>
                <h3>Designed with the couple</h3>
                <p>
                  The zero-proof list takes shape in the same consultation as the main menu, so it
                  carries the wedding&apos;s palate rather than an afterthought.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial pause */}
        <section className="oma-pause" aria-hidden="true">
          <p className="oma-pause-text">Every guest,<br /><em>the same care.</em></p>
          <span className="oma-pause-mark">WEDDINGS</span>
        </section>

        {/* IV. FOR PLANNERS - light timeline */}
        <section className="oma-panel light" id="planners">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">IV &middot; For Planners</span>
              <h2 className="oma-panel-h">
                Logistics, <span className="it">in plain terms.</span>
              </h2>
              <p className="oma-panel-intro">
                For the professionals running the day - the answers you need before the walkthrough,
                stated in writing.
              </p>
            </header>
            <ol className="oma-steps">
              <li className="oma-step">
                <span className="oma-step-n">01</span>
                <div className="oma-step-body">
                  <h3>Certificate of insurance</h3>
                  <p>A COI is provided on request, named to the venue&apos;s requirements.</p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">02</span>
                <div className="oma-step-body">
                  <h3>Arrival and setup</h3>
                  <p>
                    We arrive ahead of service to build and dress the bar. Setup timing is confirmed
                    with you in advance - and held.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">03</span>
                <div className="oma-step-body">
                  <h3>Breakdown</h3>
                  <p>
                    At close, the station is broken down and the space returned to order. No
                    morning-after surprises for the venue.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">04</span>
                <div className="oma-step-body">
                  <h3>Power and water</h3>
                  <p>
                    Requirements are minimal: a standard outlet and access to running water cover
                    nearly every setup. Anything beyond that is flagged at the walkthrough, not on
                    the day.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">05</span>
                <div className="oma-step-body">
                  <h3>Alongside the caterer</h3>
                  <p>
                    The bar runs as its own discipline and coordinates with the caterer and the
                    planner - toasts, dinner service, and last call land where the run-of-show puts
                    them.
                  </p>
                </div>
              </li>
              <li className="oma-step">
                <span className="oma-step-n">06</span>
                <div className="oma-step-body">
                  <h3>New Jersey home base</h3>
                  <p>
                    Based in New Jersey, serving Manhattan, Brooklyn, Westchester, the Hamptons, and
                    Greenwich - without the Manhattan vendor logistics premium.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* V. FAQ - sitewide ledger pattern; mirrored in FAQPage JSON-LD */}
        <section className="faq" id="faq">
          <div className="section-bg-word top right" aria-hidden="true">VOWS</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Before</span>
                <span className="it">the toast.</span>
              </h2>
              <p className="faq-lead">What couples and planners ask, answered plainly.</p>
            </header>

            <ul className="faq-list">
              {WEDDING_FAQS.map((item, i) => (
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

      {/* CLOSING - framed CTA + global footer share one viewport */}
      <div className="closing-segment oma-close" id="final-cta">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">WEDDINGS</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / By appointment</span>
              <h2 className="closing-title">
                Reserve <span className="it">the date.</span>
              </h2>
              <p className="closing-lead">
                Tell us the date, the venue, and the guest count.
                <br />
                A tailored proposal returns within one business day.
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href="/contact/?occasion=wedding" data-cursor="link">
                  <span className="btn-label">Inquire for your date</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </a>
                <a className="btn-ghost" href="tel:+19172927859" data-cursor="link">
                  Call +1 (917) 292-7859
                </a>
              </div>
              <p className="closing-deposit">
                A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.
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
