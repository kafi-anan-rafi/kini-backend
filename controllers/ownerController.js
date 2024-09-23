const ownerModel = require("../models/ownerModel");
const { hashPassword, generateToken } = require("../utils/authUlits");
const ownerRegistrationSchema = require("../validations/ownerRegistration");
const ownerLoginSchema = require("../validations/ownerLogin");

async function OwnerLogin(req, res) {
  const { error, value } = ownerLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const owner = await ownerModel.findOne({ email: value.email });
  if (!owner) {
    return res.status(404).send({ message: "Owner not found" });
  }
  const isMatch = await bcrypt.compare(password, owner.password);
  if (!isMatch) {
    return res.status(401).send("Invalid password");
  }
  const token = generateToken(owner);
  res.status(200).send({ message: "Owner logged in", token });
}

async function OwnerRegister(req, res) {
  const { error, value } = ownerRegistrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const owner = await ownerModel.findOne({ email: value.email });
  if (owner) {
    return res.status(400).json({ message: "Owner already exists!" });
  }
  const hashedPassword = await hashPassword(value.password);
  value.password = hashedPassword;
  const newOwner = await ownerModel.create(value);
  const token = generateToken(newOwner);
  res.status(201).send({ message: "Registration succeful", token });
}

module.exports = { OwnerLogin, OwnerRegister };
