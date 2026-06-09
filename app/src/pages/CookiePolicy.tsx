import { LegalShell } from './legal/LegalShell';

export function CookiePolicy() {
  return (
    <LegalShell label="Cookies" title="Cookie Policy" updated="June 8, 2026">
      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files a website stores on your device to make it work, remember preferences, or measure
        usage. This policy explains the cookies used on{' '}
        <a href="https://www.iceinstinct.com/">www.iceinstinct.com</a> and how to control them. It complements our{' '}
        <a href="/privacy/">Privacy Policy</a>.
      </p>

      <h2>2. Cookies we use</h2>
      <ul>
        <li>
          <strong>Analytics (Google Analytics 4).</strong> We use Google Analytics to understand how the site is used,
          in aggregate. It sets cookies such as <code>_ga</code> and <code>_ga_&lt;container-id&gt;</code> to
          distinguish visitors and sessions. These typically last up to two years and can be cleared at any time.
        </li>
        <li>
          <strong>Fonts.</strong> Typefaces are delivered through Google Fonts, which may set technical cookies on its
          own domains when fonts load.
        </li>
        <li>
          <strong>Scheduling.</strong> If you open our scheduling provider (YouCanBook.me) to request a consultation,
          that provider may set its own cookies necessary for its booking widget. These are governed by its policy.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> use advertising, retargeting, or cross-site tracking cookies, and we do not sell data
        collected through cookies.
      </p>

      <h2>3. Managing cookies</h2>
      <ul>
        <li>
          <strong>Browser settings.</strong> You can block or delete cookies in your browser settings. Blocking cookies
          will not break the site, since none are strictly required to read it.
        </li>
        <li>
          <strong>Opt out of Google Analytics.</strong> Install Google's official opt-out browser add-on, available at{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            tools.google.com/dlpage/gaoptout
          </a>
          .
        </li>
        <li>
          <strong>Do Not Track.</strong> We honor reasonable browser privacy signals where technically supported.
        </li>
      </ul>

      <h2>4. Changes</h2>
      <p>
        We may update this Cookie Policy as the services we use change. The "Last updated" date above reflects the most
        recent change.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about cookies? Reach us via the <a href="/contact/">contact page</a>.
      </p>
    </LegalShell>
  );
}
