import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import './lib/funnelInit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Privacy } from './pages/Privacy';
createRoot(document.getElementById('root')!).render(<StrictMode><Privacy /></StrictMode>);
