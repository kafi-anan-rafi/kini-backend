const userModel = require("../models/userModel");
const {
  comparePassword,
  hashPassword,
  generateToken,
} = require("../utils/authUlits");
const {
  loginSchema,
  registrationSchema,
} = require("../validations/userSchema");

async function Login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { error, value } = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const allErrorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ message: allErrorMessages });
    }

    // check whether user exit's or not
    const user = await userModel.findOne({ email: value.email });
    if (!user) {
      return res.status(409).json({ message: "No user found!" });
    }

    const { isHashed, hashedPassword, hashError } = await hashPassword(
      value.password
    );
    if (!isHashed) {
      return res.status(500).json({ message: hashError });
    }

    const { status, isMatch, comparisonError } = await comparePassword(
      value.password,
      hashedPassword
    );
    if (!status) {
      return res.status().json({ message: comparisonError });
    }
    if (!isMatch) {
      res.status(400).json({ message: "Password didn't match!" });
    }

    const { valid, token, message } = generateToken(user);
    if (!valid) {
      res.status(401).json({ message });
    }

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
}

async function Registration(req, res, next) {
  try {
    const { filename: picture } = req.file;
    const { name, email, password } = req.body;
    const { error, value } = registrationSchema.validate(
      { name, email, password, picture },
      {
        abortEarly: false,
      }
    );
    if (error) {
      const allErrorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ message: allErrorMessages });
    }

    // check whether the email exist before or not
    const user = await userModel.findOne({ email: value.email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const { isHashed, hashedPassword, hashError } = await hashPassword(
      value.password
    );
    if (!isHashed) {
      return res.status(401).json({ message: hashError });
    }
    value.password = hashedPassword;
    const newUser = await userModel.create(value);
    const { valid, token, message } = generateToken(newUser);
    if (!valid) {
      return res.status(401).json({ message });
    }
    res.status(201).send({ message: "Registration successful", token });
  } catch (error) {
    next(error);
  }
}

module.exports = { Login, Registration };
