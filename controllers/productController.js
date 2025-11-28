import productModel from "../models/productModel.js"

/*GET ALL PRODUCTS */

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log("error in getproducts", error);
        return res.status(400).json({ msg: "error in getproducts" });
    }
}

/*GET PRODUCT BY ID */

export const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ msg: "product not found" });
        }
        return res.status(201).json(product);
    } catch (error) {
        console.log("error in getProductById", error);
        return res.status(404).json({ msg: "error in getProductById" });
    }
}

/*CREATE PRODUCT (ADMIN) */

export const createProduct = async (req, res) => {
    const newProduct = req.body;
    try {
        const product = await productModel.create(newProduct);
        return res.status(201).json(product);
    } catch (error) {
        console.log("error in createProduct", error);
        return res.status(404).json({ msg: "error in createProduct" });
    }
}

/*UPDATE PRODUCT BY ID (ADMIN) */

export const updateProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ msg: "product not found and cannot be updated" });
        }
        return res.status(201).json(product)
    } catch (error) {
        console.log("error in updateProductById", error);
        return res.status(404).json({ msg: "error in updateProductById" });
    }
}

/*DELETE PRODUCT BY ID (ADMIN) */

export const deleteProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findByIdAndDelete(id);
        return res.status(201).json({ msg: "product deleted successfully" });
    } catch (error) {
        console.log("error in deleteProductById", error);
        return res.status(404).json({ msg: "error in deleteProductById" });
    }
}