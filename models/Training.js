import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    idCreator:{
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    sport: {
        type: String,
    },
    location:{
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
    },
    description: {
        type: String,
        default: ''
    },
    maxMember: {
        type: Number,
        default: 5
    },
    level: {
        type: String,
        default: 'Начальный'
    },
    members: {
        type: Array,
        default: []
    },
    img:{
        type:String,
        default: ''
    }
},
{timestamps : true}
)

export const trainingModel = new mongoose.model("Training", trainingSchema);