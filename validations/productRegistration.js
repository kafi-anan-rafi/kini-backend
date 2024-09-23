const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  details: Joi.string().min(10).required(),
  price: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
  pictures: Joi.string().required(),
  ownerId: Joi.string().required(),
});

module.exports = productValidationSchema;
