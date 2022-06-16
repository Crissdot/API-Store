const express = require('express');

const ProductsService = require('../services/products.service.js');
const { validatorHandler } = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/products.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res, next) => {
  const products = service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const product = service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json(newProduct);
}
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProduct = service.delete(id);
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
