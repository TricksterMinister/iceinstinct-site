/* =====================================================================
   MY STORY - cinematic scroll choreography (agency-tier, brand-safe)
   GSAP + ScrollTrigger. transform/opacity only. No blur (commandment #3).
   Degrades gracefully: without GSAP or with reduced-motion, content is
   fully visible and static.
   ===================================================================== */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  gsap.registerPlugin(ScrollTrigger);
  var EXPO = 'expo.out';

  /* ---------- COVER: cinematic parallax ---------- */
  var cover = document.querySelector('.story-cover');
  if (cover) {
    // portrait slowly scales + drifts as the cover scrolls away
    gsap.to('.story-cover-img', {
      scale: 1.12, yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: cover, start: 'top top', end: 'bottom top', scrub: true }
    });
    // ghost wordmark drifts up, the id panel lifts and fades
    gsap.to('.story-cover-ghost', {
      yPercent: -16, ease: 'none',
      scrollTrigger: { trigger: cover, start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.story-cover-id', {
      yPercent: 32, opacity: 0.25, ease: 'none',
      scrollTrigger: { trigger: cover, start: 'top top', end: 'bottom top', scrub: true }
    });
    // opening title card rises on load
    gsap.from('.story-cover-id > *', {
      y: 28, opacity: 0, duration: 1.1, ease: EXPO, stagger: 0.12, delay: 0.15
    });
  }

  /* ---------- JOURNEY: stops cascade in, numbers slide ---------- */
  gsap.utils.toArray('.journey-stop').forEach(function (stop) {
    var tl = gsap.timeline({ scrollTrigger: { trigger: stop, start: 'top 86%' } });
    tl.from(stop, { y: 42, opacity: 0, duration: 0.9, ease: EXPO })
      .from(stop.querySelector('.journey-no'), { x: -18, opacity: 0, duration: 0.9, ease: EXPO }, 0.05)
      .from(stop.querySelector('.journey-city'), { y: 18, opacity: 0, duration: 0.8, ease: EXPO }, 0.12);
  });

  /* ---------- PHILOSOPHY: the two words land with weight ---------- */
  gsap.utils.toArray('.philosophy-line').forEach(function (line, i) {
    gsap.from(line, {
      y: 30, opacity: 0, duration: 1, ease: EXPO, delay: i * 0.12,
      scrollTrigger: { trigger: line, start: 'top 85%' }
    });
  });

  /* ---------- MAGNETIC CTA buttons (closing panel) ---------- */
  document.querySelectorAll('#final-cta .btn').forEach(function (btn) {
    var qx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
    var qy = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      qx((e.clientX - r.left - r.width / 2) * 0.28);
      qy((e.clientY - r.top - r.height / 2) * 0.4);
    });
    btn.addEventListener('mouseleave', function () { qx(0); qy(0); });
  });
})();

/* =====================================================================
   FAQ - smooth accordion (no GSAP needed). Animates the answer height
   so <details> opens/closes fluidly across all browsers. With
   reduced-motion, native instant toggle is left untouched.
   ===================================================================== */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var summary = item.querySelector('summary');
    var answer = item.querySelector('.faq-answer');
    if (!summary || !answer) return;
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (answer.dataset.busy === '1') return;
      answer.dataset.busy = '1';
      var done = function (ev) {
        if (ev.propertyName !== 'height') return;
        answer.removeEventListener('transitionend', done);
        answer.style.height = '';
        answer.dataset.busy = '';
      };
      if (item.open) {
        answer.style.height = answer.scrollHeight + 'px';
        answer.addEventListener('transitionend', function close(ev) {
          if (ev.propertyName !== 'height') return;
          answer.removeEventListener('transitionend', close);
          item.open = false;
          answer.style.height = '';
          answer.dataset.busy = '';
        });
        requestAnimationFrame(function () { answer.style.height = '0px'; });
      } else {
        item.open = true;
        var h = answer.scrollHeight;
        answer.style.height = '0px';
        answer.addEventListener('transitionend', done);
        requestAnimationFrame(function () { answer.style.height = h + 'px'; });
      }
    });
  });
})();
