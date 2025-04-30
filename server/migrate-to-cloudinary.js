// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";

// dotenv.config();

// // หา __dirname ใน ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ตั้งค่า Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // โฟลเดอร์ uploads
// const uploadsDir = path.join(__dirname, "uploads");

// // อ่านไฟล์ทั้งหมดในโฟลเดอร์
// fs.readdir(uploadsDir, (err, files) => {
//   if (err) {
//     console.error("Error reading uploads folder:", err);
//     return;
//   }

//   files.forEach((file) => {
//     const filePath = path.join(uploadsDir, file);

//     // อัปโหลดไฟล์ไป Cloudinary
//     cloudinary.uploader.upload(
//       filePath,
//       {
//         folder: "ecommerce_uploads",
//         resource_type: "image",
//       },
//       (error, result) => {
//         if (error) {
//           console.error(`Error uploading ${file}:`, error);
//         } else {
//           console.log(result);

//           console.log(`Uploaded ${file}: ${result.original_filename}`);
//           // เก็บ result.secure_url ไว้ใช้ใน database หรือโค้ด
//         }
//       }
//     );
//   });
// });
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// หา __dirname ใน ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ตั้งค่า Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// โฟลเดอร์ uploads
const uploadsDir = path.join(__dirname, "uploads");

// เก็บการจับคู่ path เดิมและ URL ใหม่
const imageMappings = [];

async function migrateImages() {
  try {
    const files = await fs.readdir(uploadsDir);
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "ecommerce_uploads",
        resource_type: "image",
      });
      console.log(`Uploaded ${file}: ${result.secure_url}`);
      // บันทึกการจับคู่
      imageMappings.push({
        oldPath: file,
        newUrl: result.secure_url,
      });
    }
    // บันทึก imageMappings ลงไฟล์ JSON
    await fs.writeFile(
      "image-mappings.json",
      JSON.stringify(imageMappings, null, 2)
    );
    console.log("Image mappings saved to image-mappings.json");
  } catch (err) {
    console.error("Error:", err);
  }
}

migrateImages();
