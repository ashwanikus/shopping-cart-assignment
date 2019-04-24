function updateCartItem() {
    var cartItemsReq = new XMLHttpRequest();
    cartItemsReq.open("GET", "itemcount", true);
    cartItemsReq.onload = function () {
        if (cartItemsReq.status >= 200 && cartItemsReq.status < 400) {
            var data = JSON.parse(cartItemsReq.responseText);
            console.log(data);
            document.getElementById('cart_count').innerHTML = data.items_count;

            if (window.location.pathname == "/cart.html") {
                document.getElementById('checkoutAmount').innerHTML = data.checkout;
                document.getElementById('item_span').innerHTML = data.items_count;
            }
        } else {
            console.log("We conected to the server, but it returned an error.");
        }
    }
    cartItemsReq.onerror = function () {
        console.log("Connection Error");
    }
    cartItemsReq.send();
}

updateCartItem();