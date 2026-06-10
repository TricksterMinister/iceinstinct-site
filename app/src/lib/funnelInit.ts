// Imported for side effects by every client entry (main-*.tsx): capture the
// first-touch source and install the delegated outbound-CTA tracker. Both are
// idempotent and SSR-safe, so the import order inside an entry does not matter.
import { captureSource } from './leadContext';
import { initCtaTracking } from './track';

captureSource();
initCtaTracking();
