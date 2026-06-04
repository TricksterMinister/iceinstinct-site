export function Closing() {
  return (
    <section className="closing" id="closing">
      <div className="section-bg-word top right" aria-hidden="true">BEGIN</div>
      <div className="closing-stage">
        <div className="closing-frame">
          <span className="closing-corner tl" aria-hidden="true"></span>
          <span className="closing-corner tr" aria-hidden="true"></span>
          <span className="closing-corner bl" aria-hidden="true"></span>
          <span className="closing-corner br" aria-hidden="true"></span>
          <span className="closing-eyebrow">Ice &amp; Instinct / By appointment</span>
          <h2 className="closing-title">Begin <span className="it">the conversation.</span></h2>
          <p className="closing-lead">Tell us about the evening - the date, the room, the guest count. A private quote within one business day.</p>
          <div className="closing-cta">
            <a className="btn-primary" href="/contact/" data-cursor="link"><span className="btn-label">Inquire</span><span className="btn-arr" aria-hidden="true">&rarr;</span></a>
            <a className="btn-ghost" href="/offerings/" data-cursor="link">Explore the offerings</a>
          </div>
        </div>
        <p className="closing-meta"><span>By appointment only</span><span>Manhattan &amp; surrounds</span><span>Est. 2024</span></p>
      </div>
    </section>
  );
}
