const express = require('express');

const ProductsService = require('../services/products.service.js');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const [statusCode, product] = service.findOne(id);

  res.status(statusCode).json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = service.delete(id);
  res.json(deletedProduct);
});

module.exports = router;
