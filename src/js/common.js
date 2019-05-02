function updateCartItem() {
    let cartItemsReq = new XMLHttpRequest();
    cartItemsReq.open("GET", "itemcount", true);
    cartItemsReq.onload = function () {
        if (cartItemsReq.status >= 200 && cartItemsReq.status < 400) {
            let data = JSON.parse(cartItemsReq.responseText);
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
        } else {
            console.log("We conected to the server, but it returned an error.");
        }
    }
    cartItemsReq.onerror = function () {
        console.log("Connection Error");
    }
    cartItemsReq.send();
}