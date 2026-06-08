import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import './styles/offering.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Contact } from './pages/Contact';
createRoot(document.getElementById('root')!).render(<StrictMode><Contact /></StrictMode>);
