import '../css/global.css';
import '../css/skills.css';

import createCards from './modules/skills-card-creator';
import initSwiper from './modules/skills-initial-swiper';
import pageStart from './modules/glob-page-start';
import { cards } from './modules/data';

pageStart();
createCards(cards);
initSwiper('.swiper-container');
