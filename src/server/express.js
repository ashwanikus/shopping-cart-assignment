import express from "express";
import path from "path";

const server = express();
const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);

let bodyParser = require('body-parser');

let products = require("../../json/products/index.get.json");
let addtocart = require("../../json/addToCart/index.post.json");
let categories = require("../../json/categories/index.get.json");
let banners = require("../../json/banners/index.get.json");
let checkoutAmount = 0;
let itemsInCart = [];

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
    products.forEach(element => {
        if (element.id === req.params.id) {
            if (element.count == undefined) {
                element.count = 1;
                element.totalPrice = element.price * element.count;
                itemsInCart.push(element);
            } else {
                element.count = element.count + 1;
                element.totalPrice = element.price * element.count;
            }
            res.end(JSON.stringify({ item_in_cart: itemsInCart }));
        }
    });
});

server.get('/cartitems', function (req, res) {
    res.end(JSON.stringify({ item_in_cart: itemsInCart }));
});

server.listen(8080, () => {
    console.log("Server is listening at port 8080");
});

