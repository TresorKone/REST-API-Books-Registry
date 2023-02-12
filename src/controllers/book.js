const Book = require('../models/book');
const User = require('../models/user');

const { validationResult } = require('express-validator/check');

exports.getIndex = async (req, res, next) => {
    // destructure page and limit and set default values
    const {page = 1, limit = 4} = req.query;

    try {
        // execute query with page and limit values
        const books = await Book.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Books collection
        const count = await Book.countDocuments();

        // return response with Books, total pages, and current page
        res.status(200).json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "books not fetched"
        })
    }

};

exports.getBook = (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .populate('userId')
        .then(book => {
            if (!book) {
                return res.status(404).json({
                    message: 'could not find this post'
                })
            }
        res.status(200).json({
            data: book,
            message: "book details"
        })
    })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.postAddBook = (req, res, next) => {
    const error = validationResult(req);

    const title = req.body.title;
    const synopsys = req.body.synopsys;
    //const author = req.body.author;
    const date = req.body.date;
    const content = req.body.content;

    const book = new Book({
        title: title,
        synopsys: synopsys,
        date: date,
        content: content,
        userId: req.userId
    });

    if (!error.isEmpty()) {
        console.log(error);
        return res.json({
            message: 'validation error',
            errors: error.array()[0].msg + 'for the field' + ' ' + error.array()[0].param
        })
    }

    book.save()
        .then(r => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.books.push(book);
            return user.save();
        })
        .then(r => {
            res.status(201).json({
                message: 'book added'
            })
        })
        .catch(err => {
            console.log(err)
            res.status('500').json({
                message: 'book not added'
            });
        });
};

exports.postEditBook = (req, res, next) => {
    const id = req.params.bookId;
    const updatedTitle = req.body.title;
    const updatedSynopsys = req.body.synopsys;
    const updatedDate = req.body.date;
    const updatedContent = req.body.content

    Book.findById(id)
        .then(book => {
            book.title = updatedTitle;
            book.synopsys = updatedSynopsys;
            book.date = updatedDate;
            book.content = updatedContent;

            return book.save()
                .then(r => {
                    res.status(200).json({
                        data: r,
                        message: "book edited"
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.status('400').json({
                message: 'book not edited',
            })
        })
};

exports.postDeleteBook = (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .then(book => {
            return Book.deleteOne({
                _id: id
            });
        })
        .then(() => {
            res.status(202).json({
                message: 'resources deleted'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json('book deleted')
        })
};

