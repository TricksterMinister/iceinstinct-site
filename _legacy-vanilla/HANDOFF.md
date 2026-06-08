# Handoff - Ice & Instinct site rebuild

**Read in this order before doing ANY work:**
1. `/CLAUDE.md` - design commandments + brand context (locked)
2. `/DESIGN.md` - canonical design system (locked, includes magazine-flip-pages architecture decision)
3. `/STORYBOARD.md` - narrative spine of cinema homepage
4. `/CONTENT-MAP.md` - source-line mapping for every block on cinema home (proves no hallucinated copy)
5. This file - live status + next-step checklist

---

## Where we are right now (end of session 2026-05-08)

Site lives at `http://localhost:8766/` via `python3 -m http.server 8766` (background process; restart if port closed). Last commit `5068ad1` on `main` of `TricksterMinister/iceinstinct-site` (NOT pushed to remote yet - user has not asked).

### What was built this session (2026-05-08, ~24 commits)

**Architecture / system locks:**
- `/accent.css` - **single source of truth** for site-wide accent color. Currently Champagne Gold `oklch(88% 0.06 95)`. Linked from all 13 HTML pages BEFORE main stylesheet. Edit only this file to swap accent everywhere.
- `/DESIGN.md` (~380 lines) - canonical design system. Includes Risk 1 architecture decision: **magazine flip-pages** for homepage (vertical-scroll cinema implementation is current precursor; flip-page rebuild pending).
- `/STORYBOARD.md` - six-chapter cinema-homepage narrative
- `/CONTENT-MAP.md` - source-line mapping (transparency on what copy came from where)
- `/CLAUDE.md` - appended with routing block pointing to DESIGN.md as required pre-read

**Cinema homepage (`/index.html`):**
- Promoted cinema prototype to `/`. Old flat home backed up as `/home-classic.html`.
- Six chapters, vertical-scroll-locked (each 100dvh): Bridge (hero), The Brand (manifesto with "RITUAL" ghost-word), Offerings (horizontal-pin 4-tier rail + Concierge tail), The Alchemist (founder), The Collection (gallery teaser - 5 tiles), Inquire (closing marble panel)
- Vanish menu: champagne circle top-right + full-screen overlay with 6 chapter links + "Read in full" deep-page links + ESC close
- Pager dots 01-06 on left margin (mix-blend-difference)
- Magnetic cursor (dot + ring)
- Lenis smooth-scroll + GSAP ScrollTrigger
- Film grain `body::after` (opacity 0.05, mix-blend overlay)
- Ghost-words per chapter (`RITUAL`, `OFFERINGS`, `ALCHEMIST`, `COLLECTION`, `BEGIN`) with parallax via ScrollTrigger
- Hero "Ice & Instinct." on ONE line desktop, two lines mobile; italic Fraunces accent
- Slogan "Where ritual meets instinct, high above the city." in italic Fraunces, champagne color, large
- Champagne hairlines between chapters

**Media added/fixed:**
- 8 new high-res ALCHEMY&ICE cocktail shots copied to `/assets/photos/` with cocktail-name slugs:
  - `calipso-cream.jpeg`, `basil-in-my-mind.jpeg`, `belladonna.jpeg`, `rose-garden.jpeg`, `1001-nights.jpeg`, `white-lotus.png`, `white-lotus-pour.png`, `persimmon-saffron-sour.png`, `aureliano.png`
- 3 prior 404s fixed in `/gallery/`: White Lotus, Persimmon Saffron Sour, Aureliano
- Home gallery teaser uses 5 high-res new shots (Belladonna, Rose Garden, Persimmon Saffron, Basil in my mind, White Lotus) for color-palette balance

**`/gallery/` deep page upgraded (Cinema treatment):**
- Body class `cinema-chrome is-gallery` switches in `/cinema-chrome.css`
- Classic horizontal header hidden, Vanish circle + overlay applied
- Magnetic cursor, film grain, `COLLECTION` ghost-word with parallax
- Two viewport-locked segments: VP1 (50dvh hero + 50dvh tile track) + VP2 (Commission a ritual + footer combined)
- Tiles are 3:4 portrait (matches source image aspect), height 100% of track flex
- 5-6 tiles fit horizontally on 32" monitor

