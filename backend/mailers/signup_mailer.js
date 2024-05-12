const nodeMailer = require('../config/nodemailer');


exports.newSignup = (user,otp)=>{
 console.log('inside newSignup mailer');
 console.log(user.email);
 nodeMailer.transporter.sendMail({
    from:'samarthbhardwaj2003@gmail.com',
    to:user.email,
    subject:"new user registered",
    html: `<p>Your OTP is: ${otp}</p>`
 },(err,info)=>{
    if(err){
        console.log('Error in sending email',err);
        return;
    }
    console.log('Message sent',info);
    return;
 })
}