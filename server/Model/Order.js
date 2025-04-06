import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
});

const orderSchema = mongoose.Schema({
  cartId: String,
  userId: String,
  orders: [
    {
      item: [itemSchema],
      totalPrice: Number,
      status: {
        type: String,
        default: "pending",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  name: String,
  email: String,
  phone: String,
  address: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
