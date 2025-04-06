import express from "express";
const router = express.Router();
import { changeRole, list, remove } from "../Controllers/user.js";

import { auth, adminCheck } from "../Middleware/auth.js";

router.get("/user", auth, adminCheck, list);
router.post("/change-role", auth, adminCheck, changeRole);
router.delete("/user/:id", auth, adminCheck, remove);

export default router;
