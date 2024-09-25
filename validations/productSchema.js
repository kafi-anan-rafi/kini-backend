const Joi = require("joi");

const addProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  details: Joi.string().min(10).required(),
  price: Joi.number().integer().required(),
  stock: Joi.number().integer().required(),
  pictures: Joi.string(),
  ownerId: Joi.string().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3),
  details: Joi.string().min(10),
  price: Joi.number().integer(),
  stock: Joi.number().integer(),
  pictures: Joi.string(),
});

module.exports = { addProductSchema, updateProductSchema };
