import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart",cartRoute);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    connectDB();
})