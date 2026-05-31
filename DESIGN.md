# Design System - Ice & Instinct

*Canonical reference for every visual decision on iceinstinct.com. Created via `/design-consultation` 2026-05-08. Read this BEFORE touching any HTML, CSS, JS, or media on this site. If you're about to add an emoji, an em-dash, a blur filter, a yellow tone, a Marcellus heading, a horizontal navbar, or anything else this doc rules against, stop and ask Teimuraz first.*

---

## Product Context

- **What this is:** Ice & Instinct - a private mixology studio operating in Manhattan penthouses, by appointment only, founded and personally led by Teimuraz Benidze (Founder & Flavor Architect).
- **Who it's for:** Highest-tier private hosts + brand activations + corporate event commissioners. Manhattan-based, with brand/corporate events broadening the funnel.
- **Space/industry:** Luxury hospitality / silent-luxury private service / fine-dining-adjacent. Direct peers (manhattanmixology.com, private-mixologist.com, momentummixology.com) are SquareSpace-template generic; tonal peers (Aesop, Loro Piana, Brunello Cucinelli, Connaught Bar) are silent-luxury houses with editorial typography and restraint. We compete on neither's exact axis. We sit between them.
- **Project type:** Editorial cinema homepage + 11 deep content pages (4 tier pages, concierge, my-story, gallery, contact, privacy, terms).
- **The memorable thing:** *"An alchemist in your living room"* - founder-as-artisan, personal trust, craft over scale, one person commissioned for the night. Every design decision below serves this.

---

## Aesthetic Direction

- **Direction:** Editorial-cinematic, Gotham-Manhattan luxury noir
- **Decoration level:** Intentional. Film grain, ghost-typography backdrops, champagne hairlines. No patterns, no decorative blobs, no gradients beyond sharp linear, no glassmorphism.
- **Mood:** "Where ritual meets instinct, high above the city." Silent luxury that performs without being seen. Each evening a one-night ritual, not a service. Reference frame: night Manhattan from a 50th-floor private bar, monochrome cinema by Khondji.
- **Reference axes (synthesized 2026-05-08):**
  - **Architecture/scrolltelling:** grigoriak.doctor (thin engraved type passing through media, vertical chapter scrolltelling)
  - **Silent luxury restraint:** Aesop (50/50 editorial splits, photography does the work), Loro Piana (centered crested wordmark + by-appointment-only headline)
  - **Classical gravitas:** Brunello Cucinelli (monochrome architectural hero + Latin/Roman gravitas)
  - **Anti-references (do NOT do):** private-mixologist.com (navy + brass corporate-wedding-catering vibe), manhattanmixology.com (SquareSpace template), any direct mixology peer's "Now Booking Holiday Parties" top promo bar

---

## Architecture (Risk 1, the deliberate departure)

**Form factor: Magazine flip-pages.**

Vertical wheel/touch scroll input triggers a **horizontal page-flip transition** between six full-viewport chapters of the homepage. Each chapter is a literal magazine spread. Scroll forward = next page flips in from the right; scroll back = current page flips out to the right and previous page reappears. Implementation via GSAP ScrollTrigger pin + `rotateY` 3D transform on a per-chapter `.page` container, with `transform-style: preserve-3d` and `perspective` on the parent.

This is a **direct execution of Teimuraz's stated metaphor** ("обложка журнала который потом по страницам навигации листает") and a deliberate departure from the current vertical-scroll cinema implementation. The current `/index.html` (cinema homepage) is the conceptual precursor - same six chapters, different transition language.

**Six chapters of the magazine** (each = one viewport, one page-flip):
1. **The Bridge** - hero. Brooklyn Bridge night video, "Ice & Instinct." wordmark, italic Fraunces slogan in champagne.
2. **The Brand** - manifesto. "Ice & Instinct is a private mixology experience..." + signed by Teimuraz.
3. **Offerings** - horizontal-pin sub-rail (chapter-within-a-chapter): intro slide + 4 tier panels (Foundation / Simplicity / Bespoke / Omakase) + Concierge tail.
4. **The Alchemist** - founder portrait + quote + "Read the full story"
5. **The Collection** - 4 cocktail teaser tiles + "View The Collection"
6. **Inquire** - closing marble panel + final CTA + footer

