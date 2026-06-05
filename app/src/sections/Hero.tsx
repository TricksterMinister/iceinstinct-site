export function Hero() {
  return (
    <section className="hero" id="hero">
      <video className="hero-video" autoPlay muted loop playsInline preload="auto">
        <source src="https://videos.pexels.com/video-files/5838621/5838621-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>
      <div className="hero-vignette"></div>
      <div className="hero-grain"></div>

      <div className="hero-meta hero-meta-tl">
        <span className="dot"></span>
        <span>New York Metropolitan Area &middot; By Appointment</span>
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
        <p className="hero-sub">
          <span className="reveal-line">Where ritual meets instinct,</span>
          <span className="reveal-line">high above the city.</span>
        </p>
      </div>

      <div className="hero-cue">
        <span>Scroll</span>
        <div className="cue-line"></div>
      </div>
    </section>
  );
}
