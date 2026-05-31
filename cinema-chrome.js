/* ================================================
   CINEMA CHROME JS - Vanish nav + magnetic cursor + ghost-word parallax
   Loaded on deep pages alongside /script.js. Depends on optional GSAP.
   ================================================ */

(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- MAGNETIC CURSOR ---------- */
  if (isFinePointer && !reduced) {
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      const dot = cursor.querySelector(".cursor-dot");
      const ring = cursor.querySelector(".cursor-ring");
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let dx = mx, dy = my, rx = mx, ry = my;
      window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
      function tick() {
        dx += (mx - dx) * 0.32;
        dy += (my - dy) * 0.32;
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(tick);
      }
      tick();
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
      });
      document.querySelectorAll('.gallery-tile').forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("is-view"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("is-view"));
      });
    }
  }

  /* ---------- VANISH NAV: open/close + ESC + click-jump ---------- */
  const vaTrigger = document.querySelector(".va-trigger");
  const vaOverlay = document.querySelector(".va-overlay");
  const vaClose = document.querySelector(".va-close");

  function openOverlay() {
    if (!vaOverlay) return;
    vaOverlay.classList.add("is-open");
    vaOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (window.gsap) {
      gsap.fromTo(".va-list li", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "expo.out", delay: 0.1
      });
      gsap.fromTo(".va-eyebrow, .va-foot", { y: 16, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.05
      });
    }
  }
  function closeOverlay() {
    if (!vaOverlay) return;
    vaOverlay.classList.remove("is-open");
    vaOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (vaTrigger) vaTrigger.addEventListener("click", openOverlay);
  if (vaClose) vaClose.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && vaOverlay && vaOverlay.classList.contains("is-open")) closeOverlay();
  });

  /* ---------- GHOST-WORD PARALLAX (if GSAP+ScrollTrigger present) ---------- */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".section-bg-word").forEach((el) => {
      gsap.to(el, {
        yPercent: -22,
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section, main") || el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }
})();
