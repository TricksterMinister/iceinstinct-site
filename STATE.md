# STATE - Ice & Instinct (auto-loaded at session start)

> Single source of truth for "where are we". Updated at the end of each session. Keep it SHORT.

## LATEST 2026-06-16 - CLOSING SEGMENT STANDARD + HERO HEADLINE AUTO-FIT (BOTH SHIPPED + LIVE)
Two owner mandates closed via /ship-close. Working tree clean, HEAD `e86fe3a`, nothing unpushed; verified LIVE (robots.txt 200; live `/events/` headline renders 76px / 2 lines = the auto-fit deploy marker, was 112px / 4 lines pre-fix).

### 1. Final-segment standard (closing CTA card + footer = ONE viewport, every page)
Owner: the closing screen must be ONE standard everywhere - identical SHELL + footer behavior (one 100vh screen, footer whole + static + snapped, no dark gap, no jank), only the COPY stays bespoke per page. The real bug was footer PACKING (deep pages were not loading the closing geometry), NOT copy - earlier "done" claims were wrong and the owner was right to call them out.
- **Fix lives in `app/src/styles/footer.css`** (new "FINAL SEGMENT STANDARD" block, so it is GLOBAL - every page inherits it): closing-segment locked to `height:100dvh; overflow:hidden; display:grid; grid-template-rows:minmax(0,1fr) auto` so the footer row is content-height + mirror-identical; `.closing` fills via `height:100%; align-self:stretch` (kills the dark gap); the giant ghost word pinned BEHIND the card in the TOP-LEFT corner (`left:0; text-align:left; padding-left`, brutal Geist 800) - NEVER centered (owner firm: "влево или вправо, в углу"). Mobile wordmark + deposit line shrunk to fit.
- **Forms too** (`.ww-close` = /work-with-us bench form, `.inquire-close` = /contact): same 100dvh grid + field compaction (gaps, input padding, title/lead/deposit sizes) so the FOOTER FITS one viewport on the form pages. Owner's real complaint was "футер не влезает", not scrolling - I had wrongly "released" the forms to scroll first.
- **Per-page trio:** `closing-segment` -> add `oma-close id="final-cta"`, and `<SiteFooter />` -> `<SiteFooter embedded />` (renders bare `.oma-close-bottom` that packs into the grid). Done in `GalleryPage.tsx`, `ConciergePage.tsx`, `Offerings.tsx`, `Home.tsx`.
- **Commits:** `38bdd72` `63f861d` `9fbaa3d` `6acbe4c` (per-page embedded + oma-close) -> `4c534ec` (deploy) -> `dcc276a` (the footer.css standard block) -> `499ef7f` (deploy, all 29 routes) -> `a92e826` (forms one-viewport) -> `b36246e` (deploy).

### 2. Hero headline auto-fit (all heroes match WESTCHESTER, the owner's "эталон")
Owner: every hero identical, all equal to westchester (do NOT touch westchester); the feedback button in the SAME spot on every hero. Root cause was NOT color / overflow / font (those were wrong guesses the owner rejected) - it was LINE COUNT: a long title (events) grew to 4 lines at the same 112px westchester uses for 2, so it dominated the hero.
- **Fix in `app/src/app/useCinemaChrome.ts`** ("HERO HEADLINE FIT"): measure `.concierge .concierge-headline`; while it wraps past ~2 lines, step the font-size down (floor 48px) until it lands on <=2 lines. Short titles (westchester) already fit so they stay at full `--t-h1` (112px); only long ones scale (events -> 76px / 2 lines). Re-runs on fonts.ready + resize + load.
- **Commits:** `74e943e` (the fit logic) -> `e86fe3a` (deploy).

**Rollback (whole session, restores prior root too):** `git revert --no-edit 010c5b9..e86fe3a && git push origin main` (reverts all 11 session commits + redeploys). Per-feature: revert just `e86fe3a 74e943e` for the headline, or the `38bdd72..b36246e` range for the closing standard.

### OPEN for next session (deferred polish - owner has NOT green-lit either; the PARKED Manhattan video below is still the bigger standing item)
- **Hero button anchor (15px):** the feedback/CTA button sits at top=855 on events vs 870 on westchester (15px off). Owner said "push" without pixel-anchoring. To pin it byte-identical on every hero, owner trigger word = "якори кнопку".
- **THE BENCH ghost cap:** the "THE BENCH" ghost word on /work-with-us still spans full width on live (long word, overflows the corner zone). Crop to the corner (max-width + overflow:clip, or shrink) when owner says "кроп".

## SESSION 2026-06-15c - SCROLL-CINEMATIC HOME HERO (SHIPPED + LIVE) + MANHATTAN VIDEO PARKED
Replaced the home hero (ice-cube loop) with a scroll-scrubbed cocktail-assembly hero. SHIPPED: deploy commit `edf5740` -> origin/main; verified LIVE (HTTP 200 on / + /gallery/ + /robots.txt; `scroll-hero` in live HTML, old `hero-loop-v1` gone, frames serve).
- **What:** GSAP ScrollTrigger PIN + canvas frame-scrub (the pro pattern - sticky is broken here by `overflow:clip` ancestors in sections.css). 160 WebP frames (~4MB) in `app/public/frames/build` (served `/frames/build`). Clip = palindrome (finished -> exploded -> finished): starts AND ends on the assembled drink; scrub finishes at 82% then HOLDS (dwell), then pin RELEASES into Manifesto with no cut. Real `.hero-title`/`.hero-sub` markup = full live size + copy (NOT reinvented - owner was firm on this).
- **Mobile/touch/reduced-motion:** static finished still (no scrub, no 160-frame preload) for perf.
- **Files:** `app/src/sections/ScrollHero.tsx` + `.css` (new); `Home.tsx` (Hero -> ScrollHero); `app/src/app/LenisProvider.tsx` (heroGuard drops the full-page snap while the hero is pinned). Old `Hero.tsx` left unused.
- **Tuning (one number each, ScrollHero.tsx):** scrub length `end:'+=850%'`, dwell `SCRUB_END 0.82`, smoothing `scrub:1`.
- **Rollback:** `git revert --no-edit edf5740 && git push origin main` (back to ice-cube hero).
- **Source clips** in `/tmp/ii-cocktail/` are EPHEMERAL (palindrome.mp4, assemble_v2.mp4, exploded_master.png, assembled.png); deployed frames live in the repo.

