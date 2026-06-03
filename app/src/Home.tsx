import { LenisProvider } from './app/LenisProvider';
import { Cursor } from './app/Cursor';
import { Pager } from './app/Pager';
import { VanishHeader } from './app/VanishHeader';
import { useGsap } from './app/useGsap';
import { initHomeGsap } from './lib/gsapHome';
import { Hero } from './sections/Hero';
import { Duality } from './features/Duality/Duality';
import { Tiers } from './sections/Tiers';
import { Concierge } from './sections/Concierge';
import { Founder } from './sections/Founder';
import { GalleryTeaser } from './sections/GalleryTeaser';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';

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
      <Duality />
      <Tiers />
      <Concierge />
      <Founder />
      <GalleryTeaser />
      <Closing />
      <Footer />
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
