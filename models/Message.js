import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    conversationId : {
        type: String
    },
    senderId : {
        type: String
    },
    text : {
        type: String
    }
},{
    timestamps : true
});

export const messageModel = new mongoose.model("Message", messageSchema);