import express from "express";
const router = express.Router();
import { read, list, create, update, remove } from "../Controllers/product.js";
//import middleware
import { auth } from "../Middleware/auth.js";

//import multer
import { upload } from "../Middleware/upload.js";

router.get("/product", (req, res) => {
  res.send("Hello from the product route");
});

router.get("/product/list", list);
router.get("/product/:id", read);
router.post("/product/create", upload, create);
router.put("/product/:id", upload, update);
router.delete("/product/:id", remove);

export default router;
