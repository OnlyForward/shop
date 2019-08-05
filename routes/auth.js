const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { body, check } = require('express-validator/check');

router.get('/signup',[body('email').isEmail(),
body(['password','confirmPassword']).length({min:5})],authController.signUp);
router.get('/login',authController.login);
router.get('/bucket',authController.getBucket);
router.post('/bucket',authController.addToBucket);
router.delete('/bucket',authController.removeFromBucket);
router.delete('/bucket',authController.clearBucket);

module.exports = router;