import { Product } from "../Model/Product.js";
import fs from "fs";

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
    console.log("Create product detail", req.body);

    if (req.file) {
      data.file = req.file.filename;
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
    return res.status(201).send(products);
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

    // console.log("category", category);
    // console.log("tag", tag);
    // console.log("Edit product detail", req.body);
    // console.log("Edit file", req.file);

    if (typeof req.file !== "undefined") {
      newData.file = req.file.filename;
      await fs.unlink(`./uploads/${newData.fileold}`, (err) =>
        err ? console.log(err) : console.log("Edit file success")
      );
    }

    if (newData.discountPercent >= 100) {
      return res.status(400).json({ error: "Discount must be less than 100%" });
    } else if (newData.category.length === 0 || newData.tag.length === 0) {
      return res.status(400).json({ error: "Please select category and tag" });
    } else if (
      newData.gender === "" ||
      newData.size === "" ||
      newData.color === ""
    ) {
      return res
        .status(400)
        .json({ error: "Please select gender, size and color" });
    } else if (newData.stock <= 0) {
      return res.status(400).json({ error: "Stock must be greater than 0" });
    } else if (newData.price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }
    const updated = await Product.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    }).exec();
    return res.send(updated);
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
    //remove file upload ออกจากโฟล์เดอร์
    if (removed?.file) {
      await fs.unlink(`./uploads/${removed.file}`, (err) =>
        err ? console.log(err) : console.log("Remove file success")
      );
    }

    res.send(removed);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
