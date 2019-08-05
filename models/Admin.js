const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Admin = new Schema({
    email:{
        required: true,
        type: String
    },
    password:{
        required:true,
        type: String
    }
})

module.exports = mongoose.model('Admin',Admin);