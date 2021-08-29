const db = require('../util/database');

module.exports = class Orders {
  constructor(id, title, imageUrl, description, price) {
    this.productId = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  addProduct() {
    return db.execute(
      'INSERT INTO orders (title,price,orderId) VALUES (?,?,?)',
      [this.title, this.price, this.productId ]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM orders WHERE orders.orderId = ?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM orders');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};



