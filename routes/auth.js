const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { body, check } = require('express-validator');
const isAuth = require('../middleware/is-auth');

router.put('/signup',isAuth,[body('email',"Please enter a valid email").isEmail(),
body('password',"Please enter a valid password").isLength({min:5})],authController.signUp);
router.get('/login',isAuth,authController.login);
router.get('/bucket',isAuth,authController.getBucket);
router.post('/bucket',isAuth,authController.addToBucket);
router.delete('/bucket',isAuth,authController.removeFromBucket);
router.delete('/bucket',isAuth,authController.clearBucket);

module.exports = router;