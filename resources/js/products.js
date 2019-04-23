(function(productList, isMatchProduct, cartCountElem, cartCountXsElem) {
  productList.addEventListener('click', event => {
    event.stopPropagation();
    if (isMatchProduct(event.target)) {
      fetch('/cart/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: event.target.id })
      })
        .then(res => res.json())
        .then(function(cart) {
          cartCountElem.innerHTML = cart.count + ' items';
          cartCountXsElem.innerHTML = cart.count;
        });
    }
  });
})(
  document.getElementsByClassName('product-list')[0],
  function(target) {
    return target.matches('.product-buy-btn');
  },
  document.getElementsByClassName('nav__end-cart-count')[0],
  document.getElementsByClassName('nav__end-cart-count-xs')[0]
);
