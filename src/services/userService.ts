import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import AppError  from '../utils/AppError';
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    if (!userData.password || !userData.phone || !userData.name) {
        throw new AppError('Missing required fields', 400);
    }
    const existingUser = await User.findOne({ phone: userData.phone });
    if (existingUser) {
        throw new AppError('User already exists', 409);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = new User({
        ...userData,
        password: hashedPassword,
    });
    await newUser.save();
    newUser.password = undefined;
    return newUser;
};