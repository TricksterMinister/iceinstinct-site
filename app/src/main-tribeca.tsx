import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import './styles/offering.css';
import './styles/concierge.css';
import './lib/funnelInit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TribecaPage } from './pages/Tribeca';
createRoot(document.getElementById('root')!).render(
  <StrictMode><TribecaPage /></StrictMode>
);
