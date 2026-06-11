# MONEY MACHINE - Master Plan (28 items)

> **For the executing session:** Run with ULTRACODE + Workflow orchestration. Each PHASE = one workflow wave; items inside a phase run as parallel subagents where files do not overlap. Deploy + curl-verify after every phase (push to main auto-deploys). Every item below has a Definition of Done (DoD). Owner rules remain hard: no browser on the desktop without Temo's explicit YES that turn; no em/en dashes; verify via curl; never redraw the logo; Instagram exists - do not create social profiles; NO LinkedIn for Ice & Instinct (Temo's LinkedIn belongs to another business, priority - never touch); NO cheap hire-marketplaces (Thumbtack, GigSalad, The Bash banned).

**Source audit:** docs/GEO-AUDIT-REPORT.md (composite GEO 56/100; brand authority 12; Google indexed 2 of 15 pages).
**Repo:** worktree of iceinstinct-site; deploy = `cd app && npx vite build && node scripts/prerender.mjs` -> rsync app/dist/ to root -> commit -> push main.
**Live facts to keep:** tiers $650/$900/$1800/$3000+, deposit flat $500 (refund >14d, transfer 12mo), NYC metro + NJ, 13 cocktails, phone +1 917 292 7859, GA4 G-KBVETWTVVH, Formspree xpwkadgp, llms.txt now truthful (guard it).

---

## PHASE 1 - VISIBILITY FOUNDATION (needs Temo at the keyboard ~1 hour, browser session APPROVED for that hour)

### 1.1 Google Search Console (item D22)
- I generate the HTML verification file and deploy it via code (no browser needed for that part); browser: add property, submit sitemap.xml, Request Indexing for all 15 URLs.
- DoD: GSC property verified; sitemap accepted; 15/15 URLs requested; screenshot-free confirmation via GSC UI text read-back.

### 1.2 Bing Webmaster Tools (D23)
- Browser: one-click import from GSC. Feeds ChatGPT search + Copilot.
- DoD: site verified in Bing WMT, sitemap submitted.

### 1.3 Claim Google Business Profile (D24)
- Entity exists (kgmid /g/11ms10nkr6, linked from site schema). Browser with Temo's Google login: claim -> service-area business (Manhattan, Brooklyn, North NJ, Westchester, Greenwich, Hamptons) -> category Bartending service (+Caterer) -> phone -> booking link https://www.iceinstinct.com/contact/ -> 4 tiers as Services with from-prices -> upload 15 gallery photos (I prepare an upload folder beforehand).
- DoD: profile claimed + filled; review link (g.page/r/...) captured and saved into STATE for the review engine.

### 1.4 Domain email hello@iceinstinct.com (D25)
- Browser: Hostinger hPanel -> create mailbox; set SPF/DKIM/DMARC. Then I (code): publish on site footer/contact + schema email field + Formspree reply-to/notification.
- DoD: mail send/receive tested; site + schema updated + deployed.

### 1.5 Wikidata entity (D27)
- I can do this without Temo (open registration): create item "Ice & Instinct" - instance of: business; industry: bartending/mixology; HQ: New York; founder: Teimuraz Benidze; official website; Instagram. Anchor for every AI Knowledge Graph.
- DoD: Wikidata QID exists, added to site schema sameAs, deployed.

### 1.6 PartySlate decision gate (D28)
- ASK Temo once: PartySlate is a luxury event-planner showcase (planners with $10k+ budgets scout there), NOT a hire-marketplace. The Knot / WeddingWire same gate.
- DoD: explicit yes/no recorded in STATE; if yes -> profile created in the same browser hour with gallery photos + /weddings/ link.

## PHASE 2 - CONVERSION QUICK STRIKES (pure code, no Temo; one wave, ~4 parallel agents)

### 2.1 Deposit line under every booking CTA (A4)
- "A flat $500 deposit reserves your date - fully refundable until 14 days before the evening." Under OfferingPage closing CTA + Contact + (later) weddings/corporate. Mirror in YCBM description = Temo TODO note.
- DoD: line live on 4 tier pages + contact; curl-verified.

