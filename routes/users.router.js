const express = require('express');

const UsersService = require('../services/users.service.js');
const { validatorHandler } = require('../middlewares/validator.handler');
const { getUserSchema } = require('../schemas/users.schema');

const router = express.Router();
const service = new UsersService();

router.get('/', (req, res) => {
  const users = service.find();
  return res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const user = service.findOne(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  return res.status(201).json(newUser);
});

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = service.update(id, body);
      return res.json(user);
    } catch (error) {
      next(error)
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = service.delete(id);
      return res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
