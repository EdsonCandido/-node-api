'use strict';
const mongoose = require('mongoose');
const Product = mongoose.Schema('product');

exports.get = () => {
    return Product.find({});
};