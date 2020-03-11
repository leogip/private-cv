import anime from 'animejs/lib/anime.es.js';

export default arrowsSelector => {
  const viewArrowsEl = document.querySelectorAll(arrowsSelector);

  function animaHoverArrow(viewArrow) {
    anime.remove(viewArrow);
    anime({
      targets: viewArrow,
      scale: 1.1,
      translateX: -5,
      translateY: -5,
      easing: 'easeOutExpo'
    });
  }

  function animaLeaveArrow(viewArrow) {
    anime.remove(viewArrow);
    anime({
      targets: viewArrow,
      scale: 1,
      translateX: 0,
      translateY: 0,
      easing: 'easeOutExpo'
    });
  }

  viewArrowsEl.forEach(viewArrow => {
    viewArrow.addEventListener('mouseenter', () => animaHoverArrow(viewArrow));
    viewArrow.addEventListener('mouseleave', () => animaLeaveArrow(viewArrow));
    viewArrow.addEventListener('focus', () => animaHoverArrow(viewArrow));
    viewArrow.addEventListener('blur', () => animaLeaveArrow(viewArrow));
  });
};
