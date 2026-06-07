import { LenisProvider } from './app/LenisProvider';
import { Cursor } from './app/Cursor';
import { Pager } from './app/Pager';
import { VanishHeader } from './app/VanishHeader';
import { useGsap } from './app/useGsap';
import { initHomeGsap } from './lib/gsapHome';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Duality } from './features/Duality/Duality';
import { Tiers } from './sections/Tiers';
import { Concierge } from './sections/Concierge';
import { Founder } from './sections/Founder';
import { GalleryTeaser } from './sections/GalleryTeaser';
import { Closing } from './sections/Closing';
import { SiteFooter } from './sections/SiteFooter';

function HomeContent() {
  // Runs after the section DOM is mounted and inside LenisProvider (so window.lenis
  // is exposed first). Wrapped in a gsap.context that reverts on unmount.
  useGsap(() => initHomeGsap());

  return (
    <>
      <Cursor />
      <VanishHeader />
      <Pager />
      <Hero />
      <Manifesto />
      <Founder />
      <GalleryTeaser />
      <Tiers />
      <Concierge />
      {/* Duality parked near the end (last segment before Begin) until we decide
          where the portal leads. */}
      <Duality />
      {/* Begin CTA + Footer read as ONE final segment, one viewport. */}
      <div className="closing-segment">
        <Closing />
        <SiteFooter />
      </div>
    </>
  );
}

export function Home() {
  return (
    <LenisProvider>
      <HomeContent />
    </LenisProvider>
  );
}