**New shared chrome files:**
- `/cinema-chrome.css` - Vanish nav + grain + cursor + ghost-word + hide-old-header. Scoped via `body.cinema-chrome`.
- `/cinema-chrome.js` - Vanish open/close + magnetic cursor + ScrollTrigger ghost-word parallax. Optional GSAP detection.

**Picker tool (dev only, gitignored):**
- `/picker/` directory at `/picker/index.html`. Visual selection grid with 333 thumbnails from across user's drives (ALCHEMY&ICE + TUMAN + LAST_IMAGE_GEN + TEMO-AI-FOTO + iceinstinct-source/media).
- LocalStorage-backed shortlist + EXPORT button. Used this session to pick 10 cocktail shots.
- Can be regenerated: `find` candidate folders → `sips`/`ffmpeg` thumbnails → `meta.json` → grid HTML.
- Added to `.gitignore`.

---

## Pending work (priority order)

### High priority - architectural

1. **Implement magazine flip-pages on `/` (Risk 1 from DESIGN.md).** Current homepage is vertical-scroll cinema, conceptual precursor. DESIGN.md locks the form factor:
   - Each chapter = 100dvh page with `rotateY` 3D transform
   - GSAP ScrollTrigger pin + scrub translates vertical wheel into horizontal page-flip
   - `transform-style: preserve-3d`, `perspective: 1500px`, `transform-origin: left center`
   - Duration 800-1100ms `expo.out`
   - Z-index management: incoming page raises above outgoing
   - Mobile <= 720px: disable flip, native vertical scroll
   - `prefers-reduced-motion`: instant chapter swap
   - Keyboard: ArrowDown/Space/PageDown = next, ArrowUp/PageUp = prev, Home/End = first/last
   - Tier rail (chapter 3) keeps horizontal-pin sub-scroll inside the parent chapter
   - **Recommended:** prototype in `/cinema-flip/index.html` FIRST. Compare side-by-side with `/`. Promote if successful.

2. **Migrate other 10 deep pages to cinema chrome.** `/gallery/` is done. Remaining:
   - `/offerings/` + 4 tier pages (foundation/simplicity/bespoke/omakase)
   - `/concierge/`
   - `/my-story/`
   - `/contact/`
   - `/privacy/`, `/terms/`
   - For each: add `<link rel="stylesheet" href="/cinema-chrome.css">`, body class `cinema-chrome`, add Vanish HTML markup, add cursor markup, add `<script src="/cinema-chrome.js" defer>`. Hero ghost-word optional.
   - Tier pages need own ghost-word per tier (FOUNDATION / SIMPLICITY / BESPOKE / OMAKASE).
   - Concierge gets `CONCIERGE` or `RITUAL`.
   - My Story gets `ALCHEMIST` or `STORY`.
   - Contact gets `INQUIRE`.

### Medium priority - content / config

3. **Formspree form ID** still `REPLACE_WITH_FORMSPREE_ID` in `/contact/index.html` line 88. User has Formspree account; needs ID from `formspree.io/forms/`.
4. **Email** `hello@iceinstinct.com` is placeholder in `/contact/index.html`, `/privacy/index.html`, `/terms/index.html`. Confirm real address with user.
5. **Social URLs** in all footers are `href="#"`. Replace Instagram, Facebook, TikTok, X.
6. **Logo.** User said he will supply. Current SVG diamond mark in nav + footer is placeholder. Specs in DESIGN.md.

### Medium priority - remaining gallery media

