import express from "express"
import {getUserCart,addToCart,removeFromCart} from "../controllers/cartController.js"
import {protectRoute} from "../middleware/authMiddleware.js"

const router=express.Router();

router.get("/",protectRoute,getUserCart);

router.post("/add",protectRoute,addToCart);

router.delete("/delete",protectRoute,removeFromCart);

export default router;