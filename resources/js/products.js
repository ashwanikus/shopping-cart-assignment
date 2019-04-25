(function init(mobCategorySelector, productList, isMatchProduct, headerCartController) {
  mobCategorySelector.addEventListener('change', function() {
    window.location = this.value;
  });

  productList.addEventListener('click', function(event) {
    event.stopPropagation();
    if (isMatchProduct(event.target)) {
      let productId = event.target.dataset.id;
      services.updateCartItem('add', { productId: productId }).then(function(cart) {
        headerCartController.updateHeaderCartCount(cart.count);
      });
    }
  });
})(
  document.getElementsByClassName('mob-category-list')[0],
  document.getElementsByClassName('product-list')[0],
  function(target) {
    return target.matches('.product-buy-btn');
  },
  headerCartController
);