### 2.2 Inquiry form qualification fields (A7)
- Optional: event date (date input), guest count (select: up to 15 / 15-40 / 40+), occasion (select: private dinner / birthday / wedding / corporate / other). Into Formspree payload + `occasion` into GA4 inquiry_submit params. Add action= fallback (no-JS) to the form tag.
- DoD: fields live; test payload fields appear in Formspree submission (Temo confirms email or dashboard); tsc+tests green.

### 2.3 Profiler keepsake email capture (A3)
- At result phase: optional "Email me my keepsake + the recipe card" (one field). POST to Formspree with `_subject: Keepsake request - <cocktail>` + field `keepsake: <cocktail>`; GA4 `email_capture`. Future ESP swap = one endpoint change.
- DoD: capture live in profiler result; event fires; submission carries cocktail name.

### 2.4 llms.txt drift guard + llms-full.txt (A8)
- Build step: script extracts tier prices/deposit from seo/jsonld.ts TIERS + FAQ source and ASSERTS llms.txt contains the same numbers; generates llms-full.txt from prerendered pages. Fails the build on drift.
- DoD: `npm run build` fails if llms.txt price != TIERS price (tested by deliberate break); llms-full.txt live.

## PHASE 3 - MONEY PAGES (code + assets; one wave)

### 3.1 /weddings/ (A1)
- Full offering-page-style: hero (Veo loop 3.3), scaled-team story, his-and-hers signature (Bespoke flow), zero-proof program, planner logistics (COI, timing, staffing ratios), 3 proof quotes (when reviews exist - placeholder structure), deposit line, FAQ (6 wedding-specific Q/A + FAQPage schema), Service schema (areaServed full list), occasion-prefilled inquiry CTA (/contact/?occasion=wedding), OG card.
- DoD: page live, in sitemap, prerendered, schema valid, internal links from home FAQ + offerings.

### 3.2 /corporate/ (A2)
- Same skeleton: brand events, omakase-as-entertainment, invoicing/COI note, occasion=corporate prefill, Service schema, OG card.
- DoD: same bar as 3.1.

### 3.3 Wedding hero video (B15)
- Veo loop in brand style (champagne light, two coupes, ice). Budget approved.
- DoD: <2MB mp4 + poster in assets/video/, wired into /weddings/.

### 3.4 OG cards for new pages (B13)
- Imagen 1200x630 brand cards: weddings, corporate, gift, press + 4 geo pages.
- DoD: each new page has its own og:image, files <300KB.

