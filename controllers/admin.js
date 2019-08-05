const Product = require('../models/Product');

exports.createProduct = async (req,res,next)=>{
    const content = req.body.content;
    const price = req.body.price;
    const title = req.body.title;
    const image = req.file;

    try{
    const imagePath = image.path;
    const product = new Product({
        imagePath:imagePath,
        description: content,
        price: price,
        name: title
    });
    const result = await product.save();
    res.json({});
}catch(err){
    err.statusCode = 500;
    next(err);
}
}

exports.getcreateProduct = async (req,res,next)=>{
    res.json({});
}