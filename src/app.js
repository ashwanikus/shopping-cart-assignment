require("babel-runtime/regenerator");
require("webpack-hot-middleware/client?reload=true");
require('./favicon.ico');

require("./scss/reset.scss");
require("./scss/common.scss");
require("./scss/home.scss");
require("./scss/carousel.scss");
require("./scss/login.scss");
require("./scss/products.scss");
require("./scss/cart.scss");
require("./scss/query.scss");

(function (header, footer) {
  var h = sessionStorage.getItem("header");
  var f = sessionStorage.getItem("footer");
  
  if (h == null || f == null) {
    let ajaxReq = new XMLHttpRequest();
    ajaxReq.open("GET", 'partials_content', true);
    ajaxReq.onload = function () {
      if (ajaxReq.status >= 200 && ajaxReq.status < 400) {
        var data = JSON.parse(ajaxReq.responseText);
        sessionStorage.setItem("header", data.header);
        sessionStorage.setItem("footer", data.footer);
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
  } else {
    header.innerHTML = h;
    footer.innerHTML = f;
  }
}(
  document.getElementsByClassName("header")[0],
  document.getElementsByClassName("footer")[0]
));