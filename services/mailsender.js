const transporter = require('../config/mailer')
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
  try {
    await transporter.sendMail({
      from: '<serm135@gmail.com>', 
      to: "ser.135@hotmail.com", 
      subject: "Hello ✔", 
      text: "Hello world?"
    });
    res.status(202).json('Mensaje enviado correctamente')
  } catch (error) {
    res.status(404).json('Error al enviar mensaje')
    console.log(error);
  }
});

module.exports = router;
