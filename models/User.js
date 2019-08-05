const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    mail:{
        required:true,
        type:String
    },
    login:{
        required:true,
        type:String
    },
    name:String,
    password:{
        type:String,
        required:true
    },
    bucket:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Bucket'
    }
});


module.exports = mongoose.model('User',User);