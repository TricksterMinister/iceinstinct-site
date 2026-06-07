// Build-time SSR entry. Used ONLY by scripts/prerender.mjs after `vite build`.
// Maps a route key to its Page component and returns static HTML via
// react-dom/server. Never imported by the browser. Do NOT import any
// main-*.tsx here (those call createRoot, which needs a real DOM).
//
// All window/document/gsap/lenis access in the page components lives inside
// useEffect / event handlers, so effects do not run during renderToString and
// the components render cleanly on the server.

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import type { ReactElement } from 'react';

import { Home } from './Home';
import { Offerings } from './pages/Offerings';
import { Foundation } from './pages/Foundation';
import { Simplicity } from './pages/Simplicity';
import { Bespoke } from './pages/Bespoke';
import { Omakase } from './pages/Omakase';
import { ConciergePage } from './pages/ConciergePage';
import { MyStory } from './pages/MyStory';
import { GalleryPage } from './pages/GalleryPage';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

// Re-export SEO data so the prerender script can read it from this one SSR
// bundle (avoids a second SSR build).
export { SEO_BY_ROUTE } from './seo/seoData';
export type { RouteSeo } from './seo/seoData';

const ROUTES: Record<string, () => ReactElement> = {
  '/': () => <Home />,
  '/offerings/': () => <Offerings />,
  '/offerings/foundation/': () => <Foundation />,
  '/offerings/simplicity/': () => <Simplicity />,
  '/offerings/bespoke/': () => <Bespoke />,
  '/offerings/omakase/': () => <Omakase />,
  '/concierge/': () => <ConciergePage />,
  '/my-story/': () => <MyStory />,
  '/gallery/': () => <GalleryPage />,
  '/contact/': () => <Contact />,
  '/privacy/': () => <Privacy />,
  '/terms/': () => <Terms />,
};

export function renderRoute(route: string): string {
  const make = ROUTES[route];
  if (!make) throw new Error(`renderRoute: unknown route "${route}"`);
  return renderToString(<StrictMode>{make()}</StrictMode>);
}
