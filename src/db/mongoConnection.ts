import mongoose from 'mongoose';
import Dotenv from '../secrets/Dotenv';
export const connectToMongo =  async (): Promise<void> => {
    try {
        await mongoose.connect(Dotenv.mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

