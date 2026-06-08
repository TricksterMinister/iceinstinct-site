# Ice & Instinct - Cinema Homepage Storyboard
*Draft 2026-05-07. Architecture-first. Awaiting Teimuraz approval before any code.*

---

## 1. The Brand Spine (what the whole site is saying)

The site exists to convert a specific reader: **a Manhattan host with a penthouse, a guest list, and an unwillingness to settle**. He is not buying drinks. He is commissioning a single evening of perfectly calibrated atmosphere. The site has to do three things in sequence:

1. **Promise the atmosphere** (Hero + Manifesto). Make him feel the room before he reads a price.
2. **Show the choices** (Offerings: 4 tiers, ranked, named, scaled; + 5 Concierge enhancements).
3. **Justify the trust** (My Story: founder origin from Georgia to NYC, 20 years in fine wine and resorts, philosophy of Ice = discipline / Instinct = intuition).
4. **Show the work** (Gallery: 12 signature cocktails as art objects, not menu items).
5. **Open the door** (Contact: short, direct, one response in one business day, personally).

The voice is established. It is **silent luxury, editorial, precise, never showy, never decorative**. Every page closes with a Fraunces-italic CTA in one phrase.

**The narrative spine, in one sentence:**
> Where ritual meets instinct, high above the city - delivered by Teimuraz Benidze, four levels deep, twelve cocktails wide, by appointment only.

---

## 2. Site Architecture - Three Options to Pick From

The cinema homepage we are building does not replace the rest of the site. It is the **front door**. The 11 inner pages already exist with deep content. Question is: how much of that deep content lives on the homepage vs stays behind clicks.

### Option A - "Magazine Cover" (recommended)
- **Cinema homepage** = the cover and table of contents of a magazine. It tells the brand story in 6 cinematic chapters and ends in the inquiry door.
- **11 inner pages stay deep.** Each tier page keeps its full I-VII structure. Concierge keeps its 5 enhancement long-form cards. My Story keeps drop-cap narrative + philosophy quote + 10-FAQ accordion. Gallery keeps the horizontal track + lightbox.
- Vanish menu (the bronze circle in the corner) opens a full-screen overlay listing the 6 chapters of the magazine plus direct entries to the deep pages.
- **Pro:** SEO depth preserved. Tier pages already convert. Content already written. Each layer reads clean on its own.
- **Con:** More files to keep visually consistent. Champagne accent must propagate everywhere (already done via /accent.css).

### Option B - "Single Reel" (anti-magazine)
- **Cinema homepage = the entire site.** Everything is inline. Tiers = full content embedded. My Story = full content embedded. Gallery = full content embedded. Contact = full content embedded. Inner pages either redirect to anchors on home or get deleted.
- **Pro:** One page, one continuous film, no clicks. Maximalist scrolly art piece. Strong signature.
- **Con:** Page weight enormous. SEO suffers (no per-tier landing pages). No deep linking from inquiry forms (`/contact/?package=foundation` breaks). Mobile becomes infinite scroll. Maintenance nightmare. Would lose four months of content already built.

### Option C - "Hybrid" 
- **Cinema homepage** carries: Hero, Manifesto, Tier teaser (4 cards), Founder teaser, Gallery teaser, Final CTA.
- **Tier pages stay deep** (4 pages of long-form architecture).
- **Concierge and My Story collapse** into homepage sections (deleted as separate pages).
- **Gallery** stays separate (the 12-tile horizontal track is not collapsible).
- **Contact** stays separate (the form is heavy enough to deserve its own scene).
- **Pro:** Reduces 11 pages to 6. Concierge and My Story content moves into homepage where it amplifies the cover.
- **Con:** Long homepage. My Story FAQ section (10 questions) is too dense for a teaser - you either keep it as homepage section (page becomes very long) or move it under a /faq/ page.

---

**My recommendation: Option A.** The deep pages are already the strongest part of your site. The homepage's job is to make the host want to enter them. We do not collapse a working library into a single scroll.

You decide.

---

## 3. Cinema Homepage - Scene-by-Scene (assuming Option A)

Six chapters. Each = exactly one viewport (100dvh) on desktop and mobile. The Vanish menu in the corner opens an overlay with all six + direct entry to deep pages. Pager dots removed (Vanish menu replaces them as the navigation primitive - they were redundant).

### CHAPTER 1 - The Bridge (Hero)
**Visual:** Full-bleed Brooklyn Bridge night-drive video, monochrome, crisp, no muddy overlay. Top-left meta `Manhattan / By Appointment`, top-right `EST. 2024`. Bronze Vanish-circle in top-right corner. Bottom-left scroll cue circle.

**Type:**
- Wordmark: `Ice & Instinct.` on ONE line, Geist 700, italic Fraunces accent on "Instinct." (your already-locked-in style). Champagne white.
- Slogan beneath, italic Fraunces, large (`clamp(2.4rem, 5vw, 6rem)`), champagne accent: `Where ritual meets instinct, high above the city.`

**No CTA buttons in hero.** The page itself is the CTA. Scroll continues.

