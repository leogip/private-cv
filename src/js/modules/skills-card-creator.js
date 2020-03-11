import { render } from '../utils/helpers';

function createCards(cards) {
  const toHtml = cardData => {
    let listHtml = [];

    if (!cardData.list.length == 0) {
      listHtml = cardData.list.map(item => `<li>${item}</li>`);
    }

    return `
    <div class="skills__slide swiper-slide">
      <article class="skills__card skill">
        <div class="skill__thumb">
          <img src="${cardData.imageUrl}" alt="${cardData.name}">
        </div>
        <div class="skill__infos">
          <h2 class="skill__title">${cardData.name}</h2>
          <ul class="skill__list">
          ${listHtml.join('')}
          </ul>
        </div>
      </article>
    </div>
    `;
  };

  render(cards, '.skills__wrap', toHtml);
}

export default createCards;