## NEXT SESSION STARTS HERE -> place the "Мужик Манхэттен" video
Man-back-to-Manhattan clip is PARKED + committed this session at `assets/video/story-cover-loop.mp4` + `.webm` + `story-cover-poster.webp` (unused/inert for now). Owner found the spot: best fit = **/manhattan/ page hero** - replace the static `geo-manhattan.jpg` (currently a whisky-glass-at-a-Manhattan-window still, same theme) with this video. Owner to CONFIRM placement (full hero bg vs a section) in the new session, then wire it (same `<video>` mp4+webm+poster pattern as `sections/Concierge.tsx`) + deploy. The funnel checklist (memory `funnel-checklist.md`, resume at #2 GBP) is still pending separately.

## SESSION 2026-06-15b - PER-PAGE CLOSING COPY (SHIPPED + LIVE)
Owner feedback on the closing standardization: keep the shell IDENTICAL everywhere (the "parameter" - card, type scale, button pair, meta), but give each page its OWN logical finale copy. Done + SHIPPED via /ship-close. Pushed `15f4aa9..136ab5a` -> origin/main; verified LIVE (HTTP 200 on / + /gallery/ + /robots.txt; every page's unique ghost word + headline confirmed live; offering-tier deposit/ice-canon + legal default intact). Deploy commit = `136ab5a` (src `7899f97`).
- **What changed:** 16 pages now pass bespoke `ghost/title/titleEm/lead` props to the one `<Closing>` (all were defaulting to "Begin the conversation"). Home BEGIN, My Story POUR, Offerings CHOOSE (+secondary->Concierge), Concierge HANDLED, Gallery SEEN, Journal TASTE, Journal article NEXT, Press PRESS, Weddings VOWS, Corporate TOAST, Events OCCASION, Gift GIVE, Manhattan NYC, Hamptons HAMPTONS, New Jersey JERSEY, Westchester NORTH. Skin byte-identical (props only, no CSS touched).
- **Unchanged exceptions:** offering tier page (Reserve + deposit + ice-canon); legal pages keep the default closing (the allowed repeat).
- **Rollback if needed:** `git revert --no-edit 136ab5a 7899f97 && git push origin main`.
- **Build note:** worktree had no node_modules - symlinked the main repo's for `npm run build` -> rsync `app/dist/` -> root -> push main (standing deploy recipe). 29 routes prerendered.

## SESSION 2026-06-15 - FOOTER REDESIGN + CLOSING STANDARD (SHIPPED + LIVE)
Bottom-of-page reworked with owner, live-previewed each step, then SHIPPED via /ship-close. Pushed `6b47cf9..e00dbcb` -> origin/main; verified LIVE (footer Geist + in-letter gradient confirmed in live CSS; standardized closing on gallery/my-story/etc.; offering ice-canon on prod; / + /gallery/ + /robots.txt = 200). Deploy commit = `11ea557`.
- **Footer "Monolith":** wordmark in **Geist** (brand display font) + ice->champagne->ember gradient flowing INSIDE the letters (`background-clip:text`; animated desktop, static touch); reveal-on-enter, cursor sheen, breathing; safe-area. Owner approved Geist + in-letter gradient.
- **Closing CTA standardized:** one `<Closing>` component sitewide (was hand-rolled per page). Cream card + standard copy/buttons/meta. Exceptions: offering tiers (deposit + ice-not-included canon + Reserve->YCBM), contact + work-with-us (own forms). Closing CSS moved to GLOBAL footer.css (fixed gallery/concierge/offerings rendering dark).
- **DEPLOYED 2026-06-15** via /ship-close; live + verified. Rollback if ever needed: `git revert --no-edit 11ea557 && git push origin main`.
- ALREADY LIVE this session (on origin/main): safe-area insets (iPhone notch), mobile scroll-jitter fix (gated scrub parallax off touch), founder Wikidata schema. Funnel-prep #3/4/6/7/8 drafted in `docs/business/` (awaiting Temo's hands).

## NEXT SESSION STARTS HERE -> THE FUNNEL CHECKLIST (memory: funnel-checklist.md)
Owner directive 2026-06-12: execute the 13-item funnel list ONE BY ONE, together, in order. Position tracked in memory `funnel-checklist.md` (read it FIRST). Critical path 1->2->5.
- DONE: #1 Purge CDN (Claude via Chrome - llms.txt fresh, max-age=3600, $400 prices gone). #2 partial: GSC verified + sitemap.xml submitted (29 URLs; was indexing 2) + 3 manual index requests then Google daily-quota hit; Bing imported from GSC (www.iceinstinct.com live, feeds ChatGPT/Copilot).
- **RESUME AT: #2 continued = Google Business Profile.** Owner says GBP profile already exists under his Google account - VERIFY it matches kgmid /g/11ms10nkr6 (not a dupe), fill services with prices, upload 15 photos from /Volumes/TEMO DISC/Reports/iceinstinct-gbp-photos/, and CAPTURE THE g.page REVIEW LINK (needed for review-engine cron). Then rest of #2: hello@iceinstinct.com mailbox, Stripe gift links x2, Wikidata account+bot password, yes/no on PartySlate/Knot/WeddingWire. Browser approach = Chrome MCP (Temo logged in to Google/Hostinger/Stripe; pause at any OAuth/ownership-confirm for him).
- After #2: Claude code follow-ups (hello@ into footer/schema/press/Formspree; Stripe links into /gift/ STRIPE_LINKS; review link -> build review-engine cron; Wikidata QID -> schema sameAs). Then Temo does #3 lawyer, #4 recruiting ad, #5 send 18 Gmail drafts, #6 past-client msg, #7 CSV->Sheets, #8 YCBM deposit line.
- Site is fully built + craft-passed (29 routes, HEAD `aec6a7e`); two owner canons LOCKED in memory: [[ice-not-included]] (ice never provided, Concierge arranges at supplier cost) + founder = 30 years / NY since 2016. Bans unchanged.

## SESSION 2026-06-11b (ICE FLOOR SHIPPED - two-floor business live, HEAD `24a95ca`, 29 routes)
Owner decision after deep-research (105 agents): two-floor model. INSTINCT = founder premium (untouched, never discounted); ICE = bartender dispatch spread engine (client $450+ flat, bartender $180-240/4h subcontract, min spread $200/gig, deposit BEFORE bartender call). Executed via subagent-driven-development from `docs/superpowers/plans/2026-06-11-ice-floor-business-plan.md` (each task: implementer -> spec review -> quality review):
- **Business docs** `docs/business/`: subcontractor agreement (10 sections, non-solicit 12mo + 10% referral, insurance req), bench standard (A/B tiers), ice-pricing, call/quote scripts, 10-step dispatch checklist, recruiting ad, CSV trackers (bench + dispatch). Escalation triggers (LLC/insurance/W2 - not before $5k/mes x3) in BUSINESS-MODEL.md.
- **Site (all live):** `/events/` (packages ledger, trust block, 3 FAQ+schema, CTA occasion=event+staffing, bespoke Imagen hero events-bench.jpg), `/work-with-us/` (bench intake form -> Formspree "Bench application - <name>", bench_apply events), TwoFloors home section (after TiersNote), SEO tails (llms.txt ICE lines, 4 geo pages link /events/, own OG cards). Contact OCCASIONS += "event staffing". GA4 vocab += quote_click/two_floors_click/instinct_bridge_click/bench_*.
- **Hero fix:** hero-cocktails.png turned out to be a LEGACY TEXT BANNER ("ALCHEMY & ICE"), cropped to garbage in hero frames - replaced with bespoke Imagen photos on /events/ + /corporate/, press download swapped to real photography.
- **Deploy quirk:** one Hostinger auto-deploy (b34df98) silently never landed; retrigger by next push fixed it. If a page 404s after push - push again, don't debug the code.
- KPI cron `ii-weekly-kpi` updated: both floors (INSTINCT leads / ICE leads+spread / bench applications).
- **Temo-side remains (plan Part C/F):** lawyer pass on agreement (SCORE/NJSBDC free), post recruiting ad, import CSVs to Google Sheets, first 5 Ice gigs (after GBP), add Ice line when sending the 18 planner drafts.
- **PORTAL (owner idea, shipped `43c2c30`):** the home Duality split-screen ("Choose Your Nature") IS the two-floor gateway now - commit ICE -> floor card "The bench is on call, from $450" -> /events/; commit INSTINCT -> "The founder composes your evening, from $650" -> /offerings/; "or the other door" switch; track two_floors_click continuity. Moved mid-page (TiersNote -> Duality -> Concierge), the plain TwoFloors text section retired, Pager/Lenis reordered. Panels are div role=button (a-in-button invalid); commit drops role and reveals the only interactive CTA.

## SESSION 2026-06-12 (craft-pass rounds 2-3 + ICE-TRUTH sweep - LIVE `216f82e`)
Owner approved all craft-pass recommendations + dictated TWO hard canons:
- **FOUNDER YEARS: 30 years in industry (three decades), in New York since 2016.** Swept: press bios, my-story, home founder, jsonld, llms.txt, both PDFs (regenerated), + 'quarter-century' x2 in journal articles.
- **ICE IS NEVER PROVIDED/INCLUDED** (memory: ice-not-included.md): Concierge arranges separately at supplier cost. Swept 20+ spots: all tier closings, corporate, gift, 4 geo, weddings, my-story FAQ, press facts, concierge page self-contradiction, journal clear-ice article (physics kept, provenance fixed), llms.txt, all stub schemas, seoData og/meta (the gap between agent waves - caught in live verify), both PDFs, YCBM booking NOTES string. Banned: 'ice ... standard/included'. OK: /events/ paid 'Clear-ice upgrade +$120'.
Also shipped (round 3, from measured investigation): closing-segment grid minmax(min-content,1fr) auto - footer never clipped on 13 pages at ANY height; min-height instead of forced 100dvh sitewide (PRIME DIRECTIVE: content never clips 680-1400px heights); home chapter no longer cuts prose at 1280x720; footer = ONE self-governing geometry on every page (was four) + legal/story link colors fixed via .oma-close-foot scoping; Contact renders its error state (was silent lost lead); optional-row controls aligned; keepsake form voice unified. Weddings 'References available on request' REMOVED (zero weddings served - owner fact). Gift/press heroes monochrome; phones get poster not hero mp4.
Craft-pass totals: 80 audit findings -> fixed across 3 rounds; report /Volumes/TEMO DISC/Reports/2026-06-11-iceinstinct-craft-pass.md + findings.json + before/after shots.
**STILL OWNER-SIDE: hPanel CDN Purge (AI engines read May llms.txt with $400 prices until then!), Google Ads paused (tag AW-17673379114 blocked by CSP - expand CSP when ads resume), legacy meta descriptions >160 on 4 old pages (polish nit).**

## NEXT SESSION = THE TEMO HOUR (Phase 1) - everything else is DONE
**Runbook: `docs/TEMO-HOUR.md`** - one ~60 min browser-approved evening: GSC verify + sitemap + request-index 27 URLs; Bing import; GBP claim (kgmid /g/11ms10nkr6, photo folder READY at `/Volumes/TEMO DISC/Reports/iceinstinct-gbp-photos/`, capture the g.page review link!); hello@iceinstinct.com mailbox; **CDN purge in hPanel (выбить старый 30-дневный кэш llms/sitemap)**; Stripe gift links x2; Wikidata account + bot password; PartySlate/Knot/WeddingWire yes-no; optional CallMeBot apikey. After the hour, code follow-ups (I do): hello@ into footer/schema/press/Formspree reply-to; Stripe links into /gift/ STRIPE_LINKS; review link -> 5.2 review-engine cron + STATE; Wikidata item via API + QID into schema sameAs. Then Temo presses Send on 18 Gmail outreach drafts.

## SESSION 2026-06-10e/11 (MONEY MACHINE EXECUTED - phases 2,3,4,6 + 5-partial ALL LIVE, HEAD `3ac6766`)
Masterplan run via 4 Workflow waves (18 subagents) + wiring. Site grew 15 -> **27 prerendered routes**, all deployed + curl-verified:
- **Phase 2 (conversion)**: deposit line ($500, refundable 14d) under closing CTA on 4 tier pages + contact; inquiry form got optional event_date / guest_count / occasion (-> Formspree payload + occasion into GA4 inquiry_submit) + no-JS action fallback + `?occasion=` prefill; Profiler keepsake email capture (Formspree `Keepsake request - <cocktail>`, GA4 email_capture); **build guard `verify-llms.mjs`** (build FAILS if llms.txt prices drift from jsonld.ts TIERS - tested) + `llms-full.mjs` generates llms-full.txt from prerendered pages.
- **Phase 3 (money pages)**: `/weddings/` (Veo hero loop wedding-loop-v1.mp4 938KB - owned asset; his-and-hers via Bespoke; zero-proof; planner logistics COI/ratios; 6 FAQ + schema), `/corporate/` (omakase-as-entertainment; invoicing/COI/W-9; occasion prefill), `/gift/` ($650/$900 vouchers, 12-mo validity, framed certificate, Product schema x2, GA4 gift_click, `STRIPE_LINKS` const = null until Temo's links). 8 OG cards in the brand typographic template (real mark, never redrawn).
- **Phase 4 (moat)**: 4 geo pages `/new-jersey/ /manhattan/ /hamptons/ /westchester-greenwich/` (unique 800-1000w local copy + bespoke Imagen heroes ~150KB jpg + Service/FAQPage schema + tier ledgers); `/journal/` + 3 pillar articles (cocktail-omakase-explained = niche claim, clear-ice, cigar-pairing; Article schema, author founder; one JournalArticle shell + data modules); gallery: 13 cocktail descriptions visible + ItemList schema regenerated (stub was 12 stale items - rule: STUB head JSON-LD wins over seoData, always edit the stub); BreadcrumbList on 20 deep pages; footer + llms.txt updated with all new pages; sitemap 27.
- **Phase 6 (arsenal)**: `/press/` (quotable bios 52w/168w, 10-fact ledger, AboutPage+Person schema, PRESS_EMAIL const for hello@ swap); `assets/press/planner-onepager.pdf` (1 Letter page, selectable text, QR to /weddings/, 10% referral line); `assets/press/media-kit.pdf` (4 pages); **20 outreach drafts** in `docs/outreach/drafts/` + **18 Gmail drafts created (NOT sent)** from vetted list `docs/outreach/planners-2026-06.md` (marketplaces excluded per ban).
- **Phase 5 (partial, no-Temo part)**: scheduled tasks live on this Mac: `ii-lead-watch` (every 15 min: Gmail Formspree leads -> push, label II-alerted) + `ii-weekly-kpi` (Mon 9:00: leads/bookings/site/llms-drift/brand-mentions digest -> Reports + push). Make path blocked: free plan 2/2 active slots = ORBIS production (DO NOT touch), no Gmail connection, no CallMeBot key. 5.2 review engine waits for the GBP review link.
- **Infra finds**: (1) `app/public/.htaccess` is the DEPLOY SOURCE of .htaccess - root copy gets overwritten by rsync every deploy (a root-only fix was silently reverted once; both now fixed + synced). (2) mod_expires ExpiresDefault was overriding the crawl-files 1h cache header -> fixed with `ExpiresActive Off` in the FilesMatch; live origin now serves max-age=3600, but hcdn edge still holds old 30-day objects -> **needs one hPanel CDN purge (in TEMO-HOUR)**. (3) `app/node_modules` is a symlink to main checkout (gitignored).
- Deploy authorization: Temo approved push-to-main for the whole session ("Да, на всю сессию").

## SESSION 2026-06-10d (FULL GEO/SEO/MARKETING AUDIT + truth pass - LIVE `8760b95`)
8-agent parallel audit (AI visibility 61, platforms 50, technical 86, E-E-A-T 60, schema 44, competitors 14, local 24, leadgen 42 -> composite GEO 56/100). FULL REPORT: `docs/GEO-AUDIT-REPORT.md` + `/Volumes/TEMO DISC/Reports/2026-06-10-iceinstinct-geo-seo-marketing-audit.md`.
**Killer finding (6/8 agents independently): site fed AI engines THREE conflicting price sets** (llms.txt $400/$750/$1500; my-story FAQPage schema $1000 deposit + old capacities; live pages $650/$900/$1800 + $500). ALL FIXED + LIVE: llms.txt regenerated from live facts (NJ, 13 cocktails, booking links, policies); home schema -> Organization+LocalBusiness (tel, priceRange $650-$3000+, 7 structured areas, founder w/ 4 sommelier credentials); FAQPage JSON-LD on /offerings/ (hand-authored in shell - prerender skips seoData jsonLd when shell has any); my-story FAQ (schema + visible) aligned to live facts; footer NAP (NJ + visible phone); home title "NYC & New Jersey"; 301 /the-architect + /httpswwwiceinstinctcomofferings; llms/robots/sitemap cache 1h (was 1 month).
**OWNER TODO (money order): 1) claim GBP (entity exists: kgmid /g/11ms10nkr6 via share.google link in schema) 2) review engine (1 review now; ask every past client; 24h post-event WhatsApp ask) 3) directories: The Bash/GigSalad/Thumbtack/Yelp/The Knot/WeddingWire/PartySlate 4) LinkedIn says "TextCraft Studio" - update to Ice & Instinct + company page 5) hello@iceinstinct.com 6) Google Search Console (Google indexed 2 of 15 pages!) 7) 20-planner outreach w/ 10% referral.**
**BUILD NEXT: /weddings/ + /corporate/ pages; email capture on Profiler keepsake + nurture; deposit line under booking CTAs; NJ/Manhattan/Hamptons service-area pages; per-cocktail text on /gallery/; gift vouchers.**

