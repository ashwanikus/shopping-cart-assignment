window.services = (function() {
  return {
    updateCartItem: function(type, data) {
      return fetch('/cart/' + type, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json());
    }
  };
})();
