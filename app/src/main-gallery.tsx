import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import './styles/profiler.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GalleryPage } from './pages/GalleryPage';
createRoot(document.getElementById('root')!).render(<StrictMode><GalleryPage /></StrictMode>);
