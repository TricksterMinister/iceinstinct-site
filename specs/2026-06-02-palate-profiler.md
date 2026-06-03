# Spec - Palate Profiler ("Compose your signature")

**Date:** 2026-06-02
**Status:** Locked for build (pending Temo review)
**Where it lives:** Full-screen overlay, opened from the Duality commit (and a secondary entry button in hero/concierge).
**Part of:** React migration. Middle of the funnel **Duality -> Palate Profiler -> Inquiry**. Ported from ANTIGRAVITY `PalateProfiler.tsx` (logic reused, visuals rebuilt in brand language).

---

## Problem Statement

The site shows what Ice & Instinct does, but never makes the visitor feel personally served before contact. A guest leaves having "looked at a site," with no artifact, no sense of being known. There is no moment where the alchemist appears to compose something for *them*.

## Goals

1. **Make it personal** - in under a minute the visitor answers 3 sensory questions and receives a bespoke cocktail composed for them (name, ingredients, ritual, story).
2. **Turn text into a luxury artifact** - the result is a beautiful named "formula card," not a chatbot answer; the guest can **take it with them** (print-ready PDF + share image).
3. **Drive commissions** - the created cocktail flows directly into an Inquiry ("commission this serving"), pre-filled.
4. **Spread the brand** - every taken card carries the crest + site, so guests' shares become quiet ambassadors.
5. **Never break** - works flawlessly even if the AI is down (seamless local fallback).

## Non-Goals

- **Not a chat / open prompt.** Fixed 3-step guided choice only. (Brand control, no abuse surface.)
- **Not accounts / saved history.** No login; the artifact is the takeaway. (Keeps it frictionless.)
- **Not real ordering / payment.** Output routes to an Inquiry, not a checkout. (We are by-appointment, not e-commerce.)
- **No stock imagery, glass/blur, or gold** from the ANTIGRAVITY source. Rebuilt in strict monochrome + champagne.
- **Client-side API key - forbidden.** The Gemini key never ships in the bundle (see Tech).

## The Experience (happy path)

1. **Invocation.** Opens from Duality commit (temperament pre-set: Ice = cold bias, Instinct = warm/smoky bias) or a standalone "Compose your signature" button. Full-screen overlay, body scroll locked.
2. **Three sensory steps** (one at a time): **Atmosphere -> Palate -> Texture.** Each step = tactile, cinematic monochrome choices (typographic + our cinemagraph fragments), not radio buttons. Back/forward allowed.
3. **The alchemy.** On the final choice, a ~2-3s composed animation - ingredients/liquid assembling, the name resolving. A staged show, never a spinner. This also masks AI latency.
4. **The formula card.** Result renders as a named editorial artifact: cocktail **name**, tagline, ingredients, serving ritual, a short sensory narrative, and a single **color-profile tint** (the only colour on the card). Treatment = our type (Fraunces/Geist), champagne accent, corner ticks (like the closing CTA).
5. **Three actions:**
   - **Take it with you** -> print-ready **PDF** (title page + crest + recipe) and a one-tap **share image** (square/vertical, name + crest + site).
   - **Distill again** -> re-generate a different signature from the same choices.
   - **Commission this serving** -> opens Inquiry, pre-filled with the cocktail name + choices.

## User Stories

- As a curious visitor, I want the site to compose a cocktail just for me from a few simple choices, so I feel personally understood before I ever contact anyone.
- As a delighted guest, I want to take my created cocktail with me as a beautiful card (save / print / share), so it becomes a keepsake and something I show others.
- As a ready-to-book guest, I want to commission the exact cocktail I created, so my inquiry already carries what I want.
- As an indecisive guest, I want to distill again, so I can explore more than one signature.
- As any visitor, I want the experience to still work when the AI fails, so I never hit a broken dead-end.
- As a phone visitor, I want the whole flow to work by tap on a small screen, so I am not excluded.

## Requirements

