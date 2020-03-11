import '../css/global.css';
import '../css/works.css';

import pageStart from './modules/glob-page-start';
import createWorks from './modules/works-item-creator';
import { works } from './modules/data';

pageStart();
createWorks(works);
