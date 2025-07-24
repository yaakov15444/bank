import mongoose from "mongoose";
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    }
);
export const Group = mongoose.model('Group', groupSchema);