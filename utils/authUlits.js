const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUND);
const SECRET = process.env.SECRET;

// Function to hash a password
const hashPassword = async (password) => {
  console.log(password);
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
    throw new Error("Error comparing passwords");
  }
};

const generateToken = (userInfo) => {
  const payload = { _id: userInfo._id, role: userInfo.role };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, SECRET, options);
};

const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Token verification failed");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
