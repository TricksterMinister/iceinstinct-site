import { SiteFooter } from '../sections/SiteFooter';
import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

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

  return (
    <>
      <div className="cursor" aria-hidden="true">
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
      </div>

      <button className="va-trigger" aria-label="Open menu">
        <span className="va-trigger-ring"></span>
        <span className="va-trigger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className="va-overlay" aria-hidden="true">
        <button className="va-close" aria-label="Close menu">
          <span></span>
          <span></span>
        </button>
        <div className="va-stage">
          <p className="va-eyebrow">Ice &amp; Instinct / Concierge</p>
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
              <a href="/concierge/" className="is-active">
                Concierge
              </a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/?service=concierge" className="nav-cta">
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

        {/* 5 ENHANCEMENT CARDS */}
        <section className="tier-section" id="enhancements">
          <div className="container">
            <div className="addon-grid reveal-stagger reveal">
              {/* 1. Bespoke Cigar Curator */}
              <article className="addon-card" id="cigar-curator">
                <div className="addon-icon addon-icon-photo" aria-hidden="true">
                  <img src="/assets/photos/icon-cigar.jpg" alt="" loading="lazy" width="256" height="256" />
                </div>
                <div className="addon-body">
                  <header className="addon-head">
                    <h3>Bespoke Cigar Curator</h3>
                    <span className="addon-price">$500</span>
                  </header>
                  <p className="addon-tag">Curated cigar ritual with expert oversight.</p>
                  <div className="addon-prose">
                    <p>
                      A fully curated cigar ritual designed to complement premium spirits and the rhythm of the
                      evening. This service provides professional oversight of the cigar experience: concept
                      development, pairing logic, pacing, and integration into the atmosphere of the event.
                    </p>
                    <p>
                      A dedicated cigar specialist is selected and coordinated by me to host the ritual with discretion,
                      knowledge, and respect for tradition. The focus is not consumption, but intention. Cigars are
                      introduced at the right moment, paired thoughtfully, and guided with restraint so they enhance the
                      evening rather than dominate it.
                    </p>
                    <p>
                      I remain responsible for the structure, quality, and coherence of the experience from start to
                      finish. You are not hiring a cigar sommelier. You are commissioning a ritual.
                    </p>
                  </div>
                </div>
              </article>

              {/* 2. Additional Bar Staff */}
              <article className="addon-card" id="additional-staff">
                <div className="addon-icon addon-icon-photo" aria-hidden="true">
                  <img src="/assets/photos/icon-staff.jpg" alt="" loading="lazy" width="256" height="256" />
                </div>
                <div className="addon-body">
                  <header className="addon-head">
                    <h3>Additional Bar Staff</h3>
                    <span className="addon-price">$350</span>
                  </header>
                  <p className="addon-tag">Professional reinforcement to protect service flow.</p>
                  <div className="addon-prose">
                    <p>
                      Additional professional reinforcement beyond what is included in the selected package. This
                      service provides an extra trained hospitality professional assigned based on the needs of the
                      event. Depending on guest count, service pace, and bar complexity, this may include a Bar-back,
                      service staff, or an additional professional bartender.
                    </p>
                    <p>
                      The purpose is not volume, but control. Extra staff protects service rhythm, maintains cleanliness
                      and organization, and absorbs operational pressure so the lead mixologist remains fully focused on
                      guests and execution.
                    </p>
                    <p>
                      Staff selection and role assignment are determined by me to ensure consistency with the standards
                      and tone of Ice &amp; Instinct. You are not hiring a person. You are securing calm, uninterrupted
                      service.
                    </p>
                  </div>
                </div>
              </article>

              {/* 3. The Curator */}
              <article className="addon-card" id="the-curator">
                <div className="addon-icon addon-icon-photo" aria-hidden="true">
                  <img src="/assets/photos/icon-curator.jpg" alt="" loading="lazy" width="256" height="256" />
                </div>
                <div className="addon-body">
                  <header className="addon-head">
                    <h3>The Curator</h3>
                    <span className="addon-price">$350</span>
                  </header>
                  <p className="addon-tag">Creative oversight for atmosphere, balance, and visual intent.</p>
                  <div className="addon-prose">
                    <p>
                      A dedicated concierge service focused on the visual, spatial, and atmospheric integrity of the bar
                      experience. The Curator is responsible for aesthetic coherence and presentation logic throughout
                      the event. From glassware balance and garnish restraint to spatial rhythm and visual flow, every
                      element is considered as part of a single composition.
                    </p>
                    <p>
                      This service allows me to take full creative responsibility beyond the cocktails themselves. When
                      appropriate, I coordinate and communicate with trusted third-party partners such as glassware
                      suppliers, ice producers, florists, lighting specialists, or DJs to ensure everything aligns with
                      the tone of the evening.
                    </p>
                    <p>
                      Nothing is random. Nothing is excessive. Every visual decision supports the atmosphere, the
                      drinks, and the intention of the gathering.
                    </p>
                    <p className="addon-note">
                      <strong>Important note</strong>The Curator fee covers creative oversight, coordination, and
                      accountability. All third-party rentals and services are billed separately at supplier cost.
                    </p>
                  </div>
                </div>
              </article>

              {/* 4. Glassware & Vessels */}
              <article className="addon-card" id="glassware">
                <div className="addon-icon addon-icon-photo" aria-hidden="true">
                  <img src="/assets/photos/icon-glassware.jpg" alt="" loading="lazy" width="256" height="256" />
                </div>
                <div className="addon-body">
                  <header className="addon-head">
                    <h3>Glassware &amp; Vessels</h3>
                    <span className="addon-price">$250</span>
                  </header>
                  <p className="addon-tag">Curated glassware architecture and coordination.</p>
                  <div className="addon-prose">
                    <p>
                      Curated glassware and vessel architecture designed to support flavor, temperature, and
                      presentation. This service covers the selection, specification, and coordination of appropriate
                      glassware based on the menu, service rhythm, and atmosphere of the event. Form, weight, volume,
                      and thermal behavior are considered to ensure each cocktail performs as intended.
                    </p>
                    <p>
                      I handle sourcing and coordination with trusted third-party suppliers to ensure the correct
                      glassware arrives on time, properly prepared, and aligned with the standards of the experience.
                      This removes guesswork, last-minute adjustments, and visual inconsistency.
                    </p>
                    <p className="addon-note">
                      <strong>Important note</strong>This fee covers curation, coordination, and quality control. All
                      glassware rentals are billed separately at supplier cost.
                    </p>
                  </div>
                </div>
              </article>

              {/* 5. Ice & Temperature */}
              <article className="addon-card" id="ice-temperature">
                <div className="addon-icon addon-icon-photo" aria-hidden="true">
                  <img src="/assets/photos/icon-ice.jpg" alt="" loading="lazy" width="256" height="256" />
                </div>
                <div className="addon-body">
                  <header className="addon-head">
                    <h3>Ice &amp; Temperature</h3>
                    <span className="addon-price">$250</span>
                  </header>
                  <p className="addon-tag">Precision ice and temperature control - non-negotiable foundation.</p>
                  <div className="addon-prose">
                    <p>
                      Precision ice and temperature control are foundational to every Ice &amp; Instinct experience.
                      This service ensures the use of professional-grade ice produced to my exact specifications:
                      clarity, density, format, and thermal behavior. Ice quality directly affects dilution, texture,
                      aroma, and the structural integrity of every cocktail. Compromising here compromises everything.
                    </p>
                    <p>
                      I personally coordinate sourcing and delivery through trusted specialty suppliers used by
                      Michelin-level restaurants. This guarantees consistency, reliability, and ice that performs
                      exactly as intended throughout the event.
                    </p>
                    <p>
                      This is not an upgrade. It is a prerequisite. Ice &amp; Instinct does not operate without proper
                      ice and temperature control.
                    </p>
                    <p className="addon-note">
                      <strong>Important note</strong>This fee covers sourcing, coordination, and temperature management.
                      Ice is supplied through third-party vendors and billed separately at supplier cost.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

      </main>

      <div className="closing-segment">
        {/* FINAL CTA */}
        <section id="final-cta">
          <div className="container-narrow">
            <div className="final-cta final-cta--luxe reveal">
              <span className="cta-corner cta-corner--tl" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--tr" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--bl" aria-hidden="true"></span>
              <span className="cta-corner cta-corner--br" aria-hidden="true"></span>
              <span className="ornament" aria-hidden="true">
                &#10022;
              </span>
              <h2>
                Pair what you <span className="it">need.</span>
              </h2>
              <p className="cta-lead">
                Tell us which enhancements should accompany your evening, alongside the tier you have in mind. We will
                return with a single tailored quote within one business day.
              </p>
              <div className="final-cta-actions">
                <a href="/contact/?service=concierge" className="btn btn-primary">
                  Request a private quote <span className="arrow">&rarr;</span>
                </a>
                <a href="/offerings/" className="btn btn-ghost">
                  See the tiers
                </a>
              </div>
              <p className="cta-foot">By appointment only &middot; Est. 2024</p>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
