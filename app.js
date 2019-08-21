const express =require('express');
const session = require('express-session');
const boydParser = require('body-parser');
const MongoDbStore = require('connect-mongodb-session')(session);
const path = require('path');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const app = express();


app.use(session({secret:'my_secret',resave:false,saveUninitialized:false}));
app.use(boydParser.urlencoded({extended:false}));
app.use(boydParser.json());
app.use(express.static(path.join(__dirname, 'images')));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origiin','*');
    res.setHeader('Access-Control-Allow-Methods','Delete, Post, Put, Patch');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next()
});

const fileSorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.memotype === 'image/png' ||
        'image/jpeg' ||
        'image/jpg'){
            cb(null,true);
        }else{
            cb(null,false)
        }
}

multer({storage:fileSorage, fileFilter: fileFilter});

const store = new MongoDBStore({
    uri: MongoDbUri,
    collection: 'sessions'
});

app.use('/auth',authRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    if (!req.session.user) {
        console.log('is logged in')
        return next();
    }
    console.log(req.session.user._id);
    User.findById(req.session.user._id).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
    // next();
});

app.use((error,req,res,next)=>{
    console.log('пришел в общий обработчик ошибок');
    res.json({mistake:'пришел в общий обработчик ошибок'});
})

app.listen(8080);