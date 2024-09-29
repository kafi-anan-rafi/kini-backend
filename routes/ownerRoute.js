const express = require("express");
const router = express.Router();
const { OwnerLogin, OwnerRegister } = require("../controllers/ownerController");
const upload = require("../config/multerConfig");

router.post("/login", OwnerLogin);
router.post("/register", upload.single("picture"), OwnerRegister);

module.exports = router;
