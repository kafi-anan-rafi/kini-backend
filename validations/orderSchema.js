const Joi = require("joi");

const orderProductSchema = Joi.object({
  orderItems: Joi.array()
    .items({
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
    })
    .required(),
  discount: Joi.number().optional(),
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().valid("cod", "bank", "bkash").required(),
});

module.exports = { orderProductSchema };