## SESSION 2026-06-10c (quiet-luxury design overhaul - LIVE, HEAD `d1b80a8`)
Owner direction: "award-winning, quiet luxury - дорого, но тихо". Shipped, all live:
- **Matte two-weight gold system** (accent.css): primary = matte champagne body (no glossy core, radius 2px, lift on hover), secondary (btn-ghost, pp-btn.ghost) = hairline outline that fills matte on hover. Unified focus rings + pointer:coarse touch targets.
- **Shine passes ONCE**: heading gold gradient parked at rest; funnelInit IntersectionObserver adds `.lit` -> single 2.4s sweep on first entry. Footer marquee bound to scroll (`--marquee-play`, runs only while page moves).
- **Owned hero video**: Veo 3.1 loop (clear ice on marble, champagne backlight, smoke) `assets/video/hero-loop-v1.mp4` + poster; replaced stock Pexels in Hero.tsx.
- **Real raster brand mark** (`ii-mark.png`) in every header - inline SVG cube gone (7 pages + CSS rule).
- **Photo law sitewide**: monochrome at rest, colour on attention (added vp-shelf tier cards).
- **My Story FAQ** -> sitewide ledger pattern (section.faq, ghost RITUAL, 10 Q/A); sections.css now loaded on mystory.
- Earlier same session: segment snap sitewide (useSegmentSnap), bridge photo bare full-bleed (veil removed), closing-segment locked to exactly 100dvh, FAQ ledger one-viewport, ENHANCE/SCALE/ANSWERS ghosts normalized, certificates dark-until-hover vault, NYC v3 photo, Founder title proud italic, closing benchmark scale, hero ampersand solid champagne.

