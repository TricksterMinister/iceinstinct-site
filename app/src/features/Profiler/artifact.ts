// ---------------------------------------------------------------------------
// "Take it with you" - client-side keepsakes built from the recipe data.
//  - buildShareBlob(): an Instagram Story PNG (1080x1920), crest + vector glass + recipe.
//  - printRecipe(): a print-ready A4 formula sheet (browser "Save as PDF").
// Brand: monochrome + champagne, our type. No deps, deterministic from data.
// ---------------------------------------------------------------------------

import type { Recipe, Glass } from './profilerData';

const CHAMPAGNE = '#E4D4AC';
const INK = '#0c0c0c';
const CHALK = '#F4F2EC';
const STEEL = '#9c968a';
const SITE = 'iceinstinct.com';

// The tint comes from the AI (or fallback). Only allow a plain colour token so
// it can never inject CSS into the print document or break canvas fillStyle.
const SAFE_COLOR = /^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\([0-9a-z%.,\s/-]+\))$/i;
const safeTint = (tint: string): string => (typeof tint === 'string' && SAFE_COLOR.test(tint.trim()) ? tint.trim() : CHAMPAGNE);

// Draw the Ice & Instinct crest (diamond + chevron + stem) at (cx, top), scaled.
function drawCrest(ctx: CanvasRenderingContext2D, cx: number, top: number, scale: number, color: string) {
  const x = (n: number) => cx + (n - 17) * scale;
  const y = (n: number) => top + (n - 4) * scale;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.4, scale * 0.9);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // diamond
  ctx.beginPath();
  ctx.moveTo(x(17), y(4)); ctx.lineTo(x(23), y(11)); ctx.lineTo(x(17), y(18)); ctx.lineTo(x(11), y(11)); ctx.closePath();
  ctx.stroke();
  // chevron
  ctx.beginPath();
  ctx.moveTo(x(9), y(14)); ctx.lineTo(x(17), y(23)); ctx.lineTo(x(25), y(14));
  ctx.stroke();
  // stem + base
  ctx.beginPath();
  ctx.moveTo(x(17), y(23)); ctx.lineTo(x(17), y(29));
  ctx.moveTo(x(13), y(29)); ctx.lineTo(x(21), y(29));
  ctx.stroke();
  ctx.restore();
}

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
  const faces = ['italic 700 96px Fraunces', '600 40px Geist', '400 28px "JetBrains Mono"', 'italic 400 34px Fraunces'];
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
  ctx.strokeStyle = CHAMPAGNE;
  ctx.lineWidth = 2.4 / s;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const liquid = () => { ctx.strokeStyle = 'rgba(228,212,172,0.45)'; ctx.lineWidth = 1.2 / s; ctx.setLineDash([4, 4]); };
  if (type === 'coupe') {
    ctx.beginPath(); ctx.arc(50, 40, 30, 0, Math.PI, false); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(50, 70); ctx.lineTo(50, 120); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(35, 120); ctx.lineTo(65, 120); ctx.stroke();
    liquid(); ctx.beginPath(); ctx.moveTo(25, 48); ctx.quadraticCurveTo(50, 52, 75, 48); ctx.stroke();
  } else if (type === 'rocks') {
    ctx.beginPath(); ctx.moveTo(25, 30); ctx.lineTo(30, 115); ctx.quadraticCurveTo(50, 120, 70, 115); ctx.lineTo(75, 30); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = 'rgba(228,212,172,0.3)'; ctx.lineWidth = 1.2 / s; ctx.strokeRect(38, 70, 22, 22); ctx.strokeRect(42, 45, 18, 18);
    liquid(); ctx.beginPath(); ctx.moveTo(27, 60); ctx.lineTo(73, 60); ctx.stroke();
  } else if (type === 'highball') {
    ctx.beginPath(); ctx.moveTo(30, 25); ctx.lineTo(33, 125); ctx.quadraticCurveTo(50, 128, 67, 125); ctx.lineTo(70, 25); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = 'rgba(228,212,172,0.3)'; ctx.lineWidth = 1.2 / s; ctx.strokeRect(38, 85, 24, 24); ctx.strokeRect(38, 50, 24, 24);
    liquid(); ctx.beginPath(); ctx.moveTo(31.5, 42); ctx.lineTo(68.5, 42); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.moveTo(25, 38); ctx.quadraticCurveTo(25, 70, 50, 70); ctx.quadraticCurveTo(75, 70, 75, 38); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(50, 70); ctx.lineTo(50, 120); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(35, 120); ctx.lineTo(65, 120); ctx.stroke();
    liquid(); ctx.beginPath(); ctx.moveTo(27, 45); ctx.quadraticCurveTo(50, 48, 73, 45); ctx.stroke();
  }
  ctx.restore();
}

