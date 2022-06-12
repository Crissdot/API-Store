const faker = require('faker');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    let index = 0;
    for(index; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product) return [404, null];
    return [200, product];
  }

  update(id, changes) {
    const index = this.products.find(item => item.id === id);
    if(index === -1) {
      throw new Error('Producto no encontrado');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index];
  }

  delete(id) {
    const index = this.products.find(item => item.id === id);
    if(index === -1) {
      throw new Error('Producto no encontrado');
    }
    const product = this.products[index];
    this.products.splice(index, 1);
    return product;
  }

}

module.exports = ProductsService;