7. **5 cocktail tiles in `/gallery/` still reference old low-res Whisk files.** Could swap to new high-res ALCHEMY&ICE versions for:
   - Aviation (uses `generated-image-...7_41pm-NBbxW61xks4izMLg.jpeg`, no high-res alternative chosen)
   - Black Truffle Martini (uses `generated-image-...6_43pm-bHcjO1So1iA225II.jpeg`, already in repo)
   - Rose Garden Rendezvous (low-res file; high-res `rose-garden.jpeg` exists in repo, swap it)
   - Basil in my mind (`basil-in-my-mind.jpeg` exists in repo, swap)
   - 1001 Nights (`1001-nights.jpeg` exists, swap)
   - Call Me By Your Name (no replacement, keep current)
   - Calipso Cream (high-res `calipso-cream.jpeg` exists, swap)
   - Bésame (no replacement)

### Low priority - generation pipeline (when user adds Higgsfield credits OR uses video skill)

8. **Generate 4 distinct tier pour-videos via `~/.claude/skills/video/`** (Veo 3.1, key in `/Users/teimurazbenidze/.claude/skills/video/.env`):
   - Foundation: `genre: intimate, slow_motion: true`
   - Simplicity: `genre: noir, marble stir`
   - Bespoke: `genre: spectacle, smoke + floral garnish`
   - Omakase: `genre: dramatic, flaming peel`
   - Plan via skill's hard rules: keyframes (Nano Banana, ~$0.04 each) FIRST as mockup → user approves → Veo i2v (~$3-6 per 8s clip).
   - Replace current shared Pexels `videos.pexels.com/video-files/4765778/4765778-hd_1920_1080_25fps.mp4` in `/cinema/cinema.css` tier-bg video sources + tier pages.

9. **Hero alternate footage.** User likes Brooklyn Bridge. Optional Veo 3.1 alternative if needed later. Not urgent.

10. **Founder character ID via Soul Cast (Higgsfield).** Once user buys Higgsfield credits; upload existing `founder-temo.jpg` as reference, generate consistent founder shots across scenes.

---

## Files of record

- `/CLAUDE.md` - brand commandments + tech stack
- `/DESIGN.md` - canonical design system (READ FIRST)
- `/STORYBOARD.md` - narrative spine
- `/CONTENT-MAP.md` - source-line mapping
- `/HANDOFF.md` - this file
- `/accent.css` - single accent token (edit to swap site-wide accent)
- `/styles.css` - main stylesheet for deep pages
- `/cinema-chrome.css` + `/cinema-chrome.js` - shared atmosphere for deep pages (loaded after styles.css when body has class `cinema-chrome`)
- `/cinema/cinema.css` + `/cinema/cinema.js` - homepage cinema styles + JS (vertical-scroll cinema; pending flip-page rebuild)
- `/index.html` - homepage (cinema). `/cinema/index.html` is duplicate for backward URL.
- `/home-classic.html` - backup of original flat home (NOT linked, recovery only)

---

## Local dev quick start (next session)

```bash
# 1. Verify server alive
curl -sI http://localhost:8766/ | head -2

# 2. If dead, restart from project root:
cd /Users/teimurazbenidze/iceinstinct-site && python3 -m http.server 8766 > /tmp/iceinstinct-server.log 2>&1 &

# 3. Open
open http://localhost:8766/

# 4. Test pages
open http://localhost:8766/gallery/      # cinema chrome already applied
open http://localhost:8766/offerings/    # still on old horizontal header (migration pending)
open http://localhost:8766/my-story/     # still on old horizontal header
```

## Cinema chrome quick-apply recipe (for migrating remaining 10 deep pages)

In `<head>`, AFTER `/styles.css` link:
```html
<link rel="stylesheet" href="/cinema-chrome.css?v=20260508e">
```

Replace `<body>` with:
```html
<body class="cinema-chrome">
```

