//JWT
import jwt from "jsonwebtoken";
import { User } from "../Model/User.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).json({ error: "No token" });
    }
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const adminCheck = async (req, res, next) => {
  try {
    console.log("admincheck", req.user.user);

    const userAdmin = await User.findOne({ name: req.user.user })
      .select("-password")
      .exec();
    //ถ้าไม่ใช้ denied ถ้าใช่ next ผ่าน middleware
    console.log("userAdmin", userAdmin);

    if (userAdmin.role !== "admin") {
      res.status(400).send("admin access denied!!");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("admin access denied" + err);
  }
};
