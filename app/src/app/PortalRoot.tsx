import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
export function PortalRoot({ children }: { children: React.ReactNode }) {
  const [el] = useState(() => document.createElement('div'));
  useEffect(() => { el.id = 'overlay-root'; document.body.appendChild(el); return () => { document.body.removeChild(el); }; }, [el]);
  return createPortal(children, el);
}