**Source:** `/index.html` lines 154-173 (existing live hero copy verbatim).

---

### CHAPTER 2 - The Manifesto (The Brand)
**Visual:** Black void. The cocktail-row image (`/assets/photos/manifesto-cocktails.png` - 5 cocktails B&W) sits at the top of the scene as the figure. Below it, the manifesto card.

**Type:**
- Eyebrow: `The Brand` (mono uppercase)
- Headline: `Ice & Instinct` (& italic Fraunces accent)
- Lead: `is a private mixology experience where each encounter becomes a living performance - an alchemical dialogue between spirit, ice, and intention.`
- Author divider, then: `Created and led by flavor alchemist` / `Teimuraz Benidze` (italic Fraunces, champagne) / `this experience transforms modern mixology into an art form - refined, intimate, and deeply sensory.`
- Body two paragraphs: `Every ritual unfolds through precision and emotion: each cocktail crafted in real time, each gesture measured by instinct, each sip designed to leave a memory rather than a taste.` // `From private penthouse gatherings to rooftop ceremonies and exclusive brand events, Ice & Instinct brings a rare synthesis of minimalism, theatre, and silent luxury - redefining what it means to serve a drink.`

**Source:** `/index.html` lines 178-213, verbatim. This was MY SOURCE COPY - I just need to put it BACK in the cinema prototype where I had placeholder text.

---

### CHAPTER 3 - The Offerings (Horizontal Pin-Scroll)
**Visual:** The horizontal scroll-pinned 4-card track that you liked. Each card = one tier panel with a video pour backdrop and the tier hero text.

**Type per card (verbatim from each tier page):**

- Card 1 - **i. Foundation** | The Foundation | From $400 / up to 40 guests / 3 hours | `Impeccable drinks, seamless service. No shortcuts, only intention. The standard from which every other level departs.` | "Read the chapter →" → `/offerings/foundation/`

- Card 2 - **ii. Simplicity** | Perfection in Simplicity | From $750 / up to 12 guests / 4 hours | `Timeless cocktails executed with quiet precision. A masterful solo performance for those who value craft over theatre.` | → `/offerings/simplicity/`

- Card 3 - **iii. Bespoke** | Bespoke Design & Artistry | From $1,500 / up to 15 guests / 4 hours | `Signature cocktails tailored to your event's theme and vision. Your story, crafted into every glass.` | → `/offerings/bespoke/`

- Card 4 - **iv. Omakase** | Omakase Improvisation | From $3,000 / up to 25 guests / open | `No menu. No repetition. Real-time creation in dialogue with the room. Complete trust. Unrepeatable moments.` | → `/offerings/omakase/`

Above the cards (intro slide of the rail): `Three distinct levels of service.` should change to **`Four distinct levels of service. One uncompromising standard.`** This corrects the bug from the live site (which says "Three" but lists four). Sub: `From the purity of a classic cocktail to the theatre of molecular improvisation.`

A 5th tail-card after Omakase: **Concierge** - "5 enhancements that augment any tier. Cigars, staff, curation, glassware, ice." → `/concierge/`. This way concierge is in the horizontal sweep, not lost.

**Source:** `/offerings/index.html` and the four tier pages.

---

### CHAPTER 4 - The Alchemist (Founder Preview)
**Visual:** Founder portrait on left (`/assets/photos/founder-temo.jpg` - the one you liked, against Manhattan skyline). Right column: text.

**Type:**
- (No "Chapter 04" eyebrow - removed per your direction.)
- Big quote, Geist 700 with italic-Fraunces drop accent: `"My journey began not behind a bar, but in the pursuit of perfection."`
- Name: `Teimuraz Benidze` (italic Fraunces, champagne)
- Role: `Founder & Flavor Architect` (mono caps)
- One paragraph: `Ice & Instinct is the culmination of years spent refining the dialogue between nature's raw ingredients and the precision of modern luxury.`
- CTA: "Read the full story →" → `/my-story/`

**Source:** `/index.html` founder preview block (lines 264-281) verbatim. Real copy is on `/my-story/` which has the long-form Georgia → NYC narrative + Ice/Instinct philosophy + 10-FAQ.

---

### CHAPTER 5 - The Collection (Gallery Teaser)
**Visual:** 4 cocktail tiles in your existing asymmetric magazine grid, B&W default, color on hover (mobile = always color). Quick teaser, NOT the full 12.

**Type:**
- Eyebrow: `The Collection`
- Headline: `Touch the glass to awaken the spirit.` (italic Fraunces accent on "to awaken the spirit.")
- Sub: `Twelve signature compositions, each built once.`
- 4 tiles shown (Belladonna, Black Truffle Martini, Rose Garden Rendezvous, 1001 Nights - or your pick of 4 strongest).
- CTA: "View The Collection →" → `/gallery/` (where all 12 live in horizontal track + lightbox)

**Source:** `/index.html` gallery teaser (lines 284-307) verbatim.

---

