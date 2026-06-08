# Offering Pages Scale (Omakase template -> Foundation / Simplicity / Bespoke) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring Foundation, Simplicity, and Bespoke to the exact same approved design as Omakase, each carrying its own full real content from the live original HTML.

**Architecture:** Extract the approved Omakase page into ONE data-driven template component `OfferingPage`, fed by a per-page content module. Migrate Omakase onto the template first and prove pixel/behaviour parity, then add the three other pages as content modules + media. Design lives in one place; pages differ only in data, ghost word, and media.

**Tech Stack:** Vite + React 19 + TypeScript, GSAP ScrollTrigger, Lenis (proximity Snap), plain CSS tokens (no Tailwind). Headless Chrome via playwright-core in `~/.claude/skills/gstack` for render verification.

---

## Context the executor needs (zero-context assumptions)

- Branch is `react-shell`. NOTHING is deployed. `main` is the live vanilla site; do not touch it.
- Dev server: `cd ~/iceinstinct-site/app && npm run dev` -> usually http://localhost:5173/ (may bump to 5174 if busy). Pages: `/offerings/omakase/`, `/offerings/foundation/`, `/offerings/simplicity/`, `/offerings/bespoke/`.
- Each page is a separate Vite entry: `app/src/main-<slug>.tsx` -> renders `app/src/pages/<Name>.tsx`. Entries are declared in `app/vite.config.ts` `rollupOptions.input`.
- The approved reference page is `app/src/pages/Omakase.tsx` (+ `app/src/styles/omakase.css`). Read it fully before starting; it is the single source of design truth.
- Original/live copy for each page lives verbatim in the repo: `offerings/<slug>/index.html`. This is the Temo-approved content source. Transcribe from it; do not invent or trim copy (a prior session trimmed copy and it was rejected).
- LOCKED decisions (do not re-litigate): eyebrows removed; geography text is "New York Metropolitan Area" (NOT "Manhattan", even though the original HTML says Manhattan); strict monochrome + single champagne accent; no blur/glass; no em-dashes (use plain hyphen `-`); closing = direction B (light Свет-1 framed CTA top 70% + dark marquee/footer bottom 30%).
- Verify every visual claim in a real headless browser and LOOK at the screenshot (Temo sees only the real render). Never report "done" from markup alone.

### Headless verify helper (used by several tasks)

Write this file when a task needs it, run it, then delete it. It must live inside the gstack dir so `playwright-core` resolves.

```bash
cat > ~/.claude/skills/gstack/verify.mjs <<'EOF'
import { chromium } from 'playwright-core';
const URL = process.argv[2];
const b = await chromium.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true });
const p = await b.newPage(); await p.setViewportSize({width:1440,height:900});
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text())});
await p.goto(URL,{waitUntil:'networkidle',timeout:25000}); await p.waitForTimeout(800);
const m = await p.evaluate(()=>{
  const ids=['#overview','#scaling','#included','#standard-inclusions','#host-provides','#notes','.oma-close'];
  const fit=ids.map(s=>{const e=document.querySelector(s);if(!e)return s+':MISSING';const h=e.getBoundingClientRect().height;return s+':'+Math.round(h)+(h<=905?'fit':'OVER+'+Math.round(h-900));});
  return { lenis:!!window.lenis, fit, ether:!!document.querySelector('.oma-ether'), marquee:!!document.querySelector('.oma-close-track'), ghost:document.querySelector('.concierge .section-bg-word .hg-base')?.textContent };
});
console.log('FIT:',m.fit.join(' | '));
console.log('lenis',m.lenis,'ether',m.ether,'marquee',m.marquee,'ghost',JSON.stringify(m.ghost));
console.log('ERRORS:', errs.length?errs.slice(0,6):'none');
await b.close();
EOF
cd ~/.claude/skills/gstack && node verify.mjs "http://localhost:5173/offerings/omakase/"; rm -f ~/.claude/skills/gstack/verify.mjs
```

