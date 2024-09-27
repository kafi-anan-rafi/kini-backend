const express = require("express");
const router = express.Router();
const { OwnerLogin, OwnerRegister } = require("../controllers/ownerController");
const checkOwner = require("../middlewares/authMiddleware");

router.get("/", checkOwner, (req, res) => {
  res.send("Hello owners!");
});

// Login
router.post("/login", OwnerLogin);

// Registration
router.post("/register", OwnerRegister);

module.exports = router;
