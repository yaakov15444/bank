import { createGroup, getUserGroups ,joinGroupByEmail} from "../services/groupService.js";
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
export const getMyGroups = async (req, res) => {
    try {
        const groups = await getUserGroups(req.user._id);
        res.status(200).json(groups);
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};
export const joinGroupByEmailCtrl = async (req, res) => {
    try {
        const { groupId, userEmail } = req.body;
        const result = await joinGroupByEmail(groupId, userEmail);
        res.status(200).json(result);
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};