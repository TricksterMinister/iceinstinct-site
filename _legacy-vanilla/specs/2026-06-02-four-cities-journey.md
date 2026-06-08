# Spec - Four Cities Journey ("Four cities, one standard")

**Date:** 2026-06-02
**Status:** Locked for build (pending Temo review)
**Where it lives:** `/my-story/` page - upgrades the existing `story-journey` section.
**Part of:** React migration. A merge of ANTIGRAVITY `HorizontalJourney.tsx` (travel mechanic) with our existing journey (real cities, real 2K B&W photos, brand language).

---

## Problem Statement

Temo's origin is the heart of the brand: a real path Tbilisi -> Lisbon -> Moscow -> New York, two decades distilled into one standard. The current my-story journey shows this as a hover-to-reveal name list - intimate, but a quiet desktop-only list. It does not convey *distance* or *journey*, and hover does nothing on touch. The drama of "I traveled the world to arrive at this" is under-told.

## Goals

1. **Make the path felt as travel** - the visitor physically moves through the four cities, sensing distance and progression toward "one standard."
2. **Keep our soul** - real cities, our own 2K B&W photographs, real personal narrative; not generic "Chapter 01."
3. **Work everywhere** - desktop and touch, with a graceful reduced-motion fallback.
4. **Hold the brand** - strict monochrome + champagne, full-bleed cinematic frames, zero glass/blur/stock.

## Non-Goals

- **Not keeping the hover-reveal list.** It is replaced by the travel mechanic (the travel tells the story better and is touch-friendly).
- **No literal map / globe.** A route/progress motif only; a 3D map is a separate, heavier idea. (Avoids scope blow-up.)
- **No glass cards, blur, stock imagery, or "Chapter 01" labels** from the ANTIGRAVITY source.
- **Not a new page.** It is the existing journey section on `/my-story/`, upgraded in place.
- **No per-city audio** in v1.

## The Experience (happy path)

1. Visitor reaches the journey section. A pinned full-screen stage holds a fixed overlay: **"Four cities, one standard."**
2. As they scroll, **four full-bleed panels travel horizontally** (sticky pin + horizontal translate). Each panel = one city, in order: **Tbilisi -> Lisbon -> Moscow -> New York.**
3. Each panel: our **2K B&W city photograph** full-bleed, the **city name as giant type**, a short line of narrative set directly on the frame over a scrim (no floating glass card).
4. A thin **champagne route line / progress** advances city by city; the journey lands on **New York = the standard** (the destination resolves the headline).
5. Exit: scrolling past releases the pin and continues the page.

## User Stories

- As a first-time visitor, I want to travel through the four cities as I scroll, so I feel the distance and journey behind the brand rather than reading a list.
- As a visitor on my phone, I want the journey to work by swipe/scroll, so I get the full story on touch.
- As a visitor who values craft, I want each city to be a real, beautiful photograph with a real story, so it feels authentic, not stock.
- As a motion-sensitive visitor, I want a calm fallback, so the section is comfortable and still complete.

## Requirements

### Must-Have (P0)
- **R1 Pinned horizontal travel of 4 city panels** (sticky pin + horizontal translate driven by scroll). AC: scrolling moves through Tbilisi -> Lisbon -> Moscow -> New York in order; the section pins, plays, then releases; 60fps, no jank.
- **R2 Full-bleed real city frames** using existing 2K B&W assets (`journey-tbilisi/lisbon/moscow/newyork.jpg`). AC: each panel shows the correct city photo full-bleed, grayscale, with a scrim for legibility; no stock, no blur.
- **R3 Giant city name + on-frame narrative** per panel (type over scrim, not a glass card). AC: name + one narrative line readable on every panel; brand fonts (Geist/Fraunces) + champagne accent.
- **R4 Fixed headline overlay** "Four cities, one standard." present across the travel; resolves on the New York panel. AC: headline persists during travel; New York reads as the arrival/standard.
- **R5 Route / progress indicator** (thin champagne line or city ticks), advancing per city. AC: indicator reflects current city; no ANTIGRAVITY-style equal bars with gold.
- **R6 Touch + reduced-motion fallback.** AC: works by swipe/scroll on <=375px; with `prefers-reduced-motion`, panels stack vertically full-bleed (no pin/translate), story fully intact.
- **R7 Replaces `story-journey` in place** on `/my-story/` without breaking surrounding sections or page scroll. AC: sections before/after still flow; no layout gaps.

### Nice-to-Have (P1)
- Subtle parallax of the photo within each panel during travel (depth).
- City meta line (years / role) under the name.
- A faint connecting line that visually "draws" between cities as you progress.

### Future (P2)
- Animate the photos into short cinemagraphs (like the homepage segments).
- A small map motif showing the route across continents.
- Ambient per-city sound.

## Tech Approach

- **Stack:** React 19 + TS + Vite. **GSAP + ScrollTrigger** for the pin + horizontal translate (same pattern as the homepage tier-rail; our proven mechanic). Lenis-compatible.
- **Port note:** take ANTIGRAVITY `HorizontalJourney` *structure/idea* only (sticky + translateX); rebuild visuals in brand tokens - strip `backdrop-blur`, gold, Unsplash, "Chapter 01" labels; swap to our real cities + 2K photos.
- **Assets:** reuse the four existing 2K B&W city photos. Per-city narrative copy carried from current my-story content.
- **Fallback:** `prefers-reduced-motion` and no-pin path renders the four panels as a vertical full-bleed stack.

## Success Metrics

**Leading (days):**
- Journey completion (scroll through all 4 cities) - target >= 70% of visitors who enter the section.
- Dwell time on the journey vs the old hover list - target +40%.
- Mobile engagement: journey is now interacted with on touch (previously ~0 via hover) - target parity with desktop completion.
- 60fps during the pinned travel (no long frames > 50ms).

**Lagging (weeks):**
- my-story page scroll-depth and time-on-page lift.
- Inquiry rate among visitors who view the journey (story-driven trust -> contact).

## Open Questions
- **(Content, non-blocking)** Final one-line narrative per city (Tbilisi/Lisbon/Moscow/New York) - reuse/trim existing my-story copy or write fresh. Lean: trim existing.
- **(Design, non-blocking)** Progress motif: plain champagne line vs city-name ticks vs a drawn route. Lean: champagne line + city ticks for v1; drawn route is P1.

## Timeline / Phasing
- Depends on the React migration shell (GSAP/ScrollTrigger provider) existing first.
- Phasing: migration shell -> port the pinned horizontal travel with our assets (this spec) -> P1 parallax/route polish.
- Independent of the funnel (Duality/Profiler/Inquiry); can ship in any order after the shell.
