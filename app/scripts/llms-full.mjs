// llms-full.txt generator. Runs AFTER scripts/prerender.mjs.
//
// Walks every prerendered dist/**/index.html, extracts the meaningful text
// (headings kept as markdown, nav/footer chrome and scripts dropped), and
// writes dist/llms-full.txt: the whole site as one plain-text file for AI
// engines that follow the llms.txt convention. public/llms.txt stays the
// curated facts file; this is the full-text companion it links to.
//
// Zero dependencies beyond node builtins.
// Usage: node scripts/llms-full.mjs [distDir]   (default: ../dist)

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');
const DIST = process.argv[2] ? resolve(process.argv[2]) : resolve(APP, 'dist');
const SITE = 'https://www.iceinstinct.com';

if (!existsSync(DIST)) {
  console.error(`llms-full: dist dir not found: ${DIST} - run the build first`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Collect every index.html under dist (root + one per route).
// ---------------------------------------------------------------------------

function findIndexHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      // Skip build internals; pages live in plain route directories.
      if (name === 'assets' || name === 'assets-build' || name === 'node_modules') continue;
      findIndexHtml(full, out);
    } else if (name === 'index.html') {
      out.push(full);
    }
  }
  return out;
}

const files = findIndexHtml(DIST).sort((a, b) => {
  // Root page first, then alphabetical by path for a stable order.
  const ra = relative(DIST, a);
  const rb = relative(DIST, b);
  if (ra === 'index.html') return -1;
  if (rb === 'index.html') return 1;
  return ra < rb ? -1 : 1;
});

if (files.length === 0) {
  console.error(`llms-full: no index.html files found under ${DIST}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// HTML -> plain text with markdown headings
// ---------------------------------------------------------------------------

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// Strip tags + entities from an inline fragment, collapse to one line.
function inlineText(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// Elements marked aria-hidden="true" are explicitly not meaningful content
// (menu overlay, pager dots, decorative numbers). Remove them with a balanced
// open/close walk because they nest same-name tags (div inside div).
const VOID_TAGS = new Set(['img', 'br', 'hr', 'input', 'source', 'track', 'wbr', 'area', 'col', 'embed', 'meta', 'link']);

function stripAriaHidden(s) {
  const openRe = /<([a-z][a-z0-9]*)\b[^>]*\baria-hidden=["']true["'][^>]*>/i;
  let m;
  while ((m = openRe.exec(s)) !== null) {
    const tag = m[1].toLowerCase();
    const start = m.index;
    const afterOpen = start + m[0].length;
    if (m[0].endsWith('/>') || VOID_TAGS.has(tag)) {
      s = s.slice(0, start) + ' ' + s.slice(afterOpen);
      continue;
    }
    const tokenRe = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'gi');
    tokenRe.lastIndex = afterOpen;
    let depth = 1;
    let end = -1;
    let t;
    while ((t = tokenRe.exec(s)) !== null) {
      if (t[0][1] === '/') depth--;
      else if (!t[0].endsWith('/>')) depth++;
      if (depth === 0) {
        end = t.index + t[0].length;
        break;
      }
    }
    if (end === -1) {
      // Unbalanced markup: drop only the opening tag rather than eat the page.
      s = s.slice(0, start) + ' ' + s.slice(afterOpen);
    } else {
      s = s.slice(0, start) + ' ' + s.slice(end);
    }
  }
  return s;
}

function extractText(html) {
  let s = html;
  const body = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (body) s = body[1];

  // Drop non-content blocks entirely.
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<(script|style|noscript|svg|template)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  s = stripAriaHidden(s);
  // Site chrome repeated on every page: navigation menus and the footer.
  s = s.replace(/<(nav|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');

  // Headings -> markdown, demoted one level so the page title stays the only
  // level-2 heading in each section of the output file.
  s = s.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lvl, inner) => {
    const text = inlineText(inner);
    if (!text) return '\n';
    const hashes = '#'.repeat(Math.min(6, Number(lvl) + 2));
    return `\n\n${hashes} ${text}\n\n`;
  });

  // List items and basic block structure -> line breaks.
  s = s.replace(/<li\b[^>]*>/gi, '\n- ');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|section|article|main|aside|ul|ol|li|tr|table|thead|tbody|blockquote|figure|figcaption|dl|dt|dd|form|fieldset|label|button|a)>/gi, '$&\n');

  // Strip everything else, decode, normalize whitespace.
  s = decodeEntities(s.replace(/<[^>]+>/g, ' '));
  const lines = s
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line, i, arr) => line !== '' || (i > 0 && arr[i - 1] !== ''));
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ---------------------------------------------------------------------------
// Assemble llms-full.txt
// ---------------------------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);
const sections = [
  '# Ice & Instinct - full site text',
  '',
  `> Plain-text rendering of every page on ${SITE}/ for AI engines. Curated facts (prices, policies, contact) live in ${SITE}/llms.txt; this file carries the full page copy. Generated from the prerendered HTML at build time. Last updated: ${today}.`,
];

let pages = 0;
for (const file of files) {
  const rel = relative(DIST, file);
  const dir = dirname(rel);
  const url = dir === '.' ? `${SITE}/` : `${SITE}/${dir.split(sep).join('/')}/`;

  const html = readFileSync(file, 'utf8');
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? inlineText(titleMatch[1]) : url;
  const text = extractText(html);

  sections.push('', '---', '', `## ${title}`, `URL: ${url}`, '', text);
  pages++;
}

const out = sections.join('\n') + '\n';
writeFileSync(join(DIST, 'llms-full.txt'), out, 'utf8');
console.log(`llms-full: wrote ${relative(APP, join(DIST, 'llms-full.txt'))} (${pages} pages, ${(out.length / 1024).toFixed(1)} KB)`);
