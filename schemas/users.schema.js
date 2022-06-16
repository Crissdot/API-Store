const Joi = require('joi');

const id = Joi.string().uuid();

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { getUserSchema }
