import { LegalShell } from './legal/LegalShell';

export function Accessibility() {
  return (
    <LegalShell label="Accessibility" title="Accessibility Statement" updated="June 8, 2026">
      <h2>1. Our commitment</h2>
      <p>
        Ice &amp; Instinct is committed to making <a href="https://www.iceinstinct.com/">www.iceinstinct.com</a> usable
        by as many people as possible, including people with disabilities. We aim to meet the Web Content Accessibility
        Guidelines (WCAG) 2.1 at Level AA, and we treat accessibility as an ongoing effort rather than a one-time task.
      </p>

      <h2>2. Measures we take</h2>
      <ul>
        <li>Semantic HTML structure with clear headings and landmarks.</li>
        <li>Keyboard-operable navigation and visible focus styles.</li>
        <li>Sufficient color contrast for text against the dark theme.</li>
        <li>Text alternatives for meaningful images, and decorative images hidden from assistive technology.</li>
        <li>
          Respect for the "reduced motion" system setting: animations and motion effects are reduced or removed when
          you ask your device to minimize motion.
        </li>
        <li>Layouts that reflow for small screens and zoom without loss of content.</li>
      </ul>

      <h2>3. Known limitations</h2>
      <p>
        Some elements rely on motion and custom cursor effects for visual polish; these are designed to degrade safely
        and are suppressed under reduced-motion settings. Content delivered through third-party tools (for example the
        scheduling provider) is partly outside our direct control, though we choose providers with accessibility in
        mind.
      </p>

      <h2>4. Feedback and help</h2>
      <p>
        If you encounter a barrier on this site, or need information in a different format, please tell us via the{' '}
        <a href="/contact/">contact page</a>. Describe the page and the problem, and we will respond and work to provide
        the information or function you need. We aim to reply within a few business days.
      </p>

      <h2>5. Changes</h2>
      <p>
        We update this statement as the site evolves. The "Last updated" date above reflects the most recent change.
      </p>
    </LegalShell>
  );
}
