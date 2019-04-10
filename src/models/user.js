'use strict'; 

const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const salt = bcrypt.genSaltSync(10);
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    passwordResetToken:{
        type:String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false
    },
    createAt:{
        type: Date,
        default: Date.now,
    }
});
userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});
const User =  mongoose.model('User', userSchema );
module.exports = User;