// llms.txt drift guard. Runs BEFORE `vite build`.
//
// src/seo/jsonld.ts is the single source of truth for tier prices and the
// deposit amount (it feeds the JSON-LD on every prerendered page). public/
// llms.txt is the hand-edited AI-facts file that ships verbatim to the site
// root. The two MUST agree: an AI engine quoting a stale llms.txt price is a
// direct revenue bug. This script parses jsonld.ts with plain regex (no ts
// compile), checks llms.txt against it, and fails the build on any drift.
//
// Zero dependencies beyond node builtins.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');

const JSONLD_PATH = resolve(APP, 'src/seo/jsonld.ts');
const LLMS_PATH = resolve(APP, 'public/llms.txt');

const fmt = (n) => '$' + n.toLocaleString('en-US');
const toNum = (s) => parseInt(String(s).replace(/,/g, ''), 10);

// ---------------------------------------------------------------------------
// 1. Parse src/seo/jsonld.ts
// ---------------------------------------------------------------------------

const jsonldSrc = readFileSync(JSONLD_PATH, 'utf8');

// The TIERS literal: from `const TIERS` to the first `\n};`.
const tiersMatch = jsonldSrc.match(/const TIERS[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!tiersMatch) {
  console.error('verify-llms: could not locate the TIERS object in src/seo/jsonld.ts');
  process.exit(1);
}

// Each tier entry: key, name, price. Entries contain no nested braces.
const tiers = [];
const entryRe = /([a-zA-Z]+):\s*\{[^}]*?name:\s*"([^"]+)"[^}]*?price:\s*(\d+)/g;
let m;
while ((m = entryRe.exec(tiersMatch[1])) !== null) {
  tiers.push({ key: m[1], name: m[2], price: Number(m[3]) });
}
if (tiers.length === 0) {
  console.error('verify-llms: parsed 0 tiers from the TIERS object - the file shape changed, update this script');
  process.exit(1);
}

// Deposit amount, from the FAQ answer text ("A flat $500 deposit ...").
const depositMatches = [...jsonldSrc.matchAll(/\$([\d,]+) deposit/gi)].map((d) => toNum(d[1]));
if (depositMatches.length === 0) {
  console.error('verify-llms: could not find a "$N deposit" amount in src/seo/jsonld.ts');
  process.exit(1);
}
const deposit = depositMatches[0];
if (depositMatches.some((d) => d !== deposit)) {
  console.error(
    `verify-llms: src/seo/jsonld.ts itself is inconsistent - deposit amounts found: ${depositMatches.map(fmt).join(', ')}`,
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Check public/llms.txt against the parsed facts
// ---------------------------------------------------------------------------

const llms = readFileSync(LLMS_PATH, 'utf8');
const llmsLines = llms.split('\n');
const mismatches = [];

// Each tier: every llms.txt line that names the tier AND carries a
// "from $N" price must carry the jsonld price.
for (const t of tiers) {
  const expected = fmt(t.price);
  const namedLines = llmsLines.filter((line) => line.includes(t.name));
  if (namedLines.length === 0) {
    mismatches.push(`${t.name}: tier not mentioned anywhere in llms.txt`);
    continue;
  }
  const pricedLines = namedLines
    .map((line) => ({ line, price: line.match(/from \$([\d,]+)/) }))
    .filter((x) => x.price !== null);
  if (pricedLines.length === 0) {
    mismatches.push(`${t.name}: no "from $N" priced line found in llms.txt (expected ${expected})`);
    continue;
  }
  for (const { line, price } of pricedLines) {
    if (toNum(price[1]) !== t.price) {
      mismatches.push(
        `${t.name}: jsonld.ts says ${expected}, llms.txt says $${price[1]} (line: "${line.trim()}")`,
      );
    }
  }
}

// The summary range ("four tiers from $650 to $3,000+") must match min/max.
const minPrice = Math.min(...tiers.map((t) => t.price));
const maxPrice = Math.max(...tiers.map((t) => t.price));
const range = llms.match(/from \$([\d,]+) to \$([\d,]+)\+/);
if (range) {
  if (toNum(range[1]) !== minPrice) {
    mismatches.push(`price range: jsonld.ts min tier is ${fmt(minPrice)}, llms.txt range starts at $${range[1]}`);
  }
  if (toNum(range[2]) !== maxPrice) {
    mismatches.push(`price range: jsonld.ts max tier is ${fmt(maxPrice)}, llms.txt range ends at $${range[2]}+`);
  }
}

// Deposit: every "$N deposit" mention in llms.txt must equal the jsonld amount.
const llmsDeposits = [...llms.matchAll(/\$([\d,]+) deposit/gi)].map((d) => toNum(d[1]));
if (llmsDeposits.length === 0) {
  mismatches.push(`deposit: jsonld.ts says ${fmt(deposit)} deposit, llms.txt never mentions a "$N deposit"`);
} else {
  for (const d of llmsDeposits) {
    if (d !== deposit) {
      mismatches.push(`deposit: jsonld.ts says ${fmt(deposit)}, llms.txt says ${fmt(d)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Verdict
// ---------------------------------------------------------------------------

if (mismatches.length > 0) {
  console.error('verify-llms: DRIFT DETECTED - public/llms.txt no longer matches src/seo/jsonld.ts:');
  for (const msg of mismatches) {
    console.error(`  - ${msg}`);
  }
  console.error('Fix public/llms.txt (or jsonld.ts, if the price really changed), then rebuild.');
  process.exit(1);
}

console.log(
  `verify-llms: OK - ${tiers.length} tier prices (${tiers.map((t) => fmt(t.price)).join(', ')}) and the ${fmt(deposit)} deposit match llms.txt`,
);
