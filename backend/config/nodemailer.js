const nodemailer = require('nodemailer');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'samarthbhardwaj2003@gmail.com',
        pass:'wgtj nccc uyjr odzd'
    }
});

module.exports ={
    transporter:transporter,
}