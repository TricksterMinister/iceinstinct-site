// Build-time prerender. Runs AFTER `vite build`.
//
// 1. Builds an SSR bundle of src/entry-server.tsx (Vite JS API).
// 2. Imports renderRoute + SEO_BY_ROUTE from that bundle.
// 3. For each of the 12 routes: renders the Page to HTML, injects it into the
//    matching dist/<...>/index.html (#root), and injects SEO into <head>.
// 4. Removes the temporary dist-ssr dir.
//
// The client still uses createRoot (NOT hydrateRoot): on load it replaces the
// prerendered #root content. Crawlers and first paint get real HTML; GSAP/lenis
// DOM mutation cannot cause a hydration mismatch because there is no hydration.

import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');
const r = (...p) => resolve(APP, ...p);

// route key -> dist html file (relative to dist/)
const ROUTE_TO_HTML = {
  '/': 'index.html',
  '/offerings/': 'offerings/index.html',
  '/offerings/foundation/': 'offerings/foundation/index.html',
  '/offerings/simplicity/': 'offerings/simplicity/index.html',
  '/offerings/bespoke/': 'offerings/bespoke/index.html',
  '/offerings/omakase/': 'offerings/omakase/index.html',
  '/concierge/': 'concierge/index.html',
  '/my-story/': 'my-story/index.html',
  '/weddings/': 'weddings/index.html',
  '/corporate/': 'corporate/index.html',
  '/gift/': 'gift/index.html',
  '/new-jersey/': 'new-jersey/index.html',
  '/manhattan/': 'manhattan/index.html',
  '/hamptons/': 'hamptons/index.html',
  '/westchester-greenwich/': 'westchester-greenwich/index.html',
  '/journal/': 'journal/index.html',
  '/journal/cocktail-omakase-explained/': 'journal/cocktail-omakase-explained/index.html',
  '/journal/clear-ice-why-it-matters/': 'journal/clear-ice-why-it-matters/index.html',
  '/journal/cigar-and-cocktail-pairing/': 'journal/cigar-and-cocktail-pairing/index.html',
  '/press/': 'press/index.html',
  '/events/': 'events/index.html',
  '/gallery/': 'gallery/index.html',
  '/contact/': 'contact/index.html',
  '/privacy/': 'privacy/index.html',
  '/terms/': 'terms/index.html',
  '/cookies/': 'cookies/index.html',
  '/accessibility/': 'accessibility/index.html',
  '/responsible-service/': 'responsible-service/index.html',
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Derive absolute origin from a canonical URL like https://www.iceinstinct.com/
function originOf(canonical) {
  try {
    const u = new URL(canonical);
    return `${u.protocol}//${u.host}`;
  } catch {
    return '';
  }
}

function buildHead(seo, hasExistingJsonLd) {
  const origin = originOf(seo.canonical);
  const absImage = seo.ogImage.startsWith('http')
    ? seo.ogImage
    : origin + seo.ogImage;

  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}">`,
    `<link rel="canonical" href="${esc(seo.canonical)}">`,
    `<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2">`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2">`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">`,
    `<meta property="og:title" content="${esc(seo.ogTitle)}">`,
    `<meta property="og:description" content="${esc(seo.ogDescription)}">`,
    `<meta property="og:image" content="${esc(absImage)}">`,
    `<meta property="og:url" content="${esc(seo.canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(seo.ogTitle)}">`,
    `<meta name="twitter:description" content="${esc(seo.ogDescription)}">`,
    `<meta name="twitter:image" content="${esc(absImage)}">`,
  ];

  // Only emit SEO_BY_ROUTE JSON-LD when the source HTML did NOT already carry
  // hand-authored JSON-LD. Several source files ship a richer schema block; we
  // preserve it rather than overwrite with the leaner SEO_BY_ROUTE version.
  if (!hasExistingJsonLd) {
    for (const obj of seo.jsonLd || []) {
      // JSON-LD does not need HTML-escaping inside a script element; only guard
      // against a literal </script> sequence breaking out of the element.
      const json = JSON.stringify(obj).replace(/<\//g, '<\\/');
      tags.push(`<script type="application/ld+json">${json}</script>`);
    }
  }

  return tags.join('\n  ');
}

// Strip head tags that we are about to (re)write so SEO_BY_ROUTE is the single
// source of truth and we never produce duplicates. JSON-LD scripts are left
// intact on purpose (handled separately in buildHead).
function stripManagedHeadTags(head) {
  return head
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    // Managed <meta> tags: match regardless of attribute order. The lookahead
    // requires the tag to carry name="description" / og:* / twitter:* (via
    // either name= or property=), then consumes the whole tag.
    .replace(
      /<meta\b(?=[^>]*\b(?:name|property)=["'](?:description|og:[\w:]+|twitter:[\w:]+)["'])[^>]*>\s*/gi,
      '',
    )
    // Managed <link> tags: canonical, icon, or apple-touch-icon; attribute
    // order independent. buildHead re-injects these as the single source of
    // truth, so stripping apple-touch-icon too prevents duplicates when the
    // source template already carries it (for dev-server parity).
    .replace(
      /<link\b(?=[^>]*\brel=["'](?:canonical|icon|apple-touch-icon)["'])[^>]*>\s*/gi,
      '',
    );
}

function injectHead(html, seo) {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) throw new Error('prerender: no <head> found');
  const head = headMatch[1];

  const hasExistingJsonLd = /type=["']application\/ld\+json["']/i.test(head);
  const cleanedHead = stripManagedHeadTags(head);
  const headBlock = buildHead(seo, hasExistingJsonLd);

  const newHead = `${cleanedHead.replace(/\s*$/, '')}\n  ${headBlock}\n`;
  // Use a REPLACER FUNCTION so the dynamic content (URLs, JSON-LD, descriptions)
  // is inserted literally. A replacement STRING would interpret `$&`, `$1`,
  // `$\`` etc. inside the content and corrupt the output.
  return html.replace(
    /<head[^>]*>[\s\S]*?<\/head>/i,
    () => `<head>${newHead}</head>`,
  );
}

