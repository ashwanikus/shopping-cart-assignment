(function init() {
  carousel(
    document.getElementsByClassName('carousel__item'),
    document.getElementsByClassName('carousel_pagination__dot'),
    document.getElementsByClassName('carousel__navigation--prev')[0],
    document.getElementsByClassName('carousel__navigation--next')[0]
  ).init();
})();
