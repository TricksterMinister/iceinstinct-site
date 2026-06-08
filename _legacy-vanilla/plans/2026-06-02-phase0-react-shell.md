# Phase 0 - React Shell Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild iceinstinct.com on React (Vite + TS) with pixel-identical visual/scroll parity to the current vanilla site, deployable as static files on Hostinger via the existing GitHub flow.

**Architecture:** Vite multi-page (MPA) build - one static HTML per existing route. React hydrates interactivity. Existing CSS ported 1:1; components render the SAME DOM and class names to guarantee parity. GSAP + ScrollTrigger + Lenis drive the cinema scroll (ported from `cinema.js` into hooks); Motion is reserved for later feature work. Source lives in `app/`; the build output is what Hostinger serves.

**Tech Stack:** Vite 6, React 19, TypeScript, GSAP + ScrollTrigger, Lenis (`@studio-freight/lenis` or `lenis`), `motion` (installed, used in later phases). Node 20+.

**Spec:** `specs/2026-06-02-react-shell-migration.md`

**Reference (do not modify):** the current vanilla site at repo root (`index.html`, `cinema/`, `styles.css`, `accent.css`, `footer.css`, `offerings/`, `concierge/`, `my-story/`, `gallery/`, `contact/`, `privacy/`, `terms/`, `thanks/`, `assets/`). It stays live until cutover (Task 14).

---

## File Structure

```
app/                          # React source (NOT served as-is; built to repo root at cutover)
  package.json
  vite.config.ts              # MPA: one input per route
  tsconfig.json
  index.html                  # entry for "/" (homepage)
  src/
    main-home.tsx             # mounts <Home/> into index.html
    app/
      LenisProvider.tsx       # Lenis + ScrollTrigger.update wiring
      useGsap.ts              # gsap.context cleanup hook
      Cursor.tsx              # custom dot+ring cursor (ported)
      Pager.tsx               # vertical pager dots (ported)
      Grain.tsx               # site grain layer
      PortalRoot.tsx          # overlay portal mount (for later features)
    sections/                 # homepage chapters (DOM 1:1 with current index.html)
      Hero.tsx
      Manifesto.tsx
      Tiers.tsx
      Concierge.tsx
      Founder.tsx
      GalleryTeaser.tsx
      Closing.tsx
    pages/                    # deep-page React trees (DOM 1:1 with current pages)
      Offerings.tsx  Foundation.tsx  Simplicity.tsx  Bespoke.tsx  Omakase.tsx
      ConciergePage.tsx  MyStory.tsx  GalleryPage.tsx  Contact.tsx
      Privacy.tsx  Terms.tsx  Thanks.tsx
    lib/
      gsapHome.ts             # homepage GSAP timeline (ported from cinema.js)
    styles/                   # COPIES of current CSS, unchanged
      accent.css cinema.css styles.css footer.css
  public/                     # symlink/copy strategy for /assets, /robots.txt, etc (Task 12)
```

Build output (Vite) -> static `index.html` + `/offerings/index.html` + ... + hashed JS/CSS in `/assets-build/`. At cutover this output lands at repo root (Task 14).

---

## Task 1: Scaffold Vite + React 19 + TS in `app/`

**Files:**
- Create: `app/package.json`, `app/tsconfig.json`, `app/vite.config.ts`, `app/index.html`, `app/src/main-home.tsx`, `app/src/Home.tsx`

- [ ] **Step 1: Create the project skeleton**

Run:
```bash
cd ~/iceinstinct-site
mkdir -p app/src
cd app
```

Create `app/package.json`:
```json
{
  "name": "iceinstinct-react",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.18",
    "motion": "^11.11.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.6.0",
    "vite": "^6.0.0"
  }
}
```

- [ ] **Step 2: tsconfig**

Create `app/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Minimal vite config + entry + component**

Create `app/vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

Create `app/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Ice & Instinct</title></head>
<body><div id="root"></div><script type="module" src="/src/main-home.tsx"></script></body>
</html>
```

Create `app/src/Home.tsx`:
```tsx
export function Home() {
  return <h1 data-smoke>Ice &amp; Instinct - React shell alive</h1>;
}
```