## SESSION 2026-06-10b (lead funnel zero-loss - LIVE, HEAD `a9f5a07` on main)
Worktree `.claude/worktrees/hardcore-mccarthy-34bbdd`. Subagent-driven execution of `docs/superpowers/plans/2026-06-10-lead-funnel-zero-loss.md` (10 tasks, each spec+quality reviewed). SHIPPED + verified live via curl (chunk `contact-2WKtx3xd.js` carries `inquiry_form_start`/`landing_page`; shared chunk carries booking/whatsapp/call/instagram clicks + `ii-source`/`ii-cocktail`):
- **GA4 event vocabulary** (lib/track.ts, one delegated listener via lib/funnelInit.ts on all 15 entries): booking_click, whatsapp_click, call_click, instagram_click, enhancement_add/remove, profiler_open/complete/commission, keepsake_print/save/share, inquiry_form_start/submit/error.
- **Zero info loss**: Contact prefill now reads Profiler `?cocktail/identity/taste/accord` (was silently dropped) + `?enhancements` + sessionStorage fallback; Formspree payload gains hidden fields `enhancements`, `cocktail`, `source`, `landing_page`; `_subject` enriched ("... - Event Horizon - 2 enhancements"); WhatsApp link prefilled via `?text=`.
- **lib/leadContext.ts**: first-touch source (utm/?source/referrer, key `ii-source`, look-alike-domain check fixed in review) + profiler cocktail (`ii-cocktail`, set on commission in GalleryPage).
- Tests 15/15 (vitest), tsc clean, prerender 15 routes ok.
**OPEN (Temo manual):** 1) YCBM: create form field with code `NOTES` (uppercase) -> test prefill via `...youcanbook.me/?service=jsid1437636&NOTES=test-prefill`; 2) GA4 Realtime: verify new events from phone; mark inquiry_submit + booking_click as key events; 3) Formspree e2e NOT sent (classifier blocked synthetic lead) - submit the live /contact/ form once from phone, check email shows enhancements/cocktail/source/landing_page + enriched subject; 4) Formspree free = 50 subs/mo across ALL 3 sites.

