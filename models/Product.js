const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Products',Product);