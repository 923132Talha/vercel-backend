import express from "express";
import { userSignup, userLogin, userLogout, checkAuth } from "../controllers/authController.js";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", protectRoute, userLogout);

router.get("/check", protectRoute, checkAuth);

router.get("/admin", protectRoute, adminRoute);

export default router;