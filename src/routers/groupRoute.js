import express from "express";
import { createGroupctrl , getMyGroups, joinGroupByEmailCtrl} from "../controllers/groupController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(protect);
/**
 * @function createGroup
 * @route   POST /api/groups/
 * @desc     Create a new group with a unique join code
 * @body    { name: string }
 */
router.post("/", createGroupctrl);

/**
 * @function getMyGroups
 * @route   GET /api/groups/
 * @desc     Get all groups that the user is a member of
 */
router.get("/", getMyGroups);

/**
 * @function joinGroupByEmail
 * @route   POST /api/groups/join
 * @desc     Join a group by email
 * @body    { groupId: string, userEmail: string }
 */
router.post("/join", joinGroupByEmailCtrl);
export default router;