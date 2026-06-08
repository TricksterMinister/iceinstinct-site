# Ice & Instinct - Project Context

This file is the **first thing you should read** in any new chat about this project.
Read it fully before touching code.

**Location:** `/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/` (external disk TEMO DISC, APFS). The disk must be mounted to work on this project. Run dev: `cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/app" && npm run dev`.

---

## ⚡ CURRENT STATE - READ THIS FIRST (updated 2026-06-07)

**Active work = React migration. NOTHING is deployed. Live site (vanilla on `main`) is untouched and still serving.**

1. **Branch:** work happens on **`react-shell`** (the repo ROOT is checked out to it). `main` = old vanilla site; do NOT merge/deploy until cutover.
2. **READ NOW (single source of truth for what's done + what's left):** `docs/superpowers/plans/2026-06-07-migration-master.md` -> its **PROGRESS LOG** section. Also `STATE.md`. (REACT-MIGRATION-HANDOFF.md is older background.)
3. **React app in `app/`** (Vite + React 19 + TS). Run: `cd app && npm run dev` -> http://localhost:5173/. Build (now PRERENDERS all routes): `cd app && npm run build`.
4. **Migration status (2026-06-07):** S1 SEO/GEO (prerender + per-page head/JSON-LD + robots/sitemap/llms/favicon/404) DONE; S2 Inquiry (YouCanBook gateway + real Instagram, public email removed) DONE; S3 deploy prep (`app/public/.htaccess` + CSP, GA4 `G-KBVETWTVVH` on all 12) DONE; S4 content fidelity DONE. NEXT: a detailed whole-site CONTENT pass (owner wants this first), then S5 media, S6 profiler, S9 four-cities, S10 gallery drawer, S11 duality, S7 code review, S8 device QA, then cutover.
5. **Owner rules (locked):** defer NOTHING - resolve every workstream in order before cutover; execute via subagent-driven-development; never push to main without owner ok. Deploy = Hostinger auto-pulls the repo ROOT from GitHub, so cutover = place built `app/dist/` at repo root on `main`; rollback via `_legacy-vanilla/`.

---

## ⚡ ACTIVE WORK IS ON BRANCH `react-shell` (updated 2026-06-03)

You are on `main` (the current vanilla site). The **active project is a React migration on the `react-shell` branch**, NOT here. Do this first:

```
git checkout react-shell
```

Then read `CLAUDE.md` and `REACT-MIGRATION-HANDOFF.md` on that branch for the real current state. `main` stays as-is until the migration is finished and cut over. Do not start new work on `main`.

---

## Who, what, where

- **Brand:** Ice & Instinct - a private mixology studio in Manhattan
- **Owner / founder:** **Teimuraz Benidze** (the user) - Founder & Flavor Architect
- **Audience:** highest-tier private hosts, NYC penthouse events, by-appointment-only
- **Live site (current):** https://www.iceinstinct.com - built on **Hostinger Website Builder** (Astro/Zyrosite stack). We are migrating off it.
- **Repo:** https://github.com/TricksterMinister/iceinstinct-site
- **Local path:** `/Users/teimurazbenidze/iceinstinct-site/`
- **Migration source materials:** `/Users/teimurazbenidze/iceinstinct-source/` (raw HTML pulled from live site, extracted text strings, downloaded media, full INVENTORY.md)

---

## THE DESIGN COMMANDMENTS - non-negotiable

The user has been explicit about these. **DO NOT BREAK THEM** without asking. Most of them came after this exchange:

> "Хочу Нью-Йорк, хочу Готэм, эффект Готэм, Готэм Манхэттен, ночь Готэм, лакшери, блеск металл, дорогой металл. Хочу мрамор, хочу белый камень какой-нибудь, где нужно черный камень, где нужно. Не хочу никакого другого цвета: не фиолетовый, не синий, никакой. Черно-белый, серый, монохромное."

### 1. Strict monochrome

- Background: `oklch(8% 0 0)` (near-black, **zero chroma**)
- Foreground: `oklch(98% 0 0)` (chalk white)
- Mid-tones: brushed steel, platinum, white-gold (all neutral grays via `oklch(N% 0 0)`)
- **Never** introduce blue undertones. The first iteration used `oklch(...% 0.008 245)` - user rejected it.
- Single accent: silver `oklch(82% 0 0)` - neutral
- **No** yellow / champagne / brass / warm gold. He said "такое жёлтое золото мне не очень нравится."

### 2. The only colour on the site is on cocktail photography in the gallery

- Default state: B&W with `filter: grayscale(100%) contrast(1.08) brightness(0.92)`
- On `:hover` (desktop): cocktail returns to full colour with `filter: grayscale(0%) contrast(1) brightness(1)` + slight scale
- On mobile (no hover): cocktails are full colour by default
- The hero video is monochrome (`filter: grayscale(100%) contrast(1.05)`) - Brooklyn Bridge night drive from Pexels
- Founder portrait is monochrome by default, colour on hover

