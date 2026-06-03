# Phase 1 - Duality Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use `- [ ]` checkboxes.

**Goal:** Replace homepage Chapter 02 (the static "manifesto" text) with the interactive Ice x Instinct duality split that funnels into the Palate Profiler.

**Architecture:** A new React feature component rendered in the chapter-02 slot (keeps `id="manifesto"` so pager/menu anchors still work). Split 50/50, ICE (left) / `&` seam / Instinct (right). Pointer proximity drags the seam with Motion spring/inertia; the growing side reveals its cinemagraph through a mask. Click a side = "commit": the chosen world floods, then `onCommit(temperament)` fires (stored in a tiny funnel store; Profiler wiring is Phase 2 - stub for now). Touch + reduced-motion fall back to a stacked, tap-to-reveal layout. Strict monochrome + champagne; no blur/glass.

**Tech Stack:** React 19 + TS, `motion` (framer) for the split/spring/mask/AnimatePresence. GSAP untouched. New scoped stylesheet `app/src/styles/duality.css` (do NOT edit the byte-identical ported cinema.css).

**Spec:** `specs/2026-06-02-duality-section.md`
**Reference (do not modify):** `app/src/sections/Manifesto.tsx` (the section being replaced), `app/src/app/Pager.tsx` (pagerMap), `app/src/Home.tsx`.
**Assets (reuse, v1):** Ice reveal = `/assets/photos/tier-foundation.jpg` (cold stir). Instinct reveal = `/assets/photos/tier-bespoke.jpg` (flame). Both B&W stills already in repo. (Dedicated Ice/Instinct cinemagraphs = later, spec P2.)

---

## Task 1: Funnel store (temperament)

**Files:** Create `app/src/app/funnelStore.ts`

- [ ] **Step 1: Minimal external store**

Create `app/src/app/funnelStore.ts`:
```ts
import { useSyncExternalStore } from 'react';

export type Temperament = 'ice' | 'instinct' | null;
type FunnelState = { temperament: Temperament };

let state: FunnelState = { temperament: null };
const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

export const funnel = {
  setTemperament(t: Temperament) { state = { ...state, temperament: t }; emit(); },
  getState() { return state; },
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
};

export function useFunnel(): FunnelState {
  return useSyncExternalStore(funnel.subscribe, funnel.getState, funnel.getState);
}
```

- [ ] **Step 2: Verify typecheck**

Run: `cd ~/iceinstinct-site/app && npm run typecheck`
Expected: 0 errors.

- [ ] **Step 3: Commit**
```bash
cd ~/iceinstinct-site && git add app/src/app/funnelStore.ts && git commit -m "feat(react): funnel store (temperament) for Duality->Profiler"
```

---

## Task 2: Duality styles

**Files:** Create `app/src/styles/duality.css`; Modify `app/src/main-home.tsx` (import it).

- [ ] **Step 1: Write duality.css (monochrome + champagne, no blur)**

