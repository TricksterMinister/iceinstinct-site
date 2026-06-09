// ---------------------------------------------------------------------------
// "Take it with you" - client-side keepsakes built from the recipe data.
//  - buildShareBlob(): an Instagram Story PNG (1080x1920), crest + vector glass + recipe.
//  - printRecipe(): a print-ready A4 formula sheet (browser "Save as PDF").
// Brand: monochrome + champagne, our type. No deps, deterministic from data.
// ---------------------------------------------------------------------------

import type { Recipe, Glass } from './profilerData';
// The REAL brand mark (the owner's faceted-crystal logo), not a redraw.
// markCut = the mark cut out to a clear ground, for the dark share canvas.
// markReal = the mark on its native dark plate, used as a seal on the print sheet.
import markCutUrl from '../../assets/ii-mark-cut.png';
// markPaper = the same real mark keyed to clean gold linework for white paper.
import markPaperUrl from '../../assets/ii-mark-paper.png';

const CHAMPAGNE = '#E4D4AC';
const INK = '#0c0c0c';
const CHALK = '#F4F2EC';
const STEEL = '#9c968a';
const SITE = 'iceinstinct.com';

// The tint comes from the AI (or fallback). Only allow a plain colour token so
// it can never inject CSS into the print document or break canvas fillStyle.
const SAFE_COLOR = /^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\([0-9a-z%.,\s/-]+\))$/i;
const safeTint = (tint: string): string => (typeof tint === 'string' && SAFE_COLOR.test(tint.trim()) ? tint.trim() : CHAMPAGNE);

const imgCache: Record<string, HTMLImageElement> = {};
// Load a bundled image once for the share canvas (the real cut-out mark).
async function loadImg(url: string): Promise<HTMLImageElement | null> {
  if (imgCache[url]) return imgCache[url];
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;
  try { await img.decode(); imgCache[url] = img; return img; } catch { return null; }
}

// A small isometric ice cube, tinted to the drink's colour - the elegant way to
// hint the hue (replaces the flat colour bar). Three faces, shaded, champagne
// edges, a single specular glint. Reads as ice, on brand.
function drawIceCube(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string) {
  const k = 0.866; // cos(30deg) - isometric half-width
  const A: [number, number] = [cx, cy - s];
  const B: [number, number] = [cx + s * k, cy - s * 0.5];
  const C: [number, number] = [cx + s * k, cy + s * 0.5];
  const D: [number, number] = [cx, cy + s];
  const E: [number, number] = [cx - s * k, cy + s * 0.5];
  const F: [number, number] = [cx - s * k, cy - s * 0.5];
  const M: [number, number] = [cx, cy];
  const fill = (pts: [number, number][], c: string, a: number) => {
    ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
    ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) ctx.lineTo(...pts[i]);
    ctx.closePath(); ctx.fillStyle = c; ctx.fill(); ctx.restore();
  };
  // translucent tinted faces (top brightest)
  fill([A, B, M, F], color, 0.80);
  fill([F, M, D, E], color, 0.58);
  fill([B, C, D, M], color, 0.42);
  // shading - depth without leaving the hue
  fill([B, C, D, M], '#000000', 0.20);
  fill([F, M, D, E], '#000000', 0.10);
  fill([A, B, M, F], '#ffffff', 0.12);
  // champagne hairline edges: outer hex + the three inner seams from the near corner
  ctx.save();
  ctx.strokeStyle = 'rgba(228,212,172,0.65)'; ctx.lineWidth = Math.max(1.2, s * 0.045);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(...A); ctx.lineTo(...B); ctx.lineTo(...C); ctx.lineTo(...D); ctx.lineTo(...E); ctx.lineTo(...F); ctx.closePath();
  ctx.moveTo(...M); ctx.lineTo(...B);
  ctx.moveTo(...M); ctx.lineTo(...F);
  ctx.moveTo(...M); ctx.lineTo(...D);
  ctx.stroke();
  // glint on the top face
  ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = Math.max(1, s * 0.03);
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.30, cy - s * 0.52); ctx.lineTo(cx - s * 0.05, cy - s * 0.40);
  ctx.stroke();
  ctx.restore();
}

