import User, { IUser } from "../models/userModel";
import AppError from "../utils/AppError";
import bcrypt from "bcryptjs";

// export const login = async (phone: string, password: string): Promise<IUser> => {
//     const user = await User.findOne({ phone });
//     if (!user) {
//         throw new AppError("User not found", 404);
//     }
//     const isPasswordValid =  bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         throw new AppError("Invalid password", 401);
//     }
//     return user;
// };