Create `app/src/main-home.tsx`:
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from './Home';
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
```

- [ ] **Step 4: Install + verify dev/build/typecheck**

Run:
```bash
cd ~/iceinstinct-site/app && npm install && npm run typecheck && npm run build
```
Expected: install succeeds; `typecheck` exits 0; `vite build` writes `app/dist/index.html`. 

- [ ] **Step 5: Smoke-check the dev server renders**

Run (background): `cd ~/iceinstinct-site/app && npm run dev &` then probe:
```bash
sleep 4 && curl -s http://localhost:5173/ | grep -c 'id="root"'
```
Expected: `1`. Stop the dev server after.

- [ ] **Step 6: Commit**

```bash
cd ~/iceinstinct-site
printf 'node_modules/\napp/node_modules/\napp/dist/\n' >> .gitignore
git add app/ .gitignore && git commit -m "chore(react): scaffold Vite + React 19 + TS shell in app/"
```

---

## Task 2: Port stylesheets 1:1

**Files:**
- Create: `app/src/styles/accent.css`, `app/src/styles/cinema.css`, `app/src/styles/styles.css`, `app/src/styles/footer.css`
- Modify: `app/src/main-home.tsx`

- [ ] **Step 1: Copy the four stylesheets unchanged**

Run:
```bash
cd ~/iceinstinct-site
cp accent.css app/src/styles/accent.css
cp cinema/cinema.css app/src/styles/cinema.css
cp styles.css app/src/styles/styles.css
cp footer.css app/src/styles/footer.css
```

- [ ] **Step 2: Import them in load order (accent first, matching current `<head>`)**

Edit `app/src/main-home.tsx` - add at top, before component import:
```tsx
import './styles/accent.css';
import './styles/cinema.css';
import './styles/footer.css';
```
(styles.css is for deep pages; imported per-page in Task 11.)

- [ ] **Step 3: Add the Google Fonts link to `app/index.html` head (exact current set)**

Edit `app/index.html` `<head>` - add the same fonts the current `index.html` uses:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Geist:wght@300..900&family=Inter:wght@300..600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- [ ] **Step 4: Verify build still green**

Run: `cd ~/iceinstinct-site/app && npm run build`
Expected: build succeeds; `dist/assets` contains a CSS chunk.

- [ ] **Step 5: Commit**

```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "feat(react): port accent/cinema/styles/footer CSS 1:1 + fonts"
```

---

## Task 3: App-shell providers (Lenis + ScrollTrigger, cursor, pager, grain, portal)

**Files:**
- Create: `app/src/app/LenisProvider.tsx`, `app/src/app/useGsap.ts`, `app/src/app/Cursor.tsx`, `app/src/app/Pager.tsx`, `app/src/app/Grain.tsx`, `app/src/app/PortalRoot.tsx`
- Reference: current `cinema/cinema.js` (cursor, pager, lenis init)

- [ ] **Step 1: Lenis + ScrollTrigger provider**

Create `app/src/app/LenisProvider.tsx`:
```tsx
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: useGsap context hook**

Create `app/src/app/useGsap.ts`:
```ts
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGsap(setup: (ctx: gsap.Context) => void, scope?: React.RefObject<HTMLElement>) {
  const ref = useRef(setup);
  ref.current = setup;
  useEffect(() => {
    const ctx = gsap.context((self) => ref.current(self), scope?.current ?? undefined);
    return () => ctx.revert();
  }, [scope]);
}
```

- [ ] **Step 3: Cursor, Pager, Grain, PortalRoot (port markup/logic from cinema.js)**

Create `app/src/app/Cursor.tsx` (dot+ring; port the spring-follow + hover-detect from `cinema.js` cursor block, same class names `.cursor/.cursor-dot/.cursor-ring`).
Create `app/src/app/Pager.tsx` (the 7 `.pager-dot` buttons + the `pagerMap` click-to-scroll + ScrollTrigger active-state, ported from `cinema.js`).
Create `app/src/app/Grain.tsx` (renders the grain layer element the CSS expects).
Create `app/src/app/PortalRoot.tsx`:
```tsx
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
export function PortalRoot({ children }: { children: React.ReactNode }) {
  const [el] = useState(() => document.createElement('div'));
  useEffect(() => { el.id = 'overlay-root'; document.body.appendChild(el); return () => { document.body.removeChild(el); }; }, [el]);
  return createPortal(children, el);
}
```