### Must-Have (P0)
- **R1 Three-step guided selection** (Atmosphere/Palate/Texture), one step visible at a time, with back/forward and progress indication. AC: cannot reach generation without all 3 chosen; back preserves prior choices.
- **R2 AI generation via server-side proxy.** Front calls our own endpoint; the endpoint holds the key and calls Gemini with a **structured JSON schema** (name, tagline, ingredients[], instructions[], sensoryNarrative, colorProfile). AC: key never appears in client bundle/network from the browser; malformed/empty AI response triggers fallback (R3).
- **R3 Seamless local fallback database.** If the AI errors/rate-limits/offline, a curated luxury recipe is returned keyed off the 3 choices, indistinguishable in quality. AC: with network disabled, the flow still returns a complete, on-brand card; no error visible to the guest.
- **R4 Alchemy generation animation** (staged, ~2-3s), not a spinner. AC: a composed reveal plays during generation; if the result arrives early it still completes the beat for drama; respects `prefers-reduced-motion` (instant, no motion).
- **R5 Formula card artifact** in brand language (monochrome + single color-profile tint + champagne). AC: shows name/tagline/ingredients/ritual/narrative; no blur/glass/gold/stock.
- **R6 Take it with you** - generates a **print-ready PDF** (title page with crest + "A signature composed for you", recipe, footer: By appointment / Manhattan / iceinstinct.com) **and** a **share image** (name + crest + site). AC: both download/save on desktop and mobile; both carry brand crest + URL; text is the guest's actual recipe.
- **R7 Commission this serving** - opens Inquiry pre-filled with cocktail name + the 3 choices. AC: Inquiry shows the created cocktail; submitting carries it through.
- **R8 Distill again** - re-generate from same inputs. AC: produces a different result without re-asking the 3 steps.
- **R9 Temperament seed from Duality.** AC: entering via Ice biases cold profiles, via Instinct biases warm/smoky; entering standalone uses neutral defaults.
- **R10 Mobile + reduced-motion.** AC: full flow works by tap on <=375px; motion-reduced users get the full result with no animation.

### Nice-to-Have (P1)
- Optional first-name field that personalizes the card title ("composed for Teimuraz").
- Rate-limit friendly debounce + a subtle "the alchemist is composing" state if latency exceeds the animation.
- Re-enter the Profiler later in the session and keep last result.

### Future (P2)
- Email the card to the guest (light capture).
- A small gallery of community-created signatures (needs moderation).
- Voice/ambient sound during alchemy.

## Tech Approach

- **Stack:** React 19 + TS + Vite; **Motion** for steps/alchemy/`AnimatePresence`; overlay via portal; body-scroll lock.
- **AI:** `@google/genai`, model `gemini-2.5-flash`, `responseMimeType: application/json` + `responseSchema`. **Called only from a server-side proxy** (edge/serverless function on the deploy host). Browser -> our `/api/profiler` -> Gemini. Key in server env only.
- **Fallback:** curated recipe map keyed by (atmosphere, palate, texture); used on any proxy/AI failure. Same shape as AI output so the card is identical.
- **Artifact generation:** PDF + share image rendered client-side from the recipe data using our fonts/tokens (no server round-trip needed). Deterministic from the result object.
- **State:** created cocktail + choices lifted to a shared store -> consumed by Inquiry.
- **Port note:** reuse ANTIGRAVITY logic (steps data, schema, fallback pattern); discard its Tailwind blur/gold/Unsplash visuals.

## Success Metrics

**Leading (days):**
- Profiler open rate (from Duality + standalone) - target >= 30% of homepage visitors.
- **Completion rate** (open -> card generated) - target >= 60%.
- **Take-it-with-you rate** (card -> PDF or image saved) - target >= 25% of completions.
- **Commission rate** (card -> Inquiry opened) - target >= 20% of completions.
- Fallback transparency: 0 visible AI errors to guests.

**Lagging (weeks):**
- Share-driven referral visits (UTM/crest URL on shared cards).
- Inquiries attributable to Profiler; conversation-to-booking rate for Profiler-origin inquiries.

## Open Questions
- **(Eng/Infra, blocking deploy)** Which host provides the serverless proxy (Vercel / Netlify / Cloudflare)? Determines the proxy implementation. Until chosen, build against a local dev proxy + ship with fallback active.
- **(Design, non-blocking)** PDF page format - single A4/Letter "formula sheet" vs a 2-page (title + recipe) keepsake. Lean: 1 elegant sheet for v1.
- **(Data, non-blocking)** Do we capture anything (email) on "take it with you," or keep it zero-friction? Lean: zero-friction v1, email is P2.

## Timeline / Phasing
- Depends on: React migration shell + Inquiry modal (R7 target) + a deploy host for the proxy (R2).
- Phasing: (1) flow + steps + alchemy + card with **fallback only** (works with no key, fully demoable) -> (2) wire server proxy for live AI -> (3) take-with-you artifacts -> (4) Duality seed + Inquiry handoff.
- Note: Phase 1 ships a complete experience on the fallback alone; live AI is an enhancement, not a blocker.
