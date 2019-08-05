const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/products/:productId',productController.getProduct)
router.get('/products',productController.getProducts);


module.exports = router;
