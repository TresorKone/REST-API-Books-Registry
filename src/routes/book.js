const express = require('express');
const { body } = require('express-validator/check');

const bookController = require('../controllers/book');
const jwtCheck = require('../middleware/check-auth')

const router = express.Router();

// GET /book
router.get('/', bookController.getIndex);

// GET /book/:id
router.get('/:bookId', bookController.getBook);

// POST /book/add
router.post('/add', jwtCheck,
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 })
    ]
    , bookController.postAddBook);

// PATCH /book/edit/:id
router.patch('/edit/:bookId', jwtCheck, bookController.postEditBook);

// PATCH /book/delete/:id
router.delete('/delete/:bookId', jwtCheck, bookController.postDeleteBook);



module.exports = router;