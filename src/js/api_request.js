let api_request = (function () {
  return {
    get_endpoint: function (endpoint) {
      return fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      });
    }
  };
})();