import { SiteFooter } from '../sections/SiteFooter';
import markUrl from '../assets/ii-mark.png';
import { useSegmentSnap } from '../app/useSegmentSnap';
import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useEvening } from '../lib/evening';

/** The five enhancements, as data so each renders as a full-segment split panel
 *  and can be selected into the inquiry. Prose kept verbatim from the originals. */
type Enh = { id: string; roman: string; label: string; name: string; price: string; img: string; tag: string; prose: string[]; note?: string };
const ENHANCEMENTS: Enh[] = [
  {
    id: 'cigar-curator', roman: 'I', label: 'Cigars', name: 'Bespoke Cigar Curator', price: '$500',
    img: '/assets/photos/icon-cigar.jpg',
    tag: 'Curated cigar ritual with expert oversight.',
    prose: [
      'A fully curated cigar ritual designed to complement premium spirits and the rhythm of the evening. This service provides professional oversight of the cigar experience: concept development, pairing logic, pacing, and integration into the atmosphere of the event.',
      'A dedicated cigar specialist is selected and coordinated by me to host the ritual with discretion, knowledge, and respect for tradition. The focus is not consumption, but intention. Cigars are introduced at the right moment, paired thoughtfully, and guided with restraint so they enhance the evening rather than dominate it.',
      'I remain responsible for the structure, quality, and coherence of the experience from start to finish. You are not hiring a cigar sommelier. You are commissioning a ritual.',
    ],
  },
  {
    id: 'additional-staff', roman: 'II', label: 'Staff', name: 'Additional Bar Staff', price: '$350',
    img: '/assets/photos/icon-staff.jpg',
    tag: 'Professional reinforcement to protect service flow.',
    prose: [
      'Additional professional reinforcement beyond what is included in the selected package. This service provides an extra trained hospitality professional assigned based on the needs of the event. Depending on guest count, service pace, and bar complexity, this may include a Bar-back, service staff, or an additional professional bartender.',
      'The purpose is not volume, but control. Extra staff protects service rhythm, maintains cleanliness and organization, and absorbs operational pressure so the lead mixologist remains fully focused on guests and execution.',
      'Staff selection and role assignment are determined by me to ensure consistency with the standards and tone of Ice & Instinct. You are not hiring a person. You are securing calm, uninterrupted service.',
    ],
  },
  {
    id: 'the-curator', roman: 'III', label: 'Curator', name: 'The Curator', price: '$350',
    img: '/assets/photos/icon-curator.jpg',
    tag: 'Creative oversight for atmosphere, balance, and visual intent.',
    prose: [
      'A dedicated concierge service focused on the visual, spatial, and atmospheric integrity of the bar experience. The Curator is responsible for aesthetic coherence and presentation logic throughout the event. From glassware balance and garnish restraint to spatial rhythm and visual flow, every element is considered as part of a single composition.',
      'This service allows me to take full creative responsibility beyond the cocktails themselves. When appropriate, I coordinate and communicate with trusted third-party partners such as glassware suppliers, ice producers, florists, lighting specialists, or DJs to ensure everything aligns with the tone of the evening.',
      'Nothing is random. Nothing is excessive. Every visual decision supports the atmosphere, the drinks, and the intention of the gathering.',
    ],
    note: 'The Curator fee covers creative oversight, coordination, and accountability. All third-party rentals and services are billed separately at supplier cost.',
  },
  {
    id: 'glassware', roman: 'IV', label: 'Glassware', name: 'Glassware & Vessels', price: '$250',
    img: '/assets/photos/icon-glassware.jpg',
    tag: 'Curated glassware architecture and coordination.',
    prose: [
      'Curated glassware and vessel architecture designed to support flavor, temperature, and presentation. This service covers the selection, specification, and coordination of appropriate glassware based on the menu, service rhythm, and atmosphere of the event. Form, weight, volume, and thermal behavior are considered to ensure each cocktail performs as intended.',
      'I handle sourcing and coordination with trusted third-party suppliers to ensure the correct glassware arrives on time, properly prepared, and aligned with the standards of the experience. This removes guesswork, last-minute adjustments, and visual inconsistency.',
    ],
    note: 'This fee covers curation, coordination, and quality control. All glassware rentals are billed separately at supplier cost.',
  },
  {
    id: 'ice-temperature', roman: 'V', label: 'Ice', name: 'Ice & Temperature', price: '$250',
    img: '/assets/photos/concierge-ice.jpg',
    tag: 'Precision ice and temperature control - non-negotiable foundation.',
    prose: [
      'Precision ice and temperature control are foundational to every Ice & Instinct experience. This service ensures the use of professional-grade ice produced to my exact specifications: clarity, density, format, and thermal behavior. Ice quality directly affects dilution, texture, aroma, and the structural integrity of every cocktail. Compromising here compromises everything.',
      'I personally coordinate sourcing and delivery through trusted specialty suppliers used by Michelin-level restaurants. This guarantees consistency, reliability, and ice that performs exactly as intended throughout the event.',
      'This is not an upgrade. It is a prerequisite. Ice & Instinct does not operate without proper ice and temperature control.',
    ],
    note: 'This fee covers sourcing, coordination, and temperature management. Ice is supplied through third-party vendors and billed separately at supplier cost.',
  },
];

