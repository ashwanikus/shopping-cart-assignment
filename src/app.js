require("babel-runtime/regenerator");
require("webpack-hot-middleware/client?reload=true");
require('./favicon.ico');

require("./scss/cart.scss");
require("./scss/products.scss");
require("./scss/login.scss");
require("./scss/carousel.scss");
require("./scss/query.scss");
require("./scss/home.scss");
require("./scss/common.scss");


(function (header, footer) {
  let ajaxReq = new XMLHttpRequest();
  ajaxReq.open("GET", 'partials_content', true);
  ajaxReq.onload = function () {
    if (ajaxReq.status >= 200 && ajaxReq.status < 400) {
      var data = JSON.parse(ajaxReq.responseText);
      header.innerHTML = data.header;
      footer.innerHTML = data.footer;
    } else {
      console.log("We conected to the server, but it returned an error.");
    }
  }
  ajaxReq.onerror = function () {
    console.log("Connection Error");
  }
  ajaxReq.send();
}(
  document.getElementById("header"),
  document.getElementById("footer")
));