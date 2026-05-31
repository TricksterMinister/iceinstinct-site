/* ICE & INSTINCT / CINEMA PROTOTYPE
   Lenis smooth-scroll + GSAP timeline + magnetic cursor + horizontal pin tiers + scroll-driven reveals */

(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- GSAP + ScrollTrigger ---------- */
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- MAGNETIC CURSOR ---------- */
  if (isFinePointer && !reduced) {
    const cursor = document.querySelector(".cursor");
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

    document.querySelectorAll('[data-cursor="link"]').forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
    document.querySelectorAll('[data-cursor="view"]').forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-view"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-view"));
    });
  }

  /* ---------- HERO INTRO TIMELINE ---------- */
  // explicit initial states. y:0 wipes any read-from-CSS pixel offset before yPercent applies.
  gsap.set(".hero-title .word .ink", { y: 0, yPercent: 110 });
  gsap.set(".hero-sub .reveal-line > span", { y: 0, yPercent: 110 });
  gsap.set(".chapter-title .line > *", { y: 0, yPercent: 110 });
  gsap.set(".founder-quote .line > *", { y: 0, yPercent: 110 });

  const heroTl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.2 });
  heroTl
    .to(".hero-title .word .ink", { yPercent: 0, duration: 1.4, stagger: 0.08 }, 0)
    .to(".hero-eyebrow", { opacity: 1, duration: 1.0 }, 0.15)
    .to(".hero-meta", { opacity: 1, y: 0, duration: 1.0, stagger: 0.08 }, 0.3)
    .to(".hero-sub .reveal-line > span", { yPercent: 0, duration: 1.0, stagger: 0.08 }, 0.5)
    .to(".hero-cue", { opacity: 1, duration: 0.8 }, 0.9);

  /* ---------- HERO PARALLAX + EXIT ZOOM ---------- */
  gsap.to(".hero-video", {
    scale: 1.18,
    yPercent: 8,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero-stage", {
    yPercent: -22,
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
  });

  /* ---------- CHAPTER (manifesto) reveals ---------- */
  gsap.utils.toArray(".chapter-title .line").forEach((line, i) => {
    const ink = line.querySelector("span") || line;
    gsap.fromTo(ink, { yPercent: 110 }, {
      yPercent: 0, duration: 1.1, ease: "expo.out", delay: i * 0.06,
      scrollTrigger: { trigger: ".chapter", start: "top 75%" }
    });
  });
  gsap.fromTo("[data-stagger]", { y: 28, opacity: 0 }, {
    y: 0, opacity: 1, duration: 1.0, stagger: 0.16, ease: "expo.out",
    scrollTrigger: { trigger: ".chapter-body", start: "top 80%" }
  });
  gsap.to(".chapter-bg-text", {
    yPercent: -22,
    xPercent: 4,
    ease: "none",
    scrollTrigger: { trigger: ".chapter", start: "top bottom", end: "bottom top", scrub: true }
  });

  /* ---------- TIERS HORIZONTAL PIN ---------- */
  const isWide = window.matchMedia("(min-width: 721px)").matches;
  if (isWide && !reduced) {
    const rail = document.querySelector("[data-tiers-rail]");
    const tiers = document.querySelector(".tiers");
    if (rail && tiers) {
      // distance to scroll horizontally = total rail width minus viewport width
      const getDistance = () => rail.scrollWidth - window.innerWidth;
      gsap.to(rail, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: tiers,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });

      // each tier: subtle inward zoom of bg + parallax of body as it crosses center
      gsap.utils.toArray(".tier").forEach((tier) => {
        const bg = tier.querySelector(".tier-bg video");
        const body = tier.querySelector(".tier-body");
        gsap.fromTo(bg, { scale: 1.18, xPercent: 6 }, {
          scale: 1.02, xPercent: -4, ease: "none",
          scrollTrigger: {
            trigger: tier, containerAnimation: ScrollTrigger.getById("tiersRail") || undefined,
            start: "left right", end: "right left", scrub: true,
            horizontal: false
          }
        });
        gsap.fromTo(body, { yPercent: 8, opacity: 0.4 }, {
          yPercent: 0, opacity: 1, ease: "power2.out",
          scrollTrigger: {
            trigger: tier, start: "left 80%", end: "left 30%", scrub: true,
          }
        });
      });
    }
  }

  /* ---------- FOUNDER reveals ---------- */
  gsap.utils.toArray(".founder-quote .line").forEach((line, i) => {
    const ink = line.querySelector("span") || line;
    gsap.fromTo(ink, { yPercent: 110 }, {
      yPercent: 0, duration: 1.1, ease: "expo.out", delay: i * 0.06,
      scrollTrigger: { trigger: ".founder", start: "top 70%" }
    });
  });
  gsap.fromTo(".founder-image img", { yPercent: -6, scale: 1.12 }, {
    yPercent: 6, scale: 1.04, ease: "none",
    scrollTrigger: { trigger: ".founder", start: "top bottom", end: "bottom top", scrub: true }
  });

  /* ---------- GALLERY entrance + drag-to-scroll ---------- */
  gsap.utils.toArray(".gallery-tile").forEach((tile, i) => {
    gsap.fromTo(tile, { y: 36, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: tile, start: "top 92%" }
    });
  });

  // wheel: convert vertical scroll to horizontal track if pointer is over track
  const galleryTrack = document.querySelector("[data-gallery-track]");
  if (galleryTrack) {
    galleryTrack.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        galleryTrack.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });

    // drag to scroll (mouse)
    let isDown = false, startX = 0, startLeft = 0;
    galleryTrack.addEventListener("mousedown", (e) => {
      isDown = true; startX = e.pageX; startLeft = galleryTrack.scrollLeft; galleryTrack.style.cursor = "grabbing";
    });
    window.addEventListener("mouseup", () => { isDown = false; galleryTrack.style.cursor = ""; });
    galleryTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      galleryTrack.scrollLeft = startLeft - (e.pageX - startX);
    });
  }

  /* ---------- CLOSING marble panel reveal ---------- */
  gsap.fromTo(".closing-marble", { scaleY: 0.4 }, {
    scaleY: 1, ease: "expo.out",
    scrollTrigger: { trigger: ".closing", start: "top 80%", end: "top 30%", scrub: 0.6 }
  });
  gsap.fromTo(".closing-stage > *", { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "expo.out",
    scrollTrigger: { trigger: ".closing-stage", start: "top 75%" }
  });

  /* ---------- GHOST WORDS PARALLAX (depth: bg-word moves slower than fg) ---------- */
  gsap.utils.toArray(".section-bg-word").forEach((el) => {
    const direction = el.classList.contains("right") ? 1 : -1;
    gsap.to(el, {
      yPercent: -22,
      xPercent: direction * 6,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section"),
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  /* ---------- PAGER (vertical dots, click to jump + auto-active) ---------- */
  const pagerMap = {
    hero: ".hero",
    manifesto: ".chapter",
    tiers: ".tiers",
    founder: ".founder",
    gallery: ".gallery",
    closing: ".closing"
  };
  const dots = document.querySelectorAll(".pager-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const sel = pagerMap[dot.dataset.pager];
      const target = document.querySelector(sel);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY;
        if (lenis) lenis.scrollTo(top, { duration: 1.4 });
        else window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
  // mark active dot via ScrollTrigger per section
  Object.entries(pagerMap).forEach(([key, sel]) => {
    const sec = document.querySelector(sel);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (st) => {
        if (st.isActive) {
          dots.forEach((d) => d.classList.toggle("is-active", d.dataset.pager === key));
        }
      }
    });
  });

  /* ---------- VANISH HEADER: trigger + overlay open/close ---------- */
  const vaTrigger = document.querySelector(".va-trigger");
  const vaOverlay = document.querySelector(".va-overlay");
  const vaClose = document.querySelector(".va-close");

  function openOverlay() {
    if (!vaOverlay) return;
    vaOverlay.classList.add("is-open");
    vaOverlay.setAttribute("aria-hidden", "false");
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
    // stagger reveal of list items
    gsap.fromTo(".va-list li", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "expo.out", delay: 0.1
    });
    gsap.fromTo(".va-eyebrow, .va-foot", { y: 16, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.05
    });
  }
  function closeOverlay() {
    if (!vaOverlay) return;
    vaOverlay.classList.remove("is-open");
    vaOverlay.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
    document.body.style.overflow = "";
  }
  if (vaTrigger) vaTrigger.addEventListener("click", openOverlay);
  if (vaClose) vaClose.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && vaOverlay && vaOverlay.classList.contains("is-open")) closeOverlay();
  });
  // jumping from overlay closes it
  document.querySelectorAll(".va-list a").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          closeOverlay();
          setTimeout(() => {
            const top = target.getBoundingClientRect().top + window.scrollY;
            if (lenis) lenis.scrollTo(top, { duration: 1.4 });
            else window.scrollTo({ top, behavior: "smooth" });
          }, 400);
        }
      }
    });
  });

  /* ---------- refresh after assets load (videos shift layout) ---------- */
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
