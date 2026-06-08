import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
export function PortalRoot({ children }: { children: React.ReactNode }) {
  // Create the host element lazily on the client only. During build-time SSR
  // (renderToString) `document` does not exist, so we render nothing; the
  // client createRoot pass mounts the real portal. No hydration is used, so
  // there is no mismatch risk.
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = document.createElement('div');
    node.id = 'overlay-root';
    document.body.appendChild(node);
    setEl(node);
    return () => { if (node.isConnected) document.body.removeChild(node); };
  }, []);
  if (!el) return null;
  return createPortal(children, el);
}
