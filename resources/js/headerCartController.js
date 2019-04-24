window.headerCartController = (function() {
  const headerCountElem = document.getElementsByClassName('nav__end-cart-count')[0];
  const headerCountXsElem = document.getElementsByClassName('nav__end-cart-count-xs')[0];
  return {
    updateHeaderCartCount: function(totalCount) {
      headerCountElem.innerHTML = totalCount + ' items';
      headerCountXsElem.innerHTML = totalCount;
    }
  };
})();