### 3.5 Gift an Evening page (A10) + Stripe link (D26)
- Page: $650 / $900 voucher, 12-month validity, framed-certificate promise, how it works. Payment: Stripe Payment Link (browser, Temo's Stripe - Phase 1 hour or second short browser slot); until then CTA = inquiry with occasion=gift.
- DoD: page live with schema Product+Offer; Stripe link wired when available; GA4 `gift_click`.

## PHASE 4 - GEOGRAPHY + CONTENT MOAT (code + assets; one wave, 6-8 agents)

### 4.1 Geo pages x4 (A5): /new-jersey/, /manhattan/, /hamptons/, /westchester-greenwich/
- Each: unique 500+ word luxury copy (NOT doorway boilerplate), local angle (Gold Coast/Short Hills; penthouse/building amenity; summer estates - Hamptons BEFORE peak season; estate towns), tier pricing block, areaServed schema, FAQPage (3 local Q/A), photos (Imagen, B14), internal links to tiers + weddings.
- DoD: 4 pages live, sitemap updated, each with unique title/meta/OG, curl-verified.

### 4.2 Gallery cocktail descriptions (A6)
- 1-2 self-contained sentences per each of 13 cocktails on /gallery/ (key spirits, profile, the evening it was built for) - visible text + ItemList items get description.
- DoD: 13 descriptions live + in schema; citability of gallery block fixed.

### 4.3 Blog engine + 3 pillar articles (A9)
- Prerendered /journal/ index + article template (Article schema, author Person = founder, dates). Articles: (1) "Cocktail Omakase: the no-menu evening, explained" - claim the empty niche NOW; (2) "Clear ice: why it matters and how we source it"; (3) "Cigar and cocktail pairing: a sommelier's method". 800-1200 words each, written in brand voice, FAQ block each.
- DoD: 3 articles live, in sitemap, Article schema valid, linked from home/footer.

### 4.4 Internal linking + breadcrumbs (A12)
- BreadcrumbList schema sitewide; related-links block (tiers <-> geo <-> journal <-> weddings).
- DoD: breadcrumbs in schema on all deep pages; every new page has >=3 internal in-links.

## PHASE 5 - AUTOMATION ENGINE (MCP: Make, Gmail, Calendar, cron; needs one-time Temo auth approvals per connector)

### 5.1 Instant lead alert (C18)
- Make scenario: Formspree notification email (Gmail trigger) -> WhatsApp/CallMeBot push to Temo with name/occasion/date.
- DoD: test lead -> push received < 1 min.

### 5.2 Review engine (C19)
- Calendar (YCBM feed) -> 24h-after-event trigger -> drafts a personal thank-you + review ask (GBP review link from 1.3) into Gmail Drafts; Temo sends with one tap. Plus one-time batch: drafts to ALL past clients.
- DoD: drafts appear automatically post-event; batch drafts created; STATE records the review link.

### 5.3 Weekly KPI digest (C20)
- Cron agent (Mon 9:00): parses week's Formspree emails (Gmail MCP) + YCBM confirmations -> one message: leads by type/occasion, bookings, site-alive check, llms drift check, brand-mention scan summary.
- DoD: first digest delivered; recurring schedule active.

### 5.4 Brand + niche mention monitor (C21)
- Weekly Perplexity/Firecrawl sweep: "Ice & Instinct", "cocktail omakase nyc", competitor moves. Appended to KPI digest.
- DoD: included in 5.3 output.

## PHASE 6 - PRESS + PARTNER ARSENAL (code + PDF; no Temo)

### 6.1 /press/ media page (A11)
- Founder bio (short/long), facts sheet, downloadable photos, press contact (hello@), the omakase story angle.
- DoD: live + linked in footer.

### 6.2 Planner one-pager PDF (B16)
- make-pdf: tiers, prices, enhancements, service area, phone, QR to /weddings/. Brand-styled.
- DoD: PDF in /assets/press/, linked on /press/; copy saved for Temo's outreach.

### 6.3 Media kit PDF (B17)
- Founder story + credentials + photography + facts.
- DoD: same bar as 6.2.

### 6.4 Planner outreach list (prep for Temo)
- Research agent: 20 named NYC/NJ event planners + private chef studios + building concierge companies with contact emails; draft outreach email (Gmail drafts) offering 10% referral + one-pager attached. TEMO SENDS - I never send outbound cold mail myself.
- DoD: 20 drafts in Gmail ready to send.

---

## EXECUTION ORDER (top -> bottom by money)
1. PHASE 2 (same-day conversion lift, zero dependencies)
2. PHASE 1 (the Temo hour - unlocks GBP/GSC/email; schedule it first available evening)
3. PHASE 3 (money pages; 3.5 Stripe waits for browser slot)
4. PHASE 4 (moat)
5. PHASE 5 (engine; needs 1.3's review link for 5.2)
6. PHASE 6 (arsenal)

## What I need from Temo (complete list)
- One ~60 min browser-approved session (Phase 1): logged-in Google (GSC, GBP), Hostinger (email), Stripe (gift link), + yes/no on PartySlate / The Knot / WeddingWire.
- One-tap connector approvals when Phase 5 first runs (Make/Gmail/Calendar MCP auth prompts).
- YCBM: add NOTES field (old TODO) + paste deposit line into booking descriptions.
- Send the prepared Gmail drafts (reviews batch, planner outreach) - your finger on Send, always.
