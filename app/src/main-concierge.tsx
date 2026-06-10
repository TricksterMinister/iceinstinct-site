import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import './styles/concierge.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConciergePage } from './pages/ConciergePage';
createRoot(document.getElementById('root')!).render(<StrictMode><ConciergePage /></StrictMode>);
