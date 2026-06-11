export function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Owned brand loop replaces stock Pexels footage (owner: quiet luxury, no stock) */}
      <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/assets/video/hero-poster-v1.jpg">
        <source src="/assets/video/hero-loop-v1.mp4" type="video/mp4" />
      </video>
      <div className="hero-vignette"></div>
      <div className="hero-grain"></div>

      <div className="hero-meta hero-meta-tl">
        <span className="dot"></span>
        <span>New York Metropolitan Area<span className="hm-appt"> &middot; By Appointment</span></span>
      </div>
      <div className="hero-meta hero-meta-tr">
        <span>EST. 2024</span>
      </div>

      <div className="hero-stage">
        <h1 className="hero-title">
          <span className="row">
            <span className="word"><span className="ink">Ice</span></span>
            <span className="word amp"><span className="ink it">&amp;</span></span>
          </span>
          <span className="row">
            <span className="word"><span className="ink it">Instinct.</span></span>
          </span>
        </h1>
      </div>

      <p className="hero-sub">
        <span className="reveal-line">Where ritual meets instinct,</span>
        <span className="reveal-line">high above the city.</span>
      </p>

      <div className="hero-cue">
        <span>Scroll</span>
        <div className="cue-line"></div>
      </div>
    </section>
  );
}
