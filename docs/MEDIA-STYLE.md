# Ice & Instinct - Media Style Standard

Single source of truth for every generated image/video on the site. All prompts
are written on top of this. Locked by Temo 2026-06-06.

## House style (LOCKED): "NYC Speakeasy / Warm Ember" - mega-realism

Always the same world: an intimate, evening, cozy New York speakeasy bar.
Mega-photorealism, indistinguishable from a real photograph. Juicy, alive, real:
liquid droplets on the bar top, frosted glass beaded with condensation, citrus-oil
spritz caught in the light. Sometimes hands in frame, sometimes not - the
atmosphere is always the speakeasy.

Palette: dark and monochrome by default - true blacks, espresso brown, brushed
brass - with a single warm champagne-gold glow as the only color accent. Default
imagery reads near black-and-white; color blooms in (on hover for tiles).

Light variation rule: mostly dark nocturnal. On a base/entry offer (Foundation)
1-2 images may be a touch lighter/warmer - SAME speakeasy room, brighter lamp,
NOT a different style.

### Base realism block (paste into every prompt)

> A real candid documentary photograph taken inside a dim, intimate, cozy New
> York speakeasy bar at night. [SUBJECT]. Practical warm tungsten light from a
> small brass bar lamp is the only key light; a real back-bar of bottles and
> glassware sits softly out of focus in natural creamy bokeh. Dark monochrome
> palette - true black, espresso, brushed brass - with a single warm
> champagne-gold glow as the only color accent. Juicy and alive: liquid droplets
> on the dark marble bar top, a frosted glass beaded with real condensation,
> fine citrus-oil mist in the light. Shot on a Leica SL2 with a Summilux 50mm
> f/1.4 wide open, available-light reportage, authentic film grain, real skin
> with pores and texture, true-to-life shadows and reflections, imperfect candid
> framing. Looks exactly like a real photo by a top editorial bar photographer.
> NOT a 3D render, NOT CGI, NOT digital art, NOT illustration, no studio void,
> no plastic perfection, no AI look, no text, no neon, no glow filter.

Engine: `img_gen.py --model nano-banana-pro-preview` (more photoreal than Imagen
for this look). Always inspect the render + `open` it for Temo (he sees only the
real file, never in-chat previews).

## The three image categories

### Category 1 - HERO (gets animated into the hero video)
- Aspect: vertical, `--aspect 3:4` (right half of the 50/50 hero).
- Role: this still is later animated -> hero video media.
- Extra spec: give it something to move (rising smoke, a pour, oil mist, a hand
  finishing a drink); leave edge headroom for safe cropping.

### Category 2 - BRIDGE (wide held-stage photo, gold scan-line runs over it)
- Aspect: wide landscape, `--aspect 16:9` (or wider).
- Role: the single largest, whole, never-cropped-mid-subject image on the
  segment bridge; carries overlaid text + the champagne scan-line.
- Extra spec: one big legible subject across the full width; room for the scan
  line and a short overlaid line of text; strong but uncluttered.

### Category 3 - TILE / REVEAL (default luxe B&W, colorizes on hover)
- Aspect: grid item, `--aspect 1:1` (or 4:5 portrait); many of them, a series.
- Role: collection/gallery tiles; also where the current "plastic" cocktails get
  regenerated to match.
- Extra spec: subject must look strong in BOTH luxe black-and-white (default) and
  full color (hover reveal) - strong shape, contrast, a champagne element that
  pays off when color blooms. Consistent framing across the set so the wall of
  tiles reads as one series.

## Per-page subject guidance (build the [SUBJECT] on the base block)
- Omakase / The Alchemist: theatrical, master at work - torched peel, smoke, the
  improvisation moment. (Hero still approved: hero-stills/omakase-bar-v3.png.)
- Foundation / The Essential: warm, professional, classics done right; this is
  the page that may run 1-2 slightly lighter speakeasy frames.
- Simplicity / The Executive Standard: restrained, the legends, surgical
  precision - a perfect stir/Martini, quiet luxury.
- Bespoke / The Architect: design-forward, custom presentation - sculptural
  garnish, considered composition, still inside the speakeasy.
