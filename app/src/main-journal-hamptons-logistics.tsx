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
import { articleHamptonsEstateLogistics } from './data/journal/hamptons-estate-cocktail-logistics';
createRoot(document.getElementById('root')!).render(
  <StrictMode><JournalArticle article={articleHamptonsEstateLogistics} /></StrictMode>
);