> Port each component's internals verbatim from `cinema/cinema.js`, preserving class names exactly. Where `cinema.js` reads `document.querySelectorAll`, keep the same selectors so the ported CSS matches.

- [ ] **Step 4: Verify typecheck/build**

Run: `cd ~/iceinstinct-site/app && npm run build`
Expected: 0 type errors; build succeeds.

- [ ] **Step 5: Commit**

```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "feat(react): app-shell providers (Lenis+ScrollTrigger, cursor, pager, grain, portal)"
```

---

## Task 4: Port homepage sections with 1:1 DOM (Hero -> Closing)

**Files:**
- Create: `app/src/sections/{Hero,Manifesto,Tiers,Concierge,Founder,GalleryTeaser,Closing}.tsx`
- Reference: current `index.html` (each `<section>` block is the source of truth)
- Modify: `app/src/Home.tsx`

- [ ] **Step 1: Establish the porting rule (apply to every section)**

For each `<section>` in the current `index.html`, create a component that returns the **identical markup** - same tags, same `class` (as `className`), same `data-*` attributes, same text/SVG. Convert only: `class`->`className`, `for`->`htmlFor`, self-close void tags, `style="..."`->style objects only where present. Static `<video>`/`<img>` keep the exact same `src`/`poster` paths (`/assets/...` and `/assets/video/...`). No visual edits.

- [ ] **Step 2: Port Hero**

Create `app/src/sections/Hero.tsx` returning the exact `<section class="hero" id="hero">...</section>` markup from `index.html` (video, vignette, grain, meta, hero-stage title rows, hero-sub reveal lines, hero-cue). 

- [ ] **Step 3: Port Manifesto, Tiers, Concierge, Founder, GalleryTeaser, Closing**

Create one component per remaining homepage section, each returning that section's exact current markup:
- `Manifesto.tsx` = `<section class="chapter" id="manifesto" data-pin>` block.
- `Tiers.tsx` = `<section class="tiers" id="tiers">` incl the 4 `.tier` articles with their `../assets/photos/tier-*.jpg` images.
- `Concierge.tsx` = `<section class="concierge" id="concierge">` incl the `.concierge-video` (`/assets/video/concierge-loop.*`) + index list + ENHANCE bg word.
- `Founder.tsx` = `<section class="founder" id="founder">` incl `.founder-video` (`/assets/video/alchemist-loop.*`) + text + ALCHEMIST bg word.
- `GalleryTeaser.tsx` = `<section class="gallery" id="gallery">` teaser block.
- `Closing.tsx` = `<section class="closing" id="closing">` incl frame + corners + eyebrow + title + CTA + meta.

> Asset paths: the current homepage uses `../assets/...` for some tags. In the React build assets resolve from site root, so normalize these to root-absolute `/assets/...` (Task 12 places `/assets` at the served root). Keep filenames identical.

- [ ] **Step 4: Compose Home**

Replace `app/src/Home.tsx`:
```tsx
import { LenisProvider } from './app/LenisProvider';
import { Cursor } from './app/Cursor';
import { Pager } from './app/Pager';
import { Grain } from './app/Grain';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Tiers } from './sections/Tiers';
import { Concierge } from './sections/Concierge';
import { Founder } from './sections/Founder';
import { GalleryTeaser } from './sections/GalleryTeaser';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';

export function Home() {
  return (
    <LenisProvider>
      <Cursor /><Grain /><Pager />
      <Hero /><Manifesto /><Tiers /><Concierge /><Founder /><GalleryTeaser /><Closing />
      <Footer />
    </LenisProvider>
  );
}
```
(Also create `app/src/sections/Footer.tsx` from the current `<footer class="footer">` markup; plus the Vanish header `.va-trigger/.va-overlay` block as `app/src/app/VanishHeader.tsx` mounted in Home.)

