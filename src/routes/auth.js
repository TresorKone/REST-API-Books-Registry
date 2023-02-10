const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/auth');

const router = express.Router();

// POST /signup
router.post('/signup', userController.postSignup);

// POST /login
router.post('login', userController.postLogin)

module.exports = router;