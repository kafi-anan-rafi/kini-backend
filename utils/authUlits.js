const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUND);
const SECRET = process.env.SECRET;

// hash a password
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return { isHashed: true, hashedPassword };
  } catch (error) {
    return { isHashed: false, hashError: error.message };
  }
};

// compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return { status: true, isMatch };
  } catch (error) {
    return { status: false, comparisonError: error.message };
  }
};

// generate a token (jwt)
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

// Function to verify a token (jwt)
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