- [ ] **Step 5: Verify build + dev renders sections**

Run: `cd ~/iceinstinct-site/app && npm run build` (expect success), then `npm run dev &`, then:
```bash
sleep 4 && curl -s http://localhost:5173/ | grep -c 'class="tier"'
```
Expected: `4` (four tier cards present). Stop dev server.

- [ ] **Step 6: Commit**

```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "feat(react): port homepage sections (Hero..Closing) with 1:1 DOM"
```

---

## Task 5: Port the homepage GSAP timeline into a hook

**Files:**
- Create: `app/src/lib/gsapHome.ts`
- Modify: `app/src/Home.tsx`
- Reference: `cinema/cinema.js` (all ScrollTrigger/animation blocks except cursor/pager/vanish already ported)

- [ ] **Step 1: Port the animations**

Create `app/src/lib/gsapHome.ts` exporting `initHomeGsap()` that reproduces, verbatim in behavior, the `cinema.js` blocks: manifesto pin (`#manifesto[data-pin]`), `.section-bg-word` ghost-word parallax, tier-rail horizontal drag/scroll (`[data-tiers-rail]`), `data-parallax` image scaling, `data-stagger` reveals, closing-stage reveal. Keep selectors and trigger configs identical to source.

- [ ] **Step 2: Run it from Home via useGsap**

Edit `app/src/Home.tsx`: wrap content in a `ref` div and call `useGsap(() => initHomeGsap())`. Ensure it runs after mount (inside LenisProvider so Lenis exists).

- [ ] **Step 3: Verify no console errors + build**

Run: `npm run build` (expect success). Then `npm run dev &`, load with browse:
```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"; $B goto "http://localhost:5173/" >/dev/null 2>&1; sleep 3; $B console --errors 2>/dev/null | grep -i 'error' | grep -vi 'gsap target' | head
```
Expected: no JS errors (GSAP "target not found" warnings acceptable only if a section is intentionally absent; otherwise fix selectors).

- [ ] **Step 4: Commit**

```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "feat(react): port homepage GSAP timeline (pins, ghost-words, tier-rail, reveals)"
```

---

## Task 6: Homepage visual parity gate vs live

**Files:** none created; verification + fixes only.

- [ ] **Step 1: Capture React vs live homepage at 1440x900 (key viewports)**

Run (dev server up):
```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"; $B viewport 1440x900 >/dev/null 2>&1
for id in hero manifesto tiers concierge founder gallery closing; do
  $B goto "http://localhost:5173/#$id" >/dev/null 2>&1; sleep 1
  $B js "document.getElementById('$id')?.scrollIntoView()" >/dev/null 2>&1; sleep 1
  $B screenshot /tmp/react-$id.png --selector "#$id" >/dev/null 2>&1
  $B goto "https://www.iceinstinct.com/#$id" >/dev/null 2>&1; sleep 1
  $B js "document.getElementById('$id')?.scrollIntoView()" >/dev/null 2>&1; sleep 1
  $B screenshot /tmp/live-$id.png --selector "#$id" >/dev/null 2>&1
done
echo done
```

- [ ] **Step 2: Compare each pair, fix drift**

Read each `/tmp/react-<id>.png` vs `/tmp/live-<id>.png`. For any difference (spacing, type, colour, layout), fix the responsible component/CSS-import and re-shoot. Repeat until all 7 match.

- [ ] **Step 3: Commit any parity fixes**

```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "fix(react): homepage parity adjustments vs live"
```

---

## Task 7: MPA build config + per-route entries

**Files:**
- Modify: `app/vite.config.ts`
- Create: per-route `app/<route>/index.html` + `app/src/main-<route>.tsx` for each deep page (created in Task 8 as pages are ported); register all inputs here.

- [ ] **Step 1: Configure Vite MPA inputs (mirrors current sitemap)**

