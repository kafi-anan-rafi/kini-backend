const express = require("express");
const router = express.Router();
const checkAdmin = require("../middlewares/authMiddleware");
const {
  AddProduct,
  GetProducts,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/productController");

router.use(checkAdmin);

router.get("/", GetProducts);
router.get("/:productId", GetProduct);
router.post("/", AddProduct);
router.patch("/:productId", UpdateProduct);
router.delete("/:productId", DeleteProduct);

module.exports = router;
