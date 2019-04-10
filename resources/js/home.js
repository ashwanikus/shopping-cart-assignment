(function(slides, dots, prevElem, nextElem) {
  let slideIndex = 1;
  showSlides(slideIndex);

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

  prevElem.addEventListener('click', () => plusSlides(-1));
  nextElem.addEventListener('click', () => plusSlides(1));
  [].forEach.call(dots, (element, index) => {
    element.addEventListener('click', () => currentSlide(index + 1));
  });
})(
  document.getElementsByClassName('mySlides'),
  document.getElementsByClassName('dot'),
  document.getElementsByClassName('prev')[0],
  document.getElementsByClassName('next')[0]
);
