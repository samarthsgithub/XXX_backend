const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const passport = require('./config/passport-jwt-strategy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware to authenticate request
const authenticate = passport.authenticate('jwt',{session:false});


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

const port = 3001;

app.use('/',require('./routes'));

// app.get('/',(req,res)=>{
//     res.send({
//         message:"I am guddu pandit"
//     })
// })


app.listen(port,()=>{
    console.log(`Example app listening on Port ${port}`)
})