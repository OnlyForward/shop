const express = require('express');
const boydParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routes/auth');
const shop = require('./routes/shop');


//<password>
let connectionString = "mongodb+srv://DimaSh:75891234@cluster0-rhhiy.mongodb.net/test?retryWrites=true&w=majority";

app.use(boydParser.urlencoded({ extended: false }));
app.use(boydParser.json());
app.use(express.static(path.join(__dirname, 'images')));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origiin','*');
    res.setHeader('Access-Control-Allow-Methods','Delete, Post, Put, Patch');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');

    next()
});

const fileSorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.memotype === 'image/png' ||
        'image/jpeg' ||
        'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}


multer({ storage: fileSorage, fileFilter: fileFilter }).single('image');

app.use('/auth',auth);
app.use(shop);



app.use((err, req, res, next) => {
    console.log('пришел в общий обработчик ошибок');
    const statusCode = err.statusCode || 500;
    const message = err.message;
    res.status(statusCode).json({
        message: message
    })
})


mongoose.connect(connectionString).then(result => {
    console.log(result);
    const server = app.listen(8080);
}).catch(err=>{
    console.log(err);
})
