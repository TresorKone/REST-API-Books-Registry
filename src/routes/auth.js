const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/auth');
const User = require('../models/user')

const router = express.Router();

// POST /signup
router.post('/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userInfo => {
                    if (userInfo) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    userController.postSignup);

// POST /login
router.post('/login', userController.postLogin)

module.exports = router;