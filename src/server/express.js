import express from "express";
import path from "path";
import { resolve } from "dns";

const server = express();
const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);

let bodyParser = require('body-parser');
let fs = require('fs');

let products = require("../../json/products/index.get.json");
let addtocart = require("../../json/addToCart/index.post.json");
let categories = require("../../json/categories/index.get.json");
let banners = require("../../json/banners/index.get.json");
let itemsInCart = [];
console.log(__dirname, " *********** ");

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());

const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
);

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

const staticMiddleware = express.static("dist");

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(staticMiddleware);

server.use('/', function (req, res, next) {
    next();
});

server.get('/addtocart', function (req, res) {
    res.end(JSON.stringify({ addtocart: addtocart }));
});

server.get('/categories', function (req, res) {
    categories.sort((a, b) => {
        return a.order - b.order;
    });
    let new_cat = categories.filter((item) => {
        return item.enabled;
    });
    res.end(JSON.stringify({ categories: new_cat }));
});

server.get('/banners', function (req, res) {
    res.end(JSON.stringify({ banners: banners }));
});

server.get('/products', function (req, res) {
    if (typeof req.query.id === "undefined") {
        res.end(JSON.stringify({ products: products }));
    } else {
        let filteredProduct = products.filter((p) => p.category == req.query.id);
        res.end(JSON.stringify({ products: filteredProduct }));
    }
});

server.get('/addTocart/:id', function (req, res) {
    let items_total_price = 0;
    let items_count = 0;
    //console.log("products >>>>>>>>>> ",products.length);    
    products.forEach(element => {
        if (element.id === req.params.id) {
            //console.log(element.count," <<<<<<<<<<<<<<<<<<<<<<<<<<", element);

            if (element.count == undefined) {
                element.count = 1;
                element.totalPrice = element.price * element.count;
                itemsInCart.push(element);
                //console.log(element.count," <<<<<<<<<<<<<<<<<<<<<<<<<<", element, itemsInCart);
            } else {
                element.count = element.count + 1;
                element.totalPrice = element.price * element.count;
            }
            itemsInCart.forEach(element => {
                items_count = items_count + element.count;
                items_total_price = items_total_price + element.totalPrice;
            });
            res.end(JSON.stringify({ item_in_cart: itemsInCart, items_count: items_count, items_total_price: items_total_price }));
        }
    });
});

server.get('/cartitems', function (req, res) {
    let items_total_price = 0;
    let items_count = 0;
    if (itemsInCart.length > 0) {
        itemsInCart.forEach(element => {
            items_count = items_count + element.count;
            items_total_price = items_total_price + element.totalPrice;
        });
        res.end(JSON.stringify({ item_in_cart: itemsInCart, items_count: items_count, items_total_price: items_total_price }));
    } else {
        res.end(JSON.stringify({ item_in_cart: itemsInCart, items_count: 0, items_total_price: 0 }));
    }
});

server.get('/itemcount', function (req, res) {
    let items_count = 0;
    let checkout = 0;
    itemsInCart.forEach(element => {
        items_count = items_count + element.count;
        checkout = checkout + (element.price * element.count);
        ////console.log(element.count, " * ", element.price, " = ", element.price * element.count, " ********* ", checkout);
    });
    res.end(JSON.stringify({ items_count: items_count, checkout: checkout }));
});

server.get('/updateCart/:id/:task', function (req, res) {
    let items_total_price = 0;
    let items_count = 0;
    products.forEach(element => {
        if (element.id === req.params.id) {
            if (req.params.task == "inc") {
                if (element.count == undefined) {
                    element.count = 1;
                    element.totalPrice = element.price * element.count;
                    itemsInCart.push(element);
                } else {
                    element.count = element.count + 1;
                    element.totalPrice = element.price * element.count;
                }
                itemsInCart.forEach(element => {
                    items_count = items_count + element.count;
                    items_total_price = items_total_price + element.totalPrice;
                });
                res.end(JSON.stringify({ item_in_cart: itemsInCart, items_count: items_count, items_total_price: items_total_price }));

            } else if (req.params.task == "dec") {
                if (element.count == undefined) {
                    element.count = 1;
                    element.totalPrice = element.price * element.count;
                    itemsInCart.push(element);
                } else {
                    //console.log(element.count, " ************************* ");
                    element.count = element.count - 1;
                    element.totalPrice = element.price * element.count;
                    if (element.count == 0) {
                        //console.log("before: ",itemsInCart);
                        itemsInCart.forEach(element => {
                            if (element.id === req.params.id) {
                                delete element.count;
                                delete element.totalPrice;
                                let removeIndex = itemsInCart.map(function (item) { return item.id; }).indexOf(req.params.id);
                                //console.log("removed items ",removeIndex);
                                itemsInCart.splice(removeIndex, 1);
                            }
                        });
                        //console.log("after: ",itemsInCart);
                    }
                }
                itemsInCart.forEach(element => {
                    items_count = items_count + element.count;
                    items_total_price = items_total_price + element.totalPrice;
                });
                res.end(JSON.stringify({ item_in_cart: itemsInCart, items_count: items_count, items_total_price: items_total_price }));
            }
        }
    });
});

server.get('/remove-item/:id', function (req, res) {
    res.end(JSON.stringify({ item_in_cart: itemsInCart, 'item_counter': itemCounter.item_counter }));
});

server.get('/partials_content', function (req, res) {
    let promise = new Promise(function (resolve, reject) {
        fs.readFile('./dist/partials/header.html', 'utf8', function (err, header_data) {
            if (err) reject(err);
            resolve(header_data);
        });
    });

    promise.then(function (data) {
        fs.readFile('./dist/partials/footer.html', 'utf8', function (err, footer_data) {
            if (err) reject(err);
            res.end(JSON.stringify({header:data, footer:footer_data}));
        });
    });
});


server.listen(8080, () => {
    //console.log("Server is listening at port 8080");
});

