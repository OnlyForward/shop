const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/create-product',adminController.getcreateProduct);
router.post('/create-product',adminController.createProduct)

module.exports = router;