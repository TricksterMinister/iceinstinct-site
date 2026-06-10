/**
 * "Built to scale" breather segment, shown directly below the tiers.
 * Editorial Swiss grid: a left-anchored display headline, a justified lead,
 * and the three logistics terms as a numbered premium band (01/02/03).
 * The ghost word SCALE is a corner-bleed grid texture, not a centred backdrop.
 */
export function TiersNote() {
  return (
    <section className="tiers-note" id="tiers-note" aria-label="Pricing notes">
      <div className="section-bg-word top right" aria-hidden="true">SCALE</div>
      <div className="tn-grid">
        <header className="tn-head">
          <p className="tn-eyebrow">One alchemist. A team when the room calls for it.</p>
          <span className="tn-index" aria-hidden="true">01 / 03</span>
        </header>

        <div className="tn-lede">
          <h2 className="tn-headline">
            <span className="tn-h-bold">Built to</span>
            <span className="tn-h-it it">scale.</span>
          </h2>
          <p className="tn-scale">
            Any tier scales with a full bar team for larger events - weddings, galas, and corporate gatherings -
            quoted on request.
          </p>
        </div>

        <dl className="tn-terms">
          <div className="tn-term">
            <span className="tn-num" aria-hidden="true">01</span>
            <dt className="tn-k">The fee</dt>
            <dd className="tn-v">Covers the craft, the service, and the expertise.</dd>
          </div>
          <div className="tn-term">
            <span className="tn-num" aria-hidden="true">02</span>
            <dt className="tn-k">Spirits &amp; wine</dt>
            <dd className="tn-v">Provided by you, or sourced on your behalf at supplier cost.</dd>
          </div>
          <div className="tn-term">
            <span className="tn-num" aria-hidden="true">03</span>
            <dt className="tn-k">Ice, glassware &amp; rentals</dt>
            <dd className="tn-v">Arranged through the Concierge, billed at supplier cost.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
