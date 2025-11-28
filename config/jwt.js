import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
    
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
    
        return token;
        
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Error generating token");
    }
}

export default generateToken;