**Inner pages stay deep.** The 11 deep pages (4 tier pages with I-VII structure, /concierge/, /my-story/ with FAQ accordion, /gallery/ horizontal track with 12 tiles + lightbox, /contact/ form, legal pages) remain as full editorial layouts. Magazine flip is homepage-only. Inner pages use standard vertical scroll. Navigation back to home returns to flip-page system.

**Mobile fallback:** below `720px`, the flip transition collapses to native vertical scroll (no 3D rotation), with each chapter still locked to 100dvh. Page-flip 3D is a desktop indulgence. Mobile keeps the same chapter sequence and content, no flips.

**Accessibility:** `prefers-reduced-motion: reduce` disables the flip entirely; falls back to instant chapter swap or vertical scroll. Keyboard navigation: ArrowDown/Space/PageDown = next chapter (triggers flip), ArrowUp/PageUp = previous, Home/End = first/last.

---

## Typography

- **Display/Hero:** **Geist** weight 700, mixed case, letter-spacing -0.04em to -0.06em (tightens at hero scale). Used for h1, h2, .chapter-title, .tier-rank, .closing-title. NEVER all-caps for display.
- **Italic accent:** **Fraunces** weight 350, opsz 144, SOFT 100, WONK 1. Used for ONE word per heading max. The italic carries the "ritual" voice. Examples: "Ice & *Instinct.*", "Touch the glass to *awaken the spirit.*", "Begin *the conversation.*", "*Surrender to* improvisation."
- **Body:** **Inter** weight 300-400, line-height 1.5, max-width 60ch for prose.
- **UI labels / eyebrows / data values:** **JetBrains Mono** weight 400-500, uppercase, letter-spacing 0.22em-0.32em (the institutional caps). Used for "MANHATTAN / BY APPOINTMENT", "EST. 2024", tier-name labels, spec rows, "BY APPOINTMENT ONLY / MANHATTAN & SURROUNDS".

**Loading:** Google Fonts via `<link rel="preconnect">` + a single `<link rel="stylesheet">` loading Fraunces (ital/opsz/wght/SOFT/WONK axes) + Geist (300..900) + Inter (300..600) + JetBrains Mono (400, 500). `display=swap`, `fetchpriority=high`. Already loaded site-wide. Do NOT add Marcellus, Cormorant, Playfair, Italiana, or any other display serif. Geist + Fraunces is the locked pair.

