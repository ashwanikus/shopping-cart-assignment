Handlebars.registerHelper("multiply", function (a, b) {
    return parseInt(a) * parseInt(b);
});

function itemReq(endpoint) {
    let cartItemsReq = new XMLHttpRequest();
    cartItemsReq.open("GET", endpoint, true);
    cartItemsReq.onload = function () {
        if (cartItemsReq.status >= 200 && cartItemsReq.status < 400) {
            let data = JSON.parse(cartItemsReq.responseText);          
            document.getElementById('cart_count').innerHTML = data.items_count;
            itemListsRender(data);
        } else {
            console.log("We conected to the server, but it returned an error.");
        }
    }
    cartItemsReq.onerror = function () {
        console.log("Connection Error");
    }
    cartItemsReq.send();
}
itemReq("cartitems"); // fetch data for the first time whem cart page is loading


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
            itemReq(`updateCart/${id}/inc`);
            updateCartItem();
            itemInput.value = parseInt(itemInput.value) + 1;
            break;
        case "dec":
            if (parseInt(itemInput.value) >= 0) {
                itemReq(`updateCart/${id}/dec`);
                updateCartItem();
                itemInput.value = parseInt(itemInput.value) - 1;
            }
            break;
        default: console.log("Worong input");
    }

}