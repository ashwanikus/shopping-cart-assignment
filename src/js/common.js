let common_script = {
    render: function (templateid, container, data, operator) {        
        let templates = hbs[templateid];
        let compiledTemplate = Handlebars.compile(templates);
        let generatedHtml = compiledTemplate(data);

        let showcase = document.getElementById(container);
        if (operator == "append") {
            showcase.innerHTML += generatedHtml;
        }
        if (operator == "remove") {
            showcase.innerHTML = generatedHtml;
        }
    },
    updateCartItem: function () {
        var item_count_data = api_request.get_endpoint("itemcount");
        item_count_data.then(function (data) {
            if (data.items_count != 0) {
                document.getElementById('cart_count0').innerHTML = data.items_count;
                document.getElementById('cart_count1').innerHTML = data.items_count;
            } else {
                document.getElementById('cart_count0').innerHTML = 0;
                document.getElementById('cart_count1').innerHTML = 0;
            }

            if (window.location.pathname == "/cart.html") {
                document.getElementById('checkoutAmount').innerHTML = data.checkout;
                document.getElementById('item_span').innerHTML = data.items_count;
            }
        });
    }
};