## SESSION 2026-06-10 (handoff - READ FIRST)
Worktree `.claude/worktrees/laughing-chaum-252133` (branch `claude/laughing-chaum-252133`). ALL work committed + pushed to `main` (HEAD `387eb08`) + LIVE. Push to main auto-deploys Hostinger (deploy = `cd app && npx vite build && node scripts/prerender.mjs` -> `rsync -a app/dist/ <repoRoot>/` -> commit + push; live chunk hash flips in ~12s). `app/public/assets` is a SYMLINK to repo `/assets`. Stable-name images cached 30 days -> bust by NEW filename.

**OWNER RULES (obey, hard):**
- NEVER open a browser/preview tab on his desktop - NO Playwright (browser_navigate/screenshot), chrome-devtools, Claude_Preview. He got angry. Verify ONLY via `curl`. Open a browser ONLY if he explicitly says so that turn. [[no-local-preview-tabs]]
- NEVER redraw/recreate his logo - use the REAL raster (`ii-mark*.png`). [[never-redraw-logo]]
- No em/en dashes anywhere (hook blocks literal U+2013/2014; also avoid `&ndash;`/`&mdash;`).
- Reviews on LIVE only; show work via SendUserFile (image), never a tab.
- Image gen WORKS: `~/.claude/skills/video/scripts/imagen_gen.py --prompt "..." --out x.jpg --aspect 3:4 --size 2K` (used for the new ice photo).

**SHIPPED THIS SESSION (all live):**
- Profiler keepsakes (IG card + print PDF): REAL logo (cut for dark / gold-linework for paper), tinted ice cube, etched glass, "From Temo with love" (Sacramento), US-Letter centred PDF. + 8 cocktails renamed (Black Rock Roast / Spice Melange / Event Horizon / Pear of Avalon / Witching Hour / Andromeda Mirage / Playa Funk / Genome Garden). Result card also got the ice cube + rebalanced rail.
- INQUIRE funnel fixed: `Contact.tsx` POSTs to `/inquire.php` (PHP mail + honeypot) + success screen + GA4 `inquiry_submit` + mailto fallback. WhatsApp+Call (+1 917 292 7859) under the form.
- INQUIRE -> FORMSPREE (later same day, commit a4bd2fa, LIVE + e2e-tested ok:true): `Contact.tsx` now POSTs to `https://formspree.io/f/xpwkadgp` ("ALCHEMY & ICE Inquiry Form" -> alchemyandice Gmail) instead of `/inquire.php`. Why: shared-host PHP mail() can silently drop/spam a lead; Formspree archives every submission in its dashboard + delivers via real mail infra. Honeypot = Formspree `_gotcha`; `_subject` set; mailto fallback kept; GA event kept. CSP `connect-src` got `https://formspree.io` (BOTH `.htaccess` root + `app/public/`). `/inquire.php` left on server (harmless, unused). ARCHITECTURE (owner-confirmed): 4 offering pages = direct YCBM booking; ALL other contact paths (concierge tray, closing CTA, footer/nav Inquire) -> /contact/ -> Formspree. Free plan = 50 subs/mo TOTAL across all forms (Ditto+7Eagles+Ice).
- My Story "The Record": 4 REAL certs (French Certificat, Georgian Sommelier Assoc/ASI, Enotria, ONIVINS) framed + lightbox; passport # redacted; raw scans gitignored (`media/credentials`, PII).
- Foundation copy repositioned ("a bartender from my own circle, hand-picked, I personally stand behind"; dropped "collective/accessible entry"); FAQ deposit $1000->$500 + guest counts aligned; SEO/JSON-LD cleaned.
- Home "Built to scale": editorial Swiss-grid redesign (oversized headline, 01/02/03 band, ghost SCALE bled to bottom-right corner).
- Home tier slider: decluttered (numeral + visible name + gold title), whole card clickable, Explore = real button; gold italic = brighter `#d3bc7d` + scrim BEHIND text (NOT filter/text-shadow - those render black on clip-text in WebKit).
- Offerings + Concierge shelf cards: Explore = same button.
- Concierge: each enhancement = full-segment split (photo|content) + "Add to my evening"; Ice image replaced (256px -> hi-res sphere `concierge-ice.jpg`).
- BOOKING unified (Model B): Ice = STANDARD in every evening (badge, not opt-in); optional enh persist site-wide (`lib/evening.ts`, sessionStorage); offering CTA "Reserve your evening" carries enh into YCBM `&NOTES=` + "Your evening" line + "Add enhancements" link.
- Pricing strategy: Foundation KEPT + repositioned (not removed); prices unchanged. Identity = "private cocktail atelier / chef-for-the-bar"; team = his vouched circle, the money-engine.

