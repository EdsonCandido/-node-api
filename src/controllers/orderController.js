'use strict';

const mongoose = require('mongoose');
const Order = require('../models/order');
const uuidLib = require('uuid-lib');

exports.get = (req, res) =>{
    Order.find({}).populate('user', 'name').populate('itens.product', 'title').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({error: '[ERROR] : Não foi possível listar', data : e});
    });
};

exports.post = (req, res, next) => {
    let order = new Order(req.body);
    order.number = uuidLib.raw().substring(0,6);
    order.save().then(x => {
        res.status(201).send({mensage :' Pedido Cadastrado com Sucesso' });
    }).catch( err => {
        res.status(400).send({error: '[ERRO] Falha no Cadastro ', data: err});
    });
};

