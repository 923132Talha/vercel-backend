import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
    },
    { timestamps: true }
);

const cartModel = new mongoose.model("cart", cartSchema);

export default cartModel;