---

## File Structure

**Create:**
- `app/src/pages/OfferingPage.tsx` - the single template component (all markup + the four effects: held-stage scrub, section-rail polish, hero cursor-light, plus `useOmakaseSnap`/`useCinemaChrome`/`useDeepScripts`). Renders entirely from a `content` prop.
- `app/src/pages/offerings/types.ts` - the `OfferingContent` TypeScript interface (shape below).
- `app/src/pages/offerings/omakase.ts` - Omakase content (transcribed from the current `Omakase.tsx`, which already holds the approved copy).
- `app/src/pages/offerings/foundation.ts` - Foundation content (from `offerings/foundation/index.html`).
- `app/src/pages/offerings/simplicity.ts` - Simplicity content (from `offerings/simplicity/index.html`).
- `app/src/pages/offerings/bespoke.ts` - Bespoke content (from `offerings/bespoke/index.html`).

**Modify:**
- `app/src/styles/omakase.css` -> `git mv` to `app/src/styles/offering.css` (shared stylesheet; classes are already generic). Update the import in every `main-<slug>.tsx`.
- `app/src/pages/Omakase.tsx` - reduce to `export const Omakase = () => <OfferingPage content={omakaseContent} />;`
- `app/src/pages/Foundation.tsx`, `Simplicity.tsx`, `Bespoke.tsx` - same one-line thin wrappers with their content.
- `app/src/main-omakase.tsx`, `main-foundation.tsx`, `main-simplicity.tsx`, `main-bespoke.tsx` - import `./styles/offering.css` (in addition to accent/styles/footer/cinema-chrome).

**Source of truth (read-only):** `offerings/{omakase,foundation,simplicity,bespoke}/index.html`.

---

## Content data shape (`app/src/pages/offerings/types.ts`)

```ts
import type { ReactNode } from 'react';

export interface Tier {
  label: string;       // "A" | "B" | "C"
  name: string;        // "The Soloist"
  meta: string;        // "Up to 15 guests" or "16 to 25 guests - hard limit"
  personnel: string;   // "1 Master Mixologist + 1 Logistical Assistant"
  focus: string;       // "Deep engagement and complex, individual creation"
  price: string;       // "From $3,000" | "Not recommended" | "Custom Quote"
  muted?: boolean;     // true => is-muted styling (e.g. Omakase tier C)
}

export interface Item { title: string; body: string; tag?: string; } // tag => .cell-tag pill

export interface OfferingContent {
  slug: 'omakase' | 'foundation' | 'simplicity' | 'bespoke';
  ghost: string;                 // "OMAKASE" - hero + closing background word
  hero: {
    headline: ReactNode;         // <>Omakase <span className="it">Improvisation.</span></>
    lead: string;
    price: string;               // "From $3,000 USD"
    priceMeta: string;           // "Up to 25 guests - 4-6 hours - New York Metropolitan Area"
    inquireHref: string;         // "/contact/?package=omakase"
    video: { poster: string; src: string };
  };
  overview: {                    // section I (.oma-fmt3)
    title: ReactNode;            // <>Performance <span className="it">art.</span></>
    paras: string[];             // body paragraphs (rendered in the ~62ch column)
    pull: ReactNode;             // <>This is not bartending. <span className="it">This is performance art.</span></>
    foot: string;
  };
  bridge: {                      // section II held-stage (.oma-hold)
    photo: string;
    selection: { title: ReactNode; lead: string };  // is-a
    focus: { title: ReactNode; lead: string };       // is-b
  };
  scaling: { desc: string; tiers: Tier[] };          // section III (.oma-ledger)
  included: { intro: string; steps: Item[] };        // section IV (.oma-steps)
  standard: { intro: string; items: Item[] };        // section V (.oma-grid + ether)
  host: { intro: string; steps: Item[] };            // section VI (.oma-steps, light)
  notes: { label: string; title: ReactNode; items: string[] }; // section VII (.oma-notes); label "Notes"|"Extensions"
  navLabels: [string,string,string,string,string,string,string]; // tier-nav I-VII labels (VII varies)
  closing: {                     // closing segment (shared layout, per-page copy)
    title: ReactNode;            // <>Surrender to <span className="it">improvisation.</span></>
    lead: string;
    inquireHref: string;
  };
}
```

