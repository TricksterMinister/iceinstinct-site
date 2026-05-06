# Handoff - Ice & Instinct site rebuild

**Read `CLAUDE.md` first**, then this. This file is the live status & next-step checklist.

---

## Where we are right now (end of chat - 2026-05-05)

Site is **18 phases deep**, last commit `01bd6d2` on `main` of `TricksterMinister/iceinstinct-site`. Local server lives at `http://localhost:8766/` (one URL, full site - user navigates via header nav).

### Phases shipped this build window (2026-05-01 to 2026-05-05)

| # | Commit | What |
|---|---|---|
| 1 | `8e35de0` | GA4 (`G-KBVETWTVVH`) on all 12 HTML pages |
| 2 | `35ba3e8` | Home manifesto section (overlapping image + sharp dark panel, no blur, speakable schema) |
| 3+4 | `4171253` | My Story full rebuild: drop-cap narrative, philosophy quote with scroll-driven word reveal, native `<details>/<summary>` FAQ accordion, FAQPage + Person + Speakable schema |
| lint | `d962278` | Removed `eyebrow::before` hairlines globally, removed `.story-divider`, swapped legal `<li>` `-` markers for tiny rotated diamonds |
| 5 | `5f59512` | Foundation tier rebuilt with full I-VII structure (Overview / Menu Protocol / Scalability + A/B/C ladder / What's Included / Standard Inclusions / Host Provides / Notes) + Service AggregateOffer schema |
| 6 | `e4421dd` | Simplicity tier - same I-VII pattern |
| 7 | `52a48f3` | Bespoke tier - same, plus Custom Recipe Documentation inclusion |
| 8 | `be82e87` | Omakase tier - same, plus Ice Ritual mandatory callout + Tier C "Not recommended" treatment |
| 9 | `c3689b3` | Concierge full rebuild: 5 enhancement cards (Cigar Curator $500 / Bar Staff $350 / The Curator $350 / Glassware $250 / Ice & Temperature $250) with inline SVG placeholder icons + ItemList schema |
| 10 | `c5209d4` | Contact form: enhancement multi-checkbox group + new CSS for custom monochrome checkboxes |
| photo | `94253cc` | Founder portrait swapped: AI placeholder → real `ICE-TEMO.jpg` (1920x1071, 472KB optimized via sips) |
| photo | `ea25f50` | Concierge ice cube: SVG placeholder → real `ice.jpg` photo (256x256, 14.7KB), monochrome filter |
| 11-15 | `1e203cb` | Lint pass + editorial Fraunces pauses between I-II / III-IV / V-VI on each tier (12 unique quotes from source copy) + vertical scroll-snap viewport on tier-section + sticky right-rail tier navigator (I/II/III/IV/V/VI/VII chips, IntersectionObserver active) + View Transitions API morph from `/offerings/` cards to detail hero |
| 16 | `592d5d9` | Ambient slow-motion cocktail-pour video in each tier hero (Pexels CDN, 1080p, monochrome) |
| 17 | `f636d73` | Tier-page viewport compaction: removed doubled hero padding, video aspect 4/5→4/3, 2-column subsection grid for sections IV/V/VI (`.tier-prose-grid`), tightened line-height 1.7→1.55, removed `border-top` between tier-sections |
| 18 | `01bd6d2` | Same compaction applied to home page `.scene` blocks (founder-preview was still overflowing). `--c-fg-faint` bumped 40%→56% L for AA contrast. Custom focus-ring (double-stroke box-shadow). |

### Source materials staging (still in `/Users/teimurazbenidze/iceinstinct-source/import-from-user/`)

10 files documenting every page of the live Hostinger site, plus `_PAGE-GROUPS.md`. All content from those was integrated into the rebuild.

### Active thread (interrupted mid-fix at handoff)

User reported: real lead **Pavel Tsineuski** (Seven Eagles relocation, May 4) submitted to **TCS Web - Contact** form on Formspree, ended up in spam folder. Walked user through:
- ✅ Marked Pavel's submission as not-spam (now in Inbox)
- ⏳ **Next step user is on**: turn OFF the Formshield toggle in Spam Protection (sensitivity slider is locked behind $20/mo Pro plan, so toggle off is the workaround)
- ⏳ Then: respond to Pavel via WhatsApp `9176050737`
- ⏳ Then: do the same for the other form (**ALCHEMY & ICE Inquiry Form**) preventively

User has TWO Formspree forms:
1. **TCS Web - Contact** - form ID `mlgaqwod` - for a different project (relocation services)
2. **ALCHEMY & ICE Inquiry Form** - form ID NOT YET CAPTURED - this is the one we need for `/contact/index.html` of THIS project (placeholder is `REPLACE_WITH_FORMSPREE_ID`)

### What's pending (waiting for user input)

1. **Formspree ID for ALCHEMY & ICE Inquiry Form** - user to capture from Formspree dashboard. Then sed-replace `REPLACE_WITH_FORMSPREE_ID` in `contact/index.html`
2. **Better tier-mood photos** - user said current AI-generated `whisk_*` and `generated-image-december-*` placeholders are temporary. Will swap on the same pattern as `ICE-TEMO.jpg` swap (drop file on Desktop, name "Ice [Tiername]", I optimize via sips + replace refs in 1 commit)
3. **Better manifesto cocktail photo** (`/assets/photos/manifesto-cocktails.png`) - user not satisfied with current quality
4. **4 of 5 add-on illustrations** still inline SVG placeholders (only Ice & Temperature has real image now) - cigar, bar staff, curator, glassware
5. **YouCanBookMe integration** - user has YCBM linked to current iceinstinct.com. Need decision on placement model: full replacement of inquiry form / dual placement (form + YCBM link) / private link sent after qualification
6. **Hostinger deployment** - new site only on GitHub. Live `iceinstinct.com` still serves old Hostinger Builder.
7. **Instagram URL** + email + other social URLs (still placeholders)

### What's done that wasn't in the original plan

- Global Claude Code hook at `~/.claude/hooks/no-dashes.sh` (blocks Write/Edit with em or en dashes across ALL projects, not just this one)
- Plan file: `~/.claude/plans/hi-indexed-wilkinson.md`
- Site is `localhost:8766` accessible via single URL `http://localhost:8766/` - user clicks header nav to reach all pages

---

## Active blockers (resolve in next session)

### 1. Awaiting user's HTML files for content import

Status: gallery imported (12 cocktail names + tagline). Other 9 pages still use Claude-written copy.

User said: **"Я буду по очереди кидать прямо сюда буду ждать тебя. Кину, буду ждать, пока ты поработаешь с этим конкретным файлом, потом пойдем дальше."**

Workflow:
1. User pastes one HTML file
2. Read it carefully for: copy, image references, structure, microcopy, internal patterns
3. Rewrite the corresponding page in our design system using the exact text where possible
4. Commit + push
5. Tell user "ready for next file"

Pages still pending HTML:
- Home (`/index.html`)
- Offerings hub (`/offerings/index.html`)
- Foundation tier (`/offerings/foundation/`)
- Simplicity tier (`/offerings/simplicity/`)
- Bespoke tier (`/offerings/bespoke/`)
- Omakase tier (`/offerings/omakase/`)
- Concierge (`/concierge/`)
- My Story (`/my-story/`)
- Contact (`/contact/`)

### 2. Three pieces of config need real values

These were left as placeholders pending user input:

**a. Formspree form ID** - user confirmed an existing form already runs on the live site. Get the endpoint (8 chars after `formspree.io/f/`), then:

```bash
sed -i '' 's|REPLACE_WITH_FORMSPREE_ID|m________|g' contact/index.html
```

**b. Instagram URL** - user confirmed it exists. Replace all `<a href="#" aria-label="Instagram">` in every page footer:

```bash
grep -rl 'aria-label="Instagram"' --include='*.html' . | xargs sed -i '' 's|<a href="#" aria-label="Instagram"|<a href="https://www.instagram.com/REAL_HANDLE/" target="_blank" rel="noopener" aria-label="Instagram"|g'
```

**c. Email address** - `hello@iceinstinct.com` is placeholder. Confirm with user.

### 3. Other social links

Footer also has placeholder links for Facebook, TikTok, X. User hasn't confirmed which actually exist. Ask, then either populate with real URLs or remove the icon entirely (clean is fine).

---

## After content import & config - deploy

1. **Hostinger backup** of current Builder site (export or download via File Manager).
2. **Switch hosting plan** from Builder to Web Hosting in hPanel (may require a paid plan upgrade - the user is OK with Hostinger).
3. **Git auto-deploy**: connect repo, branch `main`, deploy to `public_html`.
4. Test HTTPS, .htaccess rules, redirects.
5. **Cache-bust** to a fresh value before the very first deploy:
   ```bash
   cd /Users/teimurazbenidze/iceinstinct-site
   today=$(date +%Y%m%d)
   grep -rl 'v=20260501' --include='*.html' . | xargs sed -i '' "s|v=20260501|v=$today|g"
   git add -A && git commit -m "Cache-bust on launch"
   git push
   ```

If Hostinger Web Hosting can't deliver clean Git deploy, fallback options (in order of preference): Cloudflare Pages, Netlify, GitHub Pages.

---

## Test checklist before launch

- [ ] Each section on home fits in 100dvh on 1440×900 desktop and 390×844 phone
- [ ] Gallery horizontal track snaps cleanly on touch + wheel + drag
- [ ] Tier cards swipe horizontally on mobile (<=720px) with visible "← Swipe →" hint
- [ ] Lightbox works on `/gallery/` (Esc, backdrop, X close)
- [ ] Form submits successfully (test send)
- [ ] All 12 pages have correct title/description in `<head>`
- [ ] All `<a href="#">` social links replaced with real URLs OR removed
- [ ] Footer copyright `© 2026 Ice & Instinct` correct on every page
- [ ] No blur anywhere (DevTools → search styles for `backdrop-filter`, should be 0 hits in our CSS)
- [ ] No coloured tints - all backgrounds and foregrounds use `oklch(N% 0 0)` (zero chroma) or pure neutral grays
- [ ] Cocktails on `/gallery/` are B&W default → colour on hover (desktop) and full colour on mobile
- [ ] Schema validates: https://search.google.com/test/rich-results
- [ ] Lighthouse mobile performance 80+

---

## Style preferences locked-in (DO NOT SECOND-GUESS)

These came from explicit user feedback. Don't drift back from them in any future session:

- **Strict monochrome.** Black, white, gray, silver, steel. No yellow gold, no champagne, no blue, no purple. The only colour on the entire site appears on cocktail photography in the gallery (and only on hover/mobile).
- **No blur.** No `backdrop-filter`, no soft radial gradients, no motion blur. All edges sharp.
- **Massive typography.** Geist sans + Fraunces italic mix. Single italic word per heading max.
- **Each major section = one viewport.** `.scene` class enforces 100dvh.
- **Mobile is co-priority with desktop.** All viewports must work down to 360px.
- **Gallery is horizontal-scroll**, not vertical grid.
- **Inquiry-only**, never e-commerce checkout.
- **No em-dashes.** Plain hyphens only.
- **No religious expressions.** User is atheist.

---

## Useful commands

```bash
# Start local server
cd /Users/teimurazbenidze/iceinstinct-site
python3 -m http.server 8766

# Stop local server
pkill -f "http.server 8766"

# Validate JSON-LD
python3 -c "
import re, json
for f in ['index.html','offerings/index.html','gallery/index.html']:
  s = open(f).read()
  for i, m in enumerate(re.findall(r'<script type=\"application/ld\\+json\">(.*?)</script>', s, re.DOTALL)):
    try: json.loads(m); print(f, i+1, 'OK')
    except Exception as e: print(f, i+1, 'FAIL', str(e)[:80])
"

# Quick deploy after edits
cd /Users/teimurazbenidze/iceinstinct-site
git add -A && git commit -m "..." && git push origin main
```

---

## Reference materials

- INVENTORY.md (in `/Users/teimurazbenidze/iceinstinct-source/`) - full content audit of original site
- The user shared **Ignitex Framer template** (https://land-book.com/websites/89951) as direction reference. The core feel: massive sans + italic serif, dense scenes, dark, high-contrast.
- Live original (still up): https://www.iceinstinct.com - comparison/control during migration

---

## Next-session opening message template

If continuing this project in a new chat, the user will likely paste the next HTML file. Acknowledge briefly, then:

1. Read `CLAUDE.md` and this `HANDOFF.md` (you should already have done this).
2. Read the HTML he sent.
3. Identify which page it corresponds to.
4. Identify what new copy / structure / images can be lifted.
5. Edit the corresponding page in our codebase, preserving our design system (no blur, monochrome, massive type, viewport-fit, etc.).
6. Commit + push.
7. Report briefly + ask for the next file.

If he asks something else - defer to it. He's the boss.
