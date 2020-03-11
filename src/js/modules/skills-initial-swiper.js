import Swiper from 'swiper';

function initSwiper(swiperContainer) {
  new Swiper(swiperContainer, {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    keyboard: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    speed: 300,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 3,
      slideShadows: false
    },
    breakpoints: {
      480: {
        spaceBetween: 0,
        centeredSlides: true
      }
    },
    simulateTouch: true,
    navigation: {
      nextEl: '.skills__arrow_next',
      prevEl: '.skills__arrow_prev'
    },
    pagination: {
      el: '.skills__pagination',
      clickable: true
    }
  });
}

export default initSwiper;
