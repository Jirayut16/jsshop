import express from "express";
const router = express.Router();
import {
  checkout,
  checkoutStatus,
  getDashboard,
} from "../Controllers/checkout.js";

router.post("/checkout", checkout);
router.get("/checkout-status/:session_id/:order_id", checkoutStatus);
router.get("/get-dashboard", getDashboard);
export default router;
