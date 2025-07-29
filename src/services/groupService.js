import Group from "../models/groupModel.js";
import AppError from "../utils/AppError.js";
export const createGroup = async (group) => {
    const { name, joinCode, userId } = group;
    const existingGroup = await Group.findOne({ joinCode });
    if (existingGroup) {
        throw new AppError("Group already exists", 400);
    }
    const newGroup = new Group({ name, joinCode, admin: userId });
    await newGroup.save();
    return { message: "Group created successfully", group: newGroup };
};
export const getUserGroups = async (userId) => {
    const groups = await Group.find({
        $or: [
            { admin: userId },
            { users: userId }
        ]
    });
    return groups;
};
