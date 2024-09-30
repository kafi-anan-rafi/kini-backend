const express = require("express");
const router = express.Router();
const { Login, Registration } = require("../controllers/userControllers");
const upload = require("../config/multerConfig");

router.post("/login", Login);
router.post("/register", upload.single("picture"), Registration);

module.exports = router;
