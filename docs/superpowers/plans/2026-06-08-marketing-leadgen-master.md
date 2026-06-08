# Ice & Instinct - Marketing, Proof & Lead-Gen Master Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Break the zero-leads-in-a-year cycle by manufacturing real proof, fixing trust/conversion on the site, repositioning solo to founder-plus-team, and opening the distribution channels luxury event buyers actually use - all without faking anything.

**Architecture:** Three truths from the deep research drive this plan. (1) Price is NOT the problem - Ice & Instinct is competitive-to-cheap for NYC/NJ. (2) The killer is no proof + no distribution + solo positioning. (3) Ice & Instinct has ZERO real events, so proof cannot be shown OR faked - it must be MANUFACTURED legitimately via styled shoots and hosted tasting nights, which simultaneously produce real photos, real reviews, real planner relationships, and real Instagram content. Everything else is downstream of that.

**Tech Stack:** React 19 + Vite + GSAP + Lenis (site in `app/`), Imagen 4 / Nano Banana for logo + imagery (`~/.claude/skills/video/scripts/`), Google Business Profile + The Knot/Zola/PartySlate (distribution).

**Hard rules (locked):**
- No fake reviews, ever. FTC rule (Oct 2024) bans fabricated/undisclosed testimonials, fines ~$51,744 per violation; platforms permaban for it. Every review in this plan comes from a real person at a real event.
- No em-dashes or en-dashes in any file (hook blocks them). Plain hyphens only.
- Temo judges only the LIVE render. Verify on iceinstinct.com after any deploy.
- Never `git push origin main` (auto-deploys live) without Temo's explicit ok.
- Prices do not go DOWN. The problem is positioning, not price level.

**Decisions locked with Temo (2026-06-08):**
- Segment: HYBRID (luxury storefront + Google Business Profile + reviews + 1-2 marketplaces for first real leads).
- Positioning: FOUNDER + TEAM ("Teimuraz and his team of trusted NYC bartenders"). Teimuraz stays the face and vision; the brand sells capacity to handle any event size.
- Keep existing Instagram (beautiful, AI-rendered) and existing Google Business Profile; evolve, do not rebuild.
- AI-search/GEO: keep what exists, invest no further until the base works.

---

## 2026-06-08 UPDATE - hard data changes the priority

Pulled live Google Business Profile numbers (verified profile, 41 Wilson Ave Newark NJ,
88% profile strength). Jan-Jun 2026: **2,000 views, 1,200 searches, 109 interactions, and
exactly ONE review** (Tom R., real Local Guide, 5 stars). Zero leads.

Conclusion, now evidence-backed: this is NOT a discovery problem. Google sends ~1,200
searches in 6 months and they do not convert because the profile carries a single review.
The single highest-leverage action is therefore **real review volume**, which only Phase 1
(Host Night / hosted events) produces legitimately. Host Night is hereby PRIORITY #1, above
logo and above the site polish. The one real review (Tom R.) is now featured on the site
(Proof section, populated). Target: a steady cadence of real reviews from real guests to take
the profile from 1 to 15-plus, at which point existing Google traffic begins to convert.

## Phase order and why

1. **Phase 1 - Manufacture real proof.** Keystone. Until real events exist, nothing else converts. Produces real photos, real reviews, real planner/photographer relationships, real IG content.
2. **Phase 2 - Offer & positioning rework (on paper).** Restructure the 4 tiers for founder-plus-team, kill the "$10/guest" signal, decide pricing transparency.
3. **Phase 3 - Logo & brand mark.** Needed before site proof blocks and listings look finished.
4. **Phase 4 - Site: turn the showcase into a trust machine.** Pricing ranges, proof block, FAQ, strong CTAs, founder-plus-team copy, real cocktail imagery, fill empty `sameAs`.
5. **Phase 5 - Distribution & presence.** GBP image swap, 1-2 marketplaces, Instagram strategy shift, review-collection engine.
6. **Phase 6 - Local SEO & content (by remainder).** A few money-pages for real local queries.

