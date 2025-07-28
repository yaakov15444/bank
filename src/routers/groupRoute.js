import express from "express";
import { createGroupctrl } from "../controllers/groupController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(protect);
router.post("/", createGroupctrl);
export default router;