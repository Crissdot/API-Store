const express = require('express');

const CategoriesService = require('../services/categories.service.js');
const { validatorHandler } = require('../middlewares/validator.handler');
const { getCategorySchema } = require('../schemas/categories.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const category = service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  //TODO
});


router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = service.delete(id);
      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
