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
