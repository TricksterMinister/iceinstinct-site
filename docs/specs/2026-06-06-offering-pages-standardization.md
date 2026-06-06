# PRD: Offering Pages Standardization

**Status:** Draft for approval
**Date:** 2026-06-06
**Owner:** Temo (creative direction) / Claude (execution)
**Related:** Implementation plan `docs/superpowers/plans/2026-06-06-offering-pages-scale.md`
**Scope branch:** `react-shell` (nothing deployed)

---

## Problem Statement

Ice & Instinct sells four service tiers, each on its own page: Omakase, Foundation, Simplicity, Bespoke. Only **Omakase** has been redesigned to the approved standard and refilled with full real content. The other three are still the old vanilla-ported Phase-0 layout (different structure, eyebrow labels, no held-stage bridge, no champagne motion, no closing marquee). A prospect comparing tiers hits a jarring quality cliff: one page feels like a top studio, three feel like a draft. Left unsolved, the offerings funnel (the primary conversion path to Inquire) reads as inconsistent and unfinished, undercutting a luxury positioning where the site IS the proof of craft.

A secondary risk is internal: the approved Omakase design lives as a single hand-built file. Copy-pasting it three times creates four divergent files to maintain, and a prior content pass already proved the failure mode (copy got silently trimmed and was rejected).

## Goals

1. **Visual parity:** all four offering pages render the identical approved design system (hero cursor-light ghost, held-stage shimmer bridge, ledger tiers, numbered timelines, champagne-wave standard panel, single-column notes, 70/30 closing with marquee). Measured by side-by-side review: zero structural deltas between pages except content/media.
2. **Content fidelity:** each page carries its own full, verbatim copy from its live original (`offerings/<slug>/index.html`), nothing trimmed. Measured by a line-by-line diff of rendered copy vs source per section I-VII.
3. **Single source of design truth:** one template component drives all four; a design change is made once and propagates. Measured by: changing the template visibly updates all four pages.
4. **Ship-ready quality:** every page fits the one-segment-per-viewport rule, 0 console errors, production build emits all four entries. Measured by the headless sweep + `npm run build`.

## Non-Goals

1. **No new copywriting.** We transcribe the existing approved live copy; we do not rewrite or "improve" it. (Out of scope: it is approved content; rewriting invites scope creep and re-approval cycles.)
2. **No booking integration.** Inquire keeps the current `/contact/` link. (Separate parked initiative: Inquiry -> YouCanBook.me.)
3. **No Palate Profiler.** (Separate parked feature on `/gallery/`.)
4. **No home / concierge / gallery / my-story changes.** Scope is the four offering pages only.
5. **No deploy or cutover.** Work stays on `react-shell`; prerender + production cutover is a later phase.

## User Stories

