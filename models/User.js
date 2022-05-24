import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    firstname: String,
    lastname: String,
    password: String,
    desc: {
        type: String,
        default: ''
    },
    img:{
        type:String,
        default: '',
    },
    rating:{
        type: Number,
        default: 0
    },
    sport:{
        type: String,
        default: ''
    },
    age:{
        type: Number,
        default: 0
    },
    phone:{
        type: String,
        default: ''
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: []
    },
    trainings :{
        type: Array,
        default: []
    }
})

export const userModel = new mongoose.model('User', userSchema);