### 3. NO BLUR - anywhere

- No `backdrop-filter: blur()` (initial header had it - removed)
- No radial-gradient soft overlays (initial hero scrim was radial - replaced with sharp linear gradient)
- No motion blur, no soft fades on photos
- All gradients are linear and sharp
- Photos are crisp, full saturation when shown in colour

### 4. Big massive editorial typography

- Display sans: **Geist** (variable, weights 300-900) - for the masculine confident moments
- Italic serif: **Fraunces** (variable, opsz/SOFT/WONK axes) - used for ONE word per heading at most, as a romantic counterpoint
- Body: **Inter** (variable)
- Editorial labels: **JetBrains Mono** (uppercase, wide tracking)
- Hero wordmark mixes both: "Ice &" in heavy Geist, "Instinct." in italic Fraunces SOFT 100 WONK 1
- Display-heading scale at home: `clamp(2.2rem, 1.6rem + 3.5vw, 4.5rem)` for section heads, `clamp(3rem, 2rem + 5.5vw, 7rem)` for hero
- **Reference inspiration:** Ignitex Framer template (the user shared this as the direction he likes - sans + italic serif mix, dense scenes, dark, NYC luxury feel)

### 5. Each section fits ONE viewport (100dvh)

The user wrote: "Сейчас все настолько огромное, что не помещается даже в мой роскошный большой горизонтальный монитор."

The pattern is `.scene` class:

```css
.scene {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(80px, 12vh, 110px) 0 var(--s-md);
  scroll-snap-align: start;
}
html { scroll-snap-type: y proximity; }
```

Use `100dvh` not `100vh` - handles mobile address bar. Apply `.scene` to every full-page section. **Mobile-first**: every scene must fit comfortably in a 390×844 (iPhone 14) viewport.

### 6. Gallery scrolls horizontally, not vertically

The user explicitly invited a different scroll for gallery: "Галерею можешь скроллить по-другому, как-то придумай, как хочешь."

- Track: `overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;`
- Each tile snap-aligns centre
- Wheel translation: vertical scroll → horizontal track movement (in `script.js`)
- Progress bar at bottom (`.gallery-progress` with `--progress` CSS var, JS-updated)
- Position counter `01 / 12` updates on scroll
- Lightbox on click (Esc closes, backdrop closes)

### 7. Mobile is co-priority with desktop

The user wrote: "адаптирую это всё в первую очередь на мобильную версию сайта. И сразу же такой же огромный приоритет - Desktop Viewport."

- Tier preview on home: 4 columns desktop → horizontal swipe-scroll on mobile
- Header: WhatsApp pill collapses to icon-only on phones, "Inquire" CTA stays
- All `clamp()` values must work down to 360px width

### 8. Real scroll motion - not flat PowerPoint

User wrote: "И вообще, скролл-анимацию надо подумать. Есть миллион разных вариантов скролл-анимации. Так что не хочу плоский PowerPoint."

In `styles.css`:
- `.reveal` (opacity + translateY)
- `.reveal-clip` (clip-path mask reveal)
- `.reveal-zoom` (image scale 1.08 → 1)
- `.reveal-stagger` (children stagger 0..600ms)
- `.split-words` (mask wipe-up word-by-word)
- `@supports (animation-timeline: view())` - modern scroll-driven CSS where supported (hero zoom on exit, scene title rise on enter)

`script.js` toggles `.is-in` class via IntersectionObserver as fallback.

### 9. Inquiry-only - NEVER add e-commerce checkout

The user's old Hostinger site has a built-in shop with `prod_*` IDs and "Concierge Bag" cart. **This was intentionally removed** in the migration. Reasoning: luxury services in the $750-$3000+ range do not "Add to Cart". Every engagement is a personal conversation. If the user requests a checkout flow later, push back gently and propose Stripe Payment Links sent personally after a quote, NOT in-cart-checkout.

---

## Style preferences (from user memory)

These also apply at the user level, but worth re-stating:

- **Never use em-dashes** (U+2014) or en-dashes (U+2013). Use plain hyphens (`-`, U+002D) only. This applies to body copy, headings, JSON-LD, comments, docs, commit messages, everything.
- **No religious expressions** ("слава богу", "thank god", etc.) - user is atheist.
- **No blur on video / photo backgrounds** unless the user has explicitly pre-approved it for a specific moment. No `filter: blur()`, no `backdrop-filter: blur()`. Use color overlays / gradients / vignettes for legibility instead.

### Pre-commit guard - run before every push

The dash rule was violated once (2026-05-01: 140 dashes shipped to GitHub). To make sure it never happens again:

