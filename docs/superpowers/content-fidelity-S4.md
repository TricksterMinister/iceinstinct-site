# Content fidelity report - S4 (new React site vs old live copy)

This is a read-only, page-by-page comparison of the visible human copy on the NEW React site (`app/src/`) against the OLD archived site (`_legacy-vanilla/`), which holds the owner's real, idiomatic copy. No site files were edited.

Verdict in one line: the migration is very faithful. Prices, guest counts, durations, tier names and all 12 cocktail names match exactly. The few things worth the owner's eyes are listed per page and gathered under Priority fixes at the end.

Note on the recurring "Manhattan -> New York Metropolitan Area" change: across almost every page the old copy said "Manhattan" / "Manhattan and surrounds" and the new site says "New York Metropolitan Area". This looks deliberate (broader service area) but appears in many places, so it is called out once here and only re-flagged where it is inconsistent.

---

## Home

The old home (`_legacy-vanilla/index.html`) was the "cinema prototype" but it carries the full real home copy, and the new home reproduces it almost word-for-word.

- MATCH: hero wordmark, sub ("Where ritual meets instinct, high above the city."), manifesto, founder block, gallery teaser, the four tier cards, concierge index, closing CTA - all substantially match.
- CHANGED (location label): old hero meta "Manhattan / By Appointment" and closing meta "Manhattan & surrounds" -> new "New York Metropolitan Area". Deliberate-looking.
- NEW/INVENTED: the **Duality "Choose Your Nature"** split-screen section (ICE = "The Cold Craft / Discipline. Order. The patience of craft." vs INSTINCT = "The Living Fire / Intuition. The pulse. The whisper that changes everything.") is a new interactive block. The phrasing echoes the My Story philosophy quote, but as a standalone home section it is new - confirm wording.
- Prices/specs: exact match ($400/40/3h, $750/12/4h, $1,500/15/4h, $3,000/25/open).

## Offerings (hub)

- MATCH: hero ("Four distinct levels. One standard."), lead, all four tier cards with blurbs, final CTA ("Choose the rhythm.").
- CHANGED: tier-grid footer microcopy old "Hover any tier to explore" -> new "Explore each tier". Minor.
- CHANGED (location): old CTA eyebrow "Private Commission - Manhattan" -> new "Private Commission - New York".
- Prices/specs: exact match.

## Foundation (tier i)

- MATCH: hero headline/lead, overview (3 paras + pull + foot), menu protocol (Selection/Focus), scalability tiers A/B/C, what's included (5 steps), standard inclusions (4), host provides (4), notes (3), closing.
- MISSING: old hero eyebrow "i. Foundation - The Essential" is not rendered in the new layout.
- MISSING: old section sub-headlines under Menu Protocol ("Curated Simplicity. The Foundation of Excellence." + intro line) are dropped; new shows only Selection/Focus.
- MISSING: old inter-section pull quotes ("Hospitality with intention.", "The first pour matters most.") are not present.
- CHANGED (location): priceMeta old "...Manhattan" -> new "...New York Metropolitan Area".
- Prices/specs: exact ($400/$550/$750 ladder, up to 40, 3h, +$75/hr).

## Perfection in Simplicity (tier ii)

- MATCH: hero, overview, menu protocol, scalability A/B/C, included (4), standard (4), host provides (5), extensions notes (3), closing.
- MISSING: old hero eyebrow "ii. Simplicity - The Executive Standard".
- MISSING: old Menu Protocol sub-headline "Classics Only. Strictly defined. Flawlessly executed." + its intro line.
- MISSING: old pull quote "True luxury whispers." between sections (the phrase survives as the overview pull, but the standalone interstitial is gone).
- CHANGED (location): priceMeta "Manhattan" -> "New York Metropolitan Area".
- Prices/specs: exact ($750 / $1,100 / $1,450; up to 12; 4h).

## Bespoke Design & Artistry (tier iii)

- MATCH: hero, overview, menu protocol, scalability A/B/C (incl. "Custom Quote" for 31+), included (4), standard (5 incl. Custom Recipe Documentation), host provides (5), extensions (3), closing.
- MISSING: old hero eyebrow "iii. Bespoke - The Architect".
- MISSING: old Menu Protocol sub-headline "Custom Design. Your Story. Liquid Form." + intro.
- MISSING: old interstitial pull "Each cocktail, a conversation piece." (survives as overview pull only).
- CHANGED (location): priceMeta "Manhattan" -> "New York Metropolitan Area".
- Prices/specs: exact ($1,500 / $2,000 / Custom Quote; up to 15; 4h).

## Omakase Improvisation (tier iv)

- MATCH: hero, overview, menu protocol, scalability A/B/C (incl. muted "Beyond Limits / Not recommended"), included (5, incl. the full Ice Ritual mandatory-inclusion text), standard (4), host provides (4), notes (4), closing.
- MISSING: old hero eyebrow "iv. Omakase - The Alchemist".
- MISSING: old Menu Protocol sub-headline "Pure Improvisation. The Highest Form of Trust." + intro.
- MISSING: old interstitial pulls ("Performance art for cocktails.", "The highest form of trust.", "Every cocktail, a singular event.").
- CHANGED (minor): closing lead old "We will return with..." -> new "We return with...".
- CHANGED (location): priceMeta "Manhattan" -> "New York Metropolitan Area".
- Prices/specs: exact ($3,000 / $3,500 / not recommended; up to 25; 4-6h).

