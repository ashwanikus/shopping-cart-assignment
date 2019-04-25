
Handlebars.registerHelper('ifFirstIndex', function (index, options) {
    if (index == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
// --------------------------------------------- //
// fetching the category on product listing
// --------------------------------------------- //
let prod_categoriesXHttp = new XMLHttpRequest();
prod_categoriesXHttp.open("GET", "categories", true);
prod_categoriesXHttp.onload = function () {
    if (prod_categoriesXHttp.status >= 200 && prod_categoriesXHttp.status < 400) {
        let data = JSON.parse(prod_categoriesXHttp.responseText);
        createProdCategoryContainer(data);
    } else {
        console.log("We conected to the server, but it returned an error.");
    }
}
prod_categoriesXHttp.onerror = function () {
    console.log("Connection Error");
}
prod_categoriesXHttp.send();

function createProdCategoryContainer(data) {
    let slideshowTemplates = document.getElementById("productMenuTemplates").innerHTML;
    let slideshowCompiledTemplate = Handlebars.compile(slideshowTemplates);
    let generatedHtml = slideshowCompiledTemplate(data);

    let categoryContainer = document.getElementById("productMenu");
    categoryContainer.innerHTML += generatedHtml;

    let header = document.getElementById("productMenu");
    let btns = header.getElementsByClassName("links");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}
// --------------------------------------------- //
//end fetching the category on product listing
// --------------------------------------------- //



// --------------------------------------------- //
// fetching the products on product listing
// --------------------------------------------- //
let productsXHttp = new XMLHttpRequest();
productsXHttp.open("GET", "products", true);
productsXHttp.onload = function () {
    if (productsXHttp.status >= 200 && productsXHttp.status < 400) {
        let data = JSON.parse(productsXHttp.responseText);
        createProductsContainer(data);
    } else {
        console.log("We conected to the server, but it returned an error.");
    }
}
productsXHttp.onerror = function () {
    console.log("Connection Error");
}
productsXHttp.send();

function createProductsContainer(data) {
    let slideshowTemplates = document.getElementById("productListingTemplates").innerHTML;
    let slideshowCompiledTemplate = Handlebars.compile(slideshowTemplates);
    let generatedHtml = slideshowCompiledTemplate(data);

    let categoryContainer = document.getElementById("product_listing");
    categoryContainer.innerHTML = generatedHtml;
}
// --------------------------------------------- //
// end fetching the products on product listing
// --------------------------------------------- //



// --------------------------------------------- //
// products filter on product listing
// --------------------------------------------- //
function renderProducts(id) {
    let productsByIdXHttp = new XMLHttpRequest();
    productsByIdXHttp.open("GET", "products?id=" + id, true);
    productsByIdXHttp.onload = function () {
        if (productsByIdXHttp.status >= 200 && productsByIdXHttp.status < 400) {
            let data = JSON.parse(productsByIdXHttp.responseText);
            createProductsContainer(data);
        } else {
            console.log("We conected to the server, but it returned an error.");
        }
    }
    productsByIdXHttp.onerror = function () {
        console.log("Connection Error");
    }
    productsByIdXHttp.send();
}
// --------------------------------------------- //
// end products filter on product listing
// --------------------------------------------- //

// --------------------------------------------- //
// add to cart on product listing
// --------------------------------------------- //
function addToCart(id) {
    let addToCartXHttp = new XMLHttpRequest();
    addToCartXHttp.open("GET", "addTocart/" + id, true);
    addToCartXHttp.onload = function () {
        if (addToCartXHttp.status >= 200 && addToCartXHttp.status < 400) {
            let data = JSON.parse(addToCartXHttp.responseText);
            window.location.href = "/cart.html";
            //document.getElementById('cart_count').innerHTML = data.items_count;
        } else {
            console.log("We conected to the server, but it returned an error.");
        }
    }
    addToCartXHttp.onerror = function () {
        console.log("Connection Error");
    }
    addToCartXHttp.send();
}
    // --------------------------------------------- //
    // end add to cart on product listing
    // --------------------------------------------- //