// A stable edition number from the recipe name - the same drink always prints
// the same serial, so the keepsake reads as a numbered piece, not a random one.
function serial(recipe: Recipe): string {
  let h = 0;
  for (let i = 0; i < recipe.name.length; i++) h = (h * 31 + recipe.name.charCodeAt(i)) % 1000;
  return String(h).padStart(3, '0');
}

// Letter-spacing on canvas (supported Chrome 99+/Safari 16.4+/FF 94+); the cast
// keeps it compiling on older DOM lib types, and it degrades to 0 if unset.
const setLS = (ctx: CanvasRenderingContext2D, v: string) => { try { (ctx as unknown as { letterSpacing: string }).letterSpacing = v; } catch { /* ok */ } };

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

async function loadFonts() {
  if (!('fonts' in document)) return;
  const faces = ['italic 700 96px Fraunces', 'italic 400 34px Fraunces', '400 28px "JetBrains Mono"', '400 100px Sacramento'];
  try { await Promise.all(faces.map((f) => (document as any).fonts.load(f))); } catch { /* fallback fonts ok */ }
}

const fileName = (recipe: Recipe) =>
  recipe.name.replace(/[^\w]+/g, '-').toLowerCase() + '-ice-and-instinct.png';

// Vector glassware outline, in champagne hairline. Ported from the Antigravity
// prototype shapes (coupe / rocks / highball / nicknora), re-skinned monochrome.
function drawGlass(ctx: CanvasRenderingContext2D, type: Glass, cx: number, cy: number, size: number) {
  const s = size / 100;
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(s, s);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const lw = (w: number) => { ctx.lineWidth = w / s; };
  const outline = () => { ctx.strokeStyle = CHAMPAGNE; lw(2.6); ctx.stroke(); };
  const faint = (build: () => void) => { ctx.save(); ctx.globalAlpha = 0.07; ctx.fillStyle = CHAMPAGNE; ctx.beginPath(); build(); ctx.closePath(); ctx.fill(); ctx.restore(); };
  const glint = () => { ctx.strokeStyle = 'rgba(244,242,236,0.5)'; lw(1.5); };
  // a soft pool of shadow under the base
  ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = CHAMPAGNE; ctx.beginPath(); ctx.ellipse(50, 129, 24, 3.4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();

  if (type === 'coupe') {
    faint(() => { ctx.arc(50, 40, 30, 0, Math.PI, false); });
    ctx.beginPath(); ctx.arc(50, 40, 30, 0, Math.PI, false); outline();
    ctx.beginPath(); ctx.moveTo(50, 70); ctx.lineTo(50, 120); ctx.moveTo(34, 120); ctx.lineTo(66, 120); outline();
    ctx.beginPath(); ctx.moveTo(22, 40); ctx.lineTo(78, 40); ctx.strokeStyle = CHAMPAGNE; lw(1.5); ctx.stroke(); // engraved rim
    glint(); ctx.beginPath(); ctx.arc(50, 40, 22, Math.PI * 0.60, Math.PI * 0.92, false); ctx.stroke();
  } else if (type === 'rocks') {
    const body = () => { ctx.moveTo(26, 32); ctx.lineTo(31, 116); ctx.quadraticCurveTo(50, 121, 69, 116); ctx.lineTo(74, 32); };
    faint(() => { body(); });
    ctx.beginPath(); body(); ctx.closePath(); outline();
    ctx.beginPath(); ctx.moveTo(28, 36); ctx.lineTo(72, 36); lw(1.5); ctx.stroke(); // engraved rim
    glint(); ctx.beginPath(); ctx.moveTo(34, 44); ctx.lineTo(37, 104); ctx.stroke();
  } else if (type === 'highball') {
    const body = () => { ctx.moveTo(31, 26); ctx.lineTo(34, 124); ctx.quadraticCurveTo(50, 128, 66, 124); ctx.lineTo(69, 26); };
    faint(() => { body(); });
    ctx.beginPath(); body(); ctx.closePath(); outline();
    ctx.beginPath(); ctx.moveTo(33, 30); ctx.lineTo(67, 30); lw(1.5); ctx.stroke();
    glint(); ctx.beginPath(); ctx.moveTo(38, 40); ctx.lineTo(40, 116); ctx.stroke();
  } else {
    faint(() => { ctx.moveTo(25, 38); ctx.quadraticCurveTo(25, 70, 50, 70); ctx.quadraticCurveTo(75, 70, 75, 38); });
    ctx.beginPath(); ctx.moveTo(25, 38); ctx.quadraticCurveTo(25, 70, 50, 70); ctx.quadraticCurveTo(75, 70, 75, 38); ctx.closePath(); outline();
    ctx.beginPath(); ctx.moveTo(50, 70); ctx.lineTo(50, 120); ctx.moveTo(34, 120); ctx.lineTo(66, 120); outline();
    ctx.beginPath(); ctx.moveTo(25, 38); ctx.lineTo(75, 38); lw(1.5); ctx.stroke();
    glint(); ctx.beginPath(); ctx.arc(50, 44, 20, Math.PI * 0.62, Math.PI * 0.9, false); ctx.stroke();
  }
  ctx.restore();
}

// Render the Instagram Story poster to a PNG blob (1080x1920): INK ground, the
// cube mark, vector glassware, the drink as hero, and a handwritten signature.
// Monochrome + champagne, brand type, deterministic from the recipe data.
export async function buildShareBlob(recipe: Recipe): Promise<Blob | null> {
  await loadFonts();
  const mark = await loadImg(markCutUrl);
  const W = 1080, H = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H);
  // the faintest warm core behind the glass - the ember, barely there
  const halo = ctx.createRadialGradient(W / 2, 640, 0, W / 2, 640, 460);
  halo.addColorStop(0, 'rgba(255,122,26,0.06)');
  halo.addColorStop(1, 'rgba(255,122,26,0)');
  ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);

  // double hairline frame + champagne corner ticks
  ctx.strokeStyle = 'rgba(228,212,172,0.18)'; ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, W - 96, H - 96);
  ctx.strokeStyle = 'rgba(228,212,172,0.30)'; ctx.lineWidth = 1.5;
  ctx.strokeRect(58, 58, W - 116, H - 116);
  const tick = 30;
  ctx.strokeStyle = CHAMPAGNE; ctx.lineWidth = 2.5;
  for (const [cx, cy, sx, sy] of [[72, 72, 1, 1], [W - 72, 72, -1, 1], [72, H - 72, 1, -1], [W - 72, H - 72, -1, -1]] as const) {
    ctx.beginPath(); ctx.moveTo(cx + tick * sx, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy + tick * sy); ctx.stroke();
  }

  ctx.textAlign = 'center';

  // masthead - the REAL brand mark, wordmark, line of provenance
  const markSize = 200;
  if (mark) ctx.drawImage(mark, W / 2 - markSize / 2, 96, markSize, markSize);
  ctx.fillStyle = CHAMPAGNE; setLS(ctx, '8px'); ctx.font = '500 30px "JetBrains Mono", monospace';
  ctx.fillText('ICE & INSTINCT', W / 2, 340);
  ctx.fillStyle = STEEL; setLS(ctx, '5px'); ctx.font = '400 19px "JetBrains Mono", monospace';
  ctx.fillText('PRIVATE MIXOLOGY · NEW YORK', W / 2, 374);

  // edition line, flanked by short rules
  setLS(ctx, '6px'); ctx.font = '400 18px "JetBrains Mono", monospace';
  ctx.fillText('SIGNATURE  N°  ' + serial(recipe).split('').join(' '), W / 2, 430);
  setLS(ctx, '0px');
  ctx.strokeStyle = 'rgba(228,212,172,0.28)'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 250, 424); ctx.lineTo(W / 2 - 180, 424);
  ctx.moveTo(W / 2 + 180, 424); ctx.lineTo(W / 2 + 250, 424);
  ctx.stroke();

  // glassware centrepiece
  drawGlass(ctx, recipe.glass, W / 2, 640, 280);

  // archetype + the drink (hero)
  let y = 880;
  ctx.fillStyle = STEEL; setLS(ctx, '6px'); ctx.font = '400 22px "JetBrains Mono", monospace';
  ctx.fillText('GUEST ARCHETYPE', W / 2, y); setLS(ctx, '0px'); y += 58;
  ctx.fillStyle = CHALK; ctx.font = 'italic 400 42px Fraunces, Georgia, serif';
  ctx.fillText(recipe.archetype, W / 2, y); y += 104;

  ctx.fillStyle = CHAMPAGNE; ctx.font = 'italic 700 88px Fraunces, Georgia, serif';
  for (const ln of wrap(ctx, recipe.name, W - 200)) { ctx.fillText(ln, W / 2, y); y += 94; }
  y += 10;

  ctx.fillStyle = CHALK; ctx.font = 'italic 400 33px Fraunces, Georgia, serif';
  for (const ln of wrap(ctx, '“' + recipe.tagline + '”', W - 260)) { ctx.fillText(ln, W / 2, y); y += 46; }
  y += 30;

  drawIceCube(ctx, W / 2, y + 30, 30, safeTint(recipe.tint)); y += 92;

  // ingredient peek - stops well clear of the signature
  const FLOOR = 1560;
  ctx.fillStyle = STEEL; setLS(ctx, '1px'); ctx.font = '400 25px "JetBrains Mono", monospace';
  for (const ing of recipe.ingredients.slice(0, 5)) {
    if (y > FLOOR) break;
    for (const ln of wrap(ctx, ing, W - 260)) { ctx.fillText(ln, W / 2, y); y += 42; }
  }
  setLS(ctx, '0px');

  // the signature - the personal flourish, with a hand-drawn swash
  const sigY = 1700;
  ctx.fillStyle = CHAMPAGNE; ctx.font = '400 104px Sacramento, "Snell Roundhand", "Brush Script MT", cursive';
  ctx.fillText('From Temo with love', W / 2, sigY);
  ctx.strokeStyle = 'rgba(228,212,172,0.45)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(W / 2 - 160, sigY + 30);
  ctx.quadraticCurveTo(W / 2, sigY + 52, W / 2 + 160, sigY + 30);
  ctx.stroke();

  // footer
  ctx.fillStyle = STEEL; setLS(ctx, '4px'); ctx.font = '400 21px "JetBrains Mono", monospace';
  ctx.fillText('BY APPOINTMENT · MANHATTAN · ' + SITE.toUpperCase(), W / 2, 1828);
  setLS(ctx, '0px');

  return await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
}