```bash
cd /Users/teimurazbenidze/iceinstinct-site
python3 -c "
import os
bad = []
for root, dirs, files in os.walk('.'):
    if '.git' in dirs: dirs.remove('.git')
    for n in files:
        p = os.path.join(root, n)
        try: src = open(p, encoding='utf-8').read()
        except Exception: continue
        if chr(0x2014) in src or chr(0x2013) in src: bad.append(p)
print('FAIL:', bad) if bad else print('OK: no dashes')
import sys; sys.exit(1 if bad else 0)
"
```

Exits non-zero if any em or en dash leaks back in. Run before `git push`.

---

## Tech stack

```
Static HTML / CSS / JS - no framework, no build step
Fonts: Google Fonts (Fraunces, Geist, Inter, JetBrains Mono)
Forms: Formspree
Hosting: Hostinger Web Hosting (auto-deploy from GitHub)
DNS: domain stays at Hostinger
```

No package.json. No npm. No Astro / Next / anything.
File serving via Apache; `.htaccess` handles HTTPS, www-canonical, security headers, caching.

---

## File structure

```
iceinstinct-site/
├── CLAUDE.md                       <- this file
├── HANDOFF.md                      <- current state + next-session checklist
├── README.md                       <- launch configuration guide
├── index.html                      Home (hero, tier preview, founder, gallery teaser, CTA)
├── styles.css                      Single-file design system (~1100 lines)
├── script.js                       Header scroll state, reveal observer, gallery progress, lightbox, Formspree handler
├── llms.txt                        AI-readable site summary
├── robots.txt                      Allowlists 15 AI crawlers
├── sitemap.xml                     12 URLs
├── .htaccess                       HTTPS, www, security, caching
├── .gitignore
├── assets/
│   ├── favicon.svg
│   └── photos/                     22 cocktail/founder/hero images (8.3MB)
├── offerings/
│   ├── index.html                  Hub: 4 tiers + 5 add-ons + final CTA
│   ├── foundation/index.html       Tier i ($400)
│   ├── simplicity/index.html       Tier ii ($750)
│   ├── bespoke/index.html          Tier iii ($1,500)
│   └── omakase/index.html          Tier iv ($3,000)
├── concierge/index.html            Bespoke private concierge service
├── my-story/index.html             Founder bio + portrait + pull-quote
├── gallery/index.html              The Collection - 12 cocktails, horizontal track, lightbox
├── contact/index.html              Inquiry form (Formspree)
├── privacy/index.html              Legal
└── terms/index.html                Legal
```

12 pages total, single shared `styles.css` and `script.js`.

---

## The 4 service tiers

| Tier | Slug | Price | Guests | Hours | Voice |
|---|---|---|---|---|---|
| The Foundation | `foundation` | $400 | up to 40 | 3 | "Impeccable drinks, seamless service. No shortcuts." |
| Perfection in Simplicity | `simplicity` | $750 | up to 12 | 4 | "Timeless cocktails. Solo precision. Craft over theatre." |
| Bespoke Design & Artistry | `bespoke` | $1,500 | up to 15 | 4 | "Signature cocktails tailored to your event's theme." |
| Omakase Improvisation | `omakase` | $3,000 | up to 25 | open | "No menu. No repetition. Real-time creation." |

Plus 5 add-ons (cigars, glassware, ice/temp, shadow staff, visual integrity).

---

## The 12 signature cocktails (The Collection)

All on `/gallery/`:

1. White Lotus
2. Aviation
3. Persimmon Saffron Sour
4. Belladonna
5. Black Truffle Martini
6. Rose Garden Rendezvous
7. Aureliano
8. Basil in my mind
9. 1001 Nights
10. Call Me By Your Name
11. Calipso Cream
12. Bésame

Tagline: "Touch the glass to awaken the spirit." - used as the gallery section title and the hover-to-colour interaction pattern.

---

## What is configured vs placeholder

### Configured ✅
- All copy, all 12 pages
- Cocktail names + photos + JSON-LD ItemList
- Service tier prices, descriptions, schemas
- Founder bio (Teimuraz Benidze, "Founder & Flavor Architect")
- Robots, sitemap, llms.txt, .htaccess
- Repo on GitHub, 4 commits already

### Placeholder - must replace before launch ⚠️
- **Formspree form ID**: `REPLACE_WITH_FORMSPREE_ID` in `/contact/index.html`. User said an existing form already works on the current site - get the endpoint ID from the user (something like `mxxxxxxx`).
- **Social URLs**: Footer links currently `href="#"`. User confirmed Instagram exists. Get the real URL.
- **Email**: `hello@iceinstinct.com` is placeholder in `/contact/`, `/privacy/`, `/terms/`, `script.js` error messages. Confirm with user or change.

---

## Local dev

```bash
cd /Users/teimurazbenidze/iceinstinct-site
python3 -m http.server 8766
# open http://localhost:8766/
```

