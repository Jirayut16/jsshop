import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
});
const cartSchema = mongoose.Schema({
  userId: String,
  items: [cartItemSchema],
});

export const Cart = mongoose.model("Cart", cartSchema);
