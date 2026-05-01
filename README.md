# Ice & Instinct

Private mixology studio website. Static HTML, no framework.

**Live:** https://www.iceinstinct.com/

## Stack

- Pure HTML / CSS / JS — no build step
- **Fraunces** (variable serif) for italic moments
- **Geist** (variable sans) for display
- **Inter** for body
- **JetBrains Mono** for editorial accents
- Forms via **Formspree**
- Hosted on **Hostinger Web Hosting** (auto-deploy from this repo)

## Design system

Strict monochrome (Gotham night). Cool charcoal `oklch(8% 0 0)` background, chalk-white foreground, brushed-steel mid-tones. **No tint, no blur.** The only colour on the site is on cocktail photography in the gallery — and only on hover.

See `styles.css` for the full token system at the top of the file.

## Pages

```
/                                Home (cinematic hero)
/offerings/                      Tier hub + add-ons
/offerings/foundation/           Tier i — from $400
/offerings/simplicity/           Tier ii — from $750
/offerings/bespoke/              Tier iii — from $1,500
/offerings/omakase/              Tier iv — from $3,000
/concierge/                      Bespoke private concierge service
/my-story/                       Founder bio
/gallery/                        Cocktail compositions
/contact/                        Inquiry form (Formspree)
/privacy/                        Legal
/terms/                          Legal
```

## Configuration before launch

1. **Formspree form ID.**
   In `/contact/index.html` replace `REPLACE_WITH_FORMSPREE_ID` with the actual form ID
   from your Formspree dashboard.

2. **Social links.**
   In every page footer there are social `<a href="#">` placeholders. Replace `#`
   with the real Instagram / Facebook / TikTok / X URLs.

3. **Email address.**
   `/contact/index.html` and `/script.js` reference `hello@iceinstinct.com`.
   Replace with your real address (or set up a forward).

4. **Cache-bust on CSS/JS changes.**
   When `styles.css` or `script.js` change, bump `?v=20260501` in every HTML file
   to a new value (e.g. `?v=20260601`). This forces a fresh download.

## Local preview

```bash
cd ~/iceinstinct-site
python3 -m http.server 8766
# open http://localhost:8766/
```

## Deploy

Auto-deploy on push to `main`. Hostinger pulls from this repo.

DNS: `iceinstinct.com` and `www.iceinstinct.com` point to Hostinger. The `.htaccess`
handles HTTP → HTTPS and apex → www redirects.

## Source repo

GitHub: (TBD — to be created)

## Photo assets

Currently using AI-polished cocktail photographs from the founder's actual work.
Originals stored in `assets/photos/`. To swap in new imagery, replace the file
and keep the same filename (or update `<img src>` references).
