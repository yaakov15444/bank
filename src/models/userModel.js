import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
);
 const User = mongoose.model('User', userSchema);
export default User