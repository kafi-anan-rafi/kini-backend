const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderStatus = ["placed", "completed", "canceled"];
const paymentMethod = ["cod", "bank", "bkash"];
const paymentStatus = ["pending", "paid", "failed"];

const orderItemsSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  itemTotalAmount: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    orderItems: [orderItemsSchema],
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, enum: orderStatus, default: orderStatus[0] },
    discount: { type: Number, default: 0 },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, enum: paymentMethod, required: true },
    paymentStatus: {
      type: String,
      enum: paymentStatus,
      default: paymentStatus[0],
    },
    totalOrderAmount: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

// orderSchema.pre("save", function (next) {
//   try {
//     // Automatically calculate itemTotalAmount
//     this.orderItems.forEach((item) => {
//       item.itemTotalAmount = item.price * item.quantity;
//     });

//     const total = this.orderItems.reduce(
//       (acc, item) => acc + item.itemTotalAmount,
//       0
//     );

//     // Calculate total order amount
//     this.totalOrderAmount = total - this.discount;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const orderModel = model("order", orderSchema);

module.exports = orderModel;
