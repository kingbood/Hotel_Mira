import './styles/main.css';
import { initLoader } from './scripts/loader';
import { initThemeToggle } from './scripts/theme';
import { initHeroVideo } from './scripts/hero-video';
import { initMenuToggle } from './scripts/menu';
import { initRoomsPreview } from './scripts/rooms-catalog';
import { initTerritory } from './scripts/territory';
import { initQuiz } from './scripts/quiz';

initLoader();
initThemeToggle();
initHeroVideo();
initMenuToggle();
initRoomsPreview(['mira-1', 'panorama-1', 'lazur-1']);
initTerritory();
initQuiz();
