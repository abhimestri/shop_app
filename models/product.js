const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (id,title, price, imageUrl, description) VALUES (?,?, ?, ?, ?)',
      [this.id ,this.title, this.price, this.imageUrl, this.description]
    );
  }

  static editProduct(title,price,imageUrl,description,id) {
    return db.execute(
      'UPDATE products SET title = ?,price =?,imageUrl =?,description = ? WHERE products.id = ?',
      [title,price,imageUrl,description,id]
    )
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