Create `app/src/styles/duality.css` with (using the site's tokens from accent.css/cinema.css, e.g. `--c-bg`, `--c-fg`, `--c-fg-mute`, `--c-accent`, `--f-display`, `--f-italic`, `--f-mono`):
```css
.duality { position: relative; height: 100dvh; width: 100%; overflow: hidden; isolation: isolate; background: var(--c-bg); display: flex; }
.duality-side { position: relative; height: 100%; overflow: hidden; display: flex; flex-direction: column; justify-content: center; cursor: pointer; }
.duality-ice { align-items: flex-start; padding-left: clamp(2rem, 6vw, 7rem); border-right: 1px solid oklch(88% 0.06 95 / 0.18); }
.duality-instinct { align-items: flex-end; padding-right: clamp(2rem, 6vw, 7rem); text-align: right; }
.duality-media { position: absolute; inset: 0; z-index: 0; opacity: 0; transition: opacity 0.8s ease; }
.duality-media img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.06) brightness(0.5); }
.duality-side.is-active .duality-media { opacity: 1; }
.duality-scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 35%, rgba(0,0,0,0.55) 100%); pointer-events: none; }
.duality-label { position: relative; z-index: 2; }
.duality-word { font-family: var(--f-display); font-weight: 700; text-transform: uppercase; font-size: clamp(3.5rem, 12vmin, 11rem); line-height: 0.9; letter-spacing: -0.04em; color: var(--c-fg); }
.duality-instinct .duality-word { font-family: var(--f-italic); font-style: italic; font-weight: 350; text-transform: none; letter-spacing: 0; color: var(--c-accent); }
.duality-caption { font-family: var(--f-mono); font-size: var(--t-step--1); letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-fg-mute); max-width: 30ch; margin-top: 1.4rem; opacity: 0; transform: translateY(14px); transition: opacity 0.5s, transform 0.5s; }
.duality-side.is-active .duality-caption { opacity: 1; transform: none; }
.duality-amp { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3; font-family: var(--f-italic); font-style: italic; font-size: clamp(2rem, 5vmin, 4rem); color: var(--c-accent); pointer-events: none; transition: opacity 0.4s; }
.duality-cue { position: absolute; bottom: 2.4rem; left: 50%; transform: translateX(-50%); z-index: 3; font-family: var(--f-mono); font-size: var(--t-step--2); letter-spacing: 0.3em; text-transform: uppercase; color: var(--c-fg-faint); pointer-events: none; }
/* mobile / reduced-motion: stacked halves */
@media (max-width: 820px) {
  .duality { flex-direction: column; height: auto; min-height: 100dvh; }
  .duality-side { height: 50dvh; width: 100% !important; align-items: center; text-align: center; padding: 0 1.4rem; border-right: none; }
  .duality-ice { border-bottom: 1px solid oklch(88% 0.06 95 / 0.18); }
  .duality-amp { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .duality-media { transition: none; }
  .duality-caption { transition: none; }
}
```

- [ ] **Step 2: Import in main-home.tsx** (after the other style imports)
```tsx
import './styles/duality.css';
```

- [ ] **Step 3: Verify build**
Run: `cd ~/iceinstinct-site/app && npm run build` -> success.

- [ ] **Step 4: Commit**
```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "feat(react): Duality stylesheet (monochrome split, champagne accent)"
```

---

## Task 3: Duality component (split + spring seam + masked reveal + commit)

**Files:** Create `app/src/features/Duality/Duality.tsx`

- [ ] **Step 1: Implement the component**

Create `app/src/features/Duality/Duality.tsx`:
```tsx
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { funnel, type Temperament } from '../../app/funnelStore';

const ICE_CAPTION = 'Discipline. Order. The patience of craft.';
const INSTINCT_CAPTION = 'Intuition. The pulse. The whisper that changes everything.';

export function Duality({ onCommit }: { onCommit?: (t: Temperament) => void }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<'ice' | 'instinct' | null>(null);
  const [committed, setCommitted] = useState<Temperament>(null);

  // seam position 0..100 (% width of ice side); spring for inertia
  const target = useMotionValue(50);
  const width = useSpring(target, { damping: 30, stiffness: 180, mass: 0.6 });

  const setSide = (s: 'ice' | 'instinct' | null) => {
    setHovered(s);
    target.set(s === 'ice' ? 68 : s === 'instinct' ? 32 : 50);
  };

  const commit = (t: 'ice' | 'instinct') => {
    setCommitted(t);
    funnel.setTemperament(t);
    // flood the chosen side, then notify (Profiler wiring lands in Phase 2)
    target.set(t === 'ice' ? 100 : 0);
    window.setTimeout(() => { onCommit?.(t); }, 700);
  };

  return (
    <section className="duality" id="manifesto" aria-label="Ice and Instinct">
      <motion.div
        className={`duality-side duality-ice${hovered === 'ice' || committed === 'ice' ? ' is-active' : ''}`}
        style={reduced ? { width: '50%' } : { width: width.to ? undefined : undefined }}
        onMouseEnter={() => !committed && setSide('ice')}
        onMouseLeave={() => !committed && setSide(null)}
        onClick={() => !committed && commit('ice')}
      >
        <div className="duality-media"><img src="/assets/photos/tier-foundation.jpg" alt="Ice - the discipline of craft" loading="lazy" /></div>
        <div className="duality-scrim" />
        <div className="duality-label">
          <div className="duality-word">Ice</div>
          <p className="duality-caption">{ICE_CAPTION}</p>
        </div>
      </motion.div>

      <motion.div
        className={`duality-side duality-instinct${hovered === 'instinct' || committed === 'instinct' ? ' is-active' : ''}`}
        onMouseEnter={() => !committed && setSide('instinct')}
        onMouseLeave={() => !committed && setSide(null)}
        onClick={() => !committed && commit('instinct')}
      >
        <div className="duality-media"><img src="/assets/photos/tier-bespoke.jpg" alt="Instinct - the spark of intuition" loading="lazy" /></div>
        <div className="duality-scrim" />
        <div className="duality-label">
          <div className="duality-word">Instinct</div>
          <p className="duality-caption">{INSTINCT_CAPTION}</p>
        </div>
      </motion.div>

      <div className="duality-amp" aria-hidden="true" style={{ opacity: hovered || committed ? 0 : 1 }}>&amp;</div>
      <div className="duality-cue" aria-hidden="true">Choose your nature</div>
    </section>
  );
}
```

> IMPLEMENTER NOTE: the width-driving via Motion needs the spring applied to BOTH sides (ice = `width`, instinct = `100 - width`). Replace the `style` placeholders: set the ICE side `style={{ width: reduced ? '50%' : widthPct }}` where `widthPct` is a derived `useTransform(width, (w) => `${w}%`)`, and the INSTINCT side `style={{ width: reduced ? '50%' : useTransform(width, (w) => `${100 - w}%`) }}`. Use `useTransform` from motion/react. Keep flex children so they fill height. On reduced-motion, force both to 50% and disable hover-resize (still allow click-commit). Verify the seam animates smoothly with the spring.

- [ ] **Step 2: Typecheck + fix the useTransform wiring**
Run: `cd ~/iceinstinct-site/app && npm run typecheck` -> 0 errors. (Resolve the placeholder style props per the note; ensure no conditional hooks - call `useTransform` unconditionally at top.)

- [ ] **Step 3: Commit**
```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "feat(react): Duality component - split, spring seam, masked reveal, commit"
```

---

## Task 4: Mount in Home (replace Manifesto) + fix pager mapping

**Files:** Modify `app/src/Home.tsx`, `app/src/app/Pager.tsx`

- [ ] **Step 1: Swap Manifesto -> Duality in Home**
In `app/src/Home.tsx`: remove the `Manifesto` import + `<Manifesto />`; import `Duality` from `./features/Duality/Duality`; render `<Duality />` in the same position (between Hero and Tiers). (Leave `Manifesto.tsx` file in place, just unused, for reference.)

- [ ] **Step 2: Fix pager mapping**
In `app/src/app/Pager.tsx`, change the pagerMap entry `manifesto: '.chapter'` to `manifesto: '.duality'` (the section still has `id="manifesto"`, but its class is now `.duality`). Leave the dot key/label `02` unchanged.

- [ ] **Step 3: Verify build + pager active state**
Run: `cd ~/iceinstinct-site/app && npm run build` -> success. Then dev + browse:
```bash
cd ~/iceinstinct-site/app && (npm run dev >/tmp/dual.log 2>&1 &) ; sleep 5
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B goto "http://localhost:5173/" >/dev/null 2>&1; sleep 2
$B js "(document.querySelector('.duality')?'duality present':'MISSING')+' | manifesto id='+!!document.querySelector('#manifesto')" 2>/dev/null | grep -vi untrusted
$B console --errors 2>/dev/null | grep -vi untrusted | grep -i error | grep -vi 'websocket\|err_connection' | head
pkill -f vite
```
Expected: duality present; #manifesto exists; no console errors.

- [ ] **Step 4: Commit**
```bash
cd ~/iceinstinct-site && git add app/ && git commit -m "feat(react): mount Duality in chapter-02 slot; pager maps to .duality"
```

---

## Task 5: Interaction + fallback verification (controller-run)

- [ ] **Step 1: Desktop interaction** - dev + browse: hover ice -> ice side grows + reveal + caption; hover instinct -> grows; move away -> returns to 50/50; click -> floods + funnel temperament set. Screenshot rest state + each hover; review visually (champagne accent, monochrome, & seam, no blur).
- [ ] **Step 2: Reduced-motion** - emulate `prefers-reduced-motion`; confirm both sides 50/50, no resize on hover, click still commits.
- [ ] **Step 3: Mobile** - viewport 375; confirm stacked halves (Ice top / Instinct bottom), tap reveals + commits.
- [ ] **Step 4: Confirm rest of homepage unaffected** (tiers/concierge/founder/closing still render + scroll). 
- [ ] **Step 5: Commit any fixes.**

---

## Notes
- **Profiler handoff is Phase 2.** `onCommit` currently only sets the funnel temperament (+ optional flood animation). When the Palate Profiler ships, Home passes `onCommit={(t) => openProfiler(t)}`.
- **Red ember on Instinct** (single colour accent) = P1 polish; v1 uses the flame still. Add later with a tinted glow or a dedicated cinemagraph.
- **Manifesto copy:** the long brand prose + founder credit are intentionally dropped here (covered in Chapter 05 Alchemist + /my-story/). Captions carry the discipline/intuition essence.
