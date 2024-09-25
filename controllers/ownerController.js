const ownerModel = require("../models/ownerModel");
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../utils/authUlits");
const {
  ownerRegistrationSchema,
  ownerLoginSchema,
} = require("../validations/ownerSchema");

// Login
async function OwnerLogin(req, res) {
  const { error, value } = ownerLoginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const allMessages = error.details.map((err) => err.message);
    return res.status(400).json({ message: allMessages });
  }
  const owner = await ownerModel.findOne({ email: value.email });
  if (!owner) {
    return res.status(404).send({ message: "Owner not found" });
  }
  const hashedPassword = await hashPassword(value.password);
  const isMatch = comparePassword(value.password, hashedPassword);
  if (!isMatch) {
    return res.status(401).send("Invalid password");
  }
  const { valid, token, message } = generateToken(owner);
  if (!valid) {
    return res.status(401).json({ message });
  }
  res.status(200).send({ message: "Login Successful", token });
}

// Registration
async function OwnerRegister(req, res) {
  const { error, value } = ownerRegistrationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const allMessages = error.details.map((err) => err.message);
    return res.status(400).json({ message: allMessages });
  }
  const owner = await ownerModel.findOne({ email: value.email });
  if (owner) {
    return res.status(400).json({ message: "Owner already exists!" });
  }
  const hashedPassword = await hashPassword(value.password);
  value.password = hashedPassword;
  const newOwner = await ownerModel.create(value);
  const { valid, token, message } = generateToken(newOwner);
  if (!valid) {
    return res.status(401).json({ message });
  }
  res.status(201).send({ message: "Registration succeful", token });
}

module.exports = { OwnerLogin, OwnerRegister };