### CHAPTER 6 - Begin the Conversation (Final CTA)
**Visual:** White marble panel against the void (you've seen this version - looks beautiful, keeps current treatment with neutral grey tones, no cream/warm undertones).

**Type:**
- Headline: `Begin the conversation.` (italic Fraunces on "the conversation.")
- Sub: `Tell us about the evening. We respond within one business day with a private quote.`
- CTAs: `Inquire →` (primary) → `/contact/` ; `Explore the Offerings` (ghost) → `/offerings/`
- Meta line: `By appointment only / Manhattan & surrounds`

**Source:** `/index.html` final CTA (lines 309-323) verbatim.

---

### FOOTER (one bar at the very bottom)
- Left: Diamond mark + "Ice & Instinct" wordmark
- Center: 4 social icons (Instagram, Facebook, TikTok, X) - placeholder URLs until you give real ones
- Right: `Privacy / Terms` and `© 2026 Ice & Instinct - Designed in NYC`

---

## 4. The Vanish Menu (overlay contents)

When you click the bronze circle in the corner, full-screen overlay opens. Six chapters listed with stagger reveal:

1. **01 / Bridge** - the opening view
2. **02 / The Brand** - not a bar. A studio.
3. **03 / Offerings** - four levels, one standard
4. **04 / The Alchemist** - Teimuraz Benidze
5. **05 / The Collection** - twelve compositions
6. **06 / Inquire** - begin the conversation

Below the six, secondary entries to deep pages: `Foundation / Simplicity / Bespoke / Omakase / Concierge / My Story / Gallery / Contact`.

---

## 5. What Gets Fixed in This Pass (vs current cinema/index.html)

The current cinema prototype already has roughly the right ARCHITECTURE (six chapters, vanish menu, horizontal pin tiers, founder, gallery teaser, closing). What it has WRONG is the CONTENT.

This pass changes only content + small fixes. No layout refactor.

| What | From (current cinema) | To (real copy) |
|---|---|---|
| Hero slogan | "Where ritual meets instinct, high above the city." | (same - already correct) |
| Manifesto headline | "Ice & Instinct is not a bar." | "Ice & Instinct" + lead `is a private mixology experience...` |
| Manifesto body | My placeholder paragraph | Verbatim from live home: "Every ritual unfolds..." + "From private penthouse gatherings..." |
| Manifesto signature | "Created & led by Teimuraz Benidze" | "Created and led by flavor alchemist / Teimuraz Benidze / this experience transforms..." |
| Tiers headline | "Four distinct levels of service." | (same - already correct in cinema) |
| Tier 1 copy | "Impeccable drinks. Seamless service." | Full live copy: "Impeccable drinks, seamless service. No shortcuts, only intention. The standard from which every other level departs." |
| Tier 2 copy | "Solo precision. Craft over theatre." | "Timeless cocktails executed with quiet precision. A masterful solo performance for those who value craft over theatre." |
| Tier 3 copy | "Signature cocktails. Tailored to the room." | "Signature cocktails tailored to your event's theme and vision. Your story, crafted into every glass." |
| Tier 4 copy | "No menu. No repetition. Real-time creation." | "No menu. No repetition. Real-time creation in dialogue with the room. Complete trust. Unrepeatable moments." |
| Add 5th tail card | (missing) | Concierge: "Five enhancements: cigars, staff, curation, glassware, ice." → /concierge/ |
| Founder quote | "My journey began not behind a bar, but in the pursuit of perfection." | (same - already correct) |
| Founder body | (missing) | "Ice & Instinct is the culmination of years spent refining the dialogue between nature's raw ingredients and the precision of modern luxury." |
| Gallery headline | "Touch the glass to awaken the spirit." | (same) |
| Gallery sub | "Twelve signature compositions. Each built once." | (same - already correct) |
| Gallery tiles | 12 tiles | Reduce to 4 strongest + "View The Collection →" CTA |
| Closing headline | "Begin the conversation." | (same) |
| Closing sub | "Tell us the date, the room, the guest count. A response within one business day, personally." | "Tell us about the evening. We respond within one business day with a private quote." |
| Closing CTAs | "Inquire / Explore the Offerings" | (same) |
| All inner page links | Currently link to /offerings/foundation/ etc | (same - already correct) |

Plus: rename `Bridge / Brand / Offerings / Founder / Gallery / Inquire` in the Vanish menu to match section names above. Add direct links to all 11 deep pages in the secondary block of the overlay.

---

## 6. What I Need From You Before I Touch Code

Three decisions:

**A. Architecture: Option A, B, or C?** (My pick: A)

**B. Gallery on home: 4 teaser tiles or 12 full tiles?** (My pick: 4 tiles + "View The Collection" CTA, full 12 stays at /gallery/)

**C. The "Three / Four distinct levels" copy bug on the live site - shall I fix everywhere as part of this pass?** (Live home + offerings hub both say "Three" but show 4. My pick: yes, fix everywhere to "Four distinct levels of service. One uncompromising standard.")

Tell me A/B/C answers (or "all my picks") and I'll write the code change in one focused commit. No CSS gymnastics, no color experiments, no font changes. Only content swap to match this storyboard.
