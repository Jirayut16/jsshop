import { User } from "../Model/User.js";
import { v2 as cloudinary } from "cloudinary";

export const list = async (req, res) => {
  try {
    const user = await User.find({})
      .select("-password")
      .select("-confirmPassword") //ไม่เอา password ไม่ส่งไป
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const changeRole = async (req, res) => {
  try {
    const { id, role } = req.body.data;
    //หา id ด้วย id & update role ด้วย role ที่ส่งมา
    const user = await User.findOneAndUpdate(
      { _id: id },
      { role: role },
      { new: true }
    )
      .select("-password")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await User.findOneAndDelete({ _id: id }).exec();
    res.send(removed);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const profilePicture = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ name: userId }).exec();
    if (!req.file) {
      console.log("⚠️ No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    } else {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.picture) {
        const urlParts = user.picture.split("/");
        // console.log("urlParts", urlParts);

        const publicId = `${urlParts[urlParts.length - 2]}/${
          urlParts[urlParts.length - 1].split(".")[0]
        }`;
        // console.log("publicId", publicId);
        await cloudinary.uploader
          .destroy(publicId, { resource_type: "image" })
          .catch((err) => console.error("Failed to delete old image:", err));
      }

      user.picture = req.file.path;
    }
    await user.save();
    return res.status(200).json({
      user: user,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("fail to update profile picture", error);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ name: userId })
      .select("-password")
      .select("-confirmPassword")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("fail to get user", error);
  }
};
