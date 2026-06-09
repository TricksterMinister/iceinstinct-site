import { LegalShell } from './legal/LegalShell';

export function ResponsibleService() {
  return (
    <LegalShell
      label="Responsible Service"
      title="Responsible Service & Alcohol Policy"
      updated="June 8, 2026"
    >
      <h2>1. Purpose</h2>
      <p>
        Ice &amp; Instinct provides private bartending and mixology service in the New York metropolitan area. The
        enjoyment of cocktails depends on serving them responsibly. This policy explains how we serve, the legal
        framework we serve within, and the responsibilities shared between us and the host. It works alongside our{' '}
        <a href="/terms/">Terms of Service</a>.
      </p>

      <h2>2. Legal drinking age (21+)</h2>
      <p>
        We serve alcohol only to guests who are <strong>21 years of age or older</strong>, the legal drinking age in
        the United States. Our bartenders may ask any guest for valid government-issued photo identification and will
        decline service to anyone who cannot establish that they are 21 or older. We never knowingly serve a minor.
      </p>

      <h2>3. We serve; we do not sell alcohol</h2>
      <p>
        We provide bartending labor and craft, not the retail sale of alcohol. The alcohol served at your event is
        supplied by you as the host, or sourced on your behalf at supplier cost with no markup on the alcohol. Because
        we do not sell alcohol, we operate as a service provider rather than a licensed retailer; where a venue or event
        requires a permit to serve alcohol, securing it is the host's or venue's responsibility.
      </p>

      <h2>4. How we serve responsibly</h2>
      <ul>
        <li>We pace service and pour to standard measures rather than over-pour.</li>
        <li>We make water available and encourage guests to drink it alongside cocktails.</li>
        <li>We watch for signs of intoxication and adjust or stop service accordingly.</li>
        <li>We offer and prepare quality non-alcoholic options on request.</li>
        <li>Our service follows responsible-beverage-service practices.</li>
      </ul>

      <h2>5. Refusing and stopping service</h2>
      <p>
        We reserve the absolute right, without liability and without refund, to refuse or stop serving any guest who is,
        or appears to be, under 21, unable to show valid identification, or intoxicated. We may also end an engagement
        where guest conduct or circumstances make safe, lawful service impossible. Please support our bartenders when
        they make these calls; they make them to keep your guests safe.
      </p>

      <h2>6. New York dram shop and social host law</h2>
      <p>
        New York law, including the Dram Shop Act and the social host provisions of the General Obligations Law
        (sections 11-100 and 11-101), can impose liability on a person who unlawfully provides alcohol to a minor or to
        a visibly intoxicated person who then causes injury. As the host who supplies the alcohol and invites the
        guests, you retain the responsibilities the law places on a host. Our responsible-service practices reduce risk
        but do not transfer or remove a host's legal responsibilities.
      </p>

      <h2>7. Host responsibilities</h2>
      <ul>
        <li>Confirm that every guest to be served is 21 or older.</li>
        <li>Supply alcohol lawfully and secure any permit the venue or event requires.</li>
        <li>Arrange safe transportation for any guest who should not drive, and never pressure anyone to drink.</li>
        <li>Support our bartenders when they pace, refuse, or stop service.</li>
      </ul>

      <h2>8. Safe transportation</h2>
      <p>
        We encourage every host to plan ahead for rides home: rideshare, designated drivers, or car service. No guest
        should drive after drinking.
      </p>

      <h2>9. Liability and indemnification</h2>
      <p>
        Our responsibilities and the limits of our liability, along with the host's indemnification obligations, are set
        out in our <a href="/terms/">Terms of Service</a>. Nothing in this policy waives any duty that the law does not
        permit to be waived.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about how we serve? Reach us via the <a href="/contact/">contact page</a>.
      </p>
    </LegalShell>
  );
}
