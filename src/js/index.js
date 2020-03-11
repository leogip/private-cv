import '../css/global.css';
import '../css/index.css';

import pageStart from './modules/glob-page-start';
import PageSlider from './modules/index-page-slider';
import animaControl from './modules/index-anima-control';
import animaArrows from './modules/index-anima-arrows';
import { pages } from './modules/data';

new PageSlider({
  pages,
  pageContainForm: 3,
  selectorPrev: '.view__arrow.prev',
  selectorNext: '.view__arrow.next',
  selectorNav: '.nav__link'
});
pageStart();
animaControl();
animaArrows('.view__arrow');
