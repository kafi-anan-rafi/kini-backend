const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String },
  role: { type: String, default: "user" },
});

const userModel = model("user", userSchema);

module.exports = userModel;
