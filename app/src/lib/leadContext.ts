// WHERE the lead came from and WHAT they composed, persisted for the session
// so the inquiry / booking / WhatsApp message carries it. First touch wins:
// the landing source is captured once and never overwritten while navigating.

const SRC_KEY = 'ii-source';
const COCKTAIL_KEY = 'ii-cocktail';

export type LeadSource = { source: string; landing: string };

/** Pure: derive a source label from URL search, referrer and landing path. */
export function parseSource(search: string, referrer: string, landing: string): LeadSource {
  const q = new URLSearchParams(search);
  const explicit = q.get('utm_source') || q.get('source');
  if (explicit) {
    const parts = [explicit, q.get('utm_medium'), q.get('utm_campaign')].filter(Boolean);
    return { source: parts.join(' / '), landing };
  }
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, '');
      if (!host.endsWith('iceinstinct.com')) return { source: host, landing };
    } catch {
      /* malformed referrer - treat as direct */
    }
  }
  return { source: 'direct', landing };
}

export function captureSource() {
  if (typeof window === 'undefined') return;
  try {
    if (window.sessionStorage.getItem(SRC_KEY)) return; // first touch wins
    const s = parseSource(window.location.search, document.referrer, window.location.pathname);
    window.sessionStorage.setItem(SRC_KEY, JSON.stringify(s));
  } catch {
    /* private mode - attribution simply not available */
  }
}

export function readSource(): LeadSource | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(SRC_KEY);
    return raw ? (JSON.parse(raw) as LeadSource) : null;
  } catch {
    return null;
  }
}

export function setCocktail(name: string) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(COCKTAIL_KEY, name);
  } catch {
    /* private mode */
  }
}

export function readCocktail(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.sessionStorage.getItem(COCKTAIL_KEY) || '';
  } catch {
    return '';
  }
}
