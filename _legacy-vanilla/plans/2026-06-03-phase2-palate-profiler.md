# Plan - Phase 2: Palate Profiler (build)

**Date:** 2026-06-03
**Spec:** `specs/2026-06-02-palate-profiler.md` (locked)
**Branch:** `react-shell`
**Scope of THIS milestone:** Spec phasing step (1) only - **flow + steps + alchemy + card, fallback-only, fully demoable with no Gemini key.** Live AI proxy (R2), PDF/share artifacts (R6), and the real Inquiry handoff (R7) are later sub-phases.

## What ships now
- `Atmosphere -> Palate -> Texture` 3-step guided selection (back/forward, progress). (R1)
- Seamless local fallback recipe DB keyed off the 3 choices. (R3)
- Staged ~2.4s alchemy reveal, not a spinner; `prefers-reduced-motion` => instant. (R4, R10)
- Formula card: name / tagline / ingredients / ritual / sensory narrative + single color-profile tint. (R5)
- Distill again - re-roll a different variant from the same 3 choices, no re-asking. (R8)
- Temperament seed from Duality store (`funnelStore`): Ice = cold bias, Instinct = warm/smoky; standalone = neutral. (R9)
- Mobile flow by tap, <=375px. (R10)

## Deferred (explicitly NOT in this milestone)
- R2 live Gemini via server proxy - needs a deploy host decision (open question). `@google/genai` NOT installed; component is fallback-only.
- R6 PDF + share image.
- R7 Commission -> real pre-filled Inquiry modal (Phase 3). **Stub:** "Commission this serving" navigates to `/contact/` for now.

## Decisions
- **Choices are typographic-led**, not photo tiles - safest brand-true (no stock imagery, no AI-looking imagery). Hairline cards + corner ticks, champagne accent on hover.
- **No gold UI color, no glass/blur** - strict monochrome + single `--c-accent` champagne (per accent.css). Drink recipes rewritten to drop "24k gold leaf"/overwrought source copy.
- **Token system = cinema.css** (`--f-*`, `--t-step-*`, `--c-accent`, `--c-rule`) to match `Closing`.
- Overlay via existing `PortalRoot`; body-scroll lock; `motion` v11 `AnimatePresence`.
- Single color-profile **tint** stored per recipe (oklch) = the only non-champagne colour on the card.

## Files
- `app/src/features/Profiler/profilerData.ts` - steps, recipe variants, fallback resolver, temperament bias.
- `app/src/features/Profiler/PalateProfiler.tsx` - overlay component.
- `app/src/styles/profiler.css` - brand styling; imported in `main-home.tsx`.
- `app/src/sections/Concierge.tsx` - add a "Compose your signature" trigger (optional `onCompose` prop).
- `app/src/Home.tsx` - open state + overlay mount + commission->/contact handoff.

## Verify
- `npm run build` (tsc) clean; dev server renders; manual tap-through of all 3 steps + alchemy + card + distill + commission on desktop and 375px.
- Report to Reports folder, then STOP for Temo.
