import {Router} from 'express';
import {userModel} from "../models/User.js";
import bcrypt from "bcrypt";
import {trainingModel} from "../models/Training.js";

export const userRoute = Router();

//get all users
userRoute.get('/', async (req, res) =>{
    try {
        const users = await userModel.find({_id: {$ne: [req.body.id]}});
        res.status(200).json(users);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
})

//get a user
userRoute.get('/:id', async (req, res) =>{
    try {
        const user = userModel.findById(req.params.id, (err, doc)=>{
            const {password, __v, ...other} = doc.toJSON();
            res.status(200).json(other);
        });
    } catch (e) {
        res.status(400).send({error: e.message});
    }
})


//delete user
userRoute.delete('/:id', async (req, res) =>{
    try {
        if(req.body.id === req.params.id){
            await userModel.findOneAndDelete({ _id: req.params.id});
            res.status(200).send("Пользователь удален");
        }
    } catch (e) {
        res.status(400).send({error: e.message});
    }
})
//update users
userRoute.put('/:id', async (req, res) =>{
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        if(req.body.id === req.params.id){
            const users = await userModel.findOneAndUpdate({ _id: req.params.id}, {
                $set: req.body
            });
            res.status(200).send("Данные о пользователе успешно обновлены...");
        }
    } catch (e) {
        res.status(400).send({error: e.message});
    }
})
//following
userRoute.put('/:id/follow', async (req, res)=>{
    try {
        if (req.body.id !== req.params.id) {
            const currentUser = await userModel.findById(req.body.id);
            const user = await userModel.findById(req.params.id);

            if (!user.followings.includes(req.body.id)) {
                await currentUser.updateOne({$push: {followings: req.params.id}})
                await user.updateOne({$push: {followers: req.body.id}})
                res.status(200).send("Вы подписались");
            }

        }
    } catch (e) {
        res.status(400).send({error: e.message});
    }
})

userRoute.put('/:id/unfollow', async (req, res)=>{
    try {
        if (req.body.id !== req.params.id) {
            const currentUser = await userModel.findById(req.body.id);
            const user = await userModel.findById(req.params.id);

            if (!user?.followings.includes(req.body.id)) {
                await currentUser.updateOne({$pull: {followings: req.params.id}})
                await user.updateOne({$pull: {followers: req.body.id}})
                res.status(200).send("Вы отписались от пользователя");
            }
        }
    } catch (e) {
        res.status(400).send({error: e.message});
    }
})

userRoute.get('/:id/trainings', async (req, res) =>{
    try {
        const user = await userModel.findById(req.params.id);
        const trainings = await Promise.all(
            user?.trainings.map((trainId) => {
                return trainingModel.findById(trainId);
            })
        )
        res.status(200).json(trainings);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

userRoute.get('/:id/trainingsCreator', async (req, res) =>{
    try {
        const user = await userModel.findById(req.params.id);
        const trainings = await Promise.all(
            user?.trainings.map((trainId) => {
                return trainingModel.findById(trainId);
            })
        )
        res.status(200).json(trainings);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});





