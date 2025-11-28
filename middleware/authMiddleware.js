import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
           return res.status(400).json({ msg: "user is unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(400).json({ msg: "invalid token" });
        }

        const user = await userModel.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: "error in protectroute middleware" });
    }
}

export const adminRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
           return next();
        }return res.status(400).json({ message: "admin allowed only" });
    } catch (error) {
        return res.status(400).json({ message: "error in admin controller",error });
    }
}