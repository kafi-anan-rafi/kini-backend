const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  pictures: [{ type: String, required: true }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
  },
});

const productModel = model("product", productSchema);

exports = productModel;
