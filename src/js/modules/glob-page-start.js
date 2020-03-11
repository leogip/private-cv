import { setTheme, toggleTheme } from './glob-change-theme';
import { setLang, toggleLang } from './glob-change-lang';
import animaLoad from './glob-anima-load';

export default () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const themeCheck = document.querySelector('#switch__slider');
  const langRu = document.querySelector('[data-lang="ru"]');
  const langEn = document.querySelector('[data-lang="en"]');

  if (localStorage.getItem('theme') === 'theme_color_dark') {
    setTheme('theme_color_dark');
    themeCheck.checked = false;
  } else {
    setTheme('theme_color_light');
    themeCheck.checked = true;
  }

  if (localStorage.getItem('lang') === 'ru') {
    setLang('ru');
    langRu.classList.add('nav__link_active');
  } else {
    setLang('en');
    langEn.classList.add('nav__link_active');
  }

  themeCheck.addEventListener('change', toggleTheme);
  langRu.addEventListener('click', toggleLang);
  langEn.addEventListener('click', toggleLang);

  animaLoad();
};
