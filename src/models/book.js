const { getDb } = require('../config/database')
class Book {
    constructor(title, synopsys, author, date) {
        this.title = title;
        this.synopsys = synopsys;
        this.author = author;
        this.date = date;
    }

    save() {
        const db = getDb();
        return db.collection('books').insertOne(this)
            .then(r => {
                console.log(r)
            })
            .catch(err => {
                console.log(err)
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('books')
            .find()
            .toArray()
            .then(books => {
                console.log(books);
                return books;
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = Book;