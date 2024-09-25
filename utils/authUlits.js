const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUND);
const SECRET = process.env.SECRET;

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Function to compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

const generateToken = (userInfo) => {
  try {
    const payload = { _id: userInfo._id, role: userInfo.role };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, SECRET, options);
    return { valid: true, token };
  } catch (err) {
    console.error("Token generation error!", err.message);
    return { valid: false, message: "Token generation failed" };
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return { valid: true, decoded };
  } catch (err) {
    console.error("Token verification error:", err.message);
    return { valid: false, message: "Token verification failed" };
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
