# S1 - SEO/GEO Foundation (prerender + head + crawler files) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development executes this. Sub-skill for implementers: superpowers:test-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** Every one of the 12 routes ships crawlable rendered HTML body + complete per-page `<head>` (title, description, canonical, Open Graph, Twitter, JSON-LD) + the crawler files (robots.txt, sitemap.xml, llms.txt, favicon, 404), matching or beating the vanilla site's SEO/GEO.

**Architecture:** The app is a pure Vite MPA (12 `index.html` entries, each with `main-*.tsx` doing `createRoot(<Page/>)`, no router). All `window`/`document` access is inside `useEffect`/handlers, so page components are SSR-safe with `react-dom/server`. Approach: (1) a per-route SEO data module + head-injection; (2) a Vite SSR build of a server entry that renders each Page to static HTML; (3) a post-build Node script that injects the rendered markup into each `dist/<route>/index.html` `#root` and writes the head tags; (4) crawler/static files via `app/public/` so Vite copies them to `dist/`.

**Tech Stack:** React 19 + react-dom/server, Vite SSR build, Node post-build script (ESM), TypeScript.

**Working dir:** `/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site` (branch `react-shell`). Source of truth for old SEO/JSON-LD = `_legacy-vanilla/`.

**No test framework exists.** "Tests" = deterministic build-output assertions run via Node/grep on `dist/`, plus the standing 360px overflow sweep. Each task: implement -> assert on dist -> commit.

**Route -> entry -> Page -> URL map:**
| Route URL | dist html | Page component | entry |
|---|---|---|---|
| `/` | `index.html` | `Home` (`src/Home.tsx`) | `main-home.tsx` |
| `/offerings/` | `offerings/index.html` | `Offerings` | `main-offerings.tsx` |
| `/offerings/foundation/` | `offerings/foundation/index.html` | `Foundation` | `main-foundation.tsx` |
| `/offerings/simplicity/` | `offerings/simplicity/index.html` | `Simplicity` | `main-simplicity.tsx` |
| `/offerings/bespoke/` | `offerings/bespoke/index.html` | `Bespoke` | `main-bespoke.tsx` |
| `/offerings/omakase/` | `offerings/omakase/index.html` | `Omakase` | `main-omakase.tsx` |
| `/concierge/` | `concierge/index.html` | `ConciergePage` | `main-concierge.tsx` |
| `/my-story/` | `my-story/index.html` | `MyStory` | `main-mystory.tsx` |
| `/gallery/` | `gallery/index.html` | `GalleryPage` | `main-gallery.tsx` |
| `/contact/` | `contact/index.html` | `Contact` | `main-contact.tsx` |
| `/privacy/` | `privacy/index.html` | `Privacy` | `main-privacy.tsx` |
| `/terms/` | `terms/index.html` | `Terms` | `main-terms.tsx` |

---

## Task S1.1: Crawler + static files into the build

**Files:**
- Create: `app/public/robots.txt`, `app/public/sitemap.xml`, `app/public/llms.txt`, `app/public/404.html`
- Verify/move: `app/public/favicon.svg`
- Source: `_legacy-vanilla/robots.txt`, `_legacy-vanilla/sitemap.xml`, `_legacy-vanilla/llms.txt`, `assets/favicon.svg`

- [ ] **Step 1** Copy the vanilla `_legacy-vanilla/robots.txt`, `sitemap.xml`, `llms.txt` into `app/public/`. Update any absolute paths/URLs to the canonical `https://www.iceinstinct.com` and confirm sitemap lists exactly the 12 route URLs above (trailing slashes matching the table). Keep the 15 AI-crawler allowlist in robots.txt intact.
- [ ] **Step 2** Ensure `app/public/favicon.svg` exists (copy from `assets/favicon.svg` if missing); confirm each `index.html` links it.
- [ ] **Step 3** Create `app/public/404.html`: a minimal on-brand dark page (monochrome, links home), no build dependency.
- [ ] **Step 4 (verify)** `cd app && npm run build`; assert files exist in dist:
  ```bash
  for f in robots.txt sitemap.xml llms.txt favicon.svg 404.html; do test -f app/dist/$f && echo "OK $f" || echo "MISSING $f"; done
  ```
  Expected: all OK. Assert sitemap has 12 `<loc>`: `grep -c "<loc>" app/dist/sitemap.xml` -> `12`.
