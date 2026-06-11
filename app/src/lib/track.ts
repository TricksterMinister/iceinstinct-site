// One funnel, one vocabulary: every analytics event on the site goes through
// track(). gtag when GA4 is loaded, dataLayer queue otherwise (consent tools
// and ad blockers can delay or remove gtag), no-op during SSR/prerender.

type Params = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === 'function') w.gtag('event', event, params);
  else (w.dataLayer = w.dataLayer || []).push({ event, ...params });
}

/** Map an anchor href to its funnel event, or null when it is not a tracked CTA. */
export function resolveCtaEvent(href: string): string | null {
  if (/youcanbook\.me/i.test(href)) return 'booking_click';
  if (/wa\.me|api\.whatsapp\.com/i.test(href)) return 'whatsapp_click';
  if (href.startsWith('tel:')) return 'call_click';
  if (/instagram\.com/i.test(href)) return 'instagram_click';
  return null;
}

// Outbound CTAs (booking, WhatsApp, call, Instagram) are plain <a> tags spread
// across many components; one capture-phase listener catches them all without
// touching each component. Internal /contact/ links are deliberately NOT
// tracked here - the form's own inquiry_form_start / inquiry_submit are the
// meaningful signal, nav clicks would be noise.
//
// Full event vocabulary:
//   inquiry_form_start - first focus on the /contact/ inquiry form
//   inquiry_submit     - inquiry form sent successfully (Formspree ok)
//   inquiry_error      - inquiry form Formspree error (else branch or catch)
//   bench_form_start   - first focus on the /work-with-us/ bench application form
//   bench_apply        - bench application sent successfully (Formspree ok)
//   bench_apply_error  - bench application Formspree error (else branch or catch)
//   email_capture      - profiler keepsake email captured (Formspree ok)
//   gift_click         - /gift/ voucher CTA click (param: tier)
//   quote_click        - /events/ closing quote CTA click (param: source)
//   two_floors_click   - home two-floors door click (param: door instinct|ice)
//   instinct_bridge_click - /events/ bridge to the INSTINCT floor
//   profiler_* / keepsake_* - Palate Profiler funnel (see PalateProfiler.tsx)
//   booking_click      - outbound youcanbook.me link
//   whatsapp_click     - outbound WhatsApp link
//   call_click         - tel: link
//   instagram_click    - outbound Instagram link
let installed = false;
export function initCtaTracking() {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const event = resolveCtaEvent(href);
      if (event) track(event, { href, page: window.location.pathname });
    },
    { capture: true }
  );
}
