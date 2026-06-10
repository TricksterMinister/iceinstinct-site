import { describe, it, expect } from 'vitest';
import { resolveCtaEvent } from './track';

describe('resolveCtaEvent', () => {
  it('maps YouCanBook.me links to booking_click', () => {
    expect(resolveCtaEvent('https://enter-ritual.youcanbook.me/?service=jsid1437636')).toBe('booking_click');
  });
  it('maps wa.me links to whatsapp_click', () => {
    expect(resolveCtaEvent('https://wa.me/19172927859')).toBe('whatsapp_click');
    expect(resolveCtaEvent('https://wa.me/19172927859?text=Hello')).toBe('whatsapp_click');
  });
  it('maps tel: links to call_click', () => {
    expect(resolveCtaEvent('tel:+19172927859')).toBe('call_click');
  });
  it('maps Instagram links to instagram_click', () => {
    expect(resolveCtaEvent('https://www.instagram.com/iceinstinctnyc/')).toBe('instagram_click');
  });
  it('returns null for internal navigation', () => {
    expect(resolveCtaEvent('/contact/')).toBeNull();
    expect(resolveCtaEvent('/offerings/omakase/')).toBeNull();
    expect(resolveCtaEvent('#final-cta')).toBeNull();
  });
});