Phases 2 and 3 can run in parallel with Phase 1 (Phase 1 has real-world lead time: booking a venue/photographer takes days/weeks). Phase 4 needs Phases 1-3 outputs. Phase 5 needs Phase 4. Phase 6 last.

---

# PHASE 1 - Manufacture Real Proof (KEYSTONE)

**Why:** Zero events = zero proof = zero trust = zero leads. This phase produces the first real events of the business. Industry-standard move for any vendor with no portfolio. Everything else in the plan is fuel that this phase ignites.

### Task 1.1: Host Night - the first real tasting event

**Deliverable:** One real cocktail evening, 10-15 invited guests (friends, acquaintances, anyone real), at Temo's expense. This is a genuine event. Real guests, real drinks, real service.

- [ ] **Step 1: Pick date + space.** Any decent space: a friend's nice apartment/penthouse, a rented loft on Peerspace (search "cocktail event NYC/NJ", budget $150-400/3h), or a partner venue. Lock a date 2-3 weeks out.
- [ ] **Step 2: Book a photographer.** One real event photographer for 2-3 hours. Options: a friend who shoots, or a paid junior event photographer ($200-500) or a collab (free photos in exchange for portfolio + tagging). Brief: detail shots of cocktails, hands/technique, atmosphere, guests enjoying. NOT staged product shots - candid real-event proof.
- [ ] **Step 3: Run the event.** Serve 4-6 signature cocktails from The Collection. Treat it like a paid gig: full setup, the ritual, the standard.
- [ ] **Step 4: Collect reviews on the spot.** Before guests leave, ask each to leave an honest Google review (Phase 5 sets up the GBP review link; if not ready, collect written testimonials + permission to publish with first name + photo). These are REAL - they were really there. Target: 8-12 reviews from one night.
- [ ] **Step 5: Get the photos.** Receive edited gallery within ~1 week. This becomes Collection/Gallery/IG content and site proof.

**Repeat:** Run 2-3 of these over 4-6 weeks. Outcome: 20-30 real reviews, a real photo library, real event footage.

### Task 1.2: Styled Shoot - the planner/photographer relationship engine

**Deliverable:** One styled shoot (staged but real luxury event scene) co-created with a small vendor team. This is how unknown wedding/event vendors build a portfolio AND meet planners. It is real work, not faking.

- [ ] **Step 1: Define the concept.** One tight visual story matching the brand (silent luxury, ice/instinct duality, a rooftop or penthouse bar moment). One-paragraph creative brief.
- [ ] **Step 2: Assemble the collab team.** Reach out to: 1 event/wedding planner, 1 photographer, 1 florist, optionally 1 venue. The pitch is mutual benefit: "I am producing a styled shoot for a luxury cocktail concept, everyone gets free professional portfolio content and a feature credit." This is WHY cold emails failed before (nothing to offer); a styled shoot is a value exchange, not a favor.
- [ ] **Step 3: Produce the shoot.** Half-day. Real bar setup, real cocktails, the planner styles, the photographer shoots.
- [ ] **Step 4: Submit for publication.** Photographer/planner submit the shoot to wedding/event blogs (Style Me Pretty, Junebug, local NY/NJ wedding blogs). A feature = first press + backlinks + credibility.
- [ ] **Step 5: Bank the relationships.** You now personally know a planner and a photographer who have SEEN your work. THIS is the real answer to "how do I get to know 10 planners" - through collaboration, repeated 3-4 times, not cold email.

### Task 1.3: Proof asset inventory

- [ ] **Step 1:** Create a folder `media/proof/` with: `host-night-1/`, `styled-shoot-1/`, `reviews/`. Drop all real photos and a `reviews.md` listing each real testimonial (name, date, event, text, permission yes/no).
- [ ] **Step 2:** This folder is the single source of truth for every proof element used in Phases 4 and 5.

---

# PHASE 2 - Offer & Positioning Rework (on paper)

