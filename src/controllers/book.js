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

exports.getBook = (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .then(book => {
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
                message: 'book not added',
                err: err
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
            res.status('400').json({
                message: 'book not edited',
                err: err
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
            res.status(400).json({
                error: err
            })
        })
};

