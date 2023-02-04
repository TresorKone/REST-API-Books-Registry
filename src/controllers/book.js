const Book = require('../models/book')

exports.getIndex = (req, res, next) => {
    Book.fetchAll()
        .then(books => {
            res.status(200).json(books)
        })
        .catch(err => {
            res.status(404).json(err)
        })
};

exports.postAddBook = (req, res, next) => {
    const title = req.body.title;
    const synopsys = req.body.synopsys;
    const author = req.body.author;
    const date = req.body.date;

    const book = new Book(title, synopsys, author, date);
    book.save()
        .then(r => {
            res.status(201).json('book added')
        })
        .catch(err => {
            res.status('404').json('book not added')
        })
}

