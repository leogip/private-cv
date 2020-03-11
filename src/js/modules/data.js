import dataRu from '../../../public/data-ru.json';
import dataEn from '../../../public/data-en.json';

let pages, cards, works;

if (localStorage.getItem('lang') === 'ru') {
  pages = dataRu.pages;
  cards = dataRu.cards;
  works = dataRu.works;
} else {
  pages = dataEn.pages;
  cards = dataEn.cards;
  works = dataEn.works;
}

export { pages, cards, works };
