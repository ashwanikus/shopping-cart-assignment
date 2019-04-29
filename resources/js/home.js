(function init() {
  carousel(
    document.getElementsByClassName('carousel__item'),
    document.getElementsByClassName('carousel-dots')[0],
    document.getElementsByClassName('carousel-dots__dot'),
    function(target) {
      return target.matches('.carousel-dots__dot');
    },
    document.getElementsByClassName('carousel__navigation--prev')[0],
    document.getElementsByClassName('carousel__navigation--next')[0]
  ).init();
})();
