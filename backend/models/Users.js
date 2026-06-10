import mongoose from 'mongoose';
import { use } from 'react';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const user= mongoose.model('User', userSchema);

export default user;