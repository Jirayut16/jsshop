import express from "express";
const router = express.Router();
import { read, list, create, update, remove } from "../Controllers/product.js";
import { upload } from "../Middleware/upload.js";

router.get("/product/list", list);
router.get("/product/:id", read);
router.post("/product/create", upload, create);
router.put("/product/:id", upload, update);
router.delete("/product/:id", remove);

export default router;
