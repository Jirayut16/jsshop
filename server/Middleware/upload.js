import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce_uploads", // โฟลเดอร์ใน Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }], // Optimize ขนาดรูป
  },
});
export const upload = multer({ storage: storage }).single("file");

const profilePicture = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profile_picture", // โฟลเดอร์ใน Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 200, height: 200, crop: "limit" }], // Optimize ขนาดรูป
  },
});
export const uploadProfilePicture = multer({
  storage: profilePicture,
}).single("file");
