import { LegalShell } from './legal/LegalShell';

export function Privacy() {
  return (
    <LegalShell label="Privacy" title="Privacy Policy" updated="June 8, 2026" current="/privacy/">
      <h2>1. Who we are</h2>
      <p>
        Ice &amp; Instinct ("we", "us", "our") is a private mixology and at-home bartending service operated by{' '}
        <strong>Teimuraz Benidze</strong>, serving the New York metropolitan area. This policy explains what information
        we collect when you visit <a href="https://www.iceinstinct.com/">www.iceinstinct.com</a> or send us an inquiry,
        how we use it, and the choices you have. We are the data controller for that information.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li>
          <strong>Inquiry and booking details.</strong> When you request a consultation through our scheduling provider
          (YouCanBook.me) or by email, we receive the details you provide: your name, email address, and any event
          details you share (date, location, guest count, preferences). These reach our private inbox.
        </li>
        <li>
          <strong>Analytics data.</strong> We use Google Analytics 4 to understand how the site is used (pages viewed,
          approximate location, device and browser type, and on-site actions). Google Analytics sets cookies (for
          example <code>_ga</code>) and processes a truncated version of your IP address. See our{' '}
          <a href="/cookies/">Cookie Policy</a> for the full list and how to opt out.
        </li>
        <li>
          <strong>Server logs.</strong> Our hosting provider records standard technical logs (IP address, user-agent,
          requested URL, timestamp) for security, performance, and abuse prevention.
        </li>
      </ul>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to your inquiry, prepare a quote, and deliver the service you book.</li>
        <li>To send event-related communication through the channel you specified.</li>
        <li>To understand and improve how the site performs (analytics, in aggregate).</li>
        <li>To keep the site secure and prevent abuse.</li>
        <li>To meet legal, tax, and accounting obligations.</li>
      </ul>
      <p>
        We do <strong>not</strong> sell or rent your personal information, and we do not share it with advertisers or
        use it for marketing unrelated to your inquiry.
      </p>

      <h2>4. Cookies and analytics</h2>
      <p>
        The site uses a small number of cookies, primarily for analytics. We do not run advertising or cross-site
        tracking cookies. You can control or refuse cookies in your browser, and you can opt out of Google Analytics
        using Google's browser add-on. Full detail is in our <a href="/cookies/">Cookie Policy</a>.
      </p>

      <h2>5. Service providers we share data with</h2>
      <ul>
        <li>
          <strong>YouCanBook.me</strong> - consultation scheduling and inquiry intake.
        </li>
        <li>
          <strong>Google Analytics (Google LLC)</strong> - website usage measurement.
        </li>
        <li>
          <strong>Google Fonts</strong> - typeface delivery.
        </li>
        <li>
          <strong>Hostinger</strong> - website hosting and server logs.
        </li>
      </ul>
      <p>Each provider processes data only to deliver its service to us, under its own privacy terms.</p>

      <h2>6. How long we keep your data</h2>
      <p>
        Inquiry submissions and email correspondence are kept for as long as needed to deliver the service you booked,
        plus a reasonable period afterward for accounting and legal records. Analytics data is retained for up to 14
        months. You may request deletion at any time, subject to records we must keep by law.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete, or port your personal
        information, and to opt out of certain processing. New York residents may ask what information we hold and
        request its deletion. California residents have rights under the CCPA/CPRA, including the right to know, delete,
        and opt out of "sale" or "sharing" (we do neither). EU/UK residents have rights under the GDPR/UK GDPR. To
        exercise any right, write to us via the <a href="/contact/">contact page</a>; we will not discriminate against
        you for doing so.
      </p>

      <h2>8. Age</h2>
      <p>
        This site and our services are intended for adults of legal drinking age (21 or older in the United States). We
        do not knowingly collect information from anyone under 18. See our{' '}
        <a href="/responsible-service/">Responsible Service &amp; Alcohol Policy</a>.
      </p>

      <h2>9. Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect your information. No method of transmission
        or storage is completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update this policy from time to time. The "Last updated" date above reflects the most recent change.
      </p>

      <h2>11. Contact</h2>
      <p>
        For privacy questions or data requests, reach us via the <a href="/contact/">contact page</a>.
      </p>
    </LegalShell>
  );
}