function triggerDownload(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Save Image -> downloads the PNG.
export async function downloadShareImage(recipe: Recipe) {
  const blob = await buildShareBlob(recipe);
  if (blob) triggerDownload(blob, fileName(recipe));
}

export type ShareResult = 'shared' | 'cancelled' | 'unsupported';

// Share to Instagram. Instagram allows NO direct web-to-Stories posting, so the
// closest possible is the mobile native share sheet (one tap -> Instagram ->
// Stories, image attached). On desktop there is no path at all - we return
// 'unsupported' so the UI can tell the guest to continue on their phone. We do
// NOT silently download here (the guest has a separate "Save image" button).
export async function shareToInstagram(recipe: Recipe): Promise<ShareResult> {
  const blob = await buildShareBlob(recipe);
  if (!blob) return 'unsupported';
  const file = new File([blob], fileName(recipe), { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: any) => boolean };
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({
        files: [file],
        title: recipe.name,
        text: `${recipe.name} - a signature composed for me at Ice & Instinct. iceinstinct.com`,
      });
      return 'shared';
    } catch {
      return 'cancelled';
    }
  }
  return 'unsupported';
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The print-sheet twin of drawIceCube: an isometric ice cube tinted to the
// drink, as inline SVG (so it prints in colour). Champagne/gold edges on paper.
function iceCubeSVG(color: string, px: number): string {
  const c = safeTint(color);
  return `<svg width="${px}" height="${px}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">` +
    `<polygon points="50,18 79.4,35 50,52 20.6,35" fill="${c}" fill-opacity="0.82"/>` +
    `<polygon points="20.6,35 50,52 50,86 20.6,69" fill="${c}" fill-opacity="0.58"/>` +
    `<polygon points="79.4,35 79.4,69 50,86 50,52" fill="${c}" fill-opacity="0.42"/>` +
    `<polygon points="79.4,35 79.4,69 50,86 50,52" fill="#000" fill-opacity="0.16"/>` +
    `<polygon points="50,18 79.4,35 50,52 20.6,35" fill="#fff" fill-opacity="0.14"/>` +
    `<g fill="none" stroke="#b08d3f" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">` +
    `<polygon points="50,18 79.4,35 79.4,69 50,86 20.6,69 20.6,35"/>` +
    `<path d="M50,52 L79.4,35 M50,52 L20.6,35 M50,52 L50,86"/></g></svg>`;
}

