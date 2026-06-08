import { SiteFooter } from '../sections/SiteFooter';
import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

export function Privacy() {
  // Live deep page sets <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
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
          <p className="va-eyebrow">Ice &amp; Instinct / Privacy</p>
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
              <span className="eyebrow">Legal</span>
              <h1>Privacy Policy</h1>
              <p
                className="muted"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                Last updated · May 1, 2026
              </p>
            </div>

            <div className="legal-body">
              <h2>1. Who we are</h2>
              <p>
                Ice &amp; Instinct ("we", "us") is a private mixology studio operated by{' '}
                <strong>Teimuraz Benidze</strong>, based in New York. This policy explains what information we collect
                when you visit <a href="https://www.iceinstinct.com/">www.iceinstinct.com</a> or send us an inquiry, and
                how we use it.
              </p>

              <h2>2. What we collect</h2>
              <ul>
                <li>
                  <strong>Inquiry submissions.</strong> When you request a consultation, we receive the details you
                  provide through our scheduling provider (YouCanBook.me): your name, email, and any event details you
                  share. These reach our private inbox.
                </li>
                <li>
                  <strong>Server logs.</strong> Our hosting provider may log your IP address, user-agent, requested URL
                  and timestamp for standard security and abuse-prevention.
                </li>
                <li>
                  <strong>Cookies.</strong> We do not set tracking or advertising cookies. Some essential third-party
                  services (e.g. Google Fonts) may set technical cookies on their own domains.
                </li>
              </ul>

              <h2>3. How we use it</h2>
              <ul>
                <li>To respond to your inquiry, prepare a quote, and deliver the service you book.</li>
                <li>To send event-related communication by the channel you specified.</li>
                <li>To keep the site running and prevent abuse.</li>
              </ul>
              <p>
                We do not sell your data, share it with advertisers, or use it for marketing unrelated to your inquiry.
              </p>

              <h2>4. Third parties</h2>
              <ul>
                <li>
                  <strong>YouCanBook.me</strong> - consultation scheduling.
                </li>
                <li>
                  <strong>Google Fonts</strong> - typeface delivery.
                </li>
                <li>
                  <strong>Hosting provider</strong> - serves the static site and writes server logs.
                </li>
              </ul>

              <h2>5. How long we keep your data</h2>
              <p>
                Inquiry submissions and email correspondence are retained for as long as needed to deliver the service
                you booked, plus a reasonable period afterward for accounting. You may request deletion at any time.
              </p>

              <h2>6. Your rights</h2>
              <p>
                Subject to applicable law (including GDPR for EU residents and CCPA for California residents), you may
                request access, correction, or deletion of your data, or opt out of further communication. Write to the
                email address on the contact page.
              </p>

              <h2>7. Children</h2>
              <p>
                The site is intended for adults of legal drinking age in their jurisdiction. We do not knowingly collect
                data from anyone under 18.
              </p>

              <h2>8. Changes</h2>
              <p>
                We may update this policy from time to time. The "Last updated" date above reflects the most recent
                change.
              </p>

              <h2>9. Contact</h2>
              <p>
                For privacy questions or data requests, write to us via the <a href="/contact/">contact page</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