Section ids must stay exactly: hero `.concierge`, `#overview`, `#menu-protocol`, `#scaling`, `#included`, `#standard-inclusions`, `#host-provides`, `#notes`, `.oma-close` (the scroll-snap and rail logic key off these).

---

### Task 1: Rename omakase.css -> offering.css (shared stylesheet)

**Files:**
- Modify (rename): `app/src/styles/omakase.css` -> `app/src/styles/offering.css`
- Modify: `app/src/main-omakase.tsx`, `app/src/main-foundation.tsx`, `app/src/main-simplicity.tsx`, `app/src/main-bespoke.tsx`

- [ ] **Step 1: Rename the file (keep history)**

```bash
cd ~/iceinstinct-site && git mv app/src/styles/omakase.css app/src/styles/offering.css
```

- [ ] **Step 2: Point Omakase's import at the new name**

In `app/src/pages/Omakase.tsx` find any `import '...omakase.css'` (if present) and change to `offering.css`. If Omakase.css is imported only via main-omakase.tsx, edit there. Add to all four entries so the three new pages get the styles:

In each of `main-omakase.tsx`, `main-foundation.tsx`, `main-simplicity.tsx`, `main-bespoke.tsx`, ensure this line exists after the cinema-chrome import:

```ts
import './styles/offering.css';
```

- [ ] **Step 3: Typecheck + Omakase still renders**

Run: `cd ~/iceinstinct-site/app && npx tsc --noEmit` -> Expected: no output (pass).
Run the headless helper against `/offerings/omakase/` -> Expected: FIT all sections, 0 errors, ghost "OMAKASE".

- [ ] **Step 4: Commit**

```bash
cd ~/iceinstinct-site && git add -A && git commit -m "refactor(offering): rename omakase.css -> offering.css, share across 4 entries"
```

---

### Task 2: Create the content shape + Omakase content module

**Files:**
- Create: `app/src/pages/offerings/types.ts` (interface above)
- Create: `app/src/pages/offerings/omakase.ts`

- [ ] **Step 1: Write `types.ts`** exactly as the "Content data shape" section above.

