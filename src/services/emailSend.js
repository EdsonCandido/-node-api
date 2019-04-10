'use strict';

const nodemailer = require('nodemailer');


exports.send = async (emailUser, token) => {
 let transporte = nodemailer.createTransport({
    service: 'Gmail', // Como mencionei, vamos usar o Gmail
    auth: {
      user: 'edsonj85@gmail.com', // Basta dizer qual o nosso usuário
      pass: 'nosde123!'             // e a senha da nossa conta
    } 
  });

  let email = {
    from: 'edsonj85@gmail.com', // Quem enviou este e-mail
    to: emailUser, // Quem receberá
    subject: 'Recupetar senha {{Sitema}}',
    html: token // O conteúdo do e-mail
  };
  
  transporte.sendMail(email, (err, info) => {
    if(err)
      throw err;
  
    console.log('Email enviado!\nINFORMAÇÕES : ', info);
  });
};