Edit `app/vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets-build',
    rollupOptions: {
      input: {
        home: r('index.html'),
        offerings: r('offerings/index.html'),
        foundation: r('offerings/foundation/index.html'),
        simplicity: r('offerings/simplicity/index.html'),
        bespoke: r('offerings/bespoke/index.html'),
        omakase: r('offerings/omakase/index.html'),
        concierge: r('concierge/index.html'),
        mystory: r('my-story/index.html'),
        gallery: r('gallery/index.html'),
        contact: r('contact/index.html'),
        privacy: r('privacy/index.html'),
        terms: r('terms/index.html'),
        thanks: r('thanks/index.html'),
      },
    },
  },
});
```
> `assetsDir: 'assets-build'` keeps Vite's hashed bundles out of the existing `/assets` media folder.

- [ ] **Step 2: Verify build with only `home` input still works (others added in Task 8)**

Temporarily keep only the `home` input, run `npm run build`, expect success, then add the rest as their HTML files get created in Task 8.

- [ ] **Step 3: Commit**

```bash
cd ~/iceinstinct-site && git add app/vite.config.ts && git commit -m "build(react): MPA config with per-route inputs + assets-build dir"
```

---

## Task 8: Port deep pages (one task-instance per page)

**Procedure (apply identically to each page below):** Using the SAME porting rule from Task 4 Step 1, for page `<route>`:
1. Read the current `<route>/index.html`.
2. Create `app/src/pages/<Page>.tsx` returning its exact `<body>` markup as JSX (class->className, data-* kept, asset paths normalized to root-absolute `/assets/...`).
3. Create `app/src/main-<route>.tsx` that imports `./styles/styles.css` (+ `accent.css`, `footer.css`, and `cinema.css` if that page used cinema chrome) then mounts `<Page/>` into `#root`.
4. Create `app/<route>/index.html` with the SAME `<head>` (title, meta description, canonical, og, JSON-LD, fonts) copied verbatim from the current page, and `<div id="root"></div><script type="module" src="/src/main-<route>.tsx"></script>`.
5. If the page has scroll/JS behavior (e.g. `/my-story/` uses `my-story.js`, `/gallery/` uses gallery track JS), port that JS into a `useGsap`/effect hook in the page component.
6. Add the route's input to `vite.config.ts` (Task 7).
7. Build (`npm run build`) - expect success.
8. Parity-shoot vs live (`/tmp/react-<route>.png` vs `/tmp/live-<route>.png`), fix drift.
9. Commit: `git commit -m "feat(react): port <route> page 1:1"`.

- [ ] **Task 8a: `/offerings/`** (tier index, cinema chrome).
- [ ] **Task 8b: `/offerings/foundation/`** (long-form tier page + sticky rail navigator).
- [ ] **Task 8c: `/offerings/simplicity/`**.
- [ ] **Task 8d: `/offerings/bespoke/`**.
- [ ] **Task 8e: `/offerings/omakase/`**.
- [ ] **Task 8f: `/concierge/`** (VP-split hero + shelf + enhancements + final CTA).
- [ ] **Task 8g: `/my-story/`** (cover, journey, philosophy, faq, finale, CTA; port `my-story.js`).
- [ ] **Task 8h: `/gallery/`** (horizontal cocktail track + hover colour + lightbox; port gallery JS).
- [ ] **Task 8i: `/contact/`** (hero + invite + footer).
- [ ] **Task 8j: `/privacy/`** (legal long-scroll).
- [ ] **Task 8k: `/terms/`** (legal long-scroll).
- [ ] **Task 8l: `/thanks/`** (post-submit page).

---

## Task 9: Static assets + root files in the build output

**Files:**
- Create: `app/public/` linkage; Modify: build/publish step.

- [ ] **Step 1: Make `/assets`, `robots.txt`, `sitemap.xml`, `llms.txt`, `favicon` resolve in the build**

The existing `/assets` (photos + video) and root files must be present alongside the built HTML. Use Vite `publicDir` pointing at a folder that contains them, OR copy at publish time. Decision: at publish (Task 14) the built `dist/` is laid over the repo root, where `/assets`, `robots.txt`, `sitemap.xml`, `llms.txt`, `favicon.svg` already live - so they are served unchanged. For `npm run dev`/`preview` parity, symlink:
```bash
cd ~/iceinstinct-site/app && ln -sfn ../assets public/assets 2>/dev/null; mkdir -p public; ln -sfn ../assets public/assets
```
- [ ] **Step 2: Verify a built page references assets correctly**

