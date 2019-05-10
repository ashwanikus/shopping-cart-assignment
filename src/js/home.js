let homeContent = {
    createCategoryContainer: function (data) {
        common_script.render("category", "category_container", data, "remove");
    },
    createSlideshowDots: function (data) {
        common_script.render("dots", "slideshow-row__dot", data, "remove");
    },
    createSlideshow: function (data) {
        common_script.render("banners", "slideshow", data, "append");

        let slider = carousal(
            document.getElementsByClassName('slideshow__container--fade'),
            document.getElementsByClassName('slideshow__dots--inactive'),
            document.getElementsByClassName('slideshow__prev')[0],
            document.getElementsByClassName('slideshow__next')[0]
        );

        slider.start();

        setInterval(function () {
            slider.animate();
        }, timeout_int);
    }
}

window.onload = function () {
    let cData = api_request.get_endpoint("categories");
    cData.then(function (data) {
        homeContent.createCategoryContainer(data);
    });

    let bannerData = api_request.get_endpoint("banners");
    bannerData.then(function (data) {
        homeContent.createSlideshowDots(data);
        homeContent.createSlideshow(data);
    });

    common_script.updateCartItem();
}

