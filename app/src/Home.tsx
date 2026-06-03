import { LenisProvider } from './app/LenisProvider';
import { Cursor } from './app/Cursor';
import { Pager } from './app/Pager';
import { VanishHeader } from './app/VanishHeader';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Tiers } from './sections/Tiers';
import { Concierge } from './sections/Concierge';
import { Founder } from './sections/Founder';
import { GalleryTeaser } from './sections/GalleryTeaser';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';

export function Home() {
  return (
    <LenisProvider>
      <Cursor />
      <VanishHeader />
      <Pager />
      <Hero />
      <Manifesto />
      <Tiers />
      <Concierge />
      <Founder />
      <GalleryTeaser />
      <Closing />
      <Footer />
    </LenisProvider>
  );
}
