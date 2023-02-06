const express = require('express');
const { body } = require('express-validator/check');

const bookController = require('../controllers/book');

const router = express.Router();

// GET /book
router.get('/', bookController.getIndex);

// POST /book/add
router.post('/add', bookController.postAddBook);

module.exports = router;