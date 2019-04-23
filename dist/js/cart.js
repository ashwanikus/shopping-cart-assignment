console.log("cart");
var cartItemsReq = new XMLHttpRequest();
cartItemsReq.open("GET", "cartitems", true);
cartItemsReq.onload = function () {
    if (cartItemsReq.status >= 200 && cartItemsReq.status < 400) {
        var data = JSON.parse(cartItemsReq.responseText);
        itemListsRender(data);
    } else {
        console.log("We conected to the server, but it returned an error.");
    }
}
cartItemsReq.onerror = function () {
    console.log("Connection Error");
}
cartItemsReq.send();


function itemListsRender(data) {
    var itemListTemplates = document.getElementById("displaying_cart_itemsTemplates").innerHTML;
    var itemListCompiledTemplate = Handlebars.compile(itemListTemplates);
    var generatedHtml = itemListCompiledTemplate(data);

    var itemListContainer = document.getElementById("displaying_cart_items");
    itemListContainer.innerHTML = generatedHtml;
}