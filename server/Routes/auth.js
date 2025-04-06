import express from "express";
const router = express.Router();
import {
  register,
  login,
  currentUser,
  loginLine,
  loginFacebook,
} from "../Controllers/auth.js";

import { auth, adminCheck } from "../Middleware/auth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/login-line", loginLine);
router.post("/login-facebook", loginFacebook);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, adminCheck, currentUser);

export default router;
