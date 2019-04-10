'use strict'; 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    number: {
        type: String,
        required: true,
    },
    createDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['created', 'done'],
        default: 'created',
        required: true,
    },

    itens:[{
        quantity:{
            type: Number,
            default: 1,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }],
});

module.exports = mongoose.model('Order', orderSchema );