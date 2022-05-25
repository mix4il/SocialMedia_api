import {Router} from "express"
import {messageModel} from "../models/Message.js";
import {conversationModel} from "../models/Conversation.js";


export const conversationRouter = Router();

conversationRouter.post('/', async (req, res) =>{
    const newConversation = new conversationModel({
        members : [req.body.senderId, req.body.receiverId]
    });
    try {
        const save = await newConversation.save();
        res.status(200).json(save);
        console.log("dsfds");
    } catch (e) {
        res.status(500).json('Ошибка')
    }
});

conversationRouter.get('/:userId', async (req, res) =>{
    try {
        const conversation = await conversationModel.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (e) {
        res.status(500).json('Ошибка')
    }
});



conversationRouter.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await conversationModel.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});