After opening `<body>`, BEFORE the existing `<header class="header">`:
```html
<div class="cursor" aria-hidden="true">
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>
</div>

<button class="va-trigger" aria-label="Open menu">
  <span class="va-trigger-ring"></span>
  <span class="va-trigger-icon"><span></span><span></span><span></span></span>
</button>

<div class="va-overlay" aria-hidden="true">
  <button class="va-close" aria-label="Close menu"><span></span><span></span></button>
  <div class="va-stage">
    <p class="va-eyebrow">Ice &amp; Instinct / Index</p>
    <ul class="va-list">
      <li><a href="/"><i>01</i><b>Home</b><em>The opening view</em></a></li>
      <li><a href="/offerings/"><i>02</i><b>Offerings</b><em>Four levels, one standard</em></a></li>
      <li><a href="/concierge/"><i>03</i><b>Concierge</b><em>Five enhancements</em></a></li>
      <li><a href="/my-story/"><i>04</i><b>My Story</b><em>Teimuraz Benidze</em></a></li>
      <li><a href="/gallery/"><i>05</i><b>The Collection</b><em>Twelve compositions</em></a></li>
      <li><a href="/contact/"><i>06</i><b>Inquire</b><em>Begin the conversation</em></a></li>
    </ul>
    <footer class="va-foot">
      <span>Manhattan / By Appointment</span>
      <span>EST. 2024</span>
    </footer>
  </div>
</div>
```

Before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="/cinema-chrome.js?v=20260508a" defer></script>
```

Optional: in the first `<section>`, add `<div class="section-bg-word" aria-hidden="true">PAGE_WORD_HERE</div>` for ghost-word backdrop.

---

## Decisions log (this session only)

| Time | Decision | Why |
|---|---|---|
| Session start | Run `/design-consultation` skill to formalize design system | User wanted canonical reference; prior session was iterative |
| Phase 3 (proposal) | Risk 1 architecture upgraded to **magazine flip-pages** | Direct execution of user's stated "обложка журнала + перелистывание страниц" metaphor |
| Picker tool | Built `/picker/` with 333 thumbnails to solve Finder browsing pain | User couldn't easily compare candidates in Finder; localStorage shortlist persists |
| Media | Used 8 ALCHEMY&ICE high-res shots + 1 Aureliano | User picked via picker EXPORT; matched to live `/gallery/` 12-cocktail collection |
| `/gallery/` | Promoted to Cinema chrome treatment (option C of 3 offered) | User picked "C" - full cinema language migration |
| Gallery layout | Split into VP1 (hero+tiles 50/50) + VP2 (cta+footer) | User: each viewport segment should be self-contained, no tile clipping |
| Tiles | Aspect-ratio 3/4 portrait, height 100% of track flex | Source images are 3:4; matching aspect means no top/bottom crop on cocktail glassware |

---

## Continue-from-here prompt for next chat

> Ice & Instinct site rebuild. Last session ended 2026-05-08, last commit `5068ad1`.
>
> Read in this order:
> 1. `/Users/teimurazbenidze/iceinstinct-site/CLAUDE.md`
> 2. `/Users/teimurazbenidze/iceinstinct-site/DESIGN.md`
> 3. `/Users/teimurazbenidze/iceinstinct-site/STORYBOARD.md` and `CONTENT-MAP.md`
> 4. `/Users/teimurazbenidze/iceinstinct-site/HANDOFF.md` (this file - check Pending work section for next priorities)
>
> Local server runs at `http://localhost:8766/`. Restart with `cd /Users/teimurazbenidze/iceinstinct-site && python3 -m http.server 8766 > /tmp/iceinstinct-server.log 2>&1 &` if dead.
>
> Next priorities (per HANDOFF Pending work):
> - High: implement magazine flip-pages on `/` (Risk 1 from DESIGN.md); prototype in `/cinema-flip/` first
> - High: migrate Vanish chrome to remaining 10 deep pages (recipe in HANDOFF)
> - Medium: replace 5 low-res Whisk gallery tiles with new high-res versions already in `/assets/photos/`
> - Medium: real Formspree form ID, real email, real social URLs, real logo (user-supplied)
> - Low: generate 4 distinct tier pour-videos via `~/.claude/skills/video/` (Veo 3.1 + Nano Banana keyframes), key already in skill `.env`
