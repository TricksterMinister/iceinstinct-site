type ClosingProps = {
  /** Ghost word behind the card (default "BEGIN"). */
  ghost?: string;
  /** Small label above the headline (optional). */
  eyebrow?: string;
  /** Headline, split into a roman lead-in and an italic tail. */
  title?: string;
  titleEm?: string;
  lead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Optional reassurance line under the buttons (e.g. the offering deposit). */
  deposit?: string;
  /** Optional second fine-print line (e.g. the ice / supplier-cost canon on tiers). */
  note?: string;
};

/**
 * The one closing CTA for the whole project. Single source of truth: one card,
 * one type scale, one button pair, one meta line - on every page. Pages pass
 * overrides only where the message genuinely differs (offering tiers add the
 * deposit line and a "Reserve" primary). The contact page is the exception:
 * its closing IS the inquiry form, so it does not render this.
 *
 * Renders the standalone <section className="closing">. Pages that grid the
 * footer beneath it keep wrapping this in their .closing-segment with
 * <SiteFooter embedded/>; standalone pages render this then <SiteFooter/>.
 */
const DEFAULTS = {
  ghost: 'BEGIN',
  title: 'Begin',
  titleEm: 'the conversation.',
  lead: 'Tell us about the evening - the date, the room, the guest count. A private quote within one business day.',
  primaryLabel: 'Request a private quote',
  primaryHref: '/contact/',
  secondaryLabel: 'Explore the offerings',
  secondaryHref: '/offerings/',
};

export function Closing(props: ClosingProps = {}) {
  const p = { ...DEFAULTS, ...props };
  return (
    <section className="closing" id="closing">
      <div className="section-bg-word top right" aria-hidden="true">{p.ghost}</div>
      <div className="closing-stage">
        <div className="closing-frame">
          <span className="closing-corner tl" aria-hidden="true"></span>
          <span className="closing-corner tr" aria-hidden="true"></span>
          <span className="closing-corner bl" aria-hidden="true"></span>
          <span className="closing-corner br" aria-hidden="true"></span>
          {props.eyebrow ? <span className="closing-eyebrow">{props.eyebrow}</span> : null}
          <h2 className="closing-title">{p.title} <span className="it">{p.titleEm}</span></h2>
          <p className="closing-lead">{p.lead}</p>
          <div className="closing-cta">
            <a className="btn-primary" href={p.primaryHref} data-cursor="link"><span className="btn-label">{p.primaryLabel}</span><span className="btn-arr" aria-hidden="true">&rarr;</span></a>
            <a className="btn-ghost" href={p.secondaryHref} data-cursor="link">{p.secondaryLabel}</a>
          </div>
          {props.deposit ? <p className="closing-deposit">{props.deposit}</p> : null}
          {props.note ? <p className="closing-deposit closing-note">{props.note}</p> : null}
        </div>
        <p className="closing-meta"><span>By appointment only</span><span>New York Metropolitan Area</span><span>Est. 2024</span></p>
      </div>
    </section>
  );
}
