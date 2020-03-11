import anime from 'animejs/lib/anime.es.js';

export default () => {
  anime
    .timeline({
      easing: 'easeOutExpo'
    })
    .add({
      targets: '.view__name',
      height: ['0rem', '3.6rem'],
      opacity: [0, 1],
      offset: '-=900'
    })
    .add({
      targets: '.view__count',
      height: ['0rem', '5rem'],
      opacity: [0, 1],
      offset: '-=800'
    })
    .add({
      targets: '.social a',
      translateX: [500, 0],
      opacity: [0, 1],
      delay: (el, i) => 200 * i,
      offset: '-=1000'
    })
    .add({
      targets: '.view__arrow',
      translateY: [500, 0],
      opacity: [0, 1],
      delay: (el, i) => 200 * i,
      offset: '-=1000'
    });
};