**Why:** The current tiers leak a "$10/guest cheap bartender" signal that fights the luxury brand, and the copy sells a lone individual who "cannot handle my big event." Fix the strategy before touching code.

### Task 2.1: Repackage the 4 tiers

**Files:** decision doc only -> `docs/superpowers/plans/offer-v2.md` (create)

- [ ] **Step 1: Kill the $10/guest signal.** The Foundation problem: $400 / up to 40 guests / 3h reads as $10/head. Choose ONE fix and record it:
  - Option A: Remove the guest-count number from the public Foundation card (keep it for the quote conversation).
  - Option B: Lower the guest cap to a luxury-credible number (e.g. up to 15-20) so the per-head math reads premium.
  - Recommended: Option B + reframe Foundation as "intimate gatherings" so the tier ladder reads small-to-large coherently.
- [ ] **Step 2: Re-sequence the ladder for founder-plus-team.** Today the tiers are guest-count-jumbled (40, 12, 15, 25). Re-order so larger/more-premium = more team = higher price, telling a clean story: Foundation (intimate, solo) -> Simplicity -> Bespoke (team) -> Omakase (full team, flagship). Document the new caps, durations, prices.
- [ ] **Step 3: Add a "team scales with you" line** to the offer model: every tier can add staff, and large events (weddings, galas, corporate) get a full bar team. This is the positioning shift in one sentence.
- [ ] **Step 4:** Keep all prices at or above current. No reductions. Record final numbers in `offer-v2.md`.

### Task 2.2: Pricing transparency decision

- [ ] **Step 1:** Decide what shows on the storefront. Research is explicit: hiding price and "inquire for a quote" loses leads; ranges win. Default decision: show "from $X" on every tier (already present) PLUS a short "what is included / what is extra (alcohol, rentals at supplier cost)" note so the cheap-looking number is explained.
- [ ] **Step 2:** Record the exact transparency copy in `offer-v2.md` for Phase 4 to drop in.

---

# PHASE 3 - Logo & Brand Mark

**Why:** No proper logo yet. Listings, site proof blocks, and styled-shoot credits all need a finished mark.

### Task 3.1: Logo direction brief

- [ ] **Step 1:** Write a one-paragraph brief: name "Ice & Instinct", silent-luxury, ice/instinct (cold craft / living fire) duality, works in monochrome, scales to a favicon and an Instagram avatar. Existing favicon is an ice-cube mark (`favicon.svg`) - decide whether the logo extends that motif.

### Task 3.2: Generate logo candidates

**Tooling:** `~/.claude/skills/video/scripts/imagen_gen.py` and `img_gen.py` (Nano Banana). Key auto-read from `~/.claude/skills/video/.env`.

- [ ] **Step 1:** Generate 6-10 monochrome wordmark + monogram candidates (II monogram, ice-cube integration, serif-luxury wordmark). One command per direction.
- [ ] **Step 2:** Temo picks 1-2. Refine. Export SVG/PNG at favicon, nav, and social-avatar sizes.
- [ ] **Step 3:** Drop final assets in `app/public/` (or `assets/`) and wire into nav + `favicon.svg` + IG/GBP avatars.

---

# PHASE 4 - Site: Showcase to Trust Machine

**Why:** Even with proof and traffic, the current site has no trust elements, no FAQ, weak CTA, empty `sameAs`, solo copy. Fix the money pages so traffic converts instead of leaking.

**Working branch:** `react-shell`. Dev: `cd app && npm run dev` -> http://localhost:5173/. Build check: `npm run build`. Do NOT push to main without Temo's ok.

### Task 4.1: Social-proof / testimonials section

**Files:**
- Create: `app/src/sections/Proof.tsx`
- Modify: `app/src/main-home.tsx` (mount Proof between `Founder` and `Closing`)
- Data: `app/src/data/testimonials.ts` (create, populated from `media/proof/reviews/reviews.md`)

