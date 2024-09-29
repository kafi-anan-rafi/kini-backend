const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");
const {
  addProductSchema,
  updateProductSchema,
} = require("../validations/productSchema");
const removeFiles = require("../utils/filesUtils");

// Get All Product
async function GetProducts(req, res, next) {
  try {
    const userId = req.user._id;
    const products = await productModel.find({ ownerId: userId });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found!" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
    next(error);
  }
}

// Get a single Product
async function GetProduct(req, res, next) {
  try {
    const productId = req.params.productId;
    const product = await productModel.findOne({
      _id: productId,
      ownerId: req.user._id,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// Add Product
async function AddProduct(req, res, next) {
  try {
    const files = req.files;
    const pictures = files.map((f) => f.filename);
    const { name, details, price, stock } = req.body;
    const ownerId = req.user._id;
    const { error, value } = addProductSchema.validate(
      { name, details, price, stock, ownerId, pictures },
      { abortEarly: false }
    );
    if (error) {
      const allMessages = error.details.map((err) => err.message);
      return res.status(400).json({ message: allMessages });
    }
    const product = await productModel.create(value);
    await ownerModel.findByIdAndUpdate(
      req.user._id,
      {
        $push: { products: product },
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// Update Product
async function UpdateProduct(req, res, next) {
  try {
    const productId = req.params.productId;
    const files = req.files;
    const pictures = files.map((f) => f.filename);
    const { name, details, price, stock } = req.body;
    const { error, value } = updateProductSchema.validate({
      name,
      details,
      price,
      stock,
      pictures,
    });
    if (error) {
      const allMessages = error.details.map((err) => err.message);
      return res.status(400).json({ message: allMessages });
    }
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.ownerId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }
    // delete the existing files
    removeFiles(product, next);

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      value,
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

// Delete Product
async function DeleteProduct(req, res, next) {
  try {
    const productId = req.params.productId;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.ownerId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this product" });
    }
    await productModel.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  GetProducts,
  GetProduct,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
