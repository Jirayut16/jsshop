import express from "express";
const router = express.Router();
import {
  clearCart,
  createCart,
  getCart,
  removeItem,
  updateQuantity,
} from "../Controllers/cart.js";

router.get("/get-cart/:id", getCart);
router.post("/create-cart", createCart);
router.delete("/remove-item/:id/:productId", removeItem);
router.put("/update-quantity/:id/:productId", updateQuantity);
router.put("/clear-cart/:id", clearCart);
export default router;
