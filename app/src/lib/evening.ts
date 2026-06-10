// "Your evening" - the guest's selected OPTIONAL enhancements, persisted in
// sessionStorage so the choice survives navigation (Concierge -> Offering ->
// booking). Ice & Temperature is NOT here: it is standard in every evening, not
// an opt-in, so it can never be forgotten.

import { useEffect, useState } from 'react';

export type OptionalEnh = { id: string; name: string; price: string };

export const OPTIONAL_ENH: OptionalEnh[] = [
  { id: 'cigar-curator', name: 'Bespoke Cigar Curator', price: '$500' },
  { id: 'additional-staff', name: 'Additional Bar Staff', price: '$350' },
  { id: 'the-curator', name: 'The Curator', price: '$350' },
  { id: 'glassware', name: 'Glassware & Vessels', price: '$250' },
];

const KEY = 'ii-evening';
const EVENT = 'ii-evening-change';

export function readEvening(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.sessionStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeEvening(names: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(names));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* private mode / unavailable - selection simply will not persist */
  }
}

/** Read + toggle the selection, staying in sync across components and tabs. */
export function useEvening(): [string[], (name: string) => void] {
  const [picked, setPicked] = useState<string[]>([]);
  useEffect(() => {
    setPicked(readEvening());
    const sync = () => setPicked(readEvening());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  const toggle = (name: string) => {
    const cur = readEvening();
    const next = cur.includes(name) ? cur.filter((x) => x !== name) : [...cur, name];
    writeEvening(next);
    setPicked(next);
  };
  return [picked, toggle];
}
