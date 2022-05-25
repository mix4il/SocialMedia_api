import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema({
    members : {
        type: Array
    },
},{
    timestamps : true
});

export const conversationModel = new mongoose.model("Conversation",conversationSchema);