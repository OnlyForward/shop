const User = require('../models/User');
const Bucket = require('../models/Bucket');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req,res,next)=>{
    const password = req.body.password1;
    const login = req.body.login;
    const confirmPassword = req.body.password2;
    const email = req.body.email;

    try{
    const checkUser = await User.find({email:email});
    if(checkUser){
        const err = new Error('Пользователь с данным именем уже существует');
        err.errorCode = 422;
        throw err;
    }
    if(confirmPassword !== password){
        const err = new Error('Пароли не сопадают');
        err.errorCode = 422;
        throw err;
    }
    const hashedPassword = await bcrypt.hash(password,12);
    const user = new User({
        password: hashedPassword,
        login:login,
        email:email
    })

    const result = await user.save();

    res.json({result: result});
    }catch(err){
        err.statusCode = 500;
        next(err);
    }

}

exports.login = async (req,res,next)=>{
    const password = req.body.password;
    const email = req.body.email;

    try{
        const user = await User.find({email:email});
        if(!user){
            const err = new Error('Не существует пользователь с таким email');
            throw err;
        }

        const result = await bcrypt.compare(password,user.password);
        console.log(`result of bcrypt compare ${result}`)
        if(!result){
            const err =  new Error('Неверный логин или пароль');
            throw err;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
            'secret',
            { expiresIn: '1h' });
        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    }catch(err){
        err.statusCode = 500;
        next(err);
    }
}

exports.reassignPassword = async (req,res,next)=>{

}

exports.getBucket = async (req,res,next)=>{
    const userId = req.userId;
    try{
        const products = await Bucket.findById({userId:userId}).populate(products.productId);
        res.json({products:products});
    }catch(err){
        err.statusCode = 500;
        next(err);
    }
}

exports.addToBucket = async (req,res,next)=>{
    const productId = req.body.productId;
    const userId = req.userId;
// io.getIo().emit('posts', { action: 'delete', post: postId });
    try{
        const bucket = await Bucket.find({userId:userId});
        const result = await bucket.addToBucket(productId);
        if(bucket && rseult){
            const err = new Error('Продукт не может быть добавлен в корзину');
            err.statusCode = 422;
            throw err;
        }
        res.json({bucket:'продукт добавлен'})
    }catch(err){
        err.statusCode = 500;
        next(err);
    }
}

exports.removeFromBucket = async (req,res,next)=>{
    const productId = req.body.productId;
    const userId = req.userId;

    try{
        const bucket = await Bucket.find({userId:userId});
        const result = await bucket.removeProduct(productId);
        if(bucket && rseult){
            const err = new Error('Продукт не может быть удален из корзины');
            err.statusCode = 422;
            throw err;
        }
        res.json({bucket:'продукт удален'})
    }catch(err){
        err.statusCode = 500;
        next(err);
    }
}

exports.clearBucket = async (req,res,next)=>{
    const userId = req.userId;

    try{
        const bucket = await Bucket.find({userId:userId});
        await bucket.clearBucket();
        res.json({bucket:'корзина очищена'})
    }catch(err){
        err.statusCode = 500;
        next(err);
    }
}