const express = require("express");
const router = express.Router();
const { OwnerLogin, OwnerRegistration } = require("../controllers/ownerController");
const upload = require("../config/multerConfig");

router.post("/login", OwnerLogin);
router.post("/register", upload.single("picture"), OwnerRegistration);

module.exports = router;