When changing `styles.css` or `script.js`, the cache-busting query string is `?v=20260501` everywhere. Bump it across all HTML files when shipping major asset changes:

```bash
grep -rl 'v=20260501' --include='*.html' . | xargs sed -i '' 's|v=20260501|v=YYYYMMDD|g'
```

---

## Git workflow

```bash
git add -A
git commit -m "Subject: description

Body if needed.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
"
git push origin main
```

Auto-deploy will be set up on Hostinger Web Hosting in a future session. Not active yet.

---

## Original Hostinger site - content sources

- Live: https://www.iceinstinct.com (still on the Hostinger Builder, NOT yet migrated)
- Built on Astro under the hood (Hostinger acquired Zyrosite). Content lives inside `astro-island` `props=` HTML-escaped JSON attributes, not in the visible body.
- I extracted ~376 unique strings per page from the embedded JSON. Saved at `/Users/teimurazbenidze/iceinstinct-source/extracted/all-pages.json`.
- 22 image originals downloaded to `/Users/teimurazbenidze/iceinstinct-source/media/`. Currently used: founder portrait, hero (Brooklyn Bridge), all 12 cocktails, plus a few extras.
- **All cocktail photos are AI-polished (Whisk, Gemini)** - these are the user's REAL creations enhanced via AI, not stock. He confirmed: "Эти фотографии реально моих работ, мои creations, отполированы с помощью AI."
- The user is **bringing original HTML files file-by-file** so we can lift exact copy. Gallery `/gallery/` was rebuilt from his HTML on 2026-05-01 (12 cocktail names + hover-to-colour pattern + lightbox preserved). Other pages still need his HTML import.

### HTML import status (track this!)

| Page | His HTML received | Imported into new site |
|---|---|---|
| Gallery | ✅ 2026-05-01 | ✅ |
| Home | ❌ | base copy is mine |
| Offerings hub | ❌ | base copy is mine |
| Foundation tier | ❌ | base copy is mine |
| Simplicity tier | ❌ | base copy is mine |
| Bespoke tier | ❌ | base copy is mine |
| Omakase tier | ❌ | base copy is mine |
| Concierge | ❌ | base copy is mine |
| My Story | ❌ | base copy is mine |
| Contact | ❌ | base copy is mine |

User said he would send each page one at a time. Wait for each, then run a controlled rewrite using his exact text where possible (his copy is more idiomatic to the brand than mine).

---

## Deploy plan (future session)

Domain `iceinstinct.com` is registered on Hostinger.

To migrate from Hostinger Website Builder to Hostinger Web Hosting:
1. In hPanel, **back up** the current Builder site (export or full archive of public_html if accessible).
2. Switch the domain's hosting plan from Builder to Web Hosting (may need to purchase a Web Hosting plan if user only has Builder).
3. In Web Hosting hPanel, set up Git auto-deploy pointing at https://github.com/TricksterMinister/iceinstinct-site (branch `main`).
4. Verify SSL is provisioned (Let's Encrypt usually automatic).
5. Confirm `.htaccess` rules are honoured (Apache).

If Hostinger blocks the migration or the user prefers, alternative deploy targets:
- **Cloudflare Pages** (free, instant CDN, auto from GitHub) - change DNS A/CNAME to Cloudflare
- **Netlify** (same)

The user explicitly chose **Hostinger** in the migration plan. Default to that.

---

## Where things stand right now

Last commit on `main`: `c03db65 Viewport architecture: scene pattern + horizontal gallery + mobile swipe`

Last user feedback: positive on the viewport refactor + horizontal gallery direction. He has not visually verified yet. Awaiting next HTML file from him.

See `HANDOFF.md` for the precise next-session checklist.

---

## Design System (added 2026-05-08)

**Always read `/DESIGN.md` before making any visual or UI decision on this site.**
All font choices, colors, spacing, layout architecture, navigation pattern, motion language, and aesthetic direction are formally locked there.

Quick rules baked into DESIGN.md (do not deviate without explicit approval):
- Display type = Geist 700 + Fraunces italic accent. No Marcellus, Playfair, Cormorant, Italiana, or any other display font.
- Accent color = Champagne Gold via `/accent.css`. Single source of truth. Edit ONLY `/accent.css` to swap site-wide.
- Strict monochrome neutrals `oklch(N% 0 0)`. No blue/yellow/brass/cream/peach/purple/pink/red/green undertones.
- No blur, no `backdrop-filter`, no radial soft scrims.
- Homepage = magazine flip-pages (6 chapters, viewport-locked). Inner pages keep deep editorial structure.
- Vanish menu (champagne circle top-right) is the homepage navigation. No horizontal navbar on home.
- Mobile is co-priority. Every clamp() must validate at 390x844.

If a request you receive conflicts with DESIGN.md, stop and ask Teimuraz. Do not silently break a rule.
