Handlebars.registerHelper("multiply", function (a, b) {
    return parseInt(a) * parseInt(b);
});

window.onload = function () {
    updateCartItem();
    itemReq("cartitems", document.getElementById('cart_count0'), document.getElementById('cart_count1')); // fetch data for the first time whem cart page is loading    
}


function itemReq(endpoint, cart_count0, cart_count1) {
    var cartData = api_request.get_endpoint(endpoint);
    cartData.then(function (data) {
        cart_count0.innerHTML = data.items_count;
        cart_count1.innerHTML = data.items_count;
        itemListsRender(data);
    });
}



function itemListsRender(data) {
    let itemListTemplates = document.getElementById("displaying_cart_itemsTemplates").innerHTML;
    let itemListCompiledTemplate = Handlebars.compile(itemListTemplates);
    let generatedHtml = itemListCompiledTemplate(data);

    let itemListContainer = document.getElementById("displaying_cart_items");
    itemListContainer.innerHTML = generatedHtml;
}

function changeQuantity(id, task, li_no) {
    let itemInput = document.getElementById("item" + li_no);
    switch (task) {
        case "inc":
            itemReq(`updateCart/${id}/inc`, document.getElementById('cart_count0'), document.getElementById('cart_count1'));
            updateCartItem();
            itemInput.value = parseInt(itemInput.value) + 1;
            break;
        case "dec":
            if (parseInt(itemInput.value) >= 0) {
                itemReq(`updateCart/${id}/dec`, document.getElementById('cart_count0'), document.getElementById('cart_count1'));
                updateCartItem();
                itemInput.value = parseInt(itemInput.value) - 1;
            }
            break;
        default: console.log("Wrong input");
    }
}

