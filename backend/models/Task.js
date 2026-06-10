import mongoose from 'mongoose';
import {use} from 'react';

const task= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
    description:{
        type: String,
        re
    }
});