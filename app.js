import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from 'morgan';
import {userRoute} from "./routes/user.js";
import {authRoute} from "./routes/auth.js";
import {trainingRoute} from "./routes/training.js";


const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if(err) {
            console.log("error");
            console.log(err)
        }
        else console.log("mongdb is connected");
    })


//middelware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routers
app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/training', trainingRoute);


app.listen(PORT, () =>{
    console.log(`Сервер запущен на ${PORT} порту...`);
});





