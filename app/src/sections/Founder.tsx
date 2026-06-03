export function Founder() {
  return (
    <section className="founder" id="founder">
      <div className="section-bg-word right" aria-hidden="true">ALCHEMIST</div>
      <div className="founder-stage">
        <div className="founder-image" data-parallax="">
          <video className="founder-video" autoPlay muted loop playsInline preload="auto" poster="/assets/video/alchemist-poster.webp">
            <source src="/assets/video/alchemist-loop.webm?v=2" type="video/webm" />
            <source src="/assets/video/alchemist-loop.mp4?v=2" type="video/mp4" />
          </video>
          <div className="founder-image-scrim"></div>
        </div>

        <div className="founder-text">
          <blockquote className="founder-quote split">
            <span className="line">The hand</span>
            <span className="line"><span className="it">behind</span></span>
            <span className="line"><span className="it">the ritual.</span></span>
          </blockquote>
          <p className="founder-bio">Two decades distilled into a single evening. One man, four cities, one uncompromising standard - revealed in full, away from here.</p>
          <a className="founder-link" href="/my-story/" data-cursor="link">Meet the Alchemist <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </section>
  );
}
