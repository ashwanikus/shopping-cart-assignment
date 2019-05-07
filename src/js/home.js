let homeContent = {
    createCategoryContainer: function (data) {
        common_script.render("category", "category_container", data, "remove");
    },
    createSlideshowDots: function (data) {
        common_script.render("dots", "slideshow-row__dot", data, "remove");
    },
    createSlideshow: function (data) {
        common_script.render("banners", "slideshow", data, "append");

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

