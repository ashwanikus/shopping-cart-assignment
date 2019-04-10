// load the things we need
const express = require('express');
const app = express();
const path = require('path');

// data for the views
const categories = require('./data/categories');
const products = require('./data/products');
const cart = require('./data/cart');

app.use(require('body-parser').json());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));

// using resource route to serve static asserts from resources folder
app.use('/resources', express.static('resources'));

// use res.render to load up an ejs view file
app.get('/', function(_, res) {
  res.render('pages/index', require('./data/signUp'));
});

app.get('/signin', function(_, res) {
  res.render('pages/index', require('./data/signIn'));
});

app.get('/home', function(_, res) {
  res.render('pages/home', {
    categories: categories.filter(val => val.imageUrl),
    offers: require('./data/offers'),
    cart
  });
});

app.get('/products/:key?', function(req, res) {
  const key = req.params.key;
  const category = categories.find(val => val.key === key);
  const categoryId = category && category.id;
  let productsData = products;
  if (categoryId) {
    productsData = products.filter(val => val.category === categoryId);
  }
  res.render('pages/products', {
    categories,
    products: productsData,
    categoryId,
    cart
  });
});

app.get('/cart', function(req, res) {
  res.render('pages/cart', {
    cart
  });
});

// post operation to add of remove item from cart
app.post('/cart/:operation', function(req, res) {
  const operation = req.params.operation;
  let count = 0;
  if (operation === 'add') {
    count = 1;
  } else if (operation === 'remove') {
    count = -1;
  } else {
    return res.status(404).send('Not Found');
  }
  const product = products.find(val => val.id === req.body.productId);
  if (product) {
    const oldItem = cart.items.find(item => item.product.id === product.id);
    if (oldItem) {
      oldItem.count += count;
      cart.count += count;
      if (oldItem.count <= 0) {
        cart.items.splice(cart.items.findIndex(item => item.product.id === product.id), 1);
      }
    } else {
      cart.items.push({ product, count });
      cart.count += count;
    }
    return res.send(cart);
  }
  return res.status(404).send('Not Found');
});

app.listen(8080, () => console.log('8080 is the magic port'));
