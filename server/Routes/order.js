import express from "express";
const router = express.Router();
import { order, getOrders } from "../Controllers/order.js";

router.post("/submit-order/:id", order);
router.post("/get-orders/", getOrders);
export default router;
