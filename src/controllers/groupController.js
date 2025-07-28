import { createGroup } from "../services/groupService.js";
import AppError from "../utils/AppError.js";
import generateJoinCode from "../utils/generateJoinCode.js";
export const createGroupctrl = async (req, res) => {
    try { 
        const joinCode = generateJoinCode();
        const userId = req.user._id;
        const result = await createGroup({ ...req.body, joinCode, userId });
        res.status(201).json(result);
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};