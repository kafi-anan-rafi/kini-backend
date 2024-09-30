const Joi = require("joi");

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  picture: Joi.string().optional(),
});

module.exports = { userLoginSchema, userRegistrationSchema };
