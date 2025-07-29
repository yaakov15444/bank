import {register, login} from "../controllers/userController.js";
import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
const router = express.Router();

/**
 * @route   POST /api/users/
 * @desc    Register a new user
 * @access  Public
 * @body    { name: string, email: string, password: string }
 * @returns { message: string, user?: object }
 */
router.post("/",register);

/**
 * @route   POST /api/users/login
 * @desc    Login a user
 * @access  Public
 * @body    { email: string, password: string }
 * @returns { message: string, user?: object }
 */
router.post("/login", login);

router.get("/me",protect, (req, res) => res.status(200).json(req.user));
export default router;