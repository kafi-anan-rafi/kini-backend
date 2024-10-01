const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const { orderProductSchema } = require("../validations/orderSchema");

async function PlaceOrder(req, res, next) {
  try {
    // Extract the user ID from the request object (from token)
    const { _id: userId } = req.user;

    // Check if the user exists in the database
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Extract order details from the request body
    const { orderItems, discount, shippingAddress, paymentMethod } = req.body;

    // Validate the order input against the schema
    const { error, value } = orderProductSchema.validate(
      { orderItems, discount, shippingAddress, paymentMethod },
      { abortEarly: false } // Collect all validation errors
    );
    if (error) {
      // If validation fails, return all error messages to the client
      const allErrorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ message: allErrorMessages });
    }

    // Extract product IDs from the order items to query the database
    const productIds = value.orderItems.map((item) => item.productId);

    // Fetch all products in the order from the database
    const products = await productModel.find({ _id: { $in: productIds } });

    // Initialize the total order amount
    let totalOrderAmount = 0;

    // Loop through each order item and perform checks
    for (let item of value.orderItems) {
      // Find the corresponding product for each order item
      const product = products.find((p) => p._id.equals(item.productId));
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      // Check if the requested quantity exceeds the available stock
      if (item.quantity > product.stock) {
        return res.status(400).json({
          message: `Insufficient stock for product ${product.name}. Available stock: ${product.stock}, requested: ${item.quantity}`,
        });
      }

      // Deduct the purchased quantity from the product stock
      product.stock -= item.quantity;
      await product.save(); // Save the updated stock in the database

      // Add the product price to the order item
      item.price = product.price;

      // Calculate the total price for the item (price * quantity)
      item.itemTotalAmount = item.price * item.quantity;

      // Add the item's total amount to the overall order total
      totalOrderAmount += item.itemTotalAmount;
    }

    // If a discount is provided, subtract it from the total order amount
    if (discount) {
      totalOrderAmount -= discount;
    }

    // Ensure the total order amount is non-negative (in case discount exceeds total)
    totalOrderAmount = Math.max(totalOrderAmount, 0);

    // Add the user ID and total order amount to the validated order object
    value.userId = userId;
    value.totalOrderAmount = totalOrderAmount;

    // Insert the final order into the database
    await orderModel.create(value);

    // Send a success response to the client
    res.status(200).json({ message: "Order successfully placed!" });
  } catch (error) {
    // Pass any errors to the next middleware for centralized error handling
    next(error);
  }
}

module.exports = { PlaceOrder };
