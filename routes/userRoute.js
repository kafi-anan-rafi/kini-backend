const express = require("express");
const router = express.Router();
const {
  UserLogin,
  UserRegistration,
} = require("../controllers/userControllers");
const upload = require("../config/multerConfig");

router.post("/login", UserLogin);
router.post("/register", upload.single("picture"), UserRegistration);

module.exports = router;
