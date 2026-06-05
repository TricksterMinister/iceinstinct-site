import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical pager dots, ported 1:1 from cinema/cinema.js.
 * DOM: <aside class="pager"> with 7 .pager-dot buttons (data-pager + <span> 01..07).
 * Click jumps to the section; ScrollTrigger marks the active dot.
 */
const pagerMap: Record<string, string> = {
  hero: '.hero',
  manifesto: '#manifesto',
  founder: '.founder',
  gallery: '.gallery',
  tiers: '.tiers',
  concierge: '.concierge',
  duality: '.duality',
  closing: '.closing-segment',
};

const dotDefs: { key: string; label: string }[] = [
  { key: 'hero', label: '01' },
  { key: 'manifesto', label: '02' },
  { key: 'founder', label: '03' },
  { key: 'gallery', label: '04' },
  { key: 'tiers', label: '05' },
  { key: 'concierge', label: '06' },
  { key: 'duality', label: '07' },
  { key: 'closing', label: '08' },
];

export function Pager() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('.pager-dot'));

    const onClick = (dot: HTMLButtonElement) => () => {
      const key = dot.dataset.pager;
      if (!key) return;
      const sel = pagerMap[key];
      const target = sel ? document.querySelector(sel) : null;
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY;
        const lenis = (window as unknown as { lenis?: { scrollTo(target: number, opts?: { duration?: number }): void } }).lenis;
        if (lenis) lenis.scrollTo(top, { duration: 1.4 });
        else window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    const handlers = dots.map((dot) => {
      const h = onClick(dot);
      dot.addEventListener('click', h);
      return h;
    });

    const triggers: ScrollTrigger[] = [];
    Object.entries(pagerMap).forEach(([key, sel]) => {
      const sec = document.querySelector(sel);
      if (!sec) return;
      const st = ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) {
            dots.forEach((d) => d.classList.toggle('is-active', d.dataset.pager === key));
          }
        },
      });
      triggers.push(st);
    });

    return () => {
      dots.forEach((dot, i) => dot.removeEventListener('click', handlers[i]));
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <aside className="pager" aria-hidden="true" ref={rootRef}>
      {dotDefs.map(({ key, label }) => (
        <button
          key={key}
          className={key === 'hero' ? 'pager-dot is-active' : 'pager-dot'}
          data-pager={key}
        >
          <span>{label}</span>
        </button>
      ))}
    </aside>
  );
}
