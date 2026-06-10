/**
 * Understated pricing transparency note + team-scaling line, shown directly
 * below the tiers. Fine print / muted caption styling.
 */
export function TiersNote() {
  return (
    <section className="tiers-note" id="tiers-note" aria-label="Pricing notes">
      <div className="section-bg-word" aria-hidden="true">SCALE</div>
      <div className="tiers-note-stage">
        <p className="tiers-note-eyebrow">One alchemist. A team when the room calls for it.</p>
        <h2 className="tiers-note-headline">
          <span>Built to</span>
          <span className="it">scale.</span>
        </h2>
        <p className="tiers-note-scale">
          Any tier scales with a full bar team for larger events - weddings, galas, and corporate gatherings - quoted on
          request.
        </p>
        <dl className="tiers-note-terms">
          <div className="tnt">
            <dt className="tnt-k">The fee</dt>
            <dd className="tnt-v">Covers the craft, the service, and the expertise.</dd>
          </div>
          <div className="tnt">
            <dt className="tnt-k">Spirits &amp; wine</dt>
            <dd className="tnt-v">Provided by you, or sourced on your behalf at supplier cost.</dd>
          </div>
          <div className="tnt">
            <dt className="tnt-k">Ice, glassware &amp; rentals</dt>
            <dd className="tnt-v">Arranged through the Concierge, billed at supplier cost.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
