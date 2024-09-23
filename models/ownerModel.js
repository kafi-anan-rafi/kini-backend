const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ownerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      default: [],
    },
  ],
  picture: String,
  role: { type: String, default: "admin" },
});

const ownerModel = model("owner", ownerSchema);

module.exports = ownerModel;
