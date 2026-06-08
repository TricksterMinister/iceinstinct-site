import { useSyncExternalStore } from 'react';

export type Temperament = 'ice' | 'instinct' | null;
type FunnelState = { temperament: Temperament };

let state: FunnelState = { temperament: null };
const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

export const funnel = {
  setTemperament(t: Temperament) { state = { ...state, temperament: t }; emit(); },
  getState() { return state; },
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
};

export function useFunnel(): FunnelState {
  return useSyncExternalStore(funnel.subscribe, funnel.getState, funnel.getState);
}
