import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const registerUser = async (user) => {
        const { name, email, password } = user;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
};