export function ConciergePage() {
  // Live deep page sets <body class="cinema-chrome vp-split closer">. React mounts
  // into #root, so apply the body classes here (and clean them up) to match the
  // original DOM.
  useEffect(() => {
    const classes = ['cinema-chrome', 'vp-split', 'closer'];
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.page-hero', '.closing-segment'], ['#enhancements .addon-card.enh-split']);

  // "Add to my evening": the guest selects OPTIONAL enhancements (never pays
  // here). The selection persists site-wide and is carried into the booking /
  // Inquire. Ice & Temperature is never a toggle: the Concierge arranges it
  // with every booking, billed separately at supplier cost.
  const [picked, toggle] = useEvening();
  const requestUrl = '/contact/?enhancements=' + encodeURIComponent(picked.join(' | '));

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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Concierge</p>
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
              <a href="/concierge/" className="is-active">
                Concierge
              </a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="section-bg-word" aria-hidden="true">
            CONCIERGE
          </div>
          <div className="container">
            <h1>
              Augment any
              <br />
              <span className="it">experience.</span>
            </h1>
            <p className="lead">
              Five curated enhancements, added to any tier. Each one sourced, coordinated, and quality-controlled
              personally.
            </p>
          </div>
        </section>

        {/* 5 ENHANCEMENT PANELS - overview shelf (first-segment bottom half) */}
        <section id="enh-shelf" className="vp-shelf">
          <div className="container">
            <div className="promise-grid vp-track reveal" style={{ '--vp-cols': 5 } as React.CSSProperties}>
              <a className="tier-card" href="#cigar-curator">
                <span className="tier-figure" aria-hidden="true">
                  I
                </span>
                <span className="tier-num">i. Cigars</span>
                <h3>Bespoke Cigar Curator</h3>
                <span className="tier-meta">$500</span>
                <p className="tier-blurb">Curated cigar ritual with expert oversight.</p>
                <span className="tier-link">
                  Explore <span className="arrow">↓</span>
                </span>
              </a>

              <a className="tier-card" href="#additional-staff">
                <span className="tier-figure" aria-hidden="true">
                  II
                </span>
                <span className="tier-num">ii. Staff</span>
                <h3>Additional Bar Staff</h3>
                <span className="tier-meta">$350</span>
                <p className="tier-blurb">Professional reinforcement to protect service flow.</p>
                <span className="tier-link">
                  Explore <span className="arrow">↓</span>
                </span>
              </a>

              <a className="tier-card" href="#the-curator">
                <span className="tier-figure" aria-hidden="true">
                  III
                </span>
                <span className="tier-num">iii. Curator</span>
                <h3>The Curator</h3>
                <span className="tier-meta">$350</span>
                <p className="tier-blurb">Creative oversight for atmosphere and visual intent.</p>
                <span className="tier-link">
                  Explore <span className="arrow">↓</span>
                </span>
              </a>

              <a className="tier-card" href="#glassware">
                <span className="tier-figure" aria-hidden="true">
                  IV
                </span>
                <span className="tier-num">iv. Glassware</span>
                <h3>Glassware &amp; Vessels</h3>
                <span className="tier-meta">$250</span>
                <p className="tier-blurb">Curated glassware architecture and coordination.</p>
                <span className="tier-link">
                  Explore <span className="arrow">↓</span>
                </span>
              </a>

              <a className="tier-card" href="#ice-temperature">
                <span className="tier-figure" aria-hidden="true">
                  V
                </span>
                <span className="tier-num">v. Ice</span>
                <h3>Ice &amp; Temperature</h3>
                <span className="tier-meta">$250</span>
                <p className="tier-blurb">Precision ice and temperature control.</p>
                <span className="tier-link">
                  Explore <span className="arrow">↓</span>
                </span>
              </a>
            </div>
            <div className="vp-meta">
              <span>
                <span className="pos">05</span> Enhancements
              </span>
              <span>Pair with any tier</span>
            </div>
          </div>
        </section>

        {/* 5 ENHANCEMENTS - each a full-segment split; selectable into the inquiry */}
        <section className="tier-section" id="enhancements">
          <div className="container">
            <div className="addon-grid">
              {ENHANCEMENTS.map((e) => {
                const added = picked.includes(e.name);
                return (
                  <article className="addon-card enh-split" id={e.id} key={e.id}>
                    <div className="enh-figure" aria-hidden="true">
                      <img src={e.img} alt="" loading="lazy" width="600" height="800" />
                    </div>
                    <div className="enh-content">
                      <span className="enh-num">{e.roman} &middot; {e.label}</span>
                      <header className="enh-head">
                        <h3>{e.name}</h3>
                        <span className="enh-price">{e.price}</span>
                      </header>
                      <p className="enh-tag">{e.tag}</p>
                      <div className="enh-prose">
                        {e.prose.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                        {e.note && (
                          <p className="addon-note">
                            <strong>Important note</strong>
                            {e.note}
                          </p>
                        )}
                      </div>
                      {e.id === 'ice-temperature' ? (
                        <span className="enh-standard">
                          <span className="enh-standard-mark" aria-hidden="true">✦</span>
                          Arranged with every booking, at supplier cost
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={'enh-add' + (added ? ' is-added' : '')}
                          onClick={() => toggle(e.name)}
                          aria-pressed={added}
                          data-cursor="link"
                        >
                          <span className="enh-add-label">{added ? 'Added to your evening' : 'Add to my evening'}</span>
                          <span className="enh-add-mark" aria-hidden="true">{added ? '✓' : '+'}</span>
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Your evening: the running selection, carried into the Inquire form */}
        {picked.length > 0 && (
          <aside className="enh-tray" aria-label="Your evening">
            <div className="enh-tray-info">
              <span className="enh-tray-k">Your evening &middot; {picked.length}</span>
              <span className="enh-tray-items">{picked.join('   ·   ')}</span>
            </div>
            <a className="enh-tray-cta" href={requestUrl} data-cursor="link">
              Request these <span aria-hidden="true">&rarr;</span>
            </a>
          </aside>
        )}

      </main>

      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="HANDLED" title="Everything else," titleEm="handled." lead="Staffing, glassware, clear ice, the timeline - the Concierge arranges it all so you only host. Tell us what the evening needs." />
        <SiteFooter embedded />
      </div>
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import { Closing } from '../sections/Closing';
