window.onload = function () {
    var cData = api_request.get_endpoint("categories");
    cData.then(function (data) {
        createCategoryContainer(data);
    });

    var bannerData = api_request.get_endpoint("banners");
    bannerData.then(function (data) {
        createSlideshowDots(data);
        createSlideshow(data);
    });

    common_script.updateCartItem();
}

function createCategoryContainer(data) {
    common_script.render("categoryTemplates", "category_container", data);
}

function createSlideshowDots(data) {
    common_script.render("slideshow-row__dotTemplates", "slideshow-row__dot", data);
}

function createSlideshow(data) {
    common_script.render("slideshowTemplates", "slideshow", data);

    (function () {
        carousal(
            document.getElementsByClassName('mySlides'),
            document.getElementsByClassName('dot'),
            document.getElementById('prev'),
            document.getElementById('next')
        ).start();
    })();

    let elem = document.getElementById("next");
    setInterval(function () {
        elem.click();
    }, 10000);
}
