import {Router} from "express";
import {trainingModel} from "../models/Training.js";
import {userModel} from "../models/User.js";


export const trainingRoute = Router();


trainingRoute.get('/', async (req, res) =>{
    try {
        const trainings = await trainingModel.find();
        res.status(200).json(trainings);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
    }
)

trainingRoute.get('/:id', async (req, res) =>{
        try {
            const training = await trainingModel.findById(req.params.id);
            res.status(200).json(training);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
)

trainingRoute.post('/', async (req, res) =>{
        try {
            const newTraining = new trainingModel({
                ...req.body
            });
            const training = await newTraining.save();
            res.status(200).json(training);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
)

trainingRoute.delete('/:id', async (req, res) =>{
        try {
            const training = await trainingModel.findById(req.params.id);
            if(req.body.id === training?.idCreator){
                training.deleteOne();
                res.status(200).send("успешно удалена");
            }
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
)

trainingRoute.post('/:id/entry', async (req, res) =>{
        try {
            const training = await trainingModel.findById(req.params.id);
            const user = await userModel.findById(req.body.userId);
            if(!training?.members.includes(req.body.userId)){
                await user.updateOne({$push : {trainings: req.params.id}});
                await training.updateOne({$push : {members : req.body.userId}})
                res.status(500).send("Успешно записались!");
            }
            res.status(500).json({error: "Уже записаны на эту тренировку"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
);

trainingRoute.post('/:id/cancelEntry', async (req, res) =>{
        try {
            const training = await trainingModel.findById(req.params.id);
            const user = await userModel.findById(req.body.userId);
            if(training?.members.includes(req.body.userId)){
                await user.updateOne({$pull : {trainings: req.params.id}});
                await training.updateOne({$pull : {members : req.body.userId}});
                res.status(500).send("Запись отменена.");
            }
            res.status(500).json({error: "Вы не записаны на эту тренировку"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
)





