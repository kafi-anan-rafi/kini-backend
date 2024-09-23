const Joi = require("joi");

const ownerLoginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

module.exports = ownerLoginSchema;
