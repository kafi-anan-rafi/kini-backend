const Joi = require("joi");

const ownerRegistrationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  address: Joi.string().required(),
  picture: Joi.string().uri().optional(),
});

const ownerLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { ownerRegistrationSchema, ownerLoginSchema };
