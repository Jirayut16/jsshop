import express from "express";
const router = express.Router();
import {
  getReview,
  createReview,
  deleteReview,
  updateReview,
} from "../Controllers/review.js";

router.get("/review/:id", getReview);
router.post("/create-review", createReview);
router.delete("/delete-review/:id/:reviewId", deleteReview);
router.put("/update-review/:id/:reviewId", updateReview);

export default router;
