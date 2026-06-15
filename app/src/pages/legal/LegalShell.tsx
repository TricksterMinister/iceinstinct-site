import type { ReactNode } from 'react';
import markUrl from '../../assets/ii-mark.png';
import { useSegmentSnap } from '../../app/useSegmentSnap';
import { useEffect } from 'react';
import { SiteFooter } from '../../sections/SiteFooter';
import { Closing } from '../../sections/Closing';
import { useCinemaChrome } from '../../app/useCinemaChrome';
import { useDeepScripts } from '../../app/useDeepScripts';
import { EyebrowMark, TriggerMark } from '../../app/EyebrowMark';

/** All legal pages (Privacy, Terms, Cookies, Accessibility, Responsible
 *  Service) share one shell: the cinema-chrome cursor/menu/header, the
 *  .legal section wrapper, and the global footer. Links to the legal pages
 *  live ONLY in the footer (no in-page cross-link row). Each page passes only
 *  its label, title, updated date, and body. Keeps the section DRY. */

export function LegalShell({
  label,
  title,
  updated,
  children,
}: {
  /** Short page label shown in the menu eyebrow, e.g. "Privacy". */
  label: string;
  /** H1 of the page, e.g. "Privacy Policy". */
  title: string;
  /** Human "Last updated" date, e.g. "June 8, 2026". */
  updated: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
  useSegmentSnap(['.closing-segment']);

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
          <p className="va-eyebrow">
            <EyebrowMark />
            Ice &amp; Instinct / {label}
          </p>
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
                <em>Twelve compositions</em>
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
            <a href="/contact/" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="legal">
          <div className="container">
            <div className="legal-head">
              <h1>{title}</h1>
              <p
                className="muted"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                Last updated &middot; {updated}
              </p>
            </div>

            <div className="legal-body">{children}</div>
          </div>
        </section>
      </main>

      {/* Sitewide standard: the closing CTA and the global footer share one viewport. */}
      <div className="closing-segment legal-close" id="final-cta">
        <Closing />
        <SiteFooter embedded />
      </div>
    </>
  );
}
