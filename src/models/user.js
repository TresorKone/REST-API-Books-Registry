const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    email: {
       type: String,
       required: true
    },
    books: {
        booksId: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Book'
            },
            number: {
                type: Number
            }
        }]
    }
});

module.exports = mongoose.model('User', userSchema);