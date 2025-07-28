import express from "express";
import userRoute from "./userRoute.js";
import groupRoute from "./groupRoute.js";
const router = express.Router();
router.use("/users", userRoute);
router.use("/groups", groupRoute);
export default router;