// Build the print sheet markup. autoPrint adds the window.print() trigger (only
// wanted in the pop-up, not when the same HTML is embedded for a preview).
export function buildPrintHTML(recipe: Recipe, autoPrint = true): string {
  const ingredients = recipe.ingredients.map((i) => `<li>${esc(i)}</li>`).join('');
  const steps = recipe.instructions.map((i) => `<li>${esc(i)}</li>`).join('');
  const ed = serial(recipe).split('').join('&thinsp;');
  // Absolute URL so the real mark loads inside the blank print pop-up document.
  const markAbs = new URL(markPaperUrl, location.href).href;
  const printScript = autoPrint ? '<script>window.onload=function(){setTimeout(function(){window.print();},450);};</script>' : '';

  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(recipe.name)} - Ice & Instinct</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=JetBrains+Mono:wght@400;500&family=Sacramento&display=swap" rel="stylesheet">
<style>
  @page { size: letter; margin: 0; }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body { margin: 0; font-family: 'Fraunces', Georgia, serif; color: #1a1a1a; background: #ffffff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  /* one Letter page, the card centred both ways inside a margin */
  .page { width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 14mm; }
  .sheet { width: 100%; max-width: 176mm; padding: 13mm 14mm; position: relative; border: 1px solid #cbb98a; }
  .sheet::after { content: ""; position: absolute; inset: 4px; border: 1px solid #ece4cf; pointer-events: none; }
  .crest { display: flex; justify-content: center; margin: 0 0 6px; }
  .crest img { width: 76px; height: 76px; display: block; }
  .wordmark { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.5em; text-transform: uppercase; color: #1a1a1a; text-align: center; }
  .edition { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 0.4em; text-transform: uppercase; color: #b08d3f; text-align: center; margin: 7px 0 0; }
  .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.34em; text-transform: uppercase; color: #8a8475; text-align: center; margin: 14px 0 4px; }
  h1 { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-weight: 600; font-size: 42px; line-height: 1.04; text-align: center; color: #9a7b32; margin: 2px 0 8px; }
  .tag { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; text-align: center; color: #555; max-width: 112mm; margin: 0 auto 4px; }
  .tint { display: flex; justify-content: center; margin: 10px auto 16px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding-top: 16px; border-top: 1px solid #d8d4c8; }
  .label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: #9a7b32; margin-bottom: 7px; }
  p.body { font-size: 11.5px; line-height: 1.6; color: #333; margin: 0; }
  ul, ol { margin: 0; padding-left: 16px; }
  li { font-size: 11px; line-height: 1.5; margin-bottom: 4px; }
  ul li { font-family: 'JetBrains Mono', monospace; list-style: none; padding-left: 0; }
  .sign { text-align: center; margin: 22px 0 2px; }
  .sign .name { font-family: 'Sacramento', cursive; font-size: 38px; line-height: 1; color: #9a7b32; }
  .foot { margin-top: 12px; padding-top: 11px; border-top: 1px solid #d8d4c8; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: #8a8475; }
</style></head>
<body><div class="page"><div class="sheet">
  <div class="crest"><img src="${markAbs}" alt="Ice & Instinct" /></div>
  <p class="wordmark">Ice &amp; Instinct</p>
  <p class="edition">Signature &nbsp; N° &nbsp; ${ed}</p>
  <p class="eyebrow">${esc(recipe.archetype)} &middot; A signature composed for you</p>
  <h1>${esc(recipe.name)}</h1>
  <p class="tag">&ldquo;${esc(recipe.tagline)}&rdquo;</p>
  <div class="tint">${iceCubeSVG(recipe.tint, 46)}</div>
  <div class="grid">
    <div>
      <p class="label">Colour profile</p><p class="body">${esc(recipe.colorProfile)}</p>
      <p class="label" style="margin-top:18px">The sensory rationale</p><p class="body">${esc(recipe.sensoryNarrative)}</p>
    </div>
    <div>
      <p class="label">The matrix</p><ul>${ingredients}</ul>
      <p class="label" style="margin-top:18px">The ritual</p><ol>${steps}</ol>
    </div>
  </div>
  <div class="sign"><span class="name">From Temo with love</span></div>
  <p class="foot">By appointment &middot; Manhattan &middot; ${SITE}</p>
</div></div>
${printScript}
</body></html>`;
}

export function printRecipe(recipe: Recipe) {
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(buildPrintHTML(recipe, true));
  w.document.close();
}
