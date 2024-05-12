//get the sign up data
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const commentsMailer = require('../mailers/signup_mailer');

function generateOTP(){
    return Math.floor(100000 + Math.random()*900000);
}
const otpMap = new Map();
const generatedotp = generateOTP();

// controller for adding a new user to database
module.exports.sendOtp = async function(req,res){
try{
    console.log(req.body);
    const{firstName,lastName,email,password,confirmPassword} = req.body;

    console.log(typeof password,typeof confirmPassword);
    console.log(password,confirmPassword);

    // check for the same password
    if(password!=confirmPassword){
        console.log('password not matched');
        return res.redirect('back');
    }

    //Check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }

    //Hash the password
    // const hashedPassword = await bcrypt.hash(password,10);
    console.log('hp tak aa gya hun sahi salamat');
    commentsMailer.newSignup(req.body,generatedotp);
    
    //create a new user
    // const newUser = new User({email,password:hashedPassword,firstname:firstName,lastname:lastName});
    // commentsMailer.newSignup();
    // console.log('nwU tak aa gya hun sahi salamat')
    // await newUser.save();
    console.log('save tak aa gya hun sahi salamat')
    res.status(201).json({message:'User registered successfully'});
 }catch(error){
    console.error('the error is ',error);
    res.status(500).json({message:'Fuck this shit'});
 }
}

// controller to create a new session for signin
module.exports.createSession = async function(req,res){
    try{
        console.log('again inside the try')
        let user = await User.findOne({email:req.body.email});
        console.log('again inside the user')
        console.log(user);
        console.log(user.password);
        console.log(req.body.password);
        // if(!user|| user.password!=req.body.password){
        //     return res.json(422,{
        //         message:"Invalid username or password"
        //     });
        // }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }

        return res.json(200,{
            message:"sign in successful, here is your token",
            data:{
                token:jwt.sign(user.toJSON(),'XXX',{expiresIn:'100000'})
            }
        })
    }catch(err){
        console.log('********',err);
        return res.json(500,{
            message:"Interanl Server Error"
        })
    }
}

module.exports.verify= async function(req,res){
    try{
       console.log(req.body);
       const{signupData,otp} = req.body;
       console.log('inside verify');
       console.log(signupData);
       const{firstName,lastName,email,password} = signupData;
    
       

       const hashedPassword = await bcrypt.hash(password,10);
       console.log('hashed password');


      // Create a new user
      if(otp == generatedotp){
      const newUser = new User({email,password:hashedPassword,firstname:firstName,lastname:lastName});
      await newUser.save();
      res.status(201).json({message:'User registered successfully'});
      }
      console.log('registered successfully');

       
    }catch(err){

    }
}