**OPEN / PENDING (do next):**
1. **YCBM `NOTES` dependency (NEEDS owner):** offering booking appends `&NOTES=<enhancements>` to the YouCanBook.me URL - lands in the booking ONLY if his YCBM form has a field coded `NOTES`. Owner must test (book a test -> do enhancements appear in booking notes?) and give the real field code if different -> update `OfferingPage.tsx` `bookingUrl`.
2. **Owner confirm:** inquiry DELIVERY TEST email reached `alchemyandice.nyc@gmail.com` (inbox/spam). If spam -> set SPF / domain mail.
3. **Owner OFFLINE (real growth, NOT code):** 2 -> 8+ Google reviews; ONE documented proof-event w/ photographer; referral pacts (chefs/estate-managers/planners); luxury distribution (NOT Thumbtack); real-estate B2B. (Strategy report in this session transcript.)
4. Owner to review concierge/booking on live; possible polish (split ratio, tray, copy).
5. Pre-existing (master plan `docs/superpowers/plans/2026-06-08-open-tasks-master.md`): founder "Hand Behind the Ritual" final image/video; self-host 2 framerusercontent images + drop from CSP; Duality home chapter; S7 code review + S8 device QA; wire real entity URLs into Organization sameAs; SEO/GEO audit (deferred).

## SESSION 2026-06-09 (handoff - READ FIRST)
Worked in worktree `.claude/worktrees/eloquent-hawking-d17d2e` (branch `claude/eloquent-hawking-d17d2e`). All work committed + pushed to `main` (HEAD f0cc872) + LIVE (push to main auto-deploys Hostinger).

**OWNER RULES learned this session (obey):**
- NEVER open local browser tabs/previews on his desktop (chrome-devtools/Claude_Preview tabs clutter his screen). Build -> deploy -> he reviews on the LIVE site. Verify via `curl` only.
- Cache: HTML is now `no-cache` (.htaccess) so deploys appear at once. But STABLE-NAME assets (images, favicon) are cached 30 days - when you CHANGE an image keep-name, BUST it: rename (e.g. `-v2`->`-v3`) or add `?v=N` to the link. Hostinger auto-converts PNG->JPEG on the fly (smaller bytes, same pixels - not a bug).
- No em/en dashes anywhere (hook blocks). Owner curates copy; do not invent his biography/recipes.