- [ ] **Step 1:** Build `testimonials.ts` exporting an array of real testimonials only (name, event type, date, quote, optional photo path). Empty array until Phase 1 reviews exist - section renders nothing rather than fake content.
- [ ] **Step 2:** Build `Proof.tsx`: testimonials carousel/grid + a "featured in" row for any styled-shoot publication credits + key numbers ("20 years", "N events since 2024"). Match the existing dark silent-luxury styling (see `Founder.tsx`/`Tiers.tsx` for the pattern).
- [ ] **Step 3:** Mount in `main-home.tsx`. Verify on dev server. Section hidden if no data.

### Task 4.2: FAQ section

**Files:**
- Create: `app/src/sections/Faq.tsx`
- Modify: `app/src/main-home.tsx` and/or `app/src/pages/Offerings.tsx`

- [ ] **Step 1:** Author real FAQ content (answers Temo must confirm): Does the price include alcohol? (no, sourced separately at cost). Do you travel? (NY metro / NJ - confirm radius). Minimum booking? What is your team / can you staff a large wedding? (yes - founder-plus-team line). How far ahead to book? Deposit/cancellation? Put exact Q&A in the task, not placeholders, once Temo confirms answers.
- [ ] **Step 2:** Build accessible accordion `Faq.tsx`, styled to match. Mount on home + offerings.

### Task 4.3: Founder-plus-team copy rewrite

**Files:**
- Modify: `app/src/sections/Founder.tsx`, `app/src/sections/Hero.tsx`, `app/src/pages/MyStory.tsx`

- [ ] **Step 1:** Rewrite the "one man, four cities" framing to "Teimuraz and his team": Teimuraz remains the named alchemist and vision; the team line establishes capacity for any event size. Keep the poetry, add the scalability. Exact copy authored at execution after Temo approves the angle.
- [ ] **Step 2:** Update Hero subline to signal both the artistry AND the team capacity.

### Task 4.4: Pricing transparency + offer v2 in the tiers

**Files:**
- Modify: `app/src/sections/Tiers.tsx`, `app/src/pages/offerings/*.tsx`, `app/src/seo/seoData.ts`, `app/src/seo/jsonld.ts`

- [ ] **Step 1:** Apply the offer-v2 numbers/order/caps from `offer-v2.md` (Task 2.1) to the Tiers section and each offering page.
- [ ] **Step 2:** Add the "what is included / extra" transparency note (Task 2.2).
- [ ] **Step 3:** Update JSON-LD prices in `jsonld.ts` to match the new numbers exactly (schema currently encodes 400/750/1500/3000).
- [ ] **Step 4:** `npm run build` to confirm prerender + typecheck pass.

### Task 4.5: Stronger CTAs

**Files:**
- Modify: `app/src/sections/Closing.tsx`, `app/src/pages/Contact.tsx`, `app/src/sections/SiteFooter.tsx`

- [ ] **Step 1:** Replace cold "inquire" with action-led CTAs ("Plan your evening", "Request a private quote - reply within one business day"). Keep one primary CTA per page. Ensure the contact form is obvious and low-friction.

### Task 4.6: Fill empty `sameAs` + real cocktail imagery

**Files:**
- Modify: `app/src/seo/jsonld.ts` (Organization `sameAs` is `[]`), `app/src/data/cocktails.ts`, gallery/collection assets

- [ ] **Step 1:** Once GBP/Instagram/marketplace URLs are confirmed (Phase 5), populate `sameAs` with Instagram + Google Business + any marketplace profile. This links the brand entity across the web.
- [ ] **Step 2:** Swap rendered/"plastic" cocktail images for the real Phase 1 photos in the Collection and Gallery where available. Keep the most beautiful renders only where no real shot exists yet.

---

# PHASE 5 - Distribution & Presence

**Why:** A fixed site with no inbound is still invisible. Open the doors buyers actually walk through. Hybrid: keep the luxury storefront, add Google + reviews + 1-2 selective marketplaces (not Thumbtack-tier).