**Prospective client (luxury private-event host)**
- As a prospect comparing tiers, I want every offering page to feel equally premium and consistent, so that I trust the studio's craft and keep moving toward Inquire.
- As a prospect on Foundation/Simplicity/Bespoke, I want the same full detail I saw on Omakase (what's included, who staffs it, what I provide, the fine print), so that I can decide without emailing to ask.
- As a prospect, I want each tier's real pricing, guest count, duration, and personnel clearly shown, so that I can self-qualify before inquiring.

**Studio (maintainer / creative director)**
- As the maintainer, I want one template so that a design tweak updates all four pages at once, so that quality never drifts apart again.
- As the creative director, I want each page to keep its own ghost word, hero media, and bridge photo, so that pages stay distinct within one system.

**Edge cases**
- As a reduced-motion user, I want all champagne motion (wave, shimmer, hero light, marquee) disabled, so that the page is calm and accessible.
- As a touch/mobile user, I want the hero cursor-light to no-op (no broken hover state), so that nothing feels stuck.
- As a keyboard/screen-reader user, I want the decorative ghost/rail to be aria-hidden and the real nav/links reachable, so that content is navigable.

## Requirements

### Must-Have (P0)

- **P0-1 Data-driven template.** One `OfferingPage` component renders the full approved layout from a `content` prop.
  - Given the template and a content module, when a page mounts, then it renders hero + sections I-VII + closing with that page's copy, ghost word, and media.
  - [ ] Section ids preserved exactly: `.concierge`, `#overview`, `#menu-protocol`, `#scaling`, `#included`, `#standard-inclusions`, `#host-provides`, `#notes`, `.oma-close`.
- **P0-2 Omakase parity gate.** Omakase rendered through the template is visually identical to the approved current build.
  - Given the migration, when Omakase is screenshotted section-by-section, then there are no visible differences vs the pre-refactor approved version.
- **P0-3 Full content per page.** Foundation, Simplicity, Bespoke each carry verbatim copy from their live original, all of I-VII plus hero and closing.
  - Given a page, when its rendered copy is compared to `offerings/<slug>/index.html`, then every section's substantive text matches (no trims).
  - [ ] Per-page variances handled: VII label ("Notes" for Foundation; "Extensions" for Simplicity and Bespoke); tier count and validity (all three have 3 valid tiers; Bespoke C = "Custom Quote"); V item count (Bespoke has 5); IV/VI item counts differ.
- **P0-4 Geography lock.** Every price-meta line reads "New York Metropolitan Area" (never "Manhattan"), despite the source HTML.
- **P0-5 Viewport fit.** Each section lands at one viewport (<= 100svh at 1440x900) without clipping copy; the held-stage bridge is the intentional exception (tall pinned scrub).
- **P0-6 Clean runtime + build.** 0 console errors on all four pages; `npm run build` emits all four offering entries; `npx tsc --noEmit` passes.
- **P0-7 Per-page identity.** Correct ghost word per page (OMAKASE / FOUNDATION / SIMPLICITY / BESPOKE) in hero and closing.

### Nice-to-Have (P1)

- **P1-1 Real per-page media.** Bespoke/Foundation/Simplicity get their own on-brand hero video + bridge photo (not Omakase's), generated via the approved generators. (Pages function with placeholder/shared media if this slips; flagged as the one open asset task.)
- **P1-2 Per-page closing copy.** Closing CTA lead tailored per tier (proposal vs consultation framework), already specified in the plan.

### Future Considerations (P2)

- **P2-1 Shared template reused by future pages** (e.g. seasonal or private offerings) with no new layout code.
- **P2-2 Prerender + cutover** of all four pages in the static-export pass.
- **P2-3 Schema/SEO parity** (Service + AggregateOffer JSON-LD) regenerated per page from the content module, so structured data never drifts from visible copy.

## Success Metrics

**Leading (verify at completion):**
- Design parity: 4/4 pages pass the headless sweep (all sections `fit`, `lenis`/`ether`/`marquee` present, correct ghost) - target 100%.
- Content fidelity: 0 missing/trimmed sections vs source across 4 pages - target 0 gaps.
- Runtime cleanliness: 0 console errors across 4 pages; `tsc` + `build` green - target 0 errors.
- Maintainability: a one-line template change updates all 4 pages in one render sweep - target: demonstrated once.

**Lagging (post-cutover, later phase):**
- Offerings -> Inquire click-through holds or improves vs current.
- Reduced "what's included / pricing" pre-inquiry email questions (qualitative, from Temo's inbox).
- Time-on-offering-page and scroll-depth (once analytics exist).

## Open Questions

- **(Temo)** Per-page hero video + bridge photo: generate fresh assets now, or ship with on-brand placeholders and swap later? (Blocks P1-1, not P0.)
- **(Temo)** Pricing/guest/hour values: are the live originals current and correct (Foundation $400-750 / Simplicity $750-1,450 / Bespoke $1,500-2,000+)? Confirm before they go into the content modules. (Blocking for P0-3 accuracy.)
- **(Temo)** Closing CTA copy per tier: accept the plan's drafted leads, or supply exact wording? (Non-blocking; default to drafted.)
- **(Eng/Claude)** Does any section overflow one viewport with the longer pages (e.g. Bespoke V = 5 items)? If so, apply the same scoped compaction used for `#included`. (Resolve during implementation.)

## Timeline Considerations

- **Dependency:** Omakase must stay the frozen reference; the parity gate (P0-2) blocks all per-page work until passed.
- **Phasing** (mirrors the implementation plan):
  1. Shared CSS rename + content shape + Omakase content module.
  2. Extract `OfferingPage`, migrate Omakase, pass parity gate.
  3. Foundation -> Simplicity -> Bespoke content modules + wiring (one page at a time, verified each).
  4. Per-page media + cross-page sweep + build.
- **No hard external deadline.** Gate is quality, not date. Cutover is a later, separate phase.

## Out-of-Scope Parking Lot

- Inquiry -> YouCanBook.me booking.
- Palate Profiler on `/gallery/`.
- Prerender + production cutover.
- Analytics instrumentation for the lagging metrics above.
