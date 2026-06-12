import { useEffect, useRef } from 'react';

/* The hero loop downloads on desktop only: the effect below attaches this src
   when the viewport is wide enough and motion is allowed. Phones keep the
   poster frame and never fetch the 1.5MB mp4. */
const HERO_LOOP_SRC = '/assets/video/hero-loop-v1.mp4';

export function Hero() {
  /* SSR-safe (effect only). lib/videoIdle.ts observes the same element via
     data-idle-video and catches its play() rejections, so a src-less video
     on mobile never throws. Desktop keeps today's autoplay loop. */
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.src = HERO_LOOP_SRC;
    video.play().catch(() => { /* autoplay policy - poster stays */ });
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Owned brand loop replaces stock Pexels footage (owner: quiet luxury, no stock) */}
      <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="none" poster="/assets/video/hero-poster-v1.jpg" data-idle-video=""></video>
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
