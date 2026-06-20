import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollHero.css';

gsap.registerPlugin(ScrollTrigger);

/* Scroll-cinematic hero (GSAP ScrollTrigger pin + canvas frame-scrub). The serve
   plays finished -> apart -> finished; the last stretch holds the finished drink
   (dwell), then the pin RELEASES so the next section continues the scroll - no cut.
   Light by design: 160 WebP frames (~6MB), an Old Fashioned built then unbuilt.
   On touch/small screens or with reduced
   motion it skips the scrub entirely and shows the finished drink as a still. */
const FRAME_COUNT = 160;
const framePath = (n: number) => `/frames/of/frame_${String(n).padStart(4, '0')}.webp`;
const FINISHED = 1; // palindrome starts AND ends on the finished drink

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const canvasEl = canvasRef.current;
    const overlay = overlayRef.current;
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

    // Touch / small / reduced-motion: just the finished drink, no scrub, no pin.
    if (lite) {
      const poster = new Image();
      poster.onload = () => drawImg(poster);
      poster.src = framePath(FINISHED);
      if (poster.complete) drawImg(poster);
      return () => window.removeEventListener('resize', resize);
    }

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

    const SCRUB_END = 0.82; // assembled by 82%, then holds (dwell) to 100% before the pin releases
    const cgsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=850%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const sp = Math.min(p / SCRUB_END, 1);
          setFrame(Math.floor(sp * (FRAME_COUNT - 1)));
          if (overlay) {
            const o = Math.max(0, Math.min(1, 1 - p / 0.12));
            overlay.style.opacity = o.toFixed(3);
            overlay.style.transform = `translateY(${(-p * 60).toFixed(1)}px)`;
          }
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
      <div className="sh-cue" aria-hidden="true"><span>Scroll</span><div className="sh-cue-line"></div></div>
    </section>
  );
}
