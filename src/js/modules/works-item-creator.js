import { render } from '../utils/helpers';

function createWorks(works) {
  const toHtml = workData => `
  <div class="fr">
    <div class="fr__item folio__thumb">
      <img src="${workData.imageUrl}" alt="${workData.name}" />
    </div>
  </div>
  <div class="fr">
    <div class="fr__item folio__content">
      <h2 class="folio__title">${workData.name}</h2>
      <p class="folio__description">${workData.tags.join(' ')}</p>
      <p class="folio__text">
      ${workData.descript}
      </p>
    </div>
  </div>
  `;

  render(works, '.page__folio', toHtml);
}

export default createWorks;
