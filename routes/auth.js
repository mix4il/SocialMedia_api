import {Router} from 'express';
import {userModel} from "../models/User.js";
import bcrypt from 'bcrypt';

export const authRoute = Router();

authRoute.post('/register', async (req, res)=>{
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = new userModel({
            ...req.body,
            password: hashPassword
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(300).send({error: e.message});
    }
})

authRoute.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user =  await userModel.findOne({email});
        !user && res.status(400).send("Пользователя не сущетсвует");
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(300).send({error:"wrong password"});
        res.status(200).json(user);
    } catch (e) {
        res.status(300).send({error: e.message});
    }
})
