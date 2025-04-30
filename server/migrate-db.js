import mongoose from "mongoose";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// กำหนด Schema และ Model
const ProductSchema = new mongoose.Schema({
  name: String,
  file: String, // ฟิลด์ที่เก็บ path รูป
});
const Product = mongoose.model("Product", ProductSchema, "products");

// ฟังก์ชันอัปเดต database
async function updateImages() {
  try {
    // อ่าน image-mappings.json
    const imageMappings = JSON.parse(await fs.readFile("image-mappings.json"));

    // อัปเดตแต่ละรายการ
    for (const mapping of imageMappings) {
      const result = await Product.updateMany(
        { file: mapping.oldPath },
        { $set: { file: mapping.newUrl } }
      );
      console.log(
        `Updated ${mapping.oldPath} to ${mapping.newUrl}, matched: ${result.matchedCount}, modified: ${result.modifiedCount}`
      );
    }
    console.log("Database update complete");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

updateImages();
