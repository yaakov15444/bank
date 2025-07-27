// scripts/addDefaultIsVerified.js

import mongoose from "mongoose";
import User from "../src/models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const result = await User.updateMany(
            { isActive: { $exists: false } }, // רק למי שאין את השדה
            { $set: { isActive: true } }      // תעדכן לו ערך דיפולטי
        );

        console.log(`✅ Updated ${result.modifiedCount} users.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error updating users:", err);
        process.exit(1);
    }
};

run();
