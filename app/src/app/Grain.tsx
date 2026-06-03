/**
 * Film grain layer, ported from the existing site.
 *
 * The SITE-WIDE grain is CSS-only: a fixed `body::after` pseudo-element defined
 * in cinema.css (no DOM node), so it needs no React component.
 *
 * The only grain DOM element the site uses is `.hero-grain` (absolute layer
 * inside the hero section). This renders that element so cinema.css styles it.
 */
export function Grain() {
  return <div className="hero-grain"></div>;
}
