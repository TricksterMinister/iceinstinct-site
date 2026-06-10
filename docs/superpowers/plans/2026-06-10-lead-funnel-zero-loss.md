# Lead Funnel Zero-Loss Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every CTA on iceinstinct.com delivers the lead WITH full context (what they composed, what they picked, where they came from) to the owner, and every meaningful client action fires a GA4 event - zero information loss, zero new friction for the client.

**Architecture:** Two small libraries (`track.ts` for analytics, `leadContext.ts` for first-touch attribution + profiler cocktail persistence) are initialized on every page via a shared `funnelInit.ts` side-effect module imported by each Vite MPA entry. The Contact form is upgraded to read ALL inbound query params (today it silently drops the Profiler's `?cocktail=...`) and to attach hidden context fields to the Formspree submission. WhatsApp gets a prefilled message. The Concierge toggle, Profiler, and outbound booking/WhatsApp/call/Instagram links all fire GA4 events through one delegated listener plus a few explicit hooks.

**Tech Stack:** React 19 + Vite MPA (15 client entries), TypeScript, vitest 4 (pure-function tests, node env - no jsdom), Formspree (`xpwkadgp`), GA4 (`G-KBVETWTVVH`), YouCanBook.me, sessionStorage.

**Hard repo rules (obey):**
- No em-dashes / en-dashes anywhere - plain hyphens only (a hook blocks them).
- Never open a browser on the owner's desktop. Verify via `curl` only.
- `app/public/assets` is a symlink - never touch it.
- Working dir for all app commands: `app/` inside the worktree.
- Deploy = push to `main` auto-deploys Hostinger. Do NOT push until the final deploy task, and confirm with Temo first.

**Existing funnel facts (verified 2026-06-10):**
- Contact form POSTs to `https://formspree.io/f/xpwkadgp`, honeypot `_gotcha`, mailto fallback to `alchemyandice.nyc@gmail.com`, GA4 event `inquiry_submit` fired inline (this inline code moves into `track.ts`).
- Profiler "Commission this serving" navigates to `/contact/?cocktail=...&identity=...&taste=...&accord=...` but `Contact.tsx` reads ONLY `enhancements` - the cocktail is lost. This plan fixes that.
- Optional enhancements live in sessionStorage key `ii-evening` via `app/src/lib/evening.ts` (`readEvening()` / `useEvening()`).
- Offering pages deep-link to `https://enter-ritual.youcanbook.me/?service=jsid...&NOTES=...`.
- GA4 tag `G-KBVETWTVVH` is loaded from each page's static `index.html` (verified live).

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/src/lib/track.ts` | Create | `track()` safe gtag wrapper, `resolveCtaEvent()` pure href-to-event mapper, `initCtaTracking()` delegated click listener |
| `app/src/lib/track.test.ts` | Create | Unit tests for `resolveCtaEvent` |
| `app/src/lib/leadContext.ts` | Create | `parseSource()` pure first-touch parser, `captureSource()`, `readSource()`, `setCocktail()`, `readCocktail()` |
| `app/src/lib/leadContext.test.ts` | Create | Unit tests for `parseSource` |
| `app/src/lib/funnelInit.ts` | Create | Side-effect module: capture source + install CTA tracking, imported by every client entry |
| `app/src/main-*.tsx` (15 files) | Modify | One-line import of `funnelInit` |
| `app/src/lib/evening.ts` | Modify | Fire `enhancement_add` / `enhancement_remove` in `toggle` |
| `app/src/pages/Contact.tsx` | Modify | Prefill from cocktail params + enhancements + sessionStorage fallback; enrich Formspree payload; `inquiry_form_start` / `inquiry_error` events; WhatsApp prefilled text |
| `app/src/pages/GalleryPage.tsx` | Modify | Persist cocktail on commission, `profiler_open` + `profiler_commission` events |
| `app/src/features/Profiler/PalateProfiler.tsx` | Modify | `profiler_complete`, `keepsake_print`, `keepsake_save`, `keepsake_share` events |
| `STATE.md` | Modify | Session handoff note (final task) |

**GA4 event vocabulary introduced by this plan** (snake_case, consistent - do not improvise other names):

| Event | Fired when | Params |
|---|---|---|
| `booking_click` | Any click on a youcanbook.me link | `href`, `page` |
| `whatsapp_click` | Any click on wa.me link | `href`, `page` |
| `call_click` | Any click on tel: link | `href`, `page` |
| `instagram_click` | Any click on instagram.com link | `href`, `page` |
| `enhancement_add` / `enhancement_remove` | Concierge "Add to my evening" toggle | `name`, `page` |
| `profiler_open` | "Compose your signature" clicked | - |
| `profiler_complete` | Profiler reaches result phase | `cocktail` |
| `profiler_commission` | "Commission this serving" clicked | `cocktail` |
| `keepsake_print` / `keepsake_save` / `keepsake_share` | Keepsake buttons | `cocktail` |
| `inquiry_form_start` | First focus into the Inquire form | - |
| `inquiry_submit` | Formspree returned ok (exists today, moves to `track()`) | `method` |
| `inquiry_error` | Formspree failed, mailto fallback fired | - |

---

### Task 1: `track.ts` - analytics wrapper + CTA event mapper

**Files:**
- Create: `app/src/lib/track.ts`
- Test: `app/src/lib/track.test.ts`

- [ ] **Step 1: Write the failing test**

Create `app/src/lib/track.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { resolveCtaEvent } from './track';

describe('resolveCtaEvent', () => {
  it('maps YouCanBook.me links to booking_click', () => {
    expect(resolveCtaEvent('https://enter-ritual.youcanbook.me/?service=jsid1437636')).toBe('booking_click');
  });
  it('maps wa.me links to whatsapp_click', () => {
    expect(resolveCtaEvent('https://wa.me/19172927859')).toBe('whatsapp_click');
    expect(resolveCtaEvent('https://wa.me/19172927859?text=Hello')).toBe('whatsapp_click');
  });
  it('maps tel: links to call_click', () => {
    expect(resolveCtaEvent('tel:+19172927859')).toBe('call_click');
  });
  it('maps Instagram links to instagram_click', () => {
    expect(resolveCtaEvent('https://www.instagram.com/iceinstinctnyc/')).toBe('instagram_click');
  });
  it('returns null for internal navigation', () => {
    expect(resolveCtaEvent('/contact/')).toBeNull();
    expect(resolveCtaEvent('/offerings/omakase/')).toBeNull();
    expect(resolveCtaEvent('#final-cta')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `app/`): `npx vitest run src/lib/track.test.ts`
Expected: FAIL - `Cannot find module './track'` (or equivalent resolve error).

- [ ] **Step 3: Write the implementation**

Create `app/src/lib/track.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run (from `app/`): `npx vitest run src/lib/track.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add app/src/lib/track.ts app/src/lib/track.test.ts
git commit -m "feat(funnel): track() wrapper + delegated outbound CTA tracking (booking/WhatsApp/call/Instagram)"
```

---

### Task 2: `leadContext.ts` - first-touch source + profiler cocktail persistence

**Files:**
- Create: `app/src/lib/leadContext.ts`
- Test: `app/src/lib/leadContext.test.ts`

- [ ] **Step 1: Write the failing test**

Create `app/src/lib/leadContext.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { parseSource } from './leadContext';

describe('parseSource', () => {
  it('prefers utm_source and joins medium/campaign', () => {
    expect(parseSource('?utm_source=instagram&utm_medium=bio&utm_campaign=launch', '', '/')).toEqual({
      source: 'instagram / bio / launch',
      landing: '/',
    });
  });
  it('accepts a bare ?source= param', () => {
    expect(parseSource('?source=linkedin', '', '/offerings/')).toEqual({
      source: 'linkedin',
      landing: '/offerings/',
    });
  });
  it('falls back to the external referrer hostname', () => {
    expect(parseSource('', 'https://www.google.com/search?q=clear+ice', '/')).toEqual({
      source: 'google.com',
      landing: '/',
    });
  });
  it('treats own-domain referrer as direct', () => {
    expect(parseSource('', 'https://www.iceinstinct.com/gallery/', '/contact/')).toEqual({
      source: 'direct',
      landing: '/contact/',
    });
  });
  it('survives an unparseable referrer', () => {
    expect(parseSource('', 'not a url', '/')).toEqual({ source: 'direct', landing: '/' });
  });
  it('returns direct when nothing is known', () => {
    expect(parseSource('', '', '/')).toEqual({ source: 'direct', landing: '/' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `app/`): `npx vitest run src/lib/leadContext.test.ts`
Expected: FAIL - cannot resolve `./leadContext`.

- [ ] **Step 3: Write the implementation**

Create `app/src/lib/leadContext.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run (from `app/`): `npx vitest run src/lib/leadContext.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add app/src/lib/leadContext.ts app/src/lib/leadContext.test.ts
git commit -m "feat(funnel): first-touch source attribution + profiler cocktail persistence"
```

---

### Task 3: `funnelInit.ts` wired into all 15 client entries

**Files:**
- Create: `app/src/lib/funnelInit.ts`
- Modify: all 15 `app/src/main-*.tsx` files (NOT `entry-server.tsx` - it runs in node during prerender)

- [ ] **Step 1: Create the side-effect module**

Create `app/src/lib/funnelInit.ts`:

```ts
// Imported for side effects by every client entry (main-*.tsx): capture the
// first-touch source and install the delegated outbound-CTA tracker. Both are
// idempotent and SSR-safe, so the import order inside an entry does not matter.
import { captureSource } from './leadContext';
import { initCtaTracking } from './track';

captureSource();
initCtaTracking();
```

- [ ] **Step 2: Add the import to every client entry**

In EACH of these 15 files, add one line directly after the existing CSS imports (before the React imports):

```
app/src/main-accessibility.tsx
app/src/main-bespoke.tsx
app/src/main-concierge.tsx
app/src/main-contact.tsx
app/src/main-cookies.tsx
app/src/main-foundation.tsx
app/src/main-gallery.tsx
app/src/main-home.tsx
app/src/main-mystory.tsx
app/src/main-offerings.tsx
app/src/main-omakase.tsx
app/src/main-privacy.tsx
app/src/main-responsible-service.tsx
app/src/main-simplicity.tsx
app/src/main-terms.tsx
```

The line to add:

```ts
import './lib/funnelInit';
```

Example - `app/src/main-contact.tsx` after the edit:

```tsx
import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import './styles/offering.css';
import './lib/funnelInit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Contact } from './pages/Contact';
createRoot(document.getElementById('root')!).render(<StrictMode><Contact /></StrictMode>);
```

Do NOT touch `app/src/entry-server.tsx`.

- [ ] **Step 3: Verify the wiring**

Run (from `app/`): `grep -L "funnelInit" src/main-*.tsx`
Expected: empty output (every entry imports it).

Run (from `app/`): `npx tsc --noEmit`
Expected: clean exit, no errors.

- [ ] **Step 4: Commit**

```bash
git add app/src/lib/funnelInit.ts app/src/main-*.tsx
git commit -m "feat(funnel): initialize source capture + CTA tracking on every page"
```

---

### Task 4: enhancement toggle events in `evening.ts`

**Files:**
- Modify: `app/src/lib/evening.ts` (the `toggle` function inside `useEvening`)

- [ ] **Step 1: Add the tracking call**

In `app/src/lib/evening.ts`, add the import at the top:

```ts
import { track } from './track';
```

Then replace the existing `toggle` function inside `useEvening`:

```ts
  const toggle = (name: string) => {
    const cur = readEvening();
    const next = cur.includes(name) ? cur.filter((x) => x !== name) : [...cur, name];
    writeEvening(next);
    setPicked(next);
  };
```

with:

```ts
  const toggle = (name: string) => {
    const cur = readEvening();
    const adding = !cur.includes(name);
    const next = adding ? [...cur, name] : cur.filter((x) => x !== name);
    writeEvening(next);
    setPicked(next);
    track(adding ? 'enhancement_add' : 'enhancement_remove', {
      name,
      page: window.location.pathname,
    });
  };
```

- [ ] **Step 2: Verify**

Run (from `app/`): `npx tsc --noEmit && npx vitest run`
Expected: clean typecheck, all existing tests pass.

- [ ] **Step 3: Commit**

```bash
git add app/src/lib/evening.ts
git commit -m "feat(funnel): GA4 events on enhancement add/remove"
```

---

### Task 5: Contact form - read EVERYTHING inbound (fixes the Profiler data loss)

**Files:**
- Modify: `app/src/pages/Contact.tsx` (the prefill `useEffect`, currently lines 31-38)

Today the effect reads only `?enhancements=`. The Profiler sends `?cocktail=&identity=&taste=&accord=` and all of it is silently dropped. Also, a guest who picked enhancements but arrived at /contact/ via the header (no query param) loses them too - `sessionStorage` already has them, the form just never looks.

- [ ] **Step 1: Add imports**

In `app/src/pages/Contact.tsx`, extend the imports at the top of the file:

```ts
import { readEvening, useEvening } from '../lib/evening';
import { readCocktail, readSource } from '../lib/leadContext';
import { track } from '../lib/track';
```

Also extend the existing React import to include `useRef`:

```ts
import { useEffect, useRef, useState } from 'react';
```

- [ ] **Step 2: Replace the prefill effect**

Replace this existing block:

```tsx
  // Arriving from the Concierge "Request these" tray: pre-fill the note with the
  // enhancements the guest selected, so the inquiry carries their evening.
  useEffect(() => {
    const enh = new URLSearchParams(window.location.search).get('enhancements');
    if (!enh) return;
    const list = enh.split('|').map((s) => s.trim()).filter(Boolean).join(', ');
    if (list) {
      setMessage(`Enhancements I would like to include: ${list}.\n\nThe evening I have in mind (date, room, guest count): `);
    }
  }, []);
```

with:

```tsx
  // Pre-fill the note with everything the guest has already told the site, so
  // nothing is lost between pages: the Profiler signature (?cocktail=...), the
  // Concierge tray (?enhancements=...), or the enhancements remembered in
  // sessionStorage when they arrive with no params at all.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const parts: string[] = [];

    const cocktail = q.get('cocktail');
    if (cocktail) {
      const traits = [q.get('identity'), q.get('taste'), q.get('accord')].filter(Boolean).join(', ');
      parts.push(
        `The signature composed for me in the Palate Profiler: ${cocktail}${traits ? ` (${traits})` : ''}. I would like to commission this serving for my evening.`
      );
    }

    const enhParam = q.get('enhancements');
    const enh = enhParam
      ? enhParam.split('|').map((s) => s.trim()).filter(Boolean)
      : readEvening();
    if (enh.length) parts.push(`Enhancements I would like to include: ${enh.join(', ')}.`);

    if (!parts.length) return;
    parts.push('The evening I have in mind (date, room, guest count): ');
    setMessage(parts.join('\n\n'));
  }, []);
```

- [ ] **Step 3: Verify**

Run (from `app/`): `npx tsc --noEmit`
Expected: clean. (`useEvening`, `readCocktail`, `readSource`, `track`, `useRef` are imported but some not yet used - if tsc flags unused imports, that is acceptable to defer because Task 6 uses them immediately; if the build is configured with `noUnusedLocals`, do Task 6 before running tsc and commit both together with the Task 6 message.)

- [ ] **Step 4: Commit**

```bash
git add app/src/pages/Contact.tsx
git commit -m "fix(contact): prefill carries Profiler signature + remembered enhancements (was: cocktail params silently dropped)"
```

---

### Task 6: Contact form - send EVERYTHING outbound + form events + WhatsApp prefill

**Files:**
- Modify: `app/src/pages/Contact.tsx` (the `onSubmit` handler, the form JSX, the WhatsApp link)

- [ ] **Step 1: Add form-start ref and evening hook inside the component**

Inside the `Contact` component, after the existing `useState` declarations, add:

```tsx
  const [evening] = useEvening();
  const formStarted = useRef(false);
  const onFormStart = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    track('inquiry_form_start');
  };
```

- [ ] **Step 2: Replace the `onSubmit` handler**

Replace the existing `onSubmit` (the whole `const onSubmit = async ...` block) with:

```tsx
  // Post the inquiry to Formspree so the lead is archived in its dashboard and
  // delivered through real mail infrastructure - shared-host mail() lands in
  // spam or vanishes with no trace. _gotcha is Formspree's honeypot: a filled
  // value makes it silently discard the submission while still returning ok.
  // Alongside the guest's own words, attach the context the site already
  // knows - enhancements, Profiler signature, first-touch source - so the
  // owner's email carries the full picture without the guest retyping it.
  // Fall back to mailto only if the endpoint is unreachable.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const data = new FormData();
      data.set('name', name);
      data.set('email', email);
      data.set('message', message);
      data.set('_gotcha', company);

      const enh = readEvening();
      const cocktail = readCocktail();
      const src = readSource();
      if (enh.length) data.set('enhancements', enh.join(', '));
      if (cocktail) data.set('cocktail', cocktail);
      if (src) {
        data.set('source', src.source);
        data.set('landing_page', src.landing);
      }
      const subject =
        'Ice & Instinct inquiry' +
        (cocktail ? ' - ' + cocktail : '') +
        (enh.length ? ` - ${enh.length} enhancement${enh.length > 1 ? 's' : ''}` : '');
      data.set('_subject', subject);

      const res = await fetch('https://formspree.io/f/xpwkadgp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const out = (await res.json().catch(() => ({ ok: res.ok }))) as { ok?: boolean };
      if (res.ok && out.ok) {
        track('inquiry_submit', { method: 'inquire_form' });
        setStatus('sent');
      } else {
        track('inquiry_error');
        setStatus('error');
        mailtoFallback();
      }
    } catch {
      track('inquiry_error');
      setStatus('error');
      mailtoFallback();
    }
  };
```

(The old inline `const w = window as unknown as ...` gtag block disappears - `track()` replaces it.)

- [ ] **Step 3: Attach `onFormStart` to the form**

Change the form opening tag from:

```tsx
                  <form className="inquire-form" onSubmit={onSubmit} noValidate>
```

to:

```tsx
                  <form className="inquire-form" onSubmit={onSubmit} onFocusCapture={onFormStart} noValidate>
```

- [ ] **Step 4: WhatsApp link with prefilled context**

Inside the component body (next to `onFormStart`), add:

```tsx
  // WhatsApp opens with the context already typed: the guest just hits send.
  const waText = encodeURIComponent(
    'Hello - I am planning an evening with Ice & Instinct and would like to talk.' +
      (evening.length ? ` Enhancements I have in mind: ${evening.join(', ')}.` : '')
  );
```

Then change the WhatsApp anchor from:

```tsx
                  <a href="https://wa.me/19172927859" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)' }}>
```

to:

```tsx
                  <a href={`https://wa.me/19172927859?text=${waText}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)' }}>
```

(The `tel:` link stays as is - `call_click` is already covered by the delegated listener from Task 1.)

- [ ] **Step 5: Verify**

Run (from `app/`): `npx tsc --noEmit && npx vitest run`
Expected: clean typecheck, all tests pass.

- [ ] **Step 6: Commit**

```bash
git add app/src/pages/Contact.tsx
git commit -m "feat(contact): Formspree payload carries enhancements/cocktail/source; form start+error events; WhatsApp prefilled message"
```

---

### Task 7: Profiler + Gallery - persist the cocktail, fire the journey events

**Files:**
- Modify: `app/src/pages/GalleryPage.tsx` (the `commission` callback at lines ~23-31, the `pp-band-cta` button at line ~374)
- Modify: `app/src/features/Profiler/PalateProfiler.tsx` (result-phase effect + three keepsake buttons)

- [ ] **Step 1: GalleryPage - imports**

In `app/src/pages/GalleryPage.tsx`, add to the imports:

```ts
import { setCocktail } from '../lib/leadContext';
import { track } from '../lib/track';
```

- [ ] **Step 2: GalleryPage - commission persists + tracks**

Replace the existing `commission` callback:

```tsx
  const commission = (name: string, sel: Selections) => {
    const params = new URLSearchParams({ cocktail: name });
    if (sel.identity) params.set('identity', sel.identity);
    if (sel.taste) params.set('taste', sel.taste);
    if (sel.accord) params.set('accord', sel.accord);
    window.location.href = `/contact/?${params.toString()}`;
  };
```

with:

```tsx
  // Carry the composed signature into the Inquiry: via query params for the
  // prefilled message AND via sessionStorage so the Formspree payload still
  // names the cocktail even if the guest wanders the site before submitting.
  const commission = (name: string, sel: Selections) => {
    setCocktail(name);
    track('profiler_commission', { cocktail: name });
    const params = new URLSearchParams({ cocktail: name });
    if (sel.identity) params.set('identity', sel.identity);
    if (sel.taste) params.set('taste', sel.taste);
    if (sel.accord) params.set('accord', sel.accord);
    window.location.href = `/contact/?${params.toString()}`;
  };
```

- [ ] **Step 3: GalleryPage - profiler_open**

Change:

```tsx
              <button className="pp-band-cta" type="button" onClick={() => setProfilerOpen(true)}>
```

to:

```tsx
              <button className="pp-band-cta" type="button" onClick={() => { track('profiler_open'); setProfilerOpen(true); }}>
```

- [ ] **Step 4: PalateProfiler - import + result event**

In `app/src/features/Profiler/PalateProfiler.tsx`, add to the imports:

```ts
import { track } from '../../lib/track';
```

Inside the `PalateProfiler` component (it already uses `useEffect` - place next to the existing effects), add an effect that fires once per composed result:

```tsx
  // The guest reached their signature - the single most valuable funnel moment
  // before the inquiry itself.
  useEffect(() => {
    if (state.phase === 'result' && state.recipe) {
      track('profiler_complete', { cocktail: state.recipe.name });
    }
  }, [state.phase, state.recipe]);
```

- [ ] **Step 5: PalateProfiler - keepsake buttons**

Change the three keepsake buttons:

```tsx
                        <button className="pp-btn ghost" onClick={() => printRecipe(state.recipe!)}>Print PDF</button>
                        <button className="pp-btn ghost" onClick={() => downloadShareImage(state.recipe!)}>Save image</button>
```

to:

```tsx
                        <button className="pp-btn ghost" onClick={() => { track('keepsake_print', { cocktail: state.recipe!.name }); printRecipe(state.recipe!); }}>Print PDF</button>
                        <button className="pp-btn ghost" onClick={() => { track('keepsake_save', { cocktail: state.recipe!.name }); downloadShareImage(state.recipe!); }}>Save image</button>
```

And in the Instagram share button's async handler, add the track call as the first line:

```tsx
                          onClick={async () => {
                            track('keepsake_share', { cocktail: state.recipe!.name });
                            const r = await shareToInstagram(state.recipe!);
                            setShareNote(
                              r === 'unsupported'
                                ? 'Instagram Stories post from your phone: open iceinstinct.com on mobile, or use Save image.'
                                : '',
                            );
                          }}
```

- [ ] **Step 6: Verify**

Run (from `app/`): `npx tsc --noEmit && npx vitest run`
Expected: clean typecheck, all tests (matchRecipe + track + leadContext) pass.

- [ ] **Step 7: Commit**

```bash
git add app/src/pages/GalleryPage.tsx app/src/features/Profiler/PalateProfiler.tsx
git commit -m "feat(profiler): cocktail persists into the inquiry; open/complete/commission/keepsake events"
```

---

### Task 8: Full verification pass (no deploy yet)

**Files:** none (verification only)

- [ ] **Step 1: Full test + typecheck + production build**

Run (from `app/`):

```bash
npx vitest run && npx tsc --noEmit && npx vite build && node scripts/prerender.mjs
```

Expected: all tests pass, tsc clean, build completes, prerender completes without errors.

- [ ] **Step 2: Grep the built output for the funnel code**

Run (from `app/`):

```bash
grep -rl "inquiry_form_start" dist/assets-build/ | head -3
grep -rl "booking_click" dist/assets-build/ | head -3
```

Expected: at least one JS chunk listed for each (proves the events shipped into the bundles).

- [ ] **Step 3: Dash check on the new files (ASCII-safe command; the repo hook is the backstop)**

Run (from repo root):

```bash
perl -ne 'print qq($ARGV:$.:$_) if /[\x{2013}\x{2014}]/' app/src/lib/track.ts app/src/lib/leadContext.ts app/src/lib/funnelInit.ts; echo DASH-SCAN-DONE
```

Expected: only `DASH-SCAN-DONE` (no file lines printed above it).

- [ ] **Step 4: Commit anything the build regenerated (if dirty)**

```bash
git status --short
```

If only `app/dist/` noise appears and `dist` is gitignored, nothing to commit. Otherwise commit with:

```bash
git add -A && git commit -m "chore(funnel): build verification artifacts"
```

---

### Task 9: Deploy + live verification (curl only - NEVER open a browser)

**Files:**
- Modify: repo root static files (rsync of `app/dist/`)

**PRECONDITION: get Temo's explicit go-ahead before pushing - push to `main` auto-deploys the live site.**

- [ ] **Step 1: Sync the build into the repo root (the served tree)**

Run (from repo root):

```bash
rsync -a --exclude '.git' app/dist/ ./
git status --short | head -20
```

Expected: changed `index.html` files + new hashed chunks under `assets-build/`.

- [ ] **Step 2: Commit + push to main**

```bash
git add -A
git commit -m "feat(funnel): zero-loss lead funnel - context-rich inquiries, full CTA event coverage"
git push origin HEAD:main
```

- [ ] **Step 3: Wait ~15s, then verify live via curl**

```bash
sleep 15
curl -sL https://iceinstinct.com/ -o /tmp/ii-home.html -w "%{http_code}\n"
grep -c "G-KBVETWTVVH" /tmp/ii-home.html
curl -sL https://iceinstinct.com/contact/ | grep -o 'assets-build/[a-zA-Z0-9._-]*\.js' | sort -u | head
```

Expected: 200, GA4 tag count >= 1, fresh chunk hashes (different from pre-deploy).

Then confirm the new code is actually live:

```bash
for f in $(curl -sL https://iceinstinct.com/contact/ | grep -o 'assets-build/[a-zA-Z0-9._-]*\.js' | sort -u); do
  curl -s "https://iceinstinct.com/$f" | grep -l "inquiry_form_start" /dev/stdin && echo "FOUND in $f";
done
```

Expected: at least one `FOUND`.

- [ ] **Step 4: End-to-end Formspree smoke test (one real submission)**

```bash
curl -s -X POST https://formspree.io/f/xpwkadgp \
  -H "Accept: application/json" \
  -F "name=Funnel E2E test" \
  -F "email=temo.benidze@gmail.com" \
  -F "message=Deploy verification - ignore" \
  -F "enhancements=Glassware & Vessels" \
  -F "cocktail=Event Horizon" \
  -F "source=e2e-test" \
  -F "_subject=Ice & Instinct inquiry - Event Horizon - 1 enhancement"
```

Expected: `{"ok":true,...}`. Temo then confirms the email shows the `enhancements`, `cocktail`, `source` fields and the enriched subject. (Counts as 1 of the 50 monthly free submissions - acceptable.)

- [ ] **Step 5: Commit STATE.md handoff**

Update `STATE.md` (top section) with: what shipped (zero-loss funnel: context-rich Formspree payload, Profiler-to-Contact fix, WhatsApp prefill, GA4 event vocabulary), and what remains manual (Task 10 owner checklist). Then:

```bash
git add STATE.md
git commit -m "docs(state): zero-loss lead funnel shipped - events vocabulary + context-rich inquiries"
git push origin HEAD:main
```

---

### Task 10: Owner manual checklist (no code - Temo's clicks)

**Files:** none. Deliver this list to Temo in chat at the end.

- [ ] **Step 1: YouCanBook.me NOTES field (closes the last info-loss gap)**

The booking deep link already sends `&NOTES=Enhancements requested: ...`. YCBM prefills it ONLY if the booking form has a field with code `NOTES`. Temo, in the YCBM dashboard (enter-ritual profile):
1. Booking page -> Form -> Add question -> type: long text, label e.g. "Your evening - enhancements and notes".
2. Set the field CODE to exactly `NOTES` (uppercase).
3. Make a test booking via `https://enter-ritual.youcanbook.me/?service=jsid1437636&NOTES=test-prefill` and confirm the field arrives prefilled with `test-prefill`.

- [ ] **Step 2: GA4 - confirm the new events arrive**

In GA4 property `G-KBVETWTVVH` -> Reports -> Realtime, while clicking on the live site from a phone: expect `profiler_open`, `enhancement_add`, `booking_click`, `whatsapp_click`, `inquiry_form_start`, `inquiry_submit`. Then (optional, later) Admin -> Events -> mark `inquiry_submit` and `booking_click` as key events (conversions).

- [ ] **Step 3: Formspree - field visibility + quota awareness**

Open the Formspree dashboard for form `xpwkadgp`: the e2e test submission from Task 9 must show `enhancements`, `cocktail`, `source`, `landing_page` columns. Reminder: free plan = 50 submissions/month TOTAL across all three sites (Ditto + 7Eagles + Ice). When monthly volume approaches that, upgrade or split forms across accounts.

---

## Self-Review (done at write time)

- **Spec coverage:** intuitive CTAs - no CTA labels were changed (they are already clear); zero info loss - Profiler params (Task 5), sessionStorage enhancements fallback (Task 5), Formspree hidden fields (Task 6), WhatsApp prefill (Task 6), cocktail persistence (Task 7), YCBM NOTES verification (Task 10); collect all events - delegated outbound tracker (Tasks 1, 3), enhancement toggles (Task 4), form start/submit/error (Task 6), profiler journey + keepsakes (Task 7).
- **Placeholder scan:** every code step contains the full code; no TBDs.
- **Type consistency:** `track(event, params)` signature used identically in Tasks 4-7; `readEvening(): string[]`, `readCocktail(): string`, `readSource(): LeadSource | null` consistent between Task 2 definitions and Task 5/6 usage; `parseSource(search, referrer, landing)` matches tests.
- **Known accepted limits:** `profiler_complete` may fire twice under React StrictMode in dev only (production unaffected - StrictMode double-invokes effects only in dev). Delegated listener counts clicks, not completed bookings - YCBM-side conversion is out of code reach.
