const categories = require('../data/categories');
const products = require('../data/products');
const cart = require('../data/cart');

module.exports = function(app) {
  // use res.render to load up an ejs view file
  app.get('/', function(_, res) {
    res.render('pages/index', require('../data/signUp'));
  });

  app.get('/signin', function(_, res) {
    res.render('pages/index', require('../data/signIn'));
  });

  app.get('/home', function(_, res) {
    res.render('pages/home', {
      categories: categories.filter(val => val.imageUrl),
      offers: require('../data/offers'),
      cart
    });
  });

  app.get('/products/:key?', function(req, res) {
    const key = req.params.key;
    const category = categories.find(val => val.key === key);
    const categoryId = category && category.id;
    const productsData = categoryId ? products.filter(val => val.category === categoryId) : products;
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
};
