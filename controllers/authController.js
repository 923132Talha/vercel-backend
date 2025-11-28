import { generateToken } from "../config/jwt.js";
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"

/*USER SIGNUP */

export const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "all fields required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "password must be atleast 6 characters" });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: "user already exists" });
        }

        /*PASSWORD HASHING */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create(
            {
                name: name,
                email: email,
                password: hashedPassword
            }
        )
            /*GENERATE JWT TOKEN */
            generateToken(newUser._id, res);
            return res.status(200).json({ id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin });

    } catch (error) {
        console.log(`error in signup controller: ${error.message}`);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

/*USER LOGIN */
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "please enter correct password" });
        }
        /*GENERATE JWT TOKEN */
        generateToken(user._id, res);
        return res.status(200).json({ id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });

    } catch (error) {
        console.log(`error in signup controller: ${error.message}`);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

/*USER LOGOUT */
export const userLogout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ msg: "logged out successfully" });
    } catch (error) {
        console.log("error in logout:", error);
         return res.status(400).json({ error: "error in logout controller" });
    }
}

/*USER ROLE CHECK */
export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkauth:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

