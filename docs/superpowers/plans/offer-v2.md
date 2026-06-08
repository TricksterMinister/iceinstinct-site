# Ice & Instinct - Offer v2 (locked spec)

Single source of truth for the Tiers, pricing transparency, FAQ, and founder-plus-team
positioning. Subagents implement from this file. Approved by Temo 2026-06-08.

Rules: prices never go down vs current; no em/en dashes (hyphens only); the "$10/guest"
signal on Foundation is killed by raising the floor and cutting the guest cap.

---

## 1. Tier table (final)

| # | Tier | OLD | NEW (live) | Duration | Note |
|---|------|-----|-----------|----------|------|
| I | The Foundation | from $400 / up to 40 | **from $650 / up to 15 guests** | 3 hours | intimate essentials, entry craft. Kills $10/guest signal (now ~$43/guest) |
| II | Perfection in Simplicity | from $750 / up to 12 | **from $900 / up to 12 guests** | 4 hours | solo masterful, quiet precision |
| III | Bespoke Design & Artistry | from $1,500 / up to 15 | **from $1,800 / up to 30 guests** | 4 hours | signature + theme; TEAM scales here for larger events |
| IV | Omakase Improvisation | from $3,000 / up to 25 | **from $3,000 / up to 25 guests** | open | flagship, no menu, unchanged |

Files to update with these numbers:
- `app/src/sections/Tiers.tsx` (home tiers)
- `app/src/pages/offerings/foundation.tsx`, `simplicity.tsx`, `bespoke.tsx`, `omakase.tsx`
- `app/src/pages/Offerings.tsx`
- `app/src/seo/jsonld.ts` (Offer prices: 400->650, 750->900, 1500->1800, 3000 stays)
- `app/src/seo/seoData.ts` (any price strings)
- Any built ItemList schema must match (prerender regenerates on build)

## 2. Founder-plus-team positioning line

Primary line (use on Hero/Founder/Offerings):

> Ice & Instinct is led by Teimuraz Benidze and a team of trusted New York bartenders.
> Every event carries his standard; the team scales the craft to any room.

Storefront scaling line (place near the Tiers):

> Any tier scales with a full bar team for larger events - weddings, galas, and corporate
> gatherings - quoted on request.

## 3. Pricing transparency note (place under the Tiers)

> Each tier price covers the craft, service, and expertise. Spirits and wine are separate:
> provide your own, or we source everything on your behalf at supplier cost. Specialty ice,
> glassware, and rentals are arranged through the Concierge and billed at supplier cost.

## 4. FAQ content (draft - [CONFIRM] items need Temo sign-off at checkpoint)

**Is alcohol included in the price?**
No. The tier price covers the craft, service, and expertise. You may provide the spirits and
wine yourself, or we handle the entire purchase on your behalf at supplier cost.

**Do you bring everything - tools, bar, ice, glassware?**
Yes. The bar setup, tools, and service are fully handled. Specialty ice from Michelin-level
suppliers, curated glassware, and rentals are available through the Concierge and billed at
supplier cost.

**Where do you serve?**
The New York metropolitan area and New Jersey. Events further out are welcome; any travel
beyond the immediate metro is included in your private quote. [CONFIRMED 2026-06-08: travel is included, no separate fee - Temo covers his own transport.]

**Can you handle a large event or wedding?**
Yes. Teimuraz leads a team of trusted New York bartenders. Service scales from an intimate
solo performance to a full bar team for weddings, galas, and corporate events.

**How far ahead should I book?**
Two or more weeks is ideal, and shorter timelines are often possible. Ask and we will tell
you honestly what we can do.

**Is there a minimum?**
Each tier lists a starting price. Your final quote depends on guest count, format, and any
Concierge enhancements.

**How does the deposit work?**
A flat $500 deposit reserves your date. The balance is due before the event.
[CONFIRMED 2026-06-08: flat $500 deposit. Cancellation window not yet defined.]

Files:
- Create `app/src/sections/Faq.tsx`; mount on home (`app/src/main-home.tsx`) and
  `app/src/pages/Offerings.tsx`.

## 5. Proof section (scaffold now, data later)

- Create `app/src/sections/Proof.tsx` + `app/src/data/testimonials.ts` (empty array for now).
- Section renders nothing while the array is empty (no fake content). Populated after the
  first real event produces real reviews.

## 6. CTAs

Replace cold "Inquire" with action-led copy, one primary CTA per page:
- "Plan your evening"
- "Request a private quote - a reply within one business day"
Files: `app/src/sections/Closing.tsx`, `app/src/pages/Contact.tsx`, `app/src/sections/SiteFooter.tsx`

## 7. sameAs (later, after Phase 5 URLs exist)

`app/src/seo/jsonld.ts` Organization `sameAs: []` -> fill with Instagram + Google Business +
marketplace profile URLs once confirmed.
