window.cartItemController = (function() {
  return {
    updateItemCount: function(itemId, count, price, totalCount) {
      count = count || 0;
      let elem = document.querySelectorAll('div[class="cart__item"][data-id="' + itemId + '"]')[0];
      if (count > 0) {
        elem.getElementsByClassName('cart__item-detail-info-item-count')[0].innerHTML = count;
        elem.getElementsByClassName('cart__item-detail-info-total')[0].innerHTML = 'Rs.' + price * count;
      } else {
        elem.parentNode.removeChild(elem);
      }
      document.getElementsByClassName('cart__header-text')[0].innerHTML = 'My Cart (' + totalCount + ' items)';
    }
  };
})();
