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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;