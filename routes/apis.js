const cart = require('../data/cart');

const cartItemHandler = function(req, res, count) {
  const product = require('../data/products').find(val => val.id === req.body.productId);
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
  return res.status(400).send('BAD REQUEST');
};

module.exports = function(app) {
  // post operation to add item from cart
  app.post('/cart/add', function(req, res) {
    return cartItemHandler(req, res, 1);
  });

  // post operation to remove item from cart
  app.post('/cart/remove', function(req, res) {
    return cartItemHandler(req, res, -1);
  });
};
