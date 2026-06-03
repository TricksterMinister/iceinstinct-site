import { useEffect, useRef } from 'react';

// Ambient particle field behind the profiler. Mode follows the chosen Anchor
// (Smoke / Frost / Ember / Bloom). Ported in spirit from the Antigravity
// prototype, but strictly monochrome + champagne - no colour, no glow.
// Honors prefers-reduced-motion (renders nothing animated).

type Mode = 'Smoke' | 'Frost' | 'Ember' | 'Bloom' | null;

interface P { x: number; y: number; vx: number; vy: number; r: number; a: number; life: number; }

const CHAMPAGNE = '228,212,172';

export function PalateAmbient({ mode }: { mode: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const ps: P[] = [];
    let t = 0;

    const spawn = (m: Mode) => {
      if (m === 'Smoke') return { x: Math.random() * W, y: H + 20, vx: (Math.random() - 0.5) * 0.2, vy: -0.3 - Math.random() * 0.4, r: 30 + Math.random() * 50, a: 0.05 + Math.random() * 0.05, life: 1 };
      if (m === 'Frost') return { x: Math.random() * W, y: -20, vx: (Math.random() - 0.5) * 0.3, vy: 0.5 + Math.random() * 0.7, r: 1 + Math.random() * 2, a: 0.25 + Math.random() * 0.4, life: 1 };
      if (m === 'Ember') return { x: Math.random() * W, y: H + 20, vx: (Math.random() - 0.5) * 0.4, vy: -0.6 - Math.random() * 0.9, r: 1 + Math.random() * 1.6, a: 0.4 + Math.random() * 0.4, life: 1 };
      // Bloom - concentric ring seeds
      return { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, r: 0, a: 0.3, life: 1 };
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 1;
      ctx.clearRect(0, 0, W, H);
      const m = modeRef.current;
      if (!m) return;

      const cap = m === 'Smoke' ? 26 : m === 'Bloom' ? 14 : 90;
      const rate = m === 'Smoke' ? 2 : m === 'Bloom' ? 10 : 2;
      if (ps.length < cap && t % rate === 0) ps.push(spawn(m));

      for (let k = ps.length - 1; k >= 0; k--) {
        const p = ps[k];
        if (m === 'Bloom') {
          p.r += 0.7; p.life -= 0.006;
          if (p.life <= 0) { ps.splice(k, 1); continue; }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${CHAMPAGNE},${(p.a * p.life).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          continue;
        }
        p.x += p.vx; p.y += p.vy;
        if (m === 'Smoke') { p.life -= 0.004; p.r += 0.15; }
        if (m === 'Ember') { p.life -= 0.008; p.vy *= 0.997; }
        const dead = p.life <= 0 || p.y < -60 || p.y > H + 60;
        if (dead) { ps.splice(k, 1); continue; }
        const alpha = (m === 'Frost' ? p.a : p.a * p.life).toFixed(3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (m === 'Smoke') {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `rgba(${CHAMPAGNE},${alpha})`);
          g.addColorStop(1, 'rgba(228,212,172,0)');
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = `rgba(${CHAMPAGNE},${alpha})`;
        }
        ctx.fill();
      }
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="pp-ambient" aria-hidden="true" />;
}
