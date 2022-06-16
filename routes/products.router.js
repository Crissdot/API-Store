const express = require('express');

const ProductsService = require('../services/products.service.js');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res, next) => {
  const products = service.find();
  res.json(products);
});

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const product = service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = service.delete(id);
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
