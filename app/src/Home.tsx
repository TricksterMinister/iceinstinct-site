import { LenisProvider } from './app/LenisProvider';
import { Cursor } from './app/Cursor';
import { Pager } from './app/Pager';
import { VanishHeader } from './app/VanishHeader';
import { useGsap } from './app/useGsap';
import { initHomeGsap } from './lib/gsapHome';
import { ScrollHero } from './sections/ScrollHero';
import { Manifesto } from './sections/Manifesto';
import { Duality } from './features/Duality/Duality';
import { Tiers } from './sections/Tiers';
import { TiersNote } from './sections/TiersNote';
import { Concierge } from './sections/Concierge';
import { Founder } from './sections/Founder';
import { GalleryTeaser } from './sections/GalleryTeaser';
import { Faq } from './sections/Faq';
import { Proof } from './sections/Proof';
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
      <ScrollHero />
      <Manifesto />
      <Founder />
      <GalleryTeaser />
      <Tiers />
      {/* Pricing transparency note + team-scaling line, directly below the tiers. */}
      <TiersNote />
      {/* The portal - one spectacular gateway to the two floors: ICE = event
          bartenders (/events/), INSTINCT = the founder's studio (/offerings/).
          Sits at the seam where the tiers block ends and the enhancements begin. */}
      <Duality />
      <Concierge />
      <Faq />
      {/* Real client testimonials. Renders nothing until a real entry exists. */}
      <Proof />
      {/* Begin CTA + Footer read as ONE final segment, one viewport. */}
      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="BEGIN" title="Begin" titleEm="the evening." lead="One bar, one bartender, one night built entirely around your table. Tell us the date." />
        <SiteFooter embedded />
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
