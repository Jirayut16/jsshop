import { Review } from "../Model/Review.js";

export const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const reviews = await Review.findOne({ productId: id }).populate(
      "productId",
      "name"
    );

    if (!reviews) {
      return res.status(400).json({ message: "No reviews found" });
    }

    const allReviews = reviews.reviews || [];
    const totalReviews = allReviews.length;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalReviews);
    const paginatedReviews = allReviews.slice(startIndex, endIndex);

    res.json({
      reviews,
      productId: reviews.productId,
      productName: reviews.productId.name,
      reviewsPaginated: paginatedReviews,
      pagination: {
        totalReviews,
        page,
        limit,
        totalPages: Math.ceil(totalReviews / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    var { productId, name, rating, comment, date } = req.body;
    rating = Number(rating);

    if (!productId || !name || !rating || !comment)
      return res.status(400).json({ message: "Missing required fields" });

    let review = await Review.findOne({ productId }).populate(
      "productId",
      "name"
    );
    //รีวิวของสินค้านั้นๆทั้งหมดใน array

    if (!review) {
      // ถ้ายังไม่มีรีวิวของสินค้านี้ ให้สร้างใหม่
      review = new Review({ productId, reviews: [] });
    }

    // เพิ่มรีวิวเข้าไปใน Array
    review.reviews.push({ name, rating, comment, date });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const getReviewToRemove = await Review.findOneAndUpdate(
      { productId: id },
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );
    if (!getReviewToRemove) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Review.findOneAndUpdate(
      { productId: id, "reviews._id": reviewId },
      { $set: { "reviews.$.rating": rating, "reviews.$.comment": comment } },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({
      message: "Review updated successfully",
      updatedReview: updatedReview,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
