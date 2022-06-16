const faker = require('faker');
const boom = require('@hapi/boom');

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
        isBlock: faker.datatype.boolean(),
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
    if(!product) throw boom.notFound('Producto no encontrado');
    if(product.isBlock) throw boom.conflict('Producto Bloqueado');

    return product;
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) throw boom.notFound('Producto no encontrado');

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) throw boom.notFound('Producto no encontrado');

    const product = this.products[index];
    this.products.splice(index, 1);
    return product;
  }

}

module.exports = ProductsService;
