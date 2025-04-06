import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    //เอา productId มาจาก Product มาใส่
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // เชื่อมกับสินค้าที่มีอยู่
      // required: true,
    },
    reviews: [
      {
        name: { type: String, required: true }, // ชื่อคนรีวิว
        rating: { type: Number, required: true, min: 0, max: 5 }, // คะแนน (1-5)
        comment: { type: String, required: true }, // คอมเมนต์
        date: { type: String, default: Date.now }, // วันที่รีวิว
      },
    ],
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