Run `npm run build && npm run preview &`, then:
```bash
sleep 3; curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:4173/assets/video/concierge-loop.mp4"
```
Expected: `200` (asset resolves).

- [ ] **Step 3: Commit**

```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "build(react): wire static assets/root files into dev+build"
```

---

## Task 10: Full-site parity + link/route audit

- [ ] **Step 1: Build + preview, crawl every route for 200 + content**

Run `npm run build && npm run preview &`, then:
```bash
sleep 3
for u in / /offerings/ /offerings/foundation/ /offerings/simplicity/ /offerings/bespoke/ /offerings/omakase/ /concierge/ /my-story/ /gallery/ /contact/ /privacy/ /terms/ /thanks/; do
  printf "%s " "$u"; curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:4173$u"
done
```
Expected: every route `200`.

- [ ] **Step 2: View-source SEO check (static content present, not empty root)**

```bash
curl -s http://localhost:4173/offerings/foundation/ | grep -c '<title>'
```
Expected: `1`, and the served HTML contains the page's real `<head>` meta (confirm canonical + JSON-LD present per page).

- [ ] **Step 3: Internal links resolve**

With browse, load `/` and assert nav + footer links point to existing routes (no 404s). Fix any broken hrefs.

- [ ] **Step 4: Commit any fixes**

```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "fix(react): route/link/SEO parity across all pages"
```

---

## Task 11: Cutover - lay the build at the served repo root

> Irreversible-ish (changes what the live site serves). Do only after Tasks 6 + 10 pass. Done on a branch, reviewed, then merged.

- [ ] **Step 1: Branch + produce the production build**

```bash
cd ~/iceinstinct-site && git checkout -b react-cutover
cd app && npm run build
```

- [ ] **Step 2: Move current vanilla site to a backup folder (keep as reference, not served at root)**

```bash
cd ~/iceinstinct-site
mkdir -p _legacy-vanilla
git mv index.html _legacy-vanilla/ 2>/dev/null || true
# repeat for cinema/, styles.css, footer.css, accent.css, home-classic.html, and the per-route index.html files being replaced
```
> Keep `/assets`, `robots.txt`, `sitemap.xml`, `llms.txt`, `favicon.svg` at root (still served, unchanged).

- [ ] **Step 3: Copy the built output to repo root**

```bash
cd ~/iceinstinct-site
cp -R app/dist/* .
```
This places the built `index.html` and per-route `index.html` files + `/assets-build/` at root.

- [ ] **Step 4: Local preview of the served-as-static root**

```bash
cd ~/iceinstinct-site && python3 -m http.server 8099 >/dev/null 2>&1 &
sleep 2; for u in / /offerings/foundation/ /concierge/ /my-story/ /gallery/; do printf "%s " "$u"; curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:8099$u"; done
```
Expected: all `200`; spot-check a page visually with browse vs live.

- [ ] **Step 5: Commit on the branch (do NOT push to main yet)**

```bash
cd ~/iceinstinct-site && git add -A && git commit -m "feat(react): cutover - React static build now served at repo root (legacy in _legacy-vanilla/)"
```

- [ ] **Step 6: STOP for review.** Present the branch to Temo. Merge to `main` + push (-> Hostinger publishes) only on his go. This is the deploy gate.

---

## Self-Review Notes (author)
- Spec coverage: R1 (Task1), R2 (Task2), R3 (Task3,5), R4 (Task7,8,10), R5 (Task6,8,10), R6 (Task3), R7 (Task9,11), R8 (Task10). All P0 covered.
- Features (Duality/Profiler/Inquiry/FourCities/Gallery) are intentionally OUT of this plan - they are later phase plans built on this shell (PortalRoot + store stubs are in place from Task 3).
- Motion is installed (Task 1) but unused until feature phases - acceptable foundation cost.

## Open follow-ups (not blocking Phase 0)
- Shared funnel store (temperament / created cocktail / selected gallery item) - stub interface added with PortalRoot in Task 3; full store lands with the first feature (Duality) plan.
