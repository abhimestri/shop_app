const Product = require('../models/product');
const Cart = require('../models/cart');
const Orders = require('../models/orders');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      console.log("in get products ",rows)
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll()
    .then(([rows , fieldData]) => {
      console.log(rows)
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: rows
      });
    })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const cart = new Cart(prodId,title,null,null,price);
  cart.addProduct(prodId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("::::::",prodId)
  Cart.deleteById(prodId).then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err))
};

exports.getOrders = (req, res, next) => {
  Orders
    .fetchAll()
    .then(([rows , fieldData]) => {
      res.render('shop/orders', {
        products : rows,
        pageTitle : "orders page",
        path: '/orders',
      })
    })
};

exports.postOrder = (req,res,next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const price = req.body.price
  const order = new Orders(id,title,null,null,price);
  order
    .addProduct()
    .then(() => {
      res.redirect('/orders')
    })
}

exports.postCancelOrder  = (req,res,next) => {
  const orderId = req.body.orderId;
  Orders.deleteById(orderId)
    .then(() => {
      res.redirect('/orders')
    })
}
