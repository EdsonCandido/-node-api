'use strict';
const mongoose = require('mongoose');
const Product = require('../models/Product');
const validationContract = require('../validation/validation');

exports.get = (req, res, next) => {
    Product.find({}).then(data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({error: '[ERRO] Falha ao Listar todos os Produto', data: e});
    });
};
exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.param('slug'),
        active: true,
    }, 'title description price slug tags').then(data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({error: '[ERRO] Falha ao Listar o Produto', data: e});
    });
};
exports.getById = (req, res, next) => {
    Product.findById(req.param('id'), 'title description price slug tags').then(data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({error: '[ERRO] Falha ao Listar o Produto', data: e});
    });
};
exports.getByTag = (req, res, next) => {
    Product.find({tags: req.param('tag'), active: true}, 'title description price slug tags').then(data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({error: '[ERRO] Falha ao Listar o Produto', data: e});
    });
};
exports.post = (req, res, next) => {

    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O Título deve Conter pelo Menos Três Caracteres ');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve Conter pelo Menos Três Caracteres ');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve Conter pelo Menos Três Caracteres ');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    let product = new Product(req.body);
    product.save().then(x => {
        res.status(201).send({mensage : 'Produto Cadastrado com Sucesso' });
    }).catch( e => {
        res.status(400).send({error: '[ERRO] Falha no cadastro do Produto', data: e});
    });
};
exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.param('id'), {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({mensage : 'Produto Atualizado com Sucesso!'});
    }).catch( err => {
        res.status(400).send({message :  'Error ao atualizar', data: err});
    });
};
exports.del = (req, res, next) =>{
   Product.findOneAndRemove(req.param('id')).then(x => {
        res.status(200).send({mensage : 'Produto Removido com Sucesso!'});
    }).catch( err => {
        res.status(400).send({message :  'Error ao Remover', data: err});
    });
};