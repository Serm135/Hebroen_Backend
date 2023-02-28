const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.USER_AUTH, 
    pass: process.env.PASS_AUTH, 
  },
});

transporter.verify().then(()=>{
  console.log('Everything is ok')
});

module.exports = transporter;