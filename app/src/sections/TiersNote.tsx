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
        <p className="tiers-note-fine">
          Each tier price covers the craft, service, and expertise. Spirits and wine are separate: provide your own, or
          we source everything on your behalf at supplier cost. Specialty ice, glassware, and rentals are arranged
          through the Concierge and billed at supplier cost.
        </p>
      </div>
    </section>
  );
}