function injectRoot(html, appHtml) {
  // Match the root div produced by Vite. Tolerate attribute order, whitespace,
  // and comments inside the open form, plus the self-closing form.
  const open = /<div\s+id="root"[^>]*>[\s\S]*?<\/div>/i;
  const selfClosing = /<div\s+id="root"[^>]*\/>/i;
  // Replacer functions keep appHtml literal (no $-substitution corruption).
  if (open.test(html)) {
    return html.replace(
      open,
      () => `<div id="root" data-prerendered="1">${appHtml}</div>`,
    );
  }
  if (selfClosing.test(html)) {
    return html.replace(
      selfClosing,
      () => `<div id="root" data-prerendered="1">${appHtml}</div>`,
    );
  }
  // Neither form found: fail loud.
  throw new Error('prerender: could not find <div id="root">');
}

// True when the dist html was already prerendered: either the marker attribute
// is present, or #root already holds non-whitespace children. Guards against a
// stray re-run double-injecting content.
function alreadyPrerendered(html) {
  if (/<div\s+id="root"[^>]*\bdata-prerendered=/i.test(html)) return true;
  const m = html.match(/<div\s+id="root"[^>]*>([\s\S]*?)<\/div>/i);
  if (m && m[1].trim() !== '') return true;
  return false;
}

async function main() {
  // 1. SSR build of the entry-server module.
  await build({
    root: APP,
    logLevel: 'warn',
    plugins: [react()],
    resolve: { dedupe: ['react', 'react-dom'] },
    build: {
      ssr: r('src/entry-server.tsx'),
      outDir: 'dist-ssr',
      emptyOutDir: true,
      rollupOptions: {},
    },
  });

  // 2. Import the emitted bundle.
  const mod = await import(pathToFileURL(r('dist-ssr/entry-server.js')).href);
  const { renderRoute, SEO_BY_ROUTE } = mod;

  // 3. Prerender each route.
  let count = 0;
  for (const [route, htmlRel] of Object.entries(ROUTE_TO_HTML)) {
    const seo = SEO_BY_ROUTE[route];
    if (!seo) throw new Error(`prerender: no SEO data for route "${route}"`);

    const appHtml = renderRoute(route);
    const file = r('dist', htmlRel);
    let html = readFileSync(file, 'utf8');
    if (alreadyPrerendered(html)) {
      console.log(`  skipped (already prerendered) ${route} -> dist/${htmlRel}`);
      continue;
    }
    html = injectRoot(html, appHtml);
    html = injectHead(html, seo);
    writeFileSync(file, html, 'utf8');
    count++;
    console.log(`  prerendered ${route} -> dist/${htmlRel}`);
  }

  // 4. Clean up the temp SSR bundle.
  rmSync(r('dist-ssr'), { recursive: true, force: true });

  console.log(`prerender: ${count} routes done`);
}

main().catch((err) => {
  console.error('prerender failed:', err);
  process.exit(1);
});
