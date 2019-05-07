let productsEngine = {
    createProdCategoryContainer: function (data) {
        common_script.render("productsMenu", "productMenu", data, "remove");

        let header = document.getElementById("productMenu");
        let btns = header.getElementsByClassName("links");
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                let current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    },
    createProductsContainer: function (data) {
        common_script.render("productListing", "product_listing", data, "remove");
    },
    addToCart: function (id) {
        let productData = api_request.get_endpoint("addTocart/" + id);
        productData.then(function (data) {
            window.location.href = "/cart.html";
        });
    }
};

let productRender = {
    render: function (id) {
        let productData = api_request.get_endpoint("products?id=" + id);
        productData.then(function (data) {
            productsEngine.createProductsContainer(data);
        });
    }
}


window.onload = function () {
    let add_item_cart = document.getElementsByClassName("add_items");
    let add_item_id = document.getElementsByClassName("item_id");

    let product_nav = document.getElementsByClassName("links");
    let product_nav_values = document.getElementsByClassName("links_input");

    setTimeout(function () {
        for (let i = 0; i < add_item_cart.length; i++) {
            add_item_cart[i].addEventListener("click", function () {
                console.log(add_item_id[i].value, i);
                productsEngine.addToCart(add_item_id[i].value);
            }, false);
        }

        for (let i = 0; i < product_nav.length; i++) {
            product_nav[i].addEventListener("click", function () {
                productRender.render(product_nav_values[i].value);
            }, false);
        }
    }, 100);




    // --------------------------------------------- //
    // fetching the category on product listing
    // --------------------------------------------- //
    let categoriesData = api_request.get_endpoint("categories");
    categoriesData.then(function (data) {
        productsEngine.createProdCategoryContainer(data);
    });
    // --------------------------------------------- //
    //end fetching the category on product listing
    // --------------------------------------------- //


    // --------------------------------------------- //
    // fetching the products on product listing
    // --------------------------------------------- //

    let productData = api_request.get_endpoint("products");
    productData.then(function (data) {
        productsEngine.createProductsContainer(data);
    });

    common_script.updateCartItem();
}


