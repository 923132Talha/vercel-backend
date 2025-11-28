import express from "express"
import {getProducts,getProductById,createProduct,updateProductById,deleteProductById} from "../controllers/productController.js";
import {protectRoute,adminRoute} from "../middleware/authMiddleware.js"

const router=express.Router();

router.get("/",getProducts);
router.get("/:id",getProductById);

router.post("/",protectRoute,adminRoute,createProduct);
router.put("/:id",protectRoute,adminRoute,updateProductById);
router.delete("/",protectRoute,adminRoute,deleteProductById);

export default router
