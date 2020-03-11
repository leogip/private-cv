import anime from 'animejs/lib/anime.es.js';

export default () => {
  anime
    .timeline({
      easing: 'easeOutExpo'
    })
    .add({
      targets: ['.first', '.last'],
      width: '0px',
      delay: el => (el.classList.contains('first') ? 0 : 1500),
      duration: 1500,
      easing: 'easeInOutQuad'
    })
    .add(
      {
        targets: '.header',
        width: ['0', '80%']
      },
      '-=1000'
    )
    .add(
      {
        targets: '.header__logo',
        width: ['0', '17rem']
      },
      '-=800'
    )
    .add(
      {
        targets: '.header__lang',
        width: ['0', '9rem']
      },
      '-=600'
    )
    .add(
      {
        targets: [
          '.header__logo a, .header__nav .nav__link, .header__lang span'
        ],
        opacity: [0, 1],
        translateY: [20, 0],
        delay: (el, i) => 100 * i,
        complete: () => {
          document.querySelector('.first').remove();
          document.querySelector('.last').remove();
        }
      },
      '-=900'
    );
};