**Scale (vmin-based, scales with smaller dimension of viewport so 32" monitor and 390px phone both fit):**

```css
--t-step--2: clamp(0.7rem, 0.67rem + 0.15vmin, 0.78rem);
--t-step--1: clamp(0.82rem, 0.78rem + 0.18vmin, 0.92rem);
--t-step-0:  clamp(0.95rem, 0.9rem + 0.3vmin, 1.1rem);
--t-step-1:  clamp(1.05rem, 0.95rem + 0.55vmin, 1.3rem);
--t-step-2:  clamp(1.4rem, 1.1rem + 1.4vmin, 2rem);
--t-step-3:  clamp(2rem, 1.4rem + 3vmin, 3.6rem);
--t-step-4:  clamp(2.6rem, 1.8rem + 4.6vmin, 5.4rem);
--t-step-5:  clamp(3.4rem, 2.2rem + 6vmin, 7rem);
--t-step-6:  clamp(4.4rem, 2.6rem + 8.4vmin, 10rem);
--t-step-7:  clamp(5.6rem, 3rem + 11vmin, 13rem);
```

**Hero title specific (single-line on desktop, two-line on mobile):**
```css
.hero-title { font-size: clamp(5rem, 13vw, 20rem); letter-spacing: -0.06em; line-height: 0.9; }
```

---

## Color

- **Approach:** Restrained monochrome + single Champagne Gold accent. The single accent is the only voice color anywhere on the site.

- **Tokens (single source of truth: `/accent.css`. Change there, every page updates.):**

  ```css
  /* /accent.css - edit ONLY this file to swap the site-wide accent */
  :root {
    --c-accent:      oklch(88% 0.06 95);   /* Champagne Gold - primary accent */
    --c-accent-deep: oklch(78% 0.07 92);   /* Deeper champagne - italic Fraunces, hairlines, hover states */
    --c-accent-line: oklch(58% 0.08 90);   /* Darkest champagne - thin separators on dark bg */
  }
  ```

- **Neutrals (locked in /cinema/cinema.css + /styles.css):**

  ```css
  --c-bg:       oklch(8% 0 0);    /* near-black, zero chroma - site background */
  --c-bg-soft:  oklch(11% 0 0);   /* slightly lifted panels */
  --c-fg:       oklch(98% 0 0);   /* chalk white - primary text */
  --c-fg-mute:  oklch(72% 0 0);   /* steel - secondary text */
  --c-fg-faint: oklch(48% 0 0);   /* brushed steel - eyebrow labels */
  --c-rule:     oklch(20% 0 0);   /* hairline dividers */
  ```

- **Hard rules:**
  - **Zero chroma in greys.** Every neutral is `oklch(N% 0 0)`. No warm undertones, no cool undertones. The only chromatic value anywhere is `--c-accent*`.
  - **No yellow / brass / mustard / cream / peach / tonal-skin tones.** Champagne reads warm-ish but is one specific token. Adjacent yellows are forbidden.
  - **No blue undertones.** Failed first iteration (`oklch(...% 0.008 245)`) was rejected.
  - **No purple / magenta / pink / red / green** as theme accent. (Cocktail photography in the gallery on hover may bloom red/green/etc from the actual liquid. That's product, not chrome.)
- **Dark mode:** the site IS dark mode. No light mode exists. Closing chapter's marble panel uses light tones (`oklch(96% 0 0)` to `oklch(78% 0 0)` for marble gradient), but that's a single inverted-island moment, not a theme.

---

## Spacing

- **Base unit:** 4px (assumed by `--t-step-*` and `clamp()` calculations).
- **Density:** Spacious-editorial. Chapter padding scales with viewport height: `clamp(5rem, 9vh, 8rem)` top, `clamp(3rem, 6vh, 5rem)` bottom.
- **Section rule (locked, do not break):** Each homepage chapter = exactly `100dvh` height, `overflow: hidden`. Internal content fits via tightened paddings + `clamp()`-vmin-scaled typography. Never let a chapter overflow its viewport on desktop or mobile. CLAUDE.md commandment #5.

---

## Layout

- **Approach:** Hybrid.
  - **Homepage:** Magazine flip-pages, six chapters, viewport-locked.
  - **Tier pages (4):** Long-form editorial I-VII structure with sticky right-rail navigator (I/II/III/IV/V/VI/VII chips), tier-mood video, three editorial Fraunces-italic "pauses" between sections, tier-ladder cards (A/B/C scale), final CTA. Already shipped. Do NOT collapse.
  - **/my-story/:** Portrait + intro card + drop-cap narrative (Georgia, Lisbon, Moscow, NYC) + ICE/INSTINCT philosophy quote block + finale + 10-item FAQ accordion. Already shipped.
  - **/gallery/:** Horizontal-scroll track of 12 cocktails, B&W to color on hover (desktop) or always color (mobile), drag/wheel-converts-to-horizontal, position counter `01 / 12`, progress bar, lightbox on click. Already shipped.
  - **/concierge/:** Vertical stack of 5 enhancement cards (Cigar Curator $500, Additional Bar Staff $350, The Curator $350, Glassware & Vessels $250, Ice & Temperature $250) with icon + title + price + body + IMPORTANT NOTE callout. Already shipped.
  - **/contact/:** 2-column with Direct channels aside (left) + form (right) with 5 enhancement checkboxes. Form ID needs Formspree replacement (see Pending). Already shipped layout.
- **Max content width:** `1500px` for editorial spreads, `1100px` for chapter prose, `720px` for closing-stage / final-cta.
- **Border radius:** **0 everywhere.** Sharp edges only. No bubbly rounding. The only exception: circular pager dots, Vanish circle, social icons (geometric primitives that need to be round by definition).

---

## Inner-Page First-Segment Standard (the "Gallery Standard") - LOCKED

The canonical opening segment for every inner (deep) page, where the page has
an illustratable set of components. The `/gallery/` page is the reference
implementation; copy its geometry, do not re-invent it.

**Concept.** The first segment of an inner page is one viewport tall (`100dvh`)
and split horizontally into two equal halves:

```
+-----------------------------------------------+
|  TOP 50dvh  - HERO HALF                        |
|  eyebrow . h1 (Fraunces, italic accent) .     |
|  lead. Centered vertically. Ghost-word         |
|  backdrop. Identical rhythm across all pages.  |
+-----------------------------------------------+
|  BOTTOM 50dvh - COMPONENT HALF                 |
|  the page's components, full vertical height   |
|  of the half, symmetric. Scroll only if they   |
|  overflow horizontally.                         |
+-----------------------------------------------+
```

**Hero half (top 50dvh) - standardized, identical everywhere:**
- `<section class="page-hero">` hard-locked to `height/min/max: 50dvh`, `overflow: hidden`.
- `display: flex; flex-direction: column; justify-content: center;` so content sits vertically centered.
- Contents in order: `.section-bg-word` ghost-word backdrop, `.eyebrow`, `<h1>` (with `<span class="it">` accent in champagne italic Fraunces), `.lead`.
- Padding `clamp(2rem, 4vh, 3rem) 0`. `<main>` itself carries zero padding/margin.

**Component half (bottom 50dvh) - symmetric, count-driven:**
- Second `<section>` hard-locked to `height/min/max: 50dvh`, `overflow: hidden`, `display: flex; flex-direction: column;`.
- The component track fills the full vertical height of the half (`flex: 1 1 auto; min-height: 0`). Each component is `height: 100%`, `flex: 0 0 auto`, with a fixed `aspect-ratio` so nothing crops.
- **Two distribution modes, chosen by component count:**
  - **Scroll mode** - when components exceed the viewport width (gallery: 12 cocktails). Horizontal track, wheel/drag/swipe converts to horizontal scroll, position counter plus progress bar (`01 / N`).
  - **Symmetric-fit mode** - when components fit (concierge: 5, offerings: 4). No scroll. Distribute the N components evenly across the full width (`justify-content` space or equal `flex`), each at full half-height. The set is read in one glance, balanced, no overflow.
- A thin meta/progress row may sit at the bottom of the half (gallery uses `01 / 12` plus "Drag . scroll . swipe"). In symmetric-fit mode the meta row is optional.

**Component counts per page (drives the mode):**
| Page | Components | Mode |
|---|---|---|
| `/gallery/` | 12 cocktail tiles | Scroll |
| `/concierge/` | 5 enhancement cards | Symmetric-fit |
| `/offerings/` | 4 tier cards | Symmetric-fit |
| `/my-story/` | 1 portrait (or N/A) | Hero-led, no rail |
| `/contact/` | form (not a rail) | Exempt - hero half plus form |
| `/privacy/`, `/terms/` | legal prose | Exempt |

**Mobile (`<= 720px`):** drop the 50/50 lock. Hero becomes `min-height: 60dvh` auto, component half `min-height: 70dvh` auto, content breathes vertically; scroll mode stays horizontal, symmetric-fit may wrap to a vertical stack.

**Reference CSS:** `cinema-chrome.css` block `body.cinema-chrome.is-gallery` (VP1 part A plus part B). Generalize by promoting these rules off the `.is-gallery` modifier onto a shared `.vp-split` (or equivalent) class as more pages adopt the standard. Keep the hard `50dvh` locks and the `aspect-ratio` component sizing intact - that is what makes the segment feel standardized.

**Why locked:** every inner page opens with the same cinematic beat - a centered hero over a symmetric shelf of that page's substance. Consistency is the luxury signal; the page's content count, not its layout, is what varies.

---

## Motion (Risk 1 architecture demands ambitious motion)

- **Approach:** Expressive but disciplined.
- **Tech stack (CDN, no build step):**
  - **Lenis 1.1.16** for smooth scroll with momentum, sync'd to GSAP ticker.
  - **GSAP 3.12.5** as primary animation engine.
  - **ScrollTrigger** for pin/scrub/parallax. Will gain new responsibility for magazine flip-page transitions.
- **Locked patterns (already implemented in `/cinema/cinema.js`):**
  - Lenis smooth-scroll sync'd to ScrollTrigger.
  - Hero title mask-reveal: `.hero-title .word .ink { yPercent: 110 to 0 }` with `overflow:hidden` on `.word`. Stagger 0.08s.
  - Hero video parallax: scale 1 to 1.18, yPercent 0 to 8 on scroll.
  - Hero subtitle line-reveal: yPercent 110 to 0 stagger.
  - Chapter ghost-text parallax: yPercent 0 to -22%, xPercent 0 to plus/minus 4-6%, scrubbed.
  - Tiers horizontal pin-scroll rail: GSAP `to(rail, { x: -distance }, { pin, scrub })`.
  - Founder portrait parallax: yPercent -6 to 6, scale 1.12 to 1.04.
  - Gallery tiles stagger reveal.
  - Magnetic cursor (dot + ring) with mix-blend-difference, hover scales for `[data-cursor="link"]` and `[data-cursor="view"]`.
  - Vanish-menu overlay open/close: opacity + visibility transition, list items stagger reveal.
  - Closing marble panel scaleY 0.4 to 1 on scroll.
- **New for magazine flip-pages:**
  - GSAP ScrollTrigger on each `.page` container, pin + transform.
  - On forward scroll past a chapter's threshold: animate current page `rotateY(0deg)` to `rotateY(-180deg)`, next page `rotateY(180deg)` to `rotateY(0deg)`, with `transform-origin: left center` to simulate page hinging on its left edge (like a real magazine flipping leftward).
  - Parent container: `perspective: 1500px`, `transform-style: preserve-3d`.
  - Duration per flip: 800-1100ms with `expo.out` ease.
  - Z-index management: incoming page raises above outgoing during flip.
  - Implementation note: vertical wheel-scroll is consumed by ScrollTrigger and translated into the flip animation. Native scrolling appears frozen during flip; resumes between flips for in-page scrolling on chapters that need it (chapter 3's horizontal tier rail still needs to consume the wheel for its sub-scroll). Use ScrollTrigger.observe or scroll-driven ScrollTrigger nested instances.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all transforms, animations, and scroll-driven motion. Pages stack vertically, transitions become instant.
- **Cursor:** custom cursor visible on `hover: hover and pointer: fine` only. Hidden on touch devices (`body { cursor: auto; }`).

**Hard rules:**
- **No blur** (CLAUDE.md commandment #3). No `backdrop-filter: blur()`, no `filter: blur()` on text/images/video. Only sharp linear gradients for scrims. Radial-gradient soft scrims are forbidden.
- **No animation on `top`/`left`/`width`/`height`.** Transforms and opacity only (GPU-accelerated).
- **No motion that fights the user.** No scroll-hijack that prevents reaching footer, no infinite-velocity easings.

---

## Navigation (Risk 2)

**Vanish menu.** A single champagne circle in the top-right corner of every chapter and every deep page. Three thin horizontal lines inside (icon). On click, full-screen overlay slides up with:
- Six chapter listings: `01 / Bridge / The opening view`, `02 / The Brand / Not a bar. A studio.`, etc.
- A secondary "Read in full" block linking to all 8 deep pages.
- Footer meta: `Manhattan / By Appointment`, `EST. 2024`.

The top horizontal navbar on the existing 11 deep pages should be migrated to the Vanish system in a future commit (HANDOFF item). Until then, deep pages keep their classic horizontal nav. A known visual inconsistency between home and deeps that needs resolving.

**Pager dots.** Vertical column of 01-06 dots on the left margin of the homepage, mix-blend-difference, indicating current chapter. Click jumps to chapter (triggers flip). Hidden below 720px.

**No horizontal navbar on homepage.** Vanish + pager replace it.

---

## Components & Tokens Inventory (existing, do not reinvent)

- **Magnetic cursor** (`.cursor`, `.cursor-dot`, `.cursor-ring`)
- **Vanish trigger** (`.va-trigger`, `.va-trigger-ring`, `.va-trigger-icon`)
- **Vanish overlay** (`.va-overlay`, `.va-stage`, `.va-list`, `.va-deep`, `.va-foot`)
- **Pager dots** (`.pager`, `.pager-dot`)
- **Hero** (`.hero`, `.hero-video`, `.hero-vignette`, `.hero-grain`, `.hero-meta`, `.hero-stage`, `.hero-title`, `.hero-sub`, `.hero-cue`)
- **Chapter** (`.chapter`, `.chapter-bg`, `.chapter-bg-text`, `.chapter-grid`, `.chapter-prose`, `.chapter-title`, `.chapter-lead`, `.chapter-author`, `.chapter-body`)
- **Tiers** (`.tiers`, `.tiers-rail`, `.tiers-intro`, `.tiers-headline`, `.tiers-lead`, `.tier`, `.tier-bg`, `.tier-body`, `.tier-rank`, `.tier-name`, `.tier-title`, `.tier-spec`, `.tier-link`)
- **Founder** (`.founder`, `.founder-stage`, `.founder-image`, `.founder-text`, `.founder-quote`, `.founder-name`, `.founder-role`, `.founder-link`)
- **Gallery** (`.gallery`, `.gallery-intro`, `.gallery-title`, `.gallery-lead`, `.gallery-track`, `.gallery-tile`)
- **Closing** (`.closing`, `.closing-marble`, `.closing-stage`, `.closing-mark`, `.closing-title`, `.closing-lead`, `.closing-cta`, `.closing-meta`)
- **Buttons** (`.btn-primary`, `.btn-ghost`, on closing/marble-panel context only)
- **Footer** (`.foot`, `.foot-mark`, `.foot-meta`)
- **Depth layers** (`.section-bg-word`, `.section-bg-word.top|left|right`, champagne hairlines via `::before` on each chapter)
- **Site-wide grain** (`body::after` fixed layer, `mix-blend-mode: overlay`, opacity 0.05)

All of these are defined in `/cinema/cinema.css`. Inner-page components are in `/styles.css`. Do not duplicate; extend within the existing files.

---

## Inviolable Commandments (from `/CLAUDE.md`, restated here for any session that reads DESIGN.md first)

1. **Strict monochrome.** `oklch(N% 0 0)` neutrals + Champagne Gold via `/accent.css` only. No blue / yellow / brass / mustard / cream / skin / tonal / peach / purple / pink / green / red anywhere in chrome.
2. **Cocktails in `/gallery/` are the ONLY exception.** B&W default with `filter: grayscale(100%) contrast(1.08) brightness(0.92)`, full color on `:hover` (desktop) or by default (mobile).
3. **No blur, anywhere.** No `backdrop-filter: blur()`, no radial soft scrims, no motion blur on images, no `filter: blur()` on anything. Sharp linear gradients only.
4. **Big editorial typography.** Geist 700 + Fraunces italic single-word accents + Inter body + JetBrains Mono labels. No other display fonts (Marcellus, Playfair, Cormorant, Italiana, etc. are rejected, confirmed via session iteration).
5. **Each homepage chapter = exactly 100dvh.** Hard lock with `height: 100dvh; overflow: hidden;`. Internal content scales via `clamp()` vmin-based typography + viewport-based padding. Mobile-first by definition.
6. **Gallery scrolls horizontally, not vertically.** Track with `overflow-x: auto; scroll-snap-type: x mandatory;`. Wheel/drag converts vertical to horizontal.
7. **Mobile is co-priority with desktop.** Every clamp() and media query must validate at 390x844 (iPhone 14). Magazine flip-pages collapse to native vertical scroll on `max-width: 720px`.
8. **Real scroll motion, never flat PowerPoint.** Lenis + GSAP + ScrollTrigger required. Reveal animations: mask-clip, yPercent stagger, parallax, scrub. `prefers-reduced-motion: reduce` always provides accessible fallback.
9. **Inquiry-only.** Never add e-commerce checkout, "Add to Cart", or `prod_*` IDs. Service is commissioned via /contact/ form to Formspree to email reply. Final CTA is "Inquire", never "Buy" or "Book Now".
10. **No em-dashes (U+2014) or en-dashes (U+2013) anywhere.** Body copy, headings, JSON-LD, comments, commit messages, docs. Plain hyphens (`-`, U+002D) only. Pre-commit hook in `~/.claude/hooks/no-dashes.sh` enforces. Run the audit before push (use the python3 dash-scanner snippet in CLAUDE.md).
11. **No religious expressions** ("слава богу", "thank god", etc.).
12. **No emojis** in code, docs, copy, commit messages, or UI. Use SVG icons or typographic ornaments (`✦`, `✧` if absolutely needed for ornament).

---

## Pending Configuration (must replace before launch)

- **Formspree form ID.** `REPLACE_WITH_FORMSPREE_ID` in `/contact/index.html`. Replace with the live form ID from formspree.io account.
- **Email address.** `hello@iceinstinct.com` is placeholder in `/contact/index.html`, `/privacy/index.html`, `/terms/index.html`, and `cinema.js` error messages. Confirm the address.
- **Social URLs.** Footer Instagram/Facebook/TikTok/X links currently `href="#"`. Replace with real accounts.
- **Logo.** Current SVG diamond mark is a placeholder. Teimuraz will supply the real logo. Specs: square viewBox preferred (24x24 or 32x32), single-color, must work in both `currentColor` (for header) and on light marble panel context. Aim for thin-line geometric, not chunky.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-01 | Strict monochrome + Готэм-Манхэттен luxury direction locked in CLAUDE.md | Teimuraz explicit veto on blue, yellow, warm gold, purple. Only black/white/grey + neutral silver accent |
| 2026-05-01 | Geist 700 + Fraunces italic mix locked | Editorial brand voice; rejected Inter-as-display, Arial-as-display |
| 2026-05-07 | Single accent token architecture: `/accent.css` consumed by all 13 pages | Allows one-edit site-wide color swap |
| 2026-05-07 | Champagne Gold `oklch(88% 0.06 95)` chosen as accent | Picked from gold sub-palette after rejecting bronze, silver, smoke, crimson, emerald, schiaparelli, verdant, antique gold, rose gold, honey |
| 2026-05-07 | Cinema homepage promoted to `/index.html` (replacing original flat home, backed up as `/home-classic.html`) | Roundtrip routing: any "home" link returns to cinema, not legacy flat layout |
| 2026-05-07 | Depth pass: film grain + ghost-words + champagne hairlines + ghost-word parallax | Teimuraz flagged "everywhere flat black + white letters". Added depth layers within monochrome+no-blur commandments |
| 2026-05-08 | `/design-consultation` formal review with Layer 1/2/3 synthesis | Locks visual system for future sessions |
| 2026-05-08 | **Risk 1 architecture upgraded: magazine flip-pages** | Direct execution of Teimuraz's stated "обложка журнала который потом по страницам навигации листает" metaphor. Replaces current vertical-scroll cinema with horizontal page-flip transitions. Implementation pending. |
| 2026-05-08 | Risk 2 (Vanish nav), Risk 3 (Champagne accent), Risk 4 (founder-front Chapter 04) all kept | All survived the Phase 4 wilder-risks check |
| 2026-05-08 | DESIGN.md created as canonical reference | Future Claude sessions must read this before any visual decision |
| 2026-05-31 | Cinema chrome migrated to all 10 deep pages; 5 gallery tiles swapped to high-res | Vanish nav + grain + cursor + ghost-word now site-wide on deep pages |
| 2026-05-31 | **Inner-Page First-Segment Standard ("Gallery Standard") locked** | Teimuraz directive: every inner page opens with a 100dvh segment split 50/50 - standardized hero half on top, symmetric component half below. Scroll mode when components overflow (gallery 12), symmetric-fit when they do not (concierge 5, offerings 4). Gallery is the reference implementation. |
| 2026-05-31 | Gallery "Commission a ritual" closing panel recast light marble to dark champagne luxe | Light panel broke the dark cinema flow at the climax; scoped to `.is-gallery` so shared light CTAs elsewhere untouched. Card treatment to revisit later per Teimuraz. |

---

## How to Use This File

**Before any visual edit on this site**, read DESIGN.md in full. If your change conflicts with anything here, either:
1. Stop and ask Teimuraz, OR
2. Update DESIGN.md as part of the same commit with a Decisions-Log entry explaining what changed and why.

Never silently break a rule here. The whole point of this file is to prevent rebuilding the same decisions every session.

If you're about to:
- Add an emoji. STOP.
- Add an em-dash. STOP.
- Add a blur filter. STOP.
- Use Marcellus, Playfair, Cormorant, Italiana, or any display font other than Geist. STOP.
- Add a yellow / brass / mustard / cream tone. STOP.
- Add a horizontal navbar to the homepage. STOP, the Vanish menu replaces it.
- Change `--c-accent` directly in `cinema.css` or `styles.css`. STOP, edit `/accent.css` instead.
- Implement the magazine flip-pages. Proceed with reference to `/cinema/cinema.js` GSAP setup + this DESIGN.md Motion section. Will need a follow-up commit. Test reduced-motion fallback.
- Touch the 11 deep pages. Read the relevant page's source first, do not collapse or restructure the I-VII tier layout, FAQ accordion, gallery track, or concierge cards without explicit Teimuraz approval.
