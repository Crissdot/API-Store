const express = require('express');

const CategoriesService = require('../services/categories.service.js');
const { validatorHandler } = require('../middlewares/validator.handler');
const { getCategorySchema, createCategorySchema, updateCategorySchema } = require('../schemas/categories.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  return res.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  //TODO
});


router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = service.create(body);
    return res.status(201).json(newUser);
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await service.delete(id);
      return res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
