import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGsap(
  setup: (ctx: gsap.Context) => void | (() => void),
  scope?: React.RefObject<HTMLElement>
) {
  const ref = useRef(setup);
  ref.current = setup;
  useEffect(() => {
    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      cleanup = ref.current(self);
    }, scope?.current ?? undefined);
    return () => {
      if (typeof cleanup === 'function') cleanup();
      ctx.revert();
    };
  }, [scope]);
}
