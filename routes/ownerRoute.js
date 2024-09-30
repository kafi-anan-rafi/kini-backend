const express = require("express");
const router = express.Router();
const {
  Login,
  Registration,
  ViewProfile,
} = require("../controllers/ownerController");
const upload = require("../config/multerConfig");
const { verifyOwner } = require("../middlewares/authMiddleware");

router.post("/login", Login);
router.post("/register", upload.single("picture"), Registration);
router.get("/profile", ViewProfile);

module.exports = router;
