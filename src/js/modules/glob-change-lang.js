export function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
}

export function toggleLang() {
  let attr = this.getAttribute('data-lang');

  if (localStorage.getItem('lang') === 'ru' && attr === 'en') {
    setLang('en');
    document.location.reload(true);
  } else if (localStorage.getItem('lang') === 'en' && attr === 'ru') {
    setLang('ru');
    document.location.reload(true);
  }
}
