# Spec - Duality Section ("Ice × Instinct")

**Date:** 2026-06-02
**Status:** Locked for build (pending Temo review)
**Where it lives:** Homepage, Chapter 02 - replaces the current text-only `.chapter#manifesto` ("The Brand")
**Part of:** the React migration of iceinstinct-site. First ported interactive feature. Entry point of the funnel **Duality -> Palate Profiler -> Inquiry**.

---

## Problem Statement

The current Chapter 02 explains the brand with a static paragraph ("Ice & Instinct is a private mixology experience..."). It tells, it does not move anyone, and it does no work beyond reading. On a premium ($10k-tier) site, a full-viewport beat must earn its place: stir emotion AND advance the visitor. The brand name itself encodes a philosophy (cold craft vs fire instinct) that the site never dramatizes.

## Goals

1. **Dramatize the brand name as an interaction** - the visitor physically experiences "Ice" (discipline) vs "Instinct" (intuition), and together they read "Ice & Instinct".
2. **Convert atmosphere into a decision** - the section is the entry of the conversion funnel, not a decorative dead-end. Committing to a side opens the Palate Profiler with that temperament pre-set.
3. **Hold the visual language with zero drift** - strict monochrome + single champagne accent, our own cinemagraphs, no new style.
4. **Feel unmistakably high-end** - weighted interaction (spring/inertia), 60fps, choreographed commit transition.

## Non-Goals

- **Not a navigation menu / sitemap.** It routes into the Profiler only, not into arbitrary pages. (Keeps the funnel single-threaded.)
- **Not two offering "temperatures"** (Ice->classic, Instinct->omakase). Considered and rejected: forks the funnel and competes with the Offerings chapter. Commit goes to the Profiler.
- **No new visual vocabulary.** No glassmorphism, no blur, no gold-glow, no stock imagery (all present in the ANTIGRAVITY source we are porting from - stripped here).
- **No audio in v1.** Optional sonic cue (ice clink / flame exhale) is P2.
- **Not a separate full-screen scene after the hero.** It IS Chapter 02; the 7-chapter rhythm is preserved.

## The Experience (happy path)

1. **Rest state:** full viewport, split 50/50. Left = **ICE** (Geist, uppercase, chalk white). Right = **Instinct** (Fraunces italic, champagne). Center seam = a thin champagne hairline carrying the **`&`**. Reads as the full wordmark "Ice & Instinct".
2. **Engage:** moving the cursor toward a side drags the seam with spring/inertia (cursor-mass, not a width snap). The active side grows; behind it a **cinemagraph reveals through a mask**:
   - **Ice** -> cold craft footage (clear ice / slow stir), cool grey grade.
   - **Instinct** -> fire footage (flamed peel / ember) carrying the lone **red ember accent** (the only colour anywhere, a callback to the Concierge cinemagraph).
3. **Texture:** film grain intensifies slightly on the active side; the side's micro-copy fades in (Ice = "Discipline. Order. The patience of craft." / Instinct = "Intuition. The pulse. The whisper that changes everything.").
4. **Commit:** click/tap a side -> the chosen world **floods the full screen**, the wordmark collapses toward the chosen initial, a choreographed transition opens the **Palate Profiler** seeded with that temperament (Ice = cold profile bias, Instinct = warm/smoky bias).

## Requirements

### Must-Have (P0)
- **R1 Split layout, rest 50/50**, full `100dvh`, ICE left / Instinct right, `&` on the seam. AC: at rest the three elements line up to read "Ice & Instinct" with no interaction.
- **R2 Cursor-driven seam** with spring/inertia (not width-snap). AC: seam follows cursor proximity smoothly at 60fps; releasing settles back to 50/50 with eased return.
- **R3 Masked cinemagraph reveal per side**, using our own video assets (B&W). AC: hovering a side reveals its cinemagraph through a mask tied to the seam; opposite side dims.
- **R4 Monochrome + single champagne accent.** AC: no colour anywhere except the red ember on the Instinct side and the champagne accent token from `/accent.css`. No blur/glass.
- **R5 Commit -> Palate Profiler** with temperament seed. AC: clicking a side runs the flood transition and opens the Profiler; the Profiler's first state reflects Ice vs Instinct bias.
- **R6 Reduced-motion + touch fallback.** AC: `prefers-reduced-motion` disables inertia (instant, no parallax). On touch (no hover): two stacked halves (Ice top / Instinct bottom), tap to reveal, tap CTA to commit.
- **R7 Replaces Chapter 02** without breaking the pager (02), chapter nav, or scroll rhythm. AC: 7-chapter pager + menu still correct; manifesto copy is re-homed into the two side captions.

### Nice-to-Have (P1)
- **Lean meter:** a thin champagne indicator showing how far toward Ice/Instinct the visitor is leaning.
- **Seam grabbable:** drag the divider directly (pointer down) for extra tactility.
- **Grain ramp** on the active side.

### Future (P2)
- Subtle audio cue per side (ice clink / flame exhale), muted by default, respects autoplay rules.
- Remember the chosen temperament across the session to pre-bias other touchpoints.

## Tech Approach (within the React migration)

- **Stack:** Vite + React 19 + TS. **GSAP/ScrollTrigger/Lenis** for scroll cinema (site-wide, unchanged); **Motion (framer)** for this component's gesture/spring/mask + the commit `AnimatePresence` transition.
- **Visual port rule:** take ANTIGRAVITY `DualitySection.tsx` *logic/structure only*; rebuild visuals in our tokens (strip `backdrop-blur`, gold, Unsplash).
- **Assets:** reuse existing B&W cinemagraphs (tier-bespoke flame, tier-foundation stir, cigar ember) or cut dedicated Ice/Instinct loops later; poster + webm/mp4 like the Concierge/Alchemist segments.
- **Funnel wiring:** shared state lifts `temperament` -> Palate Profiler initial selections.

## Success Metrics

**Leading (days):**
- Engagement rate of Ch02 (cursor interaction / hover) - target >= 60% of desktop visitors who reach it.
- **Commit rate** (click a side -> Profiler opens) - target >= 20% of those who engage.
- Dwell time on Ch02 vs old text block - target +50%.
- 60fps maintained on mid-tier laptop (no long frames > 50ms during seam drag).

**Lagging (weeks):**
- Profiler completion rate for visitors who entered via Duality vs other entry.
- Inquiry submissions attributable to the Duality->Profiler->Inquiry funnel.

## Open Questions
- **(Asset)** Cut dedicated Ice/Instinct cinemagraphs, or reuse existing tier/cigar loops for v1? (Lean: reuse for v1, dedicated later.)
- **(Eng)** Profiler temperament seed - how strongly does Ice/Instinct bias the first step (hard pre-select vs soft default)? Resolve during Profiler spec.

## Timeline / Phasing
- Depends on the React migration shell (Lenis/ScrollTrigger provider + Chapter components) existing first.
- Phase: migration shell -> Chapter 02 Duality (this spec) -> Palate Profiler spec/build -> Inquiry modal -> wire funnel.
