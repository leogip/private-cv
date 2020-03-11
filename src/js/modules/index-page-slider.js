import anime from 'animejs/lib/anime.es.js';
import Form from './index-creator-form';
import { _createElement, render } from '../utils/helpers';

class PageSlider {
  constructor({
    pages,
    pageContainForm,
    selectorPrev,
    selectorNext,
    selectorNav
  }) {
    this.pages = pages;
    this.pageContainForm = pageContainForm;
    this.lengthPages = this.pages.length - 1;

    this.createNavigation(this.pages, this.currentPageIndex);
    this.init(selectorPrev, selectorNext, selectorNav);
  }

  createNavigation(pages) {
    const toHtml = pageData => `
    <li class="nav__item">
      <a href="${pageData.link}" class="nav__link ${
      pageData.id === this.currentPageIndex ? 'nav__link_active' : ''
    }">
        ${pageData.name}
      </a>
    </li>
    `;
    render(pages, '.nav', toHtml);
  }

  init(selectorPrev, selectorNext, selectorNav) {
    this.prevNav = document.querySelector(selectorPrev);
    this.nextNav = document.querySelector(selectorNext);
    this.navLinks = document.querySelectorAll(selectorNav);
    this.creatorForm = new Form();
    this.prevHistoryState = {};

    history.pushState(
      { link: window.location.pathname },
      '',
      window.location.pathname
    );

    const { id: pageId, ...currentPageData } = this._getCurrentPage();

    this.currentPageIndex = pageId;
    this.insertPage(currentPageData, pageId);

    this.navLinks.forEach(eachLink => {
      eachLink.addEventListener('click', this.changeLinkPage.bind(this));
    });
    this.prevNav.addEventListener('click', this.prevPage.bind(this));
    this.nextNav.addEventListener('click', this.nextPage.bind(this));

    window.onpopstate = () => {
      const { id: pageId, ...currentPageData } = this._getCurrentPage();

      this.insertPage(currentPageData, pageId);
    };
  }

  insertPage(pageData, currentPageIndex) {
    const container = document.querySelector('.page__update');
    const content = this.createPage(pageData, currentPageIndex);
    this.navLinks.forEach(eachLink => {
      eachLink.classList.remove('nav__link_active');
    });

    anime.remove(['.page__text', '.page__content']);
    anime
      .timeline({
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.page__text',
        opacity: [1, 0],
        translateY: [0, 100],
        duration: 350
      })
      .add({
        targets: '.page__content',
        opacity: [1, 0],
        translateY: [0, -100],
        duration: 350,
        complete: () => {
          document.querySelector('.page').remove();
          this.insertControlName(pageData.name, currentPageIndex);
        }
      });

    setTimeout(() => {
      container.appendChild(content);
      this.navLinks[currentPageIndex].classList.add('nav__link_active');

      anime
        .timeline({
          easing: 'easeOutExpo'
        })
        .add({
          targets: '.page__text',
          opacity: [0, 1],
          translateY: [100, 0],
          offset: '-=1500'
        })
        .add({
          targets: '.page__content',
          opacity: [0, 1],
          translateY: [-100, 0],
          offset: '-=1500'
        });
    }, 700);
  }

  createPage(pageData, currentPageIndex) {
    const contentWrap = _createElement('div', {
      className: 'page',
      role: 'banner'
    });
    const contentText = _createElement('section', {
      className: 'page__text'
    });

    const contentTitle = `
    <h1 class="page__title">${pageData.title}</h1>
    <p class="page__desc">${pageData.content}</p>
    `;
    contentText.insertAdjacentHTML('afterbegin', contentTitle);

    let pageActive = '';

    if (pageData.buttonLink && pageData.buttonText) {
      pageActive = `
      <a href="${pageData.buttonLink}" target="_blank" class="page__button">
        ${pageData.buttonText}
        <i class="icon-plus"></i>
      </a>
      `;
      contentText.insertAdjacentHTML('beforeend', pageActive);
    }

    if (this.pageContainForm === currentPageIndex) {
      pageActive = this.creatorForm.createForm();
      contentText.insertAdjacentElement('beforeend', pageActive);
    }

    const contentImage = `
    <section class="page__content">
    <img src="${pageData.imageUrl}" alt="${pageData.title}" />
    </section>
    `;

    contentWrap.insertAdjacentElement('afterbegin', contentText);
    contentWrap.insertAdjacentHTML('beforeend', contentImage);

    return contentWrap;
  }

  insertControlName(pageName, pageIndex) {
    const pageDisplayNameEl = document.querySelector('.view__name');
    const pageCountEl = document.querySelector('.view__count h2');
    const pageCountLoaderEl = document.querySelector('.view__loader-line');
    pageDisplayNameEl.innerText = pageName;
    pageCountEl.innerText = `0${pageIndex + 1}`;
    pageCountLoaderEl.style.width =
      (100 / this.lengthPages) * parseInt(pageIndex) + '%';
  }

  changeLinkPage(event) {
    event.preventDefault();

    this.prevHistoryState = this._getPrevHistoryState(this.currentPageIndex);

    history.pushState(
      {
        link: event.target.getAttribute('href'),
        ...this.prevHistoryState
      },
      '',
      event.target.getAttribute('href')
    );

    const { id: pageId, ...currentPageData } = this._getCurrentPage();
    this.currentPageIndex = pageId;

    this.insertPage(currentPageData, pageId);
  }

  prevPage() {
    if (this.currentPageIndex > 0) {
      this.prevHistoryState = this._getPrevHistoryState(this.currentPageIndex);
      this.currentPageIndex--;
      this._historyPushState(this.currentPageIndex, this.prevHistoryState);
      this.insertPage(this._getCurrentPage(), this.currentPageIndex);
    } else {
      this.prevHistoryState = this._getPrevHistoryState(this.currentPageIndex);
      this.currentPageIndex = this.lengthPages;
      this._historyPushState(this.currentPageIndex, this.prevHistoryState);
      this.insertPage(this._getCurrentPage(), this.currentPageIndex);
    }
  }

  nextPage() {
    if (this.currentPageIndex < this.lengthPages) {
      this.prevHistoryState = this._getPrevHistoryState(this.currentPageIndex);
      this.currentPageIndex++;
      this._historyPushState(this.currentPageIndex, this.prevHistoryState);
      this.insertPage(this._getCurrentPage(), this.currentPageIndex);
    } else {
      this.prevHistoryState = this._getPrevHistoryState(this.currentPageIndex);
      this.currentPageIndex = 0;
      this._historyPushState(this.currentPageIndex, this.prevHistoryState);
      this.insertPage(this._getCurrentPage(), this.currentPageIndex);
    }
  }

  _getPrevHistoryState(index) {
    let { link } = this.pages.find(({ id }) => id === index);
    return { prevId: index, prevLink: link };
  }

  _historyPushState(index, prevHistoryState) {
    history.pushState(
      { link: this.pages[index].link, ...prevHistoryState },
      '',
      this.pages[index].link
    );
  }

  _getCurrentPage() {
    let currentLink = history.state.link;
    return this.pages.find(({ link }) => link === currentLink);
  }
}

export default PageSlider;
