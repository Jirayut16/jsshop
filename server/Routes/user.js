import express from "express";
const router = express.Router();
import {
  changeRole,
  getCurrentUser,
  list,
  profilePicture,
  remove,
} from "../Controllers/user.js";

import { auth, adminCheck } from "../Middleware/auth.js";
import { uploadProfilePicture } from "../Middleware/upload.js";

router.get("/user", auth, adminCheck, list);
router.get("/current-user/:id", auth, getCurrentUser);
router.put("/profile-picture/:id", auth, uploadProfilePicture, profilePicture);
router.post("/change-role", auth, adminCheck, changeRole);
router.delete("/user/:id", auth, adminCheck, remove);

export default router;
