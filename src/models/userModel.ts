import mongoose, { Document, Schema } from 'mongoose';

// 1. Define the TypeScript interface for the User document.
// This interface describes the shape of a user object.
export interface IUser extends Document {
  name: string;
  isBanned: boolean;
  phone: string;
  email?: string;
  gender?: string;
  birthDate?: Date; 
  password?: string;
  refreshToken?: string | null;
  role: 1 | 2 | 3 | 4; 
  comments?: string;
  enrolledExercises: mongoose.Schema.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    refreshToken: {
      type: String,
      default: null,
    },
    role: {
      type: Number,
      default: 1,
      enum: [1, 2, 3, 4],
    },
      isBanned: {
      type: Boolean,
      default: false,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// 4. Create and export the Mongoose model.
// The model is how you interact with the 'users' collection in the database.
const User = mongoose.model<IUser>('User', userSchema);

export default User;
