const express = require("express");
const router = express.Router();
const { PlaceOrder } = require("../controllers/orderController");

const { verifyUser } = require("../middlewares/authMiddleware");

router.post("/", verifyUser, PlaceOrder);

module.exports = router;
