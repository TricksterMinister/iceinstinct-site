# Ice & Instinct - Type Scale Standardization

> Full audit of every font size on the site + the proposed single standard.
> Sizes are the **desktop maximum** (the clamp cap), rounded to px at 16px root.
> NOTHING is changed yet - this is the plan to sign off before refactor.

---

## 0. The problem

The site runs **three parallel type scales**, so the same role has different sizes per page:

| System | File | Tokens | Used by |
|---|---|---|---|
| Cinema | `cinema.css` | `--t-step--2 … --t-step-7`, `--seg-h` | Home, Gallery, Concierge (home), legal chrome |
| Styles | `styles.css` | `--t-xs … --t-mega`, `--t-display*` | Offerings hub, My Story, Gallery hero, legal, profiler |
| Offering | `offering.css` | `oma-*` clamps + a `--t-step` subset | 4 tier pages, Inquire closing, Concierge page |

Goal: collapse to **ONE scale, 9 roles**, applied identically across all pages.

---

## 1. CURRENT - every font size that exists (desktop max)

### Display / hero
| px | Token / rule | Where |
|---|---|---|
| ~256 (16rem cap, vw-limited ~173) | `.hero-title` 12vw | Home hero "Ice & Instinct" |
| ~240 (15rem cap, ~166) | `.seg-light .chapter-title` 11.5vw | Home Manifesto wordmark |
| 224 (14rem) | `--t-mega` | (defined, effectively unused) |
| 136 (8.5rem) | `--t-display-big` | (defined, unused) |
| 112 (7rem) | `--t-display` | Offerings hub `.page-hero h1`, Gallery `.page-hero h1` |
| 112 (7rem) | `.oma-hero h1` 6.4vw | 4 tier pages hero |
| 112 (7rem) | `.concierge .concierge-headline` 5.5vw | Concierge PAGE hero |
| 112 (7rem) | `--t-step-5` | Offering/Inquire `.closing-title` |
| 96 (6rem) | `.cinema-chrome` base | (root base, rarely surfaced) |
| ~112 (7rem) | `.oma-close-track` 8vw | Footer marquee wordmark |

### Section headline (H2)
| px | Token / rule | Where |
|---|---|---|
| 93 (6.4rem) | `.oma-fmt3-title` | Tier pages "Overview" headline |
| ~93 (5.8rem cap, ~74) | `--seg-h` | Home segments + FAQ + Proof + Built-to-scale |
| 86 (5.4rem) | `--t-step-4` | (legacy, now folded into seg-h) |
| 74 (4.6rem) | `.story-close-statement` | My Story closing |
| 72 (4.5rem) | `--t-3xl` / `.legal-head h1` | Legal H1 (×5), My Story `.display-heading` |
| ~70 (4.4rem) | `.story-cover-name`, `.oma-ledger h2` | My Story cover, tier ledger H2 |
| 66 (4.6rem) | `.oma-panel-h` | Tier pages panel headlines |
| 86 (5.4rem) | `.pp-card-name` | Profiler result name |
| 96 (6rem) | `--t-4xl` | (defined, rare) |
| 36 (2.25rem) | `.va-list` | Nav overlay menu items |

### Sub-headline (H3)
| px | Token / rule | Where |
|---|---|---|
| 58 (3.6rem) | `.oma-fmt3-pull` | Tier overview pull-quote |
| 54 (3.4rem) | `.rd-title` | Gallery recipe drawer title |
| 45 (2.8rem) | `--t-2xl` / `.pp-alchemy-title` | Profiler heading |
| 32 (2rem) | `--t-xl` | styles scale |
| 27 (1.7rem) | `.oma-ledger-row .nm` | Tier ledger names |
| 25 (1.55rem) | `.concierge-index b` | Concierge enhancement names |
| 24 (1.5rem) | `.oma-step-body h3` | Tier "what's included" steps |
| 23 (1.45rem) | `--t-lg`, `.pp-card-tag` | leads/tags |
| 20 (1.25rem) | `.tier-card h3` | Offerings hub tier cards |

### Lead (intro paragraph)
| px | Token / rule | Where |
|---|---|---|
| 32 (2rem) | `--t-step-2` | Home chapter lead |
| 23 (1.45rem) | `.concierge-lead` (page), `--t-lg` | Concierge intro |
| 21 (1.3rem) | `--t-step-1`, `.oma-hero .lead` | leads |
| 18-19 (1.15-1.2rem) | `.oma-seg-lead`, `.oma-panel-intro`, `.oma-ledger-desc` | tier body-leads |

### Body
| px | Token / rule | Where |
|---|---|---|
| 17-18 (1.1rem) | `--t-step-0`, `--t-base` | base body |
| 16-18 (.98-1.12rem) | `.founder-bio`, `.oma-note p` | bios, notes |
| 15-18 (.95-1.1rem) | `.legal-body p`, `.faq-a p` | legal + FAQ answers |

### Caption / eyebrow / meta (mono)
| px | Token / rule | Where |
|---|---|---|
| 15 (.95rem) | `--t-sm` | small text |
| 13-15 (.82-.92rem) | `--t-xs`, `--t-step--1` | captions |
| 12-12.5 (.74-.78rem) | `--t-step--2`, `.oma-close-nav`, `.va-foot` | eyebrows, footer nav |
| 10-11.5 (.62-.72rem) | various eyebrows, `.oma-close-base`, specs | micro labels |

---

## 2. PROPOSED STANDARD - one scale, 9 roles

| Role | New token | Desktop px (rem) | Mobile floor | Font |
|---|---|---|---|---|
| **Display 1** | `--t-hero` | ~173 (16rem cap) | 3rem | Geist 700 + Fraunces it |
| **Display 2** | `--t-hero-2` | ~166 (15rem cap) | 3rem | Geist 700 + Fraunces it |
| **H1 (page hero)** | `--t-h1` | 112 (7rem) | 2.6rem | Geist 700 |
| **H2 (section)** | `--t-h2` (= `--seg-h`) | 74 (5.8rem) | 2.8rem | Geist 700 + Fraunces it |
| **H3 (sub)** | `--t-h3` | ~30 (1.9rem) | 1.2rem | Geist 600 |
| **Lead** | `--t-lead` | ~22 (1.4rem) | 1.05rem | Inter 300 |
| **Body** | `--t-body` | ~17 (1.1rem) | 1rem | Inter 300/400 |
| **Eyebrow / caption** | `--t-eyebrow` | ~12 (0.75rem) | 0.66rem | JetBrains Mono, uppercase |
| **Micro** | `--t-micro` | ~10.5 (0.66rem) | 0.6rem | JetBrains Mono, uppercase |

Hierarchy in one line: **173 / 166 / 112 / 74 / 30 / 22 / 17 / 12 / 10.5**.

---

## 3. PER-PAGE REMAP (current -> standard)

| Page | Element | Now | -> Role |
|---|---|---|---|
| Home | hero wordmark | 173 | Display 1 (keep) |
| Home | manifesto wordmark | 166 | Display 2 (keep) |
| Home | all segment H2 | 74 | H2 (keep) |
| Home | tier-card title | 68 | **H3 (30)** ↓ |
| Offerings hub | page-hero h1 | 112 | H1 (keep) |
| Offerings hub | tier-card title | ~20 | H3 (30) ↑ |
| Tier pages | hero h1 | 112 | H1 (keep) |
| Tier pages | overview title (fmt3) | 93 | **H2 (74)** ↓ |
| Tier pages | panel-h / ledger h2 | 66 / 60 | **H2 (74)** ↑ |
| Tier pages | step h3 / ledger nm | 24 / 27 | H3 (30) |
| Tier pages | closing-title | 112 | **H2 (74)** ↓ (match home closing) |
| Concierge page | headline | 112 | H1 (keep) |
| My Story | cover-name | 70 | **H1 (112)** ↑ (it is the page hero) |
| My Story | display-heading / close | 72 / 74 | H2 (74) |
| Gallery | page-hero h1 | 112 | H1 (keep) |
| Gallery | rd-title (drawer) | 54 | **H3 (30)** ↓ or keep mid |
| Inquire | closing-title (card) | 74 | H2 (keep, in card) |
| Legal ×5 | h1 | 72 | **H2 (74)** (document heading) or H1 (112) - DECIDE |
| Legal ×5 | h2 | ~24 | H3 (30) |
| Profiler | card-name | 86 | H2 (74) |
| All | leads | mixed 18-32 | Lead (22) |
| All | body | mixed 15-18 | Body (17) |
| All | eyebrows/meta | mixed 10-15 | Eyebrow (12) / Micro (10.5) |

↑ = grows, ↓ = shrinks to hit the standard.

---

## 4. DECISIONS - LOCKED (owner approved 2026-06-08)

**Package A (Cinematic, ratio ~1.5) chosen and shipped.** Owner reviewed live, accepted; Package B not needed.

Active tokens (in `accent.css`):
- `--t-hero`   = `clamp(3rem, 12vw, 16rem)`   (~173) - Home hero only
- `--t-hero-2` = `clamp(3rem, 11.5vw, 15rem)` (~166) - Manifesto only
- `--t-h1`     = `clamp(3rem, 6.6vw, 7rem)`    (~112) - every inner-page hero
- `--t-h2`     = `clamp(2.8rem, 1.95rem + 5vmin, 5.8rem)` (~74) - every section headline (`--seg-h` aliases this)

Resolved choices:
1. Legal H1 = **H2 (74)** - document-modest. ✅
2. Tier overview title (was 93) -> **74**. ✅
3. Closing/CTA titles on tier + inquire -> **74** (match home). ✅
4. My Story cover-name -> **H1 (112)**. ✅
5. H3 / lead / body / eyebrow: **left as-is for now** (A/B was about heading proportions; fine-grain H3 unification is an optional follow-up).

To change the whole-site heading scale later: edit the 4 token values in `accent.css` (Package B values sit commented there as a ready alternative).