- [ ] **Step 2: Write `omakase.ts`** by transcribing the CURRENT approved copy out of `app/src/pages/Omakase.tsx` (it holds the final approved text after this session's edits). Fill every field of `OfferingContent`. Key values:
  - `slug: 'omakase'`, `ghost: 'OMAKASE'`
  - hero headline `<>Omakase <span className="it">Improvisation.</span></>`, lead "Pure creation. No menu. Unrepeatable moments. Complete trust. Cocktails created spontaneously, in real time, for each guest.", price "From $3,000 USD", priceMeta "Up to 25 guests - 4-6 hours - New York Metropolitan Area", inquireHref "/contact/?package=omakase", video poster `/assets/photos/generated-image-december-02-2025---7_35pm-m2uzeLtAYCNCf3tZ.jpeg`, src `https://videos.pexels.com/video-files/4765778/4765778-hd_1920_1080_25fps.mp4`.
  - overview title `<>Performance <span className="it">art.</span></>`, the three paragraphs verbatim from Omakase.tsx, pull `<>This is not bartending. <span className="it">This is performance art.</span></>`, foot "Guests do not observe - they participate in the creation itself."
  - bridge photo `/assets/photos/white-lotus-pour.png`; selection title `<>The <span className="it">Selection.</span></>` lead "We use your existing spirits, your collection, and the energy of the room as our canvas. No recipe cards, no pre-event design. Cocktails are created spontaneously for each guest, based on real-time dialogue, intuition, and the resources available in your bar."; focus title `<>Advanced <span className="it">technique.</span></>` lead "Smoke infusion, fat washing, rapid infusion, temperature layering, molecular garnish - methods reserved for world-class bars, executed intimately in your home."
  - scaling.desc and the three tiers (A Soloist / B Ensemble / C Beyond Limits, muted:true, price "Not recommended") exactly as in Omakase.tsx.
  - included.steps (5), standard.items (4), host.steps (4), notes (label "Notes", 4 items) exactly as in Omakase.tsx. The Ice Ritual step carries `tag: 'mandatory inclusion'`.
  - navLabels: ["Overview","Menu Protocol","Scalability","What's Included","Standard Inclusions","Host Provides","Notes"].
  - closing title `<>Surrender to <span className="it">improvisation.</span></>`, lead "Tell us the date, the room, and your spirits collection. We return with a tailored consultation framework within one business day.", inquireHref "/contact/?package=omakase".

- [ ] **Step 3: Typecheck**

Run: `cd ~/iceinstinct-site/app && npx tsc --noEmit` -> Expected: pass (module compiles; not yet used).

- [ ] **Step 4: Commit**

```bash
cd ~/iceinstinct-site && git add app/src/pages/offerings/types.ts app/src/pages/offerings/omakase.ts && git commit -m "feat(offering): content shape + omakase content module"
```

---

### Task 3: Extract `OfferingPage` template + migrate Omakase onto it (parity gate)

**Files:**
- Create: `app/src/pages/OfferingPage.tsx`
- Modify: `app/src/pages/Omakase.tsx` (reduce to wrapper)

- [ ] **Step 1: Build `OfferingPage.tsx`** by moving the ENTIRE JSX + all four `useEffect`s + hook calls out of the current `Omakase.tsx`, replacing every hard-coded string/word with reads from `props.content`. Preserve verbatim: all class names, section ids, the held-stage GSAP timeline, `useOmakaseSnap`, the rail IntersectionObserver, the hero cursor-light pointermove handler, the shimmer scan markup, the ether `<EtherealShadow>` on `#standard-inclusions`, and the closing 70/30 markup. Render lists with `.map`:
  - tiers -> `.oma-ledger-row` (add `is-muted` when `tier.muted`); render `.det` lines for personnel/focus.
  - included.steps + host.steps -> `.oma-steps`/`.oma-step` (host inside `.oma-panel.light`); render `.cell-tag` when `step.tag`.
  - standard.items -> `.oma-grid`/`.cell`.
  - notes.items -> `.oma-notes`/`.oma-note` with roman markers i..n; `notes.title` uses `notes.label` text.
  - tier-nav `<a>`s from `navLabels` (aria-label only; labels are visually hidden per current design).
  - hero ghost uses `content.ghost` in both `.hg-base` and `.hg-glow`; closing `.section-bg-word` uses `content.ghost`.

- [ ] **Step 2: Reduce `Omakase.tsx` to a wrapper**

```tsx
import { OfferingPage } from './OfferingPage';
import { omakaseContent } from './offerings/omakase';

export function Omakase() {
  return <OfferingPage content={omakaseContent} />;
}
```

- [ ] **Step 3: Typecheck**

Run: `cd ~/iceinstinct-site/app && npx tsc --noEmit` -> Expected: pass.

- [ ] **Step 4: Parity verification (the gate)**

Run the headless helper against `/offerings/omakase/`. Expected: `lenis true`, `ether true`, `marquee true`, `ghost "OMAKASE"`, every section `fit`, `ERRORS none`. Then screenshot hero, `#scaling`, `#included`, `#host-provides`, `#notes`, `.oma-close` and confirm they look identical to before the refactor.

- [ ] **Step 5: Commit**

```bash
cd ~/iceinstinct-site && git add app/src/pages/OfferingPage.tsx app/src/pages/Omakase.tsx && git commit -m "refactor(offering): extract data-driven OfferingPage template; Omakase uses it (parity verified)"
```

---

### Task 4: Foundation content + wire + verify

**Files:**
- Create: `app/src/pages/offerings/foundation.ts`
- Modify: `app/src/pages/Foundation.tsx`

Source: `offerings/foundation/index.html`. Transcribe verbatim (hyphens only, geography -> "New York Metropolitan Area").

- [ ] **Step 1: Write `foundation.ts`** with `OfferingContent`:
  - `slug:'foundation'`, `ghost:'FOUNDATION'`
  - hero headline `<>The <span className="it">Foundation.</span></>`; lead "For those who understand that elegance lies in simplicity. The accessible entry point to the Ice & Instinct standard - delivered by a trained professional bartender from our collective."; price "From $400 USD"; priceMeta "Up to 40 guests - 3 hours - New York Metropolitan Area"; inquireHref "/contact/?package=foundation"; video: reuse a relevant existing asset or a Pexels bartending clip (placeholder media replaced in Task 7-media; record what was used).
  - overview title `<>Distillation, <span className="it">not compromise.</span></>` (derived from the page's pull line); paras: the four Overview paragraphs verbatim ("For those who understand...", "This is not a compromise. This is distillation...", "A trained bartender from the Ice & Instinct collective...", "This is not a staffing service..."); pull `<>This is not a staffing service. <span className="it">This is hospitality with intention.</span></>`; foot "Your guests experience the difference from the first pour."
  - bridge: selection title `<>Curated <span className="it">simplicity.</span></>` lead "Prior to your event, we collaborate on a menu of 4-6 signature cocktails. Classics perfected. Crowd favorites refined. Each drink selected to balance variety, flow, and your available spirits."; focus title `<>The <span className="it">focus.</span></>` lead "Flawless technique on timeless recipes. Proper dilution, balanced flavors, appropriate glassware, and garnishes that matter. The fundamentals, executed without shortcuts." photo: reuse a Foundation-appropriate still (placeholder until Task 7-media).
  - scaling.desc "Calibrated for intimate gatherings where quality remains uncompromised regardless of guest count. A professional bartender from our trained collective delivers the Ice & Instinct standard; each member is personally mentored and upholds the same commitment to craft." tiers (all valid, none muted):
    - A "The Intimate", meta "Up to 15 guests", personnel "1 Professional Bartender", focus "Attentive service, consistent quality, personal engagement", price "From $400"
    - B "The Gathering", meta "16 to 25 guests", personnel "1 Professional Bartender + 1 Bar Support", focus "Maintained flow, no guest left waiting, seamless replenishment", price "From $550"
    - C "The Celebration", meta "26 to 40 guests", personnel "2 Professional Bartenders", focus "Full coverage, dual station capability, event-scale execution", price "From $750"
  - included.intro "The specific elements of your experience." steps (5): Pre-Event Consultation; Professional Bar Setup; Ice Coordination; "3 Hours of Professional Service"; Station Restoration - bodies verbatim from the HTML.
  - standard.intro (shared line) items (4): Trained Professional; Guest Engagement; Professional Tooling; Setup & Breakdown - bodies verbatim.
  - host.intro "To ensure a seamless experience, the host provides the following canvas." steps from the HTML VI list (Spirits & Mixers; Glassware; plus the remaining items in offerings/foundation/index.html section VI - transcribe all).
  - notes.label "Notes"; title `<>Experience <span className="it">notes.</span></>`; items: the VII paragraphs from offerings/foundation/index.html (transcribe all).
  - navLabels ["Overview","Menu Protocol","Scalability","What's Included","Standard Inclusions","Host Provides","Notes"].
  - closing title `<>Begin <span className="it">the conversation.</span></>`; lead "Tell us the date, the room, and your occasion. We return with a tailored proposal within one business day."; inquireHref "/contact/?package=foundation".

- [ ] **Step 2: Wire `Foundation.tsx`**

```tsx
import { OfferingPage } from './OfferingPage';
import { foundationContent } from './offerings/foundation';

export function Foundation() {
  return <OfferingPage content={foundationContent} />;
}
```

- [ ] **Step 3: Typecheck**

Run: `cd ~/iceinstinct-site/app && npx tsc --noEmit` -> Expected: pass.

- [ ] **Step 4: Verify in browser**

Run the headless helper against `/offerings/foundation/`. Expected: every section `fit` (compact #included as needed exactly like Omakase - if it overflows, the `#included` rule already in offering.css applies because the id is shared), `lenis true`, `ghost "FOUNDATION"`, 0 errors. Screenshot hero, `#scaling` (3 tiers), `#included`, `#notes`, `.oma-close` and confirm copy is the Foundation copy and nothing is clipped.

- [ ] **Step 5: Commit**

```bash
cd ~/iceinstinct-site && git add app/src/pages/offerings/foundation.ts app/src/pages/Foundation.tsx && git commit -m "feat(offering): Foundation on the template with full real content"
```

---

### Task 5: Simplicity content + wire + verify

**Files:**
- Create: `app/src/pages/offerings/simplicity.ts`
- Modify: `app/src/pages/Simplicity.tsx`

Source: `offerings/simplicity/index.html`.

- [ ] **Step 1: Write `simplicity.ts`**:
  - `slug:'simplicity'`, `ghost:'SIMPLICITY'`
  - hero headline `<>Perfection in <span className="it">Simplicity.</span></>`; lead "For the host who values heritage over hype. The world's most iconic cocktails executed with surgical precision - by the Master Mixologist personally."; price "From $750 USD"; priceMeta "Up to 12 guests - 4 hours - New York Metropolitan Area"; inquireHref "/contact/?package=simplicity".
  - overview title `<>Heritage <span className="it">over hype.</span></>`; paras: the three Overview paragraphs verbatim; pull `<>True luxury <span className="it">whispers.</span></>`; foot "We do not invent. We execute the legends."
  - bridge selection title `<>The <span className="it">selection.</span></>` lead "Prior to the event, we curate a menu of 3-4 timeless classics (e.g., The Martini, The Old Fashioned, The Negroni, The Daiquiri)."; focus title `<>The <span className="it">focus.</span></>` lead "This package does not include signature cocktail design or experimental mixology. We agree on the classics, and we perfect them using superior spirits, precise dilution, and temperature control."
  - scaling.desc "Service capacity is strictly calibrated to ensure the Purist standard of execution is never compromised, regardless of guest count." tiers:
    - A "The Intimate", "Up to 12 guests", "1 Master Mixologist (solo performance)", "Quiet, attentive precision. Direct guest interaction.", "From $750"
    - B "The Social", "13 to 25 guests", "1 Master Mixologist + 1 Shadow (bar support)", "Seamless flow. The Shadow handles logistics so the Master never breaks rhythm.", "From $1,100"
    - C "The Grand", "26 to 40 guests", "1 Master Mixologist + 2 Shadows", "High-volume elegance. Zero wait time.", "From $1,450"
  - included.intro "The specific milestones of your experience." steps (4): The Classics Consultation; The Procurement Specification; Four Hours of Execution; Station Restoration - bodies verbatim.
  - standard.items (4): Private Master Mixologist; Professional Tooling; On-Site Ritual Performance; Setup & Breakdown - bodies verbatim.
  - host.intro "To ensure the integrity of the service, the host provides the following canvas." steps from HTML VI (Spirits, Mixers & Garnishes; Glassware; plus remaining items - transcribe all).
  - notes.label "Extensions"; title `<>Experience <span className="it">extensions.</span></>`; items: the VII "Extensions" entries from offerings/simplicity/index.html (transcribe all).
  - navLabels [...,"Host Provides","Extensions"] (index 6 = "Extensions").
  - closing title `<>Begin <span className="it">the conversation.</span></>`; lead "Tell us the date, the room, and your guest count. We return with a tailored proposal within one business day."; inquireHref "/contact/?package=simplicity".

- [ ] **Step 2: Wire `Simplicity.tsx`** (same wrapper pattern with `simplicityContent`).

- [ ] **Step 3: Typecheck** -> `npx tsc --noEmit` passes.

- [ ] **Step 4: Verify** headless against `/offerings/simplicity/`: sections fit, ghost "SIMPLICITY", VII rail label "Extensions", 0 errors; screenshot + eyeball copy.

- [ ] **Step 5: Commit**

```bash
cd ~/iceinstinct-site && git add app/src/pages/offerings/simplicity.ts app/src/pages/Simplicity.tsx && git commit -m "feat(offering): Simplicity on the template with full real content"
```

---

### Task 6: Bespoke content + wire + verify

**Files:**
- Create: `app/src/pages/offerings/bespoke.ts`
- Modify: `app/src/pages/Bespoke.tsx`

Source: `offerings/bespoke/index.html`.

- [ ] **Step 1: Write `bespoke.ts`**:
  - `slug:'bespoke'`, `ghost:'BESPOKE'`
  - hero headline `<>Bespoke Design <span className="it">& Artistry.</span></>`; lead "Your vision, crafted into every glass. Custom cocktails designed specifically for your theme, your colors, your story. Mixology as creative collaboration."; price "From $1,500 USD"; priceMeta "Up to 15 guests - 4 hours - New York Metropolitan Area"; inquireHref "/contact/?package=bespoke".
  - overview title `<>Mixology as <span className="it">collaboration.</span></>`; paras: the three Overview paragraphs verbatim; pull `<>Each cocktail, <span className="it">a conversation piece.</span></>`; foot "Your story, in liquid form."
  - bridge selection title `<>The <span className="it">selection.</span></>` lead "Two weeks prior, we collaborate to create a bespoke menu of 5-6 signature cocktails."; focus title `<>The <span className="it">focus.</span></>` lead "Full creative license. We develop custom cocktail names, unique flavor profiles, and theatrical presentation elements (smoke, specialty ice, botanical garnishes) designed to photograph beautifully and spark conversation."
  - scaling.desc "Service capacity includes complex preparation and theatrical execution." tiers:
    - A "The Intimate", "Up to 15 guests", "1 Master Mixologist (custom design & execution)", "Detailed storytelling and visual perfection.", "From $1,500"
    - B "The Social", "16 to 30 guests", "1 Master Mixologist + 1 Shadow (bar support)", "Maintaining service speed and presentation quality for larger groups.", "From $2,000"
    - C "The Grand", "31+ guests", "Custom team configuration", "High-volume theatrical service.", "Custom Quote"
  - included.intro "The specific milestones of your experience." steps (4): In-Depth Design Consultation; The Procurement Specification; Four Hours of Masterful Execution; Theatrical Presentation - bodies verbatim.
  - standard.items (5): Private Master Mixologist; Professional Tooling; On-Site Ritual Performance; Setup & Breakdown; Custom Recipe Documentation - bodies verbatim. (Note V has FIVE items here.)
  - host.intro "To ensure the integrity of the service, the host provides the following canvas." steps from HTML VI (Spirits, Mixers & Garnishes; Glassware; Infrastructure; Ice Supply; Floor Service Boundary - transcribe all bodies).
  - notes.label "Extensions"; title `<>Experience <span className="it">extensions.</span></>`; items: the VII "Extensions" entries from offerings/bespoke/index.html (transcribe all).
  - navLabels index 6 = "Extensions".
  - closing title `<>Begin <span className="it">the conversation.</span></>`; lead "Tell us the date, the theme, and your vision. We return with a tailored design proposal within one business day."; inquireHref "/contact/?package=bespoke".

- [ ] **Step 2: Wire `Bespoke.tsx`** (wrapper with `bespokeContent`).

- [ ] **Step 3: Typecheck** -> passes.

- [ ] **Step 4: Verify** headless against `/offerings/bespoke/`: sections fit (note V has 5 items - confirm the grid still fits one viewport; if it overflows, add a scoped `#standard-inclusions` compaction mirroring the `#included` rule), ghost "BESPOKE", 0 errors; screenshot + eyeball.

- [ ] **Step 5: Commit**

```bash
cd ~/iceinstinct-site && git add app/src/pages/offerings/bespoke.ts app/src/pages/Bespoke.tsx && git commit -m "feat(offering): Bespoke on the template with full real content"
```

---

### Task 7: Per-page media + cross-page final verification

**Files:**
- Modify: the three new content modules (swap placeholder media for real assets)
- Add assets under `app/public/assets/photos/` and/or `app/dist` build assets as appropriate.

- [ ] **Step 1: Generate/choose hero video + bridge photo per page** using the approved generators (`~/.claude/skills/video/scripts/imagen_gen.py` for stills, `veo_hero.py` for video) or an existing on-brand asset. Keep brand locks: hyperreal, no AI-looking artifacts, monochrome + champagne. Update each content module's `hero.video` and `bridge.photo` paths. Record exactly which asset each page uses.

- [ ] **Step 2: Full sweep across all four pages**

For each of `/offerings/omakase/`, `/offerings/foundation/`, `/offerings/simplicity/`, `/offerings/bespoke/` run the headless helper. Expected for each: all sections `fit`, `lenis true`, `ether true`, `marquee true`, correct `ghost`, `ERRORS none`. Additionally confirm per page: hero cursor-light works (move mouse over the ghost -> `.is-lit`), rail hides on hero/closing and darkens on light panels, held-stage scan shimmer animates.

- [ ] **Step 3: Production build sanity**

Run: `cd ~/iceinstinct-site/app && npm run build` -> Expected: build succeeds, all four offering entries emit. Then `npm run preview` and re-run the helper against the preview URLs.

- [ ] **Step 4: Update STATE + commit**

Update `~/iceinstinct-site/STATE.md`: offering pages standardized on the OfferingPage template with full real content; design source of truth = OfferingPage.tsx + offering.css; remaining = prerender + cutover, plus the two parked tasks (Palate Profiler, Inquiry -> YouCanBook.me).

```bash
cd ~/iceinstinct-site && git add -A && git commit -m "feat(offering): real media per page + cross-page verification; STATE updated"
```

---

## Self-Review

- **Spec coverage:** template extraction (T3), Omakase parity (T3), three pages with full content (T4-T6), shared CSS (T1), shape (T2), media + cross-page verify (T7). VII label variance (Notes vs Extensions), tier count/validity variance, V item-count variance (Bespoke 5) are all handled by the data-driven shape. Covered.
- **Placeholder scan:** content tasks point to the exact committed source file `offerings/<slug>/index.html` for verbatim transcription and enumerate the differing fields with their real values; media in T7 is the one genuinely-open item (asset generation) and is called out explicitly, not hidden.
- **Type consistency:** `OfferingContent`/`Tier`/`Item` names are used identically across T2-T6; section ids (`#overview`, `#scaling`, `#included`, `#standard-inclusions`, `#host-provides`, `#notes`, `.oma-close`, `.concierge`) are fixed and match the existing offering.css and the snap/rail logic.

## Risks / watch-items
- Parity gate (T3 Step 4) is the critical checkpoint: do not proceed to T4 until Omakase renders identically through the template.
- Viewport fit: `#included` already has a scoped compaction rule; Bespoke's 5-item V may need an equivalent `#standard-inclusions` compaction - check in T6 Step 4.
- Geography: every priceMeta uses "New York Metropolitan Area", never "Manhattan", despite the source HTML.
- No em-dashes anywhere; the repo has a hook that blocks them on write.
