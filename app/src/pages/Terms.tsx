import { SiteFooter } from '../sections/SiteFooter';
import { useEffect } from 'react';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';

export function Terms() {
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
        <TriggerMark />
      </button>

      <div className="va-overlay" aria-hidden="true">
        <button className="va-close" aria-label="Close menu">
          <span></span>
          <span></span>
        </button>
        <div className="va-stage">
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Terms</p>
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
              <a href="mailto:alchemyandice.nyc@gmail.com?subject=Ice%20%26%20Instinct%20inquiry">
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
            <a href="mailto:alchemyandice.nyc@gmail.com?subject=Ice%20%26%20Instinct%20inquiry" className="nav-cta">
              Inquire
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="legal">
          <div className="container">
            <div className="legal-head">
              <h1>Terms of Service</h1>
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
                Ice &amp; Instinct is a private mixology studio operated by <strong>Teimuraz Benidze</strong>. These
                Terms govern your use of <a href="https://www.iceinstinct.com/">www.iceinstinct.com</a> and the
                engagement between us and any client who books a service through our scheduling page or by direct agreement.
              </p>

              <h2>2. Services we offer</h2>
              <p>Private mixology service in the New York metropolitan area, organised in four tiers:</p>
              <ul>
                <li>
                  <strong>The Foundation</strong> - from $650 USD, up to 15 guests, 3 hours.
                </li>
                <li>
                  <strong>Perfection in Simplicity</strong> - from $900 USD, up to 12 guests, 4 hours.
                </li>
                <li>
                  <strong>Bespoke Design &amp; Artistry</strong> - from $1,800 USD, up to 30 guests, 4 hours.
                </li>
                <li>
                  <strong>Omakase Improvisation</strong> - from $3,000 USD, up to 25 guests, open hours.
                </li>
                <li>
                  <strong>Private Concierge</strong> - bespoke pricing.
                </li>
              </ul>
              <p>
                Each engagement is confirmed by a private quote sent in response to your inquiry. The confirmed quote is
                the binding scope.
              </p>

              <h2>3. Pricing &amp; payment</h2>
              <p>
                Pricing is bespoke per event and confirmed in writing. A flat $500 deposit reserves your date; the
                remaining balance is due before the event, unless otherwise agreed. Currency is USD.
              </p>

              <h2>4. Cancellation</h2>
              <p>
                Cancellation more than 14 days before the event: full deposit refunded. Within 14 days: deposit
                non-refundable but transferable to a future date within 12 months, subject to availability. Within 48
                hours: full booking value due.
              </p>

              <h2>5. What's included</h2>
              <p>
                Each tier includes the items listed at the time of quote: bartender service, tools, bar setup, and
                breakdown. Spirits and wine are provided by you or sourced on your behalf at supplier cost. Specialty
                ice, curated glassware, additional staff, and add-on services (cigars, custom glassware) are arranged
                through the Concierge and billed separately at supplier cost.
              </p>

              <h2>6. Client responsibilities</h2>
              <ul>
                <li>Provide accurate event information at the time of inquiry.</li>
                <li>Ensure the venue is accessible for setup at least 90 minutes before service.</li>
                <li>Confirm the legal drinking age of all guests being served.</li>
                <li>Ensure the venue holds any permissions required to serve alcohol on premises.</li>
              </ul>

              <h2>7. Liability</h2>
              <p>
                Ice &amp; Instinct provides service in good faith and to a professional standard. To the extent permitted
                by law, our total liability for any claim arising from a service is limited to the fees you paid us for
                that service. We reserve the right to refuse service to any guest who appears intoxicated.
              </p>

              <h2>8. Intellectual property</h2>
              <p>
                Recipes, photography, and brand materials remain the property of Ice &amp; Instinct unless transferred in
                writing. Custom recipes designed for your event may be shared with you in a printed take-home format on
                request.
              </p>

              <h2>9. Confidentiality</h2>
              <p>
                We treat all client information as confidential and do not share guest lists, addresses, or event
                details with third parties. Photography of guests during service is not undertaken without explicit prior
                consent.
              </p>

              <h2>10. Governing law</h2>
              <p>
                These Terms are governed by the laws of the State of New York, USA. Disputes will first be addressed by
                good-faith discussion; if not resolved, by the courts of New York County.
              </p>

              <h2>11. Changes</h2>
              <p>
                We may update these Terms from time to time. The "Last updated" date above reflects the most recent
                change. For ongoing engagements, the Terms in force at the time of your booking apply.
              </p>

              <h2>12. Contact</h2>
              <p>
                Questions about these Terms? Reach us via the <a href="mailto:alchemyandice.nyc@gmail.com?subject=Ice%20%26%20Instinct%20inquiry">contact page</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
