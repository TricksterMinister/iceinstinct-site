import { SiteFooter } from '../sections/SiteFooter';
import markUrl from '../assets/ii-mark.png';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { useEffect, useState } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useMyStory } from '../app/useMyStory';

export function MyStory() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.story-cover', '.story-journey', '.story-record', '.faq', '.closing-segment'], ['.numbered']);
  useMyStory();

  // The Record: real credentials, scanned. Tap a plate to read it in full.
  const CREDS = [
    {
      img: '/assets/credentials/certificat-france.jpg',
      title: 'Certificat - Wine & Sommellerie',
      sub: 'Chateau-Arnoux, France',
      desc: '192 hours of wine study under Michel Garnero: viticulture, the wines of France, sensory analysis, tasting practice, and the marriage of food and wine. Lycee interprofessionnel Louis Martin Bre, Chateau-Arnoux, France.',
    },
    {
      img: '/assets/credentials/georgian-sommelier.jpg',
      title: 'Leading Qualified Sommelier',
      sub: 'Georgian Sommelier Association (ASI)',
      desc: 'Two years (2013 to 2015) as the leading Qualified Sommelier, professional member and visiting lecturer. The Georgian Sommelier Association is part of the Association de la Sommellerie Internationale (ASI). Tbilisi.',
    },
    {
      img: '/assets/credentials/enotria.jpg',
      title: 'Diploma - Wines & Spirits',
      sub: 'Enotria Wine World, Moscow',
      desc: 'Specialist diploma in wines and spirits. Educational and Consulting Center "Enotria - Wine World", Moscow, 2002.',
    },
    {
      img: '/assets/credentials/onivins.jpg',
      title: 'French Wine Studies',
      sub: 'O.N.I.VINS - National Bureau of French Wines',
      desc: 'Professional courses with tastings under O.N.I.VINS, the French National Interprofessional Bureau of Wines, in the promotion of the wines of France. Moscow.',
    },
  ];
  const [cert, setCert] = useState<number | null>(null);

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / My Story</p>
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
              <a href="/my-story/" className="is-active">
                My Story
              </a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ================ COVER: full-bleed portrait hero ================ */}
        <section className="story-cover" id="cover">
          <img
            className="story-cover-img"
            src="/assets/photos/founder-temo.jpg"
            alt="Teimuraz Benidze, Founder of Ice & Instinct"
            fetchPriority="high"
            width="1920"
            height="1071"
          />
          <div className="story-cover-scrim" aria-hidden="true"></div>
          <div className="story-cover-ghost" aria-hidden="true">
            <span className="hg-base">ALCHEMIST</span>
            <span className="hg-glow">ALCHEMIST</span>
          </div>
          <div className="story-cover-id">
            <h1 className="story-cover-name">
              Teimuraz <span className="it">Benidze.</span>
            </h1>
            <p className="story-cover-role">Founder &amp; Flavor Architect</p>
          </div>
        </section>

        {/* ================ OPENING STATEMENT ================ */}
        <section className="numbered" id="story-intro">
          <div className="container-narrow">
            <article className="story-open reveal">
              <h2 className="story-slogan">
                <span className="it gold-shine">Born of ritual, led by instinct.</span>
              </h2>
              <p className="story-lede">
                My journey began not behind a bar, but in the pursuit of perfection. <strong>Ice &amp; Instinct</strong>{' '}
                is the culmination of years spent refining the dialogue between nature's raw ingredients and the
                precision of modern luxury.
              </p>
            </article>
          </div>
        </section>

        {/* ================ THE JOURNEY (Georgia -> NYC, as a timeline) ================ */}
        <section className="story-journey" id="story-journey">
          <div className="container">
            <div className="journey-layout">
              {/* Desktop: the framed city photo fills the left half and cross-fades
                  to whichever city is hovered/active. Hidden on touch (each city
                  then shows its own inline photo). */}
              <div className="journey-media" aria-hidden="true">
                <figure className="journey-fig is-active"><img src="/assets/photos/journey-sukhumi-v3.png" alt="" loading="lazy" /></figure>
                <figure className="journey-fig"><img src="/assets/photos/journey-tbilisi-v2.png" alt="" loading="lazy" /></figure>
                <figure className="journey-fig"><img src="/assets/photos/journey-lisbon-v2.png" alt="" loading="lazy" /></figure>
                <figure className="journey-fig"><img src="/assets/photos/journey-moscow-v2.png" alt="" loading="lazy" /></figure>
                <figure className="journey-fig"><img src="/assets/photos/journey-newyork-v3.jpg" alt="" loading="lazy" /></figure>
              </div>

              <div className="journey-right">
                <div className="journey-head reveal">
                  <h2 className="display-heading">
                    Five cities,
                    <br />
                    <span className="it gold-shine">one instinct.</span>
                  </h2>
                </div>
                <ol className="journey-rail" data-journey-rail>
                <li className="journey-stop">
                  <img className="journey-stop-img" src="/assets/photos/journey-sukhumi-v3.png" alt="Sukhumi" loading="lazy" />
                  <div className="journey-row">
                    <span className="journey-no">01</span>
                    <div className="journey-body">
                      <span className="journey-city">Sukhumi</span>
                      <p className="journey-note">
                        The table is never empty - someone is always pouring, always arriving. The city is gone now, held
                        only where no border can reach it, but its color stays with me: ripe persimmon, warm against the
                        Black Sea. I set that table again every time I work.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="journey-stop">
                  <img className="journey-stop-img" src="/assets/photos/journey-tbilisi-v2.png" alt="Tbilisi" loading="lazy" />
                  <div className="journey-row">
                    <span className="journey-no">02</span>
                    <div className="journey-body">
                      <span className="journey-city">Tbilisi</span>
                      <p className="journey-note">
                        In Tbilisi the host answers for the whole table - not for the service, for the night itself. A
                        supra is not hosted, it is carried; hospitality here is devotion, never transaction. I have never
                        poured a drink any other way.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="journey-stop">
                  <img className="journey-stop-img" src="/assets/photos/journey-lisbon-v2.png" alt="Lisbon" loading="lazy" />
                  <div className="journey-row">
                    <span className="journey-no">03</span>
                    <div className="journey-body">
                      <span className="journey-city">Lisbon</span>
                      <p className="journey-note">
                        Portugal gave me a life with no one watching - a new language in my mouth, work in my hands, a city
                        that asked nothing of me but presence. There is a slow gold in that light I have never stopped
                        missing. A man got made there, alone.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="journey-stop">
                  <img className="journey-stop-img" src="/assets/photos/journey-moscow-v2.png" alt="Moscow" loading="lazy" />
                  <div className="journey-row">
                    <span className="journey-no">04</span>
                    <div className="journey-body">
                      <span className="journey-city">Moscow</span>
                      <p className="journey-note">
                        Moscow is where instinct became discipline - the years that made me the first certified sommelier
                        in Georgia's history. I came out of it able to read a room the way I read a wine: structure first,
                        then what it is hiding. That reading never leaves me.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="journey-stop">
                  <img className="journey-stop-img" src="/assets/photos/journey-newyork-v3.jpg" alt="New York" loading="lazy" />
                  <div className="journey-row">
                    <span className="journey-no">05</span>
                    <div className="journey-body">
                      <span className="journey-city">New York</span>
                      <p className="journey-note">
                        Everything pointed here before I knew the city existed. Two decades of fine wine and high service
                        have distilled into one thing: the private table as ritual, never transaction - Sukhumi's full
                        table, set again on this side of the world. I have never loved a city more.
                      </p>
                    </div>
                  </div>
                </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ================ PHILOSOPHY QUOTE (Ice / Instinct - scroll-revealed) ================ */}
        <section className="numbered" id="philosophy">
          <div className="container-narrow">
            <blockquote className="philosophy-quote reveal">
              <p className="philosophy-line">
                <strong className="philosophy-word">Ice</strong>
                is discipline - the order, the preparation, the patience of craft.
              </p>
              <p className="philosophy-line">
                <strong className="philosophy-word">Instinct</strong>
                is intuition - the pulse, the moment, the whisper that changes everything.
              </p>
              <footer className="philosophy-divider">Between them, every experience is shaped.</footer>
            </blockquote>
          </div>
        </section>

        {/* ================ THE CLOSE - the page's single LIGHT segment. The human
            finale: prose + statement on the left, credentials on the right, one
            artful viewport on white stone. Modelled on the offering ledger. ====== */}
        <section className="story-close" id="story-close">
          <div className="story-close-wrap reveal">
            <div className="story-close-main">
              <p className="story-close-prose">
                When I arrive at your space, I bring nothing but my tools and attention. No menu, no routine. The evening
                unfolds in dialogue - between liquid and light, memory and desire.
              </p>
              <h2 className="story-close-statement">
                This is not bartending.
                <br />
                This is <span className="it gold-shine">Ice &amp; Instinct.</span>
              </h2>
            </div>
            <aside className="story-close-creds">
              <div className="cred">
                <span className="cred-k">The Podcast</span>
                <p className="cred-v">
                  A study of human nature - the quiet motives and contradictions that define us. The same curiosity
                  guides every pour: each drink a question, each flavor a possible answer.
                </p>
              </div>
              <div className="cred">
                <span className="cred-k">Four Languages</span>
                <p className="cred-v">
                  English, Portuguese, Russian, Georgian. Every culture raises a glass its own way - I listen before I
                  pour.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* ================ THE RECORD: credentials folio ================ */}
        <section className="story-record" id="story-record">
          <div className="container">
            <div className="record-head reveal">
              <p className="record-eyebrow">The Record</p>
              <h2 className="display-heading">
                Not claimed. <span className="it gold-shine">Certified.</span>
              </h2>
              <p className="record-lede">
                Two decades of wine and service, on paper. Tap any seal to read it in full.
              </p>
            </div>
            <ul className="record-grid reveal">
              {CREDS.map((c, i) => (
                <li key={i}>
                  <button className="record-plate" type="button" onClick={() => setCert(i)} aria-label={`View ${c.title}`}>
                    <span className="record-plate-frame">
                      <img src={c.img} alt={c.title} loading="lazy" />
                      <span className="record-plate-view" aria-hidden="true">View</span>
                    </span>
                    <span className="record-plate-meta">
                      <span className="record-plate-title">{c.title}</span>
                      <span className="record-plate-sub">{c.sub}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================ FAQ ACCORDION ================ */}
        <section className="faq" id="faq">
          <div className="section-bg-word top right" aria-hidden="true">RITUAL</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>The ritual</span>
                <span className="it">explained.</span>
              </h2>
              <p className="faq-lead">Plain answers about how an evening works.</p>
            </header>

            <ul className="faq-list">
              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">01</span>
                    <span className="faq-q-text">How far in advance should I reserve?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      Most clients reserve 2-4 weeks ahead. Every evening is built as a one-of-one ritual, and preparation
                      begins the moment we speak.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">02</span>
                    <span className="faq-q-text">Do you bring all ingredients and tools?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      I arrive with a compact case of precision tools. All ingredients, spirits, and glassware are sourced
                      by the host - I'll provide a tailored shopping list to match your chosen experience.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">03</span>
                    <span className="faq-q-text">Can we choose specific cocktails?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      For Simplicity and Bespoke, yes - we collaborate to refine a curated menu together. For Omakase,
                      there is no menu - each creation emerges spontaneously in the moment, tailored to individual guests
                      and the evening's flow.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">04</span>
                    <span className="faq-q-text">Do you provide a bar setup?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      By default, I use your existing space. A full portable bar setup or premium glassware rental can be
                      arranged upon request as an enhancement through <a href="/concierge/">The Curator</a> add-on.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">05</span>
                    <span className="faq-q-text">Do you travel outside NYC and New Jersey?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      Yes, upon request. Travel fees and accommodations are arranged according to distance and event scale
                      - subject to availability.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">06</span>
                    <span className="faq-q-text">What about postponements?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      Your deposit can transfer to a new date within six months, depending on availability. One reschedule
                      is included; further changes or peak dates may incur a fee.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">07</span>
                    <span className="faq-q-text">How many guests can you accommodate?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      <a href="/offerings/foundation/">Foundation</a> hosts up to 15 guests.{' '}
                      <a href="/offerings/simplicity/">Simplicity</a> up to 12. <a href="/offerings/bespoke/">Bespoke</a>{' '}
                      up to 30. <a href="/offerings/omakase/">Omakase</a> up to 25. Larger events can be arranged with
                      additional bar staff through custom consultation.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">08</span>
                    <span className="faq-q-text">Can you create non-alcoholic drinks?</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      Absolutely. The ritual is about balance and craft, not alcohol. Every composition can be crafted
                      spirit-free with the same precision, complexity, and emotion.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">09</span>
                    <span className="faq-q-text">Payment and deposit process</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      A $500 deposit secures your date and is applied toward your final balance. Once your package is
                      confirmed, the total is adjusted: if your total exceeds $500, you pay the difference; if it is
                      less, the remainder is refunded. The balance is due at least 14 days before the event.
                    </p>
                  </div>
                </details>
              </li>

              <li className="faq-item">
                <details className="faq-details">
                  <summary className="faq-q" data-cursor="link">
                    <span className="faq-n" aria-hidden="true">10</span>
                    <span className="faq-q-text">NDA and insurance</span>
                    <span className="faq-q-mark" aria-hidden="true"></span>
                  </summary>
                  <div className="faq-a">
                    <p>
                      Confidentiality is part of the ethos. NDAs are available upon request. Certificates of insurance can
                      be issued for venues that require coverage.
                    </p>
                  </div>
                </details>
              </li>
            </ul>

            <p className="faq-coda">
              Each experience is a living dialogue - between craft, instinct, and atmosphere.
            </p>
          </div>
        </section>

        {/* ================ CLOSING - the sitewide standard: framed CTA and the
            global footer SHARE one viewport (closing-segment grid) ================ */}
        <div className="closing-segment story-close" id="final-cta">
          <section className="closing">
            <div className="section-bg-word top right" aria-hidden="true">BEGIN</div>
            <div className="closing-stage">
              <div className="closing-frame">
                <span className="closing-corner tl" aria-hidden="true"></span>
                <span className="closing-corner tr" aria-hidden="true"></span>
                <span className="closing-corner bl" aria-hidden="true"></span>
                <span className="closing-corner br" aria-hidden="true"></span>
                <span className="closing-eyebrow">Ice &amp; Instinct / By appointment</span>
                <h2 className="closing-title">
                  Begin the <span className="it">conversation.</span>
                </h2>
                <p className="closing-lead">
                  Tell me about the evening. A response within one business day, personally.
                </p>
                <div className="closing-cta">
                  <a className="btn-primary" href="/contact/" data-cursor="link">
                    <span className="btn-label">Request a private quote</span>
                    <span className="btn-arr" aria-hidden="true">&rarr;</span>
                  </a>
                  <a className="btn-ghost" href="/offerings/" data-cursor="link">
                    See the tiers
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
          <SiteFooter embedded />
        </div>
      </main>

      {cert !== null && (
        <div
          className="record-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={CREDS[cert].title}
          onClick={() => setCert(null)}
        >
          <button className="record-lightbox-close" type="button" aria-label="Close" onClick={() => setCert(null)}>
            <span></span>
            <span></span>
          </button>
          <figure className="record-lightbox-fig" onClick={(e) => e.stopPropagation()}>
            <img src={CREDS[cert].img} alt={CREDS[cert].title} />
            <figcaption className="record-lightbox-cap">
              <span className="rl-title">{CREDS[cert].title}</span>
              <span className="rl-sub">{CREDS[cert].sub}</span>
              <span className="rl-desc">{CREDS[cert].desc}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
