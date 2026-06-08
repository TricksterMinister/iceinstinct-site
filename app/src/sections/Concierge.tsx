export function Concierge() {
  return (
    <section className="concierge" id="concierge">
      <div className="section-bg-word right" aria-hidden="true">ENHANCE</div>
      <div className="concierge-stage">
        <div className="concierge-text">
          <h2 className="concierge-headline">The <span className="it">Concierge.</span></h2>
          <p className="concierge-lead">Five quiet enhancements that deepen the ritual. Each one pairs with any level - sourced personally, never bundled.</p>
          <ol className="concierge-index">
            <li><i>01</i><b>Bespoke Cigar Curator</b></li>
            <li><i>02</i><b>Additional Bar Staff</b></li>
            <li><i>03</i><b>The Curator</b></li>
            <li><i>04</i><b>Glassware &amp; Vessels</b></li>
            <li><i>05</i><b>Ice &amp; Temperature</b></li>
          </ol>
          <a className="concierge-link" href="/concierge/" data-cursor="link">Explore the concierge <span aria-hidden="true">&rarr;</span></a>
        </div>
        <div className="concierge-image" data-parallax="">
          <video className="concierge-video" autoPlay muted loop playsInline preload="auto" poster="/assets/video/concierge-poster.webp">
            <source src="/assets/video/concierge-loop.webm?v=2" type="video/webm" />
            <source src="/assets/video/concierge-loop.mp4?v=2" type="video/mp4" />
          </video>
          <div className="concierge-image-scrim"></div>
        </div>
      </div>
    </section>
  );
}
