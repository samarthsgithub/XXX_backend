const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports.home = async function(req,res){
    try{
        console.log('try tak aa gya');
       const token = req.header('Authorization');
       const newToken = token.replace(/^Bearer\s+/i,'');
       console.log(newToken);
    //    const decoded = jwt.decode(token);
    //    console.log('decoded token', decoded);
    
       if(!token){
        return res.status(401).json({message:"No token,authorization denied"});
       }
       console.log('the token is there')
      
       var decoded = jwt.decode(newToken);
       console.log(decoded);
    
    //    Verify token
    //    const decoded = jwt.verify(newToken,'XXX');
    //    console.log('Decoded token:', decoded);
       console.log("decoded tak aa gya");

       //Find user by decoded ID
       const user = await User.findById(decoded._id);
       console.log("decode ke baad user tak aa gya")
       if(!user){
        return res.status(404).json({message:'User not found'});
       }
       //Return user details
       res.json(user);
    }catch(err){
        if(err.name === 'JsonWebTokenError'){
            console.error('Error fetching user:', err);
            return res.status(401).json({message:'Invalid token'});
        }else if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message:'Token Expired'});
        }
        
        res.status(500).json({ message: 'Internal Server Error' });
        console.error('The error is ',err);
    }
}