## Concierge

- MATCH: hero ("Augment any experience."), all five enhancement cards with full prose and "Important note" lines, the overview shelf, final CTA ("Pair what you need.").
- Prices: exact - Cigar $500, Staff $350, Curator $350, Glassware $250, Ice $250.
- CHANGED (location): old CTA eyebrow "Private Commission - Manhattan" -> new "Private Commission - New York".

## My Story

- MATCH: cover (Teimuraz Benidze, "Founder & Flavor Architect"), opening statement, the four-city journey (Tbilisi / Lisbon / Moscow / New York with identical notes), Ice/Instinct philosophy quote, credentials (The Podcast, Four Languages), finale, and all 10 FAQ items word-for-word (incl. the $1,000 deposit / 14-day balance terms).
- CHANGED (location): old CTA eyebrow "Private Commission - Manhattan" -> new "Private Commission - New York".
- No invented copy. Strong match.

## Gallery (The Collection)

- MATCH: hero, all 12 cocktail names in identical order (White Lotus, Aviation, Persimmon Saffron Sour, Belladonna, Black Truffle Martini, Rose Garden Rendezvous, Aureliano, Basil in my mind, 1001 Nights, Call Me By Your Name, Calipso Cream, Besame), final CTA ("Commission a ritual.").
- CHANGED: hero lead old "...each built once. Hover any tile to release its colour. Click for the full image." -> new "...each built once. Select any tile to view it in full." (the hover-to-colour instruction was dropped; behaviour may still exist).
- NEW/INVENTED: the **"The thirteenth composition / Not on the wall yet. Compose your own."** band plus the Palate Profiler ("Answer three sensory questions and the alchemist composes a signature...") is entirely new - not on the old site. Owner should confirm this feature and its copy.
- CHANGED (location): CTA eyebrow "Manhattan" -> "New York".

## Contact (Inquire)

- MATCH: hero ("Begin the conversation." + lead), invitation block ("An evening, considered in full." / "Begin the inquiry").
- CHANGED (significant - mechanism): the OLD page had a full inline **inquiry FORM** (fields: Your name, Email, Guests & location, Event date, In your words; submit "Send the inquiry"; handled by Formspree) and a fallback line "or write hello@iceinstinct.com". The NEW page replaces all of that with a modal that links out to a **YouCanBook.me booking page** ("enter-ritual.youcanbook.me", button "Reserve a consultation"). No form fields, no email address shown.
- MISSING: the email fallback "or write hello@iceinstinct.com" and the success message "Received. A reply within one business day, personally - Teimuraz." (no longer applicable without a form).
- NEW/INVENTED: the consultation-booking copy ("Choose a time for a private consultation...") and the external booking URL. Owner should confirm the booking link and that he wants to drop the email/Formspree path.

## Privacy

- MATCH: all 9 sections word-for-word (Who we are, What we collect, How we use it, Third parties, Retention, Your rights, Children, Changes, Contact). "Last updated - May 1, 2026" preserved.
- Note: still describes a Formspree "contact form" and an email on the contact page - now inaccurate given the Contact page change above.

## Terms

- MATCH: all 12 sections word-for-word, including the four tiers + Private Concierge and the exact prices/specs, deposit (50/50), cancellation windows, governing law (State of New York).
- Note: section 2 still reads "Private mixology service in **Manhattan and surrounds**" while the rest of the site moved to "New York Metropolitan Area" - small inconsistency.
- "Last updated - May 1, 2026" preserved.

---

## Priority fixes (worth the owner's attention)

1. **Contact page changed mechanism** - the Formspree inquiry form + "hello@iceinstinct.com" were replaced by an external YouCanBook.me consultation booking ("Reserve a consultation"). Confirm this is intended, that the booking URL is correct, and that dropping the form/email is acceptable. (Privacy + Terms still reference the form/email - update if the form is gone.)
2. **Gallery "Compose your own" / Palate Profiler** - a brand-new feature and copy not on the old site. Confirm keep + wording.
3. **Home "Duality / Choose Your Nature"** - new standalone interactive section; confirm copy.
4. **Tier-page eyebrows + section sub-headlines + interstitial pull quotes dropped** - across all four tiers the old "i. Foundation - The Essential" style eyebrows, the Menu-Protocol sub-headlines ("Pure Improvisation. The Highest Form of Trust.", etc.), and the between-section pull quotes are gone. Decide whether to restore for richness or keep the tighter layout.
5. **Gallery hero lead** lost the "Hover any tile to release its colour" instruction - re-add if the hover-to-colour interaction is still live.
6. **Location wording consistency** - "New York Metropolitan Area" is now used almost everywhere; Terms section 2 still says "Manhattan and surrounds". Align if the broader area is the intended brand line.

No price, guest-count, duration, tier-name, cocktail-name, or add-on-price mismatches were found. Those are all exact.
