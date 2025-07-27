import bcrypt from "bcrypt";
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