**DONE this session (all live):**
- Inquire page rebuilt = offering closing-segment standard (light Свет-1 card + form), ONE viewport, GLOBAL footer untouched. No public email; Send = mailto.
- Legal: added Cookie Policy, Accessibility, Responsible Service (+ updated Privacy GA4/CCPA, Terms 21+/dram-shop/indemnity). Shared `LegalShell`. Links ONLY in footer.
- Favicon -> cube logo (`favicon.svg` embeds cube; ?v=2).
- Collection (13 gallery cocktails): recipes hidden -> gastronomic PROFILE (3 champagne "pins" + literary note), grounded in each photo + owner's words. `cocktails.ts` = COCKTAIL_PROFILES.
- Basil in my mind tile image regenerated (real basil smash).
- Home: FAQ / pricing-note(SCALE breather) / Proof(Review) each = full 100svh segment; pricing-note got headline "Built to scale.".
- TYPOGRAPHY STANDARDIZED site-wide: 4 role tokens in `accent.css` (--t-hero 173 / --t-hero-2 166 / --t-h1 112 / --t-h2 74; --seg-h aliases --t-h2). Spec+audit: `docs/TYPE-SCALE.md`. Package A "Cinematic" chosen.
- My Story "Five cities" -> **FIVE** (added Sukhumi first; owner's verbatim copy "Five cities, one instinct"); journey goes full-bleed (big photo + wide columns). Sukhumi image = real Abkhazian Drama Theatre + griffin fountain (`journey-sukhumi-v3.png`, nano-banana from ref).
- **S6 Palate Profiler DONE:** rebuilt as a curated-library matchmaker. `cocktailLibrary.ts` = owner's **64 real cocktails** (from Drive "MY 64 cocktails"), tagged identity/taste/accord; `matchRecipe` scoring in `profilerData.ts`; vitest test. Removed dead Gemini `/api/profiler` + proxy + handler. Full-recipe gift result. Spec `docs/superpowers/specs/2026-06-09-palate-profiler-library-design.md`, plan `docs/superpowers/plans/2026-06-09-palate-profiler-library.md`. (Optional Phase 2: add more from Drive "CRAFT COCKTAIL RECIPES - TEMO" / "My Drinks" folder - pure data.)

**REMAINING (master list: `docs/superpowers/plans/2026-06-08-open-tasks-master.md` + its PROGRESS LOG):**
1. Founder "Hand Behind the Ritual" final image/video (temp `founder-v6b`; owner wants Netflix-real).
2. Media: self-host 2 `framerusercontent.com` images (EtherealShadow.tsx) + drop from CSP; replace any placeholder.
3. Duality (home chapter 02) - parked, owner directs.
4. S7 code review (critical/high) + S8 QA on real device.
5. D1 pricing verify on prod; D2 trust/distribution -> wire real entity URLs into Organization sameAs (when owner provides).
6. SEO/GEO audit - owner said LATER (deferred).

Owner Drive (gdrive MCP) has his recipes/menus if needed: "MY 64 cocktails", "CRAFT COCKTAIL RECIPES - TEMO", "My Drinks - cocktails" folder, "My Cocktail 2023".


**PROJECT:** Migrating iceinstinct.com (luxury mixology site, strict monochrome + champagne) from vanilla HTML to React. Full design rules: `CLAUDE.md`. Deep detail: `REACT-MIGRATION-HANDOFF.md`.

**BRANCH:** `react-shell` (do all work here). **`main` IS NOW LIVE PRODUCTION** - the React build sits at the repo ROOT on `main`, and a GitHub webhook auto-deploys to Hostinger on every push to main. So: NEVER push to main without owner ok = it goes live instantly. Day-to-day work stays on react-shell.
**RUN:** `cd app && npm run dev` -> http://localhost:5173/  (React app in `app/`, Vite+React19+TS)

**DEPLOYED LIVE (cutover done 2026-06-08):** https://www.iceinstinct.com now serves the React site (verified all 12 routes 200 + assets + SEO + 404). HOW IT WORKS:
- Hostinger: iceinstinct.com is a Custom PHP/HTML site on the Business plan; **Advanced -> GIT** deploys repo `main` -> public_html. The old Website Builder site was DELETED (content preserved in repo + `_legacy-vanilla/`).
- Auto-deploy: GitHub webhook (id 638086930) -> `https://webhooks.hostinger.com/deploy/<token>` fires on push -> Hostinger pulls main. So `git push origin main` = live.
- CUTOVER MECHANICS: built `app/dist` (`cd app && npm run build`), copied dist payload to repo ROOT on main, vanilla moved to `_legacy-vanilla/`. To ship a new version: build -> put dist at root on main -> commit/push main (webhook deploys).
- CDN CAVEAT: Hostinger `hcdn` caches HTML. If a fresh deploy still shows old, hPanel -> iceinstinct.com Dashboard -> Cache -> **Clear cache** (or test with `?nocache=...`).
- ROLLBACK: `_legacy-vanilla/` on main + git tag `pre-cutover-vanilla`.

**LIVE NOW = WORK-IN-PROGRESS (finish next, each push auto-deploys):** 5 cocktail recipes still placeholder (White Lotus, Black Truffle Martini, Aureliano, Basil in my mind, Call Me By Your Name) - NOTE the green basil image = "Call Me By Your Name"; the "Basil in my mind" tile shows a TEMP peach placeholder (`call-me-v2.png`) that needs a real photo + recipe. Founder "Hand Behind the Ritual" = temp still `founder-v6b.png` (final image/video deferred - owner rejected v3..v6, wants Netflix-real, not AI/grain/plastic). Palate Profiler (S6) + Duality (S11) unfinished. Per-page content pass not done for Offerings hub / 4 tiers / Concierge / Contact / Privacy+Terms. Mobile QA + S7 code review pending. All new media staged in `~/Desktop/Ice-Instinct-Media/`.

**MASTER PLAN = SOURCE OF TRUTH FOR WHAT IS LEFT:** `docs/superpowers/plans/2026-06-07-migration-master.md` -> read its **PROGRESS LOG** section FIRST. Owner rule (locked): defer NOTHING; resolve every workstream in order before cutover; execute via the subagent-driven-development skill; never push to main without owner ok.

**LAST SESSION ENDED (2026-06-07):** large session.
- Mobile luxury pass: 0 horizontal overflow at 320/360/390 (all routes); giant footer marquee; grand hero wordmark + tagline moved to bottom-right corner; ICE-CUBE nav mark site-wide (replaced hamburger/Index); founder photo/text gap fixed; ghost section-words become a marquee on phones; concierge photo icons (cigar/gloves/jigger/coupe); bigger tap targets; compact mobile nav menu; "Read in full" removed.
- MIGRATION (master plan) DONE so far: **S1 SEO/GEO** (build-time prerender of all 12 routes + per-page head/JSON-LD + robots/sitemap/llms/favicon/404), **S2 Inquiry** (dead Formspree form -> YouCanBook gateway https://enter-ritual.youcanbook.me/ ; real Instagram https://www.instagram.com/iceinstinctnyc/ ; public email REMOVED), **S3 deploy prep** (production `app/public/.htaccess` + CSP; GA4 `G-KBVETWTVVH` on all 12 - owner-confirmed his; deploy = Hostinger auto-pulls repo ROOT from GitHub), **S4 content fidelity** (copy matches old site, prices/specs exact; restored tier pull-quotes + Menu-Protocol sub-headlines; Privacy/Terms corrected to YouCanBook). Build is now `tsc && vite build && node scripts/prerender.mjs`.

**CONTINUE FROM (next session):** Owner wants a DETAILED content pass across the WHOLE site first (deeper than S4 fidelity - go page by page with him). THEN, per master-plan PROGRESS LOG: S5 media (replace placeholder media + the 2 leftover `framerusercontent.com` images; can generate via banana/imagen), S6 Palate Profiler finish, S9 Four Cities (my-story), S10 Gallery recipe drawer, S11 Duality (owner directs the portal), S7 full code review, S8 QA on a REAL device (browser tooling was flaky this session - do a real-device pass), then Stage 3 cutover (build dist -> repo root -> commit main with owner ok -> Hostinger pulls; rollback via `_legacy-vanilla/`).
PROCESS LOCK (Temo): do NOT hand-invent feature mechanics - pull the proven best-in-world pattern (design MCPs ui-ux-pro/Figma), copy it, brand-skin only. Design-first. Show on localhost; he judges only the real render.

**LOCKS:** strict monochrome + single champagne accent; no blur/glass, no neon, no AI-looking imagery (hyperreal only), no em-dashes. (Note: CLAUDE.md commandment #1 still says "silver, no champagne" - that is STALE; champagne is the real accent per DESIGN.md.)

---
## SESSION 2026-06-05 (Omakase page rebuild - PARTIAL, on react-shell, NOT deployed)
Last commit: 5bbbb3f. Page = /offerings/omakase/ (app/src/pages/Omakase.tsx + app/src/styles/omakase.css).

DONE (Omakase only, as the master template for the 4 offering pages):
- Hard rule: EVERY segment = exactly one viewport (100svh), clear champagne-hairline boundary, no overflow. Desktop-first but mobile must stay clean.
- ONE photo on the whole page = the "photo bridge" (no other photos; removed 3 cinematic reels). Hero media TBD (will regenerate).
- HERO: copied the Concierge 50/50 technique 1:1 (class `.concierge*`, tokens scoped in omakase.css). Text left, video fills right half full height. Ghost "OMAKASE" top-left. DO NOT reinvent - copy existing techniques (Concierge / home Founder "The Hand Behind the Ritual").
- II Menu Protocol = "HELD STAGE" pinned photo bridge (GSAP ScrollTrigger pin+scrub in Omakase.tsx). ONE whole photo, never cut (no seam). scrub:1.4 inertia, long dwell. Reduced-motion -> static fallback.
- Light/dark rhythm, each its own viewport: Hero(D) I Overview(D Monument, ghost word + gold shine on pull) II Bridge(D) III Scalability(L Ledger) IV Included(D panel grid) V Standard(D panel grid) VI Host(L panel grid) VII Notes(D Manifesto) CTA(L Свет-1 framed + footer = one viewport).
- ALL eyebrow kicker labels removed site-wide on this page (Temo hates them). Overview ghost removed; hero ghost kept.
- Components in omakase.css: .concierge (hero), .oma-hold (held stage), .oma-fmt3 (Monument), .oma-ledger (light), .oma-panel .dark/.light + .oma-grid, .oma-mani (manifesto), .closing/.closing-segment (Свет-1 CTA, copied from cinema.css).

OPEN / NEXT:
- MEDIA (phase 2, IN PROGRESS, react-shell, NOT deployed). House style LOCKED = "NYC Speakeasy / Warm Ember" mega-realism via `img_gen.py --model nano-banana-pro-preview` (NOT Imagen, NOT "object in black void"). Full standard: docs/MEDIA-STYLE.md + memory project_ii_media_style. ALL generated media staged in `~/Desktop/Ice-Instinct-Media/` (also feeds Instagram; keep everything there).
  - DONE + on pages (committed): all 4 offering HERO = minimal cinemagraph videos (Veo i2v from loop-ready stills, ONE element drifts - vapor/mist/dry-ice, no hands; 9:16 cover). All 4 BRIDGE = atmospheric speakeasy stills. Homepage Tiers cards now use the 4 hero-loop stills, luxe B&W -> color on hover.
  - Cinemagraph rule (Temo): start from a STILL finished scene (no hands/action) so Veo only drifts the one element; absolute minimum motion, no time-lapse, locked camera.
  - STAGED, not placed: NYC-elite "at-home service" library (penthouse party / dinner / interior / coupes / homebar / accessories / Gotham-minimal / guest) in elite event-photo quality - destination TBD (BRIDGE per tier vs a new "The Experience" section vs gallery). Ingredient-allegory layer locked for Category-3 cocktail tiles (regenerate the "plastic" cocktails next).
  - STOPPED HERE: regenerating the HOME Founder image ("The Hand Behind the Ritual", section Founder, currently /assets/video/alchemist-loop). Reference frame = `~/Desktop/Ice-Instinct-Media/_ref-alchemist.png` (man waist-up from behind, NJ side, looking across Hudson at lower Manhattan, hand on sill with a WHITE Mezcal Negroni). Must be EXACT same composition (NOT full-body), just better quality + DARK realistic NYC night (not over-lit). Latest = `founder-real-v2.png` (dark) - awaiting Temo final approval; then animate minimal (only river + sparse lights) and place into section Founder. Earlier wrong takes: founder-loop.png (invented full-body), founder-real.png (too bright).
- PHASE-2 TAIL: confirm pricing/guests/hours vs originals; regenerate Temo's real cocktails as Category-3 tiles (ingredient allegory, B&W->color); then prerender + cutover.
- OFFERING PAGES STANDARDIZED (phase 1 DONE, commits up to 854c3e3, react-shell, NOT deployed). All 4 (omakase/foundation/simplicity/bespoke) now render the ONE approved design via a data-driven template:
  - `app/src/pages/OfferingPage.tsx` = template (hero cursor-light ghost, held-stage shimmer bridge, ledger tiers, IV/VI numbered timelines, V grid + champagne wave, VII notes, 70/30 closing marquee, rail + snap).
  - `app/src/pages/offerings/{types.ts,omakase,foundation,simplicity,bespoke}.tsx` = per-page content (full verbatim live copy). `Omakase/Foundation/Simplicity/Bespoke.tsx` = thin wrappers.
  - `app/src/styles/omakase.css` renamed -> `offering.css`, imported by all 4 main-*.tsx. `#included` + `#host-provides` carry viewport-compaction (5-step pages fit).
  - Verified: all sections fit one viewport, lenis/ether/marquee present, correct ghost per page, 0 console errors, `npm run build` emits all 4.
  - PHASE 2 (deferred per Temo): real per-page hero video + bridge photo (currently reuse Omakase placeholders); confirm pricing/guests/hours vs originals. Then prerender + cutover.
- scroll-snap = DONE (30ac661). useOmakaseSnap.ts = Lenis proximity Snap on 9 segments, pin-guard over .oma-hold, wide-only, RM off.
- closing segment = DONE (Temo approved): direction B "Kinetic Marquee". Top 70% = ORIGINAL Свет-1 framed CTA (restored 1:1), bottom 30% = champagne marquee 60% + centered footer links 40%. Eyebrows stay REMOVED. "New York Metropolitan Area" KEPT (not Manhattan). Mockups compare page at app/public/footer-redesign.html (A/C kept for history; remove before cutover).
- CONTENT FIDELITY = DONE (56aa5e5): full original live copy poured back into the new design (III tier Personnel/Focus, IV Ice Ritual verbatim + tag, V/VI full, VII 4 paragraphs). Source of truth for original copy = repo root offerings/omakase/index.html (live www URL 404'd this session; apex serves home). Some sections now grow past one viewport (min-height, no clip) - acceptable, content > strict 100svh.
- LOCKED decisions (Temo, this session): eyebrows removed; NY Metropolitan Area; closing B approved; champagne-gold haze (hue 84) on Standard Inclusions kept; tasting-spine rail (no tablets) kept.
- Regenerate real media (the one bridge photo + hero video) via banana/veo. Current media = placeholders.
- Then copy the whole Omakase structure to Foundation / Simplicity / Bespoke (same standard, different copy) - AND port real content per page (don't repeat the trim mistake).
- Temo's mood: wants me to COPY existing proven components, NOT invent. Show live (localhost), he sees only real render.
