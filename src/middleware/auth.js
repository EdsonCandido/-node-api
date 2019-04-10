'use strict';
const jwt = require('jsonwebtoken');
const authConfig = require('../services/auth');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: '[ERROR] Token não autorizado'});
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        res.status(401).send({error: '[ERROR] Token inválido'});
    }

    const [ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error : '[ERROR] Isso não é um TOKEN!'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: '[ERROR] Token inválido'});

        req.userId = decoded.id;
        return next();
    });
}