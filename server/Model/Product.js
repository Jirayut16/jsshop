import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: String,
    detail: {
      type: String,
    },
    price: {
      type: Number,
    },
    discountPercent: {
      type: Number,
    },
    file: {
      type: String,
      default: "noimage.jpg",
    },
    category: {
      type: [String],
    },
    gender: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    stock: {
      type: Number,
    },
    rating: {
      overall: {
        type: Number,
      },
      count: {
        type: Number,
      },
    },

    tag: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
