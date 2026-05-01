// Ice & Instinct - minimal site behaviour
// Progressive enhancement only. Works fully without JS.

(function () {
  'use strict';

  // ----- Header scroll state -----
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Reveal on scroll -----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal');
  if (targets.length && !reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add('is-in'));
  }

  // ----- Pre-fill package select on /contact/ from ?package=...&service=... -----
  const params = new URLSearchParams(window.location.search);
  const pkg = params.get('package') || params.get('service');
  if (pkg) {
    const sel = document.getElementById('package');
    if (sel) {
      const valid = Array.from(sel.options).some(o => o.value === pkg);
      if (valid) sel.value = pkg;
    }
  }

  // ----- Formspree submit handler -----
  const form = document.querySelector('form[action*="formspree.io"]');
  const success = document.getElementById('form-success');
  const errorBox = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send';
      const data = new FormData(form);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending…';
      }
      if (errorBox) {
        errorBox.classList.remove('show');
        errorBox.textContent = '';
      }

      const showError = (msg) => {
        if (errorBox) {
          errorBox.textContent = msg;
          errorBox.classList.add('show');
        } else {
          alert(msg);
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      };

      // Guard: form must be wired to a real Formspree ID
      if (form.action.includes('REPLACE_WITH_FORMSPREE_ID')) {
        showError('Form not configured yet. Please write to hello@iceinstinct.com directly.');
        return;
      }

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
        const body = await res.json().catch(() => ({}));
        const accepted = res.ok &&
          body.ok !== false &&
          body.kind !== 'error' &&
          !body.error && !body.errors;

        if (accepted) {
          form.reset();
          if (success) success.classList.add('show');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          // Smooth scroll to confirmation
          if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const apiMsg =
            body.error ||
            (Array.isArray(body.errors) && body.errors.map(x => x.message || x).join('; ')) ||
            ('HTTP ' + res.status);
          console.error('Formspree rejected submission:', body);
          showError('Could not send: ' + apiMsg + '. Please email hello@iceinstinct.com instead.');
        }
      } catch (err) {
        console.error('Formspree network error:', err);
        showError('Could not reach the server. Please email hello@iceinstinct.com instead.');
      }
    });
  }
})();
