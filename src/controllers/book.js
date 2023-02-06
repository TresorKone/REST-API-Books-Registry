const Book = require('../models/book')

exports.getIndex = (req, res, next) => {
    Book.find()
        .then(books => {
            res.status(200).json({
                data: books,
                message: "books list"
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
};

exports.postAddBook = (req, res, next) => {
    const title = req.body.title;
    const synopsys = req.body.synopsys;
    //const author = req.body.author;
    const date = req.body.date;
    const content = req.body.content;

    const book = new Book({
        title: title,
        synopsys: synopsys,
        date: date,
        content: content
    });
    book.save()
        .then(r => {
            res.status(201).json({
                message: 'book added'
            })
        })
        .catch(err => {
            res.status('400').json({
                message: 'book not added'
            });
        });
};

