(function init(cartList, isMatchedElement, cartItemController, headerCartController) {
  cartList.addEventListener('click', function(event) {
    event.stopPropagation();
    let matchInfo = isMatchedElement(event.target);
    if (matchInfo.match) {
      let productId = event.target.dataset.id;
      services.updateCartItem(matchInfo.type, { productId: productId }).then(function(cart) {
        let cartProductDetail = cart.items.find(function(item) {
          return item.product.id === productId;
        });
        cartItemController.updateItemCount(
          productId,
          cartProductDetail && cartProductDetail.count,
          cartProductDetail && cartProductDetail.product.price,
          cart.count
        );
        headerCartController.updateHeaderCartCount(cart.count);
      });
    }
  });
})(
  document.getElementsByClassName('cart')[0],
  function(target) {
    if (target.matches('.cart__item-detail-info-remove')) {
      return { match: true, type: 'remove' };
    } else if (target.matches('.cart__item-detail-info-add')) {
      return { match: true, type: 'add' };
    }
    return { match: false };
  },
  cartItemController,
  headerCartController
);
