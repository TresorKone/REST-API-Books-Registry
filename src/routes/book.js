const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

// GET /book
router.get('/', bookController.getIndex);

// POST /add-book
router.post('/add-book', bookController.postAddBook);

module.exports = router;