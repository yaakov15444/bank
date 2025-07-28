import mongoose from "mongoose";
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    joinCode: {
        type: String,
        unique: true,
        required: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        timestamps: true
    }
);
export default  mongoose.model('Group', groupSchema);