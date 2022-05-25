import {Router} from "express";
import {messageModel} from "../models/Message.js";



export const messageRouter = Router();

messageRouter.post('/', async (req, res) =>{
    const newMessage = new messageModel(req.body);
    try {
        const save = await newMessage.save();
        res.status(200).json(save);
    } catch (e) {
        res.status(500).json('Ошибка')
    }
});

messageRouter.get('/:conversationId', async (req, res) =>{
    try {
        const message = await messageModel.find({conversationId : req.params.conversationId});
        res.status(200).json(message);
    } catch (e) {
        res.status(500).json('Ошибка')
    }
});

