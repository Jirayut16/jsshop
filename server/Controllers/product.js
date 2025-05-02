import { Product } from "../Model/Product.js";
import { v2 as cloudinary } from "cloudinary";

export const list = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const read = async (req, res) => {
  try {
    const id = req.params.id;

    const products = await Product.findOne({ _id: id }).exec();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    var data = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    if (req.file) {
      data.file = req.file.path;
    }
    if (data.discountPercent >= 100) {
      return res.status(400).json({ error: "Discount must be less than 100%" });
    } else if (!data.category || !data.tag) {
      return res.status(400).json({ error: "Please select category and tag" });
    } else if (data.gender === "" || data.size === "" || data.color === "") {
      return res
        .status(400)
        .json({ error: "Please select gender, size and color" });
    } else if (data.stock <= 0) {
      return res.status(400).json({ error: "Stock must be greater than 0" });
    } else if (data.price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    } else if (data.file === "") {
      return res.status(400).json({ error: "Please upload an image" });
    }

    const products = await Product(data).save();
    return res.status(201).json({
      message: "Product created successfully",
      newProduct: products,
      imageUrl: req.file.path,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    var newData = req.body;
    const category = JSON.parse(newData.category);
    const tag = JSON.parse(newData.tag);
    newData.category = category;
    newData.tag = tag;
    if (req.file) {
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (existingProduct.file) {
        const urlParts = existingProduct.file.split("/");
        const publicId = `${urlParts[urlParts.length - 2]}/${
          urlParts[urlParts.length - 1].split(".")[0]
        }`;
        await cloudinary.uploader
          .destroy(publicId, { resource_type: "image" })
          .catch((err) => console.error("Failed to delete old image:", err));
      }

      newData.file = req.file.path; // Cloudinary URL
    }
    // Validation
    if (newData.discountPercent >= 100) {
      return res.status(400).json({ error: "Discount must be less than 100%" });
    }
    if (newData.category.length === 0 || newData.tag.length === 0) {
      return res.status(400).json({ error: "Please select category and tag" });
    }
    if (newData.gender === "" || newData.size === "" || newData.color === "") {
      return res
        .status(400)
        .json({ error: "Please select gender, size, and color" });
    }
    if (parseInt(newData.stock) <= 0) {
      return res.status(400).json({ error: "Stock must be greater than 0" });
    }
    if (parseInt(newData.price) <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    // อัปเดต product ใน MongoDB
    const updated = await Product.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    }).exec();

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      data: updated,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

//ลบข่อมูล
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await Product.findOneAndDelete({ _id: id }).exec();
    if (!removed) {
      return res.status(404).json({ error: "Product not found" });
    }
    //remove file upload ออกจาก cloudinary
    if (removed.file) {
      // ดึง public ID จาก URL
      const urlParts = removed.file.split("/");
      const publicId = `${urlParts[urlParts.length - 2]}/${
        urlParts[urlParts.length - 1].split(".")[0]
      }`; // ได้ ecommerce_Uploads/attq0yyffrocuzxzl8zg
      await cloudinary.uploader
        .destroy(publicId, { resource_type: "image" })
        .catch((err) =>
          console.error("Failed to delete image from Cloudinary:", err)
        );
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      data: removed,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
