// OG card generator - reuses the exact template from media/og/og-card.html
// (same CSS, same cube-logo.png mark) so new cards are pixel-identical in style
// to the existing assets/og/*.png set. Only the foot line adds "+ New Jersey".
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const FOOT = 'New York + New Jersey &nbsp;&middot;&nbsp; By Appointment &nbsp;&middot;&nbsp; Est. 2024';

const cards = [
  { file: 'weddings',              eyebrow: 'Weddings',        title: 'Wedding Bar Service' },
  { file: 'corporate',             eyebrow: 'Corporate',       title: 'Corporate Event Bar' },
  { file: 'gift',                  eyebrow: 'Gift an Evening', title: 'A Gifted Evening' },
  { file: 'press',                 eyebrow: 'Press',           title: 'Ice <span class="amp">&amp;</span> Instinct' },
  { file: 'new-jersey',            eyebrow: 'Service Area',    title: 'New Jersey' },
  { file: 'manhattan',             eyebrow: 'Service Area',    title: 'Manhattan' },
  { file: 'hamptons',              eyebrow: 'Service Area',    title: 'The Hamptons' },
  { file: 'westchester-greenwich', eyebrow: 'Service Area',    title: 'Westchester <span class="amp">&amp;</span> Greenwich' },
  { file: 'events',                eyebrow: 'Event Bartenders', title: 'On Call, NYC <span class="amp">&amp;</span> NJ' },
  { file: 'work-with-us',          eyebrow: 'The Bench',       title: 'Bartend With Us' },
  { file: 'journal',               eyebrow: 'Journal',         title: 'Notes on the Craft' },
];

const html = (c) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; overflow:hidden; }
  body {
    background:
      radial-gradient(120% 90% at 50% 22%, #141414 0%, #080808 55%, #000000 100%);
    color:#ece8e2;
    font-family:"Helvetica Neue", Arial, sans-serif;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    position:relative;
  }
  /* hairline frame */
  .frame { position:absolute; inset:34px; border:1px solid rgba(201,162,74,0.28); border-radius:6px; }
  .mark { width:96px; height:96px; margin-bottom:30px; }
  .eyebrow {
    font-size:18px; letter-spacing:9px; color:#b98a4a; text-transform:uppercase;
    margin-bottom:26px; font-weight:500;
  }
  .title {
    font-family:"Didot","Bodoni 72","Hoefler Text",Georgia,serif;
    font-size:78px; line-height:1.02; text-align:center; max-width:980px;
    letter-spacing:1px; font-weight:400;
  }
  .title .amp { color:#b98a4a; }
  .rule { width:120px; height:1px; background:rgba(201,162,74,0.55); margin:34px 0 24px; }
  .foot { font-size:16px; letter-spacing:6px; color:#8a8478; text-transform:uppercase; }
</style>
</head>
<body>
  <div class="frame"></div>
  <img class="mark" src="../cube-logo.png" alt="">
  <div class="eyebrow">${c.eyebrow}</div>
  <div class="title">${c.title}</div>
  <div class="rule"></div>
  <div class="foot">${FOOT}</div>
</body>
</html>
`;

mkdirSync(join(here, 'cards'), { recursive: true });
for (const c of cards) {
  writeFileSync(join(here, 'cards', `${c.file}.html`), html(c));
  console.log(`wrote cards/${c.file}.html`);
}
