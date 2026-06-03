import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGsap(setup: (ctx: gsap.Context) => void, scope?: React.RefObject<HTMLElement>) {
  const ref = useRef(setup);
  ref.current = setup;
  useEffect(() => {
    const ctx = gsap.context((self) => ref.current(self), scope?.current ?? undefined);
    return () => ctx.revert();
  }, [scope]);
}
