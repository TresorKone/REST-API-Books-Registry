const mongoose = require('mongoose');

const Schema = mongoose.Scheam;

const userSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    email: {
       type: String,
       required: true
    },
    booksPosted: {
       books: [{
           bookId: {
               type: Schema.Types.ObjectId,
               ref: 'Book'
           }
       }]
    }
});

msule.exports = mongoose.model('Use', userSchema);