const db = require('../util/database');

module.exports = class Cart {
  constructor(id, title, imageUrl, description, price) {
    this.productId = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  addProduct() {
    return db.execute(
      'INSERT INTO cart (title,price,productId) VALUES (?,?,?)',
      [this.title, this.price, this.productId ]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM cart WHERE cart.productId = ?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM cart');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};



