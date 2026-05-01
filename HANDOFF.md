# Handoff — Ice & Instinct site rebuild

**Read `CLAUDE.md` first**, then this. This file is the live status & next-step checklist.

---

## Where we are right now (end of chat — 2026-05-01)

Three phases are done:

- **Phase 1 — Inventory** (✅ complete)
  - Crawled all 6 pages of the live Hostinger site
  - Extracted text + 22 photos
  - Built INVENTORY.md at `/Users/teimurazbenidze/iceinstinct-source/`

- **Phase 2 — Design system + Home page** (✅ complete)
  - Initial dark luxury direction (later corrected to strict monochrome)
  - First Home page built, deployed to local preview

- **Phase 3 — All pages built** (✅ complete)
  - 12 pages, meta files, robots, sitemap, llms.txt, .htaccess
  - GitHub repo created, 4 commits pushed

- **Phase 4 — Direction correction (monochrome + viewport + scroll)** (✅ complete)
  - Stripped blue undertones to pure neutral mono
  - Removed all blur, replaced soft gradients with sharp linears
  - Bumped to massive sans+italic-serif typography (Geist + Fraunces)
  - Refactored sections to fit one viewport (`.scene` pattern, 100dvh)
  - Mobile tier preview → horizontal swipe-scroll
  - **Gallery → full horizontal track with progress bar + position counter**
  - Lightbox + B&W default + colour-on-hover for cocktails
  - Rich scroll-driven motion (clip reveals, stagger, view-timeline where supported)

The site at `localhost:8766` should look right per the design commandments.

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

**a. Formspree form ID** — user confirmed an existing form already runs on the live site. Get the endpoint (8 chars after `formspree.io/f/`), then:

```bash
sed -i '' 's|REPLACE_WITH_FORMSPREE_ID|m________|g' contact/index.html
```

**b. Instagram URL** — user confirmed it exists. Replace all `<a href="#" aria-label="Instagram">` in every page footer:

```bash
grep -rl 'aria-label="Instagram"' --include='*.html' . | xargs sed -i '' 's|<a href="#" aria-label="Instagram"|<a href="https://www.instagram.com/REAL_HANDLE/" target="_blank" rel="noopener" aria-label="Instagram"|g'
```

**c. Email address** — `hello@iceinstinct.com` is placeholder. Confirm with user.

### 3. Other social links

Footer also has placeholder links for Facebook, TikTok, X. User hasn't confirmed which actually exist. Ask, then either populate with real URLs or remove the icon entirely (clean is fine).

---

## After content import & config — deploy

1. **Hostinger backup** of current Builder site (export or download via File Manager).
2. **Switch hosting plan** from Builder to Web Hosting in hPanel (may require a paid plan upgrade — the user is OK with Hostinger).
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
- [ ] No coloured tints — all backgrounds and foregrounds use `oklch(N% 0 0)` (zero chroma) or pure neutral grays
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

- INVENTORY.md (in `/Users/teimurazbenidze/iceinstinct-source/`) — full content audit of original site
- The user shared **Ignitex Framer template** (https://land-book.com/websites/89951) as direction reference. The core feel: massive sans + italic serif, dense scenes, dark, high-contrast.
- Live original (still up): https://www.iceinstinct.com — comparison/control during migration

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

If he asks something else — defer to it. He's the boss.
