import Group from "../models/groupModel.js";
import AppError from "../utils/AppError.js";
import User from "../models/userModel.js";
export const createGroup = async (group) => {
    const { name, joinCode, userId } = group;
    const existingGroup = await Group.findOne({ joinCode });
    if (existingGroup) {
        throw new AppError("Group already exists", 400);
    }
    const newGroup = new Group({ name, joinCode, admin: userId });
    newGroup.users.push(userId);
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
export const getGroupById = async (groupId) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new AppError("Group not found", 404);
    }
    return group;
};
export const joinGroupByEmail = async (groupId, userEmail, requesterId) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new AppError("Group not found", 404);
    }
    if (group.admin.toString() !== requesterId.toString()) {
        throw new AppError("Only group admin can add users", 403);
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (group.users.includes(user._id)) {
        throw new AppError("User is already in the group", 400);
    }

    group.users.push(user._id);
    await group.save();

    return { message: "User joined group successfully", group };
};