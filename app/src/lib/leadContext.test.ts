import { describe, it, expect } from 'vitest';
import { parseSource } from './leadContext';

describe('parseSource', () => {
  it('prefers utm_source and joins medium/campaign', () => {
    expect(parseSource('?utm_source=instagram&utm_medium=bio&utm_campaign=launch', '', '/')).toEqual({
      source: 'instagram / bio / launch',
      landing: '/',
    });
  });
  it('accepts a bare ?source= param', () => {
    expect(parseSource('?source=linkedin', '', '/offerings/')).toEqual({
      source: 'linkedin',
      landing: '/offerings/',
    });
  });
  it('falls back to the external referrer hostname', () => {
    expect(parseSource('', 'https://www.google.com/search?q=clear+ice', '/')).toEqual({
      source: 'google.com',
      landing: '/',
    });
  });
  it('treats own-domain referrer as direct', () => {
    expect(parseSource('', 'https://www.iceinstinct.com/gallery/', '/contact/')).toEqual({
      source: 'direct',
      landing: '/contact/',
    });
  });
  it('survives an unparseable referrer', () => {
    expect(parseSource('', 'not a url', '/')).toEqual({ source: 'direct', landing: '/' });
  });
  it('returns direct when nothing is known', () => {
    expect(parseSource('', '', '/')).toEqual({ source: 'direct', landing: '/' });
  });
  it('treats a look-alike domain as an external referrer', () => {
    expect(parseSource('', 'https://evil-iceinstinct.com/phish', '/')).toEqual({
      source: 'evil-iceinstinct.com',
      landing: '/',
    });
  });
});