### Task 5.1: Google Business Profile refresh (exists already)

- [ ] **Step 1:** Swap the plastic/rendered cocktail photos on GBP for the real published cocktail photos + Phase 1 event photos.
- [ ] **Step 2:** Confirm category, service area (NY metro + NJ), services, and a link to the site. Grab the GBP review link for Task 5.4 and the profile URL for Task 4.6 `sameAs`.

### Task 5.2: Instagram strategy shift (keep the account)

- [ ] **Step 1:** Keep the existing beautiful feed. Do not delete Temo's work.
- [ ] **Step 2:** Going forward, mix in PROOF content: real event photos, behind-the-bar technique, real guest moments, tagged collaborators from styled shoots. The shift is "this really happens" alongside "this is beautiful".
- [ ] **Step 3:** Ensure bio links to the site + a contact path; profile is set to a professional/business account with contact button.

### Task 5.3: Select and build 1-2 marketplaces

- [ ] **Step 1:** Choose for the luxury/hybrid segment: The Knot + Zola (weddings, where the money and reviews are) and/or PartySlate (luxury events). Skip Thumbtack/low-end for brand reasons. Pick at most two to start.
- [ ] **Step 2:** Build the listing using real Phase 1 photos + offer-v2 + real reviews. Write the profile copy (founder-plus-team).
- [ ] **Step 3:** Capture profile URLs for `sameAs`.

### Task 5.4: Review-collection engine (legitimate, steady)

- [ ] **Step 1:** Author a short, warm ask-for-review message Temo sends to every real guest/host after every real event, with the direct GBP (and marketplace) review link.
- [ ] **Step 2:** Cadence: aim for 1-4 real reviews per week, steady, never a burst (bursts trip Google spam filters and read as fake). Every Phase 1 event feeds this.

---

# PHASE 6 - Local SEO & Content (by remainder)

**Why:** Last, because it only pays off once proof + presence exist. Low-risk additive work.

### Task 6.1: A few real money-pages

**Files:** new pages under `app/src/pages/` + routes + sitemap

- [ ] **Step 1:** Build 2-3 pages targeting real local intent ("private cocktail bartender for weddings in New Jersey", "luxury mixologist for private events NYC", "corporate cocktail experience Manhattan"). Each with the money-page anatomy from the research: pricing range (not "call for quote"), 3-step process, proof, FAQ, clear CTA. No copy-paste location spam.
- [ ] **Step 2:** Add to `sitemap.xml`, hreflang/SEO data, internal links.
- [ ] **Step 3:** Leave existing AI-search/GEO work as-is. No further GEO investment until base converts.

---

## Self-Review checklist (run before execution)

- Proof first: yes - Phase 1 precedes site/distribution because zero real events is the root cause.
- No fake anything: every review/photo originates from a real event (Phase 1). Enforced.
- Price never reduced: confirmed in Phase 2 (positioning fix, not discount).
- Solo to founder-plus-team: covered in Tasks 2.1, 4.3, 5.2, 5.3.
- "$10/guest" signal killed: Task 2.1 Step 1.
- Empty `sameAs` filled: Task 4.6 Step 1 (after Phase 5 URLs exist - dependency noted).
- Logo gap: Phase 3.
- Keep IG + GBP, evolve not rebuild: Tasks 5.1, 5.2.
- Planner outreach reframed from failed cold-email to styled-shoot collaboration: Task 1.2.
- JSON-LD prices kept in sync with visible prices: Task 4.4 Step 3 (signature-consistency check).
- Open dependency: Task 4.6 Step 1 and Task 4.4 imagery depend on Phase 1 + Phase 5 outputs; sequence respected.

---

## Execution note

Real-world tasks (Phase 1 events, GBP, marketplaces) are Temo's actions; Claude provides exact briefs, copy, scripts, and the logo/imagery generation. Code tasks (Phase 4, 6) are Claude's, executed on `react-shell`, verified on dev server and live render, never pushed to main without Temo's ok.
