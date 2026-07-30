import './styles/accent.css';
import './styles/styles.css';
import './styles/footer.css';
import './styles/cinema-chrome.css';
import './styles/offering.css';
import './styles/sections.css';
import './styles/journal.css';
import './lib/funnelInit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { JournalArticle } from './pages/JournalArticle';
import { articleCateringVsAtelier } from './data/journal/cocktail-catering-vs-mixology-atelier';
createRoot(document.getElementById('root')!).render(
  <StrictMode><JournalArticle article={articleCateringVsAtelier} /></StrictMode>
);
