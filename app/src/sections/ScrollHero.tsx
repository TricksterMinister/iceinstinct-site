import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollHero.css';

gsap.registerPlugin(ScrollTrigger);

/* Scroll-cinematic hero (GSAP ScrollTrigger pin + canvas frame-scrub).
   Choreography: the pin holds the hero while the scroll SCRUBS an Old Fashioned
   (finished -> apart -> finished). Only AFTER the drink is rebuilt does the
   wordmark rise in and HOLD (dwell) over the finished serve; then the pin
   RELEASES and the page scrolls on with no cut.
   Light by design: 160 WebP frames (~6MB), watermark-free. On touch/small
   screens or with reduced motion it skips the scrub and shows the finished
   drink + wordmark as a still. */
const FRAME_COUNT = 160;
const framePath = (n: number) => `/frames/of2/frame_${String(n).padStart(4, '0')}.webp`;
const FINISHED = 1; // palindrome starts AND ends on the finished drink

const SCRUB_END = 0.66; // drink fully rebuilt by 66% of the pin
const TEXT_IN0 = 0.70;  // wordmark begins to rise in
const TEXT_IN1 = 0.84;  // wordmark fully in, then holds to 100% before release
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (t: number) => t * t * (3 - 2 * t);

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const canvasEl = canvasRef.current;
    const overlay = overlayRef.current;
    const cue = cueRef.current;
    if (!sectionEl || !canvasEl) return;
    const ctx0 = canvasEl.getContext('2d', { alpha: false });
    if (!ctx0) return;
    const section: HTMLElement = sectionEl;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx0;

    const lite = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || window.matchMedia('(pointer: coarse)').matches
      || window.matchMedia('(max-width: 768px)').matches;

    let drawn: HTMLImageElement | null = null;
    function drawImg(img: HTMLImageElement | null) {
      if (!img || !img.complete || !img.naturalWidth) return;
      drawn = img;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawImg(drawn);
    }
    window.addEventListener('resize', resize);
    resize();

    // Touch / small / reduced-motion: finished drink + wordmark as a still (no scrub, no pin).
    if (lite) {
      if (overlay) { overlay.style.opacity = '1'; overlay.style.transform = 'none'; }
      if (cue) cue.style.opacity = '0';
      const poster = new Image();
      poster.onload = () => drawImg(poster);
      poster.src = framePath(FINISHED);
      if (poster.complete) drawImg(poster);
      return () => window.removeEventListener('resize', resize);
    }

    // Desktop: wordmark stays hidden until the tail of the scrub.
    if (overlay) { overlay.style.opacity = '0'; overlay.style.transform = 'translateY(30px)'; }

    const images: HTMLImageElement[] = [];
    let firstDrawn = false;
    let currentIdx = -1;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      img.onload = () => { if (!firstDrawn) { firstDrawn = true; drawImg(images[0]); } };
      images[i] = img;
    }
    function setFrame(index: number) {
      const i = Math.max(0, Math.min(FRAME_COUNT - 1, index));
      if (i !== currentIdx) { currentIdx = i; drawImg(images[i]); }
    }

    const cgsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=650%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // 1. scrub the serve (finished -> apart -> finished) across 0..SCRUB_END
          const sp = Math.min(p / SCRUB_END, 1);
          setFrame(Math.floor(sp * (FRAME_COUNT - 1)));
          // 2. the wordmark rises in only at the tail, then holds (dwell)
          if (overlay) {
            const e = smooth(clamp01((p - TEXT_IN0) / (TEXT_IN1 - TEXT_IN0)));
            overlay.style.opacity = e.toFixed(3);
            overlay.style.transform = `translateY(${((1 - e) * 30).toFixed(1)}px)`;
          }
          // 3. the scroll cue clears as soon as the scrub begins
          if (cue) cue.style.opacity = clamp01(1 - p / 0.06).toFixed(3);
        },
      });
    }, section);

    return () => {
      cgsap.revert();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="scroll-hero" id="hero" ref={sectionRef}>
      <canvas className="sh-canvas" ref={canvasRef}></canvas>
      <div className="sh-vignette" aria-hidden="true"></div>
      <div className="sh-overlay" ref={overlayRef}>
        {/* Exact live hero markup - cinema.css size/font + real copy. */}
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
      </div>
      <div className="sh-cue" ref={cueRef} aria-hidden="true"><span>Scroll</span><div className="sh-cue-line"></div></div>
    </section>
  );
}