// Render the Instagram Story poster to a PNG blob (1080x1920). Monochrome +
// champagne, vector glassware, archetype + recipe. No gold, no glow.
export async function buildShareBlob(recipe: Recipe): Promise<Blob | null> {
  await loadFonts();
  const W = 1080, H = 1920, P = 110;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H);
  // hairline frame + corner ticks
  ctx.strokeStyle = 'rgba(228,212,172,0.25)'; ctx.lineWidth = 1.5;
  ctx.strokeRect(56, 56, W - 112, H - 112);
  const tick = 30;
  ctx.strokeStyle = CHAMPAGNE; ctx.lineWidth = 2.5;
  for (const [cx, cy, sx, sy] of [[72, 72, 1, 1], [W - 72, 72, -1, 1], [72, H - 72, 1, -1], [W - 72, H - 72, -1, -1]] as const) {
    ctx.beginPath(); ctx.moveTo(cx + tick * sx, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy + tick * sy); ctx.stroke();
  }

  ctx.textAlign = 'center';
  let y = 168;
  drawCrest(ctx, W / 2, y, 4.4, CHAMPAGNE);
  y += 150;
  ctx.fillStyle = CHAMPAGNE; ctx.font = '500 26px "JetBrains Mono", monospace';
  ctx.fillText('ICE & INSTINCT', W / 2, y); y += 40;
  ctx.fillStyle = STEEL; ctx.font = '400 20px "JetBrains Mono", monospace';
  ctx.fillText('/ /   P R I V A T E   M I X O L O G Y   N Y C   / /', W / 2, y);

  // glassware centrepiece
  drawGlass(ctx, recipe.glass, W / 2, 720, 360);

  // archetype + name
  y = 1000;
  ctx.fillStyle = STEEL; ctx.font = '400 22px "JetBrains Mono", monospace';
  ctx.fillText('G U E S T   A R C H E T Y P E', W / 2, y); y += 50;
  ctx.fillStyle = CHALK; ctx.font = 'italic 400 40px Fraunces, Georgia, serif';
  ctx.fillText(recipe.archetype, W / 2, y); y += 96;

  ctx.fillStyle = CHAMPAGNE; ctx.font = 'italic 700 84px Fraunces, Georgia, serif';
  for (const ln of wrap(ctx, recipe.name, W - P * 2)) { ctx.fillText(ln, W / 2, y); y += 92; }
  y += 14;

  ctx.fillStyle = CHALK; ctx.font = 'italic 400 32px Fraunces, Georgia, serif';
  for (const ln of wrap(ctx, '“' + recipe.tagline + '”', W - P * 1.8)) { ctx.fillText(ln, W / 2, y); y += 44; }
  y += 24;

  ctx.fillStyle = safeTint(recipe.tint); ctx.fillRect(W / 2 - 44, y, 88, 5); y += 70;

  // ingredients - stop before the footer so a verbose name can never overrun it
  const FLOOR = H - 175;
  ctx.fillStyle = STEEL; ctx.font = '400 25px "JetBrains Mono", monospace';
  for (const ing of recipe.ingredients.slice(0, 5)) {
    if (y > FLOOR) break;
    for (const ln of wrap(ctx, ing, W - P * 2)) { ctx.fillText(ln, W / 2, y); y += 40; }
  }

  // footer
  ctx.fillStyle = CHAMPAGNE; ctx.font = '400 24px "JetBrains Mono", monospace';
  ctx.fillText('By appointment  ·  Manhattan  ·  ' + SITE, W / 2, H - 130);

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

export function printRecipe(recipe: Recipe) {
  const crest =
    '<svg width="44" height="44" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M17 4 L23 11 L17 18 L11 11 Z" stroke="#9a7b32" stroke-width="1" fill="none"/>' +
    '<path d="M9 14 L17 23 L25 14" stroke="#9a7b32" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<line x1="17" y1="23" x2="17" y2="29" stroke="#9a7b32" stroke-width="1" stroke-linecap="round"/>' +
    '<line x1="13" y1="29" x2="21" y2="29" stroke="#9a7b32" stroke-width="1" stroke-linecap="round"/></svg>';

  const ingredients = recipe.ingredients.map((i) => `<li>${esc(i)}</li>`).join('');
  const steps = recipe.instructions.map((i) => `<li>${esc(i)}</li>`).join('');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(recipe.name)} - Ice & Instinct</title>
<style>
  @page { size: A4; margin: 18mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', Georgia, serif; color: #1a1a1a; }
  .sheet { max-width: 174mm; margin: 0 auto; }
  .top { display: flex; align-items: center; gap: 10px; justify-content: center; }
  .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.34em; text-transform: uppercase; color: #8a8475; text-align: center; margin: 18px 0 6px; }
  h1 { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-weight: 600; font-size: 42px; text-align: center; color: #9a7b32; margin: 4px 0 8px; }
  .tag { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; text-align: center; color: #555; max-width: 110mm; margin: 0 auto 4px; }
  .tint { width: 46px; height: 4px; margin: 14px auto 22px; }
  .rule { border: none; border-top: 1px solid #d8d4c8; margin: 18px 0; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
  .label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: #9a7b32; margin-bottom: 8px; }
  p.body { font-size: 12px; line-height: 1.6; color: #333; }
  ul, ol { margin: 0; padding-left: 16px; }
  li { font-size: 11.5px; line-height: 1.55; margin-bottom: 5px; }
  ul li { font-family: 'JetBrains Mono', monospace; list-style: none; padding-left: 0; }
  .foot { margin-top: 26px; padding-top: 12px; border-top: 1px solid #d8d4c8; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: #8a8475; }
</style></head>
<body><div class="sheet">
  <div class="top">${crest}</div>
  <p class="eyebrow">${esc(recipe.archetype)} &middot; A signature composed for you</p>
  <h1>${esc(recipe.name)}</h1>
  <p class="tag">&ldquo;${esc(recipe.tagline)}&rdquo;</p>
  <div class="tint" style="background:${safeTint(recipe.tint)}"></div>
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
  <p class="foot">By appointment &middot; Manhattan &middot; ${SITE}</p>
</div>
<script>window.onload=function(){setTimeout(function(){window.print();},300);};</script>
</body></html>`;

  const w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
}