- [ ] **Step 5 (commit)** `git add app/public && git commit -m "feat(seo): ship robots, sitemap, llms.txt, favicon, 404 in the build"`

**Acceptance:** dist contains robots/sitemap/llms/favicon/404; sitemap = 12 URLs; no em/en dashes.

---

## Task S1.2: Per-route SEO metadata module

**Files:**
- Create: `app/src/seo/seoData.ts` (exported `SEO_BY_ROUTE: Record<string, RouteSeo>` + `RouteSeo` type)
- Create: `app/src/seo/jsonld.ts` (builders returning JSON-LD objects)
- Source of truth for copy/schemas: `_legacy-vanilla/*/index.html` (read its `<title>`, meta description, JSON-LD)

- [ ] **Step 1** Define `RouteSeo` = `{ title: string; description: string; canonical: string; ogTitle: string; ogDescription: string; ogImage: string; jsonLd: object[] }`.
- [ ] **Step 2** Populate `SEO_BY_ROUTE` for all 12 routes, keyed by route URL from the map. Pull title + description from the matching `_legacy-vanilla` page; canonical = `https://www.iceinstinct.com<route>`; ogImage = a real existing asset (e.g. `/assets/photos/<hero>.jpg`). No em/en dashes.
- [ ] **Step 3** In `jsonld.ts`, port vanilla JSON-LD: `Organization` (home), `ItemList` of the 12 cocktails (gallery, names from `CLAUDE.md`/legacy), `Service`+`Offer` per offering tier (price/guests/hours from `CLAUDE.md` tier table), `Person` (my-story, Teimuraz Benidze, Founder & Flavor Architect). Wire each into the right route's `jsonLd`.
- [ ] **Step 4 (verify)** Add a temporary Node check (or `tsc --noEmit`) ensuring every one of the 12 route keys is present and each has non-empty title/description/canonical and >=0 jsonLd; home/gallery/tiers/my-story have >=1 jsonLd. Run `cd app && npx tsc --noEmit` -> clean.
- [ ] **Step 5 (commit)** `git add app/src/seo && git commit -m "feat(seo): per-route metadata + JSON-LD ported from vanilla"`

**Acceptance:** `SEO_BY_ROUTE` covers all 12 routes; JSON-LD ported for home/gallery/offerings/my-story; typechecks.

---

## Task S1.3: SSR server entry + prerender/inject script wired into build

**Files:**
- Create: `app/src/entry-server.tsx` (exports `renderRoute(route: string): string` using `react-dom/server` `renderToString`, mapping route -> Page component)
- Create: `app/scripts/prerender.mjs` (Node post-build: vite SSR-build the server entry, then for each route render + inject body into `dist/<html>` `#root` and inject `<head>` tags from `SEO_BY_ROUTE`)
- Modify: `app/package.json` (`build` script -> client build then `node scripts/prerender.mjs`)
- Modify: `app/vite.config.ts` if an SSR build config is needed

