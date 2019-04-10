'use strict';

const nodemailer = require('nodemailer');


exports.send = async (emailUser, token) => {
 let transporte = nodemailer.createTransport({
    service: 'Gmail', // Como mencionei, vamos usar o Gmail
    auth: {
      user: 'seu email', // Basta dizer qual o nosso usuário
      pass: 'senha '             // e a senha da nossa conta
    } 
  });

  let email = {
    from: 'PDe quem', // Quem enviou este e-mail
    to: emailUser, // Quem receberá
    subject: 'Assunto {{Sitema}}',
    html: token // O conteúdo do e-mail
  };
  
  transporte.sendMail(email, (err, info) => {
    if(err)
      throw err;
  
    console.log('Email enviado!\nINFORMAÇÕES : ', info);
  });
};
