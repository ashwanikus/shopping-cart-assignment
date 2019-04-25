window.headerCartController = (function() {
  const headerCountElem = document.getElementsByClassName('header-cart__count')[0];
  const headerCountXsElem = document.getElementsByClassName('header-cart__logo-count')[0];
  return {
    updateHeaderCartCount: function(totalCount) {
      headerCountElem.innerHTML = totalCount + ' items';
      headerCountXsElem.innerHTML = totalCount;
    }
  };
})();