- [ ] **Step 1** `entry-server.tsx`: import all 12 Page components, export `renderRoute(route)` returning `renderToString(<Page/>)`; throw on unknown route. Do NOT import `main-*.tsx` (those call createRoot). CSS imports inside components are fine (Vite SSR externalizes/strips).
- [ ] **Step 2** `prerender.mjs`: (a) build the SSR bundle of `entry-server.tsx` via Vite's JS API (`build({ ssr: 'src/entry-server.tsx', ... })`) or `import` of a pre-built ssr output; (b) for each route in the map, `const html = renderRoute(route)`; (c) read `dist/<html>`, replace `<div id="root"></div>` with `<div id="root">${html}</div>`; (d) inject into `<head>` (before `</head>`): `<title>`, `<meta name=description>`, `<link rel=canonical>`, OG + Twitter tags, and `<script type=application/ld+json>` per jsonLd entry - from `SEO_BY_ROUTE`. De-dupe the existing `<title>` if Vite injected one.
- [ ] **Step 3** Update `package.json` `build`: `"build": "tsc --noEmit && vite build && node scripts/prerender.mjs"`.
- [ ] **Step 4 (verify)** `cd app && npm run build`; assert every route now has body text + head tags:
  ```bash
  node -e "const fs=require('fs');const R=['index.html','offerings/index.html','offerings/foundation/index.html','offerings/simplicity/index.html','offerings/bespoke/index.html','offerings/omakase/index.html','concierge/index.html','my-story/index.html','gallery/index.html','contact/index.html','privacy/index.html','terms/index.html'];let bad=[];for(const f of R){const s=fs.readFileSync('dist/'+f,'utf8');const body=(s.match(/<body[^>]*>([\s\S]*?)<\/body>/)||[])[1]||'';const txt=body.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();const head=(s.match(/<head[^>]*>([\s\S]*?)<\/head>/)||[])[1]||'';const ok=txt.length>300 && /name=.description/.test(head) && /rel=.canonical/.test(head) && /og:title/.test(head);if(!ok)bad.push(f+' textLen='+txt.length);}console.log(bad.length?('FAIL '+bad.join('; ')):'OK all 12 routes prerendered + head');"
  ```
  Expected: `OK all 12 routes prerendered + head`.
- [ ] **Step 5 (verify hydration)** Start dev/preview, load 3 routes in the mobile-emulated browser, check console: no hydration mismatch errors, page interactive (menu opens). (Client uses createRoot which replaces #root; acceptable - if hydration warnings appear, switch client to `hydrateRoot` in a follow-up step within this task.)
- [ ] **Step 6 (verify no regression)** Run the standing 360px overflow sweep -> all 0.
- [ ] **Step 7 (commit)** `git add app/src/entry-server.tsx app/scripts/prerender.mjs app/package.json app/vite.config.ts && git commit -m "feat(seo): build-time prerender of all 12 routes + head injection"`

**Acceptance:** every route's dist HTML has >300 chars body text + description + canonical + og:title + JSON-LD where defined; build is one command; no overflow regression; no hydration errors (or hydrateRoot adopted).

---

## Task S1.4: Full SEO verification pass

**Files:** none (verification only) + fix-forward if any assertion fails.

- [ ] **Step 1** Re-run the Task S1.3 Step 4 assertion -> OK.
- [ ] **Step 2** Re-run Task S1.1 Step 4 file + sitemap assertions -> OK.
- [ ] **Step 3** Lighthouse SEO audit (chrome-devtools) on `/` and `/gallery/` from the preview build -> SEO score >= 90; no "document does not have a meta description" / "links not crawlable" failures.
- [ ] **Step 4** Confirm canonical host + trailing slashes match the route map exactly (no `/index.html` leaks in canonical/sitemap).
- [ ] **Step 5 (commit if fixes)** commit any fixes with `fix(seo): ...`.

**Acceptance:** Lighthouse SEO >= 90 on sampled routes; all S1 gate items in the master plan green.

---

## Self-Review

- **Spec coverage (vs master S1):** prerendered body (S1.3), per-page head + JSON-LD (S1.2+S1.3), robots/sitemap/llms/favicon/404 (S1.1), verification + Lighthouse (S1.4). All S1 acceptance items mapped.
- **No placeholders:** each task has concrete files, approach, and a runnable assertion. Implementation detail of the SSR build is delegated to the implementer subagent (capable, TDD) with this spec + the researched SSR-safety facts; that is intentional, not a gap.
- **Consistency:** route map (URL/html/component/entry) is the single shared reference used by S1.2 (canonical), S1.3 (entry + inject), and S1.4 (assert). `RouteSeo` field names are fixed in S1.2 and consumed verbatim in S1.3.
- **Risk:** SSR CSS handling + hydration are the only unknowns; S1.3 Step 5 explicitly checks hydration and names the `hydrateRoot` fallback.
