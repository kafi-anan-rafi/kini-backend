const express = require("express");
const router = express.Router();
const checkOwner = require("../middlewares/authMiddleware");
const {
  AddProduct,
  GetProducts,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/productController");
const upload = require("../config/multerConfig");

router.use(checkOwner);

router.get("/", GetProducts);
router.get("/:productId", GetProduct);
router.post("/", upload.array("pictures", 5), AddProduct);
router.patch("/:productId", upload.array("pictures", 5), UpdateProduct);
router.delete("/:productId", DeleteProduct);

module.exports = router;
