const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().max(10000);

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: price_min.required(),
    then: Joi.required()
  })
});

const createProductSchema = Joi.object({
  name: name.required(),
  price,
  image,
  description,
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
});

module.exports = { getProductSchema, queryProductSchema, createProductSchema, updateProductSchema }
