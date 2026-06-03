import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Foundation } from './pages/Foundation';
createRoot(document.getElementById('root')!).render(<StrictMode><Foundation /></StrictMode>);
