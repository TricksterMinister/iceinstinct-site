export function Founder() {
  return (
    <section className="founder" id="founder">
      <div className="section-bg-word right" aria-hidden="true">ALCHEMIST</div>
      <div className="founder-stage">
        <div className="founder-image" data-parallax="">
          {/* TEMP placeholder still (no video) until the final cinemagraph is made.
              Replaced the old time-lapse video the owner disliked. */}
          <img src="/assets/photos/founder-v6b.png" alt="The hand behind the ritual - the founder before the night Manhattan skyline" loading="lazy" />
          <div className="founder-image-scrim"></div>
        </div>

        <div className="founder-text">
          <blockquote className="founder-quote split">
            <span className="line">The hand</span>
            <span className="line"><span className="it">behind</span></span>
            <span className="line"><span className="it">the ritual.</span></span>
          </blockquote>
          <p className="founder-bio">Two decades distilled into a single evening. Led by one alchemist, carried by a team of trusted New York bartenders.</p>
          <a className="founder-link" href="/my-story/" data-cursor="link">Meet the Alchemist <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </section>
  );
}
