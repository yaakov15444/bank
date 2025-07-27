import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {jwtSecret} from "../secrets/dotenv.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
export const registerUser = async (user) => {
        const { name, email, password } = user;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
                throw new AppError("User already exists", 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ name, email, password: hashedPassword });
        await newUser .save();
        return { message: "User registered successfully" , user: newUser };
};
export const loginUser = async (email, password) => {
        
        const user = await User.findOne({ email });
        if (!user) {
                throw new AppError("User not found", 404);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
                throw new AppError("Invalid credentials", 401);
        }
        const token = jwt.sign({ userId: user._id },jwtSecret);
        return { message: "User logged in successfully",  token , user };
};