const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://samarthdb:samarth123@samarthdb.gp7idaw.mongodb.net/xxx');

const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log('Connected to database:: MongoDB');
});

module.exports = db;