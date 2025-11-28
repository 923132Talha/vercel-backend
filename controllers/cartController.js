import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js"

/*GET USER CART */

export const getUserCart = async (req, res) => {
    const loggedInUserId = req.user._id
    try {
        const cart = await cartModel.findOne({ user: loggedInUserId }).populate("products.product");
        if (!cart) {
            return res.status(404).json({ msg: "user cart is empty" });
        }
        res.status(201).json(cart.products);
    } catch (error) {
        console.log("error in getUserCart", error);
        return res.status(404).json({ msg: "error in getUserCart" });
    }
}

/*ADD TO CART */

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const loggedInUserId = req.user._id;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(400).json({ msg: "product not found" });
        }
        if (quantity > product.stock) {
            return res.status(400).json({ msg: "not enough stock" });
        }

        let cart = await cartModel.findOne({ user: loggedInUserId });
        if (!cart) {
            cart = await cartModel.create({
                user: loggedInUserId,
                products: [{
                    product: productId,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                }]
            })
            return res.status(201).json(cart);
        }
        else {
            const index = cart.products.findIndex(p => p.product.toString() === productId);
            if (index > -1) {
                cart.products[index].quantity += quantity;
            }
            else {
                cart.products.push({ product: productId, quantity: quantity });
            }

            await cart.save();
            return res.status(201).json(cart);
        }
    } catch (error) {
        console.log("error in addToCart", error);
        return res.status(404).json({ msg: "error in addToCart" });
    }
}

/*REMOVE FROM CART */

export const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const loggedInUserId = req.user._id;
    try {
        const cart = await cartModel.findOne({ user: loggedInUserId });
        if (!cart) {
            return res.status(404).json({ msg: "cart not found" });
        }
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return res.status(200).json(cart.products);
    } catch (error) {
        console.log("error in removeFromCart", error);
        return res.status(404).json({ msg: "error in removeFromCart" });
    }
}
