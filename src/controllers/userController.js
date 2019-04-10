'use strict';

const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validation = require('../validation/validation');
const emailService = require('../services/emailSend');
const authConfig = require('../services/auth');

function generateToken(params = {}) {
    jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}
exports.get = (req, res, next) => {
    User.find({}).then(data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({error: '[ERRO] Falha ao Listar todos os Usuários', data: e});
    });
};
exports.post = async (req, res, next) => {
    const email = req.body.email;
    try {
        if(await User.findOne({email}))
            return res.status(400).send({error: '[ERROR] Esse email já existe'});
        const user = await User.create(req.body);
        user.password = undefined;
        return res.status(201).send({user});
    } catch (error) {
        res.status(400).send({error : '[ERROR] Não foi possível cadastrar'})
    }
};
exports.postAuthenticate =  async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error : '[ERROR] Usuário não existe'});
    if(! await bcrypt.compare(password, user.password))
        return res.status(403).send({error : '[ERROR] Senha incorreta'});
    
    user.password = undefined;

    
    res.status(200).send({user, token: generateToken({id :user.id})});
};
exports.put = (req, res, next) => {
    User.findByIdAndUpdate(req.param('id'), {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password:  req.body.password
        }
    }).then(x => {
        res.status(200).send({mensage : 'Usuário Atualizado com Sucesso!'});
    }).catch( err => {
        res.status(400).send({message :  'Error ao atualizar', data: err});
    });
};
exports.del = (req, res, next) =>{
    User.findOneAndRemove(req.param('id')).then(x => {
        res.status(200).send({mensage : 'Usuário Removido com Sucesso!'});
    }).catch( err => {
        res.status(400).send({message :  'Error ao Remover', data: err});
    });
};
exports.forgotPassword = async (req, res) =>{
    const email = req.body.email;
    try {
        const user = await User.findOne({email});

        if(!user)
            return res.status(400).send({error : '[ERROR] Usuário não existe'});

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();

        now.setHours(now.getHours()+1);
      
        await User.findByIdAndUpdate(user.id, {
            '$set':{
                passwordResetToken : token,
                passwordResetExpires: now
            }
        });
        emailService.send(user.email, token);
        return res.send();
       
    }catch (err) {
        res.status(400).send({error : '[ERROR] Erro ao recuperar a senha', data: err});
    }
};
exports.resetPassword = async (req, res) => {
    const {email, token, password} = req.body;

    try {
        const user = await User.findOne({email}).select('+password passwordResetExpires passwordResetToken');

        if(!user)
            return res.status(400).send({error : '[ERROR] Usuário não existe'});

        if(token !== user.passwordResetToken){
            return res.status(400).send({error : '[ERROR] Tokin inválido'});
        }
        const now = new Date();
        if(now > user.passwordResetExpires){
            return res.status(400).send({error : '[ERROR] Tokin expirado, tente novamente'});
        }
        
        user.password = password;

        await user.save();

        res.send();
    } catch (err) {
        res.status(400).send({error : '[ERROR] Erro ao recuperar a senha', data: err});
    }
};