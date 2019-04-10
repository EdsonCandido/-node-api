'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = express.Router();
/**
 * Conexão com o MONGODB
 */
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useCreateIndex: true });
/**
 * Rotas
 */
const indexRoutes = require('./routes/indexRouter');
const productRoutes = require('./routes/productRouter');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const projectRoutes = require('./routes/projectRoute');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
//HABILITA O CORS
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/orders', orderRoutes);
app.use('/project', projectRoutes);

module.exports = app;