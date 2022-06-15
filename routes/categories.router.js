const express = require('express');

const CategoriesService = require('../services/categories.service.js');

const router = express.Router();
const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const category = service.findOne(id);
    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  //TODO
});


router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = service.update(id, body);
    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = service.delete(id);
    res.json(deletedCategory);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
