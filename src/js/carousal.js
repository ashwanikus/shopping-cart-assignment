let carousal = function (slides, dots, prev, next) {
    console.log(slides, dots, prev, next);

    let slideIndex = 1;
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    return {
        start: function () {
            showSlides(slideIndex);
            prev.addEventListener('click', function () {
                plusSlides(-1);
            });
            next.addEventListener('click', function () {
                plusSlides(1);
            });
            for (let i = 0; i < dots.length; i++) {
                dots[i].addEventListener("click", function () {
                    currentSlide(i + 1);
                }, false);
            }
        }
    };
}
