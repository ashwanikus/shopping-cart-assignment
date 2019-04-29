window.carousel = function(slides, dotsElem, dots, isDotElem, prevElem, nextElem) {
  let slideIndex = 1;
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let i;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
  }

  return {
    init: function() {
      showSlides(slideIndex);
      prevElem.addEventListener('click', function() {
        plusSlides(-1);
      });
      nextElem.addEventListener('click', function() {
        plusSlides(1);
      });
      dotsElem.addEventListener('click', function(e) {
        if (isDotElem(e.target)) {
          currentSlide(e.target.dataset.index + 1);
        }
      });
    }
  };
};
