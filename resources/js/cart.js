function postCartData(type, data) {
  return fetch('/cart/' + type, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

const cartController = (function() {
  function updateCartTotalCount(totalCount) {
    document.getElementsByClassName('nav__end-cart-count')[0].innerHTML = totalCount + ' items';
    document.getElementsByClassName('nav__end-cart-count-xs')[0].innerHTML = totalCount;
  }
  function updateItemCount(itemId, count, price, totalCount) {
    count = count || 0;
    let elem = document.querySelectorAll('div[class="cart-item"][data-id="' + itemId + '"]')[0];
    if (count > 0) {
      elem.getElementsByClassName('cart-item-detail__info-item-count')[0].innerHTML = count;
      elem.getElementsByClassName('cart-item-detail__info-total')[0].innerHTML = 'Rs.' + price * count;
    } else {
      elem.parentNode.removeChild(elem);
    }
    document.getElementsByClassName('cart-header__text')[0].innerHTML = 'My Cart (' + totalCount + ' items)';
  }
  return {
    updateCartPageCount: function(itemId, count, price, totalCount) {
      updateCartTotalCount(totalCount);
      updateItemCount(itemId, count, price, totalCount);
    }
  };
})();

(function(cartList, isMatchedElement, cartController) {
  cartList.addEventListener('click', function(event) {
    event.stopPropagation();
    let matchInfo = isMatchedElement(event.target);
    if (matchInfo.match) {
      let productId = event.target.getAttribute('data-id');
      postCartData(matchInfo.type, { productId: productId }).then(function(cart) {
        let cartProductDetail = cart.items.find(function(item) {
          return item.product.id === productId;
        });
        cartController.updateCartPageCount(
          productId,
          cartProductDetail && cartProductDetail.count,
          cartProductDetail && cartProductDetail.product.price,
          cart.count
        );
      });
    }
  });
})(
  document.getElementsByClassName('cart')[0],
  function(target) {
    if (target.matches('.cart-item-detail__info-remove')) {
      return { match: true, type: 'remove' };
    } else if (target.matches('.cart-item-detail__info-add')) {
      return { match: true, type: 'add' };
    }
    return { match: false };
  },
  cartController
);
