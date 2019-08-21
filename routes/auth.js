const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { body, check } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const User = require('../models/User');


router.put('/signup',  authController.signUp);
router.get('/login', isAuth, authController.login);
router.get('/bucket', isAuth, authController.getBucket);
router.post('/bucket', isAuth, authController.addToBucket);
router.delete('/bucket', isAuth, authController.removeFromBucket);
router.delete('/bucket', isAuth, authController.clearBucket);

module.exports = router;

// [body('email').isEmail().withMessage("Please enter a valid email").normalizeEmail(),
// body('password', "Please enter a valid password").isLength({ min: 5 })],


// custom((value, { req }) => {
//     return User.findOne({ email: value }).then(userDoc => {
//         if (userDoc) {
//             return Promise.reject('Email adress already exists')
//         }
//     })
// }
// ).