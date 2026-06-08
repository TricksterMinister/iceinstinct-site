import { useEffect, useRef } from 'react';

/**
 * Magnetic cursor, ported 1:1 from cinema/cinema.js.
 * DOM: <div class="cursor"><div class="cursor-dot"/><div class="cursor-ring"/></div>
 * Dot lerps at 0.32, ring lerps at 0.14. Hover adds .is-hover, view adds .is-view.
 * Only runs on fine pointer + non-reduced-motion (matches source guard).
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer || reduced) return;

    const cursor = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!cursor || !dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let frame = 0;
    const tick = () => {
      dx += (mx - dx) * 0.32;
      dy += (my - dy) * 0.32;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    tick();

    const linkEls = Array.from(document.querySelectorAll<HTMLElement>('[data-cursor="link"]'));
    const viewEls = Array.from(document.querySelectorAll<HTMLElement>('[data-cursor="view"]'));

    const linkEnter = () => cursor.classList.add('is-hover');
    const linkLeave = () => cursor.classList.remove('is-hover');
    const viewEnter = () => cursor.classList.add('is-view');
    const viewLeave = () => cursor.classList.remove('is-view');

    linkEls.forEach((el) => {
      el.addEventListener('mouseenter', linkEnter);
      el.addEventListener('mouseleave', linkLeave);
    });
    viewEls.forEach((el) => {
      el.addEventListener('mouseenter', viewEnter);
      el.addEventListener('mouseleave', viewLeave);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      linkEls.forEach((el) => {
        el.removeEventListener('mouseenter', linkEnter);
        el.removeEventListener('mouseleave', linkLeave);
      });
      viewEls.forEach((el) => {
        el.removeEventListener('mouseenter', viewEnter);
        el.removeEventListener('mouseleave', viewLeave);
      });
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true" ref={rootRef}>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </div>
  );
}
