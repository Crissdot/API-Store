const Joi = require('joi');

const id = Joi.string().uuid();

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { getCategorySchema }
