const express = require("express");
const router = express.Router();
const { OwnerLogin, OwnerRegister } = require("../controllers/ownerController");

router.post("/login", OwnerLogin);
router.post("/register", OwnerRegister);

module.exports = router;
