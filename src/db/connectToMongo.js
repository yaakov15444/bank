import mongoose from "mongoose";
import {mongoUri} from "../secrets/dotenv.js";
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectToMongo;