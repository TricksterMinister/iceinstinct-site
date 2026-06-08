import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { useOmakaseSnap } from '../app/useOmakaseSnap';
import { EtherealShadow } from '../components/EtherealShadow';
import { SiteFooter } from '../sections/SiteFooter';
import type { OfferingContent } from './offerings/types';

gsap.registerPlugin(ScrollTrigger);

const ROMAN_NAV = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const NAV_KEYS = ['overview', 'menu-protocol', 'scaling', 'included', 'standard-inclusions', 'host-provides', 'notes'];
const ROMAN_LOWER = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];

/**
 * The single approved offering-page layout (hero + sections I-VII + closing),
 * driven entirely by `content`. Identical design across Omakase / Foundation /
 * Simplicity / Bespoke; only the data + media differ.
 */
export function OfferingPage({ content }: { content: OfferingContent }) {
  // Each offering page links straight to its package on the booking platform
  // (YouCanBook.me), pre-selecting the matching appointment type.
  const BOOKING_SERVICE: Record<OfferingContent['slug'], string> = {
    foundation: 'jsid7240294',
    simplicity: 'jsid2226283',
    bespoke: 'jsid1887721',
    omakase: 'jsid1437636',
  };
  const pkg = `https://enter-ritual.youcanbook.me/?service=${BOOKING_SERVICE[content.slug]}`;

  // Live deep page sets <body class="cinema-chrome">.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useOmakaseSnap();

  /* HELD STAGE - pin the photo bridge and scrub The Selection -> The Focus. */
  const holdRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = holdRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.classList.add('is-static');
      return;
    }
    const ctx = gsap.context(() => {
      const stage = el.querySelector('.oma-hold-stage');
      gsap.set('.oma-hold-text.is-a', { autoAlpha: 1, yPercent: 0 });
      gsap.set('.oma-hold-text.is-b', { autoAlpha: 0, yPercent: 6 });
      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
          pin: stage,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo('.oma-hold-photo img', { scale: 1.0 }, { scale: 1.08, ease: 'none', duration: 1 }, 0);
      tl.fromTo('.oma-hold-scan', { top: '0%' }, { top: '100%', ease: 'none', duration: 1 }, 0);
      tl.to('.oma-hold-text.is-a', { autoAlpha: 0, yPercent: -6, duration: 0.16 }, 0.34);
      tl.fromTo('.oma-hold-text.is-b', { autoAlpha: 0, yPercent: 6 }, { autoAlpha: 1, yPercent: 0, duration: 0.16 }, 0.54);
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  /* Section rail polish: hide on hero/closing, darken numerals over light panels. */
  useEffect(() => {
    const hideEls = document.querySelectorAll('.concierge, .oma-close');
    const lightEls = document.querySelectorAll('.oma-panel.light, .oma-ledger');
    if (!hideEls.length && !lightEls.length) return;
    const visHide = new Set<Element>();
    const visLight = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const isLight = e.target.classList.contains('oma-ledger') || e.target.classList.contains('light');
          const set = isLight ? visLight : visHide;
          if (e.intersectionRatio > 0.5) set.add(e.target);
          else set.delete(e.target);
        });
        document.body.classList.toggle('rail-hide', visHide.size > 0);
        document.body.classList.toggle('rail-onlight', visLight.size > 0 && visHide.size === 0);
      },
      { threshold: [0, 0.5, 1] }
    );
    hideEls.forEach((el) => io.observe(el));
    lightEls.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.body.classList.remove('rail-hide', 'rail-onlight');
    };
  }, []);

  /* Hero ghost: a champagne light follows the cursor and lights the letters. */
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
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / {content.name}</p>
          <ul className="va-list">
            <li><a href="/"><i>01</i><b>Home</b><em>The opening view</em></a></li>
            <li><a href="/offerings/"><i>02</i><b>Offerings</b><em>Four levels, one standard</em></a></li>
            <li><a href="/concierge/"><i>03</i><b>Concierge</b><em>Five enhancements</em></a></li>
            <li><a href="/my-story/"><i>04</i><b>My Story</b><em>Teimuraz Benidze</em></a></li>
            <li><a href="/gallery/"><i>05</i><b>The Collection</b><em>Twelve compositions</em></a></li>
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
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 4 L23 11 L17 18 L11 11 Z" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M9 14 L17 23 L25 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="17" y1="23" x2="17" y2="29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <line x1="13" y1="29" x2="21" y2="29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </span>
              <span className="brand-name">Ice &amp; Instinct</span>
            </a>
            <div className="nav-links">
              <a href="/offerings/" className="is-active">Offerings</a>
              <a href="/concierge/">Concierge</a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">Inquire</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Sticky I-VII navigator (desktop) */}
        <nav className="tier-nav" aria-label="Sections of this tier">
          {ROMAN_NAV.map((r, i) => (
            <a key={r} href={`#${NAV_KEYS[i]}`} data-section={NAV_KEYS[i]} aria-label={content.navLabels[i]}>
              <span>{r}</span>
            </a>
          ))}
        </nav>

        {/* HERO - Concierge 50/50 technique */}
        <section className="concierge" style={{ viewTransitionName: `tier-hero-${content.slug}` }}>
          <div className="section-bg-word hero-ghost" aria-hidden="true">
            <span className="hg-base">{content.ghost}</span>
            <span className="hg-glow">{content.ghost}</span>
          </div>
          <div className="concierge-stage">
            <div className="concierge-text">
              <a href="/offerings/" className="concierge-back">&larr; Offerings</a>
              <h1 className="concierge-headline">{content.hero.headline}</h1>
              <p className="concierge-lead">{content.hero.lead}</p>
              <span className="price">
                {content.hero.price}
                <small>{content.hero.priceMeta}</small>
              </span>
              <a href="/contact/" className="concierge-link">
                Inquire <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="concierge-image">
              <video autoPlay muted loop playsInline poster={content.hero.video.poster} aria-label={content.hero.video.alt}>
                <source src={content.hero.video.src} type="video/mp4" />
                <img src={content.hero.video.poster} alt={content.hero.video.alt} />
              </video>
              <div className="concierge-image-scrim"></div>
            </div>
          </div>
        </section>

        {/* I. OVERVIEW */}
        <section className="tier-section oma-fmt3" id="overview">
          <div className="oma-fmt3-ghost" aria-hidden="true">Overview</div>
          <div className="oma-fmt3-wrap reveal">
            <div className="oma-fmt3-rule" aria-hidden="true"></div>
            <header className="oma-fmt3-head">
              <span className="oma-fmt3-eyebrow">I &middot; Overview</span>
              <h2 className="oma-fmt3-title">{content.overview.title}</h2>
            </header>
            <div className="oma-fmt3-cols">
              {content.overview.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="oma-fmt3-pull">{content.overview.pull}</p>
            <p className="oma-fmt3-foot">{content.overview.foot}</p>
          </div>
        </section>

        {/* Editorial pause (between Overview and Menu Protocol) */}
        {content.pauses?.[0] ? (
          <section className="oma-pause" aria-hidden="true">
            <p className="oma-pause-text">{content.pauses[0]}</p>
            <span className="oma-pause-mark">{content.ghost}</span>
          </section>
        ) : null}

        {/* II. THE MENU PROTOCOL - held-stage photo bridge */}
        <section className="oma-hold" id="menu-protocol" ref={holdRef}>
          <div className="oma-hold-stage">
            <figure className="oma-hold-photo">
              <img src={content.bridge.photo} alt={content.bridge.photoAlt} loading="lazy" />
            </figure>
            <span className="oma-hold-scan" aria-hidden="true"></span>
            <div className="oma-hold-text is-a">
              <span className="oma-seg-eye">II &middot; The Menu Protocol</span>
              {content.bridge.subhead ? <p className="oma-seg-sub">{content.bridge.subhead}</p> : null}
              <h2 className="oma-seg-h">{content.bridge.selection.title}</h2>
              <p className="oma-seg-lead">{content.bridge.selection.lead}</p>
            </div>
            <div className="oma-hold-text is-b" id="menu-focus">
              <span className="oma-seg-eye">II &middot; The Focus</span>
              <h2 className="oma-seg-h">{content.bridge.focus.title}</h2>
              <p className="oma-seg-lead">{content.bridge.focus.lead}</p>
            </div>
          </div>
        </section>

        {/* III. SCALABILITY - light ledger */}
        <section className="oma-ledger" id="scaling">
          <div className="oma-ledger-wrap">
            <div className="oma-ledger-left reveal">
              <span className="oma-ledger-eye">III &middot; Scalability</span>
              <h2>
                Scalability &amp; <span className="it">Investment.</span>
              </h2>
              <p className="oma-ledger-desc">{content.scaling.desc}</p>
            </div>
            <div className="oma-ledger-rows reveal">
              {content.scaling.tiers.map((t) => (
                <div className={`oma-ledger-row${t.muted ? ' is-muted' : ''}`} key={t.label}>
                  <span className="lbl">{t.label}</span>
                  <span className="info">
                    <span className="nm">{t.name}</span>
                    <span className="cap">{t.meta}</span>
                    <span className="det"><b>Personnel</b> {t.personnel}</span>
                    <span className="det"><b>Focus</b> {t.focus}</span>
                  </span>
                  <span className="pr">{t.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial pause (between Scalability and What's Included) */}
        {content.pauses?.[1] ? (
          <section className="oma-pause" aria-hidden="true">
            <p className="oma-pause-text">{content.pauses[1]}</p>
            <span className="oma-pause-mark">{content.ghost}</span>
          </section>
        ) : null}

        {/* IV. WHAT'S INCLUDED - dark timeline */}
        <section className="oma-panel dark" id="included">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">IV &middot; The Experience</span>
              <h2 className="oma-panel-h">
                What&apos;s <span className="it">Included.</span>
              </h2>
              <p className="oma-panel-intro">{content.included.intro}</p>
            </header>
            <ol className="oma-steps">
              {content.included.steps.map((s, i) => (
                <li className="oma-step" key={i}>
                  <span className="oma-step-n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="oma-step-body">
                    <h3>
                      {s.title}
                      {s.tag ? <span className="cell-tag">{s.tag}</span> : null}
                    </h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* V. STANDARD INCLUSIONS - dark grid + champagne wave */}
        <section className="oma-panel dark has-ether" id="standard-inclusions">
          <EtherealShadow
            className="oma-ether"
            sizing="fill"
            color="oklch(90% 0.10 84 / 0.40)"
            animation={{ scale: 68, speed: 92 }}
            noise={{ opacity: 0.12, scale: 1.1 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
          />
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">V &middot; The Foundation</span>
              <h2 className="oma-panel-h">
                Standard <span className="it">Inclusions.</span>
              </h2>
              <p className="oma-panel-intro">{content.standard.intro}</p>
            </header>
            <div className="oma-grid">
              {content.standard.items.map((it, i) => (
                <div className="cell" key={i}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial pause (between Standard Inclusions and Host Provides) */}
        {content.pauses?.[2] ? (
          <section className="oma-pause" aria-hidden="true">
            <p className="oma-pause-text">{content.pauses[2]}</p>
            <span className="oma-pause-mark">{content.ghost}</span>
          </section>
        ) : null}

        {/* VI. WHAT THE HOST PROVIDES - light timeline */}
        <section className="oma-panel light" id="host-provides">
          <div className="oma-panel-wrap reveal">
            <header className="oma-panel-head">
              <div className="oma-panel-rule" aria-hidden="true"></div>
              <span className="oma-panel-eye">VI &middot; The Canvas</span>
              <h2 className="oma-panel-h">
                What the Host <span className="it">Provides.</span>
              </h2>
              <p className="oma-panel-intro">{content.host.intro}</p>
            </header>
            <ol className="oma-steps">
              {content.host.steps.map((s, i) => (
                <li className="oma-step" key={i}>
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

        {/* VII. EXPERIENCE NOTES - dark single column */}
        <section className="oma-panel dark" id="notes">
          <div className="oma-mani reveal">
            <h2 className="oma-mani-h">{content.notes.title}</h2>
            <ol className="oma-notes">
              {content.notes.items.map((n, i) => (
                <li className="oma-note" key={i}>
                  <span className="oma-note-i" aria-hidden="true">{ROMAN_LOWER[i]}</span>
                  <p>{n}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      {/* CLOSING - light Свет-1 framed CTA (70%) + dark marquee/footer (30%) */}
      <div className="closing-segment oma-close" id="final-cta">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">{content.ghost}</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / By appointment</span>
              <h2 className="closing-title">{content.closing.title}</h2>
              <p className="closing-lead">
                {content.closing.lead.split(/(?<=\.)\s+/).flatMap((s, i) => (i === 0 ? [s] : [<br key={i} />, s]))}
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href={pkg} data-cursor="link">
                  <span className="btn-label">Request a private quote</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </a>
                <a className="btn-ghost" href="/offerings/" data-cursor="link">
                  Explore the offerings
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
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
