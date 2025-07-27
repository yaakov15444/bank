import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import { jwtSecret } from "../secrets/dotenv.js";
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
        return next(new AppError("No token provided", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user||!user.isActive) return next(new AppError("User not found", 404));
        req.user = user;
        next();
    } catch (error) {
        next(new AppError("Invalid token", 401));
    }
};
