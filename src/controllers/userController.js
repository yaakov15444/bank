import {registerUser, loginUser} from "../services/userService.js";
import AppError from "../utils/AppError.js";
export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
       next(new AppError(error.message, 400));
    }
};
export const login = async (req, res) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

