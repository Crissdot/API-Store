const express = require('express');

const ProductsService = require('../services/products.service.js');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res, next) => {
  const products = service.find();
  // THROW ERROR
  try {
    products.something();
  } catch (error) {
    next(error);
  }
  res.json(products);
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = service.findOne(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = service.delete(id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
