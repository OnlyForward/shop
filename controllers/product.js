const Products = require('../models/Product');

exports.getProducts = async (req, res, next) => {
    let query = req.query.product;
    console.log(query);
    try {
        let products;
        if (query) {
            products = await Products.find({ "title": { $regex: query, $options: "i" } });
            console.log(products);
        }
        if (!products) {
            const err = new Error('Нет товаров');
            err.statusCode = 422;
            throw err;
        }
        res.json({ products: products });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
}

exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        const product = await Products.findById(productId);
        if (!product) {
            const err = new Error('Продукт по данному id не найден');
            err.statusCode = 422;
            throw err;
        }
        res.json({ product: product });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}