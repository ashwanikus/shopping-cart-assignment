Handlebars.registerHelper('inc', function (index, options) {
    return parseInt(index) + 1;
});

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

    updateCartItem();
}

function createCategoryContainer(data) {
    let categoryTemplate = document.getElementById("categoryTemplates").innerHTML;
    let compiledTemplate = Handlebars.compile(categoryTemplate);
    let generatedHtml = compiledTemplate(data);

    let categoryContainer = document.getElementById("category_container");
    categoryContainer.innerHTML = generatedHtml;
}

function createSlideshowDots(data) {
    let categoryTemplate = document.getElementById("slideshow-row__dotTemplates").innerHTML;
    let compiledTemplate = Handlebars.compile(categoryTemplate);
    let generatedHtml = compiledTemplate(data);

    let categoryContainer = document.getElementById("slideshow-row__dot");
    categoryContainer.innerHTML += generatedHtml;
}

function createSlideshow(data) {
    let slideshowTemplates = document.getElementById("slideshowTemplates").innerHTML;
    let slideshowCompiledTemplate = Handlebars.compile(slideshowTemplates);
    let generatedHtml = slideshowCompiledTemplate(data);

    let categoryContainer = document.getElementById("slideshow");
    categoryContainer.innerHTML += generatedHtml;


    (function () {
        carousal(
            document.getElementsByClassName('mySlides'),
            document.getElementsByClassName('dot'),
            document.getElementById('prev'),
            document.getElementById('next')
        ).init();
    })();

    let elem = document.getElementById("next");
    setInterval(function () {
        elem.click();